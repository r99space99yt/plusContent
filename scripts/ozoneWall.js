var OzoneBlock;

Events.on(ContentInitEvent, function(){

    OzoneBlock = extend(Wall, "pluscontent-ozone-block", {

        buildType: () => extend(Wall.WallBuild, {

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
    OzoneBlock.size = 2;
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

    // ✅ Make it placable anywhere
    OzoneBlock.buildVisibility = BuildVisibility.shown;
    OzoneBlock.alwaysUnlocked = true;
    OzoneBlock.envEnabled = Env.any; // THIS is important
    print("Loaded wall");
});