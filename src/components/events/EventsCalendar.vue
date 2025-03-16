<template>
  <div class="calendar-container">
    <!-- Contrôles de navigation du calendrier -->
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center gap-2">
        <button 
          @click="changeMonth('prev')"
          class="flex items-center justify-center w-10 h-10 transition-colors duration-300 border rounded-full text-benin-green border-benin-green/20 hover:bg-benin-green-50"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <h2 class="text-xl font-bold text-gray-800">
          {{ formatMonth($currentMonth.month) }} {{ $currentMonth.year }}
        </h2>
        
        <button 
          @click="changeMonth('next')"
          class="flex items-center justify-center w-10 h-10 transition-colors duration-300 border rounded-full text-benin-green border-benin-green/20 hover:bg-benin-green-50"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
        
        <button 
          @click="resetToToday"
          class="px-3 py-1 ml-2 text-sm font-medium transition-colors duration-300 border rounded-md text-benin-green border-benin-green/20 hover:bg-benin-green-50"
        >
          Aujourd'hui
        </button>
      </div>
      
      <div class="flex items-center gap-2">
        <button 
          @click="toggleEventList"
          class="flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors duration-300 border rounded-md text-benin-green border-benin-green/20 hover:bg-benin-green-50"
        >
          <span v-if="showEventList">
            <i class="mr-1 fas fa-eye-slash"></i>
            Masquer les événements
          </span>
          <span v-else>
            <i class="mr-1 fas fa-eye"></i>
            Voir tous les événements
          </span>
        </button>
      </div>
    </div>
    
    <!-- Calendrier -->
    <div class="overflow-hidden bg-white rounded-xl shadow-sm">
      <!-- Jours de la semaine -->
      <div class="grid grid-cols-7 gap-px bg-gray-200">
        <div 
          v-for="day in weekDays" 
          :key="day"
          class="px-2 py-3 font-medium text-center text-gray-700 bg-white"
        >
          {{ day }}
        </div>
      </div>
      
      <!-- Grille du calendrier -->
      <div class="grid grid-cols-7 gap-px bg-gray-200">
        <!-- Jours du mois -->
        <div 
          v-for="day in calendarDays" 
          :key="`${day.date}`"
          :class="[
            'relative min-h-32 p-2 bg-white calendar-day',
            day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400 bg-gray-50',
            day.isToday ? 'calendar-day-today' : '',
            day.isWeekend ? 'bg-gray-50/70' : '',
            day.events && day.events.length > 0 ? 'has-events' : ''
          ]"
        >
          <!-- Numéro du jour -->
          <div 
            :class="[
              'inline-flex items-center justify-center w-8 h-8 text-base font-medium rounded-full transition-colors duration-300',
              day.isToday ? 'bg-benin-green text-white' : '',
              day.isCurrentMonth && !day.isToday ? 'hover:bg-benin-green-50 hover:text-benin-green' : ''
            ]"
          >
            {{ new Date(day.date).getDate() }}
          </div>
          
          <!-- Événements du jour -->
          <div 
            v-if="day.events && day.events.length > 0" 
            class="mt-1 space-y-1 calendar-events"
          >
            <div 
              v-for="(event, index) in day.events.slice(0, maxEventsPerDay)" 
              :key="`${day.date}-${event.id}`"
              @click="openEventDetails(event)"
              :class="[
                'p-1 overflow-hidden text-xs font-medium rounded cursor-pointer calendar-event',
                getCategoryClass(event.category),
                'transform transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-sm'
              ]"
            >
              <div class="flex items-center">
                <div 
                  class="flex-shrink-0 w-2 h-2 mr-1 rounded-full"
              :class="getCategoryDotClass(event.category)"
            ></div>
                <div class="truncate">{{ event.title }}</div>
              </div>
            </div>
            
            <!-- Indicateur "plus d'événements" -->
            <div 
              v-if="day.events.length > maxEventsPerDay"
              @click="openDayEvents(day)"
              class="flex items-center justify-center p-1 text-xs font-medium text-gray-600 transition-colors duration-300 rounded cursor-pointer hover:bg-benin-green-50 hover:text-benin-green"
            >
              +{{ day.events.length - maxEventsPerDay }} autres
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Liste d'événements du mois (optionnelle) -->
    <div 
      v-if="showEventList && eventsInCurrentMonth.length > 0"
      class="p-4 mt-6 bg-white rounded-xl shadow-sm"
    >
      <h3 class="mb-4 text-lg font-semibold text-gray-800">
        Événements en {{ formatMonth($currentMonth.month) }}
      </h3>
      
      <div class="space-y-3">
        <div 
          v-for="event in eventsInCurrentMonth" 
          :key="event.id"
          @click="openEventDetails(event)"
          class="flex items-start p-3 transition-all duration-300 border border-gray-100 rounded-lg cursor-pointer hover:border-benin-green/30 hover:bg-benin-green-50/30"
        >
          <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-3 rounded bg-benin-green/10">
            <i 
              class="text-benin-green fas"
              :class="getCategoryIcon(event.category)"
            ></i>
          </div>
          
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-baseline justify-between gap-2">
              <h4 class="font-medium text-gray-800">{{ event.title }}</h4>
            <div 
                class="px-2 py-0.5 text-xs font-medium rounded-full"
              :class="getCategoryClass(event.category)"
            >
              {{ event.category }}
              </div>
            </div>
            
            <div class="flex flex-wrap mt-1 text-sm text-gray-600 gap-x-4">
              <div class="flex items-center">
                <i class="mr-1 fas fa-calendar-day text-benin-green-500"></i>
                <span>{{ formatDate(event.date) }}</span>
                <span v-if="event.endDate && event.endDate !== event.date">
                  &nbsp;-&nbsp;{{ formatDate(event.endDate) }}
                </span>
              </div>
              
              <div class="flex items-center">
                <i class="mr-1 fas fa-map-marker-alt text-benin-green-500"></i>
                <span>{{ event.location }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal détails d'événement -->
    <div 
      v-if="selectedEvent"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="closeEventDetails"
    >
      <div 
        class="max-w-2xl p-6 mx-4 bg-white rounded-xl shadow-xl"
        style="max-height: 90vh; overflow-y: auto;"
      >
        <div class="flex items-start justify-between mb-4">
          <h3 class="text-xl font-bold text-benin-green">{{ selectedEvent.title }}</h3>
          <button 
            @click="closeEventDetails"
            class="text-gray-500 transition-colors hover:text-benin-green"
          >
            <i class="text-xl fas fa-times"></i>
          </button>
        </div>
        
        <div class="mb-4">
          <div class="flex flex-col gap-2 sm:flex-row sm:gap-6">
            <div class="flex items-center text-gray-600">
              <i class="mr-2 fas fa-calendar-day text-benin-green"></i>
              <span>{{ formatDate(selectedEvent.date, true) }}</span>
              <span v-if="selectedEvent.endDate && selectedEvent.endDate !== selectedEvent.date">
                &nbsp;-&nbsp;{{ formatDate(selectedEvent.endDate, true) }}
              </span>
            </div>
            
            <div class="flex items-center text-gray-600">
              <i class="mr-2 fas fa-map-marker-alt text-benin-green"></i>
              <span>{{ selectedEvent.location }}</span>
            </div>
            
            <div class="flex items-center text-gray-600">
              <i class="mr-2 fas fa-tag text-benin-green"></i>
              <span>{{ selectedEvent.category }}</span>
            </div>
          </div>
        </div>
        
        <p class="mb-6 text-gray-700">{{ selectedEvent.description }}</p>
        
        <div class="flex justify-end gap-3 mt-6">
          <button 
            @click="closeEventDetails"
            class="px-4 py-2 text-sm font-medium transition-colors duration-300 bg-gray-100 rounded-lg text-benin-green hover:bg-gray-200"
          >
            Fermer
          </button>
          
          <a 
            :href="`/evenements/${selectedEvent.id}`"
            class="px-4 py-2 text-sm font-medium text-white transition-colors duration-300 rounded-lg bg-benin-green hover:bg-benin-green-600"
          >
            Voir la page complète
          </a>
        </div>
      </div>
    </div>
    
    <!-- Modal événements d'un jour -->
    <div 
      v-if="selectedDay && selectedDay.events && selectedDay.events.length > 0"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="closeDayEvents"
    >
      <div 
        class="w-full max-w-md p-6 mx-4 bg-white rounded-xl shadow-xl"
        style="max-height: 90vh; overflow-y: auto;"
      >
        <div class="flex items-start justify-between mb-4">
          <h3 class="text-xl font-bold text-benin-green">
            Événements du {{ formatDate(selectedDay.date, true) }}
          </h3>
          <button 
            @click="closeDayEvents"
            class="text-gray-500 transition-colors hover:text-benin-green"
          >
            <i class="text-xl fas fa-times"></i>
          </button>
        </div>
        
        <div class="space-y-3">
          <div 
            v-for="event in selectedDay.events" 
            :key="event.id"
            @click="openEventDetails(event); closeDayEvents();"
            class="flex items-start p-3 transition-all duration-300 border border-gray-100 rounded-lg cursor-pointer hover:border-benin-green/30 hover:bg-benin-green-50/30"
          >
            <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 mr-3 rounded bg-benin-green/10">
              <i 
                class="text-benin-green fas"
                :class="getCategoryIcon(event.category)"
              ></i>
            </div>
            
            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-baseline justify-between gap-2">
                <h4 class="font-medium text-gray-800">{{ event.title }}</h4>
                <div 
                  class="px-2 py-0.5 text-xs font-medium rounded-full"
                  :class="getCategoryClass(event.category)"
                >
                  {{ event.category }}
                </div>
              </div>
              
              <div class="mt-1 text-sm text-gray-600">
                {{ event.description.substring(0, 80) }}{{ event.description.length > 80 ? '...' : '' }}
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end mt-6">
          <button 
            @click="closeDayEvents"
            class="px-4 py-2 text-sm font-medium transition-colors duration-300 bg-gray-100 rounded-lg text-benin-green hover:bg-gray-200"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from '@nanostores/vue';
import { 
  currentCalendarMonth, 
  navigateMonth, 
  resetToToday as resetMonth,
  eventsByDate,
  filteredEvents
} from '../../stores/eventsStore';

// État local
const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const maxEventsPerDay = 3;
const showEventList = ref(true);
const selectedEvent = ref(null);
const selectedDay = ref(null);

// Connecter aux stores
const $currentMonth = useStore(currentCalendarMonth);
const $eventsByDate = useStore(eventsByDate);
const $filteredEvents = useStore(filteredEvents);

// Calcul des jours du calendrier
const calendarDays = computed(() => {
  const { month, year } = $currentMonth.value;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  
  // Déterminer le premier jour à afficher (début de la semaine contenant le 1er du mois)
  const startDay = new Date(firstDayOfMonth);
  startDay.setDate(startDay.getDate() - startDay.getDay());
  
  // Déterminer le dernier jour à afficher (fin de la semaine contenant le dernier jour du mois)
  const endDay = new Date(lastDayOfMonth);
  const daysToAdd = 6 - endDay.getDay();
  endDay.setDate(endDay.getDate() + daysToAdd);
  
  const days = [];
  const currentDate = new Date(startDay);
  
  while (currentDate <= endDay) {
    const dateString = currentDate.toISOString().split('T')[0]; // Format YYYY-MM-DD
    const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
    const isCurrentMonth = currentDate.getMonth() === month;
    const isToday = currentDate.toDateString() === today.toDateString();
    
    // Récupérer les événements pour ce jour
    const dayEvents = $eventsByDate.value[currentDate.getDate()] || [];
    
    days.push({
      date: dateString,
      isWeekend,
      isCurrentMonth,
      isToday,
      events: isCurrentMonth ? dayEvents : []
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return days;
});

// Événements du mois en cours
const eventsInCurrentMonth = computed(() => {
  const { month, year } = $currentMonth.value;
  
  return $filteredEvents.value.filter(event => {
    const eventDate = new Date(event.date);
    const eventEndDate = event.endDate ? new Date(event.endDate) : eventDate;
    
    // Vérifier si l'événement se déroule dans le mois courant
    return (
      (eventDate.getMonth() === month && eventDate.getFullYear() === year) ||
      (eventEndDate.getMonth() === month && eventEndDate.getFullYear() === year) ||
      (eventDate < new Date(year, month, 1) && eventEndDate > new Date(year, month + 1, 0))
    );
  }).sort((a, b) => new Date(a.date) - new Date(b.date));
});

// Méthodes
const changeMonth = (direction) => {
  navigateMonth(direction);
};

const resetToToday = () => {
  resetMonth();
};

const toggleEventList = () => {
  showEventList.value = !showEventList.value;
};

const openEventDetails = (event) => {
  selectedEvent.value = event;
};

const closeEventDetails = () => {
  selectedEvent.value = null;
};

const openDayEvents = (day) => {
  selectedDay.value = day;
};

const closeDayEvents = () => {
  selectedDay.value = null;
};

// Formatage
const formatMonth = (monthIndex) => {
  const date = new Date();
  date.setMonth(monthIndex);
  return date.toLocaleDateString('fr-FR', { month: 'long' });
};

const formatDate = (dateString, withYear = false) => {
  if (!dateString) return '';
  
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    ...(withYear && { year: 'numeric' })
  });
};

// Classes pour les catégories
const getCategoryClass = (category) => {
  const classes = {
    'culturel': 'bg-vodou/10 text-vodou',
    'arts': 'bg-benin-green/10 text-benin-green',
    'musique': 'bg-ocean/10 text-ocean',
    'divertissement': 'bg-benin-yellow/10 text-benin-yellow-700',
    'gastronomie': 'bg-earth/10 text-earth',
    'sport': 'bg-fire/10 text-fire',
    'technologie': 'bg-night/10 text-night'
  };
  
  return classes[category.toLowerCase()] || 'bg-gray-100 text-gray-700';
};

const getCategoryDotClass = (category) => {
  const classes = {
    'culturel': 'bg-vodou',
    'arts': 'bg-benin-green',
    'musique': 'bg-ocean',
    'divertissement': 'bg-benin-yellow',
    'gastronomie': 'bg-earth',
    'sport': 'bg-fire',
    'technologie': 'bg-night'
  };
  
  return classes[category.toLowerCase()] || 'bg-gray-700';
};

const getCategoryIcon = (category) => {
  const icons = {
    'culturel': 'fa-drum',
    'arts': 'fa-palette',
    'musique': 'fa-music',
    'divertissement': 'fa-theater-masks',
    'gastronomie': 'fa-utensils',
    'sport': 'fa-running',
    'technologie': 'fa-laptop-code'
  };
  
  return icons[category.toLowerCase()] || 'fa-calendar-day';
};

// Animation initiale
onMounted(() => {
  if (window.gsap) {
    gsap.from('.calendar-container', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  }
});

// Observer les changements de mois pour animer les jours
watch(() => $currentMonth.value, () => {
  if (window.gsap) {
    gsap.from('.calendar-day', {
      scale: 0.95,
      opacity: 0,
      duration: 0.4,
      stagger: {
        from: 'start',
        grid: [7, 6],
        amount: 0.3
      },
      ease: 'power2.out'
    });
  }
}, { deep: true });
</script>

<style scoped>
.calendar-day {
  transition: all 0.3s ease;
}

.calendar-day:hover {
  box-shadow: 0 0 0 2px rgba(13, 148, 136, 0.2) inset;
}

.calendar-day-today {
  box-shadow: 0 0 0 2px rgba(13, 148, 136, 0.2) inset;
  background-color: rgba(13, 148, 136, 0.02);
}

.calendar-event {
  transition: all 0.2s ease;
}

.calendar-event:hover {
  filter: brightness(1.05);
}

.has-events {
  position: relative;
}

.has-events::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 8px 8px 0;
  border-color: transparent rgba(13, 148, 136, 0.5) transparent transparent;
}
</style>