<template>
  <div class="relative search-container" data-testid="search-container">
    <div 
      class="relative flex items-center"
      :class="{ 'ring-2 ring-benin-green ring-opacity-50': focused }"
    >
      <!-- Icône de recherche -->
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <i 
          class="fas fa-search"
          :class="$isSearching ? 'text-benin-green animate-pulse' : 'text-gray-400'"
        ></i>
      </div>
      
      <!-- Champ de recherche -->
      <input 
        ref="searchInputRef"
        type="text" 
        :placeholder="placeholder"
        :value="$searchQuery"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
        class="block w-full py-2.5 pl-10 pr-14 text-sm text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none transition-shadow duration-200"
        data-testid="search-input"
      />
      
      <!-- Bouton pour effacer la recherche -->
      <div 
        v-if="$searchQuery" 
        class="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <button 
          @click="clearSearch"
          class="p-1 text-gray-400 transition-colors rounded-full hover:text-benin-green hover:bg-gray-100 focus:outline-none"
          type="button"
          aria-label="Effacer la recherche"
          data-testid="clear-search-btn"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
      
    <!-- Résultats de recherche -->
    <div 
      v-if="focused && $searchQuery && limitedResults.length > 0"
      ref="resultsRef"
      class="absolute left-0 right-0 z-20 mt-2 overflow-hidden bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto custom-scrollbar"
      data-testid="search-results"
    >
      <ul class="py-2">
        <li 
          v-for="(result, index) in limitedResults"
          :key="result.id"
          class="result-item"
          @click="selectResult(result)"
          @mouseenter="selectedResultIndex = index"
          :class="[
            'px-4 py-2 cursor-pointer transition-colors duration-150',
            selectedResultIndex === index ? 'bg-benin-green-50' : 'hover:bg-gray-50'
          ]"
          :data-testid="`search-result-${index}`"
        >
          <div class="flex items-start">
            <!-- Icône de calendrier -->
            <div class="flex-shrink-0 w-10 h-10 mr-3 overflow-hidden rounded-md">
              <div class="flex flex-col items-center justify-center w-full h-full bg-benin-green text-white text-xs">
                <span>{{ formatDate(result.date, 'day') }}</span>
                <span>{{ formatDate(result.date, 'month') }}</span>
              </div>
            </div>
            
            <div class="flex-1 min-w-0">
              <!-- Titre avec mise en surbrillance -->
              <div 
                class="font-medium text-gray-800"
                v-html="highlightMatch(result.title, $searchQuery)"
              ></div>
              
              <!-- Lieu et catégorie -->
              <div class="flex items-center mt-1 text-xs text-gray-500">
                <i class="mr-1 fas fa-map-marker-alt text-benin-green-500"></i>
                <span v-html="highlightMatch(result.location, $searchQuery)"></span>
                <span class="mx-2">•</span>
                <span v-html="highlightMatch(result.category, $searchQuery)"></span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
          
    <!-- Message "Aucun résultat" -->
    <div 
      v-else-if="focused && $searchQuery && !$isSearching && limitedResults.length === 0"
      class="absolute left-0 right-0 z-20 p-4 mt-2 text-center bg-white rounded-lg shadow-lg border border-gray-200"
      data-testid="no-results"
    >
      <p class="text-sm text-gray-500">
        Aucun résultat trouvé pour "<span class="font-medium">{{ $searchQuery }}</span>"
      </p>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { useStore } from '@nanostores/vue';
import { 
  searchQuery, 
  setSearchQuery,
  searchResults, 
  selectSearchResult,
  clearSearchQuery,
  isSearching,
  type Event
} from '../../stores/eventsStore';

// Types
interface Props {
  placeholder?: string;
  maxResults?: number;
}

// Props
const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Rechercher...',
  maxResults: 5
});

// États locaux
const focused = ref<boolean>(false);
const searchInputRef = ref<HTMLInputElement | null>(null);
const resultsRef = ref<HTMLElement | null>(null);
const selectedResultIndex = ref<number>(-1);

// Connecter aux stores
const $searchQuery = useStore(searchQuery);
const $searchResults = useStore(searchResults);
const $isSearching = useStore(isSearching);

// Résultats filtrés et limités
const limitedResults = computed<Event[]>(() => {
  return $searchResults.value.slice(0, props.maxResults);
});

// Méthodes
const handleFocus = (): void => {
  focused.value = true;
};

const handleBlur = (): void => {
  // Retarder pour permettre les clics sur les résultats
  setTimeout(() => {
    focused.value = false;
    selectedResultIndex.value = -1;
  }, 200);
};

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  setSearchQuery(target.value);
  selectedResultIndex.value = -1;
};

const handleKeydown = (event: KeyboardEvent): void => {
  switch(event.key) {
    case 'ArrowDown':
      event.preventDefault();
      selectedResultIndex.value = Math.min(
        selectedResultIndex.value + 1,
        limitedResults.value.length - 1
      );
      scrollResultIntoView();
      break;
      
    case 'ArrowUp':
      event.preventDefault();
      selectedResultIndex.value = Math.max(selectedResultIndex.value - 1, -1);
      scrollResultIntoView();
      break;
      
    case 'Enter':
      if (selectedResultIndex.value >= 0 && selectedResultIndex.value < limitedResults.value.length) {
        selectResult(limitedResults.value[selectedResultIndex.value]);
      }
      break;
      
    case 'Escape':
      clearSearch();
      searchInputRef.value?.blur();
      break;
  }
};

const scrollResultIntoView = (): void => {
  nextTick(() => {
    if (resultsRef.value && selectedResultIndex.value >= 0) {
      const selectedEl = resultsRef.value.querySelector(`.result-item:nth-child(${selectedResultIndex.value + 1})`) as HTMLElement;
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest' });
      }
    }
  });
};

const clearSearch = (): void => {
  clearSearchQuery();
  selectedResultIndex.value = -1;
};

const selectResult = (result: Event): void => {
  selectSearchResult(result);
  clearSearchQuery();
  focused.value = false;
};

// Formatage de date simplifié
const formatDate = (dateString: string, part: 'day' | 'month'): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  if (part === 'day') {
    return date.getDate().toString();
  } else {
    return date.toLocaleDateString('fr-FR', { month: 'short' }).slice(0, 3);
  }
};

// Mise en surbrillance des correspondances
const highlightMatch = (text: string, query: string): string => {
  if (!query || !text) return text || '';
  
  const regex = new RegExp(`(${query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark class="bg-benin-yellow-200 rounded px-0.5">$1</mark>');
};

// Observer les changements dans la requête
watch(() => $searchQuery.value, () => {
  selectedResultIndex.value = -1;
});

// Animation lors du chargement
onMounted(() => {
  if (window.gsap) {
    gsap.from('.search-container', {
      y: -10,
      opacity: 0,
      duration: 0.4,
      delay: 0.2
    });
  }
});
</script>

<style scoped>
/* Animation de l'icône de recherche */
@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}

/* Style pour la barre de défilement des résultats */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(13, 148, 136, 0.3) transparent;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(13, 148, 136, 0.3);
  border-radius: 4px;
}

/* Style pour le surlignage */
:deep(mark) {
  background-color: rgba(13, 148, 136, 0.2);
  color: rgb(13, 148, 136);
  padding: 0 2px;
  border-radius: 2px;
  font-weight: 500;
}

/* Animation pour les résultats */
.result-item {
  transform-origin: top;
  transition: all 0.2s ease;
}

.result-item:active {
  transform: scale(0.98);
}
</style>

<script lang="ts">
// Export par défaut pour compatibilité
export default {
  name: 'SearchBar'
}
</script>