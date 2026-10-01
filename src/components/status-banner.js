import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function StatusBanner({ loading, error }) {
    if (loading) {
        return _jsx("div", { style: bannerStyle, children: "Connecting to Scutum platform..." });
    }
    if (error) {
        return _jsxs("div", { style: { ...bannerStyle, borderColor: "#c96c6c", color: "#c96c6c" }, children: ["Connection error: ", error] });
    }
    return _jsx("div", { style: { ...bannerStyle, borderColor: "#67b587", color: "#67b587" }, children: "Connected to Scutum platform" });
}
const bannerStyle = {
    padding: "12px 16px",
    borderRadius: 12,
    border: "1px solid var(--line)",
    background: "var(--panel)",
    fontSize: 14,
};
