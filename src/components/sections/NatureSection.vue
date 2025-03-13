<template>
  <section id="nature" class="py-20 relative overflow-hidden bg-gradient-to-b from-white to-green-50" ref="natureSection">
    <!-- Éléments décoratifs améliorés -->
    <div class="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent"></div>
    <div class="absolute -top-20 right-0 w-72 h-72 bg-benin-green/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 left-10 w-80 h-80 bg-benin-yellow/5 rounded-full blur-3xl"></div>
    
    <!-- Motifs de feuilles flottantes avec animation améliorée -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none" ref="leavesContainer">
      <div class="leaf absolute top-[10%] left-[5%] text-benin-green/20" data-speed="0.04">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
        </svg>
      </div>
      <div class="leaf absolute top-[30%] right-[8%] text-benin-green/10" data-speed="0.03">
        <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
        </svg>
      </div>
      <div class="leaf absolute bottom-[20%] left-[15%] text-benin-yellow/15" data-speed="0.05">
        <svg width="35" height="35" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
        </svg>
      </div>
      
      <!-- Feuilles supplémentaires générées dynamiquement -->
      <div v-for="(leaf, index) in extraLeaves" :key="`leaf-${index}`" 
           :class="`leaf absolute text-${leaf.color}`"
           :style="`top: ${leaf.top}; left: ${leaf.left}; transform: rotate(${leaf.rotation}deg);`"
           :data-speed="leaf.speed">
        <svg :width="leaf.size" :height="leaf.size" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
        </svg>
      </div>
    </div>
    
    <!-- Particules de nature flottantes -->
    <div class="absolute inset-0 pointer-events-none" ref="particlesContainer"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <!-- Section Header avec animation -->
     <!-- Section Header avec animation mais visible par défaut -->
<div class="text-center mb-16 reveal-section" ref="headerSection">
  <div class="inline-block p-1 px-3 bg-benin-green/20 rounded-lg mb-4 transition-opacity duration-700" 
       ref="headerBadge">
    <span class="text-benin-green font-medium">Biodiversité & Paysages</span>
  </div>
  <h2 class="section-title text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6 transition-all duration-700" 
      ref="headerTitle">
    Explorez la <span class="nature-gradient">nature préservée</span> du Bénin
  </h2>
  <p class="max-w-3xl mx-auto text-gray-700 text-lg transition-all duration-700" 
     ref="headerText">
    Des savanes du nord aux lagunes du sud, le Bénin offre une diversité de paysages exceptionnelle et abrite une faune africaine emblématique dans ses parcs nationaux.
  </p>
</div>
      
      <!-- Featured Destination avec effet parallaxe -->
      <div class="mb-24 opacity-0" ref="featuredDestination">
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-700">
          <div class="md:flex">
            <div class="md:w-1/2 relative">
              <div class="h-80 md:h-full relative overflow-hidden">
                <!-- Image avec parallaxe -->
                <div class="parallax-container h-full w-full" ref="parallaxImage">
                  <img src="/img/safari-photo-pendjari.webp" alt="Éléphants dans le Parc de la Pendjari" 
                       class="w-full h-full object-cover scale-110 transition-transform duration-700">
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-black/60 md:to-transparent"></div>
                
                <!-- Éléments animés sur l'image -->
                <div class="absolute inset-0 opacity-0 transition-opacity duration-700 flex items-center justify-center nature-overlay">
                  <div class="w-24 h-24 border-2 border-benin-yellow/30 rounded-full flex items-center justify-center">
                    <div class="w-16 h-16 border-2 border-benin-green/30 rounded-full animate-spin-slower"></div>
                  </div>
                </div>
                
                <div class="absolute bottom-4 left-4 md:bottom-8 md:left-8 text-white">
                  <div class="flex items-center mb-2">
                    <div class="w-2 h-2 bg-benin-yellow rounded-full mr-2"></div>
                    <span class="text-sm text-white/80">Destination phare</span>
                  </div>
                  <h3 class="text-2xl md:text-3xl font-display font-bold">Parc National de la Pendjari</h3>
                </div>
              </div>
            </div>
            <div class="md:w-1/2 p-6 md:p-10">
              <div class="flex items-center mb-4">
                <div class="flex items-center mr-4">
                  <i class="fas fa-map-marker-alt text-benin-green mr-2"></i>
                  <span class="text-gray-600">Nord Bénin</span>
                </div>
                <div class="flex items-center">
                  <i class="fas fa-clock text-benin-green mr-2"></i>
                  <span class="text-gray-600">2-3 jours recommandés</span>
                </div>
              </div>
              
              <p class="text-gray-700 mb-6">
                Classé réserve de biosphère par l'UNESCO, le Parc National de la Pendjari est l'une des dernières zones sauvages d'Afrique de l'Ouest. Sur plus de 4 700 km², il abrite une faune exceptionnelle : éléphants, lions, guépards, buffles, antilopes et plus de 300 espèces d'oiseaux.
              </p>
              
              <div class="mb-8">
                <h4 class="font-bold text-gray-900 mb-3">Points forts</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div class="highlight-item flex items-start" v-for="(feature, index) in pendjariFeatures" :key="`feature-${index}`" :data-delay="index * 0.1">
                    <div class="w-6 h-6 rounded-full bg-benin-green/10 flex items-center justify-center mt-0.5 mr-3">
                      <i :class="`fas ${feature.icon} text-benin-green text-xs`"></i>
                    </div>
                    <span class="text-gray-700">{{ feature.text }}</span>
                  </div>
                </div>
              </div>
              
              <a href="#" class="nature-cta inline-flex items-center text-benin-green font-medium relative overflow-hidden group">
                <span class="relative z-10 pr-8 group-hover:text-benin-yellow transition-colors duration-300">Découvrir le safari Pendjari</span>
                <svg xmlns="http://www.w3.org/2000/svg" 
                     class="h-5 w-5 absolute right-0 top-1/2 transform -translate-y-1/2 group-hover:translate-x-1 transition-transform duration-300" 
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span class="absolute bottom-0 left-0 w-full h-0.5 bg-benin-green transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Nature Grid avec animation au défilement -->
      <div class="mb-20">
        <h3 class="text-2xl md:text-3xl font-display font-bold text-center mb-12 opacity-0" ref="gridTitle">
          Diversité des paysages béninois
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8" ref="landscapesGrid">
          <!-- Cards avec effet amélioré -->
          <div v-for="(landscape, index) in landscapes" 
               :key="`landscape-${index}`" 
               class="landscape-card bg-white rounded-xl overflow-hidden shadow-lg opacity-0 transform hover:-translate-y-2 transition-all duration-300"
               :style="`transition-delay: ${index * 100}ms`"
               :data-index="index">
            <div class="relative h-56 overflow-hidden">
              <div class="parallax-image h-full w-full overflow-hidden">
                <img :src="landscape.image" :alt="landscape.title" 
                     class="w-full h-full object-cover transition-all duration-700 hover:scale-105">
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-4 left-4 text-white">
                <h3 class="font-display font-bold text-xl">{{ landscape.title }}</h3>
                <p class="text-white/80 text-sm">{{ landscape.type }}</p>
              </div>
            </div>
            <div class="p-6">
              <p class="text-gray-700 mb-4 landscape-description">
                {{ landscape.description }}
              </p>
              <a href="#" class="inline-flex items-center text-benin-green font-medium group overflow-hidden">
                <span class="group-hover:text-benin-yellow transition-colors duration-300">{{ landscape.cta }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" 
                     class="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform duration-300" 
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Wildlife Gallery avec hover effects améliorés -->
      <div class="mb-20 opacity-0" ref="wildlifeSection">
        <h3 class="text-2xl md:text-3xl font-display font-bold text-center mb-6">Faune emblématique</h3>
        <p class="text-gray-700 text-center max-w-3xl mx-auto mb-12">
          Le Bénin abrite une faune africaine diversifiée, particulièrement dans ses parcs nationaux. Partez à la rencontre de ces animaux emblématiques lors de safaris guidés.
        </p>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 wildlife-grid" ref="wildlifeGrid">
          <div v-for="(animal, index) in wildlife" 
               :key="`animal-${index}`"
               class="wildlife-card relative rounded-xl overflow-hidden h-60 group transform opacity-0"
               :data-delay="index * 0.1">
            <div class="overflow-hidden">
              <img :src="animal.image" :alt="animal.name" 
                   class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            
            <!-- Effet de survol pour chaque animal -->
            <div class="absolute inset-0 bg-benin-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div class="absolute bottom-4 left-4 text-white wildlife-info">
              <h4 class="font-bold text-lg">{{ animal.name }}</h4>
              <p class="text-white/80 text-xs">{{ animal.location }}</p>
              <div class="h-0 overflow-hidden group-hover:h-auto transition-all duration-300 mt-2 wildlife-fact opacity-0 group-hover:opacity-100">
                <p class="text-xs text-white/90 max-w-[90%]">{{ animal.fact }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Eco-Tourism Banner avec effets améliorés -->
      <div class="rounded-2xl overflow-hidden relative eco-banner opacity-0" ref="ecoBanner">
        <div class="absolute inset-0">
          <img src="/img/eco-tourism-benin.webp" alt="Écotourisme au Bénin" 
               class="w-full h-full object-cover scale-110 transition-all duration-[30s]"
               ref="ecoBannerImage">
          <div class="absolute inset-0 bg-benin-green/70"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,135,81,0.4),transparent_70%)]"></div>
          
          <!-- Éléments naturels animés dans le CTA -->
          <div class="absolute inset-0 overflow-hidden">
            <div class="absolute top-10 left-[20%] w-32 h-32 border border-white/10 rounded-full animate-spin-slower"></div>
            <div class="absolute bottom-10 right-[20%] w-40 h-40 border border-benin-yellow/10 rounded-full animate-spin-reverse"></div>
            
            <!-- Feuille flottante -->
            <div class="absolute bottom-1/4 left-1/4 text-white/10 animate-float-slow">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="relative p-8 md:p-12 text-center">
          <h3 class="font-display font-bold text-2xl md:text-3xl mb-4 text-white ">
            Voyagez responsable au Bénin
          </h3>
          <p class="max-w-2xl mx-auto mb-8 text-white/90 " style="transition-delay: 100ms">
            Nos circuits nature sont conçus dans le respect de l'environnement et des communautés locales. Découvrez comment votre voyage contribue à la préservation des écosystèmes béninois.
          </p>
          <a href="#contact" 
             @click.prevent="$emit('navigate-to', 'contact')" 
             class="inline-block px-6 py-3 bg-benin-yellow text-benin-green font-bold rounded-lg hover:bg-white transition-colors duration-300 transform hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group eco-element"
             style="transition-delay: 200ms">
            <span class="relative z-10">Réserver un circuit nature</span>
            <span class="absolute inset-0 bg-gradient-to-r from-benin-yellow via-white to-benin-yellow bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></span>
          </a>
        </div>
      </div>
      
      <!-- Animal sounds button -->
      <div class="fixed bottom-24 right-10 w-16 h-16 rounded-full bg-benin-green shadow-lg flex items-center justify-center cursor-pointer z-20 opacity-0 transform translate-y-10" 
           ref="soundButton"
           @click="playAnimalSound"
           @mouseenter="hoverSound = true" 
           @mouseleave="hoverSound = false">
        <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center">
          <i class="fas fa-volume-up text-benin-green text-lg"></i>
        </div>
        <div :class="`absolute inset-0 rounded-full border-2 border-benin-yellow animate-ping ${hoverSound ? 'opacity-100' : 'opacity-0'}`"></div>
        <span class="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-1 rounded whitespace-nowrap opacity-0 transition-opacity duration-300" :class="{'opacity-100': hoverSound}">Sons de la savane</span>
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
  name: 'NatureSection',
  emits: ['navigate-to'],
  
  data() {
    return {
      hoverSound: false,
      
      // Feuilles supplémentaires
      extraLeaves: [
        { 
          color: "benin-green/10", 
          top: "45%", 
          left: "75%", 
          size: 30, 
          rotation: 45, 
          speed: 0.02
        },
        { 
          color: "benin-yellow/15", 
          top: "60%", 
          left: "85%", 
          size: 25, 
          rotation: -30, 
          speed: 0.03
        },
        { 
          color: "benin-green/20", 
          top: "15%", 
          left: "60%", 
          size: 35, 
          rotation: 15, 
          speed: 0.04
        }
      ],
      
      // Caractéristiques du parc Pendjari
      pendjariFeatures: [
        { icon: 'fa-paw', text: "Safaris guidés à l'aube et au crépuscule" },
        { icon: 'fa-water', text: "Points d'eau fréquentés par les animaux" },
        { icon: 'fa-mountain', text: "Chaîne de l'Atacora et cascades" },
        { icon: 'fa-moon', text: 'Nuits en lodge écologique' }
      ],
      
      // Paysages à afficher
      landscapes: [
        {
          title: 'Lac Nokoué',
          type: 'Écosystème lacustre',
          image: '/img/lac-nokoue2.webp',
          description: 'Plus grand lac du Bénin, le Nokoué est un écosystème riche abritant le village lacustre de Ganvié. Explorez ses eaux en pirogue traditionnelle et découvrez la vie quotidienne des pêcheurs.',
          cta: 'Explorer le lac'
        },
        {
          title: 'Monts Atacora',
          type: 'Paysages montagneux',
          image: '/img/monts-atacora.webp',
          description: 'Cette chaîne montagneuse du nord-ouest offre des panoramas spectaculaires et abrite les Tata Somba, habitations fortifiées uniques. Randonnez à travers villages traditionnels et cascades.',
          cta: 'Découvrir les montagnes'
        },
        {
          title: 'Grand-Popo',
          type: 'Côte atlantique',
          image: '/img/plage-grand-popo.webp',
          description: 'Les plages de cocotiers de Grand-Popo offrent un havre de paix sur la côte atlantique. Observez les pêcheurs traditionnels, les tortues marines (en saison) et profitez du coucher de soleil.',
          cta: 'Visiter les plages'
        }
      ],
      
      // Faune à afficher
      wildlife: [
        {
          name: 'Guépard',
          location: 'Parc de la Pendjari',
          image: '/img/benin-guepard.webp',
          fact: 'Le Parc de la Pendjari abrite l\'une des dernières populations de guépards d\'Afrique de l\'Ouest, capables d\'atteindre 110 km/h en pleine course.'
        },
        {
          name: 'Lion',
          location: 'Parc de la Pendjari',
          image: '/img/benin-lion.webp',
          fact: 'Les lions du Bénin sont parmi les derniers d\'Afrique de l\'Ouest, une sous-espèce particulièrement menacée.'
        },
        {
          name: 'Hippopotame',
          location: 'Rivière Pendjari',
          image: '/img/benin-hippo.webp',
          fact: 'Ces géants semi-aquatiques peuvent peser jusqu\'à 3 tonnes et sont visibles dans les points d\'eau du parc.'
        },
        {
          name: 'Avifaune',
          location: 'Zones humides',
          image: '/img/benin-oiseaux.webp',
          fact: 'Plus de 300 espèces d\'oiseaux migrateurs et résidents peuplent les zones humides du Bénin.'
        }
      ],
      
      // Sons d'animaux
      animalSounds: [
        '/sounds/elephant-trumpet.mp3',
        '/sounds/lion-roar.mp3',
        '/sounds/hippo-call.mp3',
        '/sounds/birds-call.mp3'
      ],
      currentSound: null
    };
  },
  
  mounted() {
  // Initialiser les animations GSAP après le montage
  this.$nextTick(() => {
    this.initParallaxEffects();
    this.initScrollAnimations();
    this.initNatureParticles();
    this.preloadSounds();
    
    // Fallback pour garantir la visibilité
    setTimeout(() => {
      // S'assurer que les éléments sont visibles même si GSAP échoue
      const elements = [
        this.$refs.headerBadge, 
        this.$refs.headerTitle, 
        this.$refs.headerText,
        this.$refs.featuredDestination,
        this.$refs.gridTitle,
        this.$refs.wildlifeSection,
        this.$refs.ecoBanner
      ];
      
      elements.forEach(el => {
        if (el && el.style) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
      
      // Rendre visible tous les éléments avec des classes d'opacité
      document.querySelectorAll('.opacity-0').forEach(el => {
        el.classList.remove('opacity-0');
        el.classList.add('opacity-100');
      });
    }, 1000); // Délai de sécurité de 1 seconde
  });
},
  
  beforeUnmount() {
    // Nettoyer les ScrollTriggers pour éviter les fuites de mémoire
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Arrêter tout son en cours
    if (this.currentSound) {
      this.currentSound.pause();
      this.currentSound = null;
    }
  },
  
  methods: {
    // Effet parallaxe pour les images et les feuilles
    initParallaxEffects() {
      // Parallaxe sur l'image principale
      if (this.$refs.parallaxImage) {
        this.$refs.natureSection.addEventListener('mousemove', (e) => {
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
      
      // Animation des feuilles flottantes
      const leaves = document.querySelectorAll('.leaf');
      leaves.forEach(leaf => {
        const speed = leaf.getAttribute('data-speed') || 0.02;
        
        this.$refs.natureSection.addEventListener('mousemove', (e) => {
          const { clientX, clientY } = e;
          const xPos = (window.innerWidth / 2 - clientX) * speed;
          const yPos = (window.innerHeight / 2 - clientY) * speed;
          
          gsap.to(leaf, {
            x: xPos,
            y: yPos,
            rotation: xPos * 0.05,
            duration: 1,
            ease: 'power1.out'
          });
        });
      });
      
      // Parallaxe léger sur les images de paysage
      const parallaxImages = document.querySelectorAll('.parallax-image');
      parallaxImages.forEach(container => {
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
     // Animation du titre et sous-titre en utilisant la méthode from au lieu de to
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
      
      // Animation de la destination vedette
      gsap.to(this.$refs.featuredDestination, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: this.$refs.featuredDestination,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
      
      // Animation des caractéristiques
      const features = document.querySelectorAll('.highlight-item');
      features.forEach(feature => {
        const delay = feature.getAttribute('data-delay') || 0;
        gsap.from(feature, {
          opacity: 0,
          x: -20,
          duration: 0.6,
          delay: parseFloat(delay),
          scrollTrigger: {
            trigger: feature,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        });
      });
      
      // Animation du titre de la grille
      gsap.to(this.$refs.gridTitle, {
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: this.$refs.gridTitle,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
      
      // Animation des cartes de paysage
      const cards = document.querySelectorAll('.landscape-card');
      cards.forEach(card => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        });
      });
      
      // Animation de la section faune
      gsap.to(this.$refs.wildlifeSection, {
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: this.$refs.wildlifeSection,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
      
      // Animation des cartes d'animaux
      const wildlifeCards = document.querySelectorAll('.wildlife-card');
      wildlifeCards.forEach(card => {
        const delay = card.getAttribute('data-delay') || 0;
        gsap.to(card, {
          opacity: 1,
          duration: 0.6,
          delay: parseFloat(delay),
          scrollTrigger: {
            trigger: this.$refs.wildlifeGrid,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });
      
      // Animation du banner écotourisme
      gsap.to(this.$refs.ecoBanner, {
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: this.$refs.ecoBanner,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
      
      // Animation du bouton son
      gsap.to(this.$refs.soundButton, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: this.$refs.natureSection,
          start: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      });
      
      // Effet de zoom sur l'image CTA au défilement
      ScrollTrigger.create({
        trigger: this.$refs.ecoBanner,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(this.$refs.ecoBannerImage, {
            scale: 1.1 + (progress * 0.1),
            duration: 0.5
          });
        }
      });
    },
    
    // Particules naturelles (pollen, poussière)
    initNatureParticles() {
      const container = this.$refs.particlesContainer;
      const particleCount = 25;
      const colors = ['#FCD11633', '#00875133', '#FFFFFF33'];
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.filter = 'blur(1px)';
        
        container.appendChild(particle);
        
        gsap.to(particle, {
          y: `${Math.random() * 200 - 100}`,
          x: `${Math.random() * 200 - 100}`,
          opacity: 0,
          duration: Math.random() * 15 + 10,
          repeat: -1,
          repeatRefresh: true,
          ease: 'none'
        });
      }
    },
    
    // Préchargement des sons d'animaux
    preloadSounds() {
      // Précharger seulement si les fichiers existent réellement
      // Dans un environnement de production, vous devriez vérifier l'existence des fichiers
      this.currentSound = null;
    },
    
    // Lecture d'un son d'animal aléatoire
    playAnimalSound() {
      // Simuler la lecture d'un son (remplacer par un vrai son dans la production)
      if (this.animalSounds.length > 0) {
        // Si un son est déjà en cours, l'arrêter
        if (this.currentSound) {
          this.currentSound.pause();
        }
        
        // Sélectionner un son aléatoire
        const randomIndex = Math.floor(Math.random() * this.animalSounds.length);
        const soundSrc = this.animalSounds[randomIndex];
        
        // Créer un nouvel élément audio
        this.currentSound = new Audio(soundSrc);
        this.currentSound.volume = 0.7;
        this.currentSound.play().catch(e => {
          // Gérer les erreurs de lecture (par exemple, si l'utilisateur n'a pas interagi avec la page)
          console.log('Erreur de lecture audio:', e);
        });
        
        // Animation du bouton son
        gsap.to(this.$refs.soundButton, {
          scale: 1.2,
          duration: 0.2,
          yoyo: true,
          repeat: 1
        });
      }
    }
  }
};
</script>

<style scoped>
/* Animations de base */
.wildlife-card {
  transform: translateY(10px);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.wildlife-card:hover {
  transform: translateY(-5px);
}

/* Animation du texte gradient */
.nature-gradient {
  background: linear-gradient(90deg, #008751, #1AB46C, #FCD116, #008751);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 6s ease infinite;
  display: inline-block;
}

@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Amélioration de l'animation des feuilles */
@keyframes float-leaf {
  0% { transform: translateY(0) rotate(0); }
  33% { transform: translateY(-15px) rotate(5deg); }
  66% { transform: translateY(-5px) rotate(-3deg); }
  100% { transform: translateY(0) rotate(0); }
}

.leaf {
  animation: float-leaf 10s ease-in-out infinite;
  transition: transform 0.3s ease;
}

/* Effet shimmer pour les boutons */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.animate-shimmer {
  animation: shimmer 3s linear infinite;
}

/* Effet sur l'overlay de la destination principale */
.parallax-container:hover .nature-overlay {
  opacity: 0.7 !important;
}

/* Animations pour les éléments eco-banner */
.eco-element {
  opacity: 0;
  transform: translateY(15px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.eco-banner:hover .eco-element {
  opacity: 1;
  transform: translateY(0);
}

/* Animation de la wildlife-info au survol */
.wildlife-info {
  transition: transform 0.3s ease;
}

.wildlife-card:hover .wildlife-info {
  transform: translateY(-5px);
}

.wildlife-fact {
  transition: all 0.3s ease;
}
</style>