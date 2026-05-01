'use client';

import { useEffect, useRef, useState } from 'react';
import { searchAirports, type Airport } from '@/lib/airports';

interface Props {
  value: Airport | null;
  onChange: (airport: Airport | null) => void;
  label?: string;
  placeholder?: string;
}

const labelForAirport = (airport: Airport) => `${airport.code} · ${airport.name}`;

export default function AirportSearch({ value, onChange, label = 'Aéroport', placeholder = 'Ex: CDG, Orly, Heathrow, Dubai...' }: Props) {
  const [query, setQuery] = useState(value ? labelForAirport(value) : '');
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = searchAirports(query);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const select = (airport: Airport) => {
    setQuery(labelForAirport(airport));
    onChange(airport);
    setOpen(false);
  };

  const handleKey = (event: React.KeyboardEvent) => {
    if (!open || results.length === 0) return;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlighted((current) => Math.min(current + 1, results.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlighted((current) => Math.max(current - 1, 0));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (results[highlighted]) select(results[highlighted]);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <div
        onClick={() => inputRef.current?.focus()}
        style={{
          background: '#1A1A1A',
          border: `1.5px solid ${value ? '#F5C842' : '#2A2A2A'}`,
          borderRadius: 14,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          cursor: 'text',
        }}
      >
        <span style={{ fontSize: 18, flexShrink: 0 }}>✈</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, color: '#555', marginBottom: 2 }}>{label}</div>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              onChange(null);
              setOpen(true);
              setHighlighted(0);
            }}
            onFocus={() => {
              if (query.length > 0) setOpen(true);
            }}
            onKeyDown={handleKey}
            placeholder={placeholder}
            autoComplete="off"
            style={{
              fontSize: 17,
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
            onClick={(event) => {
              event.stopPropagation();
              setQuery('');
              onChange(null);
              setOpen(false);
              inputRef.current?.focus();
            }}
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
          {results.map((airport, index) => (
            <div
              key={airport.code}
              onMouseDown={() => select(airport)}
              onMouseEnter={() => setHighlighted(index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                background: index === highlighted ? '#242424' : 'transparent',
                cursor: 'pointer',
                borderBottom: index < results.length - 1 ? '1px solid #242424' : 'none',
              }}
            >
              <div style={{ width: 44, flexShrink: 0, fontSize: 13, fontWeight: 800, color: '#F5C842' }}>{airport.code}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#F0EDE4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {airport.name}
                </div>
                <div style={{ fontSize: 12, color: '#555' }}>
                  {airport.city}, {airport.country}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
