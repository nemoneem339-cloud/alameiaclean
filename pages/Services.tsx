
import React from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/content';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, PhoneCall, CalendarCheck, Sparkles, ShieldCheck } from 'lucide-react';

const Services = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  };

  const steps = [
    { icon: PhoneCall, title: 'تواصل معنا', desc: 'اتصل بنا أو احجز موعدك عبر الموقع بسهولة.' },
    { icon: CalendarCheck, title: 'تأكيد الموعد', desc: 'نؤكد الحجز ونرسل لك تفاصيل الفريق المختص.' },
    { icon: Sparkles, title: 'تنفيذ الخدمة', desc: 'يصل فريقنا في الموعد المحدد وينجز العمل باحترافية.' },
    { icon: ShieldCheck, title: 'ضمان الرضا', desc: 'لا نغادر حتى تتأكد من جودة العمل ورضاك التام.' },
  ];

  // Idea 1: ItemList Schema for Services List
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://alamiyaclean.sa/#/services/${service.slug}`
    }))
  };

  return (
    <>
      <SEO 
        title="جميع الخدمات" 
        description="قائمة خدمات النظافة الشاملة من العالمية كلين. تنظيف فلل، مكيفات، خزانات، ومكافحة حشرات بالرياض." 
        schemaData={itemListSchema}
      />

      {/* Header */}
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-bg opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">خدماتنا المتكاملة</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            نقدم حلولاً شاملة للعناية بمنزلك. اختر الخدمة المناسبة ودع الباقي لخبراء العالمية كلين.
          </p>
        </div>
      </div>

      {/* Services Catalog */}
      <div className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div 
                key={service.id} 
                variants={item}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 group flex flex-col"
              >
                {/* Image Area */}
                <div className="h-56 overflow-hidden relative bg-slate-200">
                   <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors z-10"></div>
                   <img 
                     src={`https://picsum.photos/seed/${service.id}/600/400`} 
                     alt={service.title}
                     className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                     loading="lazy"
                     width="600"
                     height="400"
                   />
                   <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur text-primary p-2 rounded-xl shadow-sm">
                     <service.icon size={24} />
                   </div>
                   <div className="absolute bottom-4 left-4 z-20 bg-secondary/90 backdrop-blur text-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
                     {service.priceRange === '$$$' ? 'خدمة VIP' : 'أسعار تنافسية'}
                   </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex-grow flex flex-col">
                  <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                    <Link to={`/services/${service.slug}`}>{service.title}</Link>
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {service.shortDesc}
                  </p>
                  
                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <CheckCircle2 size={16} className="text-secondary shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between items-center">
                    <Link 
                      to={`/services/${service.slug}`} 
                      className="text-primary font-bold hover:text-secondary transition-colors flex items-center gap-1 text-sm"
                    >
                      تفاصيل الخدمة <ArrowLeft size={16} />
                    </Link>
                    <Link 
                      to={`/services/${service.slug}`}
                      className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors"
                    >
                      احجز الآن
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-secondary font-bold mb-2 tracking-wide uppercase">كيف نعمل؟</h2>
            <h3 className="text-4xl font-heading font-bold text-slate-900">خطوات بسيطة لمنزل نظيف</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-slate-100 z-0"></div>

            {steps.map((step, index) => (
              <div key={index} className="relative z-10 text-center group">
                <div className="w-24 h-24 bg-white border-4 border-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:border-secondary/20 group-hover:scale-110 transition-all duration-300">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-white transition-colors">
                    <step.icon size={32} />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h4>
                <p className="text-slate-500 text-sm px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
