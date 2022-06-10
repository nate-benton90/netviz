import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";

// server for anything
export const mainDroplet = new digitalocean.Droplet("mainFooDooVm", {
    image: "ubuntu-18-04-x64",
    region: digitalocean.Region.NYC1,
    size: "s-1vcpu-1gb",
});

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
// export const cluster = new digitalocean.KubernetesCluster("pool-bp4h5quyy", {
//   region: digitalocean.Region.NYC1,
//   version: "latest",
//   nodePool: {
//       name: "pool-bp4h5quyy",
//       size: digitalocean.DropletSlug.Droplet1GB,
//       nodeCount: 1,
//   },
// });
