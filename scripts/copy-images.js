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

// Get all subdirectories and files under public/images
function getImageItems() {
  if (!fs.existsSync(baseSourceDir)) {
    console.log(`Base images directory not found: ${baseSourceDir}`);
    return { dirs: [], files: [] };
  }

  const items = fs.readdirSync(baseSourceDir);
  const dirs = [];
  const files = [];

  items.forEach(item => {
    const fullPath = path.join(baseSourceDir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      dirs.push({
        source: fullPath,
        dest: path.join(baseDestDir, item)
      });
    } else if (stat.isFile() && /\.(jpg|jpeg|png|gif|webp)$/i.test(item)) {
      files.push({
        source: fullPath,
        dest: path.join(baseDestDir, item)
      });
    }
  });

  return { dirs, files };
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

// Get all image items and copy their contents
const { dirs, files } = getImageItems();

if (dirs.length === 0 && files.length === 0) {
  console.log('No images found in public/images');
} else {
  // Copy root images
  if (files.length > 0) {
    console.log('\nCopying root images:');
    files.forEach(({ source, dest }) => {
      const dir = path.dirname(dest);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.copyFileSync(source, dest);
      console.log(`Copied: ${path.basename(source)}`);
    });
  }

  // Copy directory contents
  if (dirs.length > 0) {
    console.log('\nFound image directories:');
    dirs.forEach(({ source }) => {
      const dirName = path.basename(source);
      console.log(`- ${dirName}`);
    });

    dirs.forEach(({ source, dest }) => {
      console.log(`\nCopying images from ${source} to ${dest}`);
      copyFiles(source, dest);
    });
  }
}

console.log('\nImage copy complete!'); 