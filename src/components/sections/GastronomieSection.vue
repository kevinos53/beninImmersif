<template>
  <section id="gastronomie"   class="relative py-20 overflow-hidden bg-gradient-to-b from-white to-benin-yellow/5" ref="gastroSection">
    <!-- Éléments décoratifs améliorés -->
    <div class="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent"></div>
    <div class="absolute right-0 rounded-full -top-20 w-72 h-72 bg-benin-yellow/5 blur-3xl"></div>
    <div class="absolute rounded-full bottom-20 left-10 w-80 h-80 bg-benin-green/5 blur-3xl"></div>
    
    <!-- Particules d'épices flottantes -->
    <div class="absolute inset-0 pointer-events-none" ref="spicesContainer"></div>
    
    <!-- Motifs culinaires flottants avec animation améliorée -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none" ref="culinaryElements">
      <div class="culinary-icon absolute top-[15%] left-[8%] text-benin-yellow/10" data-speed="0.04">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.1,13.34L3.91,9.16C2.35,7.59 2.35,5.06 3.91,3.5L10.93,10.5L8.1,13.34M14.88,11.53L13.41,13L20.29,19.88L18.88,21.29L12,14.41L5.12,21.29L3.71,19.88L13.47,10.12C12.76,8.59 13.26,6.44 14.85,4.85C16.76,2.93 19.5,2.57 20.96,4.03C22.43,5.5 22.07,8.24 20.15,10.15C18.56,11.74 16.41,12.24 14.88,11.53Z" />
        </svg>
      </div>
      <div class="culinary-icon absolute top-[40%] right-[10%] text-benin-culture/10" data-speed="0.03">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5,21L14,8H16.23L15.1,3.46L16.84,3L18.09,8H22L20.5,21H15.5M5,11H10A3,3 0 0,1 13,14H2A3,3 0 0,1 5,11M13,18A3,3 0 0,1 10,21H5A3,3 0 0,1 2,18H13M3,15H8L9.5,16.5L11,15H12A1,1 0 0,1 13,16A1,1 0 0,1 12,17H3A1,1 0 0,1 2,16A1,1 0 0,1 3,15Z" />
        </svg>
      </div>
      <div class="culinary-icon absolute bottom-[25%] left-[12%] text-benin-green/10" data-speed="0.05">
        <svg width="70" height="70" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5,3L14,7H10L8.5,3H15.5M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M1,10V12A5,5 0 0,0 6,17H18A5,5 0 0,0 23,12V10H1Z" />
        </svg>
      </div>
      
      <!-- Ustensiles supplémentaires -->
      <div v-for="(utensil, index) in extraUtensils" :key="`utensil-${index}`" 
           :class="`culinary-icon absolute text-${utensil.color}`"
           :style="`top: ${utensil.top}; left: ${utensil.left}; transform: rotate(${utensil.rotation}deg);`"
           :data-speed="utensil.speed">
        <svg :width="utensil.size" :height="utensil.size" viewBox="0 0 24 24" fill="currentColor">
          <path :d="utensil.path" />
        </svg>
      </div>
    </div>
    
    <div class="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <!-- Section Header avec animation -->
      <div class="mb-16 text-center reveal-section" ref="headerSection">
        <div class="inline-block p-1 px-3 mb-4 transition-opacity duration-700 rounded-lg bg-benin-yellow/20" ref="headerBadge">
          <span class="font-medium text-benin-yellow">Saveurs & Traditions</span>
        </div>
        <h2 class="mb-6 text-3xl font-bold text-gray-900 transition-all duration-700 section-title sm:text-4xl lg:text-5xl font-display" ref="headerTitle">
          Découvrez la <span class="culinary-gradient">gastronomie béninoise</span>
        </h2>
        <p class="max-w-3xl mx-auto text-lg text-gray-700 transition-all duration-700" ref="headerText">
          La cuisine béninoise est un véritable voyage sensoriel, mêlant saveurs épicées, ingrédients frais et techniques culinaires ancestrales. Laissez-vous tenter par ses plats emblématiques.
        </p>
      </div>
      
      <!-- Featured Dish: Amiwo avec effet parallaxe -->
      <div class="mb-24 transition-all duration-700 transform" ref="featuredDish">
        <div class="overflow-hidden bg-white shadow-xl rounded-2xl">
          <div class="md:flex">
            <div class="relative md:w-1/2">
              <div class="relative overflow-hidden h-80 md:h-full">
                <!-- Image avec parallaxe -->
                <div class="w-full h-full parallax-container" ref="parallaxImage">
                  <img src="/img/amiwo-dish.webp" alt="Amiwo au poulet" 
                       class="object-cover w-full h-full transition-transform duration-700 scale-110">
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-black/60 md:to-transparent"></div>
                
                <!-- Vapeur animée au dessus du plat -->
                <div class="absolute transform -translate-x-1/2 top-1/4 left-1/2 steam-effect" 
                     :style="{ opacity: 0 }"
                     ref="steamEffect">
                  <div class="relative w-20 h-20">
                    <div class="absolute w-6 h-10 rounded-full bg-white/20 blur-md animate-float-slow"></div>
                    <div class="absolute w-4 h-8 rounded-full bg-white/20 blur-md animate-float-slow" style="left: 8px; animation-delay: 0.5s"></div>
                    <div class="absolute w-5 h-12 rounded-full bg-white/20 blur-md animate-float-slow" style="left: 15px; animation-delay: 1s"></div>
                  </div>
                </div>
                
                <div class="absolute text-white bottom-4 left-4 md:bottom-8 md:left-8">
                  <div class="flex items-center mb-2">
                    <div class="w-2 h-2 mr-2 rounded-full bg-benin-yellow"></div>
                    <span class="text-sm text-white/80">Plat emblématique</span>
                  </div>
                  <h3 class="text-2xl font-bold md:text-3xl font-display">Amiwo au poulet</h3>
                </div>
              </div>
            </div>
            <div class="p-6 md:w-1/2 md:p-10">
              <div class="flex items-center mb-4">
                <div class="flex items-center mr-4">
                  <i class="mr-2 fas fa-pepper-hot text-benin-yellow"></i>
                  <span class="text-gray-600">Épicé</span>
                </div>
                <div class="flex items-center">
                  <i class="mr-2 fas fa-utensils text-benin-yellow"></i>
                  <span class="text-gray-600">Plat principal</span>
                </div>
              </div>
              
              <p class="mb-6 text-gray-700 dish-description" ref="dishDescription">
                L'Amiwo est une pâte de maïs fermentée à la tomate, servie traditionnellement avec du poulet frit aux épices locales. Ce plat coloré et savoureux est un incontournable de la cuisine béninoise, particulièrement apprécié lors des célébrations.
              </p>
              
              <div class="mb-8">
                <h4 class="mb-3 font-bold text-gray-900">Ingrédients principaux</h4>
                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div class="flex items-start ingredient-item" v-for="(ingredient, index) in amiwoIngredients" :key="`ingredient-${index}`" :data-delay="index * 0.1">
                    <div class="w-6 h-6 rounded-full bg-benin-yellow/10 flex items-center justify-center mt-0.5 mr-3">
                      <i :class="`fas ${ingredient.icon} text-benin-yellow text-xs`"></i>
                    </div>
                    <span class="text-gray-700">{{ ingredient.text }}</span>
                  </div>
                </div>
              </div>
              
              <a href="#" class="relative inline-flex items-center overflow-hidden font-medium gastro-cta text-benin-yellow group">
                <span class="relative z-10 pr-8 transition-colors duration-300 group-hover:text-benin-culture">Découvrir la recette</span>
                <svg xmlns="http://www.w3.org/2000/svg" 
                     class="absolute right-0 w-5 h-5 transition-transform duration-300 transform -translate-y-1/2 top-1/2 group-hover:translate-x-1" 
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span class="absolute bottom-0 left-0 w-full h-0.5 bg-benin-yellow transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Specialties Grid avec animation au défilement -->
      <div class="mb-20">
        <h3 class="mb-12 text-2xl font-bold text-center transition-opacity duration-700 md:text-3xl font-display" ref="gridTitle">
          Spécialités culinaires
        </h3>
        
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" ref="dishesGrid">
          <!-- Dish cards avec effets améliorés -->
          <div v-for="(dish, index) in dishes" 
               :key="`dish-${index}`" 
               class="overflow-hidden transition-all duration-300 transform bg-white shadow-lg dish-card rounded-xl group"
               :style="{
                 'transition-delay': `${index * 100}ms`,
                 'opacity': 0
               }"
               :data-index="index">
            <div class="relative h-56 overflow-hidden">
              <div class="w-full h-full overflow-hidden dish-image-container">
                <img :src="dish.image" :alt="dish.title" 
                     class="object-cover w-full h-full transition-all duration-700 hover:scale-105">
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              <!-- Éléments visuels au survol -->
              <div class="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 dish-overlay">
                <div class="absolute w-full h-full bg-benin-yellow/10 mix-blend-overlay"></div>
                <div class="absolute w-20 h-20 transform -translate-x-1/2 -translate-y-1/2 border rounded-full opacity-50 top-1/3 left-1/2 border-white/20"></div>
              </div>
              
              <div class="absolute top-4 right-4">
                <div class="px-3 py-1 text-xs font-medium rounded-full bg-white/90 backdrop-blur-sm text-benin-yellow">
                  {{ dish.type }}
                </div>
              </div>
              <div class="absolute text-white bottom-4 left-4">
                <h3 class="text-xl font-bold font-display">{{ dish.title }}</h3>
                <p class="text-sm text-white/80">{{ dish.subtitle }}</p>
              </div>
            </div>
            <div class="p-6">
              <p class="mb-4 text-gray-700 dish-description">
                {{ dish.description }}
              </p>
              <div class="flex items-center justify-between">
                <!-- Niveau d'épice interactif -->
                <div class="flex spice-level" 
                     @mouseenter="showSpiceTooltip = index" 
                     @mouseleave="showSpiceTooltip = null">
                  <template v-for="n in 3" :key="`spice-${index}-${n}`">
                    <i :class="`fas fa-pepper-hot ${n <= dish.spiceLevel ? 'text-benin-yellow' : 'text-gray-300'}`"></i>
                  </template>
                  <!-- Tooltip -->
                  <div 
                    v-if="showSpiceTooltip === index" 
                    class="absolute left-0 z-10 px-3 py-1 text-xs text-white rounded -top-10 bg-black/80 whitespace-nowrap"
                  >
                    Niveau d'épice: {{ getSpiceLevelText(dish.spiceLevel) }}
                  </div>
                </div>
                
                <a href="#" class="inline-flex items-center font-medium text-benin-yellow group">
                  <span class="transition-colors duration-300 group-hover:text-benin-culture">Voir plus</span>
                  <i class="ml-2 transition-transform duration-300 fas fa-arrow-right group-hover:translate-x-1"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Drinks Section avec effet de verre -->
      <div class="mb-20 transition-all duration-700" 
           ref="drinksSection"
           :style="{ opacity: 0 }">
        <h3 class="mb-12 text-2xl font-bold text-center md:text-3xl font-display">
          Boissons traditionnelles
        </h3>
        
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <!-- Drink cards avec effet de verre -->
          <div v-for="(drink, index) in drinks" :key="`drink-${index}`"
               class="relative p-6 overflow-hidden transition-all duration-300 transform shadow-lg bg-white/80 backdrop-blur-sm rounded-xl drink-card hover:-translate-y-2"
               :data-delay="index * 0.2">
            <!-- Effet de liquide -->
            <div class="absolute inset-x-0 bottom-0 bg-gradient-to-b" 
                 :class="`from-transparent to-${drink.color}/10 h-1/2`"
                 :style="`clip-path: url(#wave-${index});`"></div>
            <svg class="absolute bottom-0 left-0 w-full h-24 pointer-events-none" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <defs>
                <clipPath :id="`wave-${index}`">
                  <path d="M0,0 L1200,0 L1200,120 C1000,80 800,100 600,120 C400,100 200,80 0,120 L0,0 Z" />
                </clipPath>
              </defs>
            </svg>
            
            <div class="relative z-10 flex items-center mb-4">
              <div :class="`w-16 h-16 rounded-full bg-${drink.color}/10 flex items-center justify-center mr-4`">
                <i :class="`fas ${drink.icon} text-${drink.mainColor} text-2xl`"></i>
              </div>
              <div>
                <h4 class="text-xl font-bold font-display">{{ drink.name }}</h4>
                <p class="text-gray-600">{{ drink.type }}</p>
              </div>
            </div>
            <p class="relative z-10 text-gray-700">
              {{ drink.description }}
            </p>
            
            <!-- Bulles animées pour les boissons -->
            <div class="absolute inset-0 overflow-hidden transition-opacity duration-500 opacity-0 pointer-events-none bubbles-container group-hover:opacity-100"></div>
          </div>
        </div>
      </div>
      
      <!-- Cooking Class Banner avec effets améliorés -->
      <div class="relative overflow-hidden transition-opacity duration-700 rounded-2xl cooking-cta"
           ref="cookingBanner"
           :style="{ opacity: 0 }">
        <div class="absolute inset-0">
          <img src="/img/cooking-class-banner.webp" alt="Cours de cuisine béninoise" 
               class="w-full h-full object-cover scale-110 transition-all duration-[30s]"
               ref="cookingBannerImage">
          <div class="absolute inset-0 bg-benin-yellow/15"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.4),transparent_70%)]"></div>
          
          <!-- Éléments culinaires animés dans le CTA -->
          <div class="absolute inset-0 overflow-hidden">
            <div class="absolute top-10 left-[20%] w-32 h-32 border border-white/10 rounded-full animate-spin-slower"></div>
            <div class="absolute bottom-10 right-[20%] w-40 h-40 border border-white/10 rounded-full animate-spin-reverse"></div>
            
            <!-- Ustensile flottant -->
            <div class="absolute bottom-1/4 left-1/4 text-white/10 animate-float-slow">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8.1,13.34L3.91,9.16C2.35,7.59 2.35,5.06 3.91,3.5L10.93,10.5L8.1,13.34M14.88,11.53L13.41,13L20.29,19.88L18.88,21.29L12,14.41L5.12,21.29L3.71,19.88L13.47,10.12C12.76,8.59 13.26,6.44 14.85,4.85C16.76,2.93 19.5,2.57 20.96,4.03C22.43,5.5 22.07,8.24 20.15,10.15C18.56,11.74 16.41,12.24 14.88,11.53Z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="relative p-8 text-center md:p-12">
          <h3 class="mb-4 text-2xl font-bold text-white font-display md:text-3xl ">
            Apprenez à cuisiner béninois
          </h3>
          <p class="max-w-2xl mx-auto mb-8 text-white/90 " style="transition-delay: 100ms">
            Participez à nos cours de cuisine traditionnelle et découvrez les secrets des plats béninois. Une expérience immersive guidée par des chefs locaux passionnés.
          </p>
          <a href="#experiences" 
             @click.prevent="$emit('navigate-to', 'experiences')" 
             class="relative inline-block px-6 py-3 overflow-hidden font-bold transition-colors duration-300 transform bg-white rounded-lg text-benin-yellow hover:bg-benin-green hover:text-white hover:-translate-y-1 hover:shadow-xl group cooking-element"
             style="transition-delay: 200ms">
            <span class="relative z-10">Réserver un cours</span>
            <span class="absolute inset-0 bg-gradient-to-r from-benin-green via-white to-benin-yellow bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></span>
          </a>
        </div>
      </div>
      
      <!-- Bouton flottant pour déguster virtuellement -->
      <div 
  class="fixed z-20 items-center justify-center hidden w-16 h-16 transition-all duration-500 rounded-full shadow-lg cursor-pointer bottom-10 right-10 bg-benin-yellow"
  :class="{ 'opacity-100 translate-y-0': isSectionVisible, 'opacity-0 translate-y-10': !isSectionVisible }"
  ref="tasteButton"
  @click="playTasteAnimation"
  @mouseenter="hoverTaste = true" 
  @mouseleave="hoverTaste = false"
>
        <div class="flex items-center justify-center w-12 h-12 bg-white rounded-full">
          <i class="text-lg fas fa-utensils text-benin-yellow"></i>
        </div>
        <div :class="`absolute inset-0 rounded-full border-2 border-benin-green animate-ping ${hoverTaste ? 'opacity-100' : 'opacity-0'}`"></div>
        <span class="absolute px-3 py-1 text-xs text-white transition-opacity duration-300 transform -translate-x-1/2 rounded opacity-0 -top-10 left-1/2 bg-black/80 whitespace-nowrap" :class="{'opacity-100': hoverTaste}">Déguster virtuellement</span>
      </div>
      
      <!-- Modal de dégustation virtuelle -->
      <div 
        v-if="showTasteModal" 
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        @click.self="showTasteModal = false">
        <div 
          class="w-full max-w-lg p-6 transition-all duration-300 transform bg-white shadow-2xl rounded-xl"
          :class="{'scale-100 opacity-100': showTasteModal, 'scale-90 opacity-0': !showTasteModal}">
          <div class="flex items-start justify-between mb-4">
            <h3 class="text-xl font-bold font-display text-benin-yellow">Dégustation virtuelle</h3>
            <button @click="showTasteModal = false" class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="mb-6 text-center">
            <div class="flex items-center justify-center w-32 h-32 mx-auto mb-4 rounded-full bg-benin-yellow/10">
              <i class="text-4xl fas fa-utensils text-benin-yellow"></i>
            </div>
            <p class="text-gray-700">Imaginez les saveurs épicées, les arômes riches et les textures variées de la cuisine béninoise...</p>
          </div>
          
          <div class="flex justify-center">
            <button @click="showTasteModal = false" class="px-5 py-2 font-medium text-white transition-colors rounded-lg bg-benin-yellow hover:bg-benin-yellow/90">
              Continuer l'exploration
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrer les plugins GSAP
gsap.registerPlugin(ScrollTrigger);


export default {
  name: 'GastronomieSection',
  emits: ['navigate-to'],
 
  data() {
    return {
      isSectionVisible: false,
      hoverTaste: false,
      showTasteModal: false,
      showSpiceTooltip: null,
      
      // Ustensiles supplémentaires
      extraUtensils: [
        { 
          path: "M18.5,18.5C19.04,18.5 19.5,18.96 19.5,19.5C19.5,20.04 19.04,20.5 18.5,20.5C17.96,20.5 17.5,20.04 17.5,19.5C17.5,18.96 17.96,18.5 18.5,18.5M18.5,16.5C20.16,16.5 21.5,17.84 21.5,19.5C21.5,20.82 20.62,21.92 19.4,22.32C19.16,20.4 18.13,18.71 16.5,17.63V6.5C16.5,5.03 15.5,3.81 14.11,3.34L14.85,2.6C15.24,2.21 15.24,1.59 14.85,1.21C14.46,0.82 13.84,0.82 13.46,1.21L10.9,3.76C10.4,4.26 9.97,4.82 9.62,5.44L9.22,6.03C8.93,6.47 8.93,7.05 9.22,7.49L10.03,8.69C10.33,9.13 10.89,9.3 11.36,9.13V15.5C11.36,16.04 11.81,16.5 12.36,16.5C12.91,16.5 13.36,16.04 13.36,15.5V9.13C13.83,9.3 14.39,9.13 14.69,8.69L15.5,7.49C15.79,7.05 15.79,6.47 15.5,6.03L15.1,5.44L15.28,5.44C15.88,5.5 16.32,6 16.32,6.6V17.63C14.7,18.71 13.66,20.41 13.42,22.32C12.2,21.93 11.31,20.83 11.31,19.5C11.31,17.84 12.65,16.5 14.31,16.5C14.85,16.5 15.31,16.05 15.31,15.5C15.31,14.95 14.85,14.5 14.31,14.5C11.55,14.5 9.31,16.74 9.31,19.5C9.31,21.8 10.92,23.73 13.06,24.36C13.3,24.45 13.54,24.32 13.62,24.08C14.13,22.21 15.86,20.9 17.86,20.9C18.41,20.9 18.86,20.44 18.86,19.9C18.86,19.36 18.41,18.9 17.86,18.9C17.58,18.9 17.31,18.95 17.06,19.03C17.35,18.27 17.94,17.68 18.7,17.39C18.62,17.64 18.56,17.91 18.56,18.2C18.56,18.74 19.02,19.2 19.56,19.2C20.11,19.2 20.56,18.74 20.56,18.2C20.56,16.55 19.23,15.2 17.56,15.2C17.56,14.1 17.9,13.05 18.5,12.19C19.1,13.05 19.4,14.1 19.4,15.2H19.5C20.05,15.2 20.5,14.74 20.5,14.2C20.5,13.65 20.05,13.2 19.5,13.2V13.19C19.5,12.13 19.13,11.13 18.5,10.33C17.87,11.13 17.5,12.13 17.5,13.19V13.2C16.97,13.2 16.5,13.65 16.5,14.2C16.5,14.74 16.95,15.2 17.5,15.2C15.84,15.2 14.5,16.55 14.5,18.2C14.5,18.74 14.95,19.2 15.5,19.2C16.05,19.2 16.5,18.74 16.5,18.2C16.5,17.91 16.44,17.64 16.35,17.39C17.11,17.68 17.71,18.27 18,19.03C17.75,18.95 17.5,18.9 17.2,18.9C16.65,18.9 16.2,19.36 16.2,19.9C16.2,20.44 16.65,20.9 17.2,20.9C19.2,20.9 20.93,22.21 21.44,24.08C21.5,24.32 21.75,24.45 22,24.36C24.14,23.73 25.75,21.8 25.75,19.5C25.75,16.74 23.5,14.5 20.75,14.5C20.2,14.5 19.75,14.95 19.75,15.5C19.75,16.05 20.2,16.5 20.75,16.5C22.41,16.5 23.75,17.84 23.75,19.5C23.75,20.82 22.87,21.92 21.65,22.32C21.41,20.4 20.38,18.71 18.75,17.63V6.6C18.75,4.98 17.57,3.62 16,3.35V3.35L15.6,3.76L13.04,1.21C12.28,0.44 11,0.44 10.24,1.21L9.5,1.95C9.2,2.25 9.2,2.74 9.5,3.04L10.05,3.59C8.08,4.3 6.77,6.28 7.08,8.5L4.5,5.92C4.21,5.62 3.72,5.62 3.42,5.92C3.13,6.21 3.13,6.7 3.42,7L8.59,12.17C8.88,12.46 9.37,12.46 9.67,12.17C9.96,11.87 9.96,11.38 9.67,11.08L7.08,8.5C6.77,6.27 8.08,4.3 10.05,3.59L10.05,3.59L10.59,4.13C10.88,4.42 11.37,4.42 11.67,4.13C11.96,3.84 11.96,3.35 11.67,3.05L11.12,2.5C11.45,2.18 11.84,1.91 12.27,1.72L14.83,4.28C14.31,4.86 14,5.64 14,6.5V7.38L13.79,7.68L13.53,7.68L12.97,7.02C12.5,6.44 11.5,6.44 11.03,7.02L10.22,8.23C9.76,8.81 9.76,9.6 10.22,10.23L10.46,10.55C10.65,10.81 10.9,11 11.18,11.12V15.38C10.11,15.81 9.19,16.54 8.5,17.5C7.82,16.55 6.9,15.81 5.83,15.38V7.38L5.62,7.68L5.36,7.68L4.8,7.02C4.33,6.44 3.33,6.44 2.86,7.02L2.05,8.23C1.59,8.81 1.59,9.6 2.05,10.23L2.29,10.55C2.48,10.81 2.73,11 3.01,11.12V15.5C3.01,16.88 4.13,18 5.51,18H7.5C7.51,18 13.97,18 13.97,18C14.52,18 14.97,17.55 14.97,17C14.97,16.45 14.52,16 13.97,16H7.5C5.23,16 3.36,17.86 3.36,20.13V20.25C3.36,21.22 4.14,22 5.11,22C6.08,22 6.86,21.22 6.86,20.25V20.13C6.86,19.41 7.28,18.78 7.9,18.42C8.3,18.17 8.35,17.61 8.1,17.21C7.85,16.81 7.29,16.76 6.89,17.01C6.62,17.18 6.38,17.39 6.17,17.62C5.96,17.39 5.72,17.18 5.45,17.01C5.05,16.76 4.5,16.81 4.24,17.21C3.99,17.61 4.04,18.17 4.44,18.42C5.05,18.78 5.47,19.41 5.47,20.13V20.25C5.47,20.66 5.14,21 4.73,21C4.32,21 3.98,20.66 3.98,20.25V20.13C3.98,18.5 5.23,17.15 6.82,17.01C6.16,17.75 5.77,18.75 5.77,19.84C5.77,22.09 7.55,23.89 9.69,24.07C9.94,24.09 10.17,23.89 10.18,23.64C10.25,21.5 12.03,19.83 14.17,19.83C14.71,19.83 15.17,19.38 15.17,18.83C15.17,18.28 14.71,17.83 14.17,17.83C13.86,17.83 13.56,17.87 13.28,17.92C13.5,17.13 14.05,16.47 14.78,16.09C14.69,16.39 14.64,16.71 14.64,17.05C14.64,17.6 15.1,18.05 15.64,18.05C16.19,18.05 16.64,17.6 16.64,17.05C16.64,15.23 15.25,13.77 13.45,13.67C13.31,12.61 13.56,11.5 14.14,10.59C14.72,11.5 14.97,12.61 14.83,13.67C13.03,13.77 11.64,15.23 11.64,17.05C11.64,17.6 12.1,18.05 12.64,18.05C13.19,18.05 13.64,17.6 13.64,17.05C13.64,16.71 13.59,16.39 13.5,16.09C14.23,16.47 14.78,17.13 15,17.92C14.72,17.87 14.42,17.83 14.11,17.83C13.56,17.83 13.11,18.28 13.11,18.83C13.11,19.38 13.56,19.83 14.11,19.83C16.25,19.83 18.02,21.5 18.1,23.64C18.11,23.89 18.33,24.09 18.58,24.07C20.73,23.89 22.5,22.09 22.5,19.84C22.5,17.09 20.29,14.84 17.54,14.84C17,14.84 16.54,15.29 16.54,15.84C16.54,16.39 17,16.84 17.54,16.84C19.21,16.84 20.54,18.19 20.54,19.84C20.54,21.09 19.72,22.14 18.59,22.51C18.31,20.85 17.2,19.47 15.75,18.8C15.31,18.6 14.81,18.79 14.61,19.23C14.42,19.67 14.61,20.18 15.05,20.37C16.12,20.88 16.88,21.93 17.07,23.16C16.76,23.09 16.44,23.05 16.11,23.05C15.56,23.05 15.11,23.51 15.11,24.05C15.11,24.6 15.56,25.05 16.11,25.05C16.62,25.05 17.1,24.95 17.56,24.77C17.25,25.17 16.85,25.51 16.41,25.77C16.01,26.03 15.94,26.58 16.21,26.98C16.37,27.23 16.65,27.37 16.94,27.37C17.1,27.37 17.26,27.33 17.41,27.23C18.43,26.62 19.21,25.7 19.6,24.6C20,25.7 20.77,26.62 21.79,27.23C21.93,27.32 22.1,27.37 22.26,27.37C22.55,27.37 22.83,27.23 22.99,26.98C23.26,26.58 23.19,26.03 22.79,25.77C22.35,25.51 21.95,25.17 21.64,24.77C22.74,25.24 23.98,25.3 25.14,24.9C25.57,24.76 25.8,24.3 25.65,23.87C25.51,23.44 25.05,23.22 24.62,23.36C23.8,23.64 22.9,23.58 22.1,23.23C23.84,22.5 25.08,20.86 25.15,18.92C25.16,18.37 24.71,17.92 24.17,17.92C23.62,17.92 23.17,18.37 23.16,18.92C23.1,20.47 22.06,21.74 20.59,22.13C20.73,21 21.3,20 22.14,19.34C22.5,19.05 22.55,18.5 22.26,18.14C21.97,17.78 21.42,17.73 21.05,18.02C20.39,18.56 19.84,19.25 19.46,20.03C19.08,19.25 18.56,18.55 17.86,18.02C17.5,17.74 16.95,17.78 16.65,18.14C16.35,18.49 16.4,19.04 16.75,19.34C17.59,20 18.16,21 18.31,22.13C16.84,21.74 15.8,20.47 15.73,18.92C15.72,18.37 15.27,17.92 14.73,17.92C14.18,17.92 13.73,18.37 13.74,18.92C13.81,20.86 15.05,22.5 16.79,23.23C16,23.58 15.1,23.64 14.27,23.36C13.84,23.21 13.38,23.44 13.24,23.87C13.09,24.3 13.32,24.76 13.75,24.9C14.91,25.3 16.15,25.24 17.25,24.77C16.94,25.17 16.54,25.51 16.1,25.77C15.7,26.03 15.63,26.58 15.9,26.98C16.06,27.23 16.34,27.37 16.63,27.37C16.79,27.37 16.95,27.33 17.1,27.23C17.83,26.81 18.43,26.2 18.88,25.49C19.33,26.2 19.93,26.81 20.66,27.23C20.81,27.33 20.97,27.37 21.13,27.37C21.42,27.37 21.7,27.23 21.86,26.98C22.13,26.58 22.06,26.03 21.66,25.77C21.23,25.51 20.83,25.17 20.51,24.77C21.62,25.24 22.86,25.3 24.01,24.9C24.44,24.76 24.67,24.3 24.52,23.87C24.38,23.44 23.92,23.22 23.49,23.36C22.67,23.64 21.77,23.58 20.97,23.23C22.71,22.5 23.95,20.86 24.02,18.92C24.03,18.37 23.58,17.92 23.04,17.92C22.49,17.92 22.04,18.37 22.03,18.92C21.97,20.47 20.93,21.74 19.46,22.13C19.6,21 20.17,20 21.01,19.34C21.37,19.05 21.42,18.5 21.13,18.14C20.84,17.78 20.29,17.73 19.92,18.02C19.26,18.56 18.71,19.25 18.33,20.03C17.95,19.25 17.4,18.55 16.74,18.02C16.37,17.74 15.83,17.78 15.53,18.14C15.24,18.5 15.28,19.05 15.64,19.34C16.48,20 17.05,21 17.19,22.13C15.72,21.74 14.68,20.47 14.62,18.92C14.61,18.37 14.16,17.92 13.61,17.92C13.06,17.92 12.61,18.37 12.62,18.92C12.69,20.86 13.93,22.5 15.67,23.23C14.87,23.58 13.97,23.64 13.15,23.36C12.72,23.21 12.26,23.44 12.12,23.87C11.97,24.3 12.2,24.76 12.63,24.9C13.79,25.3 15.03,25.24 16.13,24.77C15.82,25.17 15.42,25.51 14.98,25.77C14.58,26.03 14.51,26.58 14.78,26.98C14.94,27.23 15.22,27.37 15.51,27.37C15.67,27.37 15.83,27.33 15.98,27.23C16.71,26.81 17.31,26.2 17.76,25.49C18.21,26.2 18.81,26.81 19.54,27.23C19.69,27.33 19.85,27.37 20.01,27.37C20.3,27.37 20.58,27.23 20.74,26.98C21.01,26.58 20.94,26.03 20.54,25.77C20.1,25.51 19.7,25.17 19.39,24.77C20.5,25.24 21.74,25.3 22.89,24.9C23.32,24.76 23.55,24.3 23.4,23.87C23.26,23.44 22.8,23.22 22.37,23.36C21.55,23.64 20.65,23.58 19.85,23.23C21.59,22.5 22.83,20.86 22.9,18.92C22.91,18.37 22.46,17.92 21.92,17.92C21.37,17.92 20.92,18.37 20.91,18.92C20.85,20.47 19.81,21.74 18.34,22.13C18.48,21 19.05,20 19.89,19.34C20.25,19.05 20.3,18.5 20.01,18.14C19.72,17.78 19.17,17.73 18.8,18.02C18.14,18.56 17.59,19.25 17.21,20.03C16.83,19.25 16.28,18.55 15.62,18.02C15.25,17.74 14.71,17.78 14.41,18.14C14.12,18.5 14.16,19.05 14.52,19.34C15.36,20 15.93,21 16.07,22.13C14.6,21.74 13.56,20.47 13.5,18.92C13.49,18.37 13.04,17.92 12.49,17.92C11.94,17.92 11.49,18.37 11.5,18.92C11.57,20.86 12.81,22.5 14.55,23.23C13.75,23.58 12.85,23.64 12.03,23.36C11.59,23.21 11.14,23.44 11,23.87C10.85,24.3 11.08,24.76 11.51,24.9C12.67,25.3 13.91,25.24 15.01,24.77C14.7,25.17 14.3,25.51 13.86,25.77C13.46,26.03 13.39,26.58 13.66,26.98C13.82,27.23 14.1,27.37 14.39,27.37C14.55,27.37 14.71,27.33 14.86,27.23C15.59,26.81 16.19,26.2 16.64,25.49C17.09,26.2 17.69,26.81 18.42,27.23C18.57,27.33 18.73,27.37 18.89,27.37C19.18,27.37 19.46,27.23 19.62,26.98C19.89,26.58 19.82,26.03 19.42,25.77C18.98,25.51 18.58,25.17 18.27,24.77C19.38,25.24 20.62,25.3 21.77,24.9C22.2,24.76 22.43,24.3 22.28,23.87C22.14,23.44 21.68,23.22 21.25,23.36C20.43,23.64 19.53,23.58 18.73,23.23C20.47,22.5 21.71,20.86 21.78,18.92C21.79,18.37 21.34,17.92 20.8,17.92", 
          color: "benin-yellow/10", 
          top: "20%", 
          left: "65%", 
          size: 30, 
          rotation: 45, 
          speed: 0.02
        },
        { 
          path: "M12,2C14.65,2 17.19,3.06 19.07,4.93L17.65,6.35C16.15,4.85 14.12,4 12,4C9.88,4 7.84,4.84 6.35,6.35L4.93,4.93C6.81,3.06 9.35,2 12,2M3.66,6.5L5.11,7.94C4.39,9.17 4,10.57 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,10.57 19.61,9.17 18.88,7.94L20.34,6.5C21.42,8.12 22,10 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12C2,10 2.58,8.11 3.66,6.5M12,6A6,6 0 0,1 18,12C18,13.59 17.37,15.12 16.24,16.24L14.83,14.83C15.55,14.12 16,13.06 16,12A4,4 0 0,0 12,8C10.94,8 9.88,8.45 9.17,9.17L7.76,7.76C8.88,6.63 10.41,6 12,6M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10Z", 
          color: "benin-green/10", 
          top: "60%", 
          left: "80%", 
          size: 35, 
          rotation: -30, 
          speed: 0.03
        },
        { 
          path: "M8.1,13.34L3.91,9.16C2.35,7.59 2.35,5.06 3.91,3.5L10.93,10.5L8.1,13.34M14.88,11.53L13.41,13L20.29,19.88L18.88,21.29L12,14.41L5.12,21.29L3.71,19.88L13.47,10.12C12.76,8.59 13.26,6.44 14.85,4.85C16.76,2.93 19.5,2.57 20.96,4.03C22.43,5.5 22.07,8.24 20.15,10.15C18.56,11.74 16.41,12.24 14.88,11.53Z", 
          color: "benin-culture/10", 
          top: "30%", 
          left: "40%", 
          size: 50, 
          rotation: 15, 
          speed: 0.04
        }
      ],
      
      // Ingrédients de l'Amiwo
      amiwoIngredients: [
        { icon: 'fa-seedling', text: 'Farine de maïs fermentée' },
        { icon: 'fa-drumstick-bite', text: 'Poulet mariné aux épices' },
        { icon: 'fa-apple-alt', text: 'Tomates fraîches' },
        { icon: 'fa-fire-alt', text: 'Piment et épices locales' }
      ],
      
      // Plats béninois
      dishes: [
        {
          title: 'Sauce Arachide',
          subtitle: 'Avec viande ou poisson',
          type: 'Plat principal',
          image: '/img/sauce-arachide.webp',
          description: 'Cette sauce onctueuse à base de pâte d\'arachide est servie avec de la viande ou du poisson et accompagnée de pâte de maïs ou de riz. Un plat réconfortant et nourrissant.',
          spiceLevel: 2
        },
        {
          title: 'Wagasi',
          subtitle: 'Fromage peulh grillé',
          type: 'Entrée',
          image: '/img/wagasi.webp',
          description: 'Ce fromage traditionnel des Peulhs du nord du Bénin est souvent grillé et servi avec des oignons et des tomates. Une spécialité protéinée au goût unique.',
          spiceLevel: 1
        },
        {
          title: 'Akassa',
          subtitle: 'Pâte de maïs fermentée',
          type: 'Accompagnement',
          image: '/img/akassa.webp',
          description: 'Cette pâte de maïs fermentée est un accompagnement de base dans la cuisine béninoise. Sa texture légèrement acide se marie parfaitement avec les sauces épicées.',
          spiceLevel: 0
        },
        {
          title: 'Kuli-Kuli',
          subtitle: 'Beignets d\'arachide',
          type: 'Snack',
          image: '/img/kuli-kuli.webp',
          description: 'Ces beignets croustillants à base d\'arachide sont un en-cas populaire au Bénin. Parfaits pour grignoter à toute heure, ils sont souvent vendus par les marchands ambulants.',
          spiceLevel: 2
        },
        {
          title: 'Ablo',
          subtitle: 'Pain de riz à la vapeur',
          type: 'Accompagnement',
          image: '/img/ablo.webp',
          description: 'Ce pain de riz cuit à la vapeur est légèrement fermenté et souvent servi avec du poisson frit ou des sauces. Sa texture moelleuse en fait un accompagnement très apprécié.',
          spiceLevel: 0
        },
        {
          title: 'Atassi',
          subtitle: 'Riz aux haricots',
          type: 'Plat principal',
          image: '/img/atassi.webp',
          description: 'Mélange savoureux de riz et de haricots, l\'Atassi est un plat emblématique du Bénin généralement servi avec de la friture et accompagné de poisson, viande ou fromage local.',
          spiceLevel: 2
        }
      ],
      
      // Boissons traditionnelles
      drinks: [
        {
          name: 'Sodabi',
          type: 'Alcool de palme distillé',
          icon: 'fa-glass-whiskey',
          color: 'benin-yellow',
          mainColor: 'benin-yellow',
          description: 'Cette eau-de-vie traditionnelle est distillée à partir de vin de palme. Boisson emblématique du Bénin, elle est souvent utilisée lors des cérémonies et peut être infusée avec diverses plantes médicinales.'
        },
        {
          name: 'Tchoukoutou',
          type: 'Bière de mil traditionnelle',
          icon: 'fa-beer',
          color: 'benin-culture',
          mainColor: 'benin-culture',
          description: 'Cette bière artisanale à base de mil fermenté est particulièrement populaire dans le nord du Bénin. Légèrement acide et peu alcoolisée, elle est servie dans des calebasses et consommée fraîche.'
        },
        {
          name: 'Bissap',
          type: 'Jus d\'hibiscus',
          icon: 'fa-cocktail',
          color: 'benin-red',
          mainColor: 'benin-red',
          description: 'Cette boisson rafraîchissante est préparée à partir de fleurs d\'hibiscus séchées, infusées dans l\'eau et sucrée. Sa couleur rouge vif et son goût légèrement acidulé en font une boisson très appréciée, surtout pendant les périodes chaudes.'
        }
      ]
    };
  },
  
  mounted() {
    
    // Initialiser les animations GSAP après le montage
    this.$nextTick(() => {
      this.initParallaxEffects();
      this.initScrollAnimations();
      this.initSpiceParticles();
      
      // Fallback pour garantir la visibilité
      setTimeout(() => {
        // S'assurer que les éléments sont visibles même si GSAP échoue
        const elements = [
          this.$refs.featuredDish,
          this.$refs.gridTitle,
          this.$refs.drinksSection,
          this.$refs.cookingBanner
        ];
        
        elements.forEach(el => {
          if (el && el.style) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }
        });
        
        // Rendre visible les cartes de plats
        document.querySelectorAll('.dish-card').forEach(el => {
          el.style.opacity = '1';
        });
      }, 1000);
    });
  },
 
  
  beforeUnmount() {
    // Nettoyer l'observer
   
    // Nettoyer les ScrollTriggers pour éviter les fuites de mémoire
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  },
  
  methods: {
    // Effet parallaxe pour les images et ustensiles
    initParallaxEffects() {
      // Parallaxe sur l'image principale
      if (this.$refs.parallaxImage) {
        this.$refs.gastroSection.addEventListener('mousemove', (e) => {
          const { clientX, clientY } = e;
          const xPos = (window.innerWidth / 2 - clientX) / 30;
          const yPos = (window.innerHeight / 2 - clientY) / 30;
          
          gsap.to(this.$refs.parallaxImage.querySelector('img'), {
            x: xPos,
            y: yPos,
            duration: 0.8,
            ease: 'power1.out'
          });
        });
      }
      
      // Animation des ustensiles flottants
      const culinaryIcons = document.querySelectorAll('.culinary-icon');
      culinaryIcons.forEach(icon => {
        const speed = icon.getAttribute('data-speed') || 0.02;
        
        this.$refs.gastroSection.addEventListener('mousemove', (e) => {
          const { clientX, clientY } = e;
          const xPos = (window.innerWidth / 2 - clientX) * speed;
          const yPos = (window.innerHeight / 2 - clientY) * speed;
          
          gsap.to(icon, {
            x: xPos,
            y: yPos,
            rotation: xPos * 0.05,
            duration: 1,
            ease: 'power1.out'
          });
        });
      });
      
      // Animer la vapeur sur l'image principale
      gsap.to(this.$refs.steamEffect, {
        opacity: 0.7,
        duration: 2,
        delay: 1,
        repeat: -1,
        yoyo: true
      });
      
      // Parallaxe léger sur les images de plats
      document.querySelectorAll('.dish-image-container').forEach(container => {
        container.addEventListener('mousemove', (e) => {
          const { clientX, clientY, target } = e;
          const rect = target.getBoundingClientRect();
          const xPos = (clientX - rect.left) / rect.width - 0.5;
          const yPos = (clientY - rect.top) / rect.height - 0.5;
          
          gsap.to(container.querySelector('img'), {
            x: xPos * 10,
            y: yPos * 10,
            duration: 0.5,
            ease: 'power1.out'
          });
        });
        
        container.addEventListener('mouseleave', () => {
          gsap.to(container.querySelector('img'), {
            x: 0,
            y: 0,
            duration: 0.5
          });
        });
      });
    },
    
    // Animations au défilement
    initScrollAnimations() {
      // Animation du titre et sous-titre
      gsap.from(this.$refs.headerBadge, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: this.$refs.headerSection,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
      
      gsap.from(this.$refs.headerTitle, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: this.$refs.headerSection,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
      
      gsap.from(this.$refs.headerText, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: this.$refs.headerSection,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
      
      // Animation du plat vedette
      gsap.from(this.$refs.featuredDish, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: this.$refs.featuredDish,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
      
      // Animation de la description du plat avec effet machine à écrire
      const textElement = this.$refs.dishDescription;
      if (textElement) {
        const text = textElement.textContent;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: textElement,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });
        
        tl.from(textElement, {
          opacity: 0,
          duration: 0.5
        });
      }
      
      // Animation des ingrédients
      const ingredients = document.querySelectorAll('.ingredient-item');
      ingredients.forEach(ingredient => {
        const delay = ingredient.getAttribute('data-delay') || 0;
        gsap.from(ingredient, {
          opacity: 0,
          x: -20,
          duration: 0.6,
          delay: parseFloat(delay),
          scrollTrigger: {
            trigger: ingredient,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        });
      });
      
      // Animation du titre de la grille
      gsap.from(this.$refs.gridTitle, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: this.$refs.gridTitle,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
      
      // Animation des cartes de plats
      const cards = document.querySelectorAll('.dish-card');
      cards.forEach((card, index) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        });
      });
      
      // Animation de la section boissons
      gsap.to(this.$refs.drinksSection, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: this.$refs.drinksSection,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
      
      // Animation des cartes de boissons
      const drinkCards = document.querySelectorAll('.drink-card');
      drinkCards.forEach(card => {
        const delay = card.getAttribute('data-delay') || 0;
        gsap.from(card, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: parseFloat(delay),
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });
      
      // Animation du banner cours de cuisine
      gsap.to(this.$refs.cookingBanner, {
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: this.$refs.cookingBanner,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
      
      // Animation du bouton de dégustation
      gsap.to(this.$refs.tasteButton, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: this.$refs.gastroSection,
          start: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      });
      
      // Effet de zoom sur l'image CTA au défilement
      ScrollTrigger.create({
        trigger: this.$refs.cookingBanner,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(this.$refs.cookingBannerImage, {
            scale: 1.1 + (progress * 0.1),
            duration: 0.5
          });
        }
      });
    },
    
    // Particules d'épices flottantes
    initSpiceParticles() {
      const container = this.$refs.spicesContainer;
      const particleCount = 30;
      const colors = ['#FCD11633', '#E8112D22', '#00875122'];
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 1;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Formes aléatoires pour les particules d'épices
        const shapes = ['circle', 'square', 'triangle'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        
        if (shape === 'circle') {
          particle.style.borderRadius = '50%';
        } else if (shape === 'triangle') {
          particle.style.width = '0';
          particle.style.height = '0';
          particle.style.backgroundColor = 'transparent';
          particle.style.borderLeft = `${size}px solid transparent`;
          particle.style.borderRight = `${size}px solid transparent`;
          particle.style.borderBottom = `${size * 1.5}px solid ${color}`;
        }
        
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.opacity = Math.random() * 0.7 + 0.1;
        particle.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        container.appendChild(particle);
        
        // Animation aléatoire pour chaque particule
        gsap.to(particle, {
          y: `${Math.random() * 200 - 100}`,
          x: `${Math.random() * 200 - 100}`,
          rotation: Math.random() * 360,
          opacity: 0,
          duration: Math.random() * 15 + 10,
          repeat: -1,
          repeatRefresh: true,
          ease: 'none'
        });
      }
    },
    
    // Animation de dégustation virtuelle
    playTasteAnimation() {
      // Ouvrir la modal de dégustation
      this.showTasteModal = true;
      
      // Animation du bouton
      gsap.to(this.$refs.tasteButton, {
        scale: 1.2,
        duration: 0.2,
        yoyo: true,
        repeat: 1
      });
    },
    
    // Texte pour le niveau d'épice
    getSpiceLevelText(level) {
      switch(level) {
        case 0: return 'Doux';
        case 1: return 'Légèrement épicé';
        case 2: return 'Épicé';
        case 3: return 'Très épicé';
        default: return 'Non défini';
      }
    }
  }
};


</script>

<style scoped>
/* Animations de base */
.dish-card {
  transform: translateY(20px);
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.dish-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Animation du texte gradient */


@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Effet shimmer pour les boutons */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.animate-shimmer {
  animation: shimmer 3s linear infinite;
}

/* Effet d'overlay sur les plats */
.dish-overlay {
  transition: opacity 0.5s ease;
}

/* Animations pour les éléments cooking */
.cooking-element {
  opacity: 0;
  transform: translateY(15px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.cooking-cta:hover .cooking-element {
  opacity: 1;
  transform: translateY(0);
}

/* Niveau d'épice interactif */
.spice-level {
  position: relative;
  cursor: help;
  transition: transform 0.3s ease;
}

.spice-level:hover {
  transform: scale(1.1);
}

/* Animation des bulles pour les boissons */
.bubbles-container {
  transition: opacity 0.5s ease;
}

.drink-card:hover .bubbles-container {
  opacity: 1;
}

/* Animation de la vapeur */
@keyframes float-slow {
  0% { transform: translateY(0) scale(1); opacity: 0.5; }
  50% { transform: translateY(-15px) scale(1.1); opacity: 0.2; }
  100% { transform: translateY(-30px) scale(0.8); opacity: 0; }
}

.steam-effect > div {
  animation: float-slow 4s infinite ease-in-out;
}
</style>