// backend.js
'use strict';

(function () {
  var URL = 'https://1510.dump.academy/keksobooking';
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        var error;

        switch (xhr.status) {
          case 200:
            onLoad(xhr.status);
            break;
          case 400:
            error = xhr.status + 'Неверный запрос';
            break;
          case 404:
            error = xhr.status + 'Не найдено';
            break;
          case 418:
            error = xhr.status + 'Я чайник';
            break;
          case 500:
            error = xhr.status + 'Ошибка сервера';
            break;
          default:
            error = 'Неизвестный статус' + xhr.status + xhr.statusText;
            break;
        }
        if (error) {
          onError(error);
        }
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

      xhr.addEventListener('load', function () {
        var error;

        switch (xhr.status) {
          case 200:
            onLoad(xhr.status);
            break;
          case 400:
            error = xhr.status + 'Неверный запрос';
            break;
          case 404:
            error = xhr.status + 'Не найдено';
            break;
          case 418:
            error = xhr.status + 'Я чайник';
            break;
          case 500:
            error = xhr.status + 'Ошибка сервера';
            break;
          default:
            error = 'Неизвестный статус' + xhr.status + xhr.statusText;
            break;
        }
        if (error) {
          onError(error);
        }
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
