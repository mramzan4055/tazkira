import { SimplePage } from '../simple-page';

const pageCopy: Record<string, { eyebrow: string; title: string; description: string; image: string }> = {
  'quran-classes-for-kids': { eyebrow: 'Kids Quran', title: 'Online Quran classes for kids.', description: 'Gentle, engaging lessons that help children build Qaida, recitation, Tajweed and Islamic manners step by step.', image: '/assets/Young Boy Studying Quran at Home.webp' },
  'quran-classes-for-adults': { eyebrow: 'Adults Quran', title: 'Quran learning for adult schedules.', description: 'Flexible one-to-one coaching for adults returning to recitation, improving Tajweed or memorising with accountability.', image: '/assets/Serene Study with Islamic Motifs.webp' },
  'online-quran-classes-usa': { eyebrow: 'USA', title: 'Online Quran classes for families in the USA.', description: 'Teacher-led Quran and Arabic classes with timings designed for families across US time zones.', image: '/assets/Learning Across Borders.webp' },
  'online-quran-classes-uk': { eyebrow: 'UK', title: 'Online Quran classes for families in the UK.', description: 'Structured Quran, Arabic and Islamic Studies tuition with flexible after-school and weekend options.', image: '/assets/trusted-worldwide.webp' },
  'online-quran-classes-canada': { eyebrow: 'Canada', title: 'Online Quran classes for families in Canada.', description: 'Personalised live lessons for children and adults, scheduled around Canadian family routines.', image: '/assets/Learning Across Borders.webp' },
  'online-quran-classes-australia': { eyebrow: 'Australia', title: 'Online Quran classes for families in Australia.', description: 'Warm tutors, flexible scheduling and guided Quran learning for Australian households.', image: '/assets/trusted-worldwide.webp' },
  privacy: { eyebrow: 'Privacy', title: 'Privacy-first family learning.', description: 'A clear, trust-led approach to enquiries, class communication and learner information.', image: '/assets/Safeguarding & Trust.webp' },
  terms: { eyebrow: 'Terms', title: 'Simple learning terms.', description: 'Understand expectations for classes, scheduling, communication and respectful online study.', image: '/assets/Book of the Radiant Path.webp' },
  cookies: { eyebrow: 'Cookies', title: 'Cookie information.', description: 'How the website experience can use essential browser features to keep the service reliable.', image: '/assets/Signature Corner Elements.webp' },
  glossary: { eyebrow: 'Glossary', title: 'Helpful Islamic learning terms.', description: 'A family-friendly guide to common Quran, Tajweed, Arabic and Islamic Studies vocabulary.', image: '/assets/Book of the Radiant Path.webp' },
};

export function generateStaticParams() {
  return Object.keys(pageCopy).map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const copy = pageCopy[slug] ?? { eyebrow: 'Tazkirah', title: 'A refreshed Next.js learning page.', description: 'This legacy URL now renders through the Next.js app with the redesigned Tazkirah interface.', image: '/assets/about-hero.webp' };
  return <SimplePage {...copy} />;
}
