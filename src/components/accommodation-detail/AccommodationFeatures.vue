<template>
    <div class="mb-10 opacity-0 animate-fade-up animate-delay-2">
      <h2 class="text-xl font-bold text-gray-800 mb-4 font-display flex items-center">
        <i class="fas fa-concierge-bell text-benin-green mr-2"></i>
        Équipements et services
      </h2>
  
      <!-- Onglets -->
      <div class="mb-6 border-b border-gray-200">
        <div class="flex overflow-x-auto hide-scrollbar">
          <button 
            v-for="(tab, index) in tabs" 
            :key="index"
            class="pb-2 px-1 mr-6 whitespace-nowrap transition-colors duration-300"
            :class="activeTab === index ? 'border-b-2 border-benin-green text-benin-green font-medium' : 'text-gray-600 hover:text-benin-green-600'"
            @click="activeTab = index"
          >
            <i :class="tab.icon + ' mr-2'"></i>
            {{ tab.label }}
          </button>
        </div>
      </div>
  
      <!-- Contenu des onglets -->
      <div>
        <!-- Équipements -->
        <div v-if="activeTab === 0" class="grid grid-cols-2 md:grid-cols-3 gap-y-4">
          <div 
            v-for="(amenity, index) in amenities" 
            :key="index"
            class="flex items-center"
          >
            <div class="w-8 h-8 rounded-full bg-benin-green-50 flex items-center justify-center text-benin-green mr-3">
              <i :class="'fas ' + amenity.icon"></i>
            </div>
            <span class="text-gray-700">{{ amenity.text }}</span>
          </div>
        </div>
        
        <!-- Services -->
        <div v-if="activeTab === 1" class="grid grid-cols-2 md:grid-cols-3 gap-y-4">
          <div 
            v-for="(service, index) in services" 
            :key="index"
            class="flex items-center"
          >
            <div class="w-8 h-8 rounded-full bg-benin-green-50 flex items-center justify-center text-benin-green mr-3">
              <i :class="'fas ' + service.icon"></i>
            </div>
            <span class="text-gray-700">{{ service.text }}</span>
          </div>
        </div>
        
        <!-- Règles de l'hébergement -->
        <div v-if="activeTab === 2">
          <div class="space-y-4">
            <!-- Horaires -->
            <div class="flex border-b border-gray-100 pb-4">
              <div class="w-8 h-8 rounded-full bg-benin-green-50 flex items-center justify-center text-benin-green mr-3 flex-shrink-0">
                <i class="fas fa-clock"></i>
              </div>
              <div>
                <h4 class="font-medium text-gray-800 mb-1">Arrivée et départ</h4>
                <div class="text-gray-600 space-y-1">
                  <div class="flex justify-between">
                    <span>Arrivée</span>
                    <span class="font-medium">{{ policies.checkIn }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Départ</span>
                    <span class="font-medium">{{ policies.checkOut }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Annulation -->
            <div class="flex border-b border-gray-100 pb-4">
              <div class="w-8 h-8 rounded-full bg-benin-green-50 flex items-center justify-center text-benin-green mr-3 flex-shrink-0">
                <i class="fas fa-calendar-times"></i>
              </div>
              <div>
                <h4 class="font-medium text-gray-800 mb-1">Politique d'annulation</h4>
                <p class="text-gray-600">{{ policies.cancellation }}</p>
              </div>
            </div>
            
            <!-- Enfants -->
            <div class="flex border-b border-gray-100 pb-4">
              <div class="w-8 h-8 rounded-full bg-benin-green-50 flex items-center justify-center text-benin-green mr-3 flex-shrink-0">
                <i class="fas fa-child"></i>
              </div>
              <div>
                <h4 class="font-medium text-gray-800 mb-1">Enfants</h4>
                <p class="text-gray-600">{{ policies.children }}</p>
              </div>
            </div>
            
            <!-- Animaux -->
            <div class="flex border-b border-gray-100 pb-4">
              <div class="w-8 h-8 rounded-full bg-benin-green-50 flex items-center justify-center text-benin-green mr-3 flex-shrink-0">
                <i class="fas fa-paw"></i>
              </div>
              <div>
                <h4 class="font-medium text-gray-800 mb-1">Animaux</h4>
                <p class="text-gray-600">{{ policies.pets }}</p>
              </div>
            </div>
            
            <!-- Paiement -->
            <div class="flex">
              <div class="w-8 h-8 rounded-full bg-benin-green-50 flex items-center justify-center text-benin-green mr-3 flex-shrink-0">
                <i class="fas fa-credit-card"></i>
              </div>
              <div>
                <h4 class="font-medium text-gray-800 mb-1">Options de paiement</h4>
                <div class="flex flex-wrap gap-2 mt-2">
                  <div 
                    v-for="(option, index) in policies.paymentOptions" 
                    :key="index"
                    class="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                  >
                    {{ option }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
  // Enregistrer GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  // Props
  const props = defineProps({
    amenities: {
      type: Array,
      required: true
    },
    services: {
      type: Array,
      required: true
    },
    policies: {
      type: Object,
      required: true
    }
  });
  
  // Onglets
  const tabs = [
    { label: 'Équipements', icon: 'fas fa-home' },
    { label: 'Services', icon: 'fas fa-concierge-bell' },
    { label: 'Règles', icon: 'fas fa-info-circle' }
  ];
  const activeTab = ref(0);
  
  // Animation au défilement
  onMounted(() => {
    const el = document.querySelector('.animate-fade-up.animate-delay-2');
    
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
  .hide-scrollbar {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  /* Animation initiale pour fadeUp */
  .animate-fade-up {
    transform: translateY(20px);
  }
  </style>