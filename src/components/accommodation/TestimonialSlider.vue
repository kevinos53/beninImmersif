<template>
  <section class="py-16 bg-gradient-to-b from-white to-benin-green-50 overflow-hidden relative">
    <!-- Éléments décoratifs -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Cercles décoratifs -->
      <div class="absolute top-10 right-[10%] w-12 h-12 border-4 border-benin-yellow opacity-20 rounded-full"></div>
      <div class="absolute bottom-24 left-[5%] w-24 h-24 border-2 border-benin-green opacity-20 rounded-full"></div>
      <div class="absolute top-1/2 right-[15%] w-32 h-32 border border-benin-red opacity-10 rounded-full"></div>
      
      <!-- Pattern avec symboles africains -->
      <div class="absolute inset-0 z-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="adinkra-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M50,20 L80,50 L50,80 L20,50 Z" fill="none" stroke="#008651" stroke-width="2" />
            <circle cx="50" cy="50" r="15" fill="none" stroke="#008651" stroke-width="2" />
            <path d="M50,35 L50,65 M35,50 L65,50" stroke="#008651" stroke-width="2" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#adinkra-pattern)" />
        </svg>
      </div>
    </div>
    
    <div class="container mx-auto px-4 relative z-10">
      <!-- En-tête de section -->
      <div class="text-center mb-12">
        <span class="inline-block px-3 py-1 mb-3 text-sm font-medium rounded-full bg-benin-green-50 text-benin-green">
          TÉMOIGNAGES
        </span>
        <h2 class="text-3xl font-bold text-gray-800 md:text-4xl font-display mb-3">
          Ce que <span class="text-benin-green">disent nos voyageurs</span>
        </h2>
        <p class="max-w-xl mx-auto text-gray-600">
          Découvrez les expériences authentiques vécues par nos voyageurs dans les hébergements du Bénin.
        </p>
      </div>
      
      <!-- Slider de témoignages -->
      <div class="relative" ref="testimonialContainer">
        <!-- Navigation -->
        <div class="absolute -top-20 right-0 flex space-x-3 lg:top-0">
          <button 
            @click="prevSlide" 
            class="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
            :class="currentIndex === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-benin-green-50 text-benin-green hover:bg-benin-green hover:text-white'"
            :disabled="currentIndex === 0"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          <button 
            @click="nextSlide" 
            class="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 bg-benin-green-50 text-benin-green hover:bg-benin-green hover:text-white"
            :disabled="currentIndex >= testimonials.length - slidesToShow"
            :class="currentIndex >= testimonials.length - slidesToShow ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-benin-green-50 text-benin-green hover:bg-benin-green hover:text-white'"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
        
        <!-- Slider principal -->
        <div 
          class="overflow-hidden"
          ref="sliderTrack"
        >
          <div 
            class="flex transition-transform duration-500 ease-out"
            :style="`transform: translateX(-${currentIndex * (100 / slidesToShow)}%)`"
          >
            <div 
              v-for="(testimonial, index) in testimonials" 
              :key="index"
              class="flex-shrink-0 px-3"
              :class="getSlideWidthClass()"
            >
              <div 
                class="bg-white rounded-xl shadow-md p-6 h-full flex flex-col relative overflow-hidden transition-all duration-500 hover:shadow-lg transform hover:-translate-y-1"
                :class="{'border-l-4 border-benin-yellow': testimonial.featured}"
              >
                <!-- Indicateur témoignage en vedette -->
                <div 
                  v-if="testimonial.featured"
                  class="absolute -top-6 -right-12 bg-benin-yellow text-white text-xs font-bold py-1 px-10 transform rotate-45"
                >
                  COUP DE CŒUR
                </div>
                
                <!-- En-tête avec informations de l'utilisateur -->
                <div class="flex items-center mb-4">
                  <div class="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-benin-green-100">
                    <img :src="testimonial.avatar" :alt="testimonial.name" class="w-full h-full object-cover">
                  </div>
                  <div class="ml-3">
                    <h4 class="font-semibold text-gray-800">{{ testimonial.name }}</h4>
                    <div class="flex items-center">
                      <div class="flex">
                        <i 
                          v-for="star in 5" 
                          :key="star" 
                          :class="[
                            'text-xs', 
                            star <= testimonial.rating ? 'fas fa-star text-benin-yellow' : 'far fa-star text-gray-300'
                          ]"
                        ></i>
                      </div>
                      <span class="ml-2 text-xs text-gray-500">{{ formatDate(testimonial.date) }}</span>
                    </div>
                  </div>
                </div>
                
                <!-- Nom de l'hébergement -->
                <div class="flex items-center text-benin-green-700 text-sm mb-3">
                  <i class="fas fa-hotel mr-2"></i>
                  <span>{{ testimonial.accommodation }}</span>
                </div>
                
                <!-- Contenu du témoignage -->
                <div class="flex-grow">
                  <div class="relative mb-3">
                    <i class="fas fa-quote-left text-benin-green-100 text-4xl absolute -top-2 -left-1 z-0 transform -translate-x-1/4"></i>
                    <p class="text-gray-600 relative z-10 text-sm lg:text-base line-clamp-5">{{ testimonial.content }}</p>
                  </div>
                </div>
                
                <!-- Images du voyage (si disponibles) -->
                <div v-if="testimonial.images && testimonial.images.length > 0" class="mt-3 flex -mx-1 overflow-hidden hidden">
                  <div 
                    v-for="(image, imageIndex) in testimonial.images.slice(0, 3)" 
                    :key="imageIndex"
                    class="px-1 w-1/3"
                  >
                    <div class="aspect-w-4 aspect-h-3 rounded-md overflow-hidden hidden">
                      <img :src="image" :alt="`Photo de ${testimonial.name}`" class="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500">
                    </div>
                  </div>
                  <div v-if="testimonial.images.length > 3" class="px-1 w-1/3 hidden">
                    <div class="aspect-w-4 aspect-h-3 rounded-md overflow-hidden relative bg-gray-900">
                      <img :src="testimonial.images[3]" :alt="`Photo de ${testimonial.name}`" class="w-full h-full object-cover opacity-60">
                      <div class="absolute inset-0 flex items-center justify-center text-white font-medium">
                        +{{ testimonial.images.length - 3 }}
                      </div>
                    </div>
                  </div>
                </div>
                
                <!-- Tags du voyage -->
                <div v-if="testimonial.tags && testimonial.tags.length > 0" class="mt-4 flex flex-wrap -m-0.5">
                  <span 
                    v-for="(tag, tagIndex) in testimonial.tags" 
                    :key="tagIndex"
                    class="m-0.5 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Indicateurs de pagination -->
        <div class="flex justify-center mt-8">
          <div 
            v-for="i in Math.ceil(testimonials.length / slidesToShow)" 
            :key="i"
            @click="goToSlide(i - 1)"
            class="w-2 h-2 mx-1 rounded-full cursor-pointer transition-all duration-300"
            :class="Math.floor(currentIndex / slidesToShow) === i - 1 ? 'bg-benin-green w-4' : 'bg-gray-300 hover:bg-gray-400'"
          ></div>
        </div>
      </div>
      
      <!-- Lien vers tous les avis -->
      <div class="text-center mt-8">
        <a 
          href="#" 
          class="inline-flex items-center px-4 py-2 text-benin-green border border-benin-green rounded-lg hover:bg-benin-green hover:text-white transition-colors duration-300"
        >
          <span>Voir tous les témoignages</span>
          <i class="fas fa-arrow-right ml-2"></i>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonialContainer = ref(null);
const sliderTrack = ref(null);
const autoplayInterval = ref(null);
const currentIndex = ref(0);
const isMobile = ref(false);
const isTablet = ref(false);

// Nombre de témoignages à afficher en fonction de la taille de l'écran
const slidesToShow = computed(() => {
  if (isMobile.value) return 1;
  if (isTablet.value) return 2;
  return 3;
});

// Obtenir la largeur du slide en fonction du nombre de slides visibles
const getSlideWidthClass = () => {
  if (slidesToShow.value === 1) return 'w-full';
  if (slidesToShow.value === 2) return 'w-1/2';
  return 'w-1/3';
};

// Témoignages
const testimonials = [
  {
    name: "Marie Dubois",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 5,
    date: "2024-02-15",
    accommodation: "Royal Palm Hôtel & Spa, Cotonou",
    content: "Notre séjour au Royal Palm a été absolument parfait. Le personnel était attentionné, la chambre spacieuse avec une vue imprenable sur l'océan, et le restaurant proposait une cuisine délicieuse mélangeant saveurs béninoises et internationales. Le spa était également exceptionnel, avec des soins inspirés des traditions locales.",
   
    tags: ["Luxe", "Spa", "Vue sur mer"],
    featured: true
  },
  {
    name: "Thomas Laurent",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4,
    date: "2024-01-20",
    accommodation: "Ganvié Stilt Resort, Lac Nokoué",
    content: "Une expérience unique de dormir dans un lodge sur pilotis au milieu du village lacustre de Ganvié. Le lever de soleil sur le lac était magique et les excursions en pirogue nous ont permis de découvrir la vie quotidienne fascinante des habitants. Confort simple mais très propre, cuisine locale excellente.",
   
    tags: ["Authentique", "Culturel", "Expérience unique"]
  },
  {
    name: "Céline Moreau",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 5,
    date: "2024-03-05",
    accommodation: "Villa Kaya, Ouidah",
    content: "Notre famille a adoré cette magnifique villa avec piscine privée. L'emplacement était parfait pour explorer les sites historiques de Ouidah pendant la journée et se détendre au bord de la piscine en fin de journée. Le personnel était discret mais toujours disponible pour nous aider. Nous reviendrons certainement!",
    
    tags: ["Famille", "Piscine", "Confort"]
  },
  {
    name: "Jean-Pierre Bouchard",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 4,
    date: "2024-02-10",
    accommodation: "Tata Somba Lodge, Natitingou",
    content: "Un lodge authentique inspiré de l'architecture traditionnelle Somba. Les chambres sont simples mais confortables, la nourriture excellente et les excursions dans les villages à châteaux inoubliables. Je recommande particulièrement la randonnée guidée qui nous a permis de rencontrer les habitants et découvrir leur mode de vie.",
   
    tags: ["Culture", "Architecture", "Randonnée"]
  },
  {
    name: "Sophie Martin",
    avatar: "https://randomuser.me/api/portraits/women/54.jpg",
    rating: 5,
    date: "2024-03-20",
    accommodation: "Oasis Beach Resort, Grand-Popo",
    content: "Séjour paradisiaque dans ce resort en bord de mer. La plage est magnifique et peu fréquentée, idéale pour se détendre. Les bungalows sont confortables et décorés avec goût. Le point fort reste les couchers de soleil incroyables que l'on peut admirer depuis la terrasse du restaurant. Parfait pour un séjour romantique!",
   
    tags: ["Plage", "Romantique", "Coucher de soleil"],
    featured: true
  },
  {
    name: "Antoine Leclerc",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 4,
    date: "2024-01-05",
    accommodation: "Pendjari Safari Lodge, Parc National",
    content: "Lodge très bien situé pour explorer le parc de la Pendjari. Les safaris organisés par le lodge étaient excellents, avec des guides connaissant parfaitement la faune locale. Nous avons eu la chance d'observer des éléphants, antilopes et même un lion! Chambres confortables et cuisine savoureuse après les longues journées d'exploration.",
   
    tags: ["Safari", "Nature", "Aventure"]
  },
  {
    name: "Émilie Dupont",
    avatar: "https://randomuser.me/api/portraits/women/89.jpg",
    rating: 5,
    date: "2024-02-28",
    accommodation: "Porto-Novo Heritage House, Porto-Novo",
    content: "Séjourner dans cette maison coloniale restaurée a été comme remonter le temps. Chaque pièce est décorée avec des objets d'époque et le jardin tropical est un havre de paix. Les propriétaires sont passionnés par l'histoire et nous ont fait découvrir Porto-Novo sous un angle inédit. Une adresse à ne pas manquer pour les amateurs d'histoire!",
   
    tags: ["Histoire", "Architecture", "Charme"]
  }
];

// Navigation du slider
const nextSlide = () => {
  if (currentIndex.value < testimonials.length - slidesToShow.value) {
    currentIndex.value++;
    animateSlide();
  }
};

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
    animateSlide();
  }
};

const goToSlide = (index) => {
  currentIndex.value = index * slidesToShow.value;
  animateSlide();
};

// Animation du slider
const animateSlide = () => {
  if (sliderTrack.value) {
    gsap.to(sliderTrack.value.children, {
      x: `-${currentIndex.value * (100 / slidesToShow.value)}%`,
      duration: 0.5,
      ease: "power2.out"
    });
  }
};

// Autoplay du slider
const startAutoplay = () => {
  stopAutoplay(); // Arrêter d'abord pour éviter les doublons
  autoplayInterval.value = setInterval(() => {
    if (currentIndex.value < testimonials.length - slidesToShow.value) {
      nextSlide();
    } else {
      currentIndex.value = 0;
      animateSlide();
    }
  }, 5000);
};

const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value);
  }
};

// Formater la date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

// Gestion du redimensionnement de la fenêtre
const handleResize = () => {
  isMobile.value = window.innerWidth < 768;
  isTablet.value = window.innerWidth >= 768 && window.innerWidth < 1024;
  
  // Réinitialiser l'index si nécessaire
  if (currentIndex.value > testimonials.length - slidesToShow.value) {
    currentIndex.value = Math.max(0, testimonials.length - slidesToShow.value);
  }
  
  // Réappliquer l'animation après un court délai
  setTimeout(animateSlide, 100);
};

// Cycle de vie du composant
onMounted(() => {
  // Initialiser les valeurs de taille d'écran
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 768;
    isTablet.value = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    // Démarrer l'autoplay
    startAutoplay();
    
    // Gestionnaire de redimensionnement
    window.addEventListener('resize', handleResize);
    
    // Animation initiale
    gsap.from(testimonialContainer.value, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: testimonialContainer.value,
        start: "top bottom-=100",
        toggleActions: "play none none none"
      }
    });
  }
});

onUnmounted(() => {
  stopAutoplay();
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize);
  }
});
</script>

<style scoped>
/* Animation de pulsation pour les éléments du carte */
@keyframes pulse {
  0%, 100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

.testimonial-pulse {
  animation: pulse 3s infinite ease-in-out;
}

/* Style pour le contenu témoignage avec limitation de lignes */
.line-clamp-5 {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Effet de hover sur les images */
.testimonial-image:hover img {
  transform: scale(1.05);
}

/* Transition douce pour les slides */
.slide-transition {
  transition: transform 0.5s ease-out;
}
</style>