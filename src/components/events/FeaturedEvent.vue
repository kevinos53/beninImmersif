<template>
  <section 
    class="relative overflow-hidden bg-gray-900 featured-event"
    :style="{
      backgroundImage: `url(${event.image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }"
  >
    <!-- Overlay à gradient -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20"></div>
    
    <!-- Conteneur principal -->
    <div class="relative z-10 container mx-auto px-4 py-20">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-12">
        <!-- Image et informations de base -->
        <div class="md:col-span-5 lg:col-span-4">
          <div 
            class="relative h-96 md:h-full overflow-hidden rounded-xl shadow-2xl transform transition-transform duration-700 hover:scale-[1.02] featured-event-image"
          >
            <!-- Badge de catégorie -->
            <div 
              class="absolute top-4 left-4 z-10 px-4 py-1.5 text-sm font-medium rounded-full"
              :class="getCategoryClass(event.category)"
            >
              {{ event.category }}
            </div>
            
            <!-- Date -->
            <div class="absolute top-4 right-4 z-10 flex flex-col items-center justify-center w-16 h-16 bg-white rounded-lg shadow-xl transform transition-transform duration-300 hover:scale-110">
              <span class="text-xs font-medium text-benin-green-600">{{ formatDateMonth(event.date) }}</span>
              <span class="text-2xl font-bold text-benin-green">{{ formatDateDay(event.date) }}</span>
            </div>
            
            <!-- Image avec effet parallaxe -->
            <img 
              :src="event.image" 
              :alt="event.title" 
              class="object-cover w-full h-full transition-transform duration-1000 hover:scale-110 featured-event-img"
            />
            
            <!-- Informations superposées -->
            <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
              <div class="flex flex-wrap gap-3 mb-2 text-sm text-white/90">
                <div class="flex items-center">
                  <i class="mr-1.5 text-benin-green fas fa-map-marker-alt"></i>
                  <span>{{ event.location }}</span>
                </div>
                
                <div class="flex items-center">
                  <i class="mr-1.5 text-benin-green fas fa-calendar-day"></i>
                  <span>{{ formatDate(event.date) }}</span>
                </div>
              </div>
              
              <h3 class="text-xl font-bold text-white md:text-2xl">
                {{ event.title }}
              </h3>
            </div>
          </div>
        </div>
        
        <!-- Détails de l'événement -->
        <div class="md:col-span-7 lg:col-span-8">
          <div class="p-8 bg-white/10 backdrop-blur-lg rounded-xl space-y-6 featured-event-details">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-2xl font-bold text-white sm:text-3xl">
                {{ event.title }}
          </h2>
              <div class="text-lg font-semibold text-benin-green">
                {{ formatPrice(event.price) }}
              </div>
            </div>
            
            <p class="text-lg text-white/90 leading-relaxed featured-event-description">
              {{ event.description }}
            </p>
            
            <!-- Tags de l'événement -->
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tag in event.tags" 
                :key="tag"
                class="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-white/80 backdrop-blur-sm hover:bg-white/20 transition-colors duration-300"
              >
                # {{ tag }}
              </span>
            </div>
            
            <!-- Programmation -->
            <div class="space-y-2">
              <h4 class="text-lg font-semibold text-white">Programme</h4>
              <div class="space-y-3">
                <div 
                  v-for="(item, index) in event.schedule" 
                  :key="index"
                  class="flex items-start p-3 transition-colors duration-300 rounded-lg bg-white/5 hover:bg-white/10"
                >
                  <div class="flex items-center justify-center flex-shrink-0 w-12 h-12 mr-3 rounded-lg bg-benin-green-100/20">
                    <i class="text-lg text-benin-green fas fa-calendar-day"></i>
                  </div>
                  <div class="flex-1">
                    <div class="flex flex-wrap items-baseline justify-between gap-2">
                      <p class="font-medium text-white">{{ formatScheduleDay(item.date) }}</p>
                      <p class="text-sm text-benin-green">{{ item.time }}</p>
                    </div>
                    <p class="mt-1 text-sm text-white/70">{{ item.description }}</p>
                  </div>
                </div>
              </div>
          </div>
          
            <!-- CTA -->
            <div class="flex flex-wrap gap-4">
              <a 
                :href="`/evenements/${event.id}`" 
                class="inline-flex items-center px-6 py-3 text-base font-medium text-white transition-all duration-300 bg-benin-green rounded-lg hover:bg-benin-green-600 hover:shadow-lg hover:-translate-y-1"
              >
                <i class="mr-2 fas fa-ticket-alt"></i>
                Voir plus de détails
              </a>
              
            <button 
                class="inline-flex items-center px-6 py-3 text-base font-medium transition-all duration-300 rounded-lg bg-white/10 text-white hover:bg-white/20 hover:shadow-lg"
            >
                <i class="mr-2 fas fa-share-alt"></i>
                Partager
            </button>
            </div>
            
            <!-- Contact rapide -->
            <div class="grid grid-cols-1 gap-3 pt-4 mt-6 border-t border-white/10 sm:grid-cols-2">
              <a 
                v-if="event.contact && event.contact.website" 
                :href="event.contact.website"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center p-3 transition-colors duration-300 rounded-lg bg-white/5 hover:bg-white/10"
              >
                <i class="mr-3 text-benin-green fas fa-globe"></i>
                <span class="text-sm text-white">Site officiel</span>
              </a>
              
              <a 
                v-if="event.contact && event.contact.email" 
                :href="`mailto:${event.contact.email}`"
                class="flex items-center p-3 transition-colors duration-300 rounded-lg bg-white/5 hover:bg-white/10"
              >
                <i class="mr-3 text-benin-green fas fa-envelope"></i>
                <span class="text-sm text-white">Contacter par email</span>
              </a>
              
              <a 
                v-if="event.contact && event.contact.phone" 
                :href="`tel:${event.contact.phone}`"
                class="flex items-center p-3 transition-colors duration-300 rounded-lg bg-white/5 hover:bg-white/10"
              >
                <i class="mr-3 text-benin-green fas fa-phone-alt"></i>
                <span class="text-sm text-white">{{ event.contact.phone }}</span>
              </a>
              
              <a 
                v-if="event.coordinates" 
                :href="`https://maps.google.com/?q=${event.coordinates.lat},${event.coordinates.lng}`"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center p-3 transition-colors duration-300 rounded-lg bg-white/5 hover:bg-white/10"
              >
                <i class="mr-3 text-benin-green fas fa-map-marker-alt"></i>
                <span class="text-sm text-white">Voir sur la carte</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Définir les props
const props = defineProps({
  event: {
    type: Object,
    required: true
  }
});

// Formatage des dates
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const formatDateDay = (dateString) => {
  return new Date(dateString).getDate();
};

const formatDateMonth = (dateString) => {
  return new Date(dateString).toLocaleDateString('fr-FR', { month: 'short' }).slice(0, 3);
};

const formatScheduleDay = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  // Si c'est aujourd'hui
  if (date.toDateString() === today.toDateString()) {
    return "Aujourd'hui";
  }
  
  // Si c'est demain
  if (date.toDateString() === tomorrow.toDateString()) {
    return "Demain";
  }
  
  // Sinon, format standard
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
};

// Formatage des prix
const formatPrice = (price) => {
  if (!price) return 'Gratuit';
  
  if (typeof price === 'object') {
    if (price.value === 'Gratuit' || price.value === 0 || price.value === '0') return 'Gratuit';
    
    const formattedPrice = price.value.toString().includes('-')
      ? `${price.value} ${price.currency}`
      : new Intl.NumberFormat('fr-FR', { 
          style: 'currency', 
          currency: price.currency || 'XOF',
          maximumFractionDigits: 0
        }).format(price.value);
    
    return formattedPrice;
  }
  
  return price === 0 || price === '0'
    ? 'Gratuit' 
    : new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
        maximumFractionDigits: 0
      }).format(price);
};

// Classes CSS en fonction de la catégorie
const getCategoryClass = (category) => {
  const classes = {
    'culturel': 'bg-vodou/90 text-white',
    'arts': 'bg-benin-green/90 text-white',
    'musique': 'bg-ocean/90 text-white',
    'divertissement': 'bg-benin-yellow/90 text-night',
    'gastronomie': 'bg-earth/90 text-white',
    'sport': 'bg-fire/90 text-white',
    'technologie': 'bg-night/90 text-white'
  };
  
  return classes[category.toLowerCase()] || 'bg-gray-800/90 text-white';
};
</script>

<style scoped>
.featured-event {
  position: relative;
  overflow: hidden;
}

.featured-event::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
  z-index: 1;
}

.featured-event-image {
  position: relative;
}

.featured-event-image::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(13, 148, 136, 0.15), transparent 60%);
  opacity: 0;
  transition: opacity 0.7s ease;
}

.featured-event-image:hover::after {
  opacity: 1;
}

.featured-event-details {
  animation: fadeInRight 1s ease-out;
}

.featured-event-description {
  position: relative;
  z-index: 1;
}

.featured-event-description::before {
  content: '';
  position: absolute;
  left: -20px;
  top: 10px;
  width: 3px;
  height: 85%;
  background: linear-gradient(to bottom, var(--tw-gradient-stops));
  --tw-gradient-from: #0d9488;
  --tw-gradient-to: transparent;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
  border-radius: 4px;
  opacity: 0.7;
  z-index: -1;
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (min-width: 768px) {
  .featured-event-image {
    height: 350px;
  }
}

@media (min-width: 1024px) {
  .featured-event-image {
    height: 480px;
  }
}
</style>