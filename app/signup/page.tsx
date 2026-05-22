"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { WarningCircle, CaretRight } from "@phosphor-icons/react";
import Navbar from "../components/Navbar";
import SiteFooter from "../components/SiteFooter";
import { appLoginUrl, publicApiBaseUrl } from "@/lib/site-urls";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const base = publicApiBaseUrl();
    if (!base) {
      setError("Signup is not configured (missing NEXT_PUBLIC_API_BASE_URL).");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${base}/api/public/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          adminName: formData.fullName,
        }),
      });

      const result = await response.json().catch(() => ({}));

      const nextUrl = result?.data?.nextUrl ?? result?.nextUrl;

      if (response.ok && typeof nextUrl === "string" && nextUrl.length > 0) {
        window.location.href = nextUrl;
        return;
      }

      setError(
        result?.message ||
          result?.error ||
          `Signup failed${response.status ? ` (${response.status})` : ""}`,
      );
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-xl p-8 shadow-sm"
          >
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
              Swiftiom TMS
            </span>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mt-2 mb-2">
              Create your workspace
            </h1>
            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              Add your company once. After signup you land inside Swiftiom to enter trucks, users, and your first corridor jobs.
            </p>

            <form className="space-y-4" onSubmit={handleSignup}>
              <div>
                <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block mb-2">
                  Company legal name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Acme Logistics LLC"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, companyName: e.target.value }))
                  }
                  className="vektor-input w-full p-3 text-sm"
                  autoComplete="organization"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block mb-2">
                  Administrator full name
                </label>
                <input
                  required
                  type="text"
                  placeholder="Jane Doe"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, fullName: e.target.value }))
                  }
                  className="vektor-input w-full p-3 text-sm"
                  autoComplete="name"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block mb-2">
                  Work email
                </label>
                <input
                  required
                  type="email"
                  placeholder="admin@company.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, email: e.target.value }))
                  }
                  className="vektor-input w-full p-3 text-sm"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block mb-2">
                  Password
                </label>
                <input
                  required
                  type="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, password: e.target.value }))
                  }
                  className="vektor-input w-full p-3 text-sm"
                  autoComplete="new-password"
                  minLength={12}
                />
              </div>

              {error && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <WarningCircle size={14} weight="fill" />
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-3 text-sm font-medium flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating account…" : "Create account"}
                <CaretRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </form>

            <p className="text-xs text-muted-foreground mt-6 text-center">
              Already have access?{" "}
              <a
                href={appLoginUrl()}
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </a>
              {" · "}
              <Link href="/demo" className="hover:text-foreground transition-colors">
                Start with the guided demo
              </Link>
            </p>
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
