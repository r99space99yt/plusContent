// ozoneWall.js — Ozone Shield Block

print("Ozone Shield Block Script Started");

var OzoneShieldBlock;

Events.on(ContentInitEvent, function() {

    // Create a power block
    OzoneShieldBlock = extend(PowerBlock, "pluscontent-ozone-shield", {
        buildType: () => extend(PowerBlock.PowerBuild, {
            updateTile() {
                this.super$updateTile();
                // The actual push is handled in ozoneWallPush.js
            }
        })
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

    // Power
    OzoneShieldBlock.hasPower = true;
    OzoneShieldBlock.consumes.power(3); // correct place for consumes.power

    print("Ozone Shield Block Initialized");
});