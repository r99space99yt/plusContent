// ozoneWall.js — Ozone Shield Block

print("Ozone Shield Block Script Started");

const Consume = require("mindustry/world/consumers/Consume"); // optional in some JS setups
const ConsumePower = require("mindustry/world/consumers/ConsumePower"); 

const OzoneWall = extend(PowerBlock, "ozone-wall", {
    size: 2,
    health: 600,
    requirements: ItemStack.with(Items.copper, 50, Items.graphite, 30),
    category: Category.effect,
    buildVisibility: BuildVisibility.shown,

    consumes: [new ConsumePower(3)], // <-- fixed

    buildType: function () {
        return extend(PowerBlock.PowerBuild, {
            updateTile: function () {
                this.super$updateTile();

                if (this.power.status > 0) {
                    if (typeof OzonePushLogic !== "undefined") {
                        OzonePushLogic.push(this);
                    }
                }
            }
        });
    }
});