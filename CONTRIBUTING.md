## Git

### Commit
* Provide a good description of the commit

### Branching model
More details in: http://nvie.com/posts/a-successful-git-branching-model/
* `master`:
   * *Objective*: Bleeding-edge branch. Untested features can be present.
   * *Branch off*: none
   * *Merge back into*: none
   * *Naming*: **fixed to** `master`

### GIT setup
* Config GIT user:

```
git config --global user.name "<YOUR NAME>"
git config --global user.email <YOUR EMAIL ADDRESS>
git config --global push.default simple
```
* Config SSH keys:
   * Create new key: `ssh-keygen -t rsa -C "<comment>"`
   * Copy key to clipboard: `clip < ~/.ssh/id_rsa.pub`
   * Add key to GitLab profile: https://gitlab.com/profile/keys/new
   * Add at the end of OR create new file at `~/.ssh/config`:

```
# Main gitlab.com server
Host gitlab.com
RSAAuthentication yes
User <YOUR USERNAME>
```

* Config SSH keys (continuation)
    * Start SSH-AGENT: `eval $(ssh-agent -s)`
    * Add identity: `ssh-add`
    * Test if working: `ssh -T git@gitlab.com`
   
**NOTE:** *More info on how to start automatically SSH-AGENT with GIT BASH there: https://help.github.com/articles/working-with-ssh-key-passphrases/#auto-launching-ssh-agent-on-msysgit*

### GIT common commands
* Clone full repository in folder named `master`: `git clone git@gitlab.com:cdev/lightdm-webkit2-greeter-clean.git master`
* Clone only `master` branch in folder named `master`: `git clone git@gitlab.com:cdev/lightdm-webkit2-greeter-clean.git --branch master --single-branch master`
* Check what changes have not been committed: `git status`
* Check differences between committed version and current version: `git diff <PATH TO FILE/FOLDER>`
* Add whole file/folder to be committed: `git add <PATH TO FILE/FOLDER>`
* Add partially file/folder to be committed: `git add -p <PATH TO FILE/FOLDER>`
* Commit added changes: `git commit -m '<DESCRIPTION>'`
* Push changes to server: `git push`
