export function searchPlaces(places, query) {
    const q = query.trim().toLowerCase();
    if (!q) return places;
    return places.filter(
        (p) =>
            p.name.toLowerCase().includes(q) ||
            p.about.toLowerCase().includes(q)
    );
}