// ozoneWall.js — Ozone Shield Block

print("Ozone Shield Block Script Started");

var OzoneShieldBlock;

Events.on(ContentInitEvent, function() {

    OzoneShieldBlock = extend(PowerBlock, "pluscontent-ozone-shield", {

        buildType: () => extend(PowerBlock.PowerBuild, {

            updateTile(){
                this.super$updateTile();
                // push logic is in separate push script
            },

            canPlaceOn(tile){
                for(var dx = 0; dx < this.block.size; dx++){
                    for(var dy = 0; dy < this.block.size; dy++){
                        var t = Vars.world.tile(this.tile.x + dx, this.tile.y + dy);
                        if(!t || t.block() != Blocks.air) return false;
                    }
                }
                return true;
            }
        })
    });

    // Core block properties:
    OzoneShieldBlock.size = 3;
    OzoneShieldBlock.health = 4000;
    OzoneShieldBlock.category = Category.defense;

    OzoneShieldBlock.requirements = ItemStack.with(
        Items.copper, 150,
        Items.lead, 100
    );

    OzoneShieldBlock.buildTime = 120;

    // ⚡ POWER — Properly declare a power consumer
    OzoneShieldBlock.hasPower = true;
    OzoneShieldBlock.consumes.power(3); // ✅ correct method

    OzoneShieldBlock.buildVisibility = BuildVisibility.shown;
    OzoneShieldBlock.alwaysUnlocked = true;
    OzoneShieldBlock.envEnabled = Env.any;

    OzoneShieldBlock.localizedName = "Ozone Shield";
    OzoneShieldBlock.description = "Pushes enemies and bullets in a 5x5 area when powered.";

    print("Ozone Shield Block Initialized");
});