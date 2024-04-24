
document.addEventListener("DOMContentLoaded", function () {
  (function () {
    var range1 = document.getElementById('range1');
    if (!range1) return;
    var slider1 = range1.querySelector('.range__slider');
    var val1 = range1.querySelector('.range__val');
    var foodCup = document.querySelector('#food-cup');
    var data1 = slider1.dataset;
    var min1 = data1['min'] || 1;
    var max1 = data1['max'] || 10; // eslint-disable-next-line no-undef
    
    noUiSlider.create(slider1, {
      step: data1['step'] || 1,
      start: 1,
      range: {
        'min': min1,
        'max': max1
      }
    });
    var vals1 = "";
    
    for (var i = min1; i <= max1; i++) {
      vals1 += "<span>".concat(i, "</span>");
    }
    
    val1.innerHTML = vals1;
    var val1btns = val1.querySelectorAll('span');
    val1btns.forEach(function (item, index) {
      item.addEventListener('click', function () {
        slider1.noUiSlider.set(index + 1);
      });
    });
    slider1.noUiSlider.on('update', function (values) {
      var idx = parseInt(values[0]);
      var proc = 100 - idx * 9;
      foodCup.style.transform = "translateY(".concat(proc - 10, "%)");
      var current = val1.querySelector('span.is-current');
      
      if (current) {
        current.classList.remove('is-current');
      }
      
      val1btns[idx - 1].classList.add('is-current');
    });
  })();
  
  (function () {
    var tabs = document.querySelectorAll(".js-feeding-tab");
    tabs.forEach(function (tab) {
      if (tabs.length < 2) {
        tab.classList.add("hidden");
      }
      
      var box = document.querySelector(".js-feeding-tab-child#" + tab.dataset.tab);
      
      if (box) {
        var parentRangeBox = box.querySelector(".js-range-parent");
        var childRangeBox = box.querySelector(".js-range-child");
        var cupWeight = box.querySelector(".js-feeding-cup");
        var json = JSON.parse(tab.dataset.options);
        
        if (json) {
          var parentKeys = Object.keys(json);
          var parentSlider;
          
          if (parentKeys.length > 1) {
            parentSlider = initSlider(parentRangeBox, parentKeys);
          } else {
            parentRangeBox.parentNode.classList.add("hidden");
          }
          
          var childKeys = Object.keys(json[parentKeys[0]]);
          var childSlider = initSlider(childRangeBox, childKeys);
          setShadowWidth(childRangeBox, json[parentKeys[0]]);
          
          if (parentSlider) {
            setShadowWidth(parentRangeBox, {}, true);
            parentSlider.noUiSlider.on("update", function () {
              var parent = json[parentKeys[parentSlider.dataset.start - 1]];
              var childKeys = Object.keys(parent);
              childSlider = initSlider(childRangeBox, childKeys);
              setShadowWidth(childRangeBox, parent);
              childSlider.noUiSlider.on("update", function () {
                setFeedWeight(childSlider, cupWeight, parentKeys[parentSlider.dataset.start - 1], childKeys[childSlider.dataset.start - 1], json);
                checkShadowChank(childRangeBox, json[parentKeys[parentSlider.dataset.start - 1]][childKeys[childSlider.dataset.start - 1]].shadow);
              });
            });
            childSlider.noUiSlider.on("update", function () {
              setFeedWeight(childSlider, cupWeight, parentKeys[parentSlider.dataset.start - 1], childKeys[childSlider.dataset.start - 1], json);
              checkShadowChank(childRangeBox, json[parentKeys[parentSlider.dataset.start - 1]][childKeys[childSlider.dataset.start - 1]].shadow);
            });
          } else {
            childSlider.noUiSlider.on("update", function () {
              setFeedWeight(childSlider, cupWeight, parentKeys[0], childKeys[childSlider.dataset.start - 1], json);
            });
          }
        }
      }
    });
    
    function initSlider(sliderBox, keys) {
      var min = 1;
      var max = keys.length;
      var slider = sliderBox.querySelector(".range__slider");
      var sliderSignature = sliderBox.querySelector(".range__val");
      var start = parseInt(slider.dataset.start || 1);
      var step = parseInt(slider.dataset.step || 1);
      
      if (start > max) {
        start = max;
      }
      
      if (slider.noUiSlider) {
        slider.noUiSlider.destroy();
      } // eslint-disable-next-line no-undef
      
      
      noUiSlider.create(slider, {
        step: step,
        start: start,
        range: {
          min: min,
          max: max
        }
      });
      var signatures = "";
      
      for (var i = 0; i < max; i++) {
        signatures += "<span>".concat(keys[i], "</span>");
      }
      
      sliderSignature.innerHTML = signatures;
      var sliderSignatureBtns = sliderSignature.querySelectorAll("span");
      sliderSignatureBtns.forEach(function (item, index) {
        item.addEventListener("click", function () {
          slider.noUiSlider.set(index + 1);
        });
      });
      slider.noUiSlider.on("update", function (values) {
        var idx = parseInt(values[0]);
        var current = sliderSignature.querySelector("span.is-current");
        
        if (current) {
          current.classList.remove("is-current");
        }
        
        slider.dataset.start = idx;
        sliderSignatureBtns[idx - 1].classList.add("is-current");
      });
      var shadow = document.createElement("div");
      var shadowParent = document.querySelector(".range-wrap--feeding");
      shadow.classList.add("range__shadow");
      
      for (var key in keys) {
        var element = document.createElement("div");
        element.classList.add("range__element");
        element.dataset.id = keys[key];
        element.style.width = shadowParent.offsetWidth / keys.length + "px";
        shadow.appendChild(element);
      }
      
      slider.insertBefore(shadow, slider.firstChild);
      return slider;
    }
    
    function setFeedWeight(slider, cupWeight, age, step, json) {
      var cupIcon = cupWeight.querySelector(".js-feeding-cup__icon");
      var cupLabel = cupWeight.querySelector(".js-feeding-cup__label");
      var cupSvg = cupWeight.querySelector('.range-col__cup')
      var proc = 100;
      
      if (json[age][step].shadow) {
        var text = document.createElement("div"); // eslint-disable-next-line no-undef
        
        let matches = json[age][step].value.match(/^Рекомендуется /gi) || [];
        
        if (matches.length) {
          cupSvg.style.display = "none";
          text.innerHTML = lang_val.FEEDING_TEXT_TEMPLATE;
          text.querySelector("span").innerHTML = json[age][step].value;
          cupLabel.innerHTML = text.innerHTML;
        }else{
          cupSvg.style.display = "block";
          text.innerHTML = lang_val.FEEDING_TEXT_TEMPLATE;
          text.querySelector("span").innerHTML = json[age][step].value;
          cupLabel.innerHTML = text.innerHTML;
        }
        
      } else {
        cupSvg.style.display = "block";
        var _text = document.createElement("div"); // eslint-disable-next-line no-undef
        
        _text.innerHTML = lang_val.FEEDING_WEIGHT_TEMPLATE;
        _text.querySelector("span").innerHTML = json[age][step].value;
        cupLabel.innerHTML = _text.innerHTML;
        var keys = Object.keys(json[age]);
        var index = keys.indexOf(step) + 1; //нормирование ряда для значений от 20 до 100% translateY
        
        proc = 0.2 + (index - 1) * (1 - 0.2) / (keys.length - 1);
        proc = 100 - proc * 100;
      }
      
      cupIcon.style.transform = "translateY(".concat(proc, "%)");
    }
    
    
    // function setFeedWeight(slider, cupWeight, age, step, json) {
    //   var cupIcon = cupWeight.querySelector(".js-feeding-cup__icon");
    //   var cupLabel = cupWeight.querySelector(".js-feeding-cup__label");
    //   var proc = 100;
    //  
    //   if (json[age][step].shadow) {
    //     var text = document.createElement("div"); // eslint-disable-next-line no-undef
    //    
    //     text.innerHTML = lang_val.FEEDING_TEXT_TEMPLATE;
    //     text.querySelector("span").innerHTML = json[age][step].value;
    //     cupLabel.innerHTML = text.innerHTML;
    //   } else {
    //     var _text = document.createElement("div"); // eslint-disable-next-line no-undef
    //    
    //    
    //     _text.innerHTML = lang_val.FEEDING_WEIGHT_TEMPLATE;
    //     _text.querySelector("span").innerHTML = json[age][step].value;
    //     cupLabel.innerHTML = _text.innerHTML;
    //     var keys = Object.keys(json[age]);
    //     var index = keys.indexOf(step) + 1; //нормирование ряда для значений от 20 до 100% translateY
    //    
    //     proc = 0.2 + (index - 1) * (1 - 0.2) / (keys.length - 1);
    //     proc = 100 - proc * 100;
    //   }
    //  
    //   cupIcon.style.transform = "translateY(".concat(proc, "%)");
    // }
    
    function checkShadowChank(sliderBox) {
      var shadow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var dragHandle = sliderBox.querySelector(".noUi-handle");
      var current = sliderBox.querySelector(".range__val span.is-current");
      
      if (shadow) {
        dragHandle.classList.add("shadow");
        current.classList.add("shadow");
      } else {
        dragHandle.classList.remove("shadow");
        current.classList.remove("shadow");
      }
    }
    
    function setShadowWidth(sliderBox, values) {
      var forceActive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var shadowsValues = [];
      
      for (var item in values) {
        if (values[item].shadow === false) {
          shadowsValues.push(item);
        }
      }
      
      var firstElement = [].concat(shadowsValues).shift();
      var elements = sliderBox.querySelectorAll(".range__element");
      elements.forEach(function (elem) {
        var id = elem.dataset.id;
        
        if (forceActive || shadowsValues.includes(id)) {
          elem.classList.add("active");
        } else {
          elem.classList.remove("active");
        }
        
        if (id == firstElement) {
          elem.classList.add("first-elem-border");
        } else {
          elem.classList.remove("first-elem-border");
        }
        
        if (id == shadowsValues[shadowsValues.length - 1]) {
          elem.classList.add("last-elem-border");
        } else {
          elem.classList.remove("last-elem-border");
        }
      });
    }
    
    window.addEventListener("resize", function () {
      var elements = document.querySelectorAll(".range__element");
      elements.forEach(function (elem) {
        var parent = elem.parentNode;
        elem.style.width = parent.offsetWidth / parent.childElementCount;
      });
    });
  })();
  
});
