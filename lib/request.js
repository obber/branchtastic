const axios = require('axios');

const github_token = require('../config.js').github_token;

const requestWithToken = ({ url, method, params = {}, data = {} }) => {
  const baseURL = 'https://api.github.com';
  const access_token = github_token;
  params = Object.assign({ access_token }, params);

  return axios.request({
    url,
    method,
    params,
    baseURL,
    data,
  });
};

module.exports = requestWithToken;
