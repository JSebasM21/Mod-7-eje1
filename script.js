// Intersection Observer para animaciones al hacer scroll
document.addEventListener('DOMContentLoaded', () => {
    // Configuración del Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Para la animación de máquina de escribir, reiniciarla cuando sea visible
                if (entry.target.querySelector('.typing-text')) {
                    const typingText = entry.target.querySelector('.typing-text');
                    typingText.style.animation = 'none';
                    setTimeout(() => {
                        typingText.style.animation = '';
                    }, 10);
                }
            }
        });
    }, observerOptions);

    // Observar todos los elementos con animación de scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Ripple effect para botones
    document.querySelectorAll('.btn-ripple').forEach(button => {
        button.addEventListener('click', function(e) {
            // Crear elemento ripple si no existe
            let ripple = this.querySelector('.ripple');
            
            if (!ripple) {
                ripple = document.createElement('span');
                ripple.classList.add('ripple');
                this.appendChild(ripple);
            }
            
            // Remover ripple existente
            ripple.classList.remove('animate');
            
            // Calcular posición y tamaño
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // Aplicar estilos
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            // Activar animación
            ripple.classList.add('animate');
            
            // Remover ripple después de la animación
            setTimeout(() => {
                ripple.classList.remove('animate');
            }, 600);
        });
    });

    // Toggle de tema
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            
            // Cambiar icono
            const icon = themeToggle.querySelector('i');
            if (document.body.classList.contains('light-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }

    // Smooth scroll para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efecto de aparición para tarjetas al cargar
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Efecto de onda para texto wavy
    const wavyText = document.querySelector('.wavy-text');
    if (wavyText) {
        const text = wavyText.textContent;
        wavyText.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.setProperty('--i', i);
            wavyText.appendChild(span);
        }
    }

    // Animación para cards con hover
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Efecto de tilt para cards (opcional, descomentar si quieres este efecto)
    /*
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = (x - centerX) / 25;
            const rotateX = (centerY - y) / 25;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
    */

    // Inicializar animaciones de carga
    initLoadingAnimations();
});

function initLoadingAnimations() {
    // Los loaders ya tienen animaciones CSS, pero podemos añadir interactividad
    const loaders = document.querySelectorAll('.loader-card');
    
    loaders.forEach(loader => {
        loader.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
}

// Efecto de parallax para el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.backgroundPosition = `center ${rate}px`;
    }
});

// Preloader (opcional)
window.addEventListener('load', () => {
    // Simular carga de recursos
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});