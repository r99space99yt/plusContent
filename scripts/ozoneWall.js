// ozoneWall.js — Ozone Shield Block

print("Ozone Shield Block Script Started");

// ozoneWall.js

const OzoneWall = extend(PowerBlock, "ozone-wall", {
    size: 2,
    health: 600,
    requirements: ItemStack.with(Items.copper, 50, Items.graphite, 30),
    category: Category.effect,
    buildVisibility: BuildVisibility.shown,

    consumes: [Consume.power(3)],

    buildType: function () {
        return extend(PowerBlock.PowerBuild, {
            updateTile: function () {
                this.super$updateTile();

                // Only do something if block has power
                if (this.power.status > 0) {
                    // Call the push logic from the separate script
                    if (typeof OzonePushLogic !== "undefined") {
                        OzonePushLogic.push(this);
                    }
                }
            }
        });
    }
});