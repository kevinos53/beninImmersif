<template>
  <div class="container px-4 mx-auto" id="results-section">
    <div 
      class="relative p-4 bg-white shadow rounded-xl overflow-hidden transition-all duration-500"
      :class="{ 'filters-expanded': filtersExpanded, 'shadow-lg': filtersActive }"
      :style="filtersActive ? 'border-bottom: 3px solid #008651;' : ''"
    >
      <!-- Filtres visibles -->
      <div class="flex flex-col items-stretch justify-between gap-4 lg:flex-row">
        <!-- Type d'hébergement -->
        <div class="flex-1">
          <div class="relative group">
            <label class="block mb-1 text-xs font-medium text-gray-600 transition duration-300 group-hover:text-benin-green">
              Type d'hébergement
            </label>
            <div class="relative">
              <select 
                v-model="filters.accommodationType"
                class="w-full h-[45px] py-2.5 pl-3 pr-10 text-gray-800 transition-all duration-300 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-benin-green focus:border-transparent focus:outline-none hover:border-benin-green cursor-pointer"
                @change="applyFilters"
              >
                <option value="">Tous types</option>
                <option v-for="type in accommodationTypes" :key="type" :value="type">
                  {{ type }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none transition-transform duration-300" :class="{'translate-y-[-2px]': filters.accommodationType}">
                <i class="fas fa-chevron-down text-benin-green" :class="{'text-benin-green-600': filters.accommodationType}"></i>
              </div>
              <div 
                v-if="filters.accommodationType" 
                class="absolute -top-1 right-10 px-1.5 py-0.5 text-[10px] bg-benin-green text-white rounded-full"
              >1</div>
            </div>
          </div>
        </div>
        
        <!-- Destination -->
        <div class="flex-1">
          <div class="relative group">
            <label class="block mb-1 text-xs font-medium text-gray-600 transition duration-300 group-hover:text-benin-green">
              Destination
            </label>
            <div class="relative">
              <select 
                v-model="filters.destination"
                class="w-full h-[45px] py-2.5 pl-3 pr-10 text-gray-800 transition-all duration-300 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-benin-green focus:border-transparent focus:outline-none hover:border-benin-green cursor-pointer"
                @change="applyFilters"
              >
                <option value="">Toutes destinations</option>
                <option v-for="destination in destinations" :key="destination.value" :value="destination.value">
                  {{ destination.label }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none transition-transform duration-300" :class="{'translate-y-[-2px]': filters.destination}">
                <i class="fas fa-chevron-down text-benin-green" :class="{'text-benin-green-600': filters.destination}"></i>
              </div>
              <div 
                v-if="filters.destination" 
                class="absolute -top-1 right-10 px-1.5 py-0.5 text-[10px] bg-benin-green text-white rounded-full"
              >1</div>
            </div>
          </div>
        </div>
        
        <!-- Prix -->
        <div class="flex-1">
          <div class="relative group">
            <label class="block mb-1 text-xs font-medium text-gray-600 transition duration-300 group-hover:text-benin-green">
              Budget par nuit ({{ filters.priceRange }}€ max)
            </label>
            <div class="flex items-center h-[45px] mt-1"> <!-- Hauteur fixe et marge supérieure -->
              <input 
                type="range" 
                min="0" 
                max="500" 
                step="10" 
                v-model="filters.priceRange"
                @change="applyFilters"
                class="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-benin-green focus:outline-none"
              >
              <span class="w-16 ml-3 text-sm font-medium text-gray-800 transition-colors duration-300" :class="{'text-benin-green': filters.priceRange < 500}">
                {{ filters.priceRange }}€
              </span>
            </div>
          </div>
        </div>
        
        <!-- Dates -->
        <div class="flex flex-1 space-x-2">
          <div class="w-1/2 group">
            <label class="block mb-1 text-xs font-medium text-gray-600 transition duration-300 group-hover:text-benin-green">
              Arrivée
            </label>
            <div class="relative">
              <i class="absolute left-3 top-1/2 transform -translate-y-1/2 fas fa-calendar-alt text-benin-green"></i>
              <input 
                type="date" 
                v-model="filters.dateFrom"
                @change="applyFilters"
                class="w-full h-[45px] py-2 pl-10 pr-2 text-gray-800 transition-all duration-300 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-benin-green focus:border-transparent focus:outline-none hover:border-benin-green"
              >
              <!-- Overlay pour formater la date -->
              <div v-if="!filters.dateFrom" class="absolute hidden left-10 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                jj/mm/aaaa
              </div>
            </div>
          </div>
          <div class="w-1/2 group">
            <label class="block mb-1 text-xs font-medium text-gray-600 transition duration-300 group-hover:text-benin-green">
              Départ
            </label>
            <div class="relative">
              <i class="absolute left-3 top-1/2 transform -translate-y-1/2 fas fa-calendar-alt text-benin-green"></i>
              <input 
                type="date" 
                v-model="filters.dateTo"
                @change="applyFilters"
                class="w-full h-[45px] py-2 pl-10 pr-2 text-gray-800 transition-all duration-300 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-benin-green focus:border-transparent focus:outline-none hover:border-benin-green"
              >
              <!-- Overlay pour formater la date -->
              <div v-if="!filters.dateTo" class="absolute hidden left-10 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                jj/mm/aaaa
              </div>
            </div>
          </div>
        </div>
        
        <!-- Bouton Rechercher + filtres avancés -->
        <div class="flex-1 flex flex-col justify-end">
          <button 
            @click="applyFilters" 
            class="w-full h-[45px] font-medium text-white transition-all duration-500 relative overflow-hidden rounded-lg hover:shadow-md"
          >
            <span class="absolute inset-0 bg-benin-green transition-all duration-300 ease-out"></span>
            <span class="absolute inset-0 opacity-0 transition-opacity duration-300 ease-out bg-gradient-to-r from-benin-green to-benin-green-600 group-hover:opacity-100"></span>
            <span class="relative flex items-center justify-center text-base transition-transform duration-300 hover:-translate-y-1">
              <i class="mr-2 fas fa-search"></i> Rechercher
            </span>
            <!-- Effet de pulsation -->
            <span v-if="filtersChanged" class="absolute inset-0 bg-white rounded-lg animate-ping-subtle"></span>
          </button>
          
          <button 
            class="mt-2 text-xs text-center transition-colors duration-300 text-benin-green hover:text-benin-green-600 flex items-center justify-center"
            @click="filtersExpanded = !filtersExpanded"
          >
            <span v-if="!filtersExpanded">
              <i class="mr-1 fas fa-sliders-h"></i> Plus de filtres
              <span v-if="activeAdvancedFiltersCount > 0" class="ml-1 px-1.5 py-0.5 text-[10px] bg-benin-green text-white rounded-full">
                {{ activeAdvancedFiltersCount }}
              </span>
            </span>
            <span v-else>
              <i class="mr-1 fas fa-chevron-up"></i> Moins de filtres
            </span>
          </button>
        </div>
      </div>
      
      <!-- Filtres avancés (déroulants) -->
      <div 
        v-show="filtersExpanded"
        class="grid grid-cols-1 gap-6 pt-6 mt-6 border-t border-gray-200 md:grid-cols-2 lg:grid-cols-4"
        ref="advancedFiltersPanel"
      >
        <!-- Équipements -->
        <div>
          <h4 class="mb-3 text-sm font-medium text-gray-800 font-display">Équipements</h4>
          <div class="grid grid-cols-2 gap-2">
            <label v-for="amenity in amenities" :key="amenity.value" class="flex items-center text-gray-600 cursor-pointer hover:text-benin-green transition-colors duration-300">
              <input 
                type="checkbox" 
                :value="amenity.value" 
                v-model="filters.amenities"
                @change="applyFilters"
                class="mr-2 accent-benin-green"
              >
              {{ amenity.label }}
            </label>
          </div>
        </div>
        
        <!-- Services -->
        <div>
          <h4 class="mb-3 text-sm font-medium text-gray-800 font-display">Services</h4>
          <div class="grid grid-cols-2 gap-2">
            <label v-for="service in services" :key="service.value" class="flex items-center text-gray-600 cursor-pointer hover:text-benin-green transition-colors duration-300">
              <input 
                type="checkbox" 
                :value="service.value" 
                v-model="filters.services"
                @change="applyFilters"
                class="mr-2 accent-benin-green"
              >
              {{ service.label }}
            </label>
          </div>
        </div>
        
        <!-- Nombre d'étoiles -->
        <div>
          <h4 class="mb-3 text-sm font-medium text-gray-800 font-display">Étoiles</h4>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="i in 5" 
              :key="`star-${i}`"
              class="flex items-center px-3 py-1 text-sm transition-colors duration-300 border rounded-full"
              :class="{ 'bg-benin-green text-white border-benin-green hover:bg-benin-green-600': filters.stars === i, 'text-gray-700 border-gray-300 hover:border-benin-green': filters.stars !== i }"
              @click="toggleStars(i)"
            >
              {{ i }} <i class="ml-1 text-xs fas fa-star"></i>
            </button>
          </div>
        </div>
        
        <!-- Notes des voyageurs -->
        <div>
          <h4 class="mb-3 text-sm font-medium text-gray-800 font-display">Notes voyageurs</h4>
          <div class="space-y-2">
            <label class="flex items-center text-gray-600 cursor-pointer hover:text-benin-green transition-colors duration-300">
              <input 
                type="radio" 
                name="rating" 
                :value="8"
                v-model="filters.rating"
                @change="applyFilters"
                class="mr-2 accent-benin-green"
              >
              Excellent (8+)
            </label>
            <label class="flex items-center text-gray-600 cursor-pointer hover:text-benin-green transition-colors duration-300">
              <input 
                type="radio" 
                name="rating" 
                :value="7"
                v-model="filters.rating"
                @change="applyFilters"
                class="mr-2 accent-benin-green"
              >
              Très bien (7+)
            </label>
            <label class="flex items-center text-gray-600 cursor-pointer hover:text-benin-green transition-colors duration-300">
              <input 
                type="radio" 
                name="rating" 
                :value="6"
                v-model="filters.rating"
                @change="applyFilters"
                class="mr-2 accent-benin-green"
              >
              Bien (6+)
            </label>
          </div>
          
          <div class="mt-4 pt-2 flex justify-between items-center border-t border-gray-200">
            <button 
              @click="resetFilters" 
              class="text-sm text-gray-500 hover:text-benin-red transition-colors duration-300 flex items-center"
            >
              <i class="mr-1 fas fa-times-circle"></i> Réinitialiser
            </button>
            
            <span class="text-xs px-2 py-1 rounded-full bg-benin-green-50 text-benin-green">
              {{ filtersInfo }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- Badges de filtres actifs -->
      <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mt-4 pt-3 border-t border-gray-100">
        <div
          v-for="(filter, index) in activeFiltersList"
          :key="index"
          class="flex items-center px-2 py-1 text-xs bg-benin-green-50 text-benin-green rounded-full hover:bg-benin-green-100 transition-colors duration-300 group animate-fadeIn"
        >
          <span>{{ filter.label }}: <strong>{{ filter.value }}</strong></span>
          <button 
            @click="removeFilter(filter.key)"
            class="ml-1 w-4 h-4 flex items-center justify-center bg-benin-green text-white rounded-full hover:bg-benin-red transition-all duration-300 transform group-hover:rotate-90"
          >
            <i class="fas fa-times text-[8px]"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import { useAccommodationStore } from '../../stores/accommodationStore';
import { pinia } from '../../stores';
import { gsap } from 'gsap';

export default {
  name: 'AccommodationFilters',
  
  setup() {
    const store = useAccommodationStore(pinia);
    const filtersExpanded = ref(false);
    const filtersChanged = ref(false);
    const advancedFiltersPanel = ref(null);
    
    // Initialiser les filtres depuis le store
    const filters = computed(() => store.filters);
    
    // Données pour les filtres
    const accommodationTypes = [
      'Hôtel',
      'Villa',
      'Appartement',
      'Écolodge',
      'Maison d\'hôtes',
      'Resort',
      'Bungalow',
      'Ferme'
    ];
    
    const destinations = [
      { value: 'cotonou', label: 'Cotonou' },
      { value: 'porto-novo', label: 'Porto-Novo' },
      { value: 'ouidah', label: 'Ouidah' },
      { value: 'ganvie', label: 'Ganvié' },
      { value: 'abomey', label: 'Abomey' },
      { value: 'natitingou', label: 'Natitingou' },
      { value: 'grand-popo', label: 'Grand-Popo' },
      { value: 'parakou', label: 'Parakou' },
      { value: 'pendjari', label: 'Parc de la Pendjari' },
      { value: 'dassa', label: 'Dassa-Zoumé' },
      { value: 'nokoue', label: 'Lac Nokoué' },
      { value: 'aheme', label: 'Lac Ahémé' }
    ];
    
    const amenities = [
      { value: 'wifi', label: 'Wi-Fi' },
      { value: 'pool', label: 'Piscine' },
      { value: 'air-conditioning', label: 'Climatisation' },
      { value: 'breakfast', label: 'Petit déjeuner' },
      { value: 'parking', label: 'Parking' },
      { value: 'restaurant', label: 'Restaurant' },
      { value: 'beach-access', label: 'Accès plage' },
      { value: 'kitchen', label: 'Cuisine équipée' }
    ];
    
    const services = [
      { value: 'room-service', label: 'Room service' },
      { value: 'airport-shuttle', label: 'Navette aéroport' },
      { value: 'spa', label: 'Spa' },
      { value: 'guided-tours', label: 'Excursions' },
      { value: 'cultural-activities', label: 'Activités culturelles' },
      { value: 'water-sports', label: 'Sports nautiques' }
    ];
    
    // Nombre de filtres avancés actifs
    const activeAdvancedFiltersCount = computed(() => {
      let count = 0;
      if (filters.value.stars) count++;
      if (filters.value.rating) count++;
      count += filters.value.amenities.length;
      count += filters.value.services.length;
      return count;
    });
    
    // Vérifier si des filtres sont actifs
    const filtersActive = computed(() => {
      return (
        filters.value.accommodationType ||
        filters.value.destination ||
        filters.value.priceRange < 500 ||
        filters.value.stars ||
        filters.value.dateFrom ||
        filters.value.dateTo ||
        filters.value.amenities.length > 0 ||
        filters.value.services.length > 0 ||
        filters.value.rating
      );
    });
    
    // Information sur les filtres (nombre d'hébergements)
    const filtersInfo = computed(() => {
      return `${store.totalAccommodations} hébergement${store.totalAccommodations > 1 ? 's' : ''}`;
    });
    
    // Liste des filtres actifs pour l'affichage
    const hasActiveFilters = computed(() => {
      return activeFiltersList.value.length > 0;
    });
    
    const activeFiltersList = computed(() => {
      const list = [];
      
      if (filters.value.accommodationType) {
        list.push({
          key: 'accommodationType',
          label: 'Type',
          value: filters.value.accommodationType
        });
      }
      
      if (filters.value.destination) {
        const dest = destinations.find(d => d.value === filters.value.destination);
        list.push({
          key: 'destination',
          label: 'Destination',
          value: dest ? dest.label : filters.value.destination
        });
      }
      
      if (filters.value.priceRange < 500) {
        list.push({
          key: 'priceRange',
          label: 'Budget max',
          value: `${filters.value.priceRange}€`
        });
      }
      
      if (filters.value.stars) {
        list.push({
          key: 'stars',
          label: 'Étoiles',
          value: `${filters.value.stars}★`
        });
      }
      
      if (filters.value.dateFrom) {
        list.push({
          key: 'dateFrom',
          label: 'Arrivée',
          value: new Date(filters.value.dateFrom).toLocaleDateString()
        });
      }
      
      if (filters.value.dateTo) {
        list.push({
          key: 'dateTo',
          label: 'Départ',
          value: new Date(filters.value.dateTo).toLocaleDateString()
        });
      }
      
      if (filters.value.rating) {
        const ratingLabels = {
          8: 'Excellent (8+)',
          7: 'Très bien (7+)',
          6: 'Bien (6+)'
        };
        list.push({
          key: 'rating',
          label: 'Note',
          value: ratingLabels[filters.value.rating]
        });
      }
      
      // Ajouter les équipements sélectionnés
      filters.value.amenities.forEach(amenity => {
        const amenityObj = amenities.find(a => a.value === amenity);
        if (amenityObj) {
          list.push({
            key: `amenity-${amenity}`,
            label: 'Équipement',
            value: amenityObj.label
          });
        }
      });
      
      // Ajouter les services sélectionnés
      filters.value.services.forEach(service => {
        const serviceObj = services.find(s => s.value === service);
        if (serviceObj) {
          list.push({
            key: `service-${service}`,
            label: 'Service',
            value: serviceObj.label
          });
        }
      });
      
      return list;
    });
    
    // Appliquer les filtres
    const applyFilters = () => {
      store.applyFilters();
      showFilterChangedEffect();
    };
    
    // Afficher un effet visuel pour indiquer un changement de filtre
    const showFilterChangedEffect = () => {
      filtersChanged.value = true;
      setTimeout(() => {
        filtersChanged.value = false;
      }, 600);
    };
    
    // Réinitialiser tous les filtres
    const resetFilters = () => {
      store.resetFilters();
      showFilterChangedEffect();
    };
    
    // Supprimer un filtre spécifique
    const removeFilter = (key) => {
      // Gérer les cas spéciaux pour les équipements et services
      if (key.startsWith('amenity-')) {
        const amenity = key.replace('amenity-', '');
        filters.value.amenities = filters.value.amenities.filter(a => a !== amenity);
      } 
      else if (key.startsWith('service-')) {
        const service = key.replace('service-', '');
        filters.value.services = filters.value.services.filter(s => s !== service);
      }
      else {
        // Réinitialiser les autres filtres
        filters.value[key] = key === 'priceRange' ? 500 : (Array.isArray(filters.value[key]) ? [] : '');
      }
      
      store.applyFilters();
      showFilterChangedEffect();
    };
    
    // Toggle le filtre des étoiles
    const toggleStars = (stars) => {
      if (filters.value.stars === stars) {
        filters.value.stars = null;
      } else {
        filters.value.stars = stars;
      }
      applyFilters();
    };
    
    // Animation de l'expansion des filtres avancés
    watch(filtersExpanded, (newValue) => {
      if (newValue && advancedFiltersPanel.value) {
        gsap.fromTo(advancedFiltersPanel.value, 
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
        );
      }
    });
    
    // Charger les données au montage
    onMounted(() => {
      store.fetchAccommodations();
    });
    
    return {
      filters,
      filtersExpanded,
      filtersChanged,
      filtersActive,
      filtersInfo,
      advancedFiltersPanel,
      accommodationTypes,
      destinations,
      amenities,
      services,
      activeAdvancedFiltersCount,
      activeFiltersList,
      hasActiveFilters,
      applyFilters,
      resetFilters,
      removeFilter,
      toggleStars
    };
  }
};
</script>

<style scoped>
.filters-expanded {
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

/* Personnalisation des inputs de type range */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: #008651;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 0 3px rgba(0, 134, 81, 0.2);
  transition: all 0.3s ease;
}

input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 0 0 5px rgba(0, 134, 81, 0.3);
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #008651;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 0 3px rgba(0, 134, 81, 0.2);
  transition: all 0.3s ease;
}

input[type="range"]::-moz-range-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 0 0 5px rgba(0, 134, 81, 0.3);
}

/* Animation d'apparition des badges de filtre */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

/* Animation de pulsation subtile */
@keyframes ping-subtle {
  0% {
    opacity: 0.2;
    transform: scale(0.95);
  }
  50% {
    opacity: 0;
    transform: scale(1.05);
  }
  100% {
    opacity: 0;
    transform: scale(1.1);
  }
}

.animate-ping-subtle {
  animation: ping-subtle 0.6s cubic-bezier(0, 0, 0.2, 1);
}

/* Styles pour corriger les incohérences d'affichage des champs de date */
input[type="date"] {
  color-scheme: light;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0; /* Masquer l'icône par défaut pour utiliser notre propre icône */
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
</style>