'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BRANDS, FEED_DATA, STATS, POPULAR_ROUTES, formatPrice } from '@/lib/data';

export default function HomePage() {
  const router = useRouter();
  const [from, setFrom] = useState('Paris');
  const [to, setTo] = useState('');
  const [brand, setBrand] = useState('Marlboro');
  const [upvoted, setUpvoted] = useState<Set<string>>(new Set());

  const handleSwap = () => {
    const tmp = from;
    setFrom(to);
    setTo(tmp);
  };

  const handleSearch = () => {
    const query = new URLSearchParams({ from, to, brand }).toString();
    router.push(`/resultats?${query}`);
  };

  const toggleUpvote = (id: string) => {
    setUpvoted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div>
      {/* HEADER */}
      <div style={{ background: '#111', padding: '16px 20px 0', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 26, fontWeight: 700, color: '#F0EDE4', letterSpacing: -0.5 }}>CigPrice</span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  background: '#F5C842',
                  color: '#111',
                  borderRadius: 4,
                  padding: '2px 6px',
                  letterSpacing: 0.5,
                }}
              >
                BETA
              </span>
            </div>
            <div style={{ fontSize: 14, color: '#555', marginTop: 1 }}>Où fumer coûte moins cher ?</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                background: 'rgba(245,200,66,0.09)',
                border: '1px solid rgba(245,200,66,0.2)',
                borderRadius: 8,
                padding: '4px 10px',
                fontSize: 12,
                fontWeight: 600,
                color: '#F5C842',
              }}
            >
              ⚡ 47 pts
            </div>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'rgba(245,200,66,0.09)',
                border: '1.5px solid rgba(245,200,66,0.27)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
              }}
            >
              👤
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH CARD */}
      <div style={{ padding: '0 20px 16px', background: '#111' }}>
        <div
          style={{
            background: '#1A1A1A',
            borderRadius: 20,
            padding: 16,
            border: '1px solid #2A2A2A',
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 600, color: '#555', letterSpacing: 1, marginBottom: 12 }}>
            TON TRAJET
          </div>

          {/* FROM */}
          <div
            style={{
              background: '#111',
              border: '1.5px solid #F5C842',
              borderRadius: 14,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 8,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F5C842', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: '#555', marginBottom: 2 }}>Départ</div>
              <input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="Ville de départ"
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: '#F0EDE4',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontFamily: 'inherit',
                }}
              />
            </div>
          </div>

          {/* SWAP */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{ flex: 1, height: 1, background: '#2a2a2a' }} />
            <button
              onClick={handleSwap}
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: '#242424',
                border: '1px solid #333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M4 2v10M4 12l-2-2M4 12l2-2"
                  stroke="#555"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 2v10M10 2l-2 2M10 2l2 2"
                  stroke="#555"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div style={{ flex: 1, height: 1, background: '#2a2a2a' }} />
          </div>

          {/* TO */}
          <div
            style={{
              background: '#111',
              border: '1.5px dashed #2A2A2A',
              borderRadius: 14,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'transparent',
                border: '2px solid #444',
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: '#555', marginBottom: 2 }}>Destination</div>
              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Où tu vas ?"
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: to ? '#F0EDE4' : '#444',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  fontFamily: 'inherit',
                }}
              />
            </div>
          </div>

          {/* BRAND CHIPS */}
          <div
            className="hide-scrollbar"
            style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 12, paddingBottom: 2 }}
          >
            {BRANDS.map((b) => (
              <button
                key={b}
                onClick={() => setBrand(b)}
                style={{
                  flexShrink: 0,
                  padding: '6px 12px',
                  borderRadius: 100,
                  border: `1.5px solid ${brand === b ? '#F5C842' : '#333'}`,
                  background: brand === b ? 'rgba(245,200,66,0.09)' : 'transparent',
                  color: brand === b ? '#F5C842' : '#555',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontFamily: 'inherit',
                }}
              >
                {b}
              </button>
            ))}
          </div>

          <button className="cta-btn" onClick={handleSearch}>
            Comparer les prix →
          </button>
        </div>

        {/* POPULAR ROUTES */}
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 11, color: '#444', marginBottom: 8, fontWeight: 500 }}>Trajets populaires :</div>
          <div className="hide-scrollbar" style={{ display: 'flex', gap: 6, overflowX: 'auto' }}>
            {POPULAR_ROUTES.map((r) => (
              <button
                key={`${r.from}-${r.to}`}
                onClick={() => { setFrom(r.from); setTo(r.to); }}
                style={{
                  flexShrink: 0,
                  padding: '5px 10px',
                  borderRadius: 8,
                  background: '#1A1A1A',
                  border: '1px solid #2A2A2A',
                  color: '#888',
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  whiteSpace: 'nowrap',
                }}
              >
                {r.from} → {r.to}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* LIVE FEED */}
      <div style={{ padding: '16px 20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#4CAF82',
                boxShadow: '0 0 6px #4CAF82',
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '1.2px',
                textTransform: 'uppercase' as const,
                color: '#888',
              }}
            >
              Derniers prix signalés
            </span>
          </div>
          <span style={{ fontSize: 12, color: '#F5C842', fontWeight: 600, cursor: 'pointer' }}>Tout voir</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FEED_DATA.map((entry, i) => {
            const isUpvoted = upvoted.has(entry.id);
            return (
              <div
                key={entry.id}
                style={{
                  background: '#1A1A1A',
                  borderRadius: 14,
                  padding: '14px 16px',
                  border: '1px solid #2A2A2A',
                }}
              >
                <div style={{ display: 'flex', gap: 10 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: 'rgba(245,200,66,0.09)',
                      border: '1px solid rgba(245,200,66,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: 15,
                      color: '#F5C842',
                      flexShrink: 0,
                    }}
                  >
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
                      <div
                        style={{
                          fontSize: 24,
                          fontWeight: 700,
                          color: i === 0 ? '#4CAF82' : i === 1 ? '#F5C842' : '#F0EDE4',
                          letterSpacing: -0.5,
                        }}
                      >
                        {formatPrice(entry.price, entry.currency)}
                      </div>
                    </div>
                    <div
                      style={{
                        marginTop: 8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 4 }}>
                          <span style={{ fontSize: 14 }}>{entry.flag}</span>
                          <span style={{ fontSize: 14, color: '#F0EDE4', fontWeight: 500 }}>{entry.location}</span>
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
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          padding: '4px 10px',
                          borderRadius: 8,
                          background: isUpvoted ? 'rgba(245,200,66,0.13)' : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${isUpvoted ? 'rgba(245,200,66,0.27)' : '#333'}`,
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                        }}
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

        {/* STATS BAR */}
        <div
          style={{
            marginTop: 20,
            background: '#1A1A1A',
            borderRadius: 16,
            padding: '14px 16px',
            border: '1px solid #2A2A2A',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
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
