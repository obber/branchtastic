const makeRequest = require('./request');
const handleError = require('./handleError');

const getMembers = (teamId) => {
  return makeRequest({
    url: `/teams/${teamId}/members`,
    method: 'get'
  })
    .then(({ data }) => data.map(item => item.login))
    .catch(handleError);
};

module.exports = getMembers;
