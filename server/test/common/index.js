/* testing for local setup */
var axios = require('axios')

var options = {
  method: 'POST',
  url: 'https://dev-8p7irqly.us.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  data: {
    grant_type: 'client_credentials',
    client_id: 'FmU3TIDMMQHe7ANvJuY5zRQbztbsbEVG',
    client_secret: 'zy-p9VqIR9jrn1UC5jrLoHy6BZRe9Tq7JCY3ROMqlZhh1M2VzjbSLvPbNJMpf_9g',
    audience: "https://it-project-connected-api.herokuapp.com/"
    // "audience": "localhost:3000/api/",
}
};

exports.getAccessToken = async () => {
  return new Promise((resolve, reject) => {
    axios.request(options).then(response => {
      resolve(response.data.access_token);
    });
  })
}

exports.BASE_URL = 'https://it-project-connected-api-dev.herokuapp.com/api';
exports.FROUT_BASE_URL = "https://it-project-connected-dev.herokuapp.com"

// exports.BASE_URL = 'http://localhost:3000/api';
// exports.FROUT_BASE_URL = "http://localhost:5000"
