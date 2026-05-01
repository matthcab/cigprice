'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const MOCK_CONTRIBUTIONS = [
  { id: '1', location: 'Aéroport BCN · T1', flag: '🇪🇸', brand: 'Marlboro', price: 5.9, type: 'airport', time: '2 jours', upvotes: 14 },
  { id: '2', location: 'Tabac Estanco · Madrid', flag: '🇪🇸', brand: 'Camel', price: 5.1, type: 'city', time: '1 sem.', upvotes: 7 },
  { id: '3', location: 'Duty-Free Dubaï · T3', flag: '🇦🇪', brand: 'Marlboro', price: 3.2, type: 'airport', time: '2 sem.', upvotes: 22 },
];

const BADGES = [
  { icon: '🚀', label: 'Premier prix', desc: 'A signaléson premier prix', earned: true },
  { icon: '✈️', label: 'Voyageur', desc: '5 aéroports différents', earned: true },
  { icon: '🌍', label: 'Globe-trotter', desc: '3 pays différents', earned: true },
  { icon: '💎', label: 'Expert', desc: '50 signalements vérifiés', earned: false },
  { icon: '👑', label: 'Top contributeur', desc: 'Top 10 du classement', earned: false },
];

export default function ProfilPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ fontSize: 14, color: '#555' }}>Chargement...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 52, marginBottom: 20 }}>👤</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: '#F0EDE4', marginBottom: 8 }}>Rejoins la communauté</div>
        <div style={{ fontSize: 15, color: '#888', marginBottom: 32, lineHeight: 1.6, maxWidth: 280 }}>
          Connecte-toi pour suivre tes contributions, gagner des badges et accumuler du karma.
        </div>
        <button
          onClick={() => signIn('google')}
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 24px', borderRadius: 14, background: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: '#111', width: '100%', maxWidth: 280, justifyContent: 'center' }}
        >
          <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.013 17.64 11.705 17.64 9.2z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Se connecter avec Google
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <div style={{ background: '#111', padding: '16px 20px', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <button
            onClick={() => router.back()}
            style={{ width: 36, height: 36, borderRadius: 10, background: '#1A1A1A', border: '1px solid #2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4L6 9l5 5" stroke="#888" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#F0EDE4' }}>Mon profil</span>
        </div>

        {/* Avatar + info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          {session.user?.image ? (
            <img src={session.user.image} alt="avatar" style={{ width: 64, height: 64, borderRadius: '50%', border: '2px solid rgba(245,200,66,0.4)' }} />
          ) : (
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(245,200,66,0.09)', border: '2px solid rgba(245,200,66,0.27)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>
              {session.user?.name?.[0] ?? '👤'}
            </div>
          )}
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#F0EDE4' }}>{session.user?.name}</div>
            <div style={{ fontSize: 14, color: '#555', marginTop: 2 }}>{session.user?.email}</div>
          </div>
        </div>

        {/* KARMA + STATS */}
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1, background: 'rgba(245,200,66,0.06)', border: '1px solid rgba(245,200,66,0.2)', borderRadius: 14, padding: '12px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: '#F5C842' }}>⚡ 47</div>
            <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>Points karma</div>
          </div>
          <div style={{ flex: 1, background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 14, padding: '12px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: '#F0EDE4' }}>3</div>
            <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>Signalements</div>
          </div>
          <div style={{ flex: 1, background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: 14, padding: '12px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: '#4CAF82' }}>43</div>
            <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>Upvotes reçus</div>
          </div>
        </div>
      </div>

      {/* BADGES */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '1.2px', textTransform: 'uppercase' as const, color: '#888', marginBottom: 12 }}>
          Badges
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }} className="hide-scrollbar">
          {BADGES.map((badge) => (
            <div
              key={badge.label}
              style={{
                flexShrink: 0, background: badge.earned ? 'rgba(245,200,66,0.06)' : '#1A1A1A',
                border: `1px solid ${badge.earned ? 'rgba(245,200,66,0.2)' : '#2A2A2A'}`,
                borderRadius: 14, padding: '12px 14px', textAlign: 'center', width: 90, opacity: badge.earned ? 1 : 0.4,
              }}
            >
              <div style={{ fontSize: 26, marginBottom: 4 }}>{badge.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: badge.earned ? '#F5C842' : '#555', lineHeight: 1.2 }}>{badge.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTRIBUTIONS */}
      <div style={{ padding: '20px 20px 24px' }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '1.2px', textTransform: 'uppercase' as const, color: '#888', marginBottom: 12 }}>
          Mes signalements
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {MOCK_CONTRIBUTIONS.map((c) => (
            <div key={c.id} style={{ background: '#1A1A1A', borderRadius: 14, padding: '14px 16px', border: '1px solid #2A2A2A', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{c.flag}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#F0EDE4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.location}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <span className={`pill ${c.type === 'airport' ? 'pill-yellow' : 'pill-gray'}`} style={{ fontSize: 11 }}>
                    {c.type === 'airport' ? '✈' : '🏙'}
                  </span>
                  <span style={{ fontSize: 12, color: '#555' }}>{c.brand} · il y a {c.time}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#4CAF82' }}>{c.price.toFixed(2).replace('.', ',')}€</div>
                <div style={{ fontSize: 12, color: '#555' }}>↑ {c.upvotes}</div>
              </div>
            </div>
          ))}
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #2A2A2A', margin: '20px 0' }} />

        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="ghost-btn"
          style={{ color: '#FF5A5A', borderColor: 'rgba(255,90,90,0.3)' }}
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
