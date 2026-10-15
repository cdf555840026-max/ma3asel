import React, { useState } from 'react';
import { Product, CATEGORIES } from '../data/products';
import { SiteConfig } from '../config/siteConfig';
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  ArrowRight,
  Upload,
  Image as ImageIcon,
  Check,
  Settings,
  Package,
  RotateCcw,
  AlertTriangle,
  Sun,
  Moon,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  onSaveProducts: (updatedProducts: Product[]) => void;
  siteConfig: SiteConfig;
  onSaveSiteConfig: (updatedConfig: SiteConfig) => void;
  onResetCatalog: () => void;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  onSaveProducts,
  siteConfig,
  onSaveSiteConfig,
  onResetCatalog,
  onClose,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Settings form local state
  const [configForm, setConfigForm] = useState<SiteConfig>({ ...siteConfig });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Product form local state
  const [productForm, setProductForm] = useState<Product>({
    id: '',
    code: '',
    name: '',
    category: 'مغاسل رخام فاخرة',
    shortDescription: '',
    fullDescription: '',
    price: undefined,
    badge: '',
    images: [''],
    specs: {
      marbleType: '',
      dimensions: '',
      finish: 'معالجة مطفية حريرية ومقاومة للبقع بالنانو',
      installation: 'تثبيت جداري معلق مخفي',
      drainType: 'تصريف خفي مائل',
      customizable: true,
    },
    featured: true,
  });

  const handleOpenAdd = () => {
    // Generate next product code e.g. MAR-008
    const count = products.length + 1;
    const nextCode = `MAR-${String(count).padStart(3, '0')}`;

    setProductForm({
      id: nextCode,
      code: nextCode,
      name: '',
      category: 'مغاسل معلقة',
      shortDescription: '',
      fullDescription: '',
      price: undefined,
      badge: 'تصميم جديد',
      images: ['/src/assets/images/sink_calacatta_gold_floating_1792062681832.jpg'],
      specs: {
        marbleType: 'رخام طبيعي نخب أول',
        dimensions: '120 سم × 50 سم × 20 سم',
        finish: 'معالجة نانو عازلة للسوائل والزيوت',
        installation: 'تثبيت جداري معلق',
        drainType: 'تصريف انسيابي مخفي',
        customizable: true,
      },
      featured: true,
    });
    setIsAddingNew(true);
    setEditingProduct(null);
  };

  const handleOpenEdit = (product: Product) => {
    setProductForm({ ...product });
    setEditingProduct(product);
    setIsAddingNew(false);
  };

  const handleCloseForm = () => {
    setIsAddingNew(false);
    setEditingProduct(null);
  };

  // Image file upload converted to Data URL
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setProductForm((prev) => ({
            ...prev,
            images: [reader.result as string, ...prev.images.slice(1)],
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim() || !productForm.code.trim()) {
      alert('يرجى ملء اسم المغسلة وكود المنتج.');
      return;
    }

    if (isAddingNew) {
      const newProduct: Product = {
        ...productForm,
        id: productForm.code.trim().toUpperCase(),
        code: productForm.code.trim().toUpperCase(),
      };
      onSaveProducts([newProduct, ...products]);
    } else if (editingProduct) {
      const updated = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...productForm,
              code: productForm.code.trim().toUpperCase(),
            }
          : p
      );
      onSaveProducts(updated);
    }

    handleCloseForm();
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    onSaveProducts(updated);
    setDeleteConfirmId(null);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSiteConfig(configForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F5F2EB] dark:bg-[#0B0B0D] text-[#1E2022] dark:text-[#F3F1EC] font-['Cairo',sans-serif] transition-colors duration-300">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-30 bg-white dark:bg-[#141417] border-b border-[#E3DBD0] dark:border-[#242429] px-4 sm:px-6 lg:px-8 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-[#3A3631] dark:text-[#E0DBD1] hover:text-[#171717] dark:hover:text-white bg-[#F2EDE4] dark:bg-[#202025] hover:bg-[#E8E0D2] dark:hover:bg-[#2A2A30] rounded-md transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>العودة إلى المعرض</span>
            </button>

            <div className="border-r border-[#DDD5C7] dark:border-[#333238] pr-3 mr-1">
              <h1 className="text-base sm:text-lg font-bold text-[#1E2022] dark:text-white">
                لوحة إدارة متجر مَرمَرِيس
              </h1>
              <p className="text-[11px] text-[#7A7368] dark:text-[#9A9387] hidden sm:block">
                إضافة وتعديل المغاسل والأسعار، وضبط إعدادات الواتساب
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleDarkMode}
              type="button"
              className="p-2 text-[#524B43] dark:text-[#D4AF37] hover:bg-[#EFE9DF] dark:hover:bg-[#202025] rounded-md transition-colors cursor-pointer"
              aria-label={isDarkMode ? 'الوضع النهاري' : 'الوضع الداكن'}
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-[#E6C98A]" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={handleOpenAdd}
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#1E2022] hover:bg-[#323639] dark:bg-[#D4AF37] dark:text-[#121214] dark:hover:bg-[#E0BC48] rounded-md shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة مغسلة جديدة</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-[#DDD5C7] dark:border-[#242429] pb-3">
          <button
            onClick={() => {
              setActiveTab('products');
              handleCloseForm();
            }}
            type="button"
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-md transition-colors cursor-pointer ${
              activeTab === 'products'
                ? 'bg-[#1E2022] text-white dark:bg-[#D4AF37] dark:text-[#121214]'
                : 'text-[#615A52] dark:text-[#A8A296] hover:bg-[#EAE4D8] dark:hover:bg-[#1C1C22]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>قائمة المغاسل ({products.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('settings');
              handleCloseForm();
            }}
            type="button"
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-md transition-colors cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#1E2022] text-white dark:bg-[#D4AF37] dark:text-[#121214]'
                : 'text-[#615A52] dark:text-[#A8A296] hover:bg-[#EAE4D8] dark:hover:bg-[#1C1C22]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>إعدادات المتجر والواتساب</span>
          </button>
        </div>

        {/* TAB 1: PRODUCTS LIST */}
        {activeTab === 'products' && !isAddingNew && !editingProduct && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#141417] p-5 rounded-xl border border-[#E0D8CC] dark:border-[#26262B]">
              <div>
                <h2 className="text-lg font-bold text-[#1E2022] dark:text-white">
                  المغاسل والأحواض المعروضة
                </h2>
                <p className="text-xs text-[#7A7368] dark:text-[#9A9387]">
                  جميع المنتجات هنا تظهر تلقائياً في المعرض الرئيسي للزوار مع رسائل واتساب وروابطها المباشرة.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onResetCatalog}
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#8C8479] hover:text-red-600 dark:hover:text-red-400 bg-[#FAF8F5] dark:bg-[#1E1E24] border border-[#DDD5C7] dark:border-[#2E2E34] rounded-md transition-colors cursor-pointer"
                  title="استرجاع التشكيلة الافتراضية الأصلية"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>استرجاع التشكيلة الأصلية</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-white dark:bg-[#141417] rounded-xl border border-[#E0D8CC] dark:border-[#26262B] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#FAF8F5] dark:bg-[#1A1A1E] border-b border-[#E3DBD0] dark:border-[#28282E] text-xs font-bold text-[#7A7368] dark:text-[#A1998E]">
                      <th className="py-3 px-4">الصورة</th>
                      <th className="py-3 px-4">كود المنتج</th>
                      <th className="py-3 px-4">اسم الموديل</th>
                      <th className="py-3 px-4">التصنيف</th>
                      <th className="py-3 px-4">السعر</th>
                      <th className="py-3 px-4">الشارة</th>
                      <th className="py-3 px-4 text-center">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFEAE1] dark:divide-[#202025]">
                    {products.map((product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-[#FAF8F5]/80 dark:hover:bg-[#18181D] transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="w-14 h-11 rounded-md overflow-hidden bg-[#EFEAE1] dark:bg-[#202025] border border-[#DDD5C7] dark:border-[#2E2E34]">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-xs text-[#2A2724] dark:text-[#E8E4DC] tabular-nums">
                          {product.code}
                        </td>
                        <td className="py-3 px-4 font-semibold text-[#1E2022] dark:text-white">
                          {product.name}
                        </td>
                        <td className="py-3 px-4 text-xs text-[#6B645A] dark:text-[#A8A296]">
                          {product.category}
                        </td>
                        <td className="py-3 px-4 font-mono font-medium text-xs tabular-nums text-[#1E2022] dark:text-[#E8E4DC]">
                          {product.price !== undefined
                            ? `${product.price.toLocaleString('en-US')} ${siteConfig.currency}`
                            : 'السعر عند الطلب'}
                        </td>
                        <td className="py-3 px-4">
                          {product.badge ? (
                            <span className="px-2 py-0.5 text-[11px] font-semibold bg-[#EFE9DF] dark:bg-[#25252A] text-[#8C6D2B] dark:text-[#D4AF37] rounded-xs">
                              {product.badge}
                            </span>
                          ) : (
                            <span className="text-xs text-[#AAA398]">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenEdit(product)}
                              type="button"
                              className="p-1.5 text-[#544F49] dark:text-[#C7C2B6] hover:text-[#171717] dark:hover:text-white bg-[#F2EDE4] dark:bg-[#222228] hover:bg-[#E8E0D2] dark:hover:bg-[#2A2A30] rounded-md transition-colors cursor-pointer"
                              title="تعديل هذا الموديل"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>

                            {deleteConfirmId === product.id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleDeleteProduct(product.id)}
                                  type="button"
                                  className="px-2 py-1 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                                >
                                  تأكيد الحذف
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId(null)}
                                  type="button"
                                  className="px-2 py-1 text-xs text-[#7A7368] hover:bg-[#E8E0D2] rounded-md"
                                >
                                  إلغاء
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirmId(product.id)}
                                type="button"
                                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-md transition-colors cursor-pointer"
                                title="حذف هذا الموديل"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCT FORM (ADD OR EDIT) */}
        {(isAddingNew || editingProduct) && (
          <div className="bg-white dark:bg-[#141417] rounded-xl border border-[#E0D8CC] dark:border-[#26262B] p-6 sm:p-8 max-w-4xl mx-auto shadow-sm">
            <div className="flex items-center justify-between pb-5 mb-6 border-b border-[#E8E0D2] dark:border-[#242429]">
              <div>
                <h2 className="text-xl font-bold text-[#1E2022] dark:text-white">
                  {isAddingNew ? 'إضافة مغسلة جديدة للمتجر' : `تعديل الموديل: ${editingProduct?.name}`}
                </h2>
                <p className="text-xs text-[#7A7368] dark:text-[#9A9387]">
                  املأ البيانات ليتم إدراجها فوراً في المعرض مع رابط الطلب ورقم الواتساب.
                </p>
              </div>

              <button
                onClick={handleCloseForm}
                type="button"
                className="px-3 py-1.5 text-xs font-semibold text-[#544F49] dark:text-[#A8A296] hover:bg-[#F2EDE4] dark:hover:bg-[#202025] rounded-md"
              >
                إلغاء التعديل
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-6">
              {/* Row 1: Code & Name */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#2D2A26] dark:text-[#E8E4DC] mb-1.5">
                    كود المنتج * <span className="text-[11px] font-normal text-[#8C8479]">(مثل MAR-008)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.code}
                    onChange={(e) => setProductForm({ ...productForm, code: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm font-mono bg-[#FAF8F5] dark:bg-[#1A1A1E] border border-[#DDD5C7] dark:border-[#2E2E34] rounded-md focus:border-[#9A7B38] dark:focus:border-[#D4AF37] focus:outline-hidden text-[#1E2022] dark:text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#2D2A26] dark:text-[#E8E4DC] mb-1.5">
                    اسم الموديل *
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="مثال: مغسلة كالاكاتا رويال معلقة"
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] dark:bg-[#1A1A1E] border border-[#DDD5C7] dark:border-[#2E2E34] rounded-md focus:border-[#9A7B38] dark:focus:border-[#D4AF37] focus:outline-hidden text-[#1E2022] dark:text-white"
                  />
                </div>
              </div>

              {/* Row 2: Category, Price & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#2D2A26] dark:text-[#E8E4DC] mb-1.5">
                    التصنيف
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] dark:bg-[#1A1A1E] border border-[#DDD5C7] dark:border-[#2E2E34] rounded-md focus:border-[#9A7B38] dark:focus:border-[#D4AF37] focus:outline-hidden text-[#1E2022] dark:text-white"
                  >
                    {CATEGORIES.filter((c) => c !== 'جميع الموديلات').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D2A26] dark:text-[#E8E4DC] mb-1.5">
                    السعر ({siteConfig.currency}) <span className="font-normal text-[#8C8479]">(اتركه فارغاً إن كان عند الطلب)</span>
                  </label>
                  <input
                    type="number"
                    value={productForm.price ?? ''}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        price: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    placeholder="مثال: 5500"
                    className="w-full px-3.5 py-2 text-sm font-mono bg-[#FAF8F5] dark:bg-[#1A1A1E] border border-[#DDD5C7] dark:border-[#2E2E34] rounded-md focus:border-[#9A7B38] dark:focus:border-[#D4AF37] focus:outline-hidden text-[#1E2022] dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D2A26] dark:text-[#E8E4DC] mb-1.5">
                    الشارة التمييزية <span className="font-normal text-[#8C8479]">(اختياري)</span>
                  </label>
                  <input
                    type="text"
                    value={productForm.badge || ''}
                    onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                    placeholder="مثال: الأكثر طلباً / تصميم مميز"
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] dark:bg-[#1A1A1E] border border-[#DDD5C7] dark:border-[#2E2E34] rounded-md focus:border-[#9A7B38] dark:focus:border-[#D4AF37] focus:outline-hidden text-[#1E2022] dark:text-white"
                  />
                </div>
              </div>

              {/* Row 3: Image Upload & Preview */}
              <div>
                <label className="block text-xs font-bold text-[#2D2A26] dark:text-[#E8E4DC] mb-2">
                  صورة المغسلة الرئيسية
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-[#FAF8F5] dark:bg-[#1A1A1E] border border-[#DDD5C7] dark:border-[#2E2E34] rounded-lg">
                  <div className="w-24 h-20 rounded-md overflow-hidden bg-[#ECE6DC] dark:bg-[#25252A] border border-[#D5CCC0] dark:border-[#38373E] shrink-0">
                    {productForm.images[0] ? (
                      <img
                        src={productForm.images[0]}
                        alt="معاينة"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#9E968A]">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2 w-full">
                    <div className="flex items-center gap-3">
                      <label className="inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-white bg-[#1E2022] hover:bg-[#323639] dark:bg-[#D4AF37] dark:text-[#121214] rounded-md transition-colors cursor-pointer">
                        <Upload className="w-4 h-4" />
                        <span>رفع صورة من جهازك</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                      <span className="text-xs text-[#7A7368] dark:text-[#9A9387]">أو ضع رابط صورة مباشر أدناه:</span>
                    </div>

                    <input
                      type="text"
                      value={productForm.images[0]}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          images: [e.target.value, ...productForm.images.slice(1)],
                        })
                      }
                      placeholder="/src/assets/images/... أو https://..."
                      className="w-full px-3 py-1.5 text-xs font-mono bg-white dark:bg-[#141417] border border-[#DDD5C7] dark:border-[#2E2E34] rounded-md text-[#1E2022] dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Row 4: Descriptions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#2D2A26] dark:text-[#E8E4DC] mb-1.5">
                    الوصف المختصر (للبطاقة)
                  </label>
                  <textarea
                    rows={2}
                    value={productForm.shortDescription}
                    onChange={(e) =>
                      setProductForm({ ...productForm, shortDescription: e.target.value })
                    }
                    placeholder="وصف سريع يوضح الخامة والتصميم في سطرين..."
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] dark:bg-[#1A1A1E] border border-[#DDD5C7] dark:border-[#2E2E34] rounded-md focus:border-[#9A7B38] dark:focus:border-[#D4AF37] focus:outline-hidden text-[#1E2022] dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D2A26] dark:text-[#E8E4DC] mb-1.5">
                    الوصف التفصيلي (لصفحة الموديل)
                  </label>
                  <textarea
                    rows={2}
                    value={productForm.fullDescription}
                    onChange={(e) =>
                      setProductForm({ ...productForm, fullDescription: e.target.value })
                    }
                    placeholder="وصف تفصيلي يوضح العروق وجودة النحت وملاءمة المساحة..."
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] dark:bg-[#1A1A1E] border border-[#DDD5C7] dark:border-[#2E2E34] rounded-md focus:border-[#9A7B38] dark:focus:border-[#D4AF37] focus:outline-hidden text-[#1E2022] dark:text-white"
                  />
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="p-4 bg-[#FAF8F5] dark:bg-[#1A1A1E] rounded-lg border border-[#DDD5C7] dark:border-[#2E2E34] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#9A7B38] dark:text-[#D4AF37]">
                  المواصفات الفنية
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#615A52] dark:text-[#A8A296] mb-1">
                      نوع الرخام والخامة:
                    </label>
                    <input
                      type="text"
                      value={productForm.specs.marbleType}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          specs: { ...productForm.specs, marbleType: e.target.value },
                        })
                      }
                      placeholder="مثال: رخام كالاكاتا إيطالي أصلي"
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-[#141417] border border-[#DDD5C7] dark:border-[#2E2E34] rounded-md text-[#1E2022] dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#615A52] dark:text-[#A8A296] mb-1">
                      المقاسات والأبعاد:
                    </label>
                    <input
                      type="text"
                      value={productForm.specs.dimensions}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          specs: { ...productForm.specs, dimensions: e.target.value },
                        })
                      }
                      placeholder="مثال: 120 سم × 50 سم × 20 سم"
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-[#141417] border border-[#DDD5C7] dark:border-[#2E2E34] rounded-md text-[#1E2022] dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#615A52] dark:text-[#A8A296] mb-1">
                      نوع التشطيب والمعالجة:
                    </label>
                    <input
                      type="text"
                      value={productForm.specs.finish}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          specs: { ...productForm.specs, finish: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-[#141417] border border-[#DDD5C7] dark:border-[#2E2E34] rounded-md text-[#1E2022] dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#615A52] dark:text-[#A8A296] mb-1">
                      طريقة التثبيت:
                    </label>
                    <input
                      type="text"
                      value={productForm.specs.installation}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          specs: { ...productForm.specs, installation: e.target.value },
                        })
                      }
                      className="w-full px-3 py-1.5 text-xs bg-white dark:bg-[#141417] border border-[#DDD5C7] dark:border-[#2E2E34] rounded-md text-[#1E2022] dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8E0D2] dark:border-[#242429]">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-5 py-2.5 text-sm font-semibold text-[#615A52] dark:text-[#A8A296] hover:bg-[#EFEAE1] dark:hover:bg-[#202025] rounded-md transition-colors"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-[#1E2022] hover:bg-[#323639] dark:bg-[#D4AF37] dark:text-[#121214] dark:hover:bg-[#E0BC48] rounded-md shadow-xs transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ المغسلة في المعرض</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: STORE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-[#141417] rounded-xl border border-[#E0D8CC] dark:border-[#26262B] p-6 sm:p-8 max-w-3xl mx-auto shadow-sm">
            <div className="pb-5 mb-6 border-b border-[#E8E0D2] dark:border-[#242429]">
              <h2 className="text-xl font-bold text-[#1E2022] dark:text-white">
                إعدادات المتجر ورقم الواتساب
              </h2>
              <p className="text-xs text-[#7A7368] dark:text-[#9A9387]">
                أي تعديل هنا على رقم الواتساب يطبق فوراً على جميع أزرار الطلب والاستفسار وروابط الموديلات.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6">
              {/* WhatsApp Number Highlight */}
              <div className="p-4 bg-[#F2EDE4] dark:bg-[#1C1C22] rounded-lg border border-[#E0D7C9] dark:border-[#2C2C32] space-y-2">
                <label className="block text-xs font-bold text-[#1E2022] dark:text-[#D4AF37]">
                  رقم الواتساب الفعلي لاستلام الطلبات (صيغة دولية بدون + أو مسافات) *
                </label>
                <input
                  type="text"
                  dir="ltr"
                  required
                  value={configForm.whatsappNumber}
                  onChange={(e) =>
                    setConfigForm({
                      ...configForm,
                      whatsappNumber: e.target.value.replace(/[^0-9]/g, ''),
                    })
                  }
                  placeholder="966540001234"
                  className="w-full px-3.5 py-2.5 text-base font-mono bg-white dark:bg-[#141417] border border-[#DDD5C7] dark:border-[#38373E] rounded-md focus:border-[#9A7B38] dark:focus:border-[#D4AF37] focus:outline-hidden text-[#1E2022] dark:text-white text-right"
                />
                <p className="text-[11px] text-[#7A7368] dark:text-[#A1998E]">
                  مثال للسعودية: <strong className="font-mono">9665XXXXXXXX</strong> (بدون صفر البداية وبدون علامة +).
                </p>
              </div>

              {/* Brand and Phone Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#2D2A26] dark:text-[#E8E4DC] mb-1.5">
                    اسم المعرض / العلامة التجارية
                  </label>
                  <input
                    type="text"
                    value={configForm.brandName}
                    onChange={(e) => setConfigForm({ ...configForm, brandName: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] dark:bg-[#1A1A1E] border border-[#DDD5C7] dark:border-[#2E2E34] rounded-md text-[#1E2022] dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D2A26] dark:text-[#E8E4DC] mb-1.5">
                    رقم الهاتف الظاهر في الموقع
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={configForm.displayPhone}
                    onChange={(e) => setConfigForm({ ...configForm, displayPhone: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] dark:bg-[#1A1A1E] border border-[#DDD5C7] dark:border-[#2E2E34] rounded-md text-[#1E2022] dark:text-white text-right"
                  />
                </div>
              </div>

              {/* City and Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#2D2A26] dark:text-[#E8E4DC] mb-1.5">
                    المدينة والدولة
                  </label>
                  <input
                    type="text"
                    value={configForm.cityCountry}
                    onChange={(e) => setConfigForm({ ...configForm, cityCountry: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] dark:bg-[#1A1A1E] border border-[#DDD5C7] dark:border-[#2E2E34] rounded-md text-[#1E2022] dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D2A26] dark:text-[#E8E4DC] mb-1.5">
                    العملة
                  </label>
                  <input
                    type="text"
                    value={configForm.currency}
                    onChange={(e) => setConfigForm({ ...configForm, currency: e.target.value })}
                    placeholder="ر.س"
                    className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] dark:bg-[#1A1A1E] border border-[#DDD5C7] dark:border-[#2E2E34] rounded-md text-[#1E2022] dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E0D2] dark:border-[#242429] flex items-center justify-between">
                <div>
                  {settingsSaved && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <Check className="w-4 h-4" />
                      <span>تم حفظ الإعدادات بنجاح!</span>
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-[#1E2022] hover:bg-[#323639] dark:bg-[#D4AF37] dark:text-[#121214] dark:hover:bg-[#E0BC48] rounded-md shadow-xs transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ إعدادات المتجر</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};
