var TWEEN = TWEEN || function() {
    var n = [];
    return {
        getAll: function() {
            return n
        },
        removeAll: function() {
            n = []
        },
        add: function(t) {
            n.push(t)
        },
        remove: function(t) {
            var r = n.indexOf(t);
            r !== -1 && n.splice(r, 1)
        },
        update: function(t, r) {
            if (0 === n.length) return !1;
            var i = 0;
            for (t = void 0 !== t ? t : TWEEN.now(); i < n.length;) n[i].update(t) || r ? i++ : n.splice(i, 1);
            return !0
        }
    }
}();
(function() {
    void 0 === this.window && void 0 !== this.process ? TWEEN.now = function() {
        var n = process.hrtime();
        return 1e3 * n[0] + n[1] / 1e3
    } : void 0 !== this.window && void 0 !== window.performance && void 0 !== window.performance.now ? TWEEN.now = window.performance.now.bind(window.performance) : void 0 !== Date.now ? TWEEN.now = Date.now : TWEEN.now = function() {
        return (new Date).getTime()
    }
}).bind(this)(), TWEEN.Tween = function(n) {
        var t, r = n,
            i = {},
            o = {},
            u = {},
            e = 1e3,
            a = 0,
            f = !1,
            c = !1,
            s = !1,
            h = 0,
            l = null,
            E = TWEEN.Easing.Linear.None,
            p = TWEEN.Interpolation.Linear,
            d = [],
            v = null,
            w = !1,
            I = null,
            M = null,
            T = null;
        for (var N in n) i[N] = parseFloat(n[N], 10);
        this.to = function(n, t) {
            return void 0 !== t && (e = t), o = n, this
        }, this.start = function(n) {
            TWEEN.add(this), c = !0, w = !1, l = void 0 !== n ? n : TWEEN.now(), l += h;
            for (var t in o) {
                if (o[t] instanceof Array) {
                    if (0 === o[t].length) continue;
                    o[t] = [r[t]].concat(o[t])
                }
                void 0 !== i[t] && (i[t] = r[t], i[t] instanceof Array == !1 && (i[t] *= 1), u[t] = i[t] || 0)
            }
            return this
        }, this.stop = function() {
            return c ? (TWEEN.remove(this), c = !1, null !== T && T.call(r), this.stopChainedTweens(), this) : this
        }, this.end = function() {
            return this.update(l + e), this
        }, this.stopChainedTweens = function() {
            for (var n = 0, t = d.length; n < t; n++) d[n].stop()
        }, this.delay = function(n) {
            return h = n, this
        }, this.repeat = function(n) {
            return a = n, this
        }, this.repeatDelay = function(n) {
            return t = n, this
        }, this.yoyo = function(n) {
            return f = n, this
        }, this.easing = function(n) {
            return E = n, this
        }, this.interpolation = function(n) {
            return p = n, this
        }, this.chain = function() {
            return d = arguments, this
        }, this.onStart = function(n) {
            return v = n, this
        }, this.onUpdate = function(n) {
            return I = n, this
        }, this.onComplete = function(n) {
            return M = n, this
        }, this.onStop = function(n) {
            return T = n, this
        }, this.update = function(n) {
            var c, T, N;
            if (n < l) return !0;
            w === !1 && (null !== v && v.call(r), w = !0), T = (n - l) / e, T = T > 1 ? 1 : T, N = E(T);
            for (c in o)
                if (void 0 !== i[c]) {
                    var W = i[c] || 0,
                        O = o[c];
                    O instanceof Array ? r[c] = p(O, N) : ("string" == typeof O && (O = "+" === O.charAt(0) || "-" === O.charAt(0) ? W + parseFloat(O, 10) : parseFloat(O, 10)), "number" == typeof O && (r[c] = W + (O - W) * N))
                }
            if (null !== I && I.call(r, N), 1 === T) {
                if (a > 0) {
                    isFinite(a) && a--;
                    for (c in u) {
                        if ("string" == typeof o[c] && (u[c] = u[c] + parseFloat(o[c], 10)), f) {
                            var m = u[c];
                            u[c] = o[c], o[c] = m
                        }
                        i[c] = u[c]
                    }
                    return f && (s = !s), l = void 0 !== t ? n + t : n + h, !0
                }
                null !== M && M.call(r);
                for (var g = 0, y = d.length; g < y; g++) d[g].start(l + e);
                return !1
            }
            return !0
        }
    }, TWEEN.Easing = {
        Linear: {
            None: function(n) {
                return n
            }
        },
        Quadratic: {
            In: function(n) {
                return n * n
            },
            Out: function(n) {
                return n * (2 - n)
            },
            InOut: function(n) {
                return (n *= 2) < 1 ? .5 * n * n : -.5 * (--n * (n - 2) - 1)
            }
        },
        Cubic: {
            In: function(n) {
                return n * n * n
            },
            Out: function(n) {
                return --n * n * n + 1
            },
            InOut: function(n) {
                return (n *= 2) < 1 ? .5 * n * n * n : .5 * ((n -= 2) * n * n + 2)
            }
        },
        Quartic: {
            In: function(n) {
                return n * n * n * n
            },
            Out: function(n) {
                return 1 - --n * n * n * n
            },
            InOut: function(n) {
                return (n *= 2) < 1 ? .5 * n * n * n * n : -.5 * ((n -= 2) * n * n * n - 2)
            }
        },
        Quintic: {
            In: function(n) {
                return n * n * n * n * n
            },
            Out: function(n) {
                return --n * n * n * n * n + 1
            },
            InOut: function(n) {
                return (n *= 2) < 1 ? .5 * n * n * n * n * n : .5 * ((n -= 2) * n * n * n * n + 2)
            }
        },
        Sinusoidal: {
            In: function(n) {
                return 1 - Math.cos(n * Math.PI / 2)
            },
            Out: function(n) {
                return Math.sin(n * Math.PI / 2)
            },
            InOut: function(n) {
                return .5 * (1 - Math.cos(Math.PI * n))
            }
        },
        Exponential: {
            In: function(n) {
                return 0 === n ? 0 : Math.pow(1024, n - 1)
            },
            Out: function(n) {
                return 1 === n ? 1 : 1 - Math.pow(2, -10 * n)
            },
            InOut: function(n) {
                return 0 === n ? 0 : 1 === n ? 1 : (n *= 2) < 1 ? .5 * Math.pow(1024, n - 1) : .5 * (-Math.pow(2, -10 * (n - 1)) + 2)
            }
        },
        Circular: {
            In: function(n) {
                return 1 - Math.sqrt(1 - n * n)
            },
            Out: function(n) {
                return Math.sqrt(1 - --n * n)
            },
            InOut: function(n) {
                return (n *= 2) < 1 ? -.5 * (Math.sqrt(1 - n * n) - 1) : .5 * (Math.sqrt(1 - (n -= 2) * n) + 1)
            }
        },
        Elastic: {
            In: function(n) {
                return 0 === n ? 0 : 1 === n ? 1 : -Math.pow(2, 10 * (n - 1)) * Math.sin(5 * (n - 1.1) * Math.PI)
            },
            Out: function(n) {
                return 0 === n ? 0 : 1 === n ? 1 : Math.pow(2, -10 * n) * Math.sin(5 * (n - .1) * Math.PI) + 1
            },
            InOut: function(n) {
                return 0 === n ? 0 : 1 === n ? 1 : (n *= 2, n < 1 ? -.5 * Math.pow(2, 10 * (n - 1)) * Math.sin(5 * (n - 1.1) * Math.PI) : .5 * Math.pow(2, -10 * (n - 1)) * Math.sin(5 * (n - 1.1) * Math.PI) + 1)
            }
        },
        Back: {
            In: function(n) {
                var t = 1.70158;
                return n * n * ((t + 1) * n - t)
            },
            Out: function(n) {
                var t = 1.70158;
                return --n * n * ((t + 1) * n + t) + 1
            },
            InOut: function(n) {
                var t = 2.5949095;
                return (n *= 2) < 1 ? .5 * (n * n * ((t + 1) * n - t)) : .5 * ((n -= 2) * n * ((t + 1) * n + t) + 2)
            }
        },
        Bounce: {
            In: function(n) {
                return 1 - TWEEN.Easing.Bounce.Out(1 - n)
            },
            Out: function(n) {
                return n < 1 / 2.75 ? 7.5625 * n * n : n < 2 / 2.75 ? 7.5625 * (n -= 1.5 / 2.75) * n + .75 : n < 2.5 / 2.75 ? 7.5625 * (n -= 2.25 / 2.75) * n + .9375 : 7.5625 * (n -= 2.625 / 2.75) * n + .984375
            },
            InOut: function(n) {
                return n < .5 ? .5 * TWEEN.Easing.Bounce.In(2 * n) : .5 * TWEEN.Easing.Bounce.Out(2 * n - 1) + .5
            }
        }
    }, TWEEN.Interpolation = {
        Linear: function(n, t) {
            var r = n.length - 1,
                i = r * t,
                o = Math.floor(i),
                u = TWEEN.Interpolation.Utils.Linear;
            return t < 0 ? u(n[0], n[1], i) : t > 1 ? u(n[r], n[r - 1], r - i) : u(n[o], n[o + 1 > r ? r : o + 1], i - o)
        },
        Bezier: function(n, t) {
            for (var r = 0, i = n.length - 1, o = Math.pow, u = TWEEN.Interpolation.Utils.Bernstein, e = 0; e <= i; e++) r += o(1 - t, i - e) * o(t, e) * n[e] * u(i, e);
            return r
        },
        CatmullRom: function(n, t) {
            var r = n.length - 1,
                i = r * t,
                o = Math.floor(i),
                u = TWEEN.Interpolation.Utils.CatmullRom;
            return n[0] === n[r] ? (t < 0 && (o = Math.floor(i = r * (1 + t))), u(n[(o - 1 + r) % r], n[o], n[(o + 1) % r], n[(o + 2) % r], i - o)) : t < 0 ? n[0] - (u(n[0], n[0], n[1], n[1], -i) - n[0]) : t > 1 ? n[r] - (u(n[r], n[r], n[r - 1], n[r - 1], i - r) - n[r]) : u(n[o ? o - 1 : 0], n[o], n[r < o + 1 ? r : o + 1], n[r < o + 2 ? r : o + 2], i - o)
        },
        Utils: {
            Linear: function(n, t, r) {
                return (t - n) * r + n
            },
            Bernstein: function(n, t) {
                var r = TWEEN.Interpolation.Utils.Factorial;
                return r(n) / r(t) / r(n - t)
            },
            Factorial: function() {
                var n = [1];
                return function(t) {
                    var r = 1;
                    if (n[t]) return n[t];
                    for (var i = t; i > 1; i--) r *= i;
                    return n[t] = r, r
                }
            }(),
            CatmullRom: function(n, t, r, i, o) {
                var u = .5 * (r - n),
                    e = .5 * (i - t),
                    a = o * o,
                    f = o * a;
                return (2 * t - 2 * r + u + e) * f + (-3 * t + 3 * r - 2 * u - e) * a + u * o + t
            }
        }
    },
    function(n) {
        "function" == typeof define && define.amd ? define([], function() {
            return TWEEN
        }) : "undefined" != typeof module && "object" == typeof exports ? module.exports = TWEEN : void 0 !== n && (n.TWEEN = TWEEN)
    }(this);