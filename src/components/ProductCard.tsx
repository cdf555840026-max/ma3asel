import React from 'react';
import { Product } from '../data/products';
import { buildProductWhatsAppUrl, siteConfig as defaultSiteConfig } from '../config/siteConfig';
import { MessageCircle, Eye, ArrowUpLeft, ShieldCheck } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  whatsappNumber?: string;
  currency?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  whatsappNumber,
  currency = defaultSiteConfig.currency,
}) => {
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const directProductUrl = `${currentOrigin}${currentPath}#${product.code}`;
  
  const whatsappUrl = buildProductWhatsAppUrl(
    product.name,
    product.code,
    directProductUrl,
    whatsappNumber
  );

  return (
    <article
      id={product.code}
      className="group relative bg-white dark:bg-[#161619] border border-[#EBE5DC] dark:border-[#28282D] rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:border-[#D8CFBF] dark:hover:border-[#3D3D45]"
    >
      {/* Product Image Slot with Aspect Ratio & Fallback container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#F2EDE4] dark:bg-[#1E1E22]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-104"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              const fallback = document.createElement('div');
              fallback.className = 'w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#EDE7DD] dark:bg-[#202024] text-[#7A7267] dark:text-[#A8A296]';
              fallback.innerHTML = `<span class="text-sm font-semibold">${product.name}</span><span class="text-xs mt-1 opacity-70">${product.code}</span>`;
              parent.appendChild(fallback);
            }
          }}
        />

        {/* Quiet Editorial Badge */}
        {product.badge && (
          <div className="absolute top-3 right-3 bg-[#1E2022]/85 dark:bg-[#0E0E10]/90 text-[#F5EDE0] backdrop-blur-xs px-2.5 py-1 text-xs font-medium tracking-wide rounded-xs shadow-xs border border-white/10">
            {product.badge}
          </div>
        )}

        {/* Product Code Indicator */}
        <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-[#141417]/90 backdrop-blur-xs text-[#2A2724] dark:text-[#E8E4DC] px-2 py-0.5 text-xs font-mono font-medium rounded-xs border border-[#E0D7C9] dark:border-[#333238] tabular-nums">
          {product.code}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Category / Sub-line */}
          <div className="flex items-center justify-between text-xs text-[#8C8479] dark:text-[#A1998D] font-medium mb-1.5">
            <span>{product.category}</span>
            <span className="flex items-center gap-1 text-[#9A7B38] dark:text-[#D4AF37]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>رخام طبيعي</span>
            </span>
          </div>

          {/* Model Name */}
          <h3 className="text-lg font-bold text-[#1E2022] dark:text-[#F3F1EC] group-hover:text-[#9A7B38] dark:group-hover:text-[#D4AF37] transition-colors line-clamp-1 mb-2">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-sm text-[#666057] dark:text-[#9E978C] line-clamp-2 leading-relaxed mb-4">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Actions Area */}
        <div className="pt-4 border-t border-[#F0EBE2] dark:border-[#242429] mt-auto">
          {/* Price (Optional) */}
          <div className="flex items-baseline justify-between mb-4">
            <span className="text-xs text-[#857D72] dark:text-[#8E867A]">السعر:</span>
            {product.price !== undefined ? (
              <div className="text-left font-['Plus_Jakarta_Sans',sans-serif]">
                <span className="text-lg font-bold text-[#1E2022] dark:text-white tabular-nums ml-1">
                  {product.price.toLocaleString('en-US')}
                </span>
                <span className="text-xs font-semibold text-[#857D72] dark:text-[#A19A8E]">
                  {currency}
                </span>
              </div>
            ) : (
              <span className="text-xs font-medium text-[#9A7B38] dark:text-[#D4AF37]">
                السعر مخصص عند الطلب
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* View Details Button */}
            <button
              onClick={() => onViewDetails(product)}
              type="button"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs sm:text-sm font-medium text-[#2E2B27] dark:text-[#E2DDD5] bg-[#F5F2EC] dark:bg-[#202024] hover:bg-[#EAE4D8] dark:hover:bg-[#28282E] border border-[#DDD5C7] dark:border-[#333238] rounded-md transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C5A059]"
            >
              <Eye className="w-4 h-4 text-[#736B5F] dark:text-[#A8A194]" />
              <span>التفاصيل</span>
            </button>

            {/* Order via WhatsApp Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`اطلب موديل ${product.name} عبر واتساب`}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs sm:text-sm font-semibold text-white bg-[#1E2022] hover:bg-[#323639] dark:bg-[#D4AF37] dark:text-[#121214] dark:hover:bg-[#E0BC48] rounded-md transition-all shadow-xs hover:shadow-sm cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-[#1E2022] dark:focus-visible:ring-[#D4AF37]"
            >
              <MessageCircle className="w-4 h-4 text-[#D8B26E] dark:text-[#121214]" />
              <span className="truncate">اطلب الآن</span>
              <ArrowUpLeft className="w-3.5 h-3.5 opacity-60 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
