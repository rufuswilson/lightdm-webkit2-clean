# Clean - Lightdm-webkit2-greeter theme


This is a clean Lightdm-webkit2-greeter theme. The default one for antergos is slightly too buggy for me and I don't like clicking too much.


## Requirements
None


## How to install
1. Open a terminal in the folder where the files are stored
2. Create a folder: `# sudo mkdir /usr/share/lightdm-webkit/themes/clean`
3. Copy everything in there: `# sudo cp *.* /usr/share/lightdm-webkit/themes/clean/`
4. Change ownership of everything: `# sudo chown -R root:root /usr/share/lightdm-webkit/themes/clean`
5. Change ownership of everything: `# sudo chmod -R 755 /usr/share/lightdm-webkit/themes/clean`
6. Edit `webkit-theme` entry in `/etc/lightdm/lightdm-webkit2-greeter.conf` : `# sudo sed -i.bak -e's#webkit-theme[ \t]*=[ \t]*.*#webkit-theme = clean#g' /etc/lightdm/lightdm-webkit2-greeter.conf`


