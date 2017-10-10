// form.js
'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

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
    address.required = true;
  };

  setDefaultForm();

  // Аватар пользователя


  
  var fileChooser = document.querySelector('.notice__photo input[type=file]');
  var preview = document.querySelector('.notice__preview img');
  
  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();
    
    var matches = FILE_TYPES.some(function (it) {
     return fileName.endsWith(it);
    });
    
    if (matches) {
      var reader = new FileReader();
      
      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      
      reader.readAsDataURL(file);
    }
  });


  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
    element.value = value;
  };

  window.synchronizeFields(timeIn, timeOut, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  window.synchronizeFields(timeOut, timeIn, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  window.synchronizeFields(type, price, ['flat', 'bungalo', 'house', 'palace'], [1000, 0, 5000, 10000], syncValueWithMin);
  window.synchronizeFields(roomNumber, capacity, ['1', '2', '3', '100'], ['1', '2', '3', '0'], syncValues);

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

  var onSuccess = function () {
    setDefaultForm();
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style.margin = 'auto';
    node.style.textAlign = 'center';
    node.style.backgroundColor = 'red';
    node.style.position = 'relative';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.style.color = 'white';
    node.textContent = errorMessage;
    document.querySelector('.notice__form').insertAdjacentElement('beforeend', node);
  };

  // Проверка правильности заполнения полей формы
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (validateForm()) {
      window.backend.save(onSuccess, onError, new FormData(form));
    }
  });

  // Для записи адреса из метки
  window.form = {
    address: address
  };
})();
