// Clase para manejar la animación de scroll
class ScrollAnimation {
    constructor(containerSelector = '.animation-wrapper') {
        this.container = document.querySelector(containerSelector);
        this.isAnimating = false;
        this.scrollThreshold = 200; // Píxeles de scroll para activar
        
        if (this.container) {
            this.init();
        }
    }
    
    init() {
        // Agregar clase de entrada suave
        this.container.classList.add('fade-in');
        
        // Configurar el observer para scroll
        this.setupScrollObserver();
        
        // Configurar eventos de scroll
        this.setupScrollEvents();
        
        // Configurar eventos de mouse para interactividad
        this.setupMouseEvents();
    }
    
    setupScrollObserver() {
        // Usar Intersection Observer para mejor rendimiento
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.handleScroll();
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        observer.observe(this.container);
    }
    
    setupScrollEvents() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Calcular el progreso del scroll (0 a 1)
        const scrollProgress = Math.min(scrollY / this.scrollThreshold, 1);
        
        // Aplicar la animación basada en el progreso
        if (scrollProgress > 0.3) {
            this.container.classList.add('scrolled');
        } else {
            this.container.classList.remove('scrolled');
        }
        
        // Las pupilas ahora se mueven automáticamente con el contenedor de la cabeza
    }
    
    
    setupMouseEvents() {
        // Seguimiento del mouse para las pupilas
        document.addEventListener('mousemove', (e) => {
            this.followMouse(e);
        });
        
        // Efecto hover
        this.container.addEventListener('mouseenter', () => {
            this.container.style.transform = 'scale(1.05)';
        });
        
        this.container.addEventListener('mouseleave', () => {
            this.container.style.transform = 'scale(1)';
        });
    }
    
    followMouse(event) {
        const pupils = this.container.querySelectorAll('.pupil-left, .pupil-right');
        
        pupils.forEach((pupil) => {
            const pupilRect = pupil.getBoundingClientRect();
            const pupilCenterX = pupilRect.left + pupilRect.width / 2;
            const pupilCenterY = pupilRect.top + pupilRect.height / 2;
            
            // Calcular la dirección hacia el cursor
            const deltaX = event.clientX - pupilCenterX;
            const deltaY = event.clientY - pupilCenterY;
            
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const maxDistance = 8; // Máximo movimiento de la pupila (reducido para círculos pequeños)
            
            if (distance > 0) {
                const moveX = (deltaX / distance) * Math.min(distance, maxDistance);
                const moveY = (deltaY / distance) * Math.min(distance, maxDistance);
                
                pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
            }
        });
    }
    
    
    reset() {
        this.container.classList.remove('scrolled');
        const pupils = this.container.querySelectorAll('.pupil-left, .pupil-right');
        pupils.forEach(pupil => {
            //Cambiar para cambiar posición pupilas
            pupil.style.transform = '';
        });
    }
    
    // Método para forzar el estado de scroll
    setScrollState(isScrolled) {
        if (isScrolled) {
            this.container.classList.add('scrolled');
        } else {
            this.container.classList.remove('scrolled');
        }
    }
}

// Función para crear snippet reutilizable
function createScrollAnimationSnippet(config = {}) {
    const defaultConfig = {
        containerClass: 'scroll-animation-snippet',
        images: {
            box: 'img/box.png',
            head: 'img/head.png',
            pupil: 'img/pupil.png'
        },
        size: {
            width: '400px',
            height: '400px'
        },
        scrollThreshold: 200
    };
    
    const finalConfig = { ...defaultConfig, ...config };
    
    // Crear el HTML del snippet
    const snippetHTML = `
        <div class="${finalConfig.containerClass}">
            <div class="animation-wrapper" style="width: ${finalConfig.size.width}; height: ${finalConfig.size.height};">
                <img src="${finalConfig.images.box}" alt="Caja" class="box-image">
                <img src="${finalConfig.images.head}" alt="Cabeza" class="head-image">
                <img src="${finalConfig.images.pupil}" alt="Pupila" class="pupil-left">
                <img src="${finalConfig.images.pupil}" alt="Pupila" class="pupil-right">
            </div>
        </div>
    `;
    
    return {
        html: snippetHTML,
        init: function(container) {
            const element = typeof container === 'string' 
                ? document.querySelector(container) 
                : container;
            
            if (element) {
                element.innerHTML = snippetHTML;
                return new ScrollAnimation(`${container} .animation-wrapper`);
            }
            return null;
        }
    };
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Crear instancia principal de la animación
    const mainAnimation = new ScrollAnimation();
    
    // Ya no necesitamos indicador de scroll ya que está integrado en el diseño
    
    // Exponer funciones globalmente para uso fácil
    window.ScrollAnimation = ScrollAnimation;
    window.createScrollAnimationSnippet = createScrollAnimationSnippet;
});

// Utilidad para redimensionar automáticamente
function setupResponsiveAnimation() {
    const wrapper = document.querySelector('.animation-wrapper');
    if (!wrapper) return;
    
    function updateSize() {
        const viewportWidth = window.innerWidth;
        let size;
        
        if (viewportWidth <= 480) {
            size = '250px';
        } else if (viewportWidth <= 768) {
            size = '300px';
        } else {
            size = '400px';
        }
        
        wrapper.style.width = size;
        wrapper.style.height = size;
    }
    
    window.addEventListener('resize', updateSize);
    updateSize(); // Ejecutar al cargar
}

// Inicializar responsive
document.addEventListener('DOMContentLoaded', setupResponsiveAnimation);

function setupAliciaFall() {
    const section = document.querySelector('.content');
    const img = document.getElementById('alicia-fall-frame');
    if (!section || !img) return;
    const frames = [
        'img/alicia/1.png',
        'img/alicia/2.png',
        'img/alicia/3.png',
        'img/alicia/4.png',
        'img/alicia/5.png',
        'img/alicia/6.png',
        'img/alicia/7.png'
    ];
    const cache = frames.map(src => { const i = new Image(); i.src = src; return i; });
    function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
    function update() {
        const rect = section.getBoundingClientRect();
        const winH = window.innerHeight;
        const total = rect.height + winH;
        const progressed = (winH - rect.top) / total;
        const startShift = 0.16; // inicia antes: adelanta ~12% los frames
        const progress = clamp(progressed + startShift, 0, 1);
        
        // Secuencia extendida: frame 1 (2 veces) + frames 2-5 (1 vez) + frames 6-7 (3 veces cada uno alternando)
        // Total: 2 + 4 + 6 = 12 "slots" de tiempo
        const totalSlots = 12;
        const currentSlot = Math.floor(progress * totalSlots);
        let idx;
        
        if (currentSlot < 2) {
            // Frame 1 se muestra 2 veces (slots 0-1)
            idx = 0;
        } else if (currentSlot < 6) {
            // Frames 2-5 se muestran 1 vez cada uno (slots 2-5)
            idx = currentSlot - 1; // slots 2,3,4,5 -> frames 1,2,3,4 (índices 1,2,3,4)
        } else {
            // Frames 6-7 alternan 3 veces cada uno (slots 6-11)
            const finalSlot = currentSlot - 6; // slots 0-5 en la sección final
            const cyclePosition = finalSlot % 2; // alterna entre 0 y 1
            idx = 5 + cyclePosition; // índices 5 y 6 (frames 6 y 7)
        }
        
        idx = Math.min(frames.length - 1, Math.max(0, idx));
        if (img.getAttribute('src') !== frames[idx]) img.setAttribute('src', frames[idx]);
        
        // Movimiento vertical únicamente
        const travel = winH * 0.9;
        const startY = -250;
        const translateY = startY + progress * travel;
        
        img.style.transform = `translateY(${translateY.toFixed(2)}px)`;
        img.style.willChange = 'transform';
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
}

document.addEventListener('DOMContentLoaded', setupAliciaFall);
