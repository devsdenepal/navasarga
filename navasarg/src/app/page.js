import { getPlaces } from '../lib/places';
import Directory from './page.client';

export const metadata = {
    title: 'Navasarga — Place Directory',
    description: 'A searchable directory of places and their Instagram location links.',
};

export default async function Home() {
    let places = [];
    try {
        places = await getPlaces();
    } catch (err) {
        console.error('Failed to load places CSV:', err.message);
    }
    return <Directory places={places} />;
}