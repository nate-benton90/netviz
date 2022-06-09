import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";

const mainDroplet = new digitalocean.Droplet("mainFooDooVm", {
    image: "ubuntu-18-04-x64",
    region: "nyc1",
    size: "s-1vcpu-1gb",
});
