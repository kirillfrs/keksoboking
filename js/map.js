'use strict';


(function () {

  window.elements.addressInput.value = (window.elements.mapPinMain.offsetTop - window.elements.mapPinMain.offsetHeight / 2) + ', ' + (window.elements.mapPinMain.offsetLeft - window.elements.mapPinMain.offsetWidth / 2);

  window.map = {
    widthMap: window.elements.mapPin.offsetWidth,
    activeCardId: null,
    currentCard: null
  }

  // help function

  var onPopupEscPress = function (evt) {
    var bigCard = document.querySelector('.map__card');
    if (evt.keyCode === window.constants.ESC_KEYCODE) {
      window.elements.map.removeChild(bigCard);
      window.elements.currentPin.classList.remove(window.constants.MAP_PIN_ACTIVE_CLASS);
      window.elements.currentPin.blur();
    }

  }

  var onPopupClick = function (evt) {

    window.elements.currentPin.classList.remove(window.constants.MAP_PIN_ACTIVE_CLASS);
  }



  var createFragmentPhotos = function (arr) {
    var fragmentPhotos = document.createDocumentFragment(arr);
    for (var i = 0; i < arr.length; i++) {
      var img = document.createElement('img');
      img.src = arr[i];
      img.width = 45;
      img.height = 40;
      img.classList.add('popup__photo');
      fragmentPhotos.appendChild(img);
    }
    return fragmentPhotos;
  };

  var createFragmentFeatures = function (array) {
    var fragmentFeatures = document.createDocumentFragment(array);
    for (var i = 0; i < array.length; i++) {
      var li = document.createElement('li');
      li.classList.add('popup__feature');
      var classAdded = 'popup__feature--' + array[i];
      li.classList.add(classAdded);
      fragmentFeatures.appendChild(li);
    }
    return fragmentFeatures;
  };


 var createItem = function (arr) {
    var fragmentCard = document.createDocumentFragment();
    var mapCardElement = window.elements.mapTemplate.cloneNode(true);

    window.elements.mapCard.insertBefore(mapCardElement, window.elements.mapPinFilter);

    mapCardElement.querySelector('.popup__title').textContent = arr.offer.title;
    mapCardElement.querySelector('.popup__text--address').textContent = arr.offer.address;
    mapCardElement.querySelector('.popup__text--price').textContent = arr.offer.price + ' ' + '₽/ночь';
    if (arr.offer.type === 'flat') {
      mapCardElement.querySelector('.popup__type').textContent = 'Квартира';
    } else if (arr.offer.type === 'bungalo') {
      mapCardElement.querySelector('.popup__type').textContent = 'Бунгало';
    } else if (arr.offer.type === 'house') {
      mapCardElement.querySelector('.popup__type').textContent = 'Дом';
    } else {
      mapCardElement.querySelector('.popup__type').textContent = 'Дворец';
    }

    if (arr.offer.rooms === 1 && arr.offer.guests === 1) {
      mapCardElement.querySelector('.popup__text--capacity').textContent = `${arr.offer.rooms} комната для  ${arr.offer.guests} гостя`;
    } else if (arr.offer.rooms === 1 && arr.offer.guests >= 2) {
      mapCardElement.querySelector('.popup__text--capacity').textContent = `${arr.offer.rooms} комната для  ${arr.offer.guests} гостей`;
    } else if (arr.offer.rooms === 2 && arr.offer.guests >= 2) {
      mapCardElement.querySelector('.popup__text--capacity').textContent = `${arr.offer.rooms} комнаты для  ${arr.offer.guests} гостей`;
    } else if (arr.offer.rooms === 3 && arr.offer.guests >= 2) {
      mapCardElement.querySelector('.popup__text--capacity').textContent = `${arr.offer.rooms} комнаты для  ${arr.offer.guests} гостей`;
    }

    mapCardElement.querySelector('.popup__text--time').textContent = `Заезд после ${arr.offer.checkin} , выезд до ${arr.offer.checkout}`;

    var cardFeatures = mapCardElement.querySelector('.popup__features');
    cardFeatures.innerHTML = '';
    cardFeatures.appendChild(createFragmentFeatures(arr.offer.features));

    mapCardElement.querySelector('.popup__description').textContent = arr.offer.description;


    var cardPhotos = mapCardElement.querySelector('.popup__photos');
    cardPhotos.innerHTML = '';
    cardPhotos.appendChild(createFragmentPhotos(arr.offer.photos));

    mapCardElement.querySelector('.popup__avatar').src = arr.author.avatar;


    fragmentCard.appendChild(mapCardElement);

    return mapCardElement;

  }


  window.createItems = function (array) {
    var items = [];
    for (var i = 0; i < array.length; i++) {
      var oneBigCard = createItem(array[i]);
      oneBigCard.dataset.id = i;
      items.push(oneBigCard);
    }
    return items;
  };

  // var cards = createCardsArr();  // cards = window.dates
  // var itemsArray = createItems();



  //  4 zadanie active page






  window.elements.map.addEventListener('click', function (evt) {
    var target = evt.target;
    var mapPinElement = target.closest('.map__pin:not(.map__pin--main)');
    var mainPin = document.querySelector('.map__pin--main');
    var popupCard = document.querySelector('.popup');
    var mapPinAcitve = '.map__pin--active';
    var buttonClose = target.className === 'popup__close';
    var pinArray = window.elements.map.querySelectorAll('.map__pin:not(.map__pin--main)');


    if (popupCard && mapPinElement) {
      window.elements.map.removeChild(popupCard);
      if (!mainPin || mapPinElement) {
        window.elements.map.appendChild(itemsArray[mapPinElement.dataset.id]);
      }
    } else {
      if (!mainPin || mapPinElement) {
        window.elements.map.appendChild(itemsArray[mapPinElement.dataset.id]);
      }
    }
    if (target.className === 'popup__close') {
      window.elements.map.removeChild(popupCard);
      onPopupClick()

    }

    if (!mapPinElement || (mapPinElement === mapPinElement.dataset.id)) {
      return;
    }


    window.pin.hideLastPin();
    window.elements.currentPin = mapPinElement;

    mapPinElement.classList.add(window.constants.MAP_PIN_ACTIVE_CLASS);


  });


  document.addEventListener('keydown', onPopupEscPress);



})();