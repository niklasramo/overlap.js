$(function(){

  var $target = $('#target'),
      $handle = $('#drag-handle'),
      $boxes = $('.box'),
      dragCoords = {x: 0, y: 0};

  //
  // Functions
  //

  function checkOverlap() {

    var data = overlap($target[0], $boxes.get(), true),
        bestMatch = data.hits[0];
    
    if (data.hits.length) {
      console.log($(bestMatch.element).attr('data-id'));
    }

  }

  function drag(ev) {

    ev.gesture.preventDefault();

    // Get the touch event
    var touch = ev.gesture.touches[0];

    // Hide/show drag handle
    if (ev.type === 'dragstart') {
      $handle[0].style.display = 'block';
    } else if (ev.type === 'dragend') {
      $handle[0].style.display = 'none';
    }

    // Position target element with Popo
    popo($target[0], {
      base: $target[0],
      position: 'left top left top',
      container: $target[0],
      collision: function (pos) {
        if (ev.type !== 'touch') {
          pos.left = pos.left + (touch.pageX < dragCoords.x ? -Math.abs(dragCoords.x - touch.pageX) : Math.abs(dragCoords.x - touch.pageX));
          pos.top = pos.top + (touch.pageY < dragCoords.y ? -Math.abs(dragCoords.y - touch.pageY) : Math.abs(dragCoords.y - touch.pageY));
        }
      }
    });

    // Update the coordinates
    dragCoords.x = touch.pageX;
    dragCoords.y = touch.pageY; 

    checkOverlap();

  }

  //
  // Listeners
  //

  // Hammer drag with Popo's help
  Hammer($target[0], {drag_max_touches: 0, drag_min_distance: 1}).on('touch dragstart drag dragend', function (ev) {
    drag(ev);
  });

});