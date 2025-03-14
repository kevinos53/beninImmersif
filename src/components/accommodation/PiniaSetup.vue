<template>
    <!-- Ce composant n'a pas d'UI, il est uniquement utilisé pour initialiser Pinia -->
    <div style="display: none"></div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { pinia } from '../../stores';
  import { useAccommodationStore } from '../../stores/accommodationStore';
  
  // Initialiser les stores dans le contexte Vue
  const accommodationStore = useAccommodationStore(pinia);
  
  onMounted(() => {
    // Précharger les données au montage du composant
    accommodationStore.fetchAccommodations();
  });
  </script>