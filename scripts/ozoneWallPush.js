require('ozoneWall');
print("Ozone Shield Push Script Started");

// Utility wrapper for Mindustry JS
function cons(func){
    return func;
}

// Main loop
function setupOzoneShieldPush(){
    Time.runTask(0, function loop(){

        // --- Push units ---
        Groups.unit.each(cons(function(u){
            if(!u || u.dead) return;

            Groups.build.each(cons(function(b){
                if(!(b.block instanceof PowerBlock)) return;
                if(b.block.name !== "pluscontent-ozone-shield") return;
                if(!b.power || b.power.status <= 0.0001) return;

                // Shield center in pixels
                var cx = b.x * 8 + (b.block.size * 8) / 2;
                var cy = b.y * 8 + (b.block.size * 8) / 2;

                var radius = 5 * 8; // 5x5 shield effect
                var dx = u.x - cx;
                var dy = u.y - cy;
                var dist = Math.sqrt(dx*dx + dy*dy);
                if(dist > radius || dist < 1) return;

                // Push
                var nx = dx / dist;
                var ny = dy / dist;
                var push = 2.5; // noticeable push
                u.vel.x += nx * push;
                u.vel.y += ny * push;
            }));
        }));

        // --- Push bullets ---
        Groups.bullet.each(cons(function(b){
            if(!b) return;

            Groups.build.each(cons(function(bld){
                if(!(bld.block instanceof PowerBlock)) return;
                if(bld.block.name !== "pluscontent-ozone-shield") return;
                if(!bld.power || bld.power.status <= 0.0001) return;

                var cx = bld.x * 8 + (bld.block.size * 8) / 2;
                var cy = bld.y * 8 + (bld.block.size * 8) / 2;

                var radius = 5 * 8;
                var dx = b.x - cx;
                var dy = b.y - cy;
                var dist = Math.sqrt(dx*dx + dy*dy);
                if(dist > radius || dist < 1) return;

                var nx = dx / dist;
                var ny = dy / dist;
                var push = 1.8; // slightly weaker for bullets
                b.vel.x += nx * push;
                b.vel.y += ny * push;
            }));
        }));

        // Loop again next frame
        Time.runTask(0, loop);
    });
}

// Start after world loaded
if(Vars.world){
    setupOzoneShieldPush();
}else{
    Events.on(WorldLoadEvent, cons(function(){
        setupOzoneShieldPush();
    }));
}