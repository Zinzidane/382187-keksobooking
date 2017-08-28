// pin.js
'use strict';

(function () {
  window.pin = {
    render: function (element) {
      var pinMap = document.querySelector('.tokyo__pin-map');
      var pinHalfWidth = 56 / 2;
      var pinHeight = 75;
      var pin;
      var img;

      var fragment = document.createDocumentFragment();

      for (var i = 0; i < element.length; i++) {
        pin = document.createElement('div');
        img = document.createElement('img');
        pin.appendChild(img);

        pin.className = 'pin';
        pin.setAttribute('tabindex', '0');
        pin.style.left = (element[i].location.x + pinHalfWidth) + 'px';
        pin.style.top = (element[i].location.y + pinHeight) + 'px';
        pin.dataset.index = i;

        img.className = 'rounded';
        img.width = 40;
        img.height = 40;
        img.src = element[i].author.avatar;
        fragment.appendChild(pin);
      }
      pinMap.appendChild(fragment);
    },
    deactivate: function () {
      var activePin = document.querySelector('.pin--active');
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
