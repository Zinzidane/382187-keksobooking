/// filter.js
'use strict';

(function () {
  var markedParams;
  var filterContainer = document.querySelector('.tokyo__filters');

  // Функция получения фильтрующих параметров
  var getFilterParams = function (nodeList) {
    var nodesArray = [].slice.call(nodeList);
    var getParams = function (filterItem) {
      return {
        name: filterItem.checked ? filterItem.value : filterItem.parentNode.name,
        value: filterItem.checked || filterItem.value
      };
    };
    return nodesArray.map(getParams);
  };

  // Функция получения фильтруемых параметров
  var filterAds = function (data) {
    var getFeature = function (features) {
      for (var i = 0; i < data.offer.features.length; i++) {
        features[data.offer.features[i]] = true;
      }
      return features;
    };
    var adsFeatures = data.offer.features.reduce(getFeature, {});
    var housingPrice;
    if (data.offer.price < 10000) {
      housingPrice = 'low';
    } else if (data.offer.price > 50000) {
      housingPrice = 'high';
    } else {
      housingPrice = 'middle';
    }
    var adsParams = {
      'housing_type': data.offer.type,
      'housing_price': housingPrice,
      'housing_room-number': String(data.offer.rooms), // Приведение к строке
      'housing_guests-number': String(data.offer.guests)
    };
    markedParams = Object.assign({}, adsParams, adsFeatures);
    var markedFilters = document.querySelectorAll('.tokyo__filters option:checked:not([value="any"]), .tokyo__filters input:checked');
    return getFilterParams(markedFilters).every(function (param) {
      return markedParams[param.name] === param.value;
    });
  };

  window.filter = {
    // Функция возвращает отфильтрованный массив
    apply: function (data) {
      return data.filter(filterAds);
    },
    container: filterContainer
  };

})();
