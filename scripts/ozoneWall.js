var OzoneShieldBlock;

Events.on(ContentInitEvent, function(){

    OzoneShieldBlock = extend(Block, "pluscontent-ozone-shield", {

        buildType: () => extend(Block.Build, {

            updateTile(){
                this.super$updateTile();

                if(!this.power || this.power.status <= 0.0001) return;

                var cx = this.x;
                var cy = this.y;

                var shieldSize = 4;
                var startX = cx - 1;
                var startY = cy - 1;
                var endX = startX + shieldSize;
                var endY = startY + shieldSize;

                Units.near(cx*8, cy*8, 32, function(u){
                    var ux = u.x / 8;
                    var uy = u.y / 8;

                    if(ux >= startX && ux <= endX && uy >= startY && uy <= endY){
                        var dx = u.x - (cx*8 + 8);
                        var dy = u.y - (cy*8 + 8);
                        var dist = Math.sqrt(dx*dx + dy*dy);
                        if(dist > 0){
                            var push = 0.2;
                            u.vel.x += dx / dist * push;
                            u.vel.y += dy / dist * push;
                        }
                    }
                });
            }
        })
    });

    // ===== PROPERTIES =====
    OzoneShieldBlock.size = 2;
    OzoneShieldBlock.health = 4000;
    OzoneShieldBlock.category = Category.defense;

    OzoneShieldBlock.requirements = ItemStack.with(
        Items.copper, 150,
        Items.lead, 100
    );

    OzoneShieldBlock.buildTime = 120;

    // ⚡ POWER
    OzoneShieldBlock.hasPower = true;
    OzoneShieldBlock.consumePower(3);

    // ✅ Make it placable
    OzoneShieldBlock.buildVisibility = BuildVisibility.shown;
    OzoneShieldBlock.alwaysUnlocked = true;
    OzoneShieldBlock.envEnabled = Env.any;

    // Optional: preview and info
    OzoneShieldBlock.localizedName = "Ozone Shield";
    OzoneShieldBlock.description = "Pushes enemies in a 4x4 square when powered.";
    OzoneShieldBlock.drawPlace = true;
});