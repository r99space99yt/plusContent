var OzoneWall;

Events.on(ContentInitEvent, function(){

    OzoneWall = extend(Wall, "pluscontent-ozone-wall", {

        buildType: () => extend(Wall.WallBuild, {

            acceptLiquid(source, liquid){
                return liquid === Liquids.ozone;
            },

            updateTile(){
                this.super$updateTile();

                if(this.liquids == null) return;

                var ozoneAmount = this.liquids.get(Liquids.ozone);
                var hasPower = this.power && this.power.status > 0.0001;

                if(ozoneAmount <= 0 || !hasPower) return;

                // manual consume
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
            }
        })
    });

    // ===== PROPERTIES =====

    OzoneWall.size = 4;
    OzoneWall.health = 4000;
    OzoneWall.category = Category.defense;

    OzoneWall.requirements = ItemStack.with(
        Items.copper, 200,
        Items.lead, 150
    );

    OzoneWall.buildTime = 120;

    // 💧 LIQUID (FIXED)
    OzoneWall.hasLiquids = true;
    OzoneWall.liquidCapacity = 40;

    // 🔥 CRITICAL FIX
    OzoneWall.consumeLiquid(Liquids.ozone, 0.000001);

    // ⚡ POWER
    OzoneWall.hasPower = true;
    OzoneWall.consumePower(3);

    OzoneWall.envEnabled = Env.any;
    OzoneWall.buildVisibility = BuildVisibility.shown;
    OzoneWall.alwaysUnlocked = true;
});