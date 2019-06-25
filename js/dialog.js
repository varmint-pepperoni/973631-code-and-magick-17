'use strict';

(function () {
  var uploadMousedownHandler = function (e) {
    e.preventDefault();

    lastCoords = {
      x: e.pageX,
      y: e.pageY
    };

    document.addEventListener('mousemove', documentMousemoveHandler);
    document.addEventListener('mouseup', documentMouseupHandler);
  };

  var documentMousemoveHandler = function (e) {
    e.preventDefault();

    var shiftCoords = {
      x: lastCoords.x - e.pageX,
      y: lastCoords.y - e.pageY
    };

    if (shiftCoords.x || shiftCoords.y) {
      isMoving = true;
    }

    lastCoords = {
      x: e.pageX,
      y: e.pageY
    };

    elSetup.style.top = (elSetup.offsetTop - shiftCoords.y) + 'px';
    elSetup.style.left = (elSetup.offsetLeft - shiftCoords.x) + 'px';
  };

  var documentMouseupHandler = function (e) {
    e.preventDefault();

    if (isMoving) {
      isMoving = false;
      elUpload.addEventListener('click', uploadClickHandler);
    }

    document.removeEventListener('mousemove', documentMousemoveHandler);
    document.removeEventListener('mouseup', documentMouseupHandler);
  };

  var uploadClickHandler = function (e) {
    e.preventDefault();
    elUpload.removeEventListener('click', uploadClickHandler);
  };

  var elSetup = document.querySelector('.setup');
  var elUpload = elSetup.querySelector('.upload');
  var lastCoords = {x: 0, y: 0};
  var isMoving = false;

  elUpload.addEventListener('mousedown', uploadMousedownHandler);
})();
