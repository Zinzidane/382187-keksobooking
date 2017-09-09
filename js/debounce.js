// debounce.js
'use strict';

window.debounce = function (func, wait) {
  var timeout = 0;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
};

