/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductShowcase } from './components/ProductShowcase';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CustomDesignSection } from './components/CustomDesignSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { InspirationGallery } from './components/InspirationGallery';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Toast } from './components/Toast';
import { AdminDashboard } from './components/AdminDashboard';
import { productsData, Product } from './data/products';
import { defaultSiteConfig, SiteConfig } from './config/siteConfig';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'store' | 'admin'>('store');

  // Dynamic Products State with localStorage Persistence
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('marmaris_products');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch (err) {
        console.error('Error loading products from storage:', err);
      }
    }
    return productsData;
  });

  // Dynamic Site Config State with localStorage Persistence
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('marmaris_site_config');
        if (saved) {
          return { ...defaultSiteConfig, ...JSON.parse(saved) };
        }
      } catch (err) {
        console.error('Error loading site config from storage:', err);
      }
    }
    return defaultSiteConfig;
  });

  // Dark Mode State - Defaults to Dark Mode per user preference
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('marmaris_theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
    }
    return true;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('marmaris_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('marmaris_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  }, []);

  // Save products update to state & localStorage
  const handleSaveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    try {
      localStorage.setItem('marmaris_products', JSON.stringify(updatedProducts));
      showToast('تم حفظ التعديلات في المعرض بنجاح!');
    } catch (err) {
      console.error('Failed to save products:', err);
    }
  };

  // Save site config update to state & localStorage
  const handleSaveSiteConfig = (updatedConfig: SiteConfig) => {
    setSiteConfig(updatedConfig);
    try {
      localStorage.setItem('marmaris_site_config', JSON.stringify(updatedConfig));
      showToast('تم تحديث إعدادات المتجر ورقم الواتساب بنجاح!');
    } catch (err) {
      console.error('Failed to save config:', err);
    }
  };

  // Reset to default original catalog
  const handleResetCatalog = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في استعادة تشكيلة المعرض الافتراضية الأصلية؟')) {
      setProducts(productsData);
      setSiteConfig(defaultSiteConfig);
      try {
        localStorage.removeItem('marmaris_products');
        localStorage.removeItem('marmaris_site_config');
        showToast('تم استعادة التشكيلة الافتراضية بنجاح!');
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Check URL hash on mount and hashchange to support direct deep linking (#MAR-001 or #admin)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) return;

      if (hash.toLowerCase() === 'admin') {
        setCurrentView('admin');
        return;
      }

      const matchingProduct = products.find(
        (p) => p.code.toLowerCase() === hash.toLowerCase() || p.id.toLowerCase() === hash.toLowerCase()
      );

      if (matchingProduct) {
        setSelectedProduct(matchingProduct);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [products]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render Admin Dashboard View if active
  if (currentView === 'admin') {
    return (
      <AdminDashboard
        products={products}
        onSaveProducts={handleSaveProducts}
        siteConfig={siteConfig}
        onSaveSiteConfig={handleSaveSiteConfig}
        onResetCatalog={handleResetCatalog}
        onClose={() => {
          setCurrentView('store');
          if (window.location.hash === '#admin') {
            history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        }}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0E0E10] text-[#1E2022] dark:text-[#F3F1EC] font-['Cairo',sans-serif] relative selection:bg-[#C5A059]/30 selection:text-[#111111] dark:selection:text-white transition-colors duration-300">
      {/* Navbar with 3-Zone Contract + Admin + Dark Mode */}
      <Navbar
        onOpenCustomDesign={() => scrollToSection('custom-design')}
        onOpenAdmin={() => setCurrentView('admin')}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        siteConfig={siteConfig}
      />

      <main>
        {/* Hero Section */}
        <Hero
          onExploreClick={() => scrollToSection('products')}
          onCustomDesignClick={() => scrollToSection('custom-design')}
        />

        {/* Product Showcase Catalog Grid */}
        <ProductShowcase
          products={products}
          onViewDetails={(product) => setSelectedProduct(product)}
          whatsappNumber={siteConfig.whatsappNumber}
          currency={siteConfig.currency}
        />

        {/* Streamlined Custom Design / Direct WhatsApp Section */}
        <CustomDesignSection
          whatsappNumber={siteConfig.whatsappNumber}
        />

        {/* Why Choose Us Section */}
        <WhyChooseUs />

        {/* Inspiration Lookbook Gallery */}
        <InspirationGallery />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        siteConfig={siteConfig}
        onOpenAdmin={() => setCurrentView('admin')}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onShowToast={showToast}
        whatsappNumber={siteConfig.whatsappNumber}
        currency={siteConfig.currency}
        brandName={siteConfig.brandName}
      />

      {/* Floating Direct WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
