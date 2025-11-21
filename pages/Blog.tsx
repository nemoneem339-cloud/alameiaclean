
import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/content';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft } from 'lucide-react';

const Blog = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Idea 1: ItemList Schema for Rich Results (Carousel)
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": blogPosts.map((post, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://alamiyaclean.sa/#/blog/${post.slug}`
    }))
  };

  return (
    <>
      <SEO 
        title="المدونة" 
        description="نصائح ومعلومات في التنظيف المنزلي، مكافحة الحشرات، وصيانة المنزل من خبراء العالمية كلين." 
        schemaData={itemListSchema}
      />

      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-black text-gray-900 mb-4">مدونة النصائح والإرشادات</h1>
            <p className="text-xl text-gray-600">كل ما تحتاج معرفته للحفاظ على نظافة وجمال منزلك</p>
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogPosts.map((post) => (
              <motion.article key={post.id} variants={item} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                <Link to={`/blog/${post.slug}`} className="block overflow-hidden h-56 bg-slate-200">
                  <img 
                    src={`https://picsum.photos/seed/${post.id}/800/600`}
                    alt={post.title} 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    width="800"
                    height="600"
                  />
                </Link>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                    <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 text-gray-900 leading-snug hover:text-secondary transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3 flex-grow" dangerouslySetInnerHTML={{ __html: post.excerpt }}></p>
                  <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-secondary font-bold text-sm hover:underline mt-auto">
                    اقرأ المزيد <ArrowLeft size={16} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Blog;
