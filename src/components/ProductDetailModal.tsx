import React, { useState, useEffect } from 'react';
import { Product } from '../data/products';
import { buildProductWhatsAppUrl, siteConfig as defaultSiteConfig } from '../config/siteConfig';
import {
  X,
  MessageCircle,
  Share2,
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Layers,
  Ruler,
  Compass,
  Droplets,
  ArrowUpLeft,
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onShowToast: (message: string) => void;
  whatsappNumber?: string;
  currency?: string;
  brandName?: string;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onShowToast,
  whatsappNumber,
  currency = defaultSiteConfig.currency,
  brandName = defaultSiteConfig.brandName,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    setSelectedImageIndex(0);
    setCopiedLink(false);

    if (product) {
      document.body.style.overflow = 'hidden';
      window.location.hash = product.code;
      document.title = `${product.name} (${product.code}) | ${brandName}`;
    }

    return () => {
      document.body.style.overflow = '';
      if (!window.location.hash.startsWith('#custom') && !window.location.hash.startsWith('#products') && !window.location.hash.startsWith('#admin')) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
        document.title = `${brandName} للرخام الفاخر | مغاسل ووحدات رخامية مخصصة`;
      }
    };
  }, [product, brandName]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const fullProductUrl = `${currentOrigin}${currentPath}#${product.code}`;
  const whatsappUrl = buildProductWhatsAppUrl(
    product.name,
    product.code,
    fullProductUrl,
    whatsappNumber
  );

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullProductUrl);
      setCopiedLink(true);
      onShowToast('تم نسخ رابط المغسلة المباشر بنجاح!');
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      onShowToast('تعذر نسخ الرابط تلقائياً');
    }
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 lg:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAF9F6] dark:bg-[#161619] w-full max-w-4xl rounded-xl shadow-2xl border border-[#E0D8CC] dark:border-[#2C2C32] overflow-hidden my-auto text-[#1E2022] dark:text-[#F3F1EC] max-h-[92vh] flex flex-col transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8E2D8] dark:border-[#28282E] bg-[#F7F4EE] dark:bg-[#131316]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-medium px-2 py-0.5 bg-[#E8E1D5] dark:bg-[#25252A] rounded-xs text-[#3D3833] dark:text-[#D4CFBE] tabular-nums">
              {product.code}
            </span>
            <span className="text-xs text-[#7A7368] dark:text-[#9A9387] font-medium hidden sm:inline">
              {product.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Copy Link Button */}
            <button
              onClick={handleCopyLink}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#4A453F] dark:text-[#D1CBC0] hover:text-[#171717] dark:hover:text-white bg-white dark:bg-[#202025] border border-[#DDD5C7] dark:border-[#38373E] rounded-md transition-colors cursor-pointer"
              title="نسخ رابط هذا الموديل"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-700 dark:text-emerald-300 font-semibold">تم النسخ</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#857D72] dark:text-[#A8A194]" />
                  <span>مشاركة الرابط</span>
                </>
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              type="button"
              className="p-1.5 text-[#6B645A] dark:text-[#A8A194] hover:text-[#171717] dark:hover:text-white hover:bg-[#EBE4D8] dark:hover:bg-[#25252B] rounded-md transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C5A059]"
              aria-label="إغلاق النافذة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-7 flex-1">
          {/* Main Grid: Gallery & Information */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left/Top: Gallery (7 Cols) */}
            <div className="lg:col-span-7 space-y-3">
              {/* Primary Image Display */}
              <div className="relative aspect-4/3 w-full bg-[#EFEAE1] dark:bg-[#1E1E22] rounded-lg overflow-hidden border border-[#E3DBD0] dark:border-[#2A2A30]">
                <img
                  src={product.images[selectedImageIndex]}
                  alt={`${product.name} - صورة ${selectedImageIndex + 1}`}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                  referrerPolicy="no-referrer"
                />

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      type="button"
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-black/60 hover:bg-white dark:hover:bg-black text-[#2C2925] dark:text-white shadow-sm transition-colors cursor-pointer"
                      aria-label="الصورة السابقة"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      type="button"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-black/60 hover:bg-white dark:hover:bg-black text-[#2C2925] dark:text-white shadow-sm transition-colors cursor-pointer"
                      aria-label="الصورة التالية"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[11px] font-mono rounded-xs tabular-nums">
                  {selectedImageIndex + 1} / {product.images.length}
                </div>
              </div>

              {/* Thumbnails Row */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      type="button"
                      className={`relative w-20 h-16 rounded-md overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        selectedImageIndex === idx
                          ? 'border-[#9A7B38] dark:border-[#D4AF37] ring-1 ring-[#9A7B38]'
                          : 'border-[#DDD5C7] dark:border-[#333238] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`صورة مصغرة ${idx + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right/Bottom: Product Meta & Purchase Panel (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#9A7B38] dark:text-[#D4AF37] mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>رخام طبيعي فاخر</span>
                  {product.badge && (
                    <>
                      <span aria-hidden="true" className="text-[#DDD5C7] dark:text-[#44423E]">·</span>
                      <span className="text-[#3A3631] dark:text-[#D1CBC0] bg-[#EDE6DC] dark:bg-[#25252A] px-2 py-0.5 rounded-xs font-normal">
                        {product.badge}
                      </span>
                    </>
                  )}
                </div>

                <h2
                  id="modal-product-title"
                  className="text-2xl font-bold text-[#1E2022] dark:text-white leading-snug mb-3"
                >
                  {product.name}
                </h2>

                {/* Price Display */}
                <div className="p-3.5 bg-[#F2EDE4] dark:bg-[#1E1E22] rounded-lg border border-[#E3DBD0] dark:border-[#2E2E34] mb-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-medium text-[#6B645A] dark:text-[#9A9387]">السعر التقديري:</span>
                    {product.price !== undefined ? (
                      <div className="font-['Plus_Jakarta_Sans',sans-serif]">
                        <span className="text-2xl font-bold text-[#1E2022] dark:text-white tabular-nums ml-1.5">
                          {product.price.toLocaleString('en-US')}
                        </span>
                        <span className="text-sm font-semibold text-[#6B645A] dark:text-[#9A9387]">
                          {currency}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm font-semibold text-[#9A7B38] dark:text-[#D4AF37]">
                        حسب المقاسات والمواصفات المختارة
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#7C756B] dark:text-[#888175] mt-1">
                    * يشمل المعالجة المانعة للبقع والحوامل الهيكلية التثبيتية.
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-2 text-sm text-[#4A453F] dark:text-[#C7C2B6] leading-relaxed">
                  <p>{product.fullDescription}</p>
                </div>
              </div>

              {/* Instant WhatsApp Order CTA in Drawer */}
              <div className="pt-4 border-t border-[#E8E2D8] dark:border-[#28282E] space-y-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 text-base font-semibold text-white bg-[#1E2022] hover:bg-[#323639] dark:bg-[#D4AF37] dark:text-[#121214] dark:hover:bg-[#E0BC48] rounded-md transition-all shadow-md hover:shadow-lg cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1E2022] dark:focus-visible:ring-[#D4AF37]"
                >
                  <MessageCircle className="w-5 h-5 text-[#D8B26E] dark:text-[#121214]" />
                  <span>اطلب هذا الموديل عبر واتساب</span>
                  <ArrowUpLeft className="w-4 h-4 opacity-70" />
                </a>
                <p className="text-center text-[11px] text-[#8C8479] dark:text-[#7A746B]">
                  سيتم إرسال كود الموديل ورابطه تلقائياً للرد السريع وتأكيد المقاسات.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Specifications Section */}
          <div className="pt-6 border-t border-[#E8E2D8] dark:border-[#28282E]">
            <h3 className="text-base font-bold text-[#1E2022] dark:text-white mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#9A7B38] dark:text-[#D4AF37]" />
              <span>المواصفات الفنية وتفاصيل التصنيع</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-3 bg-white dark:bg-[#1E1E22] rounded-md border border-[#EBE4D8] dark:border-[#2C2C32] flex items-start gap-2.5">
                <Compass className="w-4 h-4 text-[#9A7B38] dark:text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1E2022] dark:text-white block">نوع الرخام والخامة:</span>
                  <span className="text-[#615A52] dark:text-[#B3ADA2]">{product.specs.marbleType}</span>
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-[#1E1E22] rounded-md border border-[#EBE4D8] dark:border-[#2C2C32] flex items-start gap-2.5">
                <Ruler className="w-4 h-4 text-[#9A7B38] dark:text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1E2022] dark:text-white block">الأبعاد والقياسات:</span>
                  <span className="text-[#615A52] dark:text-[#B3ADA2]">{product.specs.dimensions}</span>
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-[#1E1E22] rounded-md border border-[#EBE4D8] dark:border-[#2C2C32] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#9A7B38] dark:text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1E2022] dark:text-white block">التشطيب والمعالجة:</span>
                  <span className="text-[#615A52] dark:text-[#B3ADA2]">{product.specs.finish}</span>
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-[#1E1E22] rounded-md border border-[#EBE4D8] dark:border-[#2C2C32] flex items-start gap-2.5">
                <Droplets className="w-4 h-4 text-[#9A7B38] dark:text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#1E2022] dark:text-white block">طريقة التثبيت ونظام الصرف:</span>
                  <span className="text-[#615A52] dark:text-[#B3ADA2]">
                    {product.specs.installation} · {product.specs.drainType}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
