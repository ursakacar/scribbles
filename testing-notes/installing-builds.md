# Installing builds

### Chrome and Opera

1. Unpack the zip archive somewhere,
1. Go to `chrome://extensions/`
1. enable Developer mode 
1. Load the unpacked extension from the folder you unpacked it to previously.

### Firefox

**Latest firefox:**

1. Navigate to `about:debugging`
1. Note: "Use This Firefox to debug extensions and service workers on this version of Firefox.""
1. Click on "This Firefox"
1. Click on "Load temporary addon" button
1. Select the manifest (if unpacked build) or .xpi file

**Older Firefox versions:**

1. Navigate to `about:debugging`
1. Click on the Load temporary addon button
1. Select the the manifest or .xpi file

**note:** this installs the temporary build, if you need to test persistent features/restart, see [Testing Firefox browser restart with ABP development build](#Testing-Firefox-browser-restart-with-ABP-development-build)

### *(deprecated)* Edge

1. Go to about:flags and check the "Enable extension developer features" checkbox.
1. Open the Edge extensions page load the unpacked extension
1. Navigate to the extracted folder and select the “Extension” folder


### Testing Firefox browser restart with ABP development build

Link to article: https://extensionworkshop.com/documentation/develop/testing-persistent-and-restart-features/

In Firefox, unsigned development builds can only be loaded as temporary extensions, with temporary ID's, that get discarded once the browser is closed. In order to test restart behavior, we need to resolve to some trickery.

**Steps**
1. Get Firefox Nightly or Developer build
1. Navigate to `about:config` and set `xpinstall.signatures.required` to `false`
1. Download and extract Firefox .xpi development build
1. In `manifest.json` file, add an add-on ID
```python
"browser_specific_settings": {
  "gecko": {
    "id": "addon@example.com"
  }
},
```
* Zip the extension
* Go to `about:addons` and load the .zip file of the extension

## UI nightly builds

https://wspee.gitlab.io/adblockplusui-nightlies/

`release-2019-2.1 (494ad677)` signifies the build for commit `494ad677` in `release-2019-2.1`
