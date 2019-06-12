// Insipred from https://codepen.io/ggorlen/pen/LOwrxX?editors=1111 

// import anime from 'lib/anime.es.js';

function Blocks() {
    "use strict";
    var ax, ay, az, pax, pay, paz, axdelta, aydelta, azdelta;
    var boxGenerator, floor, wallLeft, wallRight, target, solidIcons, icons, addTarget, removeTarget, removeTargetTimeout, plusOneList ;
    const mediumScreen = 640;
    const largeScreen = 960;
    var counter = 1;
    const blue = "#004DC6";
    const darkBlue = "#001F4F";
    const yellow = "#F8E71C";
    const black = "#111";
    const white = "#fff"
    plusOneList = [];
    var ctx = canvas.getContext("2d");


    this.running = true;
    const rad = d => d * Math.PI / 180;
    const boxes = [];

    // console.log(solidIcons)
    // getBoundingClientRect

    const Engine = Matter.Engine;
    const World = Matter.World;
    const Vector = Matter.Vector;
    const Body = Matter.Body;
    const Bodies = Matter.Bodies;
    const Detector = Matter.Detector;
    const Events = Matter.Events;
    const engine = Engine.create();
    const door = document.getElementById("door");

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

        if (canvas.width < mediumScreen) {
            boxGenerator = {
                x: (canvas.width / 12) * 4,
                y: -130,
                boxAmount: canvas.width / 15
            }
        } else {

            boxGenerator = {
                x: (canvas.width / 12) * 10,
                y: -130,
                boxAmount: canvas.width / 15
            }
        }

        floor = Bodies.rectangle(
            canvas.width / 2, canvas.height + 25,    // position
            canvas.width, 50,                   // size
            { isStatic: true }
        )

        wallRight = Bodies.rectangle(
            canvas.width + 100, 0,
            200, canvas.height * 2,
            { isStatic: true }
        )

        wallLeft = Bodies.rectangle(
            -100, 0,
            200, canvas.height * 2,
            { isStatic: true }
        )

        target = Bodies.rectangle(
            canvas.width / 2, -40.5, canvas.width / 3, 100, {  //posX, posY, width, height
                isStatic: true,
                // restitution: 300000,
                // friction: 1,
                // inertia: Infinity,
                color: blue,
                strokeStyle: blue,
                active: false,
                move: function () {
                    counter += 0.0035;
                    var px = canvas.width / 2 + canvas.width / 3 * Math.sin(counter);
                    Body.setVelocity(target, { x: 10, y: 0 });
                    Body.setPosition(target, { x: px, y: target.position.y });
                }
            }
        )

        World.add(engine.world, floor);
        World.add(engine.world, wallRight);
        World.add(engine.world, wallLeft);

        // Add static solid where Social-Icons are

        solidIcons = document.getElementsByClassName("solid-icon");
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
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (boxes.length < boxGenerator.boxAmount || Math.random() < 0.0001) {
            boxes.unshift(Bodies.rectangle(
                boxGenerator.x, boxGenerator.y,
                Math.random() * 40 + 5,
                Math.random() * 50 + 5,
                options
            ));

            // boxes[0].color = "hsl(0, 0%, 100%)";
            boxes[0].color = "rgb(255, 255, 255)";
            boxes[0].strokeStyle = "#111";
            World.add(engine.world, [boxes[0]]);
            Matter.Body.rotate(boxes[0], rad(Math.random() * 360));
        }
        if (target.active) { target.move(); }
        render();
        Engine.update(engine);  // instead of a single call to Engine.run(engine)
        requestAnimationFrame(update);
    })();

    function draw(body, ctx) {
        ctx.fillStyle = body.color || "#111";
        ctx.strokeStyle = body.strokeStyle || "#111";
        ctx.beginPath();
        body.vertices.forEach(e => ctx.lineTo(e.x, e.y));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    };

    function render() {
        for (let i = boxes.length - 1; i >= 0; i--) {
            draw(boxes[i], ctx);

            if (!inBounds(boxes[i], canvas)) {
                World.remove(engine.world, boxes[i]);
                boxes.splice(i, 1);
            }
        }
        if (target.active) { draw(target, ctx) }

        for(let i = 0; i < plusOneList.length; i++) {
            plusOneList[i].draw();
        }
       
    }

    Events.on(mouseConstraint, 'startdrag', function (event) {
        event.body.color = blue;
        event.body.strokeStyle = blue;
        clearTimeout(removeTargetTimeout);
        if (!target.active) {
            addTarget();
        }
    });

    Events.on(mouseConstraint, 'enddrag', function (event) {
        event.body.color = white;
        event.body.strokeStyle = black;
        removeTarget();
    });

    function addTarget() {
        World.add(engine.world, target);
        target.active = true;
    }

    function removeTarget() {
        removeTargetTimeout = window.setTimeout(function () {
            World.remove(engine.world, target);
            target.active = false;
            // counter = 1
        }, 2000)
    }

    function score(body) {
        // console.log(target)

        target.color = white;
        target.strokeStyle = white;
        anime({
            targets: target,
            color: blue,
            duration: 500,
            easing: 'linear',
            // position: {
            //     x: 200,
            //     y: -40.5,
            // }
        })

    if (Math.random() < 0.5) {plusOneList.push(new PlusOne(body.position.x - 75, 40))} else {plusOneList.push(new PlusOne(body.position.x + 75, 40))}
    }

    Events.on(engine, 'collisionStart', function (event) {
        var pairs = event.pairs;



        for (var i = 0; i < pairs.length; i++) {
            if (pairs[i].bodyA === target) {
                // console.log(Detector.collisions(pairs[i], engine) )

                score(pairs[i].bodyB)
            } else if (pairs[i].bodyB === target) {
                // console.log(Detector.collisions(pairs[i], engine) )
                score(pairs[i].bodyA)
            }
        }


    });

    function resizePlayground() {
        World.remove(engine.world, floor);
        World.remove(engine.world, wallRight);
        World.remove(engine.world, icons);
        createPlayground()
    }
    window.addEventListener('resize', resizePlayground, false);

    this.stop = function () {
        console.log("I STOPPED")
        // Matter.Engine.clear(this.engine);
        // World.remove(engine.world, ledges);

    }


    const PlusOne = function(posX, posY) {
        this.x = posX;
        this.y = posY;
        this.color = blue;
        
        this.draw = function () {

            ctx.save();
            ctx.fillStyle = this.color;
            ctx.strokeStyle = this.color;
            ctx.font = "20px Crimson Text";
            ctx.fillText("+1", this.x, this.y);
            ctx.restore();
        }

        anime({
            targets: this,
            y: this.y - 15,
            color: "rgba(0, 77, 198, 0)",
            duration: 1500,
            easing: 'linear',
        })
    }

};