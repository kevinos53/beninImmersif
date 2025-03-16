<template>
    <div class="event-registration">
      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label for="name" class="block mb-1 text-sm font-medium text-white">Nom complet</label>
            <input 
              v-model="form.name" 
              type="text" 
              id="name" 
              class="w-full px-4 py-2 text-white border rounded-lg bg-white/10 border-white/20 focus:outline-none focus:ring-2 focus:ring-benin-yellow"
              placeholder="Votre nom"
              required
            />
          </div>
          <div>
            <label for="email" class="block mb-1 text-sm font-medium text-white">Email</label>
            <input 
              v-model="form.email" 
              type="email" 
              id="email" 
              class="w-full px-4 py-2 text-white border rounded-lg bg-white/10 border-white/20 focus:outline-none focus:ring-2 focus:ring-benin-yellow"
              placeholder="votre@email.com"
              required
            />
          </div>
        </div>
        
        <div>
          <label for="phone" class="block mb-1 text-sm font-medium text-white">Téléphone</label>
          <input 
            v-model="form.phone" 
            type="tel" 
            id="phone" 
            class="w-full px-4 py-2 text-white border rounded-lg bg-white/10 border-white/20 focus:outline-none focus:ring-2 focus:ring-benin-yellow"
            placeholder="+229 00 00 00 00"
          />
        </div>
        
        <div>
          <label for="guests" class="block mb-1 text-sm font-medium text-white">Nombre de personnes</label>
          <select 
            v-model="form.guests" 
            id="guests" 
            class="w-full px-4 py-2 text-white border rounded-lg bg-white/10 border-white/20 focus:outline-none focus:ring-2 focus:ring-benin-yellow"
            required
          >
            <option value="1">1 personne</option>
            <option value="2">2 personnes</option>
            <option value="3">3 personnes</option>
            <option value="4">4 personnes</option>
            <option value="5">5 personnes ou plus</option>
          </select>
        </div>
        
        <div>
          <label for="message" class="block mb-1 text-sm font-medium text-white">Message (optionnel)</label>
          <textarea 
            v-model="form.message" 
            id="message" 
            rows="3" 
            class="w-full px-4 py-2 text-white border rounded-lg bg-white/10 border-white/20 focus:outline-none focus:ring-2 focus:ring-benin-yellow"
            placeholder="Questions ou commentaires?"
          ></textarea>
        </div>
        
        <div class="flex items-center">
          <input 
            v-model="form.termsAccepted" 
            type="checkbox" 
            id="terms" 
            class="w-4 h-4 bg-transparent rounded text-benin-yellow border-white/30 focus:ring-benin-yellow"
            required
          />
          <label for="terms" class="ml-2 text-sm text-white/90">
            J'accepte les conditions générales et la politique de confidentialité
          </label>
        </div>
        
        <div class="pt-2">
          <button 
            type="submit" 
            class="w-full px-5 py-3 text-sm font-medium text-black transition-all duration-300 rounded-lg bg-benin-yellow hover:bg-benin-yellow-400"
            :disabled="isSubmitting"
          >
            <div v-if="isSubmitting" class="flex items-center justify-center">
              <svg class="w-5 h-5 mr-3 -ml-1 text-black animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Traitement en cours...
            </div>
            <span v-else>
              Réserver ma place
              <i class="ml-1 fas fa-ticket-alt"></i>
            </span>
          </button>
        </div>
      </form>
      
      <!-- Confirmation après envoi -->
      <div v-if="formSubmitted" class="p-4 mt-6 text-center rounded-lg bg-benin-yellow/20">
        <div class="flex items-center justify-center w-12 h-12 mx-auto mb-3 text-white rounded-full bg-benin-yellow">
          <i class="fas fa-check"></i>
        </div>
        <h3 class="mb-2 text-lg font-medium text-white">Votre réservation est confirmée !</h3>
        <p class="text-white/80">
          Merci pour votre réservation pour {{ event.title }}. Vous recevrez bientôt un email de confirmation.
        </p>
        <p class="mt-4 text-sm text-white/80">
          Référence de réservation: <span class="font-mono font-medium text-benin-yellow">{{ bookingReference }}</span>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, reactive } from 'vue';
  
  export default {
    name: 'EventRegistration',
    props: {
      event: {
        type: Object,
        required: true
      }
    },
    setup(props) {
      // État du formulaire
      const form = reactive({
        name: '',
        email: '',
        phone: '',
        guests: '1',
        message: '',
        termsAccepted: false
      });
      
      const isSubmitting = ref(false);
      const formSubmitted = ref(false);
      const bookingReference = ref('');
      
      // Génère une référence aléatoire
      const generateReference = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = 'BEN-';
        for (let i = 0; i < 8; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
      };
      
      // Soumission du formulaire
      const submitForm = async () => {
        isSubmitting.value = true;
        
        try {
          // Simuler un délai d'envoi
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Ici, vous pourriez ajouter une requête API pour enregistrer la réservation
          console.log('Réservation pour:', props.event.title);
          console.log('Données:', form);
          
          // Générer une référence de réservation
          bookingReference.value = generateReference();
          
          // Afficher la confirmation
          formSubmitted.value = true;
          
          // Réinitialiser le formulaire
          Object.keys(form).forEach(key => {
            if (key !== 'guests') form[key] = '';
            if (key === 'termsAccepted') form[key] = false;
          });
          
        } catch (error) {
          console.error('Erreur lors de la soumission:', error);
          alert('Une erreur est survenue lors de la réservation. Veuillez réessayer.');
        } finally {
          isSubmitting.value = false;
        }
      };
      
      return {
        form,
        isSubmitting,
        formSubmitted,
        bookingReference,
        submitForm
      };
    }
  };
  </script>
  
  <style scoped>
  /* Animations pour les champs de formulaire */
  input, textarea, select {
    transition: all 0.3s ease;
  }
  
  input:focus, textarea:focus, select:focus {
    transform: translateY(-2px);
  }
  
  /* Animation du bouton de soumission */
  button[type="submit"] {
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }
</style>