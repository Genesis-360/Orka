"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Shield } from "lucide-react";
import { RiGoogleFill, RiTwitterXFill, RiGlobalLine } from "react-icons/ri";
import { toast } from "sonner";
import { WalletConnectButton } from "./WalletConnectButton";
import { EmailForm } from "./EmailForm";

interface AuthCardProps {
  variant: "sign-in" | "sign-up";
}

export function AuthCard({ variant }: AuthCardProps) {
  const router = useRouter();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleWalletConnect = useCallback((address: string) => {
    setWalletAddress(address);
  }, []);

  const handleEmailSubmit = useCallback(
    async (email: string) => {
      if (!walletAddress) return;
      setLoading(true);

      try {
        const endpoint = variant === "sign-up" ? "/api/auth-v2/register" : "/api/auth-v2/login";
        const body =
          variant === "sign-up"
            ? { wallet_address: walletAddress, email }
            : { wallet_address: walletAddress };

        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.error || "Something went wrong. Try again.");
          return;
        }

        toast.success(variant === "sign-up" ? "Account created!" : "Welcome back!");
        router.push("/workspaces");
      } catch {
        toast.error("Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }
    },
    [walletAddress, variant, router]
  );

  const handleSocialClick = useCallback((provider: string) => {
    toast.info(`${provider} coming soon`);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="mx-auto flex w-full max-w-[400px] flex-col px-6 py-8 lg:px-8"
    >
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[26px] font-bold text-white">
          {variant === "sign-in" ? "Welcome back 👋" : "Create your account"}
        </h1>
        <p className="mt-1 text-[14px] text-white/50">
          {variant === "sign-in"
            ? "Sign in to your Orka account"
            : "Join Orka and grow your business"}
        </p>
      </div>

      {/* Social Buttons */}
      <div className="mb-4">
        <p className="mb-3 text-[12px] font-semibold text-white/40">Continue with</p>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleSocialClick("Google")}
            className="flex h-10 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 text-[12px] font-medium text-white/60 transition-all hover:bg-white/10 hover:text-white"
          >
            <RiGoogleFill className="size-4" />
            Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialClick("X (Twitter)")}
            className="flex h-10 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 text-[12px] font-medium text-white/60 transition-all hover:bg-white/10 hover:text-white"
          >
            <RiTwitterXFill className="size-3.5" />
            X
          </button>
          <button
            type="button"
            className="flex h-10 items-center justify-center gap-1.5 rounded-xl border border-[#9474ff]/30 bg-[#9474ff]/10 text-[12px] font-bold text-[#9474ff] transition-all hover:bg-[#9474ff]/20"
          >
            <RiGlobalLine className="size-4" />
            Freighter
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-[12px]">
          <span className="bg-[#0a1c2e] px-3 text-white/30">or</span>
        </div>
      </div>

      {/* Wallet Connect */}
      <div className="mb-4">
        <WalletConnectButton onConnect={handleWalletConnect} />
      </div>

      {/* Email Form */}
      <AnimatePresence>
        {walletAddress && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <EmailForm onSubmit={handleEmailSubmit} loading={loading} variant={variant} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Switch link */}
      <p className="mt-6 text-center text-[13px] text-white/40">
        {variant === "sign-in" ? (
          <>
            Don&apos;t have an account?{" "}
            <Link href="/auth-v2/sign-up" className="font-bold text-[#9474ff] hover:underline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/auth-v2/sign-in" className="font-bold text-[#9474ff] hover:underline">
              Sign in
            </Link>
          </>
        )}
      </p>

      {/* Security footer */}
      <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-white/25">
        <Shield size={12} />
        Your data is protected with enterprise-grade security
      </div>
    </motion.div>
  );
}
