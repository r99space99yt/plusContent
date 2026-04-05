require('ozoneWall');
// OzoneShieldPush.js — Push units & bullets from powered Ozone Shield
print("Ozone Shield Push Script Started");

function setupOzonePushLoop() {

    Time.runTask(0, function pushLoop() {

        // Iterate all placed Ozone Shield blocks
        Groups.build.each(function(b){

            // Safety: skip if not our block or no buildType yet
            if(!b || !b.block || b.block.name !== "pluscontent-ozone-shield") return;

            // Only active if block has power
            if(!b.power || b.power.status <= 0.0001) return;

            var cx = b.x;  // block center x
            var cy = b.y;  // block center y

            // 5x5 shield area
            var shieldRadius = 5; // tiles
            var pixelRadius = shieldRadius * Vars.tilesize; // convert to world units

            // --- Push units ---
            Groups.unit.intersect(
                cx*8 - pixelRadius, cy*8 - pixelRadius,
                pixelRadius*2, pixelRadius*2,
                function(u){
                    if(!u || u.dead) return;

                    // dx/dy from block center
                    var dx = u.x - (cx*8 + 8*1.5); // center of 3x3 block in pixels
                    var dy = u.y - (cy*8 + 8*1.5);
                    var dist = Math.sqrt(dx*dx + dy*dy);
                    if(dist < 1) return;

                    // push strength proportional
                    var push = 0.2;
                    u.vel.x += dx / dist * push;
                    u.vel.y += dy / dist * push;
                }
            );

            // --- Push bullets ---
            Groups.bullet.intersect(
                cx*8 - pixelRadius, cy*8 - pixelRadius,
                pixelRadius*2, pixelRadius*2,
                function(bullet){
                    if(!bullet) return;

                    var dx = bullet.x - (cx*8 + 8*1.5);
                    var dy = bullet.y - (cy*8 + 8*1.5);
                    var dist = Math.sqrt(dx*dx + dy*dy);
                    if(dist < 1) return;

                    var push = 0.3;
                    bullet.vel.x += dx / dist * push;
                    bullet.vel.y += dy / dist * push;
                }
            );

        });

        // Loop every frame
        Time.runTask(0, pushLoop);
    });

    print("Ozone Shield Push Loop Initialized");
}

// Initialize on world load
if(Vars.world) {
    setupOzonePushLoop();
} else {
    Events.on(WorldLoadEvent, function(){
        setupOzonePushLoop();
    });
}