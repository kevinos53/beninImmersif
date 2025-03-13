<template>
  <transition
    enter-active-class="transition duration-500 ease-bounce-in-out"
    enter-from-class="opacity-0 transform translate-y-12"
    enter-to-class="opacity-100 transform translate-y-0"
    leave-active-class="transition duration-300 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0 transform translate-y-12"
  >
    <button
      v-show="showButton"
      @click="scrollToTop"
      class="fixed bottom-6 md:bottom-8 right-6 md:right-8 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-benin-green-500 to-benin-green-600 text-white shadow-xl flex items-center justify-center transform transition-all duration-300 hover:from-benin-red-500 hover:to-benin-red-600 hover:scale-110 group"
      aria-label="Retour en haut de page"
    >
      <!-- Effet lumineux au survol -->
      <span class="absolute w-full h-full rounded-full opacity-0 group-hover:opacity-30 bg-benin-yellow-300 blur-md group-hover:animate-pulse"></span>
      
      <!-- Cercle d'animation principal -->
      <span class="absolute w-full h-full rounded-full opacity-0 group-hover:opacity-20 border-2 border-benin-yellow group-hover:animate-float-slow"></span>
      
      <!-- Cercle d'animation secondaire -->
      <span class="absolute w-10 h-10 rounded-full opacity-0 group-hover:opacity-30 border border-white group-hover:animate-spin-slower"></span>
      
      <!-- Icône de flèche avec animation -->
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-6 w-6 transform transition-transform duration-500 ease-bounce-in-out group-hover:-translate-y-1 group-hover:scale-110" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2.5" 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>
      
      <!-- Tooltip au survol (visible sur desktop) -->
      <span class="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-night/80 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block">
        Retour en haut
      </span>
    </button>
  </transition>
</template>

<script>
export default {
  name: 'BackToTop',
  data() {
    return {
      showButton: false,
      minScrollThreshold: 100, // Seuil pour cacher le bouton lorsqu'on approche du haut
      midPageThreshold: null,  // Sera calculé dynamiquement
      lastScrollTime: 0,
      throttleDelay: 150
    }
  },
  mounted() {
    // Calculer dynamiquement le seuil du milieu de page
    this.calculateMidPageThreshold();
    
    // Recalculer lors du redimensionnement de la fenêtre
    window.addEventListener('resize', this.calculateMidPageThreshold);
    window.addEventListener('scroll', this.throttledHandleScroll);
    
    // Vérification initiale de la position
    this.handleScroll();
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.throttledHandleScroll);
    window.removeEventListener('resize', this.calculateMidPageThreshold);
  },
  methods: {
    calculateMidPageThreshold() {
      // Calculer environ la moitié de la hauteur de la page
      const pageHeight = Math.max(
        document.body.scrollHeight, 
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      
      this.midPageThreshold = Math.max(300, pageHeight * 0.3); // Au moins 300px ou 30% de la page
    },
    
    throttledHandleScroll() {
      const now = Date.now();
      if (now - this.lastScrollTime >= this.throttleDelay) {
        this.lastScrollTime = now;
        this.handleScroll();
      }
    },
    
    handleScroll() {
      const scrollY = window.scrollY;
      
      // Logique de visibilité: Afficher seulement lorsque
      // 1. On a défilé au-delà du seuil du milieu de page
      // 2. On n'est pas trop proche du haut
      this.showButton = scrollY > this.midPageThreshold && scrollY > this.minScrollThreshold;
    },
    
    scrollToTop() {
      // Animation tactile au clic
      const button = event.currentTarget;
      button.classList.add('scale-90');
      setTimeout(() => button.classList.remove('scale-90'), 150);
      
      // Utiliser GSAP si disponible
      if (window.gsap) {
        gsap.to(window, {
          scrollTo: 0,
          duration: 1,
          ease: 'power3.out'
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  }
}
</script>

<style scoped>
/* Styles inchangés... */
@media (prefers-reduced-motion: reduce) {
  button, button * {
    transition: none !important;
    animation: none !important;
  }
}

button {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15), 0 2px 5px rgba(0, 0, 0, 0.1);
}

button:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2), 0 4px 10px rgba(0, 0, 0, 0.15);
}

button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(252, 209, 22, 0.5), 0 4px 15px rgba(0, 0, 0, 0.2);
}
</style>