'use client';

import { useState, useRef, useEffect } from 'react';
import { searchCities, type City } from '@/lib/cities';

interface Props {
  value: string;
  onChange: (city: City) => void;
  placeholder: string;
  label: string;
  dot?: 'yellow' | 'empty';
}

export default function CitySearch({ value, onChange, placeholder, label, dot = 'empty' }: Props) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = searchCities(query);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const select = (city: City) => {
    setQuery(city.name);
    onChange(city);
    setOpen(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (!open || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[highlighted]) select(results[highlighted]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const isActive = dot === 'yellow';

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <div
        style={{
          background: '#111',
          border: `1.5px solid ${isActive ? '#F5C842' : '#2A2A2A'}`,
          borderStyle: isActive ? 'solid' : 'dashed',
          borderRadius: 14,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          cursor: 'text',
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {dot === 'yellow' ? (
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F5C842', flexShrink: 0 }} />
        ) : (
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'transparent', border: '2px solid #444', flexShrink: 0 }} />
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: '#555', marginBottom: 2 }}>{label}</div>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setHighlighted(0);
            }}
            onFocus={() => { if (query.length > 0) setOpen(true); }}
            onKeyDown={handleKey}
            placeholder={placeholder}
            autoComplete="off"
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: query ? '#F0EDE4' : '#444',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              width: '100%',
              fontFamily: 'inherit',
            }}
          />
        </div>
        {query && (
          <button
            onClick={(e) => { e.stopPropagation(); setQuery(''); setOpen(false); inputRef.current?.focus(); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#555', flexShrink: 0, fontSize: 16, lineHeight: 1 }}
          >
            ×
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: 4,
            background: '#1A1A1A',
            border: '1px solid #2A2A2A',
            borderRadius: 14,
            overflow: 'hidden',
            zIndex: 100,
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
        >
          {results.map((city, i) => (
            <div
              key={city.id}
              onMouseDown={() => select(city)}
              onMouseEnter={() => setHighlighted(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                background: i === highlighted ? '#242424' : 'transparent',
                cursor: 'pointer',
                borderBottom: i < results.length - 1 ? '1px solid #242424' : 'none',
              }}
            >
              <span style={{ fontSize: 20, flexShrink: 0 }}>{city.flag}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#F0EDE4' }}>{city.name}</div>
                <div style={{ fontSize: 12, color: '#555' }}>
                  {city.placeType === 'country' ? 'Pays' : city.country}
                  {!city.hasPrice ? ' · données à venir' : ''}
                </div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: city.hasPrice ? '#4CAF82' : '#777', flexShrink: 0 }}>
                {city.cityPrice !== undefined ? `${city.cityPrice.toFixed(2).replace('.', ',')}€` : '—'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
