import React from 'react';
import { Dialog, IconButton, Typography, Box, Button, Chip } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { Clock, Calendar, CheckSquare, Sparkles } from 'lucide-react';
import { BlogPost } from '../../types';

interface BlogReaderModalProps {
  post: BlogPost | null;
  open: boolean;
  onClose: () => void;
  onSelectPost: (post: BlogPost) => void;
  allPosts: BlogPost[];
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({
  post,
  open,
  onClose,
  onSelectPost,
  allPosts
}) => {
  if (!post) return null;

  const relatedArticles = allPosts.filter(p => post.relatedIds?.includes(p.id));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      PaperProps={{
        className: 'modal-custom-dialog'
      }}
    >
      <div className="modal-header-gradient">
        <IconButton className="modal-close-btn" onClick={onClose} size="small" aria-label="close">
          <CloseIcon />
        </IconButton>
        <Chip 
          label={post.category} 
          size="small" 
          sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#FFFFFF', fontWeight: 700, mb: 1 }} 
        />
        <Typography variant="h4" component="h3" sx={{ color: '#FFFFFF', fontWeight: 800, lineHeight: 1.25 }}>
          {post.title}
        </Typography>
      </div>

      <div className="modal-body-content">
        <div className="article-meta-bar">
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={15} /> {post.date}
          </span>
          <span>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={15} /> {post.readTime}
          </span>
          <span>•</span>
          <span>By HIRANMAYE Growth Team</span>
        </div>

        <div className="article-reader-container">
          {post.content.map((paragraph, index) => (
            <p key={index} className="article-paragraph">
              {paragraph}
            </p>
          ))}

          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="article-takeaway-box">
              <Typography variant="h6" sx={{ color: 'var(--brand-navy-900)', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Sparkles size={18} color="var(--brand-blue-600)" /> Key Strategic Takeaways
              </Typography>
              <ul className="deliverables-list" style={{ margin: 0 }}>
                {post.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="deliverable-item">
                    <CheckSquare size={16} color="var(--brand-blue-600)" style={{ marginTop: 3, flexShrink: 0 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {relatedArticles.length > 0 && (
            <Box sx={{ mt: 5, pt: 3, borderTop: '1px solid var(--border-subtle)' }}>
              <Typography variant="h6" sx={{ color: 'var(--brand-navy-900)', mb: 2 }}>
                Recommended Related Reading
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {relatedArticles.map((rel) => (
                  <Box
                    key={rel.id}
                    onClick={() => onSelectPost(rel)}
                    sx={{
                      p: 2,
                      borderRadius: '12px',
                      border: '1px solid rgba(15, 23, 42, 0.08)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: 'var(--bg-accent-soft)',
                        borderColor: 'var(--brand-blue-600)',
                        transform: 'translateX(4px)'
                      }
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ color: 'var(--brand-navy-900)', fontWeight: 700 }}>
                      {rel.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>
                      {rel.category} • {rel.readTime}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            <Button variant="contained" color="primary" onClick={onClose}>
              Done Reading
            </Button>
          </Box>
        </div>
      </div>
    </Dialog>
  );
};
