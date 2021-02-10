```
git@gitlab.com:eyeo/adblockplus/abpui/adblockplusui.git
cd adblockplusui
git checkout release-2020-1
git submodule update --init
cd adblockpluschrome
npm install
npx gulp devenv -t chrome
```

...or `npx gulp build -t chrome -c development`

### Deprecated

Before abpchrome was moved to the abpui repository (before release 3.11) the building process was the following:

Not written by me, but by Adilson Sandoval, copied from https://gitlab.com/-/snippets/2058604, but saving it here so I have all the notes in one place.

My recommendation is to have origin git remote pointing to webext, so let's fetch all the repos from them:

```
git clone git@gitlab.com:eyeo/adblockplus/adblockpluschrome.git
cd adblockpluschrome
git submodule update --init --recursive
npm install
```

be careful to not skip git submodule update `--init --recursive` as it would end up in an endless loop while trying `npm install`.
If we are happy making modifications on top of the last commit of webext abpui, we can proceed with them and run `npx gulp build -t chrome -c development`.

Otherwise, if we want to work with a specific branch of our abpuirepo (for example release-2020-1). Then add our repo as a new remote:

```
cd adblockplusui
git remote add abpui git@gitlab.com:eyeo/adblockplus/abpui/adblockplusui.git
git fetch abpui
git checkout abpui/release-2020-1
# optionally we can create a local branch based on the remote: git checkout -b release-2020-1
# if package.json was modified, we need: npm install, otherwise omit it
```

Make any modifications in the abpui repo, no need to commit.
Go back to abpchrome.

```
cd ..
Optionally, if we want to use a branch of our abpchrome fork:
git remote add abpui git@gitlab.com:eyeo/adblockplus/abpui/adblockpluschrome.git
git fetch abpui
git checkout abpui/release-2020-1
# again, optionally we can create a local branch based on the remote: git checkout -b release-2020-1
# if package.json was modified, we need: npm install, otherwise omit it.
```

Then create the build with `npx gulp build -t chrome -c development` and it should respect the changes in our working directories.
