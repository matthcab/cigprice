'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getCityByName, type City } from '@/lib/cities';
import { formatPrice } from '@/lib/data';
import { getAirportByCode, type Airport } from '@/lib/airports';

interface ResultEntry {
  id: string;
  rank: number;
  label: string;
  sublabel: string;
  flag: string;
  price: number;
  type: 'airport' | 'city';
  reports: number;
}

const airportPriceFromCity = (cityPrice: number, airport: Airport) => {
  const factor = airport.type === 'large_airport' ? 0.9 : airport.type === 'medium_airport' ? 0.92 : 0.95;
  return Math.round(cityPrice * factor * 100) / 100;
};

const airportReports = (price: number, code: string) =>
  Math.max(4, Math.floor(price * 2 + code.charCodeAt(0) % 7 + 6));

function buildResults(from: City | undefined, to: City | undefined, fromAirport: Airport | undefined, toAirport: Airport | undefined): ResultEntry[] {
  const entries: ResultEntry[] = [];

  const addCity = (city: City, direction: 'from' | 'to') => {
    if (city.cityPrice === undefined) return;
    entries.push({
      id: `${direction}-city-${city.id}`,
      rank: 0,
      label: city.placeType === 'country' ? city.name : `En ville à ${city.name}`,
      sublabel: city.placeType === 'country' ? 'Prix moyen pays · CSV Combien coûte' : `${direction === 'from' ? 'Départ' : 'Destination'} ville · ${city.country}`,
      flag: city.flag,
      price: city.cityPrice,
      type: 'city',
      reports: Math.floor(city.cityPrice * (direction === 'from' ? 4 : 3) + (direction === 'from' ? 15 : 10)),
    });
  };

  const addAirport = (airport: Airport | undefined, city: City | undefined, direction: 'from' | 'to') => {
    if (!airport) return;

    const basePrice = city?.cityPrice ?? (direction === 'from' ? to?.cityPrice : from?.cityPrice) ?? 0;
    if (!basePrice) return;

    const price = airportPriceFromCity(basePrice, airport);
    entries.push({
      id: `${direction}-airport-${airport.code}`,
      rank: 0,
      label: `${airport.code} · ${airport.name}`,
      sublabel: `${direction === 'from' ? 'Aéroport de départ' : 'Aéroport d’arrivée'} · prix aéroport estimé`,
      flag: city?.flag ?? '✈️',
      price,
      type: 'airport',
      reports: airportReports(price, airport.code),
    });
  };

  if (from) {
    addCity(from, 'from');
  }
  addAirport(fromAirport, from, 'from');

  addAirport(toAirport, to, 'to');
  if (to) {
    addCity(to, 'to');
  }

  const deduped = Array.from(new Map(entries.map((entry) => [entry.id, entry])).values());

  deduped.sort((a, b) => {
    if (a.price !== b.price) return a.price - b.price;
    return a.label.localeCompare(b.label, 'fr');
  });
  deduped.forEach((e, i) => (e.rank = i + 1));
  return deduped;
}

function routeStops(from: City | undefined, to: City | undefined, fromAirport: Airport | undefined, toAirport: Airport | undefined) {
  const stops: Array<{ label: string; type: 'airport' | 'city' }> = [];

  if (from) {
    stops.push({ label: from.name, type: 'city' });
  }
  if (fromAirport) stops.push({ label: fromAirport.code, type: 'airport' });

  if (toAirport) stops.push({ label: toAirport.code, type: 'airport' });
  if (to) {
    stops.push({ label: to.name, type: 'city' });
  }

  return stops;
}

function RouteStopPreview({ stops }: { stops: Array<{ label: string; type: 'airport' | 'city' }> }) {
  if (stops.length <= 2) return null;

  return (
    <div className="hide-scrollbar" style={{ display: 'flex', gap: 6, overflowX: 'auto', marginTop: 8, paddingBottom: 2 }}>
      {stops.map((stop, index) => (
        <span
          key={`${stop.type}-${stop.label}-${index}`}
          className={`pill ${stop.type === 'airport' ? 'pill-yellow' : 'pill-gray'}`}
          style={{ fontSize: 11, flexShrink: 0 }}
        >
          {stop.type === 'airport' ? '✈' : '🏙'} {stop.label}
        </span>
      ))}
    </div>
  );
}

function ComparisonScope({ includeAirports }: { includeAirports: boolean }) {
  if (!includeAirports) return null;

  return (
    <div
      style={{
        background: 'rgba(245,200,66,0.06)',
        border: '1px solid rgba(245,200,66,0.18)',
        borderRadius: 12,
        padding: '10px 12px',
        marginBottom: 14,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <span style={{ fontSize: 17, lineHeight: 1 }}>✈</span>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#F5C842' }}>Aéroports inclus</div>
        <div style={{ fontSize: 12, color: '#777', marginTop: 1 }}>
          Classement élargi aux aéroports explicitement choisis pour ce trajet.
        </div>
      </div>
    </div>
  );
}

function ResultsContent() {
  const router = useRouter();
  const params = useSearchParams();
  const fromName = params.get('from') || '';
  const toName = params.get('to') || '';
  const brand = params.get('brand') || 'Marlboro';
  const includeAirports = params.get('airports') === '1';
  const fromAirportCode = params.get('fromAirport') || '';
  const toAirportCode = params.get('toAirport') || '';
  const [tab, setTab] = useState<'paquet' | 'cartouche'>('paquet');

  const fromCity = getCityByName(fromName);
  const toCity = getCityByName(toName);
  const fromAirport = includeAirports && fromAirportCode ? getAirportByCode(fromAirportCode) : undefined;
  const toAirport = includeAirports && toAirportCode ? getAirportByCode(toAirportCode) : undefined;
  const results = buildResults(fromCity, toCity, fromAirport, toAirport);
  const searchedPlaces = [fromCity, toCity].filter(Boolean) as City[];
  const stops = routeStops(fromCity, toCity, fromAirport, toAirport);
  const hasAirportStops = Boolean(fromAirport || toAirport);

  if (results.length === 0) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>🔍</div>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#F0EDE4', marginBottom: 8 }}>Pas encore de prix</div>
        <div style={{ fontSize: 14, color: '#888', marginBottom: 24 }}>
          {searchedPlaces.length > 0
            ? `${searchedPlaces.map((place) => place.name).join(' → ')} est bien accepté dans la recherche, mais le CSV ne contient pas encore de prix pour ce lieu.`
            : 'Aucun lieu trouvé. Essaie un pays ou une grande ville.'}
        </div>
        <button className="cta-btn" onClick={() => router.push('/')} style={{ maxWidth: 240, margin: '0 auto' }}>
          Nouvelle recherche
        </button>
      </div>
    );
  }

  const best = results[0];
  const worst = results[results.length - 1];
  const saving = (worst.price - best.price).toFixed(2).replace('.', ',');

  return (
    <div>
      {/* HEADER */}
      <div style={{ background: '#111', padding: '16px 20px', position: 'sticky', top: 0, zIndex: 20, borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <button
            onClick={() => router.back()}
            style={{ width: 36, height: 36, borderRadius: 10, background: '#1A1A1A', border: '1px solid #2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4L6 9l5 5" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              {fromName && <span style={{ fontSize: 17, fontWeight: 700, color: '#F0EDE4' }}>{fromName}</span>}
              {fromName && toName && (
                <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                  <path d="M0 5h16M12 1l4 4-4 4" stroke="#F5C842" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {toName && <span style={{ fontSize: 17, fontWeight: 700, color: '#F0EDE4' }}>{toName}</span>}
              {!fromName && !toName && <span style={{ fontSize: 17, fontWeight: 700, color: '#F0EDE4' }}>Comparaison</span>}
            </div>
            <div style={{ fontSize: 13, color: '#555', marginTop: 1 }}>{brand} · 1 paquet{hasAirportStops ? ' · villes + aéroports' : ''}</div>
            <RouteStopPreview stops={stops} />
          </div>
          <button
            onClick={() => router.push('/')}
            style={{ border: '1px solid #333', borderRadius: 10, padding: '6px 10px', fontSize: 13, color: '#888', cursor: 'pointer', background: 'transparent', fontFamily: 'inherit' }}
          >
            Modifier
          </button>
        </div>

        {/* WINNER CARD */}
        <div style={{ background: 'rgba(76,175,130,0.05)', border: '1px solid rgba(76,175,130,0.2)', borderRadius: 20, padding: '16px 18px 14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div style={{ flex: 1, minWidth: 0, paddingRight: 12 }}>
              <div className="pill pill-green" style={{ marginBottom: 8, display: 'inline-flex' }}>🏆 Meilleure option</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#F0EDE4', lineHeight: 1.2 }}>{best.label}</div>
              <div style={{ fontSize: 13, color: '#555', marginTop: 3 }}>{best.sublabel}</div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: '#4CAF82', letterSpacing: -1, lineHeight: 1 }}>
                {tab === 'paquet' ? formatPrice(best.price, '€') : formatPrice(best.price * 10, '€')}
              </div>
              <div style={{ fontSize: 12, color: '#4CAF82', marginTop: 2 }}>le moins cher</div>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 12, color: '#555', marginBottom: 1 }}>Économie max</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#4CAF82' }}>
                − {tab === 'paquet' ? saving : (parseFloat(saving.replace(',', '.')) * 10).toFixed(2).replace('.', ',')}€
              </div>
            </div>
            <div style={{ width: 1, height: 32, background: '#2a2a2a' }} />
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, color: '#555', marginBottom: 1 }}>Basé sur</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#888' }}>{best.reports} signalements</div>
            </div>
          </div>
        </div>
      </div>

      {/* RESULTS LIST */}
      <div style={{ padding: '14px 20px 24px' }}>
        <ComparisonScope includeAirports={hasAirportStops} />

        {/* Tab toggle */}
        <div style={{ display: 'flex', background: '#1a1a1a', borderRadius: 12, padding: 4, marginBottom: 14 }}>
          {(['paquet', 'cartouche'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: 8, borderRadius: 9, background: tab === t ? '#2a2a2a' : 'transparent', border: 'none', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, color: tab === t ? '#F0EDE4' : '#555', cursor: 'pointer' }}>
              {t === 'paquet' ? '1 paquet' : '1 cartouche (×10)'}
            </button>
          ))}
        </div>

        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '1.2px', textTransform: 'uppercase' as const, color: '#888', marginBottom: 10 }}>
          Classement · du moins cher au plus cher
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {results.map((r) => {
            const isBest = r.rank === 1;
            const isWorst = r.rank === results.length && results.length > 1;
            const displayPrice = tab === 'paquet' ? r.price : r.price * 10;
            const delta = r.price > best.price
              ? `+${(tab === 'paquet' ? r.price - best.price : (r.price - best.price) * 10).toFixed(2).replace('.', ',')}€`
              : null;

            return (
              <div
                key={r.id}
                style={{
                  background: isBest ? 'rgba(76,175,130,0.04)' : '#1A1A1A',
                  borderRadius: 16, padding: 16,
                  border: isBest ? '1px solid rgba(76,175,130,0.27)' : isWorst ? '1px solid rgba(255,90,90,0.13)' : '1px solid #2A2A2A',
                  display: 'flex', gap: 14, alignItems: 'center',
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, background: isBest ? 'rgba(76,175,130,0.13)' : isWorst ? 'rgba(255,90,90,0.13)' : '#242424', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, color: isBest ? '#4CAF82' : isWorst ? '#FF5A5A' : '#555', flexShrink: 0 }}>
                  {r.rank}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <span style={{ fontSize: 15 }}>{r.flag}</span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: '#F0EDE4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.label}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#555', marginBottom: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.sublabel}</div>
                  <div style={{ display: 'flex', gap: 5 }}>
                    <span className={`pill ${r.type === 'airport' ? 'pill-yellow' : 'pill-gray'}`} style={{ fontSize: 11 }}>
                      {r.type === 'airport' ? '✈' : '🏙'} {r.type === 'airport' ? 'Aéroport' : 'Ville'}
                    </span>
                    <span className="pill pill-gray" style={{ fontSize: 11 }}>{r.reports} signalements</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: isBest ? '#4CAF82' : isWorst ? '#FF5A5A' : '#F0EDE4', letterSpacing: -0.3 }}>
                    {formatPrice(displayPrice, '€')}
                  </div>
                  {delta && <div style={{ fontSize: 12, color: '#FF5A5A', marginTop: 2, fontWeight: 500 }}>{delta}</div>}
                </div>
              </div>
            );
          })}
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #2A2A2A', margin: '16px 0' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button className="cta-btn" onClick={() => router.push('/signaler')}>
            <span>✏️</span> Signaler un prix pour cette route
          </button>
          <button className="ghost-btn" onClick={() => router.push('/')}>Nouvelle recherche</button>
        </div>

        <div style={{ marginTop: 14, fontSize: 12, color: '#333', textAlign: 'center', lineHeight: 1.6 }}>
          Prix basés sur {results.reduce((a, r) => a + r.reports, 0)} entrées estimées<br/>
          <span style={{ color: '#F5C842' }}>
            Données du CSV Combien coûte{hasAirportStops ? ' + estimations aéroports' : ''}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div style={{ padding: 20, color: '#888' }}>Chargement...</div>}>
      <ResultsContent />
    </Suspense>
  );
}
