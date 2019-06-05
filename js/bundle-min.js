var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;

(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    var t, e, i = /(\d|\.)+/g, n = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g, r = {
        aqua: [ 0, 255, 255 ],
        lime: [ 0, 255, 0 ],
        silver: [ 192, 192, 192 ],
        black: [ 0, 0, 0 ],
        maroon: [ 128, 0, 0 ],
        teal: [ 0, 128, 128 ],
        blue: [ 0, 0, 255 ],
        navy: [ 0, 0, 128 ],
        white: [ 255, 255, 255 ],
        fuchsia: [ 255, 0, 255 ],
        olive: [ 128, 128, 0 ],
        yellow: [ 255, 255, 0 ],
        orange: [ 255, 165, 0 ],
        gray: [ 128, 128, 128 ],
        purple: [ 128, 0, 128 ],
        green: [ 0, 128, 0 ],
        red: [ 255, 0, 0 ],
        pink: [ 255, 192, 203 ],
        cyan: [ 0, 255, 255 ],
        transparent: [ 255, 255, 255, 0 ]
    }, s = function(t, e, i) {
        return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 255 * (1 > 6 * t ? e + (i - e) * t * 6 : .5 > t ? i : 2 > 3 * t ? e + (i - e) * (2 / 3 - t) * 6 : e) + .5 | 0;
    }, o = function(t, e) {
        var o, a, l, h, u, c, _, d, f, p, m;
        if (t) if ("number" == typeof t) o = [ t >> 16, t >> 8 & 255, 255 & t ]; else {
            if ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), r[t]) o = r[t]; else if ("#" === t.charAt(0)) 4 === t.length && (a = t.charAt(1), 
            l = t.charAt(2), h = t.charAt(3), t = "#" + a + a + l + l + h + h), t = parseInt(t.substr(1), 16), 
            o = [ t >> 16, t >> 8 & 255, 255 & t ]; else if ("hsl" === t.substr(0, 3)) if (o = m = t.match(i), 
            e) {
                if (-1 !== t.indexOf("=")) return t.match(n);
            } else u = Number(o[0]) % 360 / 360, c = Number(o[1]) / 100, _ = Number(o[2]) / 100, 
            l = .5 >= _ ? _ * (c + 1) : _ + c - _ * c, a = 2 * _ - l, o.length > 3 && (o[3] = Number(o[3])), 
            o[0] = s(u + 1 / 3, a, l), o[1] = s(u, a, l), o[2] = s(u - 1 / 3, a, l); else o = t.match(i) || r.transparent;
            o[0] = Number(o[0]), o[1] = Number(o[1]), o[2] = Number(o[2]), o.length > 3 && (o[3] = Number(o[3]));
        } else o = r.black;
        return e && !m && (a = o[0] / 255, l = o[1] / 255, h = o[2] / 255, d = Math.max(a, l, h), 
        f = Math.min(a, l, h), _ = (d + f) / 2, d === f ? u = c = 0 : (p = d - f, c = _ > .5 ? p / (2 - d - f) : p / (d + f), 
        u = d === a ? (l - h) / p + (h > l ? 6 : 0) : d === l ? (h - a) / p + 2 : (a - l) / p + 4, 
        u *= 60), o[0] = u + .5 | 0, o[1] = 100 * c + .5 | 0, o[2] = 100 * _ + .5 | 0), 
        o;
    }, a = function(t, e) {
        var i, n, r, s = (t + "").match(h) || [], a = 0, l = "";
        if (!s.length) return t;
        for (i = 0; i < s.length; i++) n = s[i], r = t.substr(a, t.indexOf(n, a) - a), a += r.length + n.length, 
        n = o(n, e), 3 === n.length && n.push(1), l += r + (e ? "hsla(" + n[0] + "," + n[1] + "%," + n[2] + "%," + n[3] : "rgba(" + n.join(",")) + ")";
        return l + t.substr(a);
    }, l = (_gsScope.GreenSockGlobals || _gsScope).TweenLite, h = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b", u = _gsScope._gsDefine.plugin({
        propName: "colorProps",
        version: "1.5.3",
        priority: -1,
        API: 2,
        global: !0,
        init: function(t, i, n, r) {
            var s, a, l, h;
            this._target = t, this._proxy = a = "NUMBER" === (i.format + "").toUpperCase() ? {} : 0;
            for (s in i) "format" !== s && (a ? (this._firstNumPT = l = {
                _next: this._firstNumPT,
                t: t,
                p: s,
                f: "function" == typeof t[s]
            }, a[s] = "rgb(" + o(l.f ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : t[s]).join(",") + ")", 
            h = i[s], "function" == typeof h && (h = h(r, t)), this._addTween(a, s, "get", "number" == typeof h ? "rgb(" + o(h, !1).join(",") + ")" : h, s, null, null, e)) : this._addTween(t, s, "get", i[s], s, null, null, e, r));
            return !0;
        },
        set: function(t) {
            var e, i = this._firstNumPT;
            for (this._super.setRatio.call(this, t); i; ) e = o(this._proxy[i.p], !1), e = e[0] << 16 | e[1] << 8 | e[2], 
            i.f ? this._target[i.p](e) : this._target[i.p] = e, i = i._next;
        }
    });
    for (t in r) h += "|" + t + "\\b";
    h = new RegExp(h + ")", "gi"), u.colorStringFilter = e = function(t) {
        var e, i = t[0] + " " + t[1];
        h.lastIndex = 0, h.test(i) && (e = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla("), 
        t[0] = a(t[0], e), t[1] = a(t[1], e));
    }, l.defaultStringFilter || (l.defaultStringFilter = u.colorStringFilter), u.parseColor = o, 
    t = u.prototype, t._firstNumPT = null, t._kill = function(e) {
        for (var i, n = this._firstNumPT; n; ) n.p in e ? (n === t._firstNumPT && (this._firstNumPT = n._next), 
        i && (i._next = n._next)) : i = n, n = n._next;
        return this._super._kill(e);
    };
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), function(t) {
    "use strict";
    var e = function() {
        return (_gsScope.GreenSockGlobals || _gsScope)[t];
    };
    "undefined" != typeof module && module.exports ? (require("../TweenLite.min.js"), 
    module.exports = e()) : "function" == typeof define && define.amd && define([ "TweenLite" ], e);
}("ColorPropsPlugin");

var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;

(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    _gsScope._gsDefine("TweenMax", [ "core.Animation", "core.SimpleTimeline", "TweenLite" ], function(t, e, i) {
        var n = function(t) {
            var e, i = [], n = t.length;
            for (e = 0; e !== n; i.push(t[e++])) ;
            return i;
        }, r = function(t, e, i) {
            var n, r, s = t.cycle;
            for (n in s) r = s[n], t[n] = "function" == typeof r ? r(i, e[i]) : r[i % r.length];
            delete t.cycle;
        }, s = function(t, e, n) {
            i.call(this, t, e, n), this._cycle = 0, this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase, 
            this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, 
            this._repeat && this._uncache(!0), this.render = s.prototype.render;
        }, o = 1e-10, a = i._internals, l = a.isSelector, h = a.isArray, u = s.prototype = i.to({}, .1, {}), c = [];
        s.version = "2.0.2", u.constructor = s, u.kill()._gc = !1, s.killTweensOf = s.killDelayedCallsTo = i.killTweensOf, 
        s.getTweensOf = i.getTweensOf, s.lagSmoothing = i.lagSmoothing, s.ticker = i.ticker, 
        s.render = i.render, u.invalidate = function() {
            return this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase, this._repeat = this.vars.repeat || 0, 
            this._repeatDelay = this.vars.repeatDelay || 0, this._yoyoEase = null, this._uncache(!0), 
            i.prototype.invalidate.call(this);
        }, u.updateTo = function(t, e) {
            var n, r = this.ratio, s = this.vars.immediateRender || t.immediateRender;
            e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, 
            this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
            for (n in t) this.vars[n] = t[n];
            if (this._initted || s) if (e) this._initted = !1, s && this.render(0, !0, !0); else if (this._gc && this._enabled(!0, !1), 
            this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), 
            this._time / this._duration > .998) {
                var o = this._totalTime;
                this.render(0, !0, !1), this._initted = !1, this.render(o, !0, !1);
            } else if (this._initted = !1, this._init(), this._time > 0 || s) for (var a, l = 1 / (1 - r), h = this._firstPT; h; ) a = h.s + h.c, 
            h.c *= l, h.s = a - h.c, h = h._next;
            return this;
        }, u.render = function(t, e, n) {
            this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
            var r, s, l, h, u, c, _, d, f, p = this._dirty ? this.totalDuration() : this._totalDuration, m = this._time, g = this._totalTime, v = this._cycle, y = this._duration, b = this._rawPrevTime;
            if (t >= p - 1e-7 && t >= 0 ? (this._totalTime = p, this._cycle = this._repeat, 
            this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = y, 
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (r = !0, 
            s = "onComplete", n = n || this._timeline.autoRemoveChildren), 0 === y && (this._initted || !this.vars.lazy || n) && (this._startTime === this._timeline._duration && (t = 0), 
            (0 > b || 0 >= t && t >= -1e-7 || b === o && "isPause" !== this.data) && b !== t && (n = !0, 
            b > o && (s = "onReverseComplete")), this._rawPrevTime = d = !e || t || b === t ? t : o)) : 1e-7 > t ? (this._totalTime = this._time = this._cycle = 0, 
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== g || 0 === y && b > 0) && (s = "onReverseComplete", 
            r = this._reversed), 0 > t && (this._active = !1, 0 === y && (this._initted || !this.vars.lazy || n) && (b >= 0 && (n = !0), 
            this._rawPrevTime = d = !e || t || b === t ? t : o)), this._initted || (n = !0)) : (this._totalTime = this._time = t, 
            0 !== this._repeat && (h = y + this._repeatDelay, this._cycle = this._totalTime / h >> 0, 
            0 !== this._cycle && this._cycle === this._totalTime / h && t >= g && this._cycle--, 
            this._time = this._totalTime - this._cycle * h, this._yoyo && 0 !== (1 & this._cycle) && (this._time = y - this._time, 
            f = this._yoyoEase || this.vars.yoyoEase, f && (this._yoyoEase || (f !== !0 || this._initted ? this._yoyoEase = f = f === !0 ? this._ease : f instanceof Ease ? f : Ease.map[f] : (f = this.vars.ease, 
            this._yoyoEase = f = f ? f instanceof Ease ? f : "function" == typeof f ? new Ease(f, this.vars.easeParams) : Ease.map[f] || i.defaultEase : i.defaultEase)), 
            this.ratio = f ? 1 - f.getRatio((y - this._time) / y) : 0)), this._time > y ? this._time = y : this._time < 0 && (this._time = 0)), 
            this._easeType && !f ? (u = this._time / y, c = this._easeType, _ = this._easePower, 
            (1 === c || 3 === c && u >= .5) && (u = 1 - u), 3 === c && (u *= 2), 1 === _ ? u *= u : 2 === _ ? u *= u * u : 3 === _ ? u *= u * u * u : 4 === _ && (u *= u * u * u * u), 
            1 === c ? this.ratio = 1 - u : 2 === c ? this.ratio = u : this._time / y < .5 ? this.ratio = u / 2 : this.ratio = 1 - u / 2) : f || (this.ratio = this._ease.getRatio(this._time / y))), 
            m === this._time && !n && v === this._cycle) return void (g !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
            if (!this._initted) {
                if (this._init(), !this._initted || this._gc) return;
                if (!n && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = m, 
                this._totalTime = g, this._rawPrevTime = b, this._cycle = v, a.lazyTweens.push(this), 
                void (this._lazy = [ t, e ]);
                !this._time || r || f ? r && this._ease._calcEnd && !f && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1)) : this.ratio = this._ease.getRatio(this._time / y);
            }
            for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== m && t >= 0 && (this._active = !0), 
            0 === g && (2 === this._initted && t > 0 && this._init(), this._startAt && (t >= 0 ? this._startAt.render(t, !0, n) : s || (s = "_dummyGS")), 
            this.vars.onStart && (0 !== this._totalTime || 0 === y) && (e || this._callback("onStart"))), 
            l = this._firstPT; l; ) l.f ? l.t[l.p](l.c * this.ratio + l.s) : l.t[l.p] = l.c * this.ratio + l.s, 
            l = l._next;
            this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, !0, n), 
            e || (this._totalTime !== g || s) && this._callback("onUpdate")), this._cycle !== v && (e || this._gc || this.vars.onRepeat && this._callback("onRepeat")), 
            s && (!this._gc || n) && (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, !0, n), 
            r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), 
            !e && this.vars[s] && this._callback(s), 0 === y && this._rawPrevTime === o && d !== o && (this._rawPrevTime = 0));
        }, s.to = function(t, e, i) {
            return new s(t, e, i);
        }, s.from = function(t, e, i) {
            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new s(t, e, i);
        }, s.fromTo = function(t, e, i, n) {
            return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, 
            new s(t, e, n);
        }, s.staggerTo = s.allTo = function(t, e, o, a, u, _, d) {
            a = a || 0;
            var f, p, m, g, v = 0, y = [], b = function() {
                o.onComplete && o.onComplete.apply(o.onCompleteScope || this, arguments), u.apply(d || o.callbackScope || this, _ || c);
            }, x = o.cycle, w = o.startAt && o.startAt.cycle;
            for (h(t) || ("string" == typeof t && (t = i.selector(t) || t), l(t) && (t = n(t))), 
            t = t || [], 0 > a && (t = n(t), t.reverse(), a *= -1), f = t.length - 1, m = 0; f >= m; m++) {
                p = {};
                for (g in o) p[g] = o[g];
                if (x && (r(p, t, m), null != p.duration && (e = p.duration, delete p.duration)), 
                w) {
                    w = p.startAt = {};
                    for (g in o.startAt) w[g] = o.startAt[g];
                    r(p.startAt, t, m);
                }
                p.delay = v + (p.delay || 0), m === f && u && (p.onComplete = b), y[m] = new s(t[m], e, p), 
                v += a;
            }
            return y;
        }, s.staggerFrom = s.allFrom = function(t, e, i, n, r, o, a) {
            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, s.staggerTo(t, e, i, n, r, o, a);
        }, s.staggerFromTo = s.allFromTo = function(t, e, i, n, r, o, a, l) {
            return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, 
            s.staggerTo(t, e, n, r, o, a, l);
        }, s.delayedCall = function(t, e, i, n, r) {
            return new s(e, 0, {
                delay: t,
                onComplete: e,
                onCompleteParams: i,
                callbackScope: n,
                onReverseComplete: e,
                onReverseCompleteParams: i,
                immediateRender: !1,
                useFrames: r,
                overwrite: 0
            });
        }, s.set = function(t, e) {
            return new s(t, 0, e);
        }, s.isTweening = function(t) {
            return i.getTweensOf(t, !0).length > 0;
        };
        var _ = function(t, e) {
            for (var n = [], r = 0, s = t._first; s; ) s instanceof i ? n[r++] = s : (e && (n[r++] = s), 
            n = n.concat(_(s, e)), r = n.length), s = s._next;
            return n;
        }, d = s.getAllTweens = function(e) {
            return _(t._rootTimeline, e).concat(_(t._rootFramesTimeline, e));
        };
        s.killAll = function(t, i, n, r) {
            null == i && (i = !0), null == n && (n = !0);
            var s, o, a, l = d(0 != r), h = l.length, u = i && n && r;
            for (a = 0; h > a; a++) o = l[a], (u || o instanceof e || (s = o.target === o.vars.onComplete) && n || i && !s) && (t ? o.totalTime(o._reversed ? 0 : o.totalDuration()) : o._enabled(!1, !1));
        }, s.killChildTweensOf = function(t, e) {
            if (null != t) {
                var r, o, u, c, _, d = a.tweenLookup;
                if ("string" == typeof t && (t = i.selector(t) || t), l(t) && (t = n(t)), h(t)) for (c = t.length; --c > -1; ) s.killChildTweensOf(t[c], e); else {
                    r = [];
                    for (u in d) for (o = d[u].target.parentNode; o; ) o === t && (r = r.concat(d[u].tweens)), 
                    o = o.parentNode;
                    for (_ = r.length, c = 0; _ > c; c++) e && r[c].totalTime(r[c].totalDuration()), 
                    r[c]._enabled(!1, !1);
                }
            }
        };
        var f = function(t, i, n, r) {
            i = i !== !1, n = n !== !1, r = r !== !1;
            for (var s, o, a = d(r), l = i && n && r, h = a.length; --h > -1; ) o = a[h], (l || o instanceof e || (s = o.target === o.vars.onComplete) && n || i && !s) && o.paused(t);
        };
        return s.pauseAll = function(t, e, i) {
            f(!0, t, e, i);
        }, s.resumeAll = function(t, e, i) {
            f(!1, t, e, i);
        }, s.globalTimeScale = function(e) {
            var n = t._rootTimeline, r = i.ticker.time;
            return arguments.length ? (e = e || o, n._startTime = r - (r - n._startTime) * n._timeScale / e, 
            n = t._rootFramesTimeline, r = i.ticker.frame, n._startTime = r - (r - n._startTime) * n._timeScale / e, 
            n._timeScale = t._rootTimeline._timeScale = e, e) : n._timeScale;
        }, u.progress = function(t, e) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration();
        }, u.totalProgress = function(t, e) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration();
        }, u.time = function(t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), 
            this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), 
            this.totalTime(t, e)) : this._time;
        }, u.duration = function(e) {
            return arguments.length ? t.prototype.duration.call(this, e) : this._duration;
        }, u.totalDuration = function(t) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, 
            this._dirty = !1), this._totalDuration);
        }, u.repeat = function(t) {
            return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat;
        }, u.repeatDelay = function(t) {
            return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay;
        }, u.yoyo = function(t) {
            return arguments.length ? (this._yoyo = t, this) : this._yoyo;
        }, s;
    }, !0), _gsScope._gsDefine("TimelineLite", [ "core.Animation", "core.SimpleTimeline", "TweenLite" ], function(t, e, i) {
        var n = function(t) {
            e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, 
            this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, 
            this._onUpdate = this.vars.onUpdate;
            var i, n, r = this.vars;
            for (n in r) i = r[n], l(i) && -1 !== i.join("").indexOf("{self}") && (r[n] = this._swapSelfInParams(i));
            l(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger);
        }, r = 1e-10, s = i._internals, o = n._internals = {}, a = s.isSelector, l = s.isArray, h = s.lazyTweens, u = s.lazyRender, c = _gsScope._gsDefine.globals, _ = function(t) {
            var e, i = {};
            for (e in t) i[e] = t[e];
            return i;
        }, d = function(t, e, i) {
            var n, r, s = t.cycle;
            for (n in s) r = s[n], t[n] = "function" == typeof r ? r(i, e[i]) : r[i % r.length];
            delete t.cycle;
        }, f = o.pauseCallback = function() {}, p = function(t) {
            var e, i = [], n = t.length;
            for (e = 0; e !== n; i.push(t[e++])) ;
            return i;
        }, m = n.prototype = new e();
        return n.version = "2.0.2", m.constructor = n, m.kill()._gc = m._forcingPlayhead = m._hasPause = !1, 
        m.to = function(t, e, n, r) {
            var s = n.repeat && c.TweenMax || i;
            return e ? this.add(new s(t, e, n), r) : this.set(t, n, r);
        }, m.from = function(t, e, n, r) {
            return this.add((n.repeat && c.TweenMax || i).from(t, e, n), r);
        }, m.fromTo = function(t, e, n, r, s) {
            var o = r.repeat && c.TweenMax || i;
            return e ? this.add(o.fromTo(t, e, n, r), s) : this.set(t, r, s);
        }, m.staggerTo = function(t, e, r, s, o, l, h, u) {
            var c, f, m = new n({
                onComplete: l,
                onCompleteParams: h,
                callbackScope: u,
                smoothChildTiming: this.smoothChildTiming
            }), g = r.cycle;
            for ("string" == typeof t && (t = i.selector(t) || t), t = t || [], a(t) && (t = p(t)), 
            s = s || 0, 0 > s && (t = p(t), t.reverse(), s *= -1), f = 0; f < t.length; f++) c = _(r), 
            c.startAt && (c.startAt = _(c.startAt), c.startAt.cycle && d(c.startAt, t, f)), 
            g && (d(c, t, f), null != c.duration && (e = c.duration, delete c.duration)), m.to(t[f], e, c, f * s);
            return this.add(m, o);
        }, m.staggerFrom = function(t, e, i, n, r, s, o, a) {
            return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, n, r, s, o, a);
        }, m.staggerFromTo = function(t, e, i, n, r, s, o, a, l) {
            return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, 
            this.staggerTo(t, e, n, r, s, o, a, l);
        }, m.call = function(t, e, n, r) {
            return this.add(i.delayedCall(0, t, e, n), r);
        }, m.set = function(t, e, n) {
            return n = this._parseTimeOrLabel(n, 0, !0), null == e.immediateRender && (e.immediateRender = n === this._time && !this._paused), 
            this.add(new i(t, 0, e), n);
        }, n.exportRoot = function(t, e) {
            t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
            var r, s, o, a, l = new n(t), h = l._timeline;
            for (null == e && (e = !0), h._remove(l, !0), l._startTime = 0, l._rawPrevTime = l._time = l._totalTime = h._time, 
            o = h._first; o; ) a = o._next, e && o instanceof i && o.target === o.vars.onComplete || (s = o._startTime - o._delay, 
            0 > s && (r = 1), l.add(o, s)), o = a;
            return h.add(l, 0), r && l.totalDuration(), l;
        }, m.add = function(r, s, o, a) {
            var h, u, c, _, d, f;
            if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, r)), !(r instanceof t)) {
                if (r instanceof Array || r && r.push && l(r)) {
                    for (o = o || "normal", a = a || 0, h = s, u = r.length, c = 0; u > c; c++) l(_ = r[c]) && (_ = new n({
                        tweens: _
                    })), this.add(_, h), "string" != typeof _ && "function" != typeof _ && ("sequence" === o ? h = _._startTime + _.totalDuration() / _._timeScale : "start" === o && (_._startTime -= _.delay())), 
                    h += a;
                    return this._uncache(!0);
                }
                if ("string" == typeof r) return this.addLabel(r, s);
                if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                r = i.delayedCall(0, r);
            }
            if (e.prototype.add.call(this, r, s), r._time && (h = Math.max(0, Math.min(r.totalDuration(), (this.rawTime() - r._startTime) * r._timeScale)), 
            Math.abs(h - r._totalTime) > 1e-5 && r.render(h, !1, !1)), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration()) for (d = this, 
            f = d.rawTime() > r._startTime; d._timeline; ) f && d._timeline.smoothChildTiming ? d.totalTime(d._totalTime, !0) : d._gc && d._enabled(!0, !1), 
            d = d._timeline;
            return this;
        }, m.remove = function(e) {
            if (e instanceof t) {
                this._remove(e, !1);
                var i = e._timeline = e.vars.useFrames ? t._rootFramesTimeline : t._rootTimeline;
                return e._startTime = (e._paused ? e._pauseTime : i._time) - (e._reversed ? e.totalDuration() - e._totalTime : e._totalTime) / e._timeScale, 
                this;
            }
            if (e instanceof Array || e && e.push && l(e)) {
                for (var n = e.length; --n > -1; ) this.remove(e[n]);
                return this;
            }
            return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e);
        }, m._remove = function(t, i) {
            e.prototype._remove.call(this, t, i);
            var n = this._last;
            return n ? this._time > this.duration() && (this._time = this._duration, this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, 
            this;
        }, m.append = function(t, e) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t));
        }, m.insert = m.insertMultiple = function(t, e, i, n) {
            return this.add(t, e || 0, i, n);
        }, m.appendMultiple = function(t, e, i, n) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, n);
        }, m.addLabel = function(t, e) {
            return this._labels[t] = this._parseTimeOrLabel(e), this;
        }, m.addPause = function(t, e, n, r) {
            var s = i.delayedCall(0, f, n, r || this);
            return s.vars.onComplete = s.vars.onReverseComplete = e, s.data = "isPause", this._hasPause = !0, 
            this.add(s, t);
        }, m.removeLabel = function(t) {
            return delete this._labels[t], this;
        }, m.getLabelTime = function(t) {
            return null != this._labels[t] ? this._labels[t] : -1;
        }, m._parseTimeOrLabel = function(e, i, n, r) {
            var s, o;
            if (r instanceof t && r.timeline === this) this.remove(r); else if (r && (r instanceof Array || r.push && l(r))) for (o = r.length; --o > -1; ) r[o] instanceof t && r[o].timeline === this && this.remove(r[o]);
            if (s = "number" != typeof e || i ? this.duration() > 99999999999 ? this.recent().endTime(!1) : this._duration : 0, 
            "string" == typeof i) return this._parseTimeOrLabel(i, n && "number" == typeof e && null == this._labels[i] ? e - s : 0, n);
            if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = s); else {
                if (o = e.indexOf("="), -1 === o) return null == this._labels[e] ? n ? this._labels[e] = s + i : i : this._labels[e] + i;
                i = parseInt(e.charAt(o - 1) + "1", 10) * Number(e.substr(o + 1)), e = o > 1 ? this._parseTimeOrLabel(e.substr(0, o - 1), 0, n) : s;
            }
            return Number(e) + i;
        }, m.seek = function(t, e) {
            return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1);
        }, m.stop = function() {
            return this.paused(!0);
        }, m.gotoAndPlay = function(t, e) {
            return this.play(t, e);
        }, m.gotoAndStop = function(t, e) {
            return this.pause(t, e);
        }, m.render = function(t, e, i) {
            this._gc && this._enabled(!0, !1);
            var n, s, o, a, l, c, _, d = this._time, f = this._dirty ? this.totalDuration() : this._totalDuration, p = this._startTime, m = this._timeScale, g = this._paused;
            if (d !== this._time && (t += this._time - d), t >= f - 1e-7 && t >= 0) this._totalTime = this._time = f, 
            this._reversed || this._hasPausedChild() || (s = !0, a = "onComplete", l = !!this._timeline.autoRemoveChildren, 
            0 === this._duration && (0 >= t && t >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (l = !0, 
            this._rawPrevTime > r && (a = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, 
            t = f + 1e-4; else if (1e-7 > t) if (this._totalTime = this._time = 0, (0 !== d || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (a = "onReverseComplete", 
            s = this._reversed), 0 > t) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (l = s = !0, 
            a = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0), this._rawPrevTime = t; else {
                if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, 
                0 === t && s) for (n = this._first; n && 0 === n._startTime; ) n._duration || (s = !1), 
                n = n._next;
                t = 0, this._initted || (l = !0);
            } else {
                if (this._hasPause && !this._forcingPlayhead && !e) {
                    if (t >= d) for (n = this._first; n && n._startTime <= t && !c; ) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (c = n), 
                    n = n._next; else for (n = this._last; n && n._startTime >= t && !c; ) n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (c = n), 
                    n = n._prev;
                    c && (this._time = t = c._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay));
                }
                this._totalTime = this._time = this._rawPrevTime = t;
            }
            if (this._time !== d && this._first || i || l || c) {
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== d && t > 0 && (this._active = !0), 
                0 === d && this.vars.onStart && (0 === this._time && this._duration || e || this._callback("onStart")), 
                _ = this._time, _ >= d) for (n = this._first; n && (o = n._next, _ === this._time && (!this._paused || g)); ) (n._active || n._startTime <= _ && !n._paused && !n._gc) && (c === n && this.pause(), 
                n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), 
                n = o; else for (n = this._last; n && (o = n._prev, _ === this._time && (!this._paused || g)); ) {
                    if (n._active || n._startTime <= d && !n._paused && !n._gc) {
                        if (c === n) {
                            for (c = n._prev; c && c.endTime() > this._time; ) c.render(c._reversed ? c.totalDuration() - (t - c._startTime) * c._timeScale : (t - c._startTime) * c._timeScale, e, i), 
                            c = c._prev;
                            c = null, this.pause();
                        }
                        n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i);
                    }
                    n = o;
                }
                this._onUpdate && (e || (h.length && u(), this._callback("onUpdate"))), a && (this._gc || (p === this._startTime || m !== this._timeScale) && (0 === this._time || f >= this.totalDuration()) && (s && (h.length && u(), 
                this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), 
                !e && this.vars[a] && this._callback(a)));
            }
        }, m._hasPausedChild = function() {
            for (var t = this._first; t; ) {
                if (t._paused || t instanceof n && t._hasPausedChild()) return !0;
                t = t._next;
            }
            return !1;
        }, m.getChildren = function(t, e, n, r) {
            r = r || -9999999999;
            for (var s = [], o = this._first, a = 0; o; ) o._startTime < r || (o instanceof i ? e !== !1 && (s[a++] = o) : (n !== !1 && (s[a++] = o), 
            t !== !1 && (s = s.concat(o.getChildren(!0, e, n)), a = s.length))), o = o._next;
            return s;
        }, m.getTweensOf = function(t, e) {
            var n, r, s = this._gc, o = [], a = 0;
            for (s && this._enabled(!0, !0), n = i.getTweensOf(t), r = n.length; --r > -1; ) (n[r].timeline === this || e && this._contains(n[r])) && (o[a++] = n[r]);
            return s && this._enabled(!1, !0), o;
        }, m.recent = function() {
            return this._recent;
        }, m._contains = function(t) {
            for (var e = t.timeline; e; ) {
                if (e === this) return !0;
                e = e.timeline;
            }
            return !1;
        }, m.shiftChildren = function(t, e, i) {
            i = i || 0;
            for (var n, r = this._first, s = this._labels; r; ) r._startTime >= i && (r._startTime += t), 
            r = r._next;
            if (e) for (n in s) s[n] >= i && (s[n] += t);
            return this._uncache(!0);
        }, m._kill = function(t, e) {
            if (!t && !e) return this._enabled(!1, !1);
            for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), n = i.length, r = !1; --n > -1; ) i[n]._kill(t, e) && (r = !0);
            return r;
        }, m.clear = function(t) {
            var e = this.getChildren(!1, !0, !0), i = e.length;
            for (this._time = this._totalTime = 0; --i > -1; ) e[i]._enabled(!1, !1);
            return t !== !1 && (this._labels = {}), this._uncache(!0);
        }, m.invalidate = function() {
            for (var e = this._first; e; ) e.invalidate(), e = e._next;
            return t.prototype.invalidate.call(this);
        }, m._enabled = function(t, i) {
            if (t === this._gc) for (var n = this._first; n; ) n._enabled(t, !0), n = n._next;
            return e.prototype._enabled.call(this, t, i);
        }, m.totalTime = function(e, i, n) {
            this._forcingPlayhead = !0;
            var r = t.prototype.totalTime.apply(this, arguments);
            return this._forcingPlayhead = !1, r;
        }, m.duration = function(t) {
            return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), 
            this) : (this._dirty && this.totalDuration(), this._duration);
        }, m.totalDuration = function(t) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var e, i, n = 0, r = this._last, s = 999999999999; r; ) e = r._prev, r._dirty && r.totalDuration(), 
                    r._startTime > s && this._sortChildren && !r._paused && !this._calculatingDuration ? (this._calculatingDuration = 1, 
                    this.add(r, r._startTime - r._delay), this._calculatingDuration = 0) : s = r._startTime, 
                    r._startTime < 0 && !r._paused && (n -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale, 
                    this._time -= r._startTime, this._totalTime -= r._startTime, this._rawPrevTime -= r._startTime), 
                    this.shiftChildren(-r._startTime, !1, -9999999999), s = 0), i = r._startTime + r._totalDuration / r._timeScale, 
                    i > n && (n = i), r = e;
                    this._duration = this._totalDuration = n, this._dirty = !1;
                }
                return this._totalDuration;
            }
            return t && this.totalDuration() ? this.timeScale(this._totalDuration / t) : this;
        }, m.paused = function(e) {
            if (!e) for (var i = this._first, n = this._time; i; ) i._startTime === n && "isPause" === i.data && (i._rawPrevTime = 0), 
            i = i._next;
            return t.prototype.paused.apply(this, arguments);
        }, m.usesFrames = function() {
            for (var e = this._timeline; e._timeline; ) e = e._timeline;
            return e === t._rootFramesTimeline;
        }, m.rawTime = function(t) {
            return t && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(t) - this._startTime) * this._timeScale;
        }, n;
    }, !0), _gsScope._gsDefine("TimelineMax", [ "TimelineLite", "TweenLite", "easing.Ease" ], function(t, e, i) {
        var n = function(e) {
            t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, 
            this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0;
        }, r = 1e-10, s = e._internals, o = s.lazyTweens, a = s.lazyRender, l = _gsScope._gsDefine.globals, h = new i(null, null, 1, 0), u = n.prototype = new t();
        return u.constructor = n, u.kill()._gc = !1, n.version = "2.0.2", u.invalidate = function() {
            return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, 
            this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this);
        }, u.addCallback = function(t, i, n, r) {
            return this.add(e.delayedCall(0, t, n, r), i);
        }, u.removeCallback = function(t, e) {
            if (t) if (null == e) this._kill(null, t); else for (var i = this.getTweensOf(t, !1), n = i.length, r = this._parseTimeOrLabel(e); --n > -1; ) i[n]._startTime === r && i[n]._enabled(!1, !1);
            return this;
        }, u.removePause = function(e) {
            return this.removeCallback(t._internals.pauseCallback, e);
        }, u.tweenTo = function(t, i) {
            i = i || {};
            var n, r, s, o = {
                ease: h,
                useFrames: this.usesFrames(),
                immediateRender: !1,
                lazy: !1
            }, a = i.repeat && l.TweenMax || e;
            for (r in i) o[r] = i[r];
            return o.time = this._parseTimeOrLabel(t), n = Math.abs(Number(o.time) - this._time) / this._timeScale || .001, 
            s = new a(this, n, o), o.onStart = function() {
                s.target.paused(!0), s.vars.time === s.target.time() || n !== s.duration() || s.isFromTo || s.duration(Math.abs(s.vars.time - s.target.time()) / s.target._timeScale).render(s.time(), !0, !0), 
                i.onStart && i.onStart.apply(i.onStartScope || i.callbackScope || s, i.onStartParams || []);
            }, s;
        }, u.tweenFromTo = function(t, e, i) {
            i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = {
                onComplete: this.seek,
                onCompleteParams: [ t ],
                callbackScope: this
            }, i.immediateRender = i.immediateRender !== !1;
            var n = this.tweenTo(e, i);
            return n.isFromTo = 1, n.duration(Math.abs(n.vars.time - t) / this._timeScale || .001);
        }, u.render = function(t, e, i) {
            this._gc && this._enabled(!0, !1);
            var n, s, l, h, u, c, _, d, f = this._time, p = this._dirty ? this.totalDuration() : this._totalDuration, m = this._duration, g = this._totalTime, v = this._startTime, y = this._timeScale, b = this._rawPrevTime, x = this._paused, w = this._cycle;
            if (f !== this._time && (t += this._time - f), t >= p - 1e-7 && t >= 0) this._locked || (this._totalTime = p, 
            this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (s = !0, 
            h = "onComplete", u = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 >= t && t >= -1e-7 || 0 > b || b === r) && b !== t && this._first && (u = !0, 
            b > r && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, 
            this._yoyo && 0 !== (1 & this._cycle) ? this._time = t = 0 : (this._time = m, t = m + 1e-4); else if (1e-7 > t) if (this._locked || (this._totalTime = this._cycle = 0), 
            this._time = 0, (0 !== f || 0 === m && b !== r && (b > 0 || 0 > t && b >= 0) && !this._locked) && (h = "onReverseComplete", 
            s = this._reversed), 0 > t) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (u = s = !0, 
            h = "onReverseComplete") : b >= 0 && this._first && (u = !0), this._rawPrevTime = t; else {
                if (this._rawPrevTime = m || !e || t || this._rawPrevTime === t ? t : r, 0 === t && s) for (n = this._first; n && 0 === n._startTime; ) n._duration || (s = !1), 
                n = n._next;
                t = 0, this._initted || (u = !0);
            } else if (0 === m && 0 > b && (u = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 
            0 !== this._repeat && (c = m + this._repeatDelay, this._cycle = this._totalTime / c >> 0, 
            0 !== this._cycle && this._cycle === this._totalTime / c && t >= g && this._cycle--, 
            this._time = this._totalTime - this._cycle * c, this._yoyo && 0 !== (1 & this._cycle) && (this._time = m - this._time), 
            this._time > m ? (this._time = m, t = m + 1e-4) : this._time < 0 ? this._time = t = 0 : t = this._time)), 
            this._hasPause && !this._forcingPlayhead && !e) {
                if (t = this._time, t >= f || this._repeat && w !== this._cycle) for (n = this._first; n && n._startTime <= t && !_; ) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (_ = n), 
                n = n._next; else for (n = this._last; n && n._startTime >= t && !_; ) n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (_ = n), 
                n = n._prev;
                _ && _._startTime < m && (this._time = t = _._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay));
            }
            if (this._cycle !== w && !this._locked) {
                var T = this._yoyo && 0 !== (1 & w), k = T === (this._yoyo && 0 !== (1 & this._cycle)), S = this._totalTime, P = this._cycle, C = this._rawPrevTime, A = this._time;
                if (this._totalTime = w * m, this._cycle < w ? T = !T : this._totalTime += m, this._time = f, 
                this._rawPrevTime = 0 === m ? b - 1e-4 : b, this._cycle = w, this._locked = !0, 
                f = T ? 0 : m, this.render(f, e, 0 === m), e || this._gc || this.vars.onRepeat && (this._cycle = P, 
                this._locked = !1, this._callback("onRepeat")), f !== this._time) return;
                if (k && (this._cycle = w, this._locked = !0, f = T ? m + 1e-4 : -1e-4, this.render(f, !0, !1)), 
                this._locked = !1, this._paused && !x) return;
                this._time = A, this._totalTime = S, this._cycle = P, this._rawPrevTime = C;
            }
            if (!(this._time !== f && this._first || i || u || _)) return void (g !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate")));
            if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== g && t > 0 && (this._active = !0), 
            0 === g && this.vars.onStart && (0 === this._totalTime && this._totalDuration || e || this._callback("onStart")), 
            d = this._time, d >= f) for (n = this._first; n && (l = n._next, d === this._time && (!this._paused || x)); ) (n._active || n._startTime <= this._time && !n._paused && !n._gc) && (_ === n && this.pause(), 
            n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), 
            n = l; else for (n = this._last; n && (l = n._prev, d === this._time && (!this._paused || x)); ) {
                if (n._active || n._startTime <= f && !n._paused && !n._gc) {
                    if (_ === n) {
                        for (_ = n._prev; _ && _.endTime() > this._time; ) _.render(_._reversed ? _.totalDuration() - (t - _._startTime) * _._timeScale : (t - _._startTime) * _._timeScale, e, i), 
                        _ = _._prev;
                        _ = null, this.pause();
                    }
                    n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i);
                }
                n = l;
            }
            this._onUpdate && (e || (o.length && a(), this._callback("onUpdate"))), h && (this._locked || this._gc || (v === this._startTime || y !== this._timeScale) && (0 === this._time || p >= this.totalDuration()) && (s && (o.length && a(), 
            this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), 
            !e && this.vars[h] && this._callback(h)));
        }, u.getActive = function(t, e, i) {
            null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
            var n, r, s = [], o = this.getChildren(t, e, i), a = 0, l = o.length;
            for (n = 0; l > n; n++) r = o[n], r.isActive() && (s[a++] = r);
            return s;
        }, u.getLabelAfter = function(t) {
            t || 0 !== t && (t = this._time);
            var e, i = this.getLabelsArray(), n = i.length;
            for (e = 0; n > e; e++) if (i[e].time > t) return i[e].name;
            return null;
        }, u.getLabelBefore = function(t) {
            null == t && (t = this._time);
            for (var e = this.getLabelsArray(), i = e.length; --i > -1; ) if (e[i].time < t) return e[i].name;
            return null;
        }, u.getLabelsArray = function() {
            var t, e = [], i = 0;
            for (t in this._labels) e[i++] = {
                time: this._labels[t],
                name: t
            };
            return e.sort(function(t, e) {
                return t.time - e.time;
            }), e;
        }, u.invalidate = function() {
            return this._locked = !1, t.prototype.invalidate.call(this);
        }, u.progress = function(t, e) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration() || 0;
        }, u.totalProgress = function(t, e) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration() || 0;
        }, u.totalDuration = function(e) {
            return arguments.length ? -1 !== this._repeat && e ? this.timeScale(this.totalDuration() / e) : this : (this._dirty && (t.prototype.totalDuration.call(this), 
            this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), 
            this._totalDuration);
        }, u.time = function(t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), 
            this._yoyo && 0 !== (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), 
            this.totalTime(t, e)) : this._time;
        }, u.repeat = function(t) {
            return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat;
        }, u.repeatDelay = function(t) {
            return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay;
        }, u.yoyo = function(t) {
            return arguments.length ? (this._yoyo = t, this) : this._yoyo;
        }, u.currentLabel = function(t) {
            return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8);
        }, n;
    }, !0), function() {
        var t = 180 / Math.PI, e = [], i = [], n = [], r = {}, s = _gsScope._gsDefine.globals, o = function(t, e, i, n) {
            i === n && (i = n - (n - e) / 1e6), t === e && (e = t + (i - t) / 1e6), this.a = t, 
            this.b = e, this.c = i, this.d = n, this.da = n - t, this.ca = i - t, this.ba = e - t;
        }, a = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,", l = function(t, e, i, n) {
            var r = {
                a: t
            }, s = {}, o = {}, a = {
                c: n
            }, l = (t + e) / 2, h = (e + i) / 2, u = (i + n) / 2, c = (l + h) / 2, _ = (h + u) / 2, d = (_ - c) / 8;
            return r.b = l + (t - l) / 4, s.b = c + d, r.c = s.a = (r.b + s.b) / 2, s.c = o.a = (c + _) / 2, 
            o.b = _ - d, a.b = u + (n - u) / 4, o.c = a.a = (o.b + a.b) / 2, [ r, s, o, a ];
        }, h = function(t, r, s, o, a) {
            var h, u, c, _, d, f, p, m, g, v, y, b, x, w = t.length - 1, T = 0, k = t[0].a;
            for (h = 0; w > h; h++) d = t[T], u = d.a, c = d.d, _ = t[T + 1].d, a ? (y = e[h], 
            b = i[h], x = (b + y) * r * .25 / (o ? .5 : n[h] || .5), f = c - (c - u) * (o ? .5 * r : 0 !== y ? x / y : 0), 
            p = c + (_ - c) * (o ? .5 * r : 0 !== b ? x / b : 0), m = c - (f + ((p - f) * (3 * y / (y + b) + .5) / 4 || 0))) : (f = c - (c - u) * r * .5, 
            p = c + (_ - c) * r * .5, m = c - (f + p) / 2), f += m, p += m, d.c = g = f, 0 !== h ? d.b = k : d.b = k = d.a + .6 * (d.c - d.a), 
            d.da = c - u, d.ca = g - u, d.ba = k - u, s ? (v = l(u, k, g, c), t.splice(T, 1, v[0], v[1], v[2], v[3]), 
            T += 4) : T++, k = p;
            d = t[T], d.b = k, d.c = k + .4 * (d.d - k), d.da = d.d - d.a, d.ca = d.c - d.a, 
            d.ba = k - d.a, s && (v = l(d.a, k, d.c, d.d), t.splice(T, 1, v[0], v[1], v[2], v[3]));
        }, u = function(t, n, r, s) {
            var a, l, h, u, c, _, d = [];
            if (s) for (t = [ s ].concat(t), l = t.length; --l > -1; ) "string" == typeof (_ = t[l][n]) && "=" === _.charAt(1) && (t[l][n] = s[n] + Number(_.charAt(0) + _.substr(2)));
            if (a = t.length - 2, 0 > a) return d[0] = new o(t[0][n], 0, 0, t[0][n]), d;
            for (l = 0; a > l; l++) h = t[l][n], u = t[l + 1][n], d[l] = new o(h, 0, 0, u), 
            r && (c = t[l + 2][n], e[l] = (e[l] || 0) + (u - h) * (u - h), i[l] = (i[l] || 0) + (c - u) * (c - u));
            return d[l] = new o(t[l][n], 0, 0, t[l + 1][n]), d;
        }, c = function(t, s, o, l, c, _) {
            var d, f, p, m, g, v, y, b, x = {}, w = [], T = _ || t[0];
            c = "string" == typeof c ? "," + c + "," : a, null == s && (s = 1);
            for (f in t[0]) w.push(f);
            if (t.length > 1) {
                for (b = t[t.length - 1], y = !0, d = w.length; --d > -1; ) if (f = w[d], Math.abs(T[f] - b[f]) > .05) {
                    y = !1;
                    break;
                }
                y && (t = t.concat(), _ && t.unshift(_), t.push(t[1]), _ = t[t.length - 3]);
            }
            for (e.length = i.length = n.length = 0, d = w.length; --d > -1; ) f = w[d], r[f] = -1 !== c.indexOf("," + f + ","), 
            x[f] = u(t, f, r[f], _);
            for (d = e.length; --d > -1; ) e[d] = Math.sqrt(e[d]), i[d] = Math.sqrt(i[d]);
            if (!l) {
                for (d = w.length; --d > -1; ) if (r[f]) for (p = x[w[d]], v = p.length - 1, m = 0; v > m; m++) g = p[m + 1].da / i[m] + p[m].da / e[m] || 0, 
                n[m] = (n[m] || 0) + g * g;
                for (d = n.length; --d > -1; ) n[d] = Math.sqrt(n[d]);
            }
            for (d = w.length, m = o ? 4 : 1; --d > -1; ) f = w[d], p = x[f], h(p, s, o, l, r[f]), 
            y && (p.splice(0, m), p.splice(p.length - m, m));
            return x;
        }, _ = function(t, e, i) {
            e = e || "soft";
            var n, r, s, a, l, h, u, c, _, d, f, p = {}, m = "cubic" === e ? 3 : 2, g = "soft" === e, v = [];
            if (g && i && (t = [ i ].concat(t)), null == t || t.length < m + 1) throw "invalid Bezier data";
            for (_ in t[0]) v.push(_);
            for (h = v.length; --h > -1; ) {
                for (_ = v[h], p[_] = l = [], d = 0, c = t.length, u = 0; c > u; u++) n = null == i ? t[u][_] : "string" == typeof (f = t[u][_]) && "=" === f.charAt(1) ? i[_] + Number(f.charAt(0) + f.substr(2)) : Number(f), 
                g && u > 1 && c - 1 > u && (l[d++] = (n + l[d - 2]) / 2), l[d++] = n;
                for (c = d - m + 1, d = 0, u = 0; c > u; u += m) n = l[u], r = l[u + 1], s = l[u + 2], 
                a = 2 === m ? 0 : l[u + 3], l[d++] = f = 3 === m ? new o(n, r, s, a) : new o(n, (2 * r + n) / 3, (2 * r + s) / 3, s);
                l.length = d;
            }
            return p;
        }, d = function(t, e, i) {
            for (var n, r, s, o, a, l, h, u, c, _, d, f = 1 / i, p = t.length; --p > -1; ) for (_ = t[p], 
            s = _.a, o = _.d - s, a = _.c - s, l = _.b - s, n = r = 0, u = 1; i >= u; u++) h = f * u, 
            c = 1 - h, n = r - (r = (h * h * o + 3 * c * (h * a + c * l)) * h), d = p * i + u - 1, 
            e[d] = (e[d] || 0) + n * n;
        }, f = function(t, e) {
            e = e >> 0 || 6;
            var i, n, r, s, o = [], a = [], l = 0, h = 0, u = e - 1, c = [], _ = [];
            for (i in t) d(t[i], o, e);
            for (r = o.length, n = 0; r > n; n++) l += Math.sqrt(o[n]), s = n % e, _[s] = l, 
            s === u && (h += l, s = n / e >> 0, c[s] = _, a[s] = h, l = 0, _ = []);
            return {
                length: h,
                lengths: a,
                segments: c
            };
        }, p = _gsScope._gsDefine.plugin({
            propName: "bezier",
            priority: -1,
            version: "1.3.8",
            API: 2,
            global: !0,
            init: function(t, e, i) {
                this._target = t, e instanceof Array && (e = {
                    values: e
                }), this._func = {}, this._mod = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
                var n, r, s, o, a, l = e.values || [], h = {}, u = l[0], d = e.autoRotate || i.vars.orientToBezier;
                this._autoRotate = d ? d instanceof Array ? d : [ [ "x", "y", "rotation", d === !0 ? 0 : Number(d) || 0 ] ] : null;
                for (n in u) this._props.push(n);
                for (s = this._props.length; --s > -1; ) n = this._props[s], this._overwriteProps.push(n), 
                r = this._func[n] = "function" == typeof t[n], h[n] = r ? t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(t[n]), 
                a || h[n] !== l[0][n] && (a = h);
                if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? c(l, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, a) : _(l, e.type, h), 
                this._segCount = this._beziers[n].length, this._timeRes) {
                    var p = f(this._beziers, this._timeRes);
                    this._length = p.length, this._lengths = p.lengths, this._segments = p.segments, 
                    this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], 
                    this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length;
                }
                if (d = this._autoRotate) for (this._initialRotations = [], d[0] instanceof Array || (this._autoRotate = d = [ d ]), 
                s = d.length; --s > -1; ) {
                    for (o = 0; 3 > o; o++) n = d[s][o], this._func[n] = "function" == typeof t[n] ? t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)] : !1;
                    n = d[s][2], this._initialRotations[s] = (this._func[n] ? this._func[n].call(this._target) : this._target[n]) || 0, 
                    this._overwriteProps.push(n);
                }
                return this._startRatio = i.vars.runBackwards ? 1 : 0, !0;
            },
            set: function(e) {
                var i, n, r, s, o, a, l, h, u, c, _ = this._segCount, d = this._func, f = this._target, p = e !== this._startRatio;
                if (this._timeRes) {
                    if (u = this._lengths, c = this._curSeg, e *= this._length, r = this._li, e > this._l2 && _ - 1 > r) {
                        for (h = _ - 1; h > r && (this._l2 = u[++r]) <= e; ) ;
                        this._l1 = u[r - 1], this._li = r, this._curSeg = c = this._segments[r], this._s2 = c[this._s1 = this._si = 0];
                    } else if (e < this._l1 && r > 0) {
                        for (;r > 0 && (this._l1 = u[--r]) >= e; ) ;
                        0 === r && e < this._l1 ? this._l1 = 0 : r++, this._l2 = u[r], this._li = r, this._curSeg = c = this._segments[r], 
                        this._s1 = c[(this._si = c.length - 1) - 1] || 0, this._s2 = c[this._si];
                    }
                    if (i = r, e -= this._l1, r = this._si, e > this._s2 && r < c.length - 1) {
                        for (h = c.length - 1; h > r && (this._s2 = c[++r]) <= e; ) ;
                        this._s1 = c[r - 1], this._si = r;
                    } else if (e < this._s1 && r > 0) {
                        for (;r > 0 && (this._s1 = c[--r]) >= e; ) ;
                        0 === r && e < this._s1 ? this._s1 = 0 : r++, this._s2 = c[r], this._si = r;
                    }
                    a = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec || 0;
                } else i = 0 > e ? 0 : e >= 1 ? _ - 1 : _ * e >> 0, a = (e - i * (1 / _)) * _;
                for (n = 1 - a, r = this._props.length; --r > -1; ) s = this._props[r], o = this._beziers[s][i], 
                l = (a * a * o.da + 3 * n * (a * o.ca + n * o.ba)) * a + o.a, this._mod[s] && (l = this._mod[s](l, f)), 
                d[s] ? f[s](l) : f[s] = l;
                if (this._autoRotate) {
                    var m, g, v, y, b, x, w, T = this._autoRotate;
                    for (r = T.length; --r > -1; ) s = T[r][2], x = T[r][3] || 0, w = T[r][4] === !0 ? 1 : t, 
                    o = this._beziers[T[r][0]], m = this._beziers[T[r][1]], o && m && (o = o[i], m = m[i], 
                    g = o.a + (o.b - o.a) * a, y = o.b + (o.c - o.b) * a, g += (y - g) * a, y += (o.c + (o.d - o.c) * a - y) * a, 
                    v = m.a + (m.b - m.a) * a, b = m.b + (m.c - m.b) * a, v += (b - v) * a, b += (m.c + (m.d - m.c) * a - b) * a, 
                    l = p ? Math.atan2(b - v, y - g) * w + x : this._initialRotations[r], this._mod[s] && (l = this._mod[s](l, f)), 
                    d[s] ? f[s](l) : f[s] = l);
                }
            }
        }), m = p.prototype;
        p.bezierThrough = c, p.cubicToQuadratic = l, p._autoCSS = !0, p.quadraticToCubic = function(t, e, i) {
            return new o(t, (2 * e + t) / 3, (2 * e + i) / 3, i);
        }, p._cssRegister = function() {
            var t = s.CSSPlugin;
            if (t) {
                var e = t._internals, i = e._parseToProxy, n = e._setPluginRatio, r = e.CSSPropTween;
                e._registerComplexSpecialProp("bezier", {
                    parser: function(t, e, s, o, a, l) {
                        e instanceof Array && (e = {
                            values: e
                        }), l = new p();
                        var h, u, c, _ = e.values, d = _.length - 1, f = [], m = {};
                        if (0 > d) return a;
                        for (h = 0; d >= h; h++) c = i(t, _[h], o, a, l, d !== h), f[h] = c.end;
                        for (u in e) m[u] = e[u];
                        return m.values = f, a = new r(t, "bezier", 0, 0, c.pt, 2), a.data = c, a.plugin = l, 
                        a.setRatio = n, 0 === m.autoRotate && (m.autoRotate = !0), !m.autoRotate || m.autoRotate instanceof Array || (h = m.autoRotate === !0 ? 0 : Number(m.autoRotate), 
                        m.autoRotate = null != c.end.left ? [ [ "left", "top", "rotation", h, !1 ] ] : null != c.end.x ? [ [ "x", "y", "rotation", h, !1 ] ] : !1), 
                        m.autoRotate && (o._transform || o._enableTransforms(!1), c.autoRotate = o._target._gsTransform, 
                        c.proxy.rotation = c.autoRotate.rotation || 0, o._overwriteProps.push("rotation")), 
                        l._onInitTween(c.proxy, m, o._tween), a;
                    }
                });
            }
        }, m._mod = function(t) {
            for (var e, i = this._overwriteProps, n = i.length; --n > -1; ) e = t[i[n]], e && "function" == typeof e && (this._mod[i[n]] = e);
        }, m._kill = function(t) {
            var e, i, n = this._props;
            for (e in this._beziers) if (e in t) for (delete this._beziers[e], delete this._func[e], 
            i = n.length; --i > -1; ) n[i] === e && n.splice(i, 1);
            if (n = this._autoRotate) for (i = n.length; --i > -1; ) t[n[i][2]] && n.splice(i, 1);
            return this._super._kill.call(this, t);
        };
    }(), _gsScope._gsDefine("plugins.CSSPlugin", [ "plugins.TweenPlugin", "TweenLite" ], function(t, e) {
        var i, n, r, s, o = function() {
            t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = o.prototype.setRatio;
        }, a = _gsScope._gsDefine.globals, l = {}, h = o.prototype = new t("css");
        h.constructor = o, o.version = "2.0.2", o.API = 2, o.defaultTransformPerspective = 0, 
        o.defaultSkewType = "compensated", o.defaultSmoothOrigin = !0, h = "px", o.suffixMap = {
            top: h,
            right: h,
            bottom: h,
            left: h,
            width: h,
            height: h,
            fontSize: h,
            padding: h,
            margin: h,
            perspective: h,
            lineHeight: ""
        };
        var u, c, _, d, f, p, m, g, v = /(?:\-|\.|\b)(\d|\.|e\-)+/g, y = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g, b = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, x = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g, w = /(?:\d|\-|\+|=|#|\.)*/g, T = /opacity *= *([^)]*)/i, k = /opacity:([^;]*)/i, S = /alpha\(opacity *=.+?\)/i, P = /^(rgb|hsl)/, C = /([A-Z])/g, A = /-([a-z])/gi, O = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, E = function(t, e) {
            return e.toUpperCase();
        }, R = /(?:Left|Right|Width)/i, M = /(M11|M12|M21|M22)=[\d\-\.e]+/gi, D = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i, F = /,(?=[^\)]*(?:\(|$))/gi, L = /[\s,\(]/i, N = Math.PI / 180, z = 180 / Math.PI, I = {}, B = {
            style: {}
        }, j = _gsScope.document || {
            createElement: function() {
                return B;
            }
        }, X = function(t, e) {
            return j.createElementNS ? j.createElementNS(e || "http://www.w3.org/1999/xhtml", t) : j.createElement(t);
        }, H = X("div"), V = X("img"), U = o._internals = {
            _specialProps: l
        }, Y = (_gsScope.navigator || {}).userAgent || "", G = function() {
            var t = Y.indexOf("Android"), e = X("a");
            return _ = -1 !== Y.indexOf("Safari") && -1 === Y.indexOf("Chrome") && (-1 === t || parseFloat(Y.substr(t + 8, 2)) > 3), 
            f = _ && parseFloat(Y.substr(Y.indexOf("Version/") + 8, 2)) < 6, d = -1 !== Y.indexOf("Firefox"), 
            (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(Y) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(Y)) && (p = parseFloat(RegExp.$1)), 
            e ? (e.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(e.style.opacity)) : !1;
        }(), W = function(t) {
            return T.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1;
        }, q = function(t) {
            _gsScope.console && console.log(t);
        }, Q = "", Z = "", K = function(t, e) {
            e = e || H;
            var i, n, r = e.style;
            if (void 0 !== r[t]) return t;
            for (t = t.charAt(0).toUpperCase() + t.substr(1), i = [ "O", "Moz", "ms", "Ms", "Webkit" ], 
            n = 5; --n > -1 && void 0 === r[i[n] + t]; ) ;
            return n >= 0 ? (Z = 3 === n ? "ms" : i[n], Q = "-" + Z.toLowerCase() + "-", Z + t) : null;
        }, $ = ("undefined" != typeof window ? window : j.defaultView || {
            getComputedStyle: function() {}
        }).getComputedStyle, J = o.getStyle = function(t, e, i, n, r) {
            var s;
            return G || "opacity" !== e ? (!n && t.style[e] ? s = t.style[e] : (i = i || $(t)) ? s = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(C, "-$1").toLowerCase()) : t.currentStyle && (s = t.currentStyle[e]), 
            null == r || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : r) : W(t);
        }, tt = U.convertToPixels = function(t, i, n, r, s) {
            if ("px" === r || !r && "lineHeight" !== i) return n;
            if ("auto" === r || !n) return 0;
            var a, l, h, u = R.test(i), c = t, _ = H.style, d = 0 > n, f = 1 === n;
            if (d && (n = -n), f && (n *= 100), "lineHeight" !== i || r) if ("%" === r && -1 !== i.indexOf("border")) a = n / 100 * (u ? t.clientWidth : t.clientHeight); else {
                if (_.cssText = "border:0 solid red;position:" + J(t, "position") + ";line-height:0;", 
                "%" !== r && c.appendChild && "v" !== r.charAt(0) && "rem" !== r) _[u ? "borderLeftWidth" : "borderTopWidth"] = n + r; else {
                    if (c = t.parentNode || j.body, -1 !== J(c, "display").indexOf("flex") && (_.position = "absolute"), 
                    l = c._gsCache, h = e.ticker.frame, l && u && l.time === h) return l.width * n / 100;
                    _[u ? "width" : "height"] = n + r;
                }
                c.appendChild(H), a = parseFloat(H[u ? "offsetWidth" : "offsetHeight"]), c.removeChild(H), 
                u && "%" === r && o.cacheWidths !== !1 && (l = c._gsCache = c._gsCache || {}, l.time = h, 
                l.width = a / n * 100), 0 !== a || s || (a = tt(t, i, n, r, !0));
            } else l = $(t).lineHeight, t.style.lineHeight = n, a = parseFloat($(t).lineHeight), 
            t.style.lineHeight = l;
            return f && (a /= 100), d ? -a : a;
        }, et = U.calculateOffset = function(t, e, i) {
            if ("absolute" !== J(t, "position", i)) return 0;
            var n = "left" === e ? "Left" : "Top", r = J(t, "margin" + n, i);
            return t["offset" + n] - (tt(t, e, parseFloat(r), r.replace(w, "")) || 0);
        }, it = function(t, e) {
            var i, n, r, s = {};
            if (e = e || $(t, null)) if (i = e.length) for (;--i > -1; ) r = e[i], (-1 === r.indexOf("-transform") || Ot === r) && (s[r.replace(A, E)] = e.getPropertyValue(r)); else for (i in e) (-1 === i.indexOf("Transform") || At === i) && (s[i] = e[i]); else if (e = t.currentStyle || t.style) for (i in e) "string" == typeof i && void 0 === s[i] && (s[i.replace(A, E)] = e[i]);
            return G || (s.opacity = W(t)), n = Vt(t, e, !1), s.rotation = n.rotation, s.skewX = n.skewX, 
            s.scaleX = n.scaleX, s.scaleY = n.scaleY, s.x = n.x, s.y = n.y, Rt && (s.z = n.z, 
            s.rotationX = n.rotationX, s.rotationY = n.rotationY, s.scaleZ = n.scaleZ), s.filters && delete s.filters, 
            s;
        }, nt = function(t, e, i, n, r) {
            var s, o, a, l = {}, h = t.style;
            for (o in i) "cssText" !== o && "length" !== o && isNaN(o) && (e[o] !== (s = i[o]) || r && r[o]) && -1 === o.indexOf("Origin") && ("number" == typeof s || "string" == typeof s) && (l[o] = "auto" !== s || "left" !== o && "top" !== o ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof e[o] || "" === e[o].replace(x, "") ? s : 0 : et(t, o), 
            void 0 !== h[o] && (a = new vt(h, o, h[o], a)));
            if (n) for (o in n) "className" !== o && (l[o] = n[o]);
            return {
                difs: l,
                firstMPT: a
            };
        }, rt = {
            width: [ "Left", "Right" ],
            height: [ "Top", "Bottom" ]
        }, st = [ "marginLeft", "marginRight", "marginTop", "marginBottom" ], ot = function(t, e, i) {
            if ("svg" === (t.nodeName + "").toLowerCase()) return (i || $(t))[e] || 0;
            if (t.getCTM && jt(t)) return t.getBBox()[e] || 0;
            var n = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight), r = rt[e], s = r.length;
            for (i = i || $(t, null); --s > -1; ) n -= parseFloat(J(t, "padding" + r[s], i, !0)) || 0, 
            n -= parseFloat(J(t, "border" + r[s] + "Width", i, !0)) || 0;
            return n;
        }, at = function(t, e) {
            if ("contain" === t || "auto" === t || "auto auto" === t) return t + " ";
            (null == t || "" === t) && (t = "0 0");
            var i, n = t.split(" "), r = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : n[0], s = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : n[1];
            if (n.length > 3 && !e) {
                for (n = t.split(", ").join(",").split(","), t = [], i = 0; i < n.length; i++) t.push(at(n[i]));
                return t.join(",");
            }
            return null == s ? s = "center" === r ? "50%" : "0" : "center" === s && (s = "50%"), 
            ("center" === r || isNaN(parseFloat(r)) && -1 === (r + "").indexOf("=")) && (r = "50%"), 
            t = r + " " + s + (n.length > 2 ? " " + n[2] : ""), e && (e.oxp = -1 !== r.indexOf("%"), 
            e.oyp = -1 !== s.indexOf("%"), e.oxr = "=" === r.charAt(1), e.oyr = "=" === s.charAt(1), 
            e.ox = parseFloat(r.replace(x, "")), e.oy = parseFloat(s.replace(x, "")), e.v = t), 
            e || t;
        }, lt = function(t, e) {
            return "function" == typeof t && (t = t(g, m)), "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e) || 0;
        }, ht = function(t, e) {
            "function" == typeof t && (t = t(g, m));
            var i = "string" == typeof t && "=" === t.charAt(1);
            return "string" == typeof t && "v" === t.charAt(t.length - 2) && (t = (i ? t.substr(0, 2) : 0) + window["inner" + ("vh" === t.substr(-2) ? "Height" : "Width")] * (parseFloat(i ? t.substr(2) : t) / 100)), 
            null == t ? e : i ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t) || 0;
        }, ut = function(t, e, i, n) {
            var r, s, o, a, l, h = 1e-6;
            return "function" == typeof t && (t = t(g, m)), null == t ? a = e : "number" == typeof t ? a = t : (r = 360, 
            s = t.split("_"), l = "=" === t.charAt(1), o = (l ? parseInt(t.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (-1 === t.indexOf("rad") ? 1 : z) - (l ? 0 : e), 
            s.length && (n && (n[i] = e + o), -1 !== t.indexOf("short") && (o %= r, o !== o % (r / 2) && (o = 0 > o ? o + r : o - r)), 
            -1 !== t.indexOf("_cw") && 0 > o ? o = (o + 9999999999 * r) % r - (o / r | 0) * r : -1 !== t.indexOf("ccw") && o > 0 && (o = (o - 9999999999 * r) % r - (o / r | 0) * r)), 
            a = e + o), h > a && a > -h && (a = 0), a;
        }, ct = {
            aqua: [ 0, 255, 255 ],
            lime: [ 0, 255, 0 ],
            silver: [ 192, 192, 192 ],
            black: [ 0, 0, 0 ],
            maroon: [ 128, 0, 0 ],
            teal: [ 0, 128, 128 ],
            blue: [ 0, 0, 255 ],
            navy: [ 0, 0, 128 ],
            white: [ 255, 255, 255 ],
            fuchsia: [ 255, 0, 255 ],
            olive: [ 128, 128, 0 ],
            yellow: [ 255, 255, 0 ],
            orange: [ 255, 165, 0 ],
            gray: [ 128, 128, 128 ],
            purple: [ 128, 0, 128 ],
            green: [ 0, 128, 0 ],
            red: [ 255, 0, 0 ],
            pink: [ 255, 192, 203 ],
            cyan: [ 0, 255, 255 ],
            transparent: [ 255, 255, 255, 0 ]
        }, _t = function(t, e, i) {
            return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 255 * (1 > 6 * t ? e + (i - e) * t * 6 : .5 > t ? i : 2 > 3 * t ? e + (i - e) * (2 / 3 - t) * 6 : e) + .5 | 0;
        }, dt = o.parseColor = function(t, e) {
            var i, n, r, s, o, a, l, h, u, c, _;
            if (t) if ("number" == typeof t) i = [ t >> 16, t >> 8 & 255, 255 & t ]; else {
                if ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), ct[t]) i = ct[t]; else if ("#" === t.charAt(0)) 4 === t.length && (n = t.charAt(1), 
                r = t.charAt(2), s = t.charAt(3), t = "#" + n + n + r + r + s + s), t = parseInt(t.substr(1), 16), 
                i = [ t >> 16, t >> 8 & 255, 255 & t ]; else if ("hsl" === t.substr(0, 3)) if (i = _ = t.match(v), 
                e) {
                    if (-1 !== t.indexOf("=")) return t.match(y);
                } else o = Number(i[0]) % 360 / 360, a = Number(i[1]) / 100, l = Number(i[2]) / 100, 
                r = .5 >= l ? l * (a + 1) : l + a - l * a, n = 2 * l - r, i.length > 3 && (i[3] = Number(i[3])), 
                i[0] = _t(o + 1 / 3, n, r), i[1] = _t(o, n, r), i[2] = _t(o - 1 / 3, n, r); else i = t.match(v) || ct.transparent;
                i[0] = Number(i[0]), i[1] = Number(i[1]), i[2] = Number(i[2]), i.length > 3 && (i[3] = Number(i[3]));
            } else i = ct.black;
            return e && !_ && (n = i[0] / 255, r = i[1] / 255, s = i[2] / 255, h = Math.max(n, r, s), 
            u = Math.min(n, r, s), l = (h + u) / 2, h === u ? o = a = 0 : (c = h - u, a = l > .5 ? c / (2 - h - u) : c / (h + u), 
            o = h === n ? (r - s) / c + (s > r ? 6 : 0) : h === r ? (s - n) / c + 2 : (n - r) / c + 4, 
            o *= 60), i[0] = o + .5 | 0, i[1] = 100 * a + .5 | 0, i[2] = 100 * l + .5 | 0), 
            i;
        }, ft = function(t, e) {
            var i, n, r, s = t.match(pt) || [], o = 0, a = "";
            if (!s.length) return t;
            for (i = 0; i < s.length; i++) n = s[i], r = t.substr(o, t.indexOf(n, o) - o), o += r.length + n.length, 
            n = dt(n, e), 3 === n.length && n.push(1), a += r + (e ? "hsla(" + n[0] + "," + n[1] + "%," + n[2] + "%," + n[3] : "rgba(" + n.join(",")) + ")";
            return a + t.substr(o);
        }, pt = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
        for (h in ct) pt += "|" + h + "\\b";
        pt = new RegExp(pt + ")", "gi"), o.colorStringFilter = function(t) {
            var e, i = t[0] + " " + t[1];
            pt.test(i) && (e = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla("), t[0] = ft(t[0], e), 
            t[1] = ft(t[1], e)), pt.lastIndex = 0;
        }, e.defaultStringFilter || (e.defaultStringFilter = o.colorStringFilter);
        var mt = function(t, e, i, n) {
            if (null == t) return function(t) {
                return t;
            };
            var r, s = e ? (t.match(pt) || [ "" ])[0] : "", o = t.split(s).join("").match(b) || [], a = t.substr(0, t.indexOf(o[0])), l = ")" === t.charAt(t.length - 1) ? ")" : "", h = -1 !== t.indexOf(" ") ? " " : ",", u = o.length, c = u > 0 ? o[0].replace(v, "") : "";
            return u ? r = e ? function(t) {
                var e, _, d, f;
                if ("number" == typeof t) t += c; else if (n && F.test(t)) {
                    for (f = t.replace(F, "|").split("|"), d = 0; d < f.length; d++) f[d] = r(f[d]);
                    return f.join(",");
                }
                if (e = (t.match(pt) || [ s ])[0], _ = t.split(e).join("").match(b) || [], d = _.length, 
                u > d--) for (;++d < u; ) _[d] = i ? _[(d - 1) / 2 | 0] : o[d];
                return a + _.join(h) + h + e + l + (-1 !== t.indexOf("inset") ? " inset" : "");
            } : function(t) {
                var e, s, _;
                if ("number" == typeof t) t += c; else if (n && F.test(t)) {
                    for (s = t.replace(F, "|").split("|"), _ = 0; _ < s.length; _++) s[_] = r(s[_]);
                    return s.join(",");
                }
                if (e = t.match(b) || [], _ = e.length, u > _--) for (;++_ < u; ) e[_] = i ? e[(_ - 1) / 2 | 0] : o[_];
                return a + e.join(h) + l;
            } : function(t) {
                return t;
            };
        }, gt = function(t) {
            return t = t.split(","), function(e, i, n, r, s, o, a) {
                var l, h = (i + "").split(" ");
                for (a = {}, l = 0; 4 > l; l++) a[t[l]] = h[l] = h[l] || h[(l - 1) / 2 >> 0];
                return r.parse(e, a, s, o);
            };
        }, vt = (U._setPluginRatio = function(t) {
            this.plugin.setRatio(t);
            for (var e, i, n, r, s, o = this.data, a = o.proxy, l = o.firstMPT, h = 1e-6; l; ) e = a[l.v], 
            l.r ? e = l.r(e) : h > e && e > -h && (e = 0), l.t[l.p] = e, l = l._next;
            if (o.autoRotate && (o.autoRotate.rotation = o.mod ? o.mod.call(this._tween, a.rotation, this.t, this._tween) : a.rotation), 
            1 === t || 0 === t) for (l = o.firstMPT, s = 1 === t ? "e" : "b"; l; ) {
                if (i = l.t, i.type) {
                    if (1 === i.type) {
                        for (r = i.xs0 + i.s + i.xs1, n = 1; n < i.l; n++) r += i["xn" + n] + i["xs" + (n + 1)];
                        i[s] = r;
                    }
                } else i[s] = i.s + i.xs0;
                l = l._next;
            }
        }, function(t, e, i, n, r) {
            this.t = t, this.p = e, this.v = i, this.r = r, n && (n._prev = this, this._next = n);
        }), yt = (U._parseToProxy = function(t, e, i, n, r, s) {
            var o, a, l, h, u, c = n, _ = {}, d = {}, f = i._transform, p = I;
            for (i._transform = null, I = e, n = u = i.parse(t, e, n, r), I = p, s && (i._transform = f, 
            c && (c._prev = null, c._prev && (c._prev._next = null))); n && n !== c; ) {
                if (n.type <= 1 && (a = n.p, d[a] = n.s + n.c, _[a] = n.s, s || (h = new vt(n, "s", a, h, n.r), 
                n.c = 0), 1 === n.type)) for (o = n.l; --o > 0; ) l = "xn" + o, a = n.p + "_" + l, 
                d[a] = n.data[l], _[a] = n[l], s || (h = new vt(n, l, a, h, n.rxp[l]));
                n = n._next;
            }
            return {
                proxy: _,
                end: d,
                firstMPT: h,
                pt: u
            };
        }, U.CSSPropTween = function(t, e, n, r, o, a, l, h, u, c, _) {
            this.t = t, this.p = e, this.s = n, this.c = r, this.n = l || e, t instanceof yt || s.push(this.n), 
            this.r = h ? "function" == typeof h ? h : Math.round : h, this.type = a || 0, u && (this.pr = u, 
            i = !0), this.b = void 0 === c ? n : c, this.e = void 0 === _ ? n + r : _, o && (this._next = o, 
            o._prev = this);
        }), bt = function(t, e, i, n, r, s) {
            var o = new yt(t, e, i, n - i, r, -1, s);
            return o.b = i, o.e = o.xs0 = n, o;
        }, xt = o.parseComplex = function(t, e, i, n, r, s, a, l, h, c) {
            i = i || s || "", "function" == typeof n && (n = n(g, m)), a = new yt(t, e, 0, 0, a, c ? 2 : 1, null, !1, l, i, n), 
            n += "", r && pt.test(n + i) && (n = [ i, n ], o.colorStringFilter(n), i = n[0], 
            n = n[1]);
            var _, d, f, p, b, x, w, T, k, S, P, C, A, O = i.split(", ").join(",").split(" "), E = n.split(", ").join(",").split(" "), R = O.length, M = u !== !1;
            for ((-1 !== n.indexOf(",") || -1 !== i.indexOf(",")) && (-1 !== (n + i).indexOf("rgb") || -1 !== (n + i).indexOf("hsl") ? (O = O.join(" ").replace(F, ", ").split(" "), 
            E = E.join(" ").replace(F, ", ").split(" ")) : (O = O.join(" ").split(",").join(", ").split(" "), 
            E = E.join(" ").split(",").join(", ").split(" ")), R = O.length), R !== E.length && (O = (s || "").split(" "), 
            R = O.length), a.plugin = h, a.setRatio = c, pt.lastIndex = 0, _ = 0; R > _; _++) if (p = O[_], 
            b = E[_] + "", T = parseFloat(p), T || 0 === T) a.appendXtra("", T, lt(b, T), b.replace(y, ""), M && -1 !== b.indexOf("px") ? Math.round : !1, !0); else if (r && pt.test(p)) C = b.indexOf(")") + 1, 
            C = ")" + (C ? b.substr(C) : ""), A = -1 !== b.indexOf("hsl") && G, S = b, p = dt(p, A), 
            b = dt(b, A), k = p.length + b.length > 6, k && !G && 0 === b[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent", 
            a.e = a.e.split(E[_]).join("transparent")) : (G || (k = !1), A ? a.appendXtra(S.substr(0, S.indexOf("hsl")) + (k ? "hsla(" : "hsl("), p[0], lt(b[0], p[0]), ",", !1, !0).appendXtra("", p[1], lt(b[1], p[1]), "%,", !1).appendXtra("", p[2], lt(b[2], p[2]), k ? "%," : "%" + C, !1) : a.appendXtra(S.substr(0, S.indexOf("rgb")) + (k ? "rgba(" : "rgb("), p[0], b[0] - p[0], ",", Math.round, !0).appendXtra("", p[1], b[1] - p[1], ",", Math.round).appendXtra("", p[2], b[2] - p[2], k ? "," : C, Math.round), 
            k && (p = p.length < 4 ? 1 : p[3], a.appendXtra("", p, (b.length < 4 ? 1 : b[3]) - p, C, !1))), 
            pt.lastIndex = 0; else if (x = p.match(v)) {
                if (w = b.match(y), !w || w.length !== x.length) return a;
                for (f = 0, d = 0; d < x.length; d++) P = x[d], S = p.indexOf(P, f), a.appendXtra(p.substr(f, S - f), Number(P), lt(w[d], P), "", M && "px" === p.substr(S + P.length, 2) ? Math.round : !1, 0 === d), 
                f = S + P.length;
                a["xs" + a.l] += p.substr(f);
            } else a["xs" + a.l] += a.l || a["xs" + a.l] ? " " + b : b;
            if (-1 !== n.indexOf("=") && a.data) {
                for (C = a.xs0 + a.data.s, _ = 1; _ < a.l; _++) C += a["xs" + _] + a.data["xn" + _];
                a.e = C + a["xs" + _];
            }
            return a.l || (a.type = -1, a.xs0 = a.e), a.xfirst || a;
        }, wt = 9;
        for (h = yt.prototype, h.l = h.pr = 0; --wt > 0; ) h["xn" + wt] = 0, h["xs" + wt] = "";
        h.xs0 = "", h._next = h._prev = h.xfirst = h.data = h.plugin = h.setRatio = h.rxp = null, 
        h.appendXtra = function(t, e, i, n, r, s) {
            var o = this, a = o.l;
            return o["xs" + a] += s && (a || o["xs" + a]) ? " " + t : t || "", i || 0 === a || o.plugin ? (o.l++, 
            o.type = o.setRatio ? 2 : 1, o["xs" + o.l] = n || "", a > 0 ? (o.data["xn" + a] = e + i, 
            o.rxp["xn" + a] = r, o["xn" + a] = e, o.plugin || (o.xfirst = new yt(o, "xn" + a, e, i, o.xfirst || o, 0, o.n, r, o.pr), 
            o.xfirst.xs0 = 0), o) : (o.data = {
                s: e + i
            }, o.rxp = {}, o.s = e, o.c = i, o.r = r, o)) : (o["xs" + a] += e + (n || ""), o);
        };
        var Tt = function(t, e) {
            e = e || {}, this.p = e.prefix ? K(t) || t : t, l[t] = l[this.p] = this, this.format = e.formatter || mt(e.defaultValue, e.color, e.collapsible, e.multi), 
            e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, 
            this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0;
        }, kt = U._registerComplexSpecialProp = function(t, e, i) {
            "object" != typeof e && (e = {
                parser: i
            });
            var n, r, s = t.split(","), o = e.defaultValue;
            for (i = i || [ o ], n = 0; n < s.length; n++) e.prefix = 0 === n && e.prefix, e.defaultValue = i[n] || o, 
            r = new Tt(s[n], e);
        }, St = U._registerPluginProp = function(t) {
            if (!l[t]) {
                var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                kt(t, {
                    parser: function(t, i, n, r, s, o, h) {
                        var u = a.com.greensock.plugins[e];
                        return u ? (u._cssRegister(), l[n].parse(t, i, n, r, s, o, h)) : (q("Error: " + e + " js file not loaded."), 
                        s);
                    }
                });
            }
        };
        h = Tt.prototype, h.parseComplex = function(t, e, i, n, r, s) {
            var o, a, l, h, u, c, _ = this.keyword;
            if (this.multi && (F.test(i) || F.test(e) ? (a = e.replace(F, "|").split("|"), l = i.replace(F, "|").split("|")) : _ && (a = [ e ], 
            l = [ i ])), l) {
                for (h = l.length > a.length ? l.length : a.length, o = 0; h > o; o++) e = a[o] = a[o] || this.dflt, 
                i = l[o] = l[o] || this.dflt, _ && (u = e.indexOf(_), c = i.indexOf(_), u !== c && (-1 === c ? a[o] = a[o].split(_).join("") : -1 === u && (a[o] += " " + _)));
                e = a.join(", "), i = l.join(", ");
            }
            return xt(t, this.p, e, i, this.clrs, this.dflt, n, this.pr, r, s);
        }, h.parse = function(t, e, i, n, s, o, a) {
            return this.parseComplex(t.style, this.format(J(t, this.p, r, !1, this.dflt)), this.format(e), s, o);
        }, o.registerSpecialProp = function(t, e, i) {
            kt(t, {
                parser: function(t, n, r, s, o, a, l) {
                    var h = new yt(t, r, 0, 0, o, 2, r, !1, i);
                    return h.plugin = a, h.setRatio = e(t, n, s._tween, r), h;
                },
                priority: i
            });
        }, o.useSVGTransformAttr = !0;
        var Pt, Ct = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","), At = K("transform"), Ot = Q + "transform", Et = K("transformOrigin"), Rt = null !== K("perspective"), Mt = U.Transform = function() {
            this.perspective = parseFloat(o.defaultTransformPerspective) || 0, this.force3D = o.defaultForce3D !== !1 && Rt ? o.defaultForce3D || "auto" : !1;
        }, Dt = _gsScope.SVGElement, Ft = function(t, e, i) {
            var n, r = j.createElementNS("http://www.w3.org/2000/svg", t), s = /([a-z])([A-Z])/g;
            for (n in i) r.setAttributeNS(null, n.replace(s, "$1-$2").toLowerCase(), i[n]);
            return e.appendChild(r), r;
        }, Lt = j.documentElement || {}, Nt = function() {
            var t, e, i, n = p || /Android/i.test(Y) && !_gsScope.chrome;
            return j.createElementNS && !n && (t = Ft("svg", Lt), e = Ft("rect", t, {
                width: 100,
                height: 50,
                x: 100
            }), i = e.getBoundingClientRect().width, e.style[Et] = "50% 50%", e.style[At] = "scaleX(0.5)", 
            n = i === e.getBoundingClientRect().width && !(d && Rt), Lt.removeChild(t)), n;
        }(), zt = function(t, e, i, n, r, s) {
            var a, l, h, u, c, _, d, f, p, m, g, v, y, b, x = t._gsTransform, w = Ht(t, !0);
            x && (y = x.xOrigin, b = x.yOrigin), (!n || (a = n.split(" ")).length < 2) && (d = t.getBBox(), 
            0 === d.x && 0 === d.y && d.width + d.height === 0 && (d = {
                x: parseFloat(t.hasAttribute("x") ? t.getAttribute("x") : t.hasAttribute("cx") ? t.getAttribute("cx") : 0) || 0,
                y: parseFloat(t.hasAttribute("y") ? t.getAttribute("y") : t.hasAttribute("cy") ? t.getAttribute("cy") : 0) || 0,
                width: 0,
                height: 0
            }), e = at(e).split(" "), a = [ (-1 !== e[0].indexOf("%") ? parseFloat(e[0]) / 100 * d.width : parseFloat(e[0])) + d.x, (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * d.height : parseFloat(e[1])) + d.y ]), 
            i.xOrigin = u = parseFloat(a[0]), i.yOrigin = c = parseFloat(a[1]), n && w !== Xt && (_ = w[0], 
            d = w[1], f = w[2], p = w[3], m = w[4], g = w[5], v = _ * p - d * f, v && (l = u * (p / v) + c * (-f / v) + (f * g - p * m) / v, 
            h = u * (-d / v) + c * (_ / v) - (_ * g - d * m) / v, u = i.xOrigin = a[0] = l, 
            c = i.yOrigin = a[1] = h)), x && (s && (i.xOffset = x.xOffset, i.yOffset = x.yOffset, 
            x = i), r || r !== !1 && o.defaultSmoothOrigin !== !1 ? (l = u - y, h = c - b, x.xOffset += l * w[0] + h * w[2] - l, 
            x.yOffset += l * w[1] + h * w[3] - h) : x.xOffset = x.yOffset = 0), s || t.setAttribute("data-svg-origin", a.join(" "));
        }, It = function(t) {
            var e, i = X("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), n = this.parentNode, r = this.nextSibling, s = this.style.cssText;
            if (Lt.appendChild(i), i.appendChild(this), this.style.display = "block", t) try {
                e = this.getBBox(), this._originalGetBBox = this.getBBox, this.getBBox = It;
            } catch (t) {} else this._originalGetBBox && (e = this._originalGetBBox());
            return r ? n.insertBefore(this, r) : n.appendChild(this), Lt.removeChild(i), this.style.cssText = s, 
            e;
        }, Bt = function(t) {
            try {
                return t.getBBox();
            } catch (e) {
                return It.call(t, !0);
            }
        }, jt = function(t) {
            return !(!Dt || !t.getCTM || t.parentNode && !t.ownerSVGElement || !Bt(t));
        }, Xt = [ 1, 0, 0, 1, 0, 0 ], Ht = function(t, e) {
            var i, n, r, s, o, a, l = t._gsTransform || new Mt(), h = 1e5, u = t.style;
            if (At ? n = J(t, Ot, null, !0) : t.currentStyle && (n = t.currentStyle.filter.match(M), 
            n = n && 4 === n.length ? [ n[0].substr(4), Number(n[2].substr(4)), Number(n[1].substr(4)), n[3].substr(4), l.x || 0, l.y || 0 ].join(",") : ""), 
            i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, !At || !(a = !$(t) || "none" === $(t).display) && t.parentNode || (a && (s = u.display, 
            u.display = "block"), t.parentNode || (o = 1, Lt.appendChild(t)), n = J(t, Ot, null, !0), 
            i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, s ? u.display = s : a && Wt(u, "display"), 
            o && Lt.removeChild(t)), (l.svg || t.getCTM && jt(t)) && (i && -1 !== (u[At] + "").indexOf("matrix") && (n = u[At], 
            i = 0), r = t.getAttribute("transform"), i && r && (r = t.transform.baseVal.consolidate().matrix, 
            n = "matrix(" + r.a + "," + r.b + "," + r.c + "," + r.d + "," + r.e + "," + r.f + ")", 
            i = 0)), i) return Xt;
            for (r = (n || "").match(v) || [], wt = r.length; --wt > -1; ) s = Number(r[wt]), 
            r[wt] = (o = s - (s |= 0)) ? (o * h + (0 > o ? -.5 : .5) | 0) / h + s : s;
            return e && r.length > 6 ? [ r[0], r[1], r[4], r[5], r[12], r[13] ] : r;
        }, Vt = U.getTransform = function(t, i, n, r) {
            if (t._gsTransform && n && !r) return t._gsTransform;
            var s, a, l, h, u, c, _ = n ? t._gsTransform || new Mt() : new Mt(), d = _.scaleX < 0, f = 2e-5, p = 1e5, m = Rt ? parseFloat(J(t, Et, i, !1, "0 0 0").split(" ")[2]) || _.zOrigin || 0 : 0, g = parseFloat(o.defaultTransformPerspective) || 0;
            if (_.svg = !(!t.getCTM || !jt(t)), _.svg && (zt(t, J(t, Et, i, !1, "50% 50%") + "", _, t.getAttribute("data-svg-origin")), 
            Pt = o.useSVGTransformAttr || Nt), s = Ht(t), s !== Xt) {
                if (16 === s.length) {
                    var v, y, b, x, w, T = s[0], k = s[1], S = s[2], P = s[3], C = s[4], A = s[5], O = s[6], E = s[7], R = s[8], M = s[9], D = s[10], F = s[12], L = s[13], N = s[14], I = s[11], B = Math.atan2(O, D);
                    _.zOrigin && (N = -_.zOrigin, F = R * N - s[12], L = M * N - s[13], N = D * N + _.zOrigin - s[14]), 
                    _.rotationX = B * z, B && (x = Math.cos(-B), w = Math.sin(-B), v = C * x + R * w, 
                    y = A * x + M * w, b = O * x + D * w, R = C * -w + R * x, M = A * -w + M * x, D = O * -w + D * x, 
                    I = E * -w + I * x, C = v, A = y, O = b), B = Math.atan2(-S, D), _.rotationY = B * z, 
                    B && (x = Math.cos(-B), w = Math.sin(-B), v = T * x - R * w, y = k * x - M * w, 
                    b = S * x - D * w, M = k * w + M * x, D = S * w + D * x, I = P * w + I * x, T = v, 
                    k = y, S = b), B = Math.atan2(k, T), _.rotation = B * z, B && (x = Math.cos(B), 
                    w = Math.sin(B), v = T * x + k * w, y = C * x + A * w, b = R * x + M * w, k = k * x - T * w, 
                    A = A * x - C * w, M = M * x - R * w, T = v, C = y, R = b), _.rotationX && Math.abs(_.rotationX) + Math.abs(_.rotation) > 359.9 && (_.rotationX = _.rotation = 0, 
                    _.rotationY = 180 - _.rotationY), B = Math.atan2(C, A), _.scaleX = (Math.sqrt(T * T + k * k + S * S) * p + .5 | 0) / p, 
                    _.scaleY = (Math.sqrt(A * A + O * O) * p + .5 | 0) / p, _.scaleZ = (Math.sqrt(R * R + M * M + D * D) * p + .5 | 0) / p, 
                    T /= _.scaleX, C /= _.scaleY, k /= _.scaleX, A /= _.scaleY, Math.abs(B) > f ? (_.skewX = B * z, 
                    C = 0, "simple" !== _.skewType && (_.scaleY *= 1 / Math.cos(B))) : _.skewX = 0, 
                    _.perspective = I ? 1 / (0 > I ? -I : I) : 0, _.x = F, _.y = L, _.z = N, _.svg && (_.x -= _.xOrigin - (_.xOrigin * T - _.yOrigin * C), 
                    _.y -= _.yOrigin - (_.yOrigin * k - _.xOrigin * A));
                } else if (!Rt || r || !s.length || _.x !== s[4] || _.y !== s[5] || !_.rotationX && !_.rotationY) {
                    var j = s.length >= 6, X = j ? s[0] : 1, H = s[1] || 0, V = s[2] || 0, U = j ? s[3] : 1;
                    _.x = s[4] || 0, _.y = s[5] || 0, l = Math.sqrt(X * X + H * H), h = Math.sqrt(U * U + V * V), 
                    u = X || H ? Math.atan2(H, X) * z : _.rotation || 0, c = V || U ? Math.atan2(V, U) * z + u : _.skewX || 0, 
                    _.scaleX = l, _.scaleY = h, _.rotation = u, _.skewX = c, Rt && (_.rotationX = _.rotationY = _.z = 0, 
                    _.perspective = g, _.scaleZ = 1), _.svg && (_.x -= _.xOrigin - (_.xOrigin * X + _.yOrigin * V), 
                    _.y -= _.yOrigin - (_.xOrigin * H + _.yOrigin * U));
                }
                Math.abs(_.skewX) > 90 && Math.abs(_.skewX) < 270 && (d ? (_.scaleX *= -1, _.skewX += _.rotation <= 0 ? 180 : -180, 
                _.rotation += _.rotation <= 0 ? 180 : -180) : (_.scaleY *= -1, _.skewX += _.skewX <= 0 ? 180 : -180)), 
                _.zOrigin = m;
                for (a in _) _[a] < f && _[a] > -f && (_[a] = 0);
            }
            return n && (t._gsTransform = _, _.svg && (Pt && t.style[At] ? e.delayedCall(.001, function() {
                Wt(t.style, At);
            }) : !Pt && t.getAttribute("transform") && e.delayedCall(.001, function() {
                t.removeAttribute("transform");
            }))), _;
        }, Ut = function(t) {
            var e, i, n = this.data, r = -n.rotation * N, s = r + n.skewX * N, o = 1e5, a = (Math.cos(r) * n.scaleX * o | 0) / o, l = (Math.sin(r) * n.scaleX * o | 0) / o, h = (Math.sin(s) * -n.scaleY * o | 0) / o, u = (Math.cos(s) * n.scaleY * o | 0) / o, c = this.t.style, _ = this.t.currentStyle;
            if (_) {
                i = l, l = -h, h = -i, e = _.filter, c.filter = "";
                var d, f, m = this.t.offsetWidth, g = this.t.offsetHeight, v = "absolute" !== _.position, y = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + l + ", M21=" + h + ", M22=" + u, b = n.x + m * n.xPercent / 100, x = n.y + g * n.yPercent / 100;
                if (null != n.ox && (d = (n.oxp ? m * n.ox * .01 : n.ox) - m / 2, f = (n.oyp ? g * n.oy * .01 : n.oy) - g / 2, 
                b += d - (d * a + f * l), x += f - (d * h + f * u)), v ? (d = m / 2, f = g / 2, 
                y += ", Dx=" + (d - (d * a + f * l) + b) + ", Dy=" + (f - (d * h + f * u) + x) + ")") : y += ", sizingMethod='auto expand')", 
                -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? c.filter = e.replace(D, y) : c.filter = y + " " + e, 
                (0 === t || 1 === t) && 1 === a && 0 === l && 0 === h && 1 === u && (v && -1 === y.indexOf("Dx=0, Dy=0") || T.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf(e.indexOf("Alpha")) && c.removeAttribute("filter")), 
                !v) {
                    var k, S, P, C = 8 > p ? 1 : -1;
                    for (d = n.ieOffsetX || 0, f = n.ieOffsetY || 0, n.ieOffsetX = Math.round((m - ((0 > a ? -a : a) * m + (0 > l ? -l : l) * g)) / 2 + b), 
                    n.ieOffsetY = Math.round((g - ((0 > u ? -u : u) * g + (0 > h ? -h : h) * m)) / 2 + x), 
                    wt = 0; 4 > wt; wt++) S = st[wt], k = _[S], i = -1 !== k.indexOf("px") ? parseFloat(k) : tt(this.t, S, parseFloat(k), k.replace(w, "")) || 0, 
                    P = i !== n[S] ? 2 > wt ? -n.ieOffsetX : -n.ieOffsetY : 2 > wt ? d - n.ieOffsetX : f - n.ieOffsetY, 
                    c[S] = (n[S] = Math.round(i - P * (0 === wt || 2 === wt ? 1 : C))) + "px";
                }
            }
        }, Yt = U.set3DTransformRatio = U.setTransformRatio = function(t) {
            var e, i, n, r, s, o, a, l, h, u, c, _, f, p, m, g, v, y, b, x, w, T, k, S = this.data, P = this.t.style, C = S.rotation, A = S.rotationX, O = S.rotationY, E = S.scaleX, R = S.scaleY, M = S.scaleZ, D = S.x, F = S.y, L = S.z, z = S.svg, I = S.perspective, B = S.force3D, j = S.skewY, X = S.skewX;
            if (j && (X += j, C += j), ((1 === t || 0 === t) && "auto" === B && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !B) && !L && !I && !O && !A && 1 === M || Pt && z || !Rt) return void (C || X || z ? (C *= N, 
            T = X * N, k = 1e5, i = Math.cos(C) * E, s = Math.sin(C) * E, n = Math.sin(C - T) * -R, 
            o = Math.cos(C - T) * R, T && "simple" === S.skewType && (e = Math.tan(T - j * N), 
            e = Math.sqrt(1 + e * e), n *= e, o *= e, j && (e = Math.tan(j * N), e = Math.sqrt(1 + e * e), 
            i *= e, s *= e)), z && (D += S.xOrigin - (S.xOrigin * i + S.yOrigin * n) + S.xOffset, 
            F += S.yOrigin - (S.xOrigin * s + S.yOrigin * o) + S.yOffset, Pt && (S.xPercent || S.yPercent) && (m = this.t.getBBox(), 
            D += .01 * S.xPercent * m.width, F += .01 * S.yPercent * m.height), m = 1e-6, m > D && D > -m && (D = 0), 
            m > F && F > -m && (F = 0)), b = (i * k | 0) / k + "," + (s * k | 0) / k + "," + (n * k | 0) / k + "," + (o * k | 0) / k + "," + D + "," + F + ")", 
            z && Pt ? this.t.setAttribute("transform", "matrix(" + b) : P[At] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix(" : "matrix(") + b) : P[At] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix(" : "matrix(") + E + ",0,0," + R + "," + D + "," + F + ")");
            if (d && (m = 1e-4, m > E && E > -m && (E = M = 2e-5), m > R && R > -m && (R = M = 2e-5), 
            !I || S.z || S.rotationX || S.rotationY || (I = 0)), C || X) C *= N, g = i = Math.cos(C), 
            v = s = Math.sin(C), X && (C -= X * N, g = Math.cos(C), v = Math.sin(C), "simple" === S.skewType && (e = Math.tan((X - j) * N), 
            e = Math.sqrt(1 + e * e), g *= e, v *= e, S.skewY && (e = Math.tan(j * N), e = Math.sqrt(1 + e * e), 
            i *= e, s *= e))), n = -v, o = g; else {
                if (!(O || A || 1 !== M || I || z)) return void (P[At] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) translate3d(" : "translate3d(") + D + "px," + F + "px," + L + "px)" + (1 !== E || 1 !== R ? " scale(" + E + "," + R + ")" : ""));
                i = o = 1, n = s = 0;
            }
            u = 1, r = a = l = h = c = _ = 0, f = I ? -1 / I : 0, p = S.zOrigin, m = 1e-6, x = ",", 
            w = "0", C = O * N, C && (g = Math.cos(C), v = Math.sin(C), l = -v, c = f * -v, 
            r = i * v, a = s * v, u = g, f *= g, i *= g, s *= g), C = A * N, C && (g = Math.cos(C), 
            v = Math.sin(C), e = n * g + r * v, y = o * g + a * v, h = u * v, _ = f * v, r = n * -v + r * g, 
            a = o * -v + a * g, u *= g, f *= g, n = e, o = y), 1 !== M && (r *= M, a *= M, u *= M, 
            f *= M), 1 !== R && (n *= R, o *= R, h *= R, _ *= R), 1 !== E && (i *= E, s *= E, 
            l *= E, c *= E), (p || z) && (p && (D += r * -p, F += a * -p, L += u * -p + p), 
            z && (D += S.xOrigin - (S.xOrigin * i + S.yOrigin * n) + S.xOffset, F += S.yOrigin - (S.xOrigin * s + S.yOrigin * o) + S.yOffset), 
            m > D && D > -m && (D = w), m > F && F > -m && (F = w), m > L && L > -m && (L = 0)), 
            b = S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix3d(" : "matrix3d(", 
            b += (m > i && i > -m ? w : i) + x + (m > s && s > -m ? w : s) + x + (m > l && l > -m ? w : l), 
            b += x + (m > c && c > -m ? w : c) + x + (m > n && n > -m ? w : n) + x + (m > o && o > -m ? w : o), 
            A || O || 1 !== M ? (b += x + (m > h && h > -m ? w : h) + x + (m > _ && _ > -m ? w : _) + x + (m > r && r > -m ? w : r), 
            b += x + (m > a && a > -m ? w : a) + x + (m > u && u > -m ? w : u) + x + (m > f && f > -m ? w : f) + x) : b += ",0,0,0,0,1,0,", 
            b += D + x + F + x + L + x + (I ? 1 + -L / I : 1) + ")", P[At] = b;
        };
        h = Mt.prototype, h.x = h.y = h.z = h.skewX = h.skewY = h.rotation = h.rotationX = h.rotationY = h.zOrigin = h.xPercent = h.yPercent = h.xOffset = h.yOffset = 0, 
        h.scaleX = h.scaleY = h.scaleZ = 1, kt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
            parser: function(t, e, i, n, s, a, l) {
                if (n._lastParsedTransform === l) return s;
                n._lastParsedTransform = l;
                var h, u = l.scale && "function" == typeof l.scale ? l.scale : 0;
                "function" == typeof l[i] && (h = l[i], l[i] = e), u && (l.scale = u(g, t));
                var c, _, d, f, p, v, y, b, x, w = t._gsTransform, T = t.style, k = 1e-6, S = Ct.length, P = l, C = {}, A = "transformOrigin", O = Vt(t, r, !0, P.parseTransform), E = P.transform && ("function" == typeof P.transform ? P.transform(g, m) : P.transform);
                if (O.skewType = P.skewType || O.skewType || o.defaultSkewType, n._transform = O, 
                "rotationZ" in P && (P.rotation = P.rotationZ), E && "string" == typeof E && At) _ = H.style, 
                _[At] = E, _.display = "block", _.position = "absolute", -1 !== E.indexOf("%") && (_.width = J(t, "width"), 
                _.height = J(t, "height")), j.body.appendChild(H), c = Vt(H, null, !1), "simple" === O.skewType && (c.scaleY *= Math.cos(c.skewX * N)), 
                O.svg && (v = O.xOrigin, y = O.yOrigin, c.x -= O.xOffset, c.y -= O.yOffset, (P.transformOrigin || P.svgOrigin) && (E = {}, 
                zt(t, at(P.transformOrigin), E, P.svgOrigin, P.smoothOrigin, !0), v = E.xOrigin, 
                y = E.yOrigin, c.x -= E.xOffset - O.xOffset, c.y -= E.yOffset - O.yOffset), (v || y) && (b = Ht(H, !0), 
                c.x -= v - (v * b[0] + y * b[2]), c.y -= y - (v * b[1] + y * b[3]))), j.body.removeChild(H), 
                c.perspective || (c.perspective = O.perspective), null != P.xPercent && (c.xPercent = ht(P.xPercent, O.xPercent)), 
                null != P.yPercent && (c.yPercent = ht(P.yPercent, O.yPercent)); else if ("object" == typeof P) {
                    if (c = {
                        scaleX: ht(null != P.scaleX ? P.scaleX : P.scale, O.scaleX),
                        scaleY: ht(null != P.scaleY ? P.scaleY : P.scale, O.scaleY),
                        scaleZ: ht(P.scaleZ, O.scaleZ),
                        x: ht(P.x, O.x),
                        y: ht(P.y, O.y),
                        z: ht(P.z, O.z),
                        xPercent: ht(P.xPercent, O.xPercent),
                        yPercent: ht(P.yPercent, O.yPercent),
                        perspective: ht(P.transformPerspective, O.perspective)
                    }, p = P.directionalRotation, null != p) if ("object" == typeof p) for (_ in p) P[_] = p[_]; else P.rotation = p;
                    "string" == typeof P.x && -1 !== P.x.indexOf("%") && (c.x = 0, c.xPercent = ht(P.x, O.xPercent)), 
                    "string" == typeof P.y && -1 !== P.y.indexOf("%") && (c.y = 0, c.yPercent = ht(P.y, O.yPercent)), 
                    c.rotation = ut("rotation" in P ? P.rotation : "shortRotation" in P ? P.shortRotation + "_short" : O.rotation, O.rotation, "rotation", C), 
                    Rt && (c.rotationX = ut("rotationX" in P ? P.rotationX : "shortRotationX" in P ? P.shortRotationX + "_short" : O.rotationX || 0, O.rotationX, "rotationX", C), 
                    c.rotationY = ut("rotationY" in P ? P.rotationY : "shortRotationY" in P ? P.shortRotationY + "_short" : O.rotationY || 0, O.rotationY, "rotationY", C)), 
                    c.skewX = ut(P.skewX, O.skewX), c.skewY = ut(P.skewY, O.skewY);
                }
                for (Rt && null != P.force3D && (O.force3D = P.force3D, f = !0), d = O.force3D || O.z || O.rotationX || O.rotationY || c.z || c.rotationX || c.rotationY || c.perspective, 
                d || null == P.scale || (c.scaleZ = 1); --S > -1; ) x = Ct[S], E = c[x] - O[x], 
                (E > k || -k > E || null != P[x] || null != I[x]) && (f = !0, s = new yt(O, x, O[x], E, s), 
                x in C && (s.e = C[x]), s.xs0 = 0, s.plugin = a, n._overwriteProps.push(s.n));
                return E = P.transformOrigin, O.svg && (E || P.svgOrigin) && (v = O.xOffset, y = O.yOffset, 
                zt(t, at(E), c, P.svgOrigin, P.smoothOrigin), s = bt(O, "xOrigin", (w ? O : c).xOrigin, c.xOrigin, s, A), 
                s = bt(O, "yOrigin", (w ? O : c).yOrigin, c.yOrigin, s, A), (v !== O.xOffset || y !== O.yOffset) && (s = bt(O, "xOffset", w ? v : O.xOffset, O.xOffset, s, A), 
                s = bt(O, "yOffset", w ? y : O.yOffset, O.yOffset, s, A)), E = "0px 0px"), (E || Rt && d && O.zOrigin) && (At ? (f = !0, 
                x = Et, E = (E || J(t, x, r, !1, "50% 50%")) + "", s = new yt(T, x, 0, 0, s, -1, A), 
                s.b = T[x], s.plugin = a, Rt ? (_ = O.zOrigin, E = E.split(" "), O.zOrigin = (E.length > 2 && (0 === _ || "0px" !== E[2]) ? parseFloat(E[2]) : _) || 0, 
                s.xs0 = s.e = E[0] + " " + (E[1] || "50%") + " 0px", s = new yt(O, "zOrigin", 0, 0, s, -1, s.n), 
                s.b = _, s.xs0 = s.e = O.zOrigin) : s.xs0 = s.e = E) : at(E + "", O)), f && (n._transformType = O.svg && Pt || !d && 3 !== this._transformType ? 2 : 3), 
                h && (l[i] = h), u && (l.scale = u), s;
            },
            prefix: !0
        }), kt("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset"
        }), kt("borderRadius", {
            defaultValue: "0px",
            parser: function(t, e, i, s, o, a) {
                e = this.format(e);
                var l, h, u, c, _, d, f, p, m, g, v, y, b, x, w, T, k = [ "borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius" ], S = t.style;
                for (m = parseFloat(t.offsetWidth), g = parseFloat(t.offsetHeight), l = e.split(" "), 
                h = 0; h < k.length; h++) this.p.indexOf("border") && (k[h] = K(k[h])), _ = c = J(t, k[h], r, !1, "0px"), 
                -1 !== _.indexOf(" ") && (c = _.split(" "), _ = c[0], c = c[1]), d = u = l[h], f = parseFloat(_), 
                y = _.substr((f + "").length), b = "=" === d.charAt(1), b ? (p = parseInt(d.charAt(0) + "1", 10), 
                d = d.substr(2), p *= parseFloat(d), v = d.substr((p + "").length - (0 > p ? 1 : 0)) || "") : (p = parseFloat(d), 
                v = d.substr((p + "").length)), "" === v && (v = n[i] || y), v !== y && (x = tt(t, "borderLeft", f, y), 
                w = tt(t, "borderTop", f, y), "%" === v ? (_ = x / m * 100 + "%", c = w / g * 100 + "%") : "em" === v ? (T = tt(t, "borderLeft", 1, "em"), 
                _ = x / T + "em", c = w / T + "em") : (_ = x + "px", c = w + "px"), b && (d = parseFloat(_) + p + v, 
                u = parseFloat(c) + p + v)), o = xt(S, k[h], _ + " " + c, d + " " + u, !1, "0px", o);
                return o;
            },
            prefix: !0,
            formatter: mt("0px 0px 0px 0px", !1, !0)
        }), kt("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
            defaultValue: "0px",
            parser: function(t, e, i, n, s, o) {
                return xt(t.style, i, this.format(J(t, i, r, !1, "0px 0px")), this.format(e), !1, "0px", s);
            },
            prefix: !0,
            formatter: mt("0px 0px", !1, !0)
        }), kt("backgroundPosition", {
            defaultValue: "0 0",
            parser: function(t, e, i, n, s, o) {
                var a, l, h, u, c, _, d = "background-position", f = r || $(t, null), m = this.format((f ? p ? f.getPropertyValue(d + "-x") + " " + f.getPropertyValue(d + "-y") : f.getPropertyValue(d) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"), g = this.format(e);
                if (-1 !== m.indexOf("%") != (-1 !== g.indexOf("%")) && g.split(",").length < 2 && (_ = J(t, "backgroundImage").replace(O, ""), 
                _ && "none" !== _)) {
                    for (a = m.split(" "), l = g.split(" "), V.setAttribute("src", _), h = 2; --h > -1; ) m = a[h], 
                    u = -1 !== m.indexOf("%"), u !== (-1 !== l[h].indexOf("%")) && (c = 0 === h ? t.offsetWidth - V.width : t.offsetHeight - V.height, 
                    a[h] = u ? parseFloat(m) / 100 * c + "px" : parseFloat(m) / c * 100 + "%");
                    m = a.join(" ");
                }
                return this.parseComplex(t.style, m, g, s, o);
            },
            formatter: at
        }), kt("backgroundSize", {
            defaultValue: "0 0",
            formatter: function(t) {
                return t += "", "co" === t.substr(0, 2) ? t : at(-1 === t.indexOf(" ") ? t + " " + t : t);
            }
        }), kt("perspective", {
            defaultValue: "0px",
            prefix: !0
        }), kt("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: !0
        }), kt("transformStyle", {
            prefix: !0
        }), kt("backfaceVisibility", {
            prefix: !0
        }), kt("userSelect", {
            prefix: !0
        }), kt("margin", {
            parser: gt("marginTop,marginRight,marginBottom,marginLeft")
        }), kt("padding", {
            parser: gt("paddingTop,paddingRight,paddingBottom,paddingLeft")
        }), kt("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function(t, e, i, n, s, o) {
                var a, l, h;
                return 9 > p ? (l = t.currentStyle, h = 8 > p ? " " : ",", a = "rect(" + l.clipTop + h + l.clipRight + h + l.clipBottom + h + l.clipLeft + ")", 
                e = this.format(e).split(",").join(h)) : (a = this.format(J(t, this.p, r, !1, this.dflt)), 
                e = this.format(e)), this.parseComplex(t.style, a, e, s, o);
            }
        }), kt("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0
        }), kt("autoRound,strictUnits", {
            parser: function(t, e, i, n, r) {
                return r;
            }
        }), kt("border", {
            defaultValue: "0px solid #000",
            parser: function(t, e, i, n, s, o) {
                var a = J(t, "borderTopWidth", r, !1, "0px"), l = this.format(e).split(" "), h = l[0].replace(w, "");
                return "px" !== h && (a = parseFloat(a) / tt(t, "borderTopWidth", 1, h) + h), this.parseComplex(t.style, this.format(a + " " + J(t, "borderTopStyle", r, !1, "solid") + " " + J(t, "borderTopColor", r, !1, "#000")), l.join(" "), s, o);
            },
            color: !0,
            formatter: function(t) {
                var e = t.split(" ");
                return e[0] + " " + (e[1] || "solid") + " " + (t.match(pt) || [ "#000" ])[0];
            }
        }), kt("borderWidth", {
            parser: gt("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
        }), kt("float,cssFloat,styleFloat", {
            parser: function(t, e, i, n, r, s) {
                var o = t.style, a = "cssFloat" in o ? "cssFloat" : "styleFloat";
                return new yt(o, a, 0, 0, r, -1, i, !1, 0, o[a], e);
            }
        });
        var Gt = function(t) {
            var e, i = this.t, n = i.filter || J(this.data, "filter") || "", r = this.s + this.c * t | 0;
            100 === r && (-1 === n.indexOf("atrix(") && -1 === n.indexOf("radient(") && -1 === n.indexOf("oader(") ? (i.removeAttribute("filter"), 
            e = !J(this.data, "filter")) : (i.filter = n.replace(S, ""), e = !0)), e || (this.xn1 && (i.filter = n = n || "alpha(opacity=" + r + ")"), 
            -1 === n.indexOf("pacity") ? 0 === r && this.xn1 || (i.filter = n + " alpha(opacity=" + r + ")") : i.filter = n.replace(T, "opacity=" + r));
        };
        kt("opacity,alpha,autoAlpha", {
            defaultValue: "1",
            parser: function(t, e, i, n, s, o) {
                var a = parseFloat(J(t, "opacity", r, !1, "1")), l = t.style, h = "autoAlpha" === i;
                return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + a), 
                h && 1 === a && "hidden" === J(t, "visibility", r) && 0 !== e && (a = 0), G ? s = new yt(l, "opacity", a, e - a, s) : (s = new yt(l, "opacity", 100 * a, 100 * (e - a), s), 
                s.xn1 = h ? 1 : 0, l.zoom = 1, s.type = 2, s.b = "alpha(opacity=" + s.s + ")", s.e = "alpha(opacity=" + (s.s + s.c) + ")", 
                s.data = t, s.plugin = o, s.setRatio = Gt), h && (s = new yt(l, "visibility", 0, 0, s, -1, null, !1, 0, 0 !== a ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), 
                s.xs0 = "inherit", n._overwriteProps.push(s.n), n._overwriteProps.push(i)), s;
            }
        });
        var Wt = function(t, e) {
            e && (t.removeProperty ? (("ms" === e.substr(0, 2) || "webkit" === e.substr(0, 6)) && (e = "-" + e), 
            t.removeProperty(e.replace(C, "-$1").toLowerCase())) : t.removeAttribute(e));
        }, qt = function(t) {
            if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                this.t.setAttribute("class", 0 === t ? this.b : this.e);
                for (var e = this.data, i = this.t.style; e; ) e.v ? i[e.p] = e.v : Wt(i, e.p), 
                e = e._next;
                1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null);
            } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e);
        };
        kt("className", {
            parser: function(t, e, n, s, o, a, l) {
                var h, u, c, _, d, f = t.getAttribute("class") || "", p = t.style.cssText;
                if (o = s._classNamePT = new yt(t, n, 0, 0, o, 2), o.setRatio = qt, o.pr = -11, 
                i = !0, o.b = f, u = it(t, r), c = t._gsClassPT) {
                    for (_ = {}, d = c.data; d; ) _[d.p] = 1, d = d._next;
                    c.setRatio(1);
                }
                return t._gsClassPT = o, o.e = "=" !== e.charAt(1) ? e : f.replace(new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), 
                t.setAttribute("class", o.e), h = nt(t, u, it(t), l, _), t.setAttribute("class", f), 
                o.data = h.firstMPT, t.style.cssText = p, o = o.xfirst = s.parse(t, h.difs, o, a);
            }
        });
        var Qt = function(t) {
            if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                var e, i, n, r, s, o = this.t.style, a = l.transform.parse;
                if ("all" === this.e) o.cssText = "", r = !0; else for (e = this.e.split(" ").join("").split(","), 
                n = e.length; --n > -1; ) i = e[n], l[i] && (l[i].parse === a ? r = !0 : i = "transformOrigin" === i ? Et : l[i].p), 
                Wt(o, i);
                r && (Wt(o, At), s = this.t._gsTransform, s && (s.svg && (this.t.removeAttribute("data-svg-origin"), 
                this.t.removeAttribute("transform")), delete this.t._gsTransform));
            }
        };
        for (kt("clearProps", {
            parser: function(t, e, n, r, s) {
                return s = new yt(t, n, 0, 0, s, 2), s.setRatio = Qt, s.e = e, s.pr = -10, s.data = r._tween, 
                i = !0, s;
            }
        }), h = "bezier,throwProps,physicsProps,physics2D".split(","), wt = h.length; wt--; ) St(h[wt]);
        h = o.prototype, h._firstPT = h._lastParsedTransform = h._transform = null, h._onInitTween = function(t, e, a, h) {
            if (!t.nodeType) return !1;
            this._target = m = t, this._tween = a, this._vars = e, g = h, u = e.autoRound, i = !1, 
            n = e.suffixMap || o.suffixMap, r = $(t, ""), s = this._overwriteProps;
            var d, p, v, y, b, x, w, T, S, P = t.style;
            if (c && "" === P.zIndex && (d = J(t, "zIndex", r), ("auto" === d || "" === d) && this._addLazySet(P, "zIndex", 0)), 
            "string" == typeof e && (y = P.cssText, d = it(t, r), P.cssText = y + ";" + e, d = nt(t, d, it(t)).difs, 
            !G && k.test(e) && (d.opacity = parseFloat(RegExp.$1)), e = d, P.cssText = y), e.className ? this._firstPT = p = l.className.parse(t, e.className, "className", this, null, null, e) : this._firstPT = p = this.parse(t, e, null), 
            this._transformType) {
                for (S = 3 === this._transformType, At ? _ && (c = !0, "" === P.zIndex && (w = J(t, "zIndex", r), 
                ("auto" === w || "" === w) && this._addLazySet(P, "zIndex", 0)), f && this._addLazySet(P, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (S ? "visible" : "hidden"))) : P.zoom = 1, 
                v = p; v && v._next; ) v = v._next;
                T = new yt(t, "transform", 0, 0, null, 2), this._linkCSSP(T, null, v), T.setRatio = At ? Yt : Ut, 
                T.data = this._transform || Vt(t, r, !0), T.tween = a, T.pr = -1, s.pop();
            }
            if (i) {
                for (;p; ) {
                    for (x = p._next, v = y; v && v.pr > p.pr; ) v = v._next;
                    (p._prev = v ? v._prev : b) ? p._prev._next = p : y = p, (p._next = v) ? v._prev = p : b = p, 
                    p = x;
                }
                this._firstPT = y;
            }
            return !0;
        }, h.parse = function(t, e, i, s) {
            var o, a, h, c, _, d, f, p, v, y, b = t.style;
            for (o in e) {
                if (d = e[o], "function" == typeof d && (d = d(g, m)), a = l[o]) i = a.parse(t, d, o, this, i, s, e); else {
                    if ("--" === o.substr(0, 2)) {
                        this._tween._propLookup[o] = this._addTween.call(this._tween, t.style, "setProperty", $(t).getPropertyValue(o) + "", d + "", o, !1, o);
                        continue;
                    }
                    _ = J(t, o, r) + "", v = "string" == typeof d, "color" === o || "fill" === o || "stroke" === o || -1 !== o.indexOf("Color") || v && P.test(d) ? (v || (d = dt(d), 
                    d = (d.length > 3 ? "rgba(" : "rgb(") + d.join(",") + ")"), i = xt(b, o, _, d, !0, "transparent", i, 0, s)) : v && L.test(d) ? i = xt(b, o, _, d, !0, null, i, 0, s) : (h = parseFloat(_), 
                    f = h || 0 === h ? _.substr((h + "").length) : "", ("" === _ || "auto" === _) && ("width" === o || "height" === o ? (h = ot(t, o, r), 
                    f = "px") : "left" === o || "top" === o ? (h = et(t, o, r), f = "px") : (h = "opacity" !== o ? 0 : 1, 
                    f = "")), y = v && "=" === d.charAt(1), y ? (c = parseInt(d.charAt(0) + "1", 10), 
                    d = d.substr(2), c *= parseFloat(d), p = d.replace(w, "")) : (c = parseFloat(d), 
                    p = v ? d.replace(w, "") : ""), "" === p && (p = o in n ? n[o] : f), d = c || 0 === c ? (y ? c + h : c) + p : e[o], 
                    f !== p && ("" !== p || "lineHeight" === o) && (c || 0 === c) && h && (h = tt(t, o, h, f), 
                    "%" === p ? (h /= tt(t, o, 100, "%") / 100, e.strictUnits !== !0 && (_ = h + "%")) : "em" === p || "rem" === p || "vw" === p || "vh" === p ? h /= tt(t, o, 1, p) : "px" !== p && (c = tt(t, o, c, p), 
                    p = "px"), y && (c || 0 === c) && (d = c + h + p)), y && (c += h), !h && 0 !== h || !c && 0 !== c ? void 0 !== b[o] && (d || d + "" != "NaN" && null != d) ? (i = new yt(b, o, c || h || 0, 0, i, -1, o, !1, 0, _, d), 
                    i.xs0 = "none" !== d || "display" !== o && -1 === o.indexOf("Style") ? d : _) : q("invalid " + o + " tween value: " + e[o]) : (i = new yt(b, o, h, c - h, i, 0, o, u !== !1 && ("px" === p || "zIndex" === o), 0, _, d), 
                    i.xs0 = p));
                }
                s && i && !i.plugin && (i.plugin = s);
            }
            return i;
        }, h.setRatio = function(t) {
            var e, i, n, r = this._firstPT, s = 1e-6;
            if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time) if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6) for (;r; ) {
                if (e = r.c * t + r.s, r.r ? e = r.r(e) : s > e && e > -s && (e = 0), r.type) if (1 === r.type) if (n = r.l, 
                2 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2; else if (3 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3; else if (4 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4; else if (5 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5; else {
                    for (i = r.xs0 + e + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                    r.t[r.p] = i;
                } else -1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t); else r.t[r.p] = e + r.xs0;
                r = r._next;
            } else for (;r; ) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t), r = r._next; else for (;r; ) {
                if (2 !== r.type) if (r.r && -1 !== r.type) if (e = r.r(r.s + r.c), r.type) {
                    if (1 === r.type) {
                        for (n = r.l, i = r.xs0 + e + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                        r.t[r.p] = i;
                    }
                } else r.t[r.p] = e + r.xs0; else r.t[r.p] = r.e; else r.setRatio(t);
                r = r._next;
            }
        }, h._enableTransforms = function(t) {
            this._transform = this._transform || Vt(this._target, r, !0), this._transformType = this._transform.svg && Pt || !t && 3 !== this._transformType ? 2 : 3;
        };
        var Zt = function(t) {
            this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0);
        };
        h._addLazySet = function(t, e, i) {
            var n = this._firstPT = new yt(t, e, 0, 0, this._firstPT, 2);
            n.e = i, n.setRatio = Zt, n.data = this;
        }, h._linkCSSP = function(t, e, i, n) {
            return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, 
            n = !0), i ? i._next = t : n || null !== this._firstPT || (this._firstPT = t), t._next = e, 
            t._prev = i), t;
        }, h._mod = function(t) {
            for (var e = this._firstPT; e; ) "function" == typeof t[e.p] && (e.r = t[e.p]), 
            e = e._next;
        }, h._kill = function(e) {
            var i, n, r, s = e;
            if (e.autoAlpha || e.alpha) {
                s = {};
                for (n in e) s[n] = e[n];
                s.opacity = 1, s.autoAlpha && (s.visibility = 1);
            }
            for (e.className && (i = this._classNamePT) && (r = i.xfirst, r && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), 
            i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), 
            i = this._firstPT; i; ) i.plugin && i.plugin !== n && i.plugin._kill && (i.plugin._kill(e), 
            n = i.plugin), i = i._next;
            return t.prototype._kill.call(this, s);
        };
        var Kt = function(t, e, i) {
            var n, r, s, o;
            if (t.slice) for (r = t.length; --r > -1; ) Kt(t[r], e, i); else for (n = t.childNodes, 
            r = n.length; --r > -1; ) s = n[r], o = s.type, s.style && (e.push(it(s)), i && i.push(s)), 
            1 !== o && 9 !== o && 11 !== o || !s.childNodes.length || Kt(s, e, i);
        };
        return o.cascadeTo = function(t, i, n) {
            var r, s, o, a, l = e.to(t, i, n), h = [ l ], u = [], c = [], _ = [], d = e._internals.reservedProps;
            for (t = l._targets || l.target, Kt(t, u, _), l.render(i, !0, !0), Kt(t, c), l.render(0, !0, !0), 
            l._enabled(!0), r = _.length; --r > -1; ) if (s = nt(_[r], u[r], c[r]), s.firstMPT) {
                s = s.difs;
                for (o in n) d[o] && (s[o] = n[o]);
                a = {};
                for (o in s) a[o] = u[r][o];
                h.push(e.fromTo(_[r], i, a, s));
            }
            return h;
        }, t.activate([ o ]), o;
    }, !0), function() {
        var t = _gsScope._gsDefine.plugin({
            propName: "roundProps",
            version: "1.7.0",
            priority: -1,
            API: 2,
            init: function(t, e, i) {
                return this._tween = i, !0;
            }
        }), e = function(t) {
            var e = 1 > t ? Math.pow(10, (t + "").length - 2) : 1;
            return function(i) {
                return (Math.round(i / t) * t * e | 0) / e;
            };
        }, i = function(t, e) {
            for (;t; ) t.f || t.blob || (t.m = e || Math.round), t = t._next;
        }, n = t.prototype;
        n._onInitAllProps = function() {
            var t, n, r, s, o = this._tween, a = o.vars.roundProps, l = {}, h = o._propLookup.roundProps;
            if ("object" != typeof a || a.push) for ("string" == typeof a && (a = a.split(",")), 
            r = a.length; --r > -1; ) l[a[r]] = Math.round; else for (s in a) l[s] = e(a[s]);
            for (s in l) for (t = o._firstPT; t; ) n = t._next, t.pg ? t.t._mod(l) : t.n === s && (2 === t.f && t.t ? i(t.t._firstPT, l[s]) : (this._add(t.t, s, t.s, t.c, l[s]), 
            n && (n._prev = t._prev), t._prev ? t._prev._next = n : o._firstPT === t && (o._firstPT = n), 
            t._next = t._prev = null, o._propLookup[s] = h)), t = n;
            return !1;
        }, n._add = function(t, e, i, n, r) {
            this._addTween(t, e, i, i + n, e, r || Math.round), this._overwriteProps.push(e);
        };
    }(), function() {
        _gsScope._gsDefine.plugin({
            propName: "attr",
            API: 2,
            version: "0.6.1",
            init: function(t, e, i, n) {
                var r, s;
                if ("function" != typeof t.setAttribute) return !1;
                for (r in e) s = e[r], "function" == typeof s && (s = s(n, t)), this._addTween(t, "setAttribute", t.getAttribute(r) + "", s + "", r, !1, r), 
                this._overwriteProps.push(r);
                return !0;
            }
        });
    }(), _gsScope._gsDefine.plugin({
        propName: "directionalRotation",
        version: "0.3.1",
        API: 2,
        init: function(t, e, i, n) {
            "object" != typeof e && (e = {
                rotation: e
            }), this.finals = {};
            var r, s, o, a, l, h, u = e.useRadians === !0 ? 2 * Math.PI : 360, c = 1e-6;
            for (r in e) "useRadians" !== r && (a = e[r], "function" == typeof a && (a = a(n, t)), 
            h = (a + "").split("_"), s = h[0], o = parseFloat("function" != typeof t[r] ? t[r] : t[r.indexOf("set") || "function" != typeof t["get" + r.substr(3)] ? r : "get" + r.substr(3)]()), 
            a = this.finals[r] = "string" == typeof s && "=" === s.charAt(1) ? o + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)) : Number(s) || 0, 
            l = a - o, h.length && (s = h.join("_"), -1 !== s.indexOf("short") && (l %= u, l !== l % (u / 2) && (l = 0 > l ? l + u : l - u)), 
            -1 !== s.indexOf("_cw") && 0 > l ? l = (l + 9999999999 * u) % u - (l / u | 0) * u : -1 !== s.indexOf("ccw") && l > 0 && (l = (l - 9999999999 * u) % u - (l / u | 0) * u)), 
            (l > c || -c > l) && (this._addTween(t, r, o, o + l, r), this._overwriteProps.push(r)));
            return !0;
        },
        set: function(t) {
            var e;
            if (1 !== t) this._super.setRatio.call(this, t); else for (e = this._firstPT; e; ) e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], 
            e = e._next;
        }
    })._autoCSS = !0, _gsScope._gsDefine("easing.Back", [ "easing.Ease" ], function(t) {
        var e, i, n, r, s = _gsScope.GreenSockGlobals || _gsScope, o = s.com.greensock, a = 2 * Math.PI, l = Math.PI / 2, h = o._class, u = function(e, i) {
            var n = h("easing." + e, function() {}, !0), r = n.prototype = new t();
            return r.constructor = n, r.getRatio = i, n;
        }, c = t.register || function() {}, _ = function(t, e, i, n, r) {
            var s = h("easing." + t, {
                easeOut: new e(),
                easeIn: new i(),
                easeInOut: new n()
            }, !0);
            return c(s, t), s;
        }, d = function(t, e, i) {
            this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t);
        }, f = function(e, i) {
            var n = h("easing." + e, function(t) {
                this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1;
            }, !0), r = n.prototype = new t();
            return r.constructor = n, r.getRatio = i, r.config = function(t) {
                return new n(t);
            }, n;
        }, p = _("Back", f("BackOut", function(t) {
            return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1;
        }), f("BackIn", function(t) {
            return t * t * ((this._p1 + 1) * t - this._p1);
        }), f("BackInOut", function(t) {
            return (t *= 2) < 1 ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2);
        })), m = h("easing.SlowMo", function(t, e, i) {
            e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, 
            this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0;
        }, !0), g = m.prototype = new t();
        return g.constructor = m, g.getRatio = function(t) {
            var e = t + (.5 - t) * this._p;
            return t < this._p1 ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 === t ? 0 : 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e;
        }, m.ease = new m(.7, .7), g.config = m.config = function(t, e, i) {
            return new m(t, e, i);
        }, e = h("easing.SteppedEase", function(t, e) {
            t = t || 1, this._p1 = 1 / t, this._p2 = t + (e ? 0 : 1), this._p3 = e ? 1 : 0;
        }, !0), g = e.prototype = new t(), g.constructor = e, g.getRatio = function(t) {
            return 0 > t ? t = 0 : t >= 1 && (t = .999999999), ((this._p2 * t | 0) + this._p3) * this._p1;
        }, g.config = e.config = function(t, i) {
            return new e(t, i);
        }, i = h("easing.ExpoScaleEase", function(t, e, i) {
            this._p1 = Math.log(e / t), this._p2 = e - t, this._p3 = t, this._ease = i;
        }, !0), g = i.prototype = new t(), g.constructor = i, g.getRatio = function(t) {
            return this._ease && (t = this._ease.getRatio(t)), (this._p3 * Math.exp(this._p1 * t) - this._p3) / this._p2;
        }, g.config = i.config = function(t, e, n) {
            return new i(t, e, n);
        }, n = h("easing.RoughEase", function(e) {
            e = e || {};
            for (var i, n, r, s, o, a, l = e.taper || "none", h = [], u = 0, c = 0 | (e.points || 20), _ = c, f = e.randomize !== !1, p = e.clamp === !0, m = e.template instanceof t ? e.template : null, g = "number" == typeof e.strength ? .4 * e.strength : .4; --_ > -1; ) i = f ? Math.random() : 1 / c * _, 
            n = m ? m.getRatio(i) : i, "none" === l ? r = g : "out" === l ? (s = 1 - i, r = s * s * g) : "in" === l ? r = i * i * g : .5 > i ? (s = 2 * i, 
            r = s * s * .5 * g) : (s = 2 * (1 - i), r = s * s * .5 * g), f ? n += Math.random() * r - .5 * r : _ % 2 ? n += .5 * r : n -= .5 * r, 
            p && (n > 1 ? n = 1 : 0 > n && (n = 0)), h[u++] = {
                x: i,
                y: n
            };
            for (h.sort(function(t, e) {
                return t.x - e.x;
            }), a = new d(1, 1, null), _ = c; --_ > -1; ) o = h[_], a = new d(o.x, o.y, a);
            this._prev = new d(0, 0, 0 !== a.t ? a : a.next);
        }, !0), g = n.prototype = new t(), g.constructor = n, g.getRatio = function(t) {
            var e = this._prev;
            if (t > e.t) {
                for (;e.next && t >= e.t; ) e = e.next;
                e = e.prev;
            } else for (;e.prev && t <= e.t; ) e = e.prev;
            return this._prev = e, e.v + (t - e.t) / e.gap * e.c;
        }, g.config = function(t) {
            return new n(t);
        }, n.ease = new n(), _("Bounce", u("BounceOut", function(t) {
            return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
        }), u("BounceIn", function(t) {
            return (t = 1 - t) < 1 / 2.75 ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375);
        }), u("BounceInOut", function(t) {
            var e = .5 > t;
            return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, 
            e ? .5 * (1 - t) : .5 * t + .5;
        })), _("Circ", u("CircOut", function(t) {
            return Math.sqrt(1 - (t -= 1) * t);
        }), u("CircIn", function(t) {
            return -(Math.sqrt(1 - t * t) - 1);
        }), u("CircInOut", function(t) {
            return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        })), r = function(e, i, n) {
            var r = h("easing." + e, function(t, e) {
                this._p1 = t >= 1 ? t : 1, this._p2 = (e || n) / (1 > t ? t : 1), this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0), 
                this._p2 = a / this._p2;
            }, !0), s = r.prototype = new t();
            return s.constructor = r, s.getRatio = i, s.config = function(t, e) {
                return new r(t, e);
            }, r;
        }, _("Elastic", r("ElasticOut", function(t) {
            return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * this._p2) + 1;
        }, .3), r("ElasticIn", function(t) {
            return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2));
        }, .3), r("ElasticInOut", function(t) {
            return (t *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * .5 + 1;
        }, .45)), _("Expo", u("ExpoOut", function(t) {
            return 1 - Math.pow(2, -10 * t);
        }), u("ExpoIn", function(t) {
            return Math.pow(2, 10 * (t - 1)) - .001;
        }), u("ExpoInOut", function(t) {
            return (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)));
        })), _("Sine", u("SineOut", function(t) {
            return Math.sin(t * l);
        }), u("SineIn", function(t) {
            return -Math.cos(t * l) + 1;
        }), u("SineInOut", function(t) {
            return -.5 * (Math.cos(Math.PI * t) - 1);
        })), h("easing.EaseLookup", {
            find: function(e) {
                return t.map[e];
            }
        }, !0), c(s.SlowMo, "SlowMo", "ease,"), c(n, "RoughEase", "ease,"), c(e, "SteppedEase", "ease,"), 
        p;
    }, !0);
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), function(t, e) {
    "use strict";
    var i = {}, n = t.document, r = t.GreenSockGlobals = t.GreenSockGlobals || t, s = r[e];
    if (s) return "undefined" != typeof module && module.exports && (module.exports = s), 
    s;
    var o, a, l, h, u, c = function(t) {
        var e, i = t.split("."), n = r;
        for (e = 0; e < i.length; e++) n[i[e]] = n = n[i[e]] || {};
        return n;
    }, _ = c("com.greensock"), d = 1e-10, f = function(t) {
        var e, i = [], n = t.length;
        for (e = 0; e !== n; i.push(t[e++])) ;
        return i;
    }, p = function() {}, m = function() {
        var t = Object.prototype.toString, e = t.call([]);
        return function(i) {
            return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e);
        };
    }(), g = {}, v = function(n, s, o, a) {
        this.sc = g[n] ? g[n].sc : [], g[n] = this, this.gsClass = null, this.func = o;
        var l = [];
        this.check = function(h) {
            for (var u, _, d, f, p = s.length, m = p; --p > -1; ) (u = g[s[p]] || new v(s[p], [])).gsClass ? (l[p] = u.gsClass, 
            m--) : h && u.sc.push(this);
            if (0 === m && o) {
                if (_ = ("com.greensock." + n).split("."), d = _.pop(), f = c(_.join("."))[d] = this.gsClass = o.apply(o, l), 
                a) if (r[d] = i[d] = f, "undefined" != typeof module && module.exports) if (n === e) {
                    module.exports = i[e] = f;
                    for (p in i) f[p] = i[p];
                } else i[e] && (i[e][d] = f); else "function" == typeof define && define.amd && define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + n.split(".").pop(), [], function() {
                    return f;
                });
                for (p = 0; p < this.sc.length; p++) this.sc[p].check();
            }
        }, this.check(!0);
    }, y = t._gsDefine = function(t, e, i, n) {
        return new v(t, e, i, n);
    }, b = _._class = function(t, e, i) {
        return e = e || function() {}, y(t, [], function() {
            return e;
        }, i), e;
    };
    y.globals = r;
    var x = [ 0, 0, 1, 1 ], w = b("easing.Ease", function(t, e, i, n) {
        this._func = t, this._type = i || 0, this._power = n || 0, this._params = e ? x.concat(e) : x;
    }, !0), T = w.map = {}, k = w.register = function(t, e, i, n) {
        for (var r, s, o, a, l = e.split(","), h = l.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --h > -1; ) for (s = l[h], 
        r = n ? b("easing." + s, null, !0) : _.easing[s] || {}, o = u.length; --o > -1; ) a = u[o], 
        T[s + "." + a] = T[a + s] = r[a] = t.getRatio ? t : t[a] || new t();
    };
    for (l = w.prototype, l._calcEnd = !1, l.getRatio = function(t) {
        if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
        var e = this._type, i = this._power, n = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
        return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n), 
        1 === e ? 1 - n : 2 === e ? n : .5 > t ? n / 2 : 1 - n / 2;
    }, o = [ "Linear", "Quad", "Cubic", "Quart", "Quint,Strong" ], a = o.length; --a > -1; ) l = o[a] + ",Power" + a, 
    k(new w(null, null, 1, a), l, "easeOut", !0), k(new w(null, null, 2, a), l, "easeIn" + (0 === a ? ",easeNone" : "")), 
    k(new w(null, null, 3, a), l, "easeInOut");
    T.linear = _.easing.Linear.easeIn, T.swing = _.easing.Quad.easeInOut;
    var S = b("events.EventDispatcher", function(t) {
        this._listeners = {}, this._eventTarget = t || this;
    });
    l = S.prototype, l.addEventListener = function(t, e, i, n, r) {
        r = r || 0;
        var s, o, a = this._listeners[t], l = 0;
        for (this !== h || u || h.wake(), null == a && (this._listeners[t] = a = []), o = a.length; --o > -1; ) s = a[o], 
        s.c === e && s.s === i ? a.splice(o, 1) : 0 === l && s.pr < r && (l = o + 1);
        a.splice(l, 0, {
            c: e,
            s: i,
            up: n,
            pr: r
        });
    }, l.removeEventListener = function(t, e) {
        var i, n = this._listeners[t];
        if (n) for (i = n.length; --i > -1; ) if (n[i].c === e) return void n.splice(i, 1);
    }, l.dispatchEvent = function(t) {
        var e, i, n, r = this._listeners[t];
        if (r) for (e = r.length, e > 1 && (r = r.slice(0)), i = this._eventTarget; --e > -1; ) n = r[e], 
        n && (n.up ? n.c.call(n.s || i, {
            type: t,
            target: i
        }) : n.c.call(n.s || i));
    };
    var P = t.requestAnimationFrame, C = t.cancelAnimationFrame, A = Date.now || function() {
        return new Date().getTime();
    }, O = A();
    for (o = [ "ms", "moz", "webkit", "o" ], a = o.length; --a > -1 && !P; ) P = t[o[a] + "RequestAnimationFrame"], 
    C = t[o[a] + "CancelAnimationFrame"] || t[o[a] + "CancelRequestAnimationFrame"];
    b("Ticker", function(t, e) {
        var i, r, s, o, a, l = this, c = A(), _ = e !== !1 && P ? "auto" : !1, f = 500, m = 33, g = "tick", v = function(t) {
            var e, n, h = A() - O;
            h > f && (c += h - m), O += h, l.time = (O - c) / 1e3, e = l.time - a, (!i || e > 0 || t === !0) && (l.frame++, 
            a += e + (e >= o ? .004 : o - e), n = !0), t !== !0 && (s = r(v)), n && l.dispatchEvent(g);
        };
        S.call(l), l.time = l.frame = 0, l.tick = function() {
            v(!0);
        }, l.lagSmoothing = function(t, e) {
            return arguments.length ? (f = t || 1 / d, void (m = Math.min(e, f, 0))) : 1 / d > f;
        }, l.sleep = function() {
            null != s && (_ && C ? C(s) : clearTimeout(s), r = p, s = null, l === h && (u = !1));
        }, l.wake = function(t) {
            null !== s ? l.sleep() : t ? c += -O + (O = A()) : l.frame > 10 && (O = A() - f + 5), 
            r = 0 === i ? p : _ && P ? P : function(t) {
                return setTimeout(t, 1e3 * (a - l.time) + 1 | 0);
            }, l === h && (u = !0), v(2);
        }, l.fps = function(t) {
            return arguments.length ? (i = t, o = 1 / (i || 60), a = this.time + o, void l.wake()) : i;
        }, l.useRAF = function(t) {
            return arguments.length ? (l.sleep(), _ = t, void l.fps(i)) : _;
        }, l.fps(t), setTimeout(function() {
            "auto" === _ && l.frame < 5 && "hidden" !== (n || {}).visibilityState && l.useRAF(!1);
        }, 1500);
    }), l = _.Ticker.prototype = new _.events.EventDispatcher(), l.constructor = _.Ticker;
    var E = b("core.Animation", function(t, e) {
        if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, 
        this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, 
        this._reversed = e.reversed === !0, Z) {
            u || h.wake();
            var i = this.vars.useFrames ? Q : Z;
            i.add(this, i._time), this.vars.paused && this.paused(!0);
        }
    });
    h = E.ticker = new _.Ticker(), l = E.prototype, l._dirty = l._gc = l._initted = l._paused = !1, 
    l._totalTime = l._time = 0, l._rawPrevTime = -1, l._next = l._last = l._onUpdate = l._timeline = l.timeline = null, 
    l._paused = !1;
    var R = function() {
        u && A() - O > 2e3 && ("hidden" !== (n || {}).visibilityState || !h.lagSmoothing()) && h.wake();
        var t = setTimeout(R, 2e3);
        t.unref && t.unref();
    };
    R(), l.play = function(t, e) {
        return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
    }, l.pause = function(t, e) {
        return null != t && this.seek(t, e), this.paused(!0);
    }, l.resume = function(t, e) {
        return null != t && this.seek(t, e), this.paused(!1);
    }, l.seek = function(t, e) {
        return this.totalTime(Number(t), e !== !1);
    }, l.restart = function(t, e) {
        return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0);
    }, l.reverse = function(t, e) {
        return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1);
    }, l.render = function(t, e, i) {}, l.invalidate = function() {
        return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, 
        (this._gc || !this.timeline) && this._enabled(!0), this;
    }, l.isActive = function() {
        var t, e = this._timeline, i = this._startTime;
        return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime(!0)) >= i && t < i + this.totalDuration() / this._timeScale - 1e-7;
    }, l._enabled = function(t, e) {
        return u || h.wake(), this._gc = !t, this._active = this.isActive(), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), 
        !1;
    }, l._kill = function(t, e) {
        return this._enabled(!1, !1);
    }, l.kill = function(t, e) {
        return this._kill(t, e), this;
    }, l._uncache = function(t) {
        for (var e = t ? this : this.timeline; e; ) e._dirty = !0, e = e.timeline;
        return this;
    }, l._swapSelfInParams = function(t) {
        for (var e = t.length, i = t.concat(); --e > -1; ) "{self}" === t[e] && (i[e] = this);
        return i;
    }, l._callback = function(t) {
        var e = this.vars, i = e[t], n = e[t + "Params"], r = e[t + "Scope"] || e.callbackScope || this, s = n ? n.length : 0;
        switch (s) {
          case 0:
            i.call(r);
            break;

          case 1:
            i.call(r, n[0]);
            break;

          case 2:
            i.call(r, n[0], n[1]);
            break;

          default:
            i.apply(r, n);
        }
    }, l.eventCallback = function(t, e, i, n) {
        if ("on" === (t || "").substr(0, 2)) {
            var r = this.vars;
            if (1 === arguments.length) return r[t];
            null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = m(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, 
            r[t + "Scope"] = n), "onUpdate" === t && (this._onUpdate = e);
        }
        return this;
    }, l.delay = function(t) {
        return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), 
        this._delay = t, this) : this._delay;
    }, l.duration = function(t) {
        return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), 
        this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), 
        this) : (this._dirty = !1, this._duration);
    }, l.totalDuration = function(t) {
        return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration;
    }, l.time = function(t, e) {
        return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time;
    }, l.totalTime = function(t, e, i) {
        if (u || h.wake(), !arguments.length) return this._totalTime;
        if (this._timeline) {
            if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                this._dirty && this.totalDuration();
                var n = this._totalDuration, r = this._timeline;
                if (t > n && !i && (t = n), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? n - t : t) / this._timeScale, 
                r._dirty || this._uncache(!1), r._timeline) for (;r._timeline; ) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), 
                r = r._timeline;
            }
            this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (N.length && $(), 
            this.render(t, e, !1), N.length && $());
        }
        return this;
    }, l.progress = l.totalProgress = function(t, e) {
        var i = this.duration();
        return arguments.length ? this.totalTime(i * t, e) : i ? this._time / i : this.ratio;
    }, l.startTime = function(t) {
        return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), 
        this) : this._startTime;
    }, l.endTime = function(t) {
        return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale;
    }, l.timeScale = function(t) {
        if (!arguments.length) return this._timeScale;
        var e, i;
        for (t = t || d, this._timeline && this._timeline.smoothChildTiming && (e = this._pauseTime, 
        i = e || 0 === e ? e : this._timeline.totalTime(), this._startTime = i - (i - this._startTime) * this._timeScale / t), 
        this._timeScale = t, i = this.timeline; i && i.timeline; ) i._dirty = !0, i.totalDuration(), 
        i = i.timeline;
        return this;
    }, l.reversed = function(t) {
        return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), 
        this) : this._reversed;
    }, l.paused = function(t) {
        if (!arguments.length) return this._paused;
        var e, i, n = this._timeline;
        return t != this._paused && n && (u || t || h.wake(), e = n.rawTime(), i = e - this._pauseTime, 
        !t && n.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = t ? e : null, 
        this._paused = t, this._active = this.isActive(), !t && 0 !== i && this._initted && this.duration() && (e = n.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale, 
        this.render(e, e === this._totalTime, !0))), this._gc && !t && this._enabled(!0, !1), 
        this;
    };
    var M = b("core.SimpleTimeline", function(t) {
        E.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0;
    });
    l = M.prototype = new E(), l.constructor = M, l.kill()._gc = !1, l._first = l._last = l._recent = null, 
    l._sortChildren = !1, l.add = l.insert = function(t, e, i, n) {
        var r, s;
        if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = this.rawTime() - (t._timeline.rawTime() - t._pauseTime)), 
        t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), 
        r = this._last, this._sortChildren) for (s = t._startTime; r && r._startTime > s; ) r = r._prev;
        return r ? (t._next = r._next, r._next = t) : (t._next = this._first, this._first = t), 
        t._next ? t._next._prev = t : this._last = t, t._prev = r, this._recent = t, this._timeline && this._uncache(!0), 
        this;
    }, l._remove = function(t, e) {
        return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), 
        t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), 
        t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), 
        this._timeline && this._uncache(!0)), this;
    }, l.render = function(t, e, i) {
        var n, r = this._first;
        for (this._totalTime = this._time = this._rawPrevTime = t; r; ) n = r._next, (r._active || t >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), 
        r = n;
    }, l.rawTime = function() {
        return u || h.wake(), this._totalTime;
    };
    var D = b("TweenLite", function(e, i, n) {
        if (E.call(this, i, n), this.render = D.prototype.render, null == e) throw "Cannot tween a null target.";
        this.target = e = "string" != typeof e ? e : D.selector(e) || e;
        var r, s, o, a = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType), l = this.vars.overwrite;
        if (this._overwrite = l = null == l ? q[D.defaultOverwrite] : "number" == typeof l ? l >> 0 : q[l], 
        (a || e instanceof Array || e.push && m(e)) && "number" != typeof e[0]) for (this._targets = o = f(e), 
        this._propLookup = [], this._siblings = [], r = 0; r < o.length; r++) s = o[r], 
        s ? "string" != typeof s ? s.length && s !== t && s[0] && (s[0] === t || s[0].nodeType && s[0].style && !s.nodeType) ? (o.splice(r--, 1), 
        this._targets = o = o.concat(f(s))) : (this._siblings[r] = J(s, this, !1), 1 === l && this._siblings[r].length > 1 && et(s, this, null, 1, this._siblings[r])) : (s = o[r--] = D.selector(s), 
        "string" == typeof s && o.splice(r + 1, 1)) : o.splice(r--, 1); else this._propLookup = {}, 
        this._siblings = J(e, this, !1), 1 === l && this._siblings.length > 1 && et(e, this, null, 1, this._siblings);
        (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -d, 
        this.render(Math.min(0, -this._delay)));
    }, !0), F = function(e) {
        return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType);
    }, L = function(t, e) {
        var i, n = {};
        for (i in t) W[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!U[i] || U[i] && U[i]._autoCSS) || (n[i] = t[i], 
        delete t[i]);
        t.css = n;
    };
    l = D.prototype = new E(), l.constructor = D, l.kill()._gc = !1, l.ratio = 0, l._firstPT = l._targets = l._overwrittenProps = l._startAt = null, 
    l._notifyPluginsOfEnabled = l._lazy = !1, D.version = "2.0.2", D.defaultEase = l._ease = new w(null, null, 1, 1), 
    D.defaultOverwrite = "auto", D.ticker = h, D.autoSleep = 120, D.lagSmoothing = function(t, e) {
        h.lagSmoothing(t, e);
    }, D.selector = t.$ || t.jQuery || function(e) {
        var i = t.$ || t.jQuery;
        return i ? (D.selector = i, i(e)) : (n || (n = t.document), n ? n.querySelectorAll ? n.querySelectorAll(e) : n.getElementById("#" === e.charAt(0) ? e.substr(1) : e) : e);
    };
    var N = [], z = {}, I = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi, B = /[\+-]=-?[\.\d]/, j = function(t) {
        for (var e, i = this._firstPT, n = 1e-6; i; ) e = i.blob ? 1 === t && null != this.end ? this.end : t ? this.join("") : this.start : i.c * t + i.s, 
        i.m ? e = i.m.call(this._tween, e, this._target || i.t, this._tween) : n > e && e > -n && !i.blob && (e = 0), 
        i.f ? i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e) : i.t[i.p] = e, i = i._next;
    }, X = function(t, e, i, n) {
        var r, s, o, a, l, h, u, c = [], _ = 0, d = "", f = 0;
        for (c.start = t, c.end = e, t = c[0] = t + "", e = c[1] = e + "", i && (i(c), t = c[0], 
        e = c[1]), c.length = 0, r = t.match(I) || [], s = e.match(I) || [], n && (n._next = null, 
        n.blob = 1, c._firstPT = c._applyPT = n), l = s.length, a = 0; l > a; a++) u = s[a], 
        h = e.substr(_, e.indexOf(u, _) - _), d += h || !a ? h : ",", _ += h.length, f ? f = (f + 1) % 5 : "rgba(" === h.substr(-5) && (f = 1), 
        u === r[a] || r.length <= a ? d += u : (d && (c.push(d), d = ""), o = parseFloat(r[a]), 
        c.push(o), c._firstPT = {
            _next: c._firstPT,
            t: c,
            p: c.length - 1,
            s: o,
            c: ("=" === u.charAt(1) ? parseInt(u.charAt(0) + "1", 10) * parseFloat(u.substr(2)) : parseFloat(u) - o) || 0,
            f: 0,
            m: f && 4 > f ? Math.round : 0
        }), _ += u.length;
        return d += e.substr(_), d && c.push(d), c.setRatio = j, B.test(e) && (c.end = null), 
        c;
    }, H = function(t, e, i, n, r, s, o, a, l) {
        "function" == typeof n && (n = n(l || 0, t));
        var h, u = typeof t[e], c = "function" !== u ? "" : e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3), _ = "get" !== i ? i : c ? o ? t[c](o) : t[c]() : t[e], d = "string" == typeof n && "=" === n.charAt(1), f = {
            t: t,
            p: e,
            s: _,
            f: "function" === u,
            pg: 0,
            n: r || e,
            m: s ? "function" == typeof s ? s : Math.round : 0,
            pr: 0,
            c: d ? parseInt(n.charAt(0) + "1", 10) * parseFloat(n.substr(2)) : parseFloat(n) - _ || 0
        };
        return ("number" != typeof _ || "number" != typeof n && !d) && (o || isNaN(_) || !d && isNaN(n) || "boolean" == typeof _ || "boolean" == typeof n ? (f.fp = o, 
        h = X(_, d ? parseFloat(f.s) + f.c + (f.s + "").replace(/[0-9\-\.]/g, "") : n, a || D.defaultStringFilter, f), 
        f = {
            t: h,
            p: "setRatio",
            s: 0,
            c: 1,
            f: 2,
            pg: 0,
            n: r || e,
            pr: 0,
            m: 0
        }) : (f.s = parseFloat(_), d || (f.c = parseFloat(n) - f.s || 0))), f.c ? ((f._next = this._firstPT) && (f._next._prev = f), 
        this._firstPT = f, f) : void 0;
    }, V = D._internals = {
        isArray: m,
        isSelector: F,
        lazyTweens: N,
        blobDif: X
    }, U = D._plugins = {}, Y = V.tweenLookup = {}, G = 0, W = V.reservedProps = {
        ease: 1,
        delay: 1,
        overwrite: 1,
        onComplete: 1,
        onCompleteParams: 1,
        onCompleteScope: 1,
        useFrames: 1,
        runBackwards: 1,
        startAt: 1,
        onUpdate: 1,
        onUpdateParams: 1,
        onUpdateScope: 1,
        onStart: 1,
        onStartParams: 1,
        onStartScope: 1,
        onReverseComplete: 1,
        onReverseCompleteParams: 1,
        onReverseCompleteScope: 1,
        onRepeat: 1,
        onRepeatParams: 1,
        onRepeatScope: 1,
        easeParams: 1,
        yoyo: 1,
        immediateRender: 1,
        repeat: 1,
        repeatDelay: 1,
        data: 1,
        paused: 1,
        reversed: 1,
        autoCSS: 1,
        lazy: 1,
        onOverwrite: 1,
        callbackScope: 1,
        stringFilter: 1,
        id: 1,
        yoyoEase: 1
    }, q = {
        none: 0,
        all: 1,
        auto: 2,
        concurrent: 3,
        allOnStart: 4,
        preexisting: 5,
        true: 1,
        false: 0
    }, Q = E._rootFramesTimeline = new M(), Z = E._rootTimeline = new M(), K = 30, $ = V.lazyRender = function() {
        var t, e = N.length;
        for (z = {}; --e > -1; ) t = N[e], t && t._lazy !== !1 && (t.render(t._lazy[0], t._lazy[1], !0), 
        t._lazy = !1);
        N.length = 0;
    };
    Z._startTime = h.time, Q._startTime = h.frame, Z._active = Q._active = !0, setTimeout($, 1), 
    E._updateRoot = D.render = function() {
        var t, e, i;
        if (N.length && $(), Z.render((h.time - Z._startTime) * Z._timeScale, !1, !1), Q.render((h.frame - Q._startTime) * Q._timeScale, !1, !1), 
        N.length && $(), h.frame >= K) {
            K = h.frame + (parseInt(D.autoSleep, 10) || 120);
            for (i in Y) {
                for (e = Y[i].tweens, t = e.length; --t > -1; ) e[t]._gc && e.splice(t, 1);
                0 === e.length && delete Y[i];
            }
            if (i = Z._first, (!i || i._paused) && D.autoSleep && !Q._first && 1 === h._listeners.tick.length) {
                for (;i && i._paused; ) i = i._next;
                i || h.sleep();
            }
        }
    }, h.addEventListener("tick", E._updateRoot);
    var J = function(t, e, i) {
        var n, r, s = t._gsTweenID;
        if (Y[s || (t._gsTweenID = s = "t" + G++)] || (Y[s] = {
            target: t,
            tweens: []
        }), e && (n = Y[s].tweens, n[r = n.length] = e, i)) for (;--r > -1; ) n[r] === e && n.splice(r, 1);
        return Y[s].tweens;
    }, tt = function(t, e, i, n) {
        var r, s, o = t.vars.onOverwrite;
        return o && (r = o(t, e, i, n)), o = D.onOverwrite, o && (s = o(t, e, i, n)), r !== !1 && s !== !1;
    }, et = function(t, e, i, n, r) {
        var s, o, a, l;
        if (1 === n || n >= 4) {
            for (l = r.length, s = 0; l > s; s++) if ((a = r[s]) !== e) a._gc || a._kill(null, t, e) && (o = !0); else if (5 === n) break;
            return o;
        }
        var h, u = e._startTime + d, c = [], _ = 0, f = 0 === e._duration;
        for (s = r.length; --s > -1; ) (a = r[s]) === e || a._gc || a._paused || (a._timeline !== e._timeline ? (h = h || it(e, 0, f), 
        0 === it(a, h, f) && (c[_++] = a)) : a._startTime <= u && a._startTime + a.totalDuration() / a._timeScale > u && ((f || !a._initted) && u - a._startTime <= 2e-10 || (c[_++] = a)));
        for (s = _; --s > -1; ) if (a = c[s], l = a._firstPT, 2 === n && a._kill(i, t, e) && (o = !0), 
        2 !== n || !a._firstPT && a._initted && l) {
            if (2 !== n && !tt(a, e)) continue;
            a._enabled(!1, !1) && (o = !0);
        }
        return o;
    }, it = function(t, e, i) {
        for (var n = t._timeline, r = n._timeScale, s = t._startTime; n._timeline; ) {
            if (s += n._startTime, r *= n._timeScale, n._paused) return -100;
            n = n._timeline;
        }
        return s /= r, s > e ? s - e : i && s === e || !t._initted && 2 * d > s - e ? d : (s += t.totalDuration() / t._timeScale / r) > e + d ? 0 : s - e - d;
    };
    l._init = function() {
        var t, e, i, n, r, s, o = this.vars, a = this._overwrittenProps, l = this._duration, h = !!o.immediateRender, u = o.ease;
        if (o.startAt) {
            this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), r = {};
            for (n in o.startAt) r[n] = o.startAt[n];
            if (r.data = "isStart", r.overwrite = !1, r.immediateRender = !0, r.lazy = h && o.lazy !== !1, 
            r.startAt = r.delay = null, r.onUpdate = o.onUpdate, r.onUpdateParams = o.onUpdateParams, 
            r.onUpdateScope = o.onUpdateScope || o.callbackScope || this, this._startAt = D.to(this.target || {}, 0, r), 
            h) if (this._time > 0) this._startAt = null; else if (0 !== l) return;
        } else if (o.runBackwards && 0 !== l) if (this._startAt) this._startAt.render(-1, !0), 
        this._startAt.kill(), this._startAt = null; else {
            0 !== this._time && (h = !1), i = {};
            for (n in o) W[n] && "autoCSS" !== n || (i[n] = o[n]);
            if (i.overwrite = 0, i.data = "isFromStart", i.lazy = h && o.lazy !== !1, i.immediateRender = h, 
            this._startAt = D.to(this.target, 0, i), h) {
                if (0 === this._time) return;
            } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null);
        }
        if (this._ease = u = u ? u instanceof w ? u : "function" == typeof u ? new w(u, o.easeParams) : T[u] || D.defaultEase : D.defaultEase, 
        o.easeParams instanceof Array && u.config && (this._ease = u.config.apply(u, o.easeParams)), 
        this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, 
        this._targets) for (s = this._targets.length, t = 0; s > t; t++) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null, t) && (e = !0); else e = this._initProps(this.target, this._propLookup, this._siblings, a, 0);
        if (e && D._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), 
        o.runBackwards) for (i = this._firstPT; i; ) i.s += i.c, i.c = -i.c, i = i._next;
        this._onUpdate = o.onUpdate, this._initted = !0;
    }, l._initProps = function(e, i, n, r, s) {
        var o, a, l, h, u, c;
        if (null == e) return !1;
        z[e._gsTweenID] && $(), this.vars.css || e.style && e !== t && e.nodeType && U.css && this.vars.autoCSS !== !1 && L(this.vars, e);
        for (o in this.vars) if (c = this.vars[o], W[o]) c && (c instanceof Array || c.push && m(c)) && -1 !== c.join("").indexOf("{self}") && (this.vars[o] = c = this._swapSelfInParams(c, this)); else if (U[o] && (h = new U[o]())._onInitTween(e, this.vars[o], this, s)) {
            for (this._firstPT = u = {
                _next: this._firstPT,
                t: h,
                p: "setRatio",
                s: 0,
                c: 1,
                f: 1,
                n: o,
                pg: 1,
                pr: h._priority,
                m: 0
            }, a = h._overwriteProps.length; --a > -1; ) i[h._overwriteProps[a]] = this._firstPT;
            (h._priority || h._onInitAllProps) && (l = !0), (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0), 
            u._next && (u._next._prev = u);
        } else i[o] = H.call(this, e, o, "get", c, o, 0, null, this.vars.stringFilter, s);
        return r && this._kill(r, e) ? this._initProps(e, i, n, r, s) : this._overwrite > 1 && this._firstPT && n.length > 1 && et(e, this, i, this._overwrite, n) ? (this._kill(i, e), 
        this._initProps(e, i, n, r, s)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (z[e._gsTweenID] = !0), 
        l);
    }, l.render = function(t, e, i) {
        var n, r, s, o, a = this._time, l = this._duration, h = this._rawPrevTime;
        if (t >= l - 1e-7 && t >= 0) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, 
        this._reversed || (n = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 
        0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), 
        (0 > h || 0 >= t && t >= -1e-7 || h === d && "isPause" !== this.data) && h !== t && (i = !0, 
        h > d && (r = "onReverseComplete")), this._rawPrevTime = o = !e || t || h === t ? t : d); else if (1e-7 > t) this._totalTime = this._time = 0, 
        this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== a || 0 === l && h > 0) && (r = "onReverseComplete", 
        n = this._reversed), 0 > t && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (h >= 0 && (h !== d || "isPause" !== this.data) && (i = !0), 
        this._rawPrevTime = o = !e || t || h === t ? t : d)), (!this._initted || this._startAt && this._startAt.progress()) && (i = !0); else if (this._totalTime = this._time = t, 
        this._easeType) {
            var u = t / l, c = this._easeType, _ = this._easePower;
            (1 === c || 3 === c && u >= .5) && (u = 1 - u), 3 === c && (u *= 2), 1 === _ ? u *= u : 2 === _ ? u *= u * u : 3 === _ ? u *= u * u * u : 4 === _ && (u *= u * u * u * u), 
            1 === c ? this.ratio = 1 - u : 2 === c ? this.ratio = u : .5 > t / l ? this.ratio = u / 2 : this.ratio = 1 - u / 2;
        } else this.ratio = this._ease.getRatio(t / l);
        if (this._time !== a || i) {
            if (!this._initted) {
                if (this._init(), !this._initted || this._gc) return;
                if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = a, 
                this._rawPrevTime = h, N.push(this), void (this._lazy = [ t, e ]);
                this._time && !n ? this.ratio = this._ease.getRatio(this._time / l) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
            }
            for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== a && t >= 0 && (this._active = !0), 
            0 === a && (this._startAt && (t >= 0 ? this._startAt.render(t, !0, i) : r || (r = "_dummyGS")), 
            this.vars.onStart && (0 !== this._time || 0 === l) && (e || this._callback("onStart"))), 
            s = this._firstPT; s; ) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, 
            s = s._next;
            this._onUpdate && (0 > t && this._startAt && t !== -1e-4 && this._startAt.render(t, !0, i), 
            e || (this._time !== a || n || i) && this._callback("onUpdate")), r && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && t !== -1e-4 && this._startAt.render(t, !0, i), 
            n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), 
            !e && this.vars[r] && this._callback(r), 0 === l && this._rawPrevTime === d && o !== d && (this._rawPrevTime = 0));
        }
    }, l._kill = function(t, e, i) {
        if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, 
        this._enabled(!1, !1);
        e = "string" != typeof e ? e || this._targets || this.target : D.selector(e) || e;
        var n, r, s, o, a, l, h, u, c, _ = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline, d = this._firstPT;
        if ((m(e) || F(e)) && "number" != typeof e[0]) for (n = e.length; --n > -1; ) this._kill(t, e[n], i) && (l = !0); else {
            if (this._targets) {
                for (n = this._targets.length; --n > -1; ) if (e === this._targets[n]) {
                    a = this._propLookup[n] || {}, this._overwrittenProps = this._overwrittenProps || [], 
                    r = this._overwrittenProps[n] = t ? this._overwrittenProps[n] || {} : "all";
                    break;
                }
            } else {
                if (e !== this.target) return !1;
                a = this._propLookup, r = this._overwrittenProps = t ? this._overwrittenProps || {} : "all";
            }
            if (a) {
                if (h = t || a, u = t !== r && "all" !== r && t !== a && ("object" != typeof t || !t._tempKill), 
                i && (D.onOverwrite || this.vars.onOverwrite)) {
                    for (s in h) a[s] && (c || (c = []), c.push(s));
                    if ((c || !t) && !tt(this, i, e, c)) return !1;
                }
                for (s in h) (o = a[s]) && (_ && (o.f ? o.t[o.p](o.s) : o.t[o.p] = o.s, l = !0), 
                o.pg && o.t._kill(h) && (l = !0), o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next), 
                o._next && (o._next._prev = o._prev), o._next = o._prev = null), delete a[s]), u && (r[s] = 1);
                !this._firstPT && this._initted && d && this._enabled(!1, !1);
            }
        }
        return l;
    }, l.invalidate = function() {
        return this._notifyPluginsOfEnabled && D._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, 
        this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], 
        E.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -d, 
        this.render(Math.min(0, -this._delay))), this;
    }, l._enabled = function(t, e) {
        if (u || h.wake(), t && this._gc) {
            var i, n = this._targets;
            if (n) for (i = n.length; --i > -1; ) this._siblings[i] = J(n[i], this, !0); else this._siblings = J(this.target, this, !0);
        }
        return E.prototype._enabled.call(this, t, e), this._notifyPluginsOfEnabled && this._firstPT ? D._onPluginEvent(t ? "_onEnable" : "_onDisable", this) : !1;
    }, D.to = function(t, e, i) {
        return new D(t, e, i);
    }, D.from = function(t, e, i) {
        return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new D(t, e, i);
    }, D.fromTo = function(t, e, i, n) {
        return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, 
        new D(t, e, n);
    }, D.delayedCall = function(t, e, i, n, r) {
        return new D(e, 0, {
            delay: t,
            onComplete: e,
            onCompleteParams: i,
            callbackScope: n,
            onReverseComplete: e,
            onReverseCompleteParams: i,
            immediateRender: !1,
            lazy: !1,
            useFrames: r,
            overwrite: 0
        });
    }, D.set = function(t, e) {
        return new D(t, 0, e);
    }, D.getTweensOf = function(t, e) {
        if (null == t) return [];
        t = "string" != typeof t ? t : D.selector(t) || t;
        var i, n, r, s;
        if ((m(t) || F(t)) && "number" != typeof t[0]) {
            for (i = t.length, n = []; --i > -1; ) n = n.concat(D.getTweensOf(t[i], e));
            for (i = n.length; --i > -1; ) for (s = n[i], r = i; --r > -1; ) s === n[r] && n.splice(i, 1);
        } else if (t._gsTweenID) for (n = J(t).concat(), i = n.length; --i > -1; ) (n[i]._gc || e && !n[i].isActive()) && n.splice(i, 1);
        return n || [];
    }, D.killTweensOf = D.killDelayedCallsTo = function(t, e, i) {
        "object" == typeof e && (i = e, e = !1);
        for (var n = D.getTweensOf(t, e), r = n.length; --r > -1; ) n[r]._kill(i, t);
    };
    var nt = b("plugins.TweenPlugin", function(t, e) {
        this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], 
        this._priority = e || 0, this._super = nt.prototype;
    }, !0);
    if (l = nt.prototype, nt.version = "1.19.0", nt.API = 2, l._firstPT = null, l._addTween = H, 
    l.setRatio = j, l._kill = function(t) {
        var e, i = this._overwriteProps, n = this._firstPT;
        if (null != t[this._propName]) this._overwriteProps = []; else for (e = i.length; --e > -1; ) null != t[i[e]] && i.splice(e, 1);
        for (;n; ) null != t[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, 
        n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
        return !1;
    }, l._mod = l._roundProps = function(t) {
        for (var e, i = this._firstPT; i; ) e = t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")], 
        e && "function" == typeof e && (2 === i.f ? i.t._applyPT.m = e : i.m = e), i = i._next;
    }, D._onPluginEvent = function(t, e) {
        var i, n, r, s, o, a = e._firstPT;
        if ("_onInitAllProps" === t) {
            for (;a; ) {
                for (o = a._next, n = r; n && n.pr > a.pr; ) n = n._next;
                (a._prev = n ? n._prev : s) ? a._prev._next = a : r = a, (a._next = n) ? n._prev = a : s = a, 
                a = o;
            }
            a = e._firstPT = r;
        }
        for (;a; ) a.pg && "function" == typeof a.t[t] && a.t[t]() && (i = !0), a = a._next;
        return i;
    }, nt.activate = function(t) {
        for (var e = t.length; --e > -1; ) t[e].API === nt.API && (U[new t[e]()._propName] = t[e]);
        return !0;
    }, y.plugin = function(t) {
        if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
        var e, i = t.propName, n = t.priority || 0, r = t.overwriteProps, s = {
            init: "_onInitTween",
            set: "setRatio",
            kill: "_kill",
            round: "_mod",
            mod: "_mod",
            initAll: "_onInitAllProps"
        }, o = b("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() {
            nt.call(this, i, n), this._overwriteProps = r || [];
        }, t.global === !0), a = o.prototype = new nt(i);
        a.constructor = o, o.API = t.API;
        for (e in s) "function" == typeof t[e] && (a[s[e]] = t[e]);
        return o.version = t.version, nt.activate([ o ]), o;
    }, o = t._gsQueue) {
        for (a = 0; a < o.length; a++) o[a]();
        for (l in g) g[l].func || t.console.log("GSAP encountered missing dependency: " + l);
    }
    u = !1;
}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax");

!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define([ "exports" ], e) : e(t.dat = {});
}(this, function(t) {
    "use strict";
    function e(t, e) {
        var i = t.__state.conversionName.toString(), n = Math.round(t.r), r = Math.round(t.g), s = Math.round(t.b), o = t.a, a = Math.round(t.h), l = t.s.toFixed(1), h = t.v.toFixed(1);
        if (e || "THREE_CHAR_HEX" === i || "SIX_CHAR_HEX" === i) {
            for (var u = t.hex.toString(16); u.length < 6; ) u = "0" + u;
            return "#" + u;
        }
        return "CSS_RGB" === i ? "rgb(" + n + "," + r + "," + s + ")" : "CSS_RGBA" === i ? "rgba(" + n + "," + r + "," + s + "," + o + ")" : "HEX" === i ? "0x" + t.hex.toString(16) : "RGB_ARRAY" === i ? "[" + n + "," + r + "," + s + "]" : "RGBA_ARRAY" === i ? "[" + n + "," + r + "," + s + "," + o + "]" : "RGB_OBJ" === i ? "{r:" + n + ",g:" + r + ",b:" + s + "}" : "RGBA_OBJ" === i ? "{r:" + n + ",g:" + r + ",b:" + s + ",a:" + o + "}" : "HSV_OBJ" === i ? "{h:" + a + ",s:" + l + ",v:" + h + "}" : "HSVA_OBJ" === i ? "{h:" + a + ",s:" + l + ",v:" + h + ",a:" + o + "}" : "unknown format";
    }
    function i(t, e, i) {
        Object.defineProperty(t, e, {
            get: function() {
                return "RGB" === this.__state.space ? this.__state[e] : (j.recalculateRGB(this, e, i), 
                this.__state[e]);
            },
            set: function(t) {
                "RGB" !== this.__state.space && (j.recalculateRGB(this, e, i), this.__state.space = "RGB"), 
                this.__state[e] = t;
            }
        });
    }
    function n(t, e) {
        Object.defineProperty(t, e, {
            get: function() {
                return "HSV" === this.__state.space ? this.__state[e] : (j.recalculateHSV(this), 
                this.__state[e]);
            },
            set: function(t) {
                "HSV" !== this.__state.space && (j.recalculateHSV(this), this.__state.space = "HSV"), 
                this.__state[e] = t;
            }
        });
    }
    function r(t) {
        if ("0" === t || C.isUndefined(t)) return 0;
        var e = t.match(U);
        return C.isNull(e) ? 0 : parseFloat(e[1]);
    }
    function s(t) {
        var e = t.toString();
        return e.indexOf(".") > -1 ? e.length - e.indexOf(".") - 1 : 0;
    }
    function o(t, e) {
        var i = Math.pow(10, e);
        return Math.round(t * i) / i;
    }
    function a(t, e, i, n, r) {
        return n + (t - e) / (i - e) * (r - n);
    }
    function l(t, e, i, n) {
        t.style.background = "", C.each(tt, function(r) {
            t.style.cssText += "background: " + r + "linear-gradient(" + e + ", " + i + " 0%, " + n + " 100%); ";
        });
    }
    function h(t) {
        t.style.background = "", t.style.cssText += "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);", 
        t.style.cssText += "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", 
        t.style.cssText += "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", 
        t.style.cssText += "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", 
        t.style.cssText += "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
    }
    function u(t, e, i) {
        var n = document.createElement("li");
        return e && n.appendChild(e), i ? t.__ul.insertBefore(n, i) : t.__ul.appendChild(n), 
        t.onResize(), n;
    }
    function c(t) {
        Y.unbind(window, "resize", t.__resizeHandler), t.saveToLocalStorageIfPossible && Y.unbind(window, "unload", t.saveToLocalStorageIfPossible);
    }
    function _(t, e) {
        var i = t.__preset_select[t.__preset_select.selectedIndex];
        i.innerHTML = e ? i.value + "*" : i.value;
    }
    function d(t, e, i) {
        if (i.__li = e, i.__gui = t, C.extend(i, {
            options: function(e) {
                if (arguments.length > 1) {
                    var n = i.__li.nextElementSibling;
                    return i.remove(), p(t, i.object, i.property, {
                        before: n,
                        factoryArgs: [ C.toArray(arguments) ]
                    });
                }
                if (C.isArray(e) || C.isObject(e)) {
                    var r = i.__li.nextElementSibling;
                    return i.remove(), p(t, i.object, i.property, {
                        before: r,
                        factoryArgs: [ e ]
                    });
                }
            },
            name: function(t) {
                return i.__li.firstElementChild.firstElementChild.innerHTML = t, i;
            },
            listen: function() {
                return i.__gui.listen(i), i;
            },
            remove: function() {
                return i.__gui.remove(i), i;
            }
        }), i instanceof K) {
            var n = new Z(i.object, i.property, {
                min: i.__min,
                max: i.__max,
                step: i.__step
            });
            C.each([ "updateDisplay", "onChange", "onFinishChange", "step" ], function(t) {
                var e = i[t], r = n[t];
                i[t] = n[t] = function() {
                    var t = Array.prototype.slice.call(arguments);
                    return r.apply(n, t), e.apply(i, t);
                };
            }), Y.addClass(e, "has-slider"), i.domElement.insertBefore(n.domElement, i.domElement.firstElementChild);
        } else if (i instanceof Z) {
            var r = function(e) {
                if (C.isNumber(i.__min) && C.isNumber(i.__max)) {
                    var n = i.__li.firstElementChild.firstElementChild.innerHTML, r = i.__gui.__listening.indexOf(i) > -1;
                    i.remove();
                    var s = p(t, i.object, i.property, {
                        before: i.__li.nextElementSibling,
                        factoryArgs: [ i.__min, i.__max, i.__step ]
                    });
                    return s.name(n), r && s.listen(), s;
                }
                return e;
            };
            i.min = C.compose(r, i.min), i.max = C.compose(r, i.max);
        } else i instanceof G ? (Y.bind(e, "click", function() {
            Y.fakeEvent(i.__checkbox, "click");
        }), Y.bind(i.__checkbox, "click", function(t) {
            t.stopPropagation();
        })) : i instanceof J ? (Y.bind(e, "click", function() {
            Y.fakeEvent(i.__button, "click");
        }), Y.bind(e, "mouseover", function() {
            Y.addClass(i.__button, "hover");
        }), Y.bind(e, "mouseout", function() {
            Y.removeClass(i.__button, "hover");
        })) : i instanceof $ && (Y.addClass(e, "color"), i.updateDisplay = C.compose(function(t) {
            return e.style.borderLeftColor = i.__color.toString(), t;
        }, i.updateDisplay), i.updateDisplay());
        i.setValue = C.compose(function(e) {
            return t.getRoot().__preset_select && i.isModified() && _(t.getRoot(), !0), e;
        }, i.setValue);
    }
    function f(t, e) {
        var i = t.getRoot(), n = i.__rememberedObjects.indexOf(e.object);
        if (-1 !== n) {
            var r = i.__rememberedObjectIndecesToControllers[n];
            if (void 0 === r && (r = {}, i.__rememberedObjectIndecesToControllers[n] = r), r[e.property] = e, 
            i.load && i.load.remembered) {
                var s = i.load.remembered, o = void 0;
                if (s[t.preset]) o = s[t.preset]; else {
                    if (!s[ot]) return;
                    o = s[ot];
                }
                if (o[n] && void 0 !== o[n][e.property]) {
                    var a = o[n][e.property];
                    e.initialValue = a, e.setValue(a);
                }
            }
        }
    }
    function p(t, e, i, n) {
        if (void 0 === e[i]) throw new Error('Object "' + e + '" has no property "' + i + '"');
        var r = void 0;
        if (n.color) r = new $(e, i); else {
            var s = [ e, i ].concat(n.factoryArgs);
            r = it.apply(t, s);
        }
        n.before instanceof X && (n.before = n.before.__li), f(t, r), Y.addClass(r.domElement, "c");
        var o = document.createElement("span");
        Y.addClass(o, "property-name"), o.innerHTML = r.property;
        var a = document.createElement("div");
        a.appendChild(o), a.appendChild(r.domElement);
        var l = u(t, a, n.before);
        return Y.addClass(l, dt.CLASS_CONTROLLER_ROW), r instanceof $ ? Y.addClass(l, "color") : Y.addClass(l, F(r.getValue())), 
        d(t, l, r), t.__controllers.push(r), r;
    }
    function m(t, e) {
        return document.location.href + "." + e;
    }
    function g(t, e, i) {
        var n = document.createElement("option");
        n.innerHTML = e, n.value = e, t.__preset_select.appendChild(n), i && (t.__preset_select.selectedIndex = t.__preset_select.length - 1);
    }
    function v(t, e) {
        e.style.display = t.useLocalStorage ? "block" : "none";
    }
    function y(t) {
        var e = t.__save_row = document.createElement("li");
        Y.addClass(t.domElement, "has-save"), t.__ul.insertBefore(e, t.__ul.firstChild), 
        Y.addClass(e, "save-row");
        var i = document.createElement("span");
        i.innerHTML = "&nbsp;", Y.addClass(i, "button gears");
        var n = document.createElement("span");
        n.innerHTML = "Save", Y.addClass(n, "button"), Y.addClass(n, "save");
        var r = document.createElement("span");
        r.innerHTML = "New", Y.addClass(r, "button"), Y.addClass(r, "save-as");
        var s = document.createElement("span");
        s.innerHTML = "Revert", Y.addClass(s, "button"), Y.addClass(s, "revert");
        var o = t.__preset_select = document.createElement("select");
        if (t.load && t.load.remembered ? C.each(t.load.remembered, function(e, i) {
            g(t, i, i === t.preset);
        }) : g(t, ot, !1), Y.bind(o, "change", function() {
            for (var e = 0; e < t.__preset_select.length; e++) t.__preset_select[e].innerHTML = t.__preset_select[e].value;
            t.preset = this.value;
        }), e.appendChild(o), e.appendChild(i), e.appendChild(n), e.appendChild(r), e.appendChild(s), 
        at) {
            var a = document.getElementById("dg-local-explain"), l = document.getElementById("dg-local-storage");
            document.getElementById("dg-save-locally").style.display = "block", "true" === localStorage.getItem(m(t, "isLocal")) && l.setAttribute("checked", "checked"), 
            v(t, a), Y.bind(l, "change", function() {
                t.useLocalStorage = !t.useLocalStorage, v(t, a);
            });
        }
        var h = document.getElementById("dg-new-constructor");
        Y.bind(h, "keydown", function(t) {
            !t.metaKey || 67 !== t.which && 67 !== t.keyCode || lt.hide();
        }), Y.bind(i, "click", function() {
            h.innerHTML = JSON.stringify(t.getSaveObject(), void 0, 2), lt.show(), h.focus(), 
            h.select();
        }), Y.bind(n, "click", function() {
            t.save();
        }), Y.bind(r, "click", function() {
            var e = prompt("Enter a new preset name.");
            e && t.saveAs(e);
        }), Y.bind(s, "click", function() {
            t.revert();
        });
    }
    function b(t) {
        function e(e) {
            return e.preventDefault(), t.width += r - e.clientX, t.onResize(), r = e.clientX, 
            !1;
        }
        function i() {
            Y.removeClass(t.__closeButton, dt.CLASS_DRAG), Y.unbind(window, "mousemove", e), 
            Y.unbind(window, "mouseup", i);
        }
        function n(n) {
            return n.preventDefault(), r = n.clientX, Y.addClass(t.__closeButton, dt.CLASS_DRAG), 
            Y.bind(window, "mousemove", e), Y.bind(window, "mouseup", i), !1;
        }
        var r = void 0;
        t.__resize_handle = document.createElement("div"), C.extend(t.__resize_handle.style, {
            width: "6px",
            marginLeft: "-3px",
            height: "200px",
            cursor: "ew-resize",
            position: "absolute"
        }), Y.bind(t.__resize_handle, "mousedown", n), Y.bind(t.__closeButton, "mousedown", n), 
        t.domElement.insertBefore(t.__resize_handle, t.domElement.firstElementChild);
    }
    function x(t, e) {
        t.domElement.style.width = e + "px", t.__save_row && t.autoPlace && (t.__save_row.style.width = e + "px"), 
        t.__closeButton && (t.__closeButton.style.width = e + "px");
    }
    function w(t, e) {
        var i = {};
        return C.each(t.__rememberedObjects, function(n, r) {
            var s = {}, o = t.__rememberedObjectIndecesToControllers[r];
            C.each(o, function(t, i) {
                s[i] = e ? t.initialValue : t.getValue();
            }), i[r] = s;
        }), i;
    }
    function T(t) {
        for (var e = 0; e < t.__preset_select.length; e++) t.__preset_select[e].value === t.preset && (t.__preset_select.selectedIndex = e);
    }
    function k(t) {
        0 !== t.length && nt.call(window, function() {
            k(t);
        }), C.each(t, function(t) {
            t.updateDisplay();
        });
    }
    var S = Array.prototype.forEach, P = Array.prototype.slice, C = {
        BREAK: {},
        extend: function(t) {
            return this.each(P.call(arguments, 1), function(e) {
                (this.isObject(e) ? Object.keys(e) : []).forEach(function(i) {
                    this.isUndefined(e[i]) || (t[i] = e[i]);
                }.bind(this));
            }, this), t;
        },
        defaults: function(t) {
            return this.each(P.call(arguments, 1), function(e) {
                (this.isObject(e) ? Object.keys(e) : []).forEach(function(i) {
                    this.isUndefined(t[i]) && (t[i] = e[i]);
                }.bind(this));
            }, this), t;
        },
        compose: function() {
            var t = P.call(arguments);
            return function() {
                for (var e = P.call(arguments), i = t.length - 1; i >= 0; i--) e = [ t[i].apply(this, e) ];
                return e[0];
            };
        },
        each: function(t, e, i) {
            if (t) if (S && t.forEach && t.forEach === S) t.forEach(e, i); else if (t.length === t.length + 0) {
                var n = void 0, r = void 0;
                for (n = 0, r = t.length; n < r; n++) if (n in t && e.call(i, t[n], n) === this.BREAK) return;
            } else for (var s in t) if (e.call(i, t[s], s) === this.BREAK) return;
        },
        defer: function(t) {
            setTimeout(t, 0);
        },
        debounce: function(t, e, i) {
            var n = void 0;
            return function() {
                var r = this, s = arguments, o = i || !n;
                clearTimeout(n), n = setTimeout(function() {
                    n = null, i || t.apply(r, s);
                }, e), o && t.apply(r, s);
            };
        },
        toArray: function(t) {
            return t.toArray ? t.toArray() : P.call(t);
        },
        isUndefined: function(t) {
            return void 0 === t;
        },
        isNull: function(t) {
            return null === t;
        },
        isNaN: function(t) {
            function e(e) {
                return t.apply(this, arguments);
            }
            return e.toString = function() {
                return t.toString();
            }, e;
        }(function(t) {
            return isNaN(t);
        }),
        isArray: Array.isArray || function(t) {
            return t.constructor === Array;
        },
        isObject: function(t) {
            return t === Object(t);
        },
        isNumber: function(t) {
            return t === t + 0;
        },
        isString: function(t) {
            return t === t + "";
        },
        isBoolean: function(t) {
            return !1 === t || !0 === t;
        },
        isFunction: function(t) {
            return "[object Function]" === Object.prototype.toString.call(t);
        }
    }, A = [ {
        litmus: C.isString,
        conversions: {
            THREE_CHAR_HEX: {
                read: function(t) {
                    var e = t.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
                    return null !== e && {
                        space: "HEX",
                        hex: parseInt("0x" + e[1].toString() + e[1].toString() + e[2].toString() + e[2].toString() + e[3].toString() + e[3].toString(), 0)
                    };
                },
                write: e
            },
            SIX_CHAR_HEX: {
                read: function(t) {
                    var e = t.match(/^#([A-F0-9]{6})$/i);
                    return null !== e && {
                        space: "HEX",
                        hex: parseInt("0x" + e[1].toString(), 0)
                    };
                },
                write: e
            },
            CSS_RGB: {
                read: function(t) {
                    var e = t.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
                    return null !== e && {
                        space: "RGB",
                        r: parseFloat(e[1]),
                        g: parseFloat(e[2]),
                        b: parseFloat(e[3])
                    };
                },
                write: e
            },
            CSS_RGBA: {
                read: function(t) {
                    var e = t.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
                    return null !== e && {
                        space: "RGB",
                        r: parseFloat(e[1]),
                        g: parseFloat(e[2]),
                        b: parseFloat(e[3]),
                        a: parseFloat(e[4])
                    };
                },
                write: e
            }
        }
    }, {
        litmus: C.isNumber,
        conversions: {
            HEX: {
                read: function(t) {
                    return {
                        space: "HEX",
                        hex: t,
                        conversionName: "HEX"
                    };
                },
                write: function(t) {
                    return t.hex;
                }
            }
        }
    }, {
        litmus: C.isArray,
        conversions: {
            RGB_ARRAY: {
                read: function(t) {
                    return 3 === t.length && {
                        space: "RGB",
                        r: t[0],
                        g: t[1],
                        b: t[2]
                    };
                },
                write: function(t) {
                    return [ t.r, t.g, t.b ];
                }
            },
            RGBA_ARRAY: {
                read: function(t) {
                    return 4 === t.length && {
                        space: "RGB",
                        r: t[0],
                        g: t[1],
                        b: t[2],
                        a: t[3]
                    };
                },
                write: function(t) {
                    return [ t.r, t.g, t.b, t.a ];
                }
            }
        }
    }, {
        litmus: C.isObject,
        conversions: {
            RGBA_OBJ: {
                read: function(t) {
                    return !!(C.isNumber(t.r) && C.isNumber(t.g) && C.isNumber(t.b) && C.isNumber(t.a)) && {
                        space: "RGB",
                        r: t.r,
                        g: t.g,
                        b: t.b,
                        a: t.a
                    };
                },
                write: function(t) {
                    return {
                        r: t.r,
                        g: t.g,
                        b: t.b,
                        a: t.a
                    };
                }
            },
            RGB_OBJ: {
                read: function(t) {
                    return !!(C.isNumber(t.r) && C.isNumber(t.g) && C.isNumber(t.b)) && {
                        space: "RGB",
                        r: t.r,
                        g: t.g,
                        b: t.b
                    };
                },
                write: function(t) {
                    return {
                        r: t.r,
                        g: t.g,
                        b: t.b
                    };
                }
            },
            HSVA_OBJ: {
                read: function(t) {
                    return !!(C.isNumber(t.h) && C.isNumber(t.s) && C.isNumber(t.v) && C.isNumber(t.a)) && {
                        space: "HSV",
                        h: t.h,
                        s: t.s,
                        v: t.v,
                        a: t.a
                    };
                },
                write: function(t) {
                    return {
                        h: t.h,
                        s: t.s,
                        v: t.v,
                        a: t.a
                    };
                }
            },
            HSV_OBJ: {
                read: function(t) {
                    return !!(C.isNumber(t.h) && C.isNumber(t.s) && C.isNumber(t.v)) && {
                        space: "HSV",
                        h: t.h,
                        s: t.s,
                        v: t.v
                    };
                },
                write: function(t) {
                    return {
                        h: t.h,
                        s: t.s,
                        v: t.v
                    };
                }
            }
        }
    } ], O = void 0, E = void 0, R = function() {
        E = !1;
        var t = arguments.length > 1 ? C.toArray(arguments) : arguments[0];
        return C.each(A, function(e) {
            if (e.litmus(t)) return C.each(e.conversions, function(e, i) {
                if (O = e.read(t), !1 === E && !1 !== O) return E = O, O.conversionName = i, O.conversion = e, 
                C.BREAK;
            }), C.BREAK;
        }), E;
    }, M = void 0, D = {
        hsv_to_rgb: function(t, e, i) {
            var n = Math.floor(t / 60) % 6, r = t / 60 - Math.floor(t / 60), s = i * (1 - e), o = i * (1 - r * e), a = i * (1 - (1 - r) * e), l = [ [ i, a, s ], [ o, i, s ], [ s, i, a ], [ s, o, i ], [ a, s, i ], [ i, s, o ] ][n];
            return {
                r: 255 * l[0],
                g: 255 * l[1],
                b: 255 * l[2]
            };
        },
        rgb_to_hsv: function(t, e, i) {
            var n = Math.min(t, e, i), r = Math.max(t, e, i), s = r - n, o = void 0, a = void 0;
            return 0 === r ? {
                h: NaN,
                s: 0,
                v: 0
            } : (a = s / r, o = t === r ? (e - i) / s : e === r ? 2 + (i - t) / s : 4 + (t - e) / s, 
            (o /= 6) < 0 && (o += 1), {
                h: 360 * o,
                s: a,
                v: r / 255
            });
        },
        rgb_to_hex: function(t, e, i) {
            var n = this.hex_with_component(0, 2, t);
            return n = this.hex_with_component(n, 1, e), n = this.hex_with_component(n, 0, i);
        },
        component_from_hex: function(t, e) {
            return t >> 8 * e & 255;
        },
        hex_with_component: function(t, e, i) {
            return i << (M = 8 * e) | t & ~(255 << M);
        }
    }, F = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t;
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
    }, L = function(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }, N = function() {
        function t(t, e) {
            for (var i = 0; i < e.length; i++) {
                var n = e[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
                Object.defineProperty(t, n.key, n);
            }
        }
        return function(e, i, n) {
            return i && t(e.prototype, i), n && t(e, n), e;
        };
    }(), z = function t(e, i, n) {
        null === e && (e = Function.prototype);
        var r = Object.getOwnPropertyDescriptor(e, i);
        if (void 0 === r) {
            var s = Object.getPrototypeOf(e);
            return null === s ? void 0 : t(s, i, n);
        }
        if ("value" in r) return r.value;
        var o = r.get;
        if (void 0 !== o) return o.call(n);
    }, I = function(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
    }, B = function(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e;
    }, j = function() {
        function t() {
            if (L(this, t), this.__state = R.apply(this, arguments), !1 === this.__state) throw new Error("Failed to interpret color arguments");
            this.__state.a = this.__state.a || 1;
        }
        return N(t, [ {
            key: "toString",
            value: function() {
                return e(this);
            }
        }, {
            key: "toHexString",
            value: function() {
                return e(this, !0);
            }
        }, {
            key: "toOriginal",
            value: function() {
                return this.__state.conversion.write(this);
            }
        } ]), t;
    }();
    j.recalculateRGB = function(t, e, i) {
        if ("HEX" === t.__state.space) t.__state[e] = D.component_from_hex(t.__state.hex, i); else {
            if ("HSV" !== t.__state.space) throw new Error("Corrupted color state");
            C.extend(t.__state, D.hsv_to_rgb(t.__state.h, t.__state.s, t.__state.v));
        }
    }, j.recalculateHSV = function(t) {
        var e = D.rgb_to_hsv(t.r, t.g, t.b);
        C.extend(t.__state, {
            s: e.s,
            v: e.v
        }), C.isNaN(e.h) ? C.isUndefined(t.__state.h) && (t.__state.h = 0) : t.__state.h = e.h;
    }, j.COMPONENTS = [ "r", "g", "b", "h", "s", "v", "hex", "a" ], i(j.prototype, "r", 2), 
    i(j.prototype, "g", 1), i(j.prototype, "b", 0), n(j.prototype, "h"), n(j.prototype, "s"), 
    n(j.prototype, "v"), Object.defineProperty(j.prototype, "a", {
        get: function() {
            return this.__state.a;
        },
        set: function(t) {
            this.__state.a = t;
        }
    }), Object.defineProperty(j.prototype, "hex", {
        get: function() {
            return "HEX" !== !this.__state.space && (this.__state.hex = D.rgb_to_hex(this.r, this.g, this.b)), 
            this.__state.hex;
        },
        set: function(t) {
            this.__state.space = "HEX", this.__state.hex = t;
        }
    });
    var X = function() {
        function t(e, i) {
            L(this, t), this.initialValue = e[i], this.domElement = document.createElement("div"), 
            this.object = e, this.property = i, this.__onChange = void 0, this.__onFinishChange = void 0;
        }
        return N(t, [ {
            key: "onChange",
            value: function(t) {
                return this.__onChange = t, this;
            }
        }, {
            key: "onFinishChange",
            value: function(t) {
                return this.__onFinishChange = t, this;
            }
        }, {
            key: "setValue",
            value: function(t) {
                return this.object[this.property] = t, this.__onChange && this.__onChange.call(this, t), 
                this.updateDisplay(), this;
            }
        }, {
            key: "getValue",
            value: function() {
                return this.object[this.property];
            }
        }, {
            key: "updateDisplay",
            value: function() {
                return this;
            }
        }, {
            key: "isModified",
            value: function() {
                return this.initialValue !== this.getValue();
            }
        } ]), t;
    }(), H = {
        HTMLEvents: [ "change" ],
        MouseEvents: [ "click", "mousemove", "mousedown", "mouseup", "mouseover" ],
        KeyboardEvents: [ "keydown" ]
    }, V = {};
    C.each(H, function(t, e) {
        C.each(t, function(t) {
            V[t] = e;
        });
    });
    var U = /(\d+(\.\d+)?)px/, Y = {
        makeSelectable: function(t, e) {
            void 0 !== t && void 0 !== t.style && (t.onselectstart = e ? function() {
                return !1;
            } : function() {}, t.style.MozUserSelect = e ? "auto" : "none", t.style.KhtmlUserSelect = e ? "auto" : "none", 
            t.unselectable = e ? "on" : "off");
        },
        makeFullscreen: function(t, e, i) {
            var n = i, r = e;
            C.isUndefined(r) && (r = !0), C.isUndefined(n) && (n = !0), t.style.position = "absolute", 
            r && (t.style.left = 0, t.style.right = 0), n && (t.style.top = 0, t.style.bottom = 0);
        },
        fakeEvent: function(t, e, i, n) {
            var r = i || {}, s = V[e];
            if (!s) throw new Error("Event type " + e + " not supported.");
            var o = document.createEvent(s);
            switch (s) {
              case "MouseEvents":
                var a = r.x || r.clientX || 0, l = r.y || r.clientY || 0;
                o.initMouseEvent(e, r.bubbles || !1, r.cancelable || !0, window, r.clickCount || 1, 0, 0, a, l, !1, !1, !1, !1, 0, null);
                break;

              case "KeyboardEvents":
                var h = o.initKeyboardEvent || o.initKeyEvent;
                C.defaults(r, {
                    cancelable: !0,
                    ctrlKey: !1,
                    altKey: !1,
                    shiftKey: !1,
                    metaKey: !1,
                    keyCode: void 0,
                    charCode: void 0
                }), h(e, r.bubbles || !1, r.cancelable, window, r.ctrlKey, r.altKey, r.shiftKey, r.metaKey, r.keyCode, r.charCode);
                break;

              default:
                o.initEvent(e, r.bubbles || !1, r.cancelable || !0);
            }
            C.defaults(o, n), t.dispatchEvent(o);
        },
        bind: function(t, e, i, n) {
            var r = n || !1;
            return t.addEventListener ? t.addEventListener(e, i, r) : t.attachEvent && t.attachEvent("on" + e, i), 
            Y;
        },
        unbind: function(t, e, i, n) {
            var r = n || !1;
            return t.removeEventListener ? t.removeEventListener(e, i, r) : t.detachEvent && t.detachEvent("on" + e, i), 
            Y;
        },
        addClass: function(t, e) {
            if (void 0 === t.className) t.className = e; else if (t.className !== e) {
                var i = t.className.split(/ +/);
                -1 === i.indexOf(e) && (i.push(e), t.className = i.join(" ").replace(/^\s+/, "").replace(/\s+$/, ""));
            }
            return Y;
        },
        removeClass: function(t, e) {
            if (e) if (t.className === e) t.removeAttribute("class"); else {
                var i = t.className.split(/ +/), n = i.indexOf(e);
                -1 !== n && (i.splice(n, 1), t.className = i.join(" "));
            } else t.className = void 0;
            return Y;
        },
        hasClass: function(t, e) {
            return new RegExp("(?:^|\\s+)" + e + "(?:\\s+|$)").test(t.className) || !1;
        },
        getWidth: function(t) {
            var e = getComputedStyle(t);
            return r(e["border-left-width"]) + r(e["border-right-width"]) + r(e["padding-left"]) + r(e["padding-right"]) + r(e.width);
        },
        getHeight: function(t) {
            var e = getComputedStyle(t);
            return r(e["border-top-width"]) + r(e["border-bottom-width"]) + r(e["padding-top"]) + r(e["padding-bottom"]) + r(e.height);
        },
        getOffset: function(t) {
            var e = t, i = {
                left: 0,
                top: 0
            };
            if (e.offsetParent) do {
                i.left += e.offsetLeft, i.top += e.offsetTop, e = e.offsetParent;
            } while (e);
            return i;
        },
        isActive: function(t) {
            return t === document.activeElement && (t.type || t.href);
        }
    }, G = function(t) {
        function e(t, i) {
            L(this, e);
            var n = B(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i)), r = n;
            return n.__prev = n.getValue(), n.__checkbox = document.createElement("input"), 
            n.__checkbox.setAttribute("type", "checkbox"), Y.bind(n.__checkbox, "change", function() {
                r.setValue(!r.__prev);
            }, !1), n.domElement.appendChild(n.__checkbox), n.updateDisplay(), n;
        }
        return I(e, X), N(e, [ {
            key: "setValue",
            value: function(t) {
                var i = z(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "setValue", this).call(this, t);
                return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), 
                this.__prev = this.getValue(), i;
            }
        }, {
            key: "updateDisplay",
            value: function() {
                return !0 === this.getValue() ? (this.__checkbox.setAttribute("checked", "checked"), 
                this.__checkbox.checked = !0, this.__prev = !0) : (this.__checkbox.checked = !1, 
                this.__prev = !1), z(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "updateDisplay", this).call(this);
            }
        } ]), e;
    }(), W = function(t) {
        function e(t, i, n) {
            L(this, e);
            var r = B(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i)), s = n, o = r;
            if (r.__select = document.createElement("select"), C.isArray(s)) {
                var a = {};
                C.each(s, function(t) {
                    a[t] = t;
                }), s = a;
            }
            return C.each(s, function(t, e) {
                var i = document.createElement("option");
                i.innerHTML = e, i.setAttribute("value", t), o.__select.appendChild(i);
            }), r.updateDisplay(), Y.bind(r.__select, "change", function() {
                var t = this.options[this.selectedIndex].value;
                o.setValue(t);
            }), r.domElement.appendChild(r.__select), r;
        }
        return I(e, X), N(e, [ {
            key: "setValue",
            value: function(t) {
                var i = z(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "setValue", this).call(this, t);
                return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), 
                i;
            }
        }, {
            key: "updateDisplay",
            value: function() {
                return Y.isActive(this.__select) ? this : (this.__select.value = this.getValue(), 
                z(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "updateDisplay", this).call(this));
            }
        } ]), e;
    }(), q = function(t) {
        function e(t, i) {
            function n() {
                s.setValue(s.__input.value);
            }
            L(this, e);
            var r = B(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i)), s = r;
            return r.__input = document.createElement("input"), r.__input.setAttribute("type", "text"), 
            Y.bind(r.__input, "keyup", n), Y.bind(r.__input, "change", n), Y.bind(r.__input, "blur", function() {
                s.__onFinishChange && s.__onFinishChange.call(s, s.getValue());
            }), Y.bind(r.__input, "keydown", function(t) {
                13 === t.keyCode && this.blur();
            }), r.updateDisplay(), r.domElement.appendChild(r.__input), r;
        }
        return I(e, X), N(e, [ {
            key: "updateDisplay",
            value: function() {
                return Y.isActive(this.__input) || (this.__input.value = this.getValue()), z(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "updateDisplay", this).call(this);
            }
        } ]), e;
    }(), Q = function(t) {
        function e(t, i, n) {
            L(this, e);
            var r = B(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i)), o = n || {};
            return r.__min = o.min, r.__max = o.max, r.__step = o.step, C.isUndefined(r.__step) ? 0 === r.initialValue ? r.__impliedStep = 1 : r.__impliedStep = Math.pow(10, Math.floor(Math.log(Math.abs(r.initialValue)) / Math.LN10)) / 10 : r.__impliedStep = r.__step, 
            r.__precision = s(r.__impliedStep), r;
        }
        return I(e, X), N(e, [ {
            key: "setValue",
            value: function(t) {
                var i = t;
                return void 0 !== this.__min && i < this.__min ? i = this.__min : void 0 !== this.__max && i > this.__max && (i = this.__max), 
                void 0 !== this.__step && i % this.__step != 0 && (i = Math.round(i / this.__step) * this.__step), 
                z(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "setValue", this).call(this, i);
            }
        }, {
            key: "min",
            value: function(t) {
                return this.__min = t, this;
            }
        }, {
            key: "max",
            value: function(t) {
                return this.__max = t, this;
            }
        }, {
            key: "step",
            value: function(t) {
                return this.__step = t, this.__impliedStep = t, this.__precision = s(t), this;
            }
        } ]), e;
    }(), Z = function(t) {
        function e(t, i, n) {
            function r() {
                l.__onFinishChange && l.__onFinishChange.call(l, l.getValue());
            }
            function s(t) {
                var e = h - t.clientY;
                l.setValue(l.getValue() + e * l.__impliedStep), h = t.clientY;
            }
            function o() {
                Y.unbind(window, "mousemove", s), Y.unbind(window, "mouseup", o), r();
            }
            L(this, e);
            var a = B(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i, n));
            a.__truncationSuspended = !1;
            var l = a, h = void 0;
            return a.__input = document.createElement("input"), a.__input.setAttribute("type", "text"), 
            Y.bind(a.__input, "change", function() {
                var t = parseFloat(l.__input.value);
                C.isNaN(t) || l.setValue(t);
            }), Y.bind(a.__input, "blur", function() {
                r();
            }), Y.bind(a.__input, "mousedown", function(t) {
                Y.bind(window, "mousemove", s), Y.bind(window, "mouseup", o), h = t.clientY;
            }), Y.bind(a.__input, "keydown", function(t) {
                13 === t.keyCode && (l.__truncationSuspended = !0, this.blur(), l.__truncationSuspended = !1, 
                r());
            }), a.updateDisplay(), a.domElement.appendChild(a.__input), a;
        }
        return I(e, Q), N(e, [ {
            key: "updateDisplay",
            value: function() {
                return this.__input.value = this.__truncationSuspended ? this.getValue() : o(this.getValue(), this.__precision), 
                z(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "updateDisplay", this).call(this);
            }
        } ]), e;
    }(), K = function(t) {
        function e(t, i, n, r, s) {
            function o(t) {
                t.preventDefault();
                var e = _.__background.getBoundingClientRect();
                return _.setValue(a(t.clientX, e.left, e.right, _.__min, _.__max)), !1;
            }
            function l() {
                Y.unbind(window, "mousemove", o), Y.unbind(window, "mouseup", l), _.__onFinishChange && _.__onFinishChange.call(_, _.getValue());
            }
            function h(t) {
                var e = t.touches[0].clientX, i = _.__background.getBoundingClientRect();
                _.setValue(a(e, i.left, i.right, _.__min, _.__max));
            }
            function u() {
                Y.unbind(window, "touchmove", h), Y.unbind(window, "touchend", u), _.__onFinishChange && _.__onFinishChange.call(_, _.getValue());
            }
            L(this, e);
            var c = B(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i, {
                min: n,
                max: r,
                step: s
            })), _ = c;
            return c.__background = document.createElement("div"), c.__foreground = document.createElement("div"), 
            Y.bind(c.__background, "mousedown", function(t) {
                document.activeElement.blur(), Y.bind(window, "mousemove", o), Y.bind(window, "mouseup", l), 
                o(t);
            }), Y.bind(c.__background, "touchstart", function(t) {
                1 === t.touches.length && (Y.bind(window, "touchmove", h), Y.bind(window, "touchend", u), 
                h(t));
            }), Y.addClass(c.__background, "slider"), Y.addClass(c.__foreground, "slider-fg"), 
            c.updateDisplay(), c.__background.appendChild(c.__foreground), c.domElement.appendChild(c.__background), 
            c;
        }
        return I(e, Q), N(e, [ {
            key: "updateDisplay",
            value: function() {
                var t = (this.getValue() - this.__min) / (this.__max - this.__min);
                return this.__foreground.style.width = 100 * t + "%", z(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "updateDisplay", this).call(this);
            }
        } ]), e;
    }(), J = function(t) {
        function e(t, i, n) {
            L(this, e);
            var r = B(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i)), s = r;
            return r.__button = document.createElement("div"), r.__button.innerHTML = void 0 === n ? "Fire" : n, 
            Y.bind(r.__button, "click", function(t) {
                return t.preventDefault(), s.fire(), !1;
            }), Y.addClass(r.__button, "button"), r.domElement.appendChild(r.__button), r;
        }
        return I(e, X), N(e, [ {
            key: "fire",
            value: function() {
                this.__onChange && this.__onChange.call(this), this.getValue().call(this.object), 
                this.__onFinishChange && this.__onFinishChange.call(this, this.getValue());
            }
        } ]), e;
    }(), $ = function(t) {
        function e(t, i) {
            function n(t) {
                c(t), Y.bind(window, "mousemove", c), Y.bind(window, "touchmove", c), Y.bind(window, "mouseup", s), 
                Y.bind(window, "touchend", s);
            }
            function r(t) {
                _(t), Y.bind(window, "mousemove", _), Y.bind(window, "touchmove", _), Y.bind(window, "mouseup", o), 
                Y.bind(window, "touchend", o);
            }
            function s() {
                Y.unbind(window, "mousemove", c), Y.unbind(window, "touchmove", c), Y.unbind(window, "mouseup", s), 
                Y.unbind(window, "touchend", s), u();
            }
            function o() {
                Y.unbind(window, "mousemove", _), Y.unbind(window, "touchmove", _), Y.unbind(window, "mouseup", o), 
                Y.unbind(window, "touchend", o), u();
            }
            function a() {
                var t = R(this.value);
                !1 !== t ? (f.__color.__state = t, f.setValue(f.__color.toOriginal())) : this.value = f.__color.toString();
            }
            function u() {
                f.__onFinishChange && f.__onFinishChange.call(f, f.__color.toOriginal());
            }
            function c(t) {
                -1 === t.type.indexOf("touch") && t.preventDefault();
                var e = f.__saturation_field.getBoundingClientRect(), i = t.touches && t.touches[0] || t, n = i.clientX, r = i.clientY, s = (n - e.left) / (e.right - e.left), o = 1 - (r - e.top) / (e.bottom - e.top);
                return o > 1 ? o = 1 : o < 0 && (o = 0), s > 1 ? s = 1 : s < 0 && (s = 0), f.__color.v = o, 
                f.__color.s = s, f.setValue(f.__color.toOriginal()), !1;
            }
            function _(t) {
                -1 === t.type.indexOf("touch") && t.preventDefault();
                var e = f.__hue_field.getBoundingClientRect(), i = 1 - ((t.touches && t.touches[0] || t).clientY - e.top) / (e.bottom - e.top);
                return i > 1 ? i = 1 : i < 0 && (i = 0), f.__color.h = 360 * i, f.setValue(f.__color.toOriginal()), 
                !1;
            }
            L(this, e);
            var d = B(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, i));
            d.__color = new j(d.getValue()), d.__temp = new j(0);
            var f = d;
            d.domElement = document.createElement("div"), Y.makeSelectable(d.domElement, !1), 
            d.__selector = document.createElement("div"), d.__selector.className = "selector", 
            d.__saturation_field = document.createElement("div"), d.__saturation_field.className = "saturation-field", 
            d.__field_knob = document.createElement("div"), d.__field_knob.className = "field-knob", 
            d.__field_knob_border = "2px solid ", d.__hue_knob = document.createElement("div"), 
            d.__hue_knob.className = "hue-knob", d.__hue_field = document.createElement("div"), 
            d.__hue_field.className = "hue-field", d.__input = document.createElement("input"), 
            d.__input.type = "text", d.__input_textShadow = "0 1px 1px ", Y.bind(d.__input, "keydown", function(t) {
                13 === t.keyCode && a.call(this);
            }), Y.bind(d.__input, "blur", a), Y.bind(d.__selector, "mousedown", function() {
                Y.addClass(this, "drag").bind(window, "mouseup", function() {
                    Y.removeClass(f.__selector, "drag");
                });
            }), Y.bind(d.__selector, "touchstart", function() {
                Y.addClass(this, "drag").bind(window, "touchend", function() {
                    Y.removeClass(f.__selector, "drag");
                });
            });
            var p = document.createElement("div");
            return C.extend(d.__selector.style, {
                width: "122px",
                height: "102px",
                padding: "3px",
                backgroundColor: "#222",
                boxShadow: "0px 1px 3px rgba(0,0,0,0.3)"
            }), C.extend(d.__field_knob.style, {
                position: "absolute",
                width: "12px",
                height: "12px",
                border: d.__field_knob_border + (d.__color.v < .5 ? "#fff" : "#000"),
                boxShadow: "0px 1px 3px rgba(0,0,0,0.5)",
                borderRadius: "12px",
                zIndex: 1
            }), C.extend(d.__hue_knob.style, {
                position: "absolute",
                width: "15px",
                height: "2px",
                borderRight: "4px solid #fff",
                zIndex: 1
            }), C.extend(d.__saturation_field.style, {
                width: "100px",
                height: "100px",
                border: "1px solid #555",
                marginRight: "3px",
                display: "inline-block",
                cursor: "pointer"
            }), C.extend(p.style, {
                width: "100%",
                height: "100%",
                background: "none"
            }), l(p, "top", "rgba(0,0,0,0)", "#000"), C.extend(d.__hue_field.style, {
                width: "15px",
                height: "100px",
                border: "1px solid #555",
                cursor: "ns-resize",
                position: "absolute",
                top: "3px",
                right: "3px"
            }), h(d.__hue_field), C.extend(d.__input.style, {
                outline: "none",
                textAlign: "center",
                color: "#fff",
                border: 0,
                fontWeight: "bold",
                textShadow: d.__input_textShadow + "rgba(0,0,0,0.7)"
            }), Y.bind(d.__saturation_field, "mousedown", n), Y.bind(d.__saturation_field, "touchstart", n), 
            Y.bind(d.__field_knob, "mousedown", n), Y.bind(d.__field_knob, "touchstart", n), 
            Y.bind(d.__hue_field, "mousedown", r), Y.bind(d.__hue_field, "touchstart", r), d.__saturation_field.appendChild(p), 
            d.__selector.appendChild(d.__field_knob), d.__selector.appendChild(d.__saturation_field), 
            d.__selector.appendChild(d.__hue_field), d.__hue_field.appendChild(d.__hue_knob), 
            d.domElement.appendChild(d.__input), d.domElement.appendChild(d.__selector), d.updateDisplay(), 
            d;
        }
        return I(e, X), N(e, [ {
            key: "updateDisplay",
            value: function() {
                var t = R(this.getValue());
                if (!1 !== t) {
                    var e = !1;
                    C.each(j.COMPONENTS, function(i) {
                        if (!C.isUndefined(t[i]) && !C.isUndefined(this.__color.__state[i]) && t[i] !== this.__color.__state[i]) return e = !0, 
                        {};
                    }, this), e && C.extend(this.__color.__state, t);
                }
                C.extend(this.__temp.__state, this.__color.__state), this.__temp.a = 1;
                var i = this.__color.v < .5 || this.__color.s > .5 ? 255 : 0, n = 255 - i;
                C.extend(this.__field_knob.style, {
                    marginLeft: 100 * this.__color.s - 7 + "px",
                    marginTop: 100 * (1 - this.__color.v) - 7 + "px",
                    backgroundColor: this.__temp.toHexString(),
                    border: this.__field_knob_border + "rgb(" + i + "," + i + "," + i + ")"
                }), this.__hue_knob.style.marginTop = 100 * (1 - this.__color.h / 360) + "px", this.__temp.s = 1, 
                this.__temp.v = 1, l(this.__saturation_field, "left", "#fff", this.__temp.toHexString()), 
                this.__input.value = this.__color.toString(), C.extend(this.__input.style, {
                    backgroundColor: this.__color.toHexString(),
                    color: "rgb(" + i + "," + i + "," + i + ")",
                    textShadow: this.__input_textShadow + "rgba(" + n + "," + n + "," + n + ",.7)"
                });
            }
        } ]), e;
    }(), tt = [ "-moz-", "-o-", "-webkit-", "-ms-", "" ], et = {
        load: function(t, e) {
            var i = e || document, n = i.createElement("link");
            n.type = "text/css", n.rel = "stylesheet", n.href = t, i.getElementsByTagName("head")[0].appendChild(n);
        },
        inject: function(t, e) {
            var i = e || document, n = document.createElement("style");
            n.type = "text/css", n.innerHTML = t;
            var r = i.getElementsByTagName("head")[0];
            try {
                r.appendChild(n);
            } catch (t) {}
        }
    }, it = function(t, e) {
        var i = t[e];
        return C.isArray(arguments[2]) || C.isObject(arguments[2]) ? new W(t, e, arguments[2]) : C.isNumber(i) ? C.isNumber(arguments[2]) && C.isNumber(arguments[3]) ? C.isNumber(arguments[4]) ? new K(t, e, arguments[2], arguments[3], arguments[4]) : new K(t, e, arguments[2], arguments[3]) : C.isNumber(arguments[4]) ? new Z(t, e, {
            min: arguments[2],
            max: arguments[3],
            step: arguments[4]
        }) : new Z(t, e, {
            min: arguments[2],
            max: arguments[3]
        }) : C.isString(i) ? new q(t, e) : C.isFunction(i) ? new J(t, e, "") : C.isBoolean(i) ? new G(t, e) : null;
    }, nt = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
        setTimeout(t, 1e3 / 60);
    }, rt = function() {
        function t() {
            L(this, t), this.backgroundElement = document.createElement("div"), C.extend(this.backgroundElement.style, {
                backgroundColor: "rgba(0,0,0,0.8)",
                top: 0,
                left: 0,
                display: "none",
                zIndex: "1000",
                opacity: 0,
                WebkitTransition: "opacity 0.2s linear",
                transition: "opacity 0.2s linear"
            }), Y.makeFullscreen(this.backgroundElement), this.backgroundElement.style.position = "fixed", 
            this.domElement = document.createElement("div"), C.extend(this.domElement.style, {
                position: "fixed",
                display: "none",
                zIndex: "1001",
                opacity: 0,
                WebkitTransition: "-webkit-transform 0.2s ease-out, opacity 0.2s linear",
                transition: "transform 0.2s ease-out, opacity 0.2s linear"
            }), document.body.appendChild(this.backgroundElement), document.body.appendChild(this.domElement);
            var e = this;
            Y.bind(this.backgroundElement, "click", function() {
                e.hide();
            });
        }
        return N(t, [ {
            key: "show",
            value: function() {
                var t = this;
                this.backgroundElement.style.display = "block", this.domElement.style.display = "block", 
                this.domElement.style.opacity = 0, this.domElement.style.webkitTransform = "scale(1.1)", 
                this.layout(), C.defer(function() {
                    t.backgroundElement.style.opacity = 1, t.domElement.style.opacity = 1, t.domElement.style.webkitTransform = "scale(1)";
                });
            }
        }, {
            key: "hide",
            value: function() {
                var t = this, e = function e() {
                    t.domElement.style.display = "none", t.backgroundElement.style.display = "none", 
                    Y.unbind(t.domElement, "webkitTransitionEnd", e), Y.unbind(t.domElement, "transitionend", e), 
                    Y.unbind(t.domElement, "oTransitionEnd", e);
                };
                Y.bind(this.domElement, "webkitTransitionEnd", e), Y.bind(this.domElement, "transitionend", e), 
                Y.bind(this.domElement, "oTransitionEnd", e), this.backgroundElement.style.opacity = 0, 
                this.domElement.style.opacity = 0, this.domElement.style.webkitTransform = "scale(1.1)";
            }
        }, {
            key: "layout",
            value: function() {
                this.domElement.style.left = window.innerWidth / 2 - Y.getWidth(this.domElement) / 2 + "px", 
                this.domElement.style.top = window.innerHeight / 2 - Y.getHeight(this.domElement) / 2 + "px";
            }
        } ]), t;
    }(), st = function(t) {
        if (t && "undefined" != typeof window) {
            var e = document.createElement("style");
            return e.setAttribute("type", "text/css"), e.innerHTML = t, document.head.appendChild(e), 
            t;
        }
    }(".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n");
    et.inject(st);
    var ot = "Default", at = function() {
        try {
            return !!window.localStorage;
        } catch (t) {
            return !1;
        }
    }(), lt = void 0, ht = !0, ut = void 0, ct = !1, _t = [], dt = function t(e) {
        var i = this, n = e || {};
        this.domElement = document.createElement("div"), this.__ul = document.createElement("ul"), 
        this.domElement.appendChild(this.__ul), Y.addClass(this.domElement, "dg"), this.__folders = {}, 
        this.__controllers = [], this.__rememberedObjects = [], this.__rememberedObjectIndecesToControllers = [], 
        this.__listening = [], n = C.defaults(n, {
            closeOnTop: !1,
            autoPlace: !0,
            width: t.DEFAULT_WIDTH
        }), n = C.defaults(n, {
            resizable: n.autoPlace,
            hideable: n.autoPlace
        }), C.isUndefined(n.load) ? n.load = {
            preset: ot
        } : n.preset && (n.load.preset = n.preset), C.isUndefined(n.parent) && n.hideable && _t.push(this), 
        n.resizable = C.isUndefined(n.parent) && n.resizable, n.autoPlace && C.isUndefined(n.scrollable) && (n.scrollable = !0);
        var r = at && "true" === localStorage.getItem(m(this, "isLocal")), s = void 0;
        if (Object.defineProperties(this, {
            parent: {
                get: function() {
                    return n.parent;
                }
            },
            scrollable: {
                get: function() {
                    return n.scrollable;
                }
            },
            autoPlace: {
                get: function() {
                    return n.autoPlace;
                }
            },
            closeOnTop: {
                get: function() {
                    return n.closeOnTop;
                }
            },
            preset: {
                get: function() {
                    return i.parent ? i.getRoot().preset : n.load.preset;
                },
                set: function(t) {
                    i.parent ? i.getRoot().preset = t : n.load.preset = t, T(this), i.revert();
                }
            },
            width: {
                get: function() {
                    return n.width;
                },
                set: function(t) {
                    n.width = t, x(i, t);
                }
            },
            name: {
                get: function() {
                    return n.name;
                },
                set: function(t) {
                    n.name = t, titleRowName && (titleRowName.innerHTML = n.name);
                }
            },
            closed: {
                get: function() {
                    return n.closed;
                },
                set: function(e) {
                    n.closed = e, n.closed ? Y.addClass(i.__ul, t.CLASS_CLOSED) : Y.removeClass(i.__ul, t.CLASS_CLOSED), 
                    this.onResize(), i.__closeButton && (i.__closeButton.innerHTML = e ? t.TEXT_OPEN : t.TEXT_CLOSED);
                }
            },
            load: {
                get: function() {
                    return n.load;
                }
            },
            useLocalStorage: {
                get: function() {
                    return r;
                },
                set: function(t) {
                    at && (r = t, t ? Y.bind(window, "unload", s) : Y.unbind(window, "unload", s), localStorage.setItem(m(i, "isLocal"), t));
                }
            }
        }), C.isUndefined(n.parent)) {
            if (n.closed = !1, Y.addClass(this.domElement, t.CLASS_MAIN), Y.makeSelectable(this.domElement, !1), 
            at && r) {
                i.useLocalStorage = !0;
                var o = localStorage.getItem(m(this, "gui"));
                o && (n.load = JSON.parse(o));
            }
            this.__closeButton = document.createElement("div"), this.__closeButton.innerHTML = t.TEXT_CLOSED, 
            Y.addClass(this.__closeButton, t.CLASS_CLOSE_BUTTON), n.closeOnTop ? (Y.addClass(this.__closeButton, t.CLASS_CLOSE_TOP), 
            this.domElement.insertBefore(this.__closeButton, this.domElement.childNodes[0])) : (Y.addClass(this.__closeButton, t.CLASS_CLOSE_BOTTOM), 
            this.domElement.appendChild(this.__closeButton)), Y.bind(this.__closeButton, "click", function() {
                i.closed = !i.closed;
            });
        } else {
            void 0 === n.closed && (n.closed = !0);
            var a = document.createTextNode(n.name);
            Y.addClass(a, "controller-name");
            var l = u(i, a);
            Y.addClass(this.__ul, t.CLASS_CLOSED), Y.addClass(l, "title"), Y.bind(l, "click", function(t) {
                return t.preventDefault(), i.closed = !i.closed, !1;
            }), n.closed || (this.closed = !1);
        }
        n.autoPlace && (C.isUndefined(n.parent) && (ht && (ut = document.createElement("div"), 
        Y.addClass(ut, "dg"), Y.addClass(ut, t.CLASS_AUTO_PLACE_CONTAINER), document.body.appendChild(ut), 
        ht = !1), ut.appendChild(this.domElement), Y.addClass(this.domElement, t.CLASS_AUTO_PLACE)), 
        this.parent || x(i, n.width)), this.__resizeHandler = function() {
            i.onResizeDebounced();
        }, Y.bind(window, "resize", this.__resizeHandler), Y.bind(this.__ul, "webkitTransitionEnd", this.__resizeHandler), 
        Y.bind(this.__ul, "transitionend", this.__resizeHandler), Y.bind(this.__ul, "oTransitionEnd", this.__resizeHandler), 
        this.onResize(), n.resizable && b(this), s = function() {
            at && "true" === localStorage.getItem(m(i, "isLocal")) && localStorage.setItem(m(i, "gui"), JSON.stringify(i.getSaveObject()));
        }, this.saveToLocalStorageIfPossible = s, n.parent || function() {
            var t = i.getRoot();
            t.width += 1, C.defer(function() {
                t.width -= 1;
            });
        }();
    };
    dt.toggleHide = function() {
        ct = !ct, C.each(_t, function(t) {
            t.domElement.style.display = ct ? "none" : "";
        });
    }, dt.CLASS_AUTO_PLACE = "a", dt.CLASS_AUTO_PLACE_CONTAINER = "ac", dt.CLASS_MAIN = "main", 
    dt.CLASS_CONTROLLER_ROW = "cr", dt.CLASS_TOO_TALL = "taller-than-window", dt.CLASS_CLOSED = "closed", 
    dt.CLASS_CLOSE_BUTTON = "close-button", dt.CLASS_CLOSE_TOP = "close-top", dt.CLASS_CLOSE_BOTTOM = "close-bottom", 
    dt.CLASS_DRAG = "drag", dt.DEFAULT_WIDTH = 245, dt.TEXT_CLOSED = "Close Controls", 
    dt.TEXT_OPEN = "Open Controls", dt._keydownHandler = function(t) {
        "text" === document.activeElement.type || 72 !== t.which && 72 !== t.keyCode || dt.toggleHide();
    }, Y.bind(window, "keydown", dt._keydownHandler, !1), C.extend(dt.prototype, {
        add: function(t, e) {
            return p(this, t, e, {
                factoryArgs: Array.prototype.slice.call(arguments, 2)
            });
        },
        addColor: function(t, e) {
            return p(this, t, e, {
                color: !0
            });
        },
        remove: function(t) {
            this.__ul.removeChild(t.__li), this.__controllers.splice(this.__controllers.indexOf(t), 1);
            var e = this;
            C.defer(function() {
                e.onResize();
            });
        },
        destroy: function() {
            if (this.parent) throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");
            this.autoPlace && ut.removeChild(this.domElement);
            var t = this;
            C.each(this.__folders, function(e) {
                t.removeFolder(e);
            }), Y.unbind(window, "keydown", dt._keydownHandler, !1), c(this);
        },
        addFolder: function(t) {
            if (void 0 !== this.__folders[t]) throw new Error('You already have a folder in this GUI by the name "' + t + '"');
            var e = {
                name: t,
                parent: this
            };
            e.autoPlace = this.autoPlace, this.load && this.load.folders && this.load.folders[t] && (e.closed = this.load.folders[t].closed, 
            e.load = this.load.folders[t]);
            var i = new dt(e);
            this.__folders[t] = i;
            var n = u(this, i.domElement);
            return Y.addClass(n, "folder"), i;
        },
        removeFolder: function(t) {
            this.__ul.removeChild(t.domElement.parentElement), delete this.__folders[t.name], 
            this.load && this.load.folders && this.load.folders[t.name] && delete this.load.folders[t.name], 
            c(t);
            var e = this;
            C.each(t.__folders, function(e) {
                t.removeFolder(e);
            }), C.defer(function() {
                e.onResize();
            });
        },
        open: function() {
            this.closed = !1;
        },
        close: function() {
            this.closed = !0;
        },
        onResize: function() {
            var t = this.getRoot();
            if (t.scrollable) {
                var e = Y.getOffset(t.__ul).top, i = 0;
                C.each(t.__ul.childNodes, function(e) {
                    t.autoPlace && e === t.__save_row || (i += Y.getHeight(e));
                }), window.innerHeight - e - 20 < i ? (Y.addClass(t.domElement, dt.CLASS_TOO_TALL), 
                t.__ul.style.height = window.innerHeight - e - 20 + "px") : (Y.removeClass(t.domElement, dt.CLASS_TOO_TALL), 
                t.__ul.style.height = "auto");
            }
            t.__resize_handle && C.defer(function() {
                t.__resize_handle.style.height = t.__ul.offsetHeight + "px";
            }), t.__closeButton && (t.__closeButton.style.width = t.width + "px");
        },
        onResizeDebounced: C.debounce(function() {
            this.onResize();
        }, 50),
        remember: function() {
            if (C.isUndefined(lt) && ((lt = new rt()).domElement.innerHTML = '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n\n    </div>\n\n  </div>\n\n</div>'), 
            this.parent) throw new Error("You can only call remember on a top level GUI.");
            var t = this;
            C.each(Array.prototype.slice.call(arguments), function(e) {
                0 === t.__rememberedObjects.length && y(t), -1 === t.__rememberedObjects.indexOf(e) && t.__rememberedObjects.push(e);
            }), this.autoPlace && x(this, this.width);
        },
        getRoot: function() {
            for (var t = this; t.parent; ) t = t.parent;
            return t;
        },
        getSaveObject: function() {
            var t = this.load;
            return t.closed = this.closed, this.__rememberedObjects.length > 0 && (t.preset = this.preset, 
            t.remembered || (t.remembered = {}), t.remembered[this.preset] = w(this)), t.folders = {}, 
            C.each(this.__folders, function(e, i) {
                t.folders[i] = e.getSaveObject();
            }), t;
        },
        save: function() {
            this.load.remembered || (this.load.remembered = {}), this.load.remembered[this.preset] = w(this), 
            _(this, !1), this.saveToLocalStorageIfPossible();
        },
        saveAs: function(t) {
            this.load.remembered || (this.load.remembered = {}, this.load.remembered[ot] = w(this, !0)), 
            this.load.remembered[t] = w(this), this.preset = t, g(this, t, !0), this.saveToLocalStorageIfPossible();
        },
        revert: function(t) {
            C.each(this.__controllers, function(e) {
                this.getRoot().load.remembered ? f(t || this.getRoot(), e) : e.setValue(e.initialValue), 
                e.__onFinishChange && e.__onFinishChange.call(e, e.getValue());
            }, this), C.each(this.__folders, function(t) {
                t.revert(t);
            }), t || _(this.getRoot(), !1);
        },
        listen: function(t) {
            var e = 0 === this.__listening.length;
            this.__listening.push(t), e && k(this.__listening);
        },
        updateDisplay: function() {
            C.each(this.__controllers, function(t) {
                t.updateDisplay();
            }), C.each(this.__folders, function(t) {
                t.updateDisplay();
            });
        }
    });
    var ft = {
        Color: j,
        math: D,
        interpret: R
    }, pt = {
        Controller: X,
        BooleanController: G,
        OptionController: W,
        StringController: q,
        NumberController: Q,
        NumberControllerBox: Z,
        NumberControllerSlider: K,
        FunctionController: J,
        ColorController: $
    }, mt = {
        dom: Y
    }, gt = {
        GUI: dt
    }, vt = dt, yt = {
        color: ft,
        controllers: pt,
        dom: mt,
        gui: gt,
        GUI: vt
    };
    t.color = ft, t.controllers = pt, t.dom = mt, t.gui = gt, t.GUI = vt, t.default = yt, 
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
});

var elastic_grid = function() {
    var t = document.getElementById("canvas"), e, i, n = t.getContext("2d"), r, s, o, a, l, h, u, c, _, d, f = Date.now();
    var _ = new function() {
        this.line_default_color = "#f2f2f2";
        this.line_active_color = "#787878";
        this.bg_color = "#FFFFFF";
        this.columns = 16;
        this.resolution = 22.589178011373427;
        this.grid_width = 1;
        this.tension = .1672945028433569;
        this.dampen = .05747957952783044;
        this.color_decay = 1;
        this.k = .021951145958986732;
        this.mouse_influence = 1;
        this.click = "random";
        this.click_strength = 100;
    }();
    var p = new dat.GUI({
        load: A(),
        preset: "acid"
    });
    var m = p.addFolder("Colors");
    var g = p.addFolder("Wave");
    p.remember(_);
    var v = m.addColor(_, "line_default_color");
    m.addColor(_, "line_active_color");
    m.addColor(_, "bg_color");
    var y = g.add(_, "columns", 1, 100).step(1);
    var b = g.add(_, "resolution", 5, 300).step(1);
    var x = g.add(_, "grid_width", 1, 200);
    g.add(_, "tension", .01, 1);
    g.add(_, "dampen", .002, .2);
    g.add(_, "color_decay", .4, 4);
    g.add(_, "k", .0025, .11);
    g.add(_, "mouse_influence", .5, 8);
    g.add(_, "click", [ "off", "random", "targeted" ]);
    g.add(_, "click_strength", 100, 5e3);
    v.onChange(w);
    y.onChange(w);
    b.onChange(w);
    x.onChange(w);
    w();
    T();
    function w() {
        e = window.innerWidth;
        i = window.innerHeight;
        t.width = e;
        t.height = i;
        d = [];
        for (var n = 0; n < _.columns - 1; n++) {
            d[n] = new k((n + 1) * (e / _.columns));
        }
    }
    window.addEventListener("resize", w, false);
    function T() {
        n.fillStyle = _.bg_color;
        n.rect(0, 0, e, i);
        n.fill();
        C();
        for (var t = 0; t < _.columns - 1; t++) {
            d[t].update();
        }
        window.requestAnimationFrame(T);
    }
    function k(t) {
        this.color = _.line_default_color;
        this.posX = t;
        this.segments = [];
        for (var e = 0; e < _.resolution; e++) {
            this.segments[e] = new S(t);
        }
        this.update = function() {
            for (var t = 0; t < this.segments.length; t++) {
                this.segments[t].update();
            }
            var e = new Array(this.segments.length);
            var r = new Array(this.segments.length);
            for (var s = 0; s < 10; s++) {
                for (t = 0; t < this.segments.length; t++) {
                    if (t > 0) {
                        e[t] = _.k * (this.segments[t].height - this.segments[t - 1].height);
                        this.segments[t - 1].speed += e[t];
                    }
                    if (t < this.segments.length - 1) {
                        r[t] = _.k * (this.segments[t].height - this.segments[t + 1].height);
                        this.segments[t + 1].speed += r[t];
                    }
                }
            }
            n.strokeStyle = this.color;
            n.lineWidth = _.grid_width;
            n.beginPath();
            n.moveTo(this.segments[0].height, 0);
            for (var t = 0; t < this.segments.length; t++) {
                n.lineTo(this.segments[t].height, (t + 1) * (i / _.resolution));
            }
            n.stroke();
        };
    }
    function S(t) {
        this.posX = t;
        this.height = this.posX;
        this.speed = 0;
        this.update = function() {
            var t = this.posX - this.height;
            this.speed += _.tension * t - this.speed * _.dampen;
            this.height += this.speed;
        };
    }
    var r = function() {
        this.x;
        this.y;
        this.segment;
        this.previousx;
        this.previousy;
        this.speedx;
        this.speedy;
        this.column;
        this.previouscolumn;
    };
    function P(n) {
        bounds = t.getBoundingClientRect();
        if (n.targetTouches && n.targetTouches[0]) {
            n.preventDefault();
            pointerEvent = n.targetTouches[0];
            r.x = pointerEvent.pageX;
            r.y = pointerEvent.pageY;
        } else {
            r.x = n.clientX - bounds.left;
            r.y = n.clientY - bounds.top;
        }
        r.speedx = r.x - r.previousx;
        if (s > 300) {
            r.speedx = 10;
        }
        r.segment = Math.floor(_.resolution / i * r.y);
        r.column = Math.floor(r.x / e * _.columns);
        if (r.column < r.previouscolumn) {
            d[r.column].segments[r.segment].speed = r.speedx * _.mouse_influence;
            var o = new TimelineLite();
            o.to(d[r.column], .001, {
                color: _.line_active_color
            }).to(d[r.column], _.color_decay, {
                color: _.line_default_color
            });
        }
        if (r.column > r.previouscolumn) {
            d[r.column - 1].segments[r.segment].speed = r.speedx * _.mouse_influence;
            var o = new TimelineLite();
            o.to(d[r.column - 1], .001, {
                color: _.line_active_color
            }).to(d[r.column - 1], _.color_decay, {
                color: _.line_default_color
            });
        }
        r.previousx = r.x;
        r.previousy = r.y;
        r.previouscolumn = r.column;
    }
    window.addEventListener("mousemove", P);
    window.addEventListener("touchmove", P);
    window.addEventListener("touchend", function() {
        s = Date.now() - f;
    });
    document.addEventListener("click", function() {
        if (e >= 460) {
            if (_.click != "off") {
                for (var t = 0; t < d.length; t++) {
                    if (_.click == "random") {
                        d[t].segments[Math.floor(Math.random() * _.resolution)].speed = _.click_strength / 10;
                    } else if (_.click == "targeted") {
                        d[t].segments[r.segment].speed = Math.sign(d[t].posX - r.x) * _.click_strength / Math.sqrt(Math.max(Math.abs(d[t].posX - r.x), 100));
                    }
                    var i = new TimelineLite();
                    i.to(d[t], .001, {
                        color: _.line_active_color
                    }).to(d[t], _.color_decay, {
                        color: _.line_default_color
                    });
                }
            }
        }
    }, false);
    function C() {
        if (window.DeviceMotionEvent != undefined) {
            window.ondevicemotion = function(t) {
                o = event.accelerationIncludingGravity.x;
                a = event.accelerationIncludingGravity.y;
                l = event.accelerationIncludingGravity.z;
            };
            var t = Math.abs(o - h);
            var e = Math.abs(a - u);
            var i = Math.abs(l - c);
            if (t + e + i > 20) {
                for (var n = 0; n < d.length; n++) {
                    d[n].segments[Math.floor(Math.random() * _.resolution)].speed = 40;
                    var r = new TimelineLite();
                    r.to(d[n], .001, {
                        color: _.line_active_color
                    }).to(d[n], _.color_decay, {
                        color: _.line_default_color
                    });
                }
            }
            h = o;
            u = a;
            c = l;
        }
    }
    function A() {
        return {
            remembered: {
                Preset1: {
                    "0": {
                        line_default_color: "#ebebeb",
                        line_active_color: "#787878",
                        bg_color: "#FFFFFF",
                        columns: 7.994657935550578,
                        resolution: 22.589178011373427,
                        grid_width: 1,
                        tension: .5821971394106497,
                        dampen: .2,
                        k: .021951145958986732,
                        click: "random",
                        mouse_influence: 1,
                        click_strength: 3e3
                    }
                },
                "light, low-res": {
                    "0": {
                        line_default_color: "#d9d9d9",
                        line_active_color: "#000000",
                        bg_color: "#FFFFFF",
                        columns: 7.994657935550578,
                        resolution: 22.589178011373427,
                        grid_width: 1,
                        tension: .5821971394106497,
                        dampen: .2,
                        k: .021951145958986732,
                        mouse_influence: 1,
                        click_random: true,
                        click_strength: 878.528347406514
                    }
                },
                folio: {
                    "0": {
                        line_default_color: "#e1e1e1",
                        line_active_color: "004DC6",
                        bg_color: "#FFFFFF",
                        columns: 16,
                        resolution: 22.589178011373427,
                        grid_width: 1,
                        tension: .1672945028433569,
                        dampen: .05747957952783044,
                        k: .021951145958986732,
                        mouse_influence: 1,
                        click: "random",
                        click_strength: 1e3
                    }
                },
                "dense grid": {
                    "0": {
                        line_default_color: "#050505",
                        line_active_color: "#787878",
                        bg_color: "#FFFFFF",
                        columns: 100,
                        resolution: 152.72876098569705,
                        grid_width: 1,
                        tension: .6258711011545752,
                        dampen: .10552093744614854,
                        k: .0741172669308978,
                        mouse_influence: 1.8667068757539202,
                        click_random: false,
                        click_strength: 100
                    }
                },
                acid: {
                    "0": {
                        line_default_color: "#028e54",
                        line_active_color: "#78ff00",
                        bg_color: "#000000",
                        columns: 2,
                        resolution: 103.9264173703257,
                        grid_width: 1,
                        tension: .6258711011545752,
                        dampen: .10552093744614854,
                        k: .0741172669308978,
                        mouse_influence: 3.6423401688781665,
                        click_random: false,
                        click_strength: 5e3
                    }
                }
            },
            closed: false,
            folders: {
                Colors: {
                    preset: "Default",
                    closed: false,
                    folders: {}
                },
                Wave: {
                    preset: "Default",
                    closed: false,
                    folders: {}
                }
            }
        };
    }
};

var aitch_grid = function() {
    var t, e, i, n, r, s, o, a, l, h, u, c, _, d, f, p, m, g, v, y, b, x, w, T, k, S, P, C;
    e = Q()["remembered"]["aitch"]["0"];
    var A = new dat.GUI({
        load: Q(),
        preset: "Preset1"
    });
    var O = A.addFolder("Colors");
    var E = A.addFolder("Grid");
    var R = A.addFolder("Logo");
    var M = A.addFolder("Ripple Animation");
    A.remember(e);
    var D = O.addColor(e, "color_off");
    var F = O.addColor(e, "color_on");
    var L = O.addColor(e, "bg");
    var N = E.add(e, "radius_off", 1, 10);
    var z = E.add(e, "radius_on", 1, 10);
    var I = E.add(e, "spacing", 20, 50).step(1);
    var B = R.add(e, "logo");
    var j = R.add(e, "logo_size_off", 3, 8);
    var X = R.add(e, "logo_size_on", 3, 8);
    var H = R.add(e, "logo_stroke_width", 1, 5);
    M.add(e, "ripple_falloff", .1, 2);
    M.add(e, "ripple_speed", 1, 50);
    M.add(e, "ripple_length", 1, 1e9);
    I.onChange(Y);
    N.onChange(Y);
    z.onChange(Y);
    B.onChange(Y);
    j.onChange(Y);
    X.onChange(Y);
    H.onChange(Y);
    L.onChange(Y);
    F.onChange(Y);
    D.onChange(Y);
    A.close();
    t = document.querySelector("canvas");
    i = t.getContext("2d");
    i.font = "8px Arial";
    Y();
    V();
    function V() {
        requestAnimationFrame(V);
        if (g) {
            i.clearRect(0, 0, innerWidth, innerHeight);
            i.fillStyle = e.bg;
            i.fillRect(0, 0, t.width, t.height);
            for (f = 0; f < n.length; f++) {
                n[f].draw();
            }
        }
    }
    function U(t, n, r, s, o, a, l, h) {
        this.x = t;
        this.y = n;
        this.radius = this.radius_off = r;
        this.radius_on = s;
        this.color = this.color_off = o;
        this.color_on = a;
        this.number = h;
        this.fill_style = l;
        this.draw = function() {
            i.beginPath();
            i.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            switch (this.fill_style) {
              case "fill":
                i.fillStyle = this.color;
                i.fill();
                break;

              case "stroke":
                i.lineWidth = e.logo_stroke_width;
                i.strokeStyle = this.color;
                i.stroke();
                break;

              case "both":
                i.lineWidth = e.logo_stroke_width;
                i.strokeStyle = this.color;
                i.fillStyle = this.color;
                i.fill();
                i.stroke();
                break;
            }
        };
        this.print_number = function() {
            i.fillText(this.number + 1, this.x - 7, this.y - 5);
        };
    }
    function Y() {
        u = t.width = window.innerWidth;
        c = t.height = window.innerHeight;
        r = Math.floor(c / e.spacing) + 1;
        s = Math.floor(u / e.spacing) + 1;
        n = [];
        for (_ = 0; _ < r; _++) {
            for (d = 0; d < s; d++) {
                n.push(new U(d * e.spacing + e.spacing / 2, _ * e.spacing + e.spacing / 2, e.radius_off, e.radius_on, e.color_off, e.color_on, "fill", (_ + 1) * (d + 1)));
            }
        }
        if (e.logo) {
            if (!q(r)) {
                b = Math.floor(r * s / 2) - 1 - 2 * s;
            } else {
                b = Math.floor((r + 1) * s / 2) - 1 - 2 * s;
            }
            x = b;
            n[x].radius = n[x].radius_off = e.logo_size_off;
            n[x].radius_on = e.logo_size_on;
            n[x].color = n[x].color_off = e.color_on;
            n[x].color_on = "white";
            n[x].fill_style = "stroke";
            w = b + 1;
            n[w].radius = n[w].radius_off = e.logo_size_off;
            n[w].radius_on = e.logo_size_on;
            n[w].color = n[w].color_off = "white";
            n[w].color_on = "white";
            n[w].fill_style = "both";
            T = b + s;
            n[T].radius = n[T].radius_off = e.logo_size_off;
            n[T].radius_on = e.logo_size_on;
            n[T].color = n[T].color_off = e.color_on;
            n[T].color_on = "white";
            n[T].fill_style = "stroke";
            k = b + s + 1;
            n[k].radius = n[k].radius_off = e.logo_size_off;
            n[k].radius_on = e.logo_size_on;
            n[k].color = n[k].color_off = e.color_on;
            n[k].color_on = "white";
            n[k].fill_style = "stroke";
            S = b + 2 * s;
            n[S].radius = n[S].radius_off = e.logo_size_off;
            n[S].radius_on = e.logo_size_on;
            n[S].color = n[S].color_off = "white";
            n[S].color_on = "white";
            n[S].fill_style = "both";
            P = b + 2 * s + 1;
            n[P].radius = n[P].radius_off = e.logo_size_off;
            n[P].radius_on = e.logo_size_on;
            n[P].color = n[P].color_off = "white";
            n[P].color_on = "white";
            n[P].fill_style = "both";
        }
        for (f = 0; f < n.length; f++) {
            n[f].draw();
        }
    }
    function G(t, i) {
        g = true;
        m = 0;
        clearTimeout(v);
        var r = 1 / (e.ripple_speed * 1e4) * W(u, 320, 2e3);
        p = e.ripple_length * W(u, 360, 1600) / 1e13;
        for (f = 0; f < n.length; f++) {
            n[f].d = (l = t - n[f].x) * l + (h = i - n[f].y) * h;
            var s = new TimelineLite();
            var o = .04 + n[f].d * r + e.ripple_falloff + n[f].d * p;
            if (o > m) {
                m = o;
            }
            s.to(n[f], .04, {
                delay: n[f].d * r,
                radius: n[f].radius_on,
                color: n[f].color_on
            }).to(n[f], e.ripple_falloff, {
                delay: n[f].d * p,
                radius: n[f].radius_off,
                color: n[f].color_off
            });
        }
        v = setTimeout(function() {
            g = false;
        }, m * 1e3);
    }
    function W(t, e, i) {
        return (t - i) / (e - i);
    }
    function q(t) {
        return t % 2 == 0;
    }
    t.addEventListener("mousedown", function(e) {
        y = t.getBoundingClientRect();
        o = e.clientX - y.left;
        a = e.clientY - y.top;
        G(o, a);
    });
    window.addEventListener("resize", function() {
        clearTimeout(C);
        Y();
    }, false);
    window.addEventListener("focus", function() {
        clearTimeout(C);
        Y();
    }, false);
    function Q() {
        return {
            preset: "Preset1",
            closed: false,
            remembered: {
                aitch: {
                    "0": {
                        color_off: "#4e4e4e",
                        color_on: "#e65c68",
                        bg: "#000000",
                        radius_off: 1,
                        radius_on: 1.5,
                        spacing: 40,
                        logo: true,
                        ripple_falloff: 1.2,
                        ripple_speed: 12.027744270205067,
                        ripple_length: 5,
                        logo_size_off: 5,
                        logo_size_on: 6,
                        logo_stroke_width: 3
                    }
                },
                "black/pink": {
                    "0": {
                        radius_off: 1,
                        radius_on: 5,
                        spacing: 30,
                        color_off: "#373737",
                        color_on: "#fb0a8a",
                        bg: "#1b1b1b",
                        ripple_falloff: .8,
                        ripple_speed: 20,
                        ripple_length: 5
                    }
                },
                thick: {
                    "0": {
                        radius_off: 1,
                        radius_on: 5,
                        color_off: "#adb5ff",
                        color_on: "#0B24FB",
                        spacing: 30,
                        ripple_length: 247113562.7,
                        bg: "#ffffff",
                        ripple_falloff: 0,
                        ripple_speed: 20
                    }
                },
                "white/blue": {
                    "0": {
                        radius_off: 1,
                        radius_on: 2.444877222692633,
                        color_off: "#b1b9ff",
                        color_on: "#0073d9",
                        bg: "#ffffff",
                        spacing: 38.47248094834886,
                        ripple_falloff: 1,
                        ripple_speed: 20,
                        ripple_length: 59624333.2
                    }
                },
                trip: {
                    "0": {
                        color_off: "#373737",
                        color_on: "#84f0aa",
                        bg: "#1b1b1b",
                        radius_off: 1,
                        radius_on: 5,
                        spacing: 30,
                        ripple_falloff: .38443691786621514,
                        ripple_speed: 10,
                        ripple_length: 30247.248094834886
                    }
                },
                "8-bit": {
                    "0": {
                        color_off: "#4e4e4e",
                        color_on: "#e65c68",
                        bg: "#000000",
                        radius_off: 1,
                        radius_on: 2,
                        spacing: 32.376357056694815,
                        ripple_falloff: .8,
                        ripple_speed: 1,
                        ripple_length: 5
                    }
                },
                aitch_dense: {
                    "0": {
                        color_off: "#2a2a2a",
                        color_on: "#e65c68",
                        bg: "#000000",
                        radius_off: 1,
                        radius_on: 1.5,
                        spacing: 20,
                        logo: true,
                        logo_size_off: 3.408409443391349,
                        logo_size_on: 4.787006720661727,
                        logo_stroke_width: 2.0325693606755126,
                        ripple_falloff: .6742891607789074,
                        ripple_speed: 25.537997587454765,
                        ripple_length: 5
                    }
                },
                Preset1: {
                    "0": {
                        color_off: "#4e4e4e",
                        color_on: "#e65c68",
                        bg: "#000000",
                        radius_off: 1,
                        radius_on: 5.606238152679649,
                        spacing: 40,
                        logo: true,
                        logo_size_off: 5,
                        logo_size_on: 8,
                        logo_stroke_width: 3,
                        ripple_falloff: 1.2,
                        ripple_speed: 12.027744270205067,
                        ripple_length: 5
                    }
                }
            },
            folders: {
                Colors: {
                    preset: "Default",
                    closed: false,
                    folders: {}
                },
                Grid: {
                    preset: "Default",
                    closed: false,
                    folders: {}
                },
                Logo: {
                    preset: "Default",
                    closed: false,
                    folders: {}
                },
                "Ripple Animation": {
                    preset: "Default",
                    closed: false,
                    folders: {}
                }
            }
        };
    }
};

window.setTimeout(function() {
    document.querySelector("#preloader").classList.add("loaded");
    document.querySelector("#main").classList.add("loaded");
}, 3e3);

window.setTimeout(function() {
    var t = new TimelineLite();
    t.to("#block-1", 1, {
        width: "100%",
        ease: Power4.easeInOut
    }).to("#block-1", 1, {
        width: "0",
        left: "100%",
        ease: Power4.easeInOut
    }, 1);
    t.to("#block-2", 1, {
        width: "100%",
        ease: Power4.easeInOut
    }, .2).to("#block-2", 1, {
        width: "0",
        left: "100%",
        ease: Power4.easeInOut
    }, 1.2);
    t.to("#block-3", 1, {
        width: "100%",
        ease: Power4.easeInOut
    }, .4).to("#block-3", 1, {
        width: "0",
        left: "100%",
        ease: Power4.easeInOut
    }, 1.4);
}, 2e3);

window.addEventListener("load", engine.start, false);

function engine() {
    var t = [ aitch_grid, elastic_grid ];
}

engine.start = function() {
    console.log("=== Engine running ===");
    var t = document.getElementById()("logo");
};

engine.reset = function() {
    console.log("=== Engine reset ===");
    var t = Math.floor(Math.random() * fidgetList.length);
    fidgetList[t]();
};

function aitch_grid() {
    console.log("AITCH");
}

function elastic_grid() {
    console.log("ELASTIC");
}

logo.onclick = function() {
    engine.reset();
};