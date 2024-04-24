// определяем и передаем значения переменных js->css
const header = document.querySelector('.header');
const headerHeight = header.offsetHeight;
document.documentElement.style.setProperty('--js-header-height', headerHeight + "px");
//console.log("Высота хедера " + headerHeight + " пикселей");
