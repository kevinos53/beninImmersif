<template>
    <div class="similar-events">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <a 
          v-for="event in events" 
          :key="event.id"
          :href="`/evenements/${event.id}`"
          class="relative overflow-hidden transition-all duration-300 group rounded-xl similar-event-card hover:shadow-lg"
        >
          <!-- Image avec effet de zoom au survol -->
          <div class="relative overflow-hidden aspect-[4/3]">
            <img 
              :src="event.image" 
              :alt="event.title" 
              class="object-cover w-full h-full transition-all duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 transition-opacity duration-300 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90"></div>
          </div>
          
          <!-- Contenu superposé -->
          <div class="absolute inset-0 flex flex-col justify-end p-5 transition-transform duration-300 group-hover:translate-y-[-5px]">
            <!-- Badge catégorie -->
            <span 
              class="absolute px-2 py-1 text-xs font-medium transition-transform duration-300 rounded-full top-3 left-3 group-hover:scale-110"
              :class="getCategoryClass(event.category)"
            >
              {{ event.category }}
            </span>
            
            <!-- Date en badge flottant -->
            <div class="absolute flex flex-col items-center justify-center p-2 text-white transition-transform duration-300 rounded-lg bg-benin-green top-3 right-3 group-hover:scale-110">
              <span class="text-xs font-medium">{{ getMonthShort(event.date) }}</span>
              <span class="text-lg font-bold">{{ getDay(event.date) }}</span>
            </div>
            
            <!-- Titre et emplacement -->
            <h3 class="mb-1 text-xl font-bold tracking-tight text-white">
              {{ event.title }}
            </h3>
            <div class="flex items-center mb-3 text-sm text-white/90">
              <i class="mr-1.5 fas fa-map-marker-alt text-benin-yellow"></i>
              <span>{{ event.location }}</span>
            </div>
            
            <!-- Indicateur en savoir plus -->
            <div class="flex items-center mt-2 transition-all duration-300 text-benin-yellow group-hover:translate-x-2">
              <span class="mr-1 text-sm">En savoir plus</span>
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </a>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SimilarEvents',
    props: {
      events: {
        type: Array,
        required: true
      }
    },
    setup() {
      // Retourne les classes CSS selon la catégorie
      const getCategoryClass = (category) => {
        if (!category) return 'bg-gray-800 text-white';
        
        const classes = {
          'culturel': 'bg-vodou text-white',
          'arts': 'bg-benin-green text-white',
          'musique': 'bg-ocean text-white',
          'divertissement': 'bg-benin-yellow text-night',
          'gastronomie': 'bg-earth text-white',
          'sport': 'bg-fire text-white',
          'technologie': 'bg-night text-white'
        };
        
        return classes[category.toLowerCase()] || 'bg-gray-800 text-white';
      };
      
      // Récupère le jour d'une date
      const getDay = (dateString) => {
        return new Date(dateString).getDate();
      };
      
      // Récupère le mois abrégé d'une date
      const getMonthShort = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', { month: 'short' });
      };
      
      return {
        getCategoryClass,
        getDay,
        getMonthShort
      };
    }
  };
  </script>
  
  <style scoped>
  .similar-event-card {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transform: translateY(0);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .similar-event-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  </style>