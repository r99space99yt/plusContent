// ozoneWall.js — Ozone Shield Block

print("Ozone Shield Block Script Started");

var OzoneShieldBlock;

Events.on(ContentInitEvent, function() {

    // Create the power block
    OzoneShieldBlock = extend(PowerBlock, "pluscontent-ozone-shield", {
        buildType: function() {
            return extend(PowerBlock.PowerBuild, {
                updateTile: function() {
                    this.super$updateTile();
                    // Push handled in separate script
                }
            });
        }
    });

    // Block properties
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

    // --- Proper consumes setup ---
    OzoneShieldBlock.hasPower = true;

    // This is the safe place to declare consumes
    OzoneShieldBlock.consumes.power(3);

    print("Ozone Shield Block Initialized Properly");
});