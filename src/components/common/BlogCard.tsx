import React from 'react';
import { BlogPost } from '../../types';
import { Clock, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  onClick: (post: BlogPost) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onClick }) => {
  return (
    <div className="blog-card" onClick={() => onClick(post)}>
      <div>
        <div className="blog-card-meta">
          <span className="blog-category-tag">{post.category}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={14} /> {post.readTime}
          </span>
        </div>

        <h3 className="blog-card-title">{post.title}</h3>
        <p className="blog-card-excerpt">{post.excerpt}</p>
      </div>

      <div className="blog-card-footer">
        <span>Read Full Article</span>
        <ArrowRight size={18} color="var(--brand-blue-600)" />
      </div>
    </div>
  );
};
