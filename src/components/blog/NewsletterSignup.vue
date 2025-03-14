<template>
  <section class="relative py-16 overflow-hidden bg-benin-green-50">
    <!-- Motifs décoratifs -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 right-0 w-1/3 h-1/2 bg-benin-yellow/10 rounded-full blur-[100px]"></div>
      <div class="absolute top-1/2 -left-20 w-40 h-40 rounded-full border-2 border-benin-green/20 opacity-60"></div>
      <div class="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full border border-benin-yellow/30"></div>
      
      <!-- Symboles africains -->
      <svg class="absolute w-16 h-16 text-benin-green/10 bottom-10 left-10 transform rotate-12" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M9,8A2,2 0 0,0 7,10A2,2 0 0,0 9,12A2,2 0 0,0 11,10A2,2 0 0,0 9,8M15,8A2,2 0 0,0 13,10A2,2 0 0,0 15,12A2,2 0 0,0 17,10A2,2 0 0,0 15,8M12,14C10.89,14 10,14.89 10,16V18H14V16C14,14.89 13.11,14 12,14Z" />
      </svg>
    </div>
    
    <div class="container relative px-4 mx-auto max-w-5xl">
      <div class="p-8 bg-white rounded-2xl shadow-lg md:p-12" ref="newsletterContainer">
        <div class="flex flex-col items-center text-center md:px-8">
          <h2 class="mb-3 text-3xl font-bold text-gray-800 md:text-4xl font-display">
            Restez informé des <span class="text-benin-green">actualités béninoises</span>
          </h2>
          
          <p class="max-w-2xl mb-8 text-gray-600">
            Inscrivez-vous à notre newsletter mensuelle pour recevoir des récits exclusifs, des conseils de voyage et les dernières actualités culturelles du Bénin.
          </p>
          
          <div class="flex flex-col w-full max-w-md space-y-4 md:space-y-0 md:flex-row md:space-x-2">
            <input 
              type="email" 
              placeholder="Votre adresse email" 
              class="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-benin-green focus:border-transparent"
            >
            <button class="px-6 py-3 font-medium text-white transition-all duration-300 rounded-lg bg-benin-green hover:bg-benin-green-600 hover:-translate-y-1 hover:shadow-md">
              S'abonner
            </button>
          </div>
          
          <div class="mt-4 text-sm text-gray-500">
            Nous respectons votre vie privée. Aucun spam, promis ! 🌍
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
  name: 'NewsletterSignup',
  
  mounted() {
    this.$nextTick(() => {
      this.initAnimation();
    });
  },
  
  methods: {
    initAnimation() {
      // Animation à l'entrée en viewport
      gsap.from(this.$refs.newsletterContainer, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: this.$el,
          start: 'top 80%'
        }
      });
    }
  }
};
</script>