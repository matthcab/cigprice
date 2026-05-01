'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  {
    id: 'home',
    label: 'Accueil',
    href: '/',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
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
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="10" cy="10" r="7" stroke={active ? '#F5C842' : '#444'} strokeWidth="2" />
        <path d="M15.5 15.5L19 19" stroke={active ? '#F5C842' : '#444'} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'signaler',
    label: 'Signaler',
    href: '/signaler',
    icon: (_active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="16" height="16" rx="5" fill="#F5C842" />
        <path d="M11 7v8M7 11h8" stroke="#111" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'top',
    label: 'Top',
    href: '/top',
    icon: (active: boolean) => (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M7 3h8v8a4 4 0 01-8 0V3z" fill={active ? '#F5C842' : '#444'} />
        <path d="M5 4H3a2 2 0 002 2M17 4h2a2 2 0 01-2 2" stroke={active ? '#F5C842' : '#444'} strokeWidth="1.5" />
        <rect x="9" y="15" width="4" height="3" fill={active ? '#F5C842' : '#444'} />
        <rect x="7" y="18" width="8" height="1.5" rx="0.75" fill={active ? '#F5C842' : '#444'} />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="bottom-nav-bar">
      {NAV_ITEMS.map(({ id, label, href, icon }) => {
        const active = isActive(href);
        return (
          <Link
            key={id}
            href={href}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '10px 0 4px',
              textDecoration: 'none',
            }}
          >
            <div style={{ width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {icon(active)}
            </div>
            <span style={{ fontSize: 11, fontWeight: 500, color: active ? '#F5C842' : '#555', letterSpacing: '0.3px', fontFamily: 'inherit' }}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
