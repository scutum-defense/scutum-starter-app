import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function AuditTrail({ entries, loading }) {
    if (loading)
        return null;
    return (_jsxs("div", { style: cardStyle, children: [_jsx("h3", { style: { fontSize: 15, margin: "0 0 12px" }, children: "Audit Trail" }), entries.map((entry) => (_jsxs("div", { style: entryStyle, children: [_jsx("div", { style: { fontSize: 13 }, children: entry.action }), _jsxs("div", { style: { color: "var(--muted)", fontSize: 11 }, children: [entry.timestamp, " \u00B7 ", entry.actor, entry.policyLabel && ` · ${entry.policyLabel}`] })] }, entry.id)))] }));
}
const cardStyle = {
    padding: 16, borderRadius: 16, border: "1px solid var(--line)", background: "var(--panel)", marginTop: 16,
};
const entryStyle = {
    padding: 10, borderRadius: 10, border: "1px solid var(--line)",
    background: "#16212d", marginBottom: 6,
};
