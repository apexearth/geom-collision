var should = require('should');
var collision = require('../../src').xywh;

describe('rectangleRectangleSimple', function () {

    it('inside', function () {
        var i = collision.rectangleRectangleSimple(
            {x: 0, y: 0, width: 2, height: 1},
            {x: 0, y: 0, width: 1, height: 2}
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.INTERSECT);
    });

    it('outside top', function () {
        var i = collision.rectangleRectangleSimple(
            {x: 0, y: -4, width: 2, height: 2},
            {x: 0, y: 0, width: 2, height: 2}
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.OUTSIDE);
    });

    it('outside top right', function () {
        var i = collision.rectangleRectangleSimple(
            {x: 4, y: -4, width: 2, height: 2},
            {x: 0, y: 0, width: 2, height: 2}
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.OUTSIDE);
    });

    //TODO: More tests?
});
