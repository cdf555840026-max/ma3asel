import React, { useState, useMemo } from 'react';
import { Product, CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { Search, RefreshCcw } from 'lucide-react';

interface ProductShowcaseProps {
  products: Product[];
  onViewDetails: (product: Product) => void;
  whatsappNumber?: string;
  currency?: string;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  products,
  onViewDetails,
  whatsappNumber,
  currency,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('جميع الموديلات');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const availableCategories = useMemo(() => {
    const list: string[] = ['جميع الموديلات'];
    const allCategoriesInProducts = Array.from(
      new Set(products.map((p) => p.category?.trim()).filter(Boolean))
    );

    // Preferred order from predefined baseline categories
    CATEGORIES.forEach((cat) => {
      if (cat !== 'جميع الموديلات' && allCategoriesInProducts.includes(cat)) {
        list.push(cat);
      }
    });

    // Add any custom categories typed by the admin
    allCategoriesInProducts.forEach((cat) => {
      if (!list.includes(cat)) {
        list.push(cat);
      }
    });

    return list;
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'جميع الموديلات' || product.category === activeCategory;

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.code.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query) ||
        product.specs.marbleType.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  return (
    <section id="products" className="py-20 sm:py-24 bg-[#FAF9F6] dark:bg-[#0E0E10] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-[#9A7B38] dark:text-[#D4AF37] uppercase mb-2">
            <span>كتالوج المعرض الحصري</span>
            <span aria-hidden="true">·</span>
            <span>تصاميم جاهزة وتفصيل مخصص</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1E2022] dark:text-[#F5F2EB] tracking-tight mb-4 [text-wrap:balance]">
            تشكيلة مغاسل الرخام الفاخرة
          </h2>
          <p className="text-base sm:text-lg text-[#615A52] dark:text-[#A8A296] leading-relaxed font-light">
            استكشف روائع الرخام الطبيعي المنحوت بأعلى مقاييس الجودة، تصفح الموديلات واطلب موديلك المفضل مباشرة عبر واتساب مع كود ورابط المنتج.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E8E2D8] dark:border-[#222226]">
            {/* Interactive Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  type="button"
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#1E2022] text-[#FAF9F6] dark:bg-[#D4AF37] dark:text-[#121214] shadow-xs'
                      : 'bg-[#F2ECE1] dark:bg-[#1A1A1E] text-[#524B43] dark:text-[#B5AFA4] hover:bg-[#E8E0D2] dark:hover:bg-[#25252A] hover:text-[#171717] dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 text-[#8C8479] dark:text-[#7A746B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث بالاسم، الكود (MAR)، أو نوع الرخام..."
                className="w-full pl-3 pr-9 py-2 text-xs sm:text-sm bg-white dark:bg-[#17171A] border border-[#DDD5C7] dark:border-[#2E2E34] rounded-md focus:border-[#9A7B38] dark:focus:border-[#D4AF37] focus:ring-1 focus:ring-[#9A7B38] focus:outline-hidden transition-colors text-[#1E2022] dark:text-[#F3F1EC] placeholder:text-[#9E968A] dark:placeholder:text-[#69655D]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  type="button"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8C8479] hover:text-[#171717] dark:hover:text-white"
                  aria-label="مسح البحث"
                >
                  إلغاء
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Indicator */}
          <div className="flex items-center justify-between text-xs text-[#7A7368] dark:text-[#8E867A]">
            <span>
              عرض <strong className="text-[#1E2022] dark:text-white tabular-nums font-mono">{filteredProducts.length}</strong> من أصل{' '}
              <span className="tabular-nums font-mono">{products.length}</span> موديل
            </span>
            {(activeCategory !== 'جميع الموديلات' || searchQuery) && (
              <button
                onClick={() => {
                  setActiveCategory('جميع الموديلات');
                  setSearchQuery('');
                }}
                type="button"
                className="inline-flex items-center gap-1 text-[#9A7B38] dark:text-[#D4AF37] hover:underline cursor-pointer"
              >
                <RefreshCcw className="w-3 h-3" />
                <span>إعادة ضبط التصفية</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onViewDetails}
                whatsappNumber={whatsappNumber}
                currency={currency}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white dark:bg-[#161619] border border-[#E8E2D8] dark:border-[#26262B] rounded-xl max-w-lg mx-auto">
            <p className="text-base font-semibold text-[#1E2022] dark:text-white mb-2">
              لم نعثر على موديلات تطابق بحثك
            </p>
            <p className="text-xs sm:text-sm text-[#736B5F] dark:text-[#9A9387] mb-6">
              جرب البحث بكلمات أخرى أو تصفح كافة الموديلات المتاحة في المعرض.
            </p>
            <button
              onClick={() => {
                setActiveCategory('جميع الموديلات');
                setSearchQuery('');
              }}
              type="button"
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#1E2022] dark:bg-[#D4AF37] dark:text-[#121214] hover:bg-[#323639] rounded-md transition-colors"
            >
              عرض جميع الموديلات
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
