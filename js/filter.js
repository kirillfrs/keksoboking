"use strict";
(function () {

    var filterForm = document.querySelector('.map__filters');
    var type = filterForm.querySelector('#housing-type');
    var price = filterForm.querySelector('#housing-price');
    var rooms = filterForm.querySelector('#housing-rooms');
    var guests = filterForm.querySelector('#housing-guests');
    var features = filterForm.querySelector('#housing-features');



    var removeMapArea = function () {
        var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
        allPins.forEach(function (it) {
            it.remove()
        });

    };




    var filtrationByFeatures = function (item) {
        var checkedElem = features.querySelectorAll('input[type=checkbox]:checked');
        return Array.from(checkedElem).every(function (element) {
            return item.offer.features.includes(element.value);
        });
    };

    var priceSelection = function (selectPrice) {
        if (price.value === 'low') {
            return selectPrice.offer.price < 10000;
        } else if (price.value === 'middle') {
            return selectPrice.offer.price >= 10000 && selectPrice.offer.price <= 50000;
        } else if (price.value === 'high') {
            return selectPrice.offer.price > 50000;
        } else {
            return true;
        }
    };


    var typeSelection = function (selectFlat) {

        if (type.value === "flat") {
            return selectFlat.offer.type === "flat";
        } else if (type.value === 'house') {
            return selectFlat.offer.type === "house";
        }
        else if (type.value === 'bungalo') {
            return selectFlat.offer.type === "bungalo";
        } else {
            return true;
        };

    };

    var chooseRooms = function (roomQuantity) {
        return rooms.value === 'any' || roomQuantity.offer.rooms.toString() === rooms.value;
    };

    var chooseGuests = function (selectGuests) {
        return guests.value = 'any' || selectGuests.offer.guests.toString() === guests.value;
    }
    var chooseGuests = function (selectGuests) {
        return guests.value === 'any' || selectGuests.offer.guests.toString() === guests.value;
    };

    var onFilterChange = function () {
        removeMapArea();

        var filteredPins = window.advert.filter(function (filtredData) {
            var adRooms = priceSelection(filtredData);
            var adType = typeSelection(filtredData);
            var adPrice = chooseRooms(filtredData);
            var adGuests = chooseGuests(filtredData);
            var adFeatures = filtrationByFeatures(filtredData);

            return adRooms && adType && adGuests && adPrice && adFeatures;
        });

        window.pin.createPins(filteredPins);

    };

    // price.addEventListener('change', onFilterChange);
    filterForm.addEventListener('change', window.debounce.onFilterChange);
})();
