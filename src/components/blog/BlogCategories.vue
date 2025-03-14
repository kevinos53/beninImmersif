<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  categories: string[];
}>();

// Catégorie sélectionnée
const selectedCategory = ref<string | null>(null);

// Fonction pour sélectionner une catégorie
const selectCategory = (category: string) => {
  selectedCategory.value = selectedCategory.value === category ? null : category;
  
  // Émettre un événement global pour la communication entre composants
  window.dispatchEvent(new CustomEvent('category-selected', {
    detail: selectedCategory.value
  }));
};

// Fonction pour obtenir les classes CSS d'une catégorie
const getCategoryClasses = (category: string): string => {
  const isSelected = selectedCategory.value === category;
  return `
    category-button
    flex items-center justify-between w-full px-4 py-3 text-left transition-all duration-300 rounded-xl
    ${isSelected 
      ? 'bg-benin-green text-white shadow-lg shadow-benin-green/20' 
      : 'bg-white text-gray-700 hover:bg-benin-green-50 hover:text-benin-green'}
  `;
};
</script>

<template>
  <div class="sticky space-y-6 top-8">
    <!-- En-tête -->
    <div>
      <h2 class="text-2xl font-bold text-gray-900">Catégories</h2>
      <p class="mt-2 text-gray-600">Explorez nos articles par thème</p>
    </div>
    
    <!-- Liste des catégories -->
    <div class="space-y-2">
      <button
        v-for="category in categories"
        :key="category"
        :class="getCategoryClasses(category)"
        @click="selectCategory(category)"
      >
        <span class="flex items-center">
          <i class="mr-3 text-lg fas fa-folder"></i>
          {{ category }}
        </span>
        <i 
          class="transition-transform duration-300 fas fa-chevron-right"
          :class="{ 'rotate-90': selectedCategory === category }"
        ></i>
      </button>
    </div>
    
    <!-- Section newsletter -->
    <div class="p-6 bg-white border border-gray-100 rounded-xl">
      <h3 class="mb-2 text-lg font-semibold text-gray-900">Newsletter</h3>
      <p class="mb-4 text-sm text-gray-600">
        Recevez nos derniers articles et actualités directement dans votre boîte mail.
      </p>
      
      <form @submit.prevent class="space-y-3">
        <input
          type="email"
          placeholder="Votre email"
          class="w-full px-4 py-2 text-gray-900 transition-colors duration-300 border border-gray-200 rounded-lg focus:outline-none focus:border-benin-green"
        >
        <button
          type="submit"
          class="w-full px-4 py-2 font-medium text-white transition-colors duration-300 rounded-lg bg-benin-green hover:bg-benin-green-600"
        >
          S'abonner
        </button>
      </form>
    </div>
    
    <!-- Tags populaires -->
    <div class="p-6 bg-white border border-gray-100 rounded-xl">
      <h3 class="mb-4 text-lg font-semibold text-gray-900">Tags populaires</h3>
      <div class="flex flex-wrap gap-2">
        <a 
          href="#"
          v-for="tag in ['Culture', 'Vodoun', 'Nature', 'Gastronomie', 'Artisanat']"
          :key="tag"
          class="px-3 py-1 text-sm transition-colors duration-300 rounded-full text-benin-green bg-benin-green-50 hover:bg-benin-green hover:text-white"
        >
          {{ tag }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-button {
  @apply border border-transparent;
}

.category-button:hover {
  @apply border-benin-green;
}
</style>