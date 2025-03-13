<template>
  <section class="relative overflow-hidden h-[70vh] sm:h-[80vh] md:h-[90vh] lg:h-[100vh]">
    <div class="absolute inset-0">
      <div ref="swiperContainer" class="h-full swiper-container">
        <div class="swiper-wrapper">
          <div v-for="slide in slides" :key="slide.id" class="relative h-full swiper-slide">
            <!-- Image sans effet de zoom -->
            <div class="absolute inset-0">
              <img
                :src="slide.image.url"
                :alt="slide.image.alt"
                class="object-cover w-full h-full"
              >
            </div>

            <!-- Overlay avec dégradé optimisé pour un bon équilibre entre visibilité de l'image et lisibilité du texte -->
            <div 
              class="absolute inset-0" 
              :class="[
                slide.ombrageRenforcé 
                  ? 'bg-gradient-to-r from-black/40 via-black/20 to-transparent' 
                  : 'bg-gradient-to-r from-black/30 via-black/10 to-transparent'
              ]"
            >
              <!-- Superposition légère de l'ombrage coloré pour conserver l'identité visuelle -->
              <div 
                class="absolute inset-0" 
                :class="[
                  slide.ombrageRenforcé 
                    ? 'bg-gradient-to-r from-spanish-red-900/30 via-spanish-red-800/20 to-spanish-red-700/10' 
                    : 'bg-gradient-to-r from-spanish-red-900/25 via-spanish-red-800/15 to-spanish-red-700/5'
                ]"
              ></div>
              
              <!-- Particules décoratives - visibles uniquement sur desktop -->
              <div class="hidden md:block particles-container"></div>

              <div class="container flex items-center justify-start h-full px-4 mx-auto">
                <div class="relative z-20 w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl text-white content-animation" data-swiper-parallax="-300">
                  <!-- Badge avec effet brillant -->
                  <div class="overflow-hidden badge-container" data-swiper-parallax="-400">
                    <span class="inline-block px-3 py-1 md:px-6 md:py-2 mb-3 md:mb-6 text-xs md:text-sm font-semibold tracking-wider uppercase rounded-full bg-spanish-red-600 shine-effect">
                      {{ slide.sousTitre }}
                    </span>
                  </div>

                  <!-- Titre avec animation de révélation -->
                  <h1 class="mb-3 md:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight md:leading-none font-playfair title-reveal" data-swiper-parallax="-200">
                    <span class="block">{{ slide.titre }}</span>
                  </h1>

                  <!-- Ligne décorative -->
                  <div class="w-16 md:w-24 h-1 mb-3 md:mb-6 bg-gradient-to-r from-spanish-red-500 to-spanish-yellow-500 line-animation" data-swiper-parallax="-150"></div>

                  <!-- Description avec animation de fondu et texte plus lisible -->
                  <p class="max-w-full md:max-w-xl mb-4 md:mb-8 text-sm sm:text-base md:text-lg lg:text-xl text-white fade-in-animation line-clamp-3 md:line-clamp-none" data-swiper-parallax="-100">
                    {{ slide.description }}
                  </p>

                  <!-- Boutons avec animations au survol -->
                  <div class="flex flex-col sm:flex-row gap-4 buttons-container" data-swiper-parallax="-50">
                    <a
                      :href="slide.bouton.lien"
                      class="flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-semibold text-center text-white transition-all duration-500 transform rounded-full group bg-gradient-to-r from-spanish-red-600 to-spanish-yellow-500 hover:shadow-xl hover:-translate-y-0.5 primary-button-animation"
                    >
                      <span>{{ slide.bouton.texte }}</span>
                      <i class="transition-transform duration-500 fas fa-arrow-right group-hover:translate-x-1"></i>
                    </a>
                    <div class="hidden sm:flex hero-achievement animate-float">
                      <div class="achievement-icon flex items-center justify-center h-10 w-10 md:h-12 md:w-12 bg-white/20 backdrop-blur-sm rounded-full text-spanish-yellow-500">
                        <i class="fa-solid fa-check-circle text-lg md:text-xl"></i>
                      </div>
                      <div class="achievement-content ml-3">
                        <h3 class="text-sm md:text-base font-semibold">Destination authentique</h3>
                        <p class="text-xs md:text-sm text-white/90">Expérience culturelle inoubliable</p>
                      </div>
                    </div>
                  </div>

                  <!-- Animation de route - visible uniquement sur grands écrans -->
                  <div class="hidden lg:block route-animation absolute -bottom-16 right-0 w-full max-w-xl opacity-30">
                    <svg width="100%" height="100%" viewBox="0 0 1200 200" preserveAspectRatio="none">
                      <path id="route-path" d="M0,100 C300,25 900,175 1200,100" stroke="white" stroke-width="6" fill="none" stroke-linecap="round"/>
                    </svg>
                  </div>

                  <!-- Indicateur de défilement - visible uniquement sur desktop -->
                  <div class="absolute hidden lg:block mt-16 -bottom-24 scroll-indicator" data-swiper-parallax="0">
                    <div class="flex items-center gap-3 text-sm text-white/70">
                      <span>Découvrir plus</span>
                      <div class="w-6 h-10 border-2 rounded-full border-white/30">
                        <div class="w-1.5 h-1.5 mx-auto mt-2 bg-white rounded-full animate-bounce"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Barre de progression -->
            <div class="absolute bottom-0 left-0 z-10 w-full h-1 bg-white/20">
              <div class="h-full bg-spanish-yellow-500 progress-bar"></div>
            </div>
          </div>
        </div>

        <!-- Navigation avec design premium - adaptée pour mobile -->
        <div class="absolute inset-0 z-10 pointer-events-none navigation-wrapper">
          <div class="container relative h-full mx-auto">
            <!-- Boutons plus petits sur mobile, plus grands sur desktop -->
            <div class="swiper-button-next !w-10 !h-10 md:!w-12 md:!h-12 lg:!w-14 lg:!h-14 !bg-spanish-red-600/90 hover:!bg-spanish-red-700 !rounded-full !text-white after:!text-sm md:after:!text-lg lg:after:!text-xl transition-all duration-500 hover:!scale-110 backdrop-blur-md !right-2 sm:!right-4 md:!right-6 lg:!right-10 pointer-events-auto nav-button-animation"></div>
            <div class="swiper-button-prev !w-10 !h-10 md:!w-12 md:!h-12 lg:!w-14 lg:!h-14 !bg-spanish-red-600/90 hover:!bg-spanish-red-700 !rounded-full !text-white after:!text-sm md:after:!text-lg lg:after:!text-xl transition-all duration-500 hover:!scale-110 backdrop-blur-md !left-2 sm:!left-4 md:!left-6 lg:!left-10 pointer-events-auto nav-button-animation"></div>
          </div>
        </div>

        <!-- Pagination avec design amélioré - position adaptée pour mobile -->
        <div class="swiper-pagination !bottom-4 md:!bottom-8 !z-20"></div>

        <!-- Compteur de slides - visible uniquement sur tablette et desktop -->
        <div class="absolute z-20 items-center hidden md:flex gap-2 bottom-4 md:bottom-8 right-4 md:right-8 text-white/80 slide-counter">
          <span class="text-xl md:text-2xl font-bold current-slide">1</span>
          <span class="w-5 md:w-8 h-px mx-1 bg-white/50"></span>
          <span class="text-base md:text-lg text-white/60 total-slides">{{ slides.length }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
  /* Animations progressives et responsives */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes lineGrow {
    from { width: 0; }
    to { width: 100%; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes shine {
    0% { background-position: -100px; }
    60%, 100% { background-position: 320px; }
  }

  /* Animation des éléments du slider */
  .animate-title {
    animation: slideInRight 0.8s ease forwards;
  }

  .animate-badge {
    animation: fadeIn 0.6s ease forwards;
  }

  .animate-line {
    animation: lineGrow 1s ease-out forwards;
  }

  .animate-fade {
    animation: fadeIn 1s ease-out 0.3s forwards;
    opacity: 0;
  }

  .animate-buttons {
    animation: fadeIn 1s ease-out 0.5s forwards;
    opacity: 0;
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .shine-effect {
    position: relative;
    overflow: hidden;
  }

  .shine-effect::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
    background-size: 200px 100%;
    animation: shine 3s infinite linear;
  }

  /* Optimisations pour le chargement des polices */
  @media (max-width: 640px) {
    .text-3xl {
      line-height: 1.2;
    }
  }

  /* Amélioration de la lisibilité sur mobile */
  @media (max-width: 640px) {
    .swiper-pagination {
      bottom: 10px !important;
    }

    .swiper-pagination-bullet {
      width: 6px !important;
      height: 6px !important;
    }

    /* Réduire la taille des boutons de navigation sur les très petits écrans */
    .swiper-button-next,
    .swiper-button-prev {
      transform: scale(0.8);
    }
  }

  /* Optimisations pour les grands écrans */
  @media (min-width: 1536px) {
    .title-reveal {
      font-size: 5rem;
    }
  }
</style>

<script>
import { onMounted, ref } from 'vue';
import Swiper from 'swiper';
import { Autoplay, EffectFade, Navigation, Pagination, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default {
  setup() {
    const swiperContainer = ref(null);
    const swiper = ref(null);

    const slides = [
      {
        id: '1',
        titre: 'Découvrez le Bénin',
        sousTitre: 'Joyau de l\'Afrique de l\'Ouest',
        description: 'Explorez la richesse culturelle et la beauté naturelle du Bénin, berceau du Vodun et terre d\'histoire. Des plages de sable fin aux parcs nationaux luxuriants, le Bénin vous offre une expérience authentique et inoubliable.',
        bouton: {
          texte: 'Explorer maintenant',
          lien: '/destinations',
          variante: 'primary'
        },
        image: {
          url: '/img/benin-plage.jpg',
          alt: 'Plages paradisiaques du Bénin'
        },
        ordre: 1,
        actif: true,
        ombrageRenforcé: true
      },
      {
        id: '2',
        titre: 'Patrimoine Culturel',
        sousTitre: 'Traditions & Histoire',
        description: 'Immergez-vous dans la riche histoire du Bénin, de la Route des Esclaves aux palais royaux d\'Abomey. Découvrez les cérémonies traditionnelles et l\'artisanat local qui font la renommée de ce pays fascinant.',
        bouton: {
          texte: 'Découvrir la culture',
          lien: '/culture',
          variante: 'primary'
        },
        image: {
          url: '/img/benin-culture.webp',
          alt: 'Patrimoine culturel du Bénin'
        },
        ordre: 2,
        ombrageRenforcé: false
      },
      {
        id: '3',
        titre: 'Parc National de la Pendjari',
        sousTitre: 'Biodiversité exceptionnelle',
        description: 'Partez à la rencontre de la faune sauvage africaine dans l\'un des derniers sanctuaires naturels de l\'Afrique de l\'Ouest. Lions, éléphants, antilopes et plus de 300 espèces d\'oiseaux vous attendent dans un cadre préservé.',
        bouton: {
          texte: 'Réserver un safari',
          lien: '/safaris',
          variante: 'primary'
        },
        image: {
          url: '/img/benin-pendjari.webp',
          alt: 'Parc National de la Pendjari au Bénin'
        },
        ordre: 3,
        ombrageRenforcé: true
      }
    ];

    const initSwiper = () => {
      // Configuration adaptative du Swiper en fonction de la taille d'écran
      const options = {
        modules: [Autoplay, EffectFade, Navigation, Pagination, Parallax],
        loop: true,
        speed: 1000,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        effect: window.innerWidth < 768 ? 'slide' : 'fade', // Effet fade uniquement sur desktop
        fadeEffect: {
          crossFade: true
        },
        parallax: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet: function (index, className) {
            return `<span class="${className} !w-2.5 !h-2.5 md:!w-3 md:!h-3 !bg-white/40 !opacity-100 !mx-1 md:!mx-2"></span>`;
          },
        },
        on: {
          init: function () {
            this.el.querySelector('.progress-bar').style.width = '0%';
            this.el.querySelector('.current-slide').textContent = '1';
            this.autoplay.start();
            initAnimations();
          },
          slideChangeTransitionStart: function () {
            // Réinitialiser la barre de progression
            this.el.querySelector('.progress-bar').style.width = '0%';

            // Mettre à jour le compteur de slide
            const currentSlide = this.realIndex + 1;
            this.el.querySelector('.current-slide').textContent = currentSlide;

            // Réinitialiser et déclencher les animations pour la slide active
            resetAnimations();
            setTimeout(() => {
              initAnimations();
            }, 150);
          },
          autoplayTimeLeft: function (swiper, time, progress) {
            // Mettre à jour la barre de progression
            swiper.el.querySelector('.progress-bar').style.width = `${(1 - progress) * 100}%`;
          }
        },
        breakpoints: {
          // Paramètres spécifiques pour mobile
          320: {
            effect: 'slide',
            autoplay: {
              delay: 4000,
            }
          },
          // Paramètres spécifiques pour tablette
          768: {
            effect: 'fade',
            fadeEffect: {
              crossFade: true
            },
            autoplay: {
              delay: 5000,
            }
          },
          // Paramètres spécifiques pour desktop
          1024: {
            effect: 'fade',
            fadeEffect: {
              crossFade: true
            },
            autoplay: {
              delay: 6000,
            }
          }
        }
      };

      swiper.value = new Swiper(swiperContainer.value, options);

      // Gestion du redimensionnement pour adapter les animations
      window.addEventListener('resize', () => {
        updateResponsiveFeatures();
      });

      updateResponsiveFeatures();
    };

    const updateResponsiveFeatures = () => {
      // Adapter les fonctionnalités en fonction de la taille d'écran
      const isMobile = window.innerWidth < 768;

      // Désactiver certaines animations sur mobile pour améliorer les performances
      const particlesContainers = document.querySelectorAll('.particles-container');
      particlesContainers.forEach(container => {
        container.style.display = isMobile ? 'none' : 'block';
      });

      // Ajuster la vitesse d'autoplay en fonction de la taille d'écran
      if (swiper.value) {
        swiper.value.params.autoplay.delay = isMobile ? 4000 : 6000;
        swiper.value.update();
      }
    };

    const initAnimations = () => {
      const activeSlide = document.querySelector('.swiper-slide-active');
      if (!activeSlide) return;

      // Appliquer les classes d'animation aux éléments de la slide active
      const title = activeSlide.querySelector('.title-reveal');
      if (title) title.classList.add('animate-title');

      const badge = activeSlide.querySelector('.badge-container');
      if (badge) badge.classList.add('animate-badge');

      const line = activeSlide.querySelector('.line-animation');
      if (line) line.classList.add('animate-line');

      const description = activeSlide.querySelector('.fade-in-animation');
      if (description) description.classList.add('animate-fade');

      const buttons = activeSlide.querySelector('.buttons-container');
      if (buttons) buttons.classList.add('animate-buttons');
    };

    const resetAnimations = () => {
      // Réinitialiser toutes les animations
      document.querySelectorAll('.title-reveal').forEach(el => el.classList.remove('animate-title'));
      document.querySelectorAll('.badge-container').forEach(el => el.classList.remove('animate-badge'));
      document.querySelectorAll('.line-animation').forEach(el => el.classList.remove('animate-line'));
      document.querySelectorAll('.fade-in-animation').forEach(el => el.classList.remove('animate-fade'));
      document.querySelectorAll('.buttons-container').forEach(el => el.classList.remove('animate-buttons'));
    };

    onMounted(() => {
      initSwiper();
    });

    return {
      slides,
      swiperContainer
    };
  }
};
</script>