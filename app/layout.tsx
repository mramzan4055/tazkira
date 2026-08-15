import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tazkirah Online Education | Online Quran Classes',
  description: 'Live one-to-one Quran, Tajweed, Arabic and Islamic studies classes with a redesigned Next.js experience.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
