import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function RecommendationList({ recommendations }) {
    return (_jsxs("div", { style: cardStyle, children: [_jsx("h3", { style: { fontSize: 15, margin: "0 0 12px" }, children: "Ranked Course of Action" }), recommendations.map((rec) => (_jsxs("div", { style: recStyle, children: [_jsxs("div", { style: { color: "var(--accent)", fontWeight: 700, fontSize: 13 }, children: ["#", rec.rank] }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: 14, fontWeight: 600 }, children: rec.label }), _jsx("div", { style: { color: "var(--muted)", fontSize: 12, marginTop: 2 }, children: rec.rationale }), _jsxs("div", { style: { color: "var(--muted)", fontSize: 11, marginTop: 4 }, children: ["Confidence: ", rec.confidence] })] })] }, rec.id)))] }));
}
const cardStyle = {
    padding: 16, borderRadius: 16, border: "1px solid var(--line)", background: "var(--panel)",
};
const recStyle = {
    display: "grid", gridTemplateColumns: "40px 1fr", gap: 8,
    padding: 12, borderRadius: 12, border: "1px solid var(--line)",
    background: "#16212d", marginBottom: 8,
};
