
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, Calendar, User, ClipboardList, MessageCircle } from 'lucide-react';
import { services } from '../data/content';

interface BookingFormProps {
  initialService?: string;
  initialNote?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ initialService, initialNote }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    propertyType: '',
    date: '',
    timeSlot: '',
    name: '',
    phone: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Auto-fill service and notes if provided via props
  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
    if (initialNote) {
      setFormData(prev => ({ ...prev, notes: initialNote }));
    }
  }, [initialService, initialNote]);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Construct the WhatsApp Message
    const phoneNumber = "966500801225"; // International format without +
    const message = `مرحباً العالمية كلين، أرغب بحجز موعد:
------------------------
👤 الاسم: ${formData.name}
📱 الجوال: ${formData.phone}
🏠 الخدمة: ${formData.service}
🏢 نوع العقار: ${formData.propertyType || 'غير محدد'}
📅 التاريخ: ${formData.date}
⏰ الوقت: ${formData.timeSlot || 'غير محدد'}
📝 ملاحظات: ${formData.notes || 'لا يوجد'}
------------------------
أرجو تأكيد الحجز.`;

    // 2. Encode URL - Using api.whatsapp.com is more reliable for pre-filling text
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

    // 3. Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // 4. Show success UI locally
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/95 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center border border-green-100"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
          <Check size={40} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">جاري تحويلك للواتساب...</h3>
        <p className="text-gray-600 mb-6">إذا لم يفتح التطبيق تلقائياً، اضغط على الزر أدناه لإرسال التفاصيل.</p>
        <a 
          href={`https://api.whatsapp.com/send?phone=966500801225`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-500/30"
        >
          <MessageCircle size={20} /> فتح واتساب يدوياً
        </a>
      </motion.div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-xl p-6 md:p-8 rounded-3xl shadow-2xl border border-white/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
        <motion.div 
          className="h-full bg-secondary" 
          initial={{ width: '33%' }}
          animate={{ width: `${step * 33.33}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <h3 className="text-2xl font-bold text-primary mb-6 text-center font-heading">حجز موعد أونلاين</h3>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode='wait'>
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-4"
            >
              <div className="text-center mb-4 text-gray-500 text-sm flex items-center justify-center gap-2">
                <ClipboardList size={16} /> خطوة 1: اختر الخدمة
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الخدمة المطلوبة</label>
                <select 
                  name="service" 
                  value={formData.service} 
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none bg-white transition-all"
                  required
                >
                  <option value="">اختر الخدمة...</option>
                  {services.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع العقار</label>
                <div className="grid grid-cols-2 gap-3">
                  {['شقة', 'فيلا', 'قصر', 'مكتب'].map(type => (
                    <button 
                      type="button"
                      key={type}
                      onClick={() => setFormData({...formData, propertyType: type})}
                      className={`p-2 border rounded-lg text-sm transition-colors ${
                        formData.propertyType === type 
                          ? 'border-secondary bg-blue-50 text-secondary font-bold ring-1 ring-secondary' 
                          : 'hover:border-secondary hover:bg-blue-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <button type="button" onClick={nextStep} className="w-full bg-primary text-white py-3 rounded-xl font-bold mt-4 hover:bg-blue-800 transition-all flex items-center justify-center gap-2">
                التالي <ChevronLeft size={20} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-4"
            >
               <div className="text-center mb-4 text-gray-500 text-sm flex items-center justify-center gap-2">
                <Calendar size={16} /> خطوة 2: الموعد المناسب
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">التاريخ المفضل</label>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">التوقيت</label>
                <div className="grid grid-cols-2 gap-3">
                  {['صباحاً (8-12)', 'مساءً (1-6)'].map(time => (
                    <button 
                      type="button"
                      key={time}
                      onClick={() => setFormData({...formData, timeSlot: time})}
                      className={`p-2 border rounded-lg text-sm transition-colors ${
                        formData.timeSlot === time 
                          ? 'border-secondary bg-blue-50 text-secondary font-bold ring-1 ring-secondary' 
                          : 'hover:border-secondary hover:bg-blue-50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button type="button" onClick={prevStep} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all">
                  السابق
                </button>
                <button type="button" onClick={nextStep} className="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:bg-blue-800 transition-all flex items-center justify-center gap-2">
                  التالي <ChevronLeft size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-4"
            >
               <div className="text-center mb-4 text-gray-500 text-sm flex items-center justify-center gap-2">
                <User size={16} /> خطوة 3: بيانات التواصل
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الاسم بالكامل</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="اسمك الكريم"
                  className="w-full p-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رقم الجوال</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="05xxxxxxxx"
                  className="w-full p-3 rounded-xl border border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none bg-white text-left placeholder:text-right"
                  dir="ltr"
                  required
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button type="button" onClick={prevStep} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all">
                  السابق
                </button>
                <button type="submit" className="flex-1 bg-[#25D366] text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-500/30 flex items-center justify-center gap-2">
                  <MessageCircle size={20} /> إرسال عبر واتساب
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

export default BookingForm;
