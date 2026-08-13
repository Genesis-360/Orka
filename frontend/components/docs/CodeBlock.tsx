"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6">
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy code"}
        className={`absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-semibold backdrop-blur transition-all ${
          copied
            ? "border-[#22bd93]/40 bg-[#22bd93]/15 text-[#22bd93]"
            : "border-white/10 bg-white/5 text-white/50 opacity-0 hover:text-white focus-visible:opacity-100 group-hover:opacity-100"
        }`}
      >
        {copied ? <Check size={11} /> : <Copy size={11} />}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="overflow-x-auto rounded-xl bg-[#082033] p-5 pb-6 text-[13px] leading-6 text-white/90 [&_code]:bg-transparent [&_code]:p-0">
        <code>{code}</code>
      </pre>
    </div>
  );
}