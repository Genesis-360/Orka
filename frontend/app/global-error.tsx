"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#082033",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "4rem",
              fontWeight: 900,
              letterSpacing: "0.02em",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            5<span style={{ color: "#ff4f42" }}>0</span>0
          </p>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#ff4f42",
              margin: "0 0 8px",
              fontFamily: "monospace",
            }}
          >
            {error.digest ? `error_${error.digest}` : "system_error · unexpected"}
          </p>
          <h1
            style={{
              fontSize: "1.4rem",
              margin: "16px 0 8px",
              textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}
          >
            The chain hit a snag.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: 420, lineHeight: 1.6 }}>
            Something went wrong on our side. Try again — or report it on our
            Discord so we can fix it fast.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24 }}>
            <button
              onClick={reset}
              style={{
                background: "#eaff35",
                color: "#082033",
                border: "none",
                borderRadius: 999,
                padding: "12px 24px",
                fontWeight: 800,
                textTransform: "uppercase",
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <Link
              href="/"
              style={{
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 999,
                padding: "12px 24px",
                fontWeight: 800,
                textTransform: "uppercase",
                fontSize: 13,
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Back to ORKA
            </Link>
            <a
              href="https://discord.gg/KbW5pPCDyY"
              style={{
                border: "1px solid rgba(148,116,255,0.6)",
                background: "rgba(148,116,255,0.12)",
                borderRadius: 999,
                padding: "12px 24px",
                fontWeight: 800,
                textTransform: "uppercase",
                fontSize: 13,
                color: "#9474ff",
                textDecoration: "none",
              }}
            >
              Join Discord
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}