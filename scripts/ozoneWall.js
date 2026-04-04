var OzoneWall;

Events.on(ContentInitEvent, function(){

    print("ozone wall loading");

    OzoneWall = extend(Wall, "pluscontent-ozone-wall", {

        // ✅ 4x4 placement check (fixed)
        canPlaceOn(tile){
            if(tile == null) return false;

            for(var dx = 0; dx < 4; dx++){
                for(var dy = 0; dy < 4; dy++){
                    var t = Vars.world.tile(tile.x + dx, tile.y + dy);
                    if(t == null) return false;

                    // allow empty OR itself
                    if(t.build != null && t.build.block != this){
                        return false;
                    }
                }
            }
            return true;
        },

        // ✅ push enemies if ozone + power
        update(tile){
            if(tile == null) return;

            var ozoneAmount = tile.liquids != null ? tile.liquids.get(Liquids.ozone) : 0;

            var hasPower = false;
            if(tile.power != null){
                hasPower = tile.power.status > 0.0001;
            }

            if(ozoneAmount > 0 && hasPower){

                // consume ozone
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

    // =========================
    // 🔧 PROPERTIES
    // =========================

    OzoneWall.size = 2;
    OzoneWall.health = 2000;
    OzoneWall.category = Category.defense;

    // ✅ REQUIRED for build menu
    OzoneWall.requirements = ItemStack.with(
        Items.copper, 120,
        Items.lead, 80
    );

    // ✅ FIX negative build time
    OzoneWall.buildTime = 60;

    // ✅ LIQUID SYSTEM
    OzoneWall.hasLiquids = true;
    OzoneWall.liquidCapacity = 20;
    OzoneWall.outputsLiquid = false;

    // ✅ POWER SYSTEM
    OzoneWall.consumesPower = true;
    OzoneWall.powerConsumption = 2;

    // ✅ VISIBILITY
    OzoneWall.buildVisibility = BuildVisibility.shown;
    OzoneWall.alwaysUnlocked = true;
    OzoneWall.inEditor = true;

    print("ozone wall fully created");
});