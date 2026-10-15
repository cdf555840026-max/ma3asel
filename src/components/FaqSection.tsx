import React, { useState } from 'react';
import { faqList } from '../data/products';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-24 bg-[#FAF9F6] dark:bg-[#0E0E10] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#9A7B38] dark:text-[#D4AF37] uppercase mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>إجابات واضحة ومباشرة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E2022] dark:text-[#F5F2EB] tracking-tight mb-4 [text-wrap:balance]">
            الأسئلة الأكثر شيوعاً
          </h2>
          <p className="text-base text-[#615A52] dark:text-[#A8A296] leading-relaxed font-light">
            كل ما تود معرفته حول تفصيل مغاسل الرخام، أنواع الأحجار، وطريقة الطلب والتواصل المباشر.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqList.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-[#161619] rounded-lg border border-[#E8E2D8] dark:border-[#28282D] transition-colors overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full flex items-center justify-between text-right p-5 sm:p-6 text-base sm:text-lg font-bold text-[#1E2022] dark:text-[#F5F2EB] hover:text-[#9A7B38] dark:hover:text-[#D4AF37] transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-[#9A7B38]"
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug pl-4">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8C8479] dark:text-[#7A746B] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#9A7B38] dark:text-[#D4AF37]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#575047] dark:text-[#B5AFA4] leading-relaxed border-t border-[#F5F0E6] dark:border-[#222226]">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
