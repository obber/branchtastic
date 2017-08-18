const prompt = require('prompt-sync')();
const Spinner = require('cli-spinner').Spinner;

const searchTeam = require('./lib/searchTeam');
const getMembers = require('./lib/getMembers');
const createBranches = require('./lib/createBranches');

console.log('Let\'s create some branches. \n');

const org = prompt('Github organization: ');
const team = prompt('Team name: ');
const repo = prompt('Repository name: ');

const spinner = new Spinner(`%s`);
spinner.start();

console.log('\nsearching for team within organization...');
searchTeam(org, team)
  .then((teamId) => {
    console.log('retrieving members...');
    return getMembers(teamId);
  })
  .then((members) => {
    console.log('\ncreating branches for all team members...');
    return createBranches(members, org, repo);
  })
  .then(() => {
    console.log('\ncreated branches!');
    spinner.stop();
  })
  .catch(() => {
    console.error('\nfailed to create branches.');
    spinner.stop();
  })
