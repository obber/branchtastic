#Branchtastic

##Setup

###Install Dependencies
```bash
yarn || npm install
```

###Acquire Github Token

1. Log in to github
2. Click on settings
3. Click on Developer settings (located towards the bottom of the sidebar)
4. Create a personal access token
	* Enable repo && admin::org
5. Copy token

###Set Up Environment Variable
From the root directory, run the following command.

```bash
touch config.js
nano config.js
```

Copy the following code into config.js

```javascript
const github_token = "PERSONAL_ACCESS_TOKEN"

module.exports = {
	github_token
}
```

###Create Branches
From the root directory, run the following command.

```bash
yarn start || npm start
```

```bash
Github organization: hackreactor
Team name: hrlaXX
Repository name: hrlaXX-SPRINT
```