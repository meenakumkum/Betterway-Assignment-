# Mini E-Commerce Product & Cart (React)

A small e-commerce UI built with React (functional components) to demonstrate:
- Component design
- State modeling and updates
- Avoiding unnecessary re-renders (cart state split into State/Dispatch contexts)
- Search + category filter + price sort that work together
- Cart rules (qty capped at stock)

## Candidate instruction (important)
Students are required to share pictures of any rough work they do while solving the assignment.  
Only candidates who submit their worksheets will be considered for the next round of interviews.

## Tech stack
- React 18 + Vite
- No UI libraries
- Basic CSS (see `src/styles.css`)

## Data
The app **tries** to fetch products from:
- https://dummyjson.com/products?limit=20

If the API is not available, it falls back to `src/data/mockProducts.js` (mocked data).

## Run locally
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Notes for evaluators
- Filters work together (search + category + sort).
- Empty states implemented:
  - No products found
  - Empty cart
- Cart state persisted in `localStorage` (bonus).
- Search is debounced (bonus).

## “Word count”
This repository focuses on code. If you need a written explanation for submission, add it to this README and provide the word count there.
