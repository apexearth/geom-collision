var should = require("should");
var collision = require("../src");

describe('lineLine', function () {

    it('perpendicular', function () {
        var i = collision.lineLine(
            {x: 0, y: -2},
            {x: 0, y: 2},
            {x: -2, y: 0},
            {x: 2, y: 0}
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.INTERSECT);
        i.x.should.equal(0);
        i.y.should.equal(0);
    });

    it('perpendicular outside', function () {
        var i = collision.lineLine(
            {x: 0, y: -4},
            {x: 0, y: -2},
            {x: -2, y: 0},
            {x: 2, y: 0}
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.OUTSIDE);
    });

    it('parallel', function () {
        var i = collision.lineLine(
            {x: 2, y: -1},
            {x: 1, y: 3},
            {x: 1, y: -2},
            {x: 0, y: 2}
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.PARALLEL);
    });

    it('parallel, almost coinciding 1', function () {
        var i = collision.lineLine(
            {x: 0, y: -2},
            {x: 0, y: -1},
            {x: 0, y: 1},
            {x: 0, y: 2}
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.PARALLEL);
    });
    it('parallel, almost coinciding 2', function () {
        var i = collision.lineLine(
            {x: 0, y: 1},
            {x: 0, y: 2},
            {x: 0, y: -2},
            {x: 0, y: -1}
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.PARALLEL);
    });
    it('parallel, almost coinciding 3', function () {
        var i = collision.lineLine(
            {x: 1, y: 0},
            {x: 2, y: 0},
            {x: 3, y: 0},
            {x: 4, y: 0}
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.PARALLEL);
    });
    it('parallel, almost coinciding 4', function () {
        var i = collision.lineLine(
            {x: 3, y: 0},
            {x: 4, y: 0},
            {x: 1, y: 0},
            {x: 2, y: 0}
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.PARALLEL);
    });


    it('identical / coincide', function () {
        var i = collision.lineLine(
            {x: 0, y: -2},
            {x: 0, y: -1},
            {x: 0, y: -2},
            {x: 0, y: -1}
        );

        i.should.not.equal(null);
        i.x.should.equal(Infinity);
        i.y.should.equal(Infinity);
        i.result.should.equal(collision.COINCIDE)
    });

    it('partial coincide', function () {
        var i = collision.lineLine(
            {x: 3, y: 3},
            {x: 1, y: 1},
            {x: 2, y: 2},
            {x: 0, y: 0}
        );

        i.should.not.equal(null);
        i.x.should.equal(Infinity);
        i.y.should.equal(Infinity);
        i.result.should.equal(collision.COINCIDE)
    });

});
