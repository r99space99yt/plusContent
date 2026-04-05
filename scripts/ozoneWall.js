// ozoneWall.js — Ozone Shield Block

print("Ozone Shield Block Script Started");

// ozoneWall.js
const OzoneShieldBlock = extend(PowerBlock, "ozone-shield", {
    // Build type defines the behavior of each placed block
    buildType: function () {
        return extend(PowerBlock.PowerBuild, {
            updateTile: function () {
                this.super$updateTile();

                // Only push if block has power
                if (this.power.status > 0) {
                    // Call the separate push logic
                    OzonePushLogic.push(this);
                }
            }
        });
    },

    // Set block stats
    health: 600,
    size: 2,
    requirements: ItemStack.with(Items.copper, 50, Items.graphite, 30),
    category: Category.effect,
    buildVisibility: BuildVisibility.shown,

    // Proper way to declare power consumption
    consumes: [Consume.power(3)]
});