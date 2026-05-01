'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';

const NAV_ITEMS = [
  {
    id: 'home',
    label: 'Accueil',
    href: '/',
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
        <path d="M3 9.5L11 3l8 6.5V19a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" fill={active ? '#F5C842' : '#444'} />
        <path d="M8 20v-6h6v6" fill={active ? '#111' : '#2a2a2a'} />
      </svg>
    ),
  },
  {
    id: 'results',
    label: 'Résultats',
    href: '/resultats',
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
        <circle cx="10" cy="10" r="7" stroke={active ? '#F5C842' : '#444'} strokeWidth="2" />
        <path d="M15.5 15.5L19 19" stroke={active ? '#F5C842' : '#444'} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'signaler',
    label: 'Signaler un prix',
    href: '/signaler',
    icon: (_active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="16" height="16" rx="5" fill="#F5C842" />
        <path d="M11 7v8M7 11h8" stroke="#111" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'top',
    label: 'Top villes',
    href: '/top',
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
        <path d="M7 3h8v8a4 4 0 01-8 0V3z" fill={active ? '#F5C842' : '#444'} />
        <path d="M5 4H3a2 2 0 002 2M17 4h2a2 2 0 01-2 2" stroke={active ? '#F5C842' : '#444'} strokeWidth="1.5" />
        <rect x="9" y="15" width="4" height="3" fill={active ? '#F5C842' : '#444'} />
        <rect x="7" y="18" width="8" height="1.5" rx="0.75" fill={active ? '#F5C842' : '#444'} />
      </svg>
    ),
  },
];

export default function DesktopNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside className="desktop-nav">
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none', display: 'block', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: '#F0EDE4', letterSpacing: -0.5 }}>CigPrice</span>
          <span style={{ fontSize: 9, fontWeight: 600, background: '#F5C842', color: '#111', borderRadius: 4, padding: '2px 5px' }}>
            BETA
          </span>
        </div>
      </Link>

      {/* Nav links */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
        {NAV_ITEMS.map(({ id, label, href, icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={id}
              href={href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                borderRadius: 12,
                background: active ? 'rgba(245,200,66,0.08)' : 'transparent',
                border: active ? '1px solid rgba(245,200,66,0.15)' : '1px solid transparent',
                textDecoration: 'none',
                transition: 'background 0.15s',
              }}
            >
              <div style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {icon(active)}
              </div>
              <span style={{ fontSize: 15, fontWeight: active ? 600 : 500, color: active ? '#F5C842' : '#888' }}>
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid #2A2A2A' }}>
        {session ? (
          <Link href="/profil" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 12 }}>
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt="avatar"
                style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0 }}
              />
            ) : (
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(245,200,66,0.09)', border: '1.5px solid rgba(245,200,66,0.27)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>
                {session.user?.name?.[0] ?? '👤'}
              </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#F0EDE4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {session.user?.name}
              </div>
              <div style={{ fontSize: 11, color: '#F5C842', fontWeight: 600 }}>⚡ 47 pts</div>
            </div>
          </Link>
        ) : (
          <button
            onClick={() => signIn('google')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '10px 12px',
              borderRadius: 12,
              background: 'rgba(245,200,66,0.06)',
              border: '1px solid rgba(245,200,66,0.15)',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
              <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
            </svg>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#F0EDE4' }}>Se connecter</span>
          </button>
        )}
      </div>
    </aside>
  );
}
