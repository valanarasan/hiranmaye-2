import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
}

export function usePageSEO({ title, description, keywords, url }: SEOProps) {
  useEffect(() => {
    // Update title
    document.title = `${title} | HIRANMAYE DIGITAL`;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update keywords if provided
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [title, description, keywords, url]);
}
