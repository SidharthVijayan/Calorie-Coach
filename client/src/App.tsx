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
  const [data, setData] = useState<Chore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/chore-map");
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
        setError("❌ Unable to reach backend");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div style={{ padding: 40, fontFamily: "system-ui", background: "#f8f9fa" }}>
      <h1 style={{ fontSize: 32, display: "flex", alignItems: "center", gap: 8 }}>
        🔥 Calorie Coach
      </h1>
      <p>Chores vs Gym Equivalents — Live from backend</p>

      {loading && <p>Loading data…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && data.length > 0 && (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: 20,
            background: "white",
          }}
        >
          <thead style={{ background: "#e5e7eb" }}>
            <tr>
              <th style={{ padding: 8 }}>Chore</th>
              <th style={{ padding: 8 }}>Equivalent Exercise</th>
              <th style={{ padding: 8 }}>Type</th>
              <th style={{ padding: 8 }}>Time (mins)</th>
              <th style={{ padding: 8 }}>Calories</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: 8 }}>{row.chore}</td>
                <td style={{ padding: 8 }}>{row.equivalent}</td>
                <td style={{ padding: 8 }}>{row.type}</td>
                <td style={{ padding: 8, textAlign: "center" }}>
                  {row.time_mins}
                </td>
                <td style={{ padding: 8, textAlign: "center" }}>
                  {row.calories}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && !error && data.length === 0 && (
        <p>No chores found — check your backend data file.</p>
      )}
    </div>
  );
}
