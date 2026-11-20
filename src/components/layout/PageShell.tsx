import { ForgedLine } from "@/components/ui/ForgedLine";

type PageShellProps = {
  title: string;
};

export function PageShell({ title }: PageShellProps) {
  return (
    <main className="section-tight">
      <div className="layout-shell-wide">
        <h1 className="type-heading"><ForgedLine text={title} /></h1>
      </div>
    </main>
  );
}
