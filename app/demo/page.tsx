"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CaretDown, Clock, Shield, CreditCard, CaretRight, WarningCircle } from "@phosphor-icons/react";
import Link from "next/link";
import { z } from "zod";
import Navbar from "../components/Navbar";
import { appLoginUrl } from "@/lib/site-urls";

const demoSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters").max(100, "Company name too long"),
  adminName: z.string().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
  email: z.string().email("Invalid work email address"),
  password: z.string().min(12, "Password must be at least 12 characters").regex(/[A-Z]/, "Must contain uppercase").regex(/[0-9]/, "Must contain number"),
});

type DemoFormData = z.infer<typeof demoSchema>;

const faqs = [
  {
    question: "What happens after the 15-day trial?",
    answer:
      "Choose a paid tier that matches your active trucks—or pause. We keep your workspace exportable for 30 days so you are not locked in.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Yes. Traffic is encrypted, admins need strong passwords, and access is logged. If your bank or insurer asks for specifics, we send the paperwork.",
  },
  {
    question: "How does billing work?",
    answer:
      "You pay for trucks that are actually running on Swiftiom each month—usually via Chapa or local bank transfer. Change truck counts when your fleet scales up or down.",
  },
  {
    question: "Do I need a card to start?",
    answer: "No card up front. Run real trips during the trial; add billing only when you are convinced.",
  },
  {
    question: "Can my whole yard join?",
    answer:
      "Invite dispatchers, accountants, and branch heads. Everyone sees the same trip, Bollo, and Br figure—less arguing in the corridor.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left hover:bg-muted/30 transition-colors px-2 -mx-2 rounded-lg"
      >
        <span className="font-medium text-foreground">{question}</span>
        <CaretDown
          size={20}
          className={`text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="pb-4"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">{answer}</p>
        </motion.div>
      )}
    </div>
  );
}

export default function DemoPage() {
  const [formData, setFormData] = useState<DemoFormData>({ 
    companyName: "", 
    adminName: "", 
    email: "", 
    password: "" 
  });
  const [errors, setErrors] = useState<Partial<Record<keyof DemoFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (field: keyof DemoFormData, value: string) => {
    const fieldSchema = demoSchema.shape[field];
    const result = fieldSchema.safeParse(value);
    if (!result.success) {
      setErrors(prev => ({ ...prev, [field]: result.error.issues[0].message }));
    } else {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = demoSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof DemoFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof DemoFormData;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const base =
        process.env.NEXT_PUBLIC_API_BASE_URL?.trim().replace(/\/$/, "") || "";
      if (!base) {
        throw new Error("API base URL is not configured");
      }

      const response = await fetch(`${base}/api/public/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: formData.companyName,
          adminName: formData.adminName,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();

      const nextUrl = data?.data?.nextUrl ?? data?.nextUrl;

      if (typeof nextUrl === "string" && nextUrl.length > 0) {
        window.location.href = nextUrl;
      } else {
        window.location.href = appLoginUrl();
      }
    } catch (error) {
      setErrors({
        email: "Failed to create account. Please try again or contact support.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Info */}
            <div className="space-y-8">
              <div>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  Swiftiom for Ethiopian fleets
                </span>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mt-3 leading-tight">
                  See every trip, litre, and Birr—without living inside Excel.
                </h1>
                <p className="text-muted-foreground mt-4 leading-relaxed">
                  Djibouti corridors, brokered reloads, and inland branches all land in one ledger. Start a 15-day trial,
                  load your real trucks, and decide with your accountant—not a sales deck.
                </p>
              </div>

              {/* Feature List */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock size={16} className="text-primary" weight="duotone" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">15-day full access</h3>
                    <p className="text-sm text-muted-foreground">
                      Load trucks, drivers, and broker jobs immediately—no payment step.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Shield size={16} className="text-primary" weight="duotone" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Your data stays yours</h3>
                    <p className="text-sm text-muted-foreground">
                      Encrypted transport, strong passwords, export if you walk away after the trial.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="pt-8">
                <h2 className="text-lg font-heading font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-2">
                  {faqs.map((faq) => (
                    <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-card border border-border rounded-xl p-6 shadow-sm sticky top-24"
              >
                <h2 className="text-xl font-heading font-bold text-foreground mb-2">
                  Spin up your fleet workspace
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  You become the admin—invite dispatch and finance once the first trip looks right.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block mb-2">
                      Company Legal Name
                    </label>
                    <input
                      type="text"
                      placeholder="Acme Logistics LLC"
                      value={formData.companyName}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, companyName: e.target.value }));
                        validateField("companyName", e.target.value);
                      }}
                      className={`vektor-input w-full p-3 text-sm ${errors.companyName ? "border-red-500" : ""}`}
                      autoComplete="organization"
                    />
                    {errors.companyName && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <WarningCircle size={12} /> {errors.companyName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block mb-2">
                      Administrator Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formData.adminName}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, adminName: e.target.value }));
                        validateField("adminName", e.target.value);
                      }}
                      className={`vektor-input w-full p-3 text-sm ${errors.adminName ? "border-red-500" : ""}`}
                      autoComplete="name"
                    />
                    {errors.adminName && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <WarningCircle size={12} /> {errors.adminName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block mb-2">
                      Work Email
                    </label>
                    <input
                      type="email"
                      placeholder="admin@company.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, email: e.target.value }));
                        validateField("email", e.target.value);
                      }}
                      className={`vektor-input w-full p-3 text-sm ${errors.email ? "border-red-500" : ""}`}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <WarningCircle size={12} /> {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block mb-2">
                      Secure Password
                    </label>
                    <input
                      type="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => {
                        setFormData(prev => ({ ...prev, password: e.target.value }));
                        validateField("password", e.target.value);
                      }}
                      className={`vektor-input w-full p-3 text-sm ${errors.password ? "border-red-500" : ""}`}
                      autoComplete="new-password"
                    />
                    {errors.password && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <WarningCircle size={12} /> {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Billing Policy Card */}
                  <div className="bg-muted/50 border border-border rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2 text-primary">
                      <CreditCard size={16} />
                      <span className="text-xs font-medium uppercase tracking-wider">Billing Policy</span>
                    </div>
                    <ul className="space-y-1 text-xs text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        Free for 15 days. Transition to a paid plan at any time.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        Post-trial: <span className="text-foreground font-medium">$25</span> per active truck/month.
                      </li>
                    </ul>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-3 text-sm font-medium flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Working…" : "Start free trial"}
                    <CaretRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-xs text-muted-foreground mt-5 text-center leading-relaxed">
                    Already have an account?{" "}
                    <a
                      href={appLoginUrl()}
                      className="text-primary font-medium hover:underline underline-offset-2"
                    >
                      Sign in
                    </a>
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
