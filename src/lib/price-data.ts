import generatedRows from './generated/price-rows.json';

export interface CigarettePriceRow {
  id: string;
  place: string;
  placeType: 'city' | 'country';
  parentPlace: string;
  brand: string;
  infoDate: string;
  updatedAt: string;
  priceEur: number;
  minPriceEur?: number;
  maxPriceEur?: number;
  localPrice?: number;
  localCurrencyCode: string;
  localCurrencyName: string;
  sourceUrl: string;
}

export const PRICE_ROWS: CigarettePriceRow[] = generatedRows as CigarettePriceRow[];

export const DATA_BRANDS = Array.from(new Set(PRICE_ROWS.map((row) => row.brand))).sort();

export const getRowsForPlace = (placeName: string) => {
  const target = normalizeText(placeName);
  return PRICE_ROWS.filter((row) => normalizeText(row.place) === target);
};

export const normalizeText = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
