import type { Event } from '../types/events';

// Simuler un délai de chargement pour imiter une requête réseau
const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Récupère tous les événements
 * @returns {Promise<Event[]>} Liste des événements
 */
export async function getAllEvents(): Promise<Event[]> {
  // Simuler un délai de chargement
  await delay(200);
  
  return events;
}



/**
 * Données des événements
 * @type {Event[]}
 */
const events: Event[] = [
  {
    id: 1,
    title: "Festival International de Vodoun",
    category: "culturel",
    region: "Ouidah",
    date: "2024-01-10",
    endDate: "2024-01-11",
    location: "Plage de Ouidah",
    description: "Le Festival International de Vodoun est une célébration annuelle des traditions Vodoun béninoises. Pendant deux jours, des cérémonies traditionnelles, des danses rituelles et des performances culturelles ont lieu sur la plage historique de Ouidah, point de départ de la Route des Esclaves.",
    featured: true,
    image: "/img/events/vodoun-festival.webp",
    price: {
      value: 5000,
      currency: "XOF"
    },
    tags: ["vodoun", "tradition", "cérémonie", "international"],
    schedule: [
      {
        date: "2024-01-10",
        time: "09:00",
        description: "Cérémonie d'ouverture avec offrandes traditionnelles"
      },
      {
        date: "2024-01-10",
        time: "14:00",
        description: "Défilé des dignitaires et adeptes du Vodoun"
      },
      {
        date: "2024-01-11",
        time: "10:00",
        description: "Danses rituelles sur la plage"
      },
      {
        date: "2024-01-11",
        time: "17:00",
        description: "Cérémonie de clôture et spectacle final"
      }
    ],
    coordinates: {
      lat: 6.3702,
      lng: 2.0887
    },
    contact: {
      phone: "+229 97 12 34 56",
      email: "festival.vodoun@benintourisme.bj",
      website: "https://festival-vodoun.bj"
    }
  },
  {
    id: 2,
    title: "Festival des Arts du Bénin",
    category: "arts",
    region: "Cotonou",
    date: "2024-03-15",
    endDate: "2024-03-20",
    location: "Palais des Congrès, Cotonou",
    description: "Le Festival des Arts du Bénin est une célébration vibrante de l'art contemporain béninois, réunissant artistes locaux et internationaux. Expositions, installations, performances et ateliers créatifs rythment ce rendez-vous incontournable de la scène artistique ouest-africaine.",
    featured: true,
    image: "/img/events/arts-festival.webp",
    price: {
      value: 3000,
      currency: "XOF"
    },
    tags: ["art contemporain", "expositions", "ateliers", "culture"],
    schedule: [
      {
        date: "2024-03-15",
        time: "10:00",
        description: "Inauguration et visite des expositions"
      },
      {
        date: "2024-03-16",
        time: "14:00",
        description: "Table ronde: L'art contemporain béninois"
      },
      {
        date: "2024-03-17",
        time: "16:00",
        description: "Performance artistique collective"
      },
      {
        date: "2024-03-18",
        time: "10:00",
        description: "Ateliers pour enfants et familles"
      },
      {
        date: "2024-03-19",
        time: "19:00",
        description: "Soirée projection de films d'art"
      },
      {
        date: "2024-03-20",
        time: "18:00",
        description: "Cérémonie de clôture et remise de prix"
      }
    ],
    coordinates: {
      lat: 6.3676,
      lng: 2.4252
    },
    contact: {
      phone: "+229 96 78 45 12",
      email: "festival.arts@benintourisme.bj",
      website: "https://festivaldesarts.bj"
    }
  },
  {
    id: 3,
    title: "Marathon International du Bénin",
    category: "sport",
    region: "Porto-Novo",
    date: "2024-04-22",
    endDate: "2024-04-22",
    location: "Place de l'Indépendance, Porto-Novo",
    description: "Le Marathon International du Bénin attire des coureurs du monde entier pour un parcours unique à travers la capitale historique du pays. Les participants traversent des sites emblématiques tout en découvrant les paysages naturels et urbains qui font la richesse du Bénin.",
    featured: false,
    image: "/img/events/marathon.webp",
    price: {
      value: 15000,
      currency: "XOF"
    },
    tags: ["course", "sport", "international", "compétition"],
    schedule: [
      {
        date: "2024-04-21",
        time: "14:00-18:00",
        description: "Retrait des dossards et village marathon"
      },
      {
        date: "2024-04-22",
        time: "06:30",
        description: "Départ du marathon (42km)"
      },
      {
        date: "2024-04-22",
        time: "07:30",
        description: "Départ du semi-marathon (21km)"
      },
      {
        date: "2024-04-22",
        time: "08:30",
        description: "Départ de la course populaire (10km)"
      },
      {
        date: "2024-04-22",
        time: "14:00",
        description: "Cérémonie de remise des prix"
      }
    ],
    coordinates: {
      lat: 6.4969,
      lng: 2.6283
    },
    contact: {
      phone: "+229 95 14 78 96",
      email: "marathon@beninsports.bj",
      website: "https://marathonbenin.bj"
    }
  },
  // Autres événements...
  // Pour éviter la duplication, nous tronquons le reste des événements
];

export default { 
  getAllEvents, 

};