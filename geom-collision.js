var lerp = require("lerp");

module.exports = {
    lineLine: lineLine,
    lineCircle: lineCircle
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
                    result: "coincide"
                };
            }
        }
        return {
            result: "parallel"
        };
    }

    var ua = (b2b1X * ab1Y - b2b1Y * ab1X) / u_b;
    var ub = (a2a1X * ab1Y - a2a1Y * ab1X) / u_b;

    if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
        return {
            x: a1.x + ua * a2a1X,
            y: a1.y + ua * a2a1Y,
            result: "intersect"
        };
    }
    return {
        result: "none"
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

    var result = {entry: null, exit: null, result: null};
    if (deter < 0) {
        result.result = "outside";
    } else if (deter == 0) {
        result.result = "tangent";
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
                result.result = "outside";
            } else {
                result.result = "inside";
            }
        } else {
            result.result = "intersect";
            if (0 <= u1 && u1 <= 1)
                result.entry = {
                    x: lerp(a1.x, a2.x, u1),
                    y: lerp(a1.y, a2.y, u1)
                };
            if (0 <= u2 && u2 <= 1)
                result.exit = {
                    x: lerp(a1.x, a2.x, u2),
                    y: lerp(a1.y, a2.y, u2)
                };
        }
    }
    return result;
}