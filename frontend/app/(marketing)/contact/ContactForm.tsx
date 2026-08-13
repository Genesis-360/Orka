"use client";

import { useState } from "react";
import { ArrowRight, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ContactStatus = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          message: String(data.get("message") ?? ""),
        }),
      });
      const payload = await res.json();
      if (res.ok && payload.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError(payload?.error ?? "Something went wrong — please try again.");
      }
    } catch {
      setStatus("error");
      setError("Could not reach the server — please try again shortly.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-[18px] border border-border bg-card p-6 shadow-sm md:p-8">
        <div className="flex size-9 items-center justify-center rounded-lg bg-green-600 text-white">
          <Send size={16} />
        </div>
        <h3 className="text-2xl font-semibold tracking-tight text-night">
          Message sent
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Thanks for reaching out — we usually reply within one business day.
          We&apos;ll get back to you at the email you shared.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-xs font-semibold uppercase tracking-wider text-violet underline-offset-4 transition-colors hover:text-night hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div>
        <Label htmlFor="name" className="text-xs font-semibold text-muted-foreground">
          Your name <span className="text-border">*</span>
        </Label>
        <Input id="name" name="name" placeholder="Jane Doe" required className="mt-1 focus-visible:!ring-0 focus-visible:!border-border" />
      </div>
      <div>
        <Label htmlFor="email" className="text-xs font-semibold text-muted-foreground">
          Email <span className="text-border">*</span>
        </Label>
        <div className="relative mt-1">
          <Mail size={16} className="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <Input id="email" name="email" type="email" placeholder="you@example.com" required className="pl-9 focus-visible:!ring-0 focus-visible:!border-border" />
        </div>
      </div>
      <div>
        <Label htmlFor="message" className="text-xs font-semibold text-muted-foreground">
          Message
        </Label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          placeholder="Tell us what you're building."
          className="mt-1 w-full resize-y rounded-xl border border-border bg-input/30 px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:!ring-0 focus-visible:!border-border"
        />
      </div>
      <Button type="submit" size="lg" disabled={status === "loading"} className="w-full gap-2 rounded-xl font-semibold">
        {status === "loading" ? "Sending…" : "Send message"} <ArrowRight size={16} />
      </Button>
      {status === "error" && (
        <p className="text-xs font-semibold text-red-500">{error}</p>
      )}
      <p className="text-[11px] font-semibold text-muted-foreground/50">
        By submitting, you agree to our Terms and Privacy Policy.
      </p>
    </form>
  );
}