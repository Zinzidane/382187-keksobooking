// form.js
'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_PREVIEW_CONTAINERS_FIRST_ELEMENT_INDEX = 1;
  var PHOTO_PREVIEW_CONTAINERS_ELEMENT_MAX_AMOUNT = 16;
  var FILE_IMG_SORT = 'img';

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

  var avatarFileChooser = document.querySelector('.notice__photo input[type=file]');
  var avatarPreview = document.querySelector('.notice__preview img');
  
  avatarFileChooser.addEventListener('change', function () {
    var file = avatarFileChooser.files[0];
    var fileName = file.name.toLowerCase();
    
    var matches = FILE_TYPES.some(function (it) {
     return fileName.endsWith(it);
    });
    
    if (matches) {
      var reader = new FileReader();
      
      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });
      
      reader.readAsDataURL(file);
    }
  });


  var resetAvatarPreview = function () {
    avatarPreview.src = 'img/muffin.png';

    return avatarPreview;
  };

  // Фотографии жилья, загружаемые пользователем

  var photoFileChooser = document.querySelector('.form__photo-container input[type=file]');
  var photoPreview = document.querySelector('.form__photo-container .form__photo');
  
  var domPhoto = form.querySelector('.form__photo-container');
  var domPhotoInput = domPhoto.querySelector('input[type="file"]');
  var domPhotoPreviewTemplate = document.querySelector('#photo-template').content;

  var photoPreviewContainersElementAmount = domPhoto.children.length - 1;

  var resetPhotoPreviewContainers = function () {
    var domPhotoPreviewCompletedContainers = domPhoto.querySelectorAll('.form__photo:not(:empty)');

    Array.from(domPhotoPreviewCompletedContainers).forEach(function (it) {
      it.innerHTML = '';
    });

    domPhotoInput.value = '';
  };

  var renderPhotoPreviewContainer = function (isContainerEmpty) {
    var domElement = domPhotoPreviewTemplate.cloneNode(true);


    if (isContainerEmpty) {
      domElement.children[0].innerHTML = '';
    }


    return domElement;
  };

  var renderPhotoPreviewEmptyContainers = function (containersElementAmount) {
    var fragment = document.createDocumentFragment();


    for (var i = 0; i < containersElementAmount; i++) {
      fragment.appendChild(renderPhotoPreviewContainer(true));
    }


    return fragment;
  };

  var addPhoto = function (addedPhotoAmount) {
    var fragment = document.createDocumentFragment();

    var emptyContainersLength = domPhoto.querySelectorAll('.form__photo:empty').length;
    var newEmptyContainersLength = 0;


    if (addedPhotoAmount > emptyContainersLength) {
      newEmptyContainersLength = addedPhotoAmount - emptyContainersLength;

      fragment.appendChild(renderPhotoPreviewEmptyContainers(newEmptyContainersLength));
    }

    while (domPhoto.children[PHOTO_PREVIEW_CONTAINERS_FIRST_ELEMENT_INDEX].children.length
        && fragment.children.length - newEmptyContainersLength < photoPreviewContainersElementAmount - addedPhotoAmount) {
      fragment.appendChild(domPhoto.children[PHOTO_PREVIEW_CONTAINERS_FIRST_ELEMENT_INDEX]);
    }

    var domNextNeighbour = addedPhotoAmount <= emptyContainersLength ? domPhoto.children[addedPhotoAmount + 1] : null;

    domPhoto.insertBefore(fragment, domNextNeighbour);
  };

  var onPhotoInputChange = function () {
    var domFiles = domPhotoInput.files;
    var imgFiles = [];

    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

    var file = {};

    var isRightType = function (file, fileSortString) {
      switch (fileSortString) {
        case 'img':
          return FILE_TYPES.some(function (it) {
            return file.name.toLowerCase().endsWith(it);
          });
      }


      return false;
    };


    Array.from(domFiles).forEach(function (it) {
      if (isRightType(it, FILE_IMG_SORT)) {
        imgFiles.push(it);
      }
    });

    if (imgFiles.length) {
      imgFiles = imgFiles.length < PHOTO_PREVIEW_CONTAINERS_ELEMENT_MAX_AMOUNT
        ? imgFiles
        : imgFiles.slice(0, PHOTO_PREVIEW_CONTAINERS_ELEMENT_MAX_AMOUNT);

      addPhoto(imgFiles.length);

      var uploadImgPreview = function (file, domFileImgPreview) {
        var reader = new FileReader();


        var onReaderLoad = function () {
          domFileImgPreview.setAttribute('src', reader.result);

          reader.removeEventListener('load', onReaderLoad);
        };


        reader.addEventListener('load', onReaderLoad);
        reader.readAsDataURL(file);
      };

      imgFiles.forEach(function (it) {
        var domPhotoPreviewContainer = renderPhotoPreviewContainer(false).children[0];


        domPhoto.replaceChild(domPhotoPreviewContainer, domPhoto.querySelector('.form__photo:empty'));

        uploadImgPreview(it, domPhotoPreviewContainer.querySelector('img'));
      });
    }
  };

  domPhotoInput.addEventListener('change', onPhotoInputChange);

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
    var node = document.createElement('div');
    node.style.margin = 'auto';
    node.style.textAlign = 'center';
    node.style.backgroundColor = 'white';
    node.style.position = 'relative';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.style.color = 'black';
    node.textContent = 'Данные формы успешно отправлены';
    document.querySelector('.notice__form').insertAdjacentElement('beforeend', node);
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
      resetAvatarPreview();
      resetPhotoPreviewContainers();
    }
  });

  // Для записи адреса из метки
  window.form = {
    address: address
  };
})();
