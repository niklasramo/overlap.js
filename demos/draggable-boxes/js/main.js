$(function(){

  var $player = $('#player'),
      $targets = $('.target');

  //
  // Functions
  //

  function getStyle(el, prop) {

    return window.getComputedStyle ? (
      window.getComputedStyle(el, null).getPropertyValue(prop)
    ) : el.currentStyle ? (
      el.currentStyle[prop]
    ) : (
      null
    );

  }

  function bindDrag(i, el) {

    var lastDelta = {x: 0, y: 0};
    Hammer(el, {drag_max_touches: 0, drag_min_distance: 1}).on('dragstart drag dragend', function (ev) {
      drag(ev, lastDelta);
    });

  }

  function drag(ev, lastDelta) {

    ev.gesture.preventDefault();

    var gesture = ev.gesture,
        elem = ev.target,
        left = parseInt(getStyle(elem, 'left')) + (gesture.deltaX - (lastDelta.x)),
        top = parseInt(getStyle(elem, 'top')) + (gesture.deltaY - (lastDelta.y));

    // Update lastDelta
    lastDelta.x = gesture.deltaX;
    lastDelta.y = gesture.deltaY;

    // Move element
    elem.style.left = left + 'px';
    elem.style.top = top + 'px';

    // Check overlap
    checkOverlap();

    // Reset lastDelta on drag nd
    if (ev.type === 'dragend') {
      lastDelta.x = 0;
      lastDelta.y = 0;
    }

  }

  function checkOverlap() {

    // Get overlap data
    var data = overlap($player[0], $targets.get(), true),
        hits = data.hits,
        $hits = $();

    // Get all hit elements
    for (var i=0, len = hits.length; i < len; i++) {
      $hits = $hits.add(hits[i].element);
    }

    // Add hit class to hits
    if (hits.length) {
      $hits.not('.hit').addClass('hit');
    }

    // Remove hit class from non-hit targets
    $targets.filter('.hit').not($hits).removeClass('hit');

  }

  //
  // Listeners
  //

  // Hammer drag
  $player.add($targets).each(bindDrag);

});