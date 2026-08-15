/* @ds-bundle: {"format":4,"namespace":"TazkirahDesignSystem_bcbab7","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"CourseFamilyCard","sourcePath":"components/cards/CourseFamilyCard.jsx"},{"name":"PricingCard","sourcePath":"components/cards/PricingCard.jsx"},{"name":"TeacherCard","sourcePath":"components/cards/TeacherCard.jsx"},{"name":"TestimonialCard","sourcePath":"components/cards/TestimonialCard.jsx"},{"name":"FaqAccordion","sourcePath":"components/disclosure/FaqAccordion.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"CtaBlock","sourcePath":"components/marketing/CtaBlock.jsx"},{"name":"TrustStrip","sourcePath":"components/marketing/TrustStrip.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"Nav","sourcePath":"components/navigation/Nav.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"b5e17f820c98","components/cards/CourseFamilyCard.jsx":"1595bf9017bb","components/cards/PricingCard.jsx":"615b20d83c29","components/cards/TeacherCard.jsx":"4731c9c97cd6","components/cards/TestimonialCard.jsx":"4167ba82b244","components/disclosure/FaqAccordion.jsx":"ee3068683f8d","components/feedback/Badge.jsx":"a3cb2c3f53c7","components/marketing/CtaBlock.jsx":"ffd05ed70192","components/marketing/TrustStrip.jsx":"e61b2df7e6cc","components/navigation/Footer.jsx":"467ddf6b9eaa","components/navigation/Nav.jsx":"25b6f5bf333e","ui_kits/website/About.jsx":"d0861b61590c","ui_kits/website/Courses.jsx":"fedbf9519175","ui_kits/website/Faq.jsx":"366dc9958f18","ui_kits/website/Home.jsx":"83dc9fff65a4","ui_kits/website/Pricing.jsx":"ffe62e6c50d2","ui_kits/website/Teachers.jsx":"00bf884a763b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.TazkirahDesignSystem_bcbab7 = window.TazkirahDesignSystem_bcbab7 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function Button({
  variant = 'primary',
  size = 'md',
  children,
  href,
  onClick,
  disabled,
  as
}) {
  const Tag = as || (href ? 'a' : 'button');
  const className = ['tz-btn', `tz-btn-${variant}`, size ? `tz-btn-${size}` : ''].filter(Boolean).join(' ');
  return React.createElement(Tag, {
    href,
    onClick,
    disabled,
    className,
    type: !href && !as ? 'button' : undefined
  }, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/cards/CourseFamilyCard.jsx
try { (() => {
function CourseFamilyCard({
  family,
  courses,
  description,
  href = '#'
}) {
  return React.createElement('div', {
    className: 'tz-card',
    style: {
      padding: '28px 24px'
    }
  }, React.createElement('div', {
    className: 'tz-card-eyebrow'
  }, family), React.createElement('div', {
    style: {
      font: '600 14px var(--font-sans)',
      color: 'var(--teal-600)',
      marginBottom: 12
    }
  }, courses.join(' · ')), React.createElement('div', {
    style: {
      font: 'var(--text-body)',
      color: 'var(--text-secondary)',
      flex: 1
    }
  }, description), React.createElement('a', {
    href,
    style: {
      font: '700 15px var(--font-sans)',
      color: 'var(--teal-700)',
      textDecoration: 'none'
    }
  }, 'Explore courses →'));
}
Object.assign(__ds_scope, { CourseFamilyCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/CourseFamilyCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/TeacherCard.jsx
try { (() => {
function TeacherCard({
  name,
  credential,
  institution,
  years,
  languages,
  quote,
  href = '#'
}) {
  const clean = (name || '').replace(/[\[\]]/g, '').trim();
  const initial = clean ? clean[0].toUpperCase() : '?';
  return React.createElement('div', {
    className: 'tz-card',
    style: {
      padding: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, React.createElement('div', {
    className: 'tz-avatar'
  }, initial), React.createElement('div', null, React.createElement('div', {
    style: {
      font: 'var(--text-h3)',
      fontSize: 20,
      color: 'var(--teal-900)'
    }
  }, name), React.createElement('div', {
    style: {
      font: 'var(--text-small)',
      color: 'var(--text-secondary)'
    }
  }, `${credential} · ${institution}`), React.createElement('div', {
    style: {
      font: 'var(--text-small)',
      color: 'var(--text-secondary)'
    }
  }, `${years} years teaching · Teaches in ${languages}`)), React.createElement('div', {
    className: 'tz-pullquote'
  }, `"${quote}"`), React.createElement('a', {
    href,
    style: {
      font: '700 15px var(--font-sans)',
      color: 'var(--teal-700)',
      textDecoration: 'none',
      marginTop: 'auto'
    }
  }, `Book a class with ${name} →`));
}
Object.assign(__ds_scope, { TeacherCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/TeacherCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/TestimonialCard.jsx
try { (() => {
function TestimonialCard({
  quote,
  name,
  city,
  country,
  course,
  date
}) {
  return React.createElement('figure', {
    className: 'tz-testimonial'
  }, React.createElement('blockquote', {
    className: 'tz-pullquote'
  }, `"${quote}"`), React.createElement('figcaption', {
    style: {
      font: '600 14px var(--font-sans)',
      color: 'var(--teal-800, var(--teal-900))'
    }
  }, `${name}, ${city}, ${country}`), React.createElement('div', {
    style: {
      font: 'var(--text-small)',
      color: 'var(--text-secondary)'
    }
  }, `${course} · ${date}`));
}
Object.assign(__ds_scope, { TestimonialCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/TestimonialCard.jsx", error: String((e && e.message) || e) }); }

// components/disclosure/FaqAccordion.jsx
try { (() => {
const { useState } = React;
function FaqAccordion({
  question,
  answer,
  defaultOpen = false
}) {
  const [open, setOpen] = useState(defaultOpen);
  return React.createElement('div', {
    className: 'tz-faq'
  }, React.createElement('button', {
    onClick: () => setOpen(!open),
    'aria-expanded': open,
    className: 'tz-faq-button'
  }, React.createElement('span', null, question), React.createElement('span', {
    className: 'tz-faq-toggle',
    'aria-hidden': 'true'
  }, open ? '−' : '+')), open ? React.createElement('div', {
    className: 'tz-faq-answer'
  }, answer) : null);
}
Object.assign(__ds_scope, { FaqAccordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/disclosure/FaqAccordion.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
function Badge({
  tone = 'accent',
  children
}) {
  const tones = {
    accent: { className: 'tz-badge tz-badge-accent' },
    teal: { className: 'tz-badge tz-badge-teal' },
    neutral: { className: 'tz-badge tz-badge-neutral' }
  };
  const { className } = tones[tone] || tones.accent;
  return React.createElement('span', {
    className
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/cards/PricingCard.jsx
try { (() => {
function PricingCard({
  plan,
  price,
  classes,
  description,
  popular = false
}) {
  return React.createElement('div', {
    className: popular ? 'tz-card tz-card-popular' : 'tz-card',
    style: {
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      height: '100%',
      position: 'relative'
    }
  }, 
  popular ? React.createElement('div', {
    style: {
      alignSelf: 'flex-start',
      background: 'linear-gradient(135deg, #F3D98B 0%, #C99B43 100%)',
      color: '#072C2A',
      font: '700 11px var(--font-sans)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      padding: '5px 14px',
      borderRadius: '999px',
      boxShadow: '0 4px 12px rgba(201, 155, 67, 0.3)',
      marginBottom: 4
    }
  }, '✨ Most Popular Choice') : null,
  
  React.createElement('div', null,
    React.createElement('div', {
      className: 'tz-card-eyebrow'
    }, plan),
    React.createElement('div', {
      className: 'tz-price'
    }, price, React.createElement('span', {
      style: {
        font: 'var(--text-small)',
        color: 'var(--text-secondary)',
        fontWeight: 'normal'
      }
    }, '/mo'))
  ),

  React.createElement('div', {
    style: {
      font: '600 13px var(--font-sans)',
      color: 'var(--teal-700)',
      background: popular ? 'rgba(201, 155, 67, 0.12)' : 'var(--teal-50)',
      border: popular ? '1px solid rgba(201, 155, 67, 0.25)' : '1px solid var(--teal-100)',
      padding: '6px 12px',
      borderRadius: 'var(--radius-pill)',
      display: 'inline-block',
      alignSelf: 'flex-start'
    }
  }, classes),

  React.createElement('div', {
    style: {
      font: 'var(--text-body)',
      color: 'var(--text-secondary)',
      lineHeight: '1.6',
      flex: 1
    }
  }, description),

  React.createElement('div', {
    style: {
      borderTop: '1px solid var(--border-hairline)',
      paddingTop: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      fontSize: '13px',
      color: 'var(--ink-700)',
      fontFamily: 'var(--font-sans)'
    }
  }, 
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
      React.createElement('span', { style: { color: 'var(--teal-500)', fontWeight: 'bold' } }, '✓'),
      '30-Min 1-on-1 Live Class'
    ),
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
      React.createElement('span', { style: { color: 'var(--teal-500)', fontWeight: 'bold' } }, '✓'),
      'Choice of Sanad Teacher'
    ),
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 8 } },
      React.createElement('span', { style: { color: 'var(--teal-500)', fontWeight: 'bold' } }, '✓'),
      'Monthly Written Audit'
    )
  ),

  React.createElement(__ds_scope.Button, {
    variant: popular ? 'primary' : 'secondary',
    style: {
      marginTop: 'auto',
      width: '100%',
      background: popular ? 'linear-gradient(135deg, #DFB756, #C99B43)' : undefined,
      color: popular ? '#072C2A' : undefined,
      border: popular ? 'none' : undefined,
      boxShadow: popular ? '0 4px 14px rgba(201, 155, 67, 0.3)' : undefined
    }
  }, 'Book a Free Class →')
);
}
Object.assign(__ds_scope, { PricingCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/PricingCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/CtaBlock.jsx
try { (() => {
function CtaBlock({
  heading = 'Meet the teacher before your child does',
  body = 'Book a free 30-minute class with the teacher of your choice. Watch how they teach. Then decide.',
  microcopy = 'No card needed. No obligation. We will never charge you for a trial class.'
}) {
  return React.createElement('div', {
    className: 'tz-cta',
    style: {
      background: 'var(--teal-900)',
      borderRadius: 'var(--radius-lg)',
      padding: '56px 40px',
      textAlign: 'center',
      color: 'var(--cream-50)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 16
    }
  }, React.createElement('div', {
    className: 'tz-cta-eyebrow'
  }, 'A free class first'), React.createElement('div', {
    style: {
      font: 'var(--text-h2)',
      color: 'var(--cream-50)',
      maxWidth: 560
    }
  }, heading), React.createElement('div', {
    style: {
      font: 'var(--text-body-lg)',
      color: 'var(--teal-100)',
      maxWidth: 520
    }
  }, body), React.createElement('div', {
    className: 'tz-cta-buttons',
    style: {
      marginTop: 8
    }
  }, React.createElement(__ds_scope.Button, {
    variant: 'primary',
    size: 'lg',
    className: 'tz-btn-on-dark'
  }, 'Book a Free Class'), React.createElement(__ds_scope.Button, {
    variant: 'whatsapp',
    size: 'lg'
  }, 'Chat on WhatsApp')), React.createElement('div', {
    className: 'tz-cta-micro'
  }, microcopy));
}
Object.assign(__ds_scope, { CtaBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/CtaBlock.jsx", error: String((e && e.message) || e) }); }

// components/marketing/TrustStrip.jsx
try { (() => {
function TrustStrip({
  items = ['One-to-one only — never group classes', 'Female and male teachers available', 'Taught in English, Arabic and Urdu', 'Free first class · No card required']
}) {
  return React.createElement('div', {
    className: 'tz-trust-strip-wrap'
  }, React.createElement('div', {
    className: 'tz-trust-strip'
  }, items.map(t => React.createElement('div', {
    key: t,
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      font: '600 14px/1.4 var(--font-sans)',
      color: 'var(--teal-900)'
    }
  }, React.createElement('span', {
    className: 'tz-check',
    'aria-hidden': 'true'
  }, '✓'), React.createElement('span', null, t)))));
}
Object.assign(__ds_scope, { TrustStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/TrustStrip.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
const cols = [{
  h: 'Tazkirah Online Education',
  body: 'One-to-one Quran, Tajweed, Hifz, Arabic and Islamic Studies for children and adults.\n\nNurturing Faith, Empowering Futures.'
}, {
  h: 'Courses',
  links: [['Basic Qaida', 'courses.html'], ['Quran Recitation', 'courses.html'], ['Tajweed Ul Quran', 'courses.html'], ['Hifz Programme', 'courses.html'], ['Arabic for Beginners', 'courses.html'], ['Islamic Studies', 'courses.html'], ['View all courses', 'courses.html']]
}, {
  h: 'About',
  links: [['About Us', 'about.html'], ['Our Teachers', 'teachers.html'], ['How We Teach', '#'], ['Safeguarding & Trust', '#'], ['Parent Stories', '#'], ['FAQ', 'faq.html']]
}, {
  h: 'Contact',
  links: [['info@tazkirahonline.com', 'mailto:info@tazkirahonline.com'], ['+1 707 4154469 · +44 784 9367442', '#'], ['USA · UK · Pakistan', '#']]
}];
function Footer() {
  return React.createElement('footer', {
    className: 'tz-footer'
  }, React.createElement('div', {
    className: 'tz-footer-grid'
  }, cols.map(c => React.createElement('div', {
    key: c.h
  }, React.createElement('div', {
    className: 'tz-footer-h'
  }, c.h), c.body ? React.createElement('div', {
    className: 'tz-footer-body'
  }, c.body) : React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, c.links.map(([label, href]) => React.createElement('a', {
    key: label,
    href,
    className: 'tz-footer-link'
  }, label)))))), React.createElement('div', {
    className: 'tz-footer-bottom'
  }, '© 2026 Tazkirah Online Education'));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Nav.jsx
try { (() => {
const hrefFor = {
  Courses: 'courses.html',
  'Our Teachers': 'teachers.html',
  Pricing: 'pricing.html',
  About: 'about.html',
  Blog: '#',
  Contact: '#'
};
function Nav({
  links = ['Courses', 'Our Teachers', 'Pricing', 'About', 'Blog', 'Contact'],
  active
}) {
  const linkStyle = isActive => ({
    font: '600 15px var(--font-sans)',
    color: isActive ? 'var(--teal-700)' : 'var(--text-primary)',
    textDecoration: 'none'
  });
  return React.createElement('div', null, React.createElement('div', {
    className: 'tz-utility'
  }, React.createElement('span', null, 'UK +44 784 9367442'), React.createElement('span', null, 'USA +1 707 4154469'), React.createElement('span', null, 'WhatsApp us')), React.createElement('div', {
    className: 'tz-navbar'
  }, React.createElement('div', {
    className: 'tz-navbar-inner'
  }, React.createElement('a', {
    className: 'tz-wordmark',
    href: 'index.html'
  }, 'Tazkirah'), React.createElement('nav', {
    style: {
      display: 'flex',
      gap: 28
    }
  }, links.map(l => React.createElement('a', {
    key: l,
    style: linkStyle(l === active),
    href: hrefFor[l] || '#'
  }, l))), React.createElement('a', {
    href: '#',
    className: 'tz-btn tz-btn-primary'
  }, 'Book a Free Class'))));
}
Object.assign(__ds_scope, { Nav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Nav.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.CourseFamilyCard = __ds_scope.CourseFamilyCard;

__ds_ns.PricingCard = __ds_scope.PricingCard;

__ds_ns.TeacherCard = __ds_scope.TeacherCard;

__ds_ns.TestimonialCard = __ds_scope.TestimonialCard;

__ds_ns.FaqAccordion = __ds_scope.FaqAccordion;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.CtaBlock = __ds_scope.CtaBlock;

__ds_ns.TrustStrip = __ds_scope.TrustStrip;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Nav = __ds_scope.Nav;

})();
