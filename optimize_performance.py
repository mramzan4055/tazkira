import os
import glob
import re
from PIL import Image

SITE_DIR = r"d:\tazkira v2"

GOOGLE_FONTS_LINK = (
    '    <link rel="preconnect" href="https://fonts.googleapis.com" />\n'
    '    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />\n'
    '    <link rel="preconnect" href="https://unpkg.com" crossorigin />\n'
    '    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Lora:ital,wght@0,500;0,600;0,700;1,600&display=swap" />'
)

SINGLE_DS_CSS = '<link rel="stylesheet" href="_ds/tazkirah-design-system-bcbab7c6-6e80-4073-a41d-d66b93b5f566/styles.css">'

def get_image_dimensions(src, base_dir):
    clean_src = src.split('?')[0].split('#')[0]
    if clean_src.startswith('./'):
        clean_src = clean_src[2:]
    if clean_src.startswith('/'):
        clean_src = clean_src[1:]
        
    filepath = os.path.join(base_dir, clean_src.replace('/', os.sep))
    if os.path.exists(filepath):
        try:
            with Image.open(filepath) as img:
                return img.size
        except Exception:
            pass
    return None, None

def optimize_html(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    original = content

    # 1. Update <head> fonts & preconnects
    if "fonts.googleapis.com" in content:
        # Replace existing google fonts links / preconnects with clean unified block if in head
        content = re.sub(
            r'(\s*<link rel="preconnect"[^>]+>\s*)*<link rel="preconnect" href="https://fonts.googleapis.com"[^>]*>(\s*<link rel="preconnect"[^>]+>)*',
            f'\n{GOOGLE_FONTS_LINK}\n',
            content
        )
        if "family=Karla" not in content and "</head>" in content:
            content = content.replace("</head>", f"{GOOGLE_FONTS_LINK}\n  </head>", 1)
    elif "</head>" in content:
        content = content.replace("</head>", f"{GOOGLE_FONTS_LINK}\n  </head>", 1)

    # 2. Consolidate 5 token/style links inside <helmet> or <head> into single styles.css
    ds_block_pattern = r'<link rel="stylesheet" href="_ds/[^"]+/tokens/fonts\.css">\s*<link rel="stylesheet" href="_ds/[^"]+/tokens/colors\.css">\s*<link rel="stylesheet" href="_ds/[^"]+/tokens/typography\.css">\s*<link rel="stylesheet" href="_ds/[^"]+/tokens/spacing\.css">\s*<link rel="stylesheet" href="_ds/[^"]+/styles\.css">'
    content = re.sub(ds_block_pattern, SINGLE_DS_CSS, content)

    # 3. Defer JS scripts
    script_patterns = [
        (r'<script src="(\./)?support\.js"(?! defer)></script>', r'<script src="./support.js" defer></script>'),
        (r'<script src="(_ds/[^"]+/_ds_bundle\.js)"(?! defer)></script>', r'<script src="\1" defer></script>'),
        (r'<script src="(\./)?section-transitions\.js"(?! defer)></script>', r'<script src="./section-transitions.js" defer></script>'),
        (r'<script src="(\./)?homepage-transitions\.js"(?! defer)></script>', r'<script src="./homepage-transitions.js" defer></script>'),
        (r'<script src="(\./)?homepage-content-transitions\.js"(?! defer)></script>', r'<script src="./homepage-content-transitions.js" defer></script>'),
    ]

    for pattern, replacement in script_patterns:
        content = re.sub(pattern, replacement, content)

    # 4. Process YouTube iframes
    def fix_iframe(match):
        iframe_tag = match.group(0)
        if 'loading=' not in iframe_tag:
            iframe_tag = iframe_tag.replace('<iframe ', '<iframe loading="lazy" ')
        return iframe_tag

    content = re.sub(r'<iframe\b[^>]*>', fix_iframe, content)

    # 5. Process img elements
    hero_images = {
        'home-hero.webp', 'about-hero.webp', 'free-trial-hero.webp',
        'team-hero.webp', 'tazkirah-logo.webp', 'tazkirah-mark.png'
    }

    file_dir = os.path.dirname(filepath)

    def fix_img(match):
        img_tag = match.group(0)
        src_match = re.search(r'src="([^"]+)"', img_tag)
        
        is_hero = False
        if src_match:
            src = src_match.group(1)
            is_hero = any(hero in src.lower() for hero in hero_images)
            
            if 'width=' not in img_tag or 'height=' not in img_tag:
                w, h = get_image_dimensions(src, file_dir)
                if w and h:
                    img_tag = img_tag.replace('<img ', f'<img width="{w}" height="{h}" ')

        if is_hero:
            if 'fetchpriority=' not in img_tag:
                img_tag = img_tag.replace('<img ', '<img fetchpriority="high" ')
            if 'decoding=' not in img_tag:
                img_tag = img_tag.replace('<img ', '<img decoding="async" ')
        else:
            if 'loading=' not in img_tag:
                img_tag = img_tag.replace('<img ', '<img loading="lazy" ')
            if 'decoding=' not in img_tag:
                img_tag = img_tag.replace('<img ', '<img decoding="async" ')

        return img_tag

    content = re.sub(r'<img\b[^>]*>', fix_img, content)

    if content != original:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        return True
    return False

def main():
    print("=== Optimizing Tazkirah HTML and DC.HTML files for peak Lighthouse score ===", flush=True)
    html_files = glob.glob(os.path.join(SITE_DIR, "*.html")) + glob.glob(os.path.join(SITE_DIR, "*.dc.html"))

    updated_count = 0
    for file in html_files:
        if optimize_html(file):
            print(f"  [Optimized] {os.path.basename(file)}", flush=True)
            updated_count += 1
        else:
            print(f"  [Unchanged] {os.path.basename(file)}", flush=True)

    print(f"\nDone! Optimized {updated_count} files.", flush=True)

if __name__ == "__main__":
    main()
