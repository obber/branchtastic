const _ = require('lodash');

const makeRequest = require('./request');
const handleError = require('./handleError');

const searchCohort = (org, cohort) => {
  console.log(`retrieving cohort id for ${cohort}...`);

  return new Promise((resolve, reject) => {
    const found = (id) => {
      resolve(id);
    }

    const notFound = () => {
      reject('cohorot not found');
    }

    searchNextPage(org, cohort)
      .then(processCohort(org, cohort, found))
      .catch(handleError);
  });
};

const processCohort = (org, cohort, found, notFound) => {
  return ({ data }) => {
    if (data.length === 0) {
      return notFound();
    }

    let results = _.chain(data)
      .filter(team => team.name.includes(cohort))
      .value();

    if (results.length > 0) {
      found(results[0].id);
    } else {
      searchNextPage(org, cohort)
        .then(processCohort(org, cohort, found))
        .catch(handleError);
    }
  };
};

const searchNextPage = (() => {
  let page = 1;

  return (org, cohort) => {
    const r = makeRequest({
      url: `/orgs/${org}/teams`,
      method: 'get',
      params: { page },
    });
    page++;
    return r;
  }
})();


module.exports = searchCohort;
