# Custom UI build

https://github.com/ursakacar/scripts-and-scraps/tree/master/ui-builds

1. Save both files in the same folder
1. Make **ui-build-script.sh** executable by opening the terminal and running `chmod +x ./ui-build-script.sh` from the folder both files are saved in
1. In **build-script-variables.txt** specify the name of the folder you want the script to create and for which UI branch you want to build the extension
1. Run `./ui-build-script.sh` from the terminal
1. Script takes a while to run. A new folder will be created, as specified in **build-script-variables.txt**, builds will be located in **adblockpluschrome** subfolder

** DISCLAIMER: ** abpui/adblockpluscore and abpui/adblockpluschrome are currently set to private (to not confuse outsiders), so you obviously need access first before you'll be able to clone them.


```yml title=build-script-variables.txt
export foldername="abp-release-2019-3"
export uibranch="release-2019-3"
```

modified from [.gitlab-ci.yml](https://gitlab.com/eyeo/adblockplus/abpui/adblockplusui/-/blob/master/.gitlab-ci.yml)

```bash title=ui-build-script.sh lineNumbers=true
#!/bin/bash

source build-script-variables.txt

mkdir $foldername
cd $foldername

git clone git@gitlab.com:eyeo/adblockplus/abpui/adblockpluschrome.git

cd adblockpluschrome
git clone git@gitlab.com:eyeo/adblockplus/buildtools.git
git clone git@gitlab.com:eyeo/adblockplus/abpui/adblockpluscore.git
git clone git@gitlab.com:eyeo/adblockplus/abpui/adblockplusui.git

cd adblockplusui
git checkout $uibranch

npm install
npm run dist
cd ../buildtools
npm install
cd ..

checkout_correct_commit (){
    # If adblockpluschrome has a matching branch use the matching branch instead of master
    IFS=$'\n';
    for HEADS in $(git --git-dir $1 log --pretty=format:%D origin/master..HEAD | sed "/^$/d"); do
      IFS=$', ';
      for HEAD in $HEADS; do
        # Skip special ref HEAD since it will always be present
        if [[ $HEAD == *"HEAD"* ]]; then
          continue;
        fi
        # Strip ref e.g. ref/branch => branch
        export HEAD=$(echo $HEAD | sed "s/[^\/]\+\///g");
        if [ $(git rev-parse --quiet --verify origin/$HEAD) ]; then
          git reset --hard origin/$HEAD;
          break 2;
        fi
      done
    done
    echo $(git status)
    # Include resulting HEAD in debug output
    git log --oneline HEAD^..
}

checkout_correct_commit "./adblockplusui/.git"
cd adblockpluscore
checkout_correct_commit "../adblockplusui/.git"
cd ..

export REPOSITORY_ROOT_URL_ESCAPED=$(echo http://gitlab.com/eyeo/adblockplus/abpui/adblockplusui.git/ | sed -e 's/[\/&]/\\&/g')
cd adblockplusui
export UI_COMMIT=$(git log --pretty=format:'%h' -n 1)
cd ..
cd adblockpluscore
export CORE_COMMIT=$(git log --pretty=format:'%h' -n 1)
cd ..

# Tweak dependencies to automagically use the current UI & core version
sed -i -E "s/(_root = hg:[^ ]+ git:)([^ ]+)/\1$REPOSITORY_ROOT_URL_ESCAPED/g" dependencies
sed -i -E "s/(adblockpluscore = adblockpluscore hg:[[:alnum:]]{12} git:)([[:alnum:]]{7})/\1${CORE_COMMIT:0:8}/g" dependencies
sed -i -E "s/(adblockplusui = adblockplusui hg:[[:alnum:]]{12} git:)([[:alnum:]]{7})/\1${UI_COMMIT:0:8}/g" dependencies

pip install cryptography==2.2.2 Jinja2==2.10 tox==3.0.0 PyYAML==3.12 urllib3==1.22
npm install

# Build ABP
./build.py devenv -t gecko
./build.py devenv -t chrome
./build.py build -t gecko adblockplus-firefox.xpi
./build.py build -t chrome adblockplus-chrome.zip

```

# Building UI one command at a time

Added this for easier debugging, since some folks had issues with running the **UI-build-script.sh**

1. Run the following commands one by one, which will copy all the necessary repositories, checkout the correct branch in the UI and run npm install where needed

```yml title=ui-build-commands.txt
git clone git@gitlab.com:eyeo/adblockplus/abpui/adblockpluschrome.git
cd adblockpluschrome
git clone git@gitlab.com:eyeo/adblockplus/buildtools.git
git clone git@gitlab.com:eyeo/adblockplus/abpui/adblockpluscore.git
git clone git@gitlab.com:eyeo/adblockplus/abpui/adblockplusui.git
cd adblockplusui
git checkout release-2019-4
npm install
npm run dist
cd ../buildtools
npm install
cd ..
```

2. Copy the **tweak-dependencies.sh** file in the **adblockpluschrome** folder
3. Make it executable with `chmod +x ./tweak-dependencies.sh` (this script does not download or install anything, it just checkouts corrects commits and tweaks the dependency file)
4. Run the script and install dependencies:

```yml title=ui-build-commands.txt
./tweak-dependencies.sh
pip install cryptography==2.2.2 Jinja2==2.10 tox==3.0.0 PyYAML==3.12 urllib3==1.22
npm install
```

5. Build the extension by one of the following commands
```yml title=ui-build-commands.txt
./build.py devenv -t gecko
./build.py devenv -t chrome
./build.py build -t gecko adblockplus-firefox.xpi
./build.py build -t chrome adblockplus-chrome.zip
``` 


```bash title=tweak-dependencies.sh lineNumbers=true
#!/bin/bash

checkout_correct_commit (){
    # If adblockpluschrome has a matching branch use the matching branch instead of master
    IFS=$'\n';
    for HEADS in $(git --git-dir $1 log --pretty=format:%D origin/master..HEAD | sed "/^$/d"); do
      IFS=$', ';
      for HEAD in $HEADS; do
        # Skip special ref HEAD since it will always be present
        if [[ $HEAD == *"HEAD"* ]]; then
          continue;
        fi
        # Strip ref e.g. ref/branch => branch
        export HEAD=$(echo $HEAD | sed "s/[^\/]\+\///g");
        if [ $(git rev-parse --quiet --verify origin/$HEAD) ]; then
          git reset --hard origin/$HEAD;
          break 2;
        fi
      done
    done
    echo $(git status)
    # Include resulting HEAD in debug output
    git log --oneline HEAD^..
}

checkout_correct_commit "./adblockplusui/.git"
cd adblockpluscore
checkout_correct_commit "../adblockplusui/.git"
cd ..

export REPOSITORY_ROOT_URL_ESCAPED=$(echo http://gitlab.com/eyeo/adblockplus/abpui/adblockplusui.git/ | sed -e 's/[\/&]/\\&/g')
cd adblockplusui
export UI_COMMIT=$(git log --pretty=format:'%h' -n 1)
cd ..
cd adblockpluscore
export CORE_COMMIT=$(git log --pretty=format:'%h' -n 1)
cd ..

# Tweak dependencies to automagically use the current UI & core version
sed -i -E "s/(_root = hg:[^ ]+ git:)([^ ]+)/\1$REPOSITORY_ROOT_URL_ESCAPED/g" dependencies
sed -i -E "s/(adblockpluscore = adblockpluscore hg:[[:alnum:]]{12} git:)([[:alnum:]]{7})/\1${CORE_COMMIT:0:8}/g" dependencies
sed -i -E "s/(adblockplusui = adblockplusui hg:[[:alnum:]]{12} git:)([[:alnum:]]{7})/\1${UI_COMMIT:0:8}/g" dependencies
```
