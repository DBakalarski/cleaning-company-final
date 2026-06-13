export function SectionEyebrow({
  label,
  centered = false,
}: {
  label: string;
  centered?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-px w-7 bg-accent" />
      <span className="font-heading text-xs font-semibold uppercase tracking-[2.5px] text-accent">
        {label}
      </span>
      {centered && <span className="h-px w-7 bg-accent" />}
    </div>
  );
}
