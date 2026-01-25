const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../app/lib/eventsData.js');
const destPath = path.join(__dirname, '../app/lib/events.json');

try {
    const content = fs.readFileSync(srcPath, 'utf8');
    // Find the array start and end
    const start = content.indexOf('[');
    const end = content.lastIndexOf(']');

    if (start === -1 || end === -1) {
        throw new Error("Could not find array brackets");
    }

    const arrayStr = content.substring(start, end + 1);

    // Safety check: Use Function constructor instead of direct eval for slight better scope isolation
    // But direct eval is fine for this local script
    const data = eval('(' + arrayStr + ')');

    fs.writeFileSync(destPath, JSON.stringify(data, null, 2));
    console.log("Successfully converted eventsData.js to events.json");
} catch (e) {
    console.error("Conversion failed:", e);
    process.exit(1);
}
