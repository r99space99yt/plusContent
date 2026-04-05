var OzoneBlock;

Events.on(ContentInitEvent, function(){

    OzoneBlock = extend(Wall, "pluscontent-ozone-block", {

        buildType: () => extend(Wall.WallBuild, {

            updateTile(){
                this.super$updateTile();

                // Only push if powered
                if(!this.power || this.power.status <= 0.0001) return;

                var cx = this.x;
                var cy = this.y;

                // Shield size = 4x4 tiles around block
                var shieldSize = 4; 
                var halfShield = shieldSize / 2;

                // Get shield area coordinates
                var startX = cx - 1; // 2x2 block center ~ push area
                var startY = cy - 1;

                Units.near(cx*8, cy*8, shieldSize*8, function(u){
                    // Check if unit is inside 4x4 shield square
                    if(u.x >= startX*8 && u.x <= (startX + shieldSize)*8 &&
                       u.y >= startY*8 && u.y <= (startY + shieldSize)*8){

                        // Push unit away from block center
                        var dx = u.x - (cx*8 + 4); // center offset
                        var dy = u.y - (cy*8 + 4);
                        var dist = Math.sqrt(dx*dx + dy*dy);

                        if(dist > 0){
                            var push = 0.2; // adjust push strength
                            u.vel.x += dx / dist * push;
                            u.vel.y += dy / dist * push;
                        }
                    }
                });
            }
        })
    });

    // ===== PROPERTIES =====
    OzoneBlock.size = 2; // 2x2 block
    OzoneBlock.health = 4000;
    OzoneBlock.category = Category.defense;

    OzoneBlock.requirements = ItemStack.with(
        Items.copper, 150,
        Items.lead, 100
    );

    OzoneBlock.buildTime = 120;

    // ⚡ POWER
    OzoneBlock.hasPower = true;
    OzoneBlock.consumePower(3);

    OzoneBlock.buildVisibility = BuildVisibility.shown;
    OzoneBlock.alwaysUnlocked = true;
});