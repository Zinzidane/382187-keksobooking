// data.js
'use strict';

(function () {
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

  window.data = getAdsArr(adsArray, 8);
})();
