var should = require('should');
var collision = require('../../src/index');

describe('rectangleCircleSimple', function () {

    it('inside', function () {
        var i = collision.rectangleCircleSimple(
            {x: 0, y: -2},
            {x: 2, y: 2},
            {x: 0, y: 0},
            4
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.INSIDE);
        should.equal(i.entry, null);
        should.equal(i.exit, null);
        should.equal(i.tangent, null);
    });

    it('outside', function () {
        var i = collision.rectangleCircleSimple(
            {x: 0, y: -2},
            {x: 2, y: 2},
            {x: 10, y: 0},
            4
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.OUTSIDE);
        should.equal(i.entry, null);
        should.equal(i.exit, null);
        should.equal(i.tangent, null);
    });

    it('tangent', function () {
        var i = collision.rectangleCircleSimple(
            {x: 0, y: -2},
            {x: 2, y: 2},
            {x: 6, y: 0},
            4
        );

        i.should.not.equal(null);
        i.result.should.equal(collision.TANGENT);
        should.equal(i.entry, null);
        should.equal(i.exit, null);
        i.tangents[0].x.should.equal(2);
        i.tangents[0].y.should.equal(0);
    });

    it('intersections', function () {
        var i = collision.rectangleCircleSimple(
            {x: -1, y: -1},
            {x: 1, y: 1},
            {x:.2, y: 0},
            1.1
        );

        i.should.not.equal(null);
        should.equal(i.entry, null);
        should.equal(i.exit, null);
        should.equal(i.tangent, null);
        i.result.should.equal(collision.INTERSECT);
        i.intersections.length.should.equal(6);
        i.intersections[0].x.should.equal(0.6582575694955841);
        i.intersections[0].y.should.equal(1);
        i.intersections[1].x.should.equal(-0.2582575694955842);
        i.intersections[1].y.should.equal(1);
        i.intersections[2].x.should.equal(1);
        i.intersections[2].y.should.equal(0.754983443527075);
        i.intersections[3].x.should.equal(1);
        i.intersections[3].y.should.equal(-0.754983443527075);
        i.intersections[4].x.should.equal(0.6582575694955841);
        i.intersections[4].y.should.equal(-1);
        i.intersections[5].x.should.equal(-0.2582575694955842);
        i.intersections[5].y.should.equal(-1);
    });

});
