import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";

// server for anything
// export const mainDroplet = new digitalocean.Droplet("mainFooDooVm", {
//     image: "ubuntu-18-04-x64",
//     region: digitalocean.Region.NYC1,
//     size: "s-1vcpu-1gb",
// });

// default junk firewall
export const webFirewall = new digitalocean.Firewall("mainDFirewall", {
  inboundRules: [
      {
          protocol: "tcp",
          portRange: "80",
          sourceAddresses: [
              "0.0.0.0/0",
          ],
      },
      {
          protocol: "tcp",
          portRange: "443",
          sourceAddresses: [
              "0.0.0.0/0",
          ],
      },
  ],
  outboundRules: [
      {
          protocol: "tcp",
          portRange: "80",
          destinationAddresses: [
              "0.0.0.0/0",
          ],
      },
  ],
});

// junk k8s cluster
const cluster = new digitalocean.KubernetesCluster("do-cluster", {
  region: digitalocean.Region.NYC3,
  version: digitalocean.getKubernetesVersions().then(p => p.latestVersion),
  nodePool: {
      name: "main-pool",
      size: digitalocean.DropletSlug.DropletS1VCPU2GB,
      nodeCount: 1,
  },
});
