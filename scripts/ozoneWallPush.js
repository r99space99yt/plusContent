require('ozoneWall');
// OzoneShieldPush.js — fixed for Rhino overload ambiguity
print("Ozone Shield Push Script Started");

function setupOzonePushLoop() {

    Time.runTask(0, function pushLoop() {

        Groups.build.each(function(b){

            if(!b || !b.block || b.block.name !== "pluscontent-ozone-shield") return;

            if(!b.power || b.power.status <= 0.0001) return;

            var cx = b.x;
            var cy = b.y;

            var shieldRadius = 5;
            var pixelRadius = shieldRadius * Vars.tilesize;

            // --- Push units ---
            Groups.unit.intersect(
                cx*8 - pixelRadius, cy*8 - pixelRadius,
                pixelRadius*2, pixelRadius*2,
                new arc.func.Cons({get: function(u){
                    if(!u || u.dead) return;

                    var dx = u.x - (cx*8 + 8*1.5);
                    var dy = u.y - (cy*8 + 8*1.5);
                    var dist = Math.sqrt(dx*dx + dy*dy);
                    if(dist < 1) return;

                    var push = 0.2;
                    u.vel.x += dx / dist * push;
                    u.vel.y += dy / dist * push;
                }})
            );

            // --- Push bullets ---
            Groups.bullet.intersect(
                cx*8 - pixelRadius, cy*8 - pixelRadius,
                pixelRadius*2, pixelRadius*2,
                new arc.func.Cons({get: function(bullet){
                    if(!bullet) return;

                    var dx = bullet.x - (cx*8 + 8*1.5);
                    var dy = bullet.y - (cy*8 + 8*1.5);
                    var dist = Math.sqrt(dx*dx + dy*dy);
                    if(dist < 1) return;

                    var push = 0.3;
                    bullet.vel.x += dx / dist * push;
                    bullet.vel.y += dy / dist * push;
                }})
            );

        });

        Time.runTask(0, pushLoop);
    });

    print("Ozone Shield Push Loop Initialized");
}

// Initialize
if(Vars.world) {
    setupOzonePushLoop();
} else {
    Events.on(WorldLoadEvent, function(){
        setupOzonePushLoop();
    });
}