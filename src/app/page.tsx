'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import CitySearch from '@/components/CitySearch';
import { BRANDS, FEED_DATA, STATS, formatPrice } from '@/lib/data';
import { type City, getCityByName } from '@/lib/cities';

const POPULAR_ROUTES = [
  { from: 'Paris', to: 'Barcelone' },
  { from: 'Paris', to: 'Madrid' },
  { from: 'Paris', to: 'Budapest' },
  { from: 'Paris', to: 'Dubaï' },
  { from: 'Paris', to: 'Lisbonne' },
];

export default function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [fromCity, setFromCity] = useState<City | null>(getCityByName('Paris') ?? null);
  const [toCity, setToCity] = useState<City | null>(null);
  const [brand, setBrand] = useState('Marlboro');
  const [includeAirports, setIncludeAirports] = useState(false);
  const [upvoted, setUpvoted] = useState<Set<string>>(new Set());

  const handleSwap = () => {
    const tmp = fromCity;
    setFromCity(toCity);
    setToCity(tmp);
  };

  const handleSearch = () => {
    if (!fromCity && !toCity) return;
    const query = new URLSearchParams({
      from: fromCity?.name ?? '',
      to: toCity?.name ?? '',
      brand,
      airports: includeAirports ? '1' : '0',
    }).toString();
    router.push(`/resultats?${query}`);
  };

  const toggleUpvote = (id: string) => {
    setUpvoted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div>
      {/* HEADER */}
      <div style={{ background: '#111', padding: '16px 20px 0', position: 'sticky', top: 0, zIndex: 20, borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 26, fontWeight: 700, color: '#F0EDE4', letterSpacing: -0.5 }}>CigPrice</span>
              <span style={{ fontSize: 10, fontWeight: 600, background: '#F5C842', color: '#111', borderRadius: 4, padding: '2px 6px' }}>BETA</span>
            </div>
            <div style={{ fontSize: 13, color: '#555', marginTop: 1 }}>Où fumer coûte moins cher ?</div>
          </div>

          {/* User area */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {session ? (
              <>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(245,200,66,0.09)', border: '1px solid rgba(245,200,66,0.2)', borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 600, color: '#F5C842' }}>
                  ⚡ 47 pts
                </div>
                <Link href="/profil">
                  {session.user?.image ? (
                    <img src={session.user.image} alt="profil" style={{ width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', border: '2px solid rgba(245,200,66,0.3)' }} />
                  ) : (
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(245,200,66,0.09)', border: '1.5px solid rgba(245,200,66,0.27)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, cursor: 'pointer' }}>
                      {session.user?.name?.[0] ?? '👤'}
                    </div>
                  )}
                </Link>
              </>
            ) : (
              <button
                onClick={() => signIn('google')}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', borderRadius: 10, background: 'rgba(245,200,66,0.09)', border: '1px solid rgba(245,200,66,0.2)', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: '#F5C842' }}
              >
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.013 17.64 11.705 17.64 9.2z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                  <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
                </svg>
                Se connecter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SEARCH CARD */}
      <div style={{ padding: '16px 20px', background: '#111' }}>
        <div style={{ background: '#1A1A1A', borderRadius: 20, padding: 16, border: '1px solid #2A2A2A' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#555', letterSpacing: 1, marginBottom: 12 }}>TON TRAJET</div>

          <CitySearch
            key={`from-${fromCity?.id ?? 'empty'}`}
            value={fromCity?.name ?? ''}
            onChange={(c) => setFromCity(c)}
            placeholder="Ville de départ"
            label="Départ"
            dot="yellow"
          />

          {/* SWAP */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '8px 0' }}>
            <div style={{ flex: 1, height: 1, background: '#2a2a2a' }} />
            <button
              onClick={handleSwap}
              style={{ width: 28, height: 28, borderRadius: '50%', background: '#242424', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M4 2v10M4 12l-2-2M4 12l2-2" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 2v10M10 2l-2 2M10 2l2 2" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div style={{ flex: 1, height: 1, background: '#2a2a2a' }} />
          </div>

          <CitySearch
            key={`to-${toCity?.id ?? 'empty'}`}
            value={toCity?.name ?? ''}
            onChange={(c) => setToCity(c)}
            placeholder="Où tu vas ?"
            label="Destination"
            dot="empty"
          />

          {/* AIRPORTS OPTION */}
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              margin: '12px 0',
              padding: '10px 12px',
              borderRadius: 12,
              background: includeAirports ? 'rgba(245,200,66,0.07)' : '#111',
              border: `1px solid ${includeAirports ? 'rgba(245,200,66,0.28)' : '#2A2A2A'}`,
              cursor: 'pointer',
            }}
          >
            <input
              type="checkbox"
              checked={includeAirports}
              onChange={(event) => setIncludeAirports(event.target.checked)}
              style={{
                width: 18,
                height: 18,
                accentColor: '#F5C842',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0 }}>✈</span>
            <span style={{ minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 14, fontWeight: 700, color: includeAirports ? '#F5C842' : '#F0EDE4' }}>
                Inclure les aéroports du trajet
              </span>
              <span style={{ display: 'block', fontSize: 12, color: '#666', marginTop: 2 }}>
                Compare aussi départ ville, aéroport départ, aéroport arrivée et destination ville.
              </span>
            </span>
          </label>

          {/* BRAND CHIPS */}
          <div className="hide-scrollbar" style={{ display: 'flex', gap: 6, overflowX: 'auto', margin: '12px 0', paddingBottom: 2 }}>
            {BRANDS.map((b) => (
              <button
                key={b}
                onClick={() => setBrand(b)}
                style={{
                  flexShrink: 0, padding: '6px 12px', borderRadius: 100,
                  border: `1.5px solid ${brand === b ? '#F5C842' : '#333'}`,
                  background: brand === b ? 'rgba(245,200,66,0.09)' : 'transparent',
                  color: brand === b ? '#F5C842' : '#555',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit',
                }}
              >
                {b}
              </button>
            ))}
          </div>

          <button className="cta-btn" onClick={handleSearch} disabled={!fromCity && !toCity}>
            Comparer les prix →
          </button>
        </div>

        {/* POPULAR ROUTES */}
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: 11, color: '#444', marginBottom: 6, fontWeight: 500 }}>Trajets populaires :</div>
          <div className="hide-scrollbar" style={{ display: 'flex', gap: 6, overflowX: 'auto' }}>
            {POPULAR_ROUTES.map((r) => (
              <button
                key={`${r.from}-${r.to}`}
                onClick={() => {
                  const fc = getCityByName(r.from);
                  const tc = getCityByName(r.to);
                  if (fc) setFromCity(fc);
                  if (tc) setToCity(tc);
                }}
                style={{
                  flexShrink: 0, padding: '5px 10px', borderRadius: 8,
                  background: '#1A1A1A', border: '1px solid #2A2A2A',
                  color: '#888', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
                }}
              >
                {r.from} → {r.to}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* LIVE FEED */}
      <div style={{ padding: '8px 20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#4CAF82', boxShadow: '0 0 6px #4CAF82' }} />
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '1.2px', textTransform: 'uppercase' as const, color: '#888' }}>
              Derniers prix signalés
            </span>
          </div>
          <span style={{ fontSize: 12, color: '#F5C842', fontWeight: 600, cursor: 'pointer' }}>Tout voir</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FEED_DATA.map((entry, i) => {
            const isUpvoted = upvoted.has(entry.id);
            return (
              <div key={entry.id} style={{ background: '#1A1A1A', borderRadius: 14, padding: '14px 16px', border: '1px solid #2A2A2A' }}>
                <div style={{ display: 'flex', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(245,200,66,0.09)', border: '1px solid rgba(245,200,66,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, color: '#F5C842', flexShrink: 0 }}>
                    {entry.avatar}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: '#F0EDE4' }}>{entry.user}</span>
                          {entry.verified && <span style={{ fontSize: 10, color: '#4CAF82' }}>✓</span>}
                        </div>
                        <div style={{ fontSize: 13, color: '#555', marginTop: 1 }}>il y a {entry.timeAgo}</div>
                      </div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: i === 0 ? '#4CAF82' : i === 1 ? '#F5C842' : '#F0EDE4', letterSpacing: -0.5 }}>
                        {formatPrice(entry.price, entry.currency)}
                      </div>
                    </div>
                    <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                          <span style={{ fontSize: 14 }}>{entry.flag}</span>
                          <span style={{ fontSize: 13, color: '#F0EDE4', fontWeight: 500 }}>{entry.location}</span>
                        </div>
                        <div style={{ display: 'flex', gap: 5 }}>
                          <span className={`pill ${entry.type === 'airport' ? 'pill-yellow' : 'pill-gray'}`}>
                            {entry.type === 'airport' ? '✈ Aéroport' : '🏙 Ville'}
                          </span>
                          <span className="pill pill-gray">{entry.brand}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleUpvote(entry.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 8, background: isUpvoted ? 'rgba(245,200,66,0.13)' : 'rgba(255,255,255,0.04)', border: `1px solid ${isUpvoted ? 'rgba(245,200,66,0.27)' : '#333'}`, cursor: 'pointer', fontFamily: 'inherit' }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 2L10 8H2L6 2z" fill={isUpvoted ? '#F5C842' : '#555'} />
                        </svg>
                        <span style={{ fontSize: 13, fontWeight: 600, color: isUpvoted ? '#F5C842' : '#666' }}>
                          {entry.upvotes + (isUpvoted ? 1 : 0)}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* STATS */}
        <div style={{ marginTop: 20, background: '#1A1A1A', borderRadius: 16, padding: '14px 16px', border: '1px solid #2A2A2A', display: 'flex', justifyContent: 'space-between' }}>
          {[
            { n: STATS.totalPrices.toLocaleString('fr-FR'), label: 'prix signalés' },
            { n: String(STATS.citiesCovered), label: 'villes couvertes' },
            { n: STATS.contributors.toLocaleString('fr-FR'), label: 'contributeurs' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: i === 1 ? 'center' : i === 2 ? 'right' : 'left' }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#F5C842' }}>{s.n}</div>
              <div style={{ fontSize: 11, color: '#555', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
