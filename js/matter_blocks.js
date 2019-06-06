// Insipred from https://codepen.io/ggorlen/pen/LOwrxX?editors=1111 


function blocks() {
    // "use strict";

    var ax, ay, az, pax, pay, paz, axdelta, aydelta, azdelta;

    var w, h
    const rad = d => d * Math.PI / 180;
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    (function createCanvas() {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
    })();

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

    

    // Create body arrays
    const boxes = [];
    const ledges = [
        Bodies.rectangle(
            canvas.width / 2, canvas.height + 25,    // position
            canvas.width, 50,                   // size
            { isStatic: true }
        ),
    ];

    const boxGenerator = {
        x: (canvas.width / 12) * 7,
        y: -130
    }

    // Add bodies to the world
    World.add(engine.world, ledges);

    const draw = (body, ctx) => {
        ctx.fillStyle = body.color || "#111";
        ctx.beginPath();
        body.vertices.forEach(e => ctx.lineTo(e.x, e.y));
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    };

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
        // shakeListener()
        if (shakeListener()) {
            alert("shaken")
        };

        if (boxes.length < 30 || Math.random() < 0.0001) {
            boxes.unshift(Bodies.rectangle(
                boxGenerator.x, boxGenerator.y, Math.random() * 50 + 5,
                Math.random() * 50 + 5,
                { frictionAir: 0.01, friction: 0.1, restitution: 0.6 }
            ));

            boxes[0].color = "hsl(0, 0%, " + /* ((Math.random() * 50) + 50) */ 100 + "%)";
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


    function shakeListener() {
        if (window.DeviceMotionEvent != undefined) {
            window.ondevicemotion = function (e) {
                ax = event.accelerationIncludingGravity.x;
                ay = event.accelerationIncludingGravity.y;
                az = event.accelerationIncludingGravity.z;
            }
            axdelta = Math.abs(ax - pax);
            aydelta = Math.abs(ay - pay);
            azdelta = Math.abs(az - paz);

            if (axdelta + aydelta + azdelta > 1) {
                // return true;
                alert("shaken")
            }
            pax = ax;
            pay = ay;
            paz = az;
        }
    }

    var stop = function() {
        Matter.Render.stop(this.debugRender); // this only stop renderer but not destroy canvas
        Matter.World.clear(this.engine.world);
        Matter.Engine.clear(this.engine);
        console.log("I STOPPED")
    }

};