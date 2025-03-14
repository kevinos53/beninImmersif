<template>
    <section class="bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold text-gray-800 mb-8 font-display text-center">
          D'autres hébergements à <span class="text-benin-green">{{ location }}</span>
        </h2>
        
        <div class="relative">
          <!-- Flèches de navigation -->
          <button 
            @click="prevSlide" 
            class="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-benin-green transition-colors duration-300 focus:outline-none"
            :class="{ 'opacity-50 cursor-not-allowed': isAtBeginning }"
            :disabled="isAtBeginning"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          
          <button 
            @click="nextSlide" 
            class="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-benin-green transition-colors duration-300 focus:outline-none"
            :class="{ 'opacity-50 cursor-not-allowed': isAtEnd }"
            :disabled="isAtEnd"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
          
          <!-- Carousel -->
          <swiper
            :modules="[SwiperNavigation, SwiperPagination, SwiperA11y]"
            :slides-per-view="1"
            :space-between="20"
            :breakpoints="{
              '640': { slidesPerView: 2, spaceBetween: 20 },
              '1024': { slidesPerView: 3, spaceBetween: 30 }
            }"
            @swiper="onSwiperInitialized"
            @slideChange="onSlideChange"
            @reachBeginning="isAtBeginning = true"
            @fromEdge="isAtBeginning = false; isAtEnd = false"
            @reachEnd="isAtEnd = true"
            class="similar-swiper"
          >
            <swiper-slide v-for="accommodation in similarAccommodations" :key="accommodation.id">
              <!-- Carte d'hébergement -->
              <div class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 h-full flex flex-col transform hover:-translate-y-1">
                <!-- Image -->
                <div class="relative h-48">
                  <img 
                    :src="accommodation.image" 
                    :alt="accommodation.name" 
                    class="w-full h-full object-cover"
                  />
                  
                  <!-- Badges -->
                  <div class="absolute top-3 left-3 flex gap-2">
                    <span 
                      v-if="accommodation.type" 
                      class="py-1 px-2 text-xs font-medium rounded-full bg-white bg-opacity-80 backdrop-blur-sm"
                      :class="getTypeClass(accommodation.type)"
                    >
                      {{ accommodation.type }}
                    </span>
                    
                    <span 
                      v-if="accommodation.isNew" 
                      class="bg-benin-red text-white py-1 px-2 text-xs font-medium rounded-full bg-opacity-80 backdrop-blur-sm"
                    >
                      Nouveau
                    </span>
                  </div>
                  
                  <!-- Prix -->
                  <div class="absolute bottom-3 right-3 bg-benin-green text-white font-bold py-1 px-3 rounded-lg text-sm shadow-sm">
                    {{ accommodation.price }}€ <span class="text-xs font-normal opacity-90">/ nuit</span>
                  </div>
                </div>
                
                <!-- Détails -->
                <div class="p-4 flex-1 flex flex-col">
                  <!-- Nom et évaluation -->
                  <div class="flex items-start justify-between mb-2">
                    <h3 class="text-lg font-semibold text-gray-800 hover:text-benin-green transition-colors duration-300">
                      {{ accommodation.name }}
                    </h3>
                    
                    <div class="flex items-center bg-benin-green-50 text-benin-green px-1.5 py-0.5 rounded text-xs">
                      <span class="font-semibold mr-1">{{ accommodation.rating }}</span>
                      <span>{{ getRatingText(accommodation.rating) }}</span>
                    </div>
                  </div>
                  
                  <!-- Localisation -->
                  <div class="flex items-center text-gray-500 text-sm mb-3">
                    <i class="fas fa-map-marker-alt text-benin-green mr-2"></i>
                    {{ accommodation.location }}
                  </div>
                  
                  <!-- Description -->
                  <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                    {{ accommodation.description }}
                  </p>
                  
                  <!-- Caractéristiques -->
                  <div class="flex flex-wrap gap-2 mt-auto">
                    <div 
                      v-for="(feature, i) in accommodation.features.slice(0, 3)" 
                      :key="i"
                      class="text-xs text-gray-600 py-1 px-2 bg-gray-100 rounded-lg flex items-center"
                    >
                      <i :class="`fas ${feature.icon} text-benin-green mr-1`"></i>
                      {{ feature.text }}
                    </div>
                    
                    <div v-if="accommodation.features.length > 3" class="text-xs text-gray-600 py-1 px-2 bg-gray-100 rounded-lg">
                      +{{ accommodation.features.length - 3 }}
                    </div>
                  </div>
                  
                  <!-- Lien -->
                  <a 
                    :href="`/hebergement/${accommodation.slug}`" 
                    class="mt-4 inline-flex items-center text-benin-green hover:text-benin-green-600 font-medium text-sm transition-colors duration-300"
                  >
                    Voir les détails
                    <i class="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform duration-300"></i>
                  </a>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        
        <!-- Voir tous les hébergements -->
        <div class="mt-10 text-center">
          <a 
            :href="`/hebergement?destination=${encodeURIComponent(location.toLowerCase())}`" 
            class="px-6 py-3 bg-benin-green text-white font-medium rounded-lg hover:bg-benin-green-600 transition-colors duration-300 inline-flex items-center"
          >
            Voir tous les hébergements à {{ location }}
            <i class="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Navigation as SwiperNavigation, Pagination as SwiperPagination, A11y as SwiperA11y } from 'swiper/modules';
  import 'swiper/css';
  
  // Props
  const props = defineProps({
    currentAccommodationId: {
      type: Number,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: ''
    }
  });
  
  // État
  const isLoading = ref(true);
  const similarAccommodations = ref([]);
  const swiper = ref(null);
  const isAtBeginning = ref(true);
  const isAtEnd = ref(false);
  
  // Initialiser le swiper
  const onSwiperInitialized = (swiperInstance) => {
    swiper.value = swiperInstance;
  };
  
  // Gestion des événements du carousel
  const onSlideChange = () => {
    isAtBeginning.value = swiper.value.isBeginning;
    isAtEnd.value = swiper.value.isEnd;
  };
  
  const nextSlide = () => {
    if (swiper.value) {
      swiper.value.slideNext();
    }
  };
  
  const prevSlide = () => {
    if (swiper.value) {
      swiper.value.slidePrev();
    }
  };
  
  // Classes pour les types d'hébergements
  const getTypeClass = (type) => {
    const classes = {
      'Hôtel': 'text-blue-700',
      'Villa': 'text-benin-green-600',
      'Écolodge': 'text-emerald-700',
      'Appartement': 'text-amber-700',
      'Maison d\'hôtes': 'text-purple-700',
      'Resort': 'text-teal-700',
      'Bungalow': 'text-orange-700',
      'Ferme': 'text-lime-700'
    };
    
    return classes[type] || 'text-gray-700';
  };
  
  // Texte descriptif pour les notes
  const getRatingText = (rating) => {
    if (rating >= 9) return 'Excellent';
    if (rating >= 8) return 'Très bien';
    if (rating >= 7) return 'Bien';
    return 'Correct';
  };
  
  // Charger les hébergements similaires
  const fetchSimilarAccommodations = async () => {
    isLoading.value = true;
    
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Données de démonstration (dans un cas réel, celles-ci viendraient de l'API)
      const mockAccommodations = [
        {
          id: 1,
          slug: 'azalai-hotel-de-la-plage',
          name: 'Azalai Hotel de la Plage',
          type: 'Hôtel',
          stars: 4,
          price: 120,
          image: '/img/accommodation/azalai-hotel.webp',
          location: 'Cotonou, Bénin',
          rating: 8.7,
          isNew: false,
          description: 'Hôtel élégant situé sur la plage de Cotonou, offrant une vue imprenable sur l\'océan Atlantique et un accès direct à la mer.',
          features: [
            { icon: 'fa-wifi', text: 'Wi-Fi gratuit' },
            { icon: 'fa-swimming-pool', text: 'Piscine' },
            { icon: 'fa-utensils', text: 'Restaurant' },
            { icon: 'fa-umbrella-beach', text: 'Plage privée' }
          ]
        },
        {
          id: 4,
          slug: 'golden-tulip-le-diplomate',
          name: 'Golden Tulip Le Diplomate',
          type: 'Hôtel',
          stars: 5,
          price: 150,
          image: '/img/accommodation/golden-tulip.webp',
          location: 'Cotonou, Bénin',
          rating: 9.0,
          isNew: false,
          description: 'Hôtel 5 étoiles offrant le meilleur du luxe et du confort en plein cœur de Cotonou. Idéal pour les voyageurs d\'affaires et les touristes exigeants.',
          features: [
            { icon: 'fa-wifi', text: 'Wi-Fi gratuit' },
            { icon: 'fa-dumbbell', text: 'Salle de sport' },
            { icon: 'fa-swimming-pool', text: 'Piscine' },
            { icon: 'fa-briefcase', text: 'Business center' }
          ]
        },
        {
          id: 13,
          slug: 'urban-boutique-hotel',
          name: 'Urban Boutique Hôtel',
          type: 'Hôtel',
          stars: 4,
          price: 115,
          image: '/img/accommodation/urban-boutique.webp',
          location: 'Cotonou, Bénin',
          rating: 8.8,
          isNew: false,
          description: 'Hôtel boutique au design contemporain inspiré des arts béninois. Situé dans le quartier des affaires de Cotonou, idéal pour les voyageurs urbains.',
          features: [
            { icon: 'fa-wifi', text: 'Wi-Fi haut débit' },
            { icon: 'fa-bed', text: 'Literie premium' },
            { icon: 'fa-cocktail', text: 'Bar à cocktails' },
            { icon: 'fa-dumbbell', text: 'Salle de fitness' }
          ]
        },
        {
          id: 7,
          slug: 'royal-palm-hotel-spa',
          name: 'Royal Palm Hôtel & Spa',
          type: 'Hôtel',
          stars: 5,
          price: 200,
          image: '/img/accommodation/royal-palm-1.webp',
          location: 'Cotonou, Bénin',
          rating: 9.2,
          isNew: false,
          description: 'Le Royal Palm Hôtel & Spa offre une expérience de luxe combinant élégance contemporaine et touches traditionnelles béninoises. Vue imprenable sur l\'océan Atlantique.',
          features: [
            { icon: 'fa-wifi', text: 'Wi-Fi gratuit' },
            { icon: 'fa-swimming-pool', text: 'Piscine à débordement' },
            { icon: 'fa-spa', text: 'Spa & bien-être' },
            { icon: 'fa-utensils', text: 'Restaurant gastronomique' }
          ]
        }
      ];
      
      // Filtrer pour exclure l'hébergement actuel et limiter à 6 hébergements
      similarAccommodations.value = mockAccommodations
        .filter(accommodation => accommodation.id !== props.currentAccommodationId)
        .slice(0, 6);
      
    } catch (error) {
      console.error('Erreur lors du chargement des hébergements similaires', error);
    } finally {
      isLoading.value = false;
    }
  };
  
  // Chargement initial
  onMounted(() => {
    fetchSimilarAccommodations();
  });
  </script>
  
  <style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  /* Style pour le carousel */
  :deep(.similar-swiper) {
    padding: 1rem;
    margin: -1rem;
    overflow: visible;
  }
  
  :deep(.swiper-slide) {
    height: auto;
  }
  </style>