// 2026 security maintenance: management API disabled by default. Historical
// credentials were removed; revoke them separately. Never request tokens at import.
const axios = require('axios');
let cached;
async function token() {
  const domain = process.env.AUTH0_DOMAIN;
  const clientId = process.env.AUTH0_MANAGEMENT_CLIENT_ID;
  const clientSecret = process.env.AUTH0_MANAGEMENT_CLIENT_SECRET;
  if (!domain || !/^[a-z0-9.-]+\.auth0\.com$/i.test(domain) || !clientId || !clientSecret)
    throw new Error('Management integration is not configured');
  if (cached && cached.until > Date.now()) return cached;
  const response = await axios.request({method:'POST',url:`https://${domain}/oauth/token`,timeout:5000,
    data:{grant_type:'client_credentials',client_id:clientId,client_secret:clientSecret,audience:`https://${domain}/api/v2/`}});
  if (typeof response.data.access_token !== 'string') throw new Error('Invalid provider response');
  cached={value:response.data.access_token,domain,until:Date.now()+Math.max(0,(Number(response.data.expires_in)||0)-30)*1000};
  return cached;
}
function denyUnlessAuthorized(req,res,admin=false) {
  if (process.env.ENABLE_AUTH0_MANAGEMENT !== 'true') {res.status(503).json({message:'Management integration disabled'});return true;}
  const subject = req.user && req.user.sub;
  const requested = req.params.sub || (req.body && req.body.sub);
  const permissions = req.user && req.user.permissions;
  if (!subject || (admin ? !Array.isArray(permissions) || !permissions.includes('manage:users') : subject !== requested)) {
    res.status(403).json({message:'Forbidden'});return true;
  }
  return false;
}
async function call(req,res,method,path,data) {
  try {
    const t=await token();
    const response=await axios.request({method,url:`https://${t.domain}/api/v2/${path}`,timeout:5000,
      headers:{Authorization:`Bearer ${t.value}`},data});
    return res.status(200).json(response.data);
  } catch (_) {return res.status(502).json({message:'Identity provider unavailable'});}
}
const getuserInfo=async(req,res)=>{
  if(denyUnlessAuthorized(req,res))return;
  return call(req,res,'GET',`users/${encodeURIComponent(req.params.sub)}`);
};
const getAllUsers=async(req,res)=>{
  if(denyUnlessAuthorized(req,res,true))return;
  return call(req,res,'GET','users');
};
const updateUser=async(req,res)=>{
  if(denyUnlessAuthorized(req,res))return;
  const {username,email}=req.body;const data={};
  if(username!==undefined) {if(typeof username!=='string'||!username.trim()||username.length>100)return res.status(400).send();data.username=username;}
  if(email!==undefined) {if(typeof email!=='string'||!email.includes('@')||email.length>254)return res.status(400).send();data.email=email;}
  if(!Object.keys(data).length)return res.status(400).send();
  return call(req,res,'PATCH',`users/${encodeURIComponent(req.body.sub)}`,data);
};
module.exports={getuserInfo,getAllUsers,updateUser};
