module.exports = {
    lineLine: lineLine
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
                return {x: Infinity, y: Infinity};
            }
        }
        return null;
    }

    var ua = (b2b1X * ab1Y - b2b1Y * ab1X) / u_b;
    var ub = (a2a1X * ab1Y - a2a1Y * ab1X) / u_b;

    if (0 <= ua && ua <= 1 && 0 <= ub && ub <= 1) {
        return {
            x: a1.x + ua * a2a1X,
            y: a1.y + ua * a2a1Y
        };
    }
    return null;
}