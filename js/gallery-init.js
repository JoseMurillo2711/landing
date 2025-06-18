// js/gallery-init.js
document.addEventListener('DOMContentLoaded', function() {
  // 1) Generar dinámicamente los elementos de la galería:
  const galleryGrid = document.getElementById('gallery-grid');
  if (galleryGrid) {
    const totalImages = 5;
    // Ajusta la ruta base según tu estructura real:
    const basePath = 'assets/gallery/';
    const filePrefix = 'gallery_';
    const extension = '.jpeg';
    // Opcional: descripciones para el alt/title en el lightbox
    const descriptions = [
      'Diseño de uñas 1',
      'Diseño de uñas 2',
      'Diseño de uñas 3',
      'Diseño de uñas 4',
      'Diseño de uñas 5',
      'Diseño de uñas 6'
    ];
    for (let i = 1; i <= totalImages; i++) {
      const filename = `${filePrefix}${i}${extension}`; // e.g. 'gallery_1.jpeg'
      const imgPath = basePath + filename;
      const largePath = imgPath; // si tuvieras miniatura y versión grande distinta, cámbialo aquí

      // Crear el <a> para Magnific Popup
      const a = document.createElement('a');
      a.href = largePath;
      a.className = 'popup-link group block overflow-hidden rounded-2xl shadow-lg';

      // Crear el <img>
      const img = document.createElement('img');
      img.src = imgPath;
      img.alt = descriptions[i - 1] || `Diseño de uñas ${i}`;
      img.loading = 'lazy';
      // Ajusta la clase h-48 si quieres otra altura; puedes usar h-56, etc.
      img.className = 'w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300';

      a.appendChild(img);
      galleryGrid.appendChild(a);
    }
  } else {
    console.warn('No se encontró el contenedor con id="gallery-grid". Asegúrate de tener <div id="gallery-grid"> en tu HTML.');
  }

  // 2) Inicializar Magnific Popup
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

  // 3) Inicializar Swiper para carrusel (si lo usas en otra sección)
  if (window.Swiper) {
    // Ejemplo de inicialización; asegúrate de tener el HTML de Swiper (.swiper-container, etc.) en tu página
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
