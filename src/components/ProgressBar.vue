<template>
  <div class="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden md:block progress-bar-container">
    <div class="flex flex-col items-center justify-center space-y-4 progress-indicator">
      <!-- Sections -->
      <div 
        v-for="(section, index) in sections" 
        :key="section.id"
        class="relative"
        @mouseenter="hoveredSection = section.id"
        @mouseleave="hoveredSection = null">
        
        <!-- Section Label -->
        <div 
          :class="[
            'absolute right-full mr-3 py-1 px-3 rounded-lg text-white font-medium text-sm whitespace-nowrap transition-all duration-300 origin-right',
            hoveredSection === section.id || activeSection === section.id ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95 pointer-events-none'
          ]"
          :style="{ backgroundColor: section.color }">
          {{ section.label }}
          <div class="absolute top-1/2 -right-2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent"
           :style="{ borderLeftColor: section.color }"></div>
        </div>
        
        <!-- Indicator Dot -->
        <button 
          @click="$emit('navigate-to', section.id)"
          :class="[
            'w-4 h-4 rounded-full transition-all duration-500 focus:outline-none relative',
            activeSection === section.id ? 'transform scale-125' : 'transform scale-100',
            hoveredSection === section.id ? 'transform scale-110' : ''
          ]"
          :style="{ backgroundColor: activeSection === section.id ? section.color : 'rgba(255, 255, 255, 0.5)' }">
          
          <!-- Active Section Pulse Animation -->
          <span 
            v-if="activeSection === section.id"
            class="absolute inset-0 rounded-full animate-ping"
            :style="{ backgroundColor: section.color, opacity: 0.4 }">
          </span>
          
          <!-- Background halo for better visibility -->
          <span class="absolute inset-0 rounded-full -z-10 bg-white/10 backdrop-blur-sm shadow-md transform scale-150"></span>
        </button>
        
        <!-- Connection Line -->
        <div 
          v-if="index < sections.length - 1" 
          class="w-px h-8 mx-auto my-1 progress-line"
          :class="[
            activeSection === section.id || activeSection === sections[index + 1].id || 
            isActiveRange(section.id, sections[index + 1].id) ? 'bg-gradient-to-b' : 'bg-white/30'
          ]"
          :style="activeSection === section.id || activeSection === sections[index + 1].id || 
            isActiveRange(section.id, sections[index + 1].id) ? 
            `background-image: linear-gradient(to bottom, ${section.color}, ${sections[index + 1].color})` : ''">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    activeSection: {
      type: String,
      default: 'hero'
    }
  },
  data() {
    return {
      hoveredSection: null,
      sections: [
        { id: 'hero', label: 'Accueil', color: '#FCD116' },
        { id: 'culture', label: 'Culture', color: '#8B5CF6' },
        { id: 'nature', label: 'Nature', color: '#008751' },
        { id: 'experiences', label: 'Expériences', color: '#92400E' },
        { id: 'cuisine', label: 'Gastronomie', color: '#E8112D' },
        { id: 'contact', label: 'Contact', color: '#0369A1' }
      ]
    }
  },
  emits: ['navigate-to'],
  methods: {
    isActiveRange(startSectionId, endSectionId) {
      const startIndex = this.sections.findIndex(s => s.id === startSectionId);
      const endIndex = this.sections.findIndex(s => s.id === endSectionId);
      const activeIndex = this.sections.findIndex(s => s.id === this.activeSection);
      
      return activeIndex > startIndex && activeIndex < endIndex;
    }
  }
}
</script>

<style scoped>
.progress-bar-container {
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

.progress-bar-container:hover {
  transform: translate(-8px, -50%);
}

.progress-indicator {
  position: relative;
  padding: 1rem;
  border-radius: 20px;
  backdrop-filter: blur(8px);
  background: rgba(20, 20, 30, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.progress-line {
  transition: background 0.5s ease;
}

/* Animations pour l'apparition au chargement de la page */
@keyframes fade-slide-in {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.progress-bar-container {
  animation: fade-slide-in 0.8s ease forwards;
  animation-delay: 0.5s;
  opacity: 0;
}
</style> 