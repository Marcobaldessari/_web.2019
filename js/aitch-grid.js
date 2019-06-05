var aitch_grid = function(){
var canvas,
  options,
  ctx,
  list,
  rows, cols,
  mx, my,
  dx, dy,
  cw, ch,
  r, c,
  i,
  falloff_delay, ripple_duration, ripple_running, ripple_finished,
  bounds, logo_position,
  dot_1, dot_2, dot_3, dot_4, dot_5, dot_6,
  t
  ;
options = getPresetJSON()["remembered"]["aitch"]["0"];

// options = {
// 	color_off: "#4e4e4e",
// 	color_on: "#e65c68",
// 	color_pulse: "#707070",
// 	bg: "#000000",
// 	radius_off: 1,
// 	radius_on: 5,
// 	spacing: 38.33189729450284,
// 	idle_pulsing: false,
// 	logo: true,
// 	ripple_falloff: 0.33901430294675167,
// 	ripple_speed: 12.027744270205067,
// 	ripple_length: 5
// };

var gui = new dat.GUI({ load: getPresetJSON(), preset: 'Preset1' });
var folder_colors = gui.addFolder('Colors');
var folder_dots = gui.addFolder('Grid');
var folder_logo = gui.addFolder('Logo');
var folder_ripple = gui.addFolder('Ripple Animation');
gui.remember(options);


var controller_color_off = folder_colors.addColor(options, 'color_off');
var controller_color_on = folder_colors.addColor(options, 'color_on');
var controller_color_bg = folder_colors.addColor(options, 'bg');
var controller_radius_off = folder_dots.add(options, 'radius_off', 1, 10);
var controller_radius_on = folder_dots.add(options, 'radius_on', 1, 10);
var controller_spacing = folder_dots.add(options, 'spacing', 20, 50).step(1);
var controller_logo = folder_logo.add(options, 'logo');
var controller_logo_size_off = folder_logo.add(options, 'logo_size_off', 3, 8);
var controller_logo_size_on = folder_logo.add(options, 'logo_size_on', 3, 8);
var controller_logo_stroke_width = folder_logo.add(options, 'logo_stroke_width', 1, 5);
folder_ripple.add(options, 'ripple_falloff', .1, 2);
folder_ripple.add(options, 'ripple_speed', 1, 50);
folder_ripple.add(options, 'ripple_length', 1, 1000000000);


controller_spacing.onChange(createGrid);
controller_radius_off.onChange(createGrid);
controller_radius_on.onChange(createGrid);
controller_logo.onChange(createGrid);
controller_logo_size_off.onChange(createGrid);
controller_logo_size_on.onChange(createGrid);
controller_logo_stroke_width.onChange(createGrid);
controller_color_bg.onChange(createGrid);
controller_color_on.onChange(createGrid);
controller_color_off.onChange(createGrid);
gui.close();


canvas = document.querySelector("canvas");
ctx = canvas.getContext("2d");
ctx.font = "8px Arial";


createGrid();
// first_ripple();
animate();

// if(options.idle_pulsing){window.setTimeout(function(){idle_pulse()}, options.pulse_delay * 1000);};


function animate() {
  requestAnimationFrame(animate);
  if (ripple_running) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.fillStyle = options.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (i = 0; i < list.length; i++) {
      list[i].draw();
      // list[i].print_number();
    }
  }
}

function Dot(x, y, radius_off, radius_on, color_off, color_on, fill_style, number) {
  this.x = x;
  this.y = y;
  this.radius = this.radius_off = radius_off;
  this.radius_on = radius_on;
  this.color = this.color_off = color_off;
  this.color_on = color_on;
  this.number = number;
  this.fill_style = fill_style;

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    switch (this.fill_style) {
      case "fill":
        ctx.fillStyle = this.color;
        ctx.fill();
        break;
      case "stroke":
        ctx.lineWidth = options.logo_stroke_width;
        ctx.strokeStyle = this.color;
        ctx.stroke();
        break;
      case "both":
        ctx.lineWidth = options.logo_stroke_width;
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
        break;
    }
  }

  this.print_number = function () {
    ctx.fillText(this.number + 1, this.x - 7, this.y - 5);
  }


}
function createGrid() {
  cw = canvas.width = window.innerWidth;
  ch = canvas.height = window.innerHeight
  rows = Math.floor(ch / options.spacing) + 1;
  cols = Math.floor(cw / options.spacing) + 1;
  list = [];
  for (r = 0; r < rows; r++) {
    for (c = 0; c < cols; c++) {
      list.push(new Dot((c * options.spacing) + options.spacing / 2, (r * options.spacing) + options.spacing / 2, options.radius_off, options.radius_on, options.color_off, options.color_on, "fill", (r + 1) * (c + 1)));
    }
  }
  if (options.logo) {
    if (!isEven(rows)) { logo_position = Math.floor((rows * cols) / 2) - 1 - (2 * cols) } else { logo_position = Math.floor(((rows + 1)) * cols / 2) - 1 - (2 * cols) }

    dot_1 = logo_position;
    list[dot_1].radius = list[dot_1].radius_off = options.logo_size_off;
    list[dot_1].radius_on = options.logo_size_on;
    list[dot_1].color = list[dot_1].color_off = options.color_on;
    list[dot_1].color_on = "white";
    list[dot_1].fill_style = "stroke";

    dot_2 = logo_position + 1
    list[dot_2].radius = list[dot_2].radius_off = options.logo_size_off;
    list[dot_2].radius_on = options.logo_size_on;
    list[dot_2].color = list[dot_2].color_off = "white";
    list[dot_2].color_on = "white";
    list[dot_2].fill_style = "both";

    dot_3 = logo_position + cols;
    list[dot_3].radius = list[dot_3].radius_off = options.logo_size_off;
    list[dot_3].radius_on = options.logo_size_on;
    list[dot_3].color = list[dot_3].color_off = options.color_on;
    list[dot_3].color_on = "white";
    list[dot_3].fill_style = "stroke";

    dot_4 = logo_position + cols + 1;
    list[dot_4].radius = list[dot_4].radius_off = options.logo_size_off;
    list[dot_4].radius_on = options.logo_size_on;
    list[dot_4].color = list[dot_4].color_off = options.color_on;
    list[dot_4].color_on = "white";
    list[dot_4].fill_style = "stroke";

    dot_5 = logo_position + (2 * cols);
    list[dot_5].radius = list[dot_5].radius_off = options.logo_size_off;
    list[dot_5].radius_on = options.logo_size_on;
    list[dot_5].color = list[dot_5].color_off = "white";
    list[dot_5].color_on = "white";
    list[dot_5].fill_style = "both";

    dot_6 = logo_position + (2 * cols) + 1;
    list[dot_6].radius = list[dot_6].radius_off = options.logo_size_off;
    list[dot_6].radius_on = options.logo_size_on;
    list[dot_6].color = list[dot_6].color_off = "white";
    list[dot_6].color_on = "white";
    list[dot_6].fill_style = "both";
  }

  for (i = 0; i < list.length; i++) {
    list[i].draw();
  }
}

function ripple(mx, my) {
  ripple_running = true;
  ripple_duration = 0;
  clearTimeout(ripple_finished);
  var ripple_delay = 1 / (options.ripple_speed * 10000) * normalize(cw, 320, 2000);
  falloff_delay = options.ripple_length * normalize(cw, 360, 1600) / 10000000000000;
  for (i = 0; i < list.length; i++) {
    list[i].d = (dx = mx - list[i].x) * dx + (dy = my - list[i].y) * dy; // there should be a more polished way
    var animation = new TimelineLite();
    var dot_duration = .04 + list[i].d * ripple_delay + options.ripple_falloff + list[i].d * falloff_delay;
    if (dot_duration > ripple_duration) { ripple_duration = dot_duration }
    animation.to(list[i], .04, { delay: list[i].d * ripple_delay, radius: list[i].radius_on, color: list[i].color_on })
      .to(list[i], options.ripple_falloff, { delay: list[i].d * falloff_delay, radius: list[i].radius_off, color: list[i].color_off });
  }
  ripple_finished = setTimeout(function () { ripple_running = false }, ripple_duration * 1000);

  // window.setTimeout(function(){ripple(Math.random() * cw, Math.random() * ch )}, 1000);
}

// function idle_pulse() {
// 	for (i = 0; i < list.length; i++) {
// 		var idle_animation = new TimelineLite();
// 		idle_animation.to(list[i], .04, {delay: .01, radius: options.radius_off, color: options.color_pulse })
// 		.to(list[i], 2, {delay: .01, radius: options.radius_off, color: options.color_off});
// 	}

// 	if(options.idle_pulsing){window.setTimeout(function(){idle_pulse()}, options.pulse_delay * 1000)}
// 	// if(options.idle_pulsing){window.setTimeout(function(){idle_pulse()}, Math.abs(Math.sin(Math.random() * Math.PI) * 2000));}; // random timing on pulse

// }

function normalize(val, max, min) { return (val - min) / (max - min); }

function isEven(n) {
  return n % 2 == 0;
}

canvas.addEventListener('mousedown', function (e) {
  // if(!man) {man == true, window.setTimeout(function(){man = false}, 5000)}
  bounds = canvas.getBoundingClientRect();
  mx = e.clientX - bounds.left;
  my = e.clientY - bounds.top;
  ripple(mx, my);
});

window.addEventListener('resize', function () {
  clearTimeout(t);
  // first_ripple();
  createGrid();
}, false);

window.addEventListener("focus", function () {
  clearTimeout(t);
  createGrid();
}, false);

// function first_ripple() {
// 	window.setTimeout(function(){ripple(innerWidth/2, innerHeight)}, 50);
// }




function getPresetJSON() {
  return {
    "preset": "Preset1",
    "closed": false,
    "remembered": {
      "aitch": {
        "0": {
          "color_off": "#4e4e4e",
          "color_on": "#e65c68",
          "bg": "#000000",
          "radius_off": 1,
          "radius_on": 1.5,
          "spacing": 40,
          "logo": true,
          "ripple_falloff": 1.2,
          "ripple_speed": 12.027744270205067,
          "ripple_length": 5,
          "logo_size_off": 5,
          "logo_size_on": 6,
          "logo_stroke_width": 3
        }
      },
      "black/pink": {
        "0": {
          "radius_off": 1,
          "radius_on": 5,
          "spacing": 30,
          "color_off": "#373737",
          "color_on": "#fb0a8a",
          "bg": "#1b1b1b",
          "ripple_falloff": 0.8,
          "ripple_speed": 20,
          "ripple_length": 5
        }
      },
      "thick": {
        "0": {
          "radius_off": 1,
          "radius_on": 5,
          "color_off": "#adb5ff",
          "color_on": "#0B24FB",
          "spacing": 30,
          "ripple_length": 247113562.7,
          "bg": "#ffffff",
          "ripple_falloff": 0,
          "ripple_speed": 20
        }
      },
      "white/blue": {
        "0": {
          "radius_off": 1,
          "radius_on": 2.444877222692633,
          "color_off": "#b1b9ff",
          "color_on": "#0073d9",
          "bg": "#ffffff",
          "spacing": 38.47248094834886,
          "ripple_falloff": 1,
          "ripple_speed": 20,
          "ripple_length": 59624333.2
        }
      },
      "trip": {
        "0": {
          "color_off": "#373737",
          "color_on": "#84f0aa",
          "bg": "#1b1b1b",
          "radius_off": 1,
          "radius_on": 5,
          "spacing": 30,
          "ripple_falloff": 0.38443691786621514,
          "ripple_speed": 10,
          "ripple_length": 30247.248094834886
        }
      },
      "8-bit": {
        "0": {
          "color_off": "#4e4e4e",
          "color_on": "#e65c68",
          "bg": "#000000",
          "radius_off": 1,
          "radius_on": 2,
          "spacing": 32.376357056694815,
          "ripple_falloff": 0.8,
          "ripple_speed": 1,
          "ripple_length": 5
        }
      },
      "aitch_dense": {
        "0": {
          "color_off": "#2a2a2a",
          "color_on": "#e65c68",
          "bg": "#000000",
          "radius_off": 1,
          "radius_on": 1.5,
          "spacing": 20,
          "logo": true,
          "logo_size_off": 3.408409443391349,
          "logo_size_on": 4.787006720661727,
          "logo_stroke_width": 2.0325693606755126,
          "ripple_falloff": 0.6742891607789074,
          "ripple_speed": 25.537997587454765,
          "ripple_length": 5
        }
      },
      "Preset1": {
        "0": {
          "color_off": "#4e4e4e",
          "color_on": "#e65c68",
          "bg": "#000000",
          "radius_off": 1,
          "radius_on": 5.606238152679649,
          "spacing": 40,
          "logo": true,
          "logo_size_off": 5,
          "logo_size_on": 8,
          "logo_stroke_width": 3,
          "ripple_falloff": 1.2,
          "ripple_speed": 12.027744270205067,
          "ripple_length": 5
        }
      }
    },
    "folders": {
      "Colors": {
        "preset": "Default",
        "closed": false,
        "folders": {}
      },
      "Grid": {
        "preset": "Default",
        "closed": false,
        "folders": {}
      },
      "Logo": {
        "preset": "Default",
        "closed": false,
        "folders": {}
      },
      "Ripple Animation": {
        "preset": "Default",
        "closed": false,
        "folders": {}
      }
    }

  }
}



}