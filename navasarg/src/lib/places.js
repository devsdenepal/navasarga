import fs from 'fs';
import path from 'path';

const DEFAULT_CSV = path.join(process.cwd(), '..', 'data_with_about.csv');

// Minimal CSV parser supporting quoted, multiline fields.
export function parseCsv(text) {
    const rows = [];
    let row = [];
    let field = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (inQuotes) {
            if (ch === '"') {
                if (text[i + 1] === '"') {
                    field += '"';
                    i++;
                } else {
                    inQuotes = false;
                }
            } else {
                field += ch;
            }
        } else {
            if (ch === '"') {
                inQuotes = true;
            } else if (ch === ',') {
                row.push(field);
                field = '';
            } else if (ch === '\n') {
                row.push(field);
                field = '';
                rows.push(row);
                row = [];
            } else if (ch !== '\r') {
                field += ch;
            }
        }
    }
    if (field.length || row.length) {
        row.push(field);
        rows.push(row);
    }
    return rows;
}

export async function getPlaces(csvPath = DEFAULT_CSV) {
    const text = fs.readFileSync(csvPath, 'utf8');
    const rows = parseCsv(text);
    return rows.slice(1).map((cells) => ({
        name: cells[0] || '',
        href: cells[1] || '',
        about: (cells[2] || '').trim(),
    }));
}