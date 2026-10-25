/**
 * MoodBoard — Express backend (starter).
 *
 * /register and /login are DONE for you (they issue a JWT). Your job is the TODOs:
 *   - requireAuth middleware          (Exp 7)
 *   - multer config + upload/list     (Exp 8)
 *
 * Run: npm install && npm start   (http://localhost:4000)
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const UPLOAD_DIR = path.join(__dirname, 'uploads');

// ── In-memory stores (reset on restart) ──
const users = [];                 // { username, password }
const uploads = [];               // { username, filename, originalname, size }

// ── Auth: register + login (DONE — issue a JWT) ──
app.post('/register', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'username and password are required' });
  if (users.find((u) => u.username === username)) return res.status(409).json({ error: 'user already exists' });
  users.push({ username, password });
  res.status(201).json({ username });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'invalid credentials' });
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// ── TODO 1 (Exp 7): requireAuth middleware ──
// Read "Authorization: Bearer <token>", verify with jwt.verify(token, JWT_SECRET),
// set req.user = payload, call next(). Missing/invalid -> 401 { error: 'Unauthorized' }.
function requireAuth(req, res, next) {
  // TODO
}

// ── TODO 2 (Exp 8): multer config ──
// diskStorage into UPLOAD_DIR with a unique filename; fileFilter accepting only
// image/png, image/jpeg, image/webp; limits.fileSize = 5 MB.
// const upload = multer({ storage, fileFilter, limits });
// const upload = ...;

// ── Routes ──

// POST /upload (protected) — single "file" field.
// TODO 3: protect with requireAuth, use upload.single('file'); if no file -> 400;
//         save { username, filename, originalname, size } into `uploads`; respond 201 with it.
app.post('/upload', /* requireAuth, upload.single('file'), */ (req, res) => {
  // TODO
  res.status(501).json({ error: 'not implemented' });
});

// GET /files (protected) — list this user's uploads.
// TODO 4: protect with requireAuth; respond 200 with the user's uploads.
app.get('/files', /* requireAuth, */ (req, res) => {
  // TODO
  res.status(501).json({ error: 'not implemented' });
});

// ── (recommended) central error handler ──
// Catch multer errors (e.g. LIMIT_FILE_SIZE -> 413) and the image-only filter error,
// returning clean JSON instead of crashing. Signature: (err, req, res, next).

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`MoodBoard server on http://localhost:${PORT}`));

module.exports = app;
