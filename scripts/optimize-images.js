// Modern image optimizer using native `sharp`
// Usage: npm run optimize-images
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const tasks = [
  {
    file: path.join(root, "public", "images", "ont_img.jpg"),
    backup: path.join(root, "public", "images", "backup_originals", "ont_img.jpg"),
    maxWidth: 1920,
    quality: 82,
  },
  {
    file: path.join(root, "public", "images", "ont_img2.jpg"),
    backup: path.join(root, "public", "images", "backup_originals", "ont_img2.jpg"),
    maxWidth: 1920,
    quality: 82,
  },
  {
    file: path.join(root, "public", "images", "ont_img3.jpg"),
    backup: path.join(root, "public", "images", "backup_originals", "ont_img3.jpg"),
    maxWidth: 1920,
    quality: 82,
  },
  {
    file: path.join(root, "public", "images", "paali.jpg"),
    backup: path.join(root, "public", "images", "backup_originals", "paali.jpg"),
    maxWidth: 500,
    quality: 82,
  },
  {
    file: path.join(root, "public", "about_preview", "Below Hero section.png"),
    backup: path.join(root, "public", "about_preview", "backup_originals", "Below Hero section.png"),
    maxWidth: 1200,
    isPng: true,
  },
];

async function main() {
  console.log("Starting image optimization with sharp...");
  for (const t of tasks) {
    if (!fs.existsSync(t.file) && !fs.existsSync(t.backup)) continue;

    const backupDir = path.dirname(t.backup);
    if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

    if (!fs.existsSync(t.backup)) {
      fs.copyFileSync(t.file, t.backup);
      console.log(`Backed up original to ${t.backup}`);
    }

    const source = t.backup;
    const initialSize = fs.statSync(source).size;
    const tempOut = t.file + ".tmp";

    let pipeline = sharp(source).resize({
      width: t.maxWidth,
      withoutEnlargement: true,
    });

    if (t.isPng) {
      pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
    } else {
      pipeline = pipeline.jpeg({ quality: t.quality, mozjpeg: true });
    }

    await pipeline.toFile(tempOut);
    fs.renameSync(tempOut, t.file);

    const finalSize = fs.statSync(t.file).size;
    console.log(
      `${path.basename(t.file)}: ${(initialSize / 1024).toFixed(0)} KB -> ${(finalSize / 1024).toFixed(0)} KB (-${(((initialSize - finalSize) / initialSize) * 100).toFixed(1)}%)`
    );
  }
  console.log("Optimization complete!");
}

main().catch(console.error);

