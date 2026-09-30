import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Facebook } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#060B14] w-full pt-20 pb-8">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-12 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          <div className="lg:col-span-5 flex flex-col pr-0 lg:pr-12">
            <Link href={`/${locale}`} className="flex items-center gap-3 mb-6 w-max group">
              <Image 
                src="/logo.svg" 
                alt="Swiftiam Logo" 
                width={28} 
                height={28} 
                className="w-7 h-7 group-hover:scale-110 transition-transform duration-300"
              />
              <span className="text-white font-serif text-[22px] font-bold tracking-wide">
                SWIFTIAM
              </span>
            </Link>
            
            <p className="font-sans text-slate-400 text-[14px] leading-[1.8] max-w-[420px]">
              {t('description')}
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10 lg:gap-12 mt-2 lg:mt-0">
            
            <div className="flex flex-col">
              <h4 className="font-sans text-white text-[11px] font-bold tracking-[0.08em] uppercase mb-6">
                {t('platform.title')}
              </h4>
              <ul className="flex flex-col gap-4">
                <li><Link href={`/${locale}/#platform`} className="font-sans text-slate-400 hover:text-[#00D4FF] text-[14px] transition-colors">{t('platform.link1')}</Link></li>
                <li><Link href={`/${locale}/#solutions`} className="font-sans text-slate-400 hover:text-[#00D4FF] text-[14px] transition-colors">{t('platform.link2')}</Link></li>
                <li><Link href={`/${locale}/#how-it-works`} className="font-sans text-slate-400 hover:text-[#00D4FF] text-[14px] transition-colors">{t('platform.link3')}</Link></li>
                <li><Link href={`/${locale}/#pricing`} className="font-sans text-slate-400 hover:text-[#00D4FF] text-[14px] transition-colors">{t('platform.link4')}</Link></li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h4 className="font-sans text-white text-[11px] font-bold tracking-[0.08em] uppercase mb-6">
                {t('company.title')}
              </h4>
              <ul className="flex flex-col gap-4">
                <li><Link href={`/${locale}/#company`} className="font-sans text-slate-400 hover:text-[#00D4FF] text-[14px] transition-colors">{t('company.link1')}</Link></li>
                <li><Link href={`/${locale}/#contact`} className="font-sans text-slate-400 hover:text-[#00D4FF] text-[14px] transition-colors">{t('company.link2')}</Link></li>
                <li><Link href={`/${locale}/#pricing`} className="font-sans text-slate-400 hover:text-[#00D4FF] text-[14px] transition-colors">{t('company.link3')}</Link></li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h4 className="font-sans text-white text-[11px] font-bold tracking-[0.08em] uppercase mb-6">
                {t('legal.title')}
              </h4>
              <ul className="flex flex-col gap-4">
                <li><Link href={`/${locale}/privacy`} className="font-sans text-slate-400 hover:text-[#00D4FF] text-[14px] transition-colors">{t('legal.link1')}</Link></li>
                <li><Link href={`/${locale}/terms`} className="font-sans text-slate-400 hover:text-[#00D4FF] text-[14px] transition-colors">{t('legal.link2')}</Link></li>
              </ul>
            </div>

          </div>
        </div>

        <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between pt-8 border-t border-[#1a2436] gap-6">
          
          <p className="font-sans text-slate-500 text-[13px]">
            {t('rights', { year: currentYear })}
          </p>

          <div className="flex items-center gap-6">
            <Link href="#" className="text-slate-500 hover:text-[#00D4FF] transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </Link>
            <Link href="#" className="text-slate-500 hover:text-[#00D4FF] transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </Link>
            <Link href="#" className="text-slate-500 hover:text-[#00D4FF] transition-colors" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </Link>
          </div>
          
        </div>

      </div>
    </footer>
  );
}