* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.header {
    text-align: center;
    margin-bottom: 40px;
    color: white;
}

.header h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.header p {
    font-size: 1.1rem;
    opacity: 0.9;
}

/* Hero Slider Styles */
.hero-slider {
    margin: 40px 0;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 15px 35px rgba(0,0,0,0.3);
}

.slider-container {
    position: relative;
    width: 100%;
    height: 400px;
    overflow: hidden;
}

.slider-track {
    display: flex;
    transition: transform 0.5s ease-in-out;
    height: 100%;
}

.slider-slide {
    min-width: 100%;
    position: relative;
    overflow: hidden;
}

.slider-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.slider-slide:hover img {
    transform: scale(1.05);
}

.slider-slide::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7));
    z-index: 1;
}

.slider-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 30px;
    color: white;
    z-index: 2;
}

.slider-content h3 {
    font-size: 1.8rem;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.slider-content p {
    font-size: 1.1rem;
    opacity: 0.9;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
}

.slider-controls {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 20px;
    z-index: 3;
}

.slider-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.slider-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
}

.slider-dots {
    display: flex;
    gap: 8px;
}

.slider-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    transition: all 0.3s ease;
}

.slider-dot.active {
    background: white;
    transform: scale(1.2);
}

.slider-dot:hover {
    background: rgba(255, 255, 255, 0.8);
}

/* Animación de fade para las transiciones */
@keyframes slideFade {
    from {
        opacity: 0;
        transform: scale(1.1);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.slider-slide.active {
    animation: slideFade 0.5s ease forwards;
}

.gallery-controls {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-bottom: 30px;
    flex-wrap: wrap;
}

.filter-btn {
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 12px 24px;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
    backdrop-filter: blur(10px);
}

.filter-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.filter-btn.active {
    background: rgba(255, 255, 255, 0.4);
    border-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.gallery {
    columns: 4;
    column-gap: 20px;
    padding: 20px 0;
}

@media (max-width: 1200px) {
    .gallery {
        columns: 3;
    }
}

@media (max-width: 900px) {
    .gallery {
        columns: 2;
        column-gap: 15px;
    }
}

@media (max-width: 600px) {
    .gallery {
        columns: 1;
        column-gap: 10px;
    }
}

.gallery-item {
    position: relative;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    transition: all 0.3s ease;
    cursor: pointer;
    background: white;
    break-inside: avoid;
    margin-bottom: 20px;
    display: block;
}

.gallery-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.25);
}

.gallery-item img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease;
}

.gallery-item:hover img {
    transform: scale(1.02);
}

/* Estilos específicos para diferentes orientaciones */

/* Preloader individual para cada imagen */
.image-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    color: white;
    font-size: 0.9rem;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.gallery-item.loading {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.gallery-item.loading img {
    opacity: 0;
}

.gallery-item img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease, opacity 0.3s ease;
}

/* Contenedor de descarga en el modal */
.download-container {
    position: absolute;
    top: 20px;
    left: 30px;
    z-index: 1001;
}

/* Botón de descarga en el modal */
.download-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    padding: 12px 20px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    gap: 8px;
}

.download-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.download-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

.download-btn:disabled:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: none;
    box-shadow: none;
}

.download-btn i {
    font-size: 14px;
}

#download-arrow {
    transition: transform 0.3s ease;
}

.download-container.active #download-arrow {
    transform: rotate(180deg);
}

/* Opciones de descarga */
.download-options {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 8px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 15px;
    padding: 8px;
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    min-width: 150px;
}

.download-container.active .download-options {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.download-option {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 12px 16px;
    border: none;
    background: transparent;
    color: #333;
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.3s ease;
    font-size: 14px;
    text-align: left;
}

.download-option:hover {
    background: rgba(102, 126, 234, 0.1);
    color: #667eea;
}

.download-option:first-child {
    margin-bottom: 4px;
}

.download-option i {
    font-size: 12px;
    width: 16px;
    text-align: center;
}

/* Ajustes responsivos para el diseño Pinterest */
@media (max-width: 900px) {
    .gallery-item {
        margin-bottom: 15px;
        border-radius: 12px;
    }
}

@media (max-width: 600px) {
    .gallery-item {
        margin-bottom: 10px;
        border-radius: 10px;
    }
}

.gallery-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 70%, rgba(0,0,0,0.7));
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
}

.gallery-item:hover::before {
    opacity: 1;
}

.gallery-item .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    color: white;
    z-index: 2;
    transform: translateY(100%);
    transition: transform 0.3s ease;
}

.gallery-item:hover .overlay {
    transform: translateY(0);
}

/* Modal styles */
.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.9);
    backdrop-filter: blur(5px);
}

.modal-content {
    position: relative;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    max-width: 90vw;
    max-height: 90vh;
}

.modal-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}

.close {
    position: absolute;
    top: 20px;
    right: 30px;
    color: white;
    font-size: 40px;
    font-weight: bold;
    cursor: pointer;
    z-index: 1001;
    transition: color 0.3s ease;
}

.close:hover {
    color: #ff6b6b;
}

.modal-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    pointer-events: none;
}

.nav-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    padding: 15px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 20px;
    transition: all 0.3s ease;
    pointer-events: all;
    backdrop-filter: blur(10px);
}

.nav-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
}

/* Responsive design */
@media (max-width: 768px) {
    .container {
        padding: 10px;
    }
    
    .header h1 {
        font-size: 2rem;
    }
    
    .slider-container {
        height: 300px;
    }
    
    .slider-content h3 {
        font-size: 1.4rem;
    }
    
    .slider-content p {
        font-size: 1rem;
    }
    
    .slider-controls {
        bottom: 15px;
        gap: 15px;
    }
    
    .slider-btn {
        width: 35px;
        height: 35px;
    }
    
    .filter-btn {
        padding: 10px 20px;
        font-size: 0.9rem;
    }
    
    .modal-nav {
        padding: 0 10px;
    }
    
    .nav-btn {
        padding: 12px;
        font-size: 16px;
    }
    
    .download-container {
        top: 15px;
        left: 20px;
    }
    
    .download-btn {
        padding: 10px 16px;
        font-size: 14px;
    }
    
    .download-options {
        min-width: 130px;
    }
}

@media (max-width: 480px) {
    .slider-container {
        height: 250px;
    }
    
    .slider-content {
        padding: 20px;
    }
    
    .slider-content h3 {
        font-size: 1.2rem;
    }
    
    .slider-content p {
        font-size: 0.9rem;
    }
    
    .slider-controls {
        bottom: 10px;
        gap: 10px;
    }
    
    .slider-btn {
        width: 30px;
        height: 30px;
        font-size: 12px;
    }
    
    .slider-dot {
        width: 10px;
        height: 10px;
    }
    
    .gallery-controls {
        flex-direction: column;
        align-items: center;
    }
    
    .filter-btn {
        width: 200px;
    }
}

/* Animaciones */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.gallery-item {
    animation: slideInUp 0.6s ease forwards;
    opacity: 0;
}

.gallery-item:nth-child(1) { animation-delay: 0.1s; }
.gallery-item:nth-child(2) { animation-delay: 0.2s; }
.gallery-item:nth-child(3) { animation-delay: 0.3s; }
.gallery-item:nth-child(4) { animation-delay: 0.4s; }
.gallery-item:nth-child(5) { animation-delay: 0.5s; }
.gallery-item:nth-child(6) { animation-delay: 0.6s; }
.gallery-item:nth-child(7) { animation-delay: 0.7s; }
.gallery-item:nth-child(8) { animation-delay: 0.8s; }
.gallery-item:nth-child(9) { animation-delay: 0.9s; }
.gallery-item:nth-child(10) { animation-delay: 1.0s; }
.gallery-item:nth-child(11) { animation-delay: 1.1s; }
.gallery-item:nth-child(12) { animation-delay: 1.2s; }
.gallery-item:nth-child(13) { animation-delay: 1.3s; }

/* Mejoras para el diseño Pinterest */
.gallery-item::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 80%, rgba(0,0,0,0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
}

.gallery-item:hover::after {
    opacity: 1;
}
