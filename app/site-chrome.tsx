import Image from 'next/image';
import Link from 'next/link';

const navItems = [
  ['Courses', '/courses'],
  ['How we teach', '/how-we-teach'],
  ['Teachers', '/teachers'],
  ['Pricing', '/pricing'],
  ['Contact', '/contact'],
];

export function SiteHeader() {
  return (
    <header className="siteHeader">
      <Link className="brand" href="/" aria-label="Tazkirah home">
        <Image src="/assets/tazkirah-mark.png" alt="" width={42} height={52} priority />
        <span>Tazkirah</span>
      </Link>
      <nav aria-label="Primary navigation">
        {navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
      </nav>
      <Link className="headerCta" href="/free-class">Book free class</Link>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="siteFooter">
      <div>
        <strong>Tazkirah</strong>
        <p>One-to-one online Quran, Tajweed, Hifz, Arabic and Islamic Studies for families.</p>
      </div>
      <nav aria-label="Footer navigation">
        {navItems.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
      </nav>
    </footer>
  );
}
