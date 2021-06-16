# Managed settings

### Some useful links

https://adblockplus.org/development-builds/suppressing-the-first-run-page-on-chrome

#### Chrome extension policies

* Linux: https://support.google.com/chrome/a/answer/7517525?hl=en#zippy=%2Cset-installation-policies-automatically-install-force-install-allow-or-block
* Mac: https://support.google.com/chrome/a/answer/7517624?hl=en&ref_topic=9023246

### What is even?

A simple way to set up managed settings in Chrome, which enable us to disable the first run page, any other pages that are triggered by the extension (such as `updates.html`). We can also define pre-installed subscriptions that can not be removed by the user.

For that, two parameters are used: `additional_subscriptions` and `suppress_first_run_page`

### Linux instructions for supressing FRP

Chrome policies are located in the `/etc/opt/chrome/policies/managed/` folder. If the folder already exists, navigate to it, if it does not, then create it.

For example, if `chrome` folder is not presend in the `/etc/opt`, then:

```
sudo mkdir chrome
cd chrome
sudo mkdir policies
cd policies
sudo mkdir managed
cd managed
```

Once in the `managed` folder, create a new file `abp.json` with command `sudo touch abp.json`. Then open the file in editor and paste the following:

```
{
  "3rdparty": {
    "extensions": {
      "cfhdojbkjhnklbpkdaibdccddilifddb": {
        "suppress_first_run_page": true
      }
    }
  }
}
```

**IMPORTANT!** The ID in the example (`cfhdojbkjhnklbpkdaibdccddilifddb`) is the ID of the latest ABP extension release. In case you are testing with a development build, make sure to change that ID accordingly.

Then open `chrome://policy/` and click **Reload policies** button. Check that the `suppress_first_run_page` policy name with vaue `true` is shown under the Adblock Plus entry.

You're done! Now if you install the ABP extension with the ID that is specified in that .json file, the first run page will not be opened.

If the policy is not updated, triple check that the path of the .json and the extension ID are correct.

### Mac instructions for supressing FRP

TBD

```
<key>ExtensionSettings</key>
<dict>
 <key>cfhdojbkjhnklbpkdaibdccddilifddb</key>
 <dict>
   <key>suppress_first_run_page</key>
   <string>true</string>
 </dict>
</dict>
```