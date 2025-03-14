// stores/accommodationStore.js
import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useAccommodationStore = defineStore('accommodation', () => {
  // État
  const accommodations = ref([]);
  const filteredAccommodations = ref([]);
  const isLoading = ref(true);
  const error = ref(null);
  const currentPage = ref(1);
  const itemsPerPage = ref(9);
  const totalAccommodations = ref(0);
  const totalPages = computed(() => Math.ceil(totalAccommodations.value / itemsPerPage.value));

  // Filtres
  const filters = ref({
    accommodationType: '',
    destination: '',
    priceRange: 500,
    stars: null,
    dateFrom: '',
    dateTo: '',
    amenities: [],
    services: [],
    rating: null,
    search: '',
  });

  // Simulation de chargement des données depuis une API
  const fetchAccommodations = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Données mockes pour développement
      const mockData = [
        {
          id: 1,
          name: 'Azalai Hotel de la Plage',
          type: 'Hôtel',
          stars: 4,
          price: 120,
          image: '/img/accommodation/azalai-hotel.webp',
          location: 'Cotonou, Bénin',
          rating: 8.7,
          isNew: false,
          description: 'Hôtel élégant situé sur la plage de Cotonou, offrant une vue imprenable sur l\'océan Atlantique et un accès direct à la mer.',
          features: [
            { icon: 'fa-wifi', text: 'Wi-Fi gratuit' },
            { icon: 'fa-swimming-pool', text: 'Piscine' },
            { icon: 'fa-utensils', text: 'Restaurant' },
            { icon: 'fa-umbrella-beach', text: 'Plage privée' }
          ],
          amenities: ['wifi', 'pool', 'restaurant', 'beach'],
          services: ['room-service', 'airport-shuttle'],
          region: 'cotonou',
          coordinates: { lat: 6.3702, lng: 2.3912 },
          availability: true
        },
        {
          id: 2,
          name: 'Villa Kaya',
          type: 'Villa',
          stars: 0,
          price: 180,
          image: '/img/accommodation/villa-kaya2.webp',
          location: 'Ouidah, Bénin',
          rating: 9.2,
          isNew: true,
          description: 'Magnifique villa de luxe avec piscine privée, située à proximité des sites historiques de Ouidah et à quelques minutes à pied de la plage.',
          features: [
            { icon: 'fa-wifi', text: 'Wi-Fi gratuit' },
            { icon: 'fa-swimming-pool', text: 'Piscine privée' },
            { icon: 'fa-car', text: 'Parking gratuit' },
            { icon: 'fa-concierge-bell', text: 'Conciergerie' }
          ],
          amenities: ['wifi', 'pool', 'parking', 'air-conditioning'],
          services: ['concierge', 'housekeeping'],
          region: 'ouidah',
          coordinates: { lat: 6.3676, lng: 2.0851 },
          availability: true
        },
        {
          id: 3,
          name: 'Ganvié Stilt Resort',
          type: 'Écolodge',
          stars: 3,
          price: 95,
          image: '/img/accommodation/ganvie-resort.webp',
          location: 'Ganvié, Lac Nokoué',
          rating: 8.5,
          isNew: false,
          description: 'Expérience unique dans ce resort sur pilotis au cœur du village lacustre de Ganvié. Immersion totale dans la culture locale et vue imprenable sur le lac.',
          features: [
            { icon: 'fa-utensils', text: 'Cuisine locale' },
            { icon: 'fa-water', text: 'Vue sur le lac' },
            { icon: 'fa-kayak', text: 'Excursions en pirogue' },
            { icon: 'fa-hands-helping', text: 'Tourisme équitable' }
          ],
          amenities: ['wifi', 'restaurant', 'views'],
          services: ['excursions', 'cultural-activities'],
          region: 'ganvie',
          coordinates: { lat: 6.4667, lng: 2.4167 },
          availability: true
        },
        {
          id: 4,
          name: 'Golden Tulip Le Diplomate',
          type: 'Hôtel',
          stars: 5,
          price: 150,
          image: '/img/accommodation/golden-tulip.webp',
          location: 'Cotonou, Bénin',
          rating: 9.0,
          isNew: false,
          description: 'Hôtel 5 étoiles offrant le meilleur du luxe et du confort en plein cœur de Cotonou. Idéal pour les voyageurs d\'affaires et les touristes exigeants.',
          features: [
            { icon: 'fa-wifi', text: 'Wi-Fi gratuit' },
            { icon: 'fa-dumbbell', text: 'Salle de sport' },
            { icon: 'fa-swimming-pool', text: 'Piscine' },
            { icon: 'fa-briefcase', text: 'Business center' }
          ],
          amenities: ['wifi', 'pool', 'gym', 'business-center', 'parking'],
          services: ['room-service', 'concierge', 'airport-shuttle', 'spa'],
          region: 'cotonou',
          coordinates: { lat: 6.3575, lng: 2.3798 },
          availability: true
        },
        {
          id: 5,
          name: 'Appartement Vue Océan',
          type: 'Appartement',
          stars: 0,
          price: 75,
          image: '/img/accommodation/ocean-apartment.webp',
          location: 'Grand-Popo, Bénin',
          rating: 8.3,
          isNew: false,
          description: 'Appartement moderne et confortable avec vue panoramique sur l\'océan. Parfait pour un séjour en autonomie dans la charmante ville de Grand-Popo.',
          features: [
            { icon: 'fa-wifi', text: 'Wi-Fi gratuit' },
            { icon: 'fa-kitchen-set', text: 'Cuisine équipée' },
            { icon: 'fa-tv', text: 'Smart TV' },
            { icon: 'fa-wind', text: 'Climatisation' }
          ],
          amenities: ['wifi', 'kitchen', 'tv', 'air-conditioning', 'ocean-view'],
          services: ['housekeeping'],
          region: 'grand-popo',
          coordinates: { lat: 6.2829, lng: 1.8256 },
          availability: true
        },
        {
          id: 6,
          name: 'Tata Somba Lodge',
          type: 'Maison d\'hôtes',
          stars: 3,
          price: 65,
          image: '/img/accommodation/tata-somba2.webp',
          location: 'Natitingou, Bénin',
          rating: 8.9,
          isNew: true,
          description: 'Hébergement authentique inspiré de l\'architecture Somba traditionnelle. Une expérience unique au cœur de la région de l\'Atakora.',
          features: [
            { icon: 'fa-utensils', text: 'Repas traditionnels' },
            { icon: 'fa-hiking', text: 'Randonnées guidées' },
            { icon: 'fa-users', text: 'Rencontres culturelles' },
            { icon: 'fa-drumstick-bite', text: 'Cuisine locale' }
          ],
          amenities: ['wifi', 'breakfast', 'cultural-decor'],
          services: ['guided-tours', 'cultural-activities', 'meals'],
          region: 'natitingou',
          coordinates: { lat: 10.3089, lng: 1.3792 },
          availability: true
        },
        {
          id: 7,
          name: 'Royal Palm Hôtel & Spa',
          type: 'Hôtel',
          stars: 5,
          price: 200,
          image: '/img/accommodation/royal-palm-01.webp',
          location: 'Cotonou, Bénin',
          rating: 9.2,
          isNew: false,
          description: 'Le Royal Palm Hôtel & Spa offre une expérience de luxe combinant élégance contemporaine et touches traditionnelles béninoises. Vue imprenable sur l\'océan Atlantique.',
          features: [
            { icon: 'fa-wifi', text: 'Wi-Fi gratuit' },
            { icon: 'fa-swimming-pool', text: 'Piscine à débordement' },
            { icon: 'fa-spa', text: 'Spa & bien-être' },
            { icon: 'fa-utensils', text: 'Restaurant gastronomique' }
          ],
          amenities: ['wifi', 'pool', 'spa', 'restaurant', 'bar', 'gym'],
          services: ['room-service', 'concierge', 'airport-shuttle', 'spa', 'beach-service'],
          region: 'cotonou',
          coordinates: { lat: 6.3653, lng: 2.3872 },
          availability: true
        },
        {
          id: 8,
          name: 'La Case Béninoise',
          type: 'Maison d\'hôtes',
          stars: 2,
          price: 45,
          image: '/img/accommodation/case-beninoise.webp',
          location: 'Abomey, Bénin',
          rating: 8.1,
          isNew: false,
          description: 'Maison d\'hôtes traditionnelle aux couleurs vives située près des célèbres palais royaux d\'Abomey. Ambiance familiale et cuisine locale authentique.',
          features: [
            { icon: 'fa-wifi', text: 'Wi-Fi gratuit' },
            { icon: 'fa-utensils', text: 'Petit-déjeuner inclus' },
            { icon: 'fa-users', text: 'Ambiance familiale' },
            { icon: 'fa-lightbulb', text: 'Artisanat local' }
          ],
          amenities: ['wifi', 'breakfast', 'garden'],
          services: ['meals', 'guided-tours'],
          region: 'abomey',
          coordinates: { lat: 7.1846, lng: 1.9932 },
          availability: true
        },
        {
          id: 9,
          name: 'Pendjari Safari Lodge',
          type: 'Écolodge',
          stars: 4,
          price: 130,
          image: '/img/accommodation/pendjari-lodge.webp',
          location: 'Parc National de la Pendjari, Bénin',
          rating: 9.0,
          isNew: true,
          description: 'Écolodge de luxe au cœur du parc national de la Pendjari. Observez la faune africaine depuis votre terrasse privée et vivez une expérience safari authentique.',
          features: [
            { icon: 'fa-binoculars', text: 'Observation de la faune' },
            { icon: 'fa-jeep', text: 'Safaris guidés' },
            { icon: 'fa-moon', text: 'Nuits sous les étoiles' },
            { icon: 'fa-utensils', text: 'Cuisine bio locale' }
          ],
          amenities: ['wifi', 'pool', 'restaurant', 'private-terrace'],
          services: ['safari-tours', 'guided-tours', 'meals'],
          region: 'pendjari',
          coordinates: { lat: 11.2751, lng: 1.4891 },
          availability: true
        },
        {
          id: 10,
          name: 'Porto-Novo Heritage House',
          type: 'Maison d\'hôtes',
          stars: 3,
          price: 85,
          image: '/img/accommodation/porto-novo-heritage.webp',
          location: 'Porto-Novo, Bénin',
          rating: 8.7,
          isNew: false,
          description: 'Ancien bâtiment colonial portugais restauré avec goût en plein cœur de la capitale. Mobilier d\'époque, jardins luxuriants et atmosphère historique unique.',
          features: [
            { icon: 'fa-wifi', text: 'Wi-Fi gratuit' },
            { icon: 'fa-tree', text: 'Jardin tropical' },
            { icon: 'fa-coffee', text: 'Petit-déjeuner continental' },
            { icon: 'fa-book', text: 'Bibliothèque historique' }
          ],
          amenities: ['wifi', 'breakfast', 'garden', 'historical-building'],
          services: ['guided-tours', 'cultural-activities'],
          region: 'porto-novo',
          coordinates: { lat: 6.4969, lng: 2.6283 },
          availability: true
        },
        {
          id: 11,
          name: 'Oasis Beach Resort',
          type: 'Resort',
          stars: 4,
          price: 140,
          image: '/img/accommodation/oasis-beach-grand-popo.webp',
          location: 'Grand-Popo, Bénin',
          rating: 8.9,
          isNew: false,
          description: 'Resort en bord de mer avec accès direct à une plage de sable fin. Chambres avec vue sur l\'océan, sports nautiques et détente garantie.',
          features: [
            { icon: 'fa-umbrella-beach', text: 'Plage privée' },
            { icon: 'fa-swimming-pool', text: 'Piscines extérieures' },
            { icon: 'fa-cocktail', text: 'Bars de plage' },
            { icon: 'fa-water', text: 'Sports nautiques' }
          ],
          amenities: ['wifi', 'pool', 'beach-access', 'restaurant', 'bar'],
          services: ['water-sports', 'spa', 'entertainment'],
          region: 'grand-popo',
          coordinates: { lat: 6.2700, lng: 1.8050 },
          availability: true
        },
        {
          id: 12,
          name: 'Dassa Hills Retreat',
          type: 'Écolodge',
          stars: 3,
          price: 110,
          image: '/img/accommodation/dassa-hills.webp',
          location: 'Dassa-Zoumé, Bénin',
          rating: 8.6,
          isNew: true,
          description: 'Niché dans les collines sacrées de Dassa, ce lodge écologique offre une reconnexion avec la nature et la spiritualité africaine. Architecture durable et vue panoramique.',
          features: [
            { icon: 'fa-mountain', text: 'Vue panoramique' },
            { icon: 'fa-leaf', text: 'Matériaux écologiques' },
            { icon: 'fa-hiking', text: 'Sentiers de randonnée' },
            { icon: 'fa-moon', text: 'Cérémonies traditionnelles' }
          ],
          amenities: ['wifi', 'eco-friendly', 'views', 'restaurant'],
          services: ['guided-tours', 'spiritual-experiences', 'hiking'],
          region: 'dassa',
          coordinates: { lat: 7.7500, lng: 2.1833 },
          availability: true
        },
        {
          id: 13,
          name: 'Urban Boutique Hôtel',
          type: 'Hôtel',
          stars: 4,
          price: 115,
          image: '/img/accommodation/urban-boutique.webp',
          location: 'Cotonou, Bénin',
          rating: 8.8,
          isNew: false,
          description: 'Hôtel boutique au design contemporain inspiré des arts béninois. Situé dans le quartier des affaires de Cotonou, idéal pour les voyageurs urbains.',
          features: [
            { icon: 'fa-wifi', text: 'Wi-Fi haut débit' },
            { icon: 'fa-bed', text: 'Literie premium' },
            { icon: 'fa-cocktail', text: 'Bar à cocktails' },
            { icon: 'fa-dumbbell', text: 'Salle de fitness' }
          ],
          amenities: ['wifi', 'gym', 'bar', 'business-center'],
          services: ['room-service', 'concierge', 'laundry'],
          region: 'cotonou',
          coordinates: { lat: 6.3690, lng: 2.3823 },
          availability: true
        },
        {
          id: 14,
          name: 'Lakeside Paradise',
          type: 'Resort',
          stars: 4,
          price: 135,
          image: '/img/accommodation/lakeside.webp',
          location: 'Lac Ahémé, Bénin',
          rating: 8.7,
          isNew: false,
          description: 'Resort paisible situé au bord du lac Ahémé. Combinaison parfaite entre confort moderne et beauté naturelle, idéal pour les amateurs de pêche et ornithologie.',
          features: [
            { icon: 'fa-water', text: 'Accès au lac' },
            { icon: 'fa-fish', text: 'Activités de pêche' },
            { icon: 'fa-binoculars', text: 'Observation d\'oiseaux' },
            { icon: 'fa-utensils', text: 'Restaurant de fruits de mer' }
          ],
          amenities: ['wifi', 'restaurant', 'boat-rental', 'views'],
          services: ['fishing-tours', 'boat-excursions', 'bird-watching'],
          region: 'aheme',
          coordinates: { lat: 6.5000, lng: 1.9833 },
          availability: true
        },
        {
          id: 15,
          name: 'Palais Royal Suites',
          type: 'Hôtel',
          stars: 5,
          price: 190,
          image: '/img/accommodation/palais-royal.webp',
          location: 'Abomey, Bénin',
          rating: 9.1,
          isNew: false,
          description: 'Hôtel de luxe situé à proximité des palais royaux d\'Abomey. Chaque suite est décorée dans le style des royaumes historiques du Danhomè avec toutes les commodités modernes.',
          features: [
            { icon: 'fa-crown', text: 'Décor royal' },
            { icon: 'fa-swimming-pool', text: 'Piscine et jardins' },
            { icon: 'fa-utensils', text: 'Cuisine gastronomique' },
            { icon: 'fa-spa', text: 'Spa traditionnels' }
          ],
          amenities: ['wifi', 'pool', 'spa', 'restaurant', 'luxury-bedding'],
          services: ['room-service', 'concierge', 'cultural-tours', 'spa-treatments'],
          region: 'abomey',
          coordinates: { lat: 7.1833, lng: 1.9833 },
          availability: true
        },
        {
          id: 16,
          name: 'Green Valley Farm Stay',
          type: 'Ferme',
          stars: 0,
          price: 55,
          image: '/img/accommodation/green-valley.webp',
          location: 'Parakou, Bénin',
          rating: 8.4,
          isNew: true,
          description: 'Séjour authentique dans une ferme écologique. Découvrez l\'agriculture durable, goûtez aux produits locaux et profitez du calme de la campagne béninoise.',
          features: [
            { icon: 'fa-seedling', text: 'Ferme biologique' },
            { icon: 'fa-carrot', text: 'Cuisine de la ferme' },
            { icon: 'fa-tractor', text: 'Activités agricoles' },
            { icon: 'fa-child', text: 'Idéal pour les familles' }
          ],
          amenities: ['wifi', 'organic-food', 'garden', 'eco-friendly'],
          services: ['farm-activities', 'cooking-classes', 'meals'],
          region: 'parakou',
          coordinates: { lat: 9.3474, lng: 2.6386 },
          availability: true
        },
        {
          id: 17,
          name: 'North Star Business Hotel',
          type: 'Hôtel',
          stars: 4,
          price: 105,
          image: '/img/accommodation/north-star.webp',
          location: 'Parakou, Bénin',
          rating: 8.5,
          isNew: false,
          description: 'Hôtel d\'affaires moderne proposant des équipements de qualité pour les voyageurs professionnels dans le nord du Bénin. Chambres spacieuses et centre de conférences.',
          features: [
            { icon: 'fa-wifi', text: 'Wi-Fi haut débit' },
            { icon: 'fa-briefcase', text: 'Salles de réunion' },
            { icon: 'fa-print', text: 'Centre d\'affaires' },
            { icon: 'fa-utensils', text: 'Restaurant international' }
          ],
          amenities: ['wifi', 'business-center', 'restaurant', 'meeting-rooms'],
          services: ['room-service', 'airport-shuttle', 'laundry'],
          region: 'parakou',
          coordinates: { lat: 9.3382, lng: 2.6298 },
          availability: true
        },
        {
          id: 18,
          name: 'Lagune Vista Bungalows',
          type: 'Bungalow',
          stars: 3,
          price: 90,
          image: '/img/accommodation/lagune-vista.webp',
          location: 'Lac Nokoué, Bénin',
          rating: 8.6,
          isNew: false,
          description: 'Bungalows confortables avec terrasses privées surplombant la lagune. Point de départ idéal pour explorer les villages lacustres et la culture locale.',
          features: [
            { icon: 'fa-water', text: 'Vue sur la lagune' },
            { icon: 'fa-couch', text: 'Terrasse privée' },
            { icon: 'fa-canoe', text: 'Location de pirogues' },
            { icon: 'fa-drumstick-bite', text: 'Poisson frais' }
          ],
          amenities: ['wifi', 'private-deck', 'lake-view', 'restaurant'],
          services: ['boat-excursions', 'fishing', 'guided-tours'],
          region: 'nokoue',
          coordinates: { lat: 6.4500, lng: 2.4167 },
          availability: true
        }
      ];
      
      // Mise à jour des données et totaux
      accommodations.value = mockData;
      totalAccommodations.value = mockData.length;
      applyFilters();
      
    } catch (err) {
      console.error("Erreur lors du chargement des hébergements:", err);
      error.value = "Une erreur est survenue lors du chargement des hébergements. Veuillez réessayer.";
    } finally {
      isLoading.value = false;
    }
  };

  // Appliquer tous les filtres actifs
  const applyFilters = () => {
    let results = [...accommodations.value];
    
    // Filtre par type d'hébergement
    if (filters.value.accommodationType) {
      results = results.filter(item => item.type === filters.value.accommodationType);
    }
    
    // Filtre par destination/région
    if (filters.value.destination) {
      results = results.filter(item => item.region === filters.value.destination);
    }
    
    // Filtre par prix
    if (filters.value.priceRange) {
      results = results.filter(item => item.price <= filters.value.priceRange);
    }
    
    // Filtre par étoiles
    if (filters.value.stars) {
      results = results.filter(item => item.stars === filters.value.stars);
    }
    
    // Filtre par équipements
    if (filters.value.amenities.length > 0) {
      results = results.filter(item => 
        filters.value.amenities.every(amenity => 
          item.amenities.includes(amenity)
        )
      );
    }
    
    // Filtre par services
    if (filters.value.services.length > 0) {
      results = results.filter(item => 
        filters.value.services.every(service => 
          item.services.includes(service)
        )
      );
    }
    
    // Filtre par note minimale
    if (filters.value.rating) {
      results = results.filter(item => item.rating >= filters.value.rating);
    }
    
    // Filtre par recherche textuelle
    if (filters.value.search) {
      const searchTerm = filters.value.search.toLowerCase();
      results = results.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.location.toLowerCase().includes(searchTerm) ||
        item.type.toLowerCase().includes(searchTerm)
      );
    }
    
    // Mise à jour des résultats et réinitialisation de la pagination
    filteredAccommodations.value = results;
    totalAccommodations.value = results.length;
    currentPage.value = 1;
  };
  
  // Obtenir les hébergements pour la page actuelle
  const paginatedAccommodations = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value;
    const endIndex = startIndex + itemsPerPage.value;
    return filteredAccommodations.value.slice(startIndex, endIndex);
  });
  
  // Observer les changements de filtres et appliquer automatiquement
  watch(filters, () => {
    applyFilters();
  }, { deep: true });
  
  // Réinitialiser tous les filtres
  const resetFilters = () => {
    filters.value = {
      accommodationType: '',
      destination: '',
      priceRange: 500,
      stars: null,
      dateFrom: '',
      dateTo: '',
      amenities: [],
      services: [],
      rating: null,
      search: '',
    };
  };
  
  // Changer de page
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };

  return {
    accommodations,
    filteredAccommodations,
    paginatedAccommodations,
    isLoading,
    error,
    filters,
    currentPage,
    totalPages,
    totalAccommodations,
    fetchAccommodations,
    applyFilters,
    resetFilters,
    goToPage
  };
});