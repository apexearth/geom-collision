var should = require("should");
var collision = require("../geom-collision");

describe('rectangleRectangleSimple', function () {

    it('inside', function () {
        var i = collision.rectangleRectangleSimple(
            {x: 0, y: 0},
            {x: 2, y: 1},
            {x: 0, y: 0},
            {x: 1, y: 2}
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.INTERSECT);
    });

    it('inside (coords swap)', function () {
        var i = collision.rectangleRectangleSimple(
            {x: 2, y: 1},
            {x: 0, y: 0},
            {x: 1, y: 2},
            {x: 0, y: 0}
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.INTERSECT);
    });

    it('outside top', function () {
        var i = collision.rectangleRectangleSimple(
            {x: 0, y: -4},
            {x: 2, y: -2},
            {x: 0, y: 0},
            {x: 2, y: 2}
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.OUTSIDE);
    });

    it('outside top right', function () {
        var i = collision.rectangleRectangleSimple(
            {x: 4, y: -4},
            {x: 6, y: -2},
            {x: 0, y: 0},
            {x: 2, y: 2}
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.OUTSIDE);
    });

    //TODO: More tests?
});
