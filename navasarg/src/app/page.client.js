'use client';

import { useMemo, useState } from 'react';
import { searchPlaces } from '../lib/search';

export default function Directory({ places }) {
    const [query, setQuery] = useState('');
    const [shown, setShown] = useState(50);

    const results = useMemo(() => searchPlaces(places, query), [places, query]);

    return (
        <main className="min-h-screen p-8 max-w-5xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold">नवसर्ग · Navasarga</h1>
                <p className="text-gray-600 mt-2">
                    A searchable directory of {places.length} places with their Instagram
                    location links.
                </p>
            </header>

            <input
                type="search"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setShown(50);
                }}
                placeholder="Search places…"
                className="w-full p-3 border border-gray-300 rounded-lg mb-6"
            />

            <p className="text-sm text-gray-500 mb-4">
                {results.length.toLocaleString()} result{results.length === 1 ? '' : 's'}
            </p>

            <ul className="divide-y divide-gray-200">
                {results.slice(0, shown).map((place, i) => (
                    <li key={i} className="py-4">
                        <a href={place.href} target="_blank" rel="noopener noreferrer"
                            className="font-semibold text-blue-700 hover:underline">
                            {place.name}
                        </a>
                        <p className="text-sm text-gray-600 whitespace-pre-line mt-1">{place.about}</p>
                    </li>
                ))}
            </ul>

            {shown < results.length && (
                <button
                    onClick={() => setShown((s) => s + 100)}
                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg">
                    Load more
                </button>
            )}
        </main>
    );
}