(function (i, s, o, g, r, a, m) {
    i["GoogleAnalyticsObject’"] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
        m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");

function Blocks() {

    "use strict";
    var boxGenerator, floor, wallLeft, wallRight, target, solidIcons, icons, removeTargetTimeout, plusOneList;
    var targetAnimeIn, targetAnimeOut

    const mediumScreen = 640;
    const largeScreen = 960;
    var counter = 0;
    const blue = "#004DC6";
    const darkBlue = "#001F4F";
    const yellow = "#F8E71C";
    const black = "#111";
    const white = "#fff"
    plusOneList = [];
    var ctx = canvas.getContext("2d");


    const rad = d => d * Math.PI / 180;
    const boxes = [];

    // getBoundingClientRect

    const Engine = Matter.Engine;
    const World = Matter.World;
    const Vector = Matter.Vector;
    const Body = Matter.Body;
    const Bodies = Matter.Bodies;
    const Detector = Matter.Detector;

    const Events = Matter.Events;
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
                yActive: -30.5,
                yInactive: -53,
                posY: -50,      //need a position variable outside the matter object to manipulate it through Body.setPosition()
                move: function () {
                    counter += 0.0035;
                    var posX = canvas.width / 2 + canvas.width / 3 * Math.sin(counter);
                    Body.setVelocity(target, { x: 10, y: 0 });
                    Body.setPosition(target, { x: posX, y: this.posY });
                    // console.log(target.position.y)
                }
            }
        )



        World.add(engine.world, floor);
        World.add(engine.world, wallRight);
        World.add(engine.world, wallLeft);

        // Add static solids where Social-Icons are

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


    (function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (boxes.length < boxGenerator.boxAmount) {
            boxes.unshift(Bodies.rectangle(
                boxGenerator.x, boxGenerator.y,
                Math.random() * 40 + 5,
                Math.random() * 50 + 5,
                {
                    frictionAir: 0.01,
                    friction: 0.1,
                    restitution: 0.6
                }
            ));

            boxes[0].color = "rgb(255, 255, 255)";
            boxes[0].strokeStyle = "#111";
            World.add(engine.world, [boxes[0]]);
            Matter.Body.rotate(boxes[0], rad(Math.random() * 360));
        }
        // if (target.active) { target.move(); }


        target.move();
        render();
        Engine.update(engine);  // instead of a single call to Engine.run(engine)
        requestAnimationFrame(update);
    })();


    function render() {
        for (let i = boxes.length - 1; i >= 0; i--) {
            draw(boxes[i], ctx);

            if (!inBounds(boxes[i], canvas)) {
                World.remove(engine.world, boxes[i]);
                boxes.splice(i, 1);
            }
        }
        // if (target.active) { draw(target, ctx) }
        draw(target, ctx)

        for (let i = 0; i < plusOneList.length; i++) {
            plusOneList[i].draw();
        }
    }

    function draw(body, ctx) {
        ctx.fillStyle = body.color || "#111";
        ctx.strokeStyle = body.strokeStyle || "#111";
        ctx.beginPath();
        body.vertices.forEach(e => ctx.lineTo(e.x, e.y));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    };



    function score(body) {
        target.color = white;
        target.strokeStyle = white;
        anime({
            targets: target,
            color: blue,
            duration: 500,
            easing: 'linear',
        })

        if (Math.random() < 0.5) {          // Randomly create a +1 to either right or left of the body
            plusOneList.push(new PlusOne(Math.max(body.position.x - 75, 10) + (Math.random() * 20) - 10, 55))      // Math.max() to make sure the +1 it's not outside the canvas boundaries
        } else {                                                                                                //Math.random() to add a little spacial distribution
            plusOneList.push(new PlusOne(Math.min(body.position.x + 75, canvas.width - 25) + (Math.random() * 20) - 10, 55))
        }
        // _trackEvent('blocks', 'target-hit')
        ga('send', 'event', 'blocks', 'target-hit');  //google analytics tracking
    }

    Events.on(engine, 'collisionStart', function (event) {
        var pairs = event.pairs;
        for (var i = 0; i < pairs.length; i++) {
            if (pairs[i].bodyA === target && pairs[i].bodyB.position.y > 0) {
                // console.log(Detector.collisions(pairs[i], engine) )
                score(pairs[i].bodyB)
            } else if (pairs[i].bodyB === target && pairs[i].bodyA.position.y > 0) {
                // console.log(Detector.collisions(pairs[i], engine) )
                score(pairs[i].bodyA)
            }
        }
    });


    const PlusOne = function (posX, posY) {
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
            y: this.y - 25,
            color: "rgba(0, 77, 198, 0)",
            duration: 3000,
            easing: 'cubicBezier(0.165, 0.840, 0.440, 1.000)',
        })
    }

    targetAnimeOut = anime({
        targets: target,
        posY: target.yInactive,
        duration: 1000,
    })
    targetAnimeOut.pause()


    Events.on(mouseConstraint, 'startdrag', function (event) {
        event.body.color = blue;
        event.body.strokeStyle = blue;   // instantly change color of held block
        // console.log(event.body)

        World.add(engine.world, target);
        targetAnimeIn = anime({
            targets: target,
            posY: target.yActive,
            duration: 1000,
        })

        clearTimeout(removeTargetTimeout);
        targetAnimeOut.pause()

        console.log(event);
        event.body.isSleeping = true;
        // constraintImpulse

        // _trackEvent('blocks', 'mouse.startdrag')
        ga('send', 'event', 'blocks', 'mouse.startdrag');  //google analytics tracking

    })

    Events.on(mouseConstraint, 'enddrag', function (event) {
        anime({         // smoothly change color of held block
            targets: event.body,
            color: white,
            strokeStyle: black
        })

        removeTargetTimeout = window.setTimeout(function () {
            targetAnimeOut = anime({
                targets: target,
                posY: target.yInactive,
                duration: 1000,
                complete: function () { World.remove(engine.world, target); }
            })
        }, 1500)

        // _trackEvent('blocks', 'mouse.enddrag')
        ga('send', 'event', 'blocks', 'mouse.enddrag');  //google analytics tracking
    })


    function resizePlayground() {
        World.remove(engine.world, floor);
        World.remove(engine.world, wallRight);
        World.remove(engine.world, icons);
        createPlayground()
    }
    window.addEventListener('resize', resizePlayground, false);





};


