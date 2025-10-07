import { useEffect, useState } from "react";

function App() {
  // Store backend message
  const [message, setMessage] = useState("Connecting to backend...");

  // Fetch data from backend when app loads
  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("❌ Unable to reach backend"));
  }, []);

  // Render simple UI
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "6rem",
        fontFamily: "Inter, Roboto, sans-serif",
        color: "#222",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔥 Calorie Coach</h1>
      <h2 style={{ fontSize: "1.25rem", color: "#111" }}>{message}</h2>
      <p style={{ color: "#666", marginTop: "0.5rem" }}>
        Frontend (React + Vite) connected to Backend (Express)
      </p>
    </div>
  );
}

export default App;
