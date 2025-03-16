export interface EventPrice {
    value: string | number;
    currency: string;
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
    price: EventPrice | number | string;
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
  
export interface CalendarDay {
    date: string;
    isCurrentMonth: boolean;
    isToday: boolean;
    isWeekend: boolean;
    events: Event[];
  }
  
export type ViewMode = 'list' | 'calendar';
  
export interface FilterOptions {
    categories?: string[];
    regions?: string[];
    dateRange?: DateRange;
    priceRange?: PriceRange;
    freeOnly?: boolean;
    searchTerm?: string;
  }