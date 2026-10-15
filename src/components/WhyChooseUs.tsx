import React from 'react';
import {
  Diamond,
  Ruler,
  Sparkles,
  Droplet,
  MessageCircle,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      title: "تصميمات تناسب أرقى الأذواق",
      description: "تشكيلات معمارية حديثة تتنوع بين الطراز المودرن الصريح والكلاسيك الهادئ والتصاميم العائمة المعاصرة لتكمل فخامة منزلك.",
      icon: Diamond,
    },
    {
      title: "عناية فائقة بالتفاصيل والتشطيبات",
      description: "دقة في قص الزوايا المشطوفة 45 درجة، وتنعيم انسيابي لميول الأحواض المخفية دون أي لحامات ظاهرة تشوه جمال الحجر.",
      icon: Sparkles,
    },
    {
      title: "خيارات متنوعة من الخامات والألوان",
      description: "نوفر تشكيلة واسعة من أجود أنواع الرخام الطبيعي مثل كالاكاتا، ستاتوريو، نيرو ماركينا، ترافنتين بيج، وفيردي ألبي الزمردي.",
      icon: Droplet,
    },
    {
      title: "تفصيل وتخصيص حسب مساحتك",
      description: "مرونة كاملة في تعديل الأبعاد والمقاسات، وإمكانية إضافة وحدات تخزين مخصصة أو دمج المغسلة مع تكسية الجدار المحيط.",
      icon: Ruler,
    },
    {
      title: "تواصل مباشر واستشارة عبر واتساب",
      description: "تجربة تواصل سلسة دون تعقيدات؛ استشرنا حول أفكارك وسنشاركك النماذج والحلول الهندسية المناسبة مباشرة عبر محادثة واحدة.",
      icon: MessageCircle,
    },
  ];

  return (
    <section id="why-us" className="py-20 sm:py-24 bg-[#FAF9F6] dark:bg-[#0E0E10] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-xs sm:text-sm font-semibold tracking-wider text-[#9A7B38] dark:text-[#D4AF37] uppercase mb-2">
            معايير العمل والمهنية
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E2022] dark:text-[#F5F2EB] tracking-tight mb-4 [text-wrap:balance]">
            لماذا تختار مَرمَرِيس لمغاسل منزلك؟
          </h2>
          <p className="text-base sm:text-lg text-[#615A52] dark:text-[#A8A296] leading-relaxed font-light">
            نجمع بين شغف الحجر الطبيعي والحلول المعمارية الحديثة لنقدم قطعاً رخامية تتجاوز المألوف في الجمال والدقة والعملية.
          </p>
        </div>

        {/* 5 Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-[#161619] p-7 rounded-xl border border-[#EBE4D8] dark:border-[#28282D] transition-all duration-300 hover:shadow-md hover:border-[#D8CFBF] dark:hover:border-[#3D3D45] flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-lg bg-[#F5EFE6] dark:bg-[#202024] text-[#9A7B38] dark:text-[#D4AF37] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1E2022] dark:text-[#F5F2EB] mb-3">
                    {point.title}
                  </h3>
                  <p className="text-sm text-[#666057] dark:text-[#A19A8E] leading-relaxed">
                    {point.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F2ECE1] dark:border-[#25252A] text-[11px] text-[#A39A8D] dark:text-[#6D6860] font-mono tabular-nums">
                  0{index + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
