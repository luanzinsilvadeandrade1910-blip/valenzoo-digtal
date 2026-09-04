import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isNight = theme === "night";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isNight}
      aria-label={`Alternar para tema ${isNight ? "Clear" : "Night"}`}
      onClick={toggle}
      className={cn(
        "group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full cursor-pointer",
        className,
      )}
    >
      <span className={cn("transition-colors", !isNight && "text-foreground")}>Clear</span>
      <span className="relative h-5 w-9 rounded-full border border-border bg-secondary">
        <span
          className={cn(
            "absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-foreground transition-all duration-300",
            isNight ? "left-[calc(100%-0.9rem)]" : "left-0.5",
          )}
        />
      </span>
      <span className={cn("transition-colors", isNight && "text-foreground")}>Night</span>
    </button>
  );
}
