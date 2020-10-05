'use strict';

(function () {
    window.util = {

        compareRandom: function () {
            return Math.random() - 0.5;
        },


        getRandomNumber: function (min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },

        getRandomTimer: function (arr) {
            return Math.floor(Math.random() * arr.length);
        },

        getUniqueNumber: function (arr) {
            var uniqueElement = arr[window.util.getRandomNumber(0, (arr.length))];
            arr.splice(arr.indexOf(uniqueElement), 1);
            return uniqueElement;
        },

        shuffleArray: function (array) {
            var finalArr = array.slice();
            for (var i = 0; i < finalArr.length; i++) {
                var j = Math.floor(Math.random() * (i + 1));
                var tmp = finalArr[i];
                finalArr[i] = finalArr[j];
                finalArr[j] = tmp;
            }
            return finalArr;
        },

    }
})();


