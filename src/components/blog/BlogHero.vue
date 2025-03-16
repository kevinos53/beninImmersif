<script setup lang="ts">
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

defineProps<{
  article: BlogArticle;
}>();

// Fonction pour formater la date
function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
</script>

<template>
  <section class="relative py-24 overflow-hidden">
    <!-- Arrière-plan décoratif -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute w-full h-full">
        <div class="absolute w-96 h-96 rounded-full opacity-10 top-0 -left-48 bg-benin-green blur-[120px]"></div>
        <div class="absolute w-96 h-96 rounded-full opacity-10 bottom-0 -right-48 bg-benin-yellow blur-[120px]"></div>
      </div>
    </div>

    <!-- Contenu de l'article -->
    <div class="container relative z-10 px-4 mx-auto">
      <div class="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
        <!-- Texte -->
        <div class="max-w-2xl">
          <span class="inline-block px-4 py-2 mb-6 text-sm font-medium transition-colors duration-300 rounded-full text-benin-green bg-benin-green-50 hover:bg-benin-green hover:text-white">
            {{ article.category }}
          </span>
          
          <h1 class="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
            {{ article.title }}
          </h1>
          
          <p class="mb-8 text-xl leading-relaxed text-gray-600">
            {{ article.description }}
          </p>
          
          <div class="flex flex-wrap items-center gap-6 mb-8">
            <!-- Auteur -->
            <div class="flex items-center">
              <img 
                :src="article.author.avatar" 
                :alt="article.author.name"
                class="w-10 h-10 mr-3 rounded-full hidden"
              >
              <div class="text-left">
                <div class="font-medium text-gray-900">{{ article.author.name }}</div>
                <div class="text-sm text-gray-600">Auteur</div>
              </div>
            </div>
            
            <!-- Date -->
            <div class="flex items-center text-gray-600">
              <i class="mr-2 fas fa-calendar"></i>
              <span>{{ formatDate(article.publishDate) }}</span>
            </div>
            
            <!-- Temps de lecture -->
            <div class="flex items-center text-gray-600">
              <i class="mr-2 fas fa-clock"></i>
              <span>{{ article.readingTime }} min de lecture</span>
            </div>
          </div>
          
          <a 
            :href="`/blog/${article.slug}`"
            class="inline-flex items-center px-6 py-3 text-lg font-medium text-white transition-colors duration-300 rounded-lg bg-benin-green hover:bg-benin-green-600"
          >
            Lire l'article
            <i class="ml-2 fas fa-arrow-right"></i>
          </a>
        </div>
        
        <!-- Image -->
        <div class="relative group">
          <div class="absolute inset-0 transition-transform duration-500 border border-gray-200 rounded-2xl -rotate-6 group-hover:rotate-4"></div>
          <div class="absolute inset-0 transition-transform duration-500 border border-gray-200 rounded-2xl rotate-6 group-hover:-rotate-4"></div>
          <a :href="`/blog/${article.slug}`" class="block overflow-hidden rounded-2xl">
            <img 
              :src="article.image" 
              :alt="article.title"
              class="object-cover w-full transition-transform duration-500 h-[600px] group-hover:scale-110"
            >
          </a>
        </div>
      </div>
    </div>
  </section>
</template>