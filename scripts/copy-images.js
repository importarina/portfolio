/**
 * Image Copy Script
 * 
 * This script ensures that all static images are properly copied to the Next.js build output directory.
 * It automatically handles all subdirectories under public/images, including gallery images
 * (with carousel subdirectories), profile images, and any future image directories.
 * 
 * The script is run as part of the build process to ensure that all images are available
 * in the production deployment, particularly when deploying through Vercel's UI.
 */

const fs = require('fs');
const path = require('path');

// Base source and destination directories
const baseSourceDir = path.join(process.cwd(), 'public', 'images');
const baseDestDir = path.join(process.cwd(), '.next', 'static', 'images');

// Get all subdirectories under public/images
function getImageDirectories() {
  if (!fs.existsSync(baseSourceDir)) {
    console.log(`Base images directory not found: ${baseSourceDir}`);
    return [];
  }

  const items = fs.readdirSync(baseSourceDir);
  return items
    .filter(item => fs.statSync(path.join(baseSourceDir, item)).isDirectory())
    .map(dir => ({
      source: path.join(baseSourceDir, dir),
      dest: path.join(baseDestDir, dir)
    }));
}

// Copy all files from source to destination
function copyFiles(source, destination) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const files = fs.readdirSync(source);
  
  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);
    
    if (fs.statSync(sourcePath).isDirectory()) {
      // Create subdirectory if it doesn't exist
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      console.log(`Processing subdirectory: ${file}`);
      copyFiles(sourcePath, destPath);
    } else {
      // Copy file
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Copied: ${file}`);
    }
  });
}

// Get all image directories and copy their contents
const imageDirs = getImageDirectories();

if (imageDirs.length === 0) {
  console.log('No image directories found in public/images');
} else {
  console.log('\nFound image directories:');
  imageDirs.forEach(({ source }) => {
    const dirName = path.basename(source);
    console.log(`- ${dirName}`);
  });

  // Copy all images from each directory
  imageDirs.forEach(({ source, dest }) => {
    console.log(`\nCopying images from ${source} to ${dest}`);
    copyFiles(source, dest);
  });
}

console.log('\nImage copy complete!'); 