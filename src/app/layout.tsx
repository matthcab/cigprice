import type { Metadata, Viewport } from 'next';
import './globals.css';
import BottomNav from '@/components/BottomNav';
import DesktopNav from '@/components/DesktopNav';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'CigPrice — Où fumer coûte moins cher ?',
  description: "Comparez les prix des cigarettes en ville, à l'aéroport de départ et d'arrivée. Données communautaires, mises à jour en temps réel.",
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
      <body>
        <Providers>
          <div className="layout-root">
            <DesktopNav />
            <main className="main-scroll">
              {children}
            </main>
            <BottomNav />
          </div>
        </Providers>
      </body>
    </html>
  );
}
