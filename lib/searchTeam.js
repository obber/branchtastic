const _ = require('lodash');

const makeRequest = require('./request');
const handleError = require('./handleError');

const searchTeam = (org, team) => {
  console.log(`retrieving team id for ${team}...`);

  return new Promise((resolve, reject) => {
    const found = (id) => {
      resolve(id);
    }

    const notFound = () => {
      reject('team not found');
    }

    searchNextPage(org, team)
      .then(processTeam(org, team, found, notFound))
      .catch(handleError);
  });
};

const processTeam = (org, team, found, notFound) => {
  return ({ data }) => {
    if (data.length === 0) {
      return notFound();
    }

    let results = _.filter(data, individualTeam => individualTeam.name.includes(team));

    if (results.length > 0) {
      found(results[0].id);
    } else {
      searchNextPage(org, team)
        .then(processTeam(org, team, found, notFound))
        .catch(handleError);
    }
  };
};

const searchNextPage = (() => {
  let page = 1;

  return (org, team) => {
    const r = makeRequest({
      url: `/orgs/${org}/teams`,
      method: 'get',
      params: { page },
    });
    page++;
    return r;
  }
})();


module.exports = searchTeam;
