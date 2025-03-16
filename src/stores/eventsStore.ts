import { atom, map, computed } from 'nanostores';
import { getAllEvents } from '../data/eventsData';

// ------------------- TYPES -------------------

export interface EventPrice {
  // Simplification du type pour faciliter le traitement
  value: number;
  currency: string;
  formatted?: string; // Format d'affichage optionnel (ex: "50€", "100$")
}

export interface EventScheduleItem {
  date: string;
  time: string;
  description: string;
}

export interface EventCoordinates {
  lat: number;
  lng: number;
}

export interface EventContact {
  phone: string;
  email: string;
  website: string;
}

export interface Event {
  id: number;
  title: string;
  category: string;
  region: string;
  date: string;
  endDate?: string;
  location: string;
  description: string;
  featured: boolean;
  image: string;
  // Standardisation du traitement des prix
  price: EventPrice | { isFree: boolean; value?: number; currency?: string };
  tags: string[];
  schedule: EventScheduleItem[];
  coordinates: EventCoordinates;
  contact: EventContact;
}

export interface DateRange {
  start: string | null;
  end: string | null;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface CalendarMonth {
  month: number;
  year: number;
}

export type ViewMode = 'list' | 'calendar';

// ------------------- ÉTAT INITIAL -------------------

// Valeurs par défaut
const DEFAULT_PRICE_MAX = 100000;
const DEFAULT_PRICE_RANGE: PriceRange = { min: 0, max: DEFAULT_PRICE_MAX };

// ------------------- ÉTAT ATOMIQUE -------------------

// Événements
export const allEvents = atom<Event[]>([]);
export const filteredEvents = atom<Event[]>([]);
export const isLoading = atom<boolean>(false);
export const error = atom<string | null>(null);
export const lastFetchTime = atom<number | null>(null); // Pour gérer le re-fetch
export const storeInitialized = atom<boolean>(false); // Nouveau: tracker l'initialisation

// Filtres
export const selectedCategories = atom<string[]>([]);
export const selectedRegions = atom<string[]>([]);
export const startDate = atom<string | null>(null);
export const endDate = atom<string | null>(null);
export const priceRange = atom<PriceRange>(DEFAULT_PRICE_RANGE);
export const searchQuery = atom<string>('');
export const showFreeOnly = atom<boolean>(false);
export const viewMode = atom<ViewMode>('list');
export const isSearching = atom<boolean>(false);

// Calendrier
export const currentCalendarMonth = map<CalendarMonth>({
  month: new Date().getMonth(),
  year: new Date().getFullYear()
});

// ------------------- GETTERS CALCULÉS -------------------

// Nombre d'événements filtrés
export const eventCount = computed(filteredEvents, events => events.length);

// Fonction utilitaire pour la recherche par termes
function matchesSearchTerms(event: Event, searchTerms: string[]): boolean {
  if (!event) {
    return false;
  }
  
  const searchableText = [
    event.title,
    event.description,
    event.location,
    event.category,
    event.region,
    ...(event.tags || [])
  ].join(' ').toLowerCase();
  
  return searchTerms.every(term => searchableText.includes(term));
}

// Résultats de recherche
export const searchResults = computed(
  [allEvents, searchQuery],
  (events, query): Event[] => {
    if (!query.trim()) {
      return []; // Intentionnellement vide pour les requêtes vides, comme demandé
    }
    
    const searchTerms = query.toLowerCase().split(' ').filter(Boolean);
    
    return events.filter(event => matchesSearchTerms(event, searchTerms));
  }
);

// Événements par date pour le calendrier
export const eventsByDate = computed(
  [filteredEvents, currentCalendarMonth],
  (events, { month, year }): Record<number, Event[]> => {
    const eventMap: Record<number, Event[]> = {};
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0);
    
    events.forEach(event => {
      const startDate = new Date(event.date);
      const endDate = event.endDate ? new Date(event.endDate) : new Date(event.date);
      
      // Optimisation: vérifier d'abord si l'événement est hors de la plage du mois
      if (endDate < monthStart || startDate > monthEnd) {
        return; // L'événement ne se produit pas pendant ce mois
      }
      
      // Déterminer les jours du mois courant où l'événement a lieu
      let currentDate = new Date(Math.max(startDate.getTime(), monthStart.getTime()));
      const eventEndInMonth = new Date(Math.min(endDate.getTime(), monthEnd.getTime()));
      
      while (currentDate <= eventEndInMonth) {
        const day = currentDate.getDate();
        
        if (!eventMap[day]) {
          eventMap[day] = [];
        }
        
        // Éviter les doublons dans le cas d'événements multi-jours
        if (!eventMap[day].some(e => e.id === event.id)) {
          eventMap[day].push(event);
        }
        
        // Passer au jour suivant
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    
    return eventMap;
  }
);

// ------------------- FONCTIONS UTILITAIRES -------------------

/**
 * Extrait le prix numérique d'un événement pour les filtres
 * Gère les différents formats possibles
 */
export function getNumericPrice(event: Event): number {
  if (!event.price) return 0;
  
  // Événement gratuit
  if ('isFree' in event.price && event.price.isFree) {
    return 0;
  }
  
  // Objet EventPrice standardisé
  if ('value' in event.price) {
    if (typeof event.price.value === 'number') {
      return event.price.value;
    }
    return 0; // Cas par défaut pour les valeurs non numériques
  }
  
  return 0; // Cas par défaut si le format n'est pas reconnu
}

/**
 * Applique tous les filtres et met à jour la liste des événements filtrés
 * Maintenant exportée pour être utilisable depuis les composants
 */
export function applyFilters(): Event[] {
  const events = allEvents.get();
  
  // Si aucun événement, ne rien faire
  if (!events || events.length === 0) {
    console.log("applyFilters: Aucun événement à filtrer");
    filteredEvents.set([]);
    return [];
  }

  console.log(`applyFilters: Filtrage de ${events.length} événements`);
  
  const categories = selectedCategories.get();
  const regions = selectedRegions.get();
  const dateStart = startDate.get();
  const dateEnd = endDate.get();
  const { min, max } = priceRange.get();
  const query = searchQuery.get();
  const onlyFree = showFreeOnly.get();

  let filtered = [...events];
  

  // Filtre par catégories
  if (categories.length > 0) {
   
    filtered = filtered.filter(event => 
      categories.includes(event.category)
    );
   
  }

  // Filtre par régions
  if (regions.length > 0) {
    filtered = filtered.filter(event => 
      regions.includes(event.region)
    );
  }

 // Pour la date de début (déjà correct)
if (dateStart) {
  const startDateObj = new Date(dateStart);
  startDateObj.setHours(0, 0, 0, 0);
  
  filtered = filtered.filter(event => {
    const eventEndDate = event.endDate 
      ? new Date(event.endDate)
      : new Date(event.date);
    
    return eventEndDate >= startDateObj;
  });
}

// Pour la date de fin (à corriger)
if (dateEnd) {
  const endDateObj = new Date(dateEnd);
  endDateObj.setHours(23, 59, 59, 999);
  
  filtered = filtered.filter(event => {
    // Utiliser la date de DÉBUT de l'événement, pas sa date de fin
    const eventStartDate = new Date(event.date);
    return eventStartDate <= endDateObj;
  });
}
  

  // Filtre par prix avec gestion améliorée des prix
  filtered = filtered.filter(event => {
    const eventPrice = getNumericPrice(event);
    
    if (onlyFree) {
      return eventPrice === 0;
    }
    
    return eventPrice >= min && eventPrice <= max;
  });
  

  // Filtre par recherche en utilisant la fonction partagée
  if (query) {
    const terms = query.toLowerCase().split(' ').filter(Boolean);
    filtered = filtered.filter(event => matchesSearchTerms(event, terms));
    
  }



  console.log(`applyFilters: ${filtered.length} événements après filtrage`);
  filteredEvents.set(filtered);
  return filtered;
}

// ------------------- ACTIONS PUBLIQUES -------------------

/**
 * Initialise le store avec les données d'événements
 */
export function setEvents(events: Event[]): Event[] {
  console.log(`setEvents: Définition de ${events.length} événements`);
  allEvents.set(events);
  
  // Appliquer les filtres par défaut et remplir filteredEvents
  const filteredResult = applyFilters();
  
  // Si filteredEvents est vide après l'application des filtres par défaut,
  // c'est probablement parce que les événements sont tous passés - mettre les événements bruts
  if (filteredResult.length === 0 && events.length > 0) {
    console.log("setEvents: Aucun événement après filtrage, utilisation des événements bruts");
    filteredEvents.set(events);
  }
  
  return events;
}

/**
 * Définit les catégories sélectionnées et filtre les événements
 */
export function setSelectedCategories(categories: string[]): string[] {
  console.log(`setSelectedCategories: ${categories.join(', ')}`);
  selectedCategories.set(categories);
  applyFilters();
  return categories;
}

/**
 * Définit les régions sélectionnées et filtre les événements
 */
export function setSelectedRegions(regions: string[]): string[] {
  console.log(`setSelectedRegions: ${regions.join(', ')}`);
  selectedRegions.set(regions);
  applyFilters();
  return regions;
}

/**
 * Définit la plage de dates et filtre les événements
 */
export function setDateRange(start: string | null, end: string | null): { start: string | null, end: string | null } {
  console.log(`setDateRange: ${start} à ${end}`);
  startDate.set(start);
  endDate.set(end);
  applyFilters();
  return { start, end };
}

/**
 * Définit la plage de prix et filtre les événements
 */
export function setPriceRange(range: PriceRange): PriceRange {
  console.log(`setPriceRange: ${range.min} à ${range.max}`);
  priceRange.set(range);
  applyFilters();
  return range;
}

/**
 * Définit le mode d'affichage (liste ou calendrier)
 */
export function setViewMode(mode: ViewMode): ViewMode {
  console.log(`setViewMode: ${mode}`);
  viewMode.set(mode);
  return mode;
}

// Référence pour le timeout de debounce
let searchTimeoutId: ReturnType<typeof setTimeout>;

/**
 * Définit la requête de recherche avec debounce
 */
export function setSearchQuery(query: string): string {
  console.log(`setSearchQuery: ${query}`);
  isSearching.set(true);
  
  // Nettoyage du timeout précédent pour éviter les requêtes en double
  clearTimeout(searchTimeoutId);
  
  // Debounce pour éviter trop de recalculs
  searchTimeoutId = setTimeout(() => {
    searchQuery.set(query);
    applyFilters();
    isSearching.set(false);
  }, 300);
  
  return query;
}

/**
 * Efface la requête de recherche
 */
export function clearSearchQuery(): string {
  console.log('clearSearchQuery');
  // Nettoyer tout timeout en attente
  clearTimeout(searchTimeoutId);
  
  searchQuery.set('');
  applyFilters();
  return '';
}

/**
 * Sélectionne un résultat de recherche et navigue vers sa page
 * Utilisation d'une approche plus adaptée à Astro
 */
export function selectSearchResult(event: Event): Event {
  console.log(`selectSearchResult: ${event.id} - ${event.title}`);
  // Déclencher un événement personnalisé que les composants Astro peuvent intercepter
  if (typeof document !== 'undefined') {
    const navigationEvent = new CustomEvent('navigate', { 
      detail: { url: `/evenements/${event.id}`, event } 
    });
    document.dispatchEvent(navigationEvent);
  }
  return event;
}

/**
 * Active/désactive le filtre pour événements gratuits
 */
export function setShowFreeOnly(value: boolean): boolean {
  console.log(`setShowFreeOnly: ${value}`);
  showFreeOnly.set(value);
  applyFilters();
  return value;
}

/**
 * Change de mois dans le calendrier
 */
export function navigateMonth(direction: 'prev' | 'next'): CalendarMonth {
  const current = currentCalendarMonth.get();
  let { month, year } = current;
  
  if (direction === 'next') {
    month += 1;
    if (month > 11) {
      month = 0;
      year += 1;
    }
  } else {
    month -= 1;
    if (month < 0) {
      month = 11;
      year -= 1;
    }
  }
  
  const newMonth = { month, year };
  console.log(`navigateMonth: ${direction} => ${year}-${month+1}`);
  currentCalendarMonth.set(newMonth);
  return newMonth;
}

/**
 * Réinitialise le calendrier au mois actuel
 */
export function resetToToday(): CalendarMonth {
  const today = new Date();
  const newMonth = {
    month: today.getMonth(),
    year: today.getFullYear()
  };
  console.log(`resetToToday: ${newMonth.year}-${newMonth.month+1}`);
  currentCalendarMonth.set(newMonth);
  return newMonth;
}

/**
 * Réinitialise tous les filtres
 */
export function resetFilters(): void {
  console.log('resetFilters');
  selectedCategories.set([]);
  selectedRegions.set([]);
  startDate.set(null);
  endDate.set(null);
  priceRange.set(DEFAULT_PRICE_RANGE);
  showFreeOnly.set(false);
  searchQuery.set('');
  
  applyFilters();
}

/**
 * Vérifie si une mise à jour des données est nécessaire
 * basé sur un intervalle de temps
 */
function shouldRefetchEvents(intervalMinutes = 15): boolean {
  const lastFetch = lastFetchTime.get();
  if (!lastFetch) return true;
  
  const now = Date.now();
  const diffMs = now - lastFetch;
  const diffMinutes = diffMs / (1000 * 60);
  
  return diffMinutes >= intervalMinutes;
}

/**
 * Charge les événements depuis l'API et initialise le store
 * Avec gestion de rafraîchissement améliorée
 */
export async function initStore(forceRefresh = false): Promise<Event[]> {
  console.log('initStore: Début de l\'initialisation du store');
  
  // Si les données sont déjà chargées et à jour, ne pas recharger
  if (!forceRefresh && allEvents.get().length > 0 && !shouldRefetchEvents()) {
    console.log('initStore: Utilisation des données en cache');
    // Force le calcul des événements filtrés si c'est vide
    if (filteredEvents.get().length === 0) {
      console.log('initStore: Recalcul des événements filtrés');
      applyFilters();
    }
    storeInitialized.set(true);
    return allEvents.get();
  }
  
  isLoading.set(true);
  error.set(null);
  
  try {
    console.log('initStore: Chargement des événements depuis l\'API');
    const events = await getAllEvents();
    console.log(`initStore: ${events.length} événements chargés`);
    
    setEvents(events as Event[]);
    lastFetchTime.set(Date.now());
    storeInitialized.set(true);
    
    // Force un nouveau calcul des événements filtrés
    if (filteredEvents.get().length === 0) {
      console.log('initStore: Forçage du calcul des événements filtrés');
      
      // Astuce: si après application des filtres aucun événement n'est trouvé,
      // afficher tous les événements sans filtrage
      const filtered = applyFilters();
      if (filtered.length === 0 && events.length > 0) {
        console.log('initStore: Aucun événement après filtrage, affichage de tous les événements');
        filteredEvents.set(events as Event[]);
      }
    }
    
    return events as Event[];
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
    error.set(errorMessage);
    console.error('Erreur de chargement des événements:', err);
    
    // Conserver les événements existants en cas d'erreur
    if (allEvents.get().length === 0) {
      setEvents([]);
    }
    
    return allEvents.get();
  } finally {
    isLoading.set(false);
  }
}

/**
 * Tente de recharger les événements après une erreur
 */
export async function retryLoadEvents(): Promise<Event[]> {
  console.log('retryLoadEvents: Nouvelle tentative de chargement');
  return initStore(true);
}

/**
 * Force l'application des filtres et garantit que filteredEvents contient des données
 * Utile après l'initialisation par SSR
 */
export function ensureFilteredEvents(): Event[] {
  console.log('ensureFilteredEvents: Vérification des événements filtrés');
  
  const currentFiltered = filteredEvents.get();
  const currentAll = allEvents.get();
  
  if (currentFiltered.length === 0 && currentAll.length > 0) {
    console.log('ensureFilteredEvents: Réapplication des filtres');
    
    // Essayer d'appliquer les filtres
    const filteredResult = applyFilters();
    
    // Si toujours vide après filtrage, afficher tous les événements
    if (filteredResult.length === 0) {
      console.log('ensureFilteredEvents: Affichage de tous les événements sans filtrage');
      filteredEvents.set(currentAll);
      return currentAll;
    }
    
    return filteredResult;
  }
  
  return currentFiltered;
}