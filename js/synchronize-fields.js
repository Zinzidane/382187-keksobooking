// syncronize-fields.js
'use strict';

(function () {
  window.synchronizeFields = function (element1, element2, array1, array2, cb) {
    // Синхронизация времени заезда и выезда
    for (var i = 0; i < element1.length; i++) {
      element1.options[i].value = array1[i];
    }
    element1.addEventListener('change', function () {
      for (i = 0; i < element1.length; i++) {
        if (element1.options[i].selected) {
          var j = i;
        }
      }
      cb(element2, array2[j]);
    });
  };
})();

