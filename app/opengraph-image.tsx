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
            <svg width="52" height="52" viewBox="0 0 100 100">
              <g stroke="#C98A3E" strokeWidth="5" strokeLinecap="round">
                <line x1="50" y1="22" x2="50" y2="36" />
                <line x1="50" y1="64" x2="50" y2="78" />
                <line x1="22" y1="50" x2="36" y2="50" />
                <line x1="64" y1="50" x2="78" y2="50" />
              </g>
              <circle cx="50" cy="50" r="13" fill="#EAE6DC" />
            </svg>
          </div>
          <div style={{ fontSize: 54, fontWeight: 600, letterSpacing: -1 }}>
            {SITE.name}
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
