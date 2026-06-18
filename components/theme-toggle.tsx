"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Waves, Trees, Dices } from "lucide-react";
import { useEffect, useState } from "react";

// Fixed theme cycle — chaos is dice-only
const CYCLE: Record<string, string> = {
  dark: "light",
  light: "ocean",
  ocean: "forest",
  forest: "dark",
  chaos: "dark",
};

const ICONS: Record<string, React.ReactNode> = {
  dark:   <Moon className="size-4" />,
  light:  <Sun className="size-4" />,
  ocean:  <Waves className="size-4" />,
  forest: <Trees className="size-4" />,
  chaos:  <Dices className="size-4" />,
};

const LABELS: Record<string, string> = {
  dark:   "Dark",
  light:  "Light",
  ocean:  "Ocean",
  forest: "Forest",
  chaos:  "Chaos",
};

// ─── Random chaos style presets ─────────────────────────────────────────────

const CHAOS_PROPS = [
  "--background", "--foreground", "--card", "--card-foreground",
  "--popover", "--popover-foreground", "--primary", "--primary-foreground",
  "--secondary", "--secondary-foreground", "--muted", "--muted-foreground",
  "--accent", "--accent-foreground", "--destructive", "--border", "--input",
  "--ring", "--signal", "--blueline", "--ink", "--paper", "--graphite", "--grid-line",
];

function r(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hsl(h: number, s: number, l: number) {
  return `hsl(${h} ${s}% ${l}%)`;
}

function buildPalette(
  bgH: number, bgS: number, bgL: number,
  fgH: number, fgS: number, fgL: number,
  primaryH: number, primaryS: number, primaryL: number,
  accentH: number, accentS: number, accentL: number,
  dark: boolean,
): Record<string, string> {
  const bg      = hsl(bgH, bgS, bgL);
  const fg      = hsl(fgH, fgS, fgL);
  const primary = hsl(primaryH, primaryS, primaryL);
  const accent  = hsl(accentH, accentS, accentL);
  const primaryFg = dark ? "hsl(0 0% 100%)" : "hsl(0 0% 0%)";
  const card    = hsl(bgH, Math.round(bgS * 0.75), dark ? Math.min(bgL + 5, 30) : Math.max(bgL - 4, 70));
  const secondary = hsl(bgH, Math.round(bgS * 0.5), dark ? Math.min(bgL + 9, 35) : Math.max(bgL - 8, 65));
  const mutedFg = hsl((bgH + 40) % 360, 25, dark ? 55 : 42);
  const border  = dark ? "hsl(0 0% 100% / 14%)" : "hsl(0 0% 0% / 11%)";

  return {
    "--background": bg, "--foreground": fg,
    "--card": card, "--card-foreground": fg,
    "--popover": card, "--popover-foreground": fg,
    "--primary": primary, "--primary-foreground": primaryFg,
    "--secondary": secondary, "--secondary-foreground": fg,
    "--muted": secondary, "--muted-foreground": mutedFg,
    "--accent": accent, "--accent-foreground": dark ? "hsl(0 0% 0%)" : "hsl(0 0% 100%)",
    "--destructive": "hsl(0 88% 55%)",
    "--border": border, "--input": border, "--ring": primary,
    "--signal": primary, "--blueline": accent,
    "--ink": fg, "--paper": bg, "--graphite": mutedFg,
    "--grid-line": `hsl(${primaryH} 80% 50% / 0.07)`,
  };
}

type StylePreset = { name: string; generate: () => Record<string, string> };

const PRESETS: StylePreset[] = [
  {
    name: "Synthwave",
    generate: () => buildPalette(
      r(265, 285), r(75, 95), r(5, 16),
      r(265, 285), r(25, 40), r(85, 95),
      r(320, 345), 95, r(55, 65),
      r(175, 200), 90, r(55, 65),
      true,
    ),
  },
  {
    name: "Pastel",
    generate: () => {
      const h = r(0, 360);
      return buildPalette(
        h, r(25, 45), r(88, 96),
        h, r(10, 20), r(12, 22),
        (h + r(120, 180)) % 360, r(55, 75), r(45, 60),
        (h + r(60, 100)) % 360, r(50, 70), r(50, 65),
        false,
      );
    },
  },
  {
    name: "Matrix",
    generate: () => buildPalette(
      120, r(5, 15), r(3, 9),
      120, r(85, 100), r(55, 68),
      120, 95, r(55, 65),
      140, r(75, 90), r(45, 58),
      true,
    ),
  },
  {
    name: "Sunset",
    generate: () => buildPalette(
      r(18, 30), r(55, 75), r(8, 18),
      r(25, 35), r(15, 28), r(88, 96),
      r(12, 25), 90, r(55, 65),
      r(340, 360), r(80, 95), r(58, 68),
      true,
    ),
  },
  {
    name: "Candy",
    generate: () => {
      const h = r(0, 360);
      return buildPalette(
        h, r(40, 60), r(90, 97),
        (h + 180) % 360, r(30, 50), r(10, 20),
        (h + r(100, 150)) % 360, 90, r(45, 58),
        (h + r(200, 260)) % 360, 85, r(48, 60),
        false,
      );
    },
  },
  {
    name: "Cyberpunk",
    generate: () => buildPalette(
      r(220, 245), r(35, 55), r(4, 13),
      0, 0, r(90, 97),
      r(42, 55), r(95, 100), r(52, 62),
      r(205, 220), 95, r(55, 65),
      true,
    ),
  },
  {
    name: "Vaporwave",
    generate: () => buildPalette(
      r(295, 315), r(60, 80), r(10, 20),
      r(300, 310), r(35, 50), r(87, 95),
      r(315, 340), r(85, 100), r(58, 70),
      r(168, 185), r(78, 92), r(52, 64),
      true,
    ),
  },
  {
    name: "Coffee",
    generate: () => buildPalette(
      r(22, 35), r(35, 55), r(9, 18),
      r(30, 38), r(35, 50), r(86, 94),
      r(28, 38), r(78, 92), r(48, 58),
      r(18, 28), r(55, 70), r(35, 48),
      true,
    ),
  },
  {
    name: "Arctic",
    generate: () => buildPalette(
      r(200, 220), r(40, 60), r(88, 96),
      r(210, 225), r(15, 28), r(10, 20),
      r(195, 215), r(75, 92), r(40, 55),
      r(220, 240), r(65, 82), r(45, 58),
      false,
    ),
  },
  {
    name: "Lava",
    generate: () => buildPalette(
      r(0, 12), r(60, 80), r(6, 15),
      r(20, 35), r(20, 35), r(88, 96),
      r(5, 18), 95, r(52, 62),
      r(25, 40), r(90, 100), r(50, 62),
      true,
    ),
  },
];

function randomPreset(): Record<string, string> {
  const preset = PRESETS[Math.floor(Math.random() * PRESETS.length)];
  return preset.generate();
}

export function applyChaosCss() {
  const colors = randomPreset();
  Object.entries(colors).forEach(([k, v]) =>
    document.documentElement.style.setProperty(k, v)
  );
}

function clearChaosCss() {
  CHAOS_PROPS.forEach((k) => document.documentElement.style.removeProperty(k));
}

// ─── Components ─────────────────────────────────────────────────────────────

export function ChaosButton() {
  const { setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="size-9" />;

  return (
    <button
      aria-label="Random chaos theme"
      onClick={() => { applyChaosCss(); setTheme("chaos"); }}
      className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      <Dices className="size-4" />
    </button>
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (resolvedTheme === "chaos") applyChaosCss();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return <div className="size-9" />;

  const current = resolvedTheme ?? "dark";
  const next = CYCLE[current] ?? "dark";

  function handleClick() {
    clearChaosCss();
    setTheme(next);
  }

  return (
    <button
      aria-label={`Theme: ${LABELS[current] ?? current} — click for ${LABELS[next] ?? next}`}
      onClick={handleClick}
      className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      {ICONS[current] ?? <Moon className="size-4" />}
    </button>
  );
}
