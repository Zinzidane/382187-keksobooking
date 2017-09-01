// map.js
'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  var onLoad = function (data) {
    window.pin.render(data);
    window.data = data;
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // Вызов функции загрузки данных
  window.backend.load(onLoad, onError);


  window.card.close();

  var pinMap = document.querySelector('.tokyo__pin-map');
  var pins = pinMap.querySelectorAll('.pin:not(:first-child)');

  // Активирует первый пин и диалог при загрузке страницы
  var activateFirstPin = function (arr) {
    arr[0].classList.add('pin--active');
    window.showCard(0);
  };

  activateFirstPin(pins);
  // Описываем нажатие левым кликом по пину
  pinMap.onclick = function (evt) {
    var target = evt.target;
    if (target.tagName === 'DIV' && target.dataset.index) {
      window.pin.activate(target);
      window.showCard(target.dataset.index);
    }
    if (target.tagName === 'IMG' && target.closest('.pin').dataset.index) {
      target = target.closest('.pin');
      window.pin.activate(target);
      window.showCard(target.dataset.index);
    }
  };

  // Описываем нажатие ENTER по пину
  pinMap.onkeydown = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      var target = evt.target;
      window.pin.activate(target);
      window.showCard(target.dataset.index);
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
  var tokyo = document.querySelector('.tokyo');
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

      pinMain.style.top = Math.max(Math.min(pinMain.offsetTop - shift.y, tokyo.clientHeight - pinMain.offsetHeight), 0) + 'px';
      pinMain.style.left = Math.max(Math.min(pinMain.offsetLeft - shift.x, tokyo.clientWidth - pinMain.offsetWidth), 0) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
