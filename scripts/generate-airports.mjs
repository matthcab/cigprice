import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const AIRPORTS_URL = 'https://davidmegginson.github.io/ourairports-data/airports.csv';
const COUNTRIES_URL = 'https://davidmegginson.github.io/ourairports-data/countries.csv';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outPath = join(root, 'src/lib/generated/airports.json');

const parseCsv = (text) => {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        field += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(field);
      field = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && next === '\n') i += 1;
      row.push(field);
      if (row.some((cell) => cell.length > 0)) rows.push(row);
      row = [];
      field = '';
    } else {
      field += char;
    }
  }

  row.push(field);
  if (row.some((cell) => cell.length > 0)) rows.push(row);
  return rows;
};

const rowsToObjects = (text) => {
  const [rawHeader, ...rawRows] = parseCsv(text.replace(/^\uFEFF/, ''));
  const header = rawHeader.map((cell) => cell.trim());

  return rawRows.map((row) =>
    Object.fromEntries(header.map((name, index) => [name, row[index]?.trim() ?? ''])),
  );
};

const fetchCsv = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download ${url}: ${response.status}`);
  return response.text();
};

const cleanCity = (municipality) =>
  municipality
    .replace(/\s*\(.+?\)\s*/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const unique = (values) => [...new Set(values.map((value) => value.trim()).filter(Boolean))];

const countryName = (() => {
  const displayNames = new Intl.DisplayNames(['fr'], { type: 'region' });
  return (code, fallback) => displayNames.of(code) ?? fallback;
})();

const typePriority = {
  large_airport: 0,
  medium_airport: 1,
  small_airport: 2,
};

const [airportRows, countryRows] = await Promise.all([
  fetchCsv(AIRPORTS_URL).then(rowsToObjects),
  fetchCsv(COUNTRIES_URL).then(rowsToObjects),
]);

const countriesByCode = new Map(countryRows.map((country) => [country.code, country.name]));

const airports = airportRows
  .filter(
    (airport) =>
      airport.iata_code &&
      airport.scheduled_service === 'yes' &&
      ['large_airport', 'medium_airport', 'small_airport'].includes(airport.type),
  )
  .map((airport) => {
    const city = cleanCity(airport.municipality) || airport.municipality || airport.name;
    const country = countryName(airport.iso_country, countriesByCode.get(airport.iso_country) ?? airport.iso_country);
    const aliases = unique([
      airport.ident,
      airport.icao_code,
      airport.gps_code,
      airport.local_code,
      airport.municipality,
      ...airport.keywords.split(','),
    ]).filter((alias) => alias !== airport.iata_code && alias !== airport.name && alias !== city && alias !== country);

    return {
      code: airport.iata_code,
      name: airport.name,
      city,
      country,
      countryCode: airport.iso_country,
      type: airport.type,
      aliases,
    };
  })
  .sort((a, b) => {
    const priority = typePriority[a.type] - typePriority[b.type];
    if (priority !== 0) return priority;
    return `${a.country} ${a.city} ${a.name}`.localeCompare(`${b.country} ${b.city} ${b.name}`, 'fr');
  });

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, `${JSON.stringify(airports, null, 2)}\n`);
console.log(`Generated ${airports.length} airports from OurAirports`);
