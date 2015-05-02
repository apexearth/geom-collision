/**
 * Wrapper for certain geom-collision methods to use objects containing x, y, width, height.
 */
var collision = require('./collision');
module.exports = {
    rectangleRectangleSimple: rectangleRectangleSimple,

    INTERSECT: collision.INTERSECT,
    INSIDE: collision.INSIDE,
    OUTSIDE: collision.OUTSIDE,
    COINCIDE: collision.COINCIDE,
    PARALLEL: collision.PARALLEL,
    TANGENT: collision.TANGENT
};

function getBottomRight(obj) {
    return {
        x: obj.x + obj.width,
        y: obj.y + obj.height
    };
}

function rectangleRectangleSimple(obj1, obj2) {
    return collision.rectangleRectangleSimple(
        obj1,
        getBottomRight(obj1),
        obj2,
        getBottomRight(obj2)
    );
}