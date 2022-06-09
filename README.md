First things first, let's setup the environment:
1) Run `npm install @pulumi/digitalocean`.
2) If you don't have NPM, go download/configure for your machine.
3) Generate API token and set on machine with: `pulumi config set digitalocean:token XXXXXXXXXXXXXX --secret`.
4) If you're really wild, go ahead with running: `pulumi up -y` (doing this will automatically preview and
then apply your edits).