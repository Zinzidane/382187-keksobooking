// debounce.js
'use strict';

window.debounce = (function () {
  var timeout;
  return function (func, wait) {
    var context = this;
    var args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
})();
