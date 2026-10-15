import React, { useState } from 'react';
import { inspirationLookbook } from '../data/products';
import { Maximize2, X, ChevronRight, ChevronLeft } from 'lucide-react';

export const InspirationGallery: React.FC = () => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
    document.body.style.overflow = '';
  };

  const nextLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % inspirationLookbook.length);
    }
  };

  const prevLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + inspirationLookbook.length) % inspirationLookbook.length
      );
    }
  };

  return (
    <section id="inspiration" className="py-20 sm:py-24 bg-[#FAF9F6] dark:bg-[#0E0E10] border-t border-[#EAE3D5] dark:border-[#222226] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="text-xs sm:text-sm font-semibold tracking-wider text-[#9A7B38] dark:text-[#D4AF37] uppercase mb-2">
              أفكار وإلهام معماري
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1E2022] dark:text-[#F5F2EB] tracking-tight mb-3 [text-wrap:balance]">
              معرض الإلهام وتناغم الفراغات
            </h2>
            <p className="text-base text-[#615A52] dark:text-[#A8A296] leading-relaxed font-light">
              شاهد كيف تحول مغاسل الرخام الفاخرة بيئة الحمام ومجالس الضيوف إلى واحة من الصفاء والهدوء والجمال الهندسي.
            </p>
          </div>
          <span className="text-xs text-[#8C8479] dark:text-[#7A746B] hidden md:inline-block">
            * اضغط على أي صورة لتكبيرها ومشاهدة أدق التفاصيل
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {inspirationLookbook.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-4/3 rounded-lg overflow-hidden bg-[#ECE6DC] dark:bg-[#1E1E22] border border-[#E3DBD0] dark:border-[#2C2C32] cursor-pointer shadow-xs hover:shadow-md transition-all"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Content */}
              <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between text-white">
                <div className="flex justify-end">
                  <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-[#E6C98A] block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-[#FAF9F6] leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 left-4 p-2.5 text-white/80 hover:text-white rounded-full bg-black/40 hover:bg-black/60 transition-colors z-10 cursor-pointer"
            aria-label="إغلاق التكبير"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevLightbox();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white rounded-full bg-black/40 hover:bg-black/60 transition-colors z-10 cursor-pointer"
            aria-label="السابق"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextLightbox();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white rounded-full bg-black/40 hover:bg-black/60 transition-colors z-10 cursor-pointer"
            aria-label="التالي"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={inspirationLookbook[activeLightboxIndex].image}
              alt={inspirationLookbook[activeLightboxIndex].title}
              className="max-w-full max-h-[75vh] object-contain rounded-md shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="mt-4 text-center text-white">
              <span className="text-xs text-[#E6C98A] block mb-1">
                {inspirationLookbook[activeLightboxIndex].category}
              </span>
              <p className="text-base font-semibold">
                {inspirationLookbook[activeLightboxIndex].title}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
