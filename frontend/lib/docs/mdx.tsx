import React from "react";
import {
  Hero,
  OnboardingProgress,
  Checklist,
  CheckItem,
  CardGroup,
  Card,
  Workflow,
  Grid,
  FeatureCard,
  FeatureGrid,
  Feature,
  BusinessTip,
  Figure,
  Accordion,
  AccordionItem,
  RelatedGuides,
  NextStepCard,
  DocsPagination,
  FounderNote,
} from "@/components/docs/DocComponents";

type InlineToken =
  | { type: "text"; value: string }
  | { type: "bold"; value: string }
  | { type: "italic"; value: string }
  | { type: "code"; value: string }
  | { type: "link"; text: string; href: string };

function tokenizeInline(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/^\*\*(.+?)\*\*/);
    const italicMatch = remaining.match(/^\*(.+?)\*/);
    const codeMatch = remaining.match(/^`(.+?)`/);
    const linkMatch = remaining.match(/^\[(.+?)\]\((.+?)\)/);

    const matches: { idx: number; length: number; token: InlineToken }[] = [];
    if (boldMatch)
      matches.push({
        idx: 0,
        length: boldMatch[0].length,
        token: { type: "bold", value: boldMatch[1] },
      });
    if (italicMatch && !boldMatch)
      matches.push({
        idx: 0,
        length: italicMatch[0].length,
        token: { type: "italic", value: italicMatch[1] },
      });
    if (codeMatch)
      matches.push({
        idx: remaining.indexOf(codeMatch[0]),
        length: codeMatch[0].length,
        token: { type: "code", value: codeMatch[1] },
      });
    if (linkMatch)
      matches.push({
        idx: remaining.indexOf(linkMatch[0]),
        length: linkMatch[0].length,
        token: { type: "link", text: linkMatch[1], href: linkMatch[2] },
      });

    const atStart = matches.find((m) => m.idx === 0);
    if (atStart) {
      tokens.push(atStart.token);
      remaining = remaining.slice(atStart.length);
    } else {
      const nextIdx = Math.min(
        ...matches.map((m) => m.idx),
        remaining.length
      );
      if (nextIdx > 0) {
        tokens.push({ type: "text", value: remaining.slice(0, nextIdx) });
        remaining = remaining.slice(nextIdx);
      } else {
        tokens.push({ type: "text", value: remaining });
        break;
      }
    }
  }

  return tokens;
}

function renderInlineTokens(tokens: InlineToken[]): React.ReactNode {
  const elements = tokens.map((t, i) => {
    switch (t.type) {
      case "bold":
        return (
          <strong key={i} className="font-bold text-[#082033]">
            {t.value}
          </strong>
        );
      case "italic":
        return <em key={i}>{t.value}</em>;
      case "code":
        return (
          <code
            key={i}
            className="rounded-md bg-[#9474ff]/10 px-1.5 py-0.5 text-[13px] font-bold text-[#9474ff]"
          >
            {t.value}
          </code>
        );
      case "link":
        return (
          <a
            key={i}
            href={t.href}
            className="font-medium text-[#9474ff] underline decoration-[#9474ff]/30 underline-offset-2 transition-colors hover:decoration-[#9474ff]"
          >
            {t.text}
          </a>
        );
      case "text":
        return t.value;
    }
  });
  return elements.length === 1
    ? elements[0]
    : React.createElement(React.Fragment, null, ...elements);
}

function renderInlineString(text: string): React.ReactNode {
  return renderInlineTokens(tokenizeInline(text));
}

interface Block {
  type:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "p"
    | "ul"
    | "ol"
    | "code"
    | "blockquote"
    | "table"
    | "hr"
    | "empty";
  lines: string[];
  meta?: string;
}

function parseBlocks(lines: string[]): Block[] {
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trimEnd();

    if (trimmed === "") {
      i++;
      continue;
    }

    if (/^#### /.test(trimmed)) {
      blocks.push({
        type: "h4",
        lines: [trimmed.replace(/^#### /, "")],
      });
      i++;
      continue;
    }

    if (/^### /.test(trimmed)) {
      blocks.push({
        type: "h3",
        lines: [trimmed.replace(/^### /, "")],
      });
      i++;
      continue;
    }

    if (/^## /.test(trimmed)) {
      blocks.push({
        type: "h2",
        lines: [trimmed.replace(/^## /, "")],
      });
      i++;
      continue;
    }

    if (/^# /.test(trimmed)) {
      blocks.push({
        type: "h1",
        lines: [trimmed.replace(/^# /, "")],
      });
      i++;
      continue;
    }

    if (/^---+\s*$/.test(trimmed)) {
      blocks.push({ type: "hr", lines: [] });
      i++;
      continue;
    }

    if (/^```/.test(trimmed)) {
      const contentLines: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i].trim())) {
        contentLines.push(lines[i]);
        i++;
      }
      i++;
      blocks.push({ type: "code", lines: contentLines });
      continue;
    }

    if (/^> /.test(trimmed)) {
      const contentLines: string[] = [trimmed.replace(/^> /, "")];
      i++;
      while (i < lines.length && /^> /.test(lines[i].trimStart())) {
        contentLines.push(lines[i].trim().replace(/^> /, ""));
        i++;
      }
      blocks.push({ type: "blockquote", lines: contentLines });
      continue;
    }

    // Table detection: line must contain | and next line should be separator
    if (
      trimmed.includes("|") &&
      i + 1 < lines.length &&
      /^\|?[\s\-:|]+\|/.test(lines[i + 1].trim())
    ) {
      const tableLines: string[] = [trimmed];
      i++;
      while (i < lines.length && lines[i].trim().includes("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }
      blocks.push({ type: "table", lines: tableLines });
      continue;
    }

    if (/^[-*]\s/.test(trimmed)) {
      const items: string[] = [trimmed.replace(/^[-*]\s+/, "")];
      i++;
      while (i < lines.length && /^[-*]\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i++;
      }
      blocks.push({ type: "ul", lines: items });
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const items: string[] = [trimmed.replace(/^\d+\.\s+/, "")];
      i++;
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ type: "ol", lines: items });
      continue;
    }

    // Paragraph: collect consecutive non-empty, non-special lines
    const paraLines: string[] = [trimmed];
    i++;
    while (
      i < lines.length &&
      lines[i].trimEnd() !== "" &&
      !/^#{1,4} /.test(lines[i]) &&
      !/^[-*]\s/.test(lines[i].trim()) &&
      !/^\d+\.\s/.test(lines[i].trim()) &&
      !/^```/.test(lines[i].trim()) &&
      !/^> /.test(lines[i].trim()) &&
      !/^---+\s*$/.test(lines[i].trim()) &&
      !(lines[i].trim().includes("|") && i + 1 < lines.length && /^\|?[\s\-:|]+\|/.test((lines[i + 1] || "").trim()))
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    blocks.push({ type: "p", lines: paraLines });
  }

  return blocks;
}

function parseTableRow(line: string): string[] {
  const cleaned = line.replace(/^\|/, "").replace(/\|$/, "");
  return cleaned.split("|").map((cell) => cell.trim());
}

function tableToId(headerCells: string[]): string {
  return headerCells
    .join(" ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const headingClasses: Record<string, string> = {
  h1: "mb-4 text-[2rem] font-black leading-tight tracking-tight text-[#082033] sm:text-[2.5rem]",
  h2: "mb-4 mt-12 text-[1.5rem] font-black leading-tight text-[#082033] first:mt-0",
  h3: "mb-3 mt-8 text-[1.25rem] font-bold text-[#082033]",
  h4: "mb-2 mt-6 text-[1.1rem] font-bold text-[#082033]",
};

function makeHeading(
  level: "h1" | "h2" | "h3" | "h4",
  text: string,
  key: string | number
): React.ReactNode {
  const id = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const Tag = level;
  return (
    <Tag key={key} id={id} className={headingClasses[level]}>
      {renderInlineString(text)}
    </Tag>
  );
}

export function renderMDX(source: string): React.ReactNode {
  const segments = parseComponents(source);
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    if (seg.type === "component") {
      elements.push(renderComponentBlock(seg.tag, seg.props, seg.children, i));
    } else {
      const lines = seg.text.split("\n");
      const blocks = parseBlocks(lines);
      for (let j = 0; j < blocks.length; j++) {
        const block = blocks[j];
        const key = `${i}-${j}`;
        switch (block.type) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
            elements.push(makeHeading(block.type, block.lines[0], key));
            break;
          case "hr":
            elements.push(
              <hr key={key} className="my-8 border-t border-black/[0.06]" />
            );
            break;
          case "p":
            elements.push(
              <p key={key} className="mb-4 text-[15px] leading-7 text-[#082033]/80">
                {renderInlineString(block.lines.join(" "))}
              </p>
            );
            break;
          case "ul":
            elements.push(
              <ul key={key} className="mb-4 list-disc pl-6 space-y-2 text-[15px] leading-7 text-[#082033]/80">
                {block.lines.map((item, j) => (
                  <li key={j} className="font-medium">
                    {renderInlineString(item)}
                  </li>
                ))}
              </ul>
            );
            break;
          case "ol":
            elements.push(
              <ol key={key} className="mb-4 list-decimal pl-6 space-y-2 text-[15px] leading-7 text-[#082033]/80">
                {block.lines.map((item, j) => (
                  <li key={j} className="font-medium">
                    {renderInlineString(item)}
                  </li>
                ))}
              </ol>
            );
            break;
          case "code":
            elements.push(
              <pre key={key} className="my-6 overflow-x-auto rounded-xl bg-[#082033] p-5 text-[13px] leading-6 text-white/90 [&_code]:bg-transparent [&_code]:p-0">
                <code>{block.lines.join("\n")}</code>
              </pre>
            );
            break;
          case "blockquote":
            elements.push(
              <blockquote key={key} className="my-6 border-l-4 border-[#9474ff] bg-[#9474ff]/[0.04] py-3 pl-4 text-[#082033]/70 italic">
                {block.lines.map((l, j) => (
                  <p key={j}>{renderInlineString(l)}</p>
                ))}
              </blockquote>
            );
            break;
          case "table": {
            const headerCells = parseTableRow(block.lines[0]);
            const dataRows = block.lines.slice(2);
            elements.push(
              <div key={key} className="my-6 overflow-x-auto rounded-xl border border-black/[0.06]">
                <table className="w-full border-collapse text-left text-[14px]">
                  <thead>
                    <tr>
                      {headerCells.map((cell, j) => (
                        <th key={j} className="border-b border-black/[0.06] bg-[#f7f8fc] px-4 py-3 text-[12px] font-bold uppercase text-[#5f6b86]">
                          {renderInlineString(cell)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {dataRows.map((row, ri) => {
                      const cells = parseTableRow(row);
                      return (
                        <tr key={ri}>
                          {cells.map((cell, ci) => (
                            <td key={ci} className="border-b border-black/[0.06] px-4 py-3 text-[14px] font-medium text-[#082033]">
                              {renderInlineString(cell)}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
            break;
          }
        }
      }
    }
  }

  return React.createElement(React.Fragment, null, ...elements);
}

/* ─── Component Parsing ─── */

interface ComponentSegment {
  type: "component";
  tag: string;
  props: Record<string, string>;
  children: string;
}

interface MarkdownSegment {
  type: "markdown";
  text: string;
}

type Segment = ComponentSegment | MarkdownSegment;

function parseProps(attrString: string): Record<string, string> {
  const props: Record<string, string> = {};
  const regex = /(\w+)=["{]([^"}]+)["}]/g;
  let match;
  while ((match = regex.exec(attrString)) !== null) {
    props[match[1]] = match[2];
  }
  // Handle array props like steps={[...]}
  const arrayRegex = /(\w+)=\{?\[([^\]]*)\]\}?/g;
  while ((match = arrayRegex.exec(attrString)) !== null) {
    try {
      props[match[1]] = JSON.parse(`[${match[2]}]`).join(",");
    } catch {
      props[match[1]] = match[2];
    }
  }
  return props;
}

function parseComponents(source: string): Segment[] {
  const segments: Segment[] = [];
  const tagPattern = /^<(\w+)([^>]*)\/?>$/;
  const closePattern = /^<\/(\w+)>$/;
  const componentStack: { tag: string; props: Record<string, string>; startIdx: number }[] = [];
  const lines = source.split("\n");
  let currentMarkdown: string[] = [];

  function flushMarkdown() {
    if (currentMarkdown.length > 0) {
      const text = currentMarkdown.join("\n").trim();
      if (text) {
        segments.push({ type: "markdown", text });
      }
      currentMarkdown = [];
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    const openMatch = trimmed.match(tagPattern);
    const closeMatch = trimmed.match(closePattern);

    if (openMatch && !closeMatch) {
      const selfClose = trimmed.endsWith("/>");
      const tag = openMatch[1];
      const props = parseProps(openMatch[2] || "");

      if (selfClose) {
        flushMarkdown();
        segments.push({ type: "component", tag, props, children: "" });
      } else {
        flushMarkdown();
        componentStack.push({ tag, props, startIdx: i });
      }
    } else if (closeMatch && componentStack.length > 0) {
      const top = componentStack[componentStack.length - 1];
      if (top.tag === closeMatch[1]) {
        componentStack.pop();
        const childLines = lines.slice(top.startIdx + 1, i);
        const childContent = childLines.join("\n").trim();
        flushMarkdown();
        segments.push({
          type: "component",
          tag: top.tag,
          props: top.props,
          children: childContent,
        });
      } else {
        currentMarkdown.push(line);
      }
    } else if (componentStack.length > 0) {
      // Inside a component — accumulate for children
    } else {
      currentMarkdown.push(line);
    }
  }

  flushMarkdown();
  return segments;
}

function parseChildItems(children: string): string[] {
  return children
    .split("\n")
    .map((l) => l.replace(/^[-*]\s*/, "").replace(/^- \[x\]\s*/, "").trim())
    .filter(Boolean);
}

function parseAccordionItems(children: string): { title: string; content: string }[] {
  const items: { title: string; content: string }[] = [];
  const lines = children.split("\n");
  let currentTitle = "";
  let currentContent: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^#{1,4}\s/.test(trimmed)) {
      if (currentTitle) {
        items.push({ title: currentTitle, content: currentContent.join("\n").trim() });
      }
      currentTitle = trimmed.replace(/^#{1,4}\s*/, "").trim();
      currentContent = [];
    } else if (trimmed === "---") {
      if (currentTitle) {
        items.push({ title: currentTitle, content: currentContent.join("\n").trim() });
      }
      currentTitle = "";
      currentContent = [];
    } else if (trimmed) {
      currentContent.push(line);
    }
  }
  if (currentTitle) {
    items.push({ title: currentTitle, content: currentContent.join("\n").trim() });
  }
  return items;
}

function renderComponentBlock(
  tag: string,
  props: Record<string, string>,
  children: string,
  key: string | number
): React.ReactNode {
  switch (tag) {
    case "Hero":
      return <Hero key={key} title={props.title || ""} subtitle={props.subtitle} description={props.description} image={props.image} />;
    case "OnboardingProgress":
      return (
        <OnboardingProgress
          key={key}
          currentStep={parseInt(props.currentStep || "1", 10)}
          totalSteps={parseInt(props.totalSteps || "6", 10)}
          steps={props.steps ? props.steps.split(",") : []}
        />
      );
    case "Checklist":
      return (
        <Checklist key={key}>
          {children.split("\n").filter(l => l.trim()).map((line, i) => (
            <CheckItem key={i}>{line.replace(/^[-*]\s*/, "").replace(/✅\s*/, "").trim()}</CheckItem>
          ))}
        </Checklist>
      );
    case "CardGroup":
      return (
        <CardGroup key={key} cols={parseInt(props.cols || "2", 10)}>
          {renderCardChildren(children)}
        </CardGroup>
      );
    case "Card":
      return (
        <Card key={key} title={props.title || ""} icon={props.icon}>
          {children}
        </Card>
      );
    case "Workflow":
      return <Workflow key={key}>{children}</Workflow>;
    case "Grid":
      return (
        <Grid key={key} cols={parseInt(props.cols || "3", 10)}>
          {renderFeatureCardChildren(children)}
        </Grid>
      );
    case "FeatureCard":
      return <FeatureCard key={key} title={props.title || ""} description={props.description || ""} icon={props.icon} />;
    case "FeatureGrid":
      return <FeatureGrid key={key}>{renderFeatureChildren(children)}</FeatureGrid>;
    case "Feature":
      return <Feature key={key} title={props.title || ""} description={props.description || ""} />;
    case "BusinessTip":
      return <BusinessTip key={key}>{renderMarkdownContent(children)}</BusinessTip>;
    case "Figure":
      return <Figure key={key} src={props.src || ""} caption={props.caption} />;
    case "Accordion":
      return (
        <Accordion key={key}>
          {parseAccordionItems(children).map((item, i) => (
            <AccordionItem key={i} title={item.title}>
              {renderMarkdownContent(item.content)}
            </AccordionItem>
          ))}
        </Accordion>
      );
    case "RelatedGuides":
      return <RelatedGuides key={key}>{children}</RelatedGuides>;
    case "NextStepCard":
      return <NextStepCard key={key} title={props.title || ""} description={props.description} href={props.href || "#"} />;
    case "DocsPagination":
      return <DocsPagination key={key} next={props.next} prev={props.prev} />;
    case "FounderNote":
      return <FounderNote key={key}>{renderMarkdownContent(children)}</FounderNote>;
    default:
      return null;
  }
}

function renderCardChildren(children: string): React.ReactNode {
  const cardPattern = /<Card\s+title="([^"]+)"\s+icon="([^"]+)"[^>]*>([\s\S]*?)<\/Card>/g;
  const cards: React.ReactNode[] = [];
  let match;
  while ((match = cardPattern.exec(children)) !== null) {
    cards.push(
      <Card key={cards.length} title={match[1]} icon={match[2]}>
        {match[3].trim()}
      </Card>
    );
  }
  return cards;
}

function renderFeatureCardChildren(children: string): React.ReactNode {
  const pattern = /<FeatureCard\s+title="([^"]+)"\s+description="([^"]+)"\s+icon="([^"]+)"[^>]*\/?>/g;
  const items: React.ReactNode[] = [];
  let match;
  while ((match = pattern.exec(children)) !== null) {
    items.push(
      <FeatureCard key={items.length} title={match[1]} description={match[2]} icon={match[3]} />
    );
  }
  return items;
}

function renderFeatureChildren(children: string): React.ReactNode {
  const pattern = /<Feature\s+title="([^"]+)"\s+description="([^"]+)"[^>]*\/?>/g;
  const items: React.ReactNode[] = [];
  let match;
  while ((match = pattern.exec(children)) !== null) {
    items.push(
      <Feature key={items.length} title={match[1]} description={match[2]} />
    );
  }
  return items;
}

function renderMarkdownContent(text: string): React.ReactNode {
  const lines = text.split("\n");
  const blocks = parseBlocks(lines);
  const elements: React.ReactNode[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    switch (block.type) {
      case "p":
        elements.push(
          <p key={i} className="mb-3 text-[13px] leading-relaxed text-[#082033]/80">
            {renderInlineString(block.lines.join(" "))}
          </p>
        );
        break;
      case "ul":
        elements.push(
          <ul key={i} className="mb-3 list-disc pl-6 space-y-1 text-[13px] text-[#082033]/80">
            {block.lines.map((item, j) => (
              <li key={j}>{renderInlineString(item)}</li>
            ))}
          </ul>
        );
        break;
      case "blockquote":
        elements.push(
          <blockquote key={i} className="my-3 border-l-4 border-[#9474ff] bg-[#9474ff]/[0.04] py-2 pl-3 text-[13px] text-[#082033]/70 italic">
            {block.lines.map((l, j) => (
              <p key={j}>{renderInlineString(l)}</p>
            ))}
          </blockquote>
        );
        break;
    }
  }
  return elements.length > 0 ? elements : text;
}
