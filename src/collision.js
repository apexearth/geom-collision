var lerp = require("lerp");

var collision = module.exports = {
    lineLine: lineLine,
    lineCircle: lineCircle,
    rectangleCircleSimple: rectangleCircleSimple,
    pointRectangleSimple: pointRectangleSimple,
    rectangleRectangleSimple: rectangleRectangleSimple,

    INTERSECT: "intersect",
    INSIDE: "inside",
    OUTSIDE: "outside",
    COINCIDE: "coincide",
    PARALLEL: "parallel",
    TANGENT: "tangent"
};


function lineLine(a1, a2, b1, b2) {
    var b2b1X = b2.x - b1.x;
    var b2b1Y = b2.y - b1.y;
    var a2a1X = a2.x - a1.x;
    var a2a1Y = a2.y - a1.y;
    var ab1X = a1.x - b1.x;
    var ab1Y = a1.y - b1.y;

    var u_b = b2b1Y * a2a1X - b2b1X * a2a1Y;
    if (u_b == 0) {
        if ((b2b1X * ab1Y - b2b1Y * ab1X) === 0 ||
            (a2a1X * ab1Y - a2a1Y * ab1X) === 0) {

            if (!(
                a1.x < b1.x && a1.x < b2.x && a2.x < b1.x && a2.x < b2.x ||
                a1.y < b1.y && a1.y < b2.y && a2.y < b1.y && a2.y < b2.y ||
                a1.x > b1.x && a1.x > b2.x && a2.x > b1.x && a2.x > b2.x ||
                a1.y > b1.y && a1.y > b2.y && a2.y > b1.y && a2.y > b2.y
                )) {
                return {
                    x: Infinity,
                    y: Infinity,
                    result: collision.COINCIDE
                };
            }
        }
        return {
            result: collision.PARALLEL
        };
    }

    var ua = (b2b1X * ab1Y - b2b1Y * ab1X) / u_b;
    var ub = (a2a1X * ab1Y - a2a1Y * ab1X) / u_b;

    if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
        return {
            x: a1.x + ua * a2a1X,
            y: a1.y + ua * a2a1Y,
            result: collision.INTERSECT
        };
    }
    return {
        result: collision.OUTSIDE
    };
}


function lineCircle(a1, a2, c, r) {
    var a2a1x = (a2.x - a1.x);
    var a2a1y = (a2.y - a1.y);
    var a = a2a1x * a2a1x + a2a1y * a2a1y;
    var a1cx = (a1.x - c.x);
    var b = 2 * ( a2a1x * a1cx + a2a1y * (a1.y - c.y) );
    var cc = c.x * c.x + c.y * c.y + a1.x * a1.x + a1.y * a1.y -
        2 * (c.x * a1.x + c.y * a1.y) - r * r;
    var deter = b * b - 4 * a * cc;

    var result = {
        entry: null,
        exit: null,
        tangent: null,
        intersections: [],
        result: null
    };

    if (deter < 0) {
        result.result = collision.OUTSIDE;
    } else if (deter == 0) {
        result.result = collision.TANGENT;
        var u = ( -b) / ( 2 * a );
        result.tangent = {
            x: lerp(a1.x, a2.x, u),
            y: lerp(a1.y, a2.y, u)
        }
    } else {
        var e = Math.sqrt(deter);
        var u1 = ( -b + e ) / ( 2 * a );
        var u2 = ( -b - e ) / ( 2 * a );


        if ((u1 < 0 || u1 > 1) && (u2 < 0 || u2 > 1)) {
            if ((u1 < 0 && u2 < 0) || (u1 > 1 && u2 > 1)) {
                result.result = collision.OUTSIDE;
            } else {
                result.result = collision.INSIDE;
            }
        } else {
            result.result = collision.INTERSECT;
            if (0 <= u1 && u1 <= 1) {
                result.entry = {
                    x: lerp(a1.x, a2.x, u1),
                    y: lerp(a1.y, a2.y, u1)
                };
                result.intersections.push(result.entry);
            }
            if (0 <= u2 && u2 <= 1) {
                result.exit = {
                    x: lerp(a1.x, a2.x, u2),
                    y: lerp(a1.y, a2.y, u2)
                };
                result.intersections.push(result.exit);
            }
        }
    }
    return result;
}


function rectangleCircleSimple(a1, a2, c, r) {
    var results = [
        lineCircle(a1, {x: a2.x, y: a1.y}, c, r),
        lineCircle({x: a2.x, y: a1.y}, a2, c, r),
        lineCircle({x: a1.x, y: a2.y}, {x: a2.x, y: a2.y}, c, r),
        lineCircle({x: a1.x, y: a1.y}, {x: a1.x, y: a2.y}, c, r)
    ];
    var result = {
        result: null,
        intersections: [],
        tangents: []
    };
    var i = 4;
    while (i--) {
        var currentResult = results[i];
        if (result.result === null
            || result.result === collision.INSIDE && currentResult.result === collision.INTERSECT
            || result.result === collision.TANGENT && (currentResult.result === collision.INTERSECT || currentResult.result === collision.INSIDE)
            || result.result === collision.OUTSIDE
        )
            result.result = currentResult.result;

        if (currentResult.intersections.length > 0)
            result.intersections = result.intersections.concat(currentResult.intersections);

        if(currentResult.result === collision.TANGENT) {
            result.tangents.push(currentResult.tangent);
        }
    }
    return result;
}


/**
 * Inclusive
 * @returns {*}
 */
function pointRectangleSimple(p, a1, a2) {
    if (!(a1.x > p.x ||
        a2.x < p.x ||
        a1.y > p.y ||
        a2.y < p.y))
        return {result: collision.INSIDE};
    return {result: collision.OUTSIDE};
}


function rectangleRectangleSimple(a1, a2, b1, b2) {
    if (a1.x > a2.x || a1.y > a2.y) {
        var na1 = {
            x: a1.x > a2.x ? a2.x : a1.x,
            y: a1.y > a2.y ? a2.y : a1.y
        };
        var na2 = {
            x: a1.x < a2.x ? a2.x : a1.x,
            y: a1.y < a2.y ? a2.y : a1.y
        };
        a1 = na1;
        a2 = na2;
    }

    if (b1.x > b2.x || b1.y > b2.y) {
        var nb1 = {
            x: b1.x > b2.x ? b2.x : b1.x,
            y: b1.y > b2.y ? b2.y : b1.y
        };
        var nb2 = {
            x: b1.x < b2.x ? b2.x : b1.x,
            y: b1.y < b2.y ? b2.y : b1.y
        };
        b1 = nb1;
        b2 = nb2;
    }

    if (!(a1.x > b2.x ||
        a2.x < b1.x ||
        a1.y > b2.y ||
        a2.y < b1.y)) {
        return {
            result: collision.INTERSECT
        };
    }
    return {
        result: collision.OUTSIDE
    };
}