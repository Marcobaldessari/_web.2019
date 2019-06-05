


var fidgetList



window.addEventListener('load', engine.start, false);

engine(){
    fidgetList = [
        aitch_grid,
        elastic_grid
    ]
}

engine.start = function(){
    console.log("=== Engine running ===");
    var logo = document.getElementById()("logo");
}

engine.reset = function () {
    console.log("=== Engine reset ===");
    var active_fidget = Math.floor((Math.random() * fidgetList.length));
    fidgetList[active_fidget]();
};



function aitch_grid(){
    console.log("AITCH");
}

function elastic_grid(){
    console.log("ELASTIC");
}



logo.onclick = function() {
    engine.reset();
}