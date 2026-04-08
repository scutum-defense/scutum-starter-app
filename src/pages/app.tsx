import { useIncident } from "../hooks/use-incident";
import { useAudit } from "../hooks/use-audit";
import { IncidentCard } from "../components/incident-card";
import { RecommendationList } from "../components/recommendation-list";
import { AuditTrail } from "../components/audit-trail";
import { StatusBanner } from "../components/status-banner";

export function App() {
  const { incident, recommendations, loading: incidentLoading, error: incidentError } = useIncident();
  const { entries, loading: auditLoading } = useAudit();

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: 24 }}>
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--accent)" }}>Scutum Starter App</h1>
        <p style={{ color: "var(--muted)", fontSize: 14 }}>
          React template for building on the Scutum Command Platform
        </p>
      </header>

      <StatusBanner loading={incidentLoading} error={incidentError} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
        <div>
          {incident && <IncidentCard incident={incident} />}
          {entries.length > 0 && <AuditTrail entries={entries} loading={auditLoading} />}
        </div>
        <div>
          {recommendations.length > 0 && <RecommendationList recommendations={recommendations} />}
        </div>
      </div>
    </div>
  );
}
