export interface DocSection {
  title: string;
  slug: string;
  icon: string;
  color: string;
  description: string;
  businessTip?: string;
  items: DocItem[];
}

export interface DocItem {
  title: string;
  slug: string;
  description?: string;
  tags?: string[];
  businessTip?: string;
  children?: DocItem[];
}

export interface DocMeta {
  title: string;
  description: string;
  category: string;
  order: number;
  icon?: string;
  tags?: string[];
  author?: string;
  lastUpdated?: string;
  featured?: boolean;
  draft?: boolean;
}

export const docsNavigation: DocSection[] = [
  {
    title: "Start Here",
    slug: "start-here",
    icon: "rocket",
    color: "#9474ff",
    description: "Get up and running with Orka in minutes.",
    businessTip: "Complete your workspace setup before adding clients. A professional workspace builds trust.",
    items: [
      {
        title: "Welcome to Orka",
        slug: "welcome-to-orka",
        description: "Your introduction to Orka's AI-powered financial operating system.",
      },
      {
        title: "Why Orka",
        slug: "why-orka",
        description: "Why service businesses choose Orka over traditional tools.",
      },
      {
        title: "Create Workspace",
        slug: "create-workspace",
        description: "Set up your business hub in Orka.",
      },
      {
        title: "Connect Wallet",
        slug: "connect-wallet",
        description: "Connect your Stellar wallet to receive payments.",
      },
      {
        title: "Invite Team",
        slug: "invite-team",
        description: "Bring your team members into Orka.",
      },
      {
        title: "Your First Project",
        slug: "your-first-project",
        description: "Create and deliver your first project end-to-end.",
      },
    ],
  },
  {
    title: "Clients",
    slug: "clients",
    icon: "users",
    color: "#3b82f6",
    description: "Manage your clients and client relationships.",
    businessTip: "Always send a proposal before starting work. It sets clear expectations and builds professionalism.",
    items: [
      {
        title: "Add Client",
        slug: "add-client",
        description: "Add your first client to Orka.",
      },
      {
        title: "Client Profiles",
        slug: "client-profiles",
        description: "View and manage client information.",
      },
      {
        title: "Client Portal",
        slug: "client-portal",
        description: "Give clients a shared view of projects and invoices.",
      },
      {
        title: "Import Clients",
        slug: "import-clients",
        description: "Bulk import clients from CSV or other tools.",
      },
      {
        title: "Permissions",
        slug: "permissions",
        description: "Control what clients can see and do.",
      },
    ],
  },
  {
    title: "Projects",
    slug: "projects",
    icon: "folder",
    color: "#9474ff",
    description: "Manage projects from start to finish.",
    businessTip: "Break large projects into milestones. It improves cash flow and keeps clients engaged.",
    items: [
      {
        title: "Create Project",
        slug: "create-project",
        description: "Set up a new project with details and scope.",
      },
      {
        title: "Milestones",
        slug: "milestones",
        description: "Break projects into trackable milestones.",
      },
      {
        title: "Deliverables",
        slug: "deliverables",
        description: "Define and track deliverables for each milestone.",
      },
      {
        title: "Templates",
        slug: "templates",
        description: "Use project templates to save time.",
      },
      {
        title: "Project Status",
        slug: "project-status",
        description: "Track project progress and health.",
      },
      {
        title: "Files",
        slug: "files",
        description: "Share files with your team and clients.",
      },
    ],
  },
  {
    title: "Payments",
    slug: "payments",
    icon: "wallet",
    color: "#22bd93",
    description: "Get paid faster with invoices and escrow.",
    businessTip: "Ask for a 30–50% advance before starting work. Escrow protects both you and your client.",
    items: [
      {
        title: "Generate Invoice",
        slug: "generate-invoice",
        description: "Create professional invoices in seconds.",
      },
      {
        title: "Escrow",
        slug: "escrow",
        description: "Secure milestone-based payments on Stellar.",
      },
      {
        title: "Release Payments",
        slug: "release-payments",
        description: "Release funds when milestones are approved.",
      },
      {
        title: "Cross-border Payments",
        slug: "cross-border-payments",
        description: "Send and receive payments worldwide.",
      },
      {
        title: "Payment History",
        slug: "payment-history",
        description: "Track all transactions and payment records.",
      },
      {
        title: "Refunds",
        slug: "refunds",
        description: "Handle refunds and disputes gracefully.",
      },
    ],
  },
  {
    title: "AI",
    slug: "ai",
    icon: "sparkles",
    color: "#ff8a22",
    description: "Let AI handle the repetitive work.",
    businessTip: "Use AI to draft proposals, then personalize them. Templates save time without losing authenticity.",
    items: [
      {
        title: "Generate Proposal",
        slug: "generate-proposal",
        description: "Create winning proposals with AI in seconds.",
      },
      {
        title: "AI Contracts",
        slug: "ai-contracts",
        description: "Generate legally-sound contracts automatically.",
      },
      {
        title: "Smart Suggestions",
        slug: "smart-suggestions",
        description: "AI-powered recommendations across Orka.",
      },
      {
        title: "AI Invoice Assistant",
        slug: "ai-invoice-assistant",
        description: "Let AI draft and send invoices for you.",
      },
      {
        title: "Coming Soon",
        slug: "coming-soon",
        description: "What's next for Orka AI.",
      },
    ],
  },
  {
    title: "Team",
    slug: "team",
    icon: "people",
    color: "#3b82f6",
    description: "Collaborate with your team effectively.",
    businessTip: "Start with Admin and Member roles. Add Viewer access for clients who need project visibility.",
    items: [
      {
        title: "Invite Members",
        slug: "invite-members",
        description: "Bring your team into your Orka workspace.",
      },
      {
        title: "Roles",
        slug: "roles",
        description: "Understand admin, member, and viewer roles.",
      },
      {
        title: "Permissions",
        slug: "permissions",
        description: "Control access to projects and features.",
      },
      {
        title: "Activity",
        slug: "activity",
        description: "Track team activity and changes.",
      },
      {
        title: "Approvals",
        slug: "approvals",
        description: "Set up approval workflows for milestones.",
      },
    ],
  },
  {
    title: "Workspace",
    slug: "workspace",
    icon: "settings",
    color: "#5f6b86",
    description: "Customize your workspace settings.",
    businessTip: "Add your logo and brand colors early. It makes invoices and client portals look professional.",
    items: [
      {
        title: "Branding",
        slug: "branding",
        description: "Customize your workspace appearance.",
      },
      {
        title: "Notifications",
        slug: "notifications",
        description: "Configure email and in-app notifications.",
      },
      {
        title: "Integrations",
        slug: "integrations",
        description: "Connect Orka with your favorite tools.",
      },
      {
        title: "Preferences",
        slug: "preferences",
        description: "Set your workspace preferences and defaults.",
      },
      {
        title: "Themes",
        slug: "themes",
        description: "Customize the look and feel of Orka.",
      },
    ],
  },
  {
    title: "Developers",
    slug: "developers",
    icon: "code",
    color: "#22bd93",
    description: "Build on top of Orka's API.",
    businessTip: "Start with the API reference, then explore webhooks for real-time event notifications.",
    items: [
      {
        title: "API",
        slug: "api",
        description: "Orka's REST API reference.",
      },
      {
        title: "Authentication",
        slug: "authentication",
        description: "Authenticate API requests with tokens.",
      },
      {
        title: "SDK",
        slug: "sdk",
        description: "Use Orka's SDK in your application.",
      },
      {
        title: "Webhooks",
        slug: "webhooks",
        description: "Get notified of events in real-time.",
      },
      {
        title: "Examples",
        slug: "examples",
        description: "Code examples and integration guides.",
      },
    ],
  },
  {
    title: "Resources",
    slug: "resources",
    icon: "book",
    color: "#9474ff",
    description: "Helpful resources and references.",
    businessTip: "Check the changelog regularly for new features. Join the community to share feedback.",
    items: [
      {
        title: "FAQ",
        slug: "faq",
        description: "Frequently asked questions.",
      },
      {
        title: "Roadmap",
        slug: "roadmap",
        description: "What we're building next.",
      },
      {
        title: "Changelog",
        slug: "changelog",
        description: "Recent updates and improvements.",
      },
      {
        title: "Support",
        slug: "support",
        description: "Get help from the Orka team.",
      },
      {
        title: "Community",
        slug: "community",
        description: "Join the Orka community.",
      },
      {
        title: "GitHub",
        slug: "github",
        description: "Contribute to Orka on GitHub.",
      },
    ],
  },
];

export function getAllDocSlugs(): string[] {
  const slugs: string[] = [];
  for (const section of docsNavigation) {
    for (const item of section.items) {
      slugs.push(`${section.slug}/${item.slug}`);
      if (item.children) {
        for (const child of item.children) {
          slugs.push(`${section.slug}/${item.slug}/${child.slug}`);
        }
      }
    }
  }
  return slugs;
}

export function getDocBySlug(slug: string): DocItem | undefined {
  const parts = slug.split("/");
  const sectionSlug = parts[0];
  const itemSlug = parts[1];
  const childSlug = parts[2];

  for (const section of docsNavigation) {
    if (section.slug === sectionSlug) {
      for (const item of section.items) {
        if (item.slug === itemSlug) {
          if (!childSlug) return item;
          return item.children?.find((c) => c.slug === childSlug);
        }
      }
    }
  }
  return undefined;
}

export function getSectionBySlug(slug: string): DocSection | undefined {
  const sectionSlug = slug.split("/")[0];
  return docsNavigation.find((s) => s.slug === sectionSlug);
}

export function getParentSlug(slug: string): string | undefined {
  const parts = slug.split("/");
  if (parts.length >= 2) return `${parts[0]}/${parts[1]}`;
  return undefined;
}

export function getAdjacentDocs(slug: string): {
  prev: DocItem | null;
  next: DocItem | null;
} {
  const allItems = docsNavigation.flatMap((section) =>
    section.items.flatMap((item) => {
      const withParent = [item];
      if (item.children) {
        for (const child of item.children) {
          withParent.push({ ...child, slug: `${item.slug}/${child.slug}` });
        }
      }
      return withParent;
    })
  );
  const index = allItems.findIndex((item) => item.slug === slug);
  return {
    prev: index > 0 ? allItems[index - 1] : null,
    next: index < allItems.length - 1 ? allItems[index + 1] : null,
  };
}

export function getSectionForDoc(slug: string): DocSection | undefined {
  const sectionSlug = slug.split("/")[0];
  return docsNavigation.find((s) => s.slug === sectionSlug);
}

export function getRelatedArticles(slug: string, limit = 4): DocItem[] {
  const parts = slug.split("/");
  const sectionSlug = parts[0];
  const section = docsNavigation.find((s) => s.slug === sectionSlug);
  if (!section) return [];

  return section.items
    .filter((item) => {
      const itemPath = `${section.slug}/${item.slug}`;
      return itemPath !== slug;
    })
    .slice(0, limit);
}

export function getBreadcrumbPath(slug: string): { label: string; href: string }[] {
  const parts = slug.split("/");
  const sectionSlug = parts[0];
  const itemSlug = parts[1];
  const section = docsNavigation.find((s) => s.slug === sectionSlug);

  const path: { label: string; href: string }[] = [
    { label: "Docs", href: "/docs" },
  ];

  if (section) {
    path.push({ label: section.title, href: `/docs/${section.slug}` });

    if (itemSlug) {
      const item = section.items.find((i) => i.slug === itemSlug);
      if (item) {
        path.push({ label: item.title, href: `/docs/${section.slug}/${item.slug}` });
      }
    }
  }

  return path;
}

export function getContinueLearning(slug: string): { title: string; slug: string; description?: string }[] {
  const allItems = docsNavigation.flatMap((section) =>
    section.items.map((item) => ({
      title: item.title,
      slug: `${section.slug}/${item.slug}`,
      description: item.description,
    }))
  );

  const currentIndex = allItems.findIndex((item) => item.slug === slug);
  if (currentIndex === -1) return [];

  const next: { title: string; slug: string; description?: string }[] = [];
  for (let i = 1; i <= 4 && currentIndex + i < allItems.length; i++) {
    next.push(allItems[currentIndex + i]);
  }
  return next;
}
