import { Metadata } from "next";
import {
  ListPageLayout,
  ListPageHeader,
  CTASection,
  SensemakingSection,
  CategoryContent,
} from "@/components/layouts";
import { research } from "@/content/research";
import SectionHeader from "@/components/ui/SectionHeader";
import { pageSeo } from "@/lib/page-seo";

export const metadata: Metadata = pageSeo.research;

export default function ResearchPage() {
  return (
    <ListPageLayout>
      <ListPageHeader
        title="Research & Trends"
        description="Analysis, reports, or trend pieces"
      />

      <SensemakingSection category="research" />

      <section className="mb-16 md:mb-24 mt-3">
        <div className="container-page">
          <SectionHeader title="All Research" subtitle="" />
          <CategoryContent items={research} type="research" itemLabel="articles" />
        </div>
      </section>

      <CTASection
        title="Contribute Research"
        description="Have insights to share? Submit original analysis, reports, or trend pieces. We maintain a high bar — only well-researched submissions are accepted."
        buttonText="Submit Research"
        buttonHref="/submit?type=research"
      />
    </ListPageLayout>
  );
}
