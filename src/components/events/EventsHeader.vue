<template>
  <header class="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-gray-900 header-parallax">
    <!-- Fond avec effet parallaxe -->
    <div class="absolute inset-0 bg-header-image bg-cover bg-center transform scale-110"></div>
    
    <!-- Overlay avec variations d'opacité -->
    <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/40"></div>
    
    <!-- Éléments flottants décoratifs -->
    <div class="absolute inset-0 overflow-hidden floating-elements">
      <!-- Cercles décoratifs abstraits -->
      <div class="absolute top-1/4 right-[10%] w-32 h-32 rounded-full bg-benin-green/10 backdrop-blur-2xl floating-element"></div>
      <div class="absolute bottom-1/3 left-[15%] w-40 h-40 rounded-full bg-vodou/10 backdrop-blur-2xl floating-element delay-2"></div>
      <div class="absolute top-1/2 right-[20%] w-24 h-24 rounded-full bg-benin-yellow/10 backdrop-blur-2xl floating-element delay-4"></div>
      
      <!-- Motifs traditionnels stylisés -->
      <div class="absolute top-[10%] left-[20%] w-20 h-20 pattern-dot opacity-20"></div>
      <div class="absolute bottom-[15%] right-[15%] w-32 h-32 pattern-wave opacity-20"></div>
      </div>
      
      <!-- Contenu principal -->
    <div class="relative z-10 container mx-auto px-4 text-center header-content">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 header-title">
        Événements au <span class="text-benin-green">Bénin</span>
        </h1>
        
      <p class="text-xl text-white/90 max-w-2xl mx-auto mb-8 header-subtitle">
        Découvrez les festivals, célébrations culturelles et événements qui font vibrer le cœur du Bénin tout au long de l'année.
      </p>
      
      <div class="flex flex-wrap gap-4 justify-center">
        <a href="#events-section" class="inline-flex items-center px-6 py-3 rounded-lg bg-benin-green text-white font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <i class="fas fa-calendar-alt mr-2"></i>
            Explorer les événements
        </a>
        
        <button class="inline-flex items-center px-6 py-3 rounded-lg bg-white/10 text-white backdrop-blur-sm font-medium border border-white/20 transition-all duration-300 hover:bg-white/20 hover:-translate-y-1">
          <i class="fas fa-info-circle mr-2"></i>
          Comment participer
          </button>
        </div>
      </div>
      
    <!-- Motif décoratif en bas -->
    <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-20"></div>
    
    <!-- Ondulation décorative -->
    <div class="absolute bottom-0 left-0 right-0 z-10 wave-divider">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" class="h-16 w-full">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
              class="fill-white"></path>
        </svg>
      </div>
    </header>
  </template>
  
<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

// Effet de parallaxe et animations
onMounted(() => {
  const header = document.querySelector('.header-parallax');
  const bgImage = header.querySelector('.bg-header-image');
  const title = document.querySelector('.header-title');
  const subtitle = document.querySelector('.header-subtitle');
  const floatingElements = document.querySelectorAll('.floating-element');
  
  // Effet de parallaxe au scroll
  const handleScroll = () => {
    const scrolled = window.scrollY;
    
    // Parallaxe pour le fond
    if (bgImage) {
      bgImage.style.transform = `translate3d(0, ${scrolled * 0.15}px, 0) scale(1.1)`;
    }
    
    // Opacité pour le contenu
    if (scrolled > 100) {
      title.style.opacity = 1 - scrolled * 0.003;
      subtitle.style.opacity = 1 - scrolled * 0.005;
    } else {
      title.style.opacity = 1;
      subtitle.style.opacity = 1;
    }
    
    // Effet sur les éléments flottants
    floatingElements.forEach((el, index) => {
      const speed = 0.1 + (index * 0.05);
      el.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
    });
  };
  
  // Animation initiale des éléments
  const animateElements = () => {
    gsapAnimate();
  };
  
  // Animation avec GSAP si disponible
  const gsapAnimate = () => {
    if (window.gsap) {
      const tl = gsap.timeline();
      
      tl.from('.header-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .from('.header-subtitle', {
        y: 30,
          opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.5')
      .from('.header-content a, .header-content button', {
          y: 20,
          opacity: 0,
          duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      }, '-=0.7')
      .from('.floating-element', {
        scale: 0.5,
          opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: 'elastic.out(1, 0.5)'
      }, '-=1');
    }
  };
  
  // Ajouter les écouteurs
  window.addEventListener('scroll', handleScroll);
  animateElements();
  
  // Cleanup
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });
});
  </script>

<style scoped>
.bg-header-image {
  background-image: url('/img/events/events-header.webp');
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
}

/* Animations des éléments flottants */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

.floating-element {
  animation: float 6s ease-in-out infinite;
}

.delay-2 {
  animation-delay: 2s;
}

.delay-4 {
  animation-delay: 4s;
}

/* Motifs traditionnels */
.pattern-dot {
  background-image: radial-gradient(circle, rgba(255,255,255,0.3) 2px, transparent 2px);
  background-size: 15px 15px;
  transform: rotate(45deg);
}

.pattern-wave {
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255,255,255,0.2),
    rgba(255,255,255,0.2) 5px,
    transparent 5px,
    transparent 10px
  );
}

.wave-divider {
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

/* Animation de transition */
.header-content {
  transition: opacity 0.5s ease;
}

@media (max-width: 768px) {
  .bg-header-image {
    background-position: 60% center;
  }
}
</style>