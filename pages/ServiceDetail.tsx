
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { services, blogPosts } from '../data/content';
import SEO from '../components/SEO';
import BookingForm from '../components/BookingForm';
import Breadcrumbs from '../components/Breadcrumbs';
import { CheckCircle, ArrowLeft, Info, Shield, Star, ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find(s => s.slug === slug);

  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  if (!service) {
    // Changed from redirecting to /services to /404 for better SEO (no soft 404)
    return <Navigate to="/404" replace />;
  }

  // Filter related blogs based on tags
  const relatedBlogs = blogPosts.filter(post => 
    post.tags.some(tag => service.relatedBlogTags.includes(tag))
  ).slice(0, 3);

  // Generate deterministic image based on ID (in real app this would come from CMS)
  const serviceImage = `https://picsum.photos/seed/${service.id}/1200/800`;

  // Schema Data with FAQPage and AggregateRating
  const schema = {
    "@type": "Service",
    "serviceType": service.title,
    "provider": { "@type": "LocalBusiness", "name": "العالمية كلين" },
    "areaServed": { "@type": "City", "name": "الرياض" },
    "description": service.shortDesc,
    "image": serviceImage,
    "priceRange": service.priceRange,
    "offers": {
        "@type": "Offer",
        "priceCurrency": "SAR",
        "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  // Separate FAQPage Schema
  const faqSchema = {
    "@type": "FAQPage",
    "mainEntity": service.serviceFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Combine schemas
  const combinedSchema = {
    "@graph": [
      schema,
      faqSchema
    ]
  };

  // SEO Breadcrumb Data
  const breadcrumbData = [
    { name: 'الرئيسية', item: '/' },
    { name: 'الخدمات', item: '/services' },
    { name: service.title, item: `/services/${service.slug}` }
  ];

  // Generate dynamic keywords from features and title
  const dynamicKeywords = [service.title, ...service.features, ...service.relatedBlogTags, 'شركة تنظيف بالرياض'].join(', ');

  return (
    <>
      <SEO 
        title={service.title} 
        description={service.shortDesc}
        type="service"
        schemaData={combinedSchema}
        image={serviceImage}
        breadcrumbs={breadcrumbData}
        keywords={dynamicKeywords}
      />

      {/* Minimal Hero */}
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-bg opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link to="/" className="hover:text-white transition">الرئيسية</Link>
            <span className="text-slate-600">/</span>
            <Link to="/services" className="hover:text-white transition">الخدمات</Link>
            <span className="text-slate-600">/</span>
            <span className="text-secondary font-medium">{service.title}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">{service.title}</h1>
          <p className="text-xl text-slate-300 max-w-2xl">{service.shortDesc}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 -mt-10 relative z-20">
        
        {/* Main Content */}
        <div className="lg:col-span-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100"
          >
            {/* Breadcrumbs UI */}
            <Breadcrumbs items={[{ label: 'الخدمات', path: '/services' }, { label: service.title }]} />

            {/* Service Image (SEO Optimized & CLS Fixed) */}
            <div className="mb-8 rounded-2xl overflow-hidden bg-slate-200 w-full relative shadow-md group aspect-video">
               <img 
                 src={serviceImage} 
                 alt={`خدمة ${service.title} بالرياض - شركة العالمية كلين`} 
                 width="1200"
                 height="800"
                 className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                 loading="eager" // LCP candidate
               />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
               <div className="absolute bottom-4 right-4 text-white">
                  <div className="flex items-center gap-1 text-yellow-400 mb-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                    <span className="text-white text-xs font-bold mr-2">(4.9/5) تقييم العملاء</span>
                  </div>
                  <p className="font-bold text-lg md:text-xl shadow-black drop-shadow-md">{service.title}</p>
               </div>
            </div>

            {/* Icon & Description */}
            <div className="flex items-start gap-6 mb-8">
               <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-primary shrink-0">
                 <service.icon size={40} strokeWidth={1.5} />
               </div>
               <div>
                 <h2 className="text-2xl font-bold text-slate-900 mb-2">تفاصيل الخدمة</h2>
                 <p className="text-slate-600 leading-relaxed whitespace-pre-line">{service.fullDesc}</p>
               </div>
            </div>

            {/* Features & Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="text-secondary" size={20} /> مميزات الخدمة
                </h3>
                <ul className="space-y-3">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                      <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 shrink-0"></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Star className="text-yellow-500" size={20} /> الفوائد لك
                </h3>
                <ul className="space-y-3">
                  {service.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 text-sm">
                      <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 shrink-0"></span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Guarantee Box */}
            <div className="bg-green-50 border border-green-100 p-6 rounded-2xl flex items-start gap-4 mb-12">
              <Shield className="text-green-600 shrink-0" size={32} />
              <div>
                <h3 className="font-bold text-green-800 mb-1">ضمان الرضا الذهبي</h3>
                <p className="text-sm text-green-700">نحن واثقون من جودة عملنا. إذا لم تكن راضياً بنسبة 100%، سنعيد التنظيف مجاناً دون أي أسئلة.</p>
              </div>
            </div>

            {/* FAQs Section (SEO Booster) */}
            {service.serviceFaqs && service.serviceFaqs.length > 0 && (
              <div className="mb-16">
                 <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                   <HelpCircle className="text-secondary" /> أسئلة شائعة عن {service.title}
                 </h3>
                 <div className="space-y-4">
                   {service.serviceFaqs.map((faq, index) => (
                     <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
                       <button 
                         onClick={() => setOpenFaq(openFaq === index ? null : index)}
                         className="w-full flex justify-between items-center p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-right font-bold text-slate-800"
                       >
                         {faq.question}
                         <ChevronDown size={20} className={`transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-secondary' : 'text-slate-400'}`} />
                       </button>
                       <AnimatePresence>
                         {openFaq === index && (
                           <motion.div 
                             initial={{ height: 0 }} 
                             animate={{ height: 'auto' }} 
                             exit={{ height: 0 }}
                             className="overflow-hidden"
                           >
                             <div className="p-4 text-slate-600 bg-white border-t border-slate-100 text-sm leading-relaxed">
                               {faq.answer}
                             </div>
                           </motion.div>
                         )}
                       </AnimatePresence>
                     </div>
                   ))}
                 </div>
              </div>
            )}

            {/* Related Blog Posts (Internal Linking) */}
            {relatedBlogs.length > 0 && (
              <div className="pt-8 border-t border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6">مقالات قد تهمك في هذا المجال</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedBlogs.map(post => (
                    <Link key={post.id} to={`/blog/${post.slug}`} className="group block">
                       <div className="bg-slate-50 h-32 rounded-xl mb-3 overflow-hidden relative">
                          <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors"></div>
                          <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-xs font-bold text-primary shadow-sm">اقرأ المزيد</div>
                       </div>
                       <h4 className="font-bold text-slate-800 text-sm group-hover:text-secondary transition-colors line-clamp-2">{post.title}</h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* Booking Widget - Smart Auto-fill */}
          <div className="sticky top-24">
             <BookingForm initialService={service.title} />
             
             {/* Other Services Widget */}
             <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 mt-8">
               <h3 className="font-bold text-slate-900 mb-4">خدمات أخرى شائعة</h3>
               <div className="space-y-3">
                 {services.filter(s => s.id !== service.id).slice(0, 5).map(s => (
                   <Link key={s.id} to={`/services/${s.slug}`} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors group">
                     <div className="flex items-center gap-3">
                       <div className="text-slate-400 group-hover:text-secondary"><s.icon size={18} /></div>
                       <span className="text-sm font-medium text-slate-700 group-hover:text-primary">{s.title}</span>
                     </div>
                     <ArrowLeft size={14} className="text-slate-300 group-hover:text-primary" />
                   </Link>
                 ))}
               </div>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetail;
