// ozoneWall.js — Ozone Shield Block

print("Ozone Shield Block Script Started");

// ozoneWall.js - Safe, won’t crash
Events.on(ContentInitEvent, function() {

    var OzoneShieldBlock = extend(PowerBlock, "pluscontent-ozone-shield", {
        buildType: function() {
            return extend(PowerBlock.PowerBuild, {
                updateTile: function() {
                    this.super$updateTile();

                    // Example: only push if powered
                    if(this.power.status > 0){
                        // push logic handled separately
                        // can call pushUnits(this.x, this.y, 5) or similar
                    }
                }
            });
        }
    });

    // --- Basic properties ---
    OzoneShieldBlock.size = 3;
    OzoneShieldBlock.health = 4000;
    OzoneShieldBlock.category = Category.defense;
    OzoneShieldBlock.requirements = ItemStack.with(
        Items.copper, 150,
        Items.lead, 100
    );
    OzoneShieldBlock.buildTime = 120;
    OzoneShieldBlock.buildVisibility = BuildVisibility.shown;
    OzoneShieldBlock.alwaysUnlocked = true;
    OzoneShieldBlock.envEnabled = Env.any;

    OzoneShieldBlock.localizedName = "Ozone Shield";
    OzoneShieldBlock.description = "Pushes units and bullets in a 5x5 area when powered.";

    // --- Correct way to add power consumption ---
    OzoneShieldBlock.consumes.power(3);

    print("Ozone Shield Block Initialized Properly");
});