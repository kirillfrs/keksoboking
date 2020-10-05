"use strict",

    (function () {
        window.elements = {
            map: document.querySelector('.map'),
            mapPinMain: document.querySelector('.map__pin--main'),
            formElement: document.querySelectorAll('.form__element'),
            addressInput: document.querySelector('#address'),
            mapTemplate: document.querySelector('template').content.querySelector('.map__card'),
            mapCard: document.querySelector('.map'),
            mapPin: document.querySelector('.map__pins'),
            mapPinTemplate: document.querySelector('template').content.querySelector('.map__pin'),
            mapPinFilter: document.querySelector('.map__filters-container'),
            mapPinActive: document.querySelector('.map__pin--active'),
            currentPin: null,
            

        }

    })();