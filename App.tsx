import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import { Loader2 } from 'lucide-react';

// Lazy Load Pages for Performance (Code Splitting)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Neighborhood = lazy(() => import('./pages/Neighborhood'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const HtmlSitemap = lazy(() => import('./pages/HtmlSitemap'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-primary">
    <Loader2 size={48} className="animate-spin mb-4" />
    <p className="text-slate-500 text-sm font-bold animate-pulse">جاري التحميل...</p>
  </div>
);

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Services Routes */}
              <Route path="/services" element={<Services />} /> 
              <Route path="/services/:slug" element={<ServiceDetail />} />
              
              {/* Blog Routes */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />

              {/* Neighborhood Landing Pages (SEO Goldmine) */}
              <Route path="/areas/:slug" element={<Neighborhood />} />
              
              {/* Legal Pages */}
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />

              {/* Developer Tool: Dynamic XML Sitemap Generator */}
              <Route path="/sitemap" element={<Sitemap />} />

              {/* User-Facing HTML Sitemap */}
              <Route path="/html-sitemap" element={<HtmlSitemap />} />

              {/* 404 Route - Must be last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
};

export default App;