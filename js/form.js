'use strict';

(function () {

    var mapForm = document.querySelector('.notice__form');
    var roomNumber = mapForm.querySelector('#room_number');
    var capacity = mapForm.querySelector('#capacity');
    var options = capacity.querySelectorAll("option");
    var roomType = mapForm.querySelector("#type");
    var price = mapForm.querySelector("#price");
    var address = mapForm.querySelector("#address");
    var timeIn = mapForm.querySelector("#timein");
    var timeOut = mapForm.querySelector("#timeout");
    var title = document.querySelector("#title");
    var allInputsElements = mapForm.querySelectorAll('input');
    var formSubmitElement = mapForm.querySelector('.form__submit');
    var resetButton = mapForm.querySelector('.form__reset');
    var inputCheckboxes = mapForm.querySelectorAll('input[type=checkbox]');


    var onTimeOutChange = function () {
        timeOut.value = timeIn.value;
    };
    var onTimeInChange = function () {
        timeIn.value = timeOut.value;
    };

    var resetMainPin = function () {
        window.elements.mainPin.style.left = window.constants.PIN_LEFT_COORD + 'px';
        window.elements.mainPin.style.top = window.constants.PIN_TOP_COORD + 'px';
    };

    var clearMap = function () {
        var pins = window.elements.mapPinList.querySelectorAll('.map__pin:not(.map__pin--main)');
        for (var i = 0; i < pins.length; i++) {
            pins[i].remove(pins[i]);
        }
    };

    var setAddress = function () {
        address.setAttribute('value', window.sum);
    };

    var onResetClick = function (evt) {
        inputCheckboxes.forEach(function (element) {
            if (element.checked) {
                element.checked = false;
            }
        });
        setAddress()
    };

    resetButton.addEventListener('click', onResetClick);


    roomNumber.addEventListener('change', function () {

        var selectType = window.constants.ROOM_QUANTITY[roomNumber.value];

        options.forEach(function (array) {
            if (selectType.enabled.indexOf(array.value) === -1) {
                array.setAttribute('disabled', 'disabled');

                if (capacity.value === array.value) {
                    capacity.setCustomValidity(selectType.textError);
                }

            } else {
                array.removeAttribute('disabled');

                if (capacity.value == array.value) {
                    capacity.setCustomValidity('');
                }

            }
        });
    });

    var checkTitleValidity = function () {
        var validity = title.validity;
        if (validity.tooShort) {
            title.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
        } else if (validity.tooLong) {
            title.setCustomValidity('Заголовок не должен превышать 100 символов');
        } else if (validity.valueMissing) {
            title.setCustomValidity('Обязательное поле,bro!');
        } else {
            title.setCustomValidity('');
        }
    };


    title.addEventListener('invalid', function () {
        checkTitleValidity();
    });

    address.setAttribute('disabled', true)

    roomType.addEventListener('change', function (evt) {
        var select = window.constants.TYPES[roomType.value];
        price.setAttribute('placeholder', select.placeholder);
        price.setAttribute('min', select.min);
    });

    timeIn.addEventListener('change', onTimeOutChange);
    timeOut.addEventListener('change', onTimeInChange);

    var onSumbitSucces = function (onLoad) {
        var node = document.createElement('div');
        node.style = 'z-index: 999; margin:0 auto ;background-color:red; text-align:center';
        node.style.fontSize = '35px';
        node.textContent = onLoad;
        window.elements.map.insertAdjacentElement('afterend', node);
        mapForm.reset();

    }

    var onSumbitError = function (onError) {
        var node = document.createElement('div');
        node.style = 'z-index: 999; margin:0 auto ;background-color:red; text-align:center';
        node.style.fontSize = '35px';
        node.textContent = onError;
        window.elements.map.insertAdjacentElement('afterend', node);
        mapForm.reset();
        formSubmitElement.addEventListener('click', function () {
            node.remove();

        });

    }


    var onSubmitClick = function (evt) {
        checkBeforeSend(allInputsElements);
        window.backend.upload(new FormData(mapForm), onSumbitSucces, onSumbitError);
        evt.preventDefault();

    };



    var checkBeforeSend = function (param) {
        for (var i = 0; i < param.length; i++) {
            if (param[i].validity.valid === false) {
                param[i].setAttribute('style', 'border: 2px solid red;');
            } else {
                param[i].removeAttribute('style');
            }
        }

    };
    mapForm.addEventListener('submit', onSubmitClick);

})();