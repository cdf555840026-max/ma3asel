import React from 'react';
import { buildQuickCustomDesignWhatsAppUrl } from '../config/siteConfig';
import {
  Sparkles,
  MessageCircle,
  Image as ImageIcon,
  Ruler,
  Compass,
  ArrowUpLeft,
  ShieldCheck,
} from 'lucide-react';

interface CustomDesignSectionProps {
  whatsappNumber?: string;
}

export const CustomDesignSection: React.FC<CustomDesignSectionProps> = ({
  whatsappNumber,
}) => {
  const whatsappUrl = buildQuickCustomDesignWhatsAppUrl(whatsappNumber);

  return (
    <section
      id="custom-design"
      className="py-20 sm:py-24 bg-[#F5F1E9] dark:bg-[#131316] border-t border-b border-[#E8E0D2] dark:border-[#26262B] transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#9A7B38] dark:text-[#D4AF37] uppercase mb-3">
            <Sparkles className="w-4 h-4" />
            <span>خدمة التفصيل والتخصيص</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E2022] dark:text-[#F5F2EB] tracking-tight mb-4 [text-wrap:balance]">
            لديك تصميم في خيالك؟ دعنا نحوله إلى واقع.
          </h2>

          <p className="text-base sm:text-lg text-[#615A52] dark:text-[#A8A296] leading-relaxed font-light">
            سواء كنت تبحث عن مقاس محدد أو لون معين أو تصميم مختلف، أخبرنا بتفاصيل فكرتك وسنتواصل معك لمناقشة الخيارات المتاحة.
          </p>
        </div>

        {/* Luxury Action Showcase Card */}
        <div className="bg-white dark:bg-[#1A1A1E] rounded-2xl shadow-sm border border-[#E3D9CC] dark:border-[#2C2C32] p-8 sm:p-12 transition-colors duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Feature 1 */}
            <div className="p-5 rounded-xl bg-[#FAF8F5] dark:bg-[#141416] border border-[#ECE5DA] dark:border-[#2A2A30] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#EFE9DF] dark:bg-[#202026] text-[#9A7B38] dark:text-[#D4AF37] flex items-center justify-center mb-4">
                  <Ruler className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#1E2022] dark:text-[#F3F1EC] mb-2">
                  مقاسات مخصصة بدقة المليمتر
                </h3>
                <p className="text-xs sm:text-sm text-[#666057] dark:text-[#9E978C] leading-relaxed">
                  تفصيل متوافق 100% مع أبعاد الجدار وتأسيس السباكة دون أي هدر في المساحة.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-5 rounded-xl bg-[#FAF8F5] dark:bg-[#141416] border border-[#ECE5DA] dark:border-[#2A2A30] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#EFE9DF] dark:bg-[#202026] text-[#9A7B38] dark:text-[#D4AF37] flex items-center justify-center mb-4">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#1E2022] dark:text-[#F3F1EC] mb-2">
                  حرية اختيار نوع الرخام
                </h3>
                <p className="text-xs sm:text-sm text-[#666057] dark:text-[#9E978C] leading-relaxed">
                  ترافنتين بيج، كالاكاتا، ستاتوريو، نيرو ماركينا، فيردي ألبي، أو أي حجر تفضله.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-5 rounded-xl bg-[#FAF8F5] dark:bg-[#141416] border border-[#ECE5DA] dark:border-[#2A2A30] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#EFE9DF] dark:bg-[#202026] text-[#9A7B38] dark:text-[#D4AF37] flex items-center justify-center mb-4">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#1E2022] dark:text-[#F3F1EC] mb-2">
                  إرسال الصور والمخططات فوراً
                </h3>
                <p className="text-xs sm:text-sm text-[#666057] dark:text-[#9E978C] leading-relaxed">
                  يمكنك مشاركة صور الإلهام والمخططات المعمارية مباشرة في محادثة الواتساب.
                </p>
              </div>
            </div>
          </div>

          {/* Direct WhatsApp Action Container */}
          <div className="text-center max-w-xl mx-auto space-y-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 text-lg font-bold text-white bg-[#1E2022] hover:bg-[#323639] dark:bg-[#D4AF37] dark:text-[#121214] dark:hover:bg-[#E0BC48] rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1E2022] dark:focus-visible:ring-[#D4AF37]"
            >
              <MessageCircle className="w-6 h-6 text-[#D8B26E] dark:text-[#121214]" />
              <span>اطلب عبر واتساب</span>
              <ArrowUpLeft className="w-5 h-5 opacity-70" />
            </a>

            <p className="text-xs sm:text-sm text-[#7A7368] dark:text-[#A1998D] leading-relaxed">
              ستنتقل مباشرة إلى محادثة واتساب مع فريق التصميم لمناقشة فكرتك وإرسال الصور والمقاسات واستلام عرض السعر.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
