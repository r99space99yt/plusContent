var OzoneShieldBlock;

Events.on(ContentInitEvent, function(){

    OzoneShieldBlock = extend(Block, "pluscontent-ozone-shield", {

        size: 2,               // 2x2 tiles
        originOffset: 0,       // top-left corner anchor

        buildType: () => extend(Block.Build, {

            updateTile(){
                this.super$updateTile();

                if(!this.power || this.power.status <= 0.0001) return;

                var cx = this.x;
                var cy = this.y;

                // 4x4 push area
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
            },

            canPlaceOn(tile){
                for(var dx = 0; dx < this.block.size; dx++){
                    for(var dy = 0; dy < this.block.size; dy++){
                        var t = Vars.world.tile(this.tile.x + dx, this.tile.y + dy);
                        if(!t || t.block() != Blocks.air) return false;
                    }
                }
                return true;
            },

            // optional: shift drawing to match 2x2 tiles
            draw(){
                Draw.rect(this.block.region, this.x + 1, this.y + 1); // +1 shifts sprite to top-left
            }

        })
    });

    OzoneShieldBlock.health = 4000;
    OzoneShieldBlock.category = Category.defense;

    OzoneShieldBlock.requirements = ItemStack.with(
        Items.copper, 150,
        Items.lead, 100
    );

    OzoneShieldBlock.buildTime = 120;

    OzoneShieldBlock.hasPower = true;
    OzoneShieldBlock.consumePower(3);

    OzoneShieldBlock.buildVisibility = BuildVisibility.shown;
    OzoneShieldBlock.alwaysUnlocked = true;
    OzoneShieldBlock.envEnabled = Env.any;

    OzoneShieldBlock.localizedName = "Ozone Shield";
    OzoneShieldBlock.description = "Pushes enemies in a 4x4 square when powered.";
});