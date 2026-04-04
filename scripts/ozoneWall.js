var OzoneWall;

Events.on(ContentInitEvent, function(){

    print("ozone wall loading");

    OzoneWall = extend(Wall, "pluscontent-ozone-wall", {

        // ✅ DRAW 4x4 PREVIEW (does NOT break placement)
        drawPlace(x, y, rotation, valid){
            this.super$drawPlace(x, y, rotation, valid);

            Draw.color(valid ? Color.green : Color.red);
            Lines.stroke(1);

            var worldx = x * Vars.tilesize;
            var worldy = y * Vars.tilesize;

            Lines.rect(
                worldx,
                worldy,
                Vars.tilesize * 4,
                Vars.tilesize * 4
            );

            Draw.reset();
        },

        // ✅ MAIN LOGIC
        update(tile){
            if(tile == null) return;

            // --- check 4x4 space (soft check, DOES NOT block placement) ---
            for(var dx = 0; dx < 4; dx++){
                for(var dy = 0; dy < 4; dy++){
                    var t = Vars.world.tile(tile.x + dx, tile.y + dy);
                    if(t == null) return;

                    if(t.build != null && t.build != tile.build){
                        return; // disable effect if blocked
                    }
                }
            }

            // --- ozone ---
            var ozoneAmount = tile.liquids != null ? tile.liquids.get(Liquids.ozone) : 0;

            // --- power ---
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

    // ✅ REQUIRED FOR MENU
    OzoneWall.requirements = ItemStack.with(
        Items.copper, 120,
        Items.lead, 80
    );

    // ✅ BUILD TIME FIX
    OzoneWall.buildTime = 60;

    // ✅ LIQUID
    OzoneWall.hasLiquids = true;
    OzoneWall.liquidCapacity = 20;
    OzoneWall.outputsLiquid = false;

    // ✅ POWER
    OzoneWall.consumesPower = true;
    OzoneWall.powerConsumption = 2;

    // ✅ VISIBILITY
    OzoneWall.buildVisibility = BuildVisibility.shown;
    OzoneWall.alwaysUnlocked = true;
    OzoneWall.inEditor = true;

    print("ozone wall fully created");
});