export const BRANDS = ['Marlboro', 'Camel', 'Lucky Strike', 'Winston', 'Philip Morris'];

export interface FeedEntry {
  id: string;
  user: string;
  avatar: string;
  location: string;
  flag: string;
  brand: string;
  price: number;
  currency: string;
  timeAgo: string;
  upvotes: number;
  verified: boolean;
  type: 'airport' | 'city';
  country: string;
}

export interface PriceResult {
  rank: number;
  location: string;
  sublocation: string;
  flag: string;
  brand: string;
  price: number;
  currency: string;
  type: 'airport' | 'city';
  reports: number;
  best?: boolean;
  worst?: boolean;
}

export interface TopCity {
  rank: number;
  city: string;
  country: string;
  flag: string;
  avgPrice: number;
  currency: string;
  priceCount: number;
  trend: 'up' | 'down' | 'stable';
}

export const FEED_DATA: FeedEntry[] = [
  {
    id: '1',
    user: 'Marco_F',
    avatar: 'M',
    location: 'Aéroport BCN · T1',
    flag: '🇪🇸',
    brand: 'Marlboro',
    price: 5.9,
    currency: '€',
    timeAgo: '3 min',
    upvotes: 14,
    verified: true,
    type: 'airport',
    country: 'Espagne',
  },
  {
    id: '2',
    user: 'Fumeur42',
    avatar: 'F',
    location: 'Dubai Duty-Free',
    flag: '🇦🇪',
    brand: 'Camel',
    price: 3.2,
    currency: '€',
    timeAgo: '1h',
    upvotes: 38,
    verified: true,
    type: 'airport',
    country: 'Émirats',
  },
  {
    id: '3',
    user: 'Traveler_J',
    avatar: 'T',
    location: 'Varsovie centre',
    flag: '🇵🇱',
    brand: 'Lucky Strike',
    price: 4.1,
    currency: '€',
    timeAgo: '2h',
    upvotes: 9,
    verified: false,
    type: 'city',
    country: 'Pologne',
  },
  {
    id: '4',
    user: 'Nadia_V',
    avatar: 'N',
    location: 'Aéroport CDG · T2E',
    flag: '🇫🇷',
    brand: 'Marlboro',
    price: 11.8,
    currency: '€',
    timeAgo: '4h',
    upvotes: 6,
    verified: true,
    type: 'airport',
    country: 'France',
  },
  {
    id: '5',
    user: 'SmokerPro',
    avatar: 'S',
    location: 'Amsterdam Centraal',
    flag: '🇳🇱',
    brand: 'Winston',
    price: 8.5,
    currency: '€',
    timeAgo: '6h',
    upvotes: 21,
    verified: true,
    type: 'city',
    country: 'Pays-Bas',
  },
  {
    id: '6',
    user: 'Jeanne_T',
    avatar: 'J',
    location: 'Aéroport AMS · Schiphol',
    flag: '🇳🇱',
    brand: 'Marlboro',
    price: 9.2,
    currency: '€',
    timeAgo: '8h',
    upvotes: 12,
    verified: false,
    type: 'airport',
    country: 'Pays-Bas',
  },
];

export const STATS = {
  totalPrices: 1247,
  citiesCovered: 84,
  contributors: 2394,
};

export const RESULTS_DATA: Record<string, PriceResult[]> = {
  'Paris-Madrid': [
    {
      rank: 1,
      location: 'En ville à Madrid',
      sublocation: 'Tabac Estanco · Centre',
      flag: '🇪🇸',
      brand: 'Marlboro',
      price: 5.2,
      currency: '€',
      type: 'city',
      reports: 18,
      best: true,
    },
    {
      rank: 2,
      location: 'Aéroport MAD · T4',
      sublocation: 'Duty-Free Dufry',
      flag: '🇪🇸',
      brand: 'Marlboro',
      price: 6.8,
      currency: '€',
      type: 'airport',
      reports: 24,
    },
    {
      rank: 3,
      location: 'Aéroport CDG · T2E',
      sublocation: 'Relay · Salle embarquement',
      flag: '🇫🇷',
      brand: 'Marlboro',
      price: 9.5,
      currency: '€',
      type: 'airport',
      reports: 31,
    },
    {
      rank: 4,
      location: 'En ville à Paris',
      sublocation: 'Tabac moyen Paris intra-muros',
      flag: '🇫🇷',
      brand: 'Marlboro',
      price: 11.2,
      currency: '€',
      type: 'city',
      reports: 42,
      worst: true,
    },
  ],
  'default': [
    {
      rank: 1,
      location: 'En ville à destination',
      sublocation: 'Tabac local · Centre-ville',
      flag: '🌍',
      brand: 'Marlboro',
      price: 5.5,
      currency: '€',
      type: 'city',
      reports: 12,
      best: true,
    },
    {
      rank: 2,
      location: 'Aéroport destination · Duty-Free',
      sublocation: 'Duty-Free international',
      flag: '🌍',
      brand: 'Marlboro',
      price: 7.2,
      currency: '€',
      type: 'airport',
      reports: 19,
    },
    {
      rank: 3,
      location: 'Aéroport départ',
      sublocation: 'Boutique zone embarquement',
      flag: '🇫🇷',
      brand: 'Marlboro',
      price: 10.0,
      currency: '€',
      type: 'airport',
      reports: 27,
    },
    {
      rank: 4,
      location: 'En ville au départ',
      sublocation: 'Tabac ville de départ',
      flag: '🇫🇷',
      brand: 'Marlboro',
      price: 11.5,
      currency: '€',
      type: 'city',
      reports: 35,
      worst: true,
    },
  ],
};

export const TOP_CITIES: TopCity[] = [
  { rank: 1, city: 'Dubaï', country: 'Émirats', flag: '🇦🇪', avgPrice: 3.1, currency: '€', priceCount: 128, trend: 'stable' },
  { rank: 2, city: 'Budapest', country: 'Hongrie', flag: '🇭🇺', avgPrice: 3.8, currency: '€', priceCount: 94, trend: 'down' },
  { rank: 3, city: 'Varsovie', country: 'Pologne', flag: '🇵🇱', avgPrice: 4.2, currency: '€', priceCount: 112, trend: 'stable' },
  { rank: 4, city: 'Prague', country: 'Tchéquie', flag: '🇨🇿', avgPrice: 4.5, currency: '€', priceCount: 87, trend: 'up' },
  { rank: 5, city: 'Barcelone', country: 'Espagne', flag: '🇪🇸', avgPrice: 5.5, currency: '€', priceCount: 203, trend: 'stable' },
  { rank: 6, city: 'Lisbonne', country: 'Portugal', flag: '🇵🇹', avgPrice: 5.8, currency: '€', priceCount: 156, trend: 'up' },
  { rank: 7, city: 'Berlin', country: 'Allemagne', flag: '🇩🇪', avgPrice: 7.2, currency: '€', priceCount: 178, trend: 'up' },
  { rank: 8, city: 'Amsterdam', country: 'Pays-Bas', flag: '🇳🇱', avgPrice: 8.8, currency: '€', priceCount: 134, trend: 'up' },
  { rank: 9, city: 'Londres', country: 'Royaume-Uni', flag: '🇬🇧', avgPrice: 14.5, currency: '€', priceCount: 211, trend: 'up' },
  { rank: 10, city: 'Paris', country: 'France', flag: '🇫🇷', avgPrice: 11.2, currency: '€', priceCount: 342, trend: 'up' },
];

export const POPULAR_ROUTES = [
  { from: 'Paris', to: 'Barcelone' },
  { from: 'Paris', to: 'Madrid' },
  { from: 'Paris', to: 'Lisbonne' },
  { from: 'Paris', to: 'Dubaï' },
  { from: 'Paris', to: 'Budapest' },
];

export function formatPrice(price: number, currency: string): string {
  return price.toFixed(2).replace('.', ',') + currency;
}

export function getPriceDelta(price: number, bestPrice: number, currency: string): string | null {
  if (price <= bestPrice) return null;
  const delta = price - bestPrice;
  return '+' + delta.toFixed(2).replace('.', ',') + currency;
}
