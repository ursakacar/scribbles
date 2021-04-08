# Testing notification rollout

Basic instructions on how to push and serve notifications can be found in [notification server](../notification-server.md), but those are a bit more detailed instructions on how to test the rollout release from start to finish.

## Prereq

1. The [notification server](../notification-server.md) has to be set up.
1. Download and upzip the [mercurial patches](./hg-patches), they should be provided by the developer, here the patches for Q4 2020 are linked as an example
1. Save [notification-distribution.sh](https://github.com/ursakacar/scripts-and-scraps/blob/master/notification-distribution/notification-distribution.sh) script locally and make it executable with `chmod +x script-name.sh`

## Get ready to roll(out)

### Set up a local folder for notifications

1. create a new folder locally
1. move the uzipped mercurial patches into the folder
1. open terminal and cd into the folder, created in the first step
1. clone the notification repo: `hg clone ssh://wspee@hg.code.sf.net/p/notifications1/code` (you'll need a password)

### Start the filter server:

1. cd into the `infrastructure` folder and fire up the filter server: `vagrant up filter1` and then `vagrant provision filter1`
1. ssh into the server: `vagrant ssh filter1`
1. cd into the notifications folder `cd /opt/notifications`

### Setup the script:

There are some variables that can be adjusted before running the script:

`numberOfRequests` is the number of requests that the script will make to `https://notification.local/notification.json`, should be between 2000-7000

`notificationId` is the ID of the notification, which are marked with consecutive numbers

`sourceFile` the file where the script will be saving notification versions and nonempty notifications, should be left as is

`resultsFile` the file in which the script will output the result of each run, should be changes with each run, I use the same name as the patch file

`setDists` the set distribution of notification groups

**That's cool, but what does it do?** The script makes a bunch of requests, extracts notification version of each request and calculates what % of all requests fall into which version. It also calculates the % of non-empty notifications, so we can check if it matches with our expectations. Example of the results can be seen in [notification-rollout-test-results](./notification-rollout-test-results).

### Start the rollout

#### What are we even doing?

So, this is what we have to do: Locally apply the first patch and push it to the notification repository. Then ssh to filter1, cd into the notification folder and pull the changes that we just pushed to the notification repository. Then we should run the script (make adjustments to if if needed), and after all that is done, repeat the same steps with second patch, then third patch, and so on until we've dealt with all patches.

The setup that works well for me is to have 3 terminal windows opened- one with the ssh session to the filter1, another one in the local notification folder for applyting patches, and the third one for running the script.

#### Let's apply the workflow above:

1. in the local notifications folder, run `hg pull`, then `hg import path-to-patch.patch` and then `hg push`
1. on the filter server in the notifications folder, run `sudo -u nginx hg pull`
1. in the third window, run the script `./notification-distribution.sh`
1. after the script finishes, edit the `resultsFile` variable in the script, to prevent results being overwritten in the next run
1. **repeat** the above steps for all patches
1. read through result files to see if the numbers add up

**deleting hg files** If you ever find yourself in need to delete a file from Mercurial:

1. `hg remove` <file>
1. `hg commit` (write a commit message and exit the editor)
1. `hg push`

### You're done!

Stop the filter server: `vagrant halt filter1` and you're all done!
