"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const CYCLE: Record<string, string> = { dark: "light", light: "chaos", chaos: "dark" };

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

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="size-9" />;

  const current = resolvedTheme ?? "dark";

  return (
    <button
      aria-label={`Switch theme (current: ${LABELS[current] ?? current})`}
      onClick={() => setTheme(CYCLE[current] ?? "dark")}
      className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
    >
      {ICONS[current] ?? <Moon className="size-4" />}
    </button>
  );
}
