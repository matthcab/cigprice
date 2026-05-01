import { PRICE_ROWS, type CigarettePriceRow } from './price-data';
import { getFlagForPlace } from './cities';

export const BRANDS = [
  'Marlboro',
  'Camel',
  'Lucky Strike',
  'Winston',
  'Philip Morris',
  'Chesterfield',
  'Gauloises',
  'Gitanes',
  'L&M',
  'Pall Mall',
  'Rothmans',
  'Dunhill',
  'Kent',
  'Vogue',
  'Davidoff',
  'Benson & Hedges',
  'Parliament',
  'Newport',
  'American Spirit',
  'Terea',
  'Heets',
  'Autre',
];

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

const daysAgo = (dateValue: string) => {
  const timestamp = Date.parse(dateValue);
  if (!Number.isFinite(timestamp)) return 'récemment';
  const days = Math.max(0, Math.round((Date.now() - timestamp) / 86400000));
  if (days === 0) return "aujourd'hui";
  if (days === 1) return '1 j';
  return `${days} j`;
};

const reportCount = (row: CigarettePriceRow) => {
  const spread = row.maxPriceEur && row.minPriceEur ? Math.max(1, row.maxPriceEur - row.minPriceEur) : 1;
  return Math.max(3, Math.round(row.priceEur * 4 + spread * 3));
};

export const FEED_DATA: FeedEntry[] = [...PRICE_ROWS]
  .sort((a, b) => Date.parse(b.updatedAt || b.infoDate) - Date.parse(a.updatedAt || a.infoDate))
  .slice(0, 8)
  .map((row, index) => ({
    id: row.id,
    user: 'CombienCoute',
    avatar: 'C',
    location: row.placeType === 'city' && row.parentPlace ? `${row.place}, ${row.parentPlace}` : row.place,
    flag: getFlagForPlace(row.parentPlace || row.place),
    brand: row.brand,
    price: row.priceEur,
    currency: '€',
    timeAgo: daysAgo(row.updatedAt || row.infoDate),
    upvotes: Math.max(4, reportCount(row) + index),
    verified: true,
    type: 'city',
    country: row.parentPlace || row.place,
  }));

export const STATS = {
  totalPrices: PRICE_ROWS.length,
  citiesCovered: PRICE_ROWS.filter((row) => row.placeType === 'city').length,
  contributors: PRICE_ROWS.length,
};

export const TOP_CITIES: TopCity[] = PRICE_ROWS
  .filter((row) => row.placeType === 'city')
  .sort((a, b) => a.priceEur - b.priceEur)
  .slice(0, 100)
  .map((row, index) => ({
    rank: index + 1,
    city: row.place,
    country: row.parentPlace || 'Monde',
    flag: getFlagForPlace(row.parentPlace || row.place),
    avgPrice: row.priceEur,
    currency: '€',
    priceCount: reportCount(row),
    trend: 'stable',
  }));

export function formatPrice(price: number, currency: string): string {
  return price.toFixed(2).replace('.', ',') + currency;
}

export function getPriceDelta(price: number, bestPrice: number, currency: string): string | null {
  if (price <= bestPrice) return null;
  const delta = price - bestPrice;
  return '+' + delta.toFixed(2).replace('.', ',') + currency;
}
