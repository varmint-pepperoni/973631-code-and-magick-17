'use strict';

(function () {
  var uploadMousedownHandler = function (e) {
    e.preventDefault();

    lastCoords = {
      x: e.clientX,
      y: e.clientY
    };

    document.addEventListener('mousemove', documentMousemoveHandler);
    document.addEventListener('mouseup', documentMouseupHandler);
  };

  var documentMousemoveHandler = function (e) {
    e.preventDefault();

    var shift = {
      x: lastCoords.x - e.clientX,
      y: lastCoords.y - e.clientY
    };

    if (shift.x || shift.y) {
      isMoving = true;
    }

    lastCoords = {
      x: e.clientX,
      y: e.clientY
    };

    elSetup.style.top = (elSetup.offsetTop - shift.y) + 'px';
    elSetup.style.left = (elSetup.offsetLeft - shift.x) + 'px';
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
