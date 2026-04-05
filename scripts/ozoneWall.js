var OzoneShieldBlock;

Events.on(ContentInitEvent, function(){

    // Extend PowerBlock to get HP & power UI
    OzoneShieldBlock = extend(PowerBlock, "pluscontent-ozone-shield", {

        size: 3,               // 3x3 block
        originOffset: 0,       // top-left anchor
        solid: true,           // occupies tiles
        breakable: true,       // can be destroyed
        hasPower: true,
        consumesPower: true,

        buildType: () => extend(PowerBlock.PowerBuild, {

            // Push units & bullets in 5x5 when powered
            updateTile(){
                this.super$updateTile();
                if(!this.power || this.power.status <= 0.0001) return;

                var cx = this.x;
                var cy = this.y;
                var shieldRadius = 5; // 5x5 tiles
                var centerX = cx*8 + 12; // center pixel of 3x3
                var centerY = cy*8 + 12;

                var pushStrength = 1.0;
                var maxSpeed = 300;

                // --- PUSH UNITS ---
                Groups.unit.intersect(
                    centerX - shieldRadius*8,
                    centerY - shieldRadius*8,
                    shieldRadius*8*2,
                    shieldRadius*8*2,
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

                // --- PUSH BULLETS ---
                Groups.bullet.intersect(
                    centerX - shieldRadius*8,
                    centerY - shieldRadius*8,
                    shieldRadius*8*2,
                    shieldRadius*8*2,
                    cons(function(b){
                        if(!b) return;

                        var dx = b.x - centerX;
                        var dy = b.y - centerY;
                        var dist = Math.sqrt(dx*dx + dy*dy);
                        if(dist < 1) return;

                        var nx = dx / dist;
                        var ny = dy / dist;
                        var bx = b.vel.x + nx * (pushStrength*0.8);
                        var by = b.vel.y + ny * (pushStrength*0.8);

                        var bSpeed = Math.sqrt(bx*bx + by*by);
                        var maxBulletSpeed = maxSpeed*2;
                        if(bSpeed > maxBulletSpeed){
                            bx = bx / bSpeed * maxBulletSpeed;
                            by = by / bSpeed * maxBulletSpeed;
                        }

                        b.vel.set(bx, by);
                    })
                );
            },

            // Optional visual shield when powered
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

    // Block properties
    OzoneShieldBlock.health = 4000;
    OzoneShieldBlock.category = Category.defense;
    OzoneShieldBlock.requirements = ItemStack.with(
        Items.copper, 200,
        Items.lead, 150
    );
    OzoneShieldBlock.buildTime = 120;
    OzoneShieldBlock.consumePower(5);      // 5 power/tick
    OzoneShieldBlock.buildVisibility = BuildVisibility.shown;
    OzoneShieldBlock.alwaysUnlocked = true;
    OzoneShieldBlock.envEnabled = Env.any;

    OzoneShieldBlock.localizedName = "Ozone Shield";
    OzoneShieldBlock.description = "Pushes enemies and bullets in a 5x5 area when powered.";
});