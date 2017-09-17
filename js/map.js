// map.js
'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var ADS_NUMBER_INITIAL = 3;
  var DEBOUNCE_INTERVAL = 500;

  var ads = [];

  var updatePins = function () {
    window.data = window.filter.apply(ads);
    window.pin.render(window.data);
  };

  var updatePinsDebounce = window.debounce(updatePins, DEBOUNCE_INTERVAL);

  // Объявим callback-функцию которая отрисует пины при успешной загрузке данных
  var onLoad = function (data) {
    ads = data;
    // Согласно ТЗ при загрузке должно отображаться три пина
    window.data = data.slice(0, ADS_NUMBER_INITIAL);
    window.pin.render(window.data);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');

    node.style.margin = '0 auto';
    node.style.textAlign = 'center';
    node.style.backgroundColor = 'red';
    node.style.position = 'relative';
    node.style.padding = '20px 100px';
    node.style.fontSize = '30px';
    node.style.color = 'white';
    node.textContent = errorMessage;
    document.querySelector('.tokyo').insertAdjacentElement('afterend', node);
  };
  // Вызов функции загрузки данных
  window.backend.load(onLoad, onError);


  window.card.close();
  var pinMap = document.querySelector('.tokyo__pin-map');


  var activatePinAndCard = function (element) {
    window.pin.activate(element);
    window.showCard(element.dataset.index);
  };
  // Описываем нажатие левым кликом по пину
  pinMap.onclick = function (evt) {
    var target = evt.target;
    if (target.tagName === 'DIV' && target.dataset.index) {
      activatePinAndCard(target);
    }
    if (target.tagName === 'IMG' && target.closest('.pin').dataset.index) {
      target = target.closest('.pin');
      activatePinAndCard(target);
    }
  };

  // Описываем нажатие ENTER по пину
  pinMap.onkeydown = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      var target = evt.target;
      activatePinAndCard(target);
    }
  };

  // Закрытие диалогового окна и деактивация пина по левому клику на крестик окна
  var closeButton = document.querySelector('.dialog__close');
  closeButton.addEventListener('click', function () {
    window.card.close();
    window.pin.deactivate();
  });

  // Закрытие диалогового окна и деактивация пина по нажатию на Esc
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.card.close();
      window.pin.deactivate();
    }
  });

  // Перетаскивание главного маркера
  var pinMainContainer = document.querySelector('.tokyo');
  var pinMain = pinMap.querySelector('.pin__main');

  // Функция вставки координат с карты в строку адреса
  var pasteAddress = function () {
    var pinMainCoords = {
      x: (pinMain.offsetLeft + pinMain.offsetWidth / 2 + 0.5), // Ширина метки не кратна 2, поэтому добавляем 0,5 px
      y: (pinMain.offsetTop + pinMain.offsetHeight)
    };
    window.form.address.value = 'x: ' + pinMainCoords.x + ', y: ' + pinMainCoords.y;
  };

  pasteAddress();

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      pasteAddress();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.top = Math.max(Math.min(pinMain.offsetTop - shift.y, pinMainContainer.clientHeight - pinMain.offsetHeight), 0) + 'px';
      pinMain.style.left = Math.max(Math.min(pinMain.offsetLeft - shift.x, pinMainContainer.clientWidth - pinMain.offsetWidth), 0) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.filter.container.addEventListener('change', function () {
    window.card.close();
    while (pinMap.children.length !== 1) {
      pinMap.removeChild(pinMap.children[1]);
    }
    updatePinsDebounce();
  });
})();
