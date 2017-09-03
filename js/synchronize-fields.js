// syncronize-fields.js
'use strict';

(function () {
  window.synchronizeFields = function (element1, element2, array1, array2, cb) {
    element1.addEventListener('change', function () {
      cb(element2, array2[array1.indexOf(element1.value)]);
    });
  };
})();

