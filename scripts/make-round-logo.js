import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, '../public/assets/logo.jpg');
const outputPath = path.join(__dirname, '../public/assets/logo-round.png');

async function makeRound() {
    try {
        console.log(`Processing: ${inputPath}`);

        // Read image
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        // Ensure square
        const size = Math.min(metadata.width, metadata.height);

        // Create circle mask
        const circle = Buffer.from(
            `<svg width="${size}" height="${size}">
         <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/>
       </svg>`
        );

        await image
            .resize(size, size, { fit: 'cover' })
            .composite([{
                input: circle,
                blend: 'dest-in'
            }])
            .png()
            .toFile(outputPath);

        console.log(`Successfully created round logo at: ${outputPath}`);
    } catch (error) {
        console.error('Error processing image:', error);
        process.exit(1);
    }
}

makeRound();
