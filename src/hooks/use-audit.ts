import { useState, useEffect } from "react";

export interface AuditEntry {
  id: string;
  actor: string;
  action: string;
  timestamp: string;
  policyLabel?: string;
}

const API_BASE = import.meta.env.VITE_SCUTUM_API ?? "http://localhost:4000";

export function useAudit() {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/audit`)
      .then((res) => res.ok ? res.json() : [])
      .then(setEntries)
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, []);

  return { entries, loading };
}
