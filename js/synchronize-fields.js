// syncronize-fields.js
'use strict';

(function () {
  window.synchronizeFields = function (element1, element2, values1, values2, cb) {
    element1.addEventListener('change', function () {
      cb(element2, values2[values1.indexOf(element1.value)]);
    });
  };
})();

