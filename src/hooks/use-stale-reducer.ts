import { useCallback, useEffect, useReducer, useRef } from "react";
import type { Reducer } from "react";

export interface StaleState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  /** True when a revalidation is in flight while stale data stays visible. */
  refreshing: boolean;
  /** Epoch ms of the last successful fetch, or null when never updated. */
  lastUpdated: number | null;
}

type StaleAction<T> =
  | { type: "fetch-start" }
  | { type: "fetch-success"; data: T }
  | { type: "fetch-error"; message: string };

export function staleReducer<T>(
  state: StaleState<T>,
  action: StaleAction<T>
): StaleState<T> {
  switch (action.type) {
    case "fetch-start":
      return {
        ...state,
        loading: state.data === null,
        refreshing: true,
      };
    case "fetch-success":
      return {
        ...state,
        data: action.data,
        loading: false,
        refreshing: false,
        error: null,
        lastUpdated: Date.now(),
      };
    case "fetch-error":
      return {
        ...state,
        loading: false,
        refreshing: false,
        error: action.message,
      };
  }
}

export interface StaleWhileRevalidateOptions {
  /** Revalidation interval (ms); default 10s. */
  intervalMs?: number;
  enabled?: boolean;
}

const DEFAULTS = { intervalMs: 10_000, enabled: true };

/**
 * Stale-while-revalidate data hook: keeps the last good data visible while a
 * refresh is in flight and retains it across transient API failures, so the
 * operator's screen never tears down to a blank state during a blip.
 */
export function useStale<T>(
  fetcher: () => Promise<T>,
  options: StaleWhileRevalidateOptions = {}
): StaleState<T> & { refresh: () => void } {
  const { intervalMs, enabled } = { ...DEFAULTS, ...options };
  const [state, dispatch] = useReducer(staleReducer as Reducer<StaleState<T>, StaleAction<T>>, {
    data: null,
    loading: true,
    error: null,
    refreshing: false,
    lastUpdated: null,
  });

  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;

  const refresh = useCallback(async () => {
    dispatch({ type: "fetch-start" });
    try {
      const data = await fetcherRef.current();
      dispatch({ type: "fetch-success", data });
    } catch (err) {
      dispatch({
        type: "fetch-error",
        message: err instanceof Error ? err.message : "Failed to fetch",
      });
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const loop = async () => {
      await refresh();
      if (!cancelled) timer = setTimeout(loop, intervalMs);
    };
    loop();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [enabled, intervalMs, refresh]);

  return { data: state.data, loading: state.loading, error: state.error, refreshing: state.refreshing, lastUpdated: state.lastUpdated, refresh };
}
