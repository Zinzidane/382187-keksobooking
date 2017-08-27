// pin.js
'use strict';

(function () {
  window.pin = {
    render: function (element) {
      var pinContainerElement = document.querySelector('.tokyo__pin-map');
      var fragment = document.createDocumentFragment();
      var pinHalfWidth = 56 / 2;
      var pinHeight = 75;

      for (var i = 0; i < element.length; i++) {
        var pin = document.createElement('div');
        var img = document.createElement('img');


        pin.setAttribute('tabindex', '0');
        pin.appendChild(img);
        pin.className = 'pin';
        pin.tabindex = '0';
        pin.dataset.index = i;

        var positionY = element[i].location.y - pinHeight;
        var positionX = element[i].location.x - pinHalfWidth;
        pin.setAttribute('style', 'left: ' + positionX + 'px;' + 'top: ' + positionY + 'px;');

        img.className = 'rounded';
        img.width = 40;
        img.height = 40;
        img.src = element[i].author.avatar;
        fragment.appendChild(pin);
      }

      pinContainerElement.appendChild(fragment);
    },
    deactivate: function () {
      var activePin = document.querySelector('pin--active');

      if (activePin !== null) {
        activePin.classList.remove('pin--active');
      }
    },
    activate: function (element) {
      window.pin.deactivate();
      element.classList.add('pin--active');
    }
  };
})();
