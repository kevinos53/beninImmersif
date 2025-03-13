<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden pb-20">
    <!-- Background avec animation mystique avancée -->
    <div class="absolute inset-0 hero-bg">
      <!-- Overlay gradient amélioré avec nuances violettes et vertes -->
      <div class="absolute inset-0 bg-gradient-to-b from-benin-night/80 via-spirit-dark/70 to-benin-green-700/70 z-10"></div>
      
      <!-- Image de fond avec meilleure animation -->
      <div class="absolute inset-0 bg-black">
        <img src="/crepuscule-benin.webp" 
             alt="Paysage du Bénin" 
             class="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1500"
             ref="heroImage"
             @load="onImageLoad">
      </div>
      
      <!-- Motifs mystiques et symboles vodou flottants -->
      <div ref="vodouSymbols" class="vodou-symbols absolute inset-0 z-10 overflow-hidden opacity-0">
        <!-- Symboles vèvè du vodou qui flottent doucement -->
        <div class="absolute w-28 h-28 opacity-20 top-1/4 left-1/4 rotate-12 veve-symbol" data-depth="0.2">
          <svg viewBox="0 0 100 100" class="w-full h-full text-benin-yellow">
            <path fill="currentColor" d="M50,10 L90,50 L50,90 L10,50 Z M50,30 L70,50 L50,70 L30,50 Z"></path>
          </svg>
        </div>
        <div class="absolute w-20 h-20 opacity-10 top-2/3 right-1/3 -rotate-12 veve-symbol" data-depth="0.4">
          <svg viewBox="0 0 100 100" class="w-full h-full text-vodou-light">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="2"/>
            <path fill="none" stroke="currentColor" stroke-width="2" d="M30,50 L70,50 M50,30 L50,70 M25,25 L75,75 M25,75 L75,25"></path>
          </svg>
        </div>
        <div class="absolute w-32 h-32 opacity-15 bottom-1/3 left-1/5 rotate-45 veve-symbol" data-depth="0.3">
          <svg viewBox="0 0 100 100" class="w-full h-full text-benin-yellow">
            <path fill="none" stroke="currentColor" stroke-width="2" d="M20,50 Q50,20 80,50 Q50,80 20,50 Z"></path>
            <circle cx="50" cy="50" r="10" fill="currentColor"/>
          </svg>
        </div>
        
        <!-- Nouveaux symboles mystiques -->
        <div class="absolute w-24 h-24 opacity-15 top-1/5 right-1/4 veve-symbol" data-depth="0.25">
          <svg viewBox="0 0 100 100" class="w-full h-full text-vodou">
            <path fill="none" stroke="currentColor" stroke-width="2" d="M50,10 Q70,30 90,50 Q70,70 50,90 Q30,70 10,50 Q30,30 50,10 Z"></path>
            <path fill="none" stroke="currentColor" stroke-width="2" d="M30,30 L70,70 M30,70 L70,30"></path>
          </svg>
        </div>
        <div class="absolute w-36 h-36 opacity-10 bottom-1/4 right-1/6 -rotate-15 veve-symbol" data-depth="0.15">
          <svg viewBox="0 0 100 100" class="w-full h-full text-benin-green-200">
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <path fill="none" stroke="currentColor" stroke-width="1.5" d="M50,15 L50,85 M15,50 L85,50"></path>
          </svg>
        </div>
      </div>
      
      <!-- Particules mystiques -->
      <div ref="mysticalParticles" class="absolute inset-0 z-10 opacity-0">
        <div v-for="n in 20" :key="n" class="absolute rounded-full mystical-particle"
             :class="[
               n % 3 === 0 ? 'bg-benin-yellow' : n % 3 === 1 ? 'bg-vodou' : 'bg-benin-green',
               n % 4 === 0 ? 'w-1 h-1' : n % 4 === 1 ? 'w-1.5 h-1.5' : n % 4 === 2 ? 'w-2 h-2' : 'w-3 h-3'
             ]"
             :style="{
               left: `${Math.random() * 100}%`,
               top: `${Math.random() * 100}%`,
               animationDelay: `${Math.random() * 5}s`,
               animationDuration: `${5 + Math.random() * 10}s`
             }">
        </div>
      </div>
    </div>
    
    <!-- Hero Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 mt-20 lg:mt-0">
      <div class="text-center lg:text-left lg:flex justify-between items-center">
        <div class="lg:w-3/5 mb-12 lg:mb-0">
          <!-- Titre avec animation de révélation mystique -->
          <h1 ref="heroTitle" class="hero-title text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-white leading-tight mb-6 opacity-0">
            <span class="block mb-2 title-word">Plongez dans l'âme du</span>
            <span class="magical-text title-word relative inline-block">
              Bénin
              <span class="absolute bottom-1 left-0 w-0 h-1 bg-benin-yellow title-underline"></span>
            </span>
          </h1>
          
          <!-- Sous-titre avec apparition progressive -->
          <p ref="heroSubtitle" class="hero-subtitle text-white/90 text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 mb-8 opacity-0">
            Un voyage immersif à travers les richesses spirituelles, les traditions ancestrales et les 
            <span class="relative inline-block">
              mystères
              <span class="absolute bottom-0 left-0 w-full h-0.5 bg-vodou-light"></span>
            </span> 
            du berceau du Vodoun.
          </p>
          
          <!-- Boutons avec effets de brillance améliorés -->
          <div ref="heroCta" class="hero-cta flex flex-wrap gap-4 justify-center lg:justify-start opacity-0">
            <button @click="$emit('navigate-to', 'culture')"
                    class="px-6 py-3 bg-benin-yellow text-benin-green font-bold rounded-full hover:bg-white group transition-all duration-500 relative overflow-hidden transform hover:scale-105">
              <span class="relative z-10">Commencer l'expérience</span>
              <span class="absolute inset-0 bg-gradient-to-r from-benin-yellow via-white to-benin-yellow bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></span>
              <!-- Aura mystique -->
              <span class="absolute inset-0 -m-2 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-benin-yellow blur-md"></span>
            </button>
            <button @click="$emit('open-journey-map')"
                    class="px-6 py-3 border-2 border-white/80 text-white font-bold rounded-full group hover:border-benin-yellow transition-all duration-500 relative overflow-hidden transform hover:scale-105">
              <span class="relative z-10">Explorer la carte mystique</span>
              <span class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
              <!-- Effet de contour lumineux -->
              <span class="absolute inset-0 -m-0.5 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500 border border-benin-yellow blur-sm"></span>
            </button>
          </div>
        </div>
        
        <!-- Élément vodou mystique amélioré -->
        <div class="lg:w-2/5 flex justify-center">
          <div ref="vodouArtifact" class="vodou-artifact relative w-80 h-80 opacity-0">
            <!-- Cercle lumineux externe -->
            <div class="absolute inset-0 rounded-full bg-gradient-to-br from-benin-yellow/20 via-spirit/15 to-benin-green/15 animate-pulse-slow"></div>
            
            <!-- Cercles orbitaux améliorés -->
            <div class="absolute inset-4 border-2 border-benin-yellow/30 rounded-full animate-spin-slow orbital-circle"></div>
            <div class="absolute inset-10 border border-vodou-light/20 rounded-full animate-spin-reverse orbital-circle"></div>
            <div class="absolute inset-16 border border-benin-green/20 rounded-full animate-spin-slower orbital-circle"></div>
            
            <!-- Points lumineux sur les orbites -->
            <div class="absolute w-3 h-3 bg-benin-yellow rounded-full blur-sm orbital-point" style="top: 50%; left: 5%; transform: translate(-50%, -50%)"></div>
            <div class="absolute w-2 h-2 bg-vodou rounded-full blur-sm orbital-point" style="top: 25%; right: 10%; transform: translate(50%, -50%)"></div>
            <div class="absolute w-2.5 h-2.5 bg-benin-green rounded-full blur-sm orbital-point" style="bottom: 15%; left: 40%; transform: translate(-50%, 50%)"></div>
            
            <!-- Masque central amélioré -->
            <div class="absolute inset-0 flex items-center justify-center transform animate-float mask-container">
              <div class="w-44 h-60 bg-gradient-to-b from-spirit-dark/90 to-night/90 rounded-2xl relative overflow-hidden shadow-[0_0_40px_rgba(252,209,22,0.3)]">
                <!-- Motifs sur le masque -->
                <div class="absolute inset-0 opacity-30 benin-pattern"></div>
                
                <!-- Yeux lumineux améliorés -->
                <div class="absolute top-1/4 left-1/4 w-4 h-12 bg-benin-yellow rounded-full blur-sm animate-pulse-slow transform -rotate-12 mask-eye"></div>
                <div class="absolute top-1/4 right-1/4 w-4 h-12 bg-benin-yellow rounded-full blur-sm animate-pulse-slow transform rotate-12 mask-eye"></div>
                
                <!-- Motifs ornementaux améliorés -->
                <div class="absolute bottom-8 inset-x-4 h-1 bg-benin-yellow/70 rounded"></div>
                <div class="absolute bottom-12 inset-x-8 h-1 bg-benin-yellow/50 rounded"></div>
                <div class="absolute bottom-16 inset-x-12 h-1 bg-benin-yellow/30 rounded"></div>
                
                <!-- Symboles mystiques gravés -->
                <div class="absolute top-10 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-vodou-light/40 rounded"></div>
                <div class="absolute top-14 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-vodou-light/40 rounded"></div>
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-4 w-10 h-10">
                  <svg viewBox="0 0 100 100" class="w-full h-full text-vodou-light/30">
                    <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="2"/>
                    <path fill="none" stroke="currentColor" stroke-width="2" d="M50,25 L50,75 M25,50 L75,50"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- Aura luminescente externe -->
            <div class="absolute inset-0 rounded-full bg-gradient-to-b from-benin-yellow/5 via-vodou/5 to-transparent blur-xl aura-glow"></div>
          </div>
        </div>
      </div>
      
      <!-- Indicateur de défilement amélioré -->
      <div ref="scrollIndicator" class="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white text-center opacity-0">
        <p class="mb-3 text-sm font-medium text-benin-yellow/90 tracking-wide">Découvrir les mystères</p>
        <div class="w-8 h-12 border-2 border-benin-yellow/50 rounded-full flex justify-center relative overflow-hidden group hover:border-benin-yellow transition-colors duration-300">
          <div class="w-1.5 h-1.5 bg-benin-yellow rounded-full relative top-1.5 animate-scroll-pulse"></div>
          <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-benin-yellow/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>
    </div>
    
    <!-- Éléments décoratifs avec meilleure animation -->
    <div class="absolute left-10 top-1/3 w-32 h-32 bg-vodou/10 rounded-full blur-3xl animate-pulse-slow opacity-70 decorative-orb"></div>
    <div class="absolute right-10 top-2/3 w-40 h-40 bg-benin-green/10 rounded-full blur-3xl animate-float opacity-60 decorative-orb"></div>
    <div class="absolute bottom-1/4 left-1/3 w-24 h-24 bg-benin-yellow/10 rounded-full blur-3xl animate-pulse-slow opacity-50 decorative-orb"></div>
    
    <!-- Séparateur de vague amélioré -->
    <div class="absolute bottom-0 left-0 w-full overflow-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="w-full h-auto wave-separator">
        <path fill="#ffffff" fill-opacity="1" d="M0,192L48,186.7C96,181,192,171,288,181.3C384,192,480,224,576,218.7C672,213,768,171,864,154.7C960,139,1056,149,1152,154.7C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" class="transition-all duration-1000 ease-in-out"></path>
      </svg>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  emits: ['navigate-to', 'open-journey-map'],
  mounted() {
    this.initAnimations();
    this.setupParallax();
  },
  methods: {
    onImageLoad(event) {
      event.target.classList.add('opacity-100');
      // Animation supplémentaire après chargement de l'image
      if (window.gsap) {
        gsap.to(event.target, {
          scale: 1.05,
          duration: 20,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      }
    },
    setupParallax() {
      // Effet de parallaxe sur les symboles vodou
      if (window.gsap) {
        document.addEventListener('mousemove', (e) => {
          const symbols = document.querySelectorAll('.veve-symbol');
          const windowWidth = window.innerWidth;
          const windowHeight = window.innerHeight;
          
          symbols.forEach(symbol => {
            const depth = parseFloat(symbol.getAttribute('data-depth')) || 0.2;
            const moveX = (e.clientX - windowWidth / 2) * depth;
            const moveY = (e.clientY - windowHeight / 2) * depth;
            
            gsap.to(symbol, {
              x: moveX,
              y: moveY,
              duration: 1,
              ease: "power1.out"
            });
          });
          
          // Effet sur le masque vodou
          const maskContainer = document.querySelector('.mask-container');
          if (maskContainer) {
            const maskDepth = 0.05;
            const maskMoveX = (e.clientX - windowWidth / 2) * maskDepth;
            const maskMoveY = (e.clientY - windowHeight / 2) * maskDepth;
            
            gsap.to(maskContainer, {
              x: maskMoveX,
              y: maskMoveY,
              rotationY: maskMoveX * 0.02,
              rotationX: -maskMoveY * 0.02,
              duration: 1.5,
              ease: "power1.out"
            });
          }
        });
      }
    },
    initAnimations() {
      // Utilisation de GSAP pour des animations avancées
      if (window.gsap) {
        // Timeline principale
        const mainTl = gsap.timeline();
        
        // Fade in des particules mystiques
        mainTl.to(this.$refs.mysticalParticles, {
          opacity: 0.7, 
          duration: 3,
          ease: 'power2.inOut'
        }, 0);
        
        // Animation du titre avec split text
        const titleWords = document.querySelectorAll('.title-word');
        titleWords.forEach((word, index) => {
          mainTl.from(word, {
            opacity: 0,
            y: 50,
            duration: 1.2,
            ease: "back.out(1.7)"
          }, 0.5 + index * 0.2);
        });
        
        // Animation du soulignement du titre
        mainTl.to('.title-underline', {
          width: '100%',
          duration: 1.2,
          ease: "power2.out"
        }, 2);
        
        // Animation du sous-titre
        mainTl.to(this.$refs.heroSubtitle, {
          opacity: 1, 
          duration: 1.5, 
          y: 0,
          ease: 'power2.out'
        }, 1.8);
        
        // Animation des boutons CTA
        mainTl.to(this.$refs.heroCta, {
          opacity: 1, 
          duration: 1.2,
          y: 0,
          stagger: 0.2,
          ease: 'back.out(1.5)'
        }, 2.2);
        
        // Animation de l'artefact vodou
        mainTl.to(this.$refs.vodouArtifact, {
          opacity: 1, 
          duration: 2.5,
          scale: 1,
          ease: 'power3.inOut'
        }, 1);
        
        // Animation des yeux du masque
        const maskEyes = document.querySelectorAll('.mask-eye');
        mainTl.fromTo(maskEyes, {
          opacity: 0,
          scale: 0.5,
          filter: 'blur(5px)'
        }, {
          opacity: 1,
          scale: 1,
          filter: 'blur(3px)',
          duration: 3,
          stagger: 0.3,
          ease: "elastic.out(1, 0.3)"
        }, 2.5);
        
        // Animation des orbites
        const orbitalCircles = document.querySelectorAll('.orbital-circle');
        mainTl.fromTo(orbitalCircles, {
          opacity: 0,
          scale: 0.7
        }, {
          opacity: 1,
          scale: 1,
          duration: 3,
          stagger: 0.4,
          ease: "power2.inOut"
        }, 2);
        
        // Animation des points sur les orbites
        const orbitalPoints = document.querySelectorAll('.orbital-point');
        mainTl.fromTo(orbitalPoints, {
          opacity: 0
        }, {
          opacity: 0.7,
          duration: 2,
          stagger: 0.3,
          ease: "sine.inOut"
        }, 3);
        
        // Animation de l'aura
        mainTl.fromTo('.aura-glow', {
          opacity: 0,
          scale: 0.8
        }, {
          opacity: 0.7,
          scale: 1.1,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        }, 3);
        
        // Animation des symboles vodou
        mainTl.to(this.$refs.vodouSymbols, {
          opacity: 1,
          duration: 2,
          ease: "power2.inOut"
        }, 2);
        
        // Animation des éléments décoratifs
        const decorativeOrbs = document.querySelectorAll('.decorative-orb');
        mainTl.fromTo(decorativeOrbs, {
          opacity: 0
        }, {
          opacity: (i) => [0.6, 0.5, 0.7][i % 3],
          duration: 3,
          stagger: 0.7,
          ease: "power2.inOut"
        }, 1.5);
        
        // Animation de l'indicateur de défilement
        gsap.to(this.$refs.scrollIndicator, {
          opacity: 1,
          y: -10,
          duration: 1.5,
          delay: 3.5,
          ease: "power2.out"
        });
        
        // Animation de pulse pour les particules mystiques
        const mysticalParticles = document.querySelectorAll('.mystical-particle');
        mysticalParticles.forEach((particle) => {
          gsap.to(particle, {
            y: -200 - Math.random() * 200,
            x: (Math.random() - 0.5) * 100,
            opacity: 0,
            duration: 10 + Math.random() * 15,
            repeat: -1,
            delay: Math.random() * 5,
            ease: "power1.out",
            onRepeat: function() {
              gsap.set(particle, {
                y: 50 + Math.random() * 100,
                x: (Math.random() - 0.5) * 200,
                opacity: 0.3 + Math.random() * 0.7
              });
            }
          });
        });
      }
    }
  }
}
</script>

<style scoped>
/* Styles spécifiques au composant Hero */
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.animate-shimmer {
  animation: shimmer 8s infinite linear;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

@keyframes spin-slow {
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}

@keyframes spin-slower {
  to { transform: rotate(360deg); }
}

.animate-spin-slower {
  animation: spin-slower 30s linear infinite;
}

@keyframes spin-reverse {
  to { transform: rotate(-360deg); }
}

.animate-spin-reverse {
  animation: spin-reverse 25s linear infinite;
}

@keyframes scroll-pulse {
  0%, 100% { transform: translateY(0); opacity: 0.7; }
  50% { transform: translateY(30px); opacity: 0; }
}

.animate-scroll-pulse {
  animation: scroll-pulse 2s ease-in-out infinite;
}

.animate-ken-burns {
  animation: ken-burns 20s ease-in-out infinite alternate;
}

@keyframes ken-burns {
  0% { transform: scale(1) translate(0); }
  100% { transform: scale(1.1) translate(-1%, -1%); }
}

/* Pattern béninois */
.benin-pattern {
  background-image: radial-gradient(circle at center, var(--tw-color-benin-yellow-500) 1px, transparent 1px),
                   linear-gradient(to right, var(--tw-color-benin-yellow-500) 1px, transparent 1px);
  background-size: 20px 20px, 20px 20px;
  background-position: 0 0, 10px 10px;
}

/* Animation de vague pour les particules mystiques */
@keyframes float-particle {
  0% { transform: translateY(0) translateX(0); opacity: 0.5; }
  50% { transform: translateY(-100px) translateX(20px); opacity: 0.8; }
  100% { transform: translateY(-200px) translateX(-20px); opacity: 0; }
}

.mystical-particle {
  filter: blur(1px);
  opacity: 0.3;
  animation: float-particle 20s ease-in-out infinite;
}

/* Effet du masque vodou */
.mask-eye {
  box-shadow: 0 0 15px rgba(252, 209, 22, 0.6);
}

.mask-container {
  will-change: transform;
  transform-style: preserve-3d;
  perspective: 1000px;
}

/* Animation de scintillement pour les points orbitaux */
.orbital-point {
  animation: blink 4s ease-in-out infinite alternate;
}

@keyframes blink {
  0%, 100% { opacity: 0.3; filter: blur(2px); }
  50% { opacity: 0.9; filter: blur(3px); }
}

/* Animation de vague */
.wave-separator path {
  transform-origin: center bottom;
  animation: wave 15s ease-in-out infinite alternate;
}

@keyframes wave {
  0% { d: path("M0,192L48,186.7C96,181,192,171,288,181.3C384,192,480,224,576,218.7C672,213,768,171,864,154.7C960,139,1056,149,1152,154.7C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"); }
  50% { d: path("M0,224L48,213.3C96,203,192,181,288,176C384,171,480,181,576,181.3C672,181,768,171,864,176C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"); }
  100% { d: path("M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,176C672,160,768,160,864,176C960,192,1056,224,1152,229.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"); }
}

/* Style pour le texte "magique" */
.magical-text {
  position: relative;
  display: inline-block;
  background-clip: text;
  background-image: linear-gradient(to right, #FCD116, #A78BFA, #1AB46C, #FCD116);
  background-size: 300% 100%;
  animation: text-shimmer 10s ease-in-out infinite;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}

@keyframes text-shimmer {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style> 