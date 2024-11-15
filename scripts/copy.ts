import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get the current directory using ESM-compatible methods
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define directories
const BASE_DIR = path.resolve(__dirname);
const DIST_DIR = path.join(BASE_DIR, '../dist/django-hstore-widget');
const TARGET_DIR = path.join(BASE_DIR, '../django_hstore_widget/static/admin/js/django_hstore_widget');

// Remove target directory if it exists
if (fs.existsSync(TARGET_DIR)) {
    fs.rmSync(TARGET_DIR, { recursive: true, force: true });
}

// Recreate target directory
fs.mkdirSync(TARGET_DIR, { recursive: true });

// Get list of .js files in the distribution directory
const files = fs.readdirSync(DIST_DIR).filter(file => file.endsWith('.js'));

// Check if there are .js files
if (files.length === 0) {
    throw new Error("There are no .js files. Re-run 'npm build'.");
}

// Copy non-empty .js files to target directory
files.forEach(file => {
    const filePath = path.join(DIST_DIR, file);
    if (fs.statSync(filePath).size > 0) {
        fs.copyFileSync(filePath, path.join(TARGET_DIR, file));
    }
});

console.log('DONE');
