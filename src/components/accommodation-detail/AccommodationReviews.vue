<template>
    <div class="mb-10 opacity-0 animate-fade-up animate-delay-3">
      <h2 class="text-xl font-bold text-gray-800 mb-5 font-display flex items-center justify-between">
        <div class="flex items-center">
          <i class="fas fa-star text-benin-yellow mr-2"></i>
          Avis clients
        </div>
        <span class="text-base bg-benin-green-50 text-benin-green rounded-lg px-3 py-1">
          {{ rating }}/10
          <span class="text-sm font-normal ml-1">({{ reviewsCount }} avis)</span>
        </span>
      </h2>
  
      <!-- Résumé des notes -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <!-- Note moyenne -->
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 class="font-medium text-gray-800 mb-3">
            Note moyenne
          </h3>
          <div class="flex items-center">
            <div class="text-5xl font-bold text-benin-green mr-4">
              {{ rating }}
            </div>
            <div>
              <div class="text-sm text-gray-600 mb-1">
                sur 10
              </div>
              <div class="flex">
                <div class="flex items-center bg-benin-yellow h-2 rounded-l-full" :style="`width: ${rating * 10}%`"></div>
                <div class="flex items-center bg-gray-200 h-2 rounded-r-full" :style="`width: ${100 - (rating * 10)}%`"></div>
              </div>
              <div class="text-sm text-gray-600 mt-1">
                {{ ratingQualitative }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Détail par catégorie -->
        <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 class="font-medium text-gray-800 mb-3">
            Détail par catégorie
          </h3>
          <div class="space-y-2">
            <div v-for="(category, key) in categoryRatings" :key="key" class="flex items-center">
              <div class="w-32 text-sm text-gray-600">{{ getCategoryLabel(key) }}</div>
              <div class="flex-1 flex items-center">
                <div class="flex-1 bg-gray-200 h-2 rounded-full relative">
                  <div class="absolute inset-y-0 left-0 bg-benin-green rounded-full" :style="`width: ${category * 10}%`"></div>
                </div>
                <div class="text-benin-green font-medium ml-2 w-10 text-right">
                  {{ category }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Liste des avis -->
      <div class="space-y-6">
        <div 
          v-for="review in displayedReviews" 
          :key="review.id"
          class="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-transform duration-500 transform hover:-translate-y-1 hover:shadow-md"
        >
          <div class="flex justify-between mb-4">
            <div class="flex items-center">
              <div class="w-12 h-12 rounded-full overflow-hidden mr-3">
                <img :src="review.avatar" :alt="review.author" class="w-full h-full object-cover">
              </div>
              <div>
                <div class="font-medium text-gray-800">{{ review.author }}</div>
                <div class="text-sm text-gray-500 flex items-center">
                  <i class="fas fa-flag mr-1 text-xs opacity-60"></i>
                  {{ review.nationality }}
                </div>
              </div>
            </div>
            <div class="text-right">
              <div class="bg-benin-green text-white text-sm font-bold rounded px-2 py-1 inline-flex items-center">
                {{ review.rating }}
                <span class="text-xs ml-1 opacity-80">/10</span>
              </div>
              <div class="text-xs text-gray-500 mt-1">
                {{ formatDate(review.date) }}
              </div>
            </div>
          </div>
          
          <h4 class="font-medium text-lg text-gray-800 mb-2">
            {{ review.title }}
          </h4>
          
          <p class="text-gray-600 mb-4">
            {{ review.comment }}
          </p>
          
          <!-- Catégories d'avis -->
          <div class="flex flex-wrap gap-2">
            <div 
              v-for="(score, category) in review.categories" 
              :key="category"
              class="text-xs px-2 py-1 rounded-full"
              :class="getScoreClass(score)"
            >
              {{ getCategoryLabel(category) }}: {{ score }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Voir plus d'avis -->
      <div v-if="reviews.length > initialReviewCount" class="mt-6 text-center">
        <button 
          @click="expandReviews" 
          class="px-5 py-2 border border-benin-green text-benin-green rounded-lg hover:bg-benin-green-50 transition-colors duration-300"
        >
          <span v-if="!allReviewsDisplayed">Voir plus d'avis ({{ reviews.length - displayedReviews.length }} restants)</span>
          <span v-else>Voir moins d'avis</span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
  // Enregistrer GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  // Props
  const props = defineProps({
    reviews: {
      type: Array,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    reviewsCount: {
      type: Number,
      required: true
    }
  });
  
  // État
  const initialReviewCount = 3;
  const displayedReviewCount = ref(initialReviewCount);
  const allReviewsDisplayed = computed(() => displayedReviewCount.value >= props.reviews.length);
  
  // Avis affichés
  const displayedReviews = computed(() => {
    return props.reviews.slice(0, displayedReviewCount.value);
  });
  
  // Afficher plus d'avis
  const expandReviews = () => {
    if (allReviewsDisplayed.value) {
      displayedReviewCount.value = initialReviewCount;
    } else {
      displayedReviewCount.value = props.reviews.length;
    }
  };
  
  // Formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };
  
  // Qualificatif de la note
  const ratingQualitative = computed(() => {
    if (props.rating >= 9) return 'Exceptionnel';
    if (props.rating >= 8.5) return 'Excellent';
    if (props.rating >= 8) return 'Très bien';
    if (props.rating >= 7) return 'Bien';
    return 'Correct';
  });
  
  // Notes moyennes par catégorie
  const categoryRatings = computed(() => {
    if (!props.reviews || props.reviews.length === 0) return {};
    
    const categories = {};
    let totalReviews = 0;
    
    props.reviews.forEach(review => {
      if (review.categories) {
        totalReviews++;
        Object.entries(review.categories).forEach(([category, score]) => {
          if (!categories[category]) categories[category] = 0;
          categories[category] += score;
        });
      }
    });
    
    // Calculer les moyennes
    if (totalReviews > 0) {
      Object.keys(categories).forEach(category => {
        categories[category] = parseFloat((categories[category] / totalReviews).toFixed(1));
      });
    }
    
    return categories;
  });
  
  // Libellés des catégories
  const getCategoryLabel = (category) => {
    const labels = {
      cleanliness: 'Propreté',
      comfort: 'Confort',
      location: 'Emplacement',
      facilities: 'Équipements',
      staff: 'Personnel',
      value: 'Rapport qualité/prix'
    };
    
    return labels[category] || category;
  };
  
  // Classes CSS en fonction du score
  const getScoreClass = (score) => {
    if (score >= 9) return 'bg-green-50 text-green-700';
    if (score >= 8) return 'bg-teal-50 text-teal-700';
    if (score >= 7) return 'bg-blue-50 text-blue-700';
    if (score >= 6) return 'bg-yellow-50 text-yellow-700';
    return 'bg-red-50 text-red-700';
  };
  
  // Animation au défilement
  onMounted(() => {
    const el = document.querySelector('.animate-fade-up.animate-delay-3');
    
    if (el) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: el,
          start: 'top 95%'
        }
      });
    }
  });
  </script>
  
  <style scoped>
  /* Animation initiale pour fadeUp */
  .animate-fade-up {
    transform: translateY(20px);
  }
  </style>