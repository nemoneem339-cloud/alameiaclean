
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { blogPosts, services } from '../data/content';
import SEO from '../components/SEO';
import { Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);
  const phoneNumber = "0500801225";

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  const relatedService = services.find(s => s.id === post.relatedServiceId);

  // Enhanced Article Schema (Strict Mode)
  const schema = {
    "@type": "Article",
    "headline": post.title,
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": window.location.href
    },
    "author": { 
      "@type": "Person", 
      "name": post.author 
    },
    "publisher": { 
      "@type": "Organization", 
      "name": "العالمية كلين",
      "logo": {
        "@type": "ImageObject",
        "url": "https://alamiyaclean.sa/logo.png"
      }
    },
    "description": post.excerpt,
    "image": `https://picsum.photos/seed/${post.id}/800/600`
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  // SEO Breadcrumb Data
  const breadcrumbData = [
    { name: 'الرئيسية', item: '/' },
    { name: 'المدونة', item: '/blog' },
    { name: post.title, item: `/blog/${post.slug}` }
  ];

  return (
    <>
      <SEO 
        title={post.title} 
        description={post.excerpt}
        type="article"
        schemaData={schema}
        breadcrumbs={breadcrumbData}
        keywords={post.tags.join(', ')}
      />

      <article className="bg-slate-50 min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link to="/" className="hover:text-primary">الرئيسية</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-primary">المدونة</Link>
            <span>/</span>
            <span className="text-slate-800 font-medium truncate max-w-[200px]">{post.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Content Column */}
            <motion.div 
               className="lg:col-span-2"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
            >
               <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
                  {/* Header */}
                  <div className="mb-8">
                     <div className="flex gap-2 mb-4">
                       {post.tags.map(tag => (
                         <span key={tag} className="px-3 py-1 bg-blue-50 text-primary text-xs font-bold rounded-full">{tag}</span>
                       ))}
                     </div>
                     <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-6 leading-tight">{post.title}</h1>
                     <div className="flex items-center gap-6 text-slate-500 text-sm border-b border-slate-100 pb-6">
                       <span className="flex items-center gap-2"><Calendar size={16} /> {post.date}</span>
                       <span className="flex items-center gap-2"><User size={16} /> {post.author}</span>
                     </div>
                  </div>

                  {/* Body */}
                  <div 
                    className="prose prose-lg max-w-none prose-slate prose-headings:font-heading prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-secondary prose-li:marker:text-secondary"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />

                  {/* Social Share Section */}
                  <div className="my-10 py-8 border-y border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50 p-4 rounded-xl">
                    <div className="flex items-center gap-2 font-bold text-slate-800">
                      <Share2 size={20} className="text-secondary" />
                      <span className="text-sm">أعجبك المقال؟ شاركه مع أصدقائك:</span>
                    </div>
                    <div className="flex gap-3">
                      <a 
                        href={`https://twitter.com/intent/tweet?text=${post.title}&url=${shareUrl}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all hover:scale-110"
                        title="مشاركة على تويتر"
                      >
                        <Twitter size={18} />
                      </a>
                      <a 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all hover:scale-110"
                        title="مشاركة على فيسبوك"
                      >
                        <Facebook size={18} />
                      </a>
                      <a 
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${post.title}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center hover:bg-indigo-700 hover:text-white transition-all hover:scale-110"
                        title="مشاركة على لينكد إن"
                      >
                        <Linkedin size={18} />
                      </a>
                    </div>
                  </div>

                  {/* Author Box */}
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-xl">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">كتب بواسطة: {post.author}</h4>
                      <p className="text-sm text-slate-500">خبير في مجال النظافة والصيانة المنزلية</p>
                    </div>
                  </div>
               </div>
            </motion.div>

            {/* Sidebar Column */}
            <div className="lg:col-span-1 space-y-8">
               {/* CTA Box - Related Service */}
               {relatedService && (
                 <div className="bg-primary text-white p-8 rounded-3xl shadow-xl relative overflow-hidden sticky top-24">
                   <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                   
                   <h3 className="text-xl font-bold font-heading mb-2">هل تحتاج مساعدة في {relatedService.title}؟</h3>
                   <p className="text-blue-100 text-sm mb-6 leading-relaxed">فريقنا المتخصص جاهز لتقديم هذه الخدمة لك بأعلى معايير الجودة.</p>
                   
                   <Link 
                     to={`/services/${relatedService.slug}`} 
                     className="block w-full bg-white text-primary text-center py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
                   >
                     اطلب الخدمة الآن
                   </Link>
                   
                   <div className="mt-6 pt-6 border-t border-white/20 text-center">
                     <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-2">أو اتصل بنا مباشرة</p>
                     <a href={`tel:${phoneNumber}`} className="text-2xl font-bold font-heading dir-ltr block">{phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')}</a>
                   </div>
                 </div>
               )}

               {/* Popular Tags */}
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                 <h3 className="font-bold text-slate-900 mb-4">وسوم شائعة</h3>
                 <div className="flex flex-wrap gap-2">
                   {['نصائح', 'صيانة', 'تنظيف', 'فلل', 'حشرات', 'مكيفات'].map(tag => (
                     <Link key={tag} to="/blog" className="px-3 py-1 bg-slate-50 hover:bg-slate-100 text-slate-600 text-sm rounded-lg transition-colors">
                       #{tag}
                     </Link>
                   ))}
                 </div>
               </div>
            </div>

          </div>
        </div>
      </article>
    </>
  );
};

export default BlogDetail;
