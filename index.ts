import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";

// replacement k8s firewall
export const webFirewall = new digitalocean.Firewall("mainK8sFirewall", {
  inboundRules: [
      {
          protocol: "tcp",
          portRange: "30000",
          sourceAddresses: [
              "0.0.0.0/0",
          ],
      },
      {
          protocol: "tcp",
          portRange: "5432",
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
      {
        protocol: "tcp",
        portRange: "443",
        destinationAddresses: [
            "0.0.0.0/0",
        ],
    },
  ],
});

// main k8s cluster
const cluster = new digitalocean.KubernetesCluster("do-cluster", {
  region: digitalocean.Region.NYC3,
  version: digitalocean.getKubernetesVersions().then(p => p.latestVersion),
  nodePool: {
      name: "main-pool",
      size: digitalocean.DropletSlug.DropletS1VCPU2GB,
      nodeCount: 1,
  },
});
