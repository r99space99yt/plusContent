var OzoneShieldBlock;

Events.on(ContentInitEvent, function(){

    OzoneShieldBlock = extend(PowerBlock, "pluscontent-ozone-shield", {
        size: 3,
        health: 4000,
        category: Category.defense,
        buildTime: 120,
        hasPower: true,
        alwaysUnlocked: true,
        buildVisibility: BuildVisibility.shown,
        envEnabled: Env.any,

        requirements: ItemStack.with(
            Items.copper, 200,
            Items.lead, 150
        ),

        localizedName: "Ozone Shield",
        description: "Pushes enemies and bullets in a 5x5 area when powered.",

        buildType: () => extend(PowerBlock.PowerBuild, {

            draw(){
                this.super$draw();
                if(this.power && this.power.status > 0.0001){
                    // Draw shield radius
                    Draw.color(Pal.accent);
                    var cx = this.x*8 + 12;
                    var cy = this.y*8 + 12;
                    Lines.stroke(2);
                    Draw.rect(Core.atlas.find("white"), cx, cy, 5*8, 5*8);
                    Draw.color();
                }
            },

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

    // Set the consumePower amount correctly
    OzoneShieldBlock.consumePower(5);
});