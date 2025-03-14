<template>
    <div class="relative">
      <!-- Galerie principale -->
      <div
        class="relative overflow-hidden"
        :style="{ height: isFullscreen ? '100vh' : '70vh' }"
        :class="isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''"
      >
        <!-- Bouton pour revenir aux résultats -->
        <a 
          href="/hebergement" 
          class="absolute top-4 left-4 z-20 bg-white/80 backdrop-blur-sm text-gray-800 rounded-full p-2 hover:bg-white transition-colors duration-300 shadow-md"
          v-if="!isFullscreen"
        >
          <i class="fas fa-arrow-left"></i>
        </a>
  
        <!-- Conteneur du carousel -->
        <div ref="galleryContainer" class="w-full h-full relative">
          <Swiper
            :modules="[SwiperNavigation, SwiperPagination, SwiperA11y, SwiperAutoplay]"
            :slides-per-view="1"
            :space-between="0"
            :navigation="{ 
              nextEl: '.swiper-button-next', 
              prevEl: '.swiper-button-prev'
            }"
            :pagination="{ 
              el: '.swiper-pagination', 
              clickable: true,
              dynamicBullets: true 
            }"
            :autoplay="!isFullscreen ? { delay: 6000, disableOnInteraction: true } : false"
            :loop="true"
            :grabCursor="true"
            @swiper="onSwiperInitialized"
            class="w-full h-full"
          >
            <SwiperSlide v-for="(image, index) in images" :key="index" class="relative">
              <div class="w-full h-full relative">
                <!-- Image -->
                <img 
                  :src="image" 
                  :alt="`${accommodationName} - Photo ${index + 1}`" 
                  class="object-cover w-full h-full transition-transform duration-1000"
                  :class="{ 'scale-105': activeZoom === index }"
                  loading="lazy"
                />
                
                <!-- Overlay pour améliorer la lisibilité du texte/boutons -->
                <div 
                  class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"
                  v-if="!isFullscreen"
                ></div>
              </div>
            </SwiperSlide>
  
            <!-- Boutons de navigation du carousel -->
            <div class="swiper-button-prev !text-white !opacity-70 hover:!opacity-100 transition-opacity duration-300"></div>
            <div class="swiper-button-next !text-white !opacity-70 hover:!opacity-100 transition-opacity duration-300"></div>
            
            <!-- Pagination (points) -->
            <div class="swiper-pagination !bottom-6"></div>
          </Swiper>
  
          <!-- Bouton plein écran -->
          <button 
            @click="toggleFullscreen" 
            class="absolute bottom-4 right-4 z-20 bg-white/80 backdrop-blur-sm text-gray-800 rounded-full p-3 hover:bg-white transition-colors duration-300 shadow-md"
          >
            <i :class="isFullscreen ? 'fas fa-compress' : 'fas fa-expand'"></i>
          </button>
          
          <!-- Compteur de photos -->
          <div class="absolute bottom-4 left-4 z-20 bg-black/70 text-white rounded-full px-3 py-1 text-sm backdrop-blur-sm">
            {{ currentSlide + 1 }} / {{ images.length }}
          </div>
          
          <!-- Bouton fermer en mode plein écran -->
          <button 
            v-if="isFullscreen" 
            @click="toggleFullscreen" 
            class="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm text-gray-800 rounded-full p-3 hover:bg-white transition-colors duration-300 shadow-md"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
  
      <!-- Miniatures (visibles uniquement sur desktop et quand pas en plein écran) -->
      <div 
        v-if="!isFullscreen && !isMobile" 
        class="container mx-auto px-4 -mt-20 relative z-10 hidden md:block"
      >
        <div 
          class="flex gap-2 bg-white p-2 rounded-xl shadow-lg max-w-4xl mx-auto thumbnail-container"
        >
          <div 
            v-for="(image, index) in images.slice(0, 5)" 
            :key="`thumb-${index}`" 
            class="relative cursor-pointer thumbnail-wrapper flex-1 overflow-hidden rounded-lg"
            @click="goToSlide(index)"
          >
            <div 
              class="aspect-w-16 aspect-h-10 transition-transform duration-300 hover:scale-105"
              :class="{ 'ring-2 ring-benin-green': currentSlide === index }"
            >
              <img 
                :src="image"
                :alt="`${accommodationName} miniature ${index + 1}`" 
                class="object-cover w-full h-full"
                loading="lazy"
              />
              
              <!-- Overlay "Voir plus" sur la dernière miniature si plus de 5 images -->
              <div 
                v-if="index === 4 && images.length > 5" 
                class="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-medium backdrop-blur-sm"
              >
                <div>
                  <span class="block text-center">+{{ images.length - 5 }}</span>
                  <span class="text-xs">Voir plus</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, computed } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Navigation as SwiperNavigation, Pagination as SwiperPagination, A11y as SwiperA11y, Autoplay as SwiperAutoplay } from 'swiper/modules';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import { gsap } from 'gsap';
  
  // Props
  const props = defineProps({
    images: {
      type: Array,
      required: true
    },
    accommodationName: {
      type: String,
      required: true
    }
  });
  
  // État
  const isFullscreen = ref(false);
  const isMobile = ref(false);
  const swiper = ref(null);
  const currentSlide = ref(0);
  const activeZoom = ref(0);
  const zoomInterval = ref(null);
  const galleryContainer = ref(null);
  
  // Détection du mobile
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 768;
  };
  
  // Initialisation du swiper
  const onSwiperInitialized = (swiperInstance) => {
    swiper.value = swiperInstance;
    
    // Suivre le slide actif
    swiperInstance.on('slideChange', () => {
      currentSlide.value = swiperInstance.realIndex;
    });
  };
  
  // Navigation vers un slide spécifique
  const goToSlide = (index) => {
    if (swiper.value) {
      swiper.value.slideTo(index + 1); // +1 car swiper a un slide dupliqué au début en mode loop
    }
  };
  
  // Basculer en mode plein écran
  const toggleFullscreen = () => {
    isFullscreen.value = !isFullscreen.value;
    
    if (isFullscreen.value) {
      // Désactiver le défilement
      document.body.style.overflow = 'hidden';
      
      // Animation d'entrée en plein écran
      gsap.from(galleryContainer.value, {
        scale: 0.9,
        opacity: 0.8,
        duration: 0.4,
        ease: 'power2.out'
      });
    } else {
      // Réactiver le défilement
      document.body.style.overflow = '';
      
      // Revenir au slide courant après sortie du plein écran
      setTimeout(() => {
        if (swiper.value) {
          swiper.value.slideTo(currentSlide.value + 1, 0);
        }
      }, 100);
    }
  };
  
  // Effet de zoom progressif sur les images
  const startZoomEffect = () => {
    // Arrêter le précédent intervalle si existant
    if (zoomInterval.value) {
      clearInterval(zoomInterval.value);
    }
    
    // Initialiser le zoom sur le slide actif
    activeZoom.value = currentSlide.value;
    
    // Créer un intervalle pour synchroniser le zoom avec les changements de slide
    zoomInterval.value = setInterval(() => {
      activeZoom.value = currentSlide.value;
    }, 6500); // Légèrement plus long que le délai d'autoplay pour assurer une transition fluide
  };
  
  // Gestionnaire de touches pour la navigation
  const handleKeyDown = (e) => {
    if (isFullscreen.value) {
      if (e.key === 'Escape') {
        toggleFullscreen();
      } else if (e.key === 'ArrowRight' && swiper.value) {
        swiper.value.slideNext();
      } else if (e.key === 'ArrowLeft' && swiper.value) {
        swiper.value.slidePrev();
      }
    }
  };
  
  // Cycle de vie
  onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('keydown', handleKeyDown);
    startZoomEffect();
  });
  
  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
    window.removeEventListener('keydown', handleKeyDown);
    
    if (zoomInterval.value) {
      clearInterval(zoomInterval.value);
    }
    
    // S'assurer que le défilement est réactivé si le composant est démonté en mode plein écran
    if (isFullscreen.value) {
      document.body.style.overflow = '';
    }
  });
  </script>
  
  <style scoped>
  .thumbnail-container {
    transform: translateY(0);
    transition: transform 0.3s ease-out;
  }
  
  .thumbnail-container:hover {
    transform: translateY(-5px);
  }
  
  .thumbnail-wrapper {
    position: relative;
    overflow: hidden;
    height: 80px;
  }
  
  .thumbnail-wrapper img {
    transition: transform 0.3s ease;
  }
  
  .thumbnail-wrapper:hover img {
    transform: scale(1.05);
  }
  
  /* Personnalisation des contrôles Swiper */
  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  :deep(.swiper-button-prev:after),
  :deep(.swiper-button-next:after) {
    font-size: 18px;
  }
  
  :deep(.swiper-pagination-bullet) {
    width: 10px;
    height: 10px;
    background: white;
    opacity: 0.7;
  }
  
  :deep(.swiper-pagination-bullet-active) {
    background: #008651;
    opacity: 1;
  }
  </style>