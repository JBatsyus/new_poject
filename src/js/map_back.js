
ymaps3.ready.then(() => {

  const  {YMap, YMapDefaultSchemeLayer,YMapDefaultFeaturesLayer} = ymaps3;
    // HTML-элемент.
    const map = new ymaps3.YMap(document.querySelector('#map'), {
      location: {
        center: [37.588144, 55.733842],
        zoom: 4
      }
    });
  
    // рисуем карту
    map.addChild(new YMapDefaultSchemeLayer())
    // добавляем слой с маркерами
    map.addChild(new YMapDefaultFeaturesLayer()); 

    // для каждого элемента создаем и добавляем маркер
    items.forEach((item)=>{
      const content = document.createElement('div');
      content.innerHTML = '<div style="height:20px;width:20px;background-color:red;border:1px solid dotted;border-radius:50%"></div>';
      const marker = new ymaps3.YMapMarker({
        coordinates: item.coords,
        draggable: false
    }, content);
    map.addChild(marker);
    console.log(marker)
    })

    //const clickCallback = () => alert('О, событие!');
    //const mouseMoveCallback = () => console.log('Я двигаю мышью...');
    const stateChangedHandler = (state) => {
      console.log(state.getLayerState(ymaps3.YMapDefaultSchemeLayer.defaultProps.source + ':ground', 'tile'));
    };
    
    //вешаем события
    const mapListener = new ymaps3.YMapListener({
      layer: 'any',
      // Добавление обработчиков на слушатель.
      //onClick: clickCallback,
      //onMouseMove: mouseMoveCallback
      onStateChanged: stateChangedHandler

    });
    map.addChild(mapListener);

    

});