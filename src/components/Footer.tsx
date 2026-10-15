import React from 'react';
import { SiteConfig, buildGeneralInquiryWhatsAppUrl } from '../config/siteConfig';
import { MessageCircle, MapPin, Mail, Phone, Instagram, ArrowUpLeft, ShieldCheck } from 'lucide-react';

interface FooterProps {
  siteConfig: SiteConfig;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ siteConfig, onOpenAdmin }) => {
  return (
    <footer className="bg-[#171614] text-[#E8E2D8] pt-16 pb-12 border-t border-[#292622]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#2B2824]">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-white font-['Cairo']">
                {siteConfig.brandName}
              </span>
              <span className="text-xs text-[#A89F91]">
                {siteConfig.brandSubtitle}
              </span>
            </div>

            <p className="text-sm text-[#A89F91] leading-relaxed max-w-md font-light">
              وجهتكم الأولى لمغاسل الرخام الطبيعي والأحواض الحجرية المنحوتة بأيدي خبراء الحجر، تصاميم حصرية وتفصيل مخصص يمنح كل حمام طابعاً معمارياً فريداً.
            </p>

            <div className="pt-2">
              <a
                href={buildGeneralInquiryWhatsAppUrl(siteConfig.whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#171614] bg-[#F5EDE0] hover:bg-white rounded-md transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#8C6D2B]" />
                <span>محادثة فورية مع المستشار</span>
                <ArrowUpLeft className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
              أقسام المعرض
            </h4>
            <ul className="space-y-2 text-sm text-[#A89F91]">
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  تشكيلة المغاسل الحصرية
                </a>
              </li>
              <li>
                <a href="#custom-design" className="hover:text-white transition-colors">
                  خدمة التفصيل والتخصيص
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">
                  معايير الجودة والتصنيع
                </a>
              </li>
              <li>
                <a href="#inspiration" className="hover:text-white transition-colors">
                  معرض الإلهام المعماري
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  الأسئلة الشائعة
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">
              التواصل والاستفسار
            </h4>
            <div className="space-y-3 text-sm text-[#A89F91]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{siteConfig.cityCountry} - {siteConfig.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span dir="ltr" className="font-mono tabular-nums">{siteConfig.displayPhone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{siteConfig.email}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-3 flex items-center gap-3">
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#262420] text-[#D1C8BC] hover:text-white hover:bg-[#38342D] flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={buildGeneralInquiryWhatsAppUrl(siteConfig.whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#262420] text-[#D1C8BC] hover:text-white hover:bg-[#38342D] flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Admin Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#80776A] gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.brandName}. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <span className="text-[11px]">
              معرض مغاسل الرخام الفاخر · استفسارات وطلبات مباشرة عبر واتساب
            </span>
            <button
              onClick={onOpenAdmin}
              type="button"
              className="inline-flex items-center gap-1 text-[#8C8479] hover:text-[#D4AF37] transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>لوحة الإدارة</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
