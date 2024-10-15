import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Build file path
        const filePath = path.join(process.cwd(), 'public', 'data', `lastNames.json`);

        // Read JSON contents
        const fileContents = await fs.readFile(filePath, 'utf8');

        // Parse JSON data
        const data = JSON.parse(fileContents);

        // Return JSON data as Promise response
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error reading files: ', error);

        return NextResponse.json({Error: 'File not found' }, { status: 404 })
    }
}