import { useState } from "react";

/**
 * Simple frontend-only App for Calorie Coach
 * - Shows a styled dashboard using the prebuilt CSS (tw-output.css)
 * - Uses a static message so you don't need the backend right now
 */

function App() {
  // STATIC status so no backend is required
  const [message] = useState("✅ Backend: Ready (offline mode)");

  return (
    <div className="app-container">
      <div className="card">
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div className="icon-badge">🔥</div>
          <div style={{ minWidth: 0 }}>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800 }}>Calorie Coach</h1>
            <p style={{ margin: "6px 0 0 0", color: "#cbd5e1" }}>
              Human-first nutrition & lifestyle companion (offline preview)
            </p>
          </div>
        </div>

        <div style={{ marginTop: 24, display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 60%" }} className="backend-status">
            <h2 style={{ margin: "0 0 8px 0" }}>Backend Status</h2>
            <p style={{ margin: 0 }}>{message}</p>
            <p style={{ marginTop: 10, color: "#9ca3af", fontSize: 12 }}>
              This is offline mode so you can continue building UI without starting a server.
            </p>
          </div>

          <div style={{ flex: "1 1 35%" }} className="quick-actions">
            <h3 style={{ marginTop: 0 }}>Quick Actions</h3>
            <ul style={{ margin: 0, paddingLeft: 16, color: "#e2e8f0" }}>
              <li>• Edit UI components in <code>client/src</code></li>
              <li>• Add chore → gym mappings (we'll add components)</li>
              <li>• Later: enable backend by toggling a single line</li>
            </ul>
          </div>
        </div>

        <footer style={{ marginTop: 18, color: "#94a3b8", fontSize: 12 }}>
          Built with care — Tailwind-style CSS applied. When you're ready we can re-enable the backend.
        </footer>
      </div>
    </div>
  );
}

export default App;
