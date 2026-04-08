import { useState, useEffect } from "react";

export interface Incident {
  id: string;
  title: string;
  severity: string;
  confidence: number;
  affectedAssetIds: string[];
  status: string;
}

export interface Recommendation {
  id: string;
  label: string;
  rank: number;
  rationale: string;
  confidence: number;
}

const API_BASE = import.meta.env.VITE_SCUTUM_API ?? "http://localhost:4000";

export function useIncident() {
  const [incident, setIncident] = useState<Incident | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [incRes, recRes] = await Promise.all([
          fetch(`${API_BASE}/incident/current`),
          fetch(`${API_BASE}/incident/recommendations`),
        ]);
        if (incRes.ok) setIncident(await incRes.json());
        if (recRes.ok) setRecommendations(await recRes.json());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to connect");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { incident, recommendations, loading, error };
}
