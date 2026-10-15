/**
 * إعدادات الموقع الرئيسية والاتصال
 * Site Configuration & Contact Settings
 */

export interface SiteConfig {
  brandName: string;
  brandSubtitle: string;
  tagline: string;
  heroDescription: string;
  whatsappNumber: string;
  displayPhone: string;
  email: string;
  address: string;
  cityCountry: string;
  currency: string;
  socialLinks: {
    instagram?: string;
    tiktok?: string;
    snapchat?: string;
  };
}

export const defaultSiteConfig: SiteConfig = {
  brandName: "مَرمَرِيس",
  brandSubtitle: "للرخام الفاخر والأحواض العصرية",
  tagline: "فخامة الرخام تبدأ من التفاصيل",
  heroDescription: "اكتشف تشكيلة مميزة من مغاسل الرخام المصممة لتمنح مساحتك لمسة من الفخامة والأناقة، أو اطلب تصميمًا خاصًا يناسب ذوقك ومساحتك.",
  
  // رقم الواتساب بالصيغة الدولية بدون علامة + وبدون مسافات
  whatsappNumber: "966540001234",
  displayPhone: "+966 54 000 1234",
  
  email: "info@marmaris-marble.com",
  address: "طريق الملك عبدالعزيز، حي المروج",
  cityCountry: "الرياض، المملكة العربية السعودية",
  currency: "ر.س",

  socialLinks: {
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
    snapchat: "https://snapchat.com",
  },
};

export const siteConfig: SiteConfig = { ...defaultSiteConfig };

/**
 * تجهيز رابط واتساب لطلب منتج محدد مع رسالة منظمة ورابط مباشر
 */
export function buildProductWhatsAppUrl(
  productName: string,
  productCode: string,
  productUrl?: string,
  customNumber?: string
): string {
  const number = customNumber || siteConfig.whatsappNumber;
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const fullUrl = productUrl || `${currentOrigin}${currentPath}#${productCode}`;

  const messageText = `السلام عليكم، أرغب في الاستفسار عن وطلب المغسلة التالية:

اسم المنتج: ${productName}
كود المنتج: ${productCode}
رابط المنتج: ${fullUrl}

أرجو توضيح السعر والتفاصيل المتاحة. شكرًا لكم.`;

  return `https://wa.me/${number}?text=${encodeURIComponent(messageText)}`;
}

/**
 * تجهيز رابط واتساب لطلب خدمة التفصيل والتخصيص المباشر
 */
export function buildQuickCustomDesignWhatsAppUrl(customNumber?: string): string {
  const number = customNumber || siteConfig.whatsappNumber;
  const message = `السلام عليكم ورحمة الله، أرغب في الاستفسار عن خدمة التفصيل والتخصيص لمغسلة رخام بمقاسات وتصميم خاص، ولدي صور ومخططات للتصميم أود مشاركتها معكم لمناقشة الخيارات والتكلفة.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * تجهيز رابط استفسار عام عبر واتساب
 */
export function buildGeneralInquiryWhatsAppUrl(customNumber?: string): string {
  const number = customNumber || siteConfig.whatsappNumber;
  const message = `السلام عليكم ورحمة الله، أود الاستفسار عن مغاسل الرخام الطبيعي والتصاميم المتاحة لديكم.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
