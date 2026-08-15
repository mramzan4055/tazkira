import os

DS_DIR = r"d:\tazkira v2\_ds\tazkirah-design-system-bcbab7c6-6e80-4073-a41d-d66b93b5f566"

def read_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def main():
    fonts_css = read_file(os.path.join(DS_DIR, "tokens", "fonts.css"))
    # Remove @import from fonts.css
    fonts_css = "\n".join([line for line in fonts_css.splitlines() if not line.strip().startswith("@import")])
    
    colors_css = read_file(os.path.join(DS_DIR, "tokens", "colors.css"))
    typography_css = read_file(os.path.join(DS_DIR, "tokens", "typography.css"))
    spacing_css = read_file(os.path.join(DS_DIR, "tokens", "spacing.css"))
    styles_css = read_file(os.path.join(DS_DIR, "styles.css"))
    
    # Remove @import lines from top of styles.css
    styles_body = "\n".join([line for line in styles_css.splitlines() if not line.strip().startswith("@import")])
    
    bundled = "\n\n".join([
        "/* Tazkirah Consolidated CSS Bundle */",
        "/* Tokens: Fonts */\n" + fonts_css,
        "/* Tokens: Colors */\n" + colors_css,
        "/* Tokens: Typography */\n" + typography_css,
        "/* Tokens: Spacing */\n" + spacing_css,
        "/* Main Styles */\n" + styles_body
    ])
    
    target_path = os.path.join(DS_DIR, "styles.css")
    with open(target_path, "w", encoding="utf-8") as f:
        f.write(bundled)
        
    print(f"Successfully consolidated styles.css! Total size: {len(bundled)} bytes.")

if __name__ == "__main__":
    main()
