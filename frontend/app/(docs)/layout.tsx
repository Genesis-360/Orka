import DocsShell from "@/components/docs/DocsShell";
import { DocsProgressProvider } from "@/lib/docs/progress";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocsProgressProvider>
      <DocsShell>{children}</DocsShell>
    </DocsProgressProvider>
  );
}
