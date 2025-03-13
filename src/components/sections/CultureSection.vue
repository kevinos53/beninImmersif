<template>
  <section id="culture" class="relative py-20 overflow-hidden parallax-section">
    <!-- Background patterns -->
    <div class="absolute inset-0 top-0 w-full h-full opacity-20 parallax-bg">
      <img src="/img/festival-vodun-panorama.webp" alt="Motifs Vodun" class="absolute top-0 left-0 object-cover w-full h-full opacity-30 blend-multiply">
    </div>
    <div class="absolute top-0 right-0 w-1/3 rounded-bl-full h-1/3 bg-vodou/10"></div>
    <div class="absolute bottom-0 left-0 w-1/4 rounded-tr-full h-1/4 bg-benin-yellow/10"></div>
    
    <!-- Particules flottantes -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <div class="particle bg-vodou-light"></div>
      <div class="particle bg-benin-yellow"></div>
      <div class="particle bg-spirit"></div>
      <div class="particle bg-benin-green"></div>
      <div class="particle bg-vodou"></div>
    </div>
    
    <div class="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="mb-16 text-center animate-on-enter">
        <div class="inline-block p-1 px-3 mb-4 transition-transform transform rounded-lg bg-vodou/20 hover:scale-105">
          <span class="font-medium text-vodou">Patrimoine & Traditions</span>
        </div>
        <h2 class="mb-6 text-3xl font-bold text-gray-900 section-title sm:text-4xl lg:text-5xl font-display">
          Découvrez la <span class="relative text-vodou">
            richesse culturelle
            <svg class="absolute bottom-0 left-0 w-full h-2 text-benin-yellow" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0,0 C25,10 75,10 100,0" fill="none" stroke="currentColor" stroke-width="3"></path>
            </svg>
          </span> du Bénin
        </h2>
        <p class="max-w-3xl mx-auto text-lg text-gray-700">
          Berceau du Vodun et ancien royaume du Dahomey, le Bénin vous invite à explorer son patrimoine unique, mélange fascinant d'histoire, de spiritualité et de traditions vivantes.
        </p>
      </div>
      
      <!-- Featured Cultural Elements -->
      <div class="grid grid-cols-1 gap-8 mb-16 md:grid-cols-3">
        <!-- Card 1: Vodun -->
        <div class="overflow-hidden transition-all duration-300 transform bg-white shadow-lg rounded-xl hover:-translate-y-2 hover:shadow-2xl card-3d animate-on-enter">
          <div class="relative h-56 overflow-hidden group">
            <img src="/img/ceremonie-vodun.webp" alt="Cérémonie Vodun" class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-vodou/40 group-hover:opacity-100"></div>
            <div class="absolute text-white bottom-4 left-4">
              <h3 class="text-xl font-bold font-display">Le Vodun</h3>
              <p class="text-sm text-white/80">Spiritualité ancestrale</p>
            </div>
          </div>
          <div class="p-6 card-3d-content">
            <p class="mb-4 text-gray-700">
              Religion traditionnelle née au Bénin, le Vodun est un système de croyances complexe honorant les forces de la nature et les ancêtres. Découvrez ses rituels, ses divinités et son influence mondiale.
            </p>
            <a href="#" class="inline-flex items-center font-medium transition-colors transition-transform duration-300 transform text-vodou hover:text-benin-yellow hover:translate-x-2">
              <span>Explorer les cérémonies</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Card 2: Royaumes -->
        <div class="overflow-hidden transition-all duration-300 transform bg-white shadow-lg rounded-xl hover:-translate-y-2 hover:shadow-2xl card-3d animate-on-enter">
          <div class="relative h-56 overflow-hidden group">
            <img src="/img/palais-abomey.webp" alt="Palais royaux d'Abomey" class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-spirit/40 group-hover:opacity-100"></div>
            <div class="absolute text-white bottom-4 left-4">
              <h3 class="text-xl font-bold font-display">Royaumes historiques</h3>
              <p class="text-sm text-white/80">Héritage impérial</p>
            </div>
          </div>
          <div class="p-6 card-3d-content">
            <p class="mb-4 text-gray-700">
              Le puissant royaume du Dahomey a marqué l'histoire de l'Afrique de l'Ouest. Visitez les palais royaux d'Abomey, classés au patrimoine mondial de l'UNESCO, et découvrez l'histoire fascinante des rois et des amazones.
            </p>
            <a href="#" class="inline-flex items-center font-medium transition-colors transition-transform duration-300 transform text-vodou hover:text-benin-yellow hover:translate-x-2">
              <span>Visiter les palais royaux</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Card 3: Artisanat -->
        <div class="overflow-hidden transition-all duration-300 transform bg-white shadow-lg rounded-xl hover:-translate-y-2 hover:shadow-2xl card-3d animate-on-enter">
          <div class="relative h-56 overflow-hidden group">
            <img src="/img/atelier-tissage-traditionnel.webp" alt="Artisanat béninois" class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div class="absolute inset-0 transition-opacity duration-300 opacity-0 bg-earth/40 group-hover:opacity-100"></div>
            <div class="absolute text-white bottom-4 left-4">
              <h3 class="text-xl font-bold font-display">Artisanat & Savoir-faire</h3>
              <p class="text-sm text-white/80">Traditions vivantes</p>
            </div>
          </div>
          <div class="p-6 card-3d-content">
            <p class="mb-4 text-gray-700">
              L'artisanat béninois est reconnu pour sa richesse et sa diversité : sculptures sur bois, bronzes, textiles appliqués, poteries et perles. Rencontrez les artisans et découvrez leurs techniques ancestrales.
            </p>
            <a href="#" class="inline-flex items-center font-medium transition-colors transition-transform duration-300 transform text-vodou hover:text-benin-yellow hover:translate-x-2">
              <span>Rencontrer les artisans</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Cultural Journey Timeline -->
      <div class="mb-20">
        <h3 class="mb-12 text-2xl font-bold text-center md:text-3xl font-display animate-on-enter">
          <span class="relative inline-block">
            Itinéraire culturel recommandé
            <div class="absolute left-0 right-0 h-1 -bottom-2 bg-gradient-to-r from-transparent via-benin-yellow to-transparent"></div>
          </span>
        </h3>
        
        <div class="relative">
          <!-- Timeline line -->
          <div class="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-vodou/30 transform md:translate-x-[-0.5px]"></div>
          
          <div class="space-y-12 timeline-container">
            <!-- Item 1 -->
            <div class="relative pl-16 timeline-item md:pl-0 md:flex md:justify-between animate-on-enter">
              <div class="timeline-marker"></div>
              <div class="md:w-5/12 md:pr-16 md:text-right" ref="timelineItem1">
                <span class="font-medium text-benin-yellow">Jour 1-2</span>
                <h3 class="mb-2 text-xl font-bold font-display">Cotonou & Porto-Novo</h3>
                <p class="text-gray-700">
                  Découverte des marchés colorés, de l'artisanat local et de l'architecture coloniale dans les deux plus grandes villes du pays.
                </p>
              </div>
              <div class="hidden mt-6 md:block md:w-5/12 md:mt-0 md:pl-16">
                <div class="overflow-hidden bg-white shadow-md rounded-xl hover-reveal group">
                  <img src="/img/cotonou-marche.webp" alt="Cotonou" class="object-cover w-full h-48 transition-transform duration-700 group-hover:scale-110">
                </div>
              </div>
            </div>
            
            <!-- Item 2 -->
            <div class="relative pl-16 timeline-item md:pl-0 md:flex md:justify-between animate-on-enter">
              <div class="timeline-marker"></div>
              <div class="hidden md:block md:w-5/12 md:pr-16">
                <div class="overflow-hidden bg-white shadow-md rounded-xl hover-reveal group">
                  <img src="/img/ouidah-temple-pythons.webp" alt="Ouidah" class="object-cover w-full h-48 transition-transform duration-700 group-hover:scale-110">
                </div>
              </div>
              <div class="md:w-5/12 md:pl-16" ref="timelineItem2">
                <span class="font-medium text-vodou">Jour 3-4</span>
                <h3 class="mb-2 text-xl font-bold font-display">Ouidah & Route des Esclaves</h3>
                <p class="text-gray-700">
                  Visite du temple des pythons, de la Porte du Non-Retour et immersion dans l'univers mystique du Vodun.
                </p>
              </div>
            </div>
            
            <!-- Item 3 -->
            <div class="relative pl-16 timeline-item md:pl-0 md:flex md:justify-between animate-on-enter">
              <div class="timeline-marker"></div>
              <div class="md:w-5/12 md:pr-16 md:text-right" ref="timelineItem3">
                <span class="font-medium text-ocean">Jour 5-6</span>
                <h3 class="mb-2 text-xl font-bold font-display">Ganvié & Grand-Popo</h3>
                <p class="text-gray-700">
                  Navigation dans la cité lacustre et détente sur les plages de cocotiers à Grand-Popo.
                </p>
              </div>
              <div class="hidden mt-6 md:block md:w-5/12 md:mt-0 md:pl-16">
                <div class="overflow-hidden bg-white shadow-md rounded-xl hover-reveal group">
                  <img src="/img/ganvie-navigation.webp" alt="Ganvié" class="object-cover w-full h-48 transition-transform duration-700 group-hover:scale-110">
                </div>
              </div>
            </div>
            
            <!-- Item 4 -->
            <div class="relative pl-16 timeline-item md:pl-0 md:flex md:justify-between animate-on-enter">
              <div class="timeline-marker"></div>
              <div class="hidden md:block md:w-5/12 md:pr-16">
                <div class="overflow-hidden bg-white shadow-md rounded-xl hover-reveal group">
                  <img src="/img/tata-somba-natitingou.webp" alt="Abomey" class="object-cover w-full h-48 transition-transform duration-700 group-hover:scale-110">
                </div>
              </div>
              <div class="md:w-5/12 md:pl-16" ref="timelineItem4">
                <span class="font-medium text-earth">Jour 7-8</span>
                <h3 class="mb-2 text-xl font-bold font-display">Abomey & Natitingou</h3>
                <p class="text-gray-700">
                  Exploration des palais royaux d'Abomey et découverte de la culture Somba dans le nord.
                </p>
              </div>
            </div>
            
            <!-- Item 5 -->
            <div class="relative pl-16 timeline-item md:pl-0 md:flex md:justify-between animate-on-enter">
              <div class="timeline-marker"></div>
              <div class="md:w-5/12 md:pr-16 md:text-right" ref="timelineItem5">
                <span class="font-medium text-benin-green">Jour 9-11</span>
                <h3 class="mb-2 text-xl font-bold font-display">Parc National de la Pendjari</h3>
                <p class="text-gray-700">
                  Safari pour observer la faune africaine dans l'un des plus beaux parcs d'Afrique de l'Ouest.
                </p>
              </div>
              <div class="hidden mt-6 md:block md:w-5/12 md:mt-0 md:pl-16">
                <div class="overflow-hidden bg-white shadow-md rounded-xl hover-reveal group">
                  <img src="/img/safari-photo-pendjari.webp" alt="Pendjari" class="object-cover w-full h-48 transition-transform duration-700 group-hover:scale-110">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Testimonials -->
      <div class="my-20">
        <h3 class="mb-12 text-2xl font-bold text-center md:text-3xl font-display animate-on-enter">
          <span class="relative inline-block">
            Ce que disent nos voyageurs
            <div class="absolute left-0 right-0 h-1 -bottom-2 bg-gradient-to-r from-transparent via-spirit to-transparent"></div>
          </span>
        </h3>
        
        <!-- Testimonial carousel -->
        <div class="relative" ref="testimonialCarousel">
          <div class="relative overflow-hidden rounded-3xl">
            <div class="flex transition-transform duration-700 ease-out animate-on-enter" :style="`transform: translateX(-${activeSlide * 100}%)`">
              <!-- Testimonial 1 -->
              <div class="flex-shrink-0 w-full p-4">
                <div class="relative max-w-3xl p-8 mx-auto bg-white border shadow-xl rounded-2xl md:p-10 backdrop-blur-sm bg-white/90 border-white/20">
                  <div class="absolute flex items-center justify-center w-12 h-12 rounded-full shadow-lg -top-5 -left-5 bg-benin-yellow">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-benin-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  
                  <div class="flex flex-col gap-8 md:flex-row">
                    <div class="md:w-1/3">
                      <div class="w-24 h-24 mx-auto mb-4 overflow-hidden border-4 rounded-full md:mx-0 border-vodou/20">
                        <!-- À remplacer par une vraie image -->
                        <img src="https://randomuser.me/api/portraits/women/56.jpg" alt="Sophie Martin" class="object-cover w-full h-full">
                      </div>
                      <div class="text-center md:text-left">
                        <h4 class="font-bold">Sophie Martin</h4>
                        <p class="text-sm text-gray-600">Paris, France</p>
                        <div class="flex justify-center mt-2 md:justify-start text-benin-yellow">
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                        </div>
                      </div>
                    </div>
                    
                    <div class="md:w-2/3">
                      <p class="relative mb-4 italic text-gray-700">
                        <span class="absolute text-5xl -top-4 -left-2 text-benin-yellow/20">"</span>
                        "Mon voyage au Bénin a été bien plus qu'une simple découverte touristique - c'était une véritable immersion dans une culture riche et fascinante. La cérémonie Vodun à laquelle j'ai pu assister à Ouidah restera à jamais gravée dans ma mémoire. Les guides étaient exceptionnels, partageant non seulement leurs connaissances mais aussi leur passion pour leur pays."
                      </p>
                      <p class="text-gray-600">
                        Circuit réalisé : <span class="font-medium text-vodou">Trésors du Bénin (11 jours)</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Testimonial 2 -->
              <div class="flex-shrink-0 w-full p-4">
                <div class="relative max-w-3xl p-8 mx-auto bg-white border shadow-xl rounded-2xl md:p-10 backdrop-blur-sm bg-white/90 border-white/20">
                  <div class="absolute flex items-center justify-center w-12 h-12 rounded-full shadow-lg -top-5 -left-5 bg-benin-yellow">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-benin-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  
                  <div class="flex flex-col gap-8 md:flex-row">
                    <div class="md:w-1/3">
                      <div class="w-24 h-24 mx-auto mb-4 overflow-hidden border-4 rounded-full md:mx-0 border-vodou/20">
                        <!-- À remplacer par une vraie image -->
                        <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="John Thompson" class="object-cover w-full h-full">
                      </div>
                      <div class="text-center md:text-left">
                        <h4 class="font-bold">John Thompson</h4>
                        <p class="text-sm text-gray-600">Toronto, Canada</p>
                        <div class="flex justify-center mt-2 md:justify-start text-benin-yellow">
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star"></i>
                          <i class="fas fa-star-half-alt"></i>
                        </div>
                      </div>
                    </div>
                    
                    <div class="md:w-2/3">
                      <p class="relative mb-4 italic text-gray-700">
                        <span class="absolute text-5xl -top-4 -left-2 text-benin-yellow/20">"</span>
                        "Le safari dans le Parc de la Pendjari a dépassé toutes mes attentes ! Observer les éléphants au point d'eau au lever du soleil était magique. J'ai aussi particulièrement apprécié notre séjour à Ganvié, cette Venise africaine unique. Le Bénin offre une diversité impressionnante de paysages et de rencontres authentiques."
                      </p>
                      <p class="text-gray-600">
                        Circuit réalisé : <span class="font-medium text-benin-green">Nature & Culture (9 jours)</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Navigation arrows -->
            <button 
              @click="prevSlide" 
              class="absolute z-10 flex items-center justify-center w-12 h-12 transition-colors duration-300 transform -translate-y-1/2 bg-white rounded-full shadow-lg top-1/2 left-4 text-vodou hover:bg-benin-yellow hover:text-benin-green"
              aria-label="Témoignage précédent">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              @click="nextSlide" 
              class="absolute z-10 flex items-center justify-center w-12 h-12 transition-colors duration-300 transform -translate-y-1/2 bg-white rounded-full shadow-lg top-1/2 right-4 text-vodou hover:bg-benin-yellow hover:text-benin-green"
              aria-label="Témoignage suivant">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <!-- Dots -->
          <div class="flex justify-center mt-6 space-x-2">
            <button 
              v-for="(_, index) in 2" 
              :key="index"
              @click="activeSlide = index"
              :class="{'bg-vodou': activeSlide === index, 'bg-gray-300': activeSlide !== index}"
              class="w-3 h-3 transition-colors rounded-full"
              :aria-label="`Témoignage ${index + 1}`">
            </button>
          </div>
        </div>
      </div>
      
      <!-- CTA Banner -->
      <div class="relative mt-32 overflow-hidden rounded-2xl animate-on-enter">
        <div class="absolute inset-0">
          <img src="/img/crepuscule-benin.webp" alt="Expérience culturelle au Bénin" class="object-cover w-full h-full">
          <div class="absolute inset-0 bg-vodou/70"></div>
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.4),transparent_70%)]"></div>
        </div>
        <div class="relative p-8 text-center md:p-12">
          <h3 class="mb-4 text-2xl font-bold text-white font-display md:text-3xl">
            <span class="inline-block transition-transform duration-300 transform hover:scale-105">
              Créez votre expérience unique au Bénin
            </span>
          </h3>
          <p class="max-w-2xl mx-auto mb-8 text-white/90">
            Nos experts locaux vous aident à concevoir un voyage sur mesure qui correspond parfaitement à vos envies et à votre rythme.
          </p>
          <a href="#contact" @click.prevent="$emit('navigate-to', 'contact')" class="relative inline-block px-8 py-4 overflow-hidden font-bold transition-colors duration-300 transform rounded-lg bg-benin-yellow text-benin-green hover:bg-white hover:-translate-y-1 hover:shadow-xl group">
            <span class="relative z-10">Planifier mon voyage</span>
            <span class="absolute inset-0 transition-transform duration-300 translate-y-full bg-white group-hover:translate-y-0 ease-bounce-in-out"></span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CultureSection',
  emits: ['navigate-to'],
  data() {
    return {
      activeSlide: 0
    }
  },
  mounted() {
    this.initAnimations();
    this.init3DCards();
  },
  methods: {
    initAnimations() {
      // Animation des éléments de la timeline au scroll
      if (window.gsap && window.ScrollTrigger) {
        const timelineItems = [
          this.$refs.timelineItem1,
          this.$refs.timelineItem2,
          this.$refs.timelineItem3,
          this.$refs.timelineItem4,
          this.$refs.timelineItem5
        ];
        
        timelineItems.forEach((item, index) => {
          if (item) {
            gsap.from(item, {
              opacity: 0,
              y: 30,
              duration: 0.8,
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none none'
              }
            });
          }
        });
        
        // Animation des cartes
        gsap.from('.card-3d', {
          opacity: 0,
          y: 50,
          stagger: 0.2,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.card-3d',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
        
        // Parallaxe pour les images
        gsap.utils.toArray('.hover-reveal').forEach(card => {
          gsap.to(card.querySelector('img'), {
            y: -20,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          });
        });
      }
    },
    
    init3DCards() {
      // Effet 3D sur les cartes
      document.querySelectorAll('.card-3d').forEach(card => {
        card.addEventListener('mousemove', e => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const angleX = (y - centerY) / 15;
          const angleY = (centerX - x) / 15;
          
          card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
          
          // Déplacer le contenu pour renforcer l'effet 3D
          const content = card.querySelector('.card-3d-content');
          if (content) {
            content.style.transform = `translateZ(40px)`;
          }
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
          
          const content = card.querySelector('.card-3d-content');
          if (content) {
            content.style.transform = 'translateZ(0)';
          }
        });
      });
    },
    
    prevSlide() {
      this.activeSlide = this.activeSlide === 0 ? 1 : 0;
    },
    
    nextSlide() {
      this.activeSlide = this.activeSlide === 1 ? 0 : 1;
    }
  }
}
</script>

<style scoped>
.timeline-marker {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--benin-green);
  border: 3px solid var(--benin-yellow);
  position: absolute;
  left: -12px;
  top: 10px;
  box-shadow: 0 0 0 4px rgba(0, 135, 81, 0.3);
  z-index: 10;
}

.timeline-marker::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(252, 209, 22, 0.3);
  border-radius: 50%;
  animation: ripple 2s linear infinite;
}

.timeline-item {
  position: relative;
}

@media (min-width: 768px) {
  .timeline-marker {
    left: 50%;
    transform: translateX(-50%);
  }
}

@keyframes ripple {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}

/* Particules flottantes */
.particle {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  opacity: 0.2;
  filter: blur(10px);
  animation: float 20s infinite linear;
}

.particle:nth-child(1) {
  top: 10%;
  left: 20%;
  animation-duration: 25s;
  width: 30px;
  height: 30px;
}

.particle:nth-child(2) {
  top: 60%;
  left: 80%;
  animation-duration: 30s; 
  width: 25px;
  height: 25px;
}

.particle:nth-child(3) {
  top: 30%;
  left: 60%;
  animation-duration: 22s;
  width: 35px;
  height: 35px;
}

.particle:nth-child(4) {
  top: 70%;
  left: 10%;
  animation-duration: 28s;
  width: 20px;
  height: 20px;
}

.particle:nth-child(5) {
  top: 40%;
  left: 30%;
  animation-duration: 35s;
  width: 28px;
  height: 28px;
}

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(100px, 100px) rotate(90deg);
  }
  50% {
    transform: translate(200px, 0) rotate(180deg);
  }
  75% {
    transform: translate(100px, -100px) rotate(270deg);
  }
  100% {
    transform: translate(0, 0) rotate(360deg);
  }
}

/* Variables CSS pour les couleurs */
:root {
  --benin-green: #008751;
  --benin-yellow: #FCD116;
  --benin-red: #E8112D;
  --vodou: #8B5CF6;
  --spirit: #5D3587;
  --earth: #92400E;
  --ocean: #0369A1;
}

/* Améliorations pour les appareils mobiles */
@media (max-width: 768px) {
  .card-3d {
    transform: none !important;
    transition: transform 0.3s ease;
  }
  
  .card-3d-content {
    transform: none !important;
  }
}
</style> 