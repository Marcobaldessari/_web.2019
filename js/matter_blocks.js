// Insipred from https://codepen.io/ggorlen/pen/LOwrxX?editors=1111 


function Blocks() {
    "use strict";

    var ax, ay, az, pax, pay, paz, axdelta, aydelta, azdelta;
    var boxGenerator, ledges, solidIcons, icons;


    this.running = true;
    const rad = d => d * Math.PI / 180;
    const boxes = [];



    // console.log(solidIcons)
    // getBoundingClientRect

    const Engine = Matter.Engine;
    const World = Matter.World;
    const Vector = Matter.Vector;
    const Bodies = Matter.Bodies;
    const engine = Engine.create();

    const MouseConstraint = Matter.MouseConstraint;
    const mouseConstraint = MouseConstraint.create(engine);
    const setMouseOffset = () => {
        const rect = canvas.getBoundingClientRect();
        Matter.Mouse.setOffset(mouseConstraint.mouse, {
            x: -rect.x, y: -rect.y
        });
    };
    setMouseOffset();
    document.addEventListener("mousemove", e =>
        setTimeout(setMouseOffset, 500)
    );
    World.add(engine.world, mouseConstraint);

    // define where is the generator, where are the ledges and the solid icons
    function createPlayground() {
        boxGenerator = {
            x: (canvas.width / 12) * 7,
            y: -130,
            boxAmount: canvas.width / 15
        }

        ledges = [
            Bodies.rectangle(
                canvas.width / 2, canvas.height + 25,    // position
                canvas.width, 50,                   // size
                { isStatic: true }
            ),
        ]
        World.add(engine.world, ledges);

        // Add static solid where Social-Icons are
        solidIcons = document.getElementsByClassName("solid-icon");
        // for (let i = 0; i < solidIcons.length; i++) {
        //     solidIcons[i].getBoundingClientRect()
        // }
        icons = [

            // Logo
            Bodies.circle(
                solidIcons[0].getBoundingClientRect().x + solidIcons[0].getBoundingClientRect().width / 2,      // posX
                solidIcons[0].getBoundingClientRect().y + solidIcons[0].getBoundingClientRect().height / 2,     // posY
                24,
                { isStatic: true }
            ),

            // Icon Dribbble
            Bodies.circle(
                solidIcons[1].getBoundingClientRect().x + solidIcons[1].getBoundingClientRect().width / 2,      // posX
                solidIcons[1].getBoundingClientRect().y + solidIcons[1].getBoundingClientRect().height / 2,     // posY
                15,
                { isStatic: true }
            ),

            // Icon Medium
            Bodies.rectangle(
                solidIcons[2].getBoundingClientRect().x + solidIcons[2].getBoundingClientRect().width / 2,      // posX
                solidIcons[2].getBoundingClientRect().y + solidIcons[2].getBoundingClientRect().height / 2,     // posY
                33, 33,
                { isStatic: true }
            ),

            // // Icon Github
            Bodies.circle(
                solidIcons[3].getBoundingClientRect().x + solidIcons[3].getBoundingClientRect().width / 2,      // posX
                solidIcons[3].getBoundingClientRect().y + solidIcons[3].getBoundingClientRect().height / 2,     // posY
                16,
                { isStatic: true }
            )
        ]
        World.add(engine.world, icons);
    }
    createPlayground();

    // drawing function
    const draw = (body, ctx) => {
        ctx.fillStyle = body.color || "#111";
        ctx.beginPath();
        body.vertices.forEach(e => ctx.lineTo(e.x, e.y));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    };

    // trigger for boxes leaving the canvas
    const inBounds = (body, canvas) => {
        for (let i = 0; i < body.vertices.length; i++) {
            if (body.vertices[i].x < canvas.width &&
                body.vertices[i].x > 0 &&
                body.vertices[i].y < canvas.height //&&
      /*body.vertices[i].y > 0*/) {
                return true;
            }
        }
        return false;
    };

    var options = { frictionAir: 0.01, friction: 0.1, restitution: 0.6 };

    (function update() {
        if (boxes.length < boxGenerator.boxAmount || Math.random() < 0.0001) {
            boxes.unshift(Bodies.rectangle(
                boxGenerator.x, boxGenerator.y,
                Math.random() * 40 + 5,
                Math.random() * 50 + 5,
                options
            ));

            // boxes[0].color = "hsl(0, 0%, 100%)";
            boxes[0].color = "rgb(255, 255, 255)";
            boxes[0].strokeStyle = "rgb(2, 32, 78)";
            World.add(engine.world, [boxes[0]]);
            Matter.Body.rotate(boxes[0], rad(Math.random() * 360));
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = boxes.length - 1; i >= 0; i--) {
            draw(boxes[i], ctx);

            if (!inBounds(boxes[i], canvas)) {
                World.remove(engine.world, boxes[i]);
                boxes.splice(i, 1);
            }
        }
        /*for (let i = 0; i < ledges.lenght; i++){
          draw(ledges[i],ctx);
        };*/
        ledges.forEach(e => draw(e, ctx));
        Engine.update(engine);  // instead of a single call to Engine.run(engine)
        requestAnimationFrame(update);
    })();



    function resizePlayground () {
        World.remove(engine.world, ledges);
        World.remove(engine.world, icons);
        createPlayground()
    }
    window.addEventListener('resize', resizePlayground, false);

    this.stop = function () {
        console.log("I STOPPED")
        // Matter.Engine.clear(this.engine);
        ledges.forEach(e => console.log(e));
        // World.remove(engine.world, ledges);

    }
};