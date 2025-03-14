<template>
    <div class="p-6 mb-8 bg-white shadow-lg events-calendar-container rounded-xl">
      <!-- Navigation du calendrier -->
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-semibold text-gray-800">
          Calendrier des <span class="text-benin-green">événements</span>
        </h3>
        
        <div class="flex items-center space-x-2">
          <button 
            @click="previousMonth" 
            class="flex items-center justify-center w-10 h-10 text-gray-600 transition-colors duration-300 bg-white border rounded-lg border-gray-200 hover:bg-benin-green hover:text-white"
            aria-label="Mois précédent"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          
          <div class="px-4 font-medium text-gray-800 min-w-[140px] text-center">
            {{ currentMonthName }} {{ currentYear }}
          </div>
          
          <button 
            @click="nextMonth" 
            class="flex items-center justify-center w-10 h-10 text-gray-600 transition-colors duration-300 bg-white border rounded-lg border-gray-200 hover:bg-benin-green hover:text-white"
            aria-label="Mois suivant"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
          
          <button 
            @click="resetToToday" 
            class="px-3 py-1 ml-2 text-sm font-medium transition-colors duration-300 border rounded-lg text-benin-green border-benin-green hover:bg-benin-green hover:text-white"
            aria-label="Aujourd'hui"
          >
            Aujourd'hui
          </button>
        </div>
      </div>
      
      <!-- Grille du calendrier -->
      <div class="mb-6">
        <!-- Jours de la semaine -->
        <div class="grid grid-cols-7 gap-1 mb-2">
          <div 
            v-for="day in weekDays" 
            :key="day"
            class="py-2 text-sm font-medium text-center text-gray-500"
          >
            {{ day }}
          </div>
        </div>
        
        <!-- Jours du mois -->
        <div class="grid grid-cols-7 gap-1">
          <div 
            v-for="(day, index) in calendarDays" 
            :key="index"
            class="relative flex flex-col items-center justify-center transition-all duration-300 bg-white border rounded-lg cursor-pointer aspect-square border-gray-100 hover:border-benin-green"
            :class="[
              day.isCurrentMonth ? 'hover:bg-benin-green-50' : 'bg-gray-50',
              day.date === selectedDate ? 'bg-benin-green-50 border-benin-green' : '',
              day.isToday ? 'ring-2 ring-benin-green ring-opacity-50' : '',
              day.events.length > 0 && day.isCurrentMonth ? 'font-medium' : ''
            ]"
            @click="selectDate(day.date)"
          >
            <!-- Numéro du jour -->
            <span :class="[
              day.isCurrentMonth ? 'text-gray-800' : 'text-gray-400',
              day.date === selectedDate ? 'text-benin-green' : ''
            ]">
              {{ new Date(day.date).getDate() }}
            </span>
            
            <!-- Indicateurs d'événements -->
            <div v-if="day.events.length > 0 && day.isCurrentMonth" class="flex mt-1 space-x-1">
              <div 
                v-for="(event, i) in day.events.slice(0, 3)" 
                :key="i"
                class="w-1.5 h-1.5 rounded-full"
                :class="getCategoryDotClass(event.category)"
              ></div>
              <div 
                v-if="day.events.length > 3" 
                class="w-1.5 h-1.5 rounded-full bg-benin-green-300"
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Événements du jour sélectionné -->
      <div>
        <transition-group 
          name="event-fade" 
          tag="div" 
          class="space-y-3"
        >
          <div v-if="selectedDateEvents.length === 0" key="no-events" class="py-8 text-center">
            <div class="flex items-center justify-center w-16 h-16 mx-auto mb-3 text-gray-400">
              <i class="text-3xl fas fa-calendar-day"></i>
            </div>
            <h4 class="mb-2 text-lg font-medium text-gray-800">Aucun événement</h4>
            <p class="text-sm text-gray-500">
              Aucun événement prévu pour le {{ formatSelectedDate }}.
            </p>
          </div>
          
          <div 
            v-for="event in selectedDateEvents" 
            :key="event.id"
            class="flex items-start p-4 transition-colors duration-300 bg-white border rounded-lg border-gray-100 hover:border-benin-green hover:bg-benin-green-50"
          >
            <!-- Image miniature -->
            <div class="flex-shrink-0 w-16 h-16 mr-4 overflow-hidden rounded-lg">
              <img :src="event.image" :alt="event.title" class="object-cover w-full h-full">
            </div>
            
            <!-- Détails de l'événement -->
            <div class="flex-grow">
              <div 
                class="inline-block px-2 py-0.5 text-xs font-medium rounded-full"
                :class="getCategoryClass(event.category)"
              >
                {{ event.category }}
              </div>
              
              <h4 class="mb-1 font-semibold text-gray-800">{{ event.title }}</h4>
              
              <div class="flex items-center text-xs text-gray-500">
                <i class="mr-1 text-benin-green fas fa-map-marker-alt"></i>
                <span>{{ event.location }}</span>
                <span class="mx-2">•</span>
                <i class="mr-1 text-benin-green fas fa-clock"></i>
                <span>{{ event.time || 'Toute la journée' }}</span>
              </div>
            </div>
            
            <!-- Bouton d'action -->
            <button class="mt-1 ml-2 transition-colors duration-300 text-benin-green hover:text-benin-green-600">
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </transition-group>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EventsCalendar',
    
    data() {
      return {
        // Jours de la semaine (commençant par lundi pour le format français)
        weekDays: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        
        // Date actuelle et sélectionnée
        currentDate: new Date(),
        selectedDate: new Date().toISOString().split('T')[0],
        
        // Mois et année actuels pour le calendrier
        currentMonth: new Date().getMonth(),
        currentYear: new Date().getFullYear(),
        
        // Liste des événements (à remplacer par des données API)
        events: [
          {
            id: 1,
            title: 'Festival International de Vodoun',
            category: 'Festivals vodou',
            location: 'Ouidah, Bénin',
            date: '2026-01-10',
            endDate: '2026-01-15', // Pour les événements sur plusieurs jours
            time: '9:00 - 18:00',
            description: 'Le plus grand festival vodoun au monde, avec des cérémonies spectaculaires et des rituels sacrés.',
            image: '/img/events/vodoun-festival.jpg'
          },
          {
            id: 2,
            title: 'Fête de Gani',
            category: 'Célébrations traditionnelles',
            location: 'Nikki, Bénin',
            date: '2026-03-15',
            time: '10:00 - 22:00',
            description: 'Une grande fête traditionnelle célébrée par le peuple Baatonu dans le nord du Bénin.',
            image: '/img/events/gani-festival.jpg'
          },
          {
            id: 3,
            title: 'Festival des Arts du Bénin',
            category: 'Arts & Culture',
            location: 'Cotonou, Bénin',
            date: '2026-04-05',
            endDate: '2026-04-12',
            time: 'Toute la journée',
            description: 'Un événement culturel majeur qui célèbre les arts contemporains et traditionnels du Bénin.',
            image: '/img/events/arts-festival.jpg'
          },
          {
            id: 4,
            title: 'Carnaval de Ouidah',
            category: 'Festivals vodou',
            location: 'Ouidah, Bénin',
            date: '2026-02-20',
            time: '11:00 - 23:00',
            description: 'Un carnaval coloré qui célèbre le riche patrimoine culturel et historique de Ouidah.',
            image: '/img/events/ouidah-carnival.jpg'
          },
          {
            id: 5,
            title: 'Festival Gastronomique Béninois',
            category: 'Gastronomie',
            location: 'Porto-Novo, Bénin',
            date: '2026-05-08',
            endDate: '2026-05-10',
            time: '10:00 - 20:00',
            description: 'Découvrez les saveurs authentiques de la cuisine béninoise lors de ce festival culinaire.',
            image: '/img/events/food-festival.jpg'
          },
          {
            id: 6,
            title: 'Concert Angélique Kidjo',
            category: 'Concerts & musique',
            location: 'Cotonou, Bénin',
            date: '2026-06-18',
            time: '19:30 - 23:00',
            description: 'La légendaire chanteuse béninoise Angélique Kidjo revient pour un concert exceptionnel.',
            image: '/img/events/kidjo-concert.jpg'
          },
          {
            id: 7,
            title: 'Marché des Artisans',
            category: 'Arts & Culture',
            location: 'Abomey, Bénin',
            date: '2026-01-25',
            time: '9:00 - 17:00',
            description: 'Un marché traditionnel où les artisans locaux présentent leurs créations uniques.',
            image: '/img/events/artisan-market.jpg'
          },
          {
            id: 8,
            title: 'Festival de Musique Traditionnelle',
            category: 'Concerts & musique',
            location: 'Natitingou, Bénin',
            date: '2026-02-15',
            time: '16:00 - 23:00',
            description: 'Un festival célébrant les musiques traditionnelles des différentes régions du Bénin.',
            image: '/img/events/traditional-music.jpg'
          }
        ]
      };
    },
    
    computed: {
      // Nom du mois actuel en français
      currentMonthName() {
        const months = [
          'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
          'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
        return months[this.currentMonth];
      },
      
      // Jours à afficher dans le calendrier (42 jours pour couvrir 6 semaines)
      calendarDays() {
        const days = [];
        const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
        const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
        
        // Jour de la semaine du premier jour du mois (0 = dimanche, 1 = lundi, etc.)
        // Convertir pour que lundi soit le premier jour (1 -> 0, 2 -> 1, ..., 0 -> 6)
        let firstWeekday = firstDayOfMonth.getDay() || 7;
        firstWeekday = firstWeekday === 1 ? 0 : firstWeekday - 1;
        
        // Jours du mois précédent
        const prevMonthLastDay = new Date(this.currentYear, this.currentMonth, 0).getDate();
        for (let i = firstWeekday - 1; i >= 0; i--) {
          const date = new Date(this.currentYear, this.currentMonth - 1, prevMonthLastDay - i);
          const dateStr = date.toISOString().split('T')[0];
          days.push({
            date: dateStr,
            isCurrentMonth: false,
            isToday: this.isToday(dateStr),
            events: this.getEventsForDate(dateStr)
          });
        }
        
        // Jours du mois courant
        for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
          const date = new Date(this.currentYear, this.currentMonth, i);
          const dateStr = date.toISOString().split('T')[0];
          days.push({
            date: dateStr,
            isCurrentMonth: true,
            isToday: this.isToday(dateStr),
            events: this.getEventsForDate(dateStr)
          });
        }
        
        // Jours du mois suivant (jusqu'à compléter 42 jours)
        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
          const date = new Date(this.currentYear, this.currentMonth + 1, i);
          const dateStr = date.toISOString().split('T')[0];
          days.push({
            date: dateStr,
            isCurrentMonth: false,
            isToday: this.isToday(dateStr),
            events: this.getEventsForDate(dateStr)
          });
        }
        
        return days;
      },
      
      // Événements pour la date sélectionnée
      selectedDateEvents() {
        return this.getEventsForDate(this.selectedDate);
      },
      
      // Format de la date sélectionnée
      formatSelectedDate() {
        if (!this.selectedDate) return '';
        
        const date = new Date(this.selectedDate);
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        return date.toLocaleDateString('fr-FR', options);
      }
    },
    
    methods: {
      // Navigation vers le mois précédent
      previousMonth() {
        if (this.currentMonth === 0) {
          this.currentMonth = 11;
          this.currentYear--;
        } else {
          this.currentMonth--;
        }
      },
      
      // Navigation vers le mois suivant
      nextMonth() {
        if (this.currentMonth === 11) {
          this.currentMonth = 0;
          this.currentYear++;
        } else {
          this.currentMonth++;
        }
      },
      
      // Retour au mois actuel
      resetToToday() {
        const today = new Date();
        this.currentMonth = today.getMonth();
        this.currentYear = today.getFullYear();
        this.selectedDate = today.toISOString().split('T')[0];
        
        // Ajouter une animation de mise en évidence pour aujourd'hui
        this.$nextTick(() => {
          const todayCell = document.querySelector('.ring-benin-green');
          if (todayCell) {
            todayCell.classList.add('animate-pulse');
            setTimeout(() => {
              todayCell.classList.remove('animate-pulse');
            }, 1000);
          }
        });
      },
      
      // Sélectionner une date
      selectDate(date) {
        this.selectedDate = date;
      },
      
      // Vérifier si une date est aujourd'hui
      isToday(dateStr) {
        const today = new Date().toISOString().split('T')[0];
        return dateStr === today;
      },
      
      // Obtenir les événements pour une date spécifique
      getEventsForDate(dateStr) {
        return this.events.filter(event => {
          // Pour les événements d'une journée
          if (event.date === dateStr) return true;
          
          // Pour les événements sur plusieurs jours
          if (event.endDate) {
            const date = new Date(dateStr);
            const startDate = new Date(event.date);
            const endDate = new Date(event.endDate);
            return date >= startDate && date <= endDate;
          }
          
          return false;
        });
      },
      
      // Classes de couleur pour les indicateurs d'événements
      getCategoryDotClass(category) {
        switch(category) {
          case 'Festivals vodou':
            return 'bg-benin-green';
          case 'Célébrations traditionnelles':
            return 'bg-benin-green-600';
          case 'Concerts & musique':
            return 'bg-benin-red';
          case 'Gastronomie':
            return 'bg-benin-green-300';
          case 'Arts & Culture':
            return 'bg-benin-green-700';
          default:
            return 'bg-gray-400';
        }
      },
      
      // Classes pour les badges de catégorie
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
  /* Transitions pour les événements */
  .event-fade-enter-active, .event-fade-leave-active {
    transition: all 0.3s ease;
  }
  
  .event-fade-enter-from, .event-fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
  
  /* Animation pulse pour mettre en évidence aujourd'hui */
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.8;
    }
  }
  
  .animate-pulse {
    animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  </style>