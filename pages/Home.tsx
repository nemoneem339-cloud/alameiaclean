
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { services, testimonials, faqs } from '../data/content';
import { neighborhoods } from '../data/neighborhoods';
import SEO from '../components/SEO';
import BookingForm from '../components/BookingForm';
import { ArrowLeft, Star, ShieldCheck, Clock, ThumbsUp, X, MessageCircle, Calendar, Play, MapPin, HelpCircle, ChevronDown } from 'lucide-react';

const Home = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const phoneNumber = "0500801225";
  const whatsappNumber = "966500801225";

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  // FAQ Schema for Home Page
  const homeFaqSchema = {
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <SEO 
        title="الرئيسية" 
        description="العالمية كلين | أفضل شركة تنظيف بالرياض. خدمات VIP للفلل، القصور، والمكيفات. عمالة محترفة وضمان ذهبي." 
        type="business"
        keywords="شركة تنظيف بالرياض, تنظيف فلل, غسيل مكيفات, تنظيف خزانات, مكافحة حشرات, جلي رخام, تنظيف واجهات, العالمية كلين"
        schemaData={homeFaqSchema}
      />
      
      {/* Cinematic Hero Section */}
      <section className="relative h-[85vh] md:h-[95vh] flex items-center overflow-hidden bg-slate-900">
        {/* Background Image with Overlay */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          {/* LCP Image: Keep eager loading */}
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Luxury Clean Home"
            className="w-full h-full object-cover object-center opacity-90"
            width="2070"
            height="1380"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/30"></div>
        </motion.div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
              الخيار الأول للفلل والقصور في الرياض
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-heading font-bold text-white leading-[1.1] mb-6 drop-shadow-2xl tracking-tight">
              نحن نعتني بمنزلك، <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-cyan-300">
                لتستمتع بحياتك
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-xl font-light">
              خدمات تنظيف استثنائية بمعايير عالمية. نضمن لك راحة البال وبيئة صحية لعائلتك من خلال فريق محترف وأحدث تقنيات التعقيم.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="bg-secondary text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-cyan-500/30 hover:bg-cyan-600 hover:scale-105 transition-all flex items-center justify-center gap-3 group"
              >
                <Calendar className="group-hover:-translate-y-1 transition-transform" size={22} />
                احجز موعدك الآن
              </button>
              
              <a 
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-slate-900 transition-all flex items-center justify-center gap-3"
              >
                <MessageCircle size={22} />
                تواصل واتساب
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest">اكتشف المزيد</span>
          <div className="w-0.5 h-12 bg-gradient-to-b from-secondary to-transparent"></div>
        </motion.div>
      </section>

      {/* Services Bento Grid */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-secondary font-bold tracking-wider mb-2 uppercase">خدماتنا الاحترافية</h2>
            <h3 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-4">حلول تنظيف متكاملة لكل ركن</h3>
            <p className="text-slate-500 text-lg">اختر من بين مجموعة واسعة من خدمات التنظيف المتخصصة المصممة خصيصاً لمنازل الرياض.</p>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 grid-flow-row-dense"
          >
            {services.map((service, idx) => {
              const Icon = service.icon;
              const isFeatured = idx === 0 || idx === 6;
              
              return (
                <motion.div 
                  key={service.id} 
                  variants={item}
                  className={`group relative bg-white rounded-3xl p-6 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300 border border-slate-100 overflow-hidden ${isFeatured ? 'md:col-span-2' : ''}`}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right"></div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-primary transition-colors group-hover:scale-110 duration-300 ${isFeatured ? 'bg-blue-50' : 'bg-slate-50 shadow-sm'}`}>
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <Link to={`/services/${service.slug}`} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-colors">
                      <ArrowLeft size={18} />
                    </Link>
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">{service.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">{service.shortDesc}</p>
                  
                  {isFeatured && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {service.features.slice(0, 3).map((f, i) => (
                        <span key={i} className="text-xs font-medium bg-slate-50 px-2 py-1 rounded border border-slate-100 text-slate-600">{f}</span>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-slate-900 to-slate-900 z-0"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-secondary font-bold mb-2">لماذا العالمية؟</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                المعايير الذهبية <br/> في النظافة المنزلية
              </h3>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                نحن لا نرسل عمال نظافة عشوائيين. نحن نرسل فنيين مدربين ومجهزين بأحدث المعدات. نضمن لك تجربة خالية من المتاعب ونتيجة تبهر ضيوفك.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: ShieldCheck, title: 'ضمان حقيقي', desc: 'نضمن جودة العمل، وإذا لم يعجبك نعيد التنظيف مجاناً.' },
                  { icon: Clock, title: 'التزام بالوقت', desc: 'نصل في الموعد المحدد، وننهي العمل في الوقت المتفق عليه.' },
                  { icon: ThumbsUp, title: 'عمالة أمينة', desc: 'فريقنا يخضع لفحص خلفية أمنية لضمان راحة بالك.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm text-secondary">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl transform rotate-6 opacity-30 blur-lg"></div>
              <img 
                src="https://images.unsplash.com/photo-1581578731117-104f2a8d46a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Professional Cleaning Team" 
                className="relative rounded-3xl shadow-2xl border-4 border-white/10 w-full object-cover h-[500px]"
                loading="lazy"
                width="800"
                height="500"
              />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl max-w-xs animate-bounce duration-[3000ms]">
                <div className="flex items-center gap-2 mb-2">
                   <div className="flex -space-x-2 space-x-reverse">
                     {[1,2,3].map(i => (
                       <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-8 h-8 rounded-full border-2 border-white" alt="User" loading="lazy" width="32" height="32" />
                     ))}
                   </div>
                   <span className="text-xs font-bold text-slate-500">+500 تقييم</span>
                </div>
                <p className="font-bold text-slate-900 text-sm">"خدمة ولا غلطة، رجعوا البيت جديد!"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Internal Linking Mesh (Service Areas) */}
      <section className="py-20 bg-white border-b border-slate-100">
         <div className="container mx-auto px-4">
           <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
              <div>
                <h2 className="text-2xl font-heading font-bold text-slate-900 mb-2">نصل إليك أينما كنت في الرياض</h2>
                <p className="text-slate-500 text-sm">شبكة تغطية واسعة تضمن وصولنا السريع لجميع أحياء الرياض الشمالية والشرقية</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-xl">
                 <MapPin className="text-primary" />
              </div>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {neighborhoods.map((area) => (
                <Link 
                  key={area.slug} 
                  to={`/areas/${area.slug}`} 
                  className="group flex items-center justify-center text-center p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md hover:border-secondary/30 transition-all duration-300"
                >
                  <span className="text-sm font-bold text-slate-600 group-hover:text-secondary">{area.nameAr}</span>
                </Link>
              ))}
           </div>
         </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 overflow-hidden bg-slate-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-slate-900">ماذا يقول عملاؤنا؟</h2>
        </div>
        
        <div className="relative w-full">
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-slate-50 to-transparent z-10"></div>
          
          <div className="flex gap-6 animate-marquee w-max px-4 hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="w-80 md:w-96 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex-shrink-0">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-slate-900">{t.name}</h4>
                    <span className="text-xs text-secondary font-bold bg-cyan-50 px-2 py-1 rounded">{t.role}</span>
                  </div>
                  <div className="flex text-yellow-400">
                    {[...Array(t.rating)].map((_, idx) => <Star key={idx} size={14} fill="currentColor" />)}
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">"{t.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - SEO Goldmine */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
             <h2 className="text-secondary font-bold mb-2 uppercase tracking-wider">أسئلة متكررة</h2>
             <h3 className="text-3xl font-heading font-bold text-slate-900">كل ما تريد معرفته عن خدماتنا</h3>
          </div>

          <div className="space-y-4">
             {faqs.map((faq, index) => (
               <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 hover:shadow-md transition-shadow">
                 <button 
                   onClick={() => setOpenFaq(openFaq === index ? null : index)}
                   className="w-full flex justify-between items-center p-5 text-right font-bold text-slate-800"
                 >
                   <span className="flex items-center gap-3">
                     <HelpCircle size={20} className="text-secondary shrink-0" />
                     {faq.question}
                   </span>
                   <ChevronDown size={20} className={`transition-transform duration-300 text-slate-400 ${openFaq === index ? 'rotate-180 text-secondary' : ''}`} />
                 </button>
                 <AnimatePresence>
                   {openFaq === index && (
                     <motion.div 
                       initial={{ height: 0, opacity: 0 }} 
                       animate={{ height: 'auto', opacity: 1 }} 
                       exit={{ height: 0, opacity: 0 }}
                       className="overflow-hidden"
                     >
                       <div className="p-5 pt-0 text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                         {faq.answer}
                       </div>
                     </motion.div>
                   )}
                 </AnimatePresence>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 container mx-auto px-4">
        <div className="bg-primary rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-blue-900/30">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
           
           <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 relative z-10">جاهز لتجربة نظافة استثنائية؟</h2>
           <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto relative z-10">لا تضيع وقتك في التنظيف. دع الخبراء يهتمون بمنزلك بينما تستمتع بوقتك مع عائلتك.</p>
           
           <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
             <a href={`tel:${phoneNumber}`} className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg">
               اتصل الآن {phoneNumber}
             </a>
             <button onClick={() => setIsBookingOpen(true)} className="bg-secondary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-cyan-600 transition-colors shadow-lg">
               طلب عرض سعر
             </button>
           </div>
        </div>
      </section>

      {/* Booking Modal - Increased Z-Index to 10000 to fix layering issues */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center px-4">
             {/* Backdrop */}
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsBookingOpen(false)}
               className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm cursor-pointer"
             />
             
             {/* Modal Content */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="relative w-full max-w-lg z-10"
             >
               <button 
                 onClick={() => setIsBookingOpen(false)}
                 className="absolute -top-12 right-0 md:-right-12 text-white hover:text-secondary transition-colors p-2 bg-white/10 rounded-full backdrop-blur-md"
               >
                 <X size={24} />
               </button>
               <BookingForm />
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Home;
