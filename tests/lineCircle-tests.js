var should = require("should");
var collision = require("../geom-collision");

describe('lineCircle', function () {

    it('inside', function () {
        var i = collision.lineCircle(
            {x: 0, y: -2},
            {x: 0, y: 2},
            {x: 0, y: 0},
            4
        );

        i.should.not.equal(null);
        i.result.should.equal("inside");
        should.equal(i.entry, null);
        should.equal(i.exit, null);
    });

    it('outside', function () {
        var i = collision.lineCircle(
            {x: 5, y: -2},
            {x: 5, y: 2},
            {x: 0, y: 0},
            4
        );

        i.should.not.equal(null);
        i.result.should.equal("outside");
        should.equal(i.entry, null);
        should.equal(i.exit, null);
    });

    it('intersect', function () {
        var i = collision.lineCircle(
            {x: 3, y: -4},
            {x: 3, y: 4},
            {x: 0, y: 0},
            4
        );

        i.should.not.equal(null);
        i.result.should.equal("intersect");
        i.entry.should.not.equal(null);
        i.exit.should.not.equal(null);
    });

    it('tangent', function () {
        var i = collision.lineCircle(
            {x: 4, y: -4},
            {x: 4, y: 4},
            {x: 0, y: 0},
            4
        );

        i.should.not.equal(null);
        i.result.should.equal("tangent");
        i.tangent.should.not.equal(null);
        i.tangent.x.should.equal(4);
        i.tangent.y.should.equal(0);
    });

});
