// form.js
'use strict';

(function () {
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
})();
