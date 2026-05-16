import { cn } from "@/app/lib/utils"; 

interface Props {
  value: number; // 0–100
  showLabel?: boolean;
  size?: "sm" | "md";
}

export function TaskProgressBar({ value, showLabel = true, size = "md" }: Props) {
  const clamped = Math.min(100, Math.max(0, value));
  const color =
    clamped === 100 ? "bg-emerald-500" :
    clamped >= 70   ? "bg-blue-500" :
    clamped >= 40   ? "bg-amber-500" :
                      "bg-red-400";

  return (
    <div className="flex items-center gap-2 w-full">
      <div className={cn("flex-1 bg-muted rounded-full overflow-hidden", size === "sm" ? "h-1" : "h-1.5")}>
        <div
          className={cn("h-full rounded-full transition-all duration-500", color)}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs tabular-nums text-muted-foreground w-8 text-right shrink-0">
          {clamped}%
        </span>
      )}
    </div>
  );
}