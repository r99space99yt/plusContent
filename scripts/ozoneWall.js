// scripts/blocks.js

const OzoneWall = extend(Wall, "erekirplus-ozone-wall", {
    // Placement logic (reserve 4x4)
    canPlaceOn(tile){
        for(let dx=0; dx<4; dx++){
            for(let dy=0; dy<4; dy++){
                const t = Vars.world.tile(tile.x + dx, tile.y + dy);
                if(!t || t.block() != Blocks.air) return false;
            }
        }
        return true;
    },

    build(tile){
        this.super$build(tile);
        // reserve 4x4 tiles
        for(let dx=0; dx<4; dx++){
            for(let dy=0; dy<4; dy++){
                const t = Vars.world.tile(tile.x + dx, tile.y + dy);
                if(t) t.block(this);
            }
        }
    },

    update(tile){
        const ozoneAmount = tile.liquids.get(Liquids.ozone) || 0;
        // only work if has ozone AND has power
        if(ozoneAmount > 0 && tile.power.status > 0){

            // consume ozone
            const consumeRate = 0.05;
            tile.liquids.remove(Liquids.ozone, consumeRate);

            // center of the wall (2x2 in 4x4)
            const cx = (tile.x + 2) * Vars.tilesize;
            const cy = (tile.y + 2) * Vars.tilesize;

            // push enemies only inside 4x4 square
            Units.near(cx, cy, 60, u => {
                const utx = Math.floor(u.x / Vars.tilesize);
                const uty = Math.floor(u.y / Vars.tilesize);
                if(utx >= tile.x && utx < tile.x + 4 && uty >= tile.y && uty < tile.y + 4){
                    const dx = u.x - cx;
                    const dy = u.y - cy;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    if(dist > 0){
                        const push = 0.05 * ozoneAmount;
                        u.vel.x += dx / dist * push;
                        u.vel.y += dy / dist * push;
                    }
                }
            });
        }
    },

    draw(tile){
        this.super$draw(tile);
        const ozoneAmount = tile.liquids.get(Liquids.ozone) || 0;
        // only draw shield if has ozone AND has power
        if(ozoneAmount > 0 && tile.power.status > 0){
            Draw.color(Color.cyan, Color.white, ozoneAmount / tile.block.liquids.getCapacity(Liquids.ozone));
            Draw.rect(
                Core.atlas.find(this.name),
                (tile.x + 2) * Vars.tilesize,
                (tile.y + 2) * Vars.tilesize,
                Vars.tilesize*4,
                Vars.tilesize*4
            );
            Draw.reset();
        }
    }
});

// Set static properties AFTER extend()
OzoneWall.liquidCapacity = 20; // max ozone units
OzoneWall.liquidFilters = [Liquids.ozone];
OzoneWall.consumesLiquid = true;

OzoneWall.consumesPower = true;
OzoneWall.powerConsumption = 2; // units per tick

OzoneWall.buildCost = { copper: 120, lead: 80 };
OzoneWall.health = 2000;
OzoneWall.category = Category.defense;