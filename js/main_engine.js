var fidgetList

window.addEventListener('load', engine.start, false);

function engine(){
    fidgetList = [
        aitch_grid,
        elastic_grid
    ]
}

engine.start = function(){
    console.log("=== Engine running ===");
    var logo = document.getElementById()("logo");
    game1.stop();
    game2.start();
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


document.addEventListener('keypress', logKey);

function logKey(e) {
  if (e.keyCode == 32) {
      blocks.stop();
      console.log("STOP")
  }
}

// logo.onclick = function() {
//     engine.reset();
// }

blocks();