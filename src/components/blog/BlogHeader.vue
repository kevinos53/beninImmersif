<template>
    <header class="relative min-h-[60vh] flex items-center overflow-hidden">
      <!-- Arrière-plan avec parallaxe -->
      <div class="absolute inset-0 z-0" ref="parallaxBg">
        <div class="absolute inset-0 z-10 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
        <img 
          src="/img/blog/blog-header-bg.jpg" 
          alt="Scène culturelle du Bénin" 
          class="object-cover w-full h-full"
        >
      </div>
      
      <!-- Éléments flottants décoratifs -->
      <div class="absolute inset-0 z-10 pointer-events-none" ref="decorElements">
        <!-- Symboles africains stylisés -->
        <svg class="absolute w-24 h-24 top-1/4 left-1/5 text-benin-green opacity-20 animate-float-slow" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M9,8A2,2 0 0,0 7,10A2,2 0 0,0 9,12A2,2 0 0,0 11,10A2,2 0 0,0 9,8M15,8A2,2 0 0,0 13,10A2,2 0 0,0 15,12A2,2 0 0,0 17,10A2,2 0 0,0 15,8M12,14C10.89,14 10,14.89 10,16V18H14V16C14,14.89 13.11,14 12,14Z" />
        </svg>
        
        <div class="absolute w-32 h-32 border-2 rounded-full bottom-1/3 right-1/4 border-benin-yellow opacity-30 animate-spin-slower"></div>
      </div>
      
      <!-- Contenu principal -->
      <div class="container relative z-20 px-4 mx-auto">
        <div class="max-w-3xl">
          <span 
            class="inline-block px-3 py-1 mb-4 text-sm font-medium text-white transition-all duration-500 transform rounded-full bg-benin-green"
            ref="headerBadge"
          >
            BLOG & RÉCITS
          </span>
          
          <h1 
            class="mb-6 text-4xl font-bold text-gray-800 font-display md:text-6xl"
            ref="headerTitle"
          >
            Nos <span class="text-benin-green">histoires</span> du Bénin
          </h1>
          
          <p 
            class="mb-8 text-lg text-gray-700 md:text-xl"
            ref="headerText"
          >
            Plongez dans notre collection d'articles sur la culture, les traditions, la gastronomie et les conseils de voyage pour découvrir le Bénin comme jamais.
          </p>
          
          <!-- Barre de recherche -->
          <div 
            class="flex items-center max-w-lg p-2 bg-white rounded-xl shadow-lg"
            ref="searchBar"
          >
            <input 
              type="text" 
              placeholder="Rechercher un article..." 
              class="flex-grow px-4 py-2 text-gray-800 bg-transparent outline-none"
            >
            <button class="p-3 text-white transition-colors duration-300 rounded-lg bg-benin-green hover:bg-benin-green-600">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Vague de séparation -->
      <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <svg class="relative block w-full h-[70px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="fill-white"></path>
        </svg>
      </div>
    </header>
  </template>
  
  <script>
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
  // Enregistrer GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  export default {
    name: 'BlogHeader',
    
    mounted() {
      this.initParallaxEffect();
      this.initHeaderAnimations();
    },
    
    methods: {
      initParallaxEffect() {
        // Effet de parallaxe sur l'arrière-plan
        gsap.to(this.$refs.parallaxBg.querySelector('img'), {
          y: "30%",
          scrollTrigger: {
            trigger: this.$el,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
        
        // Animation des éléments décoratifs au défilement
        gsap.to(this.$refs.decorElements.children, {
          y: "-20%",
          scrollTrigger: {
            trigger: this.$el,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      },
      
      initHeaderAnimations() {
        // Animation du badge d'en-tête
        gsap.from(this.$refs.headerBadge, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: 0.2
        });
        
        // Animation du titre
        gsap.from(this.$refs.headerTitle, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: 0.4
        });
        
        // Animation du texte
        gsap.from(this.$refs.headerText, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: 0.6
        });
        
        // Animation de la barre de recherche
        gsap.from(this.$refs.searchBar, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: 0.8
        });
      }
    }
  };
  </script>