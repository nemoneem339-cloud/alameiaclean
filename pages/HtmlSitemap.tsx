
import React from 'react';
import { Link } from 'react-router-dom';
import { services, blogPosts } from '../data/content';
import { neighborhoods } from '../data/neighborhoods';
import SEO from '../components/SEO';
import { FileText, MapPin, Briefcase, Home } from 'lucide-react';

const HtmlSitemap = () => {
  return (
    <>
      <SEO title="خريطة الموقع" description="صفحة خريطة الموقع لسهولة التصفح والوصول السريع لجميع خدمات ومقالات العالمية كلين." />
      
      <div className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-heading text-slate-900 mb-4">خريطة الموقع</h1>
            <p className="text-slate-600">دليل شامل لجميع صفحات موقع العالمية كلين</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* 1. Main Pages */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
               <h2 className="text-xl font-bold flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 text-primary">
                 <Home size={20} /> الصفحات الرئيسية
               </h2>
               <ul className="space-y-3">
                 <li><Link to="/" className="text-slate-700 hover:text-secondary transition-colors">الرئيسية</Link></li>
                 <li><Link to="/about" className="text-slate-700 hover:text-secondary transition-colors">من نحن</Link></li>
                 <li><Link to="/services" className="text-slate-700 hover:text-secondary transition-colors">خدماتنا</Link></li>
                 <li><Link to="/blog" className="text-slate-700 hover:text-secondary transition-colors">المدونة</Link></li>
                 <li><Link to="/contact" className="text-slate-700 hover:text-secondary transition-colors">اتصل بنا</Link></li>
               </ul>
            </div>

            {/* 2. Services */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
               <h2 className="text-xl font-bold flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 text-primary">
                 <Briefcase size={20} /> خدمات التنظيف
               </h2>
               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                 {services.map(s => (
                   <li key={s.id}>
                     <Link to={`/services/${s.slug}`} className="text-slate-700 hover:text-secondary transition-colors text-sm block py-1">
                       {s.title}
                     </Link>
                   </li>
                 ))}
               </ul>
            </div>

            {/* 3. Areas */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
               <h2 className="text-xl font-bold flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 text-primary">
                 <MapPin size={20} /> مناطق التغطية بالرياض
               </h2>
               <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                 {neighborhoods.map(area => (
                   <li key={area.slug}>
                     <Link to={`/areas/${area.slug}`} className="text-slate-700 hover:text-secondary transition-colors text-sm block py-1">
                       {area.nameAr}
                     </Link>
                   </li>
                 ))}
               </ul>
            </div>

            {/* 4. Blog Posts */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
               <h2 className="text-xl font-bold flex items-center gap-2 mb-6 pb-4 border-b border-slate-100 text-primary">
                 <FileText size={20} /> أحدث المقالات
               </h2>
               <ul className="space-y-3">
                 {blogPosts.map(post => (
                   <li key={post.id}>
                     <Link to={`/blog/${post.slug}`} className="text-slate-700 hover:text-secondary transition-colors text-sm block">
                       {post.title}
                     </Link>
                   </li>
                 ))}
               </ul>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default HtmlSitemap;
