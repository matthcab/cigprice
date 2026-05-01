import airportRows from '@/lib/generated/airports.json';

export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
  countryCode?: string;
  type?: 'large_airport' | 'medium_airport' | 'small_airport';
  aliases?: string[];
}

const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const startsWithWord = (value: string, query: string) =>
  value === query || value.startsWith(`${query} `) || value.includes(` ${query}`);

const typeBoost = (airport: Airport) => {
  if (airport.type === 'large_airport') return 0;
  if (airport.type === 'medium_airport') return 1;
  return 2;
};

export const AIRPORTS = airportRows as Airport[];

export const getAirportByCode = (code: string) =>
  AIRPORTS.find((airport) => airport.code.toLowerCase() === code.toLowerCase());

export function searchAirports(query: string, maxResults = 8): Airport[] {
  if (!query.trim()) return [];

  const q = normalize(query);
  const tokens = q.split(' ').filter(Boolean);

  return AIRPORTS.map((airport, index) => {
    const code = airport.code.toLowerCase();
    const name = normalize(airport.name);
    const city = normalize(airport.city);
    const country = normalize(airport.country);
    const aliases = (airport.aliases ?? []).map(normalize);
    const searchable = [code, name, city, country, ...aliases].join(' ');

    let score = Number.POSITIVE_INFINITY;

    if (code === q) {
      score = 0;
    } else if (code.startsWith(q)) {
      score = 1;
    } else if (startsWithWord(city, q)) {
      score = 2;
    } else if (startsWithWord(name, q)) {
      score = 3;
    } else if (aliases.some((alias) => startsWithWord(alias, q))) {
      score = 4;
    } else if (city.includes(q)) {
      score = 5;
    } else if (name.includes(q)) {
      score = 6;
    } else if (aliases.some((alias) => alias.includes(q))) {
      score = 7;
    } else if (country.includes(q)) {
      score = 8;
    } else if (tokens.length > 1 && tokens.every((token) => searchable.includes(token))) {
      score = 9;
    }

    if (!Number.isFinite(score)) return null;

    return {
      airport,
      rank: score * 10_000 + typeBoost(airport) * 1_000 + index,
    };
  })
    .filter((match): match is { airport: Airport; rank: number } => match !== null)
    .sort((a, b) => a.rank - b.rank)
    .slice(0, maxResults)
    .map((match) => match.airport);
}
