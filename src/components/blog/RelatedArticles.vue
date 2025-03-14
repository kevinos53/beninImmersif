<template>
  <section class="py-12 bg-white">
    <div class="container px-4 mx-auto">
      <h2 class="mb-8 text-2xl font-bold text-gray-800 md:text-3xl">
        Articles <span class="text-benin-green">similaires</span>
      </h2>
      
      <!-- État de chargement -->
      <div v-if="isLoading" class="flex items-center justify-center py-12">
        <div class="inline-flex items-center px-4 py-2 rounded-full text-benin-green bg-benin-green-50">
          <svg class="w-5 h-5 mr-3 animate-spin" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Chargement des articles connexes...</span>
        </div>
      </div>
      
      <!-- Message d'erreur -->
      <div v-else-if="error" class="p-4 mb-6 text-center text-red-700 bg-red-100 rounded-lg">
        <p>{{ error }}</p>
        <button @click="loadRelatedArticles" class="px-4 py-2 mt-3 text-white rounded-lg bg-benin-green">
          Réessayer
        </button>
      </div>
      
      <!-- Message si aucun article connexe -->
      <div v-else-if="articlesToDisplay.length === 0" class="py-8 text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-benin-green-50 text-benin-green">
          <i class="text-2xl fas fa-newspaper"></i>
        </div>
        <h3 class="mb-2 text-xl font-semibold text-gray-900">Aucun article similaire</h3>
        <p class="text-gray-600">
          Nous n'avons pas trouvé d'articles connexes pour le moment.
        </p>
        <a href="/blog" class="inline-block px-4 py-2 mt-4 text-white transition-transform duration-300 rounded-lg bg-benin-green hover:scale-105">
          Voir tous les articles
        </a>
      </div>
      
      <!-- Liste des articles -->
      <div v-else class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <!-- Articles connexes -->
        <article 
          v-for="article in articlesToDisplay" 
          :key="article.slug"
          class="overflow-hidden transition-transform duration-300 bg-white border border-gray-100 rounded-xl hover:-translate-y-2 hover:shadow-lg group"
        >
          <a :href="`/blog/${article.slug}`" class="block">
            <!-- Image de l'article -->
            <div class="relative overflow-hidden aspect-[16/10]">
              <img 
                :src="article.data.image" 
                :alt="article.data.title"
                class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              >
              <!-- Overlay au survol -->
              <div class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:opacity-100"></div>
            </div>
            
            <div class="p-6">
              <!-- Catégorie -->
              <div class="mb-3">
                <span class="px-3 py-1 text-sm font-medium transition-colors duration-300 rounded-full text-benin-green bg-benin-green-50 group-hover:bg-benin-green group-hover:text-white">
                  {{ article.data.category }}
                </span>
              </div>
              
              <!-- Titre et aperçu -->
              <h3 class="mb-2 text-xl font-semibold text-gray-800 transition-colors duration-300 group-hover:text-benin-green line-clamp-2">
                {{ article.data.title }}
              </h3>
              
              <p class="mb-4 text-sm text-gray-600 line-clamp-2">
                {{ article.data.description }}
              </p>
              
              <!-- Métadonnées -->
              <div class="flex items-center pt-4 mt-4 text-sm text-gray-500 border-t border-gray-100">
                <img 
                  :src="article.data.author.avatar" 
                  :alt="article.data.author.name"
                  class="w-8 h-8 mr-3 rounded-full"
                >
                <div>
                  <div class="font-medium text-gray-900">{{ article.data.author.name }}</div>
                  <div class="flex items-center gap-2">
                    <span>{{ article.data.readingTime }} min</span>
                    <span>•</span>
                    <span>{{ formatDate(article.data.publishDate) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getCollection } from 'astro:content';

// Définition des types
interface Author {
  name: string;
  avatar: string;
  bio?: string;
}

interface BlogArticleData {
  title: string;
  description: string;
  publishDate: Date;
  category: string;
  author: Author;
  image: string;
  tags: string[];
  readingTime: number;
}

interface BlogArticle {
  slug: string;
  data: BlogArticleData;
  body: string;
  render: () => Promise<{
    Content: any;
    headings: any[];
    remarkPluginFrontmatter: Record<string, any>;
  }>;
}

// Props du composant
const props = defineProps<{
  currentSlug: string;
  currentCategory: string;
}>();

// État pour les articles connexes
const relatedArticles = ref<BlogArticle[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

// Fonction pour formater la date
function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Fonction pour trouver les articles connexes
async function loadRelatedArticles() {
  isLoading.value = true;
  error.value = null;
  
  try {
    // Récupérer tous les articles depuis la collection
    const allBlogPosts = await getCollection('blog');
    
    // Filtrer pour exclure l'article courant
    const filteredArticles = allBlogPosts.filter(article => article.data.slug !== props.currentSlug);
    
    // Trier les articles par pertinence :
    // 1. Articles de la même catégorie en premier
    // 2. Articles les plus récents en troisième
    const sortedArticles = filteredArticles.sort((a, b) => {
      // Même catégorie que l'article courant
      if (a.data.category === props.currentCategory && b.data.category !== props.currentCategory) {
        return -1;
      }
      if (b.data.category === props.currentCategory && a.data.category !== props.currentCategory) {
        return 1;
      }
      
      // Trier par date de publication (du plus récent au plus ancien)
      return new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime();
    });
    
    // Retourner les 3 premiers articles (ou moins s'il y en a moins)
    relatedArticles.value = sortedArticles.slice(0, 3);
    
  } catch (err) {
    console.error('Erreur lors du chargement des articles connexes:', err);
    error.value = err instanceof Error ? err.message : 'Une erreur est survenue';
    
    // Fallback en cas d'erreur: utiliser les données fictives pour ne pas casser l'interface
    useFallbackData();
  } finally {
    isLoading.value = false;
  }
}

// Données de secours en cas d'erreur
function useFallbackData() {
  relatedArticles.value = [
    {
      slug: 'traditions-vodoun-benin',
      data: {
        title: 'Les traditions vodoun au Bénin : un héritage vivant',
        description: 'Découvrez la richesse des traditions vodoun, pilier de la culture béninoise et patrimoine immatériel unique.',
        image: '/img/blog/vodoun-traditions.jpg',
        category: 'Culture',
        publishDate: new Date('2023-12-15'),
        author: {
          name: 'Marie Houénou',
          avatar: '/img/authors/marie.jpg'
        },
        tags: ['Culture', 'Tradition', 'Spiritualité'],
        readingTime: 8
      },
      body: '',
      render: async () => ({ Content: null, headings: [], remarkPluginFrontmatter: {} })
    },
    {
      slug: 'artisanat-beninois',
      data: {
        title: "L'artisanat béninois : entre tradition et modernité",
        description: "Voyage au cœur de l'artisanat béninois, où savoir-faire ancestral et créativité contemporaine se rencontrent.",
        image: '/img/blog/artisanat-benin.jpg',
        category: 'Artisanat',
        publishDate: new Date('2023-11-20'),
        author: {
          name: 'Paul Ahouansou',
          avatar: '/img/authors/paul.jpg'
        },
        tags: ['Artisanat', 'Culture', 'Économie'],
        readingTime: 6
      },
      body: '',
      render: async () => ({ Content: null, headings: [], remarkPluginFrontmatter: {} })
    },
    {
      slug: 'gastronomie-beninoise',
      data: {
        title: 'Les saveurs authentiques de la cuisine béninoise',
        description: 'Un voyage gustatif à travers les plats emblématiques qui font la renommée de la gastronomie béninoise.',
        image: '/img/blog/cuisine-benin.jpg',
        category: 'Gastronomie',
        publishDate: new Date('2023-10-05'),
        author: {
          name: 'Sophie Dossou',
          avatar: '/img/authors/sophie.jpg'
        },
        tags: ['Gastronomie', 'Culture', 'Voyage'],
        readingTime: 7
      },
      body: '',
      render: async () => ({ Content: null, headings: [], remarkPluginFrontmatter: {} })
    }
  ] as unknown as BlogArticle[];
}

// Charger les articles au montage du composant
onMounted(async () => {
  await loadRelatedArticles();
});

// Si aucun article n'est trouvé, utiliser les données de secours
const articlesToDisplay = computed(() => {
  return relatedArticles.value.length > 0 ? relatedArticles.value : [];
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
