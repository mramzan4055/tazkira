import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { SiteFooter, SiteHeader } from './site-chrome';

export const metadata: Metadata = {
  title: 'Tazkirah Online Education | Online Quran Classes',
  description: 'Live one-to-one Quran, Tajweed, Arabic and Islamic studies classes with a redesigned Next.js experience.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body><SiteHeader />{children}<SiteFooter /></body>
    </html>
  );
}
