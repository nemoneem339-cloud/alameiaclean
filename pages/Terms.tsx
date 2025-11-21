
import React from 'react';
import SEO from '../components/SEO';
import { FileText, AlertCircle } from 'lucide-react';

const Terms = () => {
  return (
    <>
      <SEO title="شروط الاستخدام" description="الشروط والأحكام الخاصة بخدمات شركة العالمية كلين." />
      
      <div className="bg-slate-50 py-20 min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
            <h1 className="text-3xl font-bold text-slate-900 mb-8 pb-6 border-b border-slate-100">شروط الاستخدام</h1>
            
            <div className="space-y-8 text-slate-600 leading-relaxed">
              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <FileText className="text-secondary" size={20} /> 1. قبول الشروط
                </h2>
                <p>
                  من خلال الوصول إلى هذا الموقع أو طلب إحدى خدماتنا، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على أي جزء منها، يرجى عدم استخدام خدماتنا.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">2. الخدمات والحجوزات</h2>
                <ul className="list-disc list-inside space-y-2 mr-4">
                  <li>جميع الحجوزات خاضعة لتوفر المواعيد.</li>
                  <li>تحتفظ الشركة بالحق في تعديل الموعد في حالات الظروف القاهرة (مثل الأحوال الجوية) بعد إشعار العميل.</li>
                  <li>الأسعار المعروضة هي أسعار تقديرية، وقد تختلف بناءً على المعاينة الميدانية وحجم العمل الفعلي.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <AlertCircle className="text-secondary" size={20} /> 3. سياسة الإلغاء
                </h2>
                <p>
                  في حال رغبتك في إلغاء أو تأجيل الموعد، يرجى إبلاغنا قبل 24 ساعة على الأقل من الموعد المحدد.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">4. الضمان والمسؤولية</h2>
                <p>
                  نلتزم بتقديم الخدمة بأعلى معايير الجودة. في حال عدم رضاك عن مستوى النظافة، يرجى إبلاغنا خلال 24 ساعة من انتهاء الخدمة لمعالجة الأمر. الشركة غير مسؤولة عن أي تلفيات في الممتلكات المهترئة أصلاً أو التي لم يتم الإفصاح عن حساسيتها مسبقاً.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
