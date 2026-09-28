import { ImageResponse } from "next/og";
import { school } from "@/lib/site";

export const alt = `${school.name} — Preschool & Day Care in Appa Garden, Bangalore`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "58px 70px", background: "#FFF8F0", color: "#1A1A2E", borderBottom: "18px solid #FF6B35" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 82, height: 82, borderRadius: 22, background: "#1A1A2E", color: "#FFF8F0", fontSize: 30, fontWeight: 700 }}>SSV</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 24, color: "#55556A" }}><span>Preschool &amp; Day Care</span><span>{school.street}, {school.city}</span></div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>Sairam Sanskruthi</div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>Vidhyalaya</div>
        <div style={{ fontSize: 32, marginTop: 22, color: "#B93561" }}>Where play meets culture.</div>
      </div>
      <div style={{ display: "flex", fontSize: 25, borderTop: "1px solid #DAD0C6", paddingTop: 24 }}>Play Group · Nursery · LKG · UKG · Day Care</div>
    </div>, size,
  );
}
