import os
import glob
from PIL import Image

ASSETS_DIR = r"d:\tazkira v2\assets"

def optimize_image(filepath):
    filename = os.path.basename(filepath)
    ext = os.path.splitext(filename)[1].lower()
    
    original_size = os.path.getsize(filepath)
    
    with Image.open(filepath) as img:
        width, height = img.size
        
        if "hero" in filename.lower() or "home" in filename.lower():
            max_width = 1000
        elif "mark" in filename.lower() or "logo" in filename.lower():
            max_width = 120
        else:
            max_width = 750
            
        new_w, new_h = width, height
        if width > max_width:
            new_w = max_width
            new_h = int(height * (max_width / width))
            img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
            
        if ext == ".webp":
            img.save(filepath, "WEBP", quality=80, method=4)
        elif ext == ".png":
            img.save(filepath, "PNG", optimize=True)
            
    new_size = os.path.getsize(filepath)
    savings = original_size - new_size
    print(f"[{filename}] {width}x{height} -> {new_w}x{new_h} | {original_size//1024}KB -> {new_size//1024}KB (Saved {savings//1024}KB)", flush=True)
    return savings

def main():
    print("=== Optimizing Assets Images ===", flush=True)
    total_saved = 0
    for file in glob.glob(os.path.join(ASSETS_DIR, "*.*")):
        ext = os.path.splitext(file)[1].lower()
        if ext in [".webp", ".png", ".jpg", ".jpeg"]:
            try:
                saved = optimize_image(file)
                total_saved += saved
            except Exception as e:
                print(f"Error optimizing {file}: {e}", flush=True)
                
    print(f"\nTotal Saved: {total_saved // 1024} KB ({total_saved / (1024*1024):.2f} MB)", flush=True)

if __name__ == "__main__":
    main()
