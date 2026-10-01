import { usePolling } from "./use-polling";
const API_BASE = import.meta.env.VITE_SCUTUM_API ?? "http://localhost:4000";
export function useAudit(pollIntervalMs = 10000) {
    const { data, loading, error } = usePolling(async () => {
        const res = await fetch(`${API_BASE}/audit`);
        if (!res.ok)
            throw new Error(`API error: ${res.status}`);
        return res.json();
    }, { intervalMs: pollIntervalMs });
    return { entries: data ?? [], loading, error };
}
