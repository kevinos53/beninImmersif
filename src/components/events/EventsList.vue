<template>
  <div class="space-y-8 events-list-container" data-testid="events-list">
    <!-- État de chargement -->
    <div v-if="isLoadingState" class="flex items-center justify-center py-12" data-testid="loading-state">
      <div class="inline-flex items-center px-4 py-2 text-white rounded-md bg-benin-green">
        <svg class="w-5 h-5 mr-3 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Chargement des événements...</span>
      </div>
    </div>
    
    <!-- Aucun événement trouvé -->
    <div v-else-if="eventsData.length === 0" class="py-12 text-center" data-testid="empty-state">
      <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full">
        <i class="text-2xl text-gray-400 fas fa-calendar-times"></i>
      </div>
      <h3 class="mb-2 text-lg font-semibold text-gray-700">Aucun événement trouvé</h3>
      <p class="text-gray-600">
        Essayez d'ajuster vos filtres ou effectuez une nouvelle recherche.
      </p>
      <button 
        @click="handleResetFilters"
        class="px-4 py-2 mt-4 text-sm font-medium text-white transition-all duration-300 rounded-md bg-benin-green hover:bg-benin-green-600"
        data-testid="reset-filters-btn"
      >
        <i class="mr-2 fas fa-sync-alt"></i> Réinitialiser les filtres
      </button>
    </div>
    
    <!-- Liste des événements -->
    <div v-else data-testid="events-content">
      <div class="flex justify-between mb-6">
        <p class="text-sm text-gray-600">
          <span class="font-medium">{{ eventsData.length }}</span> événement{{ eventsData.length > 1 ? 's' : '' }} trouvé{{ eventsData.length > 1 ? 's' : '' }}
        </p>
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600">Trier par :</span>
          <select 
            v-model="sortOption" 
            @change="sortEvents"
            class="px-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-benin-green focus:border-benin-green"
            data-testid="sort-select"
          >
            <option value="date-asc">Date (croissante)</option>
            <option value="date-desc">Date (décroissante)</option>
            <option value="title-asc">Titre (A-Z)</option>
            <option value="title-desc">Titre (Z-A)</option>
          </select>
        </div>
      </div>
      
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <template v-if="paginatedEvents.length > 0">
          <div 
            v-for="(event, index) in paginatedEvents" 
            :key="event.id"
            class="flex flex-col h-full overflow-hidden transition-all duration-300 bg-white shadow-sm rounded-xl hover:shadow-md event-card"
            :style="{ '--index': index }"
            :data-testid="`event-card-${event.id}`"
          >
            <!-- Image de l'événement -->
            <div class="relative overflow-hidden aspect-[3/2]">
              <img 
                :src="event.image" 
                :alt="event.title" 
                class="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
                loading="lazy"
              />
              
              <!-- Badge de catégorie -->
              <div 
                class="absolute z-10 px-2.5 py-1 text-xs font-medium rounded-full top-3 left-3"
                :class="getCategoryClass(event.category)"
              >
                {{ event.category }}
              </div>
              
              <!-- Prix -->
              <div 
                v-if="event.price" 
                class="absolute z-10 px-2.5 py-1 text-xs font-bold bg-white rounded-full shadow-sm top-3 right-3"
              >
                {{ formatPrice(event.price) }}
              </div>
              
              <!-- Overlay dégradé -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              <!-- Date au format jour/mois -->
              <div class="absolute z-10 flex items-center text-white bottom-3 left-3">
                <i class="mr-1.5 fas fa-calendar-day"></i>
                <span>{{ formatDate(event.date) }}</span>
                <span v-if="event.endDate && event.endDate !== event.date">
                  &nbsp;-&nbsp;{{ formatDate(event.endDate) }}
                </span>
              </div>
            </div>
            
            <!-- Contenu de l'événement -->
            <div class="flex flex-col flex-1 p-4">
              <h3 class="mb-2 text-lg font-bold leading-tight line-clamp-2 text-benin-green-900">
                {{ event.title }}
              </h3>
              
              <div class="flex items-center mb-3 text-sm text-gray-600">
                <i class="mr-1.5 fas fa-map-marker-alt text-benin-green-500"></i>
                <span>{{ event.location }}</span>
              </div>
              
              <p class="mb-4 text-sm text-gray-600 line-clamp-3">
                {{ event.description }}
              </p>
              
              <!-- Tags de l'événement -->
              <div class="flex flex-wrap gap-1.5 mb-4 mt-auto">
                <span 
                  v-for="(tag, idx) in event.tags.slice(0, 3)" 
                  :key="idx"
                  class="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700"
                >
                  {{ tag }}
                </span>
                <span 
                  v-if="event.tags.length > 3" 
                  class="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700"
                >
                  +{{ event.tags.length - 3 }}
                </span>
              </div>
              
              <!-- Lien vers la page détaillée -->
              <a 
                :href="`/evenements/${event.id}`" 
                class="inline-flex items-center justify-center px-4 py-2 mt-auto text-sm font-medium text-white transition-all duration-300 rounded-lg bg-benin-green hover:bg-benin-green-600 hover:shadow-md"
              >
                Voir les détails
                <i class="ml-2 fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </template>
      </div>
      
      <!-- Pagination -->
      <div 
        v-if="totalPages > 1" 
        class="flex flex-wrap items-center justify-center gap-2 mt-12"
        data-testid="pagination"
      >
        <button 
          @click="prevPage" 
          :disabled="currentPage === 1"
          class="flex items-center justify-center w-10 h-10 transition-colors duration-300 border rounded-lg text-benin-green border-benin-green disabled:opacity-50 disabled:cursor-not-allowed hover:bg-benin-green-50"
          aria-label="Page précédente"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <button 
          v-for="page in displayedPages" 
          :key="typeof page === 'string' ? `ellipsis-${page}` : page"
          @click="goToPage(page)"
          :class="[
            'flex items-center justify-center w-10 h-10 text-sm font-medium transition-colors duration-300 border rounded-lg',
            currentPage === page 
              ? 'bg-benin-green text-white border-benin-green' 
              : 'text-benin-green border-benin-green hover:bg-benin-green-50',
            typeof page === 'string' ? 'pointer-events-none' : ''
          ]"
          :disabled="typeof page === 'string'"
          :aria-current="currentPage === page ? 'page' : undefined"
          :data-testid="typeof page !== 'string' ? `page-${page}` : 'page-ellipsis'"
        >
          {{ page }}
        </button>
        
        <button 
          @click="nextPage" 
          :disabled="currentPage === totalPages"
          class="flex items-center justify-center w-10 h-10 transition-colors duration-300 border rounded-lg text-benin-green border-benin-green disabled:opacity-50 disabled:cursor-not-allowed hover:bg-benin-green-50"
          aria-label="Page suivante"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onUnmounted, defineComponent } from 'vue';
import { useStore } from '@nanostores/vue';
import { 
  filteredEvents,
  isLoading,
  resetFilters,
  setEvents,
  initStore,
  ensureFilteredEvents
} from '../../stores/eventsStore';

// Définir le composant avec l'API de composition
export default defineComponent({
  name: 'EventsList',
  
  props: {
    initialEvents: {
      type: Array,
      default: () => []
    }
  },
  
  setup(props) {
    // État local
    const currentPage = ref(1);
    const eventsPerPage = ref(9); // Nombre d'événements par page
    const sortOption = ref('date-asc');
    const initialized = ref(false);

    // Store - Renommé les variables pour éviter les préfixes réservés
    const eventsStore = useStore(filteredEvents);
    const loadingStore = useStore(isLoading);

    // Alias pour faciliter la lecture (sans le préfixe $ réservé)
    const eventsData = eventsStore;
    const isLoadingState = loadingStore;

    // Méthodes
    const handleResetFilters = () => {
      resetFilters();
      currentPage.value = 1;
    };

    /**
     * Trie les événements selon l'option sélectionnée
     */
    const sortEvents = () => {
      // Le tri est géré automatiquement via le computed paginatedEvents
      // Réinitialiser la page courante lors du tri
      currentPage.value = 1;
    };

    /**
     * Calcule les événements à afficher en fonction du tri et de la pagination
     */
    const paginatedEvents = computed(() => {
      // Si aucun événement, retourner un tableau vide
      if (!eventsData.value || eventsData.value.length === 0) {
        return [];
      }
      
      // Faire une copie pour éviter les mutations involontaires
      const sortedEvents = [...eventsData.value].sort((a, b) => {
        switch (sortOption.value) {
          case 'date-asc':
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          case 'date-desc':
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          case 'title-asc':
            return a.title.localeCompare(b.title);
          case 'title-desc':
            return b.title.localeCompare(a.title);
        }
      });
      
      // Ensuite, paginer les événements triés
      const startIndex = (currentPage.value - 1) * eventsPerPage.value;
      const endIndex = startIndex + eventsPerPage.value;
      
      return sortedEvents.slice(startIndex, endIndex);
    });

    // Pagination
    const totalEvents = computed(() => eventsData.value?.length || 0);
    const totalPages = computed(() => Math.ceil(totalEvents.value / eventsPerPage.value) || 1);

    /**
     * Détermine les boutons de page à afficher
     */
    const displayedPages = computed(() => {
      if (totalPages.value <= 5) {
        return Array.from({ length: totalPages.value }, (_, i) => i + 1);
      }
      
      // Pour les ensembles de pages plus grands, afficher des ellipses
      const pages = [];
      
      if (currentPage.value <= 3) {
        // Si on est proche du début
        pages.push(1, 2, 3, 4, '...', totalPages.value);
      } else if (currentPage.value >= totalPages.value - 2) {
        // Si on est proche de la fin
        pages.push(1, '...', totalPages.value - 3, totalPages.value - 2, totalPages.value - 1, totalPages.value);
      } else {
        // Sinon, montrer des ellipses des deux côtés
        pages.push(1, '...', currentPage.value - 1, currentPage.value, currentPage.value + 1, '...', totalPages.value);
      }
      
      return pages;
    });

    /**
     * Change la page courante
     */
    const goToPage = (page) => {
      if (typeof page === 'number') {
        currentPage.value = page;
        scrollToTop();
      }
    };

    /**
     * Passe à la page précédente
     */
    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
        scrollToTop();
      }
    };

    /**
     * Passe à la page suivante
     */
    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
        scrollToTop();
      }
    };

    /**
     * Fait défiler la page vers le haut après un changement de page
     */
    const scrollToTop = () => {
      const eventsSection = document.querySelector('.events-list-container');
      if (eventsSection) {
        eventsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    /**
     * Formate une date pour l'affichage
     */
    const formatDate = (dateString) => {
      if (!dateString) return '';
      
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short'
      });
    };

    /**
     * Formate un prix pour l'affichage - Adapté au nouveau format standardisé
     */
    const formatPrice = (price) => {
      if (!price) return 'Gratuit';
      
      // Gestion du nouveau format standard (isFree)
      if ('isFree' in price && price.isFree) {
        return 'Gratuit';
      }
      
      // Gestion du nouveau format standard (EventPrice avec value)
      if ('value' in price) {
        // Utiliser le format préformaté s'il est disponible
        if (price.formatted) return price.formatted;
        
        // Cas où value est un nombre
        if (typeof price.value === 'number') {
          return new Intl.NumberFormat('fr-FR', { 
            style: 'currency', 
            currency: price.currency || 'XOF',
            maximumFractionDigits: 0
          }).format(price.value);
        }
        
        // Fallback au format brut
        return `${price.value} ${price.currency || ''}`;
      }
      
      // Gestion de l'ancien format pour la rétrocompatibilité
      return price === 0 || price === '0'
        ? 'Gratuit' 
        : new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF',
            maximumFractionDigits: 0
          }).format(Number(price));
    };

    /**
     * Retourne les classes CSS pour une catégorie donnée
     */
    const getCategoryClass = (category) => {
      if (!category) return 'bg-gray-800 text-white';
      
      const classes = {
        'culturel': 'bg-vodou text-white',
        'arts': 'bg-benin-green text-white',
        'musique': 'bg-ocean text-white',
        'divertissement': 'bg-benin-yellow text-night',
        'gastronomie': 'bg-earth text-white',
        'sport': 'bg-fire text-white',
        'technologie': 'bg-night text-white'
      };
      
      return classes[category.toLowerCase()] || 'bg-gray-800 text-white';
    };

    // Observer les changements dans les événements filtrés
    watch(eventsData, () => {
      // Réinitialiser à la première page lorsque les filtres changent
      currentPage.value = 1;
    });

    // Gérer l'événement de navigation personnalisé
    const handleCustomNavigation = (e) => {
      if (e.detail && e.detail.url) {
        window.location.href = e.detail.url;
      }
    };

    // Initialisation améliorée pour s'adapter au SSR d'Astro
    onMounted(async () => {
      if (!initialized.value) {
        initialized.value = true;
        
        // Si des événements initiaux sont fournis par Astro
        if (props.initialEvents && props.initialEvents.length > 0) {
          // Initialiser le store avec les événements fournis
          setEvents(props.initialEvents);
          // Vérifier que les événements filtrés sont disponibles
          ensureFilteredEvents();
        } else {
          // Si aucun événement initial n'est fourni, charger depuis l'API
          await initStore();
        }
        
        // Après quelques millisecondes (pour laisser l'hydratation se terminer)
        setTimeout(() => {
          // Animation des cartes d'événements
          if (window.gsap) {
            gsap.from('.event-card', {
              opacity: 0,
              y: 30,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power3.out',
              delay: 0.3
            });
          }
        }, 50);
      }

      document.addEventListener('navigate', handleCustomNavigation);
    });

    onUnmounted(() => {
      document.removeEventListener('navigate', handleCustomNavigation);
    });

    // Exposer les propriétés et méthodes au template
    return {
      currentPage,
      eventsPerPage,
      sortOption,
      eventsData,       // Renommé (sans préfixe $)
      isLoadingState,   // Renommé (sans préfixe $)
      paginatedEvents,
      totalEvents,
      totalPages,
      displayedPages,
      handleResetFilters,
      sortEvents,
      goToPage,
      prevPage,
      nextPage,
      formatDate,
      formatPrice,
      getCategoryClass
    };
  }
});
</script>

<style scoped>
.event-card {
  animation-delay: calc(var(--index) * 0.1s);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animation sur hover */
.event-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.event-card:hover {
  transform: translateY(-5px);
}

.event-card:hover img {
  filter: brightness(1.05);
}

/* Animation des boutons de pagination */
button:not(:disabled):active {
  transform: scale(0.95);
}
</style>