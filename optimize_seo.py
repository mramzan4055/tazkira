import os
import re
import json
import glob
from datetime import datetime

BASE_DIR = r"d:\tazkira v2"
DOMAIN = "https://tazkirahonline.com"

ORG_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://tazkirahonline.com/#organization",
    "name": "Tazkirah Online Education",
    "url": "https://tazkirahonline.com",
    "logo": "https://tazkirahonline.com/assets/hero-bg.webp",
    "description": "Premier online Quran & Arabic academy offering 1-on-1 live classes with certified Sanad teachers for kids and adults globally.",
    "sameAs": [
        "https://facebook.com/tazkirahonline",
        "https://instagram.com/tazkirahonline",
        "https://twitter.com/tazkirahonline"
    ],
    "priceRange": "$$",
    "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": ["English", "Arabic"]
    }
}

COURSE_DATA = {
    "course-basic-qaida": {
        "name": "Basic Qaida Course",
        "desc": "Learn Arabic letters, pronunciation, and fundamental Quran reading rules from scratch for beginners and children."
    },
    "course-tajweed": {
        "name": "Tajweed Ul Quran Course",
        "desc": "Master correct Quranic pronunciation, phonetics, rules of Noon Sakinah, Meem Sakinah, and Madd with certified teachers."
    },
    "course-quran-recitation": {
        "name": "Quran Recitation Course",
        "desc": "Fluency and rhythm training for Quranic recitation with proper Tarteel and Tajweed application."
    },
    "course-hifz": {
        "name": "Hifz Quran Memorization Programme",
        "desc": "Structured Quran memorization with daily revision systems, retention strategies, and 1-on-1 guidance."
    },
    "course-understand-quran": {
        "name": "Understand Quran (Tafseer & Vocabulary)",
        "desc": "Learn direct word-for-word translation, Quranic vocabulary, and concise Tafseer of key Surahs."
    },
    "course-arabic-for-beginners": {
        "name": "Arabic Language for Beginners",
        "desc": "Foundational Modern Standard Arabic (MSA) covering alphabet, basic greetings, vocabulary, and sentence structures."
    },
    "course-intermediate-arabic": {
        "name": "Intermediate Arabic Grammar (Nahw & Sarf)",
        "desc": "Intermediate Arabic grammar focusing on sentence parsing (I'rab), verb forms, and comprehension."
    },
    "course-advanced-arabic": {
        "name": "Advanced Arabic Language & Rhetorical Mastery",
        "desc": "Advanced Arabic literature, classical grammar, Balagha (rhetoric), and complex text analysis."
    },
    "course-islamic-studies": {
        "name": "Islamic Studies for Kids & Adults",
        "desc": "Comprehensive Islamic knowledge covering Seerah, Aqeedah, Fiqh of worship, and Islamic manners."
    },
    "course-new-muslims": {
        "name": "Islamic Studies for New Muslims",
        "desc": "Welcoming foundational course covering prayer (Salah), purification (Taharah), essential Aqeedah, and basic Quran."
    },
    "course-basic-islamic-studies": {
        "name": "Basic Islamic Studies Course",
        "desc": "Essential Islamic education for children and beginners covering pillars of Islam, Iman, and daily manners."
    },
    "course-five-pillars": {
        "name": "The 5 Pillars of Islam Course",
        "desc": "In-depth study of Shahada, Salah, Zakat, Sawm, and Hajj with practical application for daily life."
    },
    "course-daily-duas": {
        "name": "Daily Duas & Supplications Course",
        "desc": "Learn authentic daily prophetic supplications, morning and evening Adhkar, and prayer recitations."
    }
}

FAQ_DATA = [
    {
        "question": "How do the 1-on-1 free trial classes work?",
        "answer": "You choose your preferred course and time slot. We pair you or your child with a certified Sanad teacher for a 30-minute interactive live trial class with zero obligation."
    },
    {
        "question": "Can I choose between male and female teachers?",
        "answer": "Yes! We have qualified male and female teachers with Ijazah certified background available for all courses."
    },
    {
        "question": "What age groups do you teach?",
        "answer": "We teach students of all ages starting from 4 years old up to adults of any age."
    },
    {
        "question": "What if I need to reschedule a class?",
        "answer": "You can easily reschedule classes with 4 hours advance notice through our student portal or direct messaging."
    }
]

def generate_breadcrumb_schema(filename, title):
    name = title.split("|")[0].strip() if "|" in title else title.strip()
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": f"{DOMAIN}/"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": name,
                "item": f"{DOMAIN}/{filename}"
            }
        ]
    }

def process_file(filepath):
    filename = os.path.basename(filepath)
    if filename in ["mail-config.php", "process-contact.php", "process-free-class.php"]:
        return

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    canonical_url = f"{DOMAIN}/{filename.replace('.dc.html', '.html')}"
    
    # Extract Title
    title_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE)
    title = title_match.group(1).strip() if title_match else "Online Quran & Arabic Classes | Tazkirah"

    # Extract Meta Description
    desc_match = re.search(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']', content, re.IGNORECASE)
    desc = desc_match.group(1).strip() if desc_match else "Learn Quran, Tajweed, and Arabic online with certified Sanad teachers. 1-on-1 live classes for kids & adults."

    # Build Head Metadata Inserts
    meta_tags = []

    # Canonical
    if '<link rel="canonical"' not in content:
        meta_tags.append(f'<link rel="canonical" href="{canonical_url}">')

    # Open Graph
    if 'og:title' not in content:
        meta_tags.append(f'<meta property="og:title" content="{title}">')
    if 'og:description' not in content:
        meta_tags.append(f'<meta property="og:description" content="{desc}">')
    if 'og:url' not in content:
        meta_tags.append(f'<meta property="og:url" content="{canonical_url}">')
    if 'og:type' not in content:
        meta_tags.append('<meta property="og:type" content="website">')
    if 'og:site_name' not in content:
        meta_tags.append('<meta property="og:site_name" content="Tazkirah Online Education">')
    if 'og:image' not in content:
        meta_tags.append(f'<meta property="og:image" content="{DOMAIN}/assets/hero-bg.webp">')

    # Twitter Card
    if 'twitter:card' not in content:
        meta_tags.append('<meta name="twitter:card" content="summary_large_image">')
    if 'twitter:title' not in content:
        meta_tags.append(f'<meta name="twitter:title" content="{title}">')
    if 'twitter:description' not in content:
        meta_tags.append(f'<meta name="twitter:description" content="{desc}">')
    if 'twitter:image' not in content:
        meta_tags.append(f'<meta name="twitter:image" content="{DOMAIN}/assets/hero-bg.webp">')

    # JSON-LD Schemas
    schemas = [ORG_SCHEMA]

    # Breadcrumb Schema (for non-homepage)
    if filename not in ["index.html", "index.dc.html"]:
        schemas.append(generate_breadcrumb_schema(filename.replace(".dc.html", ".html"), title))

    # Course Schema
    base_name = filename.replace(".dc.html", "").replace(".html", "")
    if base_name in COURSE_DATA:
        cinfo = COURSE_DATA[base_name]
        schemas.append({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": cinfo["name"],
            "description": cinfo["desc"],
            "provider": {
                "@type": "EducationalOrganization",
                "name": "Tazkirah Online Education",
                "sameAs": DOMAIN
            },
            "educationalCredentialAwarded": "Certificate of Completion",
            "hasCourseInstance": {
                "@type": "CourseInstance",
                "courseMode": "Online 1-on-1 Live",
                "courseWorkload": "PT30M"
            }
        })

    # FAQ Schema
    if base_name in ["faqs", "pricing", "courses", "contact", "free-class"]:
        schemas.append({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": item["question"],
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": item["answer"]
                    }
                } for item in FAQ_DATA
            ]
        })

    schema_scripts = []
    for schema in schemas:
        schema_scripts.append(f'<script type="application/ld+json">\n{json.dumps(schema, indent=2)}\n</script>')

    # Inject into content if head present
    insertion_block = "\n  " + "\n  ".join(meta_tags) + "\n  " + "\n  ".join(schema_scripts) + "\n"

    # Only inject if schema is not already present
    if "application/ld+json" not in content:
        if "</head>" in content:
            content = content.replace("</head>", f"{insertion_block}</head>")
        elif "</helmet>" in content:
            content = content.replace("</helmet>", f"{insertion_block}</helmet>")

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"Processed SEO for {filename}")

def update_sitemap():
    html_files = sorted(glob.glob(os.path.join(BASE_DIR, "*.html")))
    today = datetime.now().strftime("%Y-%m-%d")

    urls = []
    for fpath in html_files:
        fname = os.path.basename(fpath)
        if fname.endswith(".dc.html") or fname in ["NavBar.html", "SiteFooter.html", "CourseTemplate.html"]:
            continue
        
        loc = f"{DOMAIN}/" if fname == "index.html" else f"{DOMAIN}/{fname}"
        
        if fname == "index.html":
            priority = "1.0"
            freq = "daily"
        elif fname in ["courses.html", "pricing.html", "free-class.html"]:
            priority = "0.9"
            freq = "weekly"
        elif fname.startswith("course-"):
            priority = "0.8"
            freq = "weekly"
        elif fname.startswith("online-quran-classes-"):
            priority = "0.85"
            freq = "weekly"
        else:
            priority = "0.7"
            freq = "monthly"

        urls.append(f"""  <url>
    <loc>{loc}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>{freq}</changefreq>
    <priority>{priority}</priority>
  </url>""")

    sitemap_content = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "\n".join(urls) + '\n</urlset>'
    
    sitemap_path = os.path.join(BASE_DIR, "sitemap.xml")
    with open(sitemap_path, "w", encoding="utf-8") as f:
        f.write(sitemap_content)
    
    print("Sitemap.xml updated successfully!")

if __name__ == "__main__":
    files = glob.glob(os.path.join(BASE_DIR, "*.html"))
    for f in files:
        process_file(f)
    update_sitemap()
