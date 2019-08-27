(function(e) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = e();
    } else if (typeof define === "function" && define.amd) {
        define([], e);
    } else {
        var t;
        if (typeof window !== "undefined") {
            t = window;
        } else if (typeof global !== "undefined") {
            t = global;
        } else if (typeof self !== "undefined") {
            t = self;
        } else {
            t = this;
        }
        t.Matter = e();
    }
})(function() {
    var e, t, n;
    return function() {
        function e(t, n, i) {
            function o(s, a) {
                if (!n[s]) {
                    if (!t[s]) {
                        var l = "function" == typeof require && require;
                        if (!a && l) return l(s, !0);
                        if (r) return r(s, !0);
                        var c = new Error("Cannot find module '" + s + "'");
                        throw c.code = "MODULE_NOT_FOUND", c;
                    }
                    var u = n[s] = {
                        exports: {}
                    };
                    t[s][0].call(u.exports, function(e) {
                        var n = t[s][1][e];
                        return o(n || e);
                    }, u, u.exports, e, t, n, i);
                }
                return n[s].exports;
            }
            for (var r = "function" == typeof require && require, s = 0; s < i.length; s++) o(i[s]);
            return o;
        }
        return e;
    }()({
        1: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("../geometry/Vertices");
            var r = e("../geometry/Vector");
            var s = e("../core/Sleeping");
            var a = e("../render/Render");
            var l = e("../core/Common");
            var c = e("../geometry/Bounds");
            var u = e("../geometry/Axes");
            (function() {
                i._inertiaScale = 4;
                i._nextCollidingGroupId = 1;
                i._nextNonCollidingGroupId = -1;
                i._nextCategory = 1;
                i.create = function(t) {
                    var n = {
                        id: l.nextId(),
                        type: "body",
                        label: "Body",
                        parts: [],
                        plugin: {},
                        angle: 0,
                        vertices: o.fromPath("L 0 0 L 40 0 L 40 40 L 0 40"),
                        position: {
                            x: 0,
                            y: 0
                        },
                        force: {
                            x: 0,
                            y: 0
                        },
                        torque: 0,
                        positionImpulse: {
                            x: 0,
                            y: 0
                        },
                        constraintImpulse: {
                            x: 0,
                            y: 0,
                            angle: 0
                        },
                        totalContacts: 0,
                        speed: 0,
                        angularSpeed: 0,
                        velocity: {
                            x: 0,
                            y: 0
                        },
                        angularVelocity: 0,
                        isSensor: false,
                        isStatic: false,
                        isSleeping: false,
                        motion: 0,
                        sleepThreshold: 60,
                        density: .001,
                        restitution: 0,
                        friction: .1,
                        frictionStatic: .5,
                        frictionAir: .01,
                        collisionFilter: {
                            category: 1,
                            mask: 4294967295,
                            group: 0
                        },
                        slop: .05,
                        timeScale: 1,
                        render: {
                            visible: true,
                            opacity: 1,
                            sprite: {
                                xScale: 1,
                                yScale: 1,
                                xOffset: 0,
                                yOffset: 0
                            },
                            lineWidth: 0
                        }
                    };
                    var i = l.extend(n, t);
                    e(i, t);
                    return i;
                };
                i.nextGroup = function(e) {
                    if (e) return i._nextNonCollidingGroupId--;
                    return i._nextCollidingGroupId++;
                };
                i.nextCategory = function() {
                    i._nextCategory = i._nextCategory << 1;
                    return i._nextCategory;
                };
                var e = function(e, t) {
                    t = t || {};
                    i.set(e, {
                        bounds: e.bounds || c.create(e.vertices),
                        positionPrev: e.positionPrev || r.clone(e.position),
                        anglePrev: e.anglePrev || e.angle,
                        vertices: e.vertices,
                        parts: e.parts || [ e ],
                        isStatic: e.isStatic,
                        isSleeping: e.isSleeping,
                        parent: e.parent || e
                    });
                    o.rotate(e.vertices, e.angle, e.position);
                    u.rotate(e.axes, e.angle);
                    c.update(e.bounds, e.vertices, e.velocity);
                    i.set(e, {
                        axes: t.axes || e.axes,
                        area: t.area || e.area,
                        mass: t.mass || e.mass,
                        inertia: t.inertia || e.inertia
                    });
                    var n = e.isStatic ? "#2e2b44" : l.choose([ "#006BA6", "#0496FF", "#FFBC42", "#D81159", "#8F2D56" ]), s = "#000";
                    e.render.fillStyle = e.render.fillStyle || n;
                    e.render.strokeStyle = e.render.strokeStyle || s;
                    e.render.sprite.xOffset += -(e.bounds.min.x - e.position.x) / (e.bounds.max.x - e.bounds.min.x);
                    e.render.sprite.yOffset += -(e.bounds.min.y - e.position.y) / (e.bounds.max.y - e.bounds.min.y);
                };
                i.set = function(e, t, n) {
                    var o;
                    if (typeof t === "string") {
                        o = t;
                        t = {};
                        t[o] = n;
                    }
                    for (o in t) {
                        n = t[o];
                        if (!t.hasOwnProperty(o)) continue;
                        switch (o) {
                          case "isStatic":
                            i.setStatic(e, n);
                            break;

                          case "isSleeping":
                            s.set(e, n);
                            break;

                          case "mass":
                            i.setMass(e, n);
                            break;

                          case "density":
                            i.setDensity(e, n);
                            break;

                          case "inertia":
                            i.setInertia(e, n);
                            break;

                          case "vertices":
                            i.setVertices(e, n);
                            break;

                          case "position":
                            i.setPosition(e, n);
                            break;

                          case "angle":
                            i.setAngle(e, n);
                            break;

                          case "velocity":
                            i.setVelocity(e, n);
                            break;

                          case "angularVelocity":
                            i.setAngularVelocity(e, n);
                            break;

                          case "parts":
                            i.setParts(e, n);
                            break;

                          default:
                            e[o] = n;
                        }
                    }
                };
                i.setStatic = function(e, t) {
                    for (var n = 0; n < e.parts.length; n++) {
                        var i = e.parts[n];
                        i.isStatic = t;
                        if (t) {
                            i._original = {
                                restitution: i.restitution,
                                friction: i.friction,
                                mass: i.mass,
                                inertia: i.inertia,
                                density: i.density,
                                inverseMass: i.inverseMass,
                                inverseInertia: i.inverseInertia
                            };
                            i.restitution = 0;
                            i.friction = 1;
                            i.mass = i.inertia = i.density = Infinity;
                            i.inverseMass = i.inverseInertia = 0;
                            i.positionPrev.x = i.position.x;
                            i.positionPrev.y = i.position.y;
                            i.anglePrev = i.angle;
                            i.angularVelocity = 0;
                            i.speed = 0;
                            i.angularSpeed = 0;
                            i.motion = 0;
                        } else if (i._original) {
                            i.restitution = i._original.restitution;
                            i.friction = i._original.friction;
                            i.mass = i._original.mass;
                            i.inertia = i._original.inertia;
                            i.density = i._original.density;
                            i.inverseMass = i._original.inverseMass;
                            i.inverseInertia = i._original.inverseInertia;
                            delete i._original;
                        }
                    }
                };
                i.setMass = function(e, t) {
                    var n = e.inertia / (e.mass / 6);
                    e.inertia = n * (t / 6);
                    e.inverseInertia = 1 / e.inertia;
                    e.mass = t;
                    e.inverseMass = 1 / e.mass;
                    e.density = e.mass / e.area;
                };
                i.setDensity = function(e, t) {
                    i.setMass(e, t * e.area);
                    e.density = t;
                };
                i.setInertia = function(e, t) {
                    e.inertia = t;
                    e.inverseInertia = 1 / e.inertia;
                };
                i.setVertices = function(e, t) {
                    if (t[0].body === e) {
                        e.vertices = t;
                    } else {
                        e.vertices = o.create(t, e);
                    }
                    e.axes = u.fromVertices(e.vertices);
                    e.area = o.area(e.vertices);
                    i.setMass(e, e.density * e.area);
                    var n = o.centre(e.vertices);
                    o.translate(e.vertices, n, -1);
                    i.setInertia(e, i._inertiaScale * o.inertia(e.vertices, e.mass));
                    o.translate(e.vertices, e.position);
                    c.update(e.bounds, e.vertices, e.velocity);
                };
                i.setParts = function(e, t, n) {
                    var r;
                    t = t.slice(0);
                    e.parts.length = 0;
                    e.parts.push(e);
                    e.parent = e;
                    for (r = 0; r < t.length; r++) {
                        var s = t[r];
                        if (s !== e) {
                            s.parent = e;
                            e.parts.push(s);
                        }
                    }
                    if (e.parts.length === 1) return;
                    n = typeof n !== "undefined" ? n : true;
                    if (n) {
                        var a = [];
                        for (r = 0; r < t.length; r++) {
                            a = a.concat(t[r].vertices);
                        }
                        o.clockwiseSort(a);
                        var l = o.hull(a), c = o.centre(l);
                        i.setVertices(e, l);
                        o.translate(e.vertices, c);
                    }
                    var u = i._totalProperties(e);
                    e.area = u.area;
                    e.parent = e;
                    e.position.x = u.centre.x;
                    e.position.y = u.centre.y;
                    e.positionPrev.x = u.centre.x;
                    e.positionPrev.y = u.centre.y;
                    i.setMass(e, u.mass);
                    i.setInertia(e, u.inertia);
                    i.setPosition(e, u.centre);
                };
                i.setPosition = function(e, t) {
                    var n = r.sub(t, e.position);
                    e.positionPrev.x += n.x;
                    e.positionPrev.y += n.y;
                    for (var i = 0; i < e.parts.length; i++) {
                        var s = e.parts[i];
                        s.position.x += n.x;
                        s.position.y += n.y;
                        o.translate(s.vertices, n);
                        c.update(s.bounds, s.vertices, e.velocity);
                    }
                };
                i.setAngle = function(e, t) {
                    var n = t - e.angle;
                    e.anglePrev += n;
                    for (var i = 0; i < e.parts.length; i++) {
                        var s = e.parts[i];
                        s.angle += n;
                        o.rotate(s.vertices, n, e.position);
                        u.rotate(s.axes, n);
                        c.update(s.bounds, s.vertices, e.velocity);
                        if (i > 0) {
                            r.rotateAbout(s.position, n, e.position, s.position);
                        }
                    }
                };
                i.setVelocity = function(e, t) {
                    e.positionPrev.x = e.position.x - t.x;
                    e.positionPrev.y = e.position.y - t.y;
                    e.velocity.x = t.x;
                    e.velocity.y = t.y;
                    e.speed = r.magnitude(e.velocity);
                };
                i.setAngularVelocity = function(e, t) {
                    e.anglePrev = e.angle - t;
                    e.angularVelocity = t;
                    e.angularSpeed = Math.abs(e.angularVelocity);
                };
                i.translate = function(e, t) {
                    i.setPosition(e, r.add(e.position, t));
                };
                i.rotate = function(e, t, n) {
                    if (!n) {
                        i.setAngle(e, e.angle + t);
                    } else {
                        var o = Math.cos(t), r = Math.sin(t), s = e.position.x - n.x, a = e.position.y - n.y;
                        i.setPosition(e, {
                            x: n.x + (s * o - a * r),
                            y: n.y + (s * r + a * o)
                        });
                        i.setAngle(e, e.angle + t);
                    }
                };
                i.scale = function(e, t, n, r) {
                    var s = 0, a = 0;
                    r = r || e.position;
                    for (var l = 0; l < e.parts.length; l++) {
                        var f = e.parts[l];
                        o.scale(f.vertices, t, n, r);
                        f.axes = u.fromVertices(f.vertices);
                        f.area = o.area(f.vertices);
                        i.setMass(f, e.density * f.area);
                        o.translate(f.vertices, {
                            x: -f.position.x,
                            y: -f.position.y
                        });
                        i.setInertia(f, i._inertiaScale * o.inertia(f.vertices, f.mass));
                        o.translate(f.vertices, {
                            x: f.position.x,
                            y: f.position.y
                        });
                        if (l > 0) {
                            s += f.area;
                            a += f.inertia;
                        }
                        f.position.x = r.x + (f.position.x - r.x) * t;
                        f.position.y = r.y + (f.position.y - r.y) * n;
                        c.update(f.bounds, f.vertices, e.velocity);
                    }
                    if (e.parts.length > 1) {
                        e.area = s;
                        if (!e.isStatic) {
                            i.setMass(e, e.density * s);
                            i.setInertia(e, a);
                        }
                    }
                    if (e.circleRadius) {
                        if (t === n) {
                            e.circleRadius *= t;
                        } else {
                            e.circleRadius = null;
                        }
                    }
                };
                i.update = function(e, t, n, i) {
                    var s = Math.pow(t * n * e.timeScale, 2);
                    var a = 1 - e.frictionAir * n * e.timeScale, l = e.position.x - e.positionPrev.x, f = e.position.y - e.positionPrev.y;
                    e.velocity.x = l * a * i + e.force.x / e.mass * s;
                    e.velocity.y = f * a * i + e.force.y / e.mass * s;
                    e.positionPrev.x = e.position.x;
                    e.positionPrev.y = e.position.y;
                    e.position.x += e.velocity.x;
                    e.position.y += e.velocity.y;
                    e.angularVelocity = (e.angle - e.anglePrev) * a * i + e.torque / e.inertia * s;
                    e.anglePrev = e.angle;
                    e.angle += e.angularVelocity;
                    e.speed = r.magnitude(e.velocity);
                    e.angularSpeed = Math.abs(e.angularVelocity);
                    for (var d = 0; d < e.parts.length; d++) {
                        var p = e.parts[d];
                        o.translate(p.vertices, e.velocity);
                        if (d > 0) {
                            p.position.x += e.velocity.x;
                            p.position.y += e.velocity.y;
                        }
                        if (e.angularVelocity !== 0) {
                            o.rotate(p.vertices, e.angularVelocity, e.position);
                            u.rotate(p.axes, e.angularVelocity);
                            if (d > 0) {
                                r.rotateAbout(p.position, e.angularVelocity, e.position, p.position);
                            }
                        }
                        c.update(p.bounds, p.vertices, e.velocity);
                    }
                };
                i.applyForce = function(e, t, n) {
                    e.force.x += n.x;
                    e.force.y += n.y;
                    var i = {
                        x: t.x - e.position.x,
                        y: t.y - e.position.y
                    };
                    e.torque += i.x * n.y - i.y * n.x;
                };
                i._totalProperties = function(e) {
                    var t = {
                        mass: 0,
                        area: 0,
                        inertia: 0,
                        centre: {
                            x: 0,
                            y: 0
                        }
                    };
                    for (var n = e.parts.length === 1 ? 0 : 1; n < e.parts.length; n++) {
                        var i = e.parts[n], o = i.mass !== Infinity ? i.mass : 1;
                        t.mass += o;
                        t.area += i.area;
                        t.inertia += i.inertia;
                        t.centre = r.add(t.centre, r.mult(i.position, o));
                    }
                    t.centre = r.div(t.centre, t.mass);
                    return t;
                };
            })();
        }, {
            "../core/Common": 14,
            "../core/Sleeping": 22,
            "../geometry/Axes": 25,
            "../geometry/Bounds": 26,
            "../geometry/Vector": 28,
            "../geometry/Vertices": 29,
            "../render/Render": 31
        } ],
        2: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("../core/Events");
            var r = e("../core/Common");
            var s = e("../geometry/Bounds");
            var a = e("./Body");
            (function() {
                i.create = function(e) {
                    return r.extend({
                        id: r.nextId(),
                        type: "composite",
                        parent: null,
                        isModified: false,
                        bodies: [],
                        constraints: [],
                        composites: [],
                        label: "Composite",
                        plugin: {}
                    }, e);
                };
                i.setModified = function(e, t, n, o) {
                    e.isModified = t;
                    if (n && e.parent) {
                        i.setModified(e.parent, t, n, o);
                    }
                    if (o) {
                        for (var r = 0; r < e.composites.length; r++) {
                            var s = e.composites[r];
                            i.setModified(s, t, n, o);
                        }
                    }
                };
                i.add = function(e, t) {
                    var n = [].concat(t);
                    o.trigger(e, "beforeAdd", {
                        object: t
                    });
                    for (var s = 0; s < n.length; s++) {
                        var a = n[s];
                        switch (a.type) {
                          case "body":
                            if (a.parent !== a) {
                                r.warn("Composite.add: skipped adding a compound body part (you must add its parent instead)");
                                break;
                            }
                            i.addBody(e, a);
                            break;

                          case "constraint":
                            i.addConstraint(e, a);
                            break;

                          case "composite":
                            i.addComposite(e, a);
                            break;

                          case "mouseConstraint":
                            i.addConstraint(e, a.constraint);
                            break;
                        }
                    }
                    o.trigger(e, "afterAdd", {
                        object: t
                    });
                    return e;
                };
                i.remove = function(e, t, n) {
                    var r = [].concat(t);
                    o.trigger(e, "beforeRemove", {
                        object: t
                    });
                    for (var s = 0; s < r.length; s++) {
                        var a = r[s];
                        switch (a.type) {
                          case "body":
                            i.removeBody(e, a, n);
                            break;

                          case "constraint":
                            i.removeConstraint(e, a, n);
                            break;

                          case "composite":
                            i.removeComposite(e, a, n);
                            break;

                          case "mouseConstraint":
                            i.removeConstraint(e, a.constraint);
                            break;
                        }
                    }
                    o.trigger(e, "afterRemove", {
                        object: t
                    });
                    return e;
                };
                i.addComposite = function(e, t) {
                    e.composites.push(t);
                    t.parent = e;
                    i.setModified(e, true, true, false);
                    return e;
                };
                i.removeComposite = function(e, t, n) {
                    var o = r.indexOf(e.composites, t);
                    if (o !== -1) {
                        i.removeCompositeAt(e, o);
                        i.setModified(e, true, true, false);
                    }
                    if (n) {
                        for (var s = 0; s < e.composites.length; s++) {
                            i.removeComposite(e.composites[s], t, true);
                        }
                    }
                    return e;
                };
                i.removeCompositeAt = function(e, t) {
                    e.composites.splice(t, 1);
                    i.setModified(e, true, true, false);
                    return e;
                };
                i.addBody = function(e, t) {
                    e.bodies.push(t);
                    i.setModified(e, true, true, false);
                    return e;
                };
                i.removeBody = function(e, t, n) {
                    var o = r.indexOf(e.bodies, t);
                    if (o !== -1) {
                        i.removeBodyAt(e, o);
                        i.setModified(e, true, true, false);
                    }
                    if (n) {
                        for (var s = 0; s < e.composites.length; s++) {
                            i.removeBody(e.composites[s], t, true);
                        }
                    }
                    return e;
                };
                i.removeBodyAt = function(e, t) {
                    e.bodies.splice(t, 1);
                    i.setModified(e, true, true, false);
                    return e;
                };
                i.addConstraint = function(e, t) {
                    e.constraints.push(t);
                    i.setModified(e, true, true, false);
                    return e;
                };
                i.removeConstraint = function(e, t, n) {
                    var o = r.indexOf(e.constraints, t);
                    if (o !== -1) {
                        i.removeConstraintAt(e, o);
                    }
                    if (n) {
                        for (var s = 0; s < e.composites.length; s++) {
                            i.removeConstraint(e.composites[s], t, true);
                        }
                    }
                    return e;
                };
                i.removeConstraintAt = function(e, t) {
                    e.constraints.splice(t, 1);
                    i.setModified(e, true, true, false);
                    return e;
                };
                i.clear = function(e, t, n) {
                    if (n) {
                        for (var o = 0; o < e.composites.length; o++) {
                            i.clear(e.composites[o], t, true);
                        }
                    }
                    if (t) {
                        e.bodies = e.bodies.filter(function(e) {
                            return e.isStatic;
                        });
                    } else {
                        e.bodies.length = 0;
                    }
                    e.constraints.length = 0;
                    e.composites.length = 0;
                    i.setModified(e, true, true, false);
                    return e;
                };
                i.allBodies = function(e) {
                    var t = [].concat(e.bodies);
                    for (var n = 0; n < e.composites.length; n++) t = t.concat(i.allBodies(e.composites[n]));
                    return t;
                };
                i.allConstraints = function(e) {
                    var t = [].concat(e.constraints);
                    for (var n = 0; n < e.composites.length; n++) t = t.concat(i.allConstraints(e.composites[n]));
                    return t;
                };
                i.allComposites = function(e) {
                    var t = [].concat(e.composites);
                    for (var n = 0; n < e.composites.length; n++) t = t.concat(i.allComposites(e.composites[n]));
                    return t;
                };
                i.get = function(e, t, n) {
                    var o, r;
                    switch (n) {
                      case "body":
                        o = i.allBodies(e);
                        break;

                      case "constraint":
                        o = i.allConstraints(e);
                        break;

                      case "composite":
                        o = i.allComposites(e).concat(e);
                        break;
                    }
                    if (!o) return null;
                    r = o.filter(function(e) {
                        return e.id.toString() === t.toString();
                    });
                    return r.length === 0 ? null : r[0];
                };
                i.move = function(e, t, n) {
                    i.remove(e, t);
                    i.add(n, t);
                    return e;
                };
                i.rebase = function(e) {
                    var t = i.allBodies(e).concat(i.allConstraints(e)).concat(i.allComposites(e));
                    for (var n = 0; n < t.length; n++) {
                        t[n].id = r.nextId();
                    }
                    i.setModified(e, true, true, false);
                    return e;
                };
                i.translate = function(e, t, n) {
                    var o = n ? i.allBodies(e) : e.bodies;
                    for (var r = 0; r < o.length; r++) {
                        a.translate(o[r], t);
                    }
                    i.setModified(e, true, true, false);
                    return e;
                };
                i.rotate = function(e, t, n, o) {
                    var r = Math.cos(t), s = Math.sin(t), l = o ? i.allBodies(e) : e.bodies;
                    for (var c = 0; c < l.length; c++) {
                        var u = l[c], f = u.position.x - n.x, d = u.position.y - n.y;
                        a.setPosition(u, {
                            x: n.x + (f * r - d * s),
                            y: n.y + (f * s + d * r)
                        });
                        a.rotate(u, t);
                    }
                    i.setModified(e, true, true, false);
                    return e;
                };
                i.scale = function(e, t, n, o, r) {
                    var s = r ? i.allBodies(e) : e.bodies;
                    for (var l = 0; l < s.length; l++) {
                        var c = s[l], u = c.position.x - o.x, f = c.position.y - o.y;
                        a.setPosition(c, {
                            x: o.x + u * t,
                            y: o.y + f * n
                        });
                        a.scale(c, t, n);
                    }
                    i.setModified(e, true, true, false);
                    return e;
                };
                i.bounds = function(e) {
                    var t = i.allBodies(e), n = [];
                    for (var o = 0; o < t.length; o += 1) {
                        var r = t[o];
                        n.push(r.bounds.min, r.bounds.max);
                    }
                    return s.create(n);
                };
            })();
        }, {
            "../core/Common": 14,
            "../core/Events": 16,
            "../geometry/Bounds": 26,
            "./Body": 1
        } ],
        3: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("./Composite");
            var r = e("../constraint/Constraint");
            var s = e("../core/Common");
            (function() {
                i.create = function(e) {
                    var t = o.create();
                    var n = {
                        label: "World",
                        gravity: {
                            x: 0,
                            y: 1,
                            scale: .001
                        },
                        bounds: {
                            min: {
                                x: -Infinity,
                                y: -Infinity
                            },
                            max: {
                                x: Infinity,
                                y: Infinity
                            }
                        }
                    };
                    return s.extend(t, n, e);
                };
            })();
        }, {
            "../constraint/Constraint": 12,
            "../core/Common": 14,
            "./Composite": 2
        } ],
        4: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            (function() {
                i.create = function(e) {
                    return {
                        id: i.id(e),
                        vertex: e,
                        normalImpulse: 0,
                        tangentImpulse: 0
                    };
                };
                i.id = function(e) {
                    return e.body.id + "_" + e.index;
                };
            })();
        }, {} ],
        5: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("./SAT");
            var r = e("./Pair");
            var s = e("../geometry/Bounds");
            (function() {
                i.collisions = function(e, t) {
                    var n = [], a = t.pairs.table;
                    for (var l = 0; l < e.length; l++) {
                        var c = e[l][0], u = e[l][1];
                        if ((c.isStatic || c.isSleeping) && (u.isStatic || u.isSleeping)) continue;
                        if (!i.canCollide(c.collisionFilter, u.collisionFilter)) continue;
                        if (s.overlaps(c.bounds, u.bounds)) {
                            for (var f = c.parts.length > 1 ? 1 : 0; f < c.parts.length; f++) {
                                var d = c.parts[f];
                                for (var p = u.parts.length > 1 ? 1 : 0; p < u.parts.length; p++) {
                                    var v = u.parts[p];
                                    if (d === c && v === u || s.overlaps(d.bounds, v.bounds)) {
                                        var m = r.id(d, v), y = a[m], g;
                                        if (y && y.isActive) {
                                            g = y.collision;
                                        } else {
                                            g = null;
                                        }
                                        var x = o.collides(d, v, g);
                                        if (x.collided) {
                                            n.push(x);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return n;
                };
                i.canCollide = function(e, t) {
                    if (e.group === t.group && e.group !== 0) return e.group > 0;
                    return (e.mask & t.category) !== 0 && (t.mask & e.category) !== 0;
                };
            })();
        }, {
            "../geometry/Bounds": 26,
            "./Pair": 7,
            "./SAT": 11
        } ],
        6: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("./Pair");
            var r = e("./Detector");
            var s = e("../core/Common");
            (function() {
                i.create = function(e) {
                    var t = {
                        controller: i,
                        detector: r.collisions,
                        buckets: {},
                        pairs: {},
                        pairsList: [],
                        bucketWidth: 48,
                        bucketHeight: 48
                    };
                    return s.extend(t, e);
                };
                i.update = function(e, t, n, o) {
                    var r, s, a, l = n.world, c = e.buckets, u, f, d = false;
                    for (r = 0; r < t.length; r++) {
                        var p = t[r];
                        if (p.isSleeping && !o) continue;
                        if (p.bounds.max.x < l.bounds.min.x || p.bounds.min.x > l.bounds.max.x || p.bounds.max.y < l.bounds.min.y || p.bounds.min.y > l.bounds.max.y) continue;
                        var v = i._getRegion(e, p);
                        if (!p.region || v.id !== p.region.id || o) {
                            if (!p.region || o) p.region = v;
                            var m = i._regionUnion(v, p.region);
                            for (s = m.startCol; s <= m.endCol; s++) {
                                for (a = m.startRow; a <= m.endRow; a++) {
                                    f = i._getBucketId(s, a);
                                    u = c[f];
                                    var y = s >= v.startCol && s <= v.endCol && a >= v.startRow && a <= v.endRow;
                                    var g = s >= p.region.startCol && s <= p.region.endCol && a >= p.region.startRow && a <= p.region.endRow;
                                    if (!y && g) {
                                        if (g) {
                                            if (u) i._bucketRemoveBody(e, u, p);
                                        }
                                    }
                                    if (p.region === v || y && !g || o) {
                                        if (!u) u = i._createBucket(c, f);
                                        i._bucketAddBody(e, u, p);
                                    }
                                }
                            }
                            p.region = v;
                            d = true;
                        }
                    }
                    if (d) e.pairsList = i._createActivePairsList(e);
                };
                i.clear = function(e) {
                    e.buckets = {};
                    e.pairs = {};
                    e.pairsList = [];
                };
                i._regionUnion = function(e, t) {
                    var n = Math.min(e.startCol, t.startCol), o = Math.max(e.endCol, t.endCol), r = Math.min(e.startRow, t.startRow), s = Math.max(e.endRow, t.endRow);
                    return i._createRegion(n, o, r, s);
                };
                i._getRegion = function(e, t) {
                    var n = t.bounds, o = Math.floor(n.min.x / e.bucketWidth), r = Math.floor(n.max.x / e.bucketWidth), s = Math.floor(n.min.y / e.bucketHeight), a = Math.floor(n.max.y / e.bucketHeight);
                    return i._createRegion(o, r, s, a);
                };
                i._createRegion = function(e, t, n, i) {
                    return {
                        id: e + "," + t + "," + n + "," + i,
                        startCol: e,
                        endCol: t,
                        startRow: n,
                        endRow: i
                    };
                };
                i._getBucketId = function(e, t) {
                    return "C" + e + "R" + t;
                };
                i._createBucket = function(e, t) {
                    var n = e[t] = [];
                    return n;
                };
                i._bucketAddBody = function(e, t, n) {
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i];
                        if (n.id === r.id || n.isStatic && r.isStatic) continue;
                        var s = o.id(n, r), a = e.pairs[s];
                        if (a) {
                            a[2] += 1;
                        } else {
                            e.pairs[s] = [ n, r, 1 ];
                        }
                    }
                    t.push(n);
                };
                i._bucketRemoveBody = function(e, t, n) {
                    t.splice(s.indexOf(t, n), 1);
                    for (var i = 0; i < t.length; i++) {
                        var r = t[i], a = o.id(n, r), l = e.pairs[a];
                        if (l) l[2] -= 1;
                    }
                };
                i._createActivePairsList = function(e) {
                    var t, n, i = [];
                    t = s.keys(e.pairs);
                    for (var o = 0; o < t.length; o++) {
                        n = e.pairs[t[o]];
                        if (n[2] > 0) {
                            i.push(n);
                        } else {
                            delete e.pairs[t[o]];
                        }
                    }
                    return i;
                };
            })();
        }, {
            "../core/Common": 14,
            "./Detector": 5,
            "./Pair": 7
        } ],
        7: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("./Contact");
            (function() {
                i.create = function(e, t) {
                    var n = e.bodyA, o = e.bodyB, r = e.parentA, s = e.parentB;
                    var a = {
                        id: i.id(n, o),
                        bodyA: n,
                        bodyB: o,
                        contacts: {},
                        activeContacts: [],
                        separation: 0,
                        isActive: true,
                        isSensor: n.isSensor || o.isSensor,
                        timeCreated: t,
                        timeUpdated: t,
                        inverseMass: r.inverseMass + s.inverseMass,
                        friction: Math.min(r.friction, s.friction),
                        frictionStatic: Math.max(r.frictionStatic, s.frictionStatic),
                        restitution: Math.max(r.restitution, s.restitution),
                        slop: Math.max(r.slop, s.slop)
                    };
                    i.update(a, e, t);
                    return a;
                };
                i.update = function(e, t, n) {
                    var r = e.contacts, s = t.supports, a = e.activeContacts, l = t.parentA, c = t.parentB;
                    e.collision = t;
                    e.inverseMass = l.inverseMass + c.inverseMass;
                    e.friction = Math.min(l.friction, c.friction);
                    e.frictionStatic = Math.max(l.frictionStatic, c.frictionStatic);
                    e.restitution = Math.max(l.restitution, c.restitution);
                    e.slop = Math.max(l.slop, c.slop);
                    a.length = 0;
                    if (t.collided) {
                        for (var u = 0; u < s.length; u++) {
                            var f = s[u], d = o.id(f), p = r[d];
                            if (p) {
                                a.push(p);
                            } else {
                                a.push(r[d] = o.create(f));
                            }
                        }
                        e.separation = t.depth;
                        i.setActive(e, true, n);
                    } else {
                        if (e.isActive === true) i.setActive(e, false, n);
                    }
                };
                i.setActive = function(e, t, n) {
                    if (t) {
                        e.isActive = true;
                        e.timeUpdated = n;
                    } else {
                        e.isActive = false;
                        e.activeContacts.length = 0;
                    }
                };
                i.id = function(e, t) {
                    if (e.id < t.id) {
                        return "A" + e.id + "B" + t.id;
                    } else {
                        return "A" + t.id + "B" + e.id;
                    }
                };
            })();
        }, {
            "./Contact": 4
        } ],
        8: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("./Pair");
            var r = e("../core/Common");
            (function() {
                i._pairMaxIdleLife = 1e3;
                i.create = function(e) {
                    return r.extend({
                        table: {},
                        list: [],
                        collisionStart: [],
                        collisionActive: [],
                        collisionEnd: []
                    }, e);
                };
                i.update = function(e, t, n) {
                    var i = e.list, s = e.table, a = e.collisionStart, l = e.collisionEnd, c = e.collisionActive, u = [], f, d, p, v;
                    a.length = 0;
                    l.length = 0;
                    c.length = 0;
                    for (v = 0; v < t.length; v++) {
                        f = t[v];
                        if (f.collided) {
                            d = o.id(f.bodyA, f.bodyB);
                            u.push(d);
                            p = s[d];
                            if (p) {
                                if (p.isActive) {
                                    c.push(p);
                                } else {
                                    a.push(p);
                                }
                                o.update(p, f, n);
                            } else {
                                p = o.create(f, n);
                                s[d] = p;
                                a.push(p);
                                i.push(p);
                            }
                        }
                    }
                    for (v = 0; v < i.length; v++) {
                        p = i[v];
                        if (p.isActive && r.indexOf(u, p.id) === -1) {
                            o.setActive(p, false, n);
                            l.push(p);
                        }
                    }
                };
                i.removeOld = function(e, t) {
                    var n = e.list, o = e.table, r = [], s, a, l, c;
                    for (c = 0; c < n.length; c++) {
                        s = n[c];
                        a = s.collision;
                        if (a.bodyA.isSleeping || a.bodyB.isSleeping) {
                            s.timeUpdated = t;
                            continue;
                        }
                        if (t - s.timeUpdated > i._pairMaxIdleLife) {
                            r.push(c);
                        }
                    }
                    for (c = 0; c < r.length; c++) {
                        l = r[c] - c;
                        s = n[l];
                        delete o[s.id];
                        n.splice(l, 1);
                    }
                };
                i.clear = function(e) {
                    e.table = {};
                    e.list.length = 0;
                    e.collisionStart.length = 0;
                    e.collisionActive.length = 0;
                    e.collisionEnd.length = 0;
                    return e;
                };
            })();
        }, {
            "../core/Common": 14,
            "./Pair": 7
        } ],
        9: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("../geometry/Vector");
            var r = e("./SAT");
            var s = e("../geometry/Bounds");
            var a = e("../factory/Bodies");
            var l = e("../geometry/Vertices");
            (function() {
                i.collides = function(e, t) {
                    var n = [];
                    for (var i = 0; i < t.length; i++) {
                        var o = t[i];
                        if (s.overlaps(o.bounds, e.bounds)) {
                            for (var a = o.parts.length === 1 ? 0 : 1; a < o.parts.length; a++) {
                                var l = o.parts[a];
                                if (s.overlaps(l.bounds, e.bounds)) {
                                    var c = r.collides(l, e);
                                    if (c.collided) {
                                        n.push(c);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    return n;
                };
                i.ray = function(e, t, n, r) {
                    r = r || 1e-100;
                    var s = o.angle(t, n), l = o.magnitude(o.sub(t, n)), c = (n.x + t.x) * .5, u = (n.y + t.y) * .5, f = a.rectangle(c, u, l, r, {
                        angle: s
                    }), d = i.collides(f, e);
                    for (var p = 0; p < d.length; p += 1) {
                        var v = d[p];
                        v.body = v.bodyB = v.bodyA;
                    }
                    return d;
                };
                i.region = function(e, t, n) {
                    var i = [];
                    for (var o = 0; o < e.length; o++) {
                        var r = e[o], a = s.overlaps(r.bounds, t);
                        if (a && !n || !a && n) i.push(r);
                    }
                    return i;
                };
                i.point = function(e, t) {
                    var n = [];
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        if (s.contains(o.bounds, t)) {
                            for (var r = o.parts.length === 1 ? 0 : 1; r < o.parts.length; r++) {
                                var a = o.parts[r];
                                if (s.contains(a.bounds, t) && l.contains(a.vertices, t)) {
                                    n.push(o);
                                    break;
                                }
                            }
                        }
                    }
                    return n;
                };
            })();
        }, {
            "../factory/Bodies": 23,
            "../geometry/Bounds": 26,
            "../geometry/Vector": 28,
            "../geometry/Vertices": 29,
            "./SAT": 11
        } ],
        10: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("../geometry/Vertices");
            var r = e("../geometry/Vector");
            var s = e("../core/Common");
            var a = e("../geometry/Bounds");
            (function() {
                i._restingThresh = 4;
                i._restingThreshTangent = 6;
                i._positionDampen = .9;
                i._positionWarming = .8;
                i._frictionNormalMultiplier = 5;
                i.preSolvePosition = function(e) {
                    var t, n, i;
                    for (t = 0; t < e.length; t++) {
                        n = e[t];
                        if (!n.isActive) continue;
                        i = n.activeContacts.length;
                        n.collision.parentA.totalContacts += i;
                        n.collision.parentB.totalContacts += i;
                    }
                };
                i.solvePosition = function(e, t) {
                    var n, o, s, a, l, c, u, f, d, p = {}, v = r._temp[0], m = r._temp[1], y = r._temp[2], g = r._temp[3];
                    for (n = 0; n < e.length; n++) {
                        o = e[n];
                        if (!o.isActive || o.isSensor) continue;
                        s = o.collision;
                        a = s.parentA;
                        l = s.parentB;
                        c = s.normal;
                        u = r.sub(r.add(l.positionImpulse, l.position, v), r.add(a.positionImpulse, r.sub(l.position, s.penetration, m), y), g);
                        o.separation = r.dot(c, u);
                    }
                    for (n = 0; n < e.length; n++) {
                        o = e[n];
                        if (!o.isActive || o.isSensor) continue;
                        s = o.collision;
                        a = s.parentA;
                        l = s.parentB;
                        c = s.normal;
                        d = (o.separation - o.slop) * t;
                        if (a.isStatic || l.isStatic) d *= 2;
                        if (!(a.isStatic || a.isSleeping)) {
                            f = i._positionDampen / a.totalContacts;
                            a.positionImpulse.x += c.x * d * f;
                            a.positionImpulse.y += c.y * d * f;
                        }
                        if (!(l.isStatic || l.isSleeping)) {
                            f = i._positionDampen / l.totalContacts;
                            l.positionImpulse.x -= c.x * d * f;
                            l.positionImpulse.y -= c.y * d * f;
                        }
                    }
                };
                i.postSolvePosition = function(e) {
                    for (var t = 0; t < e.length; t++) {
                        var n = e[t];
                        n.totalContacts = 0;
                        if (n.positionImpulse.x !== 0 || n.positionImpulse.y !== 0) {
                            for (var s = 0; s < n.parts.length; s++) {
                                var l = n.parts[s];
                                o.translate(l.vertices, n.positionImpulse);
                                a.update(l.bounds, l.vertices, n.velocity);
                                l.position.x += n.positionImpulse.x;
                                l.position.y += n.positionImpulse.y;
                            }
                            n.positionPrev.x += n.positionImpulse.x;
                            n.positionPrev.y += n.positionImpulse.y;
                            if (r.dot(n.positionImpulse, n.velocity) < 0) {
                                n.positionImpulse.x = 0;
                                n.positionImpulse.y = 0;
                            } else {
                                n.positionImpulse.x *= i._positionWarming;
                                n.positionImpulse.y *= i._positionWarming;
                            }
                        }
                    }
                };
                i.preSolveVelocity = function(e) {
                    var t, n, i, o, s, a, l, c, u, f, d, p, v, m, y = r._temp[0], g = r._temp[1];
                    for (t = 0; t < e.length; t++) {
                        i = e[t];
                        if (!i.isActive || i.isSensor) continue;
                        o = i.activeContacts;
                        s = i.collision;
                        a = s.parentA;
                        l = s.parentB;
                        c = s.normal;
                        u = s.tangent;
                        for (n = 0; n < o.length; n++) {
                            f = o[n];
                            d = f.vertex;
                            p = f.normalImpulse;
                            v = f.tangentImpulse;
                            if (p !== 0 || v !== 0) {
                                y.x = c.x * p + u.x * v;
                                y.y = c.y * p + u.y * v;
                                if (!(a.isStatic || a.isSleeping)) {
                                    m = r.sub(d, a.position, g);
                                    a.positionPrev.x += y.x * a.inverseMass;
                                    a.positionPrev.y += y.y * a.inverseMass;
                                    a.anglePrev += r.cross(m, y) * a.inverseInertia;
                                }
                                if (!(l.isStatic || l.isSleeping)) {
                                    m = r.sub(d, l.position, g);
                                    l.positionPrev.x -= y.x * l.inverseMass;
                                    l.positionPrev.y -= y.y * l.inverseMass;
                                    l.anglePrev -= r.cross(m, y) * l.inverseInertia;
                                }
                            }
                        }
                    }
                };
                i.solveVelocity = function(e, t) {
                    var n = t * t, o = r._temp[0], a = r._temp[1], l = r._temp[2], c = r._temp[3], u = r._temp[4], f = r._temp[5];
                    for (var d = 0; d < e.length; d++) {
                        var p = e[d];
                        if (!p.isActive || p.isSensor) continue;
                        var v = p.collision, m = v.parentA, y = v.parentB, g = v.normal, x = v.tangent, h = p.activeContacts, b = 1 / h.length;
                        m.velocity.x = m.position.x - m.positionPrev.x;
                        m.velocity.y = m.position.y - m.positionPrev.y;
                        y.velocity.x = y.position.x - y.positionPrev.x;
                        y.velocity.y = y.position.y - y.positionPrev.y;
                        m.angularVelocity = m.angle - m.anglePrev;
                        y.angularVelocity = y.angle - y.anglePrev;
                        for (var w = 0; w < h.length; w++) {
                            var S = h[w], C = S.vertex, A = r.sub(C, m.position, a), P = r.sub(C, y.position, l), B = r.add(m.velocity, r.mult(r.perp(A), m.angularVelocity), c), M = r.add(y.velocity, r.mult(r.perp(P), y.angularVelocity), u), I = r.sub(B, M, f), k = r.dot(g, I);
                            var _ = r.dot(x, I), T = Math.abs(_), R = s.sign(_);
                            var V = (1 + p.restitution) * k, E = s.clamp(p.separation + k, 0, 1) * i._frictionNormalMultiplier;
                            var L = _, F = Infinity;
                            if (T > p.friction * p.frictionStatic * E * n) {
                                F = T;
                                L = s.clamp(p.friction * R * n, -F, F);
                            }
                            var O = r.cross(A, g), q = r.cross(P, g), W = b / (m.inverseMass + y.inverseMass + m.inverseInertia * O * O + y.inverseInertia * q * q);
                            V *= W;
                            L *= W;
                            if (k < 0 && k * k > i._restingThresh * n) {
                                S.normalImpulse = 0;
                            } else {
                                var D = S.normalImpulse;
                                S.normalImpulse = Math.min(S.normalImpulse + V, 0);
                                V = S.normalImpulse - D;
                            }
                            if (_ * _ > i._restingThreshTangent * n) {
                                S.tangentImpulse = 0;
                            } else {
                                var N = S.tangentImpulse;
                                S.tangentImpulse = s.clamp(S.tangentImpulse + L, -F, F);
                                L = S.tangentImpulse - N;
                            }
                            o.x = g.x * V + x.x * L;
                            o.y = g.y * V + x.y * L;
                            if (!(m.isStatic || m.isSleeping)) {
                                m.positionPrev.x += o.x * m.inverseMass;
                                m.positionPrev.y += o.y * m.inverseMass;
                                m.anglePrev += r.cross(A, o) * m.inverseInertia;
                            }
                            if (!(y.isStatic || y.isSleeping)) {
                                y.positionPrev.x -= o.x * y.inverseMass;
                                y.positionPrev.y -= o.y * y.inverseMass;
                                y.anglePrev -= r.cross(P, o) * y.inverseInertia;
                            }
                        }
                    }
                };
            })();
        }, {
            "../core/Common": 14,
            "../geometry/Bounds": 26,
            "../geometry/Vector": 28,
            "../geometry/Vertices": 29
        } ],
        11: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("../geometry/Vertices");
            var r = e("../geometry/Vector");
            (function() {
                i.collides = function(e, t, n) {
                    var s, a, l, c, u = false;
                    if (n) {
                        var f = e.parent, d = t.parent, p = f.speed * f.speed + f.angularSpeed * f.angularSpeed + d.speed * d.speed + d.angularSpeed * d.angularSpeed;
                        u = n && n.collided && p < .2;
                        c = n;
                    } else {
                        c = {
                            collided: false,
                            bodyA: e,
                            bodyB: t
                        };
                    }
                    if (n && u) {
                        var v = c.axisBody, m = v === e ? t : e, y = [ v.axes[n.axisNumber] ];
                        l = i._overlapAxes(v.vertices, m.vertices, y);
                        c.reused = true;
                        if (l.overlap <= 0) {
                            c.collided = false;
                            return c;
                        }
                    } else {
                        s = i._overlapAxes(e.vertices, t.vertices, e.axes);
                        if (s.overlap <= 0) {
                            c.collided = false;
                            return c;
                        }
                        a = i._overlapAxes(t.vertices, e.vertices, t.axes);
                        if (a.overlap <= 0) {
                            c.collided = false;
                            return c;
                        }
                        if (s.overlap < a.overlap) {
                            l = s;
                            c.axisBody = e;
                        } else {
                            l = a;
                            c.axisBody = t;
                        }
                        c.axisNumber = l.axisNumber;
                    }
                    c.bodyA = e.id < t.id ? e : t;
                    c.bodyB = e.id < t.id ? t : e;
                    c.collided = true;
                    c.depth = l.overlap;
                    c.parentA = c.bodyA.parent;
                    c.parentB = c.bodyB.parent;
                    e = c.bodyA;
                    t = c.bodyB;
                    if (r.dot(l.axis, r.sub(t.position, e.position)) < 0) {
                        c.normal = {
                            x: l.axis.x,
                            y: l.axis.y
                        };
                    } else {
                        c.normal = {
                            x: -l.axis.x,
                            y: -l.axis.y
                        };
                    }
                    c.tangent = r.perp(c.normal);
                    c.penetration = c.penetration || {};
                    c.penetration.x = c.normal.x * c.depth;
                    c.penetration.y = c.normal.y * c.depth;
                    var g = i._findSupports(e, t, c.normal), x = [];
                    if (o.contains(e.vertices, g[0])) x.push(g[0]);
                    if (o.contains(e.vertices, g[1])) x.push(g[1]);
                    if (x.length < 2) {
                        var h = i._findSupports(t, e, r.neg(c.normal));
                        if (o.contains(t.vertices, h[0])) x.push(h[0]);
                        if (x.length < 2 && o.contains(t.vertices, h[1])) x.push(h[1]);
                    }
                    if (x.length < 1) x = [ g[0] ];
                    c.supports = x;
                    return c;
                };
                i._overlapAxes = function(e, t, n) {
                    var o = r._temp[0], s = r._temp[1], a = {
                        overlap: Number.MAX_VALUE
                    }, l, c;
                    for (var u = 0; u < n.length; u++) {
                        c = n[u];
                        i._projectToAxis(o, e, c);
                        i._projectToAxis(s, t, c);
                        l = Math.min(o.max - s.min, s.max - o.min);
                        if (l <= 0) {
                            a.overlap = l;
                            return a;
                        }
                        if (l < a.overlap) {
                            a.overlap = l;
                            a.axis = c;
                            a.axisNumber = u;
                        }
                    }
                    return a;
                };
                i._projectToAxis = function(e, t, n) {
                    var i = r.dot(t[0], n), o = i;
                    for (var s = 1; s < t.length; s += 1) {
                        var a = r.dot(t[s], n);
                        if (a > o) {
                            o = a;
                        } else if (a < i) {
                            i = a;
                        }
                    }
                    e.min = i;
                    e.max = o;
                };
                i._findSupports = function(e, t, n) {
                    var i = Number.MAX_VALUE, o = r._temp[0], s = t.vertices, a = e.position, l, c, u, f;
                    for (var d = 0; d < s.length; d++) {
                        c = s[d];
                        o.x = c.x - a.x;
                        o.y = c.y - a.y;
                        l = -r.dot(n, o);
                        if (l < i) {
                            i = l;
                            u = c;
                        }
                    }
                    var p = u.index - 1 >= 0 ? u.index - 1 : s.length - 1;
                    c = s[p];
                    o.x = c.x - a.x;
                    o.y = c.y - a.y;
                    i = -r.dot(n, o);
                    f = c;
                    var v = (u.index + 1) % s.length;
                    c = s[v];
                    o.x = c.x - a.x;
                    o.y = c.y - a.y;
                    l = -r.dot(n, o);
                    if (l < i) {
                        f = c;
                    }
                    return [ u, f ];
                };
            })();
        }, {
            "../geometry/Vector": 28,
            "../geometry/Vertices": 29
        } ],
        12: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("../geometry/Vertices");
            var r = e("../geometry/Vector");
            var s = e("../core/Sleeping");
            var a = e("../geometry/Bounds");
            var l = e("../geometry/Axes");
            var c = e("../core/Common");
            (function() {
                i._warming = .4;
                i._torqueDampen = 1;
                i._minLength = 1e-6;
                i.create = function(e) {
                    var t = e;
                    if (t.bodyA && !t.pointA) t.pointA = {
                        x: 0,
                        y: 0
                    };
                    if (t.bodyB && !t.pointB) t.pointB = {
                        x: 0,
                        y: 0
                    };
                    var n = t.bodyA ? r.add(t.bodyA.position, t.pointA) : t.pointA, i = t.bodyB ? r.add(t.bodyB.position, t.pointB) : t.pointB, o = r.magnitude(r.sub(n, i));
                    t.length = typeof t.length !== "undefined" ? t.length : o;
                    t.id = t.id || c.nextId();
                    t.label = t.label || "Constraint";
                    t.type = "constraint";
                    t.stiffness = t.stiffness || (t.length > 0 ? 1 : .7);
                    t.damping = t.damping || 0;
                    t.angularStiffness = t.angularStiffness || 0;
                    t.angleA = t.bodyA ? t.bodyA.angle : t.angleA;
                    t.angleB = t.bodyB ? t.bodyB.angle : t.angleB;
                    t.plugin = {};
                    var s = {
                        visible: true,
                        lineWidth: 2,
                        strokeStyle: "#ffffff",
                        type: "line",
                        anchors: true
                    };
                    if (t.length === 0 && t.stiffness > .1) {
                        s.type = "pin";
                        s.anchors = false;
                    } else if (t.stiffness < .9) {
                        s.type = "spring";
                    }
                    t.render = c.extend(s, t.render);
                    return t;
                };
                i.preSolveAll = function(e) {
                    for (var t = 0; t < e.length; t += 1) {
                        var n = e[t], i = n.constraintImpulse;
                        if (n.isStatic || i.x === 0 && i.y === 0 && i.angle === 0) {
                            continue;
                        }
                        n.position.x += i.x;
                        n.position.y += i.y;
                        n.angle += i.angle;
                    }
                };
                i.solveAll = function(e, t) {
                    for (var n = 0; n < e.length; n += 1) {
                        var o = e[n], r = !o.bodyA || o.bodyA && o.bodyA.isStatic, s = !o.bodyB || o.bodyB && o.bodyB.isStatic;
                        if (r || s) {
                            i.solve(e[n], t);
                        }
                    }
                    for (n = 0; n < e.length; n += 1) {
                        o = e[n];
                        r = !o.bodyA || o.bodyA && o.bodyA.isStatic;
                        s = !o.bodyB || o.bodyB && o.bodyB.isStatic;
                        if (!r && !s) {
                            i.solve(e[n], t);
                        }
                    }
                };
                i.solve = function(e, t) {
                    var n = e.bodyA, o = e.bodyB, s = e.pointA, a = e.pointB;
                    if (!n && !o) return;
                    if (n && !n.isStatic) {
                        r.rotate(s, n.angle - e.angleA, s);
                        e.angleA = n.angle;
                    }
                    if (o && !o.isStatic) {
                        r.rotate(a, o.angle - e.angleB, a);
                        e.angleB = o.angle;
                    }
                    var l = s, c = a;
                    if (n) l = r.add(n.position, s);
                    if (o) c = r.add(o.position, a);
                    if (!l || !c) return;
                    var u = r.sub(l, c), f = r.magnitude(u);
                    if (f < i._minLength) {
                        f = i._minLength;
                    }
                    var d = (f - e.length) / f, p = e.stiffness < 1 ? e.stiffness * t : e.stiffness, v = r.mult(u, d * p), m = (n ? n.inverseMass : 0) + (o ? o.inverseMass : 0), y = (n ? n.inverseInertia : 0) + (o ? o.inverseInertia : 0), g = m + y, x, h, b, w, S;
                    if (e.damping) {
                        var C = r.create();
                        b = r.div(u, f);
                        S = r.sub(o && r.sub(o.position, o.positionPrev) || C, n && r.sub(n.position, n.positionPrev) || C);
                        w = r.dot(b, S);
                    }
                    if (n && !n.isStatic) {
                        h = n.inverseMass / m;
                        n.constraintImpulse.x -= v.x * h;
                        n.constraintImpulse.y -= v.y * h;
                        n.position.x -= v.x * h;
                        n.position.y -= v.y * h;
                        if (e.damping) {
                            n.positionPrev.x -= e.damping * b.x * w * h;
                            n.positionPrev.y -= e.damping * b.y * w * h;
                        }
                        x = r.cross(s, v) / g * i._torqueDampen * n.inverseInertia * (1 - e.angularStiffness);
                        n.constraintImpulse.angle -= x;
                        n.angle -= x;
                    }
                    if (o && !o.isStatic) {
                        h = o.inverseMass / m;
                        o.constraintImpulse.x += v.x * h;
                        o.constraintImpulse.y += v.y * h;
                        o.position.x += v.x * h;
                        o.position.y += v.y * h;
                        if (e.damping) {
                            o.positionPrev.x += e.damping * b.x * w * h;
                            o.positionPrev.y += e.damping * b.y * w * h;
                        }
                        x = r.cross(a, v) / g * i._torqueDampen * o.inverseInertia * (1 - e.angularStiffness);
                        o.constraintImpulse.angle += x;
                        o.angle += x;
                    }
                };
                i.postSolveAll = function(e) {
                    for (var t = 0; t < e.length; t++) {
                        var n = e[t], c = n.constraintImpulse;
                        if (n.isStatic || c.x === 0 && c.y === 0 && c.angle === 0) {
                            continue;
                        }
                        s.set(n, false);
                        for (var u = 0; u < n.parts.length; u++) {
                            var f = n.parts[u];
                            o.translate(f.vertices, c);
                            if (u > 0) {
                                f.position.x += c.x;
                                f.position.y += c.y;
                            }
                            if (c.angle !== 0) {
                                o.rotate(f.vertices, c.angle, n.position);
                                l.rotate(f.axes, c.angle);
                                if (u > 0) {
                                    r.rotateAbout(f.position, c.angle, n.position, f.position);
                                }
                            }
                            a.update(f.bounds, f.vertices, n.velocity);
                        }
                        c.angle *= i._warming;
                        c.x *= i._warming;
                        c.y *= i._warming;
                    }
                };
            })();
        }, {
            "../core/Common": 14,
            "../core/Sleeping": 22,
            "../geometry/Axes": 25,
            "../geometry/Bounds": 26,
            "../geometry/Vector": 28,
            "../geometry/Vertices": 29
        } ],
        13: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("../geometry/Vertices");
            var r = e("../core/Sleeping");
            var s = e("../core/Mouse");
            var a = e("../core/Events");
            var l = e("../collision/Detector");
            var c = e("./Constraint");
            var u = e("../body/Composite");
            var f = e("../core/Common");
            var d = e("../geometry/Bounds");
            (function() {
                i.create = function(e, t) {
                    var n = (e ? e.mouse : null) || (t ? t.mouse : null);
                    if (!n) {
                        if (e && e.render && e.render.canvas) {
                            n = s.create(e.render.canvas);
                        } else if (t && t.element) {
                            n = s.create(t.element);
                        } else {
                            n = s.create();
                            f.warn("MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected");
                        }
                    }
                    var o = c.create({
                        label: "Mouse Constraint",
                        pointA: n.position,
                        pointB: {
                            x: 0,
                            y: 0
                        },
                        length: .01,
                        stiffness: .1,
                        angularStiffness: 1,
                        render: {
                            strokeStyle: "#90EE90",
                            lineWidth: 3
                        }
                    });
                    var r = {
                        type: "mouseConstraint",
                        mouse: n,
                        element: null,
                        body: null,
                        constraint: o,
                        collisionFilter: {
                            category: 1,
                            mask: 4294967295,
                            group: 0
                        }
                    };
                    var l = f.extend(r, t);
                    a.on(e, "beforeUpdate", function() {
                        var t = u.allBodies(e.world);
                        i.update(l, t);
                        i._triggerEvents(l);
                    });
                    return l;
                };
                i.update = function(e, t) {
                    var n = e.mouse, i = e.constraint, s = e.body;
                    if (n.button === 0) {
                        if (!i.bodyB) {
                            for (var c = 0; c < t.length; c++) {
                                s = t[c];
                                if (d.contains(s.bounds, n.position) && l.canCollide(s.collisionFilter, e.collisionFilter)) {
                                    for (var u = s.parts.length > 1 ? 1 : 0; u < s.parts.length; u++) {
                                        var f = s.parts[u];
                                        if (o.contains(f.vertices, n.position)) {
                                            i.pointA = n.position;
                                            i.bodyB = e.body = s;
                                            i.pointB = {
                                                x: n.position.x - s.position.x,
                                                y: n.position.y - s.position.y
                                            };
                                            i.angleB = s.angle;
                                            r.set(s, false);
                                            a.trigger(e, "startdrag", {
                                                mouse: n,
                                                body: s
                                            });
                                            break;
                                        }
                                    }
                                }
                            }
                        } else {
                            r.set(i.bodyB, false);
                            i.pointA = n.position;
                        }
                    } else {
                        i.bodyB = e.body = null;
                        i.pointB = null;
                        if (s) a.trigger(e, "enddrag", {
                            mouse: n,
                            body: s
                        });
                    }
                };
                i._triggerEvents = function(e) {
                    var t = e.mouse, n = t.sourceEvents;
                    if (n.mousemove) a.trigger(e, "mousemove", {
                        mouse: t
                    });
                    if (n.mousedown) a.trigger(e, "mousedown", {
                        mouse: t
                    });
                    if (n.mouseup) a.trigger(e, "mouseup", {
                        mouse: t
                    });
                    s.clearSourceEvents(t);
                };
            })();
        }, {
            "../body/Composite": 2,
            "../collision/Detector": 5,
            "../core/Common": 14,
            "../core/Events": 16,
            "../core/Mouse": 19,
            "../core/Sleeping": 22,
            "../geometry/Bounds": 26,
            "../geometry/Vertices": 29,
            "./Constraint": 12
        } ],
        14: [ function(e, t, n) {
            (function(n) {
                var i = {};
                t.exports = i;
                (function() {
                    i._nextId = 0;
                    i._seed = 0;
                    i._nowStartTime = +new Date();
                    i.extend = function(e, t) {
                        var n, o, r;
                        if (typeof t === "boolean") {
                            n = 2;
                            r = t;
                        } else {
                            n = 1;
                            r = true;
                        }
                        for (var s = n; s < arguments.length; s++) {
                            var a = arguments[s];
                            if (a) {
                                for (var l in a) {
                                    if (r && a[l] && a[l].constructor === Object) {
                                        if (!e[l] || e[l].constructor === Object) {
                                            e[l] = e[l] || {};
                                            i.extend(e[l], r, a[l]);
                                        } else {
                                            e[l] = a[l];
                                        }
                                    } else {
                                        e[l] = a[l];
                                    }
                                }
                            }
                        }
                        return e;
                    };
                    i.clone = function(e, t) {
                        return i.extend({}, t, e);
                    };
                    i.keys = function(e) {
                        if (Object.keys) return Object.keys(e);
                        var t = [];
                        for (var n in e) t.push(n);
                        return t;
                    };
                    i.values = function(e) {
                        var t = [];
                        if (Object.keys) {
                            var n = Object.keys(e);
                            for (var i = 0; i < n.length; i++) {
                                t.push(e[n[i]]);
                            }
                            return t;
                        }
                        for (var o in e) t.push(e[o]);
                        return t;
                    };
                    i.get = function(e, t, n, i) {
                        t = t.split(".").slice(n, i);
                        for (var o = 0; o < t.length; o += 1) {
                            e = e[t[o]];
                        }
                        return e;
                    };
                    i.set = function(e, t, n, o, r) {
                        var s = t.split(".").slice(o, r);
                        i.get(e, t, 0, -1)[s[s.length - 1]] = n;
                        return n;
                    };
                    i.shuffle = function(e) {
                        for (var t = e.length - 1; t > 0; t--) {
                            var n = Math.floor(i.random() * (t + 1));
                            var o = e[t];
                            e[t] = e[n];
                            e[n] = o;
                        }
                        return e;
                    };
                    i.choose = function(e) {
                        return e[Math.floor(i.random() * e.length)];
                    };
                    i.isElement = function(e) {
                        if (typeof HTMLElement !== "undefined") {
                            return e instanceof HTMLElement;
                        }
                        return !!(e && e.nodeType && e.nodeName);
                    };
                    i.isArray = function(e) {
                        return Object.prototype.toString.call(e) === "[object Array]";
                    };
                    i.isFunction = function(e) {
                        return typeof e === "function";
                    };
                    i.isPlainObject = function(e) {
                        return typeof e === "object" && e.constructor === Object;
                    };
                    i.isString = function(e) {
                        return toString.call(e) === "[object String]";
                    };
                    i.clamp = function(e, t, n) {
                        if (e < t) return t;
                        if (e > n) return n;
                        return e;
                    };
                    i.sign = function(e) {
                        return e < 0 ? -1 : 1;
                    };
                    i.now = function() {
                        if (window.performance) {
                            if (window.performance.now) {
                                return window.performance.now();
                            } else if (window.performance.webkitNow) {
                                return window.performance.webkitNow();
                            }
                        }
                        return new Date() - i._nowStartTime;
                    };
                    i.random = function(e, n) {
                        e = typeof e !== "undefined" ? e : 0;
                        n = typeof n !== "undefined" ? n : 1;
                        return e + t() * (n - e);
                    };
                    var t = function() {
                        i._seed = (i._seed * 9301 + 49297) % 233280;
                        return i._seed / 233280;
                    };
                    i.colorToNumber = function(e) {
                        e = e.replace("#", "");
                        if (e.length == 3) {
                            e = e.charAt(0) + e.charAt(0) + e.charAt(1) + e.charAt(1) + e.charAt(2) + e.charAt(2);
                        }
                        return parseInt(e, 16);
                    };
                    i.logLevel = 1;
                    i.log = function() {
                        if (console && i.logLevel > 0 && i.logLevel <= 3) {
                            console.log.apply(console, [ "matter-js:" ].concat(Array.prototype.slice.call(arguments)));
                        }
                    };
                    i.info = function() {
                        if (console && i.logLevel > 0 && i.logLevel <= 2) {
                            console.info.apply(console, [ "matter-js:" ].concat(Array.prototype.slice.call(arguments)));
                        }
                    };
                    i.warn = function() {
                        if (console && i.logLevel > 0 && i.logLevel <= 3) {
                            console.warn.apply(console, [ "matter-js:" ].concat(Array.prototype.slice.call(arguments)));
                        }
                    };
                    i.nextId = function() {
                        return i._nextId++;
                    };
                    i.indexOf = function(e, t) {
                        if (e.indexOf) return e.indexOf(t);
                        for (var n = 0; n < e.length; n++) {
                            if (e[n] === t) return n;
                        }
                        return -1;
                    };
                    i.map = function(e, t) {
                        if (e.map) {
                            return e.map(t);
                        }
                        var n = [];
                        for (var i = 0; i < e.length; i += 1) {
                            n.push(t(e[i]));
                        }
                        return n;
                    };
                    i.topologicalSort = function(e) {
                        var t = [], n = [], o = [];
                        for (var r in e) {
                            if (!n[r] && !o[r]) {
                                i._topologicalSort(r, n, o, e, t);
                            }
                        }
                        return t;
                    };
                    i._topologicalSort = function(e, t, n, o, r) {
                        var s = o[e] || [];
                        n[e] = true;
                        for (var a = 0; a < s.length; a += 1) {
                            var l = s[a];
                            if (n[l]) {
                                continue;
                            }
                            if (!t[l]) {
                                i._topologicalSort(l, t, n, o, r);
                            }
                        }
                        n[e] = false;
                        t[e] = true;
                        r.push(e);
                    };
                    i.chain = function() {
                        var e = [];
                        for (var t = 0; t < arguments.length; t += 1) {
                            var n = arguments[t];
                            if (n._chained) {
                                e.push.apply(e, n._chained);
                            } else {
                                e.push(n);
                            }
                        }
                        var i = function() {
                            var t, n = new Array(arguments.length);
                            for (var i = 0, o = arguments.length; i < o; i++) {
                                n[i] = arguments[i];
                            }
                            for (i = 0; i < e.length; i += 1) {
                                var r = e[i].apply(t, n);
                                if (typeof r !== "undefined") {
                                    t = r;
                                }
                            }
                            return t;
                        };
                        i._chained = e;
                        return i;
                    };
                    i.chainPathBefore = function(e, t, n) {
                        return i.set(e, t, i.chain(n, i.get(e, t)));
                    };
                    i.chainPathAfter = function(e, t, n) {
                        return i.set(e, t, i.chain(i.get(e, t), n));
                    };
                    i._requireGlobal = function(t, i) {
                        var o = typeof window !== "undefined" ? window[t] : typeof n !== "undefined" ? n[t] : null;
                        return o || e(i);
                    };
                })();
            }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
        }, {} ],
        15: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("../body/World");
            var r = e("./Sleeping");
            var s = e("../collision/Resolver");
            var a = e("../render/Render");
            var l = e("../collision/Pairs");
            var c = e("./Metrics");
            var u = e("../collision/Grid");
            var f = e("./Events");
            var d = e("../body/Composite");
            var p = e("../constraint/Constraint");
            var v = e("./Common");
            var m = e("../body/Body");
            (function() {
                i.create = function(e, t) {
                    t = v.isElement(e) ? t : e;
                    e = v.isElement(e) ? e : null;
                    t = t || {};
                    if (e || t.render) {
                        v.warn("Engine.create: engine.render is deprecated (see docs)");
                    }
                    var n = {
                        positionIterations: 6,
                        velocityIterations: 4,
                        constraintIterations: 2,
                        enableSleeping: false,
                        events: [],
                        plugin: {},
                        timing: {
                            timestamp: 0,
                            timeScale: 1
                        },
                        broadphase: {
                            controller: u
                        }
                    };
                    var i = v.extend(n, t);
                    if (e || i.render) {
                        var r = {
                            element: e,
                            controller: a
                        };
                        i.render = v.extend(r, i.render);
                    }
                    if (i.render && i.render.controller) {
                        i.render = i.render.controller.create(i.render);
                    }
                    if (i.render) {
                        i.render.engine = i;
                    }
                    i.world = t.world || o.create(i.world);
                    i.pairs = l.create();
                    i.broadphase = i.broadphase.controller.create(i.broadphase);
                    i.metrics = i.metrics || {
                        extended: false
                    };
                    return i;
                };
                i.update = function(e, t, n) {
                    t = t || 1e3 / 60;
                    n = n || 1;
                    var o = e.world, a = e.timing, c = e.broadphase, u = [], v;
                    a.timestamp += t * a.timeScale;
                    var m = {
                        timestamp: a.timestamp
                    };
                    f.trigger(e, "beforeUpdate", m);
                    var y = d.allBodies(o), g = d.allConstraints(o);
                    if (e.enableSleeping) r.update(y, a.timeScale);
                    i._bodiesApplyGravity(y, o.gravity);
                    i._bodiesUpdate(y, t, a.timeScale, n, o.bounds);
                    p.preSolveAll(y);
                    for (v = 0; v < e.constraintIterations; v++) {
                        p.solveAll(g, a.timeScale);
                    }
                    p.postSolveAll(y);
                    if (c.controller) {
                        if (o.isModified) c.controller.clear(c);
                        c.controller.update(c, y, e, o.isModified);
                        u = c.pairsList;
                    } else {
                        u = y;
                    }
                    if (o.isModified) {
                        d.setModified(o, false, false, true);
                    }
                    var x = c.detector(u, e);
                    var h = e.pairs, b = a.timestamp;
                    l.update(h, x, b);
                    l.removeOld(h, b);
                    if (e.enableSleeping) r.afterCollisions(h.list, a.timeScale);
                    if (h.collisionStart.length > 0) f.trigger(e, "collisionStart", {
                        pairs: h.collisionStart
                    });
                    s.preSolvePosition(h.list);
                    for (v = 0; v < e.positionIterations; v++) {
                        s.solvePosition(h.list, a.timeScale);
                    }
                    s.postSolvePosition(y);
                    p.preSolveAll(y);
                    for (v = 0; v < e.constraintIterations; v++) {
                        p.solveAll(g, a.timeScale);
                    }
                    p.postSolveAll(y);
                    s.preSolveVelocity(h.list);
                    for (v = 0; v < e.velocityIterations; v++) {
                        s.solveVelocity(h.list, a.timeScale);
                    }
                    if (h.collisionActive.length > 0) f.trigger(e, "collisionActive", {
                        pairs: h.collisionActive
                    });
                    if (h.collisionEnd.length > 0) f.trigger(e, "collisionEnd", {
                        pairs: h.collisionEnd
                    });
                    i._bodiesClearForces(y);
                    f.trigger(e, "afterUpdate", m);
                    return e;
                };
                i.merge = function(e, t) {
                    v.extend(e, t);
                    if (t.world) {
                        e.world = t.world;
                        i.clear(e);
                        var n = d.allBodies(e.world);
                        for (var o = 0; o < n.length; o++) {
                            var s = n[o];
                            r.set(s, false);
                            s.id = v.nextId();
                        }
                    }
                };
                i.clear = function(e) {
                    var t = e.world;
                    l.clear(e.pairs);
                    var n = e.broadphase;
                    if (n.controller) {
                        var i = d.allBodies(t);
                        n.controller.clear(n);
                        n.controller.update(n, i, e, true);
                    }
                };
                i._bodiesClearForces = function(e) {
                    for (var t = 0; t < e.length; t++) {
                        var n = e[t];
                        n.force.x = 0;
                        n.force.y = 0;
                        n.torque = 0;
                    }
                };
                i._bodiesApplyGravity = function(e, t) {
                    var n = typeof t.scale !== "undefined" ? t.scale : .001;
                    if (t.x === 0 && t.y === 0 || n === 0) {
                        return;
                    }
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i];
                        if (o.isStatic || o.isSleeping) continue;
                        o.force.y += o.mass * t.y * n;
                        o.force.x += o.mass * t.x * n;
                    }
                };
                i._bodiesUpdate = function(e, t, n, i, o) {
                    for (var r = 0; r < e.length; r++) {
                        var s = e[r];
                        if (s.isStatic || s.isSleeping) continue;
                        m.update(s, t, n, i);
                    }
                };
            })();
        }, {
            "../body/Body": 1,
            "../body/Composite": 2,
            "../body/World": 3,
            "../collision/Grid": 6,
            "../collision/Pairs": 8,
            "../collision/Resolver": 10,
            "../constraint/Constraint": 12,
            "../render/Render": 31,
            "./Common": 14,
            "./Events": 16,
            "./Metrics": 18,
            "./Sleeping": 22
        } ],
        16: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("./Common");
            (function() {
                i.on = function(e, t, n) {
                    var i = t.split(" "), o;
                    for (var r = 0; r < i.length; r++) {
                        o = i[r];
                        e.events = e.events || {};
                        e.events[o] = e.events[o] || [];
                        e.events[o].push(n);
                    }
                    return n;
                };
                i.off = function(e, t, n) {
                    if (!t) {
                        e.events = {};
                        return;
                    }
                    if (typeof t === "function") {
                        n = t;
                        t = o.keys(e.events).join(" ");
                    }
                    var i = t.split(" ");
                    for (var r = 0; r < i.length; r++) {
                        var s = e.events[i[r]], a = [];
                        if (n && s) {
                            for (var l = 0; l < s.length; l++) {
                                if (s[l] !== n) a.push(s[l]);
                            }
                        }
                        e.events[i[r]] = a;
                    }
                };
                i.trigger = function(e, t, n) {
                    var i, r, s, a;
                    if (e.events) {
                        if (!n) n = {};
                        i = t.split(" ");
                        for (var l = 0; l < i.length; l++) {
                            r = i[l];
                            s = e.events[r];
                            if (s) {
                                a = o.clone(n, false);
                                a.name = r;
                                a.source = e;
                                for (var c = 0; c < s.length; c++) {
                                    s[c].apply(e, [ a ]);
                                }
                            }
                        }
                    }
                };
            })();
        }, {
            "./Common": 14
        } ],
        17: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("./Plugin");
            var r = e("./Common");
            (function() {
                i.name = "matter-js";
                i.version = "0.14.2";
                i.uses = [];
                i.used = [];
                i.use = function() {
                    o.use(i, Array.prototype.slice.call(arguments));
                };
                i.before = function(e, t) {
                    e = e.replace(/^Matter./, "");
                    return r.chainPathBefore(i, e, t);
                };
                i.after = function(e, t) {
                    e = e.replace(/^Matter./, "");
                    return r.chainPathAfter(i, e, t);
                };
            })();
        }, {
            "./Common": 14,
            "./Plugin": 20
        } ],
        18: [ function(e, t, n) {}, {
            "../body/Composite": 2,
            "./Common": 14
        } ],
        19: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("../core/Common");
            (function() {
                i.create = function(e) {
                    var t = {};
                    if (!e) {
                        o.log("Mouse.create: element was undefined, defaulting to document.body", "warn");
                    }
                    t.element = e || document.body;
                    t.absolute = {
                        x: 0,
                        y: 0
                    };
                    t.position = {
                        x: 0,
                        y: 0
                    };
                    t.mousedownPosition = {
                        x: 0,
                        y: 0
                    };
                    t.mouseupPosition = {
                        x: 0,
                        y: 0
                    };
                    t.offset = {
                        x: 0,
                        y: 0
                    };
                    t.scale = {
                        x: 1,
                        y: 1
                    };
                    t.wheelDelta = 0;
                    t.button = -1;
                    t.pixelRatio = t.element.getAttribute("data-pixel-ratio") || 1;
                    t.sourceEvents = {
                        mousemove: null,
                        mousedown: null,
                        mouseup: null,
                        mousewheel: null
                    };
                    t.mousemove = function(e) {
                        var n = i._getRelativeMousePosition(e, t.element, t.pixelRatio), o = e.changedTouches;
                        if (o) {
                            t.button = 0;
                            e.preventDefault();
                        }
                        t.absolute.x = n.x;
                        t.absolute.y = n.y;
                        t.position.x = t.absolute.x * t.scale.x + t.offset.x;
                        t.position.y = t.absolute.y * t.scale.y + t.offset.y;
                        t.sourceEvents.mousemove = e;
                    };
                    t.mousedown = function(e) {
                        var n = i._getRelativeMousePosition(e, t.element, t.pixelRatio), o = e.changedTouches;
                        if (o) {
                            t.button = 0;
                            e.preventDefault();
                        } else {
                            t.button = e.button;
                        }
                        t.absolute.x = n.x;
                        t.absolute.y = n.y;
                        t.position.x = t.absolute.x * t.scale.x + t.offset.x;
                        t.position.y = t.absolute.y * t.scale.y + t.offset.y;
                        t.mousedownPosition.x = t.position.x;
                        t.mousedownPosition.y = t.position.y;
                        t.sourceEvents.mousedown = e;
                    };
                    t.mouseup = function(e) {
                        var n = i._getRelativeMousePosition(e, t.element, t.pixelRatio), o = e.changedTouches;
                        if (o) {
                            e.preventDefault();
                        }
                        t.button = -1;
                        t.absolute.x = n.x;
                        t.absolute.y = n.y;
                        t.position.x = t.absolute.x * t.scale.x + t.offset.x;
                        t.position.y = t.absolute.y * t.scale.y + t.offset.y;
                        t.mouseupPosition.x = t.position.x;
                        t.mouseupPosition.y = t.position.y;
                        t.sourceEvents.mouseup = e;
                    };
                    t.mousewheel = function(e) {
                        t.wheelDelta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
                        e.preventDefault();
                    };
                    i.setElement(t, t.element);
                    return t;
                };
                i.setElement = function(e, t) {
                    e.element = t;
                    t.addEventListener("mousemove", e.mousemove);
                    t.addEventListener("mousedown", e.mousedown);
                    t.addEventListener("mouseup", e.mouseup);
                    t.addEventListener("mousewheel", e.mousewheel);
                    t.addEventListener("DOMMouseScroll", e.mousewheel);
                    t.addEventListener("touchmove", e.mousemove);
                    t.addEventListener("touchstart", e.mousedown);
                    t.addEventListener("touchend", e.mouseup);
                };
                i.clearSourceEvents = function(e) {
                    e.sourceEvents.mousemove = null;
                    e.sourceEvents.mousedown = null;
                    e.sourceEvents.mouseup = null;
                    e.sourceEvents.mousewheel = null;
                    e.wheelDelta = 0;
                };
                i.setOffset = function(e, t) {
                    e.offset.x = t.x;
                    e.offset.y = t.y;
                    e.position.x = e.absolute.x * e.scale.x + e.offset.x;
                    e.position.y = e.absolute.y * e.scale.y + e.offset.y;
                };
                i.setScale = function(e, t) {
                    e.scale.x = t.x;
                    e.scale.y = t.y;
                    e.position.x = e.absolute.x * e.scale.x + e.offset.x;
                    e.position.y = e.absolute.y * e.scale.y + e.offset.y;
                };
                i._getRelativeMousePosition = function(e, t, n) {
                    var i = t.getBoundingClientRect(), o = document.documentElement || document.body.parentNode || document.body, r = window.pageXOffset !== undefined ? window.pageXOffset : o.scrollLeft, s = window.pageYOffset !== undefined ? window.pageYOffset : o.scrollTop, a = e.changedTouches, l, c;
                    if (a) {
                        l = a[0].pageX - i.left - r;
                        c = a[0].pageY - i.top - s;
                    } else {
                        l = e.pageX - i.left - r;
                        c = e.pageY - i.top - s;
                    }
                    return {
                        x: l / (t.clientWidth / (t.width || t.clientWidth) * n),
                        y: c / (t.clientHeight / (t.height || t.clientHeight) * n)
                    };
                };
            })();
        }, {
            "../core/Common": 14
        } ],
        20: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("./Common");
            (function() {
                i._registry = {};
                i.register = function(e) {
                    if (!i.isPlugin(e)) {
                        o.warn("Plugin.register:", i.toString(e), "does not implement all required fields.");
                    }
                    if (e.name in i._registry) {
                        var t = i._registry[e.name], n = i.versionParse(e.version).number, r = i.versionParse(t.version).number;
                        if (n > r) {
                            o.warn("Plugin.register:", i.toString(t), "was upgraded to", i.toString(e));
                            i._registry[e.name] = e;
                        } else if (n < r) {
                            o.warn("Plugin.register:", i.toString(t), "can not be downgraded to", i.toString(e));
                        } else if (e !== t) {
                            o.warn("Plugin.register:", i.toString(e), "is already registered to different plugin object");
                        }
                    } else {
                        i._registry[e.name] = e;
                    }
                    return e;
                };
                i.resolve = function(e) {
                    return i._registry[i.dependencyParse(e).name];
                };
                i.toString = function(e) {
                    return typeof e === "string" ? e : (e.name || "anonymous") + "@" + (e.version || e.range || "0.0.0");
                };
                i.isPlugin = function(e) {
                    return e && e.name && e.version && e.install;
                };
                i.isUsed = function(e, t) {
                    return e.used.indexOf(t) > -1;
                };
                i.isFor = function(e, t) {
                    var n = e.for && i.dependencyParse(e.for);
                    return !e.for || t.name === n.name && i.versionSatisfies(t.version, n.range);
                };
                i.use = function(e, t) {
                    e.uses = (e.uses || []).concat(t || []);
                    if (e.uses.length === 0) {
                        o.warn("Plugin.use:", i.toString(e), "does not specify any dependencies to install.");
                        return;
                    }
                    var n = i.dependencies(e), r = o.topologicalSort(n), s = [];
                    for (var a = 0; a < r.length; a += 1) {
                        if (r[a] === e.name) {
                            continue;
                        }
                        var l = i.resolve(r[a]);
                        if (!l) {
                            s.push("❌ " + r[a]);
                            continue;
                        }
                        if (i.isUsed(e, l.name)) {
                            continue;
                        }
                        if (!i.isFor(l, e)) {
                            o.warn("Plugin.use:", i.toString(l), "is for", l.for, "but installed on", i.toString(e) + ".");
                            l._warned = true;
                        }
                        if (l.install) {
                            l.install(e);
                        } else {
                            o.warn("Plugin.use:", i.toString(l), "does not specify an install function.");
                            l._warned = true;
                        }
                        if (l._warned) {
                            s.push("🔶 " + i.toString(l));
                            delete l._warned;
                        } else {
                            s.push("✅ " + i.toString(l));
                        }
                        e.used.push(l.name);
                    }
                    if (s.length > 0) {
                        o.info(s.join("  "));
                    }
                };
                i.dependencies = function(e, t) {
                    var n = i.dependencyParse(e), r = n.name;
                    t = t || {};
                    if (r in t) {
                        return;
                    }
                    e = i.resolve(e) || e;
                    t[r] = o.map(e.uses || [], function(t) {
                        if (i.isPlugin(t)) {
                            i.register(t);
                        }
                        var r = i.dependencyParse(t), s = i.resolve(t);
                        if (s && !i.versionSatisfies(s.version, r.range)) {
                            o.warn("Plugin.dependencies:", i.toString(s), "does not satisfy", i.toString(r), "used by", i.toString(n) + ".");
                            s._warned = true;
                            e._warned = true;
                        } else if (!s) {
                            o.warn("Plugin.dependencies:", i.toString(t), "used by", i.toString(n), "could not be resolved.");
                            e._warned = true;
                        }
                        return r.name;
                    });
                    for (var s = 0; s < t[r].length; s += 1) {
                        i.dependencies(t[r][s], t);
                    }
                    return t;
                };
                i.dependencyParse = function(e) {
                    if (o.isString(e)) {
                        var t = /^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-]+)?))?$/;
                        if (!t.test(e)) {
                            o.warn("Plugin.dependencyParse:", e, "is not a valid dependency string.");
                        }
                        return {
                            name: e.split("@")[0],
                            range: e.split("@")[1] || "*"
                        };
                    }
                    return {
                        name: e.name,
                        range: e.range || e.version
                    };
                };
                i.versionParse = function(e) {
                    var t = /^\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-]+)?$/;
                    if (!t.test(e)) {
                        o.warn("Plugin.versionParse:", e, "is not a valid version or range.");
                    }
                    var n = e.split("-");
                    e = n[0];
                    var i = isNaN(Number(e[0])), r = i ? e.substr(1) : e, s = o.map(r.split("."), function(e) {
                        return Number(e);
                    });
                    return {
                        isRange: i,
                        version: r,
                        range: e,
                        operator: i ? e[0] : "",
                        parts: s,
                        prerelease: n[1],
                        number: s[0] * 1e8 + s[1] * 1e4 + s[2]
                    };
                };
                i.versionSatisfies = function(e, t) {
                    t = t || "*";
                    var n = i.versionParse(t), o = n.parts, r = i.versionParse(e), s = r.parts;
                    if (n.isRange) {
                        if (n.operator === "*" || e === "*") {
                            return true;
                        }
                        if (n.operator === "~") {
                            return s[0] === o[0] && s[1] === o[1] && s[2] >= o[2];
                        }
                        if (n.operator === "^") {
                            if (o[0] > 0) {
                                return s[0] === o[0] && r.number >= n.number;
                            }
                            if (o[1] > 0) {
                                return s[1] === o[1] && s[2] >= o[2];
                            }
                            return s[2] === o[2];
                        }
                    }
                    return e === t || e === "*";
                };
            })();
        }, {
            "./Common": 14
        } ],
        21: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("./Events");
            var r = e("./Engine");
            var s = e("./Common");
            (function() {
                var e, t;
                if (typeof window !== "undefined") {
                    e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
                    t = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
                }
                if (!e) {
                    var n;
                    e = function(e) {
                        n = setTimeout(function() {
                            e(s.now());
                        }, 1e3 / 60);
                    };
                    t = function() {
                        clearTimeout(n);
                    };
                }
                i.create = function(e) {
                    var t = {
                        fps: 60,
                        correction: 1,
                        deltaSampleSize: 60,
                        counterTimestamp: 0,
                        frameCounter: 0,
                        deltaHistory: [],
                        timePrev: null,
                        timeScalePrev: 1,
                        frameRequestId: null,
                        isFixed: false,
                        enabled: true
                    };
                    var n = s.extend(t, e);
                    n.delta = n.delta || 1e3 / n.fps;
                    n.deltaMin = n.deltaMin || 1e3 / n.fps;
                    n.deltaMax = n.deltaMax || 1e3 / (n.fps * .5);
                    n.fps = 1e3 / n.delta;
                    return n;
                };
                i.run = function(t, n) {
                    if (typeof t.positionIterations !== "undefined") {
                        n = t;
                        t = i.create();
                    }
                    (function o(r) {
                        t.frameRequestId = e(o);
                        if (r && t.enabled) {
                            i.tick(t, n, r);
                        }
                    })();
                    return t;
                };
                i.tick = function(e, t, n) {
                    var i = t.timing, s = 1, a;
                    var l = {
                        timestamp: i.timestamp
                    };
                    o.trigger(e, "beforeTick", l);
                    o.trigger(t, "beforeTick", l);
                    if (e.isFixed) {
                        a = e.delta;
                    } else {
                        a = n - e.timePrev || e.delta;
                        e.timePrev = n;
                        e.deltaHistory.push(a);
                        e.deltaHistory = e.deltaHistory.slice(-e.deltaSampleSize);
                        a = Math.min.apply(null, e.deltaHistory);
                        a = a < e.deltaMin ? e.deltaMin : a;
                        a = a > e.deltaMax ? e.deltaMax : a;
                        s = a / e.delta;
                        e.delta = a;
                    }
                    if (e.timeScalePrev !== 0) s *= i.timeScale / e.timeScalePrev;
                    if (i.timeScale === 0) s = 0;
                    e.timeScalePrev = i.timeScale;
                    e.correction = s;
                    e.frameCounter += 1;
                    if (n - e.counterTimestamp >= 1e3) {
                        e.fps = e.frameCounter * ((n - e.counterTimestamp) / 1e3);
                        e.counterTimestamp = n;
                        e.frameCounter = 0;
                    }
                    o.trigger(e, "tick", l);
                    o.trigger(t, "tick", l);
                    if (t.world.isModified && t.render && t.render.controller && t.render.controller.clear) {
                        t.render.controller.clear(t.render);
                    }
                    o.trigger(e, "beforeUpdate", l);
                    r.update(t, a, s);
                    o.trigger(e, "afterUpdate", l);
                    if (t.render && t.render.controller) {
                        o.trigger(e, "beforeRender", l);
                        o.trigger(t, "beforeRender", l);
                        t.render.controller.world(t.render);
                        o.trigger(e, "afterRender", l);
                        o.trigger(t, "afterRender", l);
                    }
                    o.trigger(e, "afterTick", l);
                    o.trigger(t, "afterTick", l);
                };
                i.stop = function(e) {
                    t(e.frameRequestId);
                };
                i.start = function(e, t) {
                    i.run(e, t);
                };
            })();
        }, {
            "./Common": 14,
            "./Engine": 15,
            "./Events": 16
        } ],
        22: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("./Events");
            (function() {
                i._motionWakeThreshold = .18;
                i._motionSleepThreshold = .08;
                i._minBias = .9;
                i.update = function(e, t) {
                    var n = t * t * t;
                    for (var o = 0; o < e.length; o++) {
                        var r = e[o], s = r.speed * r.speed + r.angularSpeed * r.angularSpeed;
                        if (r.force.x !== 0 || r.force.y !== 0) {
                            i.set(r, false);
                            continue;
                        }
                        var a = Math.min(r.motion, s), l = Math.max(r.motion, s);
                        r.motion = i._minBias * a + (1 - i._minBias) * l;
                        if (r.sleepThreshold > 0 && r.motion < i._motionSleepThreshold * n) {
                            r.sleepCounter += 1;
                            if (r.sleepCounter >= r.sleepThreshold) i.set(r, true);
                        } else if (r.sleepCounter > 0) {
                            r.sleepCounter -= 1;
                        }
                    }
                };
                i.afterCollisions = function(e, t) {
                    var n = t * t * t;
                    for (var o = 0; o < e.length; o++) {
                        var r = e[o];
                        if (!r.isActive) continue;
                        var s = r.collision, a = s.bodyA.parent, l = s.bodyB.parent;
                        if (a.isSleeping && l.isSleeping || a.isStatic || l.isStatic) continue;
                        if (a.isSleeping || l.isSleeping) {
                            var c = a.isSleeping && !a.isStatic ? a : l, u = c === a ? l : a;
                            if (!c.isStatic && u.motion > i._motionWakeThreshold * n) {
                                i.set(c, false);
                            }
                        }
                    }
                };
                i.set = function(e, t) {
                    var n = e.isSleeping;
                    if (t) {
                        e.isSleeping = true;
                        e.sleepCounter = e.sleepThreshold;
                        e.positionImpulse.x = 0;
                        e.positionImpulse.y = 0;
                        e.positionPrev.x = e.position.x;
                        e.positionPrev.y = e.position.y;
                        e.anglePrev = e.angle;
                        e.speed = 0;
                        e.angularSpeed = 0;
                        e.motion = 0;
                        if (!n) {
                            o.trigger(e, "sleepStart");
                        }
                    } else {
                        e.isSleeping = false;
                        e.sleepCounter = 0;
                        if (n) {
                            o.trigger(e, "sleepEnd");
                        }
                    }
                };
            })();
        }, {
            "./Events": 16
        } ],
        23: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("../geometry/Vertices");
            var r = e("../core/Common");
            var s = e("../body/Body");
            var a = e("../geometry/Bounds");
            var l = e("../geometry/Vector");
            var c;
            (function() {
                i.rectangle = function(e, t, n, i, a) {
                    a = a || {};
                    var l = {
                        label: "Rectangle Body",
                        position: {
                            x: e,
                            y: t
                        },
                        vertices: o.fromPath("L 0 0 L " + n + " 0 L " + n + " " + i + " L 0 " + i)
                    };
                    if (a.chamfer) {
                        var c = a.chamfer;
                        l.vertices = o.chamfer(l.vertices, c.radius, c.quality, c.qualityMin, c.qualityMax);
                        delete a.chamfer;
                    }
                    return s.create(r.extend({}, l, a));
                };
                i.trapezoid = function(e, t, n, i, a, l) {
                    l = l || {};
                    a *= .5;
                    var c = (1 - a * 2) * n;
                    var u = n * a, f = u + c, d = f + u, p;
                    if (a < .5) {
                        p = "L 0 0 L " + u + " " + -i + " L " + f + " " + -i + " L " + d + " 0";
                    } else {
                        p = "L 0 0 L " + f + " " + -i + " L " + d + " 0";
                    }
                    var v = {
                        label: "Trapezoid Body",
                        position: {
                            x: e,
                            y: t
                        },
                        vertices: o.fromPath(p)
                    };
                    if (l.chamfer) {
                        var m = l.chamfer;
                        v.vertices = o.chamfer(v.vertices, m.radius, m.quality, m.qualityMin, m.qualityMax);
                        delete l.chamfer;
                    }
                    return s.create(r.extend({}, v, l));
                };
                i.circle = function(e, t, n, o, s) {
                    o = o || {};
                    var a = {
                        label: "Circle Body",
                        circleRadius: n
                    };
                    s = s || 25;
                    var l = Math.ceil(Math.max(10, Math.min(s, n)));
                    if (l % 2 === 1) l += 1;
                    return i.polygon(e, t, l, n, r.extend({}, a, o));
                };
                i.polygon = function(e, t, n, a, l) {
                    l = l || {};
                    if (n < 3) return i.circle(e, t, a, l);
                    var c = 2 * Math.PI / n, u = "", f = c * .5;
                    for (var d = 0; d < n; d += 1) {
                        var p = f + d * c, v = Math.cos(p) * a, m = Math.sin(p) * a;
                        u += "L " + v.toFixed(3) + " " + m.toFixed(3) + " ";
                    }
                    var y = {
                        label: "Polygon Body",
                        position: {
                            x: e,
                            y: t
                        },
                        vertices: o.fromPath(u)
                    };
                    if (l.chamfer) {
                        var g = l.chamfer;
                        y.vertices = o.chamfer(y.vertices, g.radius, g.quality, g.qualityMin, g.qualityMax);
                        delete l.chamfer;
                    }
                    return s.create(r.extend({}, y, l));
                };
                i.fromVertices = function(e, t, n, i, u, f, d) {
                    if (!c) {
                        c = r._requireGlobal("decomp", "poly-decomp");
                    }
                    var p, v, m, y, g, x, h, b, w;
                    i = i || {};
                    v = [];
                    u = typeof u !== "undefined" ? u : false;
                    f = typeof f !== "undefined" ? f : .01;
                    d = typeof d !== "undefined" ? d : 10;
                    if (!c) {
                        r.warn("Bodies.fromVertices: poly-decomp.js required. Could not decompose vertices. Fallback to convex hull.");
                    }
                    if (!r.isArray(n[0])) {
                        n = [ n ];
                    }
                    for (b = 0; b < n.length; b += 1) {
                        y = n[b];
                        m = o.isConvex(y);
                        if (m || !c) {
                            if (m) {
                                y = o.clockwiseSort(y);
                            } else {
                                y = o.hull(y);
                            }
                            v.push({
                                position: {
                                    x: e,
                                    y: t
                                },
                                vertices: y
                            });
                        } else {
                            var S = y.map(function(e) {
                                return [ e.x, e.y ];
                            });
                            c.makeCCW(S);
                            if (f !== false) c.removeCollinearPoints(S, f);
                            var C = c.quickDecomp(S);
                            for (g = 0; g < C.length; g++) {
                                var A = C[g];
                                var P = A.map(function(e) {
                                    return {
                                        x: e[0],
                                        y: e[1]
                                    };
                                });
                                if (d > 0 && o.area(P) < d) continue;
                                v.push({
                                    position: o.centre(P),
                                    vertices: P
                                });
                            }
                        }
                    }
                    for (g = 0; g < v.length; g++) {
                        v[g] = s.create(r.extend(v[g], i));
                    }
                    if (u) {
                        var B = 5;
                        for (g = 0; g < v.length; g++) {
                            var M = v[g];
                            for (x = g + 1; x < v.length; x++) {
                                var I = v[x];
                                if (a.overlaps(M.bounds, I.bounds)) {
                                    var k = M.vertices, _ = I.vertices;
                                    for (h = 0; h < M.vertices.length; h++) {
                                        for (w = 0; w < I.vertices.length; w++) {
                                            var T = l.magnitudeSquared(l.sub(k[(h + 1) % k.length], _[w])), R = l.magnitudeSquared(l.sub(k[h], _[(w + 1) % _.length]));
                                            if (T < B && R < B) {
                                                k[h].isInternal = true;
                                                _[w].isInternal = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (v.length > 1) {
                        p = s.create(r.extend({
                            parts: v.slice(0)
                        }, i));
                        s.setPosition(p, {
                            x: e,
                            y: t
                        });
                        return p;
                    } else {
                        return v[0];
                    }
                };
            })();
        }, {
            "../body/Body": 1,
            "../core/Common": 14,
            "../geometry/Bounds": 26,
            "../geometry/Vector": 28,
            "../geometry/Vertices": 29
        } ],
        24: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("../body/Composite");
            var r = e("../constraint/Constraint");
            var s = e("../core/Common");
            var a = e("../body/Body");
            var l = e("./Bodies");
            (function() {
                i.stack = function(e, t, n, i, r, s, l) {
                    var c = o.create({
                        label: "Stack"
                    }), u = e, f = t, d, p = 0;
                    for (var v = 0; v < i; v++) {
                        var m = 0;
                        for (var y = 0; y < n; y++) {
                            var g = l(u, f, y, v, d, p);
                            if (g) {
                                var x = g.bounds.max.y - g.bounds.min.y, h = g.bounds.max.x - g.bounds.min.x;
                                if (x > m) m = x;
                                a.translate(g, {
                                    x: h * .5,
                                    y: x * .5
                                });
                                u = g.bounds.max.x + r;
                                o.addBody(c, g);
                                d = g;
                                p += 1;
                            } else {
                                u += r;
                            }
                        }
                        f += m + s;
                        u = e;
                    }
                    return c;
                };
                i.chain = function(e, t, n, i, a, l) {
                    var c = e.bodies;
                    for (var u = 1; u < c.length; u++) {
                        var f = c[u - 1], d = c[u], p = f.bounds.max.y - f.bounds.min.y, v = f.bounds.max.x - f.bounds.min.x, m = d.bounds.max.y - d.bounds.min.y, y = d.bounds.max.x - d.bounds.min.x;
                        var g = {
                            bodyA: f,
                            pointA: {
                                x: v * t,
                                y: p * n
                            },
                            bodyB: d,
                            pointB: {
                                x: y * i,
                                y: m * a
                            }
                        };
                        var x = s.extend(g, l);
                        o.addConstraint(e, r.create(x));
                    }
                    e.label += " Chain";
                    return e;
                };
                i.mesh = function(e, t, n, i, a) {
                    var l = e.bodies, c, u, f, d, p;
                    for (c = 0; c < n; c++) {
                        for (u = 1; u < t; u++) {
                            f = l[u - 1 + c * t];
                            d = l[u + c * t];
                            o.addConstraint(e, r.create(s.extend({
                                bodyA: f,
                                bodyB: d
                            }, a)));
                        }
                        if (c > 0) {
                            for (u = 0; u < t; u++) {
                                f = l[u + (c - 1) * t];
                                d = l[u + c * t];
                                o.addConstraint(e, r.create(s.extend({
                                    bodyA: f,
                                    bodyB: d
                                }, a)));
                                if (i && u > 0) {
                                    p = l[u - 1 + (c - 1) * t];
                                    o.addConstraint(e, r.create(s.extend({
                                        bodyA: p,
                                        bodyB: d
                                    }, a)));
                                }
                                if (i && u < t - 1) {
                                    p = l[u + 1 + (c - 1) * t];
                                    o.addConstraint(e, r.create(s.extend({
                                        bodyA: p,
                                        bodyB: d
                                    }, a)));
                                }
                            }
                        }
                    }
                    e.label += " Mesh";
                    return e;
                };
                i.pyramid = function(e, t, n, o, r, s, l) {
                    return i.stack(e, t, n, o, r, s, function(t, i, s, c, u, f) {
                        var d = Math.min(o, Math.ceil(n / 2)), p = u ? u.bounds.max.x - u.bounds.min.x : 0;
                        if (c > d) return;
                        c = d - c;
                        var v = c, m = n - 1 - c;
                        if (s < v || s > m) return;
                        if (f === 1) {
                            a.translate(u, {
                                x: (s + (n % 2 === 1 ? 1 : -1)) * p,
                                y: 0
                            });
                        }
                        var y = u ? s * p : 0;
                        return l(e + y + s * r, i, s, c, u, f);
                    });
                };
                i.newtonsCradle = function(e, t, n, i, s) {
                    var a = o.create({
                        label: "Newtons Cradle"
                    });
                    for (var c = 0; c < n; c++) {
                        var u = 1.9, f = l.circle(e + c * (i * u), t + s, i, {
                            inertia: Infinity,
                            restitution: 1,
                            friction: 0,
                            frictionAir: 1e-4,
                            slop: 1
                        }), d = r.create({
                            pointA: {
                                x: e + c * (i * u),
                                y: t
                            },
                            bodyB: f
                        });
                        o.addBody(a, f);
                        o.addConstraint(a, d);
                    }
                    return a;
                };
                i.car = function(e, t, n, i, s) {
                    var c = a.nextGroup(true), u = 20, f = -n * .5 + u, d = n * .5 - u, p = 0;
                    var v = o.create({
                        label: "Car"
                    }), m = l.rectangle(e, t, n, i, {
                        collisionFilter: {
                            group: c
                        },
                        chamfer: {
                            radius: i * .5
                        },
                        density: 2e-4
                    });
                    var y = l.circle(e + f, t + p, s, {
                        collisionFilter: {
                            group: c
                        },
                        friction: .8
                    });
                    var g = l.circle(e + d, t + p, s, {
                        collisionFilter: {
                            group: c
                        },
                        friction: .8
                    });
                    var x = r.create({
                        bodyB: m,
                        pointB: {
                            x: f,
                            y: p
                        },
                        bodyA: y,
                        stiffness: 1,
                        length: 0
                    });
                    var h = r.create({
                        bodyB: m,
                        pointB: {
                            x: d,
                            y: p
                        },
                        bodyA: g,
                        stiffness: 1,
                        length: 0
                    });
                    o.addBody(v, m);
                    o.addBody(v, y);
                    o.addBody(v, g);
                    o.addConstraint(v, x);
                    o.addConstraint(v, h);
                    return v;
                };
                i.softBody = function(e, t, n, o, r, a, c, u, f, d) {
                    f = s.extend({
                        inertia: Infinity
                    }, f);
                    d = s.extend({
                        stiffness: .2,
                        render: {
                            type: "line",
                            anchors: false
                        }
                    }, d);
                    var p = i.stack(e, t, n, o, r, a, function(e, t) {
                        return l.circle(e, t, u, f);
                    });
                    i.mesh(p, n, o, c, d);
                    p.label = "Soft Body";
                    return p;
                };
            })();
        }, {
            "../body/Body": 1,
            "../body/Composite": 2,
            "../constraint/Constraint": 12,
            "../core/Common": 14,
            "./Bodies": 23
        } ],
        25: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("../geometry/Vector");
            var r = e("../core/Common");
            (function() {
                i.fromVertices = function(e) {
                    var t = {};
                    for (var n = 0; n < e.length; n++) {
                        var i = (n + 1) % e.length, s = o.normalise({
                            x: e[i].y - e[n].y,
                            y: e[n].x - e[i].x
                        }), a = s.y === 0 ? Infinity : s.x / s.y;
                        a = a.toFixed(3).toString();
                        t[a] = s;
                    }
                    return r.values(t);
                };
                i.rotate = function(e, t) {
                    if (t === 0) return;
                    var n = Math.cos(t), i = Math.sin(t);
                    for (var o = 0; o < e.length; o++) {
                        var r = e[o], s;
                        s = r.x * n - r.y * i;
                        r.y = r.x * i + r.y * n;
                        r.x = s;
                    }
                };
            })();
        }, {
            "../core/Common": 14,
            "../geometry/Vector": 28
        } ],
        26: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            (function() {
                i.create = function(e) {
                    var t = {
                        min: {
                            x: 0,
                            y: 0
                        },
                        max: {
                            x: 0,
                            y: 0
                        }
                    };
                    if (e) i.update(t, e);
                    return t;
                };
                i.update = function(e, t, n) {
                    e.min.x = Infinity;
                    e.max.x = -Infinity;
                    e.min.y = Infinity;
                    e.max.y = -Infinity;
                    for (var i = 0; i < t.length; i++) {
                        var o = t[i];
                        if (o.x > e.max.x) e.max.x = o.x;
                        if (o.x < e.min.x) e.min.x = o.x;
                        if (o.y > e.max.y) e.max.y = o.y;
                        if (o.y < e.min.y) e.min.y = o.y;
                    }
                    if (n) {
                        if (n.x > 0) {
                            e.max.x += n.x;
                        } else {
                            e.min.x += n.x;
                        }
                        if (n.y > 0) {
                            e.max.y += n.y;
                        } else {
                            e.min.y += n.y;
                        }
                    }
                };
                i.contains = function(e, t) {
                    return t.x >= e.min.x && t.x <= e.max.x && t.y >= e.min.y && t.y <= e.max.y;
                };
                i.overlaps = function(e, t) {
                    return e.min.x <= t.max.x && e.max.x >= t.min.x && e.max.y >= t.min.y && e.min.y <= t.max.y;
                };
                i.translate = function(e, t) {
                    e.min.x += t.x;
                    e.max.x += t.x;
                    e.min.y += t.y;
                    e.max.y += t.y;
                };
                i.shift = function(e, t) {
                    var n = e.max.x - e.min.x, i = e.max.y - e.min.y;
                    e.min.x = t.x;
                    e.max.x = t.x + n;
                    e.min.y = t.y;
                    e.max.y = t.y + i;
                };
            })();
        }, {} ],
        27: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("../geometry/Bounds");
            var r = e("../core/Common");
            (function() {
                i.pathToVertices = function(e, t) {
                    if (typeof window !== "undefined" && !("SVGPathSeg" in window)) {
                        r.warn("Svg.pathToVertices: SVGPathSeg not defined, a polyfill is required.");
                    }
                    var n, o, s, a, l, c, u, f, d, p, v = [], m, y, g = 0, x = 0, h = 0;
                    t = t || 15;
                    var b = function(e, t, n) {
                        var i = n % 2 === 1 && n > 1;
                        if (!d || e != d.x || t != d.y) {
                            if (d && i) {
                                m = d.x;
                                y = d.y;
                            } else {
                                m = 0;
                                y = 0;
                            }
                            var o = {
                                x: m + e,
                                y: y + t
                            };
                            if (i || !d) {
                                d = o;
                            }
                            v.push(o);
                            x = m + e;
                            h = y + t;
                        }
                    };
                    var w = function(e) {
                        var t = e.pathSegTypeAsLetter.toUpperCase();
                        if (t === "Z") return;
                        switch (t) {
                          case "M":
                          case "L":
                          case "T":
                          case "C":
                          case "S":
                          case "Q":
                            x = e.x;
                            h = e.y;
                            break;

                          case "H":
                            x = e.x;
                            break;

                          case "V":
                            h = e.y;
                            break;
                        }
                        b(x, h, e.pathSegType);
                    };
                    i._svgPathToAbsolute(e);
                    s = e.getTotalLength();
                    c = [];
                    for (n = 0; n < e.pathSegList.numberOfItems; n += 1) c.push(e.pathSegList.getItem(n));
                    u = c.concat();
                    while (g < s) {
                        p = e.getPathSegAtLength(g);
                        l = c[p];
                        if (l != f) {
                            while (u.length && u[0] != l) w(u.shift());
                            f = l;
                        }
                        switch (l.pathSegTypeAsLetter.toUpperCase()) {
                          case "C":
                          case "T":
                          case "S":
                          case "Q":
                          case "A":
                            a = e.getPointAtLength(g);
                            b(a.x, a.y, 0);
                            break;
                        }
                        g += t;
                    }
                    for (n = 0, o = u.length; n < o; ++n) w(u[n]);
                    return v;
                };
                i._svgPathToAbsolute = function(e) {
                    var t, n, i, o, r, s, a = e.pathSegList, l = 0, c = 0, u = a.numberOfItems;
                    for (var f = 0; f < u; ++f) {
                        var d = a.getItem(f), p = d.pathSegTypeAsLetter;
                        if (/[MLHVCSQTA]/.test(p)) {
                            if ("x" in d) l = d.x;
                            if ("y" in d) c = d.y;
                        } else {
                            if ("x1" in d) i = l + d.x1;
                            if ("x2" in d) r = l + d.x2;
                            if ("y1" in d) o = c + d.y1;
                            if ("y2" in d) s = c + d.y2;
                            if ("x" in d) l += d.x;
                            if ("y" in d) c += d.y;
                            switch (p) {
                              case "m":
                                a.replaceItem(e.createSVGPathSegMovetoAbs(l, c), f);
                                break;

                              case "l":
                                a.replaceItem(e.createSVGPathSegLinetoAbs(l, c), f);
                                break;

                              case "h":
                                a.replaceItem(e.createSVGPathSegLinetoHorizontalAbs(l), f);
                                break;

                              case "v":
                                a.replaceItem(e.createSVGPathSegLinetoVerticalAbs(c), f);
                                break;

                              case "c":
                                a.replaceItem(e.createSVGPathSegCurvetoCubicAbs(l, c, i, o, r, s), f);
                                break;

                              case "s":
                                a.replaceItem(e.createSVGPathSegCurvetoCubicSmoothAbs(l, c, r, s), f);
                                break;

                              case "q":
                                a.replaceItem(e.createSVGPathSegCurvetoQuadraticAbs(l, c, i, o), f);
                                break;

                              case "t":
                                a.replaceItem(e.createSVGPathSegCurvetoQuadraticSmoothAbs(l, c), f);
                                break;

                              case "a":
                                a.replaceItem(e.createSVGPathSegArcAbs(l, c, d.r1, d.r2, d.angle, d.largeArcFlag, d.sweepFlag), f);
                                break;

                              case "z":
                              case "Z":
                                l = t;
                                c = n;
                                break;
                            }
                        }
                        if (p == "M" || p == "m") {
                            t = l;
                            n = c;
                        }
                    }
                };
            })();
        }, {
            "../core/Common": 14,
            "../geometry/Bounds": 26
        } ],
        28: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            (function() {
                i.create = function(e, t) {
                    return {
                        x: e || 0,
                        y: t || 0
                    };
                };
                i.clone = function(e) {
                    return {
                        x: e.x,
                        y: e.y
                    };
                };
                i.magnitude = function(e) {
                    return Math.sqrt(e.x * e.x + e.y * e.y);
                };
                i.magnitudeSquared = function(e) {
                    return e.x * e.x + e.y * e.y;
                };
                i.rotate = function(e, t, n) {
                    var i = Math.cos(t), o = Math.sin(t);
                    if (!n) n = {};
                    var r = e.x * i - e.y * o;
                    n.y = e.x * o + e.y * i;
                    n.x = r;
                    return n;
                };
                i.rotateAbout = function(e, t, n, i) {
                    var o = Math.cos(t), r = Math.sin(t);
                    if (!i) i = {};
                    var s = n.x + ((e.x - n.x) * o - (e.y - n.y) * r);
                    i.y = n.y + ((e.x - n.x) * r + (e.y - n.y) * o);
                    i.x = s;
                    return i;
                };
                i.normalise = function(e) {
                    var t = i.magnitude(e);
                    if (t === 0) return {
                        x: 0,
                        y: 0
                    };
                    return {
                        x: e.x / t,
                        y: e.y / t
                    };
                };
                i.dot = function(e, t) {
                    return e.x * t.x + e.y * t.y;
                };
                i.cross = function(e, t) {
                    return e.x * t.y - e.y * t.x;
                };
                i.cross3 = function(e, t, n) {
                    return (t.x - e.x) * (n.y - e.y) - (t.y - e.y) * (n.x - e.x);
                };
                i.add = function(e, t, n) {
                    if (!n) n = {};
                    n.x = e.x + t.x;
                    n.y = e.y + t.y;
                    return n;
                };
                i.sub = function(e, t, n) {
                    if (!n) n = {};
                    n.x = e.x - t.x;
                    n.y = e.y - t.y;
                    return n;
                };
                i.mult = function(e, t) {
                    return {
                        x: e.x * t,
                        y: e.y * t
                    };
                };
                i.div = function(e, t) {
                    return {
                        x: e.x / t,
                        y: e.y / t
                    };
                };
                i.perp = function(e, t) {
                    t = t === true ? -1 : 1;
                    return {
                        x: t * -e.y,
                        y: t * e.x
                    };
                };
                i.neg = function(e) {
                    return {
                        x: -e.x,
                        y: -e.y
                    };
                };
                i.angle = function(e, t) {
                    return Math.atan2(t.y - e.y, t.x - e.x);
                };
                i._temp = [ i.create(), i.create(), i.create(), i.create(), i.create(), i.create() ];
            })();
        }, {} ],
        29: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("../geometry/Vector");
            var r = e("../core/Common");
            (function() {
                i.create = function(e, t) {
                    var n = [];
                    for (var i = 0; i < e.length; i++) {
                        var o = e[i], r = {
                            x: o.x,
                            y: o.y,
                            index: i,
                            body: t,
                            isInternal: false
                        };
                        n.push(r);
                    }
                    return n;
                };
                i.fromPath = function(e, t) {
                    var n = /L?\s*([\-\d\.e]+)[\s,]*([\-\d\.e]+)*/gi, o = [];
                    e.replace(n, function(e, t, n) {
                        o.push({
                            x: parseFloat(t),
                            y: parseFloat(n)
                        });
                    });
                    return i.create(o, t);
                };
                i.centre = function(e) {
                    var t = i.area(e, true), n = {
                        x: 0,
                        y: 0
                    }, r, s, a;
                    for (var l = 0; l < e.length; l++) {
                        a = (l + 1) % e.length;
                        r = o.cross(e[l], e[a]);
                        s = o.mult(o.add(e[l], e[a]), r);
                        n = o.add(n, s);
                    }
                    return o.div(n, 6 * t);
                };
                i.mean = function(e) {
                    var t = {
                        x: 0,
                        y: 0
                    };
                    for (var n = 0; n < e.length; n++) {
                        t.x += e[n].x;
                        t.y += e[n].y;
                    }
                    return o.div(t, e.length);
                };
                i.area = function(e, t) {
                    var n = 0, i = e.length - 1;
                    for (var o = 0; o < e.length; o++) {
                        n += (e[i].x - e[o].x) * (e[i].y + e[o].y);
                        i = o;
                    }
                    if (t) return n / 2;
                    return Math.abs(n) / 2;
                };
                i.inertia = function(e, t) {
                    var n = 0, i = 0, r = e, s, a;
                    for (var l = 0; l < r.length; l++) {
                        a = (l + 1) % r.length;
                        s = Math.abs(o.cross(r[a], r[l]));
                        n += s * (o.dot(r[a], r[a]) + o.dot(r[a], r[l]) + o.dot(r[l], r[l]));
                        i += s;
                    }
                    return t / 6 * (n / i);
                };
                i.translate = function(e, t, n) {
                    var i;
                    if (n) {
                        for (i = 0; i < e.length; i++) {
                            e[i].x += t.x * n;
                            e[i].y += t.y * n;
                        }
                    } else {
                        for (i = 0; i < e.length; i++) {
                            e[i].x += t.x;
                            e[i].y += t.y;
                        }
                    }
                    return e;
                };
                i.rotate = function(e, t, n) {
                    if (t === 0) return;
                    var i = Math.cos(t), o = Math.sin(t);
                    for (var r = 0; r < e.length; r++) {
                        var s = e[r], a = s.x - n.x, l = s.y - n.y;
                        s.x = n.x + (a * i - l * o);
                        s.y = n.y + (a * o + l * i);
                    }
                    return e;
                };
                i.contains = function(e, t) {
                    for (var n = 0; n < e.length; n++) {
                        var i = e[n], o = e[(n + 1) % e.length];
                        if ((t.x - i.x) * (o.y - i.y) + (t.y - i.y) * (i.x - o.x) > 0) {
                            return false;
                        }
                    }
                    return true;
                };
                i.scale = function(e, t, n, r) {
                    if (t === 1 && n === 1) return e;
                    r = r || i.centre(e);
                    var s, a;
                    for (var l = 0; l < e.length; l++) {
                        s = e[l];
                        a = o.sub(s, r);
                        e[l].x = r.x + a.x * t;
                        e[l].y = r.y + a.y * n;
                    }
                    return e;
                };
                i.chamfer = function(e, t, n, i, s) {
                    if (typeof t === "number") {
                        t = [ t ];
                    } else {
                        t = t || [ 8 ];
                    }
                    n = typeof n !== "undefined" ? n : -1;
                    i = i || 2;
                    s = s || 14;
                    var a = [];
                    for (var l = 0; l < e.length; l++) {
                        var c = e[l - 1 >= 0 ? l - 1 : e.length - 1], u = e[l], f = e[(l + 1) % e.length], d = t[l < t.length ? l : t.length - 1];
                        if (d === 0) {
                            a.push(u);
                            continue;
                        }
                        var p = o.normalise({
                            x: u.y - c.y,
                            y: c.x - u.x
                        });
                        var v = o.normalise({
                            x: f.y - u.y,
                            y: u.x - f.x
                        });
                        var m = Math.sqrt(2 * Math.pow(d, 2)), y = o.mult(r.clone(p), d), g = o.normalise(o.mult(o.add(p, v), .5)), x = o.sub(u, o.mult(g, m));
                        var h = n;
                        if (n === -1) {
                            h = Math.pow(d, .32) * 1.75;
                        }
                        h = r.clamp(h, i, s);
                        if (h % 2 === 1) h += 1;
                        var b = Math.acos(o.dot(p, v)), w = b / h;
                        for (var S = 0; S < h; S++) {
                            a.push(o.add(o.rotate(y, w * S), x));
                        }
                    }
                    return a;
                };
                i.clockwiseSort = function(e) {
                    var t = i.mean(e);
                    e.sort(function(e, n) {
                        return o.angle(t, e) - o.angle(t, n);
                    });
                    return e;
                };
                i.isConvex = function(e) {
                    var t = 0, n = e.length, i, o, r, s;
                    if (n < 3) return null;
                    for (i = 0; i < n; i++) {
                        o = (i + 1) % n;
                        r = (i + 2) % n;
                        s = (e[o].x - e[i].x) * (e[r].y - e[o].y);
                        s -= (e[o].y - e[i].y) * (e[r].x - e[o].x);
                        if (s < 0) {
                            t |= 1;
                        } else if (s > 0) {
                            t |= 2;
                        }
                        if (t === 3) {
                            return false;
                        }
                    }
                    if (t !== 0) {
                        return true;
                    } else {
                        return null;
                    }
                };
                i.hull = function(e) {
                    var t = [], n = [], i, r;
                    e = e.slice(0);
                    e.sort(function(e, t) {
                        var n = e.x - t.x;
                        return n !== 0 ? n : e.y - t.y;
                    });
                    for (r = 0; r < e.length; r += 1) {
                        i = e[r];
                        while (n.length >= 2 && o.cross3(n[n.length - 2], n[n.length - 1], i) <= 0) {
                            n.pop();
                        }
                        n.push(i);
                    }
                    for (r = e.length - 1; r >= 0; r -= 1) {
                        i = e[r];
                        while (t.length >= 2 && o.cross3(t[t.length - 2], t[t.length - 1], i) <= 0) {
                            t.pop();
                        }
                        t.push(i);
                    }
                    t.pop();
                    n.pop();
                    return t.concat(n);
                };
            })();
        }, {
            "../core/Common": 14,
            "../geometry/Vector": 28
        } ],
        30: [ function(e, t, n) {
            var i = t.exports = e("../core/Matter");
            i.Body = e("../body/Body");
            i.Composite = e("../body/Composite");
            i.World = e("../body/World");
            i.Contact = e("../collision/Contact");
            i.Detector = e("../collision/Detector");
            i.Grid = e("../collision/Grid");
            i.Pairs = e("../collision/Pairs");
            i.Pair = e("../collision/Pair");
            i.Query = e("../collision/Query");
            i.Resolver = e("../collision/Resolver");
            i.SAT = e("../collision/SAT");
            i.Constraint = e("../constraint/Constraint");
            i.MouseConstraint = e("../constraint/MouseConstraint");
            i.Common = e("../core/Common");
            i.Engine = e("../core/Engine");
            i.Events = e("../core/Events");
            i.Mouse = e("../core/Mouse");
            i.Runner = e("../core/Runner");
            i.Sleeping = e("../core/Sleeping");
            i.Plugin = e("../core/Plugin");
            i.Bodies = e("../factory/Bodies");
            i.Composites = e("../factory/Composites");
            i.Axes = e("../geometry/Axes");
            i.Bounds = e("../geometry/Bounds");
            i.Svg = e("../geometry/Svg");
            i.Vector = e("../geometry/Vector");
            i.Vertices = e("../geometry/Vertices");
            i.Render = e("../render/Render");
            i.RenderPixi = e("../render/RenderPixi");
            i.World.add = i.Composite.add;
            i.World.remove = i.Composite.remove;
            i.World.addComposite = i.Composite.addComposite;
            i.World.addBody = i.Composite.addBody;
            i.World.addConstraint = i.Composite.addConstraint;
            i.World.clear = i.Composite.clear;
            i.Engine.run = i.Runner.run;
        }, {
            "../body/Body": 1,
            "../body/Composite": 2,
            "../body/World": 3,
            "../collision/Contact": 4,
            "../collision/Detector": 5,
            "../collision/Grid": 6,
            "../collision/Pair": 7,
            "../collision/Pairs": 8,
            "../collision/Query": 9,
            "../collision/Resolver": 10,
            "../collision/SAT": 11,
            "../constraint/Constraint": 12,
            "../constraint/MouseConstraint": 13,
            "../core/Common": 14,
            "../core/Engine": 15,
            "../core/Events": 16,
            "../core/Matter": 17,
            "../core/Metrics": 18,
            "../core/Mouse": 19,
            "../core/Plugin": 20,
            "../core/Runner": 21,
            "../core/Sleeping": 22,
            "../factory/Bodies": 23,
            "../factory/Composites": 24,
            "../geometry/Axes": 25,
            "../geometry/Bounds": 26,
            "../geometry/Svg": 27,
            "../geometry/Vector": 28,
            "../geometry/Vertices": 29,
            "../render/Render": 31,
            "../render/RenderPixi": 32
        } ],
        31: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("../core/Common");
            var r = e("../body/Composite");
            var s = e("../geometry/Bounds");
            var a = e("../core/Events");
            var l = e("../collision/Grid");
            var c = e("../geometry/Vector");
            var u = e("../core/Mouse");
            (function() {
                var e, t;
                if (typeof window !== "undefined") {
                    e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
                        window.setTimeout(function() {
                            e(o.now());
                        }, 1e3 / 60);
                    };
                    t = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
                }
                i.create = function(e) {
                    var t = {
                        controller: i,
                        engine: null,
                        element: null,
                        canvas: null,
                        mouse: null,
                        frameRequestId: null,
                        options: {
                            width: 800,
                            height: 600,
                            pixelRatio: 1,
                            background: "#18181d",
                            wireframeBackground: "#0f0f13",
                            hasBounds: !!e.bounds,
                            enabled: true,
                            wireframes: true,
                            showSleeping: true,
                            showDebug: false,
                            showBroadphase: false,
                            showBounds: false,
                            showVelocity: false,
                            showCollisions: false,
                            showSeparations: false,
                            showAxes: false,
                            showPositions: false,
                            showAngleIndicator: false,
                            showIds: false,
                            showShadows: false,
                            showVertexNumbers: false,
                            showConvexHulls: false,
                            showInternalEdges: false,
                            showMousePosition: false
                        }
                    };
                    var r = o.extend(t, e);
                    if (r.canvas) {
                        r.canvas.width = r.options.width || r.canvas.width;
                        r.canvas.height = r.options.height || r.canvas.height;
                    }
                    r.mouse = e.mouse;
                    r.engine = e.engine;
                    r.canvas = r.canvas || n(r.options.width, r.options.height);
                    r.context = r.canvas.getContext("2d");
                    r.textures = {};
                    r.bounds = r.bounds || {
                        min: {
                            x: 0,
                            y: 0
                        },
                        max: {
                            x: r.canvas.width,
                            y: r.canvas.height
                        }
                    };
                    if (r.options.pixelRatio !== 1) {
                        i.setPixelRatio(r, r.options.pixelRatio);
                    }
                    if (o.isElement(r.element)) {
                        r.element.appendChild(r.canvas);
                    } else if (!r.canvas.parentNode) {
                        o.log("Render.create: options.element was undefined, render.canvas was created but not appended", "warn");
                    }
                    return r;
                };
                i.run = function(t) {
                    (function n(o) {
                        t.frameRequestId = e(n);
                        i.world(t);
                    })();
                };
                i.stop = function(e) {
                    t(e.frameRequestId);
                };
                i.setPixelRatio = function(e, t) {
                    var n = e.options, i = e.canvas;
                    if (t === "auto") {
                        t = f(i);
                    }
                    n.pixelRatio = t;
                    i.setAttribute("data-pixel-ratio", t);
                    i.width = n.width * t;
                    i.height = n.height * t;
                    i.style.width = n.width + "px";
                    i.style.height = n.height + "px";
                    e.context.scale(t, t);
                };
                i.lookAt = function(e, t, n, i) {
                    i = typeof i !== "undefined" ? i : true;
                    t = o.isArray(t) ? t : [ t ];
                    n = n || {
                        x: 0,
                        y: 0
                    };
                    var r = {
                        min: {
                            x: Infinity,
                            y: Infinity
                        },
                        max: {
                            x: -Infinity,
                            y: -Infinity
                        }
                    };
                    for (var s = 0; s < t.length; s += 1) {
                        var a = t[s], l = a.bounds ? a.bounds.min : a.min || a.position || a, c = a.bounds ? a.bounds.max : a.max || a.position || a;
                        if (l && c) {
                            if (l.x < r.min.x) r.min.x = l.x;
                            if (c.x > r.max.x) r.max.x = c.x;
                            if (l.y < r.min.y) r.min.y = l.y;
                            if (c.y > r.max.y) r.max.y = c.y;
                        }
                    }
                    var f = r.max.x - r.min.x + 2 * n.x, d = r.max.y - r.min.y + 2 * n.y, p = e.canvas.height, v = e.canvas.width, m = v / p, y = f / d, g = 1, x = 1;
                    if (y > m) {
                        x = y / m;
                    } else {
                        g = m / y;
                    }
                    e.options.hasBounds = true;
                    e.bounds.min.x = r.min.x;
                    e.bounds.max.x = r.min.x + f * g;
                    e.bounds.min.y = r.min.y;
                    e.bounds.max.y = r.min.y + d * x;
                    if (i) {
                        e.bounds.min.x += f * .5 - f * g * .5;
                        e.bounds.max.x += f * .5 - f * g * .5;
                        e.bounds.min.y += d * .5 - d * x * .5;
                        e.bounds.max.y += d * .5 - d * x * .5;
                    }
                    e.bounds.min.x -= n.x;
                    e.bounds.max.x -= n.x;
                    e.bounds.min.y -= n.y;
                    e.bounds.max.y -= n.y;
                    if (e.mouse) {
                        u.setScale(e.mouse, {
                            x: (e.bounds.max.x - e.bounds.min.x) / e.canvas.width,
                            y: (e.bounds.max.y - e.bounds.min.y) / e.canvas.height
                        });
                        u.setOffset(e.mouse, e.bounds.min);
                    }
                };
                i.startViewTransform = function(e) {
                    var t = e.bounds.max.x - e.bounds.min.x, n = e.bounds.max.y - e.bounds.min.y, i = t / e.options.width, o = n / e.options.height;
                    e.context.scale(1 / i, 1 / o);
                    e.context.translate(-e.bounds.min.x, -e.bounds.min.y);
                };
                i.endViewTransform = function(e) {
                    e.context.setTransform(e.options.pixelRatio, 0, 0, e.options.pixelRatio, 0, 0);
                };
                i.world = function(e) {
                    var t = e.engine, n = t.world, o = e.canvas, f = e.context, d = e.options, v = r.allBodies(n), m = r.allConstraints(n), y = d.wireframes ? d.wireframeBackground : d.background, g = [], x = [], h;
                    var b = {
                        timestamp: t.timing.timestamp
                    };
                    a.trigger(e, "beforeRender", b);
                    if (e.currentBackground !== y) p(e, y);
                    f.globalCompositeOperation = "source-in";
                    f.fillStyle = "transparent";
                    f.fillRect(0, 0, o.width, o.height);
                    f.globalCompositeOperation = "source-over";
                    if (d.hasBounds) {
                        for (h = 0; h < v.length; h++) {
                            var w = v[h];
                            if (s.overlaps(w.bounds, e.bounds)) g.push(w);
                        }
                        for (h = 0; h < m.length; h++) {
                            var S = m[h], C = S.bodyA, A = S.bodyB, P = S.pointA, B = S.pointB;
                            if (C) P = c.add(C.position, S.pointA);
                            if (A) B = c.add(A.position, S.pointB);
                            if (!P || !B) continue;
                            if (s.contains(e.bounds, P) || s.contains(e.bounds, B)) x.push(S);
                        }
                        i.startViewTransform(e);
                        if (e.mouse) {
                            u.setScale(e.mouse, {
                                x: (e.bounds.max.x - e.bounds.min.x) / e.canvas.width,
                                y: (e.bounds.max.y - e.bounds.min.y) / e.canvas.height
                            });
                            u.setOffset(e.mouse, e.bounds.min);
                        }
                    } else {
                        x = m;
                        g = v;
                    }
                    if (!d.wireframes || t.enableSleeping && d.showSleeping) {
                        i.bodies(e, g, f);
                    } else {
                        if (d.showConvexHulls) i.bodyConvexHulls(e, g, f);
                        i.bodyWireframes(e, g, f);
                    }
                    if (d.showBounds) i.bodyBounds(e, g, f);
                    if (d.showAxes || d.showAngleIndicator) i.bodyAxes(e, g, f);
                    if (d.showPositions) i.bodyPositions(e, g, f);
                    if (d.showVelocity) i.bodyVelocity(e, g, f);
                    if (d.showIds) i.bodyIds(e, g, f);
                    if (d.showSeparations) i.separations(e, t.pairs.list, f);
                    if (d.showCollisions) i.collisions(e, t.pairs.list, f);
                    if (d.showVertexNumbers) i.vertexNumbers(e, g, f);
                    if (d.showMousePosition) i.mousePosition(e, e.mouse, f);
                    i.constraints(x, f);
                    if (d.showBroadphase && t.broadphase.controller === l) i.grid(e, t.broadphase, f);
                    if (d.showDebug) i.debug(e, f);
                    if (d.hasBounds) {
                        i.endViewTransform(e);
                    }
                    a.trigger(e, "afterRender", b);
                };
                i.debug = function(e, t) {
                    var n = t, i = e.engine, o = i.world, s = i.metrics, a = e.options, l = r.allBodies(o), c = "    ";
                    if (i.timing.timestamp - (e.debugTimestamp || 0) >= 500) {
                        var u = "";
                        if (s.timing) {
                            u += "fps: " + Math.round(s.timing.fps) + c;
                        }
                        e.debugString = u;
                        e.debugTimestamp = i.timing.timestamp;
                    }
                    if (e.debugString) {
                        n.font = "12px Arial";
                        if (a.wireframes) {
                            n.fillStyle = "rgba(255,255,255,0.5)";
                        } else {
                            n.fillStyle = "rgba(0,0,0,0.5)";
                        }
                        var f = e.debugString.split("\n");
                        for (var d = 0; d < f.length; d++) {
                            n.fillText(f[d], 50, 50 + d * 18);
                        }
                    }
                };
                i.constraints = function(e, t) {
                    var n = t;
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i];
                        if (!r.render.visible || !r.pointA || !r.pointB) continue;
                        var s = r.bodyA, a = r.bodyB, l, u;
                        if (s) {
                            l = c.add(s.position, r.pointA);
                        } else {
                            l = r.pointA;
                        }
                        if (r.render.type === "pin") {
                            n.beginPath();
                            n.arc(l.x, l.y, 3, 0, 2 * Math.PI);
                            n.closePath();
                        } else {
                            if (a) {
                                u = c.add(a.position, r.pointB);
                            } else {
                                u = r.pointB;
                            }
                            n.beginPath();
                            n.moveTo(l.x, l.y);
                            if (r.render.type === "spring") {
                                var f = c.sub(u, l), d = c.perp(c.normalise(f)), p = Math.ceil(o.clamp(r.length / 5, 12, 20)), v;
                                for (var m = 1; m < p; m += 1) {
                                    v = m % 2 === 0 ? 1 : -1;
                                    n.lineTo(l.x + f.x * (m / p) + d.x * v * 4, l.y + f.y * (m / p) + d.y * v * 4);
                                }
                            }
                            n.lineTo(u.x, u.y);
                        }
                        if (r.render.lineWidth) {
                            n.lineWidth = r.render.lineWidth;
                            n.strokeStyle = r.render.strokeStyle;
                            n.stroke();
                        }
                        if (r.render.anchors) {
                            n.fillStyle = r.render.strokeStyle;
                            n.beginPath();
                            n.arc(l.x, l.y, 3, 0, 2 * Math.PI);
                            n.arc(u.x, u.y, 3, 0, 2 * Math.PI);
                            n.closePath();
                            n.fill();
                        }
                    }
                };
                i.bodyShadows = function(e, t, n) {
                    var i = n, o = e.engine;
                    for (var r = 0; r < t.length; r++) {
                        var s = t[r];
                        if (!s.render.visible) continue;
                        if (s.circleRadius) {
                            i.beginPath();
                            i.arc(s.position.x, s.position.y, s.circleRadius, 0, 2 * Math.PI);
                            i.closePath();
                        } else {
                            i.beginPath();
                            i.moveTo(s.vertices[0].x, s.vertices[0].y);
                            for (var a = 1; a < s.vertices.length; a++) {
                                i.lineTo(s.vertices[a].x, s.vertices[a].y);
                            }
                            i.closePath();
                        }
                        var l = s.position.x - e.options.width * .5, c = s.position.y - e.options.height * .2, u = Math.abs(l) + Math.abs(c);
                        i.shadowColor = "rgba(0,0,0,0.15)";
                        i.shadowOffsetX = .05 * l;
                        i.shadowOffsetY = .05 * c;
                        i.shadowBlur = 1 + 12 * Math.min(1, u / 1e3);
                        i.fill();
                        i.shadowColor = null;
                        i.shadowOffsetX = null;
                        i.shadowOffsetY = null;
                        i.shadowBlur = null;
                    }
                };
                i.bodies = function(e, t, n) {
                    var i = n, o = e.engine, r = e.options, s = r.showInternalEdges || !r.wireframes, a, l, c, u;
                    for (c = 0; c < t.length; c++) {
                        a = t[c];
                        if (!a.render.visible) continue;
                        for (u = a.parts.length > 1 ? 1 : 0; u < a.parts.length; u++) {
                            l = a.parts[u];
                            if (!l.render.visible) continue;
                            if (r.showSleeping && a.isSleeping) {
                                i.globalAlpha = .5 * l.render.opacity;
                            } else if (l.render.opacity !== 1) {
                                i.globalAlpha = l.render.opacity;
                            }
                            if (l.render.sprite && l.render.sprite.texture && !r.wireframes) {
                                var f = l.render.sprite, p = d(e, f.texture);
                                i.translate(l.position.x, l.position.y);
                                i.rotate(l.angle);
                                i.drawImage(p, p.width * -f.xOffset * f.xScale, p.height * -f.yOffset * f.yScale, p.width * f.xScale, p.height * f.yScale);
                                i.rotate(-l.angle);
                                i.translate(-l.position.x, -l.position.y);
                            } else {
                                if (l.circleRadius) {
                                    i.beginPath();
                                    i.arc(l.position.x, l.position.y, l.circleRadius, 0, 2 * Math.PI);
                                } else {
                                    i.beginPath();
                                    i.moveTo(l.vertices[0].x, l.vertices[0].y);
                                    for (var v = 1; v < l.vertices.length; v++) {
                                        if (!l.vertices[v - 1].isInternal || s) {
                                            i.lineTo(l.vertices[v].x, l.vertices[v].y);
                                        } else {
                                            i.moveTo(l.vertices[v].x, l.vertices[v].y);
                                        }
                                        if (l.vertices[v].isInternal && !s) {
                                            i.moveTo(l.vertices[(v + 1) % l.vertices.length].x, l.vertices[(v + 1) % l.vertices.length].y);
                                        }
                                    }
                                    i.lineTo(l.vertices[0].x, l.vertices[0].y);
                                    i.closePath();
                                }
                                if (!r.wireframes) {
                                    i.fillStyle = l.render.fillStyle;
                                    if (l.render.lineWidth) {
                                        i.lineWidth = l.render.lineWidth;
                                        i.strokeStyle = l.render.strokeStyle;
                                        i.stroke();
                                    }
                                    i.fill();
                                } else {
                                    i.lineWidth = 1;
                                    i.strokeStyle = "#bbb";
                                    i.stroke();
                                }
                            }
                            i.globalAlpha = 1;
                        }
                    }
                };
                i.bodyWireframes = function(e, t, n) {
                    var i = n, o = e.options.showInternalEdges, r, s, a, l, c;
                    i.beginPath();
                    for (a = 0; a < t.length; a++) {
                        r = t[a];
                        if (!r.render.visible) continue;
                        for (c = r.parts.length > 1 ? 1 : 0; c < r.parts.length; c++) {
                            s = r.parts[c];
                            i.moveTo(s.vertices[0].x, s.vertices[0].y);
                            for (l = 1; l < s.vertices.length; l++) {
                                if (!s.vertices[l - 1].isInternal || o) {
                                    i.lineTo(s.vertices[l].x, s.vertices[l].y);
                                } else {
                                    i.moveTo(s.vertices[l].x, s.vertices[l].y);
                                }
                                if (s.vertices[l].isInternal && !o) {
                                    i.moveTo(s.vertices[(l + 1) % s.vertices.length].x, s.vertices[(l + 1) % s.vertices.length].y);
                                }
                            }
                            i.lineTo(s.vertices[0].x, s.vertices[0].y);
                        }
                    }
                    i.lineWidth = 1;
                    i.strokeStyle = "#bbb";
                    i.stroke();
                };
                i.bodyConvexHulls = function(e, t, n) {
                    var i = n, o, r, s, a, l;
                    i.beginPath();
                    for (s = 0; s < t.length; s++) {
                        o = t[s];
                        if (!o.render.visible || o.parts.length === 1) continue;
                        i.moveTo(o.vertices[0].x, o.vertices[0].y);
                        for (a = 1; a < o.vertices.length; a++) {
                            i.lineTo(o.vertices[a].x, o.vertices[a].y);
                        }
                        i.lineTo(o.vertices[0].x, o.vertices[0].y);
                    }
                    i.lineWidth = 1;
                    i.strokeStyle = "rgba(255,255,255,0.2)";
                    i.stroke();
                };
                i.vertexNumbers = function(e, t, n) {
                    var i = n, o, r, s;
                    for (o = 0; o < t.length; o++) {
                        var a = t[o].parts;
                        for (s = a.length > 1 ? 1 : 0; s < a.length; s++) {
                            var l = a[s];
                            for (r = 0; r < l.vertices.length; r++) {
                                i.fillStyle = "rgba(255,255,255,0.2)";
                                i.fillText(o + "_" + r, l.position.x + (l.vertices[r].x - l.position.x) * .8, l.position.y + (l.vertices[r].y - l.position.y) * .8);
                            }
                        }
                    }
                };
                i.mousePosition = function(e, t, n) {
                    var i = n;
                    i.fillStyle = "rgba(255,255,255,0.8)";
                    i.fillText(t.position.x + "  " + t.position.y, t.position.x + 5, t.position.y - 5);
                };
                i.bodyBounds = function(e, t, n) {
                    var i = n, o = e.engine, r = e.options;
                    i.beginPath();
                    for (var s = 0; s < t.length; s++) {
                        var a = t[s];
                        if (a.render.visible) {
                            var l = t[s].parts;
                            for (var c = l.length > 1 ? 1 : 0; c < l.length; c++) {
                                var u = l[c];
                                i.rect(u.bounds.min.x, u.bounds.min.y, u.bounds.max.x - u.bounds.min.x, u.bounds.max.y - u.bounds.min.y);
                            }
                        }
                    }
                    if (r.wireframes) {
                        i.strokeStyle = "rgba(255,255,255,0.08)";
                    } else {
                        i.strokeStyle = "rgba(0,0,0,0.1)";
                    }
                    i.lineWidth = 1;
                    i.stroke();
                };
                i.bodyAxes = function(e, t, n) {
                    var i = n, o = e.engine, r = e.options, s, a, l, c;
                    i.beginPath();
                    for (a = 0; a < t.length; a++) {
                        var u = t[a], f = u.parts;
                        if (!u.render.visible) continue;
                        if (r.showAxes) {
                            for (l = f.length > 1 ? 1 : 0; l < f.length; l++) {
                                s = f[l];
                                for (c = 0; c < s.axes.length; c++) {
                                    var d = s.axes[c];
                                    i.moveTo(s.position.x, s.position.y);
                                    i.lineTo(s.position.x + d.x * 20, s.position.y + d.y * 20);
                                }
                            }
                        } else {
                            for (l = f.length > 1 ? 1 : 0; l < f.length; l++) {
                                s = f[l];
                                for (c = 0; c < s.axes.length; c++) {
                                    i.moveTo(s.position.x, s.position.y);
                                    i.lineTo((s.vertices[0].x + s.vertices[s.vertices.length - 1].x) / 2, (s.vertices[0].y + s.vertices[s.vertices.length - 1].y) / 2);
                                }
                            }
                        }
                    }
                    if (r.wireframes) {
                        i.strokeStyle = "indianred";
                        i.lineWidth = 1;
                    } else {
                        i.strokeStyle = "rgba(255, 255, 255, 0.4)";
                        i.globalCompositeOperation = "overlay";
                        i.lineWidth = 2;
                    }
                    i.stroke();
                    i.globalCompositeOperation = "source-over";
                };
                i.bodyPositions = function(e, t, n) {
                    var i = n, o = e.engine, r = e.options, s, a, l, c;
                    i.beginPath();
                    for (l = 0; l < t.length; l++) {
                        s = t[l];
                        if (!s.render.visible) continue;
                        for (c = 0; c < s.parts.length; c++) {
                            a = s.parts[c];
                            i.arc(a.position.x, a.position.y, 3, 0, 2 * Math.PI, false);
                            i.closePath();
                        }
                    }
                    if (r.wireframes) {
                        i.fillStyle = "indianred";
                    } else {
                        i.fillStyle = "rgba(0,0,0,0.5)";
                    }
                    i.fill();
                    i.beginPath();
                    for (l = 0; l < t.length; l++) {
                        s = t[l];
                        if (s.render.visible) {
                            i.arc(s.positionPrev.x, s.positionPrev.y, 2, 0, 2 * Math.PI, false);
                            i.closePath();
                        }
                    }
                    i.fillStyle = "rgba(255,165,0,0.8)";
                    i.fill();
                };
                i.bodyVelocity = function(e, t, n) {
                    var i = n;
                    i.beginPath();
                    for (var o = 0; o < t.length; o++) {
                        var r = t[o];
                        if (!r.render.visible) continue;
                        i.moveTo(r.position.x, r.position.y);
                        i.lineTo(r.position.x + (r.position.x - r.positionPrev.x) * 2, r.position.y + (r.position.y - r.positionPrev.y) * 2);
                    }
                    i.lineWidth = 3;
                    i.strokeStyle = "cornflowerblue";
                    i.stroke();
                };
                i.bodyIds = function(e, t, n) {
                    var i = n, o, r;
                    for (o = 0; o < t.length; o++) {
                        if (!t[o].render.visible) continue;
                        var s = t[o].parts;
                        for (r = s.length > 1 ? 1 : 0; r < s.length; r++) {
                            var a = s[r];
                            i.font = "12px Arial";
                            i.fillStyle = "rgba(255,255,255,0.5)";
                            i.fillText(a.id, a.position.x + 10, a.position.y - 10);
                        }
                    }
                };
                i.collisions = function(e, t, n) {
                    var i = n, o = e.options, r, s, a, l, c, u, f;
                    i.beginPath();
                    for (u = 0; u < t.length; u++) {
                        r = t[u];
                        if (!r.isActive) continue;
                        s = r.collision;
                        for (f = 0; f < r.activeContacts.length; f++) {
                            var d = r.activeContacts[f], p = d.vertex;
                            i.rect(p.x - 1.5, p.y - 1.5, 3.5, 3.5);
                        }
                    }
                    if (o.wireframes) {
                        i.fillStyle = "rgba(255,255,255,0.7)";
                    } else {
                        i.fillStyle = "orange";
                    }
                    i.fill();
                    i.beginPath();
                    for (u = 0; u < t.length; u++) {
                        r = t[u];
                        if (!r.isActive) continue;
                        s = r.collision;
                        if (r.activeContacts.length > 0) {
                            var v = r.activeContacts[0].vertex.x, m = r.activeContacts[0].vertex.y;
                            if (r.activeContacts.length === 2) {
                                v = (r.activeContacts[0].vertex.x + r.activeContacts[1].vertex.x) / 2;
                                m = (r.activeContacts[0].vertex.y + r.activeContacts[1].vertex.y) / 2;
                            }
                            if (s.bodyB === s.supports[0].body || s.bodyA.isStatic === true) {
                                i.moveTo(v - s.normal.x * 8, m - s.normal.y * 8);
                            } else {
                                i.moveTo(v + s.normal.x * 8, m + s.normal.y * 8);
                            }
                            i.lineTo(v, m);
                        }
                    }
                    if (o.wireframes) {
                        i.strokeStyle = "rgba(255,165,0,0.7)";
                    } else {
                        i.strokeStyle = "orange";
                    }
                    i.lineWidth = 1;
                    i.stroke();
                };
                i.separations = function(e, t, n) {
                    var i = n, o = e.options, r, s, a, l, c, u, f;
                    i.beginPath();
                    for (u = 0; u < t.length; u++) {
                        r = t[u];
                        if (!r.isActive) continue;
                        s = r.collision;
                        l = s.bodyA;
                        c = s.bodyB;
                        var d = 1;
                        if (!c.isStatic && !l.isStatic) d = .5;
                        if (c.isStatic) d = 0;
                        i.moveTo(c.position.x, c.position.y);
                        i.lineTo(c.position.x - s.penetration.x * d, c.position.y - s.penetration.y * d);
                        d = 1;
                        if (!c.isStatic && !l.isStatic) d = .5;
                        if (l.isStatic) d = 0;
                        i.moveTo(l.position.x, l.position.y);
                        i.lineTo(l.position.x + s.penetration.x * d, l.position.y + s.penetration.y * d);
                    }
                    if (o.wireframes) {
                        i.strokeStyle = "rgba(255,165,0,0.5)";
                    } else {
                        i.strokeStyle = "orange";
                    }
                    i.stroke();
                };
                i.grid = function(e, t, n) {
                    var i = n, r = e.options;
                    if (r.wireframes) {
                        i.strokeStyle = "rgba(255,180,0,0.1)";
                    } else {
                        i.strokeStyle = "rgba(255,180,0,0.5)";
                    }
                    i.beginPath();
                    var s = o.keys(t.buckets);
                    for (var a = 0; a < s.length; a++) {
                        var l = s[a];
                        if (t.buckets[l].length < 2) continue;
                        var c = l.split(/C|R/);
                        i.rect(.5 + parseInt(c[1], 10) * t.bucketWidth, .5 + parseInt(c[2], 10) * t.bucketHeight, t.bucketWidth, t.bucketHeight);
                    }
                    i.lineWidth = 1;
                    i.stroke();
                };
                i.inspector = function(e, t) {
                    var n = e.engine, i = e.selected, o = e.render, r = o.options, s;
                    if (r.hasBounds) {
                        var a = o.bounds.max.x - o.bounds.min.x, l = o.bounds.max.y - o.bounds.min.y, c = a / o.options.width, u = l / o.options.height;
                        t.scale(1 / c, 1 / u);
                        t.translate(-o.bounds.min.x, -o.bounds.min.y);
                    }
                    for (var f = 0; f < i.length; f++) {
                        var d = i[f].data;
                        t.translate(.5, .5);
                        t.lineWidth = 1;
                        t.strokeStyle = "rgba(255,165,0,0.9)";
                        t.setLineDash([ 1, 2 ]);
                        switch (d.type) {
                          case "body":
                            s = d.bounds;
                            t.beginPath();
                            t.rect(Math.floor(s.min.x - 3), Math.floor(s.min.y - 3), Math.floor(s.max.x - s.min.x + 6), Math.floor(s.max.y - s.min.y + 6));
                            t.closePath();
                            t.stroke();
                            break;

                          case "constraint":
                            var p = d.pointA;
                            if (d.bodyA) p = d.pointB;
                            t.beginPath();
                            t.arc(p.x, p.y, 10, 0, 2 * Math.PI);
                            t.closePath();
                            t.stroke();
                            break;
                        }
                        t.setLineDash([]);
                        t.translate(-.5, -.5);
                    }
                    if (e.selectStart !== null) {
                        t.translate(.5, .5);
                        t.lineWidth = 1;
                        t.strokeStyle = "rgba(255,165,0,0.6)";
                        t.fillStyle = "rgba(255,165,0,0.1)";
                        s = e.selectBounds;
                        t.beginPath();
                        t.rect(Math.floor(s.min.x), Math.floor(s.min.y), Math.floor(s.max.x - s.min.x), Math.floor(s.max.y - s.min.y));
                        t.closePath();
                        t.stroke();
                        t.fill();
                        t.translate(-.5, -.5);
                    }
                    if (r.hasBounds) t.setTransform(1, 0, 0, 1, 0, 0);
                };
                var n = function(e, t) {
                    var n = document.createElement("canvas");
                    n.width = e;
                    n.height = t;
                    n.oncontextmenu = function() {
                        return false;
                    };
                    n.onselectstart = function() {
                        return false;
                    };
                    return n;
                };
                var f = function(e) {
                    var t = e.getContext("2d"), n = window.devicePixelRatio || 1, i = t.webkitBackingStorePixelRatio || t.mozBackingStorePixelRatio || t.msBackingStorePixelRatio || t.oBackingStorePixelRatio || t.backingStorePixelRatio || 1;
                    return n / i;
                };
                var d = function(e, t) {
                    var n = e.textures[t];
                    if (n) return n;
                    n = e.textures[t] = new Image();
                    n.src = t;
                    return n;
                };
                var p = function(e, t) {
                    var n = t;
                    if (/(jpg|gif|png)$/.test(t)) n = "url(" + t + ")";
                    e.canvas.style.background = n;
                    e.canvas.style.backgroundSize = "contain";
                    e.currentBackground = t;
                };
            })();
        }, {
            "../body/Composite": 2,
            "../collision/Grid": 6,
            "../core/Common": 14,
            "../core/Events": 16,
            "../core/Mouse": 19,
            "../geometry/Bounds": 26,
            "../geometry/Vector": 28
        } ],
        32: [ function(e, t, n) {
            var i = {};
            t.exports = i;
            var o = e("../geometry/Bounds");
            var r = e("../body/Composite");
            var s = e("../core/Common");
            var a = e("../core/Events");
            var l = e("../geometry/Vector");
            (function() {
                var e, t;
                if (typeof window !== "undefined") {
                    e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
                        window.setTimeout(function() {
                            e(s.now());
                        }, 1e3 / 60);
                    };
                    t = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame;
                }
                i.create = function(e) {
                    s.warn("RenderPixi.create: Matter.RenderPixi is deprecated (see docs)");
                    var t = {
                        controller: i,
                        engine: null,
                        element: null,
                        frameRequestId: null,
                        canvas: null,
                        renderer: null,
                        container: null,
                        spriteContainer: null,
                        pixiOptions: null,
                        options: {
                            width: 800,
                            height: 600,
                            background: "#fafafa",
                            wireframeBackground: "#222",
                            hasBounds: false,
                            enabled: true,
                            wireframes: true,
                            showSleeping: true,
                            showDebug: false,
                            showBroadphase: false,
                            showBounds: false,
                            showVelocity: false,
                            showCollisions: false,
                            showAxes: false,
                            showPositions: false,
                            showAngleIndicator: false,
                            showIds: false,
                            showShadows: false
                        }
                    };
                    var n = s.extend(t, e), o = !n.options.wireframes && n.options.background === "transparent";
                    n.pixiOptions = n.pixiOptions || {
                        view: n.canvas,
                        transparent: o,
                        antialias: true,
                        backgroundColor: e.background
                    };
                    n.mouse = e.mouse;
                    n.engine = e.engine;
                    n.renderer = n.renderer || new PIXI.WebGLRenderer(n.options.width, n.options.height, n.pixiOptions);
                    n.container = n.container || new PIXI.Container();
                    n.spriteContainer = n.spriteContainer || new PIXI.Container();
                    n.canvas = n.canvas || n.renderer.view;
                    n.bounds = n.bounds || {
                        min: {
                            x: 0,
                            y: 0
                        },
                        max: {
                            x: n.options.width,
                            y: n.options.height
                        }
                    };
                    a.on(n.engine, "beforeUpdate", function() {
                        i.clear(n);
                    });
                    n.textures = {};
                    n.sprites = {};
                    n.primitives = {};
                    n.container.addChild(n.spriteContainer);
                    if (s.isElement(n.element)) {
                        n.element.appendChild(n.canvas);
                    } else {
                        s.warn('No "render.element" passed, "render.canvas" was not inserted into document.');
                    }
                    n.canvas.oncontextmenu = function() {
                        return false;
                    };
                    n.canvas.onselectstart = function() {
                        return false;
                    };
                    return n;
                };
                i.run = function(t) {
                    (function n(o) {
                        t.frameRequestId = e(n);
                        i.world(t);
                    })();
                };
                i.stop = function(e) {
                    t(e.frameRequestId);
                };
                i.clear = function(e) {
                    var t = e.container, n = e.spriteContainer;
                    while (t.children[0]) {
                        t.removeChild(t.children[0]);
                    }
                    while (n.children[0]) {
                        n.removeChild(n.children[0]);
                    }
                    var i = e.sprites["bg-0"];
                    e.textures = {};
                    e.sprites = {};
                    e.primitives = {};
                    e.sprites["bg-0"] = i;
                    if (i) t.addChildAt(i, 0);
                    e.container.addChild(e.spriteContainer);
                    e.currentBackground = null;
                    t.scale.set(1, 1);
                    t.position.set(0, 0);
                };
                i.setBackground = function(e, t) {
                    if (e.currentBackground !== t) {
                        var n = t.indexOf && t.indexOf("#") !== -1, i = e.sprites["bg-0"];
                        if (n) {
                            var o = s.colorToNumber(t);
                            e.renderer.backgroundColor = o;
                            if (i) e.container.removeChild(i);
                        } else {
                            if (!i) {
                                var r = u(e, t);
                                i = e.sprites["bg-0"] = new PIXI.Sprite(r);
                                i.position.x = 0;
                                i.position.y = 0;
                                e.container.addChildAt(i, 0);
                            }
                        }
                        e.currentBackground = t;
                    }
                };
                i.world = function(e) {
                    var t = e.engine, n = t.world, s = e.renderer, a = e.container, c = e.options, u = r.allBodies(n), f = r.allConstraints(n), d = [], p;
                    if (c.wireframes) {
                        i.setBackground(e, c.wireframeBackground);
                    } else {
                        i.setBackground(e, c.background);
                    }
                    var v = e.bounds.max.x - e.bounds.min.x, m = e.bounds.max.y - e.bounds.min.y, y = v / e.options.width, g = m / e.options.height;
                    if (c.hasBounds) {
                        for (p = 0; p < u.length; p++) {
                            var x = u[p];
                            x.render.sprite.visible = o.overlaps(x.bounds, e.bounds);
                        }
                        for (p = 0; p < f.length; p++) {
                            var h = f[p], b = h.bodyA, w = h.bodyB, S = h.pointA, C = h.pointB;
                            if (b) S = l.add(b.position, h.pointA);
                            if (w) C = l.add(w.position, h.pointB);
                            if (!S || !C) continue;
                            if (o.contains(e.bounds, S) || o.contains(e.bounds, C)) d.push(h);
                        }
                        a.scale.set(1 / y, 1 / g);
                        a.position.set(-e.bounds.min.x * (1 / y), -e.bounds.min.y * (1 / g));
                    } else {
                        d = f;
                    }
                    for (p = 0; p < u.length; p++) i.body(e, u[p]);
                    for (p = 0; p < d.length; p++) i.constraint(e, d[p]);
                    s.render(a);
                };
                i.constraint = function(e, t) {
                    var n = e.engine, i = t.bodyA, o = t.bodyB, r = t.pointA, a = t.pointB, l = e.container, c = t.render, u = "c-" + t.id, f = e.primitives[u];
                    if (!f) f = e.primitives[u] = new PIXI.Graphics();
                    if (!c.visible || !t.pointA || !t.pointB) {
                        f.clear();
                        return;
                    }
                    if (s.indexOf(l.children, f) === -1) l.addChild(f);
                    f.clear();
                    f.beginFill(0, 0);
                    f.lineStyle(c.lineWidth, s.colorToNumber(c.strokeStyle), 1);
                    if (i) {
                        f.moveTo(i.position.x + r.x, i.position.y + r.y);
                    } else {
                        f.moveTo(r.x, r.y);
                    }
                    if (o) {
                        f.lineTo(o.position.x + a.x, o.position.y + a.y);
                    } else {
                        f.lineTo(a.x, a.y);
                    }
                    f.endFill();
                };
                i.body = function(e, t) {
                    var i = e.engine, o = t.render;
                    if (!o.visible) return;
                    if (o.sprite && o.sprite.texture) {
                        var r = "b-" + t.id, a = e.sprites[r], l = e.spriteContainer;
                        if (!a) a = e.sprites[r] = n(e, t);
                        if (s.indexOf(l.children, a) === -1) l.addChild(a);
                        a.position.x = t.position.x;
                        a.position.y = t.position.y;
                        a.rotation = t.angle;
                        a.scale.x = o.sprite.xScale || 1;
                        a.scale.y = o.sprite.yScale || 1;
                    } else {
                        var u = "b-" + t.id, f = e.primitives[u], d = e.container;
                        if (!f) {
                            f = e.primitives[u] = c(e, t);
                            f.initialAngle = t.angle;
                        }
                        if (s.indexOf(d.children, f) === -1) d.addChild(f);
                        f.position.x = t.position.x;
                        f.position.y = t.position.y;
                        f.rotation = t.angle - f.initialAngle;
                    }
                };
                var n = function(e, t) {
                    var n = t.render, i = n.sprite.texture, o = u(e, i), r = new PIXI.Sprite(o);
                    r.anchor.x = t.render.sprite.xOffset;
                    r.anchor.y = t.render.sprite.yOffset;
                    return r;
                };
                var c = function(e, t) {
                    var n = t.render, i = e.options, o = new PIXI.Graphics(), r = s.colorToNumber(n.fillStyle), a = s.colorToNumber(n.strokeStyle), l = s.colorToNumber(n.strokeStyle), c = s.colorToNumber("#bbb"), u = s.colorToNumber("#CD5C5C"), f;
                    o.clear();
                    for (var d = t.parts.length > 1 ? 1 : 0; d < t.parts.length; d++) {
                        f = t.parts[d];
                        if (!i.wireframes) {
                            o.beginFill(r, 1);
                            o.lineStyle(n.lineWidth, a, 1);
                        } else {
                            o.beginFill(0, 0);
                            o.lineStyle(1, c, 1);
                        }
                        o.moveTo(f.vertices[0].x - t.position.x, f.vertices[0].y - t.position.y);
                        for (var p = 1; p < f.vertices.length; p++) {
                            o.lineTo(f.vertices[p].x - t.position.x, f.vertices[p].y - t.position.y);
                        }
                        o.lineTo(f.vertices[0].x - t.position.x, f.vertices[0].y - t.position.y);
                        o.endFill();
                        if (i.showAngleIndicator || i.showAxes) {
                            o.beginFill(0, 0);
                            if (i.wireframes) {
                                o.lineStyle(1, u, 1);
                            } else {
                                o.lineStyle(1, l);
                            }
                            o.moveTo(f.position.x - t.position.x, f.position.y - t.position.y);
                            o.lineTo((f.vertices[0].x + f.vertices[f.vertices.length - 1].x) / 2 - t.position.x, (f.vertices[0].y + f.vertices[f.vertices.length - 1].y) / 2 - t.position.y);
                            o.endFill();
                        }
                    }
                    return o;
                };
                var u = function(e, t) {
                    var n = e.textures[t];
                    if (!n) n = e.textures[t] = PIXI.Texture.fromImage(t);
                    return n;
                };
            })();
        }, {
            "../body/Composite": 2,
            "../core/Common": 14,
            "../core/Events": 16,
            "../geometry/Bounds": 26,
            "../geometry/Vector": 28
        } ]
    }, {}, [ 30 ])(30);
});