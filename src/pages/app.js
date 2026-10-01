import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useIncident } from "../hooks/use-incident";
import { useAudit } from "../hooks/use-audit";
import { IncidentCard } from "../components/incident-card";
import { RecommendationList } from "../components/recommendation-list";
import { AuditTrail } from "../components/audit-trail";
import { StatusBanner } from "../components/status-banner";
export function App() {
    const { incident, recommendations, loading: incidentLoading, error: incidentError } = useIncident();
    const { entries, loading: auditLoading } = useAudit();
    return (_jsxs("div", { style: { maxWidth: 960, margin: "0 auto", padding: 24 }, children: [_jsxs("header", { style: { marginBottom: 32 }, children: [_jsx("h1", { style: { fontSize: 24, fontWeight: 700, color: "var(--accent)" }, children: "Scutum Starter App" }), _jsx("p", { style: { color: "var(--muted)", fontSize: 14 }, children: "React template for building on the Scutum Command Platform" })] }), _jsx(StatusBanner, { loading: incidentLoading, error: incidentError }), _jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }, children: [_jsxs("div", { children: [incident && _jsx(IncidentCard, { incident: incident }), entries.length > 0 && _jsx(AuditTrail, { entries: entries, loading: auditLoading })] }), _jsx("div", { children: recommendations.length > 0 && _jsx(RecommendationList, { recommendations: recommendations }) })] })] }));
}
