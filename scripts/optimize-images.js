// Simple image optimizer using existing `jimp` dependency.
// Usage: `node scripts/optimize-images.js`
// The script writes optimized copies to `public/images/optimized/...` preserving directory structure.
const fs = require("fs");
const path = require("path");
let Jimp;

const inputDir = path.join(__dirname, "..", "public", "images");
const outputDir = path.join(inputDir, "optimized");

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  list.forEach((dirent) => {
    const full = path.join(dir, dirent.name);
    if (dirent.isDirectory()) {
      results = results.concat(getFiles(full));
    } else {
      results.push(full);
    }
  });
  return results;
}

async function processFile(filePath) {
  try {
    const rel = path.relative(inputDir, filePath);
    const destPath = path.join(outputDir, rel);
    await fs.promises.mkdir(path.dirname(destPath), { recursive: true });

    const image = await Jimp.read(filePath);
    const maxWidth = 1920;
    if (image.getWidth() > maxWidth) {
      image.resize(maxWidth, Jimp.AUTO);
    }

    const ext = path.extname(filePath).toLowerCase();
    if (ext === ".jpg" || ext === ".jpeg") {
      await image.quality(78).writeAsync(destPath);
    } else if (ext === ".png") {
      // For PNGs we write as-is after resize; advanced PNG compression requires other tools.
      await image.writeAsync(destPath);
    } else {
      // skip other file types
      return;
    }

    console.log(
      "Optimized:",
      rel,
      "->",
      path.relative(process.cwd(), destPath),
    );
  } catch (err) {
    console.error("Failed to process", filePath, err);
  }
}

(async () => {
  // dynamic import to handle ESM/CJS differences in the `jimp` package
  try {
    const JimpModule = await import("jimp");
    Jimp = JimpModule && (JimpModule.Jimp || JimpModule.default || JimpModule);
  } catch (err) {
    console.error("Failed to import jimp:", err);
    process.exit(1);
  }

  if (!fs.existsSync(inputDir)) {
    console.error("Input directory not found:", inputDir);
    process.exit(1);
  }
  const allFiles = getFiles(inputDir).filter((f) => /\.(jpe?g|png)$/i.test(f));
  if (allFiles.length === 0) {
    console.log("No JPEG/PNG files found in", inputDir);
    return;
  }
  for (const file of allFiles) {
    await processFile(file);
  }
  console.log("Done. Optimized images are in public/images/optimized");
})();
