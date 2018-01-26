const makeRequest = require('./request');
const handleError = require('./handleError');

const getMembers = (teamId) => {
  return Promise.all([
    getMembersFromPage(teamId),
    getMembersFromPage(teamId, 2)
  ])
    .then(([membersFromPage1, membersFromPage2]) => {
      return [
        ...membersFromPage1,
        ...membersFromPage2,
      ]
    })
    .catch(handleError);
};

const getMembersFromPage = (teamId, page = 1) => {
  return makeRequest({
    url: `/teams/${teamId}/members`,
    method: 'get',
    params: {
      page,
    },
  })
    .then(({ data }) => data.map(item => item.login));
}

module.exports = getMembers;
