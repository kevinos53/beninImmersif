<template>
  <div 
    class="fixed top-0 left-0 w-full h-1 bg-transparent z-50"
    :class="{ 'opacity-0': !showProgress, 'opacity-100': showProgress }"
  >
    <div 
      class="h-full bg-gradient-to-r from-benin-green via-benin-yellow to-benin-culture transition-all duration-200 ease-out"
      :style="{ width: `${scrollProgress}%` }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  data() {
    return {
      scrollProgress: 0,
      showProgress: false,
      scrollThreshold: 100, // Afficher la barre après avoir défilé de 100px
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      // Calcul de la progression du défilement
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Calcul du pourcentage de défilement
      this.scrollProgress = (scrollTop / (documentHeight - windowHeight)) * 100;
      
      // Afficher la barre uniquement après avoir défilé un peu
      this.showProgress = scrollTop > this.scrollThreshold;
    }
  }
}
</script>

<style scoped>
/* Animation pour l'apparition/disparition de la barre */
div {
  transition: opacity 0.3s ease;
}

/* Effet de brillance sur la barre */
div div {
  position: relative;
  overflow: hidden;
}

div div::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shine 2s infinite;
}

@keyframes shine {
  0% {
    left: -100%;
  }
  20% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}
</style> 