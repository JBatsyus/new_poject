var myMap;

ymaps.ready(init);

function  init() {
     myMap = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 5,
            type: 'yandex#map'
        }, {
            searchControlProvider: 'yandex#search'
        })

    towns.forEach(town =>
        {
          town.points.forEach(point=>{

            //верстка для балуна
            let balloonContent=''
            balloonContent+=`<div>${point.company}<br>${point.adress}<br><a href="tel:${point.phone}">${point.phone}</a></div>`

            //добавляем точку
            myMap.geoObjects
              .add(new ymaps.Placemark(point.coords, {
                  balloonContent: balloonContent
                }, {
                  preset: 'islands#blueDeliveryIcon',
                  balloonOffset: [3, -40],
                  balloonPanelMaxMapArea: 0
                  //hideIconOnBalloonOpen: false,

                })
              )

          })
            // //верстка для балуна
            // let balloonContent=''
            // balloonContent+=`<b>${town.city}</b><hr>`

            // let phones=''
            // item.points.phone.forEach(phone=>{
            //     phones+=`<a href='tel:${item.points.phone}'>${item.points.phone}</a><br>`
            // })
            // balloonContent+=phones

        // //добавляем точку
        // myMap.geoObjects
        // .add(new ymaps.Placemark(town.points.coords, {
        //     balloonContent: balloonContent
        // }, {
        //     preset: 'islands#redSportIcon'
        // })
        // )

    });
}

function showFilial(x,y) {
    /*
    myMap.setZoom(5, {duration: 1000});
    myMap.setCenter([x,y])
    myMap.setZoom(16, {duration: 1000});
    */


    //myMap.setZoom(5, {duration: 500});
    //////

    myAction = new ymaps.map.action.Single({
        center: [x, y],
        zoom: 15,
        duration: 500,
        timingFunction: "ease-in"
  });
  setTimeout(()=>{
    myMap.action.execute(myAction)
  }, 500)


    /////

    console.log(x,y)


}
