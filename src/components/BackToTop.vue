<template>
  <div>
    <transition
      enter-active-class="transition duration-500 ease-bounce-in-out"
      enter-from-class="opacity-0 transform translate-y-12"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform translate-y-12"
    >
      <button
        v-show="isVisible"
        @click="scrollToTop"
        aria-label="Retour en haut de page"
        class="fixed right-6 md:right-8 bottom-8 z-40 flex items-center justify-center w-14 h-14 p-3 text-white rounded-full shadow-xl group bg-gradient-to-r bg-green-500 to--green-700 hover:from--red-400 hover:to--red-600 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring--yellow"
      >
        <!-- Effet lumineux rayonnant au survol -->
        <span class="absolute w-full h-full rounded-full opacity-0 group-hover:opacity-30 bg--yellow-300 blur-md group-hover:animate-pulse"></span>
        
        <!-- Cercle d'animation au survol -->
        <span class="absolute w-full h-full rounded-full opacity-0 group-hover:opacity-20 border-2 border--yellow group-hover:animate-float-slow"></span>
        
        <!-- Cercle d'animation secondaire -->
        <span class="absolute w-10 h-10 rounded-full opacity-0 group-hover:opacity-40 border border-white group-hover:animate-spin-slower"></span>
        
        <!-- Icône de flèche avec animation -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 transform transition-transform duration-500 ease-bounce-in-out group-hover:-translate-y-1 group-hover:scale-110"
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
        
        <!-- Texte de tooltip au survol sur desktop -->
        <span class="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-night/80 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block">
          Retour en haut
        </span>
      </button>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'BackToTop',
  data() {
    return {
      isVisible: false,
      scrollThreshold: 400, // Légèrement plus bas pour apparaître plus tôt
      throttleDelay: 150,  // Plus réactif
      lastScrollTime: 0
    };
  },
  mounted() {
    window.addEventListener('scroll', this.throttledHandleScroll);
    // Vérifier la position initiale au cas où la page est déjà scrollée
    this.handleScroll();
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.throttledHandleScroll);
  },
  methods: {
    throttledHandleScroll() {
      const now = Date.now();
      if (now - this.lastScrollTime >= this.throttleDelay) {
        this.lastScrollTime = now;
        this.handleScroll();
      }
    },
    
    handleScroll() {
      this.isVisible = window.scrollY > this.scrollThreshold;
    },
    
    scrollToTop() {
      // Animation tactile avant le scroll
      const button = event.currentTarget;
      button.classList.add('scale-90');
      setTimeout(() => button.classList.remove('scale-90'), 150);
      
      // Utiliser GSAP si disponible pour une expérience plus fluide
      if (window.gsap) {
        gsap.to(window, {
          scrollTo: 0,
          duration: 1,
          ease: 'power3.out',
          onComplete: () => {
            // Focus sur le haut de la page pour l'accessibilité
            document.querySelector('header a, header button, header, body')?.focus();
          }
        });
      } else {
        // Fallback standard
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  }
};
</script>

<style scoped>
/* Styles supplémentaires pour les navigateurs sans support Tailwind */
@media (prefers-reduced-motion: reduce) {
  button {
    transition: none !important;
    animation: none !important;
  }
  
  button * {
    animation: none !important;
    transition: none !important;
  }
}

/* Ombre de focus plus visible pour accessibilité */
button:focus-visible {
  box-shadow: 0 0 0 3px rgba(252, 209, 22, 0.5), 0 0 0 6px rgba(0, 0, 0, 0.1);
}
</style>