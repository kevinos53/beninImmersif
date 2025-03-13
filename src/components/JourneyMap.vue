<template>
  <transition 
    enter-active-class="transition-opacity duration-500" 
    enter-from-class="opacity-0" 
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300" 
    leave-from-class="opacity-100" 
    leave-to-class="opacity-0">
    
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Arrière-plan avec flou -->
      <div class="absolute inset-0 bg-night/95 backdrop-filter backdrop-blur-md"></div>
      
      <!-- Particules flottantes -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div v-for="n in 8" :key="`particle-${n}`" :class="`map-particle particle-${n}`"></div>
      </div>
      
      <!-- Contenu de la carte -->
      <div class="relative z-10 w-full max-w-6xl p-4 mx-auto">
        <!-- En-tête -->
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-3">
            <div class="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-benin-green to-benin-green-600">
              <i class="text-xl text-white fas fa-map-marked-alt"></i>
            </div>
            <h2 class="text-3xl font-bold text-white font-display">Explorez le Bénin</h2>
          </div>
          
          <button 
            @click="$emit('close')" 
            class="flex items-center justify-center w-10 h-10 text-white transition-colors rounded-full hover:bg-white/10"
            aria-label="Fermer la carte">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Carte interactive -->
        <div class="relative h-[70vh] overflow-hidden bg-night rounded-2xl shadow-2xl">
          <div class="absolute inset-0 overflow-hidden">
            <!-- Fond de carte avec effet parallaxe -->
            <div class="relative w-full h-full map-container" 
                @mousemove="handleMapParallax" 
                ref="mapContainer">
              <img src="/img/carte-du-benin.webp" alt="Carte du Bénin" class="absolute inset-0 object-cover w-full h-full transition-transform duration-1000 ease-out opacity-40 map-bg" ref="mapBg">
              
              <!-- Overlay avec dégradé -->
              <div class="absolute inset-0 bg-gradient-to-b from-night/50 via-night/30 to-night/70"></div>
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(93,53,135,0.3),transparent_70%)]"></div>
              
              <!-- Routes stylisées -->
              <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <!-- Route principale Nord-Sud -->
                <path d="M45,75 C45,65 42,45 40,25" class="map-route" stroke-dasharray="0.5, 1.5" />
                <!-- Routes secondaires -->
                <path d="M35,70 C38,70 42,72 45,75" class="map-route" stroke-dasharray="0.5, 1.5" />
                <path d="M40,25 C36,25 30,24 25,15" class="map-route" stroke-dasharray="0.5, 1.5" />
                <path d="M45,65 C50,67 52,68 48,65" class="map-route" stroke-dasharray="0.5, 1.5" />
                <path d="M42,55 C38,53 35,50 42,42" class="map-route" stroke-dasharray="0.5, 1.5" />
              </svg>
              
              <!-- Points d'intérêt -->
              <div class="absolute inset-0">
                <!-- Cotonou -->
                <div class="absolute location-marker" style="top: 75%; left: 45%">
                  <button 
                    @click="activeLocation = activeLocation === 'cotonou' ? null : 'cotonou'"
                    @mouseenter="hoverLocation = 'cotonou'" 
                    @mouseleave="hoverLocation = null"
                    class="relative z-10 flex items-center justify-center w-12 h-12 transition-transform transform group"
                    :class="{'scale-125': activeLocation === 'cotonou' || hoverLocation === 'cotonou'}">
                    <span class="absolute inset-0 rounded-full opacity-20 bg-benin-yellow group-hover:animate-ping"></span>
                    <span class="relative flex items-center justify-center w-6 h-6 rounded-full bg-benin-yellow">
                      <i class="text-xs text-benin-green fas fa-city"></i>
                    </span>
                  </button>
                  
                  <div 
                    v-if="activeLocation === 'cotonou'" 
                    class="absolute z-20 w-64 p-4 text-left transform -translate-x-1/2 bg-white rounded-lg shadow-xl left-1/2 top-full mt-2 location-info">
                    <div class="absolute w-4 h-4 transform rotate-45 -translate-x-1/2 bg-white -top-2 left-1/2"></div>
                    <h4 class="flex items-center mb-2 text-lg font-bold text-benin-green font-display">
                      <i class="mr-2 text-benin-yellow fas fa-city"></i>
                      Cotonou
                    </h4>
                    <p class="mb-3 text-sm text-gray-700">Capitale économique et plus grande ville du Bénin, Cotonou est un centre vibrant qui allie culture, commerce et histoire.</p>
                    <div class="p-2 mb-3 bg-gray-100 rounded-lg">
                      <h5 class="mb-1 text-xs font-bold text-gray-700">À NE PAS MANQUER</h5>
                      <ul class="ml-4 text-xs text-gray-600 list-disc">
                        <li>Le grand marché de Dantokpa</li>
                        <li>La Fondation Zinsou (art contemporain)</li>
                        <li>La cathédrale Notre-Dame</li>
                      </ul>
                    </div>
                    <button @click="navigateToLocation('cotonou')" class="flex items-center px-3 py-1 text-sm font-medium text-white transition-colors rounded-full bg-benin-green hover:bg-benin-green-600">
                      <span>Planifier une visite</span>
                      <i class="ml-1 fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
                
                <!-- Ouidah -->
                <div class="absolute location-marker" style="top: 70%; left: 35%">
                  <button 
                    @click="activeLocation = activeLocation === 'ouidah' ? null : 'ouidah'"
                    @mouseenter="hoverLocation = 'ouidah'" 
                    @mouseleave="hoverLocation = null"
                    class="relative z-10 flex items-center justify-center w-12 h-12 transition-transform transform group"
                    :class="{'scale-125': activeLocation === 'ouidah' || hoverLocation === 'ouidah'}">
                    <span class="absolute inset-0 rounded-full opacity-20 bg-vodou group-hover:animate-ping"></span>
                    <span class="relative flex items-center justify-center w-6 h-6 rounded-full bg-vodou">
                      <i class="text-xs text-white fas fa-magic"></i>
                    </span>
                  </button>
                  
                  <div 
                    v-if="activeLocation === 'ouidah'" 
                    class="absolute z-20 w-64 p-4 text-left transform -translate-x-1/2 bg-white rounded-lg shadow-xl left-1/2 top-full mt-2 location-info">
                    <div class="absolute w-4 h-4 transform rotate-45 -translate-x-1/2 bg-white -top-2 left-1/2"></div>
                    <h4 class="flex items-center mb-2 text-lg font-bold text-vodou font-display">
                      <i class="mr-2 text-vodou-light fas fa-magic"></i>
                      Ouidah
                    </h4>
                    <p class="mb-3 text-sm text-gray-700">Centre spirituel du Vodun et point majeur de la Route des Esclaves, Ouidah est chargée d'histoire et de mysticisme.</p>
                    <div class="p-2 mb-3 bg-gray-100 rounded-lg">
                      <h5 class="mb-1 text-xs font-bold text-gray-700">À NE PAS MANQUER</h5>
                      <ul class="ml-4 text-xs text-gray-600 list-disc">
                        <li>La Porte du Non Retour</li>
                        <li>Le Temple des pythons</li>
                        <li>La Forêt Sacrée de Kpassé</li>
                      </ul>
                    </div>
                    <button @click="navigateToLocation('ouidah')" class="flex items-center px-3 py-1 text-sm font-medium text-white transition-colors rounded-full bg-vodou hover:bg-vodou-dark">
                      <span>Planifier une visite</span>
                      <i class="ml-1 fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
                
                <!-- Ganvié -->
                <div class="absolute location-marker" style="top: 65%; left: 48%">
                  <button 
                    @click="activeLocation = activeLocation === 'ganvie' ? null : 'ganvie'"
                    @mouseenter="hoverLocation = 'ganvie'" 
                    @mouseleave="hoverLocation = null"
                    class="relative z-10 flex items-center justify-center w-12 h-12 transition-transform transform group"
                    :class="{'scale-125': activeLocation === 'ganvie' || hoverLocation === 'ganvie'}">
                    <span class="absolute inset-0 rounded-full opacity-20 bg-ocean group-hover:animate-ping"></span>
                    <span class="relative flex items-center justify-center w-6 h-6 rounded-full bg-ocean">
                      <i class="text-xs text-white fas fa-water"></i>
                    </span>
                  </button>
                  
                  <div 
                    v-if="activeLocation === 'ganvie'" 
                    class="absolute z-20 w-64 p-4 text-left transform -translate-x-1/2 bg-white rounded-lg shadow-xl left-1/2 top-full mt-2 location-info">
                    <div class="absolute w-4 h-4 transform rotate-45 -translate-x-1/2 bg-white -top-2 left-1/2"></div>
                    <h4 class="flex items-center mb-2 text-lg font-bold text-ocean font-display">
                      <i class="mr-2 text-ocean-light fas fa-water"></i>
                      Ganvié
                    </h4>
                    <p class="mb-3 text-sm text-gray-700">Surnommée la "Venise de l'Afrique", cette cité lacustre entièrement construite sur pilotis offre un mode de vie unique.</p>
                    <div class="p-2 mb-3 bg-gray-100 rounded-lg">
                      <h5 class="mb-1 text-xs font-bold text-gray-700">À NE PAS MANQUER</h5>
                      <ul class="ml-4 text-xs text-gray-600 list-disc">
                        <li>Balade en pirogue traditionnelle</li>
                        <li>Marché flottant</li>
                        <li>Rencontre avec les pêcheurs locaux</li>
                      </ul>
                    </div>
                    <button @click="navigateToLocation('ganvie')" class="flex items-center px-3 py-1 text-sm font-medium text-white transition-colors rounded-full bg-ocean hover:bg-ocean-dark">
                      <span>Planifier une visite</span>
                      <i class="ml-1 fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
                
                <!-- Abomey -->
                <div class="absolute location-marker" style="top: 55%; left: 42%">
                  <button 
                    @click="activeLocation = activeLocation === 'abomey' ? null : 'abomey'"
                    @mouseenter="hoverLocation = 'abomey'" 
                    @mouseleave="hoverLocation = null"
                    class="relative z-10 flex items-center justify-center w-12 h-12 transition-transform transform group"
                    :class="{'scale-125': activeLocation === 'abomey' || hoverLocation === 'abomey'}">
                    <span class="absolute inset-0 rounded-full opacity-20 bg-earth group-hover:animate-ping"></span>
                    <span class="relative flex items-center justify-center w-6 h-6 rounded-full bg-earth">
                      <i class="text-xs text-white fas fa-landmark"></i>
                    </span>
                  </button>
                  
                  <div 
                    v-if="activeLocation === 'abomey'" 
                    class="absolute z-20 w-64 p-4 text-left transform -translate-x-1/2 bg-white rounded-lg shadow-xl left-1/2 top-full mt-2 location-info">
                    <div class="absolute w-4 h-4 transform rotate-45 -translate-x-1/2 bg-white -top-2 left-1/2"></div>
                    <h4 class="flex items-center mb-2 text-lg font-bold text-earth font-display">
                      <i class="mr-2 text-earth-light fas fa-landmark"></i>
                      Abomey
                    </h4>
                    <p class="mb-3 text-sm text-gray-700">Ancienne capitale du puissant royaume du Dahomey, Abomey abrite des palais royaux classés au patrimoine mondial de l'UNESCO.</p>
                    <div class="p-2 mb-3 bg-gray-100 rounded-lg">
                      <h5 class="mb-1 text-xs font-bold text-gray-700">À NE PAS MANQUER</h5>
                      <ul class="ml-4 text-xs text-gray-600 list-disc">
                        <li>Les palais royaux et leur musée</li>
                        <li>Les bas-reliefs historiques</li>
                        <li>Les sculptures et objets royaux</li>
                      </ul>
                    </div>
                    <button @click="navigateToLocation('abomey')" class="flex items-center px-3 py-1 text-sm font-medium text-white transition-colors rounded-full bg-earth hover:bg-earth-dark">
                      <span>Planifier une visite</span>
                      <i class="ml-1 fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
                
                <!-- Natitingou -->
                <div class="absolute location-marker" style="top: 25%; left: 35%">
                  <button 
                    @click="activeLocation = activeLocation === 'natitingou' ? null : 'natitingou'"
                    @mouseenter="hoverLocation = 'natitingou'" 
                    @mouseleave="hoverLocation = null"
                    class="relative z-10 flex items-center justify-center w-12 h-12 transition-transform transform group"
                    :class="{'scale-125': activeLocation === 'natitingou' || hoverLocation === 'natitingou'}">
                    <span class="absolute inset-0 rounded-full opacity-20 bg-earth group-hover:animate-ping"></span>
                    <span class="relative flex items-center justify-center w-6 h-6 rounded-full bg-earth">
                      <i class="text-xs text-white fas fa-mountain"></i>
                    </span>
                  </button>
                  
                  <div 
                    v-if="activeLocation === 'natitingou'" 
                    class="absolute z-20 w-64 p-4 text-left transform -translate-x-1/2 bg-white rounded-lg shadow-xl left-1/2 top-full mt-2 location-info">
                    <div class="absolute w-4 h-4 transform rotate-45 -translate-x-1/2 bg-white -top-2 left-1/2"></div>
                    <h4 class="flex items-center mb-2 text-lg font-bold text-earth font-display">
                      <i class="mr-2 text-earth-light fas fa-mountain"></i>
                      Natitingou
                    </h4>
                    <p class="mb-3 text-sm text-gray-700">Porte d'entrée vers l'Atacora et le pays Somba, cette région montagneuse offre des paysages spectaculaires et une architecture unique.</p>
                    <div class="p-2 mb-3 bg-gray-100 rounded-lg">
                      <h5 class="mb-1 text-xs font-bold text-gray-700">À NE PAS MANQUER</h5>
                      <ul class="ml-4 text-xs text-gray-600 list-disc">
                        <li>Les Tata Somba (maisons fortifiées)</li>
                        <li>Le musée régional de Natitingou</li>
                        <li>Les cascades de la région</li>
                      </ul>
                    </div>
                    <button @click="navigateToLocation('natitingou')" class="flex items-center px-3 py-1 text-sm font-medium text-white transition-colors rounded-full bg-earth hover:bg-earth-dark">
                      <span>Planifier une visite</span>
                      <i class="ml-1 fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
                
                <!-- Pendjari -->
                <div class="absolute location-marker" style="top: 15%; left: 25%">
                  <button 
                    @click="activeLocation = activeLocation === 'pendjari' ? null : 'pendjari'"
                    @mouseenter="hoverLocation = 'pendjari'" 
                    @mouseleave="hoverLocation = null"
                    class="relative z-10 flex items-center justify-center w-12 h-12 transition-transform transform group"
                    :class="{'scale-125': activeLocation === 'pendjari' || hoverLocation === 'pendjari'}">
                    <span class="absolute inset-0 rounded-full opacity-20 bg-benin-green group-hover:animate-ping"></span>
                    <span class="relative flex items-center justify-center w-6 h-6 rounded-full bg-benin-green">
                      <i class="text-xs text-white fas fa-paw"></i>
                    </span>
                  </button>
                  
                  <div 
                    v-if="activeLocation === 'pendjari'" 
                    class="absolute z-20 w-64 p-4 text-left transform -translate-x-1/2 bg-white rounded-lg shadow-xl left-1/2 top-full mt-2 location-info">
                    <div class="absolute w-4 h-4 transform rotate-45 -translate-x-1/2 bg-white -top-2 left-1/2"></div>
                    <h4 class="flex items-center mb-2 text-lg font-bold text-benin-green font-display">
                      <i class="mr-2 text-benin-green-400 fas fa-paw"></i>
                      Parc de la Pendjari
                    </h4>
                    <p class="mb-3 text-sm text-gray-700">L'une des dernières réserves de faune sauvage d'Afrique de l'Ouest, ce parc national abrite une biodiversité exceptionnelle.</p>
                    <div class="p-2 mb-3 bg-gray-100 rounded-lg">
                      <h5 class="mb-1 text-xs font-bold text-gray-700">FAUNE SAUVAGE</h5>
                      <ul class="ml-4 text-xs text-gray-600 list-disc">
                        <li>Éléphants et lions</li>
                        <li>Hippotragues, bubales et buffles</li>
                        <li>Crocodiles et plus de 300 espèces d'oiseaux</li>
                      </ul>
                    </div>
                    <button @click="navigateToLocation('pendjari')" class="flex items-center px-3 py-1 text-sm font-medium text-white transition-colors rounded-full bg-benin-green hover:bg-benin-green-600">
                      <span>Planifier un safari</span>
                      <i class="ml-1 fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Légende de la carte -->
          <div class="absolute bottom-0 left-0 p-4">
            <div class="p-4 text-white rounded-lg backdrop-blur-sm bg-white/5">
              <h3 class="mb-3 text-sm font-bold uppercase">Légende</h3>
              <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div class="flex items-center space-x-2">
                  <span class="flex items-center justify-center w-5 h-5 rounded-full bg-benin-yellow">
                    <i class="text-xs text-benin-green fas fa-city"></i>
                  </span>
                  <span class="text-sm">Villes principales</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="flex items-center justify-center w-5 h-5 rounded-full bg-vodou">
                    <i class="text-xs text-white fas fa-magic"></i>
                  </span>
                  <span class="text-sm">Sites spirituels</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="flex items-center justify-center w-5 h-5 rounded-full bg-ocean">
                    <i class="text-xs text-white fas fa-water"></i>
                  </span>
                  <span class="text-sm">Sites aquatiques</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="flex items-center justify-center w-5 h-5 rounded-full bg-earth">
                    <i class="text-xs text-white fas fa-landmark"></i>
                  </span>
                  <span class="text-sm">Sites historiques</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="flex items-center justify-center w-5 h-5 rounded-full bg-benin-green">
                    <i class="text-xs text-white fas fa-paw"></i>
                  </span>
                  <span class="text-sm">Parcs naturels</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="flex items-center justify-center w-5 h-5 text-benin-yellow">
                    <svg class="w-4 h-4" viewBox="0 0 100 50">
                      <path d="M0,25 L100,25" stroke="currentColor" stroke-width="4" stroke-dasharray="5, 10" />
                    </svg>
                  </span>
                  <span class="text-sm">Itinéraires suggérés</span>
                </div>
              </div>
              
              <!-- Info Voyage -->
              <div class="pt-3 mt-3 border-t border-white/20">
                <p class="text-xs text-white/70">Durée recommandée: <span class="text-benin-yellow">10-14 jours</span> pour l'itinéraire complet</p>
              </div>
            </div>
          </div>
          
          <!-- CTA -->
          <div class="absolute right-0 flex flex-col p-4 bottom-4">
            <button 
              @click="selectItinerary"
              class="justify-center w-full px-6 py-3 mb-2 font-bold text-white transition-all duration-300 transform rounded-lg bg-gradient-to-r from-benin-green to-benin-green-600 hover:shadow-lg hover:-translate-y-1">
              <span class="flex items-center">
                <i class="mr-2 fas fa-route"></i>
                <span>Itinéraire complet</span>
              </span>
            </button>
            <button 
              @click="startJourney"
              class="justify-center w-full px-6 py-3 font-bold transition-all duration-300 transform rounded-lg bg-gradient-to-r from-benin-yellow to-benin-yellow-500 text-benin-green hover:shadow-lg hover:-translate-y-1">
              <span class="flex items-center">
                <i class="mr-2 fas fa-plane-departure"></i>
                <span>Commencer votre voyage</span>
              </span>
            </button>
          </div>
        </div>
        
        <!-- Message d'aide -->
        <div class="flex items-center justify-center mt-4 text-sm text-white/60">
          <i class="mr-2 fas fa-info-circle"></i>
          <span>Cliquez sur les points d'intérêt pour découvrir les sites incontournables.</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'JourneyMap',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'navigate-to'],
  data() {
    return {
      activeLocation: null,
      hoverLocation: null,
      parallaxOffset: { x: 0, y: 0 },
      // Information sur les lieux touristiques
      locations: {
        cotonou: { name: 'Cotonou', section: 'culture' },
        ouidah: { name: 'Ouidah', section: 'culture' },
        ganvie: { name: 'Ganvié', section: 'nature' },
        abomey: { name: 'Abomey', section: 'culture' },
        natitingou: { name: 'Natitingou', section: 'nature' },
        pendjari: { name: 'Parc de la Pendjari', section: 'nature' }
      }
    }
  },
  mounted() {
    document.body.classList.add('overflow-hidden');
    this.initParticleAnimations();
    
    // Animation d'entrée de la carte
    if (window.gsap) {
      this.animateMapElements();
    }
    
    // Fermer les popups quand on clique en dehors
    document.addEventListener('click', this.handleOutsideClick);
  },
  beforeUnmount() {
    document.body.classList.remove('overflow-hidden');
    document.removeEventListener('click', this.handleOutsideClick);
  },
  methods: {
    handleOutsideClick(event) {
      // Si on clique en dehors d'une popup de lieu, fermer la popup
      if (this.activeLocation && !event.target.closest('.location-info') && !event.target.closest('.location-marker')) {
        this.activeLocation = null;
      }
    },
    
    initParticleAnimations() {
      // Animer les particules avec GSAP si disponible
      if (window.gsap) {
        document.querySelectorAll('.map-particle').forEach((particle, index) => {
          const delay = index * 0.5;
          const duration = 15 + Math.random() * 20;
          
          gsap.to(particle, {
            x: `random(-100, 100)`,
            y: `random(-100, 100)`,
            opacity: `random(0.1, 0.4)`,
            scale: `random(0.8, 1.8)`,
            rotation: `random(-180, 180)`,
            duration: duration,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: delay
          });
        });
      }
    },
    
    animateMapElements() {
      // Animation d'entrée des éléments de la carte
      const tl = gsap.timeline();
      
      // Animer les marqueurs de lieu
      tl.from('.location-marker', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'back.out(1.7)'
      });
      
      // Animer les routes
      tl.from('.map-route', {
        drawSVG: "0%",
        duration: 1.5,
        stagger: 0.2,
        ease: 'power2.inOut'
      }, "-=0.5");
    },
    
    handleMapParallax(e) {
      if (!this.$refs.mapContainer || !this.$refs.mapBg) return;
      
      const container = this.$refs.mapContainer;
      const rect = container.getBoundingClientRect();
      
      // Calculer la position relative du curseur par rapport au centre
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Calculer le décalage pour l'effet parallaxe (mouvement inverse du curseur)
      this.parallaxOffset.x = (centerX - mouseX) / 30; // Diviser pour réduire l'amplitude
      this.parallaxOffset.y = (centerY - mouseY) / 30;
      
      // Appliquer la transformation avec une transition douce
      this.$refs.mapBg.style.transform = `translate(${this.parallaxOffset.x}px, ${this.parallaxOffset.y}px)`;
    },
    
    startJourney() {
      this.$emit('navigate-to', 'hero');
      this.$emit('close');
    },
    
    selectItinerary() {
      // Afficher l'itinéraire complet en surbrillance (pourrait être développé davantage)
      this.showItineraryAnimation();
      setTimeout(() => {
        this.$emit('navigate-to', 'culture');
        this.$emit('close');
      }, 1500);
    },
    
    showItineraryAnimation() {
      // Animation pour montrer l'itinéraire complet
      if (window.gsap) {
        gsap.to('.map-route', {
          stroke: '#FCD116',
          strokeWidth: 1.5,
          duration: 0.5,
          stagger: 0.1,
          repeat: 1,
          yoyo: true
        });
        
        const locations = document.querySelectorAll('.location-marker');
        gsap.to(locations, {
          scale: 1.5,
          duration: 0.3,
          stagger: 0.1,
          repeat: 1,
          yoyo: true
        });
      }
    },
    
    navigateToLocation(locationId) {
      const location = this.locations[locationId];
      if (location) {
        this.$emit('navigate-to', location.section);
        this.$emit('close');
      }
    }
  }
}
</script>

<style scoped>
/* Styles pour les particules flottantes */
.map-particle {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  opacity: 0.2;
  pointer-events: none;
}

.particle-1 {
  top: 20%;
  left: 30%;
  background: radial-gradient(circle, rgba(252, 209, 22, 0.8) 0%, rgba(252, 209, 22, 0) 70%);
}

.particle-2 {
  top: 40%;
  left: 70%;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(139, 92, 246, 0) 70%);
}

.particle-3 {
  top: 70%;
  left: 20%;
  background: radial-gradient(circle, rgba(0, 135, 81, 0.8) 0%, rgba(0, 135, 81, 0) 70%);
}

.particle-4 {
  top: 10%;
  left: 60%;
  background: radial-gradient(circle, rgba(3, 105, 161, 0.8) 0%, rgba(3, 105, 161, 0) 70%);
}

.particle-5 {
  top: 60%;
  left: 80%;
  background: radial-gradient(circle, rgba(146, 64, 14, 0.8) 0%, rgba(146, 64, 14, 0) 70%);
}

.particle-6 {
  top: 80%;
  left: 40%;
  background: radial-gradient(circle, rgba(93, 53, 135, 0.8) 0%, rgba(93, 53, 135, 0) 70%);
}

.particle-7 {
  top: 30%;
  left: 10%;
  background: radial-gradient(circle, rgba(232, 17, 45, 0.8) 0%, rgba(232, 17, 45, 0) 70%);
}

.particle-8 {
  top: 50%;
  left: 50%;
  background: radial-gradient(circle, rgba(252, 209, 22, 0.8) 0%, rgba(252, 209, 22, 0) 70%);
}

/* Styles pour les routes sur la carte */
.map-route {
  fill: none;
  stroke: rgba(255, 255, 255, 0.2);
  stroke-width: 0.5;
  stroke-linecap: round;
  pointer-events: none;
}

/* Animations spécifiques pour les infobulles */
.location-info {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, 10px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

/* Styles responsive */
@media (max-width: 768px) {
  .map-container {
    height: 60vh;
  }
  
  .location-info {
    width: 220px;
  }
}
</style>