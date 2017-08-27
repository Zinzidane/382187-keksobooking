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
  var featuresArray = Array.prototype.slice.call(adsArr.offer.features);

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

// Активирует первый пин с диалогом при открытии страницы
var activateFirstPin = function (arr) {
  arr[0].classList.add('pin--active');
  openDialog(0);
};

// Функция, которая добавляет класс pin--active выделенному элементу
var activatePin = function (evt) {
  var pinsArray = Array.prototype.slice.call(pins); // Преобразовываем pins(NodeList) в pinsArray(Array), чтобы в дальнейшем воспользоваться методом indexOf
  removeClass(pins, 'pin--active');
  var target = evt.currentTarget;
  target.classList.add('pin--active');

  var activePinNumber = pinsArray.indexOf(target);

  openDialog(activePinNumber);
  offerDialog.classList.remove('hidden');
};

// Функция, которая активирует маркер по левому клику
var pinEventHandler = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE || evt.type === 'click') {
    activatePin(evt);
  }
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

activateFirstPin(pins);
dialogClose.addEventListener('click', deactivateDialogAndPin);
document.body.addEventListener('keydown', deactivateDialogAndPin);


// module4-task2

// Переменные формы с объявлением
var form = document.querySelector('.notice__form');
var title = form.querySelector('#title');
var type = form.querySelector('#type');
var price = form.querySelector('#price');
var timeIn = form.querySelector('#timein');
var timeOut = form.querySelector('#timeout');
var roomNumber = form.querySelector('#room_number');
var capacity = form.querySelector('#capacity');
var address = form.querySelector('#address');

// Сброс формы по умолчанию
var setDefaultForm = function () {
  form.reset();
  title.required = true;
  title.minLength = 30;
  title.maxLength = 100;
  price.required = true;
  price.type = 'number';
  price.min = 0;
  price.max = 1000000;
  price.value = 1000;
  address.required = true;
};

setDefaultForm();

// Автоматическая корректировка полей взаимозависимых полей формы
var correctDependentInputs = function (element1, element2) {
  element1.addEventListener('change', function () {
    element2.value = element1.value;
  });
};

correctDependentInputs(timeIn, timeOut);
correctDependentInputs(timeOut, timeIn);

// Синхронизация значения поля «Тип жилья»  с минимальной ценой объявления
type.addEventListener('change', function () {
  switch (type.value) {
    case 'bungalo':
      price.value = 0;
      break;
    case 'flat':
      price.value = 1000;
      break;
    case 'house':
      price.value = 5000;
      break;
    case 'palace':
      price.value = 10000;
      break;
  }
});

// Зависимость количеества мест от количества комнат
roomNumber.addEventListener('change', function () {
  switch (roomNumber.value) {
    case '1':
      capacity.value = '0';
      break;
    case '2':
    case '3':
    case '100':
      capacity.value = '3';
      break;
  }
});

// Зависимость количеества комнат от количества мест
capacity.addEventListener('change', function () {
  switch (capacity.value) {
    case '0':
      roomNumber.value = '1';
      break;
    case '1':
      roomNumber.value = '2';
      break;
    case '2':
      roomNumber.value = '3';
      break;
    case '3':
      roomNumber.value = '100';
      break;
  }
});

// Валидация текстового поля
var validateTitleInput = function (textField, minLength, maxLength) {
  if (textField.value.length < minLength || textField.value.length > maxLength) {
    textField.style.borderColor = 'red';
    return false;
  }
  textField.style.borderColor = '';
  return true;
};

// Функция валидации числового поля
var validateNumberInput = function (numberField, minValue, maxValue) {
  if (Number(numberField.value) <= Number(minValue) || Number(numberField.value) > Number(maxValue)) {
    numberField.style.borderColor = 'red';
    return false;
  }
  numberField.style.borderColor = '';
  return true;
};

var validateAddress = function (addressField) {
  switch (addressField.value) {
    case '':
      addressField.style.borderColor = 'red';
      return false;
    default:
      addressField.style.borderColor = '';
      return true;
  }
};

// Функция валидация формы
var validateForm = function () {
  var titleValid = validateTitleInput(title, title.minLength, title.maxLength);
  var numberValid = validateNumberInput(price, price.min, price.max);
  var addressValid = validateAddress(address);

  return titleValid && numberValid && addressValid;
};

// Проверка правильности заполнения полей формы
form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  if (validateForm()) {
    form.submit();
    setDefaultForm();
  }
});
