<template>
  <div class="container px-4 mx-auto">
    <div class="flex flex-wrap items-center gap-3">
      <!-- Bouton "Tous les articles" -->
      <button
        @click="selectCategory('')"
        :class="[
          'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300',
          !selectedCategory 
            ? 'bg-benin-green text-white shadow-md' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]"
      >
        Tous les articles
      </button>

      <!-- Boutons des catégories -->
      <button
        v-for="category in categories"
        :key="category"
        @click="selectCategory(category)"
        :class="[
          'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300',
          selectedCategory === category
            ? 'bg-benin-green text-white shadow-md'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        ]"
      >
        {{ category }}
        <span class="ml-2 text-xs opacity-75">({{ getCategoryCount(category) }})</span>
      </button>
    </div>

    <!-- Filtres supplémentaires (à développer si nécessaire) -->
    <div class="flex items-center gap-4 mt-4">
      <div class="relative">
        <select 
          v-model="sortBy"
          class="pl-4 pr-10 py-2 text-sm bg-white border rounded-lg border-gray-200 text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-benin-green/20"
        >
          <option value="date-desc">Plus récents</option>
          <option value="date-asc">Plus anciens</option>
          <option value="title">Alphabétique</option>
        </select>
        <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <i class="text-gray-400 fas fa-chevron-down"></i>
        </div>
      </div>

      <div class="flex items-center gap-2 text-sm text-gray-600">
        <i class="fas fa-filter"></i>
        <span>{{ filteredCount }} articles trouvés</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import type { Article } from '../../data/articles';

export default defineComponent({
  name: 'CategoryFilter',

  props: {
    categories: {
      type: Array as () => string[],
      required: true
    },
    articles: {
      type: Array as () => Article[],
      default: () => []
    }
  },

  setup(props, { emit }) {
    const selectedCategory = ref('');
    const sortBy = ref('date-desc');

    const selectCategory = (category: string) => {
      selectedCategory.value = category;
      emit('update:selectedCategory', category);
    };

    const getCategoryCount = (category: string): number => {
      return props.articles.filter(article => article.category === category).length;
    };

    const filteredCount = computed(() => {
      if (!selectedCategory.value) return props.articles.length;
      return getCategoryCount(selectedCategory.value);
    });

    return {
      selectedCategory,
      sortBy,
      selectCategory,
      getCategoryCount,
      filteredCount
    };
  }
});
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>