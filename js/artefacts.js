'use strict';

(function () {
  var isArtifactCell = function (el) {
    return el.classList.contains('setup-artifacts-cell');
  };

  var isEmptyElement = function (el) {
    return !el.innerHTML.trim().length;
  };

  var documentDragstartHandler = function (e) {
    if (isArtifactCell(e.target.parentElement)) {
      elDraggableArtifact = e.target;
      document.addEventListener('drop', documentDropHandler);
      document.addEventListener('dragover', documentDragoverHandler);
    }
  };

  var documentDragoverHandler = function (e) {
    e.preventDefault();
  };

  var documentDropHandler = function (e) {
    if (isArtifactCell(e.target) && isEmptyElement(e.target)) {
      e.target.appendChild(elDraggableArtifact);
    }

    elDraggableArtifact = null;
    document.removeEventListener('drop', documentDropHandler);
    document.removeEventListener('dragover', documentDragoverHandler);
  };

  var elDraggableArtifact = null;

  document.addEventListener('dragstart', documentDragstartHandler);
})();
