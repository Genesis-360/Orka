"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "../lib/supabase/client";
import { cn } from "@/lib/utils";

export default function SignOutButton({ className }: { className?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSignOut() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/signup");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={onSignOut}
      disabled={loading}
      className={cn("flex w-full items-center gap-2.5 text-sm font-medium text-white/60", className)}
    >
      <LogOut className="size-4 shrink-0" aria-hidden />
      {loading ? "Signing out\u2026" : "Sign out"}
    </button>
  );
}
