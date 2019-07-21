'use strict';

(function () {
  var SERVER_URL = 'https://js.dump.academy/code-and-magick';

  window.backend = {
    load: function (onLoad, onError) {
      window.load(SERVER_URL + '/data', null, 'GET', onLoad, onError);
    },
    save: function (data, onLoad, onError) {
      window.load(SERVER_URL, data, 'POST', onLoad, onError);
    }
  };
})();
