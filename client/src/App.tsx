import { useEffect, useState } from "react";

type Chore = {
  id: number;
  chore: string;
  equivalent: string;
  type: string;
  time_mins: number;
  calories: string;
};

function App() {
  const [data, setData] = useState<Chore[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/chore-map")
      .then((res) => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setData(json);
        setError(null);
      })
      .catch((err) => {
        setError("Unable to fetch chore map. Is backend running?");
        setData(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="app-container">
      <div className="card">
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div className="icon-badge">🔥</div>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>Calorie Coach</h1>
            <p style={{ margin: "6px 0 0 0", color: "#cbd5e1" }}>
              Chores vs Gym — live data from backend
            </p>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          {loading && <p style={{ color: "#cbd5e1" }}>Loading chore map…</p>}
          {error && <p style={{ color: "#f87171" }}>{error}</p>}
          {!loading && !error && data && (
            <div style={{ overflowX: "auto", marginTop: 12 }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ textAlign: "left", borderBottom: "1px solid rgba(148,163,184,0.12)" }}>
                    <th style={{ padding: "8px 6px" }}>Household Chore</th>
                    <th style={{ padding: "8px 6px" }}>Gym Equivalent</th>
                    <th style={{ padding: "8px 6px", width: 110 }}>Type</th>
                    <th style={{ padding: "8px 6px", width: 80 }}>Time (mins)</th>
                    <th style={{ padding: "8px 6px", width: 120 }}>Calories</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr key={row.id} style={{ borderBottom: "1px solid rgba(148,163,184,0.06)" }}>
                      <td style={{ padding: "10px 6px" }}>{row.chore}</td>
                      <td style={{ padding: "10px 6px" }}>{row.equivalent}</td>
                      <td style={{ padding: "10px 6px" }}>{row.type}</td>
                      <td style={{ padding: "10px 6px" }}>{row.time_mins}</td>
                      <td style={{ padding: "10px 6px" }}>{row.calories}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <footer style={{ marginTop: 18, color: "#94a3b8", fontSize: 12 }}>
          Data: static sample set. You can add more chores server-side.
        </footer>
      </div>
    </div>
  );
}

export default App;
