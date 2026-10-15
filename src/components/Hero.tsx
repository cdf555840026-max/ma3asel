import React from 'react';
import { ArrowDown, Sparkles, Compass } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onCustomDesignClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onCustomDesignClick,
}) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Imagery with Measured Scrim for AA Contrast */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_luxury_marble_sink_1792062680945.jpg"
          alt="مغسلة رخام كالاكاتا في حمام فخم عصري"
          className="w-full h-full object-cover object-center scale-102 transition-transform duration-1000 ease-out"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        {/* Soft, luxury gradient overlays for optimal text legibility */}
        <div className="absolute inset-0 bg-linear-to-r from-[#141210]/90 via-[#141210]/65 to-[#141210]/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#141210]/40 to-[#141210]/80" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-right w-full">
        <div className="max-w-3xl">
          {/* Quiet Category Lead-in (Zero-Pill Discipline: unboxed clean text) */}
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs sm:text-sm font-semibold tracking-widest text-[#E6C98A] uppercase mb-5">
            <span>مجموعات الرخام الحجري الطبيعي</span>
            <span aria-hidden="true" className="opacity-60">·</span>
            <span>تصاميم معمارية خاصة</span>
          </div>

          {/* Headline (Refined luxury Arabic typography with text-wrap: balance) */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.25] mb-6 [text-wrap:balance]">
            فخامة الرخام تبدأ من التفاصيل
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-[#E8E4DD] leading-relaxed max-w-2xl font-light mb-10 text-pretty">
            اكتشف تشكيلة مميزة من مغاسل الرخام المصممة لتمنح مساحتك لمسة من الفخامة والأناقة، أو اطلب تصميمًا خاصًا يناسب ذوقك ومساحتك.
          </p>

          {/* The Two Primary Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 justify-center sm:justify-start">
            <button
              onClick={onExploreClick}
              type="button"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-[#181614] bg-[#F5EDE0] hover:bg-white rounded-md shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#E6C98A]"
            >
              <Compass className="w-5 h-5 text-[#9A7B38]" />
              <span>اكتشف تشكيلتنا</span>
            </button>

            <button
              onClick={onCustomDesignClick}
              type="button"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 backdrop-blur-sm rounded-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
            >
              <Sparkles className="w-5 h-5 text-[#E6C98A]" />
              <span>صمّم مغسلتك الخاصة</span>
            </button>
          </div>
        </div>

        {/* Clean Editorial Trust Bar (Unboxed Metadata Discipline) */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-white/15 flex flex-wrap items-center justify-center sm:justify-start gap-y-3 gap-x-6 text-xs sm:text-sm text-[#D1C9BE]">
          <span className="font-medium text-white/95">رخام طبيعي نخب أول 100%</span>
          <span aria-hidden="true" className="opacity-40">·</span>
          <span>قص ونحت بالمليمتر (زوايا 45°)</span>
          <span aria-hidden="true" className="opacity-40">·</span>
          <span>تصريف انسيابي مخفي</span>
          <span aria-hidden="true" className="opacity-40">·</span>
          <span>استشارة فورية عبر واتساب</span>
        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-[#E0D8CC]/60 pointer-events-none">
        <ArrowDown className="w-4 h-4 animate-bounce opacity-70" />
      </div>
    </section>
  );
};
