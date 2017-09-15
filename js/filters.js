// filters.js
'use strict';

(function () {

  var filtersContainer = document.querySelector('.tokyo__filters');
  var housingType = filtersContainer.querySelector('#housing_type');
  var housingPrice = filtersContainer.querySelector('#housing_price');
  var housingRoomNumber = filtersContainer.querySelector('#housing_room-number');
  var housingGuestsNumber = filtersContainer.querySelector('#housing_guests-number');
  var features = filtersContainer.querySelectorAll('input[name="feature"]');

  // Функция для фильтрации по типу жилья, количеству комнат и количеству гостей
  var filterTypeRoomsGuests = function (filterValue, itemValue) {
    if (filterValue === 'any' || itemValue === filterValue) {
      return true;
    }
    return false;
  };

  // Функция для фильтрации по цене
  var filterPrice = function (price) {
    if (housingPrice.value === 'high') {
      return price >= 50000;
    } else if (housingPrice.value === 'middle') {
      return (price >= 10000) && (price < 50000);
    } else if (housingPrice.value === 'low') {
      return price < 10000;
    }
      return true;
  };

  // Функция для фильтрации по удобствам
  var filterFeatures = function (housingFilterFeatures, itemFeatures) {
    for (var i = 0; i < housingFilterFeatures.length; i++) {
      if (itemFeatures.indexOf(housingFilterFeatures[i]) === -1) {
        return false;
      }
    }

    return true;
  };

  window.applyFilters = function () {
    // Фунцкия, которая возращает новый массив со значениями отмеченных удобств
    var housingFeatures = [].filter.call(features, function (item) {
      return item.checked;
    }).map(function (item) {
      return item.value;
    });

    return window.data.filter(function (item) {
      if (!filterTypeRoomsGuests(housingType.value, item.offer.type)) {
        return false;
      }
      if (!filterPrice(item.offer.price)) {
        return false;
      }
      if (!filterTypeRoomsGuests(housingRoomNumber.value, item.offer.rooms + '')) {
        return false;
      }
      if (!filterTypeRoomsGuests(housingGuestsNumber.value, item.offer.guests + '')) {
        return false;
      }
      if (!filterFeatures(housingFeatures, item.offer.features)) {
        return false;
      }

      return true;
    });
  };
})();
