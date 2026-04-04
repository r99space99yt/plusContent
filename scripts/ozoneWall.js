var OzoneWall;

Events.on(ContentInitEvent, function(){

    print("ozone wall loading");

    OzoneWall = extend(Wall, "pluscontent-ozone-wall", {

        // ✅ REQUIRED BUILD TYPE
        buildType: () => extend(Wall.WallBuild, {

            // ✅ ONLY ACCEPT OZONE (FIXES CRASH)
            acceptLiquid(source, liquid){
                return liquid == Liquids.ozone;
            },

            updateTile(){
                this.super$updateTile();

                var ozoneAmount = this.liquids ? this.liquids.get(Liquids.ozone) : 0;
                var hasPower = this.power && this.power.status > 0.0001;

                if(ozoneAmount <= 0 || !hasPower) return;

                // consume ozone
                this.liquids.remove(Liquids.ozone, 0.05);

                var cx = this.x;
                var cy = this.y;

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
            },

            // ✅ DRAW SMALLER (2x2 LOOK)
            draw(){
                this.super$draw();

                Draw.rect(
                    Core.atlas.find("pluscontent-ozone-wall"),
                    this.x,
                    this.y,
                    Vars.tilesize * 2,
                    Vars.tilesize * 2
                );
            }
        })
    });

    // =========================
    // 🔧 PROPERTIES
    // =========================

    OzoneWall.size = 4;
    OzoneWall.health = 4000;
    OzoneWall.category = Category.defense;

    // ✅ BUILD COST
    OzoneWall.requirements = ItemStack.with(
        Items.copper, 200,
        Items.lead, 150
    );

    OzoneWall.buildTime = 120;

    // ✅ LIQUID SYSTEM (FIXED)
    OzoneWall.hasLiquids = true;
    OzoneWall.liquidCapacity = 40;

    // ✅ POWER SYSTEM (FIXED)
    OzoneWall.hasPower = true;
    OzoneWall.consumePower(3);

    // ✅ ALLOW EVERYWHERE
    OzoneWall.envEnabled = Env.any;

    // ✅ VISIBILITY
    OzoneWall.buildVisibility = BuildVisibility.shown;
    OzoneWall.alwaysUnlocked = true;

    print("ozone wall fully created");
});