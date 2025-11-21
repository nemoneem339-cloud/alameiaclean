
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { Menu, X, Phone, Mail, MapPin, Instagram, MessageCircle, Twitter, Facebook, ChevronLeft, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { neighborhoods } from '../data/neighborhoods';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  const phoneNumber = "0500801225";
  const whatsappNumber = "966500801225";
  const instagramUrl = "https://www.instagram.com/alalameiastar/";
  const facebookUrl = "https://www.facebook.com/alalameiastar";
  const twitterUrl = "https://twitter.com/alalameiastar";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'خدماتنا', path: '/services' },
    { name: 'عن الشركة', path: '/about' },
    { name: 'المدونة', path: '/blog' },
    { name: 'اتصل بنا', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-secondary selection:text-white">
      
      {/* Top Bar - Visible on Mobile now */}
      <div className="bg-primary text-white py-2 text-xs font-medium relative z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4 md:gap-6">
             <a href={`tel:${phoneNumber}`} className="flex items-center gap-2 opacity-90 hover:opacity-100" aria-label="اتصل بنا">
               <Phone size={14} /> <span className="hidden md:inline">{phoneNumber}</span>
             </a>
             <span className="hidden md:flex items-center gap-2 opacity-90 hover:opacity-100"><Mail size={14} /> info@alamiyaclean.sa</span>
          </div>
          <div className="flex gap-4 items-center">
             <span className="hidden md:inline">الرياض - خدمة 24 ساعة</span>
             <div className="flex gap-3 items-center">
               <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="صفحة فيسبوك"><Facebook size={14} className="cursor-pointer hover:text-secondary transition" /></a>
               <a href={twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="صفحة تويتر"><Twitter size={14} className="cursor-pointer hover:text-secondary transition" /></a>
               <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="صفحة انستقرام"><Instagram size={14} className="cursor-pointer hover:text-secondary transition" /></a>
             </div>
          </div>
        </div>
      </div>

      {/* Glass Header */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-white/80 backdrop-blur-md shadow-md border-b border-white/20' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" aria-label="العالمية كلين - الصفحة الرئيسية">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:shadow-secondary/50 transition-all">
              ع
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-heading font-bold text-primary leading-none">العالمية</span>
              <span className="text-xs text-secondary font-bold tracking-wider">CLEAN</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold transition-all relative py-1 ${
                  isActive(link.path) ? 'text-primary' : 'text-gray-600 hover:text-primary'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div 
                    layoutId="underline" 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary rounded-full" 
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link to="/contact" className="hidden md:block bg-secondary hover:bg-cyan-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-cyan-500/30 transition-all hover:scale-105 active:scale-95">
            احجز الآن
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-800" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-100 overflow-hidden absolute w-full shadow-xl"
            >
              <nav className="flex flex-col p-6 gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-lg font-bold ${isActive(link.path) ? 'text-secondary' : 'text-gray-700'}`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link 
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-4 w-full bg-primary text-white py-3 rounded-xl text-center font-bold shadow-lg"
                >
                  طلب خدمة
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow relative pb-24 md:pb-0">
        {/* Background Decor */}
        <div className="fixed inset-0 z-[-1] bg-slate-50 pointer-events-none">
           <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
           <div className="absolute -bottom-8 left-20 w-[500px] h-[500px] bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        {children}
      </main>

      {/* Hyper-Local SEO Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 md:pb-10 border-t border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
          
          {/* 1. Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white">
               <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white font-bold text-xl">ع</div>
               <span className="text-2xl font-heading font-bold">العالمية كلين</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              الخيار الأول للنظافة المتكاملة في الرياض. نستخدم أحدث التقنيات لضمان بيئة صحية وآمنة لعائلتك وموظفيك.
            </p>
            <div className="flex gap-4">
              <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors" aria-label="Twitter"><Twitter size={16} /></a>
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors" aria-label="Facebook"><Facebook size={16} /></a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors" aria-label="Instagram"><Instagram size={16} /></a>
            </div>
          </div>
          
          {/* 2. Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 font-heading text-lg border-r-4 border-secondary pr-3">روابط سريعة</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="flex items-center gap-2 hover:text-secondary transition-colors"><ChevronLeft size={12} /> الرئيسية</Link></li>
              <li><Link to="/about" className="flex items-center gap-2 hover:text-secondary transition-colors"><ChevronLeft size={12} /> من نحن</Link></li>
              <li><Link to="/services" className="flex items-center gap-2 hover:text-secondary transition-colors"><ChevronLeft size={12} /> جميع الخدمات</Link></li>
              <li><Link to="/blog" className="flex items-center gap-2 hover:text-secondary transition-colors"><ChevronLeft size={12} /> المدونة والنصائح</Link></li>
              <li><Link to="/privacy" className="flex items-center gap-2 hover:text-secondary transition-colors"><ChevronLeft size={12} /> سياسة الخصوصية</Link></li>
              <li><Link to="/terms" className="flex items-center gap-2 hover:text-secondary transition-colors"><ChevronLeft size={12} /> شروط الاستخدام</Link></li>
            </ul>
          </div>

          {/* 3. Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 font-heading text-lg border-r-4 border-secondary pr-3">تواصل معنا</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-secondary shrink-0 mt-1" size={18} />
                <span>الرياض، حي الملقا، طريق الملك فهد الفرعي</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-secondary shrink-0" size={18} />
                <a href={`tel:${phoneNumber}`} className="hover:text-white transition-colors dir-ltr">{phoneNumber}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-secondary shrink-0" size={18} />
                <a href="mailto:info@alamiyaclean.sa" className="hover:text-white transition-colors">info@alamiyaclean.sa</a>
              </li>
            </ul>
          </div>

          {/* 4. Service Areas (SEO Goldmine) - Dynamic Links */}
          <div>
            <h4 className="text-white font-bold mb-6 font-heading text-lg border-r-4 border-secondary pr-3">الأحياء التي نغطيها بالرياض</h4>
            <ul className="grid grid-cols-2 gap-2 text-xs text-slate-400">
              {neighborhoods.map((area) => (
                <li key={area.slug}>
                  <Link 
                    to={`/areas/${area.slug}`} 
                    className="hover:text-secondary transition-colors flex items-center gap-1"
                  >
                    <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                    {area.nameAr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} شركة العالمية كلين. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
             <Link to="/html-sitemap" className="hover:text-white transition-colors">خريطة الموقع</Link>
             <p className="flex items-center gap-1">صنع بحب في الرياض <span className="text-red-500">♥</span></p>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA - Rendered via Portal to ensure it floats above everything and sticks correctly */}
      {createPortal(
        <div className="md:hidden fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-200 p-3 z-[9999] flex gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transform-gpu pb-[env(safe-area-inset-bottom,20px)]">
          <a href={`tel:${phoneNumber}`} className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 hover:bg-green-700 active:scale-95 transition-all text-sm">
            <Phone size={18} /> اتصل الآن
          </a>
          <a href={`https://wa.me/${whatsappNumber}`} className="flex-1 bg-secondary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 hover:bg-cyan-600 active:scale-95 transition-all text-sm relative">
            <MessageCircle size={18} /> واتساب
            {/* Notification Badge Mobile */}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
          </a>
        </div>,
        document.body
      )}

      {/* Desktop Sticky WhatsApp with Notification Badge */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل واتساب"
        className="hidden md:flex fixed bottom-8 left-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform group items-center gap-0 hover:gap-2 overflow-hidden hover:pr-6"
      >
        <div className="relative">
          <MessageCircle size={28} />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#25D366] animate-pulse"></span>
        </div>
        <span className="w-0 overflow-hidden group-hover:w-auto transition-all duration-300 font-bold whitespace-nowrap">تواصل معنا</span>
      </a>

      {/* Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            aria-label="العودة للأعلى"
            className="hidden md:flex fixed bottom-8 right-8 z-[90] bg-primary text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition-colors"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
