let render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 560,
        height: 800,
        background: '#f8f9fa',
        wireframes: false
    }
})

// params: x, y, width, height, options
let bottom = Matter.Bodies.rectangle(280,800,560,20, {
    isStatic: true,
    render: {
        fillstyle: '#868e96'
    }
});
Matter.World.add(engine.world, bottom);

function wall(x, y, width, height) {
    return Matter.Bodie.rectangle(x, y, width, height, {
        isStatic: true,
        render: {
            fillStyle: '#868e96'
        }
    });
}

for (let x = 0; x <= 560; x += 80) {
    let divider = wall(x, 610, 20, 360);
    Matter.World.add(engine.world, divider);
}

function peg(x,y) {
    return Matter.Bodies.circle(x, y, 14, {
        isStatic:true,
        render: {
            fillStyle: '#82c91e'
        }
    });
}

let isStaggerRow = false;
for (let y = 200; y <= 400; y += 40) {
    let startX = isStaggerRow ? 80:40;
    for (let x = startX; x <= 520; x+= 80) {
        Matter.World.add(engine.world, peg(x, y));
    }
    isStaggerRow = !isStaggerRow;
}

function bead() {
    return Matter.Bodies.circle(280, 40, 11, {
        render: {
            fillStyle: '#e64980'
        }
    });
}

function dropBead() {
    Matter.World.add(engine.world, bead());
}

let dropBeadInterval = setInterval(dropBead,2000);