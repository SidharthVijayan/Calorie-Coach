import { useEffect, useState } from "react";

type Chore = {
  id: number;
  chore: string;
  equivalent: string;
  type: string;
  time_mins: number;
  calories: string;
};

export default function App() {
  const [data, setData] = useState<Chore[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:5000/api/chore-map")
      .then((res) => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setData(json);
        setError(null);
      })
      .catch((err) => {
        console.error("Fetch chore-map error:", err);
        setError("Unable to fetch chore map. Make sure backend is running!");
        setData(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: 40, fontFamily: "system-ui", color: "#111" }}>
      <h1 style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 28 }}>
        🔥 Calorie Coach
      </h1>
      <p>Chores vs Gym Equivalents</p>
      {loading && <p>Loading data…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && data && (
        <table border={1} cellPadding={8} style={{ borderCollapse: "collapse", marginTop: 12 }}>
          <thead>
            <tr>
              <th>Household Chore</th>
              <th>Gym Equivalent</th>
              <th>Type</th>
              <th>Time (mins)</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.chore}</td>
                <td>{row.equivalent}</td>
                <td>{row.type}</td>
                <td>{row.time_mins}</td>
                <td>{row.calories}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
