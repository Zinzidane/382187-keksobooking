// backend.js
'use strict';

(function () {
  var URL = 'https://1510.dump.academy/keksobooking';
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function (){
        var error;

        switch (xhr.status) {
          case 200:
            onLoad(xhr.status);
            break;
          case 400:
            onError(xhr.status + 'Неверный запрос');
            break;
          case 404:
            onError(xhr.status + 'Не найдено');
          case 418:
            onError(xhr.status + 'Я чайник'); // ))
            break;
          case 500:
            onError(xhr.status + 'Ошибка сервера');
            break;
          default:
            onError('Неизвестный статус' + xhr.status + xhr.statusText);
            break;
        };
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 4000;

      xhr.open('GET', URL + '/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function (){
        var error;

        switch (xhr.status) {
          case 200:
            onLoad(xhr.status);
            break;
          case 400:
            onError(xhr.status + 'Неверный запрос');
            break;
          case 404:
            onError(xhr.status + 'Не найдено');
          case 418:
            onError(xhr.status + 'Я чайник'); // ))
            break;
          case 500:
            onError(xhr.status + 'Ошибка сервера');
            break;
          default:
            onError('Неизвестный статус' + xhr.status + xhr.statusText);
            break;
        };
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 4000;

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
