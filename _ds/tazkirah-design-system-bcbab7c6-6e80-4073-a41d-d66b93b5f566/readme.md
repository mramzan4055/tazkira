# Tazkirah Online Education — Design System

Tazkirah Online Education (tazkirahonline.com) is a one-to-one online Quran, Tajweed, Hifz, Arabic and Islamic Studies academy for children and adults, serving families across the USA, UK, Canada and 120+ countries with English/Arabic/Urdu-speaking teachers.

## Sources
- Live site: https://tazkirahonline.com/ (current WordPress/Elementor build — scraped for structure, nav, course list, footer)
- `uploads/Tazkirah_Website_Copy_Deck_v1.0.pdf` — the approved rebuild copy deck (76 pages, prepared by Ideatech, Aug 2026). This is the primary source for this design system: house style, page-by-page copy, module structure, and explicit design/content rules.
- `uploads/copy-deck.txt` — full extracted text of the above, kept for reference/search.
- Three other files referenced by the user (`Tazkirah_30Day_Growth_Proposal_v1.0.pdf`, `Tazkirah_SEO_GEO_AEO_Strategy_v1.0.docx`, `Tazkirah_Website_Copy_Deck_v1.0.docx`) were **not** available in `uploads/` and were not read. If they contain visual or brand direction, re-attach and ask for a refresh.
- No Figma file or codebase was attached — this system is built from the copy deck + live site content only, no source code was recreated.

## Content fundamentals
- **British English throughout** — "realise", "programme", "organisation", "colour". Never American spellings.
- **Second person, direct address** — "your child", "you", "we". Never "students may" or "parents are advised".
- **Sentences under 20 words** wherever meaning allows. Short, plain, declarative.
- **No superlatives** — no "best", "leading", "world-class", "#1", "premier".
- **No outcome guarantees** — never state how quickly a child will learn.
- **Evidentiary rule**: no sentence is published that Tazkirah cannot evidence on request. Where a persuasive claim would be unprovable, a truthful, more modest alternative is used instead — e.g. replacing "thousands of learners worldwide trust us" (unprovable) with an honest statement about collecting parent stories properly.
- **Islamic terms used correctly and glossed on first use** for beginners: Tajweed, Qaida, Hifz, Ijazah, Tarteel, Qira'at, Muraja'ah.
- **Currency**: shown as `$45` with GBP equivalent alongside where space allows.
- **No emoji.** Tone is warm but restrained — trust and transparency over hype. Example line: "Meet the teacher before your child does."
- **Vibe**: calm, transparent, parent-reassuring. The brand's core differentiator is naming and showing the actual teacher before booking — copy constantly reinforces "you meet the teacher first."

## Visual foundations (v2 — quiet luxury, applied to the global layer only)
- **Colour**: deep teal (`--teal-900` / `--teal-700`) as the primary brand colour, paired with warm cream (`--cream-50/100/200`) surfaces — directly specified in the copy deck ("cream block, teal bar"). Gold (`--gold-300/400/500/600`) is a **restrained accent** — hairlines, small numerals, eyebrows and the single "most families choose this" marker. It is never a dominant fill. Teal/cream hex values are unchanged from v1 (brand identity preserved).
- **Type**: serif for all headings (display/H1–H4), sans for body and UI text. Lora/Karla are now loaded **self-hosted via the fontsource CDN** (jsDelivr) for consistency; Arabic/Urdu text falls back through `--font-arabic` (Amiri → Noto Naskh).
- **Backgrounds**: flat colour fields only (cream page, white cards, dark-teal band sections) — no gradients, no textures, no illustration patterns. One full-bleed photographic hero per the copy deck's LCP rule.
- **Cards**: white or cream surface, `--radius-lg` (16px), hairline border (`--border-hairline`, 1px teal @ 10%), quiet shadow (`--shadow-sm`). No coloured left borders on cards (TestimonialCard keeps its teal rule only as a legacy quotation accent). Pricing's highlighted plan gets a 1px teal border + tinted background, no shadow bump.
- **Buttons**: full pill radius, no gradients. Primary = solid teal, hover = darker teal. Secondary = teal outline, hover = light teal tint. **Hover is pure CSS** (no JS-injected styles), and there is no scale/shrink press state — colour changes only.
- **Forms**: one quiet treatment — card surface, `--radius-md`, strong border, teal focus ring (`--shadow-focus`), visible focus-visible outlines everywhere.
- **Radii**: 6 / 10 / 16 / 24 / full-pill — restrained; large radius only where content warrants it.
- **Shadows**: quiet and warm-tinted; cards lean on borders over elevation.
- **Motion**: one duration (`--transition-fast` 150ms / `--transition-base` 200ms), colour-transition hovers only. **`prefers-reduced-motion` is honoured globally**.
- **Icons**: unicode ✓ / – / → / + / − only (per the copy deck — no emoji, no icon font). Sized via `.tz-icon-sm/md/lg`.
- **Layout**: single max-width container (1160px), generous vertical rhythm (64–96px between sections), utility bar + primary nav as the only fixed/sticky chrome.
- **Transparency/blur**: not used anywhere in source material — omit.

## Iconography
- No icon font, SVG icon set or icon library exists in any source material.
- The copy deck's own convention uses a **unicode checkmark (✓)** as the only "icon" in body copy (trust-strip items). This system follows that literally rather than substituting a drawn icon set — see `guidelines/iconography.html`.
- No emoji anywhere.
- **No logo file could be retrieved.** The live site does use a wordmark logo, but it could not be fetched through available tools. Per design-system policy, no logo was drawn or approximated — the wordmark is rendered as plain type ("Tazkirah" in the heading serif) everywhere a mark would go. **Ask**: please export/attach the real logo files (SVG/PNG) so they can replace the type-only placeholder.
- **Fonts**: no webfont files were supplied. Substituted with the nearest Google Fonts pairing — **Lora** (serif, headings) and **Karla** (sans, body/UI) — loaded via `tokens/fonts.css`. Flagging this substitution: if Tazkirah has defined brand fonts, please share the files/names and this will be swapped in.

## Intentional additions
- **Gold accent colour** (`--gold-500/600`): not specified anywhere in source material. Added for a single sparing use case — the "most families choose this" pricing badge — because the deck calls for that plan to be visually distinguished and pure teal-on-teal doesn't achieve it. Flag for confirmation.
- **Badge component**: not defined by any source; added only to carry the gold pricing highlight and a couple of small status labels.

## Index
- `styles.css` — root stylesheet, imports everything below.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `fonts.css`.
- `guidelines/` — foundation specimen cards: colours (teal, cream/neutral, semantic+accent), type (headings, body), spacing scale, radii/shadow, wordmark, iconography.
- `components/` — reusable primitives, grouped:
  - `buttons/Button` — primary, secondary, ghost, whatsapp variants
  - `feedback/Badge` — accent, teal, neutral
  - `navigation/Nav`, `navigation/Footer`
  - `cards/CourseFamilyCard`, `cards/TeacherCard`, `cards/PricingCard`, `cards/TestimonialCard`
  - `marketing/TrustStrip`, `marketing/CtaBlock`
  - `disclosure/FaqAccordion`
- `ui_kits/website/` — `index.html` + `Home.jsx`: full homepage recreation built from the copy deck's nine homepage modules (hero, trust strip, meet-a-teacher, how-a-class-works, four-reasons, parent-stories, course-families, pricing-preview, CTA) plus nav/footer.
- `SKILL.md` — Claude Code-compatible skill wrapper for this design system.

## Caveats & ask
- Only the **homepage** was built as a UI kit screen — the copy deck specifies ~20 more page types (course pages ×14, pricing, teachers roster, about, safeguarding, blog, FAQ, book-a-class flow). Happy to build any of these next.
- Colours, in particular the exact teal/cream hex values and the gold accent, are my best interpretation of "teal and cream" — not confirmed brand values. **Please share real brand colour codes and the logo file if they exist**, and I'll swap them in everywhere in one pass.
- Fonts are a Google Fonts substitution (Lora/Karla), not confirmed brand fonts.
- The three other referenced upload files (growth proposal, SEO strategy, docx copy deck) were never actually present in `uploads/` — only the PDF copy deck came through. If they carry design-relevant material, re-attach them.
