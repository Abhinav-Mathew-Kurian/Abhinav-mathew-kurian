"use client";

import { useEffect, useState } from "react";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Reveals text character-by-character once on mount, with a permanently
 * blinking terminal cursor after it (even once typing finishes — reads
 * as "still live", matching the logo's cursor). Respects
 * prefers-reduced-motion by rendering the full text immediately.
 */
export function Typewriter({
  text,
  speed = 32,
  startDelay = 0,
  className,
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
}) {
  // Lazy initial state — if motion is reduced, start fully revealed so the
  // effect below never needs to animate anything.
  const [count, setCount] = useState(() => (prefersReducedMotion() ? text.length : 0));

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let i = 0;
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setCount(i);
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return (
    <span className={className}>
      <span aria-hidden="true" className="whitespace-pre-line">
        {text.slice(0, count)}
        <span
          className="cursor-blink ml-1 inline-block h-[0.85em] w-[0.4ch] translate-y-[0.05em] align-middle"
          style={{ background: "var(--signal)" }}
        />
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}
