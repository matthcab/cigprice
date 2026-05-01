import { PRICE_ROWS, normalizeText } from './price-data';

export interface City {
  id: string;
  name: string;
  country: string;
  flag: string;
  cityPrice?: number;
  placeType: 'city' | 'country';
  hasPrice: boolean;
  source?: 'csv' | 'catalog';
}

const ISO_COUNTRY_CODES =
  'AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW'.split(
    ' ',
  );

const MANUAL_COUNTRY_ALIASES: Record<string, string> = {
  angleterre: 'GB',
  ecosse: 'GB',
  'etats unis': 'US',
  usa: 'US',
  amerique: 'US',
  russie: 'RU',
  coree: 'KR',
  'coree du sud': 'KR',
  emirats: 'AE',
  'emirats arabes unis': 'AE',
  birmanie: 'MM',
  myanmar: 'MM',
  tchequie: 'CZ',
  'republique tcheque': 'CZ',
  turquie: 'TR',
};

const EXTRA_MAJOR_CITIES: Array<{ name: string; country: string }> = [
  { name: 'Londres', country: 'Royaume-Uni' },
  { name: 'London', country: 'Royaume-Uni' },
  { name: 'New York', country: 'États-Unis' },
  { name: 'Los Angeles', country: 'États-Unis' },
  { name: 'Chicago', country: 'États-Unis' },
  { name: 'Houston', country: 'États-Unis' },
  { name: 'Miami', country: 'États-Unis' },
  { name: 'San Francisco', country: 'États-Unis' },
  { name: 'Toronto', country: 'Canada' },
  { name: 'Vancouver', country: 'Canada' },
  { name: 'Mexico', country: 'Mexique' },
  { name: 'Mexico City', country: 'Mexique' },
  { name: 'São Paulo', country: 'Brésil' },
  { name: 'Rio de Janeiro', country: 'Brésil' },
  { name: 'Buenos Aires', country: 'Argentine' },
  { name: 'Santiago', country: 'Chili' },
  { name: 'Lima', country: 'Pérou' },
  { name: 'Bogota', country: 'Colombie' },
  { name: 'Madrid', country: 'Espagne' },
  { name: 'Barcelone', country: 'Espagne' },
  { name: 'Barcelona', country: 'Espagne' },
  { name: 'Lisbonne', country: 'Portugal' },
  { name: 'Lisbon', country: 'Portugal' },
  { name: 'Rome', country: 'Italie' },
  { name: 'Milan', country: 'Italie' },
  { name: 'Venise', country: 'Italie' },
  { name: 'Berlin', country: 'Allemagne' },
  { name: 'Munich', country: 'Allemagne' },
  { name: 'Hambourg', country: 'Allemagne' },
  { name: 'Amsterdam', country: 'Pays-Bas' },
  { name: 'Bruxelles', country: 'Belgique' },
  { name: 'Brussels', country: 'Belgique' },
  { name: 'Zurich', country: 'Suisse' },
  { name: 'Genève', country: 'Suisse' },
  { name: 'Vienne', country: 'Autriche' },
  { name: 'Vienna', country: 'Autriche' },
  { name: 'Prague', country: 'Tchéquie' },
  { name: 'Varsovie', country: 'Pologne' },
  { name: 'Warsaw', country: 'Pologne' },
  { name: 'Budapest', country: 'Hongrie' },
  { name: 'Athènes', country: 'Grèce' },
  { name: 'Istanbul', country: 'Turquie' },
  { name: 'Moscou', country: 'Russie' },
  { name: 'Moscow', country: 'Russie' },
  { name: 'Dubaï', country: 'Émirats Arabes Unis' },
  { name: 'Dubai', country: 'Émirats Arabes Unis' },
  { name: 'Abu Dhabi', country: 'Émirats Arabes Unis' },
  { name: 'Doha', country: 'Qatar' },
  { name: 'Riyad', country: 'Arabie Saoudite' },
  { name: 'Riyadh', country: 'Arabie Saoudite' },
  { name: 'Tel Aviv', country: 'Israël' },
  { name: 'Le Caire', country: 'Égypte' },
  { name: 'Cairo', country: 'Égypte' },
  { name: 'Casablanca', country: 'Maroc' },
  { name: 'Marrakech', country: 'Maroc' },
  { name: 'Tunis', country: 'Tunisie' },
  { name: 'Alger', country: 'Algérie' },
  { name: 'Lagos', country: 'Nigeria' },
  { name: 'Nairobi', country: 'Kenya' },
  { name: 'Le Cap', country: 'Afrique du Sud' },
  { name: 'Cape Town', country: 'Afrique du Sud' },
  { name: 'Johannesburg', country: 'Afrique du Sud' },
  { name: 'Mumbai', country: 'Inde' },
  { name: 'Delhi', country: 'Inde' },
  { name: 'Bangalore', country: 'Inde' },
  { name: 'Bangkok', country: 'Thaïlande' },
  { name: 'Singapour', country: 'Singapour' },
  { name: 'Singapore', country: 'Singapour' },
  { name: 'Hong Kong', country: 'Hong Kong' },
  { name: 'Shanghai', country: 'Chine' },
  { name: 'Pékin', country: 'Chine' },
  { name: 'Beijing', country: 'Chine' },
  { name: 'Séoul', country: 'Corée du Sud' },
  { name: 'Seoul', country: 'Corée du Sud' },
  { name: 'Tokyo', country: 'Japon' },
  { name: 'Osaka', country: 'Japon' },
  { name: 'Taipei', country: 'Taïwan' },
  { name: 'Jakarta', country: 'Indonésie' },
  { name: 'Manille', country: 'Philippines' },
  { name: 'Manila', country: 'Philippines' },
  { name: 'Sydney', country: 'Australie' },
  { name: 'Melbourne', country: 'Australie' },
  { name: 'Auckland', country: 'Nouvelle-Zélande' },
];

const countryNameFormatters =
  typeof Intl !== 'undefined' && typeof Intl.DisplayNames !== 'undefined'
    ? [new Intl.DisplayNames(['fr'], { type: 'region' }), new Intl.DisplayNames(['en'], { type: 'region' })]
    : [];

const codeByCountryName = new Map<string, string>();

for (const code of ISO_COUNTRY_CODES) {
  for (const formatter of countryNameFormatters) {
    const name = formatter.of(code);
    if (name) codeByCountryName.set(normalizeText(name), code);
  }
}

for (const [name, code] of Object.entries(MANUAL_COUNTRY_ALIASES)) {
  codeByCountryName.set(normalizeText(name), code);
}

const codeToFlag = (code: string) =>
  code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));

export const getFlagForPlace = (place: string) => {
  const code = codeByCountryName.get(normalizeText(place));
  return code ? codeToFlag(code) : '🌍';
};

const slugify = (value: string) =>
  normalizeText(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const byId = new Map<string, City>();

const upsertCity = (city: City) => {
  const existing = byId.get(city.id);
  if (!existing || (!existing.hasPrice && city.hasPrice)) byId.set(city.id, city);
};

for (const row of PRICE_ROWS) {
  const country = row.parentPlace || row.place;
  upsertCity({
    id: `${row.placeType}-${slugify(country)}-${slugify(row.place)}`,
    name: row.place,
    country: row.placeType === 'country' ? row.place : country,
    flag: getFlagForPlace(country),
    cityPrice: row.priceEur,
    placeType: row.placeType,
    hasPrice: true,
    source: 'csv',
  });
}

for (const code of ISO_COUNTRY_CODES) {
  const name = countryNameFormatters[0]?.of(code);
  if (!name) continue;
  upsertCity({
    id: `country-${slugify(name)}`,
    name,
    country: name,
    flag: codeToFlag(code),
    placeType: 'country',
    hasPrice: false,
    source: 'catalog',
  });
}

for (const city of EXTRA_MAJOR_CITIES) {
  upsertCity({
    id: `city-${slugify(city.country)}-${slugify(city.name)}`,
    name: city.name,
    country: city.country,
    flag: getFlagForPlace(city.country),
    placeType: 'city',
    hasPrice: false,
    source: 'catalog',
  });
}

export const CITIES: City[] = Array.from(byId.values()).sort((a, b) => {
  if (a.hasPrice !== b.hasPrice) return a.hasPrice ? -1 : 1;
  if (a.placeType !== b.placeType) return a.placeType === 'country' ? -1 : 1;
  return a.name.localeCompare(b.name, 'fr');
});

export function searchCities(query: string, maxResults = 10): City[] {
  if (!query || query.trim().length < 1) return [];
  const q = normalizeText(query);

  const starts: City[] = [];
  const contains: City[] = [];
  const countryMatch: City[] = [];

  for (const city of CITIES) {
    const name = normalizeText(city.name);
    const country = normalizeText(city.country);

    if (name.startsWith(q)) {
      starts.push(city);
    } else if (name.includes(q)) {
      contains.push(city);
    } else if (country.startsWith(q) || country.includes(q)) {
      countryMatch.push(city);
    }
  }

  return [...starts, ...contains, ...countryMatch].slice(0, maxResults);
}

export function getCityById(id: string): City | undefined {
  return CITIES.find((city) => city.id === id);
}

export function getCityByName(name: string): City | undefined {
  const q = normalizeText(name);
  return CITIES.find((city) => normalizeText(city.name) === q);
}
