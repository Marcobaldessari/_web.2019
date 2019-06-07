var canvas, ctx, fidgetList, logo





(function createCanvas() {
    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    canvasSetSize();
})();

function canvasSetSize () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
window.addEventListener('resize', canvasSetSize, false);


var blocks = new Blocks();

// function engine() {
//     fidgetList = [
//         aitch_grid,
//         elastic_grid
//     ]
// }
// window.addEventListener('load', function(){engine.start()}, false);
// engine.start = function () {
//     console.log("=== Engine running ===");
//     logo = document.getElementById()("logo");
// }
// engine.reset = function () {
//     console.log("=== Engine reset ===");
//     var active_fidget = Math.floor((Math.random() * fidgetList.length));
//     fidgetList[active_fidget]();
// };
// function aitch_grid() {
//     console.log("AITCH");
// }
// function elastic_grid() {
//     console.log("ELASTIC");
// }

document.addEventListener('keypress', logKey);
function logKey(e) {
    if (e.keyCode == 32) {
        console.log("STOP");
        blocks.stop()
    }
}

// function shakeListener() {
//     if (window.DeviceMotionEvent != undefined) {
//         window.ondevicemotion = function (e) {
//             ax = event.accelerationIncludingGravity.x;
//             ay = event.accelerationIncludingGravity.y;
//             az = event.accelerationIncludingGravity.z;
//         }
//         axdelta = Math.abs(ax - pax);
//         aydelta = Math.abs(ay - pay);
//         azdelta = Math.abs(az - paz);

//         if (axdelta + aydelta + azdelta > 1) {
//             return true;
//         }
//         pax = ax;
//         pay = ay;
//         paz = az;
//     }
// }