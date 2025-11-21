
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Home, Search } from 'lucide-react';

const NotFound = () => {
  // Prevent search engines from indexing this page
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    }
  }, []);

  return (
    <>
      <SEO 
        title="الصفحة غير موجودة - 404" 
        description="عذراً، الصفحة التي تبحث عنها غير موجودة." 
      />
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-slate-50">
        <div className="text-9xl font-black text-slate-200 mb-4">404</div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">عذراً، الصفحة غير موجودة</h1>
        <p className="text-slate-600 text-lg mb-8 max-w-md">
          يبدو أنك وصلت إلى رابط غير صحيح أو تم نقل الصفحة. لا تقلق، يمكنك العودة للرئيسية.
        </p>
        <Link 
          to="/" 
          className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-800 transition-colors flex items-center gap-2 shadow-lg shadow-blue-900/20"
        >
          <Home size={20} /> العودة للرئيسية
        </Link>
      </div>
    </>
  );
};

export default NotFound;
