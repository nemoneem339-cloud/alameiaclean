
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';

interface BreadcrumbProps {
  items: { label: string; path?: string }[];
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center text-sm text-slate-500 mb-6 overflow-x-auto whitespace-nowrap pb-2 font-medium" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-primary flex items-center gap-1 transition-colors">
        <Home size={16} className="mb-1" /> الرئيسية
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          <ChevronLeft size={16} className="mx-2 text-slate-300 rtl:rotate-180" />
          {item.path ? (
            <Link to={item.path} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-900" aria-current="page">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
