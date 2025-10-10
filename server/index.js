// server/index.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, "data");
const CHORE_FILE = path.join(DATA_DIR, "chore-map.json");

// Helper: read JSON file (returns array)
function readChores() {
  try {
    if (!fs.existsSync(CHORE_FILE)) return [];
    const raw = fs.readFileSync(CHORE_FILE, "utf8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    console.error("Error reading chore file:", err);
    return [];
  }
}

// Helper: write JSON array to file (atomic-ish)
function writeChores(arr) {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    fs.writeFileSync(CHORE_FILE, JSON.stringify(arr, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Error writing chore file:", err);
    return false;
  }
}

// Ensure file exists at startup
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(CHORE_FILE)) writeChores([]);

// GET root (health)
app.get("/", (req, res) => {
  res.json({ message: "Calorie Coach backend is running!" });
});

// GET all chores
app.get("/api/chore-map", (req, res) => {
  const chores = readChores();
  res.json(chores);
});

// POST add new chore
app.post("/api/chore-map", (req, res) => {
  const body = req.body || {};
  const required = ["chore", "equivalent"];
  for (const k of required) {
    if (!body[k] || typeof body[k] !== "string" || !body[k].trim()) {
      return res.status(400).json({ error: `Missing or invalid field: ${k}` });
    }
  }

  const chores = readChores();
  const nextId = chores.length ? Math.max(...chores.map((c) => c.id)) + 1 : 1;

  const newItem = {
    id: nextId,
    chore: String(body.chore).trim(),
    equivalent: String(body.equivalent).trim(),
    type: body.type ? String(body.type).trim() : "Unknown",
    time_mins: body.time_mins ? Number(body.time_mins) || 0 : 30,
    calories: body.calories ? String(body.calories).trim() : "—"
  };

  chores.push(newItem);
  const ok = writeChores(chores);
  if (!ok) return res.status(500).json({ error: "Failed to save chore" });

  res.status(201).json(newItem);
});

// Optional: delete by id
app.delete("/api/chore-map/:id", (req, res) => {
  const id = Number(req.params.id);
  const chores = readChores();
  const idx = chores.findIndex((c) => c.id === id);
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  const removed = chores.splice(idx, 1)[0];
  const ok = writeChores(chores);
  if (!ok) return res.status(500).json({ error: "Failed to save chore" });
  res.json({ removed });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
