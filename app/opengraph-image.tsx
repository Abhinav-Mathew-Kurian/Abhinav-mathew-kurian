import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#121316",
          color: "#EAE6DC",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 14,
              background: "#121316",
              border: "3px solid #3E5C68",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: 56, fontWeight: 700, color: "#C98A3E", lineHeight: 1 }}>
              A
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 54, fontWeight: 600, letterSpacing: -1 }}>
            <span style={{ color: "#C98A3E" }}>A</span>
            <span>{SITE.name.slice(1)}</span>
          </div>
        </div>

        <div
          style={{
            marginTop: 30,
            fontSize: 24,
            color: "#84817A",
            letterSpacing: 5,
            textTransform: "uppercase",
          }}
        >
          {SITE.role}
        </div>

        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 18,
            fontSize: 16,
            color: "#3E5C68",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <span>ZK Proofs</span>
          <span>·</span>
          <span>Graph DB</span>
          <span>·</span>
          <span>Vector Search</span>
          <span>·</span>
          <span>PKI</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
