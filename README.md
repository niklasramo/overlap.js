#overlap.js

*A JavaScript library for detecting collisions*

Overlap.js is a cross-browser JavaScript library that allows you to check if an element overlaps another element (or multiple elements). The library is tested in all modern browsers (Chrome, Firefox, Opera, Safari, IE7+).

##Download

**[v0.1 - Production](overlap.min.js)**  
**[v0.1 - Development](overlap.js)**

##Usage

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

##Format

```javascript
// The format
overlap( player, targets [, returnData] );
```

**player** *(type: element)* *(required)*   
Provide the player element that will be checked against target elements.

**targets** *(type: array or element)* *(required)*   
Provide a target element or an array of target elements you want to compare with the player element.

**returnData** *(type: boolean)* *(optional)*   
By default this setting is set to false, which means that the overlap function returns boolean indicating whether or not the player overlaps one or more targets. Set to true if you want the overlap function to return explicit data about the positioning.

##License

Copyright &copy; 2013-2014 Niklas Rämö. Licensed under **[the MIT license](LICENSE)**.
