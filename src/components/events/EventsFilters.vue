<template>
  <aside class="sticky w-full overflow-hidden bg-white rounded-lg shadow-sm top-24">
    <div class="p-4 border-b">
      <h3 class="flex items-center text-lg font-semibold text-gray-800">
        <i class="mr-2 fas fa-filter text-benin-green"></i>
        Filtrer les événements
      </h3>
      <button 
        @click="resetAllFilters" 
        class="flex items-center mt-2 text-sm transition text-benin-red hover:text-benin-red-600"
      >
        <i class="mr-1 fas fa-undo-alt"></i>
        Réinitialiser tous les filtres
      </button>
    </div>
              
    <!-- Filtre par dates -->
    <div class="p-4 border-b">
      <h4 class="mb-3 font-medium text-gray-800">Dates</h4>
              
      <div class="flex flex-col gap-4">
        <div class="relative">
          <label class="block mb-1 text-sm text-gray-600">Du</label>
          <div class="relative">
            <input 
              v-model="localStartDate" 
              type="date" 
              class="w-full py-2 pl-8 transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-benin-green/20 focus:border-benin-green"
              :min="today"
              @change="applyDateFilter"
            />
            <i class="absolute text-gray-400 -translate-y-1/2 fas fa-calendar-alt left-3 top-1/2"></i>
          </div>
        </div>
        
        <div class="relative">
          <label class="block mb-1 text-sm text-gray-600">Au</label>
          <div class="relative">
            <input 
              v-model="localEndDate" 
              type="date" 
              class="w-full py-2 pl-8 transition border border-gray-300 rounded-lg focus:ring-2 focus:ring-benin-green/20 focus:border-benin-green"
              :min="localStartDate || today"
              @change="applyDateFilter"
            />
            <i class="absolute text-gray-400 -translate-y-1/2 fas fa-calendar-alt left-3 top-1/2"></i>
          </div>
        </div>
      </div>
    </div>
        
    <!-- Filtre par catégories -->
    <div class="p-4 border-b" v-if="categories.length > 0">
      <div class="flex items-center justify-between mb-3">
        <h4 class="font-medium text-gray-800">Catégories</h4>
        <button 
          v-if="selectedCategoriesData.length > 0"
          @click="resetCategoryFilter" 
          class="text-xs transition text-benin-red hover:text-benin-red-600"
        >
          Réinitialiser
        </button>
      </div>
      
      <div class="space-y-2">
        <label 
          v-for="category in categories" 
          :key="category" 
          class="flex items-center px-2 py-1 transition rounded cursor-pointer hover:bg-gray-50"
        >
          <input 
            type="checkbox" 
            :value="category" 
            v-model="localSelectedCategories"
            @change="updateCategoryFilter"
            class="w-4 h-4 border-gray-300 rounded text-benin-green focus:ring-benin-green/20"
          />
          <span 
            class="ml-2 text-sm font-medium"
            :class="getCategoryClass(category)"
          >
            {{ category }}
          </span>
          <span class="ml-auto text-xs text-gray-500">
            {{ getCategoryCount(category) }}
          </span>
        </label>
      </div>
    </div>
            
    <!-- Filtre par régions -->
    <div class="p-4 border-b" v-if="regions.length > 0">
      <div class="flex items-center justify-between mb-3">
        <h4 class="font-medium text-gray-800">Régions</h4>
        <button 
          v-if="selectedRegionsData.length > 0"
          @click="resetRegionFilter" 
          class="text-xs transition text-benin-red hover:text-benin-red-600"
        >
          Réinitialiser
        </button>
      </div>
            
      <div class="space-y-2">
        <label 
          v-for="region in regions" 
          :key="region" 
          class="flex items-center px-2 py-1 transition rounded cursor-pointer hover:bg-gray-50"
        >
          <input 
            type="checkbox" 
            :value="region" 
            v-model="localSelectedRegions"
            @change="updateRegionFilter"
            class="w-4 h-4 border-gray-300 rounded text-benin-green focus:ring-benin-green/20"
          />
          <span class="ml-2 text-sm">{{ region }}</span>
          <span class="ml-auto text-xs text-gray-500">
            {{ getRegionCount(region) }}
          </span>
        </label>
      </div>
    </div>
          
    <!-- Filtre par prix -->
    <div class="p-4">
      <div class="flex items-center justify-between mb-3">
        <h4 class="font-medium text-gray-800">Prix</h4>
        <button 
          v-if="priceRangeData.min !== 0 || priceRangeData.max !== maxPrice"
          @click="resetPriceFilter" 
          class="text-xs transition text-benin-red hover:text-benin-red-600"
        >
          Réinitialiser
        </button>
      </div>
      
      <div class="mb-2">
        <div class="flex justify-between mb-2 text-sm text-gray-600">
          <span>{{ formatPrice(localPriceRange.min) }}</span>
          <span>{{ formatPrice(localPriceRange.max) }}</span>
        </div>
        
        <div class="relative mt-1 price-range-container">
          <div class="h-1 bg-gray-200 rounded-full price-range-track"></div>
          
          <input 
            type="range" 
            v-model.number="localPriceRange.min" 
            :min="0" 
            :max="maxPrice"
            @change="updatePriceFilter"
            class="absolute top-0 left-0 w-full range-input range-min"
          />
          
          <input 
            type="range" 
            v-model.number="localPriceRange.max" 
            :min="0" 
            :max="maxPrice"
            @change="updatePriceFilter"
            class="absolute top-0 left-0 w-full range-input range-max"
          />
        </div>
      </div>
      
      <div class="flex gap-2 mt-4">
        <label class="flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            v-model="localShowFreeOnly"
            @change="updateFreeFilter"
            class="w-4 h-4 border-gray-300 rounded text-benin-green focus:ring-benin-green/20"
          />
          <span class="ml-2 text-sm">Événements gratuits</span>
        </label>
      </div>
    </div>
  </aside>
</template>
  
<script>
import { ref, computed, defineComponent } from 'vue';
import { useStore } from '@nanostores/vue';
import { 
  startDate, 
  endDate, 
  selectedCategories, 
  selectedRegions, 
  priceRange, 
  showFreeOnly, 
  setDateRange,
  setSelectedCategories,
  setSelectedRegions,
  setPriceRange,
  setShowFreeOnly,
  resetFilters,
  allEvents,
  getNumericPrice
} from '../../stores/eventsStore';

export default defineComponent({
  name: 'EventsFilters',
  
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    regions: {
      type: Array,
      default: () => []
    }
  },
  
  setup(props) {
    // Hooks pour les stores
    const startDateStore = useStore(startDate);
    const endDateStore = useStore(endDate);
    const selectedCategoriesStore = useStore(selectedCategories);
    const selectedRegionsStore = useStore(selectedRegions);
    const priceRangeStore = useStore(priceRange);
    const showFreeOnlyStore = useStore(showFreeOnly);
    const allEventsStore = useStore(allEvents);
    
    // Redéfinition sans préfixe $ pour respecter les conventions Vue
    const startDateData = startDateStore;
    const endDateData = endDateStore;
    const selectedCategoriesData = selectedCategoriesStore;
    const selectedRegionsData = selectedRegionsStore;
    const priceRangeData = priceRangeStore;
    const showFreeOnlyData = showFreeOnlyStore;
    const allEventsData = allEventsStore;
    
    // Variables locales pour les filtres
    const localStartDate = ref(startDateData.value || '');
    const localEndDate = ref(endDateData.value || '');
    const localSelectedCategories = ref([...(selectedCategoriesData.value || [])]);
    const localSelectedRegions = ref([...(selectedRegionsData.value || [])]);
    const localPriceRange = ref({...(priceRangeData.value || {min: 0, max: 100000})});
    const localShowFreeOnly = ref(showFreeOnlyData.value || false);
    
    // Date d'aujourd'hui au format YYYY-MM-DD
    const today = computed(() => {
      const date = new Date();
      return date.toISOString().split('T')[0];
    });
    
    // Prix maximum parmi tous les événements - adapté au nouveau format de prix
    const maxPrice = computed(() => {
      if (!allEventsData.value || allEventsData.value.length === 0) return 100000;
      
      // Utiliser la fonction getNumericPrice du store pour une cohérence
      const prices = allEventsData.value.map(event => getNumericPrice(event));
      return Math.ceil(Math.max(...prices, 0));
    });
    
    // Méthodes de filtrage
    const applyDateFilter = () => {
      setDateRange(localStartDate.value, localEndDate.value);
    };
    
    const updateCategoryFilter = () => {
      setSelectedCategories([...localSelectedCategories.value]);
    };
    
    const updateRegionFilter = () => {
      setSelectedRegions([...localSelectedRegions.value]);
    };
    
    const updatePriceFilter = () => {
      setPriceRange({
        min: localPriceRange.value.min,
        max: localPriceRange.value.max
      });
    };
    
    const updateFreeFilter = () => {
      setShowFreeOnly(localShowFreeOnly.value);
    };
    
    // Réinitialisation des filtres
    const resetCategoryFilter = () => {
      localSelectedCategories.value = [];
      setSelectedCategories([]);
    };
    
    const resetRegionFilter = () => {
      localSelectedRegions.value = [];
      setSelectedRegions([]);
    };
    
    const resetPriceFilter = () => {
      localPriceRange.value = { min: 0, max: maxPrice.value };
      setPriceRange({ min: 0, max: maxPrice.value });
      localShowFreeOnly.value = false;
      setShowFreeOnly(false);
    };
    
    const resetAllFilters = () => {
      localStartDate.value = '';
      localEndDate.value = '';
      localSelectedCategories.value = [];
      localSelectedRegions.value = [];
      localPriceRange.value = { min: 0, max: maxPrice.value };
      localShowFreeOnly.value = false;
      resetFilters();
    };
    
    // Fonctions utilitaires
    const formatPrice = (price) => {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
        maximumFractionDigits: 0
      }).format(price);
    };
    
    // Nombre d'événements par catégorie
    const getCategoryCount = (category) => {
      if (!allEventsData.value) return 0;
      return allEventsData.value.filter(event => event.category === category).length;
    };
    
    // Nombre d'événements par région
    const getRegionCount = (region) => {
      if (!allEventsData.value) return 0;
      return allEventsData.value.filter(event => event.region === region).length;
    };
    
    // Classes CSS en fonction de la catégorie
    const getCategoryClass = (category) => {
      const classes = {
        'culturel': 'text-vodou',
        'arts': 'text-benin-green',
        'musique': 'text-ocean',
        'divertissement': 'text-benin-yellow-700',
        'gastronomie': 'text-earth',
        'sport': 'text-fire',
        'technologie': 'text-night'
      };
      
      return classes[category.toLowerCase()] || '';
    };
    
    return {
      // Données du store
      startDateData,
      endDateData,
      selectedCategoriesData,
      selectedRegionsData,
      priceRangeData,
      showFreeOnlyData,
      allEventsData,
      
      // Variables locales
      localStartDate,
      localEndDate,
      localSelectedCategories,
      localSelectedRegions,
      localPriceRange,
      localShowFreeOnly,
      
      // Computed
      today,
      maxPrice,
      
      // Méthodes
      applyDateFilter,
      updateCategoryFilter,
      updateRegionFilter,
      updatePriceFilter,
      updateFreeFilter,
      resetCategoryFilter,
      resetRegionFilter,
      resetPriceFilter,
      resetAllFilters,
      formatPrice,
      getCategoryCount,
      getRegionCount,
      getCategoryClass
    };
  }
});
</script>

<style scoped>
.price-range-container {
  height: 1rem;
}

.price-range-track {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
}

.range-input {
  -webkit-appearance: none;
  appearance: none;
  height: 1rem;
  background: transparent;
  outline: none;
  margin: 0;
}

.range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  background: #0D9488;
  cursor: pointer;
  margin-top: 0;
  border: 2px solid white;
  box-shadow: 0 0 3px rgba(0,0,0,0.2);
  position: relative;
  z-index: 1;
}

.range-input::-moz-range-thumb {
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  background: #0D9488;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 0 3px rgba(0,0,0,0.2);
  position: relative;
  z-index: 1;
}

/* Animation des filtres */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

aside {
  animation: fadeIn 0.4s ease-out;
}
</style>