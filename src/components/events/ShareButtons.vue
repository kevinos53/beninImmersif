<template>
    <div class="share-buttons">
      <div class="relative inline-block dropdown">
        <button 
          @click="toggleDropdown" 
          class="inline-flex items-center px-4 py-3 text-sm font-medium text-white transition-all duration-300 border rounded-full border-white/40 hover:bg-white/10"
        >
          <i class="mr-2 fas fa-share-alt"></i>
          Partager
        </button>
        <div v-if="isOpen" class="absolute right-0 z-10 mt-2 overflow-hidden bg-white rounded-lg shadow-lg dropdown-menu w-52">
          <a 
            :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`" 
            target="_blank"
            class="flex items-center px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
          >
            <i class="mr-3 text-blue-600 fab fa-facebook-f"></i>
            Facebook
          </a>
          <a 
            :href="`https://twitter.com/intent/tweet?url=${encodeURIComponent(eventUrl)}&text=${encodeURIComponent(eventTitle)}`" 
            target="_blank"
            class="flex items-center px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
          >
            <i class="mr-3 text-blue-400 fab fa-twitter"></i>
            Twitter
          </a>
          <a 
            :href="`https://wa.me/?text=${encodeURIComponent(eventTitle + ' - ' + eventUrl)}`" 
            target="_blank"
            class="flex items-center px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100"
          >
            <i class="mr-3 text-green-500 fab fa-whatsapp"></i>
            WhatsApp
          </a>
          <button 
            @click="copyToClipboard"
            class="flex items-center w-full px-4 py-3 text-left text-gray-700 transition-colors hover:bg-gray-100"
          >
            <i class="mr-3 text-gray-500 fas fa-link"></i>
            {{ copied ? 'Copié !' : 'Copier le lien' }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  export default {
    name: 'ShareButtons',
    props: {
      eventUrl: {
        type: String,
        required: true
      },
      eventTitle: {
        type: String,
        required: true
      }
    },
    
    setup(props) {
      const isOpen = ref(false);
      const copied = ref(false);
      
      const toggleDropdown = () => {
        isOpen.value = !isOpen.value;
      };
      
      const closeDropdown = (e) => {
        if (!e.target.closest('.dropdown')) {
          isOpen.value = false;
        }
      };
      
      const copyToClipboard = () => {
        navigator.clipboard.writeText(props.eventUrl).then(() => {
          copied.value = true;
          setTimeout(() => {
            copied.value = false;
            isOpen.value = false;
          }, 2000);
        });
      };
      
      onMounted(() => {
        document.addEventListener('click', closeDropdown);
      });
      
      onUnmounted(() => {
        document.removeEventListener('click', closeDropdown);
      });
      
      return {
        isOpen,
        copied,
        toggleDropdown,
        copyToClipboard
      };
    }
  };
  </script>