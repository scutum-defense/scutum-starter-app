export function StatusBanner({ loading, error }: { loading: boolean; error: string | null }) {
  if (loading) {
    return <div style={bannerStyle}>Connecting to Scutum platform...</div>;
  }
  if (error) {
    return <div style={{ ...bannerStyle, borderColor: "#c96c6c", color: "#c96c6c" }}>Connection error: {error}</div>;
  }
  return <div style={{ ...bannerStyle, borderColor: "#67b587", color: "#67b587" }}>Connected to Scutum platform</div>;
}

const bannerStyle: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 12,
  border: "1px solid var(--line)",
  background: "var(--panel)",
  fontSize: 14,
};
