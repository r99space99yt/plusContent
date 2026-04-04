// scripts/ozoneWall.js

const OzoneWall = extend(Wall, "pluscontent-ozone-wall", {

    canPlaceOn(tile){
        if(tile == null) return false;

        for(var dx = 0; dx < 4; dx++){
            for(var dy = 0; dy < 4; dy++){
                var t = Vars.world.tile(tile.x + dx, tile.y + dy);
                if(t == null) return false;
                if(t.block() != Blocks.air) return false;
            }
        }
        return true;
    },

    build(tile){
        if(tile == null) return;

        this.super$build(tile);

        for(var dx = 0; dx < 4; dx++){
            for(var dy = 0; dy < 4; dy++){
                var t = Vars.world.tile(tile.x + dx, tile.y + dy);
                if(t != null){
                    t.setBlock(this);
                }
            }
        }
    },

    update(tile){
        if(tile == null) return;

        // --- SAFE OZONE GET ---
        var ozoneAmount = 0;
        if(tile.liquids != null){
            ozoneAmount = tile.liquids.get(Liquids.ozone);
        }

        // --- SAFE POWER CHECK ---
        var hasPower = false;
        if(tile.power != null){
            var p = tile.power.status;
            if(p > 0.0001){
                hasPower = true;
            }
        }

        // --- MAIN LOGIC ---
        if(ozoneAmount > 0 && hasPower){

            // consume ozone
            tile.liquids.remove(Liquids.ozone, 0.05);

            var cx = (tile.x + 2) * Vars.tilesize;
            var cy = (tile.y + 2) * Vars.tilesize;

            // NO arrow function (156 safe)
            Units.near(cx, cy, 60, function(u){

                var utx = Math.floor(u.x / Vars.tilesize);
                var uty = Math.floor(u.y / Vars.tilesize);

                if(utx >= tile.x && utx < tile.x + 4 &&
                   uty >= tile.y && uty < tile.y + 4){

                    var dx = u.x - cx;
                    var dy = u.y - cy;
                    var dist = Math.sqrt(dx*dx + dy*dy);

                    if(dist > 0){
                        var push = 0.05 * ozoneAmount;
                        u.vel.x += dx / dist * push;
                        u.vel.y += dy / dist * push;
                    }
                }
            });
        }
    },

    draw(tile){
        this.super$draw(tile);

        // --- SAFE OZONE GET ---
        var ozoneAmount = 0;
        if(tile.liquids != null){
            ozoneAmount = tile.liquids.get(Liquids.ozone);
        }

        // --- SAFE POWER CHECK ---
        var hasPower = false;
        if(tile.power != null){
            var p = tile.power.status;
            if(p > 0.0001){
                hasPower = true;
            }
        }

        if(ozoneAmount > 0 && hasPower){

            Draw.color(Color.cyan, Color.white, ozoneAmount / 20);

            // --- SAFE REGION ---
            var region = Core.atlas.find("pluscontent-ozone-wall");

            if(region != null){
                Draw.rect(
                    region,
                    (tile.x + 2) * Vars.tilesize,
                    (tile.y + 2) * Vars.tilesize,
                    Vars.tilesize * 4,
                    Vars.tilesize * 4
                );
            }

            Draw.reset();
        }
    }
});


// --- STATIC PROPERTIES ---
OzoneWall.liquidCapacity = 20;
OzoneWall.liquidFilter = Liquids.ozone;

OzoneWall.consumesPower = true;
OzoneWall.powerConsumption = 2;

OzoneWall.buildCost = { copper: 120, lead: 80 };
OzoneWall.health = 2000;
OzoneWall.category = Category.defense;