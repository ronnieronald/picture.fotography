// Configuración de la galería
const galleryConfig = {
    images: [
        { src: 'assets/2.jpeg', alt: 'Fotografía 2' },
        { src: 'assets/4.jpeg', alt: 'Fotografía 4' },
        { src: 'assets/5.jpeg', alt: 'Fotografía 5' },
        { src: 'assets/7.jpeg', alt: 'Fotografía 7' },
        { src: 'assets/8.jpeg', alt: 'Fotografía 8' },
        { src: 'assets/9.jpeg', alt: 'Fotografía 9' },
        { src: 'assets/10.jpeg', alt: 'Fotografía 10' },
        { src: 'assets/11.jpeg', alt: 'Fotografía 11' },
        { src: 'assets/12.jpeg', alt: 'Fotografía 12' },
        { src: 'assets/ver.jpg', alt: 'Fotografía 13' },
        { src: 'assets/20240108_055800-01.jpeg', alt: 'Fotografía 20240108' },
        { src: 'assets/20240314_172343-01.jpeg', alt: 'Fotografía 20240314' },
        { src: 'assets/IMG_20240504_115006_HDR-01.jpeg', alt: 'Fotografía HDR' }
    ]
};

// Variables globales
let currentFilter = 'all';
let currentImageIndex = 0;
let filteredImages = [];

// Variables del slider
let currentSlide = 0;
let slideInterval;
let sliderImages = [];

// Elementos del DOM
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const closeBtn = document.querySelector('.close');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const filterBtns = document.querySelectorAll('.filter-btn');

// Elementos del slider
const sliderTrack = document.getElementById('slider-track');
const sliderDots = document.getElementById('slider-dots');
const prevSliderBtn = document.getElementById('prev-slider');
const nextSliderBtn = document.getElementById('next-slider');

// Función para detectar la orientación de una imagen
function detectImageOrientation(img) {
    return new Promise((resolve) => {
        const tempImg = new Image();
        tempImg.onload = function() {
            const orientation = this.width > this.height ? 'horizontal' : 'vertical';
            resolve(orientation);
        };
        tempImg.src = img.src;
    });
}

// Función para crear un elemento de galería
function createGalleryItem(imageData, orientation) {
    const item = document.createElement('div');
    item.className = `gallery-item ${orientation}`;
    item.dataset.orientation = orientation;
    
    const img = document.createElement('img');
    img.src = imageData.src;
    img.alt = imageData.alt;
    img.loading = 'lazy';
    
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <h3>${imageData.alt}</h3>
        <p>${orientation === 'vertical' ? 'Fotografía Vertical' : 'Fotografía Horizontal'}</p>
    `;
    
    item.appendChild(img);
    item.appendChild(overlay);
    
    // Evento para abrir el modal
    item.addEventListener('click', () => {
        openModal(imageData.src, imageData.alt);
    });
    
    return item;
}

// Función para cargar la galería
async function loadGallery() {
    gallery.innerHTML = '';
    
    // Crear un array de promesas para cargar todas las imágenes
    const imagePromises = galleryConfig.images.map((imageData, index) => {
        return new Promise((resolve) => {
            const img = new Image();
            
            img.onload = function() {
                const orientation = this.width > this.height ? 'horizontal' : 'vertical';
                const item = createGalleryItem(imageData, orientation);
                
                // Aplicar filtro actual si es necesario
                if (currentFilter !== 'all') {
                    if (currentFilter !== orientation) {
                        item.style.display = 'none';
                    }
                }
                
                resolve({ item, index });
            };
            
            img.onerror = function() {
                console.warn(`No se pudo cargar la imagen: ${imageData.src}`);
                resolve(null);
            };
            
            img.src = imageData.src;
        });
    });
    
    // Esperar a que todas las imágenes se carguen
    const results = await Promise.all(imagePromises);
    
    // Agregar las imágenes a la galería en orden
    results.forEach(result => {
        if (result && result.item) {
            gallery.appendChild(result.item);
        }
    });
}

// Función para filtrar imágenes
function filterImages(filter) {
    currentFilter = filter;
    const items = gallery.querySelectorAll('.gallery-item');
    
    items.forEach(item => {
        if (filter === 'all' || item.dataset.orientation === filter) {
            item.style.display = 'block';
            item.style.opacity = '1';
        } else {
            item.style.display = 'none';
            item.style.opacity = '0';
        }
    });
    
    // Actualizar botones activos
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });
    
    // Reorganizar el layout después del filtrado
    setTimeout(() => {
        // Forzar un reflow para que el layout se reorganice
        gallery.style.display = 'none';
        gallery.offsetHeight; // Trigger reflow
        gallery.style.display = 'block';
    }, 300);
}

// Función para abrir el modal
function openModal(src, alt) {
    modalImage.src = src;
    modalImage.alt = alt;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Encontrar el índice de la imagen actual
    const visibleItems = Array.from(gallery.querySelectorAll('.gallery-item'))
        .filter(item => item.style.display !== 'none');
    const clickedItem = Array.from(visibleItems)
        .find(item => item.querySelector('img').src === src);
    currentImageIndex = visibleItems.indexOf(clickedItem);
    
    updateNavigationButtons();
}

// Función para cerrar el modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Función para navegar entre imágenes
function navigateImage(direction) {
    const visibleItems = Array.from(gallery.querySelectorAll('.gallery-item'))
        .filter(item => item.style.display !== 'none');
    
    if (direction === 'next') {
        currentImageIndex = (currentImageIndex + 1) % visibleItems.length;
    } else {
        currentImageIndex = currentImageIndex === 0 ? visibleItems.length - 1 : currentImageIndex - 1;
    }
    
    const targetItem = visibleItems[currentImageIndex];
    const targetImg = targetItem.querySelector('img');
    
    modalImage.src = targetImg.src;
    modalImage.alt = targetImg.alt;
    
    updateNavigationButtons();
}

// Función para actualizar botones de navegación
function updateNavigationButtons() {
    const visibleItems = Array.from(gallery.querySelectorAll('.gallery-item'))
        .filter(item => item.style.display !== 'none');
    
    prevBtn.style.display = visibleItems.length > 1 ? 'block' : 'none';
    nextBtn.style.display = visibleItems.length > 1 ? 'block' : 'none';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadGallery();
    initSlider();
    
    // Event listeners para filtros
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterImages(btn.dataset.filter);
        });
    });
    
    // Event listeners para el modal
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', () => navigateImage('prev'));
    nextBtn.addEventListener('click', () => navigateImage('next'));
    
    // Event listeners para el slider
    prevSliderBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });
    
    nextSliderBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });
    
    // Pausar auto-slide al hacer hover
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', stopAutoSlide);
    heroSlider.addEventListener('mouseleave', startAutoSlide);
    
    // Cerrar modal con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Navegación con flechas
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                navigateImage('prev');
            } else if (e.key === 'ArrowRight') {
                navigateImage('next');
            }
        }
    });
    
    // Cerrar modal al hacer clic fuera de la imagen
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});

// Funciones del slider
function initSlider() {
    // Seleccionar solo las mejores 3 imágenes para el slider (destacadas)
    const featuredImages = [
        galleryConfig.images[0],  // Primera imagen
        galleryConfig.images[4],  // Quinta imagen
        galleryConfig.images[8]   // Novena imagen
    ];
    sliderImages = featuredImages;
    
    // Crear slides
    sliderImages.forEach((imageData, index) => {
        const slide = document.createElement('div');
        slide.className = 'slider-slide';
        slide.dataset.index = index;
        
        const img = document.createElement('img');
        img.src = imageData.src;
        img.alt = imageData.alt;
        
        const content = document.createElement('div');
        content.className = 'slider-content';
        content.innerHTML = `
            <h3>${imageData.alt}</h3>
            <p>Fotografía Destacada ${index + 1} de ${sliderImages.length}</p>
        `;
        
        slide.appendChild(img);
        slide.appendChild(content);
        sliderTrack.appendChild(slide);
        
        // Crear punto indicador
        const dot = document.createElement('div');
        dot.className = 'slider-dot';
        dot.dataset.index = index;
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });
    
    // Mostrar el primer slide
    updateSlider();
    startAutoSlide();
}

function updateSlider() {
    // Actualizar posición del track
    sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Actualizar puntos activos
    const dots = sliderDots.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    // Actualizar slides activos
    const slides = sliderTrack.querySelectorAll('.slider-slide');
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % sliderImages.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = currentSlide === 0 ? sliderImages.length - 1 : currentSlide - 1;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
    resetAutoSlide();
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 4000); // Cambiar cada 4 segundos
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// Función para precargar imágenes (opcional, para mejor rendimiento)
function preloadImages() {
    galleryConfig.images.forEach(imageData => {
        const img = new Image();
        img.src = imageData.src;
    });
}

// Precargar imágenes cuando la página esté lista
window.addEventListener('load', preloadImages);
