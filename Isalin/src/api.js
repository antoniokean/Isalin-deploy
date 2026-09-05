// In local dev, VITE_API_URL is unset, so BASE stays "/api" and Vite's
// proxy (vite.config.js) forwards it to localhost:3001 — nothing changes
// for local development. Once deployed, VITE_API_URL is set to your real
// backend URL (e.g. https://isalin-api.onrender.com) in Vercel's settings.
const BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "/api";

export async function convert(text, direction, save = true) {
  const res = await fetch(`${BASE}/convert`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, direction, save }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export async function fetchHistory(limit = 20) {
  const res = await fetch(`${BASE}/history?limit=${limit}`);
  if (!res.ok) return [];
  return res.json();
}

export async function clearHistory() {
  const res = await fetch(`${BASE}/history`, { method: "DELETE" });
  return res.ok;
}