// определяем и передаем значения переменных js->css
const header = document.querySelector('.header');
const headerHeight = header.offsetHeight;
document.documentElement.style.setProperty('--js-header-height', headerHeight + "px");
//console.log("Высота хедера " + headerHeight + " пикселей");


$(document).ready(function() {
  // Слушатель события нажатия на документ
  $(document).click(function(e) {
    // Проверяем, не является ли целевой элемент дочерним элементом элемента .header-nav ul li
    if (!$(e.target).closest('.header-nav ul li').length) {
      // Если не является, то скрываем все подменю
      $('.header-nav__submenu').css('transform', 'scaleY(0)');
    }
  });

  // Слушатель события нажатия на элемент .header-nav ul li
  $('.header-nav ul li').click(function() {
    // Сворачиваем все подменю, кроме текущего
    $('.header-nav__submenu').not($(this).find('.header-nav__submenu')).css('transform', 'scaleY(0)');

    // Разворачиваем или сворачиваем текущее подменю
    if ($(this).find('.header-nav__submenu').css('transform') == 'matrix(1, 0, 0, 1, 0, 0)') {
      // Если подменю развернуто, то сворачиваем
      $(this).find('.header-nav__submenu').css('transform', 'scaleY(1)');
    } else {
      // Если подменю свернуто, то разворачиваем
      $(this).find('.header-nav__submenu').css('transform', 'scaleY(1)');
    }
  });
  


  $('.header-nav__submenu-item').on('click', function () {
    var $subRight = $(this).find('.submenu-item__sub-right');
    if ($subRight.hasClass('click')) {
      $subRight.removeClass('click');
    } else {
      $('.submenu-item__sub-right').removeClass('click');
      $subRight.addClass('click');
    }
  });
});
