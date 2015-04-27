# geom-collision
#### Geometry Collision Detection

This library has some useful collision detection methods.

```js
var collision = require("geom-collision");
```

### lineLine: function (a1, a2, b1, b2)

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

### lineCircle: (a1, a2, c, r)

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

### pointRectangleSimple

```js
var output = collision.pointRectangleSimple(
    {x: 0, y: 0},
    {x: 0, y: 0},
    {x: 1, y: 2}
);

// output.result == collision.INSIDE == "inside";
```

### rectangleRectangleSimple

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
