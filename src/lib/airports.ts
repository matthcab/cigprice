export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

export const AIRPORTS: Airport[] = [
  { code: 'ATL', name: 'Hartsfield-Jackson Atlanta', city: 'Atlanta', country: 'États-Unis' },
  { code: 'PEK', name: 'Beijing Capital', city: 'Pékin', country: 'Chine' },
  { code: 'PKX', name: 'Beijing Daxing', city: 'Pékin', country: 'Chine' },
  { code: 'LAX', name: 'Los Angeles International', city: 'Los Angeles', country: 'États-Unis' },
  { code: 'DXB', name: 'Dubai International', city: 'Dubaï', country: 'Émirats Arabes Unis' },
  { code: 'HND', name: 'Tokyo Haneda', city: 'Tokyo', country: 'Japon' },
  { code: 'ORD', name: "Chicago O'Hare", city: 'Chicago', country: 'États-Unis' },
  { code: 'LHR', name: 'London Heathrow', city: 'Londres', country: 'Royaume-Uni' },
  { code: 'PVG', name: 'Shanghai Pudong', city: 'Shanghai', country: 'Chine' },
  { code: 'CDG', name: 'Paris Charles de Gaulle', city: 'Paris', country: 'France' },
  { code: 'DFW', name: 'Dallas/Fort Worth', city: 'Dallas', country: 'États-Unis' },
  { code: 'CAN', name: 'Guangzhou Baiyun', city: 'Guangzhou', country: 'Chine' },
  { code: 'AMS', name: 'Amsterdam Schiphol', city: 'Amsterdam', country: 'Pays-Bas' },
  { code: 'FRA', name: 'Frankfurt Airport', city: 'Francfort', country: 'Allemagne' },
  { code: 'IST', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turquie' },
  { code: 'SIN', name: 'Singapore Changi', city: 'Singapour', country: 'Singapour' },
  { code: 'ICN', name: 'Seoul Incheon', city: 'Séoul', country: 'Corée du Sud' },
  { code: 'DEN', name: 'Denver International', city: 'Denver', country: 'États-Unis' },
  { code: 'BKK', name: 'Bangkok Suvarnabhumi', city: 'Bangkok', country: 'Thaïlande' },
  { code: 'JFK', name: 'New York JFK', city: 'New York', country: 'États-Unis' },
  { code: 'KUL', name: 'Kuala Lumpur International', city: 'Kuala Lumpur', country: 'Malaisie' },
  { code: 'MAD', name: 'Adolfo Suárez Madrid-Barajas', city: 'Madrid', country: 'Espagne' },
  { code: 'SFO', name: 'San Francisco International', city: 'San Francisco', country: 'États-Unis' },
  { code: 'LAS', name: 'Harry Reid International', city: 'Las Vegas', country: 'États-Unis' },
  { code: 'SEA', name: 'Seattle-Tacoma', city: 'Seattle', country: 'États-Unis' },
  { code: 'MCO', name: 'Orlando International', city: 'Orlando', country: 'États-Unis' },
  { code: 'MIA', name: 'Miami International', city: 'Miami', country: 'États-Unis' },
  { code: 'EWR', name: 'Newark Liberty', city: 'New York', country: 'États-Unis' },
  { code: 'YYZ', name: 'Toronto Pearson', city: 'Toronto', country: 'Canada' },
  { code: 'YVR', name: 'Vancouver International', city: 'Vancouver', country: 'Canada' },
  { code: 'MEX', name: 'Mexico City Benito Juárez', city: 'Mexico', country: 'Mexique' },
  { code: 'GRU', name: 'São Paulo Guarulhos', city: 'São Paulo', country: 'Brésil' },
  { code: 'GIG', name: 'Rio de Janeiro Galeão', city: 'Rio de Janeiro', country: 'Brésil' },
  { code: 'EZE', name: 'Buenos Aires Ezeiza', city: 'Buenos Aires', country: 'Argentine' },
  { code: 'SCL', name: 'Santiago Arturo Merino Benítez', city: 'Santiago', country: 'Chili' },
  { code: 'BOG', name: 'Bogotá El Dorado', city: 'Bogota', country: 'Colombie' },
  { code: 'LIM', name: 'Lima Jorge Chávez', city: 'Lima', country: 'Pérou' },
  { code: 'BCN', name: 'Barcelona El Prat', city: 'Barcelone', country: 'Espagne' },
  { code: 'LIS', name: 'Lisbon Humberto Delgado', city: 'Lisbonne', country: 'Portugal' },
  { code: 'OPO', name: 'Porto Francisco Sá Carneiro', city: 'Porto', country: 'Portugal' },
  { code: 'FCO', name: 'Rome Fiumicino', city: 'Rome', country: 'Italie' },
  { code: 'MXP', name: 'Milan Malpensa', city: 'Milan', country: 'Italie' },
  { code: 'VCE', name: 'Venice Marco Polo', city: 'Venise', country: 'Italie' },
  { code: 'MUC', name: 'Munich Airport', city: 'Munich', country: 'Allemagne' },
  { code: 'BER', name: 'Berlin Brandenburg', city: 'Berlin', country: 'Allemagne' },
  { code: 'BRU', name: 'Brussels Airport', city: 'Bruxelles', country: 'Belgique' },
  { code: 'ZRH', name: 'Zurich Airport', city: 'Zurich', country: 'Suisse' },
  { code: 'GVA', name: 'Geneva Airport', city: 'Genève', country: 'Suisse' },
  { code: 'VIE', name: 'Vienna International', city: 'Vienne', country: 'Autriche' },
  { code: 'CPH', name: 'Copenhagen Kastrup', city: 'Copenhague', country: 'Danemark' },
  { code: 'ARN', name: 'Stockholm Arlanda', city: 'Stockholm', country: 'Suède' },
  { code: 'OSL', name: 'Oslo Gardermoen', city: 'Oslo', country: 'Norvège' },
  { code: 'HEL', name: 'Helsinki-Vantaa', city: 'Helsinki', country: 'Finlande' },
  { code: 'DUB', name: 'Dublin Airport', city: 'Dublin', country: 'Irlande' },
  { code: 'MAN', name: 'Manchester Airport', city: 'Manchester', country: 'Royaume-Uni' },
  { code: 'LGW', name: 'London Gatwick', city: 'Londres', country: 'Royaume-Uni' },
  { code: 'EDI', name: 'Edinburgh Airport', city: 'Édimbourg', country: 'Royaume-Uni' },
  { code: 'PRG', name: 'Prague Václav Havel', city: 'Prague', country: 'Tchéquie' },
  { code: 'WAW', name: 'Warsaw Chopin', city: 'Varsovie', country: 'Pologne' },
  { code: 'BUD', name: 'Budapest Ferenc Liszt', city: 'Budapest', country: 'Hongrie' },
  { code: 'ATH', name: 'Athens Eleftherios Venizelos', city: 'Athènes', country: 'Grèce' },
  { code: 'RAK', name: 'Marrakech Menara', city: 'Marrakech', country: 'Maroc' },
  { code: 'CMN', name: 'Casablanca Mohammed V', city: 'Casablanca', country: 'Maroc' },
  { code: 'TUN', name: 'Tunis-Carthage', city: 'Tunis', country: 'Tunisie' },
  { code: 'ALG', name: "Alger Houari Boumédiène", city: 'Alger', country: 'Algérie' },
  { code: 'CAI', name: 'Cairo International', city: 'Le Caire', country: 'Égypte' },
  { code: 'JNB', name: 'Johannesburg O.R. Tambo', city: 'Johannesburg', country: 'Afrique du Sud' },
  { code: 'CPT', name: 'Cape Town International', city: 'Le Cap', country: 'Afrique du Sud' },
  { code: 'NBO', name: 'Nairobi Jomo Kenyatta', city: 'Nairobi', country: 'Kenya' },
  { code: 'LOS', name: 'Lagos Murtala Muhammed', city: 'Lagos', country: 'Nigeria' },
  { code: 'DOH', name: 'Doha Hamad', city: 'Doha', country: 'Qatar' },
  { code: 'AUH', name: 'Abu Dhabi Zayed', city: 'Abu Dhabi', country: 'Émirats Arabes Unis' },
  { code: 'RUH', name: 'Riyadh King Khalid', city: 'Riyad', country: 'Arabie Saoudite' },
  { code: 'TLV', name: 'Tel Aviv Ben Gurion', city: 'Tel Aviv', country: 'Israël' },
  { code: 'BOM', name: 'Mumbai Chhatrapati Shivaji', city: 'Mumbai', country: 'Inde' },
  { code: 'DEL', name: 'Delhi Indira Gandhi', city: 'Delhi', country: 'Inde' },
  { code: 'BLR', name: 'Bengaluru Kempegowda', city: 'Bangalore', country: 'Inde' },
  { code: 'HKG', name: 'Hong Kong International', city: 'Hong Kong', country: 'Hong Kong' },
  { code: 'TPE', name: 'Taipei Taoyuan', city: 'Taipei', country: 'Taïwan' },
  { code: 'KIX', name: 'Osaka Kansai', city: 'Osaka', country: 'Japon' },
  { code: 'NRT', name: 'Tokyo Narita', city: 'Tokyo', country: 'Japon' },
  { code: 'CGK', name: 'Jakarta Soekarno-Hatta', city: 'Jakarta', country: 'Indonésie' },
  { code: 'MNL', name: 'Manila Ninoy Aquino', city: 'Manille', country: 'Philippines' },
  { code: 'SYD', name: 'Sydney Kingsford Smith', city: 'Sydney', country: 'Australie' },
  { code: 'MEL', name: 'Melbourne Airport', city: 'Melbourne', country: 'Australie' },
  { code: 'AKL', name: 'Auckland Airport', city: 'Auckland', country: 'Nouvelle-Zélande' },
].sort((a, b) => `${a.country} ${a.city} ${a.name}`.localeCompare(`${b.country} ${b.city} ${b.name}`, 'fr'));

export const getAirportByCode = (code: string) => AIRPORTS.find((airport) => airport.code === code);

export function searchAirports(query: string, maxResults = 8): Airport[] {
  if (!query.trim()) return [];
  const q = normalize(query);

  const codeStarts: Airport[] = [];
  const nameStarts: Airport[] = [];
  const contains: Airport[] = [];

  for (const airport of AIRPORTS) {
    const code = airport.code.toLowerCase();
    const name = normalize(airport.name);
    const city = normalize(airport.city);
    const country = normalize(airport.country);

    if (code.startsWith(q)) {
      codeStarts.push(airport);
    } else if (name.startsWith(q) || city.startsWith(q)) {
      nameStarts.push(airport);
    } else if (name.includes(q) || city.includes(q) || country.includes(q)) {
      contains.push(airport);
    }
  }

  return [...codeStarts, ...nameStarts, ...contains].slice(0, maxResults);
}
