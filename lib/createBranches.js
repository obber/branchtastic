const _ = require('lodash');

require('colors');

const makeRequest = require('./request');
const handleError = require('./handleError');

const createBranches = (members, org, repo) => {
  const createSingleBranch = createBranch();
  return getRef(org, repo)
    .then(sha => {
      return Promise.all(
        members.map(branchName => {
          return createSingleBranch(org, repo, sha, branchName)
            .then(() => console.log(`${branchName.green} created`))
            .catch(() => console.log(`${branchName.red} failed to be created`))
        })
      );
    })
};

const createBranch = (() => {
  let timeout = 0;

  return (org, repo, sha, branchName) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        makeRequest({
          method: 'post',
          url: `/repos/${org}/${repo}/git/refs`,
          data: {
            ref: `refs/heads/${branchName}`,
            sha,
          }
        })
          .then(resp => resolve(resp))
          .catch(err => reject(err));
      }, timeout);
      timeout += 500;
    });
  };
});

const getRef = (org, repo) => {
  return makeRequest({
    method: 'get',
    url: `/repos/${org}/${repo}/git/refs/heads/master`,
  })
    .then(({ data }) => data.object.sha)
    .catch(handleError);
};

module.exports = createBranches;
