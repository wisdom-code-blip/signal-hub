import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  tone?: "orange" | "green" | "red" | "zinc";
};

const tones = {
  orange: "border-orange-500/25 bg-orange-500/10 text-orange-300",
  green: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
  red: "border-red-500/25 bg-red-500/10 text-red-300",
  zinc: "border-zinc-700 bg-zinc-900 text-zinc-300"
};

export function Badge({ children, tone = "zinc" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}