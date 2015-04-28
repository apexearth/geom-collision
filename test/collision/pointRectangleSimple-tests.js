var should = require("should");
var collision = require("../../src/index");

describe('pointRectangleSimple', function () {

    it('inside', function () {
        var i = collision.pointRectangleSimple(
            {x: 0, y: 0},
            {x: 0, y: 0},
            {x: 1, y: 2}
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.INSIDE);
    });

    it('outside bottom right', function () {
        var i = collision.pointRectangleSimple(
            {x: 3, y: 3},
            {x: 0, y: 0},
            {x: 2, y: 2}
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.OUTSIDE);
    });

    it('outside bottom left', function () {
        var i = collision.pointRectangleSimple(
            {x: -1, y: 3},
            {x: 0, y: 0},
            {x: 2, y: 2}
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.OUTSIDE);
    });

    it('outside top left', function () {
        var i = collision.pointRectangleSimple(
            {x: -1, y: -1},
            {x: 0, y: 0},
            {x: 2, y: 2}
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.OUTSIDE);
    });

    it('outside top right', function () {
        var i = collision.pointRectangleSimple(
            {x: 3, y: -1},
            {x: 0, y: 0},
            {x: 2, y: 2}
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.OUTSIDE);
    });

    it('outside top', function () {
        var i = collision.pointRectangleSimple(
            {x: 1, y: -1},
            {x: 0, y: 0},
            {x: 2, y: 2}
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.OUTSIDE);
    });

    it('outside left', function () {
        var i = collision.pointRectangleSimple(
            {x: -1, y: 1},
            {x: 0, y: 0},
            {x: 2, y: 2}
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.OUTSIDE);
    });

    it('outside bottom', function () {
        var i = collision.pointRectangleSimple(
            {x: 1, y: 3},
            {x: 0, y: 0},
            {x: 2, y: 2}
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.OUTSIDE);
    });

    it('outside right', function () {
        var i = collision.pointRectangleSimple(
            {x: 3, y: 1},
            {x: 0, y: 0},
            {x: 2, y: 2}
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.OUTSIDE);
    });


});
