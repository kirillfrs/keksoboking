"use strict";

(function () {

    window.pin = {
        hideLastPin: function () {
            if (window.elements.currentPin) {
                window.elements.currentPin.classList.remove(window.constants.MAP_PIN_ACTIVE_CLASS);
                window.map.activeCardId = null;

            }
        },
        createPins: function (icons) {
            for (var i = 0; i < icons.length; i++) {
                var fragmentPins = document.createDocumentFragment(); //создан фрагмент
                var mapPinElement = window.elements.mapPinTemplate.cloneNode(true);
                mapPinElement.dataset.id = i;
                mapPinElement.children[0].src = icons[i].author.avatar;
                mapPinElement.style.left = (icons[i].location.x - window.constants.PIN_WIDTH) + 'px';
                mapPinElement.style.top = (icons[i].location.y - window.constants.PIN_HEIGHT) + 'px';
                mapPinElement.children[0].alt = icons[i].offer.title;



                fragmentPins.appendChild(mapPinElement);
                window.elements.mapPin.appendChild(mapPinElement);
            }
        },
    }
    var setDisabledAtr = function (param) {
        if (param === true) {
            for (var i = 0; i < window.elements.formElement.length; i++) {
                var form = window.elements.formElement[i];
                form.setAttribute("disabled", true);
            }
        } else {
            for (var i = 0; i < window.elements.formElement.length; i++) {
                var form = window.elements.formElement[i];
                form.removeAttribute("disabled");
            }

        }
    }

    setDisabledAtr(false);





    var activeMap = function () {
        window.pin.createPins(advert);

        window.elements.map.classList.remove('map--faded');
        document.querySelector('.notice__form').classList.remove('notice__form--disabled');
        setDisabledAtr(false);

    }


    window.elements.mapPinMain.addEventListener('mouseup', function () {
        activeMap();
        window.elements.addressInput.value = (window.elements.mapPinMain.offsetTop + window.constants.PIN_HEIGHT / 2) + ', ' + (window.elements.mapPinMain.offsetLeft + window.constants.PIN_WIDTH / 2);

    });
    window.elements.mapPinMain.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        var startCoords = {
            x: evt.clientX,
            y: evt.clientY
        };
        //  перетаскивание 


        var onMouseMove = function (evtMove) {
            evtMove.preventDefault();

            var shift = {
                x: startCoords.x - evtMove.clientX,
                y: startCoords.y - evtMove.clientY
            };


            startCoords = {
                x: evtMove.clientX,
                y: evtMove.clientY
            };
            var leftPin = window.constants.PIN_WIDTH / 2 + window.elements.mapPinMain.offsetLeft;
            var topPin = window.constants.PIN_HEIGHT + window.constants.PIN_ARROW_HEIGHT + window.elements.mapPinMain.offsetTop;
            window.sum = leftPin + ' ' + topPin;
            if (window.elements.mapPinMain.offsetLeft - shift.x < 0) {
                window.elements.mapPinMain.style.left = 0 + 'px';
            } else if (window.elements.mapPinMain.offsetLeft - shift.x > window.map.widthMap - window.constants.PIN_WIDTH) {
                window.elements.mapPinMain.style.left = window.map.widthMap - window.constants.PIN_WIDTH + 'px';
            } else {
                window.elements.mapPinMain.style.left = (window.elements.mapPinMain.offsetLeft - shift.x) + 'px';
            }

            if (window.elements.mapPinMain.offsetTop - shift.y > window.constants.MAX_LOCATION_Y) {
                window.elements.mapPinMain.style.top = window.constants.MAX_LOCATION_Y + 'px';
            } else if (window.elements.mapPinMain.offsetTop - shift.y < window.constants.MIN_LOCATION_Y) {
                window.elements.mapPinMain.style.top = window.constants.MIN_LOCATION_Y + 'px';
            } else {
                window.elements.mapPinMain.style.top = (window.elements.mapPinMain.offsetTop - shift.y) + 'px';
            }

        };

        var onMouseUp = function (evtEnd) {
            evtEnd.preventDefault();
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

    });




    var onLoadSuccess = function (advert) {
        window.advert = advert;
        window.itemsArray = createItems(advert);

    };


    var onLoadError = function (errorMessage) {
        var node = document.createElement('div');
        node.classList.add('error');
        node.style.display = 'block';
        node.textContent = errorMessage;
        document.body.appendChild(node);
        document.body.addEventListener('click', function () {
            node.remove()
        });
    };

    window.backend.download(onLoadSuccess, onLoadError);



})();