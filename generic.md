# Generic stuff that I've googled one too many times

### Switching

`alt + tab` is for between apps, `alt + backtick` is for between windows

### TMUX

`alt + a` then either `UDLR` for moving between panels or `h` or `v` to open a new panel. `exit` to close the panel

### Bash'n surf

Deleting directories by regex

`find -name 'report*' -exec rm -rf {} \;`

### Killing a naughty process

- `sudo netstat -lpn | grep :8000`
- `sudo kill -9 PID`

### Start+

- `space` change keyboard layour
- `ctrl + D` hide windows
- `pg up/down` switch workspace
- `pg up/down + shift` move to workspace
- `pg up/down` maximize window
- `A` applications
- `LR or #` split view

### scp on vagrant

`vagrant plugin install vagrant-vbguest`
`vagrant plugin install vagrant-scp`

To get the id and name of the guest VM:

`vagrant global-status`

cp from Vagrant host machine to guest VM:

`vagrant scp local/file/path vm-name:vm/file/path`

cp from guest VM to Vagrant host machine:

`vagrant scp vm-name:vm/file/path local/file/path`
