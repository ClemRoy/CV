// Script pour le carrousel d'expérience professionnelle et l'animation PowerShell
document.addEventListener('DOMContentLoaded', function() {
    // Animation PowerShell
    const psLines = document.querySelectorAll('.ps-line');
    const mainContent = document.getElementById('mainContent');
    
    // Fonction pour afficher les lignes du terminal avec délai
    function showTerminalLines() {
        psLines.forEach(line => {
            const delay = parseInt(line.getAttribute('data-delay')) || 0;
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, delay);
        });
        
        // Afficher le contenu principal après l'animation
        setTimeout(() => {
            mainContent.style.display = 'block';
            mainContent.style.opacity = '0';
            mainContent.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                mainContent.style.opacity = '1';
            }, 50);
        }, 4000); // Animation plus courte maintenant
    }
    
    // Démarrer l'animation
    setTimeout(showTerminalLines, 500);
    
    // Carrousel desktop
    const desktopTrack = document.querySelector('.carousel-track');
    const desktopSlides = Array.from(document.querySelectorAll('.carousel-slide'));
    const desktopIndicators = Array.from(document.querySelectorAll('.indicator'));
    const desktopPrevBtn = document.querySelector('.prev-btn');
    const desktopNextBtn = document.querySelector('.next-btn');
    
    // Carrousel mobile
    const mobileTrack = document.querySelector('.mobile-carousel-track');
    const mobileSlides = Array.from(document.querySelectorAll('.mobile-carousel-slide'));
    const mobileIndicators = Array.from(document.querySelectorAll('.mobile-indicator'));
    const mobilePrevBtn = document.querySelector('.mobile-prev-btn');
    const mobileNextBtn = document.querySelector('.mobile-next-btn');
    
    let desktopCurrentSlide = 0;
    let mobileCurrentSlide = 0;
    
    // Fonction pour mettre à jour le carrousel desktop
    function updateDesktopCarousel() {
        if (desktopTrack) {
            desktopTrack.style.transform = `translateX(-${desktopCurrentSlide * 100}%)`;
        }
        
        desktopIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === desktopCurrentSlide);
        });
        
        desktopSlides.forEach((slide, index) => {
            slide.classList.toggle('active', index === desktopCurrentSlide);
        });
    }
    
    // Fonction pour mettre à jour le carrousel mobile
    function updateMobileCarousel() {
        if (mobileTrack) {
            mobileTrack.style.transform = `translateX(-${mobileCurrentSlide * 100}%)`;
        }
        
        mobileIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === mobileCurrentSlide);
        });
        
        mobileSlides.forEach((slide, index) => {
            slide.classList.toggle('active', index === mobileCurrentSlide);
        });
    }
    
    // Événements pour les boutons précédent/suivant desktop
    if (desktopPrevBtn) {
        desktopPrevBtn.addEventListener('click', () => {
            desktopCurrentSlide = (desktopCurrentSlide - 1 + desktopSlides.length) % desktopSlides.length;
            updateDesktopCarousel();
        });
    }
    
    if (desktopNextBtn) {
        desktopNextBtn.addEventListener('click', () => {
            desktopCurrentSlide = (desktopCurrentSlide + 1) % desktopSlides.length;
            updateDesktopCarousel();
        });
    }
    
    // Événements pour les boutons précédent/suivant mobile
    if (mobilePrevBtn) {
        mobilePrevBtn.addEventListener('click', () => {
            mobileCurrentSlide = (mobileCurrentSlide - 1 + mobileSlides.length) % mobileSlides.length;
            updateMobileCarousel();
        });
    }
    
    if (mobileNextBtn) {
        mobileNextBtn.addEventListener('click', () => {
            mobileCurrentSlide = (mobileCurrentSlide + 1) % mobileSlides.length;
            updateMobileCarousel();
        });
    }
    
    // Événements pour les indicateurs desktop
    desktopIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            desktopCurrentSlide = index;
            updateDesktopCarousel();
        });
    });
    
    // Événements pour les indicateurs mobile
    mobileIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            mobileCurrentSlide = index;
            updateMobileCarousel();
        });
    });
    
    // Navigation au clavier pour desktop
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            if (window.innerWidth > 992) {
                desktopCurrentSlide = (desktopCurrentSlide - 1 + desktopSlides.length) % desktopSlides.length;
                updateDesktopCarousel();
            } else {
                mobileCurrentSlide = (mobileCurrentSlide - 1 + mobileSlides.length) % mobileSlides.length;
                updateMobileCarousel();
            }
        } else if (e.key === 'ArrowRight') {
            if (window.innerWidth > 992) {
                desktopCurrentSlide = (desktopCurrentSlide + 1) % desktopSlides.length;
                updateDesktopCarousel();
            } else {
                mobileCurrentSlide = (mobileCurrentSlide + 1) % mobileSlides.length;
                updateMobileCarousel();
            }
        }
    });
    
    // Initialisation
    updateDesktopCarousel();
    updateMobileCarousel();
});