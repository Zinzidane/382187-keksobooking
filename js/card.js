// card.js
'use strict';

(function () {
  // Объявляем переменную для контейнера карточки объявления
  var dialogContainer = document.querySelector('.dialog');

  window.card = {
    create: function (element) {

      // Объявляем функцию создания тегов  по количеству особенностей
      var addFeatures = function (subElements) {
        var span;
        var fragment = document.createDocumentFragment();

        subElements.forEach(function (subElement) {
          span = document.createElement('span');
          span.className = 'feature__image feature__image--' + subElement;
          fragment.appendChild(span);
        });
        return fragment;
      };
      // Объявим переменную, внутри которой находится template
      var lodgeTemplate = document.querySelector('#lodge-template').content;
      // Объявляем переменную, в которую клонируем шаблон объявления
      var lodgeElement = lodgeTemplate.cloneNode(true);

      lodgeElement.querySelector('.lodge__title').textContent = element.offer.title;
      lodgeElement.querySelector('.lodge__address').textContent = element.offer.address;
      lodgeElement.querySelector('.lodge__price').textContent = element.offer.price + 'Р/ночь';

      var getOfferType = function (type) {
        switch (type) {
          case 'flat':
            return 'Квартира';
          case 'bungalo':
            return 'Бунгало';
          case 'house':
            return 'Дом';
          default:
            return type;
        }
      };

      // Заполним данные
      lodgeElement.querySelector('.lodge__type').textContent = getOfferType(element.offer.type);
      lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + element.offer.guests + ' гостей в ' + element.offer.rooms + ' комнатах';
      lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
      lodgeElement.querySelector('.lodge__features').appendChild(addFeatures(element.offer.features));
      lodgeElement.querySelector('.lodge__description').textContent = element.offer.description;
      document.querySelector('.dialog__title img').src = element.author.avatar;

      // Вставим шаблон вместо существующей разметки
      document.querySelector('.dialog').replaceChild(lodgeElement, document.querySelector('.dialog__panel'));
    },
    close: function () {
      dialogContainer.style.display = 'none';
    },
    dialogContainer: dialogContainer
  };
})();
