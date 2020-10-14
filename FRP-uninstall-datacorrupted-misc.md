# FRP


### Trigger FRP on every reload
In `background.js` in `detectFirstRun` fn, comment out everything and set `firstRun = true`

### Timeout

`timeout = setTimeout(onTimeout, 3000)`

Change to a lower number to trigger timeout and get local FRP. 

**note!** on virtual envs connection can be so horribly slow, that the number should be bumped up to around ~8000, otherwise it always timesout

### copy-paste for your convenience

```
// original
defaults.remote_first_run_page_url = "https://welcome.adblockplus.org/%LANG%/installed?an=%ADDON_NAME%&av=%ADDON_VERSION%&ap=%APPLICATION_NAME%&apv=%APPLICATION_VERSION%&p=%PLATFORM_NAME%&pv=%PLATFORM_VERSION%";
// invalid cert
// defaults.remote_first_run_page_url = "https://expired.badssl.com"
// domain does not exist
// defaults.remote_first_run_page_url = "http://thispagedoesnoexist.si/"
// page does not exist
// defaults.remote_first_run_page_url = "https://adblockplus.org/pagedoesnotexist"
// server timeout
// defaults.remote_first_run_page_url = "http://httpbin.org/delay/10"
```

# Uninstall /FRP params

https://issues.adblockplus.org/ticket/7153

| name        | abbreviation           |
| ------------- |:-------------:|
| addonName	| an |
| addonVersion | av |
| application | ap |
| applicationVersion | apv |
| platform | p |
| platformVersion | pv |
| notificationDownloadCount | ndc |
| corrupted | c |

for example: `lang=en-US&an=adblockpluschrome&av=3.8&ap=chrome&apv=80.0.3987.87&p=chromium&fv=20200225&pv=80.0.3987.87&ndc=2&c=0&s=3`

# Data corruption

In `background.js` after `let dataCorrupted = false`, paste `setDataCorrupted(true)`


# MISC

`browser.storage.local.get().then(console.log)`

`setInterval(() => fetch("ad.js"), 200)`

https://badssl.com/
