const makeRequest = require('./request');
const handleError = require('./handleError');

const deleteHook = (org, repo, keyword) => {
  return findHookIdsWithKeyword(org, repo, keyword)
    .then(ids => deleteHooks(org, repo, ids))
};

const deleteHooks = (org, repo, hookIds) => {
  return Promise.all(
    hookIds.map(hookId => {
      return makeRequest({
        url: `/repos/${org}/${repo}/hooks/${hookId}`,
        method: 'delete'
      });
    })
  );
};

const findHookIdsWithKeyword = (org, repo, keyword) => {
  return makeRequest({
    url: `/repos/${org}/${repo}/hooks`,
    method: 'get'
  })
    .then(({ data }) => {
      // filters out all hook objects without keyword
      return data
        .filter(item => JSON.stringify(item).includes(keyword))
        .map(item => item.id);
    })
}

module.exports = deleteHook;
