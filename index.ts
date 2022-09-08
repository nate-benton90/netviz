import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";
import { hostname } from "os";

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
export const cluster = new digitalocean.KubernetesCluster("do-cluster", {
  region: digitalocean.Region.NYC3,
  version: digitalocean.getKubernetesVersions().then(p => p.latestVersion),
  nodePool: {
      name: "main-pool",
      size: digitalocean.DropletSlug.DropletS1VCPU2GB,
      nodeCount: 1,
  },
});

// function GetValue<T>(output: Output<T>) {
//     return new Promise<T>((resolve, reject)=>{
//         output.apply(value=>{
//             resolve(value);
//         });
//     });
// }

// export const endpoint1 = cluster.ipv4Address.apply(v => `${v}`);
// console.log(endpoint1)

export const foo = cluster.ipv4Address.apply(ipv4Address => console.log(ipv4Address))

// adds domain stuff for ingress resource
export const mainK8sDomainFoo = new digitalocean.Domain("domain-nonsense", {
    name: "foodoowho2.whatcd",
    ipAddress: pulumi.interpolate`${foo}`,
},{ dependsOn: [cluster] });
