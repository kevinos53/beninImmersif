<template>
    <div class="booking-form bg-white rounded-xl shadow-lg p-5 border border-gray-100">
      <!-- En-tête prix -->
      <div class="mb-4">
        <div class="flex items-center justify-between">
          <div class="flex items-baseline">
            <span class="text-2xl font-bold text-gray-800">
              {{ accommodation.priceDiscounted || accommodation.price }}€
            </span>
            <span class="text-sm text-gray-500 ml-1">/ nuit</span>
          </div>
          
          <!-- Prix barré si promotion -->
          <div v-if="accommodation.priceDiscounted" class="flex items-center">
            <span class="text-sm text-gray-500 line-through mr-2">{{ accommodation.price }}€</span>
            <span class="bg-benin-red text-white text-xs px-2 py-1 rounded-full">
              -{{ accommodation.discountPercentage }}%
            </span>
          </div>
        </div>
        
        <!-- Note -->
        <div class="flex items-center mt-1 text-sm">
          <div class="flex items-center">
            <i class="fas fa-star text-benin-yellow mr-1"></i>
            <span class="font-medium mr-1">{{ accommodation.rating }}</span>
          </div>
          <span class="text-gray-500">
            ({{ accommodation.reviewsCount }} avis)
          </span>
        </div>
      </div>
      
      <!-- Formulaire -->
      <form @submit.prevent="submitBooking" class="space-y-4">
        <!-- Dates -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Arrivée</label>
            <div class="relative">
              <input 
                type="date" 
                v-model="checkInDate"
                :min="minDate"
                :max="checkOutDate || undefined"
                class="w-full py-2 pl-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-benin-green focus:border-transparent"
                @change="calculateTotal"
                required
              />
              <i class="fas fa-calendar absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Départ</label>
            <div class="relative">
              <input 
                type="date" 
                v-model="checkOutDate"
                :min="minCheckoutDate"
                class="w-full py-2 pl-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-benin-green focus:border-transparent"
                @change="calculateTotal"
                required
              />
              <i class="fas fa-calendar absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
        </div>
        
        <!-- Voyageurs -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Voyageurs</label>
          <div class="relative">
            <select 
              v-model="guests" 
              class="w-full py-2 pl-3 pr-10 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-benin-green focus:border-transparent"
            >
              <option v-for="i in maxGuests" :key="i" :value="i">
                {{ i }} {{ i === 1 ? 'voyageur' : 'voyageurs' }}
              </option>
            </select>
            <i class="fas fa-chevron-down absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
        
        <!-- Type de chambre pour les hôtels -->
        <div v-if="accommodation.rooms && accommodation.rooms.length > 0">
          <label class="block text-sm font-medium text-gray-700 mb-1">Type de chambre</label>
          <div class="space-y-2 max-h-[200px] overflow-y-auto pr-2">
            <div 
              v-for="room in accommodation.rooms" 
              :key="room.id"
              class="flex border rounded-lg p-3 cursor-pointer transition-all duration-300"
              :class="selectedRoom === room.id ? 'border-benin-green bg-benin-green-50' : 'border-gray-200 hover:border-gray-300'"
              @click="selectRoom(room)"
            >
              <div class="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                <img :src="room.image" :alt="room.name" class="w-full h-full object-cover">
              </div>
              <div class="ml-3 flex-1">
                <div class="flex justify-between">
                  <h4 class="font-medium text-gray-800">{{ room.name }}</h4>
                  <span class="font-bold text-benin-green">{{ room.price }}€</span>
                </div>
                <div class="text-sm text-gray-500 mt-1">
                  <div class="flex items-center">
                    <i class="fas fa-user-friends mr-1 text-xs"></i>
                    <span>{{ room.capacity }} pers. max</span>
                  </div>
                  <div class="flex items-center mt-1">
                    <i class="fas fa-expand-arrows-alt mr-1 text-xs"></i>
                    <span>{{ room.size }} m²</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Résumé des coûts -->
        <div v-if="nights > 0" class="pt-4 border-t border-gray-200">
          <div class="space-y-2">
            <div class="flex justify-between">
              <div class="text-gray-600">
                {{ pricePerNight }}€ x {{ nights }} nuit{{ nights > 1 ? 's' : '' }}
              </div>
              <div>{{ pricePerNight * nights }}€</div>
            </div>
            
            <div class="flex justify-between">
              <div class="text-gray-600">Frais de service</div>
              <div>{{ serviceFee }}€</div>
            </div>
            
            <div class="flex justify-between">
              <div class="text-gray-600">Taxe de séjour</div>
              <div>{{ touristTax }}€</div>
            </div>
            
            <div v-if="discountAmount > 0" class="flex justify-between text-benin-red">
              <div>Réduction</div>
              <div>-{{ discountAmount }}€</div>
            </div>
            
            <div class="flex justify-between font-bold pt-3 border-t border-gray-200">
              <div>Total</div>
              <div>{{ totalPrice }}€</div>
            </div>
          </div>
        </div>
        
        <!-- Bouton de réservation -->
        <button 
          type="submit" 
          class="w-full py-3 bg-benin-green text-white font-medium rounded-lg hover:bg-benin-green-600 transition-colors duration-300 transform hover:-translate-y-1 hover:shadow-md flex items-center justify-center"
          :disabled="isSubmitting"
        >
          <span v-if="!isSubmitting">Demander une réservation</span>
          <span v-else class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Traitement en cours...
          </span>
        </button>
        
        <!-- Pas d'engagement -->
        <p class="text-xs text-center text-gray-500">
          <i class="fas fa-lock mr-1"></i>
          Aucun paiement maintenant. Vous ne serez débité qu'après confirmation.
        </p>
      </form>
      
      <!-- Popup de confirmation -->
      <div v-if="showConfirmation" class="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div class="fixed inset-0 bg-black opacity-50" @click="showConfirmation = false"></div>
        <div class="bg-white rounded-xl p-6 max-w-md w-full relative z-10 animate-fade-in">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-full bg-benin-green-50 flex items-center justify-center">
              <i class="fas fa-check text-2xl text-benin-green"></i>
            </div>
          </div>
          
          <h3 class="text-xl font-bold text-center text-gray-800 mb-2">Demande envoyée !</h3>
          <p class="text-center text-gray-600 mb-6">
            Votre demande de réservation a été envoyée avec succès. Le propriétaire vous contactera sous 24h pour confirmer votre réservation.
          </p>
          
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Hébergement:</span>
              <span class="font-medium">{{ accommodation.name }}</span>
            </div>
            <div class="flex justify-between mb-2">
              <span class="text-gray-600">Dates:</span>
              <span class="font-medium">{{ formatDate(checkInDate) }} - {{ formatDate(checkOutDate) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Voyageurs:</span>
              <span class="font-medium">{{ guests }}</span>
            </div>
          </div>
          
          <div class="flex space-x-3">
            <button 
              class="flex-1 py-3 border border-benin-green text-benin-green font-medium rounded-lg hover:bg-benin-green-50 transition-colors"
              @click="showConfirmation = false"
            >
              Fermer
            </button>
            <button 
              class="flex-1 py-3 bg-benin-green text-white font-medium rounded-lg hover:bg-benin-green-600 transition-colors"
              @click="goToAccount"
            >
              Voir mes réservations
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  
  // Props
  const props = defineProps({
    accommodation: {
      type: Object,
      required: true
    }
  });
  
  // État du formulaire
  const checkInDate = ref('');
  const checkOutDate = ref('');
  const guests = ref(1);
  const selectedRoom = ref(null);
  const isSubmitting = ref(false);
  const showConfirmation = ref(false);
  
  // Constantes pour le calcul
  const SERVICE_FEE_PERCENTAGE = 0.1; // 10% de frais de service
  const TOURIST_TAX_PER_PERSON = 2.5; // 2.5€ par personne par nuit
  
  // Date minimale (aujourd'hui)
  const minDate = computed(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  
  // Date minimale de checkout (arrivée + 1 jour)
  const minCheckoutDate = computed(() => {
    if (!checkInDate.value) return minDate.value;
    
    const nextDay = new Date(checkInDate.value);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split('T')[0];
  });
  
  // Nombre maximal de voyageurs
  const maxGuests = computed(() => {
    if (selectedRoom.value) {
      const room = props.accommodation.rooms.find(r => r.id === selectedRoom.value);
      return room ? room.capacity : 10;
    }
    return 10; // Valeur par défaut
  });
  
  // Prix par nuit en fonction de la chambre sélectionnée
  const pricePerNight = computed(() => {
    if (selectedRoom.value) {
      const room = props.accommodation.rooms.find(r => r.id === selectedRoom.value);
      return room ? room.price : (props.accommodation.priceDiscounted || props.accommodation.price);
    }
    return props.accommodation.priceDiscounted || props.accommodation.price;
  });
  
  // Nombre de nuits
  const nights = computed(() => {
    if (!checkInDate.value || !checkOutDate.value) return 0;
    
    const startDate = new Date(checkInDate.value);
    const endDate = new Date(checkOutDate.value);
    
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  });
  
  // Frais de service
  const serviceFee = computed(() => {
    return Math.round(pricePerNight.value * nights.value * SERVICE_FEE_PERCENTAGE);
  });
  
  // Taxe de séjour
  const touristTax = computed(() => {
    return Math.round(guests.value * nights.value * TOURIST_TAX_PER_PERSON);
  });
  
  // Montant de la réduction
  const discountAmount = computed(() => {
    if (!props.accommodation.priceDiscounted) return 0;
    
    return Math.round((props.accommodation.price - props.accommodation.priceDiscounted) * nights.value);
  });
  
  // Prix total
  const totalPrice = computed(() => {
    if (nights.value === 0) return 0;
    
    return Math.round(pricePerNight.value * nights.value + serviceFee.value + touristTax.value);
  });
  
  // Sélectionner une chambre
  const selectRoom = (room) => {
    selectedRoom.value = room.id;
    calculateTotal();
  };
  
  // Calcul du total lors du changement de dates
  const calculateTotal = () => {
    // Rien à faire ici, les computed font le travail
  };
  
  // Formatter les dates pour l'affichage
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };
  
  // Soumission du formulaire
  const submitBooking = async () => {
    if (!checkInDate.value || !checkOutDate.value) return;
    
    isSubmitting.value = true;
    
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Afficher la confirmation
      showConfirmation.value = true;
      
    } catch (error) {
      console.error('Erreur lors de la réservation', error);
      alert('Une erreur est survenue lors de la réservation. Veuillez réessayer.');
    } finally {
      isSubmitting.value = false;
    }
  };
  
  // Navigation vers le compte utilisateur
  const goToAccount = () => {
    showConfirmation.value = false;
    window.location.href = '/mon-compte';
  };
  
  // Initialisation
  onMounted(() => {
    // Sélectionner la première chambre par défaut si disponible
    if (props.accommodation.rooms && props.accommodation.rooms.length > 0) {
      selectedRoom.value = props.accommodation.rooms[0].id;
    }
  });
  </script>
  
  <style scoped>
  /* Styles personnalisés pour le datepicker */
  input[type="date"] {
    color-scheme: light;
  }
  
  input[type="date"]::-webkit-calendar-picker-indicator {
    color: #9CA3AF;
    cursor: pointer;
  }
  
  /* Animation pour le dialogue de confirmation */
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fade-in 0.3s ease-out forwards;
  }
  
  /* Scrollbar style pour la liste des chambres */
  .overflow-y-auto::-webkit-scrollbar {
    width: 4px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 10px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
  </style>