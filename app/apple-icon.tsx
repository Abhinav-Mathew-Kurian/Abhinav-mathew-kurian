import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#121316",
          border: "6px solid #3E5C68",
          borderRadius: 28,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 100 100">
          <g stroke="#C98A3E" strokeWidth="5" strokeLinecap="round">
            <line x1="50" y1="22" x2="50" y2="36" />
            <line x1="50" y1="64" x2="50" y2="78" />
            <line x1="22" y1="50" x2="36" y2="50" />
            <line x1="64" y1="50" x2="78" y2="50" />
          </g>
          <circle cx="50" cy="50" r="13" fill="#EAE6DC" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
