//tabs
function toggleDealers(cityElement) {
  let dealersElement = cityElement.nextElementSibling;
  cityElement.classList.toggle('active');
  dealersElement.classList.toggle('active');
}

console.log('it work')
const input=document.querySelector("#input")
const pointsList=document.querySelector("#itemsList")
const regionsList = document.querySelector("#region-select")
const townsList = document.querySelector("#city-select")

let part='';

/***** Вывод поиска не предусмотрен в новом макете 19-04-24 usp *****/

// input.addEventListener('input',(event)=>{
//    if(event.target.value.length>=3){
//     part=event.target.value;
//     makeNewItems(part)
//    } else {
//     updateList(towns)
//     updateRegions(regions)
//    updateCities(cities)
//    }
// })


//отрисовывает функция
const updateList = (towns, maxItemsToShow = 1) => {
  pointsList.innerHTML = '';
  towns.forEach(town => {
    let townHtml = ''
    let hiddenItemsCount = town.points.length > maxItemsToShow ? town.points.length - maxItemsToShow : 0;
      
    town.points.forEach((elem, index) => {
      let displayStyle = index < maxItemsToShow ? "block" : "none";
      townHtml += `
        <div class="map__dealer-item" onclick='showFilial(${elem.coords})' style="display: ${displayStyle};">
        <a href="#map" style="color:#333;"> 
        <span class="dealer-title">${elem.company}</span> 
        <span class="dealer-adress">${elem.adress}</span><br><br> 
        <img src="./assets/images/icons/tel.png">
        <span class="dealer-adress">${elem.phone}</span> 
        </a>
        </div>
      `;
    });
      
    if (hiddenItemsCount > 0) {
      townHtml += `
        <a href="javascript:void(0)" onclick="showMore(this)" data-hidden="${hiddenItemsCount}" style="color: #15508b; border-bottom:1px dashed #15508b">Показать еще ${hiddenItemsCount}</a>
      `;
    }

    pointsList.innerHTML+=`
        <div class="map__item">
        <div class="map__item_top">
            <p class="map__city" onclick="toggleDealers(this)">${town.city}</p>
            <div class="map__dealers">
                ${townHtml}
            </div>
          </div>
        </div>
        `
  });
}

const showMore = (linkElement) => {
  let parentElement = linkElement.parentElement;
  let hiddenItems = parentElement.querySelectorAll('.map__dealer-item[style*="none"]');
  hiddenItems.forEach(item => item.style.display = "block");
  linkElement.style.display = "none";
}


/***** Список регионов и городов 18-04-24 usp *****/

let uniqueRegions = [...new Set(regions.map(item => item.region))];

let regionCityPairs = uniqueRegions.map(region => {
  return {
    region: region,
    cities: regions.filter(item => item.region === region).map(item => item.city)
  };
});

// выбор региона

const updateRegions = (regionCityPairs) => {
  regionsList.innerHTML = '<option value="">Выберите регион</option>';
  regionCityPairs.forEach(regionCityPair => {
    let regionHtml = `<option value="${regionCityPair.region}">${regionCityPair.region}</option>`;
    regionsList.innerHTML += regionHtml;
  });
}

// выбор города региона

const updateCities = (cities) => {
  townsList.innerHTML = '<option value="">Выберите город</option>';
  cities.forEach(city => {
    let cityHtml = `<option value="${city}">${city}</option>`;
    townsList.innerHTML += cityHtml;
  });
}

// Выбор города в зависимости от выбранного региона

regionsList.addEventListener('change', (event) => {
  const chosenRegion = regionCityPairs.find(regionCityPair => 
    regionCityPair.region === event.target.value);

  if(chosenRegion) updateCities(chosenRegion.cities);
});

 // Инициализация списка регионов
updateRegions(regionCityPairs);
/***** END Список регионов и городов *****/

//первая отрисовка
updateList(towns)
updateCities(cities)


//делаем новый массив после поиска
const makeNewItems=(string)=>{

    //сначала перебираем города
    let newItems=[];
    
    //заполнили городами
    towns.forEach(town=>{
      //если города есть кладем все
      if(
        town.city.toLowerCase().includes(string.toLowerCase())
      ) {
        newItems.push(town)
      
      } else {
        //если города нет
        let objToAdd={city:town.city,points:[]}
        //смотрим есть ли точки которые есть в городе которого нет
        town.points.forEach(point=>{
          if (
            point.company.toLowerCase().includes(string.toLowerCase()) ||
            point.adress.toLowerCase().includes(string.toLowerCase())
          ) {
            objToAdd.points.push(point)
          }
        })
        //если точки есть то добавляем в массив
        if(objToAdd.points.length>0) {
          newItems.push(objToAdd)
        }
      }
    })

  updateList(newItems)


}



