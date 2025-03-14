<template>
  <nav class="fixed top-0 left-0 z-40 w-full transition-all duration-300 bg-white shadow-md">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <a href="/" class="flex items-center">
          <div class="flex items-center justify-center w-10 h-10 transition-transform duration-300 rounded-full bg-benin-green hover:scale-110">
            <span class="font-bold text-white">B</span>
          </div>
          <div class="ml-3">
            <span class="text-xl font-bold text-benin-green font-display">Bénin Immersif</span>
          </div>
        </a>
        
        <!-- Desktop navigation -->
        <div class="items-center hidden space-x-6 lg:flex">
          <a v-for="(item, index) in navigationItems" 
             :key="index"
             @click.prevent="item.link ? navigateTo(item) : scrollToSection(item.section)"
             :href="item.link ? item.section : item.section"
             :class="[
               'relative py-2 text-gray-700 hover:text-benin-green transition-colors duration-300',
               activeSection === item.section ? 'text-benin-green font-medium nav-active' : ''
             ]">
            <span class="flex items-center">
              <i :class="['fas', item.icon, 'mr-1 text-xs opacity-70']"></i>
              {{ item.name }}
            </span>
            <span v-if="activeSection === item.section" 
                  class="absolute bottom-0 left-0 w-full h-0.5 bg-benin-green rounded-full transform origin-left animate-grow"></span>
          </a>
          <button @click="$emit('open-journey-map')"
                  class="px-4 py-2 font-medium rounded-md bg-benin-yellow text-benin-green hover:bg-benin-yellow-500 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
            <i class="mr-1 fas fa-map-marked-alt"></i> Explorer la carte
          </button>
        </div>
        
        <!-- Mobile menu button -->
        <div class="lg:hidden">
          <button @click="toggleMenu" 
                  class="text-gray-700 transition-colors duration-300 hover:text-benin-green focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile menu -->
    <div v-show="isMenuOpen" 
         class="transition-all duration-300 transform bg-white border-t lg:hidden"
         :class="isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'">
      <div class="px-4 py-3 space-y-1">
        <a v-for="(item, index) in navigationItems" 
           :key="index"
           @click.prevent="navigateTo(item)"
           :href="item.section"
           :class="[
             'block py-2 transition-colors duration-300 flex items-center',
             activeSection === item.section ? 'text-benin-green font-medium bg-benin-green/5 rounded-md pl-2' : 'text-gray-700 hover:text-benin-green'
           ]">
          <i :class="['fas', item.icon, 'mr-2 w-5 text-center']"></i>
          {{ item.name }}
          <i v-if="activeSection === item.section" class="ml-auto text-xs fas fa-circle text-benin-green"></i>
        </a>
        <button @click="openJourneyMapAndCloseMenu"
                class="flex items-center justify-center w-full px-4 py-2 mt-3 font-medium transition-all duration-300 rounded-md bg-benin-yellow text-benin-green hover:bg-benin-yellow-500">
          <i class="mr-2 fas fa-map-marked-alt"></i> Explorer la carte
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  emits: ['open-journey-map', 'navigate-to'],
  data() {
    return {
      isMenuOpen: false,
      activeSection: 'hero',
      navigationItems: [
        {name: 'Accueil', section: '/', icon: 'fa-home', link:true},
        {name: 'Evernements', section: '/evenements', icon: 'fa-calendar-alt', link:true},
        {name: 'Hébergement', section: '/hebergement', icon: 'fa-bed', link:true},
        {name: 'Blog', section: '/blog', icon: 'fa-blog', link:true},
        {name: 'Contact', section: '/#contact', icon: 'fa-envelope',link:true}
      ]
    }
  },
  mounted() {
    // Détecter la section active au défilement
    window.addEventListener('scroll', this.handleScroll);
    // Initialiser la section active au chargement
    this.$nextTick(() => {
      this.handleScroll();
    });
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      console.log('Menu toggled:', this.isMenuOpen);
    },
    navigateTo(item) {
      if(item.link){
        window.location.href = item.section;
      }else{
        this.activeSection = item.section;
      this.isMenuOpen = false;
      
      const targetElement = document.getElementById(item.section);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
      
      this.$emit('navigate-to', item.section);
      }
      
    },
    openJourneyMapAndCloseMenu() {
      this.isMenuOpen = false;
      this.$emit('open-journey-map');
    },
    handleScroll() {
      // Déterminer quelle section est visible
      const sections = this.navigationItems.map(item => item.section);
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offset = 150; // Ajuster selon le besoin
          
          if (rect.top <= offset && rect.bottom >= offset) {
            this.activeSection = section;
            break;
          }
        }
      }
    }
  }
}
</script>

<style scoped>
/* Styles de base pour la navigation */
.nav-active {
  position: relative;
}

@keyframes grow {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.animate-grow {
  animation: grow 0.3s ease-out forwards;
}
</style>