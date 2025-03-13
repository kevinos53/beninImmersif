<template>
  <div class="benin-immersion relative">
    <!-- Éléments de fond animés -->
    <div class="fixed inset-0 pointer-events-none z-0 opacity-10">
      <div class="absolute top-0 right-0 w-1/3 h-1/2 bg-vodou/30 rounded-bl-full animate-float-slow"></div>
      <div class="absolute bottom-0 left-0 w-1/4 h-1/3 bg-benin-yellow/20 rounded-tr-full animate-spin-slower"></div>
      <div class="absolute top-1/3 left-10 w-16 h-16 md:w-24 md:h-24 bg-benin-green/20 rounded-full animate-pulse"></div>
      <div class="absolute bottom-1/4 right-10 w-20 h-20 md:w-32 md:h-32 bg-spirit/20 rounded-full animate-spin-reverse"></div>
      <!-- Motifs géométriques inspirés de l'art vodou -->
      <div class="hidden md:block absolute top-1/4 left-1/4 w-32 h-32 border-2 border-vodou/20 rotate-45 animate-spin-slower"></div>
      <div class="hidden md:block absolute bottom-1/3 right-1/3 w-40 h-40 border-2 border-earth/20 rotate-12 animate-float-slow"></div>
    </div>
    
    <!-- Overlay de chargement -->
    <div v-if="isLoading" class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-night transition-opacity duration-1000" :class="{'opacity-0': loadingProgress === 100}">
      <div class="w-40 h-40 mb-8 relative">
        <img src="/img/carte-du-benin.webp" class="w-full h-full object-contain animate-float-slow" alt="Carte du Bénin">
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-12 h-12 border-4 border-benin-yellow border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
      <div class="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-benin-green via-benin-yellow to-vodou rounded-full transition-all duration-300" :style="{width: `${loadingProgress}%`}"></div>
      </div>
      <p class="mt-4 text-white font-display">Bienvenue au Bénin...</p>
    </div>
    
    <!-- Composants d'interface utilisateur -->
    <Navigation 
      :active-section="activeSection" 
      @navigate-to="navigateTo" 
      @open-journey-map="showJourneyMap = true" />
    
    <ProgressBar 
      :active-section="activeSection" 
      @navigate-to="navigateTo" />
    
    <JourneyMap 
      :show="showJourneyMap" 
      @close="showJourneyMap = false" 
      @navigate-to="navigateTo" />
    
    <BackToTop />
    
    <!-- Sections de contenu avec transitions -->
    <TransitionGroup name="section-fade">
      <HeroSection 
        v-if="activeSection === 'hero' || allSectionsVisible" 
        @navigate-to="navigateTo" 
        @open-journey-map="showJourneyMap = true" />
    
      <CultureSection 
        id="culture" 
        v-if="activeSection === 'culture' || allSectionsVisible" />
    
      <NatureSection 
        id="nature" 
        v-if="activeSection === 'nature' || allSectionsVisible" />
    
      <ExperiencesSection 
        id="experiences" 
        v-if="activeSection === 'experiences' || allSectionsVisible" />
    
      <CuisineSection 
        id="cuisine" 
        v-if="activeSection === 'cuisine' || allSectionsVisible" />
    
      <ContactSection 
        id="contact" 
        v-if="activeSection === 'contact' || allSectionsVisible" />
    </TransitionGroup>
    
    <FooterSection />
  </div>
</template>

<script>
import Navigation from './Navigation.vue';
import ProgressBar from './ProgressBar.vue';
import JourneyMap from './JourneyMap.vue';
import BackToTop from './BackToTop.vue';
import HeroSection from './HeroSection.vue';
import CultureSection from './sections/CultureSection.vue';
import NatureSection from './sections/NatureSection.vue';
import ExperiencesSection from './sections/ExperiencesSection.vue';
import CuisineSection from './sections/GastronomieSection.vue';
import ContactSection from './sections/ContactSection.vue';
import FooterSection from './FooterSection.vue';

export default {
  name: 'BeninImmersion',
  components: {
    Navigation,
    ProgressBar,
    JourneyMap,
    BackToTop,
    HeroSection,
    CultureSection,
    NatureSection,
    ExperiencesSection,
    CuisineSection,
    ContactSection,
    FooterSection
  },
  data() {
    return {
      activeSection: 'hero',
      showJourneyMap: false,
      isLoading: true,
      loadingProgress: 0,
      allSectionsVisible: true,
      windowWidth: window.innerWidth
    }
  },
  mounted() {
    // Initialiser le chargement
    this.initLoading();
    
    // Configurer l'observation des sections pour le défilement
    this.setupIntersectionObserver();
    
    // Initialiser GSAP ScrollTrigger si disponible
    this.initScrollTrigger();
    
    // Écouter les changements de taille d'écran
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    initLoading() {
      // Simuler un chargement progressif avec des paliers
      let step = 0;
      const totalSteps = 10;
      
      const loadingInterval = setInterval(() => {
        step++;
        // Créer une progression non linéaire pour un effet plus naturel
        this.loadingProgress = Math.round(100 * (1 - Math.cos(Math.PI * step / totalSteps)) / 2);
        
        if (step >= totalSteps) {
          clearInterval(loadingInterval);
          setTimeout(() => {
            this.isLoading = false;
            document.body.classList.remove('overflow-hidden');
            this.animateEntrance();
          }, 800);
        }
      }, 300);
    },
    
    setupIntersectionObserver() {
      // Observer les sections pour détecter laquelle est visible
      const options = {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: 0.3
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
            this.animateSectionEntrance(entry.target);
          }
        });
      }, options);
      
      // Observer toutes les sections
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        observer.observe(section);
      });
    },
    
    navigateTo(sectionId) {
      this.activeSection = sectionId;
      
      // Faire défiler jusqu'à la section avec une animation fluide
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 80, // Tenir compte du header
          behavior: 'smooth'
        });
      }
    },
    
    initScrollTrigger() {
      // Initialiser GSAP ScrollTrigger si disponible
      if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animation globale du parallaxe
        gsap.utils.toArray('.parallax-section').forEach(section => {
          gsap.to(section.querySelector('.parallax-bg'), {
            y: '30%',
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          });
        });
      }
    },
    
    animateEntrance() {
      if (window.gsap) {
        gsap.from('.benin-immersion > *', {
          opacity: 0,
          y: 30,
          stagger: 0.2,
          duration: 1,
          ease: 'power3.out'
        });
      }
    },
    
    animateSectionEntrance(section) {
      if (window.gsap) {
        const elements = section.querySelectorAll('.animate-on-enter');
        gsap.from(elements, {
          opacity: 0,
          y: 50,
          stagger: 0.1,
          duration: 0.8,
          ease: 'back.out(1.7)'
        });
      }
    },
    
    handleResize() {
      this.windowWidth = window.innerWidth;
      // Sur mobile, toujours afficher toutes les sections pour éviter les problèmes avec observer
      this.allSectionsVisible = this.windowWidth < 768;
    }
  }
}
</script>

<style scoped>
/* Transitions entre sections */
.section-fade-enter-active,
.section-fade-leave-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.section-fade-enter-from,
.section-fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* Styles pour les marqueurs de la timeline */
.timeline-marker {
  position: relative;
}

.timeline-marker::before {
  content: '';
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--benin-green);
  border: 3px solid var(--benin-yellow);
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 0 4px rgba(0, 135, 81, 0.3);
  z-index: 10;
}

.timeline-marker::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 24px;
  background: rgba(252, 209, 22, 0.3);
  border-radius: 50%;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
  animation: ripple 2s linear infinite;
}

@keyframes ripple {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }
}

:root {
  --benin-green: #008751;
  --benin-yellow: #FCD116;
  --benin-red: #E8112D;
  --vodou: #8B5CF6;
  --spirit: #5D3587;
  --earth: #92400E;
  --ocean: #0369A1;
}
</style> 