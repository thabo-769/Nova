import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { ClientLayout } from './ClientLayout';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nova Diner | Premium Restaurant & Dining – Bulawayo, Zimbabwe',
  description:
    'Experience premier dining in Bulawayo. Online food ordering, table reservations, romantic Nova Date Night experiences, and loyalty rewards.',
  keywords: [
    'Nova Diner',
    'Bulawayo Restaurant',
    'Zimbabwe Dining',
    'Online Food Ordering',
    'Table Reservations',
    'Date Night Bulawayo',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} antialiased selection:bg-nova-gold selection:text-black`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
