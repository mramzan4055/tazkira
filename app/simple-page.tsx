import Image from 'next/image';
import Link from 'next/link';

type Props = { eyebrow: string; title: string; description: string; image?: string; cta?: string };

export function SimplePage({ eyebrow, title, description, image = '/assets/about-hero.webp', cta = 'Book a free class' }: Props) {
  return (
    <main className="simplePage">
      <section className="shell simpleHero">
        <div>
          <Link className="backLink" href="/">← Tazkirah</Link>
          <span className="pill">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
          <Link className="btn primary" href="/free-class">{cta}</Link>
        </div>
        <Image src={image} alt="" width={760} height={560} priority />
      </section>
    </main>
  );
}
