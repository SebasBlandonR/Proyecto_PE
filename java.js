// // Esperar a que el DOM esté completamente cargado
// document.addEventListener('DOMContentLoaded', function() {
    
//     // ===== Navegación suave al hacer clic en los enlaces del menú =====
//     const menuLinks = document.querySelectorAll('.enlace-menu');
    
//     menuLinks.forEach(link => {
//         link.addEventListener('click', function(e) {
//             e.preventDefault();
            
//             // Obtener el ID de la sección objetivo
//             const targetId = this.getAttribute('href');
//             const targetSection = document.querySelector(targetId);
            
//             // Desplazamiento suave
//             window.scrollTo({
//                 top: targetSection.offsetTop - 80, // Compensación para la cabecera fija
//                 behavior: 'smooth'
//             });
//         });
//     });
    
//     // ===== Efecto de revelación al hacer scroll =====
//     const sections = document.querySelectorAll('section');
    
//     // Función para verificar si un elemento está en la vista
//     function isInViewport(element) {
//         const rect = element.getBoundingClientRect();
//         return (
//             rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
//             rect.bottom >= 0
//         );
//     }
    
//     // Función para añadir la clase de animación
//     function checkSections() {
//         sections.forEach(section => {
//             if (isInViewport(section) && !section.classList.contains('visible')) {
//                 section.classList.add('visible');
//             }
//         });
//     }
    
//     // Comprobar al cargar la página
//     checkSections();
    
//     // Comprobar al hacer scroll
//     window.addEventListener('scroll', checkSections);
    
//     // ===== Validación del formulario de contacto =====
//     const contactForm = document.querySelector('.formulario-contacto');
    
//     if (contactForm) {
//         contactForm.addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             let isValid = true;
//             const errorMessages = [];
            
//             // Validar campos requeridos
//             const requiredFields = contactForm.querySelectorAll('[required]');
//             requiredFields.forEach(field => {
//                 if (!field.value.trim()) {
//                     isValid = false;
//                     field.classList.add('campo-error');
//                     errorMessages.push(`El campo ${field.previousElementSibling.textContent.slice(0, -1)} es obligatorio.`);
//                 } else {
//                     field.classList.remove('campo-error');
//                 }
//             });
            
//             // Validar formato de email
//             const emailField = document.getElementById('email');
//             if (emailField && emailField.value.trim()) {
//                 const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//                 if (!emailPattern.test(emailField.value)) {
//                     isValid = false;
//                     emailField.classList.add('campo-error');
//                     errorMessages.push('El correo electrónico no tiene un formato válido.');
//                 }
//             }
            
//             // Validar formato de teléfono
//             const phoneField = document.getElementById('telefono');
//             if (phoneField && phoneField.value.trim()) {
//                 const phonePattern = /^\+?[0-9]{7,15}$/;
//                 if (!phonePattern.test(phoneField.value.replace(/\s/g, ''))) {
//                     isValid = false;
//                     phoneField.classList.add('campo-error');
//                     errorMessages.push('El número de teléfono no tiene un formato válido.');
//                 }
//             }
            
//             // Mostrar mensajes de error o enviar formulario
//             const formFeedback = document.querySelector('.formulario-feedback') || document.createElement('div');
//             formFeedback.className = 'formulario-feedback';
            
//             if (!isValid) {
//                 formFeedback.innerHTML = `
//                     <div class="alerta alerta-error">
//                         <h4>Por favor corrige los siguientes errores:</h4>
//                         <ul>
//                             ${errorMessages.map(msg => `<li>${msg}</li>`).join('')}
//                         </ul>
//                     </div>
//                 `;
//                 if (!document.querySelector('.formulario-feedback')) {
//                     contactForm.prepend(formFeedback);
//                 }
                
//                 // Scroll hasta el mensaje de error
//                 formFeedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
//             } else {
//                 formFeedback.innerHTML = `
//                     <div class="alerta alerta-exito">
//                         <h4>¡Mensaje enviado correctamente!</h4>
//                         <p>Nos pondremos en contacto contigo pronto.</p>
//                     </div>
//                 `;
//                 if (!document.querySelector('.formulario-feedback')) {
//                     contactForm.prepend(formFeedback);
//                 }
                
//                 // Limpiar el formulario
//                 contactForm.reset();
                
//                 // Desaparece el mensaje después de 5 segundos
//                 setTimeout(() => {
//                     formFeedback.style.opacity = '0';
//                     setTimeout(() => {
//                         formFeedback.remove();
//                     }, 500);
//                 }, 5000);
//             }
//         });
        
//         // Quitar la clase de error al escribir
//         const formInputs = contactForm.querySelectorAll('input, select, textarea');
//         formInputs.forEach(input => {
//             input.addEventListener('input', function() {
//                 this.classList.remove('campo-error');
//             });
//         });
//     }
    
//     // ===== Carrusel de imágenes para productos destacados =====
//     function setupProductCarousel() {
//         const productGallery = document.querySelector('.galeria-productos');
//         if (!productGallery) return;
        
//         const products = Array.from(productGallery.querySelectorAll('.producto-destacado'));
//         if (products.length <= 4) return; // No se necesita carrusel para 4 o menos productos
        
//         // Configuración inicial
//         let currentIndex = 0;
//         const productWidth = products[0].offsetWidth;
//         const visibleProducts = Math.floor(productGallery.offsetWidth / productWidth);
        
//         // Crear controles de navegación
//         const carouselControls = document.createElement('div');
//         carouselControls.className = 'controles-carrusel';
//         carouselControls.innerHTML = `
//             <button class="boton-carrusel boton-anterior" aria-label="Anterior">
//                 <i class="fas fa-chevron-left"></i>
//             </button>
//             <div class="indicadores-carrusel"></div>
//             <button class="boton-carrusel boton-siguiente" aria-label="Siguiente">
//                 <i class="fas fa-chevron-right"></i>
//             </button>
//         `;
        
//         productGallery.parentNode.insertBefore(carouselControls, productGallery.nextSibling);
        
//         // Crear indicadores
//         const indicatorsContainer = carouselControls.querySelector('.indicadores-carrusel');
//         const totalPages = Math.ceil(products.length / visibleProducts);
        
//         for (let i = 0; i < totalPages; i++) {
//             const indicator = document.createElement('button');
//             indicator.className = 'indicador-carrusel';
//             indicator.setAttribute('aria-label', `Página ${i + 1}`);
//             indicator.dataset.page = i;
            
//             if (i === 0) {
//                 indicator.classList.add('activo');
//             }
            
//             indicatorsContainer.appendChild(indicator);
//         }
        
//         // Función para actualizar la visualización del carrusel
//         function updateCarousel() {
//             const translateValue = -currentIndex * visibleProducts * (productWidth + 20); // 20px es el espacio entre productos
//             productGallery.style.transform = `translateX(${translateValue}px)`;
            
//             // Actualizar indicadores
//             const indicators = indicatorsContainer.querySelectorAll('.indicador-carrusel');
//             indicators.forEach((ind, i) => {
//                 ind.classList.toggle('activo', i === currentIndex);
//             });
            
//             // Habilitar/deshabilitar botones
//             const prevButton = carouselControls.querySelector('.boton-anterior');
//             const nextButton = carouselControls.querySelector('.boton-siguiente');
            
//             prevButton.disabled = currentIndex === 0;
//             nextButton.disabled = currentIndex === totalPages - 1;
//         }
        
//         // Eventos para los controles
//         carouselControls.querySelector('.boton-anterior').addEventListener('click', () => {
//             if (currentIndex > 0) {
//                 currentIndex--;
//                 updateCarousel();
//             }
//         });
        
//         carouselControls.querySelector('.boton-siguiente').addEventListener('click', () => {
//             if (currentIndex < totalPages - 1) {
//                 currentIndex++;
//                 updateCarousel();
//             }
//         });
        
//         // Eventos para los indicadores
//         indicatorsContainer.addEventListener('click', (e) => {
//             if (e.target.classList.contains('indicador-carrusel')) {
//                 currentIndex = parseInt(e.target.dataset.page);
//                 updateCarousel();
//             }
//         });
        
//         // Configurar estilo para el contenedor de productos
//         productGallery.style.display = 'flex';
//         productGallery.style.transition = 'transform 0.5s ease';
//         productGallery.style.width = `${products.length * (productWidth + 20)}px`;
        
//         // Configuración inicial
//         updateCarousel();
        
//         // Actualizar al cambiar el tamaño de la ventana
//         window.addEventListener('resize', () => {
//             const newVisibleProducts = Math.floor(productGallery.parentNode.offsetWidth / productWidth);
//             if (newVisibleProducts !== visibleProducts) {
//                 // Reiniciar carrusel si cambia el número de productos visibles
//                 window.location.reload();
//             }
//         });
//     }
    
//     // Iniciar carrusel de productos
//     setupProductCarousel();
    
//     // ===== Efecto parallax para la sección de inicio =====
//     const bannerSection = document.querySelector('.seccion-inicio');
    
//     if (bannerSection) {
//         window.addEventListener('scroll', () => {
//             const scrollPosition = window.pageYOffset;
//             bannerSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
//         });
//     }
    
//     // ===== Modo oscuro/claro =====
//     function setupThemeToggle() {
//         // Crear el botón de cambio de tema
//         const themeToggle = document.createElement('button');
//         themeToggle.className = 'toggle-tema';
//         themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
//         themeToggle.setAttribute('aria-label', 'Cambiar tema');
//         themeToggle.setAttribute('title', 'Cambiar tema');
        
//         document.body.appendChild(themeToggle);
        
//         // Verificar preferencia guardada
//         const darkModePreferred = localStorage.getItem('darkMode') === 'true';
        
//         if (darkModePreferred) {
//             document.body.classList.add('tema-oscuro');
//             themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
//         }
        
//         // Escuchar clics en el botón
//         themeToggle.addEventListener('click', () => {
//             document.body.classList.toggle('tema-oscuro');
//             const isDarkMode = document.body.classList.contains('tema-oscuro');
            
//             // Guardar preferencia
//             localStorage.setItem('darkMode', isDarkMode);
            
//             // Cambiar icono
//             themeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
//         });
//     }
    
//     // Iniciar toggle de tema
//     setupThemeToggle();
    
//     // ===== Animación de contador para totales =====
//     function setupCounters() {
//         const totalUsers = document.querySelectorAll('.tabla-productos td:nth-child(5)');
        
//         if (!totalUsers.length) return;
        
//         const options = {
//             root: null,
//             rootMargin: '0px',
//             threshold: 0.5
//         };
        
//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
//                     entry.target.classList.add('counted');
                    
//                     const finalValue = entry.target.textContent;
//                     let startValue = 0;
                    
//                     if (finalValue.includes('stock')) {
//                         // No animar textos como "En stock"
//                         return;
//                     }
                    
//                     // Para valores numéricos
//                     const duration = 2000; // 2 segundos
//                     const counter = setInterval(() => {
//                         startValue += 1;
//                         entry.target.textContent = startValue;
                        
//                         if (startValue >= parseInt(finalValue.replace(/[^\d]/g, ''))) {
//                             entry.target.textContent = finalValue;
//                             clearInterval(counter);
//                         }
//                     }, duration / parseInt(finalValue.replace(/[^\d]/g, '')));
//                 }
//             });
//         }, options);
        
//         totalUsers.forEach(item => {
//             observer.observe(item);
//         });
//     }
    
//     // Iniciar contadores animados
//     setupCounters();
    
//     // ===== Notificación de cookies =====
//     function setupCookiesNotice() {
//         // Verificar si ya se aceptaron las cookies
//         if (localStorage.getItem('cookiesAccepted')) {
//             return;
//         }
        
//         // Crear el aviso de cookies
//         const cookieNotice = document.createElement('div');
//         cookieNotice.className = 'aviso-cookies';
//         cookieNotice.innerHTML = `
//             <div class="contenido-cookies">
//                 <h3>Aviso de Cookies</h3>
//                 <p>Utilizamos cookies para mejorar tu experiencia en nuestra web. Al continuar navegando, aceptas nuestra <a href="#">política de cookies</a>.</p>
//                 <div class="botones-cookies">
//                     <button class="boton-aceptar-cookies">Aceptar</button>
//                     <button class="boton-rechazar-cookies">Rechazar</button>
//                 </div>
//             </div>
//         `;
        
//         document.body.appendChild(cookieNotice);
        
//         // Mostrar el aviso con una animación
//         setTimeout(() => {
//             cookieNotice.classList.add('visible');
//         }, 1000);
        
//         // Eventos para los botones
//         cookieNotice.querySelector('.boton-aceptar-cookies').addEventListener('click', () => {
//             localStorage.setItem('cookiesAccepted', 'true');
//             cookieNotice.classList.remove('visible');
//             setTimeout(() => {
//                 cookieNotice.remove();
//             }, 500);
//         });
        
//         cookieNotice.querySelector('.boton-rechazar-cookies').addEventListener('click', () => {
//             cookieNotice.classList.remove('visible');
//             setTimeout(() => {
//                 cookieNotice.remove();
//             }, 500);
//         });
//     }
    
//     // Iniciar aviso de cookies
//     setupCookiesNotice();
// });