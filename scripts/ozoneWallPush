print("ozone push start");
function setupOzoneShieldPush(){
    Time.runTask(0, function loop(){

        // Push units
        Groups.unit.each(cons(function(u){
            if(!u || u.dead) return;

            // Scan all placed powered shields
            Groups.build.each(cons(function(b){
                if(!(b.block instanceof PowerBlock)) return;
                if(b.block.name !== "pluscontent-ozone-shield") return;
                if(!b.power || b.power.status <= 0.0001) return;

                var cx = b.x*8 + 12;
                var cy = b.y*8 + 12;
                var radius = 5*8;
                var dx = u.x - cx;
                var dy = u.y - cy;
                var dist = Math.sqrt(dx*dx + dy*dy);
                if(dist > radius) return;

                var nx = dx / dist;
                var ny = dy / dist;
                var push = 2;
                u.vel.x += nx * push;
                u.vel.y += ny * push;
            }));
        }));

        // Push bullets
        Groups.bullet.each(cons(function(b){
            if(!b) return;

            Groups.build.each(cons(function(bld){
                if(!(bld.block instanceof PowerBlock)) return;
                if(bld.block.name !== "pluscontent-ozone-shield") return;
                if(!bld.power || bld.power.status <= 0.0001) return;

                var cx = bld.x*8 + 12;
                var cy = bld.y*8 + 12;
                var radius = 5*8;
                var dx = b.x - cx;
                var dy = b.y - cy;
                var dist = Math.sqrt(dx*dx + dy*dy);
                if(dist > radius) return;

                var nx = dx / dist;
                var ny = dy / dist;
                var push = 1.6; // slightly weaker for bullets
                b.vel.x += nx * push;
                b.vel.y += ny * push;
            }));
        }));

        Time.runTask(0, loop);
    });
}

// Start after world is loaded
if(Vars.world){
    setupOzoneShieldPush();
} else {
    Events.on(WorldLoadEvent, cons(function(){
        setupOzoneShieldPush();
    }));
}