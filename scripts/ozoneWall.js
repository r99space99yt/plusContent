// ozoneWall.js — Ozone Shield Block

print("Ozone Shield Block Script Started");

// ozoneWall.js - Fixed and safe for Mindustry 156.2
Events.on(ContentInitEvent, function() {

    var OzoneShieldBlock = extend(PowerBlock, "pluscontent-ozone-shield", {
        buildType: function() {
            return extend(PowerBlock.PowerBuild, {
                updateTile: function() {
                    this.super$updateTile();
                    // push handled in separate push script
                }
            });
        }
    });

    // --- Properties ---
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

    // --- Safe consumes declaration ---
    OzoneShieldBlock.hasPower = true;
    OzoneShieldBlock.init = function() {
        this.super$init();
        this.consumes.power(3);
    };

    print("Ozone Shield Block Initialized Properly");
});