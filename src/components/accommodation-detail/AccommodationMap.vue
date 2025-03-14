<template>
    <div class="mb-10 opacity-0 animate-fade-up animate-delay-3">
      <h2 class="text-xl font-bold text-gray-800 mb-4 font-display flex items-center">
        <i class="fas fa-map-marker-alt text-benin-green mr-2"></i>
        Situation et environs
      </h2>
      
      <!-- Adresse complète -->
      <div class="mb-4 text-gray-600">
        <p>{{ location.address }}, {{ location.city }}, {{ location.region }}, {{ location.country }}</p>
      </div>
      
      <!-- Carte -->
      <div class="mb-6 relative">
        <div id="map" class="h-[300px] rounded-xl overflow-hidden shadow-md" ref="mapContainer"></div>
        
        <!-- Overlay de chargement -->
        <div v-if="!mapLoaded" class="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80 z-10">
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 border-4 border-benin-green border-t-transparent rounded-full animate-spin"></div>
            <span class="mt-2 text-gray-600">Chargement de la carte...</span>
          </div>
        </div>
      </div>
      
      <!-- Attractions à proximité -->
      <div>
        <h3 class="font-medium text-gray-800 mb-3">
          Attractions à proximité
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            v-for="(attraction, index) in nearbyAttractions" 
            :key="index"
            class="flex items-center p-3 rounded-lg border border-gray-200 transition-all duration-300 hover:border-benin-green hover:bg-benin-green-50 group cursor-pointer"
            @mouseenter="highlightMarker(index)"
            @mouseleave="resetMarkers"
          >
            <div class="w-8 h-8 rounded-full bg-benin-green-50 flex items-center justify-center text-benin-green mr-3 transition-colors duration-300 group-hover:bg-benin-green group-hover:text-white">
              <span class="text-sm font-medium">{{ index + 1 }}</span>
            </div>
            <div class="flex-1">
              <div class="font-medium text-gray-800">{{ attraction.name }}</div>
              <div class="text-sm text-gray-500">{{ attraction.distance }} {{ attraction.unit }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AccommodationMap'
  };
  </script>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  
  // Enregistrer GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  // Props
  const props = defineProps({
    location: {
      type: Object,
      required: true
    },
    nearbyAttractions: {
      type: Array,
      default: () => []
    }
  });
  
  // État
  const mapContainer = ref(null);
  const map = ref(null);
  const markers = ref([]);
  const mapLoaded = ref(false);
  
  // Initialiser la carte
  const initMap = async () => {
    if (typeof L === 'undefined') {
      console.error('Leaflet is not loaded');
      return;
    }
    
    // Créer la carte
    map.value = L.map(mapContainer.value).setView(
      [props.location.coordinates.lat, props.location.coordinates.lng], 
      14
    );
    
    // Ajouter la couche de carte
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map.value);
    
    // Icône personnalisée pour l'hébergement
    const accommodationIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="marker-pin">
              <div class="marker-icon-accommodation">
                <i class="fas fa-home"></i>
              </div>
            </div>`,
      iconSize: [30, 42],
      iconAnchor: [15, 42]
    });
    
    // Ajouter le marqueur pour l'hébergement
    const mainMarker = L.marker(
      [props.location.coordinates.lat, props.location.coordinates.lng],
      { icon: accommodationIcon }
    ).addTo(map.value);
    
    // Ajouter un popup
    mainMarker.bindPopup(`<b>${props.location.address}</b><br>${props.location.city}`);
    
    // Ajouter les marqueurs pour les attractions
    if (props.nearbyAttractions && props.nearbyAttractions.length > 0) {
      // Simuler les coordonnées des attractions (dans un cas réel, elles seraient fournies par l'API)
      props.nearbyAttractions.forEach((attraction, index) => {
        // Calculer une position approximative basée sur la distance (simulation)
        const angle = (index * (360 / props.nearbyAttractions.length)) * Math.PI / 180;
        const distanceInKm = attraction.unit === 'km' ? attraction.distance : attraction.distance / 1000;
        
        // Conversion de km en degrés (approximation)
        const latOffset = (distanceInKm / 111) * Math.sin(angle);
        const lngOffset = (distanceInKm / (111 * Math.cos(props.location.coordinates.lat * Math.PI / 180))) * Math.cos(angle);
        
        const attractionLat = props.location.coordinates.lat + latOffset;
        const attractionLng = props.location.coordinates.lng + lngOffset;
        
        // Créer l'icône
        const attractionIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `<div class="marker-pin attraction">
                  <div class="marker-icon-attraction">
                    ${index + 1}
                  </div>
                </div>`,
          iconSize: [30, 42],
          iconAnchor: [15, 42]
        });
        
        // Ajouter le marqueur
        const marker = L.marker([attractionLat, attractionLng], { icon: attractionIcon }).addTo(map.value);
        
        // Ajouter un popup
        marker.bindPopup(`<b>${attraction.name}</b><br>${attraction.distance} ${attraction.unit}`);
        
        // Stocker le marqueur
        markers.value.push({
          marker,
          originalIcon: attractionIcon,
          highlighted: false,
          index
        });
      });
    }
    
    // Indiquer que la carte est chargée
    mapLoaded.value = true;
  };
  
  // Mettre en surbrillance un marqueur
  const highlightMarker = (index) => {
    markers.value.forEach(markerInfo => {
      if (markerInfo.index === index) {
        const icon = markerInfo.marker.getIcon();
        markerInfo.marker.getElement().querySelector('.marker-pin').classList.add('highlighted');
        markerInfo.highlighted = true;
        
        // Ouvrir le popup
        markerInfo.marker.openPopup();
      }
    });
  };
  
  // Réinitialiser les marqueurs
  const resetMarkers = () => {
    markers.value.forEach(markerInfo => {
      if (markerInfo.highlighted) {
        markerInfo.marker.getElement().querySelector('.marker-pin').classList.remove('highlighted');
        markerInfo.highlighted = false;
        
        // Fermer le popup
        markerInfo.marker.closePopup();
      }
    });
  };
  
  // Animation au défilement
  onMounted(() => {
    // Animer l'apparition
    const el = document.querySelector('.animate-fade-up.animate-delay-3');
    if (el) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: el,
          start: 'top 95%'
        }
      });
    }
    
    // Charger Leaflet si ce n'est pas déjà fait
    if (typeof L === 'undefined') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      link.crossOrigin = '';
      document.head.appendChild(link);
      
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      script.crossOrigin = '';
      script.onload = () => {
        initMap();
      };
      document.head.appendChild(script);
    } else {
      // Leaflet est déjà chargé
      initMap();
    }
  });
  
  // Nettoyer la carte à la destruction du composant
  onUnmounted(() => {
    if (map.value) {
      map.value.remove();
    }
  });
 
  </script>
  
  <style scoped>
  /* Animation initiale pour fadeUp */
  .animate-fade-up {
    transform: translateY(20px);
  }
  
  /* Styles pour la carte */
  :deep(.custom-div-icon) {
    background: transparent;
    border: none;
  }
  
  :deep(.marker-pin) {
    width: 30px;
    height: 42px;
    position: relative;
    background: #008751;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }
  
  :deep(.marker-pin.attraction) {
    background: #ffffff;
    border: 2px solid #008751;
  }
  
  :deep(.marker-pin.highlighted) {
    background: #FCD116;
    transform: rotate(-45deg) scale(1.2);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
  }
  
  :deep(.marker-icon-accommodation),
  :deep(.marker-icon-attraction) {
    transform: rotate(45deg);
    color: white;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
  }
  
  :deep(.marker-icon-attraction) {
    color: #008751;
    font-size: 12px;
  }
  
  :deep(.leaflet-popup-content-wrapper) {
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
  :deep(.leaflet-popup-content) {
    margin: 10px 12px;
    line-height: 1.5;
  }
  
  :deep(.leaflet-container) {
    font-family: 'Inter', sans-serif;
  }
  </style>