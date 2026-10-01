import { useState, useEffect, useRef } from "react";

export interface PollingOptions {
  intervalMs?: number;
  enabled?: boolean;
}

const DEFAULT_INTERVAL_MS = 5000;

export function usePolling<T>(
  fetcher: () => Promise<T>,
  { intervalMs = DEFAULT_INTERVAL_MS, enabled = true }: PollingOptions = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    async function poll() {
      try {
        const result = await fetcherRef.current();
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to connect");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          timer = setTimeout(poll, intervalMs);
        }
      }
    }

    poll();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [intervalMs, enabled]);

  return { data, loading, error };
}
