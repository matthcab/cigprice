'use client';

import { useState } from 'react';
import { TOP_CITIES } from '@/lib/data';

const FILTERS = ['Toutes', 'Moins chers', 'Plus chers', 'Europe', 'Monde'];

const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
  if (trend === 'up')
    return <span style={{ fontSize: 12, color: '#FF5A5A', fontWeight: 700 }}>↑</span>;
  if (trend === 'down')
    return <span style={{ fontSize: 12, color: '#4CAF82', fontWeight: 700 }}>↓</span>;
  return <span style={{ fontSize: 12, color: '#888', fontWeight: 700 }}>→</span>;
};

export default function TopPage() {
  const [filter, setFilter] = useState('Toutes');

  const sorted = filter === 'Plus chers'
    ? [...TOP_CITIES].sort((a, b) => b.avgPrice - a.avgPrice)
    : [...TOP_CITIES].sort((a, b) => a.avgPrice - b.avgPrice);

  return (
    <div>
      {/* HEADER */}
      <div style={{ background: '#111', padding: '16px 20px 16px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 26, fontWeight: 700, color: '#F0EDE4', letterSpacing: -0.5, marginBottom: 2 }}>
            Top villes 🏆
          </div>
          <div style={{ fontSize: 14, color: '#555' }}>Classement mondial des prix</div>
        </div>

        {/* FILTER CHIPS */}
        <div className="hide-scrollbar" style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2 }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                flexShrink: 0,
                padding: '6px 12px',
                borderRadius: 100,
                border: `1.5px solid ${filter === f ? '#F5C842' : '#333'}`,
                background: filter === f ? 'rgba(245,200,66,0.09)' : 'transparent',
                color: filter === f ? '#F5C842' : '#555',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                whiteSpace: 'nowrap',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* PODIUM — top 3 */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginBottom: 20 }}>
          {/* 2nd */}
          <div
            style={{
              flex: 1,
              background: '#1A1A1A',
              border: '1px solid #2A2A2A',
              borderRadius: 16,
              padding: '12px 10px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 4 }}>{sorted[1]?.flag}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#F0EDE4', marginBottom: 2 }}>
              {sorted[1]?.city}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#888', marginBottom: 2 }}>
              {sorted[1]?.avgPrice.toFixed(2).replace('.', ',')}€
            </div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                background: '#2A2A2A',
                color: '#888',
                borderRadius: 6,
                padding: '2px 8px',
                display: 'inline-block',
              }}
            >
              🥈 2
            </div>
          </div>

          {/* 1st */}
          <div
            style={{
              flex: 1,
              background: 'rgba(245,200,66,0.06)',
              border: '1px solid rgba(245,200,66,0.2)',
              borderRadius: 16,
              padding: '16px 10px',
              textAlign: 'center',
              marginBottom: -8,
            }}
          >
            <div style={{ fontSize: 26, marginBottom: 4 }}>{sorted[0]?.flag}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#F0EDE4', marginBottom: 2 }}>
              {sorted[0]?.city}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#4CAF82', marginBottom: 2 }}>
              {sorted[0]?.avgPrice.toFixed(2).replace('.', ',')}€
            </div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                background: 'rgba(245,200,66,0.13)',
                color: '#F5C842',
                borderRadius: 6,
                padding: '2px 8px',
                display: 'inline-block',
              }}
            >
              🥇 1er
            </div>
          </div>

          {/* 3rd */}
          <div
            style={{
              flex: 1,
              background: '#1A1A1A',
              border: '1px solid #2A2A2A',
              borderRadius: 16,
              padding: '10px 10px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 4 }}>{sorted[2]?.flag}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#F0EDE4', marginBottom: 2 }}>
              {sorted[2]?.city}
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#888', marginBottom: 2 }}>
              {sorted[2]?.avgPrice.toFixed(2).replace('.', ',')}€
            </div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                background: '#2A2A2A',
                color: '#888',
                borderRadius: 6,
                padding: '2px 8px',
                display: 'inline-block',
              }}
            >
              🥉 3
            </div>
          </div>
        </div>
      </div>

      {/* FULL LIST */}
      <div style={{ padding: '0 20px 24px' }}>
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
          Classement complet · Marlboro
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {sorted.map((city, idx) => (
            <div
              key={city.city}
              style={{
                background: idx === 0 ? 'rgba(76,175,130,0.04)' : '#1A1A1A',
                borderRadius: 14,
                padding: '14px 16px',
                border: idx === 0 ? '1px solid rgba(76,175,130,0.2)' : '1px solid #2A2A2A',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: idx === 0 ? 'rgba(76,175,130,0.13)' : '#242424',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 14,
                  color: idx === 0 ? '#4CAF82' : '#555',
                  flexShrink: 0,
                }}
              >
                {idx + 1}
              </div>

              <div style={{ fontSize: 22, flexShrink: 0 }}>{city.flag}</div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#F0EDE4' }}>{city.city}</div>
                <div style={{ fontSize: 12, color: '#555' }}>
                  {city.country} · {city.priceCount} signalements
                </div>
              </div>

              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: idx === 0 ? '#4CAF82' : idx === sorted.length - 1 ? '#FF5A5A' : '#F0EDE4',
                  }}
                >
                  {city.avgPrice.toFixed(2).replace('.', ',')}€
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end', marginTop: 2 }}>
                  <TrendIcon trend={city.trend} />
                  <span style={{ fontSize: 11, color: '#555' }}>tendance</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16, fontSize: 12, color: '#333', textAlign: 'center', lineHeight: 1.6 }}>
          Prix moyen constaté pour Marlboro · <span style={{ color: '#F5C842' }}>Données du CSV Combien coûte</span>
        </div>
      </div>
    </div>
  );
}
