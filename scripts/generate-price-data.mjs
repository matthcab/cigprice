import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const csvPath = join(root, 'combien_coute_cigarette_prix_recents.csv');
const outPath = join(root, 'src/lib/generated/price-rows.json');

const parseNumber = (value) => {
  const parsed = Number(String(value ?? '').replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : undefined;
};

const slugify = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

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

const [rawHeader, ...rawRows] = parseCsv(readFileSync(csvPath, 'utf8').replace(/^\uFEFF/, ''));
const header = rawHeader.map((cell) => cell.trim());
const cell = (row, name) => row[header.indexOf(name)]?.trim() ?? '';

const rows = rawRows
  .map((row) => {
    const priceEur = parseNumber(cell(row, 'prix_paquet_eur')) ?? parseNumber(cell(row, 'prix_moyen_eur_courant'));
    const place = cell(row, 'lieu');
    if (!place || priceEur === undefined) return null;

    const placeType = cell(row, 'type_lieu') === 'ville' ? 'city' : 'country';
    const parentPlace = cell(row, 'parent_lieu');

    return {
      id: `${placeType}-${slugify(parentPlace ? `${parentPlace}-${place}` : place)}`,
      place,
      placeType,
      parentPlace,
      brand: cell(row, 'marque') || 'Marlboro',
      infoDate: cell(row, 'date_information'),
      updatedAt: cell(row, 'date_derniere_mise_a_jour') || cell(row, 'date_information'),
      priceEur,
      minPriceEur: parseNumber(cell(row, 'prix_min_eur_courant')),
      maxPriceEur: parseNumber(cell(row, 'prix_max_eur_courant')),
      localPrice: parseNumber(cell(row, 'prix_paquet_local')),
      localCurrencyCode: cell(row, 'devise_locale_code'),
      localCurrencyName: cell(row, 'devise_locale_nom'),
      sourceUrl: cell(row, 'source_url'),
    };
  })
  .filter(Boolean);

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, `${JSON.stringify(rows, null, 2)}\n`);
console.log(`Generated ${rows.length} price rows from ${csvPath}`);
