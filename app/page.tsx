import Image from 'next/image';
import Link from 'next/link';

const courses = [
  { title: 'Quran Recitation', href: '/courses/quran-recitation', image: '/assets/quran-category.webp', body: 'Qaida, fluent recitation, Tajweed correction and confidence for children and adults.' },
  { title: 'Tajweed Mastery', href: '/courses/tajweed', image: '/assets/Tajweed.webp', body: 'Rule-by-rule coaching with live correction, practice targets and measurable progress.' },
  { title: 'Arabic Language', href: '/courses/arabic-for-beginners', image: '/assets/arabic-studies.webp', body: 'Modern beginner-to-advanced Arabic pathways for reading, speaking and understanding.' },
  { title: 'Islamic Studies', href: '/courses/islamic-studies', image: '/assets/Islamic Studies.webp', body: 'Aqeedah, Seerah, manners, duas and practical faith lessons for the whole family.' },
];

const stats = ['1:1 live classes', 'Male & female tutors', 'Flexible time zones', 'Parent progress notes'];
const steps = ['Free level assessment', 'Personal learning roadmap', 'Matched certified teacher', 'Weekly progress rhythm'];

export default function Home() {
  return (
    <main>
      <section className="hero shell">
        <div className="heroCopy">
          <span className="pill">Online Quran academy for families</span>
          <h1>Beautiful Quran learning, redesigned for calm progress.</h1>
          <p>
            Tazkirah brings Quran recitation, Tajweed, Hifz, Arabic and Islamic studies into a refined Next.js
            learning experience with clear pathways, warm teachers and parent-friendly progress.
          </p>
          <div className="actions">
            <Link className="btn primary" href="/free-class">Start with a free class</Link>
            <Link className="btn ghost" href="/courses">View all courses</Link>
          </div>
          <div className="stats">{stats.map((stat) => <strong key={stat}>{stat}</strong>)}</div>
        </div>
        <div className="heroVisual">
          <Image src="/assets/home-hero.webp" alt="Family learning Quran online at home" width={760} height={920} priority />
          <div className="glassCard"><b>Structured 30-minute lessons</b><span>Designed for focus, consistency and family routines.</span></div>
        </div>
      </section>

      <section className="shell introGrid" aria-label="Tazkirah highlights">
        {['Safeguarded online classes', 'Personal pace, clear milestones', 'Global schedules for busy homes'].map((item) => (
          <article key={item}><span>✓</span><h3>{item}</h3><p>Premium support, thoughtful onboarding and a polished student journey from first trial to long-term mastery.</p></article>
        ))}
      </section>

      <section className="shell sectionBlock">
        <div className="sectionHeading">
          <span className="pill">Curriculum</span>
          <h2>Every learning path feels focused, visual and easy to choose.</h2>
        </div>
        <div className="courseGrid">
          {courses.map((course) => (
            <Link className="courseCard" key={course.title} href={course.href}>
              <Image src={course.image} alt="" width={520} height={360} />
              <div><h3>{course.title}</h3><p>{course.body}</p><span>Explore pathway →</span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="shell splitPanel">
        <Image src="/assets/learning-path.webp" alt="Illustrated Islamic learning pathway" width={720} height={560} />
        <div>
          <span className="pill">Learning method</span>
          <h2>A guided experience instead of disconnected lessons.</h2>
          <div className="steps">{steps.map((step, index) => <p key={step}><b>{String(index + 1).padStart(2, '0')}</b>{step}</p>)}</div>
        </div>
      </section>

      <section className="shell testimonialBand">
        <p>“The redesign makes the academy feel premium, trustworthy and simple for parents to understand.”</p>
        <span>Parent experience focus</span>
      </section>

      <section className="shell ctaPanel">
        <span className="pill">Free trial</span>
        <h2>Meet a teacher and receive your recommended pathway.</h2>
        <p>Book a no-pressure assessment for Quran, Arabic, Hifz or Islamic studies.</p>
        <Link className="btn primary" href="/free-class">Book your free class</Link>
      </section>
    </main>
  );
}
