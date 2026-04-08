import type { Incident } from "../hooks/use-incident";

export function IncidentCard({ incident }: { incident: Incident }) {
  return (
    <div style={cardStyle}>
      <h2 style={{ fontSize: 16, margin: "0 0 8px" }}>{incident.title}</h2>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <span style={badgeStyle}>Severity: {incident.severity}</span>
        <span style={badgeStyle}>Confidence: {incident.confidence}</span>
        <span style={badgeStyle}>Status: {incident.status}</span>
      </div>
      <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 8 }}>
        Affected assets: {incident.affectedAssetIds.join(", ")}
      </p>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  padding: 16, borderRadius: 16, border: "1px solid var(--line)",
  background: "var(--panel)", marginBottom: 16,
};

const badgeStyle: React.CSSProperties = {
  padding: "4px 10px", borderRadius: 999, background: "#16212d",
  border: "1px solid var(--line)", color: "var(--accent)", fontSize: 12,
};
