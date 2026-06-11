const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, '../src/assets/images');

async function optimizeImages() {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const ext = path.extname(file);
      const name = path.basename(file, ext);
      const inputPath = path.join(dir, file);
      const outputPath = path.join(dir, `${name}.webp`);

      console.log(`Optimizing ${file}...`);
      try {
        await sharp(inputPath)
          .resize({ width: 600, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outputPath);
        
        // Remove the original file after successful conversion
        fs.unlinkSync(inputPath);
        console.log(`Converted ${file} to ${name}.webp`);
      } catch (err) {
        console.error(`Failed to optimize ${file}:`, err);
      }
    }
  }
  console.log('All done!');
}

optimizeImages();
