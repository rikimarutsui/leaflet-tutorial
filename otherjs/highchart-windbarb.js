/*
  Highcharts JS v7.0.3 (2019-02-06)
 Wind barb series module

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(g) {
    "object" === typeof module && module.exports ? (g["default"] = g, module.exports = g) : "function" === typeof define && define.amd ? define(function() {
        return g
    }) : g("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function(g) {
    var q = function(f) {
        var g = f.defined,
            y = f.seriesTypes,
            d = f.stableSort;
        return {
            getPlotBox: function() {
                return f.Series.prototype.getPlotBox.call(this.options.onSeries && this.chart.get(this.options.onSeries) || this)
            },
            translate: function() {
                y.column.prototype.translate.apply(this);
                var e = this,
                    c = e.options,
                    a = e.chart,
                    b = e.points,
                    f = b.length - 1,
                    m, h = c.onSeries,
                    h = h && a.get(h),
                    c = c.onKey || "y",
                    x = h && h.options.step,
                    n = h && h.points,
                    l = n && n.length,
                    u = a.inverted,
                    r = e.xAxis,
                    q = e.yAxis,
                    v = 0,
                    k, w, p, t;
                if (h && h.visible && l)
                    for (v = (h.pointXOffset || 0) + (h.barW || 0) / 2, a = h.currentDataGrouping, w = n[l - 1].x + (a ? a.totalRange : 0), d(b, function(a, b) {
                            return a.x - b.x
                        }), c = "plot" + c[0].toUpperCase() + c.substr(1); l-- && b[f] && !(k = n[l], a = b[f], a.y = k.y, k.x <= a.x && void 0 !== k[c] && (a.x <= w && (a.plotY = k[c], k.x < a.x && !x && (p = n[l + 1]) && void 0 !== p[c] && (t = (a.x -
                            k.x) / (p.x - k.x), a.plotY += t * (p[c] - k[c]), a.y += t * (p.y - k.y))), f--, l++, 0 > f)););
                b.forEach(function(a, c) {
                    var d;
                    a.plotX += v;
                    if (void 0 === a.plotY || u) 0 <= a.plotX && a.plotX <= r.len ? u ? (a.plotY = r.translate(a.x, 0, 1, 0, 1), a.plotX = g(a.y) ? q.translate(a.y, 0, 0, 0, 1) : 0) : a.plotY = (r.opposite ? 0 : e.yAxis.len) + r.offset : a.shapeArgs = {};
                    (m = b[c - 1]) && m.plotX === a.plotX && (void 0 === m.stackIndex && (m.stackIndex = 0), d = m.stackIndex + 1);
                    a.stackIndex = d
                });
                this.onSeries = h
            }
        }
    }(g);
    (function(f, g) {
        var q = f.seriesType;
        q("windbarb", "column", {
            lineWidth: 2,
            onSeries: null,
            states: {
                hover: {
                    lineWidthPlus: 0
                }
            },
            tooltip: {
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.value}\x3c/b\x3e ({point.beaufort})\x3cbr/\x3e'
            },
            vectorLength: 20,
            yOffset: -20,
            xOffset: 0
        }, {
            pointArrayMap: ["value", "direction"],
            parallelArrays: ["x", "value", "direction"],
            beaufortName: "Calm;Light air;Light breeze;Gentle breeze;Moderate breeze;Fresh breeze;Strong breeze;Near gale;Gale;Strong gale;Storm;Violent storm;Hurricane".split(";"),
            beaufortFloor: [0, .3,
                1.6, 3.4, 5.5, 8, 10.8, 13.9, 17.2, 20.8, 24.5, 28.5, 32.7
            ],
            trackerGroups: ["markerGroup"],
            pointAttribs: function(d, e) {
                var c = this.options;
                d = d.color || this.color;
                var a = this.options.lineWidth;
                e && (d = c.states[e].color || d, a = (c.states[e].lineWidth || a) + (c.states[e].lineWidthPlus || 0));
                return {
                    stroke: d,
                    "stroke-width": a
                }
            },
            markerAttribs: function() {},
            getPlotBox: g.getPlotBox,
            windArrow: function(d) {
                var e = 1.943844 * d.value,
                    c, a = this.options.vectorLength / 20,
                    b = -10;
                if (d.isNull) return [];
                if (0 === d.beaufortLevel) return this.chart.renderer.symbols.circle(-10 *
                    a, -10 * a, 20 * a, 20 * a);
                d = ["M", 0, 7 * a, "L", -1.5 * a, 7 * a, 0, 10 * a, 1.5 * a, 7 * a, 0, 7 * a, 0, -10 * a];
                c = (e - e % 50) / 50;
                if (0 < c)
                    for (; c--;) d.push(-10 === b ? "L" : "M", 0, b * a, "L", 5 * a, b * a + 2, "L", 0, b * a + 4), e -= 50, b += 7;
                c = (e - e % 10) / 10;
                if (0 < c)
                    for (; c--;) d.push(-10 === b ? "L" : "M", 0, b * a, "L", 7 * a, b * a), e -= 10, b += 3;
                c = (e - e % 5) / 5;
                if (0 < c)
                    for (; c--;) d.push(-10 === b ? "L" : "M", 0, b * a, "L", 4 * a, b * a), e -= 5, b += 3;
                return d
            },
            translate: function() {
                var d = this.beaufortFloor,
                    e = this.beaufortName;
                g.translate.call(this);
                this.points.forEach(function(c) {
                    for (var a = 0; a < d.length && !(d[a] >
                            c.value); a++);
                    c.beaufortLevel = a - 1;
                    c.beaufort = e[a - 1]
                })
            },
            drawPoints: function() {
                var d = this.chart,
                    e = this.yAxis,
                    c = d.inverted,
                    a = this.options.vectorLength / 2;
                this.points.forEach(function(b) {
                    var f = b.plotX,
                        g = b.plotY;
                    d.isInsidePlot(f, 0, !1) ? (b.graphic || (b.graphic = this.chart.renderer.path().add(this.markerGroup)), b.graphic.attr({
                        d: this.windArrow(b),
                        translateX: f + this.options.xOffset,
                        translateY: g + this.options.yOffset,
                        rotation: b.direction
                    }).attr(this.pointAttribs(b))) : b.graphic && (b.graphic = b.graphic.destroy());
                    b.tooltipPos = [f + this.options.xOffset + (c && !this.onSeries ? a : 0), g + this.options.yOffset - (c ? 0 : a + e.pos - d.plotTop)]
                }, this)
            },
            animate: function(d) {
                d ? this.markerGroup.attr({
                    opacity: .01
                }) : (this.markerGroup.animate({
                    opacity: 1
                }, f.animObject(this.options.animation)), this.animate = null)
            },
            invertGroups: f.noop
        }, {
            isValid: function() {
                return f.isNumber(this.value) && 0 <= this.value
            }
        })
    })(g, q)
});//# sourceMappingURL=windbarb.js.map