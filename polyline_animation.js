ymaps.ready(['AnimatedLine']).then(init);

function init(ymaps) {
    // Создаем карту.
    //var myMap = new ymaps.Map("map", {
    //    center: [56.023498, 37.694333],
    //    zoom: 15
    //}, {
    //    searchControlProvider: 'yandex#search'
    //});
    // Создаем ломаные линии.
    var firstAnimatedLine = new ymaps.AnimatedLine([
        [56.027748, 37.690414],
        [56.026518, 37.692765],
        [56.026172, 37.692403],
        [56.026172, 37.692403],
        [56.024296, 37.694920],
        [56.023935, 37.694985],
        [56.023641, 37.695521],
        [56.023659, 37.696133],
        [56.023502, 37.696787],
        [56.023502, 37.696787],
        [56.023094, 37.698118]
    ], {}, {
        // Задаем цвет.
        strokeColor: "#ED4543",
        // Задаем ширину линии.
        strokeWidth: 5,
        // Задаем длительность анимации.
        animationTime: 4000
    });
    var secondAnimatedLine = new ymaps.AnimatedLine([
        [56.023094, 37.698118],
        [56.023065, 37.696929],
        [56.022975, 37.696650],
        [56.022590, 37.696671],
        [56.022350, 37.696929],
        [56.022038, 37.696854],
        [56.021377, 37.694985],
        [56.018483, 37.686046],
        [56.018463, 37.685182],
        [56.018193, 37.685053],
        [56.017964, 37.684527],
        [56.016594, 37.683186],
        [56.016624, 37.682961]
    ], {}, {
        strokeColor: "#1E98FF",
        strokeWidth: 5,
        animationTime: 4000
    });
    // Добавляем линии на карту.
    myMap.geoObjects.add(firstAnimatedLine);
    myMap.geoObjects.add(secondAnimatedLine);
    // Создаем метки.
    var firstPoint = new ymaps.Placemark([56.027748, 37.690414], {}, {
        preset: 'islands#redRapidTransitCircleIcon'
    });
    var secondPoint = new ymaps.Placemark([56.023094, 37.698118], {}, {
        preset: 'islands#blueMoneyCircleIcon'
    });
    var thirdPoint = new ymaps.Placemark([56.016624, 37.682961], {}, {
        preset: 'islands#blackZooIcon'
    });
    // Функция анимации пути.
    function playAnimation() {
        // Убираем вторую линию.
        secondAnimatedLine.reset();
        // Добавляем первую метку на карту.
        myMap.geoObjects.add(firstPoint);
        // Анимируем первую линию.
        firstAnimatedLine.animate()
            // После окончания анимации первой линии добавляем вторую метку на карту и анимируем вторую линию.
            .then(function() {
                myMap.geoObjects.add(secondPoint);
                return secondAnimatedLine.animate();
            })
            // После окончания анимации второй линии добавляем третью метку на карту.
            .then(function() {
                myMap.geoObjects.add(thirdPoint);
                // Добавляем паузу после анимации.
                return ymaps.vow.delay(null, 2000);
            })
            // После паузы перезапускаем анимацию.
            .then(function() {
                // Удаляем метки с карты.
                myMap.geoObjects.remove(firstPoint);
                myMap.geoObjects.remove(secondPoint);
                myMap.geoObjects.remove(thirdPoint);
                // Убираем вторую линию.
                secondAnimatedLine.reset();
                // Перезапускаем анимацию.
                playAnimation();
            });
    }
    // Запускаем анимацию пути.
    playAnimation();
}
