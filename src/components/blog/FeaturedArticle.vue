<template>
  <section class="relative py-16 overflow-hidden bg-gradient-to-b from-white to-benin-green-50/30">
    <!-- Éléments décoratifs -->
    <div class="absolute top-0 right-0 w-1/2 h-full opacity-10">
      <div class="absolute right-0 top-0 w-full h-full bg-benin-green opacity-30 blur-[100px]"></div>
    </div>
    
    <div class="container px-4 mx-auto">
      <div class="flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
        <!-- Image de l'article en vedette -->
        <div class="lg:w-1/2" ref="featuredImage">
          <div class="relative overflow-hidden shadow-xl rounded-2xl group">
            <!-- Image -->
            <img 
              src="/img/blog/vodoun-ceremony.jpg" 
              alt="Cérémonie vodoun traditionnelle à Ouidah" 
              class="w-full h-[400px] object-cover transition-transform duration-1000 group-hover:scale-110"
            >
            
            <!-- Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
            
            <!-- Badges -->
            <div class="absolute flex flex-wrap gap-2 top-4 left-4">
              <span class="px-3 py-1 text-sm font-medium text-white rounded-full bg-vodou">
                Culture & Traditions
              </span>
              <span class="px-3 py-1 text-sm font-medium rounded-full bg-benin-yellow text-night">
                En vedette
              </span>
            </div>
            
            <!-- Infos en bas de l'image -->
            <div class="absolute bottom-0 left-0 w-full p-6">
              <div class="flex items-center mb-3 text-sm text-white">
                <img 
                  src="/img/blog/authors/marie-duplantier.jpg" 
                  alt="Marie Duplantier" 
                  class="w-8 h-8 mr-2 border border-white rounded-full"
                >
                <span class="mr-4">Marie Duplantier</span>
                <span class="flex items-center mr-4">
                  <i class="mr-1 far fa-calendar"></i> 15 fév 2025
                </span>
                <span class="flex items-center">
                  <i class="mr-1 far fa-clock"></i> 7 min
                </span>
              </div>
              
              <h3 class="mb-2 text-2xl font-bold text-white transition-colors duration-300 md:text-3xl group-hover:text-benin-yellow font-display">
                Les cérémonies vodoun traditionnelles à Ouidah : un patrimoine culturel vivant
              </h3>
            </div>
          </div>
        </div>
        
        <!-- Contenu de l'article en vedette -->
        <div class="lg:w-1/2" ref="featuredContent">
          <div class="p-6 bg-white rounded-xl shadow-sm">
            <div class="flex items-center mb-6">
              <span class="inline-block px-3 py-1 text-sm font-medium rounded-full text-white bg-benin-green">
                Article en vedette
              </span>
            </div>
            
            <h2 class="mb-4 text-2xl font-bold text-gray-800 md:text-3xl font-display">
              Les cérémonies vodoun traditionnelles à Ouidah : un patrimoine culturel vivant
            </h2>
            
            <p class="mb-6 text-gray-600">
              Le vodoun, souvent mal compris, est bien plus qu'une religion : c'est un système de croyances complexe qui influence tous les aspects de la vie quotidienne dans certaines régions du Bénin. À Ouidah, ville côtière considérée comme un berceau spirituel, les cérémonies vodoun perpétuent des traditions millénaires.
            </p>
            
            <div class="flex flex-wrap mb-6">
              <span class="px-2 py-1 m-1 text-xs font-medium bg-gray-100 rounded-md text-gray-700">
                #Vodoun
              </span>
              <span class="px-2 py-1 m-1 text-xs font-medium bg-gray-100 rounded-md text-gray-700">
                #Traditions
              </span>
              <span class="px-2 py-1 m-1 text-xs font-medium bg-gray-100 rounded-md text-gray-700">
                #Ouidah
              </span>
              <span class="px-2 py-1 m-1 text-xs font-medium bg-gray-100 rounded-md text-gray-700">
                #Patrimoine
              </span>
            </div>
            
            <a href="/blog/ceremonies-vodoun-ouidah" class="inline-flex items-center px-5 py-3 font-medium text-white transition-all duration-300 rounded-lg bg-benin-green hover:bg-benin-green-600 hover:-translate-y-1 hover:shadow-md group">
              Lire l'article complet
              <i class="ml-2 transition-transform duration-300 fas fa-arrow-right group-hover:translate-x-1"></i>
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

// Enregistrer GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'FeaturedArticle',
  
  mounted() {
    this.$nextTick(() => {
      this.initAnimations();
    });
  },
  
  methods: {
    initAnimations() {
      // Animation de l'image
      gsap.from(this.$refs.featuredImage, {
        x: -100,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: this.$el,
          start: 'top 80%',
        }
      });
      
      // Animation du contenu
      gsap.from(this.$refs.featuredContent, {
        x: 100,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: this.$el,
          start: 'top 80%',
        }
      });
    }
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>