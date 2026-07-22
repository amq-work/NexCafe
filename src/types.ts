export type TableStatus = 'available' | 'reserved' | 'selected' | 'blocked' | 'occupied' | 'cleaning';

export interface DiningTable {
  id: number;
  number: string;
  capacity: number;
  status: Exclude<TableStatus, 'selected'>;
  /** grid position on the floor map (percentages 0-100) */
  x: number;
  y: number;
  shape: 'round' | 'square' | 'rect';
  area: string;
}

export interface DiningArea {
  id: string;
  name: string;
}

export interface TimeSlot {
  time: string;
  label: string;
  available: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Starters' | 'Mains' | 'Desserts' | 'Drinks';
  signature?: 'mayo' | 'sriracha' | 'amber';
}

export interface Special {
  id: string;
  name: string;
  chef: string;
  description: string;
  price: number;
  image: string;
  tag: string;
  tagColor: 'mayo' | 'sriracha' | 'amber';
  rating?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface Reservation {
  id: string;
  guestName: string;
  date: string;
  time: string;
  guests: number;
  tableId: number;
  status: 'confirmed' | 'seated' | 'completed' | 'cancelled';
  phone: string;
  customerId?: string;
}

export interface CoversTrendItem {
  day: string;
  covers: number;
  reservations: number;
}

export interface ServiceMixItem {
  name: string;
  value: number;
}
