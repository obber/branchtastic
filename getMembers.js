const makeRequest = require('./request');
const handleError = require('./handleError');
const map = require('lodash').map;

const getMembers = (teamId) => {
  return makeRequest({
    url: `/teams/${teamId}/members`,
    method: 'get'
  })
    .then(({ data }) => map(data, item => item.login))
    .catch(handleError);
};

module.exports = getMembers;
