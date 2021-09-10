# Notification server

## Setting up the server

Follow instructions here: https://gitlab.com/eyeo/adblockplus/abpui/adblockplusui/-/wikis/Setup-filter-server-to-test-notifications

&& good luck!

Do not forget to add the line: `10.8.0.120 notification.local` to your `/etc/hosts` (on linux, `/private/etc/hosts` on mac) file.

### Extra steps for mac users

One more line will need to be added to `/etc/hosts/`:

```
0:0:0:0:0:ffff:a08:78  notification.local
```

Make sure the file contains two `notification.local` entries, onw with IPv4 and one with IPv6.

Tool for IP conversions: https://www.ultratools.com/tools/ipv4toipv6Result?address=10.8.0.120

## Notification repo

https://sourceforge.net/p/notifications1/code/ci/default/tree/

Clone it with:

`hg clone ssh://wspee@hg.code.sf.net/p/notifications1/code`

## Testing

You only have to set up all of the painful stuff above once. Then everytime there is a notification with a rolled release to be tested:

cd to infrastructure folder

`vagrant up filter1`

`vagrant provision filter1`

`vagrant ssh filter1`

`cd /opt/notifications`

If you want to watch logs, run: `sudo tail -f /var/log/nginx/*`

Then perform the following loop once per each mercurial patch you have to test:

**LOCALLY**

cd to notifications folder

`hg outgoing`

`hg import path-to-patch.patch` OR `hg commit`

`hg push`

**FILTER1**

`sudo -u nginx hg pull`

Then you can curl https://notification.local/notification.json like a madwoman by running this script:

https://github.com/ursakacar/scripts-and-scraps/blob/master/notification-distribution/notification-distribution.sh

Here for simple copy-paste purposes:

`curl -k --insecure --progress-bar "https://notification.local/notification.json"`

When you're done, stop the server with:

`vagrant halt filter1`

### Testing on browsers

Again, follow the instruction for [testing notifications](notifications.md). The url will therefore be:

`defaults.notificationurl = "https://notification.local/notification.json";`

**! IMPORTANT !** Make sure to allow exceptions for insecure connection to notification.local in all browsers when testing the notification, as notification.local does not have a cert!
