
import React, { useState } from 'react';
import SEO from '../components/SEO';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const phoneNumber = "0500801225";
  const whatsappNumber = "966500801225";

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'تنظيف فلل وقصور',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct WhatsApp Message
    const text = `مرحباً العالمية كلين، لدي استفسار عبر الموقع الإلكتروني:%0a` +
                 `------------------------%0a` +
                 `👤 الاسم: ${formData.name}%0a` +
                 `📱 الجوال: ${formData.phone}%0a` +
                 `🛠 الخدمة: ${formData.service}%0a` +
                 `📩 الرسالة: ${formData.message}%0a` +
                 `------------------------`;

    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${text}`; // No encodeURIComponent needed here if manually encoding newlines, but let's keep it simple and let browser handle standard encoding if we pass raw string to encodeURIComponent, but mixing %0a manually is often safer for specific formatting. 
    // Better approach for React:
    const rawText = `مرحباً العالمية كلين، لدي استفسار عبر الموقع الإلكتروني:
------------------------
👤 الاسم: ${formData.name}
📱 الجوال: ${formData.phone}
🛠 الخدمة: ${formData.service}
📩 الرسالة: ${formData.message}
------------------------`;
    
    window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(rawText)}`, '_blank');
  };
  
  return (
    <>
      <SEO 
        title="اتصل بنا" 
        description="تواصل مع العالمية كلين لخدمات التنظيف بالرياض. أرقام الهاتف، العنوان، ونموذج الحجز." 
        type="contact"
      />

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-black text-gray-900 mb-4">تواصل معنا</h1>
            <p className="text-xl text-gray-600">نحن هنا لخدمتكم على مدار الساعة</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Contact Info & Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-primary">معلومات الاتصال</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg"><Phone className="text-secondary" /></div>
                    <div>
                      <h3 className="font-bold text-gray-900">الهاتف</h3>
                      <p className="text-gray-600" dir="ltr">+966 {phoneNumber.substring(1)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg"><Mail className="text-secondary" /></div>
                    <div>
                      <h3 className="font-bold text-gray-900">البريد الإلكتروني</h3>
                      <p className="text-gray-600">info@alamiyaclean.sa</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg"><MapPin className="text-secondary" /></div>
                    <div>
                      <h3 className="font-bold text-gray-900">العنوان</h3>
                      <p className="text-gray-600">الرياض، حي الملقا، طريق الملك فهد</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg"><Clock className="text-secondary" /></div>
                    <div>
                      <h3 className="font-bold text-gray-900">ساعات العمل</h3>
                      <p className="text-gray-600">يومياً من 8 صباحاً حتى 10 مساءً</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6 text-primary">أرسل لنا رسالة</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">الاسم</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none" 
                        placeholder="الاسم الكريم" 
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">رقم الجوال</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none text-left placeholder:text-right" 
                        placeholder="05xxxxxxxx" 
                        dir="ltr"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الخدمة المطلوبة</label>
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
                    >
                      <option value="تنظيف فلل وقصور">تنظيف فلل وقصور</option>
                      <option value="غسيل مكيفات">غسيل مكيفات</option>
                      <option value="مكافحة حشرات">مكافحة حشرات</option>
                      <option value="تنظيف خزانات">تنظيف خزانات</option>
                      <option value="غسيل كنب وسجاد">غسيل كنب وسجاد</option>
                      <option value="جلي رخام">جلي رخام</option>
                      <option value="أخرى">أخرى</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">الرسالة</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4} 
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none" 
                      placeholder="تفاصيل الطلب..."
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                    <Send size={18} /> إرسال الطلب الآن
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-[600px] bg-gray-200 rounded-2xl overflow-hidden shadow-lg sticky top-24"
            >
              {/* Static Embed for Riyadh */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115934.33230635336!2d46.675295!3d24.713551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03890d489399%3A0xba974d1c98e79fd5!2sRiyadh%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1698765432100!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Riyadh Map"
              ></iframe>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
