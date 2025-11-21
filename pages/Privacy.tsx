
import React from 'react';
import SEO from '../components/SEO';
import { Shield, Lock, Eye } from 'lucide-react';

const Privacy = () => {
  return (
    <>
      <SEO title="سياسة الخصوصية" description="سياسة الخصوصية وحماية البيانات لعملاء شركة العالمية كلين." />
      
      <div className="bg-slate-50 py-20 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
            <h1 className="text-3xl font-bold text-slate-900 mb-8 pb-6 border-b border-slate-100">سياسة الخصوصية</h1>
            
            <div className="space-y-8 text-slate-600 leading-relaxed">
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Shield className="text-secondary" size={20} /> 1. مقدمة
                </h2>
                <p>
                  تحترم شركة العالمية كلين خصوصيتك وتلتزم بحماية بياناتك الشخصية. توضح هذه السياسة كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك عند استخدام موقعنا أو طلب خدماتنا.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Eye className="text-secondary" size={20} /> 2. المعلومات التي نجمعها
                </h2>
                <p className="mb-2">قد نجمع المعلومات التالية عند حجز موعد أو التواصل معنا:</p>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>الاسم الكامل.</li>
                  <li>رقم الهاتف (للتواصل وتأكيد الحجز).</li>
                  <li>العنوان الجغرافي (لتنفيذ الخدمة).</li>
                  <li>تفاصيل الخدمة المطلوبة.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Lock className="text-secondary" size={20} /> 3. كيفية استخدام المعلومات
                </h2>
                <p>نستخدم بياناتك حصرياً للأغراض التالية:</p>
                <ul className="list-disc list-inside space-y-1 mr-4">
                  <li>تأكيد مواعيد الحجز وتنفيذ الخدمات.</li>
                  <li>التواصل معك بخصوص تفاصيل الطلب.</li>
                  <li>تحسين جودة خدماتنا وموقعنا الإلكتروني.</li>
                </ul>
                <p className="mt-2 font-bold">تنويه: لا نقوم ببيع أو مشاركة بياناتك مع أي طرف ثالث لأغراض تسويقية.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">4. أمن البيانات</h2>
                <p>
                  نطبق تدابير أمنية تقنية وإدارية مناسبة لحماية بياناتك من الوصول غير المصرح به أو التغيير أو الإفصاح أو الإتلاف.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">5. اتصل بنا</h2>
                <p>
                  إذا كان لديك أي استفسارات بخصوص سياسة الخصوصية، يرجى التواصل معنا عبر البريد الإلكتروني: <br/>
                  <a href="mailto:info@alamiyaclean.sa" className="text-primary font-bold dir-ltr">info@alamiyaclean.sa</a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
