<template>
    <section class="relative px-4 py-16 overflow-hidden bg-white md:px-8">
      <!-- Éléments décoratifs -->
      <div class="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div class="absolute w-32 h-32 rounded-full top-10 left-10 bg-benin-green blur-[50px]"></div>
        <div class="absolute w-48 h-48 rounded-full bottom-20 right-20 bg-benin-yellow blur-[80px]"></div>
        <div class="absolute w-64 h-64 transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-benin-green-100 blur-[100px]"></div>
      </div>
      
      <div class="container relative z-10 mx-auto">
        <div class="flex flex-col items-center gap-6 lg:flex-row lg:gap-12">
          <!-- Image de l'événement avec effet de profondeur -->
          <div 
            class="overflow-hidden transition-all duration-500 transform shadow-xl lg:w-1/2 rounded-2xl hover:scale-105 hover:shadow-2xl bg-white"
            ref="featuredImage"
          >
            <div class="relative">
              <!-- Badge date -->
              <div class="absolute z-10 flex flex-col items-center justify-center w-20 h-20 text-white rounded-lg shadow-lg top-6 left-6 bg-benin-green">
                <span class="text-sm font-medium">JAN</span>
                <span class="text-2xl font-bold">10</span>
                <span class="text-xs">2026</span>
              </div>
              
              <!-- Overlay de survol -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              
              <!-- Image -->
              <img 
                src="/img/events/vodoun-festival.jpg" 
                alt="Festival International de Vodoun" 
                class="w-full h-auto lg:h-[500px] object-cover transition-transform duration-700 hover:scale-110"
              >
            </div>
          </div>
          
          <!-- Détails de l'événement -->
          <div class="lg:w-1/2" ref="featuredContent">
            <span class="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-benin-green-50 text-benin-green">
              À LA UNE
            </span>
            
            <h2 class="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">
              Festival International de <span class="text-benin-green">Vodoun</span>
            </h2>
            
            <div class="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
              <div class="flex items-center">
                <i class="mr-2 fas fa-map-marker-alt text-benin-green"></i>
                <span>Ouidah, Bénin</span>
              </div>
              
              <div class="flex items-center">
                <i class="mr-2 fas fa-calendar-day text-benin-green"></i>
                <span>10 - 15 Janvier 2026</span>
              </div>
              
              <div class="flex items-center">
                <i class="mr-2 fas fa-ticket-alt text-benin-green"></i>
                <span>Accès libre</span>
              </div>
            </div>
            
            <p class="mb-6 text-gray-600">
              Assistez au plus grand festival vodoun au monde, où traditions ancestrales et célébrations contemporaines se rencontrent. Pendant 5 jours, Ouidah devient l'épicentre de la culture vodoun avec des cérémonies spectaculaires, des rituels sacrés et des performances artistiques.
            </p>
            
            <div class="mb-8">
              <h3 class="mb-3 font-semibold text-benin-green">Points forts de l'événement:</h3>
              <ul class="space-y-2 text-gray-600">
                <li class="flex items-start">
                  <i class="fas fa-circle text-xs text-benin-green mt-1.5 mr-2"></i>
                  <span>Grande cérémonie d'ouverture sur la plage de Ouidah</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-circle text-xs text-benin-green mt-1.5 mr-2"></i>
                  <span>Rituels traditionnels conduits par des prêtres vodoun</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-circle text-xs text-benin-green mt-1.5 mr-2"></i>
                  <span>Défilés des couvents et processions culturelles</span>
                </li>
                <li class="flex items-start">
                  <i class="fas fa-circle text-xs text-benin-green mt-1.5 mr-2"></i>
                  <span>Marché d'artisanat et gastronomie traditionnelle</span>
                </li>
              </ul>
            </div>
            
            <div class="flex flex-wrap gap-4">
              <button class="px-6 py-3 font-semibold text-white transition-all duration-300 rounded-lg bg-benin-green hover:bg-benin-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-benin-green focus:ring-offset-2">
                <i class="mr-2 fas fa-calendar-plus"></i> Ajouter au calendrier
              </button>
              
              <button class="px-6 py-3 font-semibold transition-all duration-300 border-2 rounded-lg border-benin-green text-benin-green hover:bg-benin-green-50 hover:scale-105 focus:outline-none focus:ring-2">
                Plus d'informations
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
  
  gsap.registerPlugin(ScrollTrigger);
  
  export default {
    name: 'FeaturedEvent',
    
    mounted() {
      this.initScrollAnimations();
    },
    
    methods: {
      initScrollAnimations() {
        gsap.from(this.$refs.featuredImage, {
          opacity: 0,
          x: -50,
          duration: 1,
          scrollTrigger: {
            trigger: this.$refs.featuredImage,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse"
          }
        });
        
        gsap.from(this.$refs.featuredContent, {
          opacity: 0,
          x: 50,
          duration: 1,
          scrollTrigger: {
            trigger: this.$refs.featuredContent,
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse"
          }
        });
      }
    }
  };
  </script>