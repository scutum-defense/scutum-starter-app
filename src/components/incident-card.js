import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function IncidentCard({ incident }) {
    return (_jsxs("div", { style: cardStyle, children: [_jsx("h2", { style: { fontSize: 16, margin: "0 0 8px" }, children: incident.title }), _jsxs("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" }, children: [_jsxs("span", { style: badgeStyle, children: ["Severity: ", incident.severity] }), _jsxs("span", { style: badgeStyle, children: ["Confidence: ", incident.confidence] }), _jsxs("span", { style: badgeStyle, children: ["Status: ", incident.status] })] }), _jsxs("p", { style: { color: "var(--muted)", fontSize: 13, marginTop: 8 }, children: ["Affected assets: ", incident.affectedAssetIds.join(", ")] })] }));
}
const cardStyle = {
    padding: 16, borderRadius: 16, border: "1px solid var(--line)",
    background: "var(--panel)", marginBottom: 16,
};
const badgeStyle = {
    padding: "4px 10px", borderRadius: 999, background: "#16212d",
    border: "1px solid var(--line)", color: "var(--accent)", fontSize: 12,
};
