
import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { neighborhoods } from '../data/neighborhoods';
import { services } from '../data/content';
import SEO from '../components/SEO';
import BookingForm from '../components/BookingForm';
import Breadcrumbs from '../components/Breadcrumbs';
import { MapPin, CheckCircle, Phone, ArrowLeft, ShieldCheck, HelpCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Neighborhood = () => {
  const { slug } = useParams<{ slug: string }>();
  const area = neighborhoods.find(n => n.slug === slug);
  const phoneNumber = "0500801225";
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!area) {
    // Changed from redirecting to / to /404
    return <Navigate to="/404" replace />;
  }

  // Generate Dynamic Hyper-Local FAQs
  const neighborhoodFaqs = [
    {
      question: `هل تقدمون خدمة تنظيف الفلل في ${area.nameAr}؟`,
      answer: `نعم، ${area.nameAr} من ضمن مناطق التغطية الرئيسية لدينا. نمتلك فرقاً متخصصة لتنظيف الفلل والقصور والشقق في ${area.nameAr} جاهزة للخدمة الفورية.`
    },
    {
      question: `كم يستغرق وصول الفريق إلى ${area.nameAr}؟`,
      answer: `نظراً لانتشار فرقنا في شمال وشرق الرياض، يمكننا عادةً الوصول إلى موقعك في ${area.nameAr} خلال 60 إلى 90 دقيقة من تأكيد الحجز.`
    },
    {
      question: `هل تتوفر عمالة فلبينية لخدمة سكان ${area.nameAr}؟`,
      answer: `بالتأكيد. نوفر خيارات متعددة من العمالة المدربة (فلبينية، هندية، نيبالية) لعملاء ${area.nameAr} حسب تفضيلاتكم.`
    },
    {
      question: `ما هي أسعار غسيل المكيفات في ${area.nameAr}؟`,
      answer: `نقدم عروضاً خاصة لسكان ${area.nameAr}. تبدأ أسعار غسيل المكيفات من 50 ريال للوحدة (عند طلب عدد معين)، مع فحص مجاني للفريون.`
    }
  ];

  // Dynamic LocalBusiness Schema for this specific area
  const serviceSchema = {
    "@type": "Service",
    "serviceType": "Cleaning Services",
    "areaServed": {
      "@type": "Place",
      "name": area.nameAr
    },
    "provider": {
      "@type": "LocalBusiness",
      "name": "العالمية كلين",
      "telephone": "+966500801225",
      "priceRange": "$$"
    },
    "name": area.heading,
    "description": area.description
  };

  // FAQ Schema
  const faqSchema = {
    "@type": "FAQPage",
    "mainEntity": neighborhoodFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Combine Schemas
  const combinedSchema = {
    "@graph": [serviceSchema, faqSchema]
  };

  // SEO Breadcrumb Data
  const breadcrumbData = [
    { name: 'الرئيسية', item: '/' },
    { name: 'مناطق الخدمة', item: '/' },
    { name: area.nameAr, item: `/areas/${area.slug}` }
  ];

  return (
    <>
      <SEO 
        title={area.title} 
        description={area.description}
        type="service"
        schemaData={combinedSchema}
        breadcrumbs={breadcrumbData}
      />

      {/* Hero Section */}
      <div className="bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-bg opacity-20"></div>
        {/* Map Pattern Background */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
        
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 text-secondary px-4 py-1 rounded-full text-sm font-bold mb-6 backdrop-blur-sm">
              <MapPin size={16} />
              خدمة فورية في {area.nameAr}
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
              {area.heading}
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
              {area.description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href={`tel:${phoneNumber}`} className="bg-secondary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-cyan-600 transition-all shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2">
                <Phone size={20} /> اتصل الآن
              </a>
              <a href="#booking" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-slate-900 transition-all">
                احجز موعدك
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Content */}
        <div className="lg:col-span-8">
          
          <Breadcrumbs items={[{ label: 'مناطق الخدمة', path: '/' }, { label: area.nameAr }]} />

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {area.features.map((feature, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                <CheckCircle className="text-secondary mx-auto mb-2" size={24} />
                <span className="font-bold text-slate-800 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* Text Content */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-50 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">لماذا تختار العالمية كلين في {area.nameAr}؟</h2>
            <p className="text-slate-600 leading-relaxed text-lg mb-6">
              {area.content}
            </p>
            <p className="text-slate-600 leading-relaxed text-lg">
              نحن نتفهم احتياجات سكان {area.nameAr} ونقدم خدماتنا بما يتناسب مع طبيعة المنازل والفلل في المنطقة. 
              فريقنا متواجد بشكل دائم بالقرب منك لضمان سرعة الاستجابة للحالات الطارئة والمواعيد المجدولة.
            </p>
          </div>

          {/* Dynamic Hyper-Local FAQs */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
               <HelpCircle className="text-secondary" /> أسئلة شائعة من سكان {area.nameAr}
            </h2>
            <div className="space-y-4">
               {neighborhoodFaqs.map((faq, index) => (
                 <div key={index} className="border border-slate-200 rounded-xl overflow-hidden bg-white hover:shadow-sm transition-shadow">
                   <button 
                     onClick={() => setOpenFaq(openFaq === index ? null : index)}
                     className="w-full flex justify-between items-center p-4 text-right font-bold text-slate-800 hover:bg-slate-50 transition-colors"
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
                         <div className="p-4 text-slate-600 border-t border-slate-100 text-sm leading-relaxed bg-slate-50">
                           {faq.answer}
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>
               ))}
            </div>
          </div>

          {/* Services List for this Area */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">خدماتنا المتاحة في {area.nameAr}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.slice(0, 6).map(service => (
                <Link key={service.id} to={`/services/${service.slug}`} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-slate-100 group">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                    <service.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-secondary transition-colors">{service.title}</h3>
                    <span className="text-xs text-slate-500">متاح في {area.nameAr}</span>
                  </div>
                  <ArrowLeft size={16} className="mr-auto text-slate-300 group-hover:text-secondary" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div id="booking" className="sticky top-24">
            <div className="bg-primary text-white p-6 rounded-t-3xl">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck /> ضمان العالمية
              </h3>
              <p className="text-blue-100 text-sm mt-2">خدمة مضمونة 100% لسكان {area.nameAr}</p>
            </div>
            {/* Pass the area name to the booking form for context */}
            <BookingForm initialNote={`طلب خدمة من حي: ${area.nameAr}`} />
            
            {/* Nearby Areas */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100 mt-8">
              <h3 className="font-bold text-slate-900 mb-4">أحياء أخرى نخدمها</h3>
              <div className="flex flex-wrap gap-2">
                {neighborhoods.filter(n => n.slug !== area.slug).slice(0, 8).map(n => (
                  <Link key={n.slug} to={`/areas/${n.slug}`} className="text-xs bg-slate-50 hover:bg-primary hover:text-white px-3 py-1.5 rounded-lg transition-colors text-slate-600">
                    {n.nameAr}
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

export default Neighborhood;
