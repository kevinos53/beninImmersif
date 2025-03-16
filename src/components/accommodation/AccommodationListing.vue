<template>
  <div id="accommodation">
    <!-- État de chargement -->
    <div v-if="isLoading" class="py-10 text-center">
      <div class="relative inline-flex items-center justify-center">
        <div class="absolute animate-ping w-16 h-16 rounded-full bg-benin-green opacity-10"></div>
        <div class="relative flex items-center justify-center w-16 h-16 rounded-full bg-benin-green/20">
          <svg class="w-8 h-8 text-benin-green animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>
      <p class="mt-4 text-gray-600">Chargement des hébergements...</p>
    </div>
    
    <!-- Message d'erreur -->
    <div v-else-if="error" class="p-6 text-center text-red-600 bg-red-50 rounded-lg">
      <i class="text-2xl fas fa-exclamation-circle"></i>
      <p class="mt-2">{{ error }}</p>
      <button @click="fetchAccommodations" class="px-4 py-2 mt-4 text-white rounded-md bg-benin-green hover:bg-benin-green-600">
        Réessayer
      </button>
    </div>
    
    <!-- Aucun résultat -->
    <div v-else-if="totalAccommodations === 0" class="py-10 text-center">
      <div class="flex flex-col items-center justify-center p-6 mx-auto bg-gray-50 rounded-lg max-w-md">
        <div class="p-3 mb-4 text-yellow-500 bg-yellow-100 rounded-full">
          <i class="text-3xl fas fa-search"></i>
        </div>
        <h3 class="mb-2 text-xl font-semibold text-gray-800">Aucun hébergement trouvé</h3>
        <p class="mb-6 text-gray-600">Aucun hébergement ne correspond à vos critères de recherche.</p>
        <button @click="resetFilters" class="px-4 py-2 text-white rounded-md bg-benin-green hover:bg-benin-green-600">
          Réinitialiser les filtres
        </button>
      </div>
    </div>
    
    <!-- Résultats des hébergements -->
    <div v-else>
      <!-- Tri et vue -->
      <div class="flex flex-col justify-between mb-6 space-y-4 lg:flex-row lg:space-y-0 lg:items-center" v-if="totalAccommodations > 0">
        <div class="flex items-center text-sm text-gray-600">
          <span>{{ totalAccommodations }} hébergement{{ totalAccommodations > 1 ? 's' : '' }} trouvé{{ totalAccommodations > 1 ? 's' : '' }}</span>
          <div v-if="isFiltered" class="ml-3 px-2 py-0.5 bg-benin-yellow-50 text-benin-yellow-800 rounded text-xs font-medium">
            Filtres appliqués
          </div>
        </div>
        
        <div class="flex items-center space-x-3">
          <!-- Sélecteur de tri -->
          <div class="relative">
            <select 
              v-model="sortOption" 
              @change="sortAccommodations"
              class="pl-3 pr-8 py-1.5 text-sm border border-gray-300 rounded-md bg-white focus:ring-1 focus:ring-benin-green focus:border-benin-green appearance-none cursor-pointer text-gray-700"
            >
              <option value="recommended">Recommandés</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="rating-desc">Meilleures notes</option>
              <option value="name-asc">Nom (A-Z)</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <i class="text-gray-500 fas fa-chevron-down"></i>
            </div>
          </div>
          
          <!-- Sélecteur d'affichage -->
          <div class="flex">
            <button
              @click="viewMode = 'grid'"
              class="flex items-center px-3 py-1.5 transition-colors duration-300 border rounded-l-md"
              :class="viewMode === 'grid' ? 'bg-benin-green text-white border-benin-green' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'"
            >
              <i class="fas fa-th-large"></i>
            </button>
            <button
              @click="viewMode = 'list'"
              class="flex items-center px-3 py-1.5 transition-colors duration-300 border rounded-r-md border-l-0"
              :class="viewMode === 'list' ? 'bg-benin-green text-white border-benin-green' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'"
            >
              <i class="fas fa-list"></i>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Vue grille -->
      <transition-group
        name="accommodations-transition"
        tag="div"
        :class="viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'"
      >
        <div 
          v-for="(accommodation, index) in sortedAccommodations" 
          :key="accommodation.id"
          class="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-500 hover:shadow-xl transform-gpu hover:translate-y-[-5px] group"
          :class="{'opacity-0': animationDelays, 'flex flex-col md:flex-row': viewMode === 'list'}"
          :style="animationDelays ? `animation: fadeInUp 0.6s ${index * 0.1}s forwards ease-out` : ''"
          ref="accommodationCards"
        >
          <!-- Image avec indicateurs -->
          <div class="relative" :class="viewMode === 'list' ? 'md:w-2/5' : ''">
            <div class="aspect-w-16 aspect-h-10 overflow-hidden">
              <img 
                :src="accommodation.image" 
                :alt="accommodation.name" 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              >
            </div>
            
            <!-- Badges -->
            <div class="absolute top-3 left-3 flex gap-2">
              <span 
                v-if="accommodation.type" 
                class="py-1 px-2 text-xs font-medium rounded-full opacity-90 backdrop-blur-sm"
                :class="getTypeClass(accommodation.type)"
              >
                {{ accommodation.type }}
              </span>
              <span 
                v-if="accommodation.isNew" 
                class="bg-benin-red text-white py-1 px-2 text-xs font-medium rounded-full opacity-90 backdrop-blur-sm"
              >
                Nouveau
              </span>
            </div>
            
            <!-- Étoiles -->
            <div class="absolute top-3 right-3 flex items-center bg-white bg-opacity-90 rounded-full py-1 px-2 shadow-sm backdrop-blur-sm">
              <div class="flex">
                <i 
                  v-for="i in 5" 
                  :key="i" 
                  :class="[
                    'text-xs', 
                    i <= accommodation.stars ? 'fas fa-star text-benin-yellow' : 'far fa-star text-gray-300'
                  ]"
                ></i>
              </div>
            </div>
            
            <!-- Prix -->
            <div class="absolute bottom-3 right-3 bg-benin-green text-white font-bold py-1 px-3 rounded-lg text-sm shadow-sm">
              {{ accommodation.price }}€ <span class="text-xs font-normal opacity-90">/ nuit</span>
            </div>
            
            <!-- Bouton de favoris -->
            <button 
              @click="toggleFavorite(accommodation.id)"
              class="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-white bg-opacity-90 shadow-sm flex items-center justify-center transition-colors duration-300"
              :class="favorites.includes(accommodation.id) ? 'text-benin-red' : 'text-gray-400 hover:text-benin-red'"
            >
              <i :class="favorites.includes(accommodation.id) ? 'fas fa-heart' : 'far fa-heart'"></i>
            </button>
          </div>
          
          <!-- Informations -->
          <div class="p-4" :class="viewMode === 'list' ? 'md:w-3/5 flex flex-col' : ''">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-lg font-semibold text-gray-800 group-hover:text-benin-green transition-colors duration-300">
                {{ accommodation.name }}
              </h3>
              <div class="flex items-center bg-benin-green-50 text-benin-green px-1.5 py-0.5 rounded text-xs">
                <span class="font-semibold mr-1">{{ accommodation.rating }}</span>
                <span>{{ getRatingText(accommodation.rating) }}</span>
              </div>
            </div>
            
            <div class="flex items-center text-gray-500 text-sm mb-3">
              <i class="fas fa-map-marker-alt text-benin-green mr-2"></i>
              {{ accommodation.location }}
            </div>
            
            <p class="text-gray-600 text-sm mb-4" :class="viewMode === 'list' ? '' : 'line-clamp-2'">
              {{ accommodation.description }}
            </p>
            
            <div class="flex flex-wrap gap-2 mb-4">
              <div 
                v-for="(feature, i) in accommodation.features.slice(0, viewMode === 'list' ? 6 : 4)" 
                :key="i"
                class="text-xs text-gray-600 py-1 px-2 bg-gray-100 rounded-lg flex items-center"
              >
                <i :class="`fas ${feature.icon} text-benin-green mr-1`"></i>
                {{ feature.text }}
              </div>
            </div>
            
            <div class="mt-auto flex items-center" :class="viewMode === 'list' ? 'justify-between' : ''">
              <a
                href="hebergement/royal-palm-hotel-spa"
                class="inline-flex items-center text-benin-green hover:text-benin-green-600 font-medium text-sm transition-colors duration-300"
              >
                Voir les détails
                <i class="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform duration-300"></i>
              </a>
              
              <button 
                v-if="viewMode === 'list'"
                class="px-4 py-1.5 text-white text-sm font-medium rounded-lg bg-benin-green hover:bg-benin-green-600 transition-colors duration-300"
              >
                Réserver
              </button>
            </div>
          </div>
        </div>
      </transition-group>
      
      <!-- Pagination -->
      <div class="flex justify-center mt-12" v-if="totalPages > 1">
        <div class="flex items-center space-x-2">
          <button 
            @click="prevPage" 
            :disabled="currentPage === 1"
            class="w-10 h-10 rounded-lg border flex items-center justify-center transition-colors duration-300"
            :class="currentPage === 1 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-200 text-gray-400 hover:bg-gray-50'"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          
          <!-- Première page -->
          <button 
            v-if="totalPages > 4 && currentPage > 3" 
            @click="goToPage(1)"
            class="w-10 h-10 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors duration-300"
          >1</button>
          
          <!-- Ellipsis de début -->
          <span v-if="totalPages > 4 && currentPage > 3" class="text-gray-400">...</span>
          
          <!-- Pages avant la page actuelle -->
          <button 
            v-for="page in getPaginationRange()" 
            :key="page" 
            @click="goToPage(page)"
            class="w-10 h-10 rounded-lg font-medium transition-colors duration-300"
            :class="page === currentPage ? 'bg-benin-green text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'"
          >{{ page }}</button>
          
          <!-- Ellipsis de fin -->
          <span v-if="totalPages > 4 && currentPage < totalPages - 2" class="text-gray-400">...</span>
          
          <!-- Dernière page -->
          <button 
            v-if="totalPages > 4 && currentPage < totalPages - 2"
            @click="goToPage(totalPages)"
            class="w-10 h-10 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors duration-300"
          >{{ totalPages }}</button>
          
          <button 
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="w-10 h-10 rounded-lg border flex items-center justify-center transition-colors duration-300"
            :class="currentPage === totalPages ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-gray-200 text-gray-400 hover:bg-gray-50'"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, provide } from 'vue';
import { useAccommodationStore } from '../../stores/accommodationStore';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'AccommodationListing',
  
  setup() {
    const store = useAccommodationStore();
    const animationDelays = ref(true);
    const viewMode = ref('grid');
    const sortOption = ref('recommended');
    const accommodationCards = ref([]);
    
    // Favoris (simulés en local pour la démo)
    const favorites = ref([]);
    
    // Calculer si des filtres sont appliqués
    const isFiltered = computed(() => {
      const filters = store.filters;
      return (
        filters.accommodationType !== '' ||
        filters.destination !== '' ||
        filters.priceRange < 500 ||
        filters.stars !== null ||
        filters.dateFrom !== '' ||
        filters.dateTo !== '' ||
        filters.amenities.length > 0 ||
        filters.services.length > 0 ||
        filters.rating !== null ||
        filters.search !== ''
      );
    });
    
    // Tri des hébergements
    const sortedAccommodations = computed(() => {
      let sorted = [...store.paginatedAccommodations];
      
      switch (sortOption.value) {
        case 'price-asc':
          sorted.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          sorted.sort((a, b) => b.price - a.price);
          break;
        case 'rating-desc':
          sorted.sort((a, b) => b.rating - a.rating);
          break;
        case 'name-asc':
          sorted.sort((a, b) => a.name.localeCompare(b.name));
          break;
        // Par défaut, utiliser l'ordre recommandé (celui de l'API)
        default:
          // Aucun tri supplémentaire
          break;
      }
      
      return sorted;
    });
    
    // Appliquer un tri et réinitialiser le scroll
    const sortAccommodations = () => {
      // Une réinitialisation de la page pourrait être ajoutée ici si nécessaire
      // setTimeout(() => {
      //   window.scrollTo({
      //     top: document.getElementById('results-section').offsetTop - 100,
      //     behavior: 'smooth'
      //   });
      // }, 100);
    };
    
    // Toggle un hébergement dans les favoris
    const toggleFavorite = (id) => {
      const index = favorites.value.indexOf(id);
      if (index === -1) {
        favorites.value.push(id);
        
        // Animation de cœur
        gsap.fromTo(`#heart-${id}`,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
        );
      } else {
        favorites.value.splice(index, 1);
      }
      
      // Stocker dans localStorage (optionnel)
      localStorage.setItem('benin-favorites', JSON.stringify(favorites.value));
    };
    
    // Obtenir la plage de pages à afficher pour la pagination
    const getPaginationRange = () => {
      const range = [];
      
      if (store.totalPages <= 5) {
        // Afficher toutes les pages si moins de 5 pages
        for (let i = 1; i <= store.totalPages; i++) {
          range.push(i);
        }
      } else {
        // Logique pour afficher la plage autour de la page actuelle
        let start = Math.max(1, store.currentPage - 1);
        let end = Math.min(store.totalPages, start + 2);
        
        // Ajuster si proche de la fin
        if (end === store.totalPages) {
          start = Math.max(1, end - 2);
        }
        
        for (let i = start; i <= end; i++) {
          range.push(i);
        }
      }
      
      return range;
    };
    
    // Navigation de page
    const goToPage = (page) => {
      store.goToPage(page);
      scrollToTop();
    };
    
    const nextPage = () => {
      if (store.currentPage < store.totalPages) {
        store.goToPage(store.currentPage + 1);
        scrollToTop();
      }
    };
    
    const prevPage = () => {
      if (store.currentPage > 1) {
        store.goToPage(store.currentPage - 1);
        scrollToTop();
      }
    };
    
    // Défilement vers le haut lors du changement de page
    const scrollToTop = () => {
      const accommodationListElement = document.getElementById('accommodation');
    if (accommodationListElement) {
      const yOffset = -100; // 100px de plus vers le haut
      const y = accommodationListElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
      
    };
    
    // Classes pour les types d'hébergements
    const getTypeClass = (type) => {
      const classes = {
        'Hôtel': 'bg-ocean-50 text-ocean-600',
        'Villa': 'bg-benin-green-50 text-benin-green-600',
        'Écolodge': 'bg-emerald-50 text-emerald-600',
        'Appartement': 'bg-amber-50 text-amber-600',
        'Maison d\'hôtes': 'bg-purple-50 text-purple-600',
        'Resort': 'bg-blue-50 text-blue-600',
        'Bungalow': 'bg-orange-50 text-orange-600',
        'Ferme': 'bg-lime-50 text-lime-600'
      };
      
      return classes[type] || 'bg-gray-100 text-gray-600';
    };
    
    // Texte descriptif pour les notes
    const getRatingText = (rating) => {
      if (rating >= 9) return 'Excellent';
      if (rating >= 8) return 'Très bien';
      if (rating >= 7) return 'Bien';
      return 'Correct';
    };
    
    // Réinitialiser les filtres
    const resetFilters = () => {
      store.resetFilters();
    };
    
    // Charger les favoris depuis localStorage au montage
    onMounted(() => {
      // Désactiver les délais d'animation après le rendu initial
      setTimeout(() => {
        animationDelays.value = false;
      }, 2000);
      
      // Récupérer les favoris du localStorage
      const storedFavorites = localStorage.getItem('benin-favorites');
      if (storedFavorites) {
        favorites.value = JSON.parse(storedFavorites);
      }
      
      // Si store ne contient pas de données, les charger
      if (store.accommodations.length === 0) {
        store.fetchAccommodations();
      }
      
      // Configurer les animations de scroll
      setTimeout(() => {
        if (accommodationCards.value.length) {
          gsap.fromTo(accommodationCards.value,
            { y: 20, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.6,
              stagger: 0.1,
              scrollTrigger: {
                trigger: accommodationCards.value[0],
                start: "top bottom-=100",
                toggleActions: "play none none none"
              }
            }
          );
        }
      }, 500);
    });
    
    // Fournir des valeurs pour les composants enfants
    provide('favorites', favorites);
    
    return {
      animationDelays,
      viewMode,
      sortOption,
      sortedAccommodations,
      favorites,
      isFiltered,
      accommodationCards,
      
      // Propriétés du store
      isLoading: computed(() => store.isLoading),
      error: computed(() => store.error),
      totalAccommodations: computed(() => store.totalAccommodations),
      currentPage: computed(() => store.currentPage),
      totalPages: computed(() => store.totalPages),
      
      // Méthodes
      getTypeClass,
      getRatingText,
      toggleFavorite,
      sortAccommodations,
      goToPage,
      nextPage,
      prevPage,
      getPaginationRange,
      fetchAccommodations: store.fetchAccommodations,
      resetFilters
    };
  }
};
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Transition entre les modes d'affichage */
.accommodations-transition-move {
  transition: transform 0.6s ease-out;
}

.accommodations-transition-enter-active {
  transition: all 0.6s ease-out;
}

.accommodations-transition-leave-active {
  transition: all 0.6s ease-in;
  position: absolute;
  z-index: -1;
}

.accommodations-transition-enter-from,
.accommodations-transition-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>