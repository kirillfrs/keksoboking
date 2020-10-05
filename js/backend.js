"use strict";

(function () {
    var URL_GET = 'https://javascript.pages.academy/keksobooking/data';
    var URL_POST = 'https://javascript.pages.academy/keksobooking';

    var getXhrData = function (onLoad, onError) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', function () {
            switch (xhr.status) {
                case 200:
                    onLoad(xhr.response);
                    break;
                case 400:
                    onError('Неверный запрос');
                    break;
                case 404:
                    onError('Ничего не найдено');
                    break;
                default:
                    onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
            }
        });
        xhr.addEventListener('error', function () {
            onError('Что-то пошло не так! Произошла ошибка соединения');
        });
        xhr.addEventListener('timeout', function () {
            onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
        });
        xhr.timeout = 10000;

        return xhr;
    };

    window.backend = {
        download: function (onLoad, onError) {
            var xhr = getXhrData(onLoad, onError);

            xhr.open('GET', URL_GET);
            xhr.send();

        },
        upload: function (data, onLoad, onError) {
            var xhr = getXhrData(onLoad, onError);

            xhr.open('POST', URL_POST);
            xhr.send(data);
        }
    };

})();

// (function () {

//     window.backend = {
//         download: function (onLoad, onError) {
//             var URL = 'https://javascript.pages.academy/keksobooking/data';
//             var xhr = new XMLHttpRequest();
//             xhr.responseType = 'json';

//             xhr.addEventListener('load', function () {
//                 switch (xhr.status) {
//                     case 200:
//                         onLoad(xhr.response);
//                         break;
//                     case 400:
//                         onError('неверный запрос');
//                         break;
//                     case 404:
//                         onError('Ничего не найдено');
//                     default:
//                         onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
//                 }
//             });

//             xhr.addEventListener('error', function () {
//                 onError('Произошла ошибка соединения');
//             });
//             xhr.addEventListener('timeout', function () {
//                 onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
//             });

//             xhr.open('GET', URL);
//             xhr.send();

//         },

//         upload: function (data, onLoad, onError) {
//             var URL = 'https://javascript.pages.academy/keksobooking';
//             var xhr = new XMLHttpRequest();
//             xhr.responseType = 'json';
//             xhr.addEventListener('load', function () {
//                 switch (xhr.status) {
//                     case 200:
//                         onLoad(xhr.response);
//                         break;
//                     default:
//                         onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
//                 }
//             });
//             xhr.open('POST', URL);
//             xhr.send(data);
//         }
//     };

// })();


