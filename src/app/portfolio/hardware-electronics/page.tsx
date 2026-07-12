import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hardware & Electronics | Shivesh Mohamed",
  description: "Hardware and electronics projects by Shivesh Mohamed — Arduino, Raspberry Pi, and embedded systems.",
};

export default function HardwareElectronicsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "12px" }}>
      <h1 style={{ fontSize: "40px", fontWeight: 900, color: "#ffffff", letterSpacing: "-1px" }}>Hardware &amp; Electronics</h1>
      <p style={{ color: "var(--ink-muted)", fontSize: "16px" }}>Coming soon.</p>
    </div>
  );
}
