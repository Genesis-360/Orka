import React from "react";

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
  key: number
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
  const lines = source.split("\n");
  const blocks = parseBlocks(lines);
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    switch (block.type) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
        elements.push(makeHeading(block.type, block.lines[0], i));
        break;

      case "hr":
        elements.push(
          <hr key={i} className="my-8 border-t border-black/[0.06]" />
        );
        break;

      case "p":
        elements.push(
          <p
            key={i}
            className="mb-4 text-[15px] leading-7 text-[#082033]/80"
          >
            {renderInlineString(block.lines.join(" "))}
          </p>
        );
        break;

      case "ul":
        elements.push(
          <ul
            key={i}
            className="mb-4 list-disc pl-6 space-y-2 text-[15px] leading-7 text-[#082033]/80"
          >
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
          <ol
            key={i}
            className="mb-4 list-decimal pl-6 space-y-2 text-[15px] leading-7 text-[#082033]/80"
          >
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
          <pre
            key={i}
            className="my-6 overflow-x-auto rounded-xl bg-[#082033] p-5 text-[13px] leading-6 text-white/90 [&_code]:bg-transparent [&_code]:p-0"
          >
            <code>{block.lines.join("\n")}</code>
          </pre>
        );
        break;

      case "blockquote":
        elements.push(
          <blockquote
            key={i}
            className="my-6 border-l-4 border-[#9474ff] bg-[#9474ff]/[0.04] py-3 pl-4 text-[#082033]/70 italic"
          >
            {block.lines.map((l, j) => (
              <p key={j}>{renderInlineString(l)}</p>
            ))}
          </blockquote>
        );
        break;

      case "table": {
        const headerCells = parseTableRow(block.lines[0]);
        const dataRows = block.lines.slice(2); // skip header and separator
        elements.push(
          <div
            key={i}
            className="my-6 overflow-x-auto rounded-xl border border-black/[0.06]"
          >
            <table className="w-full border-collapse text-left text-[14px]">
              <thead>
                <tr>
                  {headerCells.map((cell, j) => (
                    <th
                      key={j}
                      className="border-b border-black/[0.06] bg-[#f7f8fc] px-4 py-3 text-[12px] font-bold uppercase text-[#5f6b86]"
                    >
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
                        <td
                          key={ci}
                          className="border-b border-black/[0.06] px-4 py-3 text-[14px] font-medium text-[#082033]"
                        >
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

  return React.createElement(React.Fragment, null, ...elements);
}
