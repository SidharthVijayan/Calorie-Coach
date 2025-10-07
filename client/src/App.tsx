import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Connecting to backend...");

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("❌ Unable to reach backend"));
  }, []);

  return (
    <div className="app-container">
      <div className="card">
        <div className="flex items-center gap-4">
          <div className="flex-none">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl shadow-lg">
              🔥
            </div>
          </div>
          <div className="min-w-0">
            <h1 className="text-3xl font-extrabold">Calorie Coach</h1>
            <p className="text-sm text-gray-300 mt-1">Human-first nutrition & lifestyle companion</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="p-6 bg-gray-900/60 rounded-xl border border-gray-700">
              <h2 className="text-xl font-semibold mb-2">Backend Status</h2>
              <p className="text-gray-200">{message}</p>
              <p className="text-xs text-gray-400 mt-2">Live connection: Frontend (Vite + React) ↔ Backend (Express)</p>
            </div>
          </div>

          <div className="p-6 bg-gray-900/60 rounded-xl border border-gray-700">
            <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• <strong>Run server:</strong> <code>node server/index.js</code></li>
              <li>• <strong>Start client:</strong> <code>npm run dev</code> (inside client/)</li>
              <li>• <strong>Open:</strong> <span className="text-primary">http://localhost:5173</span></li>
            </ul>
          </div>
        </div>

        <footer className="mt-6 text-xs text-gray-400">
          Built with care — Tailwind + Vite + React. Next: chores → gym mapping, AI suggestions.
        </footer>
      </div>
    </div>
  );
}

export default App;
