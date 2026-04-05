var OzoneShieldBlock;

Events.on(ContentInitEvent, function(){

    OzoneShieldBlock = extend(PowerBlock, "pluscontent-ozone-shield", {

        size: 3, // 3x3 block
        health: 4000,
        category: Category.defense,
        buildTime: 120,
        hasPower: true,
        consumePower: 5,
        alwaysUnlocked: true,
        envEnabled: Env.any,

        requirements: ItemStack.with(
            Items.copper, 200,
            Items.lead, 150
        ),

        localizedName: "Ozone Shield",
        description: "Pushes enemies and bullets in a 5x5 area when powered.",

        buildType: () => extend(PowerBlock.PowerBuild, {

            updateTile(){
                this.super$updateTile();

                if(!this.power || this.power.status <= 0.0001) return;

                var cx = this.x;
                var cy = this.y;

                // 5x5 tiles, convert to pixels
                var shieldRadius = 5;
                var centerX = cx*8 + 12; // center of 3x3
                var centerY = cy*8 + 12;

                var pushStrength = 1.2;
                var maxSpeed = 300;

                // Push units
                Groups.unit.intersect(
                    centerX - shieldRadius*8,
                    centerY - shieldRadius*8,
                    shieldRadius*16,
                    shieldRadius*16,
                    cons(function(u){
                        if(!u || u.dead) return;
                        var dx = u.x - centerX;
                        var dy = u.y - centerY;
                        var dist = Math.sqrt(dx*dx + dy*dy);
                        if(dist < 1) return;

                        var nx = dx / dist;
                        var ny = dy / dist;
                        var vx = u.vel.x + nx * pushStrength;
                        var vy = u.vel.y + ny * pushStrength;

                        var speed = Math.sqrt(vx*vx + vy*vy);
                        if(speed > maxSpeed){
                            vx = vx / speed * maxSpeed;
                            vy = vy / speed * maxSpeed;
                        }

                        u.vel.set(vx, vy);
                    })
                );

                // Push bullets
                Groups.bullet.intersect(
                    centerX - shieldRadius*8,
                    centerY - shieldRadius*8,
                    shieldRadius*16,
                    shieldRadius*16,
                    cons(function(b){
                        if(!b) return;
                        var dx = b.x - centerX;
                        var dy = b.y - centerY;
                        var dist = Math.sqrt(dx*dx + dy*dy);
                        if(dist < 1) return;

                        var nx = dx / dist;
                        var ny = dy / dist;
                        var bx = b.vel.x + nx * pushStrength*0.8;
                        var by = b.vel.y + ny * pushStrength*0.8;

                        var speed = Math.sqrt(bx*bx + by*by);
                        if(speed > maxSpeed*2){
                            bx = bx / speed * maxSpeed*2;
                            by = by / speed * maxSpeed*2;
                        }

                        b.vel.set(bx, by);
                    })
                );
            },

            // Draw shield visual
            draw(){
                this.super$draw();
                if(this.power && this.power.status > 0.0001){
                    Draw.color(Pal.accent);
                    var cx = this.x*8 + 12;
                    var cy = this.y*8 + 12;
                    Lines.stroke(2);
                    Draw.rect(Core.atlas.find("white"), cx, cy, 5*8, 5*8);
                    Draw.color();
                }
            },

            // Placement check for 3x3
            canPlaceOn(tile){
                for(var dx=0; dx<this.block.size; dx++){
                    for(var dy=0; dy<this.block.size; dy++){
                        var t = Vars.world.tile(this.tile.x + dx, this.tile.y + dy);
                        if(!t || t.block() != Blocks.air) return false;
                    }
                }
                return true;
            }
        })
    });
});