var fidgetList = [ aitch_grid, elastic_grid ];

function aitch_grid() {
    console.log("AITCH");
}

function elastic_grid() {
    console.log("ELASTIC");
}

engine.reset = function() {
    console.log("ENGINE RESET");
    var e = Math.floor(Math.random() * fidget.length);
    fidgetList[e]();
};

document.getElementsByClassName("logo").onclick = function() {
    engine.reset();
};