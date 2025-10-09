const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const choreMap = [
  { id: 1, chore: "Sweeping / Vacuuming", equivalent: "Standing Oblique Twists + Light Cardio", type: "Cardio", time_mins: 30, calories: "120–150" },
  { id: 2, chore: "Mopping (vigorous)", equivalent: "Battle Ropes / Mountain Climbers", type: "Hybrid", time_mins: 30, calories: "150–180" },
  { id: 3, chore: "Scrubbing floor or tiles", equivalent: "Plank Variations + Russian Twists", type: "Hybrid", time_mins: 30, calories: "180–200" },
  { id: 4, chore: "Doing the Dishes", equivalent: "Standing Calf Raises + Static Core Hold", type: "Isometric + Light Cardio", time_mins: 30, calories: "80–100" }
];

app.get("/", (req, res) => {
  res.json({ message: "Calorie Coach backend is running!" });
});

app.get("/api/chore-map", (req, res) => {
  res.json(choreMap);
});

app.get("/api/chore-map/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = choreMap.find((c) => c.id === id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
