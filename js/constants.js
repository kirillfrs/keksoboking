"use strict",

    (function () {

        window.constants = {

            COUNT_CARDS: 8,
            TITLE: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],

            TYPE_OF_HOUSES: ['palace', 'flat', 'house', 'bungalo'],
            TYPES: {
                palace: {
                    min: 10000,
                    placeholder: 10000,
                },
                flat: {
                    min: 1000,
                    placeholder: 1000,
                },
                house: {
                    min: 5000,
                    placeholder: 5000,
                },
                bungalo: {
                    min: 0,
                    placeholder: 0,
                }
            },
            WIDTH: 1140,
            MIN_PRICE: 1000,
            MAX_PRICE: 1000000,
            MIN_ROOM: 1,
            MAX_ROOM: 5,
            MIN_GUESTS: 1,
            MAX_GUESTS: 5,
            CHECK_TIME: ['12:00', '13:00', '14:00'],
            FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
            PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
            IMAGE_NUM_RANGE: [1, 2, 3, 4, 5, 6, 7, 8],
            MIN_LOCATION_X: 100,
            MAX_LOCATION_X: 900,
            MIN_LOCATION_Y: 130,
            MAX_LOCATION_Y: 630,
            DESCRIPTION: 'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.',
            PIN_WIDTH: 65,
            PIN_HEIGHT: 65,
            PIN_ARROW_HEIGHT: 22,
            ESC_KEYCODE: 27,
            MAP_PIN_ACTIVE_CLASS: 'map__pin--active',
            ROOM_QUANTITY: {
                1: {
                    enabled: ['1'],
                    textError: 'не более одного гостя'
                },
                2: {
                    enabled: ['1', '2'],
                    textError: 'не более одного или двух гостей'
                },
                3: {
                    enabled: ['1', '2', '3'],
                    textError: 'не более одного, двух или трёх гостей'
                },
                100: {
                    enabled: ['0'],
                    textError: 'не для гостей'
                }
            },





        }
    })();