// card.js
'use strict';

(function () {
  var ADS_PHOTOS_SIZES = {
    width: 52,
    height: 42
  };

  // Объявляем переменную для контейнера карточки объявления
  var dialogContainer = document.querySelector('.dialog');

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

  var getPhotosFragment = function (photos) {
    var photosFragment = document.createDocumentFragment();

    photos.forEach(function (item) {
      var img = document.createElement('img');
      img.width = ADS_PHOTOS_SIZES.width;
      img.height = ADS_PHOTOS_SIZES.height;
      img.src = item;

      photosFragment.appendChild(img);
    });

    return photosFragment;
  };

  window.card = {
    create: function (element) {

      // Объявим переменную, внутри которой находится template
      var lodgeTemplate = document.querySelector('#lodge-template').content;
      // Объявляем переменную, в которую клонируем шаблон объявления
      var lodgeElement = lodgeTemplate.cloneNode(true);

      lodgeElement.querySelector('.lodge__title').textContent = element.offer.title;
      lodgeElement.querySelector('.lodge__address').textContent = element.offer.address;
      lodgeElement.querySelector('.lodge__price').textContent = element.offer.price + 'Р/ночь';

      // Заполним данные
      lodgeElement.querySelector('.lodge__type').textContent = getOfferType(element.offer.type);
      lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + element.offer.guests + ' гостей в ' + element.offer.rooms + ' комнатах';
      lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;
      lodgeElement.querySelector('.lodge__features').appendChild(addFeatures(element.offer.features));
      lodgeElement.querySelector('.lodge__description').textContent = element.offer.description;
      document.querySelector('.dialog__title img').src = element.author.avatar;

      var photosFragment = getPhotosFragment(element.offer.photos);
      var lodgePhotos = lodgeElement.querySelector('.lodge__photos');
      lodgePhotos.appendChild(photosFragment);

      // Вставим шаблон вместо существующей разметки
      document.querySelector('.dialog').replaceChild(lodgeElement, document.querySelector('.dialog__panel'));
    },
    close: function () {
      dialogContainer.style.display = 'none';
    },
    dialogContainer: dialogContainer
  };
})();
