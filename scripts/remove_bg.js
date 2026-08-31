const { Jimp } = require('jimp');
const path = require('path');

async function main() {
  const inputPath = path.join(__dirname, '../public/logo/ont_logo.jpg');
  const outputPath = path.join(__dirname, '../public/logo/ont_logo.png');

  console.log('Reading image from:', inputPath);
  const image = await Jimp.read(inputPath);

  console.log(`Image loaded. Width: ${image.bitmap.width}, Height: ${image.bitmap.height}`);

  // Loop through pixels and make white/near-white transparent
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    // Check if the pixel is white or very close to white
    // (threshold of 240 to catch compression artifacts/gradients)
    if (r > 240 && g > 240 && b > 240) {
      this.bitmap.data[idx + 3] = 0; // Set alpha to 0 (fully transparent)
    }
  });

  console.log('Writing transparent image to:', outputPath);
  await image.write(outputPath);
  console.log('Done!');
}

main().catch(err => {
  console.error('Error processing image:', err);
  process.exit(1);
});
