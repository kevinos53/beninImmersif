<template>
    <header 
      class="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-benin-green-50"
      ref="headerSection"
    >
      <!-- Background avec effet parallaxe -->
      <div class="absolute inset-0 z-0" ref="parallaxBackground">
        <div class="absolute inset-0 z-10 bg-gradient-to-b from-white/50 via-transparent to-benin-green-50"></div>
        <img 
          src="/img/events/events-header-bg.jpg" 
          alt="Célébration au Bénin" 
          class="object-cover w-full h-full"
        >
      </div>
      
      <!-- Éléments décoratifs animés -->
      <div class="absolute inset-0 z-10 pointer-events-none" ref="decorElements">
        <!-- Symboles vodou flottants -->
        <svg 
          class="absolute w-16 h-16 top-1/4 left-1/4 text-benin-green opacity-20 animate-float-slow" 
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <!-- Symbole vodou stylisé -->
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z"/>
        </svg>
        
        <!-- Autres éléments décoratifs -->
        <div class="absolute w-24 h-24 border-2 rounded-full top-1/3 right-1/4 border-benin-green opacity-20 animate-spin-slower"></div>
        <div class="absolute w-32 h-32 border rounded-full bottom-1/4 left-1/3 border-benin-yellow opacity-10 animate-spin-reverse"></div>
      </div>
      
      <!-- Contenu principal -->
      <div class="container z-20 px-4 mx-auto text-center">
        <span 
          class="inline-block px-4 py-1.5 mb-4 text-sm font-medium transition-transform duration-500 transform rounded-full bg-benin-green-50 text-benin-green"
          ref="headerBadge"
        >
          ÉVÉNEMENTS & CÉLÉBRATIONS
        </span>
        
        <h1 
          class="mb-6 text-4xl font-bold text-gray-800 md:text-6xl"
          ref="headerTitle"
        >
          <span class="text-benin-green">Vivez</span> les rythmes du Bénin
        </h1>
        
        <p 
          class="max-w-3xl mx-auto mb-8 text-lg text-gray-600 md:text-xl"
          ref="headerText"
        >
          Découvrez les festivals, cérémonies et événements qui font vibrer l'âme béninoise.
          Du vodou mystique aux célébrations royales, immergez-vous dans la culture vivante.
        </p>
        
        <div class="flex flex-wrap justify-center gap-4">
          <button 
            class="px-6 py-3 font-semibold text-white transition-transform duration-300 rounded-lg bg-benin-green hover:bg-benin-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-benin-green focus:ring-offset-2"
            @click="scrollToEvents"
          >
            Explorer les événements
          </button>
          
          <button 
            class="px-6 py-3 font-semibold transition-all duration-300 border-2 rounded-lg border-benin-green text-benin-green hover:bg-benin-green-50 hover:scale-105 focus:outline-none focus:ring-2"
          >
            <i class="mr-2 fas fa-calendar-alt"></i> Voir le calendrier
          </button>
        </div>
      </div>
      
      <!-- Vague de séparation -->
      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <svg class="relative block w-full h-[70px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="fill-white"></path>
        </svg>
      </div>
    </header>
  </template>
  
  <script>
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
  // Enregistrer les plugins GSAP
  gsap.registerPlugin(ScrollTrigger);
  
  export default {
    name: 'EventsHeader',
    
    mounted() {
      this.initParallaxEffect();
      this.initScrollAnimations();
    },
    
    methods: {
      initParallaxEffect() {
        // Effet de parallaxe sur l'arrière-plan
        this.$refs.headerSection.addEventListener('mousemove', (e) => {
          const { clientX, clientY } = e;
          const xPos = (window.innerWidth / 2 - clientX) / 40;
          const yPos = (window.innerHeight / 2 - clientY) / 40;
          
          gsap.to(this.$refs.parallaxBackground.querySelector('img'), {
            x: xPos,
            y: yPos,
            duration: 1,
            ease: 'power1.out'
          });
          
          // Mouvement inversé pour les éléments décoratifs
          gsap.to(this.$refs.decorElements.children, {
            x: -xPos * 1.5,
            y: -yPos * 1.5,
            duration: 1,
            ease: 'power1.out'
          });
        });
      },
      
      initScrollAnimations() {
        // Animation du badge d'en-tête
        gsap.from(this.$refs.headerBadge, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          delay: 0.2
        });
        
        // Animation du titre
        gsap.from(this.$refs.headerTitle, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: 0.4
        });
        
        // Animation du texte
        gsap.from(this.$refs.headerText, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: 0.6
        });
      },
      
      scrollToEvents() {
        // Faire défiler jusqu'à la section événements
        const eventsSection = document.querySelector('.events-section');
        if (eventsSection) {
          eventsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };
  </script>

<style scoped>
@keyframes float-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes spin-slower {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes spin-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.animate-float-slow {
  animation: float-slow 6s ease-in-out infinite;
}

.animate-spin-slower {
  animation: spin-slower 15s linear infinite;
}

.animate-spin-reverse {
  animation: spin-reverse 20s linear infinite;
}
</style>