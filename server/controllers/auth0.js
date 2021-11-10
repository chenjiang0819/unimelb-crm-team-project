var axios = require('axios')

var options = {
    method: 'POST',
    url: 'https://example.auth0.com/oauth/token',
    headers: {'content-type': 'application/json'},
    data: {
      grant_type: 'client_credentials',
      client_id: 'FmU3TIDMMQHe7ANvJuY5zRQbztbsbEVG',
      client_secret: 'REDACTED_CREDENTIAL',
      audience: 'https://example.auth0.com/api/v2/'
    }
  };

var access_token;

axios.request(options).then(response => {
    access_token = response.data.access_token;
});

const getuserInfo = async (req, res) => {
    const { sub } = req.params;
    try {
        const response = await axios({
            method: 'GET',
            url: `https://example.auth0.com/api/v2/users/${sub}`,
            headers: {'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'}
        })
        if (response) {
            return res.status(200).send(response.data);
        }
        return res.status(400).send({message : "Network Error!"});
    } catch (e) {
        return res.status(e.response.status).send(e.response.data);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const response = await axios({
            method: 'GET',
            url: `https://example.auth0.com/api/v2/users`,
            headers: {'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'}
        })
        if (response) {
            return res.status(200).send(response.data);
        }
        return res.status(400).send({message : "Network Error!"});
    } catch (e) {
        return res.status(e.response.status).send(e.response.data);
    }
};

const updateUser = async (req, res) => {
    const { sub, username, email } = req.body;
    let updateOption = {
        method: 'PATCH',
        url: `https://example.auth0.com/api/v2/users/${sub}`,
        headers: {'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'},
    }

    try {
        if (username) {
            let response = await axios({...updateOption, data: {
                "connection": "Username-Password-Authentication",
                username
            }})
            if (response) {
                return res.status(200).json(response.data);
            }
            return res.status(400).send({message : "Network Error!"});
        }
        if (email) {
            let response = await axios({...updateOption, data: {
                "connection": "Username-Password-Authentication",
                email
            }})
            if (response) {
                return res.status(200).json(response.data);
            }
            return res.status(400).send({message : "Network Error!"});
        }
        return res.status(400).send({message: "Filed missing!"});
    }
    catch (e) {
        return res.status(e.response.status).send(e.response.data);
    }
};

module.exports = {
    getuserInfo,
    getAllUsers,
    updateUser
};
