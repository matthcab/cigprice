'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { RESULTS_DATA, formatPrice, getPriceDelta } from '@/lib/data';

function ResultsContent() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get('from') || 'Paris';
  const to = params.get('to') || 'Madrid';
  const brand = params.get('brand') || 'Marlboro';
  const [tab, setTab] = useState<'paquet' | 'cartouche'>('paquet');

  const key = `${from}-${to}`;
  const results = RESULTS_DATA[key] || RESULTS_DATA['default'];
  const bestPrice = results[0].price;

  return (
    <div>
      {/* HEADER */}
      <div style={{ background: '#111', padding: '16px 20px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <button
            onClick={() => router.back()}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: '#1A1A1A',
              border: '1px solid #2A2A2A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4L6 9l5 5" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#F0EDE4' }}>{from}</span>
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                <path
                  d="M0 5h16M12 1l4 4-4 4"
                  stroke="#F5C842"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#F0EDE4' }}>{to}</span>
            </div>
            <div style={{ fontSize: 13, color: '#555', marginTop: 1 }}>{brand} · 1 paquet</div>
          </div>
          <button
            style={{
              border: '1px solid #333',
              borderRadius: 10,
              padding: '6px 10px',
              fontSize: 13,
              color: '#888',
              cursor: 'pointer',
              background: 'transparent',
              fontFamily: 'inherit',
            }}
          >
            Filtrer
          </button>
        </div>

        {/* WINNER CARD */}
        <div
          style={{
            background: 'rgba(76,175,130,0.05)',
            border: '1px solid rgba(76,175,130,0.2)',
            borderRadius: 20,
            padding: '18px 18px 14px',
          }}
        >
          <div
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}
          >
            <div>
              <div className="pill pill-green" style={{ marginBottom: 8, display: 'inline-flex' }}>
                🏆 Meilleure option
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#F0EDE4', lineHeight: 1.1 }}>
                {results[0].location}
              </div>
              <div style={{ fontSize: 13, color: '#555', marginTop: 3 }}>{results[0].sublocation}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontSize: 38,
                  fontWeight: 700,
                  color: '#4CAF82',
                  letterSpacing: -1,
                  lineHeight: 1,
                }}
              >
                {tab === 'paquet'
                  ? formatPrice(results[0].price, results[0].currency)
                  : formatPrice(results[0].price * 10, results[0].currency)}
              </div>
              <div style={{ fontSize: 13, color: '#4CAF82', marginTop: 2 }}>le moins cher</div>
            </div>
          </div>

          <div
            style={{
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 12,
              padding: '10px 14px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: 12, color: '#555', marginBottom: 1 }}>
                Économie vs {results[results.length - 1].location.replace('En ville à ', '')} boutique
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#4CAF82' }}>
                − {(results[results.length - 1].price - bestPrice).toFixed(2).replace('.', ',')}€
              </div>
            </div>
            <div style={{ width: 1, height: 36, background: '#2a2a2a' }} />
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, color: '#555', marginBottom: 1 }}>Basé sur</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#888' }}>{results[0].reports} signalements</div>
            </div>
          </div>
        </div>
      </div>

      {/* RESULTS LIST */}
      <div style={{ padding: '14px 20px 24px' }}>
        {/* Tab toggle */}
        <div
          style={{
            display: 'flex',
            gap: 0,
            background: '#1a1a1a',
            borderRadius: 12,
            padding: 4,
            marginBottom: 14,
          }}
        >
          {(['paquet', 'cartouche'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: 9,
                background: tab === t ? '#2a2a2a' : 'transparent',
                border: 'none',
                fontFamily: 'inherit',
                fontSize: 14,
                fontWeight: 600,
                color: tab === t ? '#F0EDE4' : '#555',
                cursor: 'pointer',
              }}
            >
              {t === 'paquet' ? '1 paquet' : '1 cartouche (×10)'}
            </button>
          ))}
        </div>

        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '1.2px',
            textTransform: 'uppercase' as const,
            color: '#888',
            marginBottom: 10,
          }}
        >
          Classement · du moins cher au plus cher
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {results.map((r) => {
            const displayPrice = tab === 'paquet' ? r.price : r.price * 10;
            const delta = getPriceDelta(
              tab === 'paquet' ? r.price : r.price * 10,
              tab === 'paquet' ? bestPrice : bestPrice * 10,
              r.currency,
            );
            return (
              <div
                key={r.rank}
                style={{
                  background: r.best ? 'rgba(76,175,130,0.04)' : '#1A1A1A',
                  borderRadius: 16,
                  padding: 16,
                  border: r.best
                    ? '1px solid rgba(76,175,130,0.27)'
                    : r.worst
                      ? '1px solid rgba(255,90,90,0.13)'
                      : '1px solid #2A2A2A',
                  display: 'flex',
                  gap: 14,
                  alignItems: 'center',
                }}
              >
                {/* Rank */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: r.best
                      ? 'rgba(76,175,130,0.13)'
                      : r.worst
                        ? 'rgba(255,90,90,0.13)'
                        : '#242424',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 18,
                    color: r.best ? '#4CAF82' : r.worst ? '#FF5A5A' : '#555',
                    flexShrink: 0,
                  }}
                >
                  {r.rank}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <span style={{ fontSize: 15 }}>{r.flag}</span>
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: '#F0EDE4',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {r.location}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: '#555',
                      marginBottom: 6,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {r.sublocation}
                  </div>
                  <div style={{ display: 'flex', gap: 5 }}>
                    <span
                      className={`pill ${r.type === 'airport' ? 'pill-yellow' : 'pill-gray'}`}
                      style={{ fontSize: 11 }}
                    >
                      {r.type === 'airport' ? '✈' : '🏙'} {r.type === 'airport' ? 'Aéroport' : 'Ville'}
                    </span>
                    <span className="pill pill-gray" style={{ fontSize: 11 }}>
                      {r.reports} signalements
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: r.best ? '#4CAF82' : r.worst ? '#FF5A5A' : '#F0EDE4',
                      letterSpacing: -0.3,
                    }}
                  >
                    {formatPrice(displayPrice, r.currency)}
                  </div>
                  {delta && (
                    <div style={{ fontSize: 12, color: '#FF5A5A', marginTop: 2, fontWeight: 500 }}>{delta}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #2A2A2A', margin: '16px 0' }} />

        {/* CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            className="cta-btn"
            onClick={() => router.push('/signaler')}
          >
            <span>✏️</span> Signaler un prix pour cette route
          </button>
          <button className="ghost-btn" onClick={() => router.push('/')}>
            Nouvelle recherche
          </button>
        </div>

        <div style={{ marginTop: 14, fontSize: 12, color: '#333', textAlign: 'center', lineHeight: 1.6 }}>
          Prix basés sur {results.reduce((a, r) => a + r.reports, 0)} signalements
          <br />
          Dernière mise à jour il y a 2h ·{' '}
          <span style={{ color: '#F5C842' }}>Données communautaires</span>
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
