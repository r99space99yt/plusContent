// ozoneWall.js — Ozone Shield Block
print("Ozone Shield Block Script Started");

var OzoneShieldBlock;

Events.on(ContentInitEvent, function() {

    OzoneShieldBlock = extend(PowerBlock, "pluscontent-ozone-shield", {

        buildType: () => extend(PowerBlock.PowerBuild, {

            updateTile(){
                this.super$updateTile();
                // Push logic handled separately in OzoneShieldPush.js
            },

            // Optional: Can add placement rules if needed
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

    // ===== Block Properties =====
    OzoneShieldBlock.size = 3;  // 3x3 block to match 5x5 push area
    OzoneShieldBlock.health = 4000;
    OzoneShieldBlock.category = Category.defense;

    OzoneShieldBlock.requirements = ItemStack.with(
        Items.copper, 150,
        Items.lead, 100
    );

    OzoneShieldBlock.buildTime = 120;

    // ⚡ Power
    OzoneShieldBlock.hasPower = true;
    OzoneShieldBlock.consumePower(3); // MUST be called as method

    OzoneShieldBlock.buildVisibility = BuildVisibility.shown;
    OzoneShieldBlock.alwaysUnlocked = true;
    OzoneShieldBlock.envEnabled = Env.any;

    // UI Info
    OzoneShieldBlock.localizedName = "Ozone Shield";
    OzoneShieldBlock.description = "Pushes enemies and bullets in a 5x5 area when powered.";

    print("Ozone Shield Block Initialized");
});