# Navasarga · नवसर्ग

A searchable **place directory** for Nepal — a dataset of places (names, descriptions, and Instagram location links) presented through a small Next.js web app.

## Contents

```
navasarga/
├── data_with_about.csv   # 1,900+ places: name, location href, description
└── navasarg/             # Next.js App Router web app (searchable directory)
```

## The app

A static, searchable directory built with Next.js. It reads `data_with_about.csv` at build time and lets visitors search by place name or description text with client-side instant filtering.

### Run it

```bash
cd navasarg
npm install
npm run dev        # http://localhost:3000
```

### Production

```bash
cd navasarg
npm run build
npm run start
```

## Data

`data_with_about.csv` is the source of truth:

| Column | Meaning                          |
| ------ | -------------------------------- |
| `Text` | Place name                       |
| `Href` | URL to the place's location page |
| `about`| Description (multiline, quoted)  |

You can replace the CSV with your own dataset and rebuild — the app uses whatever file it finds one level above the app folder (configurable via `DEFAULT_CSV` in `navasarg/src/lib/places.js`).

**Note:** the CSV contains text with legacy/mojibake encodings. Re-exporting the source data as UTF-8 would clean up those strings.

## Tech stack

- Next.js 15 (App Router), React 19
- Custom CSV parser (`src/lib/places.js`) — no runtime DB needed
- Tailwind CSS 4

## License

MIT (see [LICENSE](LICENSE))