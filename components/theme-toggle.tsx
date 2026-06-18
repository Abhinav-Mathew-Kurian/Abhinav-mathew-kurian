"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Sparkles, Dices } from "lucide-react";
import { useEffect, useState } from "react";

const CYCLE: Record<string, string> = { dark: "light", light: "chaos", chaos: "dark" };

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

function generateChaos(): Record<string, string> {
  const bgHue = r(0, 360);
  const dark = Math.random() > 0.5;
  const bgS = r(40, 90);
  const bgL = dark ? r(4, 18) : r(82, 96);
  const fgL = dark ? r(85, 97) : r(3, 15);

  const primaryHue = r(0, 360);
  const accentHue = (primaryHue + r(90, 270)) % 360;

  const bg = `hsl(${bgHue} ${bgS}% ${bgL}%)`;
  const fg = `hsl(${(bgHue + 20) % 360} ${r(5, 25)}% ${fgL}%)`;
  const primary = `hsl(${primaryHue} 90% ${dark ? 60 : 50}%)`;
  const primaryFg = `hsl(0 0% ${dark ? 100 : 0}%)`;
  const card = `hsl(${bgHue} ${Math.round(bgS * 0.7)}% ${dark ? Math.min(bgL + 5, 30) : Math.max(bgL - 5, 70)}%)`;
  const secondary = `hsl(${bgHue} ${Math.round(bgS * 0.5)}% ${dark ? Math.min(bgL + 8, 35) : Math.max(bgL - 8, 65)}%)`;
  const mutedFg = `hsl(${(bgHue + 40) % 360} 30% ${dark ? 55 : 45}%)`;
  const accent = `hsl(${accentHue} 85% ${dark ? 60 : 50}%)`;
  const border = dark ? "hsl(0 0% 100% / 15%)" : "hsl(0 0% 0% / 12%)";

  return {
    "--background": bg,
    "--foreground": fg,
    "--card": card,
    "--card-foreground": fg,
    "--popover": card,
    "--popover-foreground": fg,
    "--primary": primary,
    "--primary-foreground": primaryFg,
    "--secondary": secondary,
    "--secondary-foreground": fg,
    "--muted": secondary,
    "--muted-foreground": mutedFg,
    "--accent": accent,
    "--accent-foreground": `hsl(0 0% ${dark ? 0 : 100}%)`,
    "--destructive": "hsl(0 90% 55%)",
    "--border": border,
    "--input": border,
    "--ring": primary,
    "--signal": primary,
    "--blueline": accent,
    "--ink": fg,
    "--paper": bg,
    "--graphite": mutedFg,
    "--grid-line": `hsl(${primaryHue} 80% 50% / 0.08)`,
  };
}

function applyChaosCss() {
  const colors = generateChaos();
  Object.entries(colors).forEach(([k, v]) =>
    document.documentElement.style.setProperty(k, v)
  );
}

function clearChaosCss() {
  CHAOS_PROPS.forEach((k) => document.documentElement.style.removeProperty(k));
}

const ICONS: Record<string, React.ReactNode> = {
  dark:  <Moon className="size-4" />,
  light: <Sun className="size-4" />,
  chaos: <Sparkles className="size-4" />,
};

const LABELS: Record<string, string> = {
  dark:  "Dark mode",
  light: "Light mode",
  chaos: "Chaos mode",
};

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
    // Fresh random palette if page is loaded/refreshed while in chaos mode
    if (resolvedTheme === "chaos") applyChaosCss();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted) return <div className="size-9" />;

  const current = resolvedTheme ?? "dark";
  const next = CYCLE[current] ?? "dark";

  function handleClick() {
    if (next === "chaos") {
      applyChaosCss();
    } else {
      clearChaosCss();
    }
    setTheme(next);
  }

  return (
    <button
      aria-label={`Switch theme — ${LABELS[current] ?? current}`}
      onClick={handleClick}
      className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      {ICONS[current] ?? <Moon className="size-4" />}
    </button>
  );
}
