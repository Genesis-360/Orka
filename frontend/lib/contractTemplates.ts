// frontend/lib/contractTemplates.ts
// Block-based contract template generation.

type Block = {
  type: string;
  props?: Record<string, unknown>;
  content?: { type: string; text: string; styles?: Record<string, boolean> }[];
};

function heading(text: string, level = 1): Block {
  return {
    type: "heading",
    props: { level },
    content: [{ type: "text", text }],
  };
}

function paragraph(text: string): Block {
  return {
    type: "paragraph",
    content: [{ type: "text", text }],
  };
}

function bullet(text: string): Block {
  return {
    type: "bulletListItem",
    content: [{ type: "text", text }],
  };
}

function numbered(text: string): Block {
  return {
    type: "numberedListItem",
    content: [{ type: "text", text }],
  };
}

// Normalizes blocks stored with the old format (content items missing `type: "text"`)
// so BlockNote v0.52 can parse them without throwing "Error creating document".
export function normalizeBlocks(blocks: unknown[]): unknown[] {
  if (!Array.isArray(blocks)) return blocks;
  return blocks.map((b: unknown) => {
    if (!b || typeof b !== "object") return b;
    const block = { ...(b as Record<string, unknown>) };
    if (Array.isArray(block.content)) {
      block.content = block.content.map((c: unknown) => {
        if (c && typeof c === "object" && "text" in (c as Record<string, unknown>) && !("type" in (c as Record<string, unknown>))) {
          return { ...(c as Record<string, unknown>), type: "text" };
        }
        return c;
      });
    }
    if (Array.isArray(block.children)) {
      block.children = normalizeBlocks(block.children);
    }
    return block;
  });
}

// Default proposal template — used when creating a new proposal from scratch.
export const PROPOSAL_TEMPLATE: Block[] = [
  heading("Proposal", 1),
  paragraph("Project overview and scope of work."),
  heading("Deliverables", 2),
  paragraph("List of deliverables to be completed."),
  heading("Timeline", 2),
  paragraph("Estimated project timeline."),
  heading("Pricing", 2),
  paragraph("Cost breakdown and payment terms."),
];

type ContractTemplateData = {
  projectName: string;
  orgName: string;
  clientName: string;
  amount: string;
  asset: string;
  deliverables: string[];
  milestoneCount: number;
  today: string;
};

export function buildContractTemplate(data: ContractTemplateData): Block[] {
  const deliverableLines =
    data.deliverables.length > 0
      ? data.deliverables.map((d) => bullet(d))
      : [bullet("Scope of work to be defined")];

  return [
    heading("Service Agreement", 1),
    paragraph(
      `This Service Agreement ("Agreement") is entered into as of ${data.today} between ${data.orgName} ("Agency") and ${data.clientName} ("Client") for the project "${data.projectName}".`
    ),

    heading("Scope of Work", 2),
    paragraph("The Agency agrees to provide the following deliverables:"),
    ...deliverableLines,

    heading("Payment Terms", 2),
    paragraph(
      data.amount
        ? `Total project cost: ${data.amount} ${data.asset}.`
        : `Payment amount to be determined.`
    ),
    paragraph(
      data.milestoneCount > 0
        ? `Payments will be released upon completion of ${data.milestoneCount} milestones as defined in the escrow agreement.`
        : "Milestone-based payments will be defined separately."
    ),

    heading("Timeline", 2),
    paragraph("Project timeline and deadlines will be defined in the milestone plan."),

    heading("Terms", 2),
    numbered("This Agreement is governed by the terms set forth in the ORKA platform."),
    numbered("All disputes shall be resolved through the platform's dispute resolution process."),
    numbered("Either party may terminate this Agreement with written notice."),
  ];
}
