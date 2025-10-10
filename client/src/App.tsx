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

  // form state
  const [chore, setChore] = useState("");
  const [equivalent, setEquivalent] = useState("");
  const [type, setType] = useState("");
  const [timeMins, setTimeMins] = useState("30");
  const [calories, setCalories] = useState("");

  const API = "http://127.0.0.1:5000";

  const fetchData = () => {
    setLoading(true);
    fetch(`${API}/api/chore-map`)
      .then((r) => {
        if (!r.ok) throw new Error(`Status ${r.status}`);
        return r.json();
      })
      .then((json) => setData(json))
      .catch((e) => setError("Unable to fetch chore map. Is backend running?"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setError(null);

    if (!chore.trim() || !equivalent.trim()) {
      setError("Please enter a chore and an equivalent exercise.");
      return;
    }

    const payload = {
      chore: chore.trim(),
      equivalent: equivalent.trim(),
      type: type.trim() || "General",
      time_mins: Number(timeMins) || 30,
      calories: calories.trim() || "—"
    };

    try {
      const res = await fetch(`${API}/api/chore-map`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || `Server ${res.status}`);
      }
      const created = await res.json();
      // clear form
      setChore("");
      setEquivalent("");
      setType("");
      setTimeMins("30");
      setCalories("");
      // refresh list
      fetchData();
    } catch (err: any) {
      setError(err?.message || "Failed to add chore");
    }
  };

  const onDelete = async (id: number) => {
    if (!confirm("Delete this chore?")) return;
    try {
      const res = await fetch(`${API}/api/chore-map/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      fetchData();
    } catch (err: any) {
      setError("Failed to delete item");
    }
  };

  return (
    <div className="app-container" style={{ padding: 24 }}>
      <div className="card">
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div className="icon-badge">🔥</div>
          <div>
            <h1 style={{ margin: 0, fontSize: 26 }}>Calorie Coach</h1>
            <p style={{ margin: "6px 0 0 0", color: "#cbd5e1" }}>Add chores and see gym equivalents</p>
          </div>
        </div>

        <section style={{ marginTop: 18 }}>
          <form onSubmit={onSubmit} style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 1fr" }}>
            <input value={chore} onChange={(e) => setChore(e.target.value)} placeholder="Household chore" />
            <input value={equivalent} onChange={(e) => setEquivalent(e.target.value)} placeholder="Gym equivalent" />
            <input value={type} onChange={(e) => setType(e.target.value)} placeholder="Type (Cardio/Hybrid/...)" />
            <input value={timeMins} onChange={(e) => setTimeMins(e.target.value)} placeholder="Time (mins)" />
            <input value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="Calories (e.g. 120-150)" />
            <div style={{ gridColumn: "1 / -1", display: "flex", gap: 8 }}>
              <button type="submit">Add chore</button>
              <button
                type="button"
                onClick={() => {
                  setChore("");
                  setEquivalent("");
                  setType("");
                  setTimeMins("30");
                  setCalories("");
                }}
              >
                Clear
              </button>
              <div style={{ marginLeft: "auto", color: "#94a3b8", alignSelf: "center" }}>
                {loading ? "Loading…" : `Items: ${data?.length ?? 0}`}
              </div>
            </div>
          </form>
        </section>

        <section style={{ marginTop: 18 }}>
          {error && <div style={{ color: "salmon", marginBottom: 8 }}>{error}</div>}
          {loading && <div>Loading chore map…</div>}
          {!loading && data && (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ textAlign: "left", borderBottom: "1px solid rgba(148,163,184,0.12)" }}>
                    <th style={{ padding: 8 }}>Chore</th>
                    <th style={{ padding: 8 }}>Equivalent</th>
                    <th style={{ padding: 8 }}>Type</th>
                    <th style={{ padding: 8 }}>Time</th>
                    <th style={{ padding: 8 }}>Calories</th>
                    <th style={{ padding: 8 }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr key={row.id} style={{ borderBottom: "1px solid rgba(148,163,184,0.06)" }}>
                      <td style={{ padding: 8 }}>{row.chore}</td>
                      <td style={{ padding: 8 }}>{row.equivalent}</td>
                      <td style={{ padding: 8 }}>{row.type}</td>
                      <td style={{ padding: 8 }}>{row.time_mins}</td>
                      <td style={{ padding: 8 }}>{row.calories}</td>
                      <td style={{ padding: 8 }}>
                        <button onClick={() => onDelete(row.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <footer style={{ marginTop: 12, color: "#94a3b8", fontSize: 12 }}>
          Entries are saved to server/data/chore-map.json
        </footer>
      </div>
    </div>
  );
}
