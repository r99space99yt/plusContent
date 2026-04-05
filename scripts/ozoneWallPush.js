OzoneShieldBlock = extend(PowerBlock, "pluscontent-ozone-shield", {
    buildType: () => extend(PowerBlock.PowerBuild, {
        updateTile(){
            this.super$updateTile();
            // Push handled by separate script
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
OzoneShieldBlock.hasPower = true;
OzoneShieldBlock.consumePower(3);  // must be called as a method

OzoneShieldBlock.buildVisibility = BuildVisibility.shown;
OzoneShieldBlock.alwaysUnlocked = true;
OzoneShieldBlock.envEnabled = Env.any;

OzoneShieldBlock.localizedName = "Ozone Shield";
OzoneShieldBlock.description = "Pushes enemies in a 5x5 square when powered.";