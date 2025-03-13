<template>
  <section 
    id="experiences" 
    class="py-20 relative overflow-hidden bg-gradient-to-b from-white to-benin-culture/5"
    ref="experienceSection"
  >
    <!-- Éléments décoratifs améliorés -->
    <div class="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent"></div>
    <div class="absolute -top-20 right-0 w-72 h-72 bg-benin-culture/5 rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 left-10 w-80 h-80 bg-benin-yellow/5 rounded-full blur-3xl"></div>
    
    <!-- Motifs mystiques flottants avec animation GSAP -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none" ref="symbolsContainer">
      <div class="absolute top-[15%] left-[8%] text-benin-culture/10 symbol" data-speed="0.03">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,10.5A1.5,1.5 0 0,0 10.5,12A1.5,1.5 0 0,0 12,13.5A1.5,1.5 0 0,0 13.5,12A1.5,1.5 0 0,0 12,10.5M7.5,10.5A1.5,1.5 0 0,0 6,12A1.5,1.5 0 0,0 7.5,13.5A1.5,1.5 0 0,0 9,12A1.5,1.5 0 0,0 7.5,10.5M16.5,10.5A1.5,1.5 0 0,0 15,12A1.5,1.5 0 0,0 16.5,13.5A1.5,1.5 0 0,0 18,12A1.5,1.5 0 0,0 16.5,10.5Z" />
        </svg>
      </div>
      <div class="absolute top-[40%] right-[10%] text-benin-yellow/10 symbol" data-speed="0.02">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2L1,21H23M12,6L19.53,19H4.47M12,10L16.19,17H7.81M12,14L14,17H10" />
        </svg>
      </div>
      <div class="absolute bottom-[25%] left-[12%] text-benin-green/10 symbol" data-speed="0.04">
        <svg width="70" height="70" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,10.5A1.5,1.5 0 0,1 13.5,12A1.5,1.5 0 0,1 12,13.5A1.5,1.5 0 0,1 10.5,12A1.5,1.5 0 0,1 12,10.5M7.5,10.5A1.5,1.5 0 0,1 9,12A1.5,1.5 0 0,1 7.5,13.5A1.5,1.5 0 0,1 6,12A1.5,1.5 0 0,1 7.5,10.5M16.5,10.5A1.5,1.5 0 0,1 18,12A1.5,1.5 0 0,1 16.5,13.5A1.5,1.5 0 0,1 15,12A1.5,1.5 0 0,1 16.5,10.5Z" />
        </svg>
      </div>
      
      <!-- Ajouts de nouveaux symboles vodou -->
      <div v-for="(symbol, index) in extraSymbols" :key="`symbol-${index}`" 
           :class="`absolute text-${symbol.color} symbol`"
           :style="`top: ${symbol.top}; left: ${symbol.left}; opacity: ${symbol.opacity};`"
           :data-speed="symbol.speed"
           :data-rotate="symbol.rotate">
        <svg :width="symbol.size" :height="symbol.size" viewBox="0 0 24 24" fill="currentColor">
          <path :d="symbol.path" />
        </svg>
      </div>
    </div>
    
    <!-- Particules vodou -->
    <div class="absolute inset-0 pointer-events-none" ref="particlesContainer"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <!-- Section Header avec animation -->
      <div class="text-center mb-16 reveal-section" ref="headerSection">
        <div class="inline-block p-1 px-3 bg-benin-culture/20 rounded-lg mb-4 opacity-0" ref="headerBadge">
          <span class="text-benin-culture font-medium">Immersion & Découverte</span>
        </div>
        <h2 class="section-title text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6 opacity-0" ref="headerTitle">
          Vivez des <span class="magical-text">expériences uniques</span> au Bénin
        </h2>
        <p class="max-w-3xl mx-auto text-gray-700 text-lg opacity-0" ref="headerText">
          Immergez-vous dans la culture béninoise à travers des expériences authentiques qui vous connecteront avec les traditions, les savoirs ancestraux et la vie quotidienne locale.
        </p>
      </div>
      
      <!-- Featured Experience: Vodun Ceremony avec effet parallaxe -->
      <div class="mb-24 opacity-0" ref="featuredExperience">
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-700">
          <div class="md:flex flex-row-reverse">
            <div class="md:w-1/2 relative">
              <div class="h-80 md:h-full relative overflow-hidden">
                <!-- Image avec parallaxe -->
                <div class="parallax-container h-full w-full" ref="parallaxImage">
                  <img src="/vodun-ceremony-experience.webp" alt="Cérémonie Vodun" 
                       class="w-full h-full object-cover scale-110 transition-transform duration-700">
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-l md:from-black/60 md:to-transparent"></div>
                
                <!-- Élément mystique qui apparaît au survol -->
                <div class="absolute inset-0 opacity-0 transition-opacity duration-700 flex items-center justify-center vodun-overlay">
                  <div class="w-24 h-24 border-2 border-benin-yellow/70 rounded-full flex items-center justify-center">
                    <div class="w-16 h-16 border-2 border-benin-culture/70 rounded-full animate-spin-slower"></div>
                  </div>
                </div>
                
                <div class="absolute bottom-4 left-4 md:bottom-8 md:left-8 text-white">
                  <div class="flex items-center mb-2">
                    <div class="w-2 h-2 bg-benin-culture rounded-full mr-2"></div>
                    <span class="text-sm text-white/80">Expérience phare</span>
                  </div>
                  <h3 class="text-2xl md:text-3xl font-display font-bold">Cérémonie Vodun à Ouidah</h3>
                </div>
              </div>
            </div>
            <div class="md:w-1/2 p-6 md:p-10">
              <div class="flex items-center mb-4">
                <div class="flex items-center mr-4">
                  <i class="fas fa-map-marker-alt text-benin-culture mr-2"></i>
                  <span class="text-gray-600">Ouidah</span>
                </div>
                <div class="flex items-center">
                  <i class="fas fa-clock text-benin-culture mr-2"></i>
                  <span class="text-gray-600">Journée complète</span>
                </div>
              </div>
              
              <p class="text-gray-700 mb-6">
                Assistez à une authentique cérémonie Vodun, religion ancestrale née au Bénin et pratiquée encore aujourd'hui. Accompagné d'un guide local initié, vous découvrirez les rituels, les chants et les danses qui honorent les divinités et les forces de la nature.
              </p>
              
              <div class="mb-8">
                <h4 class="font-bold text-gray-900 mb-3">Ce que vous vivrez</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div class="feature-item flex items-start" v-for="(feature, index) in vodunFeatures" :key="`feature-${index}`" :data-delay="index * 0.1">
                    <div class="w-6 h-6 rounded-full bg-benin-culture/10 flex items-center justify-center mt-0.5 mr-3">
                      <i :class="`fas ${feature.icon} text-benin-culture text-xs`"></i>
                    </div>
                    <span class="text-gray-700">{{ feature.text }}</span>
                  </div>
                </div>
              </div>
              
              <a href="#" class="experience-cta inline-flex items-center text-benin-culture font-medium relative overflow-hidden group">
                <span class="relative z-10 pr-8 group-hover:text-benin-yellow transition-colors duration-300">Réserver cette expérience</span>
                <svg xmlns="http://www.w3.org/2000/svg" 
                     class="h-5 w-5 absolute right-0 top-1/2 transform -translate-y-1/2 group-hover:translate-x-1 transition-transform duration-300" 
                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span class="absolute bottom-0 left-0 w-full h-0.5 bg-benin-culture transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Experiences Grid avec effets de défilement -->
      <div class="mb-20">
        <h3 class="text-2xl md:text-3xl font-display font-bold text-center mb-12 opacity-0" ref="gridTitle">
          Expériences authentiques
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref="experiencesGrid">
          <!-- Card template avec animation avancée -->
          <div v-for="(experience, index) in experiences" 
               :key="`exp-${index}`" 
               class="experience-card bg-white rounded-xl overflow-hidden shadow-lg group opacity-0"
               :style="`transition-delay: ${index * 100}ms`"
               :data-index="index">
            <div class="relative h-56 overflow-hidden">
              <img :src="experience.image" :alt="experience.title" 
                   class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
              
              <!-- Overlay avec effet de profondeur -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              <!-- Cercles mystiques qui apparaissent au survol -->
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div class="absolute top-1/4 left-1/4 w-20 h-20 border border-white/20 rounded-full"></div>
                <div class="absolute bottom-1/4 right-1/4 w-16 h-16 border border-benin-yellow/20 rounded-full"></div>
          </div>
          
              <div class="absolute top-4 right-4">
                <div class="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-benin-culture">
                  {{ experience.duration }}
                </div>
              </div>
              <div class="absolute bottom-4 left-4 text-white">
                <h3 class="font-display font-bold text-xl">{{ experience.title }}</h3>
                <p class="text-white/80 text-sm">{{ experience.location }}</p>
              </div>
            </div>
            <div class="p-6">
              <p class="text-gray-700 mb-4 card-description">
                {{ experience.description }}
              </p>
              <div class="flex justify-between items-center">
                <span class="text-benin-culture font-bold">{{ experience.price }}</span>
                <a href="#" class="inline-flex items-center text-benin-culture font-medium group">
                  <span class="group-hover:text-benin-yellow transition-colors duration-300">Réserver</span>
                  <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Bouton "Voir plus" avec animation -->
        <div class="text-center mt-10 opacity-0" ref="viewMoreBtn">
          <button class="px-6 py-3 bg-benin-culture/10 text-benin-culture rounded-lg hover:bg-benin-culture hover:text-white transition-all duration-300 relative overflow-hidden group">
            <span class="relative z-10">Voir plus d'expériences</span>
            <span class="absolute inset-0 bg-benin-culture/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          </button>
        </div>
      </div>
      
      <!-- Testimonial avec animation d'écriture -->
      <div class="mb-20 opacity-0" ref="testimonial">
        <div class="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
          <div class="absolute -top-5 -left-5 w-12 h-12 bg-benin-culture rounded-full flex items-center justify-center">
            <i class="fas fa-quote-left text-white text-xl"></i>
          </div>
          
          <div class="md:flex items-center gap-10">
            <div class="md:w-1/3 mb-6 md:mb-0 relative">
              <img src="/testimonial-experience.webp" alt="Témoignage" 
                   class="w-full h-64 md:h-80 object-cover rounded-xl">
              
              <!-- Effet mystique sur l'image -->
              <div class="absolute inset-0 bg-benin-culture/30 mix-blend-overlay rounded-xl"></div>
              <div class="absolute inset-0 rounded-xl overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-tr from-vodou/30 via-transparent to-benin-yellow/30"></div>
              </div>
            </div>
            
            <div class="md:w-2/3">
              <p class="text-gray-700 italic text-lg mb-6 typewriter-text" ref="testimonialText">
                "Participer à une cérémonie Vodun à Ouidah a été l'expérience la plus marquante de mon voyage au Bénin. Les rythmes des tambours, les danses envoûtantes et l'énergie des participants m'ont transportée dans un autre monde. Notre guide nous a parfaitement expliqué chaque étape du rituel, rendant cette expérience à la fois mystique et éducative. Un moment inoubliable qui m'a permis de comprendre la profondeur spirituelle de la culture béninoise."
              </p>
              
              <div class="flex items-center opacity-0" ref="testimonialAuthor">
                <div class="mr-4">
                  <h4 class="font-bold text-gray-900">Marie Dubois</h4>
                  <p class="text-gray-600 text-sm">Lyon, France</p>
                </div>
                <div class="flex text-benin-yellow">
                  <i v-for="n in 5" :key="`star-${n}`" class="fas fa-star" :style="`transition-delay: ${n * 100}ms`"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- CTA Banner avec effets interactifs améliorés -->
      <div class="rounded-2xl overflow-hidden relative cta-container opacity-0" ref="ctaBanner">
        <div class="absolute inset-0">
          <img src="/experience-cta-bg.webp" alt="Créez votre expérience" 
               class="w-full h-full object-cover scale-110 transition-all duration-[30s]"
               ref="ctaImage">
          <div class="absolute inset-0 bg-benin-culture/70"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.4),transparent_70%)]"></div>
          
          <!-- Motifs mystiques animés dans le CTA -->
          <div class="absolute inset-0 overflow-hidden">
            <div class="absolute top-10 left-[10%] w-32 h-32 border border-white/20 rounded-full animate-spin-slower"></div>
            <div class="absolute bottom-10 right-[10%] w-40 h-40 border border-benin-yellow/20 rounded-full animate-spin-reverse"></div>
            
            <!-- Symboles vodou flottants -->
            <div class="absolute bottom-1/4 left-1/4 text-white/10 animate-float-slow">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2L1,21H23M12,6L19.53,19H4.47M12,10L16.19,17H7.81M12,14L14,17H10" />
              </svg>
            </div>
          </div>
        </div>
        
        <div class="relative p-8 md:p-12 text-center">
          <h3 class="font-display font-bold text-2xl md:text-3xl mb-4 text-white cta-element">
            Créez votre expérience sur mesure
          </h3>
          <p class="max-w-2xl mx-auto mb-8 text-white/90 cta-element" style="transition-delay: 100ms">
            Vous avez une idée d'expérience particulière que vous souhaitez vivre au Bénin ? Nos experts locaux peuvent créer une expérience personnalisée selon vos centres d'intérêt.
          </p>
          <a href="#contact" 
             @click.prevent="$emit('navigate-to', 'contact')" 
             class="inline-block px-6 py-3 bg-benin-yellow text-benin-green font-bold rounded-lg hover:bg-white transition-colors duration-300 transform hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group cta-element"
             style="transition-delay: 200ms">
            <span class="relative z-10">Créer mon expérience</span>
            <span class="absolute inset-0 bg-gradient-to-r from-benin-yellow via-white to-benin-yellow bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></span>
          </a>
        </div>
      </div>
    </div>
    
    <!-- Tambour interactif flottant -->
    <div class="fixed bottom-10 right-10 w-20 h-20 rounded-full bg-benin-culture shadow-lg flex items-center justify-center cursor-pointer z-20 opacity-0 transform translate-y-10" 
         ref="drumButton"
         @click="playDrumSound"
         @mouseenter="hoverDrum = true" 
         @mouseleave="hoverDrum = false">
      <div class="w-16 h-16 rounded-full bg-white flex items-center justify-center">
        <i class="fas fa-drum text-benin-culture text-xl"></i>
      </div>
      <div :class="`absolute inset-0 rounded-full border-2 border-benin-yellow animate-ping ${hoverDrum ? 'opacity-100' : 'opacity-0'}`"></div>
      <span class="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-3 py-1 rounded whitespace-nowrap opacity-0 transition-opacity duration-300" :class="{'opacity-100': hoverDrum}">Écouter le tambour</span>
    </div>
  </section>
</template>

<script>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrer les plugins GSAP
gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'ExperiencesSection',
  emits: ['navigate-to'],
  
  data() {
    return {
      hoverDrum: false,
      
      // Symboles vodou supplémentaires
      extraSymbols: [
        { 
          path: "M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z", 
          color: "benin-culture/10", 
          top: "22%", 
          left: "70%", 
          size: 50, 
          opacity: 0.7, 
          speed: 0.02,
          rotate: true
        },
        { 
          path: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z", 
          color: "benin-yellow/10", 
          top: "65%", 
          left: "85%", 
          size: 45, 
          opacity: 0.5, 
          speed: 0.03,
          rotate: false
        },
        { 
          path: "M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z", 
          color: "benin-green/10", 
          top: "70%", 
          left: "25%", 
          size: 65, 
          opacity: 0.6, 
          speed: 0.01,
          rotate: true
        }
      ],
      
      // Caractéristiques de l'expérience Vodun
      vodunFeatures: [
        { icon: 'fa-drum', text: 'Rythmes et danses traditionnelles' },
        { icon: 'fa-fire-alt', text: 'Rituels et offrandes aux divinités' },
        { icon: 'fa-user-friends', text: 'Rencontre avec un prêtre Vodun' },
        { icon: 'fa-utensils', text: 'Repas traditionnel partagé' }
      ],
      
      // Expériences à afficher
      experiences: [
        {
          title: 'Atelier d\'artisanat',
          location: 'Abomey',
          image: '/artisanat-experience.webp',
          description: 'Initiez-vous aux techniques ancestrales de sculpture sur bois, de tissage ou de fabrication de perles avec des artisans locaux. Repartez avec votre création personnelle.',
          price: '45 000 FCFA',
          duration: 'Demi-journée'
        },
        {
          title: 'Cours de cuisine',
          location: 'Cotonou',
          image: '/cuisine-experience.webp',
          description: 'Apprenez à préparer les plats emblématiques béninois comme l\'amiwo, le wagasi ou la sauce arachide avec une famille locale, puis partagez le repas ensemble.',
          price: '35 000 FCFA',
          duration: 'Demi-journée'
        },
        {
          title: 'Pêche traditionnelle',
          location: 'Ganvié',
          image: '/peche-experience.webp',
          description: 'Accompagnez les pêcheurs de Ganvié à l\'aube et apprenez leurs techniques ancestrales de pêche dans le lac Nokoué. Une immersion authentique dans la vie lacustre.',
          price: '40 000 FCFA',
          duration: 'Matinée'
        },
        {
          title: 'Initiation à la danse',
          location: 'Abomey',
          image: '/danse-experience.webp',
          description: 'Apprenez les mouvements de base des danses traditionnelles béninoises avec une troupe locale. Une expérience énergique et joyeuse au rythme des tambours.',
          price: '25 000 FCFA',
          duration: '2 heures'
        },
        {
          title: 'Visite de marché',
          location: 'Cotonou',
          image: '/marche-experience.webp',
          description: 'Explorez le marché Dantokpa, l\'un des plus grands d\'Afrique de l\'Ouest, avec un guide local. Découvrez les étals colorés, les produits locaux et l\'artisanat.',
          price: '30 000 FCFA',
          duration: 'Demi-journée'
        },
        {
          title: 'Nuit en village',
          location: 'Pays Somba',
          image: '/village-experience.webp',
          description: 'Passez une nuit dans un Tata Somba traditionnel et partagez le quotidien d\'une famille. Une immersion complète dans la culture du nord du Bénin.',
          price: '60 000 FCFA',
          duration: '24 heures'
        }
      ],
      
      // Son du tambour
      drumSound: null
    };
  },
  
  mounted() {
    // Initialiser les animations GSAP après le montage
    this.$nextTick(() => {
      this.initParallaxEffects();
      this.initScrollAnimations();
      this.initParticles();
      this.initTypewriterEffect();
      this.preloadDrumSound();
    });
  },
  
  beforeUnmount() {
    // Nettoyer les ScrollTriggers pour éviter les fuites de mémoire
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  },
  
  methods: {
    // Effet parallaxe pour les images et éléments décoratifs
    initParallaxEffects() {
      // Parallaxe sur l'image principale
      if (this.$refs.parallaxImage) {
        this.$refs.experienceSection.addEventListener('mousemove', (e) => {
          const { clientX, clientY } = e;
          const xPos = (window.innerWidth / 2 - clientX) / 40;
          const yPos = (window.innerHeight / 2 - clientY) / 40;
          
          gsap.to(this.$refs.parallaxImage.querySelector('img'), {
            x: xPos,
            y: yPos,
            duration: 0.8,
            ease: 'power1.out'
          });
        });
      }
      
      // Animation des symboles mystiques
      const symbols = document.querySelectorAll('.symbol');
      symbols.forEach(symbol => {
        const speed = symbol.getAttribute('data-speed') || 0.02;
        const shouldRotate = symbol.getAttribute('data-rotate') === 'true';
        
        this.$refs.experienceSection.addEventListener('mousemove', (e) => {
          const { clientX, clientY } = e;
          const xPos = (window.innerWidth / 2 - clientX) * speed;
          const yPos = (window.innerHeight / 2 - clientY) * speed;
          
          gsap.to(symbol, {
            x: xPos,
            y: yPos,
            rotation: shouldRotate ? (xPos * 0.02) : 0,
            duration: 1,
            ease: 'power1.out'
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
      
      // Animation de l'expérience vedette
      gsap.to(this.$refs.featuredExperience, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: this.$refs.featuredExperience,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
      
      // Animation des caractéristiques
      const features = document.querySelectorAll('.feature-item');
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
      
      // Animation des cartes d'expérience
      const cards = document.querySelectorAll('.experience-card');
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
      
      // Animation du bouton "Voir plus"
      gsap.to(this.$refs.viewMoreBtn, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: this.$refs.viewMoreBtn,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      });
      
      // Animation du témoignage
      gsap.to(this.$refs.testimonial, {
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: this.$refs.testimonial,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
      
      // Animation du testimonial author après la fin de l'effet machine à écrire
      setTimeout(() => {
        gsap.to(this.$refs.testimonialAuthor, {
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: this.$refs.testimonialAuthor,
            start: 'top 95%',
            toggleActions: 'play none none none'
          }
        });
      }, 2000);
      
      // Animation du banner CTA
      gsap.to(this.$refs.ctaBanner, {
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: this.$refs.ctaBanner,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
      
      // Animation du bouton tambour
      gsap.to(this.$refs.drumButton, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: this.$refs.experienceSection,
          start: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      });
      
      // Effet de zoom sur l'image CTA au défilement
      ScrollTrigger.create({
        trigger: this.$refs.ctaBanner,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(this.$refs.ctaImage, {
            scale: 1.1 + (progress * 0.1),
            duration: 0.5
          });
        }
      });
    },
    
    // Particules mystiques
    initParticles() {
      const container = this.$refs.particlesContainer;
      const particleCount = 30;
      const colors = ['#9333EA33', '#FCD11633', '#00875133'];
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;
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
          duration: Math.random() * 10 + 10,
          repeat: -1,
          repeatRefresh: true,
          ease: 'none'
        });
      }
    },
    
    // Effet machine à écrire pour le témoignage
    initTypewriterEffect() {
      const text = this.$refs.testimonialText.innerText;
      this.$refs.testimonialText.innerText = '';
      
      ScrollTrigger.create({
        trigger: this.$refs.testimonial,
        start: 'top 70%',
        onEnter: () => {
          let currentChar = 0;
          const typeInterval = setInterval(() => {
            if (currentChar < text.length) {
              this.$refs.testimonialText.innerText = text.substring(0, currentChar + 1);
              currentChar++;
            } else {
              clearInterval(typeInterval);
              
              // Afficher l'auteur après la fin de l'effet machine à écrire
              gsap.to(this.$refs.testimonialAuthor, {
                opacity: 1,
                duration: 0.8
              });
            }
          }, 10);
        },
        once: true
      });
    },
    
    // Préchargement du son de tambour
    preloadDrumSound() {
      this.drumSound = new Audio('/sounds/drum-beat.mp3');
      this.drumSound.load();
    },
    
    // Lecture du son de tambour au clic
    playDrumSound() {
      if (this.drumSound) {
        this.drumSound.currentTime = 0;
        this.drumSound.play();
        
        // Animation du bouton tambour
        gsap.to(this.$refs.drumButton, {
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
.experience-card {
  transform: translateY(20px);
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.experience-card:hover {
  transform: translateY(-10px);
}

/* Animation du texte magique */
.magical-text {
  background: linear-gradient(90deg, #9333EA, #FCD116, #008751, #9333EA);
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

/* Effet shimmer pour les boutons */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.animate-shimmer {
  animation: shimmer 3s linear infinite;
}

/* Animation de l'effet machine à écrire */
.typewriter-text {
  border-right: 0.1em solid #9333EA;
  width: fit-content;
  white-space: wrap;
  overflow: hidden;
}

/* Animations pour les éléments CTA */
.cta-element {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.cta-container:hover .cta-element {
  opacity: 1;
  transform: translateY(0);
}

/* Effet d'overlay vodou sur l'image */
.parallax-container:hover .vodun-overlay {
  opacity: 0.7 !important;
}
</style> 