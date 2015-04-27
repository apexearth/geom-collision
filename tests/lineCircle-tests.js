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
        i.result.should.equal(collision.INSIDE);
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
        i.result.should.equal(collision.OUTSIDE);
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
        i.result.should.equal(collision.INTERSECT);
        i.entry.x.should.equal(3);
        i.entry.y.should.equal(2.6457513110645907);
        i.exit.x.should.equal(3);
        i.exit.y.should.equal(-2.6457513110645907);
    });

    it('tangent', function () {
        var i = collision.lineCircle(
            {x: 4, y: -4},
            {x: 4, y: 4},
            {x: 0, y: 0},
            4
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.TANGENT);
        i.tangent.should.not.equal(null);
        i.tangent.x.should.equal(4);
        i.tangent.y.should.equal(0);
    });

});
