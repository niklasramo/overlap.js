/*!
 * overlap.js v0.1.1dev
 * A JavaScript library for detecting collisions between elements
 * http://github.com/niklasramo/overlap.js
 * Copyright (c) 2013 Niklas Rämö
 * Released under the MIT license
 */

(function (window, undefined) {
  'use strict';

  var win, doc, docElem, body;

  function cacheBaseElems(el) {

    doc = el.ownerDocument;
    win = doc.defaultView || doc.parentWindow;
    docElem = doc.documentElement;
    body = doc.body;

  }

  function isWindow(el) {

    return el.self === win.self;

  }

  function getStyle(el, prop) {

    return win.getComputedStyle ? (
      win.getComputedStyle(el, null).getPropertyValue(prop)
    ) : el.currentStyle ? (
      el.currentStyle[prop]
    ) : (
      null
    );

  }

  function getOffsetParent(el) {

    var offsetParent = el.offsetParent,
      pos = 'style' in el && getStyle(el, 'position');

    if (pos === 'fixed') {
      offsetParent = win;
    } else if (pos === 'absolute') {
      offsetParent = el === body ? docElem : offsetParent || doc;
      while ('style' in offsetParent && getStyle(offsetParent, 'position') === 'static') {
        offsetParent = offsetParent === body ? docElem : offsetParent.offsetParent || doc;
      }
    }

    return offsetParent;

  }

  function getWidth(el, gbcr) {

    return isWindow(el) ? (
      docElem.clientWidth
    ) : el === doc || el === docElem ? (
      math.max(docElem.scrollWidth, body.scrollWidth)
    ) : (
      gbcr = el.getBoundingClientRect && el.getBoundingClientRect(),
      gbcr && 'width' in gbcr ? gbcr.width : el.offsetWidth
    );

  }

  function getHeight(el, gbcr) {

    return isWindow(el) ? (
      docElem.clientHeight
    ) : el === doc || el === docElem ? (
      math.max(docElem.scrollHeight, body.scrollHeight)
    ) : (
      gbcr = el.getBoundingClientRect && el.getBoundingClientRect(),
      gbcr && 'height' in gbcr ? gbcr.height : el.offsetHeight
    );

  }

  function getOffset(el, includeBorders) {

    var offsetLeft = 0,
      offsetTop = 0,
      viewportScrollLeft = win.pageXOffset || docElem.scrollLeft || body.scrollLeft || 0,
      viewportScrollTop = win.pageYOffset || docElem.scrollTop || body.scrollTop || 0,
      offsetParent = el,
      gbcr;

    if (isWindow(el)) {

      offsetLeft = viewportScrollLeft;
      offsetTop = viewportScrollTop;

    } else if (el !== doc && el !== docElem) {

      gbcr = el.getBoundingClientRect && el.getBoundingClientRect();

      if (gbcr && 'left' in gbcr && 'top' in gbcr) {

        // gbcr based solution (borrowed from jQuery).
        offsetLeft += gbcr.left + viewportScrollLeft - /* IE7 Fix*/ (docElem.clientLeft || 0);
        offsetTop += gbcr.top + viewportScrollTop - /* IE7 Fix*/ (docElem.clientTop || 0);

      } else {

        // gbcr fallback (borrowed from http://www.quirksmode.org/js/findpos.html).
        while (offsetParent) {
          offsetLeft += isWindow(offsetParent) ? viewportScrollLeft : offsetParent.offsetLeft || 0;
          offsetTop += isWindow(offsetParent) ? viewportScrollTop : offsetParent.offsetTop || 0;
          offsetParent = getOffsetParent(offsetParent);
        }

      }

      if (includeBorders) {
        offsetLeft += el.clientLeft || 0;
        offsetTop += el.clientTop || 0;
      }

    }

    return {
      left: offsetLeft,
      top: offsetTop
    };

  }

  function getElemData(el) {

    return {
      element: el.element || el,
      width: el.width || getWidth(el),
      height: el.height || getHeight(el),
      offset: el.offset || getOffset(el, 1)
    };

  }

  function getOverlapData(playerData, targetData) {

    return {
      left: playerData.offset.left - targetData.offset.left,
      right: (targetData.offset.left + targetData.width) - (playerData.offset.left + playerData.width),
      top: playerData.offset.top - targetData.offset.top,
      bottom: (targetData.offset.top + targetData.height) - (playerData.offset.top + playerData.height)
    };

  }

  function getIntersectionData(playerData, targetData, overlapData) {

    var intersection = {
      width: playerData.width + (overlapData.left < 0 ? overlapData.left : 0) + (overlapData.right < 0 ? overlapData.right : 0),
      height: playerData.height + (overlapData.top < 0 ? overlapData.top : 0) + (overlapData.bottom < 0 ? overlapData.bottom : 0),
      offset: {
        left: null,
        top: null
      },
      coverage: {
        player: 0,
        target: 0,
        total: 0
      }
    };

    // Make sure width and height are not negative
    intersection.width = intersection.width < 0 ? 0 : intersection.width;
    intersection.height = intersection.height < 0 ? 0 : intersection.height;

    // If player overlaps target
    if (intersection.width > 0 && intersection.height > 0) {

      // Get intersection offset
      intersection.offset.left = playerData.offset.left + Math.abs(overlapData.left < 0 ? overlapData.left : 0);
      intersection.offset.top = playerData.offset.top + Math.abs(overlapData.top < 0 ? overlapData.top : 0);

      // Get intersection coverage
      intersection.coverage.player = ((intersection.width * intersection.height) / (playerData.width * playerData.height)) * 100;
      intersection.coverage.target = ((intersection.width * intersection.height) / (targetData.width * targetData.height)) * 100;
      intersection.coverage.total = intersection.coverage.player + intersection.coverage.target;

    }

    return intersection;

  }

  function getInstanceData(playerData, target) {

    var targetData = getElemData(target),
        overlapData = getOverlapData(playerData, targetData),
        intersectionData = getIntersectionData(playerData, targetData, overlapData);

    targetData.overlap = overlapData;
    targetData.intersection = intersectionData;

    return targetData;

  }

  function compareCoverage(a, b) {

    return -(a.intersection.coverage.total - b.intersection.coverage.total);

  }

  function checkOverlap(player, targets, returnData) {

    // Cache base elements
    cacheBaseElems(player);

    var playerData = getElemData(player),
        targets = targets instanceof Array ? targets : [targets],
        length = targets.length,
        retData = {
          player: playerData,
          targets: [],
          hits: []
        },
        instanceData, i;

    // Loop through targets
    for (i = 0; i < length; i++) {

      // Get instance data
      instanceData = getInstanceData(playerData, targets[i]);

      // Push instance to targets data
      retData.targets.push(instanceData);

      // Keep track of all hits
      if (instanceData.intersection.coverage.total > 0) {
        retData.hits.push(instanceData);
      }

    }

    // Sort hits based on coverage
    retData.hits.sort(compareCoverage);

    return returnData ? retData : (retData.hits.length ? true : false);

  }

  // Init
  window.overlap = window.overlap || checkOverlap;

})(self);