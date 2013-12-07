#overlap.js

*A JavaScript library for detecting collisions*

overlap.js is a cross-browser JavaScript library that allows you to check if one or more elements are overlapping with another element.

##Download

**[v0.1 - Production](overlap.min.js)**
**[v0.1 - Development](overlap.js)**

##Getting started

Include the overlap.js script in your site.
```html
<script src="overlap.min.js"></script>
```

##Usage

```javascript
// The format
overlap( player, targets, returnData );
```

**player** *(type: element)* *(required)*   
Provide the player element that will be checked against target elements.

**method** *(type: array or element)* *(required)*   
Provide a target element or an array of target elements you want to compare with the player element.

**returnData** *(type: boolean)* *(optional)*   
By default this setting is set to false, which means that the overlap function returns boolean indicating whether or not the player overlaps one or more targets. Set to true if you want the overlap function to return explicit data about the positioning.

##License

Copyright &copy; 2013 Niklas Rämö. Licensed under **[the MIT license](LICENSE)**.