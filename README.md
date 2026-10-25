# MoodBoard (starter)

Team photo board. Upload and list image files. Complete the `TODO`s in `server/` and `client/`.

## Run

```bash
# backend
cd server && npm install && cp .env.example .env && npm start   # http://localhost:4000

# frontend (new terminal)
cd client && npm install && npm run dev                          # http://localhost:5173
```

## Flow to achieve
Register → log in → upload an image (png/jpeg/webp, ≤ 5 MB) → see it listed.
Non-images and oversized files are rejected with a `400`/`413`.

## What to complete
- `server/index.js` — `requireAuth`, multer config, `/upload`, `/files`.
- `client/src/auth/AuthContext.jsx` — token Context + `login`/`logout`.
- `client/src/App.jsx` — login + upload forms (React Hook Form) wired to the API.

## Submit
ZIP the project **without** `node_modules/`, `.env`, and `server/uploads/*`.
Include a short `RUNNING.md`.
