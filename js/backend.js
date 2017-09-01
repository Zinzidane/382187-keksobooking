// backend.js
'use strict';

(function () {
  var URL = 'https://1510.dump.academy/keksobooking';
  var sendRequest = function (method, url, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          onError(xhr.status + 'Неверный запрос');
          break;
        case 404:
          onError(xhr.status + 'Не найдено');
          break;
        case 418:
          onError(xhr.status + 'Я чайник'); // ))
          break;
        case 500:
          onError(xhr.status + 'Ошибка сервера');
          break;
        default:
          onError('Неизвестный статус' + xhr.status + xhr.statusText);
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 4000;

    xhr.open(method, url);
    return xhr;
  };
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = sendRequest('GET', URL + '/data', onLoad, onError);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = sendRequest('POST', URL, onLoad, onError);
      xhr.send(data);
    }
  };
})();
