"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ChevronDown, Loader2, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { submitDemoRequest } from "../../actions/bookDemo";
import { useTranslations, useLocale } from "next-intl";

const formSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phone: z.string().min(8, "Valid phone required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company is required"),
  fleetSize: z.string().min(1, "Select fleet size"),
  language: z.string().min(1, "Select language"),
  challenge: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function BookDemoPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  
  const t = useTranslations("BookDemo");
  const locale = useLocale();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value || "");
    });
    const result = await submitDemoRequest(formData);
    if (result.error) {
      setServerError(result.error);
    } else if (result.success) {
      setIsSuccess(true);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center py-20 px-4 mt-[80px] bg-[#060B14] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00D4FF]/[0.05] blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[650px] bg-[#101D30] border border-[#1a2436] rounded-2xl shadow-2xl relative z-10 overflow-hidden"
      >
        <Link 
          href={`/${locale}`} 
          className="absolute top-6 right-6 text-slate-400 hover:text-white bg-[#060B14] hover:bg-[#1a2436] border border-[#1a2436] rounded-full p-2 transition-colors z-20"
        >
          <X size={18} />
        </Link>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}>
              <div className="p-8 pb-6 border-b border-[#1a2436]">
                <h1 className="font-serif text-[28px] text-white tracking-tight mb-3">
                  {t('title')}
                </h1>
                <p className="text-slate-400 text-[14px] leading-relaxed max-w-[500px]">
                  {t('description')}
                </p>
              </div>

              <form className="p-8 flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                {serverError && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[13px] p-3 rounded-lg">
                    {serverError}
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-300 text-[12px] font-medium ml-1">{t('labels.fullName')}</label>
                  </div>
                  <input 
                    {...register("fullName")}
                    placeholder={t('placeholders.fullName')} 
                    className={`w-full bg-[#060B14] border ${errors.fullName ? 'border-red-500' : 'border-[#1a2436]'} text-white text-[14px] px-4 py-3 rounded-lg placeholder-slate-600 focus:outline-none focus:border-[#00D4FF] transition-all`}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-300 text-[12px] font-medium ml-1">{t('labels.phone')}</label>
                    </div>
                    <div className="flex w-full">
                      <div className="bg-[#1a2436]/50 border border-r-0 border-[#1a2436] text-slate-400 text-[14px] px-3 py-3 rounded-l-lg flex items-center justify-center gap-1">
                        +251 <ChevronDown size={14} className="opacity-70"/>
                      </div>
                      <input 
                        {...register("phone")}
                        type="tel" 
                        placeholder={t('placeholders.phone')} 
                        className={`w-full bg-[#060B14] border ${errors.phone ? 'border-red-500' : 'border-[#1a2436]'} text-white text-[14px] px-3 py-3 rounded-r-lg placeholder-slate-600 focus:outline-none focus:border-[#00D4FF] transition-all`}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-300 text-[12px] font-medium ml-1">{t('labels.email')}</label>
                    </div>
                    <input 
                      {...register("email")}
                      type="email" 
                      placeholder={t('placeholders.email')} 
                      className={`w-full bg-[#060B14] border ${errors.email ? 'border-red-500' : 'border-[#1a2436]'} text-white text-[14px] px-4 py-3 rounded-lg placeholder-slate-600 focus:outline-none focus:border-[#00D4FF] transition-all`}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-slate-300 text-[12px] font-medium ml-1">{t('labels.company')}</label>
                  </div>
                  <input 
                    {...register("company")}
                    type="text" 
                    placeholder={t('placeholders.company')} 
                    className={`w-full bg-[#060B14] border ${errors.company ? 'border-red-500' : 'border-[#1a2436]'} text-white text-[14px] px-4 py-3 rounded-lg placeholder-slate-600 focus:outline-none focus:border-[#00D4FF] transition-all`}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2 relative">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-300 text-[12px] font-medium ml-1">{t('labels.fleetSize')}</label>
                    </div>
                    <select {...register("fleetSize")} defaultValue="" className={`w-full bg-[#060B14] border ${errors.fleetSize ? 'border-red-500' : 'border-[#1a2436]'} text-white text-[14px] px-4 py-3 rounded-lg appearance-none focus:outline-none focus:border-[#00D4FF] cursor-pointer`}>
                      <option value="" disabled className="text-slate-600">{t('fleetOptions.select')}</option>
                      <option value="1-10">{t('fleetOptions.opt1')}</option>
                      <option value="11-50">{t('fleetOptions.opt2')}</option>
                      <option value="51-200">{t('fleetOptions.opt3')}</option>
                      <option value="200+">{t('fleetOptions.opt4')}</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-[38px] text-slate-500 pointer-events-none" />
                  </div>

                  <div className="flex flex-col gap-2 relative">
                    <div className="flex justify-between items-center">
                      <label className="text-slate-300 text-[12px] font-medium ml-1">{t('labels.language')}</label>
                    </div>
                    <select {...register("language")} defaultValue="english" className={`w-full bg-[#060B14] border ${errors.language ? 'border-red-500' : 'border-[#1a2436]'} text-white text-[14px] px-4 py-3 rounded-lg appearance-none focus:outline-none focus:border-[#00D4FF] cursor-pointer`}>
                      <option value="english">English</option>
                      <option value="amharic">Amharic</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-[38px] text-slate-500 pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-slate-300 text-[12px] font-medium ml-1">{t('labels.challenge')}</label>
                  <textarea 
                    {...register("challenge")}
                    rows={3}
                    placeholder={t('placeholders.challenge')} 
                    className="w-full bg-[#060B14] border border-[#1a2436] text-white text-[14px] px-4 py-3 rounded-lg placeholder-slate-600 focus:outline-none focus:border-[#00D4FF] transition-all resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col items-center gap-4">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#00D4FF] hover:bg-[#00bfe6] disabled:bg-[#00D4FF]/50 text-[#060B14] text-[15px] py-3.5 rounded-lg font-bold transition-colors shadow-[0_0_15px_rgba(0,212,255,0.2)] flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : t('submit')}
                  </button>
                  <span className="text-slate-500 text-[12px]">
                    {t('response_time')}
                  </span>
                </div>

              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 flex flex-col items-center text-center py-24"
            >
              <div className="w-16 h-16 bg-[#27C93F]/10 text-[#27C93F] rounded-full flex items-center justify-center mb-6 border border-[#27C93F]/20 shadow-[0_0_20px_rgba(39,201,63,0.2)]">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="font-serif text-[28px] text-white mb-4">{t('success_title')}</h2>
              <p className="text-slate-400 text-[15px] leading-relaxed max-w-[400px] mb-8">
                {t('success_desc')}
              </p>
              <Link 
                href={`/${locale}`}
                className="text-[#00D4FF] border border-[#1a2436] bg-[#060B14] hover:border-[#00D4FF]/50 px-6 py-2.5 rounded-lg text-[14px] font-medium transition-colors"
              >
                {t('btn_home')}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}