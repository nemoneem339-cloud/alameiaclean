export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string; // Mapping to Lucide icons
  features: string[];
  imageUrl: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML or Markdown string
  date: string;
  author: string;
  imageUrl: string;
  tags: string[];
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}