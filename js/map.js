// map.js
'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  // Вставка маркеров на карту
  window.pin.render(window.data);

  // Активация пина и диалога по левому клику
  var pinEventHandler = function (evt) {
    var target = evt.target;
    if (target.tagName === 'IMG' && evt.keyCode === ENTER_KEYCODE || evt.type === 'click') {
      target = target.closest('.pin');
      window.pin.activate(target);
    }
  };

  var pinMap = document.querySelector('.tokyo__pin-map');
  var pins = pinMap.querySelectorAll('.pin:not(:first-child)');

  for (var i = 0; i < pins.length; i++) {
    pins[i].addEventListener('click', pinEventHandler);
    pins[i].addEventListener('keydown', pinEventHandler);
  }

  var deactivateDialogAndPin = function (evt) {
    var target = evt.target;
    if (evt.keyCode === ESC_KEYCODE || evt.type === 'click') {
      window.pin.deactivate(target);
/*      window.card.close();*/
    }
  }
})();
