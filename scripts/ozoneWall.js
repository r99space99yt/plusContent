var OzoneShieldBlock;

Events.on(ContentInitEvent, function(){

    OzoneShieldBlock = extend(Block, "pluscontent-ozone-shield", {

        size: 3,
        originOffset: 0,
        solid: true,
        breakable: true,
        hasPower: true,

        buildType: () => extend(Block.Build, {

            updateTile(){
                this.super$updateTile();
                if(!this.power || this.power.status <= 0.0001) return;

                var cx = this.x;
                var cy = this.y;

                var shieldSize = 5; // push 5x5
                var startX = cx - Math.floor(shieldSize/2);
                var startY = cy - Math.floor(shieldSize/2);
                var endX = startX + shieldSize;
                var endY = startY + shieldSize;

                Units.near(cx*8, cy*8, 48, function(u){
                    var ux = u.x / 8;
                    var uy = u.y / 8;

                    if(ux >= startX && ux <= endX && uy >= startY && uy <= endY){
                        var dx = u.x - (cx*8 + 12);
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
                for(var dx=0; dx<this.block.size; dx++){
                    for(var dy=0; dy<this.block.size; dy++){
                        var t = Vars.world.tile(this.tile.x + dx, this.tile.y + dy);
                        if(!t || t.block() != Blocks.air) return false;
                    }
                }
                return true;
            },

            draw(){
                this.super$draw();
                if(this.power && this.power.status > 0.0001){
                    var cx = this.x;
                    var cy = this.y;
                    var shieldRadius = 5*8/2;
                    Draw.color(Pal.accent);
                    Lines.stroke(1.5);
                    Draw.rect(Core.atlas.find("white"), cx*8 + 12, cy*8 + 12, shieldRadius*2, shieldRadius*2);
                    Draw.color();
                }
            }
        })
    });

    OzoneShieldBlock.health = 4000;
    OzoneShieldBlock.category = Category.defense;
    OzoneShieldBlock.requirements = ItemStack.with(Items.copper, 200, Items.lead, 150);
    OzoneShieldBlock.buildTime = 120;
    OzoneShieldBlock.buildVisibility = BuildVisibility.shown;
    OzoneShieldBlock.alwaysUnlocked = true;
    OzoneShieldBlock.envEnabled = Env.any;

    OzoneShieldBlock.localizedName = "Ozone Shield";
    OzoneShieldBlock.description = "Pushes enemies in a 5x5 square when powered.";
});