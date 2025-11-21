
import React from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { Target, Award, Users } from 'lucide-react';

const About = () => {
  return (
    <>
      <SEO 
        title="من نحن" 
        description="تعرف على شركة العالمية كلين، رؤيتنا، رسالتنا، وفريق العمل المتخصص في خدمات النظافة بالرياض." 
        type="about"
      />

      {/* Header */}
      <div className="bg-primary text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4">من نحن</h1>
        <p className="text-xl opacity-90">الريادة في عالم النظافة المنزلية</p>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-1/2"
          >
            <h2 className="text-secondary font-bold text-lg mb-2">قصتنا</h2>
            <h3 className="text-3xl font-black text-gray-900 mb-6">أكثر من 10 سنوات في خدمة منازل الرياض</h3>
            <p className="text-gray-600 leading-relaxed text-lg mb-4">
              تأسست شركة العالمية كلين برؤية واضحة: تقديم خدمات نظافة احترافية ترتقي لمستوى تطلعات العميل السعودي. بدأنا بفريق صغير وشغف كبير، واليوم نحن فخورون بخدمة آلاف العملاء في جميع أحياء الرياض.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              نحن نؤمن بأن النظافة ليست مجرد إزالة للأوساخ، بل هي خلق بيئة صحية وآمنة للعائلة. لذلك نستثمر باستمرار في أحدث التقنيات وتدريب كوادرنا.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full md:w-1/2"
          >
            <img src="https://picsum.photos/seed/office/800/600" alt="About us" className="rounded-3xl shadow-xl" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">رؤيتنا</h3>
            <p className="text-gray-600">أن نكون الشركة المرجعية الأولى في مجال خدمات التنظيف والصيانة في المملكة.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
             <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
              <Award size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">رسالتنا</h3>
            <p className="text-gray-600">تقديم خدمات عالية الجودة بأسعار تنافسية، مع الالتزام التام بالمواعيد والأمانة.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
             <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">قيمنا</h3>
            <p className="text-gray-600">الأمانة، الجودة، الالتزام، والتطوير المستمر هي الركائز التي نبني عليها عملنا.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
