var OzoneShieldBlock;

Events.on(ContentInitEvent, function(){

    OzoneShieldBlock = extend(Block, "pluscontent-ozone-shield", {

        size: 3,            // 3x3 block → placement works naturally
        originOffset: 0,    // top-left of 3x3 tile grid

        buildType: () => extend(Block.Build, {

            updateTile(){
                this.super$updateTile();

                if(!this.power || this.power.status <= 0.0001) return;

                var cx = this.x;
                var cy = this.y;

                var shieldSize = 5;  // 5x5 push area
                var startX = cx - Math.floor(shieldSize / 2);
                var startY = cy - Math.floor(shieldSize / 2);
                var endX = startX + shieldSize;
                var endY = startY + shieldSize;

                Units.near(cx*8, cy*8, 40, function(u){
                    var ux = u.x / 8;
                    var uy = u.y / 8;

                    if(ux >= startX && ux <= endX && uy >= startY && uy <= endY){
                        var dx = u.x - (cx*8 + 12); // +12 for 3x3 center
                        var dy = u.y - (cy*8 + 12);
                        var dist = Math.sqrt(dx*dx + dy*dy);
                        if(dist > 0){
                            var push = 0.25;
                            u.vel.x += dx / dist * push;
                            u.vel.y += dy / dist * push;
                        }
                    }
                });
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

    OzoneShieldBlock.health = 4000;
    OzoneShieldBlock.category = Category.defense;

    OzoneShieldBlock.requirements = ItemStack.with(
        Items.copper, 200,
        Items.lead, 150
    );

    OzoneShieldBlock.buildTime = 120;

    OzoneShieldBlock.hasPower = true;
    OzoneShieldBlock.consumePower(5);

    OzoneShieldBlock.buildVisibility = BuildVisibility.shown;
    OzoneShieldBlock.alwaysUnlocked = true;
    OzoneShieldBlock.envEnabled = Env.any;

    OzoneShieldBlock.localizedName = "Ozone Shield";
    OzoneShieldBlock.description = "Pushes enemies in a 5x5 square when powered.";
});