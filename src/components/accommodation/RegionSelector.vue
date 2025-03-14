<template>
  <section class="py-14 bg-benin-green-50 overflow-hidden relative">
    <!-- Arrière-plan décoratif -->
    <div class="absolute inset-0 w-full h-full z-0 opacity-15">
      <svg class="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse">
          <circle id="pattern-circle" cx="10" cy="10" r="2" fill="#008651"></circle>
        </pattern>
        <rect id="rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern-circles)"></rect>
      </svg>
      <div class="absolute bottom-0 right-0 w-1/2 h-1/3 bg-benin-yellow opacity-10 blur-[120px] rounded-full"></div>
      <div class="absolute top-0 left-0 w-1/3 h-1/4 bg-benin-red opacity-10 blur-[150px] rounded-full"></div>
    </div>
    
    <div class="container px-4 mx-auto relative z-10">
      <div class="flex flex-col items-center mb-10 text-center">
        <span class="inline-block px-3 py-1 mb-3 text-sm font-medium rounded-full bg-white text-benin-green">
          EXPLORER LE BÉNIN
        </span>
        <h2 class="text-3xl font-bold text-gray-800 md:text-4xl font-display mb-3">
          Découvrez nos <span class="text-benin-green">destinations</span>
        </h2>
        <p class="max-w-2xl text-gray-600 md:text-lg">
          Sélectionnez une région pour explorer les hébergements disponibles et découvrir les lieux incontournables à visiter lors de votre séjour.
        </p>
      </div>
      
      <div class="flex flex-col-reverse lg:flex-row lg:items-stretch gap-8">
        <!-- Liste des régions -->
        <div class="lg:w-1/3">
          <div class="bg-white rounded-xl shadow-md p-4 h-full">
            <h3 class="text-lg font-semibold text-gray-800 mb-4 font-display flex items-center">
              <i class="fas fa-map-marker-alt text-benin-green mr-2"></i>
              Régions du Bénin
            </h3>
            
            <div class="space-y-2 region-list">
              <div 
                v-for="region in regions" 
                :key="region.id"
                class="region-item flex p-3 rounded-lg transition-all duration-300 cursor-pointer items-center relative overflow-hidden"
                :class="{ 
                  'bg-benin-green-50 border-l-4 border-benin-green': activeRegion === region.id,
                  'hover:bg-gray-50': activeRegion !== region.id
                }"
                @click="selectRegion(region.id)"
                @mouseenter="highlightRegion(region.id)"
                @mouseleave="resetHighlight()"
              >
                <!-- Overlay pour l'effet de sélection -->
                <div 
                  v-if="activeRegion === region.id" 
                  class="absolute inset-0 bg-benin-green opacity-5 region-pulse"
                ></div>
                
                <!-- Miniature de la région -->
                <div class="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 relative">
                  <img :src="region.image" :alt="region.name" class="w-full h-full object-cover">
                  <!-- Badge de nombre d'hébergements -->
                  <div class="absolute bottom-0 right-0 bg-benin-green text-white text-xs font-bold px-1.5 py-0.5 rounded-tl-md">
                    {{ region.accommodationsCount }}
                  </div>
                </div>
                
                <div class="ml-3 flex-1">
                  <h4 class="font-medium text-gray-800">{{ region.name }}</h4>
                  <p class="text-xs text-gray-500 line-clamp-2">{{ region.description }}</p>
                </div>
                
                <i class="fas fa-chevron-right text-benin-green ml-2" :class="{ 'opacity-100': activeRegion === region.id, 'opacity-0': activeRegion !== region.id }"></i>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Carte du Bénin -->
        <div class="lg:w-2/3">
          <div class="bg-white rounded-xl shadow-md p-6 h-full relative overflow-hidden">
            <!-- Pattern de fond subtil -->
            <div class="absolute inset-0 opacity-5">
              <svg width="100%" height="100%">
                <pattern id="map-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1" fill="#008651" />
                </pattern>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#map-pattern)" />
              </svg>
            </div>
            
            <h3 class="text-lg font-semibold text-gray-800 mb-4 font-display flex items-center relative z-10">
              <i class="fas fa-map text-benin-green mr-2"></i>
              Carte des destinations
            </h3>
            
            <!-- Carte SVG interactive du Bénin -->
            <div class="relative w-full h-[500px] map-container">
              <!-- Légende -->
              <div class="absolute top-0 right-0 bg-white bg-opacity-90 p-3 rounded-lg shadow-sm z-20 text-sm">
                <div class="flex items-center mb-1">
                  <span class="w-3 h-3 rounded-full bg-benin-green mr-2"></span>
                  <span>Forte concentration</span>
                </div>
                <div class="flex items-center mb-1">
                  <span class="w-3 h-3 rounded-full bg-benin-yellow mr-2"></span>
                  <span>Concentration moyenne</span>
                </div>
                <div class="flex items-center">
                  <span class="w-3 h-3 rounded-full bg-gray-300 mr-2"></span>
                  <span>Faible concentration</span>
                </div>
              </div>
              
              <!-- SVG map -->
              <svg 
                viewBox="0 0 800 900" 
                class="w-full h-full"
                ref="mapSvg"
              >
                <!-- Contours du Bénin et régions -->
                <g id="benin-map">
                  <!-- Fond bleu clair pour l'océan -->
                  <rect x="0" y="0" width="800" height="900" fill="#E6F2F8" />
                  
                  <!-- Régions -->
                  <path 
                    v-for="region in regions" 
                    :key="`path-${region.id}`"
                    :d="region.path" 
                    :class="getRegionClass(region.id)"
                    @click="selectRegion(region.id)"
                    @mouseenter="highlightRegion(region.id)"
                    @mouseleave="resetHighlight()"
                  />
                  
                  <!-- Points d'hébergements importants -->
                  <g id="accommodation-points">
                    <circle 
                      v-for="point in accommodationPoints" 
                      :key="point.id"
                      :cx="point.x" 
                      :cy="point.y" 
                      :r="point.isHighlighted ? 8 : 5"
                      :class="getPointClass(point)"
                    >
                      <animate 
                        v-if="point.isHighlighted"
                        attributeName="r"
                        values="5;8;5"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                  
                  <!-- Labels des régions -->
                  <g id="region-labels">
                    <text 
                      v-for="region in regions" 
                      :key="`label-${region.id}`"
                      :x="region.labelX" 
                      :y="region.labelY"
                      text-anchor="middle"
                      class="font-semibold text-[14px] fill-gray-700 pointer-events-none"
                    >{{ region.name }}</text>
                  </g>
                </g>
              </svg>
              
              <!-- Tooltip pour les régions -->
              <div 
                v-if="tooltipVisible"
                class="absolute bg-white p-3 rounded-lg shadow-lg z-30 transition-opacity duration-300"
                :style="`top: ${tooltipY}px; left: ${tooltipX}px; opacity: ${tooltipVisible ? 1 : 0}`"
                ref="tooltip"
              >
                <div class="flex items-start">
                  <img 
                    :src="tooltipRegion.image" 
                    :alt="tooltipRegion.name" 
                    class="w-16 h-16 object-cover rounded mr-3"
                  >
                  <div>
                    <h4 class="font-semibold text-gray-800">{{ tooltipRegion.name }}</h4>
                    <p class="text-xs text-gray-600 max-w-[200px]">{{ tooltipRegion.description }}</p>
                    <p class="text-xs font-medium text-benin-green mt-1">
                      {{ tooltipRegion.accommodationsCount }} hébergements disponibles
                    </p>
                  </div>
                </div>
                
                <div class="mt-2 text-center">
                  <button class="text-xs text-benin-green hover:underline">
                    Voir les hébergements
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Information sur la région active (mobile uniquement) -->
      <div 
        v-if="activeRegion && activeRegionData" 
        class="mt-6 lg:hidden bg-white p-4 rounded-xl shadow-md animate-fadeIn"
      >
        <div class="flex items-center">
          <img 
            :src="activeRegionData.image" 
            :alt="activeRegionData.name" 
            class="w-20 h-20 object-cover rounded-lg mr-4"
          >
          <div>
            <h3 class="font-semibold text-lg text-gray-800">{{ activeRegionData.name }}</h3>
            <p class="text-sm text-gray-600">{{ activeRegionData.description }}</p>
            <div class="mt-2 flex">
              <button 
                @click="applyRegionFilter"
                class="text-sm px-3 py-1 bg-benin-green text-white rounded hover:bg-benin-green-600 transition-colors"
              >
                Voir {{ activeRegionData.accommodationsCount }} hébergements
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { gsap } from 'gsap';
import { useAccommodationStore } from '../../stores/accommodationStore';
import { pinia } from '../../stores'; 
export default {
  name: 'RegionSelector',
  
  setup() {
    const store = useAccommodationStore(pinia);
    const mapSvg = ref(null);
    const tooltip = ref(null);
    const tooltipVisible = ref(false);
    const tooltipX = ref(0);
    const tooltipY = ref(0);
    const tooltipRegion = ref({});
    const activeRegion = ref(null);
    const highlightedRegion = ref(null);
    
    // Données des régions du Bénin
    const regions = [
      {
        id: 'cotonou',
        name: 'Cotonou',
        description: 'La capitale économique avec ses marchés colorés, sa cathédrale et sa vie nocturne animée.',
        accommodationsCount: 12,
        image: '/img/regions/cotonou.jpg',
        path: 'M320,580 L380,550 L420,600 L390,650 L340,660 L310,620 Z',
        labelX: 350,
        labelY: 610,
        density: 'high' // Concentration d'hébergements
      },
      {
        id: 'porto-novo',
        name: 'Porto-Novo',
        description: 'La capitale administrative, riche en histoire et en architecture coloniale portugaise.',
        accommodationsCount: 8,
        image: '/img/regions/porto-novo.jpg',
        path: 'M390,520 L440,510 L470,540 L460,590 L420,600 L380,550 Z',
        labelX: 430,
        labelY: 550,
        density: 'medium'
      },
      {
        id: 'ouidah',
        name: 'Ouidah',
        description: 'Ancienne ville de traite négrière, connue pour ses temples vaudous et sa Route des Esclaves.',
        accommodationsCount: 6,
        image: '/img/regions/ouidah.jpg',
        path: 'M250,590 L310,580 L320,620 L300,660 L240,650 Z',
        labelX: 280,
        labelY: 620,
        density: 'medium'
      },
      {
        id: 'ganvie',
        name: 'Ganvié',
        description: 'Village lacustre sur pilotis surnommé la "Venise de l\'Afrique", où la vie s\'organise sur l\'eau.',
        accommodationsCount: 4,
        image: '/img/regions/ganvie.jpg',
        path: 'M340,540 L380,520 L390,550 L350,580 L320,560 Z',
        labelX: 355,
        labelY: 550,
        density: 'medium'
      },
      {
        id: 'abomey',
        name: 'Abomey',
        description: 'Ancienne capitale du royaume de Dahomey, célèbre pour ses palais royaux classés à l\'UNESCO.',
        accommodationsCount: 5,
        image: '/img/regions/abomey.jpg',
        path: 'M250,480 L320,460 L350,510 L330,540 L270,550 Z',
        labelX: 300,
        labelY: 510,
        density: 'medium'
      },
      {
        id: 'natitingou',
        name: 'Natitingou',
        description: 'Porte d\'entrée de la région de l\'Atacora, connue pour ses villages traditionnels Somba.',
        accommodationsCount: 7,
        image: '/img/regions/natitingou.jpg',
        path: 'M200,200 L270,180 L290,240 L260,290 L210,280 Z',
        labelX: 245,
        labelY: 230,
        density: 'medium'
      },
      {
        id: 'grand-popo',
        name: 'Grand-Popo',
        description: 'Station balnéaire paisible avec de belles plages et une culture vaudou préservée.',
        accommodationsCount: 9,
        image: '/img/regions/grand-popo.jpg',
        path: 'M170,640 L240,630 L250,660 L240,690 L180,680 Z',
        labelX: 210,
        labelY: 660,
        density: 'high'
      },
      {
        id: 'pendjari',
        name: 'Parc de la Pendjari',
        description: 'Réserve naturelle exceptionnelle où observer lions, éléphants et autres animaux sauvages.',
        accommodationsCount: 3,
        image: '/img/regions/pendjari.jpg',
        path: 'M100,150 L180,120 L210,170 L200,220 L140,230 L110,200 Z',
        labelX: 155,
        labelY: 175,
        density: 'low'
      },
      {
        id: 'dassa',
        name: 'Dassa-Zoumé',
        description: 'Ville aux collines sacrées et aux grottes mystiques, haut lieu de spiritualité au Bénin.',
        accommodationsCount: 4,
        image: '/img/regions/dassa.jpg',
        path: 'M320,380 L370,360 L390,400 L370,440 L320,450 Z',
        labelX: 350,
        labelY: 410,
        density: 'low'
      },
      {
        id: 'parakou',
        name: 'Parakou',
        description: 'Deuxième ville du pays et carrefour commercial important pour le nord du Bénin.',
        accommodationsCount: 6,
        image: '/img/regions/parakou.jpg',
        path: 'M320,280 L370,260 L400,300 L380,340 L330,350 Z',
        labelX: 355,
        labelY: 310,
        density: 'medium'
      }
    ];
    
    // Points d'hébergements sur la carte
    const accommodationPoints = ref([
      { id: 1, x: 350, y: 600, size: 'large', region: 'cotonou', isHighlighted: false },
      { id: 2, x: 430, y: 545, size: 'medium', region: 'porto-novo', isHighlighted: false },
      { id: 3, x: 280, y: 620, size: 'medium', region: 'ouidah', isHighlighted: false },
      { id: 4, x: 355, y: 550, size: 'medium', region: 'ganvie', isHighlighted: false },
      { id: 5, x: 300, y: 505, size: 'medium', region: 'abomey', isHighlighted: false },
      { id: 6, x: 245, y: 235, size: 'medium', region: 'natitingou', isHighlighted: false },
      { id: 7, x: 210, y: 655, size: 'large', region: 'grand-popo', isHighlighted: false },
      { id: 8, x: 155, y: 180, size: 'small', region: 'pendjari', isHighlighted: false },
      { id: 9, x: 350, y: 410, size: 'small', region: 'dassa', isHighlighted: false },
      { id: 10, x: 355, y: 305, size: 'medium', region: 'parakou', isHighlighted: false }
    ]);
    
    // Données de la région active
    const activeRegionData = computed(() => {
      if (!activeRegion.value) return null;
      return regions.find(region => region.id === activeRegion.value);
    });
    
    // Sélectionner une région
    const selectRegion = (regionId) => {
      if (activeRegion.value === regionId) {
        activeRegion.value = null;
      } else {
        activeRegion.value = regionId;
        // Animer la région sélectionnée
        animateSelectedRegion(regionId);
      }
    };
    
    // Appliquer un filtre pour afficher les hébergements de la région sélectionnée
    const applyRegionFilter = () => {
      if (activeRegion.value) {
        // Mettre à jour le filtre dans le store
        store.filters.destination = activeRegion.value;
        store.applyFilters();
        
        // Faire défiler jusqu'aux résultats
        setTimeout(() => {
          const resultsSection = document.getElementById('results-section');
          if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    };
    
    // Mettre en surbrillance une région au survol
    const highlightRegion = (regionId) => {
      highlightedRegion.value = regionId;
      
      // Mettre en surbrillance les points d'hébergement correspondants
      accommodationPoints.value = accommodationPoints.value.map(point => ({
        ...point,
        isHighlighted: point.region === regionId
      }));
      
      // Afficher le tooltip
      const region = regions.find(r => r.id === regionId);
      if (region) {
        tooltipRegion.value = region;
        updateTooltipPosition(region.labelX, region.labelY);
        tooltipVisible.value = true;
      }
    };
    
    // Réinitialiser la surbrillance
    const resetHighlight = () => {
      highlightedRegion.value = null;
      
      // Réinitialiser tous les points
      accommodationPoints.value = accommodationPoints.value.map(point => ({
        ...point,
        isHighlighted: false
      }));
      
      // Masquer le tooltip
      tooltipVisible.value = false;
    };
    
    // Mettre à jour la position du tooltip
    const updateTooltipPosition = (x, y) => {
      // Convertir les coordonnées SVG en coordonnées d'écran
      if (mapSvg.value) {
        const svgRect = mapSvg.value.getBoundingClientRect();
        const svgWidth = svgRect.width;
        const svgHeight = svgRect.height;
        
        // Calculer le rapport entre les dimensions du SVG et son viewport
        const scaleX = svgWidth / 800;
        const scaleY = svgHeight / 900;
        
        // Calculer les coordonnées ajustées
        const adjustedX = x * scaleX;
        const adjustedY = y * scaleY;
        
        // Positionnement du tooltip en tenant compte de sa taille
        tooltipX.value = adjustedX + 10;
        tooltipY.value = adjustedY - 100; // Positionner au-dessus du point
      }
    };
    
    // Classes pour les régions sur la carte
    const getRegionClass = (regionId) => {
      const region = regions.find(r => r.id === regionId);
      const isActive = activeRegion.value === regionId;
      const isHighlighted = highlightedRegion.value === regionId;
      
      let colorClass = '';
      
      // Couleur basée sur la densité d'hébergements
      switch(region.density) {
        case 'high':
          colorClass = isActive || isHighlighted ? 'fill-benin-green stroke-benin-green' : 'fill-benin-green-200 stroke-benin-green-400';
          break;
        case 'medium':
          colorClass = isActive || isHighlighted ? 'fill-benin-yellow stroke-benin-yellow-600' : 'fill-benin-yellow-100 stroke-benin-yellow-300';
          break;
        case 'low':
          colorClass = isActive || isHighlighted ? 'fill-gray-400 stroke-gray-500' : 'fill-gray-200 stroke-gray-300';
          break;
        default:
          colorClass = 'fill-gray-200 stroke-gray-300';
      }
      
      return `${colorClass} cursor-pointer transition-all duration-300 hover:opacity-80 ${isActive ? 'opacity-100' : 'opacity-80'} ${isHighlighted ? 'opacity-90' : ''}`;
    };
    
    // Classes pour les points d'hébergements
    const getPointClass = (point) => {
      const isHighlighted = point.isHighlighted;
      
      let sizeClass = 'r-4';
      let colorClass = '';
      
      // Taille basée sur le nombre d'hébergements
      switch(point.size) {
        case 'large':
          colorClass = 'fill-benin-green stroke-white stroke-[1.5]';
          break;
        case 'medium':
          colorClass = 'fill-benin-yellow stroke-white stroke-[1.5]';
          break;
        case 'small':
          colorClass = 'fill-gray-400 stroke-white stroke-[1.5]';
          break;
        default:
          colorClass = 'fill-gray-400 stroke-white stroke-[1.5]';
      }
      
      return `${colorClass} cursor-pointer transition-all duration-300 ${isHighlighted ? 'opacity-100' : 'opacity-70'} hover:opacity-100`;
    };
    
    // Animation de la région sélectionnée
    const animateSelectedRegion = (regionId) => {
      // Sélectionner tous les éléments de la région
      const regionPath = mapSvg.value.querySelector(`path[d="${regions.find(r => r.id === regionId).path}"]`);
      const regionPoints = accommodationPoints.value.filter(point => point.region === regionId);
      
      // Animer le chemin de la région
      gsap.fromTo(regionPath, 
        { scale: 1, opacity: 0.7, transformOrigin: 'center' },
        { scale: 1.05, opacity: 1, duration: 0.5, yoyo: true, repeat: 1 }
      );
      
      // Mettre à jour les points pour l'animation
      accommodationPoints.value = accommodationPoints.value.map(point => ({
        ...point,
        isHighlighted: point.region === regionId
      }));
    };
    
    // Vérifier si la région est sélectionnée dans les filtres
    watch(() => store.filters.destination, (newValue) => {
      if (newValue && regions.some(region => region.id === newValue)) {
        activeRegion.value = newValue;
      } else {
        activeRegion.value = null;
      }
    });
    
    onMounted(() => {
      // Animation d'entrée
      gsap.from(mapSvg.value, {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
      });
      
      // Si une destination est déjà sélectionnée dans les filtres
      if (store.filters.destination) {
        activeRegion.value = store.filters.destination;
      }
    });
    
    return {
      regions,
      mapSvg,
      tooltip,
      activeRegion,
      highlightedRegion,
      activeRegionData,
      accommodationPoints,
      tooltipVisible,
      tooltipX,
      tooltipY,
      tooltipRegion,
      selectRegion,
      highlightRegion,
      resetHighlight,
      getRegionClass,
      getPointClass,
      applyRegionFilter
    };
  }
};
</script>

<style scoped>
/* Animation de pulsation pour la région active */
.region-pulse {
  animation: region-pulse 2s infinite ease-in-out;
}

@keyframes region-pulse {
  0%, 100% {
    opacity: 0.05;
  }
  50% {
    opacity: 0.2;
  }
}

/* Animation d'entrée */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Style pour le contenu scrollable */
.region-list {
  max-height: 480px;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.region-list::-webkit-scrollbar {
  width: 4px;
}

.region-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.region-list::-webkit-scrollbar-thumb {
  background: rgba(0, 134, 81, 0.3);
  border-radius: 10px;
}

.region-list::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 134, 81, 0.5);
}

/* Animation du sélecteur de région */
.region-item {
  transition: all 0.3s ease;
}

.region-item:hover {
  transform: translateX(4px);
}
</style>