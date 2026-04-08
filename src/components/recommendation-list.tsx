import type { Recommendation } from "../hooks/use-incident";

export function RecommendationList({ recommendations }: { recommendations: Recommendation[] }) {
  return (
    <div style={cardStyle}>
      <h3 style={{ fontSize: 15, margin: "0 0 12px" }}>Ranked Course of Action</h3>
      {recommendations.map((rec) => (
        <div key={rec.id} style={recStyle}>
          <div style={{ color: "var(--accent)", fontWeight: 700, fontSize: 13 }}>#{rec.rank}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{rec.label}</div>
            <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 2 }}>{rec.rationale}</div>
            <div style={{ color: "var(--muted)", fontSize: 11, marginTop: 4 }}>Confidence: {rec.confidence}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  padding: 16, borderRadius: 16, border: "1px solid var(--line)", background: "var(--panel)",
};

const recStyle: React.CSSProperties = {
  display: "grid", gridTemplateColumns: "40px 1fr", gap: 8,
  padding: 12, borderRadius: 12, border: "1px solid var(--line)",
  background: "#16212d", marginBottom: 8,
};
