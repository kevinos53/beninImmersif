<template>
    <section class="relative py-16 overflow-hidden bg-gradient-to-b from-white to-benin-green-50/20">
      <!-- Éléments décoratifs -->
      <div class="absolute inset-0 pointer-events-none opacity-10">
        <div class="absolute top-0 right-0 w-1/3 h-1/2 bg-benin-yellow blur-[150px]"></div>
        <div class="absolute bottom-0 left-0 w-1/4 h-1/3 bg-benin-green blur-[120px]"></div>
      </div>
      
      <div class="container px-4 mx-auto">
        <div class="flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
          <!-- Galerie d'images -->
          <div class="lg:w-1/2" ref="galleryContainer">
            <div class="relative overflow-hidden shadow-xl rounded-2xl bg-white">
              <!-- Image principale -->
              <div class="aspect-w-16 aspect-h-9">
                <img 
                  :src="currentImage.src" 
                  :alt="currentImage.alt" 
                  class="object-cover w-full h-full transition-transform duration-1000 transform hover:scale-110"
                >
              </div>
              
              <!-- Badge en promo -->
              <div class="absolute z-10 px-3 py-1 text-sm font-medium text-white rounded-full top-4 left-4 bg-benin-red">
                COUP DE CŒUR
              </div>
              
              <!-- Badge prix -->
              <div class="absolute z-10 px-3 py-1 text-sm font-bold rounded-full top-4 right-4 bg-benin-green text-white">
                À partir de 150€ / nuit
              </div>
              
              <!-- Boutons de navigation de la galerie -->
              <div class="absolute flex gap-2 bottom-4 right-4">
                <button 
                  class="flex items-center justify-center w-10 h-10 transition-colors duration-300 rounded-full bg-white/90 text-gray-600 hover:bg-benin-green hover:text-white backdrop-blur-sm"
                  @click="prevImage"
                >
                  <i class="fas fa-chevron-left"></i>
                </button>
                <button 
                  class="flex items-center justify-center w-10 h-10 transition-colors duration-300 rounded-full bg-white/90 text-gray-600 hover:bg-benin-green hover:text-white backdrop-blur-sm"
                  @click="nextImage"
                >
                  <i class="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
            
            <!-- Vignettes -->
            <div class="flex gap-3 mt-4">
              <div 
                v-for="(image, index) in featuredImages" 
                :key="index"
                class="w-1/4 overflow-hidden transition-all duration-300 rounded-lg cursor-pointer aspect-w-4 aspect-h-3 shadow-sm"
                :class="{ 'ring-2 ring-benin-green': currentImageIndex === index, 'opacity-70 hover:opacity-100': currentImageIndex !== index }"
                @click="currentImageIndex = index"
              >
                <img :src="image.src" :alt="image.alt" class="object-cover w-full h-full">
              </div>
            </div>
          </div>
          
          <!-- Informations sur l'hébergement -->
          <div class="lg:w-1/2" ref="contentContainer">
            <span class="inline-block px-3 py-1 mb-3 text-sm rounded-full bg-benin-green-50 text-benin-green">
              HÉBERGEMENT EXCEPTIONNEL
            </span>
            
            <h2 class="mb-3 text-3xl font-bold text-gray-800 md:text-4xl">
              Royal Palm Hôtel <span class="text-benin-green">& Spa</span>
            </h2>
            
            <div class="flex items-center mb-4">
              <div class="flex items-center mr-3">
                <i v-for="i in 5" :key="i" class="text-sm fas fa-star text-benin-yellow"></i>
              </div>
              <div class="px-2 py-0.5 bg-benin-green-50 text-benin-green text-xs rounded">
                9.2 Exceptionnel (142 avis)
              </div>
              <div class="flex items-center ml-3 text-sm text-gray-500">
                <i class="mr-1 fas fa-map-marker-alt text-benin-green"></i>
                Cotonou, Bénin
              </div>
            </div>
            
            <p class="mb-6 text-gray-600">
              Niché au cœur de Cotonou, le Royal Palm Hôtel & Spa offre une expérience de luxe combinant élégance contemporaine et touches traditionnelles béninoises. Avec une vue imprenable sur l'océan Atlantique, cet établissement 5 étoiles propose des chambres spacieuses, un spa de classe mondiale et une cuisine raffinée mettant en valeur les saveurs locales.
            </p>
            
            <!-- Caractéristiques -->
            <div class="grid grid-cols-2 gap-4 mb-8 md:grid-cols-3">
              <div class="flex items-center text-gray-600">
                <i class="mr-2 fas fa-wifi text-benin-green"></i>
                <span>Wi-Fi gratuit</span>
              </div>
              <div class="flex items-center text-gray-600">
                <i class="mr-2 fas fa-swimming-pool text-benin-green"></i>
                <span>Piscine à débordement</span>
              </div>
              <div class="flex items-center text-gray-600">
                <i class="mr-2 fas fa-spa text-benin-green"></i>
                <span>Spa & bien-être</span>
              </div>
              <div class="flex items-center text-gray-600">
                <i class="mr-2 fas fa-utensils text-benin-green"></i>
                <span>Restaurant gastronomique</span>
              </div>
              <div class="flex items-center text-gray-600">
                <i class="mr-2 fas fa-cocktail text-benin-green"></i>
                <span>Bar panoramique</span>
              </div>
              <div class="flex items-center text-gray-600">
                <i class="mr-2 fas fa-concierge-bell text-benin-green"></i>
                <span>Service en chambre 24/7</span>
              </div>
            </div>
            
            <!-- Boutons d'action -->
            <div class="flex flex-wrap gap-4">
              <a href="/hebergement/royal-palm-hotel-spa" class="px-6 py-3 font-semibold text-white transition-all duration-300 rounded-lg bg-benin-green hover:bg-benin-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-benin-green focus:ring-offset-2 inline-flex items-center">
                <i class="mr-2 fas fa-hotel"></i> Voir les chambres
              </a>
              
              <a href="/hebergement/royal-palm-hotel-spa" class="px-6 py-3 font-semibold transition-all duration-300 border-2 rounded-lg border-benin-green text-benin-green hover:bg-benin-green-50 hover:scale-105 focus:outline-none focus:ring-2 inline-flex items-center">
                <i class="mr-2 fas fa-images"></i> Toutes les photos
              </a>
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
    name: 'FeaturedAccommodation',
    
    data() {
      return {
        currentImageIndex: 0,
        featuredImages: [
          {
            src: '/img/accommodation/royal-palm-01.webp',
            alt: 'Vue extérieure du Royal Palm Hôtel & Spa'
          },
          {
            src: '/img/accommodation/royal-palm-2.webp',
            alt: 'Chambre de luxe avec vue sur l\'océan'
          },
          {
            src: '/img/accommodation/royal-palm-3.webp',
            alt: 'Piscine à débordement avec vue panoramique'
          },
          {
            src: '/img/accommodation/royal-palm-04.webp',
            alt: 'Restaurant gastronomique du Royal Palm'
          }
        ]
      };
    },
    
    computed: {
      currentImage() {
        return this.featuredImages[this.currentImageIndex];
      }
    },
    
    mounted() {
      this.initScrollAnimations();
      this.startImageSlideshow();
    },
    
    beforeUnmount() {
      if (this.slideshowInterval) {
        clearInterval(this.slideshowInterval);
      }
    },
    
    methods: {
      initScrollAnimations() {
        // Animation de la galerie
        gsap.from(this.$refs.galleryContainer, {
          x: -50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: this.$refs.galleryContainer,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        });
        
        // Animation du contenu
        gsap.from(this.$refs.contentContainer, {
          x: 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: this.$refs.contentContainer,
            start: 'top 80%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        });
      },
      
      startImageSlideshow() {
        this.slideshowInterval = setInterval(() => {
          this.nextImage();
        }, 5000);
      },
      
      nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.featuredImages.length;
      },
      
      prevImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.featuredImages.length) % this.featuredImages.length;
      }
    }
  };
  </script>