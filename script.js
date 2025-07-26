// Configuración de la galería
const galleryConfig = {
    images: [
        { 
            src: 'assets/1.jpeg', 
            alt: 'Fotografía 1',
            originalSrc: '/Originales/1.jpeg' // URL de imagen original
        },
        { 
            src: 'assets/2.jpeg', 
            alt: 'Fotografía 2',
            originalSrc: '/Originales/2.jpeg'
        },
        { 
            src: 'assets/3.jpeg', 
            alt: 'Fotografía 3',
            originalSrc: '/Originales/3.jpeg'
        },
        { 
            src: 'assets/4.jpeg', 
            alt: 'Fotografía 4',
            originalSrc: '/Originales/4.jpeg'
        },
        {   
            src: 'assets/5.jpeg', 
            alt: 'Fotografía 5',
            originalSrc: '/Originales/5.jpeg'
        },
        { 
            src: 'assets/6.jpeg', 
            alt: 'Fotografía 6',
            originalSrc: '/Originales/6.jpeg'
        },
        { 
            src: 'assets/7.jpeg', 
            alt: 'Fotografía 7',
            originalSrc: '/Originales/7.jpeg'
        },
        { 
            src: 'assets/8.jpeg', 
            alt: 'Fotografía 8',
            originalSrc: '/Originales/8.jpeg'
        },
        { 
            src: 'assets/9.jpeg', 
            alt: 'Fotografía 9',
            originalSrc: '/Originales/9.jpeg'
        },
        { 
            src: 'assets/10.jpeg', 
            alt: 'Fotografía 10',
            originalSrc: '/Originales/10.jpeg'
        },
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
const downloadBtn = document.getElementById('download-btn');
const downloadContainer = document.getElementById('download-container');
const downloadOptions = document.getElementById('download-options');
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
    item.className = `gallery-item ${orientation} loading`;
    item.dataset.orientation = orientation;
    
    // Crear preloader
    const loader = document.createElement('div');
    loader.className = 'image-loader';
    loader.innerHTML = `
        <div class="spinner"></div>
        <span>Cargando...</span>
    `;
    
    const img = document.createElement('img');
    img.src = imageData.src;
    img.alt = imageData.alt;
    img.loading = 'lazy';
    
    // Evento para cuando la imagen se carga
    img.onload = function() {
        item.classList.remove('loading');
        loader.style.display = 'none';
        img.style.opacity = '1';
    };
    
    // Evento para error de carga
    img.onerror = function() {
        item.classList.remove('loading');
        loader.innerHTML = `
            <i class="fas fa-exclamation-triangle" style="font-size: 24px; margin-bottom: 8px;"></i>
            <span>Error al cargar</span>
        `;
        loader.style.color = '#ff6b6b';
    };
    
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <h3>${imageData.alt}</h3>
        <p>${orientation === 'vertical' ? 'Fotografía Vertical' : 'Fotografía Horizontal'}</p>
    `;
    
    item.appendChild(loader);
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
    
    // Crear elementos de galería inmediatamente con preloaders
    const galleryItems = galleryConfig.images.map((imageData, index) => {
        // Crear un elemento temporal para detectar orientación
        const tempImg = new Image();
        tempImg.src = imageData.src;
        
        return new Promise((resolve) => {
            tempImg.onload = function() {
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
            
            tempImg.onerror = function() {
                console.warn(`No se pudo cargar la imagen: ${imageData.src}`);
                // Crear elemento con error
                const item = createGalleryItem(imageData, 'horizontal');
                resolve({ item, index });
            };
        });
    });
    
    // Agregar elementos a la galería inmediatamente
    const results = await Promise.all(galleryItems);
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
    
    // Cerrar menú de descarga si está abierto
    closeDownloadMenu();
    
    // Encontrar el índice de la imagen actual
    const visibleItems = Array.from(gallery.querySelectorAll('.gallery-item'))
        .filter(item => item.style.display !== 'none');
    const clickedItem = Array.from(visibleItems)
        .find(item => item.querySelector('img').src === src);
    currentImageIndex = visibleItems.indexOf(clickedItem);
    
    updateNavigationButtons();
}

// Función para alternar el menú de descarga
function toggleDownloadMenu() {
    downloadContainer.classList.toggle('active');
}

// Función para cerrar el menú de descarga
function closeDownloadMenu() {
    downloadContainer.classList.remove('active');
}

// Función para obtener la imagen original
function getOriginalImageSrc(currentSrc) {
    const imageData = galleryConfig.images.find(img => img.src === currentSrc);
    return imageData ? imageData.originalSrc : currentSrc;
}

// Función para descargar imagen
function downloadImage(src, alt, quality = 'original') {
    // Cerrar el menú de descarga
    closeDownloadMenu();
    
    // Mostrar mensaje de descarga
    const downloadBtn = document.getElementById('download-btn');
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Descargando...';
    downloadBtn.disabled = true;
    
    const link = document.createElement('a');
    link.download = alt.replace(/\s+/g, '_') + '.jpg';
    link.target = '_blank';
    
    if (quality === 'standard') {
        // Descarga estándar (directa de la imagen actual)
        link.href = src;
        link.click();
        // Restaurar el botón después de un breve delay
        setTimeout(() => {
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        }, 500);
    } else {
        // Descarga original (usando URL original o imagen en alta calidad)
        const originalSrc = getOriginalImageSrc(src);
        
        // Si la URL original es diferente, usar descarga directa
        if (originalSrc !== src) {
            link.href = originalSrc;
            link.click();
            setTimeout(() => {
                downloadBtn.innerHTML = originalText;
                downloadBtn.disabled = false;
            }, 500);
        } else {
            // Si no hay URL original, usar canvas para alta calidad
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                
                ctx.drawImage(img, 0, 0);
                
                canvas.toBlob(function(blob) {
                    const url = URL.createObjectURL(blob);
                    link.href = url;
                    link.click();
                    
                    // Limpiar el URL después de la descarga
                    setTimeout(() => {
                        URL.revokeObjectURL(url);
                        // Restaurar el botón
                        downloadBtn.innerHTML = originalText;
                        downloadBtn.disabled = false;
                    }, 100);
                }, 'image/jpeg', 0.95);
            };
            
            img.onerror = function() {
                // Si hay error con CORS, intentar descarga directa
                link.href = src;
                link.click();
                // Restaurar el botón
                downloadBtn.innerHTML = originalText;
                downloadBtn.disabled = false;
            };
            
            img.src = src;
        }
    }
}

// Función para cerrar el modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    closeDownloadMenu();
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
    
    // Cerrar menú de descarga al navegar
    closeDownloadMenu();
    
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
    
    // Event listeners para el menú de descarga
    downloadBtn.addEventListener('click', toggleDownloadMenu);
    
    // Event listeners para las opciones de descarga
    document.querySelectorAll('.download-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const quality = option.dataset.quality;
            downloadImage(modalImage.src, modalImage.alt, quality);
        });
    });
    
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
    
    // Cerrar menú de descarga al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!downloadContainer.contains(e.target)) {
            closeDownloadMenu();
        }
    });
});

// Funciones del slider
function initSlider() {
    // Seleccionar solo las mejores 3 imágenes para el slider (destacadas)
    const featuredImages = [
        galleryConfig.images[1],  // Primera imagen
        galleryConfig.images[3],  // Quinta imagen
        galleryConfig.images[5]   // Novena imagen
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
