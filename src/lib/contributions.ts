import type { Airport } from './airports';
import { type City, getFlagForPlace } from './cities';
import type { FeedEntry } from './data';
import { normalizeText } from './price-data';

export const CONTRIBUTIONS_UPDATED_EVENT = 'cigprice:contributions-updated';

const STORAGE_KEY = 'cigprice:price-contributions:v1';
const MAX_STORED_CONTRIBUTIONS = 300;

export interface PriceContribution {
  id: string;
  placeType: 'city' | 'airport';
  place: string;
  city: string;
  country: string;
  airportCode?: string;
  airportName?: string;
  shopName?: string;
  brand: string;
  priceEur: number;
  createdAt: string;
}

export interface NewPriceContribution {
  placeType: 'city' | 'airport';
  place: string;
  city: string;
  country?: string;
  airportCode?: string;
  airportName?: string;
  shopName?: string;
  brand: string;
  priceEur: number;
}

const isBrowser = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

const slugify = (value: string) =>
  normalizeText(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const asRecord = (value: unknown): Record<string, unknown> | null =>
  value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : null;

const cleanText = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const cleanPrice = (value: unknown) => {
  const price = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(price) || price <= 0) return null;
  return Math.round(price * 100) / 100;
};

const readStoredContribution = (value: unknown): PriceContribution | null => {
  const record = asRecord(value);
  if (!record) return null;

  const placeType = record.placeType === 'airport' ? 'airport' : record.placeType === 'city' ? 'city' : null;
  const place = cleanText(record.place);
  const city = cleanText(record.city) || place;
  const brand = cleanText(record.brand);
  const priceEur = cleanPrice(record.priceEur);
  const createdAt = cleanText(record.createdAt);

  if (!placeType || !place || !brand || priceEur === null || Number.isNaN(Date.parse(createdAt))) {
    return null;
  }

  return {
    id: cleanText(record.id) || `local-${createdAt}-${slugify(place)}-${slugify(brand)}`,
    placeType,
    place,
    city,
    country: cleanText(record.country),
    airportCode: cleanText(record.airportCode).toUpperCase() || undefined,
    airportName: cleanText(record.airportName) || undefined,
    shopName: cleanText(record.shopName) || undefined,
    brand,
    priceEur,
    createdAt,
  };
};

export function readPriceContributions(): PriceContribution[] {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map(readStoredContribution)
      .filter((contribution): contribution is PriceContribution => Boolean(contribution))
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  } catch {
    return [];
  }
}

export function savePriceContribution(input: NewPriceContribution): PriceContribution {
  const priceEur = cleanPrice(input.priceEur);
  const place = input.place.trim();
  const city = input.city.trim() || place;
  const brand = input.brand.trim();

  if (!place || !brand || priceEur === null) {
    throw new Error('Contribution invalide');
  }

  const createdAt = new Date().toISOString();
  const contribution: PriceContribution = {
    id: `local-${createdAt}-${slugify(place)}-${slugify(brand)}`,
    placeType: input.placeType,
    place,
    city,
    country: input.country?.trim() ?? '',
    airportCode: input.airportCode?.trim().toUpperCase() || undefined,
    airportName: input.airportName?.trim() || undefined,
    shopName: input.shopName?.trim() || undefined,
    brand,
    priceEur,
    createdAt,
  };

  if (!isBrowser()) return contribution;

  const next = [contribution, ...readPriceContributions()].slice(0, MAX_STORED_CONTRIBUTIONS);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(CONTRIBUTIONS_UPDATED_EVENT));
  return contribution;
}

const sameBrand = (left: string, right: string) => normalizeText(left) === normalizeText(right);

const newestFirst = (a: PriceContribution, b: PriceContribution) =>
  Date.parse(b.createdAt) - Date.parse(a.createdAt);

export function getLatestCityContribution(
  placeName: string,
  brand: string,
  contributions: PriceContribution[],
): PriceContribution | undefined {
  const target = normalizeText(placeName);
  return [...contributions]
    .filter(
      (contribution) =>
        contribution.placeType === 'city' &&
        normalizeText(contribution.place) === target &&
        sameBrand(contribution.brand, brand),
    )
    .sort(newestFirst)[0];
}

export function countCityContributions(
  placeName: string,
  brand: string,
  contributions: PriceContribution[],
) {
  const target = normalizeText(placeName);
  return contributions.filter(
    (contribution) =>
      contribution.placeType === 'city' &&
      normalizeText(contribution.place) === target &&
      sameBrand(contribution.brand, brand),
  ).length;
}

export function getLatestAirportContribution(
  airport: Airport,
  brand: string,
  contributions: PriceContribution[],
): PriceContribution | undefined {
  const airportKeys = new Set([airport.code, airport.name, ...(airport.aliases ?? [])].map(normalizeText));
  return [...contributions]
    .filter((contribution) => {
      if (contribution.placeType !== 'airport' || !sameBrand(contribution.brand, brand)) return false;
      const contributionKeys = [
        contribution.airportCode,
        contribution.airportName,
        contribution.place,
      ].filter(Boolean) as string[];
      return contributionKeys.some((key) => airportKeys.has(normalizeText(key)));
    })
    .sort(newestFirst)[0];
}

export function countAirportContributions(
  airport: Airport,
  brand: string,
  contributions: PriceContribution[],
) {
  const airportKeys = new Set([airport.code, airport.name, ...(airport.aliases ?? [])].map(normalizeText));
  return contributions.filter((contribution) => {
    if (contribution.placeType !== 'airport' || !sameBrand(contribution.brand, brand)) return false;
    const contributionKeys = [
      contribution.airportCode,
      contribution.airportName,
      contribution.place,
    ].filter(Boolean) as string[];
    return contributionKeys.some((key) => airportKeys.has(normalizeText(key)));
  }).length;
}

export function getContributedCityByName(
  placeName: string,
  contributions: PriceContribution[],
): City | undefined {
  const target = normalizeText(placeName);
  const contribution = [...contributions]
    .filter((item) => item.placeType === 'city' && normalizeText(item.place) === target)
    .sort(newestFirst)[0];

  if (!contribution) return undefined;

  return {
    id: `contribution-city-${slugify(contribution.country || contribution.place)}-${slugify(contribution.place)}`,
    name: contribution.place,
    country: contribution.country || contribution.place,
    flag: getFlagForPlace(contribution.country || contribution.place),
    cityPrice: contribution.priceEur,
    placeType: 'city',
    hasPrice: true,
    source: 'contribution',
  };
}

export function searchContributedCities(
  query: string,
  contributions: PriceContribution[],
  maxResults = 10,
): City[] {
  const q = normalizeText(query);
  if (!q) return [];

  const byPlace = new Map<string, PriceContribution>();
  for (const contribution of [...contributions].sort(newestFirst)) {
    if (contribution.placeType !== 'city') continue;
    const key = `${normalizeText(contribution.place)}|${normalizeText(contribution.country)}`;
    if (!byPlace.has(key)) byPlace.set(key, contribution);
  }

  return Array.from(byPlace.values())
    .filter((contribution) => {
      const place = normalizeText(contribution.place);
      const country = normalizeText(contribution.country);
      return place.startsWith(q) || place.includes(q) || country.startsWith(q) || country.includes(q);
    })
    .slice(0, maxResults)
    .map((contribution) => ({
      id: `contribution-city-${slugify(contribution.country || contribution.place)}-${slugify(contribution.place)}`,
      name: contribution.place,
      country: contribution.country || contribution.place,
      flag: getFlagForPlace(contribution.country || contribution.place),
      cityPrice: contribution.priceEur,
      placeType: 'city',
      hasPrice: true,
      source: 'contribution',
    }));
}

export function mergeCitySearchResults(baseResults: City[], contributedResults: City[], maxResults = 10): City[] {
  const byKey = new Map<string, City>();

  for (const city of baseResults) {
    const key = `${normalizeText(city.name)}|${normalizeText(city.country)}`;
    const contributed = contributedResults.find(
      (item) => normalizeText(item.name) === normalizeText(city.name) && normalizeText(item.country) === normalizeText(city.country),
    );
    byKey.set(key, contributed ? { ...city, cityPrice: contributed.cityPrice, hasPrice: true } : city);
  }

  for (const city of contributedResults) {
    const key = `${normalizeText(city.name)}|${normalizeText(city.country)}`;
    if (!byKey.has(key)) byKey.set(key, city);
  }

  return Array.from(byKey.values()).slice(0, maxResults);
}

const timeAgo = (createdAt: string) => {
  const minutes = Math.max(0, Math.round((Date.now() - Date.parse(createdAt)) / 60000));
  if (minutes < 1) return "à l'instant";
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h`;
  const days = Math.round(hours / 24);
  return `${days} j`;
};

export function priceContributionsToFeedEntries(contributions: PriceContribution[]): FeedEntry[] {
  return contributions.slice(0, 8).map((contribution) => ({
    id: contribution.id,
    user: 'Contribution',
    avatar: 'C',
    location:
      contribution.placeType === 'airport' && contribution.airportCode
        ? `${contribution.airportCode} · ${contribution.airportName ?? contribution.place}`
        : contribution.country
          ? `${contribution.place}, ${contribution.country}`
          : contribution.place,
    flag: contribution.placeType === 'airport' ? '✈️' : getFlagForPlace(contribution.country || contribution.place),
    brand: contribution.brand,
    price: contribution.priceEur,
    currency: '€',
    timeAgo: timeAgo(contribution.createdAt),
    upvotes: 1,
    verified: false,
    type: contribution.placeType,
    country: contribution.country || contribution.place,
  }));
}

export function countContributedCities(contributions: PriceContribution[]) {
  return new Set(
    contributions
      .filter((contribution) => contribution.placeType === 'city')
      .map((contribution) => `${normalizeText(contribution.place)}|${normalizeText(contribution.country)}`),
  ).size;
}
