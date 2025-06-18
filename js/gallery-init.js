// js/gallery-init.js
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar Magnific Popup
  if (window.jQuery) {
    jQuery(document).ready(function($) {
      $('.popup-link').magnificPopup({
        type: 'image',
        gallery: {
          enabled: true
        },
        image: {
          titleSrc: function(item) {
            return item.el.find('img').attr('alt');
          }
        }
      });
    });
  } else {
    console.warn('jQuery no está cargado; Magnific Popup no se inicializará.');
  }

  // Si también usas Swiper para carrusel:
  if (window.Swiper) {
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  } else {
    console.warn('Swiper no está cargado; el carrusel no se inicializará.');
  }
});
