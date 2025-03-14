<template>
  <header class="relative min-h-[70vh] flex items-center overflow-hidden">
    <!-- Arrière-plan avec parallaxe -->
    <div class="absolute inset-0 z-0" ref="parallaxBg">
      <div class="absolute inset-0 z-10 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      
      <!-- Carrousel d'images automatique -->
      <div class="relative w-full h-full">
        <transition-group 
          name="fade-slide" 
          tag="div" 
          class="w-full h-full"
        >
          <img 
            v-for="(image, index) in backgroundImages" 
            :key="image.src"
            :src="image.src" 
            :alt="image.alt" 
            v-show="currentImageIndex === index"
            class="absolute object-cover w-full h-full transition-transform duration-[2000ms]"
            :class="{'scale-105': imageZoomed}"
          >
        </transition-group>
      </div>
    </div>
    
    <!-- Éléments flottants décoratifs avec animation -->
    <div class="absolute inset-0 z-10 pointer-events-none">
      <!-- Symboles africains stylisés avec animation -->
      <svg 
        class="absolute w-24 h-24 -translate-y-1/2 -translate-x-1/2 text-benin-green opacity-20 blur-[1px] top-1/4 left-1/4" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        ref="symbol1"
      >
        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,10.5A1.5,1.5 0 0,0 10.5,12A1.5,1.5 0 0,0 12,13.5A1.5,1.5 0 0,0 13.5,12A1.5,1.5 0 0,0 12,10.5M7.5,10.5A1.5,1.5 0 0,0 6,12A1.5,1.5 0 0,0 7.5,13.5A1.5,1.5 0 0,0 9,12A1.5,1.5 0 0,0 7.5,10.5M16.5,10.5A1.5,1.5 0 0,0 15,12A1.5,1.5 0 0,0 16.5,13.5A1.5,1.5 0 0,0 18,12A1.5,1.5 0 0,0 16.5,10.5Z" />
      </svg>
      
      <!-- Cercle animé -->
      <div 
        ref="circle1"
        class="absolute w-32 h-32 border-2 rounded-full bottom-1/3 right-1/4 border-benin-yellow opacity-30"
      ></div>
      
      <!-- Autres éléments décoratifs -->
      <svg 
        class="absolute w-20 h-20 text-benin-red opacity-10 blur-[1px] top-1/2 right-1/4" 
        viewBox="0 0 24 24" 
        fill="currentColor"
        ref="symbol2"
      >
        <path d="M3.55,18.54L4.96,19.95L6.76,18.16L5.34,16.74M11,22.45C11.32,22.45 13,22.45 13,22.45V19.5H11M12,5.5A6,6 0 0,0 6,11.5A6,6 0 0,0 12,17.5A6,6 0 0,0 18,11.5C18,8.18 15.31,5.5 12,5.5M20.04,8.13L15.04,6.13L16.04,2.13L21.04,4.13M12,7.5A4,4 0 0,1 16,11.5A4,4 0 0,1 12,15.5A4,4 0 0,1 8,11.5A4,4 0 0,1 12,7.5M9,3L7.75,5.25L10.25,7.75L12.5,6.5M18.5,10L16.25,11.25L18.75,13.75L21,12.5" />
      </svg>
      
      <!-- Motif traditionnel -->
      <div 
        ref="pattern1"
        class="absolute w-40 h-40 opacity-5 bottom-1/4 left-1/3"
      >
        <svg viewBox="0 0 100 100" fill="currentColor" class="w-full h-full text-benin-green">
          <path d="M50,0 C77.6,0 100,22.4 100,50 C100,77.6 77.6,100 50,100 C22.4,100 0,77.6 0,50 C0,22.4 22.4,0 50,0 Z M50,10 C27.9,10 10,27.9 10,50 C10,72.1 27.9,90 50,90 C72.1,90 90,72.1 90,50 C90,27.9 72.1,10 50,10 Z M50,20 C33.4,20 20,33.4 20,50 C20,66.6 33.4,80 50,80 C66.6,80 80,66.6 80,50 C80,33.4 66.6,20 50,20 Z M50,30 C39,30 30,39 30,50 C30,61 39,70 50,70 C61,70 70,61 70,50 C70,39 61,30 50,30 Z M50,40 C44.5,40 40,44.5 40,50 C40,55.5 44.5,60 50,60 C55.5,60 60,55.5 60,50 C60,44.5 55.5,40 50,40 Z" />
        </svg>
      </div>
    </div>
    
    <!-- Contenu principal -->
    <div class="container relative z-20 px-4 pt-16 mx-auto">
      <div class="max-w-3xl">
        <span 
          class="inline-block px-3 py-1 mb-4 text-sm font-medium transition-all duration-500 transform rounded-full bg-benin-green text-white overflow-hidden"
          ref="headerBadge"
        >
          <span class="relative inline-block">
            <span class="relative">SÉJOURS AUTHENTIQUES</span>
            <span class="absolute inset-0 translate-x-full bg-white mix-blend-difference banner-slide"></span>
          </span>
        </span>
        
        <h1 
          class="mb-6 text-4xl font-bold text-white font-display md:text-6xl "
          ref="headerTitle"
        >
          Découvrez nos <span class="relative text-benin-green">
            hébergements
            <span class="absolute bottom-0 left-0 w-full h-[6px] -mb-1 bg-benin-yellow scale-x-0 origin-left" ref="titleUnderline"></span>
          </span> au cœur du Bénin
        </h1>
        
        <p 
          class="mb-8 text-lg text-white/80 md:text-xl"
          ref="headerText"
        >
          Du luxe raffiné au charme authentique, séjournez dans des lieux uniques qui vous permettront de vivre pleinement l'expérience béninoise.
        </p>
        
        <!-- Carte de recherche rapide flottante avec animations -->
        <div 
          class="max-w-md p-6 hidden transition-all duration-500 transform bg-white rounded-xl shadow-lg"
          ref="searchCard"
        >
          <h3 class="mb-4 text-xl font-semibold text-gray-800 font-display">Trouvez votre hébergement idéal</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-600">Destination</label>
              <div class="relative">
                <i class="absolute transform -translate-y-1/2 fas fa-map-marker-alt left-3 top-1/2 text-benin-green"></i>
                <input 
                  v-model="searchQuery"
                  type="text" 
                  placeholder="Ville ou région" 
                  class="w-full py-3 pl-10 pr-3 text-gray-800 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-benin-green focus:border-transparent focus:outline-none transition-all duration-300"
                  @focus="inputFocused = true"
                  @blur="inputFocused = false"
                >
                <!-- Effet de focus -->
                <span 
                  class="absolute bottom-0 left-0 w-full h-0.5 bg-benin-green transform scale-x-0 transition-transform duration-300 origin-left"
                  :class="{'scale-x-100': inputFocused}"
                ></span>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block mb-1 text-sm font-medium text-gray-600">Arrivée</label>
                <div class="relative">
                  <i class="absolute transform -translate-y-1/2 fas fa-calendar left-3 top-1/2 text-benin-green"></i>
                  <input 
                    v-model="arrivalDate"
                    type="date" 
                    class="w-full py-3 pl-10 pr-3 text-gray-800 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-benin-green focus:border-transparent focus:outline-none"
                  >
                </div>
              </div>
              <div>
                <label class="block mb-1 text-sm font-medium text-gray-600">Départ</label>
                <div class="relative">
                  <i class="absolute transform -translate-y-1/2 fas fa-calendar left-3 top-1/2 text-benin-green"></i>
                  <input 
                    v-model="departureDate"
                    type="date" 
                    class="w-full py-3 pl-10 pr-3 text-gray-800 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-benin-green focus:border-transparent focus:outline-none"
                  >
                </div>
              </div>
            </div>
            
            <button 
              @click="search"
              class="relative w-full py-3 text-white transition-all duration-500 overflow-hidden rounded-lg group focus:outline-none"
            >
              <span class="absolute inset-0 w-full h-full transition duration-300 bg-benin-green group-hover:bg-benin-green-600"></span>
              <span class="absolute bottom-0 left-0 w-full h-full opacity-20 bg-gradient-to-t from-black to-transparent"></span>
              <span class="relative flex items-center justify-center font-medium group-hover:-translate-y-1 transition-transform duration-300">
                <i class="mr-2 fas fa-search"></i> Rechercher
              </span>
              <span class="absolute inset-0 w-full h-full transition-all duration-500 rounded-lg opacity-0 bg-white/10 group-hover:opacity-20 group-hover:scale-90"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Vague de séparation animée -->
    <div class="absolute hidden bottom-0 left-0 w-full overflow-hidden leading-[0] z-10" ref="waveSeparator">
      <svg class="relative block w-full h-[70px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="fill-white"></path>
      </svg>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { pinia } from '../../stores'; 
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAccommodationStore } from '../../stores/accommodationStore';

// Enregistrer GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const store = useAccommodationStore(pinia);

// Références pour les animations
const parallaxBg = ref(null);
const headerBadge = ref(null);
const headerTitle = ref(null);
const headerText = ref(null);
const searchCard = ref(null);
const titleUnderline = ref(null);
const symbol1 = ref(null);
const symbol2 = ref(null);
const circle1 = ref(null);
const pattern1 = ref(null);
const waveSeparator = ref(null);

// État du formulaire de recherche
const searchQuery = ref('');
const arrivalDate = ref('');
const departureDate = ref('');
const inputFocused = ref(false);

// État du carrousel
const currentImageIndex = ref(0);
const imageZoomed = ref(false);
const carouselInterval = ref(null);

// Images de fond
const backgroundImages = [
  {
    src: '/img/accommodation/ganvie-stilt-houses.webp',
    alt: 'Village lacustre de Ganvié au Bénin'
  },
  {
    src: '/img/accommodation/royal-palm-1.webp',
    alt: 'Royal Palm Hôtel & Spa à Cotonou'
  },
  {
    src: '/img/accommodation/oasis-beach.webp',
    alt: 'Plage de Grand-Popo au Bénin'
  },
  {
    src: '/img/accommodation/tata-somba.webp',
    alt: 'Architecture traditionnelle Tata Somba au Bénin'
  }
];

// Fonction de recherche
const search = () => {
  // Mettre à jour les filtres dans le store
  if (searchQuery.value) {
    store.filters.search = searchQuery.value;
  }
  
  if (arrivalDate.value) {
    store.filters.dateFrom = arrivalDate.value;
  }
  
  if (departureDate.value) {
    store.filters.dateTo = departureDate.value;
  }
  
  // Animer le bouton et défiler vers les résultats
  gsap.to(window, {
    duration: 1,
    scrollTo: { y: "#results-section", offsetY: 100 },
    ease: "power2.inOut"
  });
};

// Initialiser le carrousel d'arrière-plan
const startCarousel = () => {
  // Changer d'image toutes les 5 secondes
  carouselInterval.value = setInterval(() => {
    // Alterner entre zoom in et zoom out
    imageZoomed.value = !imageZoomed.value;
    
    // Changer d'image après un court délai
    setTimeout(() => {
      currentImageIndex.value = (currentImageIndex.value + 1) % backgroundImages.length;
    }, 1000);
  }, 7000);
};

// Animations d'en-tête
const initHeaderAnimations = () => {
  // Timeline pour l'animation séquentielle
  const tl = gsap.timeline();
  
  // Animation du badge d'en-tête
  tl.from(headerBadge.value, {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: "power3.out"
  });
  
  // Animation du titre
  tl.from(headerTitle.value, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.4");
  
  // Animation du soulignement
  tl.to(titleUnderline.value, {
    scaleX: 1,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.2");
  
  // Animation du texte
  tl.from(headerText.value, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: "power3.out"
  }, "-=0.6");
  
  // Animation de la carte de recherche
  tl.from(searchCard.value, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "elastic.out(1, 0.8)"
  }, "-=0.4");
  
  // Animations des éléments décoratifs
  gsap.to(symbol1.value, {
    rotation: 360,
    duration: 60,
    repeat: -1,
    ease: "none"
  });
  
  gsap.to(circle1.value, {
    rotation: -360,
    duration: 40,
    repeat: -1,
    ease: "none"
  });
  
  gsap.to(symbol2.value, {
    y: "+=20",
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  
  gsap.to(pattern1.value, {
    rotation: 90,
    duration: 20,
    repeat: -1,
    ease: "none"
  });
};

// Effet de parallaxe
const initParallaxEffect = () => {
  // Effet de parallaxe sur la vague du bas
  gsap.to(waveSeparator.value, {
    y: "-30%",
    scrollTrigger: {
      trigger: parallaxBg.value,
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
};

// Initialiser animations et démarrer le carrousel
onMounted(() => {
  initHeaderAnimations();
  initParallaxEffect();
  startCarousel();
});

// Nettoyer les timers
onUnmounted(() => {
  if (carouselInterval.value) {
    clearInterval(carouselInterval.value);
  }
});
</script>

<style scoped>
/* Animation de fondu pour les images */
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 1.5s ease, transform 1.5s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: scale(1.05) translateY(10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: scale(1) translateY(-10px);
}

/* Animation de la bannière */
.banner-slide {
  animation: bannerSlide 3s infinite;
}

@keyframes bannerSlide {
  0%, 100% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
}

/* Effet de surbrillance au survol du bouton de recherche */
button:hover .bg-gradient-to-t {
  animation: pulseGradient 1.5s infinite;
}

@keyframes pulseGradient {
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.4;
  }
}
</style>