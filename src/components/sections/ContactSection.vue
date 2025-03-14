<template>
  <section id="contact" class="relative py-20 overflow-hidden bg-gradient-to-b from-white to-benin-green/5">
    <!-- Éléments décoratifs -->
    <div class="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent"></div>
    <div class="absolute right-0 rounded-full -top-20 w-72 h-72 bg-benin-green/5 blur-3xl"></div>
    <div class="absolute rounded-full bottom-20 left-10 w-80 h-80 bg-benin-culture/5 blur-3xl"></div>
    
    <!-- Motifs flottants -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[15%] left-[8%] text-benin-green/10 animate-float-slow" style="animation-delay: 0s;">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
        </svg>
      </div>
      <div class="absolute top-[40%] right-[10%] text-benin-culture/10 animate-spin-slower" style="animation-delay: 2s;">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z" />
        </svg>
      </div>
      <div class="absolute bottom-[25%] left-[12%] text-benin-yellow/10 animate-float-slow" style="animation-delay: 1s;">
        <svg width="70" height="70" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
        </svg>
      </div>
    </div>
    
    <div class="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="mb-16 text-center">
        <div class="inline-block p-1 px-3 mb-4 rounded-lg bg-benin-green/20">
          <span class="font-medium text-benin-green">Contactez-nous</span>
        </div>
        <h2 class="mb-6 text-3xl font-bold text-gray-900 section-title sm:text-4xl lg:text-5xl font-display">
          Planifiez votre <span class="text-benin-green">voyage au Bénin</span>
        </h2>
        <p class="max-w-3xl mx-auto text-lg text-gray-700">
          Vous avez des questions sur le Bénin ou besoin d'aide pour organiser votre séjour ? Notre équipe d'experts locaux est à votre disposition pour vous accompagner dans la préparation de votre voyage.
        </p>
      </div>
      
      <div class="grid grid-cols-1 gap-12 mb-20 lg:grid-cols-2">
        <!-- Contact Form -->
        <div class="p-8 bg-white shadow-xl rounded-2xl md:p-10">
          <h3 class="mb-6 text-2xl font-bold text-gray-900 font-display">Envoyez-nous un message</h3>
          
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label for="firstname" class="block mb-1 text-sm font-medium text-gray-700">Prénom</label>
                <input 
                  type="text" 
                  id="firstname" 
                  v-model="form.firstname" 
                  class="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-benin-green focus:border-benin-green"
                  placeholder="Votre prénom"
                  required
                >
              </div>
              <div>
                <label for="lastname" class="block mb-1 text-sm font-medium text-gray-700">Nom</label>
                <input 
                  type="text" 
                  id="lastname" 
                  v-model="form.lastname" 
                  class="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-benin-green focus:border-benin-green"
                  placeholder="Votre nom"
                  required
                >
              </div>
            </div>
            
            <div>
              <label for="email" class="block mb-1 text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email" 
                class="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-benin-green focus:border-benin-green"
                placeholder="votre.email@exemple.com"
                required
              >
            </div>
            
            <div>
              <label for="subject" class="block mb-1 text-sm font-medium text-gray-700">Sujet</label>
              <select 
                id="subject" 
                v-model="form.subject" 
                class="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-benin-green focus:border-benin-green"
                required
              >
                <option value="" disabled selected>Sélectionnez un sujet</option>
                <option value="information">Demande d'informations</option>
                <option value="reservation">Réservation de voyage</option>
                <option value="custom">Voyage sur mesure</option>
                <option value="partnership">Partenariat</option>
                <option value="other">Autre</option>
              </select>
            </div>
            
            <div>
              <label for="message" class="block mb-1 text-sm font-medium text-gray-700">Message</label>
              <textarea 
                id="message" 
                v-model="form.message" 
                rows="5" 
                class="w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-benin-green focus:border-benin-green"
                placeholder="Décrivez votre demande en détail..."
                required
              ></textarea>
            </div>
            
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input 
                  id="privacy" 
                  type="checkbox" 
                  v-model="form.privacy" 
                  class="w-4 h-4 border-gray-300 rounded text-benin-green focus:ring-benin-green"
                  required
                >
              </div>
              <div class="ml-3 text-sm">
                <label for="privacy" class="font-medium text-gray-700">
                  J'accepte que mes données soient traitées conformément à la <a href="#" class="text-benin-green hover:underline">politique de confidentialité</a>
                </label>
              </div>
            </div>
            
            <div>
              <button 
                type="submit" 
                class="flex items-center justify-center w-full px-6 py-3 font-bold text-white transition-colors duration-300 transform rounded-lg bg-benin-green hover:bg-benin-green-dark hover:-translate-y-1 hover:shadow-xl"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">
                  <svg class="w-5 h-5 mr-3 -ml-1 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Envoi en cours...
                </span>
                <span v-else>
                  Envoyer le message
                </span>
              </button>
            </div>
            
            <div v-if="formStatus.show" :class="`text-center p-3 rounded-lg ${formStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`">
              {{ formStatus.message }}
            </div>
          </form>
        </div>
        
        <!-- Contact Info -->
        <div>
          <div class="p-8 mb-8 bg-white shadow-xl rounded-2xl md:p-10">
            <h3 class="mb-6 text-2xl font-bold text-gray-900 font-display">Nos coordonnées</h3>
            
            <div class="space-y-6">
              <div class="flex items-start">
                <div class="flex items-center justify-center w-12 h-12 mt-1 mr-4 rounded-full bg-benin-green/10">
                  <i class="text-xl fas fa-map-marker-alt text-benin-green"></i>
                </div>
                <div>
                  <h4 class="mb-1 font-bold text-gray-900">Adresse</h4>
                  <p class="text-gray-700">
                    123 Avenue de la République<br>
                    Cotonou, Bénin
                  </p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex items-center justify-center w-12 h-12 mt-1 mr-4 rounded-full bg-benin-green/10">
                  <i class="text-xl fas fa-phone-alt text-benin-green"></i>
                </div>
                <div>
                  <h4 class="mb-1 font-bold text-gray-900">Téléphone</h4>
                  <p class="text-gray-700">
                    <a href="tel:+22921123456" class="transition-colors hover:text-benin-green">+229 01 46 48 44 96</a><br>
                    <span class="text-sm text-gray-500">Lun-Ven: 8h-18h (GMT+1)</span>
                  </p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex items-center justify-center w-12 h-12 mt-1 mr-4 rounded-full bg-benin-green/10">
                  <i class="text-xl fas fa-envelope text-benin-green"></i>
                </div>
                <div>
                  <h4 class="mb-1 font-bold text-gray-900">Email</h4>
                  <p class="text-gray-700">
                    <a href="mailto:contact@benin-immersion.com" class="transition-colors hover:text-benin-green">contact@benin-immersion.com</a><br>
                    <span class="text-sm text-gray-500">Nous répondons sous 24h</span>
                  </p>
                </div>
              </div>
              
              <div class="flex items-start">
                <div class="flex items-center justify-center w-12 h-12 mt-1 mr-4 rounded-full bg-benin-green/10">
                  <i class="text-xl fas fa-comments text-benin-green"></i>
                </div>
                <div>
                  <h4 class="mb-1 font-bold text-gray-900">Réseaux sociaux</h4>
                  <div class="flex mt-2 space-x-4">
                    <a href="#" class="flex items-center justify-center w-10 h-10 transition-colors bg-gray-100 rounded-full hover:bg-benin-green hover:text-white">
                      <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://www.linkedin.com/in/gnanha-mahougnon-kevin-b58777277/" class="flex items-center justify-center w-10 h-10 transition-colors bg-gray-100 rounded-full hover:bg-benin-green hover:text-white">
                      <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" class="flex items-center justify-center w-10 h-10 transition-colors bg-gray-100 rounded-full hover:bg-benin-green hover:text-white">
                      <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="flex items-center justify-center w-10 h-10 transition-colors bg-gray-100 rounded-full hover:bg-benin-green hover:text-white">
                      <i class="fab fa-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Map -->
          <div class="overflow-hidden bg-white shadow-xl rounded-2xl h-80">
            <div class="relative w-full h-full">
              <img src="/img/benin-map.webp" alt="Carte du Bénin" class="object-cover w-full h-full">
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="max-w-xs p-4 text-center rounded-lg bg-white/90 backdrop-blur-sm">
                  <h4 class="mb-2 font-bold text-gray-900">Carte interactive</h4>
                  <p class="mb-3 text-sm text-gray-700">Explorez notre carte interactive pour découvrir les merveilles du Bénin</p>
                  <a href="#" class="inline-flex items-center font-medium transition-colors text-benin-green hover:text-benin-culture">
                    <span>Ouvrir la carte</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- FAQ Section -->
      <div class="mb-20">
        <h3 class="mb-12 text-2xl font-bold text-center md:text-3xl font-display">Questions fréquentes</h3>
        
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="p-6 bg-white shadow-lg rounded-xl">
            <h4 class="mb-3 text-xl font-bold text-gray-900">Quand est la meilleure période pour visiter le Bénin ?</h4>
            <p class="text-gray-700">
              La meilleure période pour visiter le Bénin s'étend de novembre à mars, pendant la saison sèche. Le climat est alors plus agréable avec des températures modérées et peu de précipitations, ce qui facilite les déplacements et les activités en plein air.
            </p>
          </div>
          
          <div class="p-6 bg-white shadow-lg rounded-xl">
            <h4 class="mb-3 text-xl font-bold text-gray-900">Ai-je besoin d'un visa pour me rendre au Bénin ?</h4>
            <p class="text-gray-700">
              Oui, la plupart des voyageurs ont besoin d'un visa pour entrer au Bénin. Depuis 2018, le Bénin propose un e-visa que vous pouvez obtenir en ligne avant votre départ. Nous pouvons vous accompagner dans les démarches administratives.
            </p>
          </div>
          
          <div class="p-6 bg-white shadow-lg rounded-xl">
            <h4 class="mb-3 text-xl font-bold text-gray-900">Quelles vaccinations sont nécessaires ?</h4>
            <p class="text-gray-700">
              La vaccination contre la fièvre jaune est obligatoire pour entrer au Bénin. Il est également recommandé d'être à jour dans ses vaccinations contre l'hépatite A et B, la typhoïde, et de prendre un traitement antipaludéen. Consultez votre médecin avant le départ.
            </p>
          </div>
          
          <div class="p-6 bg-white shadow-lg rounded-xl">
            <h4 class="mb-3 text-xl font-bold text-gray-900">Comment se déplacer à l'intérieur du pays ?</h4>
            <p class="text-gray-700">
              Plusieurs options s'offrent à vous : les taxis collectifs (zemidjan), les bus, ou la location de voiture avec chauffeur. Pour plus de confort et de sécurité, nous recommandons nos services de transport privé avec guide francophone inclus dans nos forfaits.
            </p>
          </div>
          
          <div class="p-6 bg-white shadow-lg rounded-xl">
            <h4 class="mb-3 text-xl font-bold text-gray-900">Quelle monnaie est utilisée au Bénin ?</h4>
            <p class="text-gray-700">
              Le Bénin utilise le Franc CFA (XOF). Les cartes de crédit sont acceptées dans les grands hôtels et restaurants des zones touristiques, mais il est conseillé d'avoir toujours du liquide sur soi, surtout lors de déplacements dans les zones rurales.
            </p>
          </div>
          
          <div class="p-6 bg-white shadow-lg rounded-xl">
            <h4 class="mb-3 text-xl font-bold text-gray-900">Proposez-vous des circuits personnalisés ?</h4>
            <p class="text-gray-700">
              Absolument ! Nous nous spécialisons dans la création d'itinéraires sur mesure adaptés à vos intérêts, votre budget et votre durée de séjour. Contactez-nous avec vos préférences et nous élaborerons ensemble le voyage qui vous correspond.
            </p>
          </div>
        </div>
      </div>
      
      <!-- Newsletter -->
      <div class="rounded-2xl overflow-hidden relative shadow-2xl transform hover:scale-[1.01] transition-all duration-300">
        <div class="absolute inset-0">
          <img src="/img/newsletter-bg.webp" alt="Newsletter" class="object-cover w-full h-full">
          <div class="absolute inset-0 bg-gradient-to-br from-benin-green/90 to-spirit/80"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(93,53,135,0.5),transparent_70%)]"></div>
          
          <!-- Motifs décoratifs -->
          <div class="absolute top-0 right-0 w-40 h-40 opacity-20">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-benin-yellow">
              <path d="M50 0L61 35H100L69 57L80 91L50 70L20 91L31 57L0 35H39L50 0Z" fill="currentColor"/>
            </svg>
          </div>
          <div class="absolute bottom-0 left-0 w-32 h-32 opacity-20 animate-spin-slower">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-benin-yellow">
              <circle cx="50" cy="50" r="45" stroke="currentColor" stroke-width="10"/>
            </svg>
          </div>
        </div>
        
        <div class="relative p-8 md:p-12">
          <div class="max-w-3xl mx-auto text-center">
            <span class="inline-block px-4 py-1 mb-4 text-sm font-medium rounded-full bg-benin-yellow/20 text-benin-yellow-50 backdrop-blur-sm">Newsletter</span>
            
            <h3 class="mb-4 text-2xl font-bold text-white font-display md:text-3xl drop-shadow-md">
              Restez informé sur le <span class="text-benin-yellow">Bénin</span>
            </h3>
            
            <p class="mb-8 text-lg text-white/90">
              Inscrivez-vous à notre newsletter pour recevoir des conseils de voyage, des offres exclusives et les dernières actualités sur le Bénin.
            </p>
            
            <form @submit.prevent="subscribeNewsletter" class="flex flex-col max-w-xl gap-4 mx-auto sm:flex-row">
              <div class="relative flex-grow">
                <input 
                  type="email" 
                  v-model="newsletter.email" 
                  class="w-full px-5 py-4 pl-12 border-0 shadow-inner rounded-xl focus:ring-2 focus:ring-benin-yellow/50 bg-white/95 backdrop-blur-sm"
                  placeholder="Votre adresse email"
                  required
                >
                <div class="absolute transform -translate-y-1/2 left-4 top-1/2 text-benin-green">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                  </svg>
                </div>
              </div>
              
              <button 
                type="submit" 
                class="px-8 py-4 font-bold transition-all duration-300 transform shadow-lg bg-benin-yellow text-night rounded-xl hover:bg-white whitespace-nowrap hover:shadow-xl hover:-translate-y-1"
              >
                S'abonner
              </button>
            </form>
            
            <p class="mt-6 text-sm text-white/80">
              En vous inscrivant, vous acceptez de recevoir nos emails et confirmez avoir lu notre <a href="#" class="font-medium text-benin-yellow hover:underline">politique de confidentialité</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ContactSection',
  data() {
    return {
      form: {
        firstname: '',
        lastname: '',
        email: '',
        subject: '',
        message: '',
        privacy: false
      },
      newsletter: {
        email: ''
      },
      isSubmitting: false,
      formStatus: {
        show: false,
        success: false,
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      // Simuler l'envoi du formulaire
      this.isSubmitting = true;
      this.formStatus.show = false;
      
      // Simulation d'une requête API
      setTimeout(() => {
        this.isSubmitting = false;
        this.formStatus.show = true;
        this.formStatus.success = true;
        this.formStatus.message = "Votre message a été envoyé avec succès ! Notre équipe vous contactera dans les plus brefs délais.";
        
        // Réinitialiser le formulaire
        this.form = {
          firstname: '',
          lastname: '',
          email: '',
          subject: '',
          message: '',
          privacy: false
        };
        
        // Masquer le message après 5 secondes
        setTimeout(() => {
          this.formStatus.show = false;
        }, 5000);
      }, 1500);
    },
    
    subscribeNewsletter() {
      // Simuler l'inscription à la newsletter
      alert(`Merci de vous être inscrit à notre newsletter avec l'email: ${this.newsletter.email}`);
      this.newsletter.email = '';
    }
  }
}
</script>

<style scoped>
/* Animations pour les éléments du formulaire */
form input, form textarea, form select, form button {
  transition: all 0.3s ease;
}

form input:focus, form textarea:focus, form select:focus {
  transform: translateY(-2px);
}

form button:hover {
  transform: translateY(-2px);
}
</style> 