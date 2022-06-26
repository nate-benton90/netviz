# How-to et al.

* First things first, let's setup the environment:
1) Run `npm install @pulumi/digitalocean`.
2) If you don't have NPM, go download/configure for your machine.
3) Generate API token and set on machine with: `pulumi config set digitalocean:token XXXXXXXXXXXXXX --secret`.
4) If you're really wild, go ahead with running: `pulumi up -y` (doing this will automatically preview and
then apply your edits).


* As much as I sometimes dislike doing this, let's establish the (unit) testing framework:
1) Run: `npm install mocha @types/mocha ts-node`.
2) ...

* How to destroy everything and provision it again (correctly and completely):
1) `pulumi destroy -y`.
2) Wait for Pulumi output to indicate that all resources have stopped and been destoyed...
3) `pulumi up -y`.
4) Wait for all Pulumi-provisioned resources to start and become available...
5) Configure your local machine (and `kubectl`) for auth against the new K8s node by following DigitalOcean steps provided in the console.
6) Configure CircleCI to communicate with K8s node by copying/inserting auth info as enviroment variables.
7) Re-create K8s resources provided in the tutorial via your local.

* Updating, using, & testing for the K8s platform:
1) Exposing/accessing a given (pod)app from your local machine via: `kubectl port-forward nginx-app-76c6cf4ccc-z2rmd 30000:80`.
2) Use local browser with `127.0.0.1:30000` or `cURL` with same parameters to verify changes or current state of HTML page.
3) ...

* Rando segments to add/test on K8s platform
1) Promethius+Grafana >>> `helm repo add prometheus-community https://prometheus-community.github.io/helm-charts` & `helm repo add grafana https://grafana.github.io/helm-charts`.
2) ...


* K8s verification/monitoring commands:
1) `kubectl get all`.
2) ...