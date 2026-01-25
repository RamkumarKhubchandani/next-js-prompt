import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper to get file path
const getFilePath = () => path.join(process.cwd(), 'app', 'lib', 'events.json');

export async function GET() {
    try {
        const filePath = getFilePath();
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContent);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const filePath = getFilePath();

        // Write updated events to file
        fs.writeFileSync(filePath, JSON.stringify(body, null, 4));

        return NextResponse.json({ success: true, message: 'Events updated successfully' });
    } catch (error) {
        console.error("Save Error:", error);
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}
