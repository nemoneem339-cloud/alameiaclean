
import React from 'react';
import { services, blogPosts } from '../data/content';
import { neighborhoods } from '../data/neighborhoods';
import SEO from '../components/SEO';
import { Copy } from 'lucide-react';

const Sitemap = () => {
  const baseUrl = 'https://alamiyaclean.sa';
  const today = new Date().toISOString().split('T')[0];

  // Static Pages
  const staticPages = [
    { loc: '/', priority: '1.0' },
    { loc: '/services', priority: '0.9' },
    { loc: '/about', priority: '0.8' },
    { loc: '/contact', priority: '0.8' },
    { loc: '/blog', priority: '0.8' },
  ];

  // Generate XML String
  // INCLUDES IMAGE EXTENSION FOR IMAGE SEARCH SEO
  const generateXML = () => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    // Static
    staticPages.forEach(page => {
      const path = page.loc === '/' ? '/' : `/#${page.loc}`;
      xml += `  <url>\n    <loc>${baseUrl}${path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${page.priority}</priority>\n  </url>\n`;
    });

    // Services (With Images)
    services.forEach(service => {
      // Generate a stable image URL simulation
      const imageUrl = `https://picsum.photos/seed/${service.id}/800/600`; 
      xml += `  <url>\n    <loc>${baseUrl}/#/services/${service.slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n`;
      xml += `    <image:image>\n      <image:loc>${imageUrl}</image:loc>\n      <image:title>${service.title}</image:title>\n      <image:caption>خدمة ${service.title} في الرياض - العالمية كلين</image:caption>\n    </image:image>\n`;
      xml += `  </url>\n`;
    });

    // Neighborhoods (High Priority for Local SEO)
    neighborhoods.forEach(area => {
      xml += `  <url>\n    <loc>${baseUrl}/#/areas/${area.slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
    });

    // Blog Posts (With Images)
    blogPosts.forEach(post => {
      const imageUrl = `https://picsum.photos/seed/${post.id}/800/600`;
      xml += `  <url>\n    <loc>${baseUrl}/#/blog/${post.slug}</loc>\n    <lastmod>${post.date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n`;
      xml += `    <image:image>\n      <image:loc>${imageUrl}</image:loc>\n      <image:title>${post.title}</image:title>\n    </image:image>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;
    return xml;
  };

  const xmlContent = generateXML();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(xmlContent);
    alert('تم نسخ خريطة الموقع! يمكنك الآن لصقها في ملف sitemap.xml');
  };

  return (
    <>
      <SEO title="مولد خريطة الموقع" description="أداة للمطورين" />
      <div className="container mx-auto px-4 py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-slate-900">خريطة الموقع + صور (Advanced Sitemap)</h1>
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition-colors font-bold"
            >
              <Copy size={18} /> نسخ الكود
            </button>
          </div>
          
          <div className="bg-slate-900 text-green-400 p-6 rounded-xl font-mono text-sm overflow-auto h-[600px] shadow-2xl border border-slate-800">
            <pre>{xmlContent}</pre>
          </div>

          <p className="mt-6 text-slate-600 text-sm bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <strong>تحديث SEO:</strong> تم إضافة بيانات الصور <code>&lt;image:image&gt;</code> تلقائياً لكل صفحة. هذا سيساعد صور الخدمات والمقالات على الظهور في نتائج "بحث الصور" في جوجل، مما يزيد من الزيارات المجانية.
          </p>
        </div>
      </div>
    </>
  );
};

export default Sitemap;
