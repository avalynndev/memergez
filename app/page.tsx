"use client";
import { useState } from "react";

const MemePage = () => {
  const [text, setText] = useState("");
  const [meme, setMeme] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/meme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.meme) {
          setMeme(`data:image/png;base64,${data.meme}`);
        } else {
          setError("Failed to generate meme. Please try again.");
        }
      } else {
        setError(data.error || "Failed to generate meme.");
      }
    } catch (error) {
      setError("An error occurred while generating the meme.");
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Generate Meme</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text"
          required
          style={{ padding: "0.5rem", fontSize: "1rem", marginRight: "0.5rem" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            backgroundColor: "#0070f3",
            color: "#ffffff",
            border: "none",
            borderRadius: "0.25rem",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Generating..." : "Generate Meme"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {meme && (
        <div>
          <h2>Your Meme:</h2>
          <img
            src={meme}
            alt="Generated Meme"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
};

export default MemePage;
