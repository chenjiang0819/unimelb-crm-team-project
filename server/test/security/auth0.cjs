const assert=require('assert/strict');const path=require('path');const Module=require('module');
const load=Module._load;let calls=0;
Module._load=function(name,...rest){if(name==='axios')return {request:()=>{calls++;throw Error('no real provider');}};return load.call(this,name,...rest);};
const c=require('../../controllers/auth0');assert.equal(calls,0,'import must not contact provider');
function res(){return {code:0,status(n){this.code=n;return this;},json(){return this;},send(){return this;}};}
(async()=>{
 delete process.env.ENABLE_AUTH0_MANAGEMENT;let r=res();await c.getAllUsers({},r);assert.equal(r.code,503);assert.equal(calls,0);
 process.env.ENABLE_AUTH0_MANAGEMENT='true';r=res();await c.getuserInfo({params:{sub:'other'},user:{sub:'owner'}},r);assert.equal(r.code,403);
 r=res();await c.getAllUsers({params:{},user:{sub:'owner'}},r);assert.equal(r.code,403);assert.equal(calls,0);
 r=res();await c.updateUser({params:{},body:{sub:'owner',username:{$ne:null}},user:{sub:'owner'}},r);assert.equal(r.code,400);assert.equal(calls,0);
 const helper=require('../common');delete process.env.RUN_REAL_PROVIDER_TESTS;await assert.rejects(helper.getAccessToken(),/disabled/);assert.equal(calls,0);
 console.log('PASS: no import calls; disabled management; cross-user/admin denials; invalid input');
})().catch(e=>{console.error(e);process.exitCode=1});
