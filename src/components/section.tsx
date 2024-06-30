import { cn } from "@/utils/cn";

interface SectionProps {
  className?: string;
  children: React.ReactNode;
}

export function Section({ className, children }: SectionProps) {
  return (
    <section className={cn("container mx-auto px-8", className)}>
      {children}
    </section>
  );
}
