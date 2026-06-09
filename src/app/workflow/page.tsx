import { ContentCard } from "@/components/shared/content-card";
import { SectionHeader } from "@/components/shared/section-header";
import { getAllWorkflows } from "@/lib/data-access";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Workflow AI",
  description:
    "Template workflow AI praktis untuk ASN, UMKM, content creator, dan developer.",
  path: "/workflow",
});

export default function WorkflowListPage() {
  const workflows = getAllWorkflows();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        title="Workflow AI"
        description="Langkah demi langkah — dari ide hingga implementasi nyata"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {workflows.map((workflow) => (
          <ContentCard key={workflow.slug} item={workflow} />
        ))}
      </div>
    </div>
  );
}
