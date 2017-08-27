// card.js
'use strict';

(function () {
  window.card = {
    create: function (element) {
      var lodgeTemplate = document.querySelector('#lodge-template').content;
      var lodgeElement = lodgeTemplate.cloneNode(true);
      var dialogAvatar = document.querySelector('.dialog__title > img');
      var featuresArray = Array.prototype.slice.call(element.offer.features);

      featuresArray.forEach(function (feature) {
        var span = document.createElement('span');
        span.className = 'feature__image feature__image--' + feature;
        lodgeElement.querySelector('.lodge__features').appendChild(span);
      });

      // Функция, которая возращает значение типа жилья
      var offerType = function (type) {
        if (type === 'flat') {
          return 'Квартира';
        } else if (type === 'bungalo') {
          return 'Бунгало';
        } else {
          return 'Дом';
        }
      };

      // Заполнение данными
      lodgeElement.querySelector('.lodge__title').textContent = element.offer.title;
      lodgeElement.querySelector('.lodge__address').textContent = element.offer.address;
      lodgeElement.querySelector('.lodge__price').innerHTML = element.offer.price + ' ' + '&#x20bd;/ночь';
      lodgeElement.querySelector('.lodge__type').textContent = offerType(element.offer.type);
      lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + element.offer.guests + ' гостей в ' + element.offer.rooms + ' комнатах ';
      lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
      lodgeElement.querySelector('.lodge__description').textContent = element.offer.description;

      // Изменение аватарки пользователя
      dialogAvatar.setAttribute('src', adsArr.author.avatar);

      return lodgeElement;
    },
    open: function (active) {
      window.card.create(window.date[active]);  // Maybe error!!!!!
      var dialogContainer = document.querySelector('.dialog').style.display('block');
    },
    close: function () {
      var dialogContainer = document.querySelector('.dialog').style.display('none');
    }
  };
})();
