var axios = require("axios");

var options = {
  method: "POST",
  // url: 'https://dev-8p7irqly.us.auth0.com/oauth/token',
  url: `${process.env.REACT_APP_AUTH0_DOMAIN}oauth/token`,
  headers: { "content-type": "application/json" },
  data: {
    grant_type: "client_credentials",
    // client_id: 'FmU3TIDMMQHe7ANvJuY5zRQbztbsbEVG',
    // client_secret: 'zy-p9VqIR9jrn1UC5jrLoHy6BZRe9Tq7JCY3ROMqlZhh1M2VzjbSLvPbNJMpf_9g',
    // audience: 'https://dev-8p7irqly.us.auth0.com/api/v2/'
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
    client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  },
};

var access_token;

axios.request(options).then((response) => {
  access_token = response.data.access_token;
});

const getUserInfo = async (req, res) => {
  const { sub } = req.params;
  try {
    const response = await axios({
      method: "GET",
      // url: `https://dev-8p7irqly.us.auth0.com/api/v2/users/${sub}`,
      url: `${process.env.REACT_APP_AUTH0_AUDIENCE}users/${sub}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });
    if (response) {
      return res.status(200).send(response.data);
    }
    return res.status(400).send({ message: "Network Error!" });
  } catch (e) {
    return res.status(e.response.status).send(e.response.data);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const response = await axios({
      method: "GET",
      // url: `https://dev-8p7irqly.us.auth0.com/api/v2/users`,
      url: `${process.env.REACT_APP_AUTH0_AUDIENCE}users`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });
    if (response) {
      return res.status(200).send(response.data);
    }
    return res.status(400).send({ message: "Network Error!" });
  } catch (e) {
    return res.status(e.response.status).send(e.response.data);
  }
};

const updateUser = async (req, res) => {
  const { sub, username, email } = req.body;
  let updateOption = {
    method: "PATCH",
    // url: `https://dev-8p7irqly.us.auth0.com/api/v2/users/${sub}`,
    url: `${process.env.REACT_APP_AUTH0_AUDIENCE}users/${sub}`,
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    if (username) {
      let response = await axios({
        ...updateOption,
        data: {
          connection: "Username-Password-Authentication",
          username,
        },
      });
      if (response) {
        return res.status(200).json(response.data);
      }
      return res.status(400).send({ message: "Network Error!" });
    }
    if (email) {
      let response = await axios({
        ...updateOption,
        data: {
          connection: "Username-Password-Authentication",
          email,
        },
      });
      if (response) {
        return res.status(200).json(response.data);
      }
      return res.status(400).send({ message: "Network Error!" });
    }
    return res.status(400).send({ message: "Filed missing!" });
  } catch (e) {
    return res.status(e.response.status).send(e.response.data);
  }
};

module.exports = {
  getUserInfo,
  getAllUsers,
  updateUser,
};
