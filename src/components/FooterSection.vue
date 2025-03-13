<template>
  <footer class="bg-benin-night text-white pt-16 pb-8 relative overflow-hidden">
    <!-- Motifs de fond -->
    <div class="absolute inset-0 benin-pattern opacity-5"></div>
    
    <!-- Cercles décoratifs -->
    <div class="absolute top-0 left-1/4 w-64 h-64 bg-benin-green/10 rounded-full blur-3xl"></div>
    <div class="absolute bottom-0 right-1/4 w-80 h-80 bg-benin-yellow/10 rounded-full blur-3xl"></div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <!-- Logo et slogan -->
      <div class="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-white/10 pb-12">
        <div class="flex items-center mb-6 md:mb-0">
          <div class="w-12 h-12 bg-benin-green rounded-full flex items-center justify-center overflow-hidden relative mr-3">
            <div class="benin-pattern absolute inset-0"></div>
            <span class="text-white font-bold text-xl relative z-10">B</span>
          </div>
          <div>
            <h3 class="text-xl font-display font-bold text-white">Bénin Immersif</h3>
            <p class="text-white/70 text-sm">Voyages authentiques au cœur de l'Afrique</p>
          </div>
        </div>
        
        <div class="flex space-x-4">
          <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-benin-yellow/20 transition-colors duration-300">
            <i class="fab fa-facebook-f text-white"></i>
          </a>
          <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-benin-yellow/20 transition-colors duration-300">
            <i class="fab fa-instagram text-white"></i>
          </a>
          <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-benin-yellow/20 transition-colors duration-300">
            <i class="fab fa-twitter text-white"></i>
          </a>
          <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-benin-yellow/20 transition-colors duration-300">
            <i class="fab fa-youtube text-white"></i>
          </a>
        </div>
      </div>
      
      <!-- Liens et informations -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <!-- Colonne 1: À propos -->
        <div>
          <h4 class="text-benin-yellow font-display font-bold text-lg mb-4">À propos</h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-white/70 hover:text-benin-yellow transition-colors duration-300">Notre histoire</a></li>
            <li><a href="#" class="text-white/70 hover:text-benin-yellow transition-colors duration-300">Notre équipe</a></li>
            <li><a href="#" class="text-white/70 hover:text-benin-yellow transition-colors duration-300">Nos valeurs</a></li>
            <li><a href="#" class="text-white/70 hover:text-benin-yellow transition-colors duration-300">Témoignages</a></li>
          </ul>
        </div>
        
        <!-- Colonne 2: Destinations -->
        <div>
          <h4 class="text-benin-yellow font-display font-bold text-lg mb-4">Destinations</h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-white/70 hover:text-benin-yellow transition-colors duration-300">Cotonou & Porto-Novo</a></li>
            <li><a href="#" class="text-white/70 hover:text-benin-yellow transition-colors duration-300">Ouidah & Route des Esclaves</a></li>
            <li><a href="#" class="text-white/70 hover:text-benin-yellow transition-colors duration-300">Ganvié & Lac Nokoué</a></li>
            <li><a href="#" class="text-white/70 hover:text-benin-yellow transition-colors duration-300">Abomey & Palais Royaux</a></li>
            <li><a href="#" class="text-white/70 hover:text-benin-yellow transition-colors duration-300">Parc de la Pendjari</a></li>
          </ul>
        </div>
        
        <!-- Colonne 3: Voyages -->
        <div>
          <h4 class="text-benin-yellow font-display font-bold text-lg mb-4">Nos voyages</h4>
          <ul class="space-y-2">
            <li><a href="#" class="text-white/70 hover:text-benin-yellow transition-colors duration-300">Circuit culturel (7 jours)</a></li>
            <li><a href="#" class="text-white/70 hover:text-benin-yellow transition-colors duration-300">Immersion Vodun (5 jours)</a></li>
            <li><a href="#" class="text-white/70 hover:text-benin-yellow transition-colors duration-300">Safari & Nature (8 jours)</a></li>
            <li><a href="#" class="text-white/70 hover:text-benin-yellow transition-colors duration-300">Gastronomie béninoise (6 jours)</a></li>
            <li><a href="#" class="text-white/70 hover:text-benin-yellow transition-colors duration-300">Voyage sur mesure</a></li>
          </ul>
        </div>
        
        <!-- Colonne 4: Contact -->
        <div>
          <h4 class="text-benin-yellow font-display font-bold text-lg mb-4">Contact</h4>
          <ul class="space-y-3">
            <li class="flex items-start">
              <i class="fas fa-map-marker-alt text-benin-yellow mt-1 mr-3"></i>
              <span class="text-white/70">123 Avenue de la République<br>Cotonou, Bénin</span>
            </li>
            <li class="flex items-center">
              <i class="fas fa-phone text-benin-yellow mr-3"></i>
              <span class="text-white/70">+229 21 123 456</span>
            </li>
            <li class="flex items-center">
              <i class="fas fa-envelope text-benin-yellow mr-3"></i>
              <span class="text-white/70">contact@beninimmersif.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Newsletter -->
      <div class="bg-white/5 rounded-xl p-6 mb-12">
        <div class="md:flex items-center justify-between">
          <div class="mb-4 md:mb-0 md:mr-8">
            <h4 class="text-xl font-display font-bold text-white mb-2">Restez informé</h4>
            <p class="text-white/70">Recevez nos offres spéciales et actualités sur le Bénin</p>
          </div>
          <div class="flex flex-1 max-w-md">
            <input type="email" 
                   placeholder="Votre adresse email" 
                   class="flex-1 bg-white/10 border border-white/20 rounded-l-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-benin-yellow"
                   aria-label="Votre adresse email">
            <button class="bg-benin-yellow text-benin-green font-bold px-6 rounded-r-lg hover:bg-white transition-colors duration-300">
              S'abonner
            </button>
          </div>
        </div>
      </div>
      
      <!-- Copyright et liens légaux -->
      <div class="border-t border-white/10 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-white/50 text-sm mb-4 md:mb-0">
            &copy; {{ new Date().getFullYear() }} Bénin Immersif. Tous droits réservés.
          </p>
          <div class="flex flex-wrap gap-4 justify-center">
            <a href="#" class="text-sm text-white/50 hover:text-benin-yellow transition-colors">Mentions légales</a>
            <a href="#" class="text-sm text-white/50 hover:text-benin-yellow transition-colors">Politique de confidentialité</a>
            <a href="#" class="text-sm text-white/50 hover:text-benin-yellow transition-colors">Conditions de vente</a>
          </div>
        </div>
        <p class="text-xs text-white/30 text-center mt-4">
          Créé avec passion pour valoriser le tourisme béninois et promouvoir les richesses culturelles et naturelles du pays.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterSection'
}
</script>

<style scoped>
/* Styles spécifiques au footer */
</style> 