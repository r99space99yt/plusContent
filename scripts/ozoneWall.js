var OzoneWall;

Events.on(ContentInitEvent, function(){

    print("ozone wall loading");

    OzoneWall = extend(Wall, "pluscontent-ozone-wall", {

        // ✅ CUSTOM DRAW (looks like 2x2 but block is 4x4)
        draw(tile){
            this.super$draw(tile);

            Draw.rect(
                Core.atlas.find("pluscontent-ozone-wall"),
                tile.worldx(),
                tile.worldy(),
                Vars.tilesize * 2,
                Vars.tilesize * 2
            );
        },

        // ✅ MAIN LOGIC (optimized)
        update(tile){
            if(tile == null) return;

            var ozoneAmount = tile.liquids != null ? tile.liquids.get(Liquids.ozone) : 0;

            var hasPower = tile.power != null && tile.power.status > 0.0001;

            if(ozoneAmount <= 0 || !hasPower) return;

            // consume ozone
            tile.liquids.remove(Liquids.ozone, 0.05);

            var cx = tile.worldx();
            var cy = tile.worldy();

            // slightly bigger range for 4x4
            Units.near(cx, cy, 80, function(u){

                var dx = u.x - cx;
                var dy = u.y - cy;
                var dist = Math.sqrt(dx*dx + dy*dy);

                if(dist > 0 && dist < 64){

                    var push = 0.05 * ozoneAmount;

                    u.vel.x += dx / dist * push;
                    u.vel.y += dy / dist * push;
                }
            });
        }
    });

    // =========================
    // 🔧 PROPERTIES
    // =========================

    OzoneWall.size = 4; // 🔥 REAL SIZE
    OzoneWall.health = 4000;
    OzoneWall.category = Category.defense;

    // ✅ BUILD COST
    OzoneWall.requirements = ItemStack.with(
        Items.copper, 200,
        Items.lead, 150
    );

    // ✅ BUILD TIME
    OzoneWall.buildTime = 120;

    // ✅ LIQUID SYSTEM
    OzoneWall.hasLiquids = true;
    OzoneWall.liquidCapacity = 40;
    OzoneWall.outputsLiquid = false;

    // ✅ POWER SYSTEM
    OzoneWall.consumesPower = true;
    OzoneWall.powerConsumption = 3;

    // ✅ VISIBILITY
    OzoneWall.buildVisibility = BuildVisibility.shown;
    OzoneWall.alwaysUnlocked = true;
    OzoneWall.inEditor = true;

    print("ozone wall fully created");
});