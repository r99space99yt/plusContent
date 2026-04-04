Events.on(ContentInitEvent, function(){

    print("ozone wall loaded in");

    const OzoneWall = Vars.content.getByName(ContentType.block, "pluscontent-ozone-wall");

    Object.assign(OzoneWall, {

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

        update(tile){
            if(tile == null) return;

            var ozoneAmount = 0;
            if(tile.liquids != null){
                ozoneAmount = tile.liquids.get(Liquids.ozone);
            }

            var hasPower = false;
            if(tile.power != null){
                var p = tile.power.status;
                if(p > 0.0001){
                    hasPower = true;
                }
            }

            if(ozoneAmount > 0 && hasPower){

                tile.liquids.remove(Liquids.ozone, 0.05);

                var cx = (tile.x + 2) * Vars.tilesize;
                var cy = (tile.y + 2) * Vars.tilesize;

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
        }
    });

    // static props
    OzoneWall.hasLiquids = true;
    OzoneWall.liquidCapacity = 20;

    OzoneWall.consumesPower = true;
    OzoneWall.powerConsumption = 2;

    print("ozone wall patched");
});