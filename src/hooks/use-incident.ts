import { usePolling } from "./use-polling";

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

export interface IncidentData {
  incident: Incident | null;
  recommendations: Recommendation[];
}

export function useIncident(pollIntervalMs = 5000) {
  const { data, loading, error } = usePolling<IncidentData>(
    async () => {
      const [incRes, recRes] = await Promise.all([
        fetch(`${API_BASE}/incident/current`),
        fetch(`${API_BASE}/incident/recommendations`),
      ]);
      if (!incRes.ok || !recRes.ok) {
        throw new Error(
          `API error: incident ${incRes.status}, recommendations ${recRes.status}`
        );
      }
      return {
        incident: await incRes.json(),
        recommendations: await recRes.json(),
      };
    },
    { intervalMs: pollIntervalMs }
  );

  return {
    incident: data?.incident ?? null,
    recommendations: data?.recommendations ?? [],
    loading,
    error,
  };
}
