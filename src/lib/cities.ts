export interface City {
  id: string;
  name: string;
  country: string;
  flag: string;
  airportCode?: string;
  airportName?: string;
  cityPrice: number;
  airportPrice?: number;
}

export const CITIES: City[] = [
  // France
  { id: 'paris', name: 'Paris', country: 'France', flag: '🇫🇷', airportCode: 'CDG', airportName: 'Aéroport CDG · T2E', cityPrice: 11.2, airportPrice: 10.5 },
  { id: 'lyon', name: 'Lyon', country: 'France', flag: '🇫🇷', airportCode: 'LYS', airportName: 'Aéroport Lyon-Saint Exupéry', cityPrice: 10.8, airportPrice: 10.2 },
  { id: 'marseille', name: 'Marseille', country: 'France', flag: '🇫🇷', airportCode: 'MRS', airportName: 'Aéroport Marseille-Provence', cityPrice: 10.5, airportPrice: 10.0 },
  { id: 'nice', name: 'Nice', country: 'France', flag: '🇫🇷', airportCode: 'NCE', airportName: 'Aéroport Nice Côte d\'Azur', cityPrice: 10.6, airportPrice: 9.8 },
  { id: 'bordeaux', name: 'Bordeaux', country: 'France', flag: '🇫🇷', cityPrice: 10.7 },
  { id: 'toulouse', name: 'Toulouse', country: 'France', flag: '🇫🇷', airportCode: 'TLS', airportName: 'Aéroport Toulouse-Blagnac', cityPrice: 10.7, airportPrice: 10.1 },
  { id: 'nantes', name: 'Nantes', country: 'France', flag: '🇫🇷', cityPrice: 10.6 },
  { id: 'strasbourg', name: 'Strasbourg', country: 'France', flag: '🇫🇷', cityPrice: 10.5 },
  // Espagne
  { id: 'madrid', name: 'Madrid', country: 'Espagne', flag: '🇪🇸', airportCode: 'MAD', airportName: 'Aéroport MAD · T4 Dufry', cityPrice: 5.2, airportPrice: 6.8 },
  { id: 'barcelone', name: 'Barcelone', country: 'Espagne', flag: '🇪🇸', airportCode: 'BCN', airportName: 'Aéroport BCN · T1', cityPrice: 5.5, airportPrice: 5.9 },
  { id: 'seville', name: 'Séville', country: 'Espagne', flag: '🇪🇸', cityPrice: 5.1 },
  { id: 'valence', name: 'Valence', country: 'Espagne', flag: '🇪🇸', cityPrice: 5.0 },
  { id: 'malaga', name: 'Malaga', country: 'Espagne', flag: '🇪🇸', airportCode: 'AGP', airportName: 'Aéroport Malaga Costa del Sol', cityPrice: 5.3, airportPrice: 6.2 },
  { id: 'bilbao', name: 'Bilbao', country: 'Espagne', flag: '🇪🇸', cityPrice: 5.2 },
  // Portugal
  { id: 'lisbonne', name: 'Lisbonne', country: 'Portugal', flag: '🇵🇹', airportCode: 'LIS', airportName: 'Aéroport Humberto Delgado', cityPrice: 5.8, airportPrice: 7.0 },
  { id: 'porto', name: 'Porto', country: 'Portugal', flag: '🇵🇹', airportCode: 'OPO', airportName: 'Aéroport Francisco de Sá Carneiro', cityPrice: 5.6, airportPrice: 6.8 },
  // Italie
  { id: 'rome', name: 'Rome', country: 'Italie', flag: '🇮🇹', airportCode: 'FCO', airportName: 'Aéroport Fiumicino · T3', cityPrice: 6.5, airportPrice: 8.0 },
  { id: 'milan', name: 'Milan', country: 'Italie', flag: '🇮🇹', airportCode: 'MXP', airportName: 'Aéroport Malpensa · T1', cityPrice: 6.8, airportPrice: 7.5 },
  { id: 'naples', name: 'Naples', country: 'Italie', flag: '🇮🇹', cityPrice: 6.2 },
  { id: 'venise', name: 'Venise', country: 'Italie', flag: '🇮🇹', airportCode: 'VCE', airportName: 'Aéroport Marco Polo', cityPrice: 7.0, airportPrice: 8.5 },
  { id: 'florence', name: 'Florence', country: 'Italie', flag: '🇮🇹', cityPrice: 6.6 },
  // Allemagne
  { id: 'berlin', name: 'Berlin', country: 'Allemagne', flag: '🇩🇪', airportCode: 'BER', airportName: 'Aéroport Berlin Brandenburg', cityPrice: 7.2, airportPrice: 8.0 },
  { id: 'munich', name: 'Munich', country: 'Allemagne', flag: '🇩🇪', airportCode: 'MUC', airportName: 'Aéroport Munich · T2', cityPrice: 7.5, airportPrice: 8.2 },
  { id: 'francfort', name: 'Francfort', country: 'Allemagne', flag: '🇩🇪', airportCode: 'FRA', airportName: 'Aéroport Francfort · T1', cityPrice: 7.3, airportPrice: 7.8 },
  { id: 'hambourg', name: 'Hambourg', country: 'Allemagne', flag: '🇩🇪', cityPrice: 7.1 },
  // Pays-Bas
  { id: 'amsterdam', name: 'Amsterdam', country: 'Pays-Bas', flag: '🇳🇱', airportCode: 'AMS', airportName: 'Aéroport Schiphol', cityPrice: 8.5, airportPrice: 9.2 },
  // Belgique
  { id: 'bruxelles', name: 'Bruxelles', country: 'Belgique', flag: '🇧🇪', airportCode: 'BRU', airportName: 'Aéroport Brussels Airport', cityPrice: 8.0, airportPrice: 9.5 },
  // Royaume-Uni
  { id: 'londres', name: 'Londres', country: 'Royaume-Uni', flag: '🇬🇧', airportCode: 'LHR', airportName: 'Aéroport Heathrow · T5', cityPrice: 14.5, airportPrice: 16.0 },
  { id: 'manchester', name: 'Manchester', country: 'Royaume-Uni', flag: '🇬🇧', airportCode: 'MAN', airportName: 'Aéroport Manchester', cityPrice: 13.8, airportPrice: 15.0 },
  { id: 'edimbourg', name: 'Édimbourg', country: 'Royaume-Uni', flag: '🇬🇧', cityPrice: 14.0 },
  // Pologne
  { id: 'varsovie', name: 'Varsovie', country: 'Pologne', flag: '🇵🇱', airportCode: 'WAW', airportName: 'Aéroport Chopin', cityPrice: 4.1, airportPrice: 5.5 },
  { id: 'cracovie', name: 'Cracovie', country: 'Pologne', flag: '🇵🇱', cityPrice: 4.0 },
  // Tchéquie
  { id: 'prague', name: 'Prague', country: 'Tchéquie', flag: '🇨🇿', airportCode: 'PRG', airportName: 'Aéroport Václav Havel', cityPrice: 4.5, airportPrice: 5.8 },
  // Hongrie
  { id: 'budapest', name: 'Budapest', country: 'Hongrie', flag: '🇭🇺', airportCode: 'BUD', airportName: 'Aéroport Budapest Liszt Ferenc', cityPrice: 3.8, airportPrice: 5.2 },
  // Grèce
  { id: 'athenes', name: 'Athènes', country: 'Grèce', flag: '🇬🇷', airportCode: 'ATH', airportName: 'Aéroport Elefthérios-Venizélos', cityPrice: 4.8, airportPrice: 6.2 },
  { id: 'thessalonique', name: 'Thessalonique', country: 'Grèce', flag: '🇬🇷', cityPrice: 4.5 },
  // Turquie
  { id: 'istanbul', name: 'Istanbul', country: 'Turquie', flag: '🇹🇷', airportCode: 'IST', airportName: 'Aéroport Istanbul · T1', cityPrice: 3.5, airportPrice: 4.0 },
  // Émirats
  { id: 'dubai', name: 'Dubaï', country: 'Émirats Arabes Unis', flag: '🇦🇪', airportCode: 'DXB', airportName: 'Dubai Duty-Free · T3', cityPrice: 3.1, airportPrice: 3.2 },
  { id: 'abu-dhabi', name: 'Abu Dhabi', country: 'Émirats Arabes Unis', flag: '🇦🇪', airportCode: 'AUH', airportName: 'Aéroport Zayed · T1', cityPrice: 3.0, airportPrice: 3.1 },
  // Thaïlande
  { id: 'bangkok', name: 'Bangkok', country: 'Thaïlande', flag: '🇹🇭', airportCode: 'BKK', airportName: 'Aéroport Suvarnabhumi', cityPrice: 2.8, airportPrice: 3.5 },
  // Maroc
  { id: 'casablanca', name: 'Casablanca', country: 'Maroc', flag: '🇲🇦', airportCode: 'CMN', airportName: 'Aéroport Mohammed V', cityPrice: 2.5, airportPrice: 3.0 },
  { id: 'marrakech', name: 'Marrakech', country: 'Maroc', flag: '🇲🇦', airportCode: 'RAK', airportName: 'Aéroport Menara', cityPrice: 2.3, airportPrice: 2.9 },
  // Tunisie
  { id: 'tunis', name: 'Tunis', country: 'Tunisie', flag: '🇹🇳', airportCode: 'TUN', airportName: 'Aéroport Carthage', cityPrice: 2.2, airportPrice: 3.0 },
  // Suisse
  { id: 'geneve', name: 'Genève', country: 'Suisse', flag: '🇨🇭', airportCode: 'GVA', airportName: 'Aéroport Genève-Cointrin', cityPrice: 9.5, airportPrice: 10.0 },
  { id: 'zurich', name: 'Zürich', country: 'Suisse', flag: '🇨🇭', airportCode: 'ZRH', airportName: 'Aéroport de Zürich', cityPrice: 9.8, airportPrice: 10.2 },
  // Autriche
  { id: 'vienne', name: 'Vienne', country: 'Autriche', flag: '🇦🇹', airportCode: 'VIE', airportName: 'Aéroport Wien Schwechat', cityPrice: 5.8, airportPrice: 7.0 },
  // Suède
  { id: 'stockholm', name: 'Stockholm', country: 'Suède', flag: '🇸🇪', airportCode: 'ARN', airportName: 'Aéroport Arlanda', cityPrice: 8.0, airportPrice: 9.0 },
  // Danemark
  { id: 'copenhague', name: 'Copenhague', country: 'Danemark', flag: '🇩🇰', airportCode: 'CPH', airportName: 'Aéroport Kastrup', cityPrice: 9.2, airportPrice: 10.5 },
  // USA
  { id: 'new-york', name: 'New York', country: 'États-Unis', flag: '🇺🇸', airportCode: 'JFK', airportName: 'Aéroport JFK · T4', cityPrice: 12.0, airportPrice: 14.0 },
  { id: 'los-angeles', name: 'Los Angeles', country: 'États-Unis', flag: '🇺🇸', airportCode: 'LAX', airportName: 'Aéroport LAX · T7', cityPrice: 11.0, airportPrice: 12.5 },
  // Japon
  { id: 'tokyo', name: 'Tokyo', country: 'Japon', flag: '🇯🇵', airportCode: 'NRT', airportName: 'Aéroport Narita · T1', cityPrice: 4.0, airportPrice: 4.5 },
];

const normalize = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export function searchCities(query: string, maxResults = 8): City[] {
  if (!query || query.trim().length < 1) return [];
  const q = normalize(query.trim());

  const exactStart: City[] = [];
  const contains: City[] = [];
  const countryMatch: City[] = [];

  for (const city of CITIES) {
    const normName = normalize(city.name);
    const normCountry = normalize(city.country);
    if (normName.startsWith(q)) {
      exactStart.push(city);
    } else if (normName.includes(q)) {
      contains.push(city);
    } else if (normCountry.startsWith(q) || normCountry.includes(q)) {
      countryMatch.push(city);
    }
  }

  return [...exactStart, ...contains, ...countryMatch].slice(0, maxResults);
}

export function getCityById(id: string): City | undefined {
  return CITIES.find((c) => c.id === id);
}

export function getCityByName(name: string): City | undefined {
  const q = normalize(name.trim());
  return CITIES.find((c) => normalize(c.name) === q);
}
