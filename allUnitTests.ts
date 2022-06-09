// most this copied/reset from here >>> https://www.pulumi.com/docs/guides/testing/unit/

import * as pulumi from "@pulumi/pulumi";

pulumi.runtime.setMocks({
    newResource: function(args: pulumi.runtime.MockResourceArgs): {id: string, state: any} {
        return {
            id: args.inputs.name + "_id",
            state: args.inputs,
        };
    },
    call: function(args: pulumi.runtime.MockCallArgs) {
        return args.inputs;
    },
});

describe("Infrastructure", function() {
    let infra: typeof import("./index");

    before(async function() {
        // It's important to import the program _after_ the mocks are defined.
        infra = await import("./index");
    })

    describe("#server", function() {
      // check 1: Instances have a Name tag.
it("must have a name tag", function(done) {
    pulumi.all([infra.mainDroplet.image]).apply(([image]) => {
        if (!image || image!="ubuntu-18-04-x64") {
            done(new Error(`Image type mismatch from correct value of "ubuntu-18-04-x64"`));
        } else {
            done();
        }
    });
});  
    });

    describe("#group", function() {
        
    });
});