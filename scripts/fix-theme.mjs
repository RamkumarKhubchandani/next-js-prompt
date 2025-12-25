import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const coursesDir = path.resolve(__dirname, '../app/lib/courses');

const replacements = [
    // Text colors
    { from: 'text-white', to: 'text-gray-900 dark:text-white' },
    { from: 'text-light-100', to: 'text-gray-800 dark:text-light-100' },
    { from: 'text-light-200', to: 'text-gray-700 dark:text-light-200' },
    { from: 'text-light-300', to: 'text-gray-600 dark:text-light-300' },

    // Backgrounds
    { from: 'bg-dark-900', to: 'bg-gray-100 dark:bg-dark-900' },
    { from: 'bg-dark-800', to: 'bg-white dark:bg-dark-800' },

    // Borders
    { from: 'border-dark-600', to: 'border-gray-200 dark:border-dark-600' },

    // Accents (Text)
    { from: 'text-cyan-300', to: 'text-cyan-700 dark:text-cyan-300' },
    { from: 'text-yellow-400', to: 'text-yellow-600 dark:text-yellow-400' },
    { from: 'text-green-400', to: 'text-green-600 dark:text-green-400' },
    { from: 'text-red-400', to: 'text-red-600 dark:text-red-400' },
    { from: 'text-blue-200', to: 'text-blue-800 dark:text-blue-200' },
    { from: 'text-red-200', to: 'text-red-800 dark:text-red-200' },
    { from: 'text-green-200', to: 'text-green-800 dark:text-green-200' },
    { from: 'text-purple-300', to: 'text-purple-700 dark:text-purple-300' },

    // Accents (Backgrounds/Borders)
    { from: 'bg-blue-900/20', to: 'bg-blue-50 dark:bg-blue-900/20' },
    { from: 'border-blue-500/30', to: 'border-blue-200 dark:border-blue-500/30' },
    { from: 'bg-red-900/20', to: 'bg-red-50 dark:bg-red-900/20' },
    { from: 'border-red-500/30', to: 'border-red-200 dark:border-red-500/30' },
    { from: 'bg-green-900/20', to: 'bg-green-50 dark:bg-green-900/20' },
    { from: 'border-green-500/30', to: 'border-green-200 dark:border-green-500/30' },
];

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    replacements.forEach(({ from, to }) => {
        // Use \b for word boundaries. 
        // (?<!dark:) ensures we don't match if it's already prefixed with dark:
        // We also need to ensure we don't match if it's part of a larger class name (though unlikely with these specific names)
        // \b handles start/end of string or space/quote/etc.

        const regex = new RegExp(`(?<!dark:)\\b${from}\\b`, 'g');
        content = content.replace(regex, to);
    });

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            walkDir(filePath);
        } else if (file.endsWith('.js')) {
            processFile(filePath);
        }
    });
}

console.log('Starting theme fix (pass 2)...');
walkDir(coursesDir);
console.log('Theme fix complete.');
