import { publishContent } from "./publish-content";
import type { IssueMetadata } from "../src/lib/parse-issue";

const issueNumber = process.argv[2];

if (!issueNumber) {
  console.error("Usage: npx tsx scripts/publish-research.ts <issue-number>");
  process.exit(1);
}

publishContent("research", issueNumber, {
  addCustomFrontmatter: (_customData, metadata) => {
    const m = metadata as unknown as IssueMetadata;
    const lines: string[] = [];
    if (m.sensemakingFor) {
      lines.push(`sensemakingFor: ${m.sensemakingFor}`);
    }
    if (m.researchType) lines.push(`researchType: ${m.researchType}`);

    return lines.join("\n");
  },
}).catch(console.error);
