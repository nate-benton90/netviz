import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";

// server for anything
export const mainDroplet = new digitalocean.Droplet("mainFooDooVm", {
    image: "ubuntu-18-04-x64",
    region: digitalocean.Region.NYC1,
    size: "s-1vcpu-1gb",
});

// junk k8s cluster
export const cluster = new digitalocean.KubernetesCluster("doNetViz", {
  region: digitalocean.Region.NYC1,
  version: "latest",
  nodePool: {
      name: "mainNodePool",
      size: digitalocean.DropletSlug.Droplet1GB,
      nodeCount: 1,
  },
});
