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

const cityAirportPriority: Record<string, string[]> = {
  paris: ['CDG', 'ORY', 'LBG'],
  london: ['LHR', 'LGW', 'STN', 'LTN', 'LCY'],
  'new york': ['JFK', 'EWR', 'LGA'],
  tokyo: ['HND', 'NRT'],
  istanbul: ['IST', 'SAW'],
  bangkok: ['BKK', 'DMK'],
  milan: ['MXP', 'LIN', 'BGY'],
  rome: ['FCO', 'CIA'],
};

interface AirportPlace {
  name: string;
  country?: string;
}

export const AIRPORTS = airportRows as Airport[];

export const getAirportByCode = (code: string) =>
  AIRPORTS.find((airport) => airport.code.toLowerCase() === code.toLowerCase());

export function getAirportsForCity(place: AirportPlace, maxResults = 2): Airport[] {
  const city = normalize(place.name);
  const country = place.country ? normalize(place.country) : '';
  const priority = cityAirportPriority[city] ?? [];

  const matchesWithCountry = AIRPORTS.filter((airport) => {
    const airportCity = normalize(airport.city);
    const airportCountry = normalize(airport.country);
    return airportCity === city && (!country || airportCountry === country);
  });

  const matches = matchesWithCountry.length > 0
    ? matchesWithCountry
    : AIRPORTS.filter((airport) => normalize(airport.city) === city);

  const fallbackMatches = matches.length > 0 ? matches : searchAirports(place.name, 12).filter((airport) => {
    const airportCountry = normalize(airport.country);
    return !country || airportCountry === country;
  });

  const largestType = fallbackMatches.some((airport) => airport.type === 'large_airport')
    ? 'large_airport'
    : fallbackMatches.some((airport) => airport.type === 'medium_airport')
      ? 'medium_airport'
      : 'small_airport';

  return fallbackMatches
    .filter((airport) => airport.type === largestType)
    .sort((a, b) => {
      const priorityA = priority.indexOf(a.code);
      const priorityB = priority.indexOf(b.code);
      if (priorityA !== -1 || priorityB !== -1) {
        if (priorityA === -1) return 1;
        if (priorityB === -1) return -1;
        return priorityA - priorityB;
      }
      const airportTypePriority = typeBoost(a) - typeBoost(b);
      if (airportTypePriority !== 0) return airportTypePriority;
      return `${a.city} ${a.name}`.localeCompare(`${b.city} ${b.name}`, 'fr');
    })
    .slice(0, maxResults);
}

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
