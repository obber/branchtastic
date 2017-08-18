const _ = require('lodash');

const makeRequest = require('./request');
const handleError = require('./handleError');

const createBranches = (members, org, repo) => {
  return getRef(org, repo)
    .then(sha => {
      return Promise.all(
        members.map(branchName => createBranch(org, repo, sha, branchName))
      );
    })
    .catch(handleError);
};

const createBranch = (org, repo, sha, branchName) => {
  return makeRequest({
    method: 'post',
    url: `/repos/${org}/${repo}/git/refs`,
    data: {
      ref: `refs/heads/${branchName}`,
      sha,
    }
  })
    .catch(handleError);
}

const getRef = (org, repo) => {
  return makeRequest({
    method: 'get',
    url: `/repos/${org}/${repo}/git/refs/heads/master`,
  })
    .then(({ data }) => data.object.sha)
    .catch(handleError);
};

module.exports = createBranches;
