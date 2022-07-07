#! /bin/bash
set -e

# default sha string made from circleci container
COMMIT_SHA1=$CIRCLE_SHA1
export COMMIT_SHA1=$COMMIT_SHA1

# for nginx
envsubst < ./k8s-general/app-deployment.yml > ./k8s-general/app-deployment.yml.out
mv ./k8s-general/app-deployment.yml.out ./k8s-general/app-deployment.yml

# for flask
envsubst < ./k8s-general/app-deployment-flask.yml > ./k8s-general/app-deployment-flask.yml.out
mv ./k8s-general/app-deployment-flask.yml.out ./k8s-general/app-deployment-flask.yml

# for secrete(s) postgres creation 
envsubst < ./k8s-general/db-postgres-values.yml > ./k8s-general/db-postgres-values.yml.out
mv ./k8s-general/db-postgres-values.yml.out ./k8s-general/db-postgres-values.yml

echo "$KUBERNETES_CLUSTER_CERTIFICATE" | base64 --decode > cert.crt

sudo chmod +x ./kubectl
mkdir -p $HOME/bin && cp ./kubectl $HOME/bin/kubectl && export PATH=$PATH:$HOME/bin
echo 'export PATH=$PATH:$HOME/bin' >> ~/.bashrc

# run all k8s manifests files for objects mgmt
kubectl \
  --kubeconfig=/dev/null \
  --server=$KUBERNETES_SERVER \
  --certificate-authority=cert.crt \
  --token=$KUBERNETES_TOKEN \
  apply -f ./k8s-general/
