import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-10 border-b border-border pb-8", className)}>
      <h1 className="text-3xl font-semibold tracking-tighter md:text-4xl lg:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-2xl text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
