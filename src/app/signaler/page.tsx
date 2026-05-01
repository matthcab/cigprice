'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BRANDS } from '@/lib/data';

const STEPS = ['Localisation', 'Marque & prix', 'Confirmation'];

const LOCATION_TYPES = [
  { id: 'city', label: '🏙 En ville', sub: 'Tabac, supermarché, bureau de presse...' },
  { id: 'airport', label: '✈ Aéroport', sub: 'Duty-free, boutique zone embarquement...' },
];

export default function SignalerPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [locationType, setLocationType] = useState('');
  const [city, setCity] = useState('');
  const [shopName, setShopName] = useState('');
  const [brand, setBrand] = useState('Marlboro');
  const [price, setPrice] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const canNext = () => {
    if (step === 0) return locationType && city;
    if (step === 1) return brand && price;
    return true;
  };

  const handleNext = () => {
    if (step < 2) setStep((s) => s + 1);
    else handleSubmit();
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          padding: '0 24px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: '#F0EDE4', marginBottom: 8 }}>
          Prix signalé !
        </div>
        <div style={{ fontSize: 15, color: '#888', marginBottom: 8, lineHeight: 1.6 }}>
          Merci pour ta contribution à la communauté CigPrice.
        </div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(245,200,66,0.09)',
            border: '1px solid rgba(245,200,66,0.2)',
            borderRadius: 10,
            padding: '8px 16px',
            marginBottom: 32,
          }}
        >
          <span style={{ fontSize: 18 }}>⚡</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#F5C842' }}>+10 points de karma</span>
        </div>
        <button
          className="cta-btn"
          onClick={() => router.push('/')}
          style={{ maxWidth: 280 }}
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <div style={{ background: '#111', padding: '16px 20px 20px', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <button
            onClick={() => (step > 0 ? setStep((s) => s - 1) : router.back())}
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
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#F0EDE4' }}>Signaler un prix</div>
            <div style={{ fontSize: 13, color: '#555', marginTop: 1 }}>
              Étape {step + 1} sur 3 · {STEPS[step]}
            </div>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div style={{ display: 'flex', gap: 6 }}>
          {STEPS.map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 2,
                background: i <= step ? '#F5C842' : '#2A2A2A',
                transition: 'background 0.3s',
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ padding: '24px 20px' }}>
        {/* STEP 0 — LOCALISATION */}
        {step === 0 && (
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#F0EDE4', marginBottom: 6 }}>
              Où as-tu acheté ?
            </div>
            <div style={{ fontSize: 14, color: '#888', marginBottom: 20 }}>
              Choisis le type de point de vente.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {LOCATION_TYPES.map((lt) => (
                <button
                  key={lt.id}
                  onClick={() => setLocationType(lt.id)}
                  style={{
                    padding: '16px',
                    borderRadius: 14,
                    border: `1.5px solid ${locationType === lt.id ? '#F5C842' : '#2A2A2A'}`,
                    background: locationType === lt.id ? 'rgba(245,200,66,0.06)' : '#1A1A1A',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'inherit',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: '#F0EDE4', marginBottom: 3 }}>
                      {lt.label}
                    </div>
                    <div style={{ fontSize: 13, color: '#555' }}>{lt.sub}</div>
                  </div>
                  {locationType === lt.id && (
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: '#F5C842',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="#111"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 8 }}>Ville</div>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ex: Madrid, Barcelone..."
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: 14,
                  background: '#1A1A1A',
                  border: `1.5px solid ${city ? '#F5C842' : '#2A2A2A'}`,
                  color: '#F0EDE4',
                  fontSize: 16,
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 8 }}>
                Nom de la boutique{' '}
                <span style={{ color: '#444', fontWeight: 400 }}>(optionnel)</span>
              </div>
              <input
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                placeholder="Ex: Tabac Estanco, Relay..."
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: 14,
                  background: '#1A1A1A',
                  border: '1.5px solid #2A2A2A',
                  color: '#F0EDE4',
                  fontSize: 16,
                  fontFamily: 'inherit',
                  outline: 'none',
                }}
              />
            </div>
          </div>
        )}

        {/* STEP 1 — MARQUE & PRIX */}
        {step === 1 && (
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#F0EDE4', marginBottom: 6 }}>
              Quelle marque, quel prix ?
            </div>
            <div style={{ fontSize: 14, color: '#888', marginBottom: 20 }}>
              Prix pour 1 paquet standard (20 cigarettes).
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 10 }}>Marque</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {BRANDS.map((b) => (
                  <button
                    key={b}
                    onClick={() => setBrand(b)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 100,
                      border: `1.5px solid ${brand === b ? '#F5C842' : '#333'}`,
                      background: brand === b ? 'rgba(245,200,66,0.09)' : 'transparent',
                      color: brand === b ? '#F5C842' : '#555',
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 8 }}>
                Prix (en €)
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  style={{
                    width: '100%',
                    padding: '14px 50px 14px 16px',
                    borderRadius: 14,
                    background: '#1A1A1A',
                    border: `1.5px solid ${price ? '#F5C842' : '#2A2A2A'}`,
                    color: '#F0EDE4',
                    fontSize: 24,
                    fontWeight: 700,
                    fontFamily: 'inherit',
                    outline: 'none',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: 22,
                    fontWeight: 700,
                    color: '#555',
                  }}
                >
                  €
                </span>
              </div>
              {price && (
                <div style={{ fontSize: 13, color: '#888', marginTop: 8 }}>
                  Soit{' '}
                  <span style={{ color: '#F5C842', fontWeight: 600 }}>
                    {(parseFloat(price) * 10).toFixed(2).replace('.', ',')}€
                  </span>{' '}
                  la cartouche
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 2 — CONFIRMATION */}
        {step === 2 && (
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#F0EDE4', marginBottom: 6 }}>
              Confirme ta contribution
            </div>
            <div style={{ fontSize: 14, color: '#888', marginBottom: 20 }}>
              Vérifie les informations avant d'envoyer.
            </div>

            <div
              style={{
                background: '#1A1A1A',
                borderRadius: 16,
                padding: 16,
                border: '1px solid #2A2A2A',
                marginBottom: 24,
              }}
            >
              {[
                { label: 'Type', value: locationType === 'city' ? '🏙 En ville' : '✈ Aéroport' },
                { label: 'Ville', value: city },
                { label: 'Boutique', value: shopName || '—' },
                { label: 'Marque', value: brand },
                { label: 'Prix', value: `${parseFloat(price).toFixed(2).replace('.', ',')}€` },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: '1px solid #2A2A2A',
                  }}
                >
                  <span style={{ fontSize: 14, color: '#555' }}>{label}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#F0EDE4' }}>{value}</span>
                </div>
              ))}
            </div>

            <div
              style={{
                background: 'rgba(245,200,66,0.06)',
                border: '1px solid rgba(245,200,66,0.2)',
                borderRadius: 12,
                padding: '12px 16px',
                marginBottom: 24,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span style={{ fontSize: 20 }}>⚡</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#F5C842' }}>+10 points de karma</div>
                <div style={{ fontSize: 12, color: '#888' }}>Merci de contribuer à la communauté !</div>
              </div>
            </div>
          </div>
        )}

        <button className="cta-btn" onClick={handleNext} disabled={!canNext()} style={{ opacity: canNext() ? 1 : 0.4 }}>
          {step === 2 ? 'Envoyer ma contribution ✓' : 'Continuer →'}
        </button>
      </div>
    </div>
  );
}
