// определяем и передаем значения переменных js->css
const header = document.querySelector('.header');
const headerHeight = header.offsetHeight;
document.documentElement.style.setProperty('--js-header-height', headerHeight + "px");
//console.log("Высота хедера " + headerHeight + " пикселей");


$(document).ready(function () {
  
  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
        titleSrc: function (item) {}
    }
});

  // мобильное меню
  $('.menu-humb').on('click', function () {
    $(this).toggleClass('active');
    $('.menu-mob').toggleClass('active');
    $('.header-bottom .container').toggleClass('menu_active');

  });

  $('.menu-mob__item').on('click', function () {
    $showMenu = $(this).find('.menu-mob__submenu');
    if ($showMenu.is(':visible')) {
      $showMenu.slideUp(700);
    } else {
      $('.menu-mob__submenu').slideUp(700);
      $showMenu.slideDown(700);
    }
  });

  // Слушатель события нажатия на документ
  $(document).click(function (e) {
    // Проверяем, не является ли целевой элемент дочерним элементом элемента .header-nav ul li
    if (!$(e.target).closest('.header-nav ul li').length) {
      // Если не является, то скрываем все подменю
      $('.header-nav__submenu').css('transform', 'scaleY(0)');
    }
  });

  // Слушатель события нажатия на элемент .header-nav ul li
  $('.header-nav ul li').click(function () {
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
//слайдер
var galleryThumbs = new Swiper('.gallery-thumbs', {
  spaceBetween: 8,
  slidesPerView: 4,
  loop: true,
  freeMode: true,
  loopedSlides: 5, //looped slides should be the same
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  breakpoints: {
      // when window width is >= 640px
      991: {
          slidesPerView: 10,
          spaceBetween: 24,
      }
  }
});
var galleryTop = new Swiper('.gallery-top', {
  spaceBetween: 24,
  slidesPerView: 1,
  loop: true,
  loopedSlides: 5, //looped slides should be the same

  navigation: {
      nextEl: '.gallery-thumbs-next',
      prevEl: '.gallery-thumbs-prev',
  },
  thumbs: {
      swiper: galleryThumbs,
  },
  breakpoints: {
      // when window width is >= 640px
      991: {
          slidesPerView: 2,
      }
  }


});
