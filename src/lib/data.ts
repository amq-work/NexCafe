import { 
  DiningTable, 
  DiningArea, 
  TimeSlot, 
  MenuItem, 
  Special, 
  Testimonial, 
  Reservation, 
  CoversTrendItem, 
  ServiceMixItem 
} from '../types';

export const RESTAURANT = {
  name: "NexCafe'",
  tagline: 'Seasonal fine dining, rooted in warmth.',
  address: '18 Orchard Lane, Garden District',
  phone: '+1 (555) 021-4400',
  hours: 'Tue–Sun · 5:00pm – 11:00pm',
};

export const DINING_AREAS: DiningArea[] = [
  { id: 'main_hall', name: 'Main Hall' },
  { id: 'window_seating', name: 'Window Seating' },
  { id: 'outdoor_patio', name: 'Outdoor Patio' },
  { id: 'vip_room', name: 'VIP Room' },
  { id: 'private_dining', name: 'Private Dining' },
  { id: 'bar_area', name: 'Bar Area' },
];

export const TABLES: DiningTable[] = [
  // 6 two-seat tables
  { id: 1, number: 'T01', capacity: 2, status: 'available', x: 35.5, y: 11, shape: 'round', area: 'window_seating' },
  { id: 2, number: 'T02', capacity: 2, status: 'available', x: 44.5, y: 11, shape: 'round', area: 'window_seating' },
  { id: 3, number: 'T03', capacity: 2, status: 'reserved', x: 53.5, y: 11, shape: 'round', area: 'window_seating' },
  { id: 4, number: 'T04', capacity: 2, status: 'available', x: 11, y: 86, shape: 'round', area: 'bar_area' },
  { id: 5, number: 'T05', capacity: 2, status: 'occupied', x: 35, y: 24, shape: 'round', area: 'main_hall' },
  { id: 6, number: 'T06', capacity: 2, status: 'reserved', x: 47, y: 24, shape: 'round', area: 'main_hall' },

  // 8 four-seat tables
  { id: 7, number: 'T07', capacity: 4, status: 'available', x: 60, y: 24, shape: 'square', area: 'main_hall' },
  { id: 8, number: 'T08', capacity: 4, status: 'available', x: 73, y: 24, shape: 'square', area: 'main_hall' },
  { id: 9, number: 'T09', capacity: 4, status: 'available', x: 35, y: 42, shape: 'square', area: 'main_hall' },
  { id: 10, number: 'T10', capacity: 4, status: 'available', x: 47, y: 42, shape: 'square', area: 'main_hall' },
  { id: 11, number: 'T11', capacity: 4, status: 'available', x: 63.5, y: 11, shape: 'square', area: 'window_seating' },
  { id: 12, number: 'T12', capacity: 4, status: 'reserved', x: 73.5, y: 11, shape: 'square', area: 'window_seating' },
  { id: 13, number: 'T13', capacity: 4, status: 'occupied', x: 12, y: 63, shape: 'square', area: 'bar_area' },
  { id: 14, number: 'T14', capacity: 4, status: 'blocked', x: 24, y: 63, shape: 'square', area: 'bar_area' },

  // 4 six-seat tables
  { id: 15, number: 'T15', capacity: 6, status: 'cleaning', x: 60, y: 42, shape: 'rect', area: 'main_hall' },
  { id: 16, number: 'T16', capacity: 6, status: 'available', x: 73, y: 42, shape: 'rect', area: 'main_hall' },
  { id: 17, number: 'T17', capacity: 6, status: 'available', x: 86, y: 38.5, shape: 'rect', area: 'private_dining' },
  { id: 18, number: 'T18', capacity: 6, status: 'available', x: 90.5, y: 51.5, shape: 'rect', area: 'private_dining' },

  // 2 family tables (8 seats)
  { id: 19, number: 'T19', capacity: 8, status: 'available', x: 54, y: 60, shape: 'rect', area: 'main_hall' },
  { id: 20, number: 'T20', capacity: 8, status: 'available', x: 86, y: 65, shape: 'rect', area: 'private_dining' },

  // 2 VIP tables (6 seats, round)
  { id: 21, number: 'T21', capacity: 6, status: 'available', x: 85.5, y: 10, shape: 'round', area: 'vip_room' },
  { id: 22, number: 'T22', capacity: 6, status: 'available', x: 91, y: 26, shape: 'round', area: 'vip_room' },

  // 4 outdoor tables (on outdoor_patio)
  { id: 23, number: 'T23', capacity: 4, status: 'available', x: 81, y: 77, shape: 'square', area: 'outdoor_patio' },
  { id: 24, number: 'T24', capacity: 4, status: 'available', x: 92, y: 77, shape: 'square', area: 'outdoor_patio' },
  { id: 25, number: 'T25', capacity: 2, status: 'available', x: 81, y: 91, shape: 'round', area: 'outdoor_patio' },
  { id: 26, number: 'T26', capacity: 2, status: 'available', x: 92, y: 91, shape: 'round', area: 'outdoor_patio' },
];

export const TIME_SLOTS: TimeSlot[] = [
  { time: '17:00', label: '5:00 PM', available: true },
  { time: '17:30', label: '5:30 PM', available: true },
  { time: '18:00', label: '6:00 PM', available: true },
  { time: '18:30', label: '6:30 PM', available: false },
  { time: '19:00', label: '7:00 PM', available: true },
  { time: '19:30', label: '7:30 PM', available: true },
  { time: '20:00', label: '8:00 PM', available: false },
  { time: '20:30', label: '8:30 PM', available: true },
  { time: '21:00', label: '9:00 PM', available: true },
  { time: '21:30', label: '9:30 PM', available: true },
];

export const SPECIALS: Special[] = [
  {
    id: 's1',
    name: 'Charred Leek & Mozzarella',
    chef: 'Chef Amara Okafor',
    description:
      'Slow-charred leeks, house mozzarella and our signature garlic mayo, finished with toasted hazelnut.',
    price: 28,
    image:
      'https://cdn.magicpatterns.com/patterns/generated-images/eaa923fe-3365-4e67-9015-e6d602b92559.jpg',
    tag: 'Garlic Mayo',
    tagColor: 'mayo',
    rating: 8.5,
  },
  {
    id: 's2',
    name: 'Buffalo Sriracha Quail',
    chef: 'Chef Amara Okafor',
    description:
      'Glazed quail in buffalo sriracha, cooling herb yogurt and pickled shallot. A study in heat and balance.',
    price: 34,
    image:
      'https://cdn.magicpatterns.com/patterns/generated-images/49a25d58-7688-47ec-b673-737dd4306ea4.jpg',
    tag: 'Buffalo Sriracha',
    tagColor: 'sriracha',
    rating: 9.2,
  },
  {
    id: 's3',
    name: 'Halal Beer-Braised Short Rib',
    chef: 'Chef Amara Okafor',
    description:
      'Short rib braised in amber halal beer, root vegetable purée and a rich reduction. Deeply comforting.',
    price: 42,
    image:
      'https://cdn.magicpatterns.com/patterns/generated-images/ad57b0db-fcad-490c-833e-8d959f676550.jpg',
    tag: 'Halal Beer',
    tagColor: 'amber',
    rating: 8.9,
  },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Heirloom Tomato Carpaccio',
    description: 'Basil oil, aged balsamic, sea salt.',
    price: 16,
    category: 'Starters',
  },
  {
    id: 'm2',
    name: 'Mozzarella & Garlic Mayo Toast',
    description: 'House mozzarella, signature garlic mayo, sourdough.',
    price: 18,
    category: 'Starters',
    signature: 'mayo',
  },
  {
    id: 'm3',
    name: 'Charred Sriracha Cauliflower',
    description: 'Buffalo sriracha glaze, herb yogurt.',
    price: 15,
    category: 'Starters',
    signature: 'sriracha',
  },
  {
    id: 'm4',
    name: 'Garden Herb Risotto',
    description: 'Seasonal herbs, parmesan, lemon.',
    price: 26,
    category: 'Mains',
  },
  {
    id: 'm5',
    name: 'Beer-Braised Short Rib',
    description: 'Amber halal beer reduction, root purée.',
    price: 42,
    category: 'Mains',
    signature: 'amber',
  },
  {
    id: 'm6',
    name: 'Pan-Seared Sea Bass',
    description: 'Fennel, citrus, brown butter.',
    price: 38,
    category: 'Mains',
  },
  {
    id: 'm7',
    name: 'Honey Lavender Panna Cotta',
    description: 'Wildflower honey, lavender, shortbread.',
    price: 13,
    category: 'Desserts',
  },
  {
    id: 'm8',
    name: 'Dark Chocolate Tart',
    description: 'Sea salt, olive oil, crème fraîche.',
    price: 14,
    category: 'Desserts',
  },
  {
    id: 'm9',
    name: 'Amber House Ale',
    description: 'Our signature halal amber beer, on tap.',
    price: 9,
    category: 'Drinks',
    signature: 'amber',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Elena Marchetti',
    role: 'Regular guest',
    quote:
      'The most effortless booking I have ever done — and the food lives up to the room. Every detail feels considered.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'James Whitfield',
    role: 'Food critic',
    quote:
      "NexCafe' balances warmth and precision. The sriracha quail alone is worth the reservation.",
    rating: 5,
  },
  {
    id: 't3',
    name: 'Priya Anand',
    role: 'Celebrated a birthday',
    quote:
      'Booked a table in under a minute on my phone. Walked in and everything was exactly as promised.',
    rating: 5,
  },
];

const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'RES-1042',
    guestName: 'Alice Chen',
    date: '2026-07-14',
    time: '19:00',
    guests: 4,
    tableId: 3,
    status: 'confirmed',
    phone: '+1 555 010 2211',
  },
  {
    id: 'RES-1043',
    guestName: 'Marcus Bell',
    date: '2026-07-14',
    time: '18:30',
    guests: 2,
    tableId: 1,
    status: 'seated',
    phone: '+1 555 044 8890',
  },
  {
    id: 'RES-1044',
    guestName: 'Sofia Alvarez',
    date: '2026-07-14',
    time: '20:30',
    guests: 6,
    tableId: 12,
    status: 'confirmed',
    phone: '+1 555 776 1200',
  },
  {
    id: 'RES-1045',
    guestName: 'David Okoro',
    date: '2026-07-14',
    time: '17:30',
    guests: 2,
    tableId: 8,
    status: 'completed',
    phone: '+1 555 331 9087',
  },
  {
    id: 'RES-1046',
    guestName: 'Hana Kim',
    date: '2026-07-14',
    time: '21:00',
    guests: 8,
    tableId: 9,
    status: 'confirmed',
    phone: '+1 555 902 3345',
  },
  {
    id: 'RES-1047',
    guestName: 'Tom Fletcher',
    date: '2026-07-14',
    time: '19:30',
    guests: 4,
    tableId: 6,
    status: 'cancelled',
    phone: '+1 555 210 5567',
  },
];

export function getReservations(): Reservation[] {
  if (typeof window === 'undefined') return INITIAL_RESERVATIONS;
  const stored = localStorage.getItem('nexcafe_reservations');
  if (!stored) {
    localStorage.setItem('nexcafe_reservations', JSON.stringify(INITIAL_RESERVATIONS));
    return INITIAL_RESERVATIONS;
  }
  return JSON.parse(stored);
}

export function saveReservations(reservations: Reservation[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('nexcafe_reservations', JSON.stringify(reservations));
  }
}

export function addReservation(res: Reservation) {
  const current = getReservations();
  current.push(res);
  saveReservations(current);
}

export function updateReservationStatus(id: string, status: Reservation['status']) {
  const current = getReservations();
  const updated = current.map((r) => r.id === id ? { ...r, status } : r);
  saveReservations(updated);
}

// Analytics — covers mock trend data for the admin dashboard
export const COVERS_TREND: CoversTrendItem[] = [
  { day: 'Mon', covers: 88, reservations: 24 },
  { day: 'Tue', covers: 132, reservations: 38 },
  { day: 'Wed', covers: 121, reservations: 33 },
  { day: 'Thu', covers: 164, reservations: 46 },
  { day: 'Fri', covers: 232, reservations: 68 },
  { day: 'Sat', covers: 268, reservations: 74 },
  { day: 'Sun', covers: 198, reservations: 55 },
];

export const SERVICE_MIX: ServiceMixItem[] = [
  { name: 'Main Hall', value: 40 },
  { name: 'Window Seating', value: 20 },
  { name: 'Outdoor Patio', value: 15 },
  { name: 'VIP Room', value: 10 },
  { name: 'Private Dining', value: 10 },
  { name: 'Bar Area', value: 5 },
];
