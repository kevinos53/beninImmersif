<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

interface Author {
  name: string;
  avatar: string;
  bio: string;
}

interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  content: string;
  publishDate: Date;
  category: string;
  author: Author;
  image: string;
  tags: string[];
  readingTime: number;
}

const props = defineProps<{
  articles: BlogArticle[];
}>();

// État pour la vue (grille ou liste)
const viewMode = ref<'grid' | 'list'>('grid');

// État pour la recherche
const searchQuery = ref('');

// État pour la catégorie sélectionnée (gérée localement)
const selectedCategory = ref<string | null>(null);

// État pour la pagination
const currentPage = ref(1);
const itemsPerPage = ref(6);
const itemsPerPageOptions = [4, 6, 8, 12];

// S'abonner aux événements de changement de catégorie
// Utilisation d'un bus d'événements simple pour la communication entre composants
const handleCategoryChange = (event: CustomEvent) => {
  selectedCategory.value = event.detail;
  currentPage.value = 1; // Réinitialiser la page lors d'un changement de catégorie
};

// Ajouter un écouteur d'événement lors du montage du composant
onMounted(() => {
  window.addEventListener('category-selected', handleCategoryChange as EventListener);
});

// Nettoyer l'écouteur d'événement lors du démontage
onUnmounted(() => {
  window.removeEventListener('category-selected', handleCategoryChange as EventListener);
});

// Filtrer les articles en fonction de la catégorie et de la recherche
const filteredArticles = computed(() => {
  if (!selectedCategory.value && !searchQuery.value) {
    return props.articles;
  }
  
  return props.articles.filter(article => {
    const matchesCategory = !selectedCategory.value || article.category === selectedCategory.value;
    const matchesSearch = !searchQuery.value || 
      article.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });
});

// Calculer le nombre total de pages
const totalPages = computed(() => {
  return Math.ceil(filteredArticles.value.length / itemsPerPage.value);
});

// Observer les changements de filtres pour réinitialiser la pagination
watch([searchQuery], () => {
  currentPage.value = 1;
});

// Observer les changements d'articles par page pour ajuster la pagination
watch(itemsPerPage, () => {
  // Ajuster la page courante si nécessaire
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value || 1;
  }
});

// Récupérer les articles de la page courante
const paginatedArticles = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return filteredArticles.value.slice(startIndex, endIndex);
});

// Navigation entre les pages
function goToPage(page: number): void {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    // Remonter en haut de la liste
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function goToPreviousPage(): void {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1);
  }
}

function goToNextPage(): void {
  if (currentPage.value < totalPages.value) {
    goToPage(currentPage.value + 1);
  }
}

// Formater la date
function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
</script>

<template>
  <div>
    <!-- En-tête avec options de vue et barre de recherche -->
    <div class="flex flex-col mb-8 space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
      <h2 class="text-2xl font-bold text-gray-900">Articles récents</h2>
      
      <div class="flex flex-wrap gap-3">
        <!-- Barre de recherche -->
        <div class="relative flex-grow">
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher un article..."
            class="w-full px-4 py-2 transition-colors duration-300 border border-gray-200 rounded-lg focus:outline-none focus:border-benin-green pr-9"
          >
          <button class="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2">
            <i class="fas fa-search"></i>
          </button>
        </div>
        
        <!-- Boutons de vue -->
        <div class="flex bg-white border border-gray-200 rounded-lg">
          <button 
            @click="viewMode = 'grid'"
            :class="[
              'flex items-center px-4 py-2 transition-colors duration-300 rounded-l-lg',
              viewMode === 'grid' 
                ? 'bg-benin-green text-white' 
                : 'text-gray-600 hover:bg-gray-50'
            ]"
          >
            <i class="mr-2 fas fa-th-large"></i>
            Grille
          </button>
          <button 
            @click="viewMode = 'list'"
            :class="[
              'flex items-center px-4 py-2 transition-colors duration-300 rounded-r-lg',
              viewMode === 'list' 
                ? 'bg-benin-green text-white' 
                : 'text-gray-600 hover:bg-gray-50'
            ]"
          >
            <i class="mr-2 fas fa-list"></i>
            Liste
          </button>
        </div>
      </div>
    </div>
    
    <!-- Indicateur de filtrage -->
    <div v-if="selectedCategory" class="flex items-center justify-between px-4 py-3 mb-6 rounded-lg bg-benin-green-50 text-benin-green">
      <div class="flex items-center">
        <i class="mr-2 fas fa-filter"></i>
        <span>Filtré par catégorie: <strong>{{ selectedCategory }}</strong></span>
      </div>
    </div>
    
    <!-- Message si aucun résultat -->
    <div v-if="filteredArticles.length === 0" class="py-12 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-benin-green-50 text-benin-green">
        <i class="text-2xl fas fa-search"></i>
      </div>
      <h3 class="mb-2 text-xl font-semibold text-gray-900">Aucun article trouvé</h3>
      <p class="text-gray-600">
        Essayez de modifier vos critères de recherche ou de consulter toutes les catégories.
      </p>
    </div>
    
    <!-- Liste des articles -->
    <div 
      v-else
      :class="[
        'grid gap-8 transition-all duration-300',
        viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
      ]"
    >
      <!-- Article -->
      <article 
        v-for="article in paginatedArticles" 
        :key="article.slug"
        class="article-card group"
      >
        <a 
          :href="`/blog/${article.slug}`"
          class="block overflow-hidden bg-white border border-gray-100 rounded-2xl hover:border-benin-green"
        >
          <!-- Image -->
          <div class="relative overflow-hidden aspect-video">
            <img 
              :src="article.image" 
              :alt="article.title"
              class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            >
            <div class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/50 to-transparent group-hover:opacity-100"></div>
          </div>
          
          <!-- Contenu -->
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 text-sm font-medium transition-colors duration-300 rounded-full text-benin-green bg-benin-green-50 group-hover:bg-benin-green group-hover:text-white">
                {{ article.category }}
              </span>
              <div class="flex items-center text-sm text-gray-600">
                <i class="mr-2 fas fa-clock"></i>
                <span>{{ article.readingTime }} min</span>
              </div>
            </div>
            
            <h3 class="mb-3 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-benin-green">
              {{ article.title }}
            </h3>
            
            <p class="mb-4 text-gray-600" :class="viewMode === 'grid' ? 'line-clamp-2' : 'line-clamp-3'">
              {{ article.description }}
            </p>
            
            <!-- Tags (visible uniquement en mode liste) -->
            <div v-if="viewMode === 'list' && article.tags.length > 0" class="flex flex-wrap gap-2 mb-4">
              <span 
                v-for="tag in article.tags" 
                :key="tag"
                class="px-2 py-1 text-xs font-medium rounded-full text-benin-green bg-benin-green-50"
              >
                #{{ tag }}
              </span>
            </div>
            
            <div class="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
              <!-- Auteur -->
              <div class="flex items-center">
                <img 
                  :src="article.author.avatar" 
                  :alt="article.author.name"
                  class="w-8 h-8 mr-3 rounded-full"
                >
                <div class="text-sm">
                  <div class="font-medium text-gray-900">{{ article.author.name }}</div>
                  <div class="text-gray-600">{{ formatDate(article.publishDate) }}</div>
                </div>
              </div>
              
              <!-- Lire plus -->
              <span class="flex items-center text-sm font-medium transition-colors duration-300 text-benin-green group-hover:text-benin-green-600">
                Lire plus
                <i class="ml-2 transition-transform duration-300 fas fa-arrow-right group-hover:translate-x-1"></i>
              </span>
            </div>
          </div>
        </a>
      </article>
    </div>
    
    <!-- Pagination -->
    <div v-if="filteredArticles.length > 0" class="mt-12">
      <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
        <!-- Info sur le nombre d'articles -->
        <div class="text-sm text-gray-600">
          Affichage de <span class="font-medium text-gray-900">{{ paginatedArticles.length }}</span> sur 
          <span class="font-medium text-gray-900">{{ filteredArticles.length }}</span> articles
        </div>
        
        <!-- Contrôles par page -->
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-600">Afficher</span>
          <select 
            v-model="itemsPerPage" 
            class="px-2 py-1 text-sm border border-gray-200 rounded focus:outline-none focus:border-benin-green"
          >
            <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
          <span class="text-sm text-gray-600">par page</span>
        </div>
        
        <!-- Navigation de pagination -->
        <nav class="flex" aria-label="Pagination">
          <!-- Bouton précédent -->
          <button 
            @click="goToPreviousPage"
            :disabled="currentPage <= 1"
            :class="[
              'inline-flex items-center px-3 py-2 text-sm font-medium border rounded-l-md transition-colors duration-300',
              currentPage <= 1 
                ? 'text-gray-300 bg-gray-50 border-gray-200 cursor-not-allowed' 
                : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
            ]"
          >
            <i class="mr-2 fas fa-chevron-left"></i>
            Précédent
          </button>
          
          <!-- Pages numériques (afficher jusqu'à 5 pages) -->
          <template v-if="totalPages <= 5">
            <button 
              v-for="page in totalPages" 
              :key="page"
              @click="goToPage(page)"
              :class="[
                'inline-flex items-center px-4 py-2 text-sm font-medium border-t border-b border-r transition-colors duration-300',
                page === currentPage
                  ? 'text-white bg-benin-green border-benin-green'
                  : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
              ]"
            >
              {{ page }}
            </button>
          </template>
          
          <template v-else>
            <!-- Premières pages -->
            <button 
              v-if="currentPage > 3"
              @click="goToPage(1)"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-300 bg-white border-t border-b border-r border-gray-300 hover:bg-gray-50"
            >
              1
            </button>
            
            <!-- Ellipsis au début -->
            <span 
              v-if="currentPage > 3"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-r border-gray-300"
            >
              ...
            </span>
            
            <!-- Pages autour de la page courante -->
            <template v-for="page in totalPages" :key="page">
              <button 
                v-if="page >= currentPage - 1 && page <= currentPage + 1"
                @click="goToPage(page)"
                :class="[
                  'inline-flex items-center px-4 py-2 text-sm font-medium border-t border-b border-r transition-colors duration-300',
                  page === currentPage
                    ? 'text-white bg-benin-green border-benin-green'
                    : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
            </template>
            
            <!-- Ellipsis à la fin -->
            <span 
              v-if="currentPage < totalPages - 2"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border-t border-b border-r border-gray-300"
            >
              ...
            </span>
            
            <!-- Dernière page -->
            <button 
              v-if="currentPage < totalPages - 2"
              @click="goToPage(totalPages)"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-300 bg-white border-t border-b border-r border-gray-300 hover:bg-gray-50"
            >
              {{ totalPages }}
            </button>
          </template>
          
          <!-- Bouton suivant -->
          <button 
            @click="goToNextPage"
            :disabled="currentPage >= totalPages"
            :class="[
              'inline-flex items-center px-3 py-2 text-sm font-medium border rounded-r-md transition-colors duration-300',
              currentPage >= totalPages 
                ? 'text-gray-300 bg-gray-50 border-gray-200 cursor-not-allowed' 
                : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'
            ]"
          >
            Suivant
            <i class="ml-2 fas fa-chevron-right"></i>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
.article-card {
  @apply transition-all duration-300;
}

.article-card:hover {
  @apply -translate-y-1 shadow-lg;
}
</style>