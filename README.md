# geom-collision
#### Geometry Collision Detection

[![Build Status](https://travis-ci.org/apexearth/geom-collision.svg)](https://travis-ci.org/apexearth/geom-collision)

This library has some useful collision detection methods.

```js
var collision = require("geom-collision");
```

### lineLine (a1, a2, b1, b2)

```js
var output = collision.lineLine(
    {x: 0, y: -2},   // Line 1 start
    {x: 0, y: 2},    // Line 1 stop
    {x: -2, y: 0},   // Line 2 start
    {x: 2, y: 0}     // Line 2 stop
);

// output.result == collision.INTERSECT == "intersect";
// output.x == 0;
// output.y == 0;
```

### lineCircle (a1, a2, c, r)

```js
var output = collision.lineCircle(
    {x: 3, y: -4},
    {x: 3, y: 4},
    {x: 0, y: 0},
    4
);

// output.result == collision.INTERSECT == "intersect";
// output.entry.x == 3;
// output.entry.y == 2.6457513110645907;
// output.exit.x == 3;
// output.exit.y == -2.6457513110645907;
```

### pointRectangleSimple (p1, a1, a2)

```js
var output = collision.pointRectangleSimple(
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 1, y: 2}
);

// output.result == collision.INSIDE == "inside";
```

### rectangleCircleSimple (a1, a2, c1, r)

```js
var output = collision.rectangleCircleSimple(
    {x: -1, y: -1},
    {x: 1, y: 1},
    {x:.2, y: 0},
    1.1
);

output.result.should.equal(collision.INTERSECT);
output.intersections.length.should.equal(6);
output.intersections[0].x.should.equal(0.6582575694955841);
output.intersections[0].y.should.equal(1);
output.intersections[1].x.should.equal(-0.2582575694955842);
output.intersections[1].y.should.equal(1);
output.intersections[2].x.should.equal(1);
output.intersections[2].y.should.equal(0.754983443527075);
output.intersections[3].x.should.equal(1);
output.intersections[3].y.should.equal(-0.754983443527075);
output.intersections[4].x.should.equal(0.6582575694955841);
output.intersections[4].y.should.equal(-1);
output.intersections[5].x.should.equal(-0.2582575694955842);
output.intersections[5].y.should.equal(-1);
```

### rectangleRectangleSimple (a1, a2, b1, b2)

```js
var output = collision.rectangleRectangleSimple(
    {x: 2, y: 1},
    {x: 0, y: 0},
    {x: 1, y: 2},
    {x: 0, y: 0}
);

// output.result == collision.INTERSECT == "intersect";
```

### output.result types
* **INTERSECT**: "intersect"
* **INSIDE**: "inside"
* **OUTSIDE**: "outside"
* **COINCIDE**: "coincide"
* **PARALLEL**: "parallel"
* **TANGENT**: "tangent"
