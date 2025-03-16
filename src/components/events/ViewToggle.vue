<template>
  <div 
    class="inline-flex items-center p-1 bg-gray-100 rounded-lg view-toggle"
    role="group"
    aria-label="Changer de mode d'affichage"
  >
    <button
      @click="changeView('list')"
      :class="[
        'relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md focus:outline-none',
        $viewMode === 'list'
          ? 'text-benin-green bg-white shadow-sm'
          : 'text-gray-600 hover:text-benin-green'
      ]"
      :aria-pressed="$viewMode === 'list'"
      data-testid="list-view-btn"
    >
      <span class="flex items-center">
        <i class="mr-2 fas fa-list-ul"></i>
        Liste
      </span>
    </button>
    
    <button
      @click="changeView('calendar')"
      :class="[
        'relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md focus:outline-none',
        $viewMode === 'calendar'
          ? 'text-benin-green bg-white shadow-sm'
          : 'text-gray-600 hover:text-benin-green'
      ]"
      :aria-pressed="$viewMode === 'calendar'"
      data-testid="calendar-view-btn"
    >
      <span class="flex items-center">
        <i class="mr-2 fas fa-calendar-alt"></i>
        Calendrier
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useStore } from '@nanostores/vue';
import { viewMode, setViewMode, type ViewMode } from '../../stores/eventsStore';

// Store
const $viewMode = useStore(viewMode);

/**
 * Change le mode d'affichage des événements
 * @param mode - Le mode d'affichage à définir ('list' ou 'calendar')
 */
const changeView = (mode: ViewMode): void => {
  setViewMode(mode);
};

// Animations
onMounted(() => {
  // Animation avec GSAP si disponible
  if (window.gsap) {
    gsap.from('.view-toggle', {
      y: -20,
      opacity: 0,
      duration: 0.5,
      delay: 0.3
    });
  }
});
</script>

<style scoped>
/* Animation de transition */
button {
  position: relative;
  overflow: hidden;
}

button span {
  position: relative;
  z-index: 1;
}

button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(6, 182, 212, 0.05);
  border-radius: 0.375rem;
  transform: scale(0);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

button:hover::before {
  transform: scale(1);
  opacity: 1;
}

button:active {
  transform: scale(0.98);
}
</style>