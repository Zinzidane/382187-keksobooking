// map.js
'use strict';

var userID = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08'
];
var title = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var minPrice = 1000;
var maxPrice = 1000000;
var type = [
  'flat',
  'house',
  'bungalo'
];
var minRooms = 1;
var maxRooms = 5;
var checkin = [
  '12:00',
  '13:00',
  '14:00'
];
var checkout = [
  '12:00',
  '13:00',
  '14:00'
];
var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var minX = 300;
var maxX = 900;
var minY = 100;
var maxY = 500;

// Функция создания случайного числа из выбранного диапазона
var getRandomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

// Функция создания массива случайной длины из массива значений.
var getRandomArray = function (arr) {
  return arr.slice(0, getRandomInteger(0, arr.length));
};

// Функция получения случайного элемента из массива
var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Функция создания случайного объявления
var createRandomAd = function () {
  return {
    'author': {
      'avatar': 'img/avatars/user' + getRandomElement(userID) + '.png'
    },

    'location': {
      'x': getRandomInteger(minX, maxX),
      'y': getRandomInteger(minY, maxY)
    },

    'offer': {
      'title': getRandomElement(title),
      'address': location.x + ', ' + location.y,
      'price': getRandomInteger(minPrice, maxPrice),
      'type': getRandomElement(type),
      'rooms': getRandomElement(minRooms, maxRooms),
      'guests': getRandomInteger(1, 8),
      'checkin': getRandomElement(checkin),
      'checkout': getRandomElement(checkout),
      'features': getRandomArray(features),
      'description': '',
      'photos': []
    }
  };
};

var adsArray = [];

var getAdsArr = function (arr, length) {
  for (var i = 0; i < length; i++) {
    arr.push(createRandomAd());
  }
  return arr;
};

// Функция, которая создает маркер
var createPin = function (ad) {
  var pin = document.createElement('div');
  var img = document.createElement('img');
  var pinHalfWidth = 56 / 2;
  var pinHeight = 75;

  pin.appendChild(img);
  pin.className = 'pin';
  pin.style.left = ad.location.x - pinHalfWidth;
  pin.style.top = ad.location.y - pinHeight;

  img.className = 'rounded';
  img.width = 40;
  img.height = 40;
  img.src = ad.author.avatar;

  return pin;
};

// Функция, которая отрисовывает маркеры
var renderPin = function (pinArr) {
  var pinContainerElement = document.querySelector('.tokyo__pin-map');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pinArr.length; i++) {
    fragment.appendChild(createPin(pinArr[i]));
  }

  pinContainerElement.appendChild(fragment);
};

// Функция, которая отрисовывает объявления
function renderLodge(adsArr) {
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var lodgeContainer = document.querySelector('#offer-dialog');
  var dialogPanel = document.querySelector('.dialog__panel');
  var lodgeElement = lodgeTemplate.cloneNode(true);

  for (var i = 0; i < adsArr.offer.features.length; i++) {
    var span = document.createElement('span');
    span.className = 'feature__image feature__image--' + adsArr.offer.features[i];
    lodgeElement.querySelector('.lodge__features').appendChild(span);
  }

  // Заполнение данными
  lodgeElement.querySelector('.lodge__title').textContent = adsArr.offer.title;
  lodgeElement.querySelector('.lodge__address').textContent = adsArr.offer.address;
  lodgeElement.querySelector('.lodge__price').innerHTML = adsArr.offer.price + ' ' + '&#x20bd;/ночь';
  lodgeElement.querySelector('.lodge__type').textContent = adsArr.offer.type;
  lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + adsArr.offer.guests + ' гостей в ' + adsArr.offer.rooms + ' комнатах ';
  lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + adsArr.offer.checkin + ', выезд до ' + adsArr.offer.checkout;
  lodgeElement.querySelector('.lodge__description').textContent = adsArr.offer.description;

  // Изменение аватарки пользователя
  var dialogAvatar = document.querySelector('.dialog__title > img');
  dialogAvatar.setAttribute('src', adsArr.author.avatar);
  lodgeContainer.replaceChild(lodgeElement, dialogPanel);
}

getAdsArr(adsArray, 8);
renderPin(adsArray);
renderLodge(adsArray[0]);
