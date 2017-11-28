# overlap.js

**THIS LIBRARY IS NO LONGER MAINTAINED. PLEASE CHECK OUT [MEZR](https://github.com/niklasramo/mezr) LIBRARY FOR SIMILAR FUNCTIONALITY.**

*A JavaScript library for detecting collisions*

Overlap.js is a cross-browser JavaScript library that allows you to check if an element overlaps another element (or multiple elements). The library is tested in all modern browsers (Chrome, Firefox, Opera, Safari, IE7+).

Currently overlap.js supports only rectangle shaped elements, but there are plans bring in support for rounded (border-radius) and rotated elements.

## Download

**[v0.1.1 - Production](overlap.min.js)**  
**[v0.1.1 - Development](overlap.js)**

## Usage

First of all, include the overlap.js script in your site.
```html
<script src="overlap.min.js"></script>
```

Then call the overlap function like this.

```javascript
// Check if el1 overlaps with el2. Returns boolean.
overlap(el1, el2);

// Check if el1 overlaps with el2 or el3. Returns boolean.
overlap(el1, [el2, el3]);

// Check if el1 overlaps with el2 or el3. Returns an object containing explicit overlap data.
overlap(el1, [el2, el3], true);
```

## Format

```javascript
// The format
overlap( player, targets [, returnData] );
```

**player** *(type: element)* *(required)*   
Provide the player element that will be checked against target elements.

**targets** *(type: array or element)* *(required)*   
Provide a target element or an array of target elements you want to compare with the player element.

**returnData** *(type: boolean)* *(optional)*   
By default this setting is set to false, which means that the overlap function returns boolean indicating whether or not the player overlaps one or more targets. Set to true if you want the overlap function to return explicit data (e.g. intersection area data) about the positioning.

## Collision data

Here's the breakdown of the data the overlap function returns when the "returnData" argument is set to true.

```javascript

// Let's get the overlap data (let's imagine el1, el2 and el3 are defined beforehand).
var data = overlap(el1, [el2, el3], true);

// Get hits (target instances of all the target elements that overlap with the player element).
// The instances are ordered based on the intersection area's coverage of the target element and the player element.
var hits = data.hits; // Array

// Get the best match (the first instance in the hits array).
var bestMatch = hits[0]; // Object (target instance)

// Get the player instance.
var player = data.player; // Object (player instance)

// Player element instance breakdown.
var playerElem = player.element;
var playerElemWidth = player.width;
var playerElemHeight = player.height;
var playerElemOffsetLeft = player.offset.left;
var playerElemOffsetTop = player.offset.top;

// Get targets (all target instances in their original order).
var targets = data.targets; // Array

// Let's get a target instance and break it down.
var target = data.targets[0];

// Target element
var targetElem = target.element;

// Target element dimensions and offsets.
var targetElemWidth = target.width;
var targetElemHeight = target.height;
var targetElemOffsetLeft = target.offset.left;
var targetElemOffsetTop = target.offset.top;

// Overlap data (how much in pixels the player element's edges overlap target element's edges).
var overlapTop = target.overlap.top;
var overlapBottom = target.overlap.bottom;
var overlapLeft = target.overlap.left;
var overlapRight = target.overlap.right;

// Intersection area dimensions and offsets.
var intersectionWidth = target.intersection.width;
var intersectionHeight = target.intersection.height;
var intersectionOffsetLeft = target.intersection.offset.left;
var intersectionOffsetTop = target.intersection.offset.top;

// Player coverage.
// -> What percentage of player element's area is intersection area.
var coveragePlayer = target.intersection.coverage.player;

// Target coverage.
// -> What percentage of target element's area is intersection area.
var coverageTarget = target.intersection.coverage.target;

// Total coverage.
// -> coveragePlayer + coverageTarget
var coverageTotal = target.intersection.coverage.total;

```

## License

Copyright &copy; 2013 Niklas Rämö. Licensed under **[the MIT license](LICENSE)**.
