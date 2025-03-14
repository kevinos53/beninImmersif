<template>
    <div class="events-list-container">
      <!-- Indicateur de chargement -->
      <div v-if="loading" class="py-12 text-center">
        <div class="w-16 h-16 mx-auto mb-4 border-4 rounded-full border-benin-green border-t-transparent animate-spin"></div>
        <p class="text-gray-600">Chargement des événements...</p>
      </div>
      
      <!-- Liste des événements -->
      <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <!-- Cartes d'événements -->
        <div 
          v-for="(event, index) in events" 
          :key="event.id"
          class="overflow-hidden transition-all duration-300 bg-white rounded-xl shadow-md hover:shadow-xl hover:translate-y-[-5px] group"
          :class="{'opacity-0': animationDelays}"
          :style="animationDelays ? `animation: fadeInUp 0.6s ${index * 0.1}s forwards ease-out` : ''"
        >
          <!-- Image de l'événement -->
          <div class="relative h-48 overflow-hidden">
            <!-- Badge de catégorie -->
            <div 
              class="absolute z-10 px-3 py-1 text-xs font-medium rounded-full top-4 left-4"
              :class="getCategoryClass(event.category)"
            >
              {{ event.category }}
            </div>
            
            <!-- Date -->
            <div class="absolute z-10 flex flex-col items-center justify-center w-14 h-14 bg-white rounded shadow-lg top-4 right-4">
              <span class="text-xs font-medium text-benin-green">{{ event.dateShort.month }}</span>
              <span class="text-xl font-bold text-benin-green">{{ event.dateShort.day }}</span>
            </div>
            
            <!-- Overlay de survol -->
            <div class="absolute inset-0 transition-opacity duration-300 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-30 group-hover:opacity-40"></div>
            
            <!-- Image -->
            <img 
              :src="event.image" 
              :alt="event.title" 
              class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            >
          </div>
          
          <!-- Contenu de l'événement -->
          <div class="p-6">
            <h3 class="mb-2 text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-benin-green">
              {{ event.title }}
            </h3>
            
            <div class="flex flex-wrap gap-3 mb-4 text-sm text-gray-600">
              <div class="flex items-center">
                <i class="mr-1.5 text-benin-green fas fa-map-marker-alt"></i>
                <span>{{ event.location }}</span>
              </div>
              
              <div class="flex items-center">
                <i class="mr-1.5 text-benin-green fas fa-calendar-day"></i>
                <span>{{ event.date }}</span>
              </div>
            </div>
            
            <p class="mb-6 text-sm text-gray-500 line-clamp-2">
              {{ event.description }}
            </p>
            
            <a href="#" class="inline-flex items-center font-medium text-benin-green hover:text-benin-green-600 transition-colors duration-300">
              En savoir plus
              <i class="ml-2 transform fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Message si aucun événement trouvé -->
      <div v-if="!loading && events.length === 0" class="p-8 text-center bg-white rounded-xl">
        <div class="flex items-center justify-center w-20 h-20 mx-auto mb-4">
          <i class="text-4xl text-gray-400 fas fa-calendar-times"></i>
        </div>
        <h3 class="mb-2 text-xl font-semibold text-gray-800">Aucun événement trouvé</h3>
        <p class="text-gray-500">Aucun événement ne correspond à vos critères de recherche. Essayez de modifier vos filtres.</p>
      </div>
      
      <!-- Pagination -->
      <div class="flex justify-center mt-12">
        <div class="flex items-center space-x-2">
          <button class="flex items-center justify-center w-10 h-10 text-gray-600 transition-colors duration-300 bg-white border rounded-lg border-gray-200 hover:bg-benin-green hover:text-white">
            <i class="fas fa-chevron-left"></i>
          </button>
          
          <button class="w-10 h-10 font-medium text-white rounded-lg bg-benin-green">1</button>
          <button class="w-10 h-10 text-gray-600 transition-colors duration-300 bg-white border rounded-lg border-gray-200 hover:bg-benin-green hover:text-white">2</button>
          <button class="w-10 h-10 text-gray-600 transition-colors duration-300 bg-white border rounded-lg border-gray-200 hover:bg-benin-green hover:text-white">3</button>
          
          <span class="text-gray-400">...</span>
          
          <button class="w-10 h-10 text-gray-600 transition-colors duration-300 bg-white border rounded-lg border-gray-200 hover:bg-benin-green hover:text-white">10</button>
          
          <button class="flex items-center justify-center w-10 h-10 text-gray-600 transition-colors duration-300 bg-white border rounded-lg border-gray-200 hover:bg-benin-green hover:text-white">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EventsList',
    
    data() {
      return {
        loading: true,
        animationDelays: true,
        events: [
          {
            id: 1,
            title: 'Festival International de Vodoun',
            category: 'Festivals vodou',
            location: 'Ouidah, Bénin',
            date: '10 - 15 Jan 2026',
            dateShort: { month: 'JAN', day: '10' },
            description: 'Le plus grand festival vodoun au monde, avec des cérémonies spectaculaires et des rituels sacrés.',
            image: '/img/events/vodoun-festival.jpg'
          },
          {
            id: 2,
            title: 'Fête de Gani',
            category: 'Célébrations traditionnelles',
            location: 'Nikki, Bénin',
            date: '15 Mars 2026',
            dateShort: { month: 'MAR', day: '15' },
            description: 'Une grande fête traditionnelle célébrée par le peuple Baatonu dans le nord du Bénin.',
            image: '/img/events/gani-festival.jpg'
          },
          {
            id: 3,
            title: 'Festival des Arts du Bénin',
            category: 'Arts & Culture',
            location: 'Cotonou, Bénin',
            date: '5 - 12 Avril 2026',
            dateShort: { month: 'AVR', day: '5' },
            description: 'Un événement culturel majeur qui célèbre les arts contemporains et traditionnels du Bénin.',
            image: '/img/events/arts-festival.jpg'
          },
          {
            id: 4,
            title: 'Carnaval de Ouidah',
            category: 'Festivals vodou',
            location: 'Ouidah, Bénin',
            date: '20 Février 2026',
            dateShort: { month: 'FÉV', day: '20' },
            description: 'Un carnaval coloré qui célèbre le riche patrimoine culturel et historique de Ouidah.',
            image: '/img/events/ouidah-carnival.jpg'
          },
          {
            id: 5,
            title: 'Festival Gastronomique Béninois',
            category: 'Gastronomie',
            location: 'Porto-Novo, Bénin',
            date: '8 - 10 Mai 2026',
            dateShort: { month: 'MAI', day: '8' },
            description: 'Découvrez les saveurs authentiques de la cuisine béninoise lors de ce festival culinaire.',
            image: '/img/events/food-festival.jpg'
          },
          {
            id: 6,
            title: 'Concert Angélique Kidjo',
            category: 'Concerts & musique',
            location: 'Cotonou, Bénin',
            date: '18 Juin 2026',
            dateShort: { month: 'JUIN', day: '18' },
            description: 'La légendaire chanteuse béninoise Angélique Kidjo revient pour un concert exceptionnel.',
            image: '/img/events/kidjo-concert.jpg'
          }
        ]
      };
    },
    
    mounted() {
      // Simuler le chargement
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    
    methods: {
      getCategoryClass(category) {
        switch(category) {
          case 'Festivals vodou':
            return 'bg-benin-green text-white';
          case 'Célébrations traditionnelles':
            return 'bg-benin-green-600 text-white';
          case 'Concerts & musique':
            return 'bg-benin-red text-white';
          case 'Gastronomie':
            return 'bg-benin-green-50 text-benin-green';
          case 'Arts & Culture':
            return 'bg-benin-green-700 text-white';
          default:
            return 'bg-gray-100 text-gray-800';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  </style>