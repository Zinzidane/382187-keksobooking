// show-card.js
'use strict';

(function () {
  window.showCard = function (active) {
    window.card.create(window.data[active]);
    window.card.dialogContainer.style.display = 'block';
  };
})();
