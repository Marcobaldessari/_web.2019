var canvas, ctx, fidgetList, logo





(function createCanvas() {
    canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})();

var blocks = new Blocks();

function engine() {
    fidgetList = [
        aitch_grid,
        elastic_grid
    ]
}

window.addEventListener('load', engine.start, false);
engine.start = function () {
    console.log("=== Engine running ===");
    logo = document.getElementById()("logo");
}



engine.reset = function () {
    console.log("=== Engine reset ===");
    var active_fidget = Math.floor((Math.random() * fidgetList.length));
    fidgetList[active_fidget]();
};
function aitch_grid() {
    console.log("AITCH");
}
function elastic_grid() {
    console.log("ELASTIC");
}


// window.onresize = function(event) {
//     ctx.canvas.width = window.innerWidth;
//     ctx.canvas.height = window.innerHeight;
//   };


document.addEventListener('keypress', logKey);
function logKey(e) {
    if (e.keyCode == 32) {
        console.log("STOP");
        blocks.running = false
    }
}
