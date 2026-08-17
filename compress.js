import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = './src/assets/memories';

fs.readdirSync(dir).forEach(file => {
  if (file.match(/\.(jpg|jpeg|png|JPG)$/i)) {
    const filePath = path.join(dir, file);
    const tempPath = path.join(dir, 'temp_' + file);
    
    sharp(filePath)
      .resize(800) // Max width 800px, auto height
      .jpeg({ quality: 80 })
      .toFile(tempPath)
      .then(() => {
        fs.renameSync(tempPath, filePath);
        console.log('Compressed:', file);
      })
      .catch(err => {
        console.error('Error compressing', file, err);
      });
  }
});
