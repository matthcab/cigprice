import type { Metadata, Viewport } from 'next';
import './globals.css';
import BottomNav from '@/components/BottomNav';

export const metadata: Metadata = {
  title: 'CigPrice — Où fumer coûte moins cher ?',
  description: "Comparez les prix des cigarettes en ville, à l'aéroport de départ et d'arrivée. Données communautaires, mises à jour en temps réel.",
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#111111',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          padding: 0,
          background: '#111111',
          color: '#F0EDE4',
          fontFamily: "'Space Grotesk', sans-serif",
          minHeight: '100dvh',
        }}
      >
        <div
          style={{
            maxWidth: 480,
            margin: '0 auto',
            minHeight: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <main
            style={{
              flex: 1,
              overflowY: 'auto',
              paddingBottom: 80,
            }}
          >
            {children}
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
