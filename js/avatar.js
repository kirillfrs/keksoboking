'use strict';

(function () {

    // avatar
    var fileChooser = document.querySelector('.notice-form-header__input');
    var preview = document.querySelector('.ss');
    var TYPE_FILES = ['png', 'jpg', 'jpeg'];

    fileChooser.addEventListener('change', function () {
        var file = fileChooser.files[0];
        var fileName = file.name.toLowerCase();
        var match = TYPE_FILES.some(function (it) {
            return fileName.endsWith(it);
        });
        if (match) {
            var reader = new FileReader();
            reader.addEventListener('load', function () {
                preview.src = reader.result;
            });
            reader.readAsDataURL(file);
        }

    });
    // accomadation
    var propertyChooser = document.querySelector('.upload__input');
    var propertyShown = document.querySelector('.upload__photo');
    propertyChooser.setAttribute('multiple', true);

    propertyChooser.addEventListener('change', function () {
        Array.from(propertyChooser.files).forEach(function (file) {
            var fileName = file.name.toLowerCase();
            var match = TYPE_FILES.some(function (it) {
                return fileName.endsWith(it);
            })
            if (match) {
                var reader = new FileReader();
                reader.addEventListener('load', function () {
                    var createElement = document.createElement('img');
                    createElement.style.width = '70px';
                    createElement.style.height = '70px';
                    createElement.src = reader.result;
                    propertyShown.appendChild(createElement);
                });
                reader.readAsDataURL(file);
            }

        });



    });

})();