import type { AuditEntry } from "../hooks/use-audit";

export function AuditTrail({ entries, loading }: { entries: AuditEntry[]; loading: boolean }) {
  if (loading) return null;
  return (
    <div style={cardStyle}>
      <h3 style={{ fontSize: 15, margin: "0 0 12px" }}>Audit Trail</h3>
      {entries.map((entry) => (
        <div key={entry.id} style={entryStyle}>
          <div style={{ fontSize: 13 }}>{entry.action}</div>
          <div style={{ color: "var(--muted)", fontSize: 11 }}>
            {entry.timestamp} · {entry.actor}
            {entry.policyLabel && ` · ${entry.policyLabel}`}
          </div>
        </div>
      ))}
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  padding: 16, borderRadius: 16, border: "1px solid var(--line)", background: "var(--panel)", marginTop: 16,
};

const entryStyle: React.CSSProperties = {
  padding: 10, borderRadius: 10, border: "1px solid var(--line)",
  background: "#16212d", marginBottom: 6,
};
