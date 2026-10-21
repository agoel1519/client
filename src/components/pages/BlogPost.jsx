import React, { useState, useEffect } from 'react';
import { getDbSetting } from '../../api/mongoApi';
import { useParams, Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import ConsultationSection from '../ConsultationSection';
import { ChevronLeft, Clock, User, Tag } from 'lucide-react';
import { initialBlogPosts } from '../admin/AdminBlogSettings';
import './Blog.css';

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const fetchPost = () => {
    getDbSetting('blog_settings').then((saved) => {
      let blogs = initialBlogPosts;
      if (saved) {
        if (Array.isArray(saved) && saved.length > 0) {
          blogs = saved;
        } else if (saved.posts && Array.isArray(saved.posts) && saved.posts.length > 0) {
          blogs = saved.posts;
        }
      } else {
        const legacy = localStorage.getItem('aevora_blogs');
        if (legacy) {
          try {
            const parsed = JSON.parse(legacy);
            if (parsed && Array.isArray(parsed) && parsed.length > 0) {
              blogs = parsed;
            }
          } catch (e) {}
        }
      }

      const found = blogs.find(b => b.slug === slug);
      if (found) {
        setBlog(found);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    }).catch(() => {
      const found = initialBlogPosts.find(b => b.slug === slug);
      if (found) {
        setBlog(found);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPost();
    window.addEventListener('blogSettingsUpdated', fetchPost);
    return () => window.removeEventListener('blogSettingsUpdated', fetchPost);
  }, [slug]);

  if (notFound) {
    return (
      <div className="blog-page-container">
        <Header />
        <section className="blog-error-section" style={{ minHeight: '50vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px 20px' }}>
          <h2>Article Not Found</h2>
          <p style={{ color: 'var(--aevora-body-text)', margin: '12px 0 24px' }}>We couldn't find the article you were looking for.</p>
          <Link to="/blog" className="btn-back-blog" style={{ padding: '12px 28px', background: 'var(--aevora-emerald)', color: '#fff', borderRadius: '6px', textDecoration: 'none' }}>Return to Journal</Link>
        </section>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return <div className="blog-loading" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading article...</div>;
  }

  return (
    <div className="blog-page-container">
      <Header />

      <section className="blog-post-hero" style={{ backgroundImage: `url(${blog.image || '/celebrities/celeb-3.jpg'})` }}>
        <div className="blog-post-hero-overlay"></div>
        <div className="blog-post-hero-content">
          <Link to="/blog" className="blog-back-link">
            <ChevronLeft size={16} /> Back to Journal
          </Link>
          <div className="blog-post-date">
            <span>{blog.category || 'Clinical Aesthetics'}</span>
            <span> • </span>
            <span>{blog.date}</span>
            {blog.readTime && <span> • {blog.readTime}</span>}
          </div>
          <h1 className="blog-post-title">{blog.title}</h1>
          {blog.author && (
            <div style={{ marginTop: '12px', fontSize: '0.95rem', color: '#c59d5f', fontWeight: 600 }}>
              Written by {blog.author} {blog.authorRole ? `(${blog.authorRole})` : ''}
            </div>
          )}
        </div>
      </section>

      <section className="blog-post-body-section">
        <div className="blog-post-content-container">
          {blog.excerpt && (
            <div style={{ fontSize: '1.2rem', fontStyle: 'italic', color: '#475569', borderLeft: '4px solid #c59d5f', paddingLeft: '20px', marginBottom: '35px', lineHeight: 1.6 }}>
              {blog.excerpt}
            </div>
          )}

          <div 
            className="blog-post-body"
            dangerouslySetInnerHTML={{ __html: (blog.content || '').replace(/\n/g, '<br />') }}
          />

          {blog.tags && (
            <div style={{ marginTop: '45px', paddingTop: '20px', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <Tag size={16} color="#c59d5f" />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>Tags:</span>
              {blog.tags.split(',').map((tag, idx) => (
                <span key={idx} style={{ background: '#f1f5f9', color: '#334155', padding: '4px 12px', borderRadius: '15px', fontSize: '0.8rem' }}>
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <ConsultationSection />

      <Footer />
    </div>
  );
};

export default BlogPost;
