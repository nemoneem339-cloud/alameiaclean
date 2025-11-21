
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { neighborhoods } from '../data/neighborhoods';
import { testimonials } from '../data/content';

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  type?: 'website' | 'article' | 'service' | 'business' | 'about' | 'contact';
  image?: string;
  schemaData?: Record<string, any>;
  breadcrumbs?: BreadcrumbItem[];
  keywords?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  canonicalUrl, 
  type = 'website', 
  // High-quality default cleaning image for social sharing
  image = 'https://images.unsplash.com/photo-1581578731117-104f2a8d46a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  schemaData,
  breadcrumbs,
  keywords
}) => {
  const location = useLocation();
  const siteUrl = 'https://alamiyaclean.sa';
  const currentPath = location.pathname === '/' ? '' : location.pathname;
  const currentUrl = `${siteUrl}/#${currentPath}`; 
  
  const phoneNumber = "+966500801225";

  useEffect(() => {
    // 1. Update document Title
    document.title = `${title} | العالمية كلين`;

    // 2. Update Meta Tags
    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateOgMeta = (property: string, content: string) => {
       let element = document.querySelector(`meta[property="${property}"]`);
       if (!element) {
         element = document.createElement('meta');
         element.setAttribute('property', property);
         document.head.appendChild(element);
       }
       element.setAttribute('content', content);
    };

    updateMeta('description', description);
    if (keywords) {
      updateMeta('keywords', keywords);
    }
    
    // Google Site Verification
    updateMeta('google-site-verification', 'v-YOUR_VERIFICATION_CODE_HERE');

    // Twitter Cards
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:site', '@alalameiastar');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);
    
    // Geo Meta Tags
    updateMeta('geo.position', '24.7136;46.6753');
    updateMeta('geo.placename', 'Riyadh');
    updateMeta('geo.region', 'SA-01');
    updateMeta('ICBM', '24.7136, 46.6753');
    
    updateOgMeta('og:title', title);
    updateOgMeta('og:description', description);
    updateOgMeta('og:url', currentUrl);
    updateOgMeta('og:type', type === 'article' ? 'article' : 'website');
    updateOgMeta('og:image', image);
    updateOgMeta('og:locale', 'ar_SA');

    // 3. Canonical
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl || currentUrl);

    // 4. JSON-LD Schema
    const existingScript = document.getElementById('json-ld-schema');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'json-ld-schema';
    script.type = 'application/ld+json';
    
    // Area Served Data
    const areaServed = neighborhoods.map(n => ({
      "@type": "Place",
      "name": n.nameAr,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 24.7136, 
        "longitude": 46.6753 
      }
    }));
    areaServed.unshift({
      "@type": "City",
      "name": "الرياض",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 24.7136, 
        "longitude": 46.6753 
      }
    } as any);

    // WebSite Schema (Brand Identity)
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "العالمية كلين",
      "alternateName": ["Alamiya Clean", "شركة العالمية كلين"],
      "url": siteUrl,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${siteUrl}/?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    };

    // Base LocalBusiness Schema
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "العالمية كلين",
      // Ensure a valid image URL is used for the logo if specific one isn't provided
      "image": "https://alamiyaclean.sa/logo.png", 
      "logo": "https://alamiyaclean.sa/logo.png",
      "telephone": phoneNumber,
      "url": siteUrl,
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "طريق الملك فهد، حي الملقا",
        "addressLocality": "الرياض",
        "addressRegion": "الرياض",
        "postalCode": "11564",
        "addressCountry": "SA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 24.7136,
        "longitude": 46.6753
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Saturday", "Friday"],
        "opens": "00:00",
        "closes": "23:59"
      },
      "areaServed": areaServed,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "1580"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": phoneNumber,
        "contactType": "customer service",
        "areaServed": "SA",
        "availableLanguage": ["Arabic", "English"]
      },
      "review": testimonials.map(t => ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": t.name
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": t.rating,
          "bestRating": "5"
        },
        "reviewBody": t.content
      })),
      "sameAs": [
        "https://www.instagram.com/alalameiastar/",
        "https://twitter.com/alalameiastar", 
        "https://www.facebook.com/alalameiastar"
      ]
    };

    // Page Specific Schemas
    let pageSchema: any = {};
    if (type === 'about') {
      pageSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        "mainEntity": { "@id": `${siteUrl}/#localbusiness` }
      };
      baseSchema["@id"] = `${siteUrl}/#localbusiness`; // Link AboutPage to LocalBusiness
    } else if (type === 'contact') {
      pageSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "mainEntity": { "@id": `${siteUrl}/#localbusiness` }
      };
      baseSchema["@id"] = `${siteUrl}/#localbusiness`;
    }

    // Speakable Schema (Voice Search)
    const speakableSchema = {
      "@context": "https://schema.org",
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "p"]
    };

    // Breadcrumb Schema
    let breadcrumbSchema = null;
    if (breadcrumbs) {
      breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.item.startsWith('http') ? crumb.item : `${siteUrl}/#${crumb.item}`
        }))
      };
    }

    const finalSchema = {
      "@graph": [
        websiteSchema, // Added WebSite Schema
        baseSchema,
        pageSchema,
        speakableSchema,
        schemaData ? schemaData : {},
        breadcrumbSchema ? breadcrumbSchema : {}
      ].filter(x => Object.keys(x).length > 0)
    };

    script.text = JSON.stringify(finalSchema);
    document.head.appendChild(script);

    window.scrollTo(0, 0);

  }, [title, description, currentUrl, schemaData, type, image, breadcrumbs, phoneNumber, keywords]);

  return null;
};

export default SEO;
