All this should be done on non-master branch, don't forget to run `npm install` beforehand.

# Crowdin and XTM

See: https://gitlab.com/eyeo/adblockplus/abpui/adblockplusui/-/wikis/utilities

# Crowdin

1. Convince someone (= probably the translation manager) to add you to our Crowdin's test project
1. Make sure you have crowdin CLI installed: https://support.crowdin.com/cli-tool/
1. Clone adblockplusui (obviously), checkout branch (it has to be different than master), run npm install
1. Make changes to en-US translation files
1. Go to crowdin, open your profile settings, and navigate to the API tab, generate new personal access token (you only need to do this once)
1. Go to the settings of the test project and copy the project ID from the API tab
1. Replace crowdin.yml file with the following (replace the entire file):

```yml title=crowdin.yml lineNumbers=true

"project_id" : "replace-with-project-id"
"project_identifier" : "this-is-very-much-a-test-proje"
"api_token" : "replace-with-your-personal-token"

"base_path" : "./locale"

"preserve_hierarchy": false

"files": [
  {
    "ignore": [
      "/en_US/updates.json",
      "/en_US/updates-latest.json"
    ],
    "source" : "/en_US/*.json",
    "translation" : "/%two_letters_code%/%original_file_name%"
  }
]
```

8. Now you should be able to run crowdin scripts:

`npm run $ crowdin.upload-strings`

`npm run $ crowdin.upload-translations`

`npm run $ crowdin.download-translations`

9. **crowdin CLI**

`wget -qO - https://artifacts.crowdin.com/repo/GPG-KEY-crowdin | sudo apt-key add -`
Using the following command, create the crowdin.list file in the /etc/apt/sources.list.d directory:

`content_copyecho "deb https://artifacts.crowdin.com/repo/deb/ /" > /etc/apt/sources.list.d/crowdin.list`
And your repository is ready for use. You can install the Crowdin CLI Debian package with:

`content_copysudo apt-get update && sudo apt-get install crowdin3`

# XTM

XTM related tickets that might be helpful:
https://gitlab.com/eyeo/adblockplus/abpui/adblockplusui/-/issues/656
https://gitlab.com/eyeo/adblockplus/abpui/adblockplusui/-/issues/122
https://gitlab.com/eyeo/adblockplus/abpui/adblockplusui/-/issues/631

### Instructions

1. Convince someone (= probably the translation manager) to add you to our XTM test server
1. Clone adblockplusui (obviously), checkout branch (it has to be different than master), run npm install
1. Make changes to en-US translation files
1. Log in to XTM server to obtain your User ID, and the ID of the project (translation) manager
	* ID's can be found under Users tab, by hovering on user's i icon
1. In build/locale-sync/xtm/config.js, make the following changes:

const restApiUrl = "https://wstest2.xtm-intl.com/rest-api";
const customerId = 12445;
const workflowId = 2926;
const analysisTemplateId = 251759;
const projectManagerId = replace-with-translation-manager-id;
const subjectMatterId = 1058;

1. Now you're ready to run XTM commands. User ID and password are needed (user id can be found under: Users tab -> hover on user's i icon)

`USER_ID=replace-with-your-personal-id CLIENT=eyeo PASSWORD=replace-with-your-personal-password npm run $ xtm.create`
* creates a new project in XTM, project name will be same as branch name
* only changes between master and branch shuld be added to project

`USER_ID=replace-with-your-personal-id CLIENT=eyeo PASSWORD=replace-with-your-personal-password npm run $ xtm.build`
* prepares the XTM project to be downloaded

`USER_ID=replace-with-your-personal-id CLIENT=eyeo PASSWORD=replace-with-your-personal-password npm run $ xtm.download`
* downloads changes you've made in XTM project and update local files accordingly

`USER_ID=replace-with-your-personal-id CLIENT=eyeo PASSWORD=replace-with-your-personal-password npm run $ xtm.details`
* updates project manager and subject matter ID's

2. **Making changes to files:**

Only make changes to `en-US` translation file, as that is the default locale. I usually just add some random words to strings, for example the first message in en-US/common.json:

"add": {
    "description": "This is the label for the 'Add' buttons.",
    "message": "Add"
  },

  I change to:

 "add": {
    "description": "This is the label for the 'Add' buttons.",
    "message": "Changed this message to test XTM"
  },

You can of course do as many changes as you want, you can even add new files, add new messages to .json, etc, depending on what you're testing of course.

Don't forget to add and commit the changes before running any xtm commands
