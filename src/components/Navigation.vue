<template>
  <nav class="fixed top-0 left-0 w-full z-40 transition-all duration-500" 
       :class="{'bg-white/90 shadow-md backdrop-blur-md': isPastHero, 'bg-gradient-to-r from-night/40 to-night/10 backdrop-blur-sm': !isPastHero}">
    <!-- Particules décoratives du menu -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div v-if="!isPastHero" class="nav-particle bg-benin-yellow/30 rounded-full blur-md"></div>
      <div v-if="!isPastHero" class="nav-particle bg-vodou/20 rounded-full blur-md"></div>
    </div>
       
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-gradient-to-br from-benin-green to-benin-green-600 rounded-full flex items-center justify-center overflow-hidden relative hover:shadow-lg transition-all duration-300 group">
              <div class="absolute inset-0 bg-benin-pattern mix-blend-overlay opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(252,209,22,0.3),transparent_70%)]"></div>
              <span class="text-white font-bold text-xl relative z-10 group-hover:scale-110 transition-transform duration-300">B</span>
            </div>
            <div class="ml-3">
              <span class="block text-xl font-display font-bold transition-colors duration-300" 
                    :class="{'text-white': !isPastHero && !isMenuOpen, 'text-benin-green': isPastHero || isMenuOpen}">
                Bénin Immersif
              </span>
              <span class="text-xs uppercase tracking-wider font-medium" 
                    :class="{'text-benin-yellow/90': !isPastHero && !isMenuOpen, 'text-benin-green-600/80': isPastHero || isMenuOpen}">
                Voyage au cœur de l'Afrique
              </span>
            </div>
          </div>
        </div>
        
        <!-- Desktop navigation -->
        <div class="hidden lg:flex items-center space-x-2">
          <template v-for="(item, index) in navigationItems" :key="index">
            <a @click.prevent="navigateTo(item.section)"
               :class="{ 
                 'text-benin-yellow before:w-full': activeSection === item.section, 
                 'text-white before:w-0': !isPastHero && activeSection !== item.section,
                 'text-gray-800 before:w-0': isPastHero && activeSection !== item.section
               }"
               class="px-4 py-2 text-base font-medium rounded-md relative overflow-hidden cursor-pointer transition-colors duration-300 hover:text-benin-yellow flex items-center before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:h-0.5 before:bg-benin-yellow before:transition-all before:duration-300 hover:before:w-3/4"
               href="#">
              <span class="mr-1.5">
                <i :class="`fas ${item.icon} text-xs ${activeSection === item.section ? 'text-benin-yellow' : ''}`"></i>
              </span>
              <span>{{ item.name }}</span>
            </a>
          </template>
          
          <button @click="$emit('open-journey-map')"
                  class="ml-4 px-5 py-2.5 bg-gradient-to-r from-benin-yellow to-benin-yellow-500 text-benin-green font-medium rounded-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group">
            <span class="relative z-10 flex items-center">
              <i class="fas fa-map-marked-alt mr-2"></i>
              Explorer la carte
            </span>
            <span class="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-bounce-in-out"></span>
          </button>
        </div>
        
        <!-- Mobile menu button -->
        <div class="lg:hidden">
          <button @click="toggleMenu" 
                  class="text-gray-700 hover:text-benin-green focus:outline-none z-50 relative" 
                  :class="{'text-white': !isPastHero && !isMenuOpen}"
                  aria-label="Menu principal"
                  :aria-expanded="isMenuOpen ? 'true' : 'false'">
            <div class="w-8 h-6 flex flex-col justify-between items-center">
              <span class="w-full h-0.5 bg-current transform transition-transform duration-300" 
                    :class="{'rotate-45 translate-y-2.5': isMenuOpen}"></span>
              <span class="w-full h-0.5 bg-current transition-opacity duration-300" 
                    :class="{'opacity-0': isMenuOpen}"></span>
              <span class="w-full h-0.5 bg-current transform transition-transform duration-300" 
                    :class="{'-rotate-45 -translate-y-2.5': isMenuOpen}"></span>
            </div>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile menu -->
    <div v-show="isMenuOpen" 
         class="fixed inset-0 z-40 overflow-y-auto"
         :class="{'opacity-100 translate-y-0': isMenuOpen, 'opacity-0 -translate-y-full': !isMenuOpen}"
         id="mobile-menu">
      <div class="absolute inset-0 bg-white bg-opacity-95 backdrop-blur-sm"></div>
      <div class="relative pt-20 pb-8 px-6 max-w-md mx-auto">
        <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-benin-green via-benin-yellow to-vodou"></div>
        
        <div class="text-center mb-8">
          <div class="mx-auto w-16 h-16 bg-gradient-to-br from-benin-green to-benin-green-600 rounded-full flex items-center justify-center mb-3">
            <span class="text-white font-bold text-2xl">B</span>
          </div>
          <h2 class="text-2xl font-display font-bold text-benin-green">Bénin Immersif</h2>
          <p class="text-sm text-gray-600">Voyage immersif au cœur de l'Afrique</p>
        </div>
        
        <div class="space-y-2">
          <template v-for="(item, index) in navigationItems" :key="index">
            <div>
              <a @click.prevent="navigateTo(item.section)" 
                 href="#"
                 class="flex items-center p-4 rounded-xl transition-all duration-300 group"
                 :class="{
                   'bg-gradient-to-r from-benin-green-50 to-benin-green-100 text-benin-green border-l-4 border-benin-green': activeSection === item.section, 
                   'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent': activeSection !== item.section
                 }">
                <div class="w-10 h-10 rounded-full flex items-center justify-center"
                     :class="{
                       'bg-benin-green text-white': activeSection === item.section,
                       'bg-gray-100 text-gray-500 group-hover:bg-benin-green/10 group-hover:text-benin-green': activeSection !== item.section
                     }">
                  <i :class="`fas ${item.icon}`"></i>
                </div>
                <span class="ml-3 text-lg font-medium">{{ item.name }}</span>
              </a>
            </div>
          </template>
        </div>
        
        <div class="mt-10">
          <button @click="openJourneyMapAndCloseMenu"
                  class="w-full flex items-center justify-center px-4 py-4 bg-gradient-to-r from-benin-yellow to-benin-yellow-500 text-benin-green font-bold rounded-xl hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
            <span class="relative z-10 flex items-center">
              <i class="fas fa-map-marked-alt mr-2"></i>
              Explorer la carte du Bénin
            </span>
            <span class="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-bounce-in-out"></span>
          </button>
          
          <div class="mt-8 pt-8 border-t border-gray-200 flex justify-center space-x-6">
            <a href="#" class="text-gray-500 hover:text-benin-green transition-colors duration-300">
              <i class="fab fa-facebook-f text-xl"></i>
            </a>
            <a href="#" class="text-gray-500 hover:text-benin-green transition-colors duration-300">
              <i class="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" class="text-gray-500 hover:text-benin-green transition-colors duration-300">
              <i class="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" class="text-gray-500 hover:text-benin-green transition-colors duration-300">
              <i class="fab fa-youtube text-xl"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  emits: ['open-journey-map', 'navigate-to'],
  data() {
    return {
      isPastHero: false,
      isMenuOpen: false,
      activeSection: 'hero',
      navigationItems: [
        {name: 'Accueil', section: 'hero', icon: 'fa-home'},
        {name: 'Culture', section: 'culture', icon: 'fa-landmark'},
        {name: 'Nature', section: 'nature', icon: 'fa-leaf'},
        {name: 'Cuisine', section: 'gastronomie', icon: 'fa-utensils'},
        {name: 'Contact', section: 'contact', icon: 'fa-envelope'}
      ]
    }
  },
  mounted() {
    window.addEventListener('scroll', this.throttledCheckNavPosition);
    this.checkNavPosition();
    this.animateNavParticles();
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.throttledCheckNavPosition);
  },
  methods: {
    throttledCheckNavPosition() {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.checkNavPosition();
          this.ticking = false;
        });
        this.ticking = true;
      }
    },
    checkNavPosition() {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        // Obtenir la position et la hauteur de la section hero
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        
        // Vérifier si le scroll a dépassé la section hero
        this.isPastHero = window.scrollY >= heroBottom-100;
      } else {
        // Fallback au comportement précédent si la section hero n'est pas trouvée
        this.isPastHero = window.scrollY > 50;
      }
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      // Empêcher le défilement du body quand le menu est ouvert
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    },
    navigateTo(section) {
      this.activeSection = section;
      this.isMenuOpen = false;
      document.body.style.overflow = '';
      
      // Ajout du défilement animé vers la section
      const targetElement = document.getElementById(section);
      if (targetElement) {
        const offset = 80; // Décalage pour tenir compte de la hauteur du menu
        
        // Animation du défilement
        this.scrollToElement(targetElement, offset);
        
        // Effet visuel pour mettre en évidence la section ciblée
        this.highlightTargetSection(targetElement);
      }
      
      // On conserve l'émission de l'événement pour la compatibilité
      this.$emit('navigate-to', section);
    },
    scrollToElement(element, offset = 80) {
      // Utilisation de GSAP si disponible avec le plugin ScrollToPlugin
      if (window.gsap && window.gsap.to && typeof gsap.to === 'function' && gsap.plugins && gsap.plugins.scrollTo) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: element.offsetTop - offset,
            autoKill: true
          },
          ease: "power3.inOut"
        });
      } else {
        // Fallback sur l'API native
        window.scrollTo({
          top: element.offsetTop - offset,
          behavior: 'smooth'
        });
      }
    },
    highlightTargetSection(element) {
      // Sauvegarde des styles originaux
      const originalTransform = element.style.transform;
      const originalTransition = element.style.transition;
      const originalZIndex = element.style.zIndex;
      
      // Application d'une transition fluide
      element.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
      
      // Effet de mise en évidence subtil avec les couleurs béninoises
      if (window.gsap) {
        // Création d'un effet de "spotlight" avec GSAP
        gsap.fromTo(element, 
          { boxShadow: '0 0 0 0 rgba(0, 150, 136, 0)', scale: 1 },
          { 
            boxShadow: '0 0 70px 0 rgba(0, 150, 136, 0.15), 0 0 0 4px rgba(0, 150, 136, 0.05)', 
            scale: 1.01,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
              // Animation de retour
              gsap.to(element, {
                boxShadow: '0 0 0 0 rgba(0, 150, 136, 0)',
                scale: 1,
                duration: 0.8,
                delay: 0.2,
                ease: "power3.inOut"
              });
            }
          }
        );
        
        // Effet de parallaxe pour les éléments enfants (s'il y en a)
        this.applyParallaxEffect(element);
      } else {
        // Fallback si GSAP n'est pas disponible
        element.style.boxShadow = '0 0 30px rgba(0, 150, 136, 0.2)';
        element.style.transform = 'scale(1.01)';
        element.style.zIndex = '1';
        
        // Retour à l'état normal après l'animation
        setTimeout(() => {
          element.style.boxShadow = '';
          element.style.transform = originalTransform;
          element.style.zIndex = originalZIndex;
          setTimeout(() => {
            element.style.transition = originalTransition;
          }, 800);
        }, 1000);
      }
    },
    
    applyParallaxEffect(element) {
      // Sélectionne des éléments qui pourraient bénéficier d'un effet parallaxe
      const parallaxElements = element.querySelectorAll('img, .rounded-full, .bg-benin-green, .bg-benin-culture, .bg-benin-yellow');
      
      if (parallaxElements.length > 0) {
        parallaxElements.forEach((el, index) => {
          // Créer des effets différents selon le type d'élément
          const delay = index * 0.05; // Délai échelonné
          const yDistance = (index % 2 === 0) ? -15 : 15; // Mouvement alterné
          
          // Sauvegarde des styles originaux
          const originalTransform = el.style.transform;
          const originalTransition = el.style.transition;
          
          if (window.gsap) {
            // Animation d'entrée
            gsap.fromTo(el, 
              { y: 0, opacity: 1 },
              { 
                y: yDistance, 
                opacity: 0.8,
                duration: 0.4,
                delay: delay,
                ease: "power1.out",
                onComplete: () => {
                  // Animation de retour
                  gsap.to(el, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    delay: 0.1,
                    ease: "elastic.out(1, 0.8)"
                  });
                }
              }
            );
          } else {
            // Fallback si GSAP n'est pas disponible
            el.style.transition = 'all 0.4s ease-out';
            el.style.transform = `translateY(${yDistance}px)`;
            el.style.opacity = '0.8';
            
            setTimeout(() => {
              el.style.transform = originalTransform;
              el.style.opacity = '1';
              setTimeout(() => {
                el.style.transition = originalTransition;
              }, 600);
            }, 400 + delay * 1000);
          }
        });
      }
    },
    openJourneyMapAndCloseMenu() {
      this.isMenuOpen = false;
      document.body.style.overflow = '';
      
      // Si le map est une section de la page avec un ID, utilisons notre système de défilement
      const mapSection = document.getElementById('map');
      if (mapSection) {
        this.scrollToElement(mapSection);
        this.highlightTargetSection(mapSection);
        this.activeSection = 'map';
      }
      
      // Dans tous les cas, émettons l'événement pour la compatibilité
      this.$emit('open-journey-map');
    },
    animateNavParticles() {
      // Animation des particules dans la navigation
      const particles = document.querySelectorAll('.nav-particle');
      particles.forEach((particle, index) => {
        const delay = index * 2;
        const duration = 10 + Math.random() * 15;
        
        if (window.gsap) {
          gsap.to(particle, {
            x: `random(-50, 50)`,
            y: `random(-30, 30)`,
            opacity: `random(0.1, 0.3)`,
            scale: `random(0.8, 1.5)`,
            duration: duration,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: delay
          });
        }
      });
    }
  }
}
</script>

<style scoped>
/* Animations des éléments de navigation */
#mobile-menu {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

/* Particules d'arrière-plan pour la navigation */
.nav-particle {
  position: absolute;
  width: 60px;
  height: 60px;
  opacity: 0.2;
}

.nav-particle:nth-child(1) {
  top: -20px;
  right: 10%;
  width: 80px;
  height: 80px;
}

.nav-particle:nth-child(2) {
  top: 30px;
  left: 15%;
  width: 40px;
  height: 40px;
}

/* Motif béninois pour le logo */
.bg-benin-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

@media (max-width: 768px) {
  .nav-particle {
    display: none;
  }
}
</style> 