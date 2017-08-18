const prompt = require('prompt-sync')();

const searchCohort = require('./searchCohort');
const getMembers = require('./getMembers');
const createBranches = require('./createBranches');

console.log('Let\'s create some branches.');
console.log('...');
console.log('...');
const org = prompt('Github organization: ');
const cohort = prompt('Cohort name: ');
const repo = prompt('Repository name: ');

searchCohort(org, cohort)
  .then((teamId) => {
    return getMembers(teamId);
  })
  .then((members) => {
    console.log('creating branches...');
    return createBranches(members, org, repo);
  })
  .then(() => {
    console.log('created branches!');
  })
  .catch(() => {
    console.error('failed to create branches.');
  })
