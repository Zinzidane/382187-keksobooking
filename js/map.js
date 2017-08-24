// map.js
'use strict';

var TITLE_LIST = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var TYPE_LIST = [
  'flat',
  'house',
  'bungalo'
];
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var CHECKIN_LIST = [
  '12:00',
  '13:00',
  '14:00'
];
var CHECKOUT_LIST = [
  '12:00',
  '13:00',
  '14:00'
];
var FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var MIN_X = 300;
var MAX_X = 900;
var MIN_Y = 100;
var MAX_Y = 500;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Функция создания случайного числа из выбранного диапазона
var getRandomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

// Функция случайной сортировки, которая передается в метод .sort массива
var compareRandom = function () {
  return Math.random() - 0.5;
};

// Функция создания массива случайной длины из массива значений.
var getRandomArray = function (arr) {
  arr.sort(compareRandom);
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
      'avatar': 'img/avatars/user0' + getRandomInteger(1, 8) + '.png'
    },

    'location': {
      'x': getRandomInteger(MIN_X, MAX_X),
      'y': getRandomInteger(MIN_Y, MAX_Y)
    },

    'offer': {
      'title': getRandomElement(TITLE_LIST),
      'address': getRandomInteger(MIN_X, MAX_X) + ', ' + getRandomInteger(MIN_Y, MAX_Y),
      'price': getRandomInteger(MIN_PRICE, MAX_PRICE),
      'type': getRandomElement(TYPE_LIST),
      'rooms': getRandomInteger(MIN_ROOMS, MAX_ROOMS),
      'guests': getRandomInteger(1, 8),
      'checkin': getRandomElement(CHECKIN_LIST),
      'checkout': getRandomElement(CHECKOUT_LIST),
      'features': getRandomArray(FEATURES_LIST),
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

  pin.setAttribute('tabindex', '0');
  pin.appendChild(img);
  pin.className = 'pin';

  var positionY = ad.location.y - pinHeight;
  var positionX = ad.location.x - pinHalfWidth;
  pin.setAttribute('style', 'left: ' + positionX + 'px;' + 'top: ' + positionY + 'px;');

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
  var lodgeElement = lodgeTemplate.cloneNode(true);
  var dialogAvatar = document.querySelector('.dialog__title > img');

  for (var i = 0; i < adsArr.offer.features.length; i++) {
    var span = document.createElement('span');
    span.className = 'feature__image feature__image--' + adsArr.offer.features[i];
    lodgeElement.querySelector('.lodge__features').appendChild(span);
  }

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
  lodgeElement.querySelector('.lodge__title').textContent = adsArr.offer.title;
  lodgeElement.querySelector('.lodge__address').textContent = adsArr.offer.address;
  lodgeElement.querySelector('.lodge__price').innerHTML = adsArr.offer.price + ' ' + '&#x20bd;/ночь';
  lodgeElement.querySelector('.lodge__type').textContent = offerType(adsArr.offer.type);
  lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + adsArr.offer.guests + ' гостей в ' + adsArr.offer.rooms + ' комнатах ';
  lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + adsArr.offer.checkin + ', выезд до ' + adsArr.offer.checkout;
  lodgeElement.querySelector('.lodge__description').textContent = adsArr.offer.description;

  // Изменение аватарки пользователя
  dialogAvatar.setAttribute('src', adsArr.author.avatar);

  return lodgeElement;
}

getAdsArr(adsArray, 8);
renderPin(adsArray);

var pinMap = document.querySelector('.tokyo__pin-map');
var pins = pinMap.querySelectorAll('.pin:not(:first-child)'); // За исключением .pin__main
var offerDialog = document.querySelector('#offer-dialog');
var dialogClose = offerDialog.querySelector('.dialog__close');
var dialogPanel = document.querySelector('.dialog__panel');

// Функция, которая активирует маркер по левому клику
var pinEventHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE || evt.type === 'click') {
    activatePin(evt);
  }
};

// Функция, которая добавляет класс pin--active выделенному элементу
var activatePin = function (evt) {
  var activePinNumber;
  removeClass(pins, 'pin--active');
  var target = evt.currentTarget;
  target.classList.add('pin--active');
  for (var i = 0; i < pins.length; i++) {
    if (pins[i] === target) {
      activePinNumber = i;
    }
  }
  openDialog(activePinNumber);
  offerDialog.classList.remove('hidden');
};

// Функция, которая открывает окно с предложением
var openDialog = function (activePinNumber) {
  dialogPanel.innerHTML = '';
  dialogPanel.appendChild(renderLodge(adsArray[activePinNumber]));
};

// Функция, которая убирает класс
var removeClass = function (elements, className) {
  elements.forEach(function (element) {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    }
  });
};

// Функция, которая скрывает окно с предложением
var deactivateDialogAndPin = function (evt) {
  if (evt.keyCode === ESC_KEYCODE || evt.type === 'click') {
    offerDialog.classList.add('hidden');
    removeClass(pins, 'pin--active');
  }
};

for (var i = 0; i < pins.length; i++) {
  pins[i].addEventListener('click', pinEventHandler);
  pins[i].addEventListener('keydown', pinEventHandler);
}

dialogClose.addEventListener('click', deactivateDialogAndPin);
document.body.addEventListener('keydown', deactivateDialogAndPin);
