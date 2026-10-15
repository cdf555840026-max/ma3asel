import React, { useState, useEffect } from 'react';
import { SiteConfig, buildGeneralInquiryWhatsAppUrl } from '../config/siteConfig';
import { MessageCircle, Menu, X, ArrowUpLeft, Moon, Sun, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenCustomDesign: () => void;
  onOpenAdmin: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  siteConfig: SiteConfig;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCustomDesign,
  onOpenAdmin,
  isDarkMode,
  onToggleDarkMode,
  siteConfig,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'تشكيلة المغاسل', href: '#products' },
    { label: 'خدمة التفصيل', href: '#custom-design' },
    { label: 'لماذا تختارنا', href: '#why-us' },
    { label: 'معرض الإلهام', href: '#inspiration' },
    { label: 'الأسئلة الشائعة', href: '#faq' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href === '#custom-design') {
      onOpenCustomDesign();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF9F6]/95 dark:bg-[#0E0E10]/95 backdrop-blur-md shadow-xs border-b border-[#E8E2D8] dark:border-[#242428]'
          : 'bg-[#FAF9F6]/85 dark:bg-[#0E0E10]/85 backdrop-blur-xs border-b border-[#E8E2D8]/50 dark:border-[#242428]/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 lg:gap-8 h-20">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="/"
            className="flex items-baseline gap-2 whitespace-nowrap shrink-0 group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C5A059]"
            aria-label="الرئيسية - مَرمَرِيس للرخام الفاخر"
          >
            <span className="text-2xl font-bold tracking-tight text-[#171717] dark:text-[#F5F2EB] font-['Cairo'] transition-colors group-hover:text-[#9A7B38] dark:group-hover:text-[#D4AF37]">
              {siteConfig.brandName}
            </span>
            <span className="hidden sm:inline-block text-xs font-medium text-[#7C756B] dark:text-[#9E978C] tracking-wider border-r border-[#D9D1C5] dark:border-[#383734] pr-2 mr-2">
              للرخام الفاخر
            </span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-[#544F49] dark:text-[#B3ADA2]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="whitespace-nowrap shrink-0 hover:text-[#171717] dark:hover:text-white transition-colors relative py-1 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#C5A059]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Controls & WhatsApp Action */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Admin Dashboard Entry Button */}
            <button
              onClick={onOpenAdmin}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#544F49] dark:text-[#C7C2B6] hover:text-[#171717] dark:hover:text-white bg-[#EFE9DF] dark:bg-[#1A1A1F] hover:bg-[#E5DDD0] dark:hover:bg-[#25252B] rounded-md transition-colors cursor-pointer"
              title="لوحة الإدارة والتعديل"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#9A7B38] dark:text-[#D4AF37]" />
              <span className="hidden sm:inline">لوحة الإدارة</span>
            </button>

            {/* Dark Mode Switcher */}
            <button
              onClick={onToggleDarkMode}
              type="button"
              className="p-2 text-[#524B43] dark:text-[#D4AF37] hover:bg-[#EFE9DF] dark:hover:bg-[#1E1E24] rounded-md transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              aria-label={isDarkMode ? 'التبديل إلى الوضع النهاري' : 'التبديل إلى الوضع الداكن'}
              title={isDarkMode ? 'الوضع النهاري' : 'الوضع الداكن'}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-[#E6C98A]" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Primary Action CTA */}
            <div className="hidden sm:flex items-center gap-2">
              <a
                href={buildGeneralInquiryWhatsAppUrl(siteConfig.whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#FAF9F6] bg-[#1E2022] hover:bg-[#323639] dark:bg-[#D4AF37] dark:text-[#121214] dark:hover:bg-[#E0BC48] rounded-md transition-all shadow-xs hover:shadow-sm whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-[#D8B26E] dark:text-[#121214]" />
                <span>تواصل عبر واتساب</span>
                <ArrowUpLeft className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                type="button"
                className="p-2 text-[#2D2A26] dark:text-[#F3F1EC] hover:text-[#171717] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C5A059]"
                aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E8E2D8] dark:border-[#26262B] bg-[#FAF9F6] dark:bg-[#121214] px-4 pt-2 pb-6 space-y-3 shadow-md">
          <nav className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="px-3 py-2 text-base font-medium text-[#38342F] dark:text-[#D1CBC0] hover:bg-[#F2ECE1] dark:hover:bg-[#1A1A1E] rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              type="button"
              className="flex items-center gap-2 px-3 py-2 text-base font-semibold text-[#8C6D2B] dark:text-[#D4AF37] hover:bg-[#F2ECE1] dark:hover:bg-[#1A1A1E] rounded-md transition-colors text-right"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>لوحة تحكم وإدارة المتجر</span>
            </button>
          </nav>

          <div className="pt-3 border-t border-[#E8E2D8] dark:border-[#242428]">
            <a
              href={buildGeneralInquiryWhatsAppUrl(siteConfig.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#1E2022] hover:bg-[#323639] dark:bg-[#D4AF37] dark:text-[#121214] rounded-md transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-[#D8B26E] dark:text-[#121214]" />
              <span>تواصل مباشر عبر واتساب</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
