"use strict";
/**
 * This script scans the gallery directory and updates the gallery.json file
 * with metadata for each image.
 *
 * Run with: npx ts-node scripts/update-gallery.ts
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
// Paths
var galleryDir = path_1.default.join(process.cwd(), "public", "images", "gallery");
var dataDir = path_1.default.join(process.cwd(), "public", "data");
var dataFilePath = path_1.default.join(dataDir, "gallery.json");
// Ensure directories exist
if (!fs_1.default.existsSync(galleryDir)) {
    console.log("Creating gallery directory: ".concat(galleryDir));
    fs_1.default.mkdirSync(galleryDir, { recursive: true });
}
if (!fs_1.default.existsSync(dataDir)) {
    console.log("Creating data directory: ".concat(dataDir));
    fs_1.default.mkdirSync(dataDir, { recursive: true });
}
// Read existing data if available
var existingData = [];
if (fs_1.default.existsSync(dataFilePath)) {
    try {
        var data = fs_1.default.readFileSync(dataFilePath, "utf8");
        existingData = JSON.parse(data);
        console.log("Loaded existing data for ".concat(existingData.length, " gallery items"));
    }
    catch (error) {
        console.error("Error reading existing data:", error);
    }
}
// Scan the gallery directory
console.log("Scanning gallery directory: ".concat(galleryDir));
var files = fs_1.default.readdirSync(galleryDir).filter(function (file) { return /\.(jpg|jpeg|png|gif)$/i.test(file); });
console.log("Found ".concat(files.length, " image files"));
// Group files by prefix (e.g., "mountain-1.jpg" and "mountain-2.jpg" go together)
var groupedFiles = {};
files.forEach(function (file) {
    // Extract prefix (everything before the last dash and number)
    var match = file.match(/^(.+?)(?:-\d+)?(\.[^.]+)$/);
    if (match) {
        var prefix = match[1];
        if (!groupedFiles[prefix]) {
            groupedFiles[prefix] = [];
        }
        groupedFiles[prefix].push(file);
    }
    else {
        // If no pattern match, use the filename without extension as the group
        var prefix = path_1.default.parse(file).name;
        if (!groupedFiles[prefix]) {
            groupedFiles[prefix] = [];
        }
        groupedFiles[prefix].push(file);
    }
});
// Create or update gallery data
var galleryData = Object.entries(groupedFiles).map(function (_a) {
    var prefix = _a[0], files = _a[1];
    // Check if we already have data for this group
    var existing = existingData.find(function (item) { return item.id === "item-".concat(prefix); });
    if (existing) {
        // Update existing item with any new photos
        var existingFilenames_1 = existing.photos.map(function (p) { return p.filename; });
        var newPhotos = files
            .filter(function (file) { return !existingFilenames_1.includes(file); })
            .map(function (file) { return ({
            filename: file,
            alt: "".concat(prefix, " photo"),
        }); });
        return __assign(__assign({}, existing), { photos: __spreadArray(__spreadArray([], existing.photos, true), newPhotos, true) });
    }
    // Create new entry for this group
    return {
        id: "item-".concat(prefix),
        caption: prefix.replace(/-/g, " ").replace(/\b\w/g, function (l) { return l.toUpperCase(); }),
        likes: 0,
        photos: files.map(function (file) { return ({
            filename: file,
            alt: "".concat(prefix, " photo"),
        }); }),
        primaryIndex: 0,
    };
});
// Write the updated data
fs_1.default.writeFileSync(dataFilePath, JSON.stringify(galleryData, null, 2), "utf8");
console.log("Updated gallery data with ".concat(galleryData.length, " items containing ").concat(files.length, " photos"));
console.log("Data saved to: ".concat(dataFilePath));
