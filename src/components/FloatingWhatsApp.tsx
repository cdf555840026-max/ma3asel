import React, { useState } from 'react';
import { buildGeneralInquiryWhatsAppUrl } from '../config/siteConfig';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 left-5 z-40 flex items-center gap-3">
      {/* Discreet Tooltip Banner on Desktop */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white dark:bg-[#1A1A1E] text-[#1E2022] dark:text-[#F3F1EC] px-3.5 py-2 rounded-lg shadow-lg border border-[#E3DBD0] dark:border-[#2C2C32] text-xs font-medium">
          <span>متاحون للرد على استفسارك ومقاساتك</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#999083] dark:text-[#7A746B] hover:text-[#171717] dark:hover:text-white p-0.5 cursor-pointer"
            aria-label="إغلاق التنبيه"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={buildGeneralInquiryWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل معنا فوراً عبر واتساب"
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20BA5A] hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-[#25D366]/40"
      >
        <MessageCircle className="w-7 h-7 drop-shadow-xs fill-current text-white" />
      </a>
    </div>
  );
};
