import React, { useState, useEffect } from 'react';
import { getDbSetting } from '../../api/mongoApi';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import ConsultationSection from '../ConsultationSection';
import { ChevronRight, Clock, User } from 'lucide-react';
import { initialBlogPosts } from '../admin/AdminBlogSettings';
import './Blog.css';

const Blog = () => {
  const [hero, setHero] = useState({
    title: "Aevora Journal & Insights",
    subtitle: "Clinical dermatological science, longevity breakthroughs, and modern aesthetic elegance",
    breadcrumb: "HOME / BLOG"
  });
  const [blogs, setBlogs] = useState(initialBlogPosts);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const loadBlogs = () => {
    getDbSetting('blog_settings').then((saved) => {
      if (saved) {
        if (Array.isArray(saved) && saved.length > 0) {
          setBlogs(saved);
        } else if (saved.posts && Array.isArray(saved.posts) && saved.posts.length > 0) {
          setBlogs(saved.posts);
          if (saved.hero) setHero(saved.hero);
        }
      } else {
        const legacy = localStorage.getItem('aevora_blogs');
        if (legacy) {
          try {
            const parsed = JSON.parse(legacy);
            if (parsed && Array.isArray(parsed) && parsed.length > 0) {
              setBlogs(parsed);
              return;
            }
          } catch (e) {}
        }
      }
    }).catch(() => {});
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadBlogs();
    window.addEventListener('blogSettingsUpdated', loadBlogs);
    return () => window.removeEventListener('blogSettingsUpdated', loadBlogs);
  }, []);

  // Filter published blogs
  const publishedBlogs = blogs.filter(b => (b.status || 'Published') === 'Published');
  const categories = ["All", ...Array.from(new Set(publishedBlogs.map(b => b.category).filter(Boolean)))];

  const displayedBlogs = publishedBlogs.filter(b => {
    if (selectedCategory === "All") return true;
    return b.category === selectedCategory;
  });

  return (
    <div className="blog-page-container">
      <Header />

      {/* HERO SECTION */}
      <section className="blog-hero-section">
        <div className="blog-hero-content">
          <h1 className="blog-hero-title">{hero.title}</h1>
          <p className="blog-hero-subtitle">{hero.subtitle}</p>
          <div className="blog-breadcrumb">
            <span>{hero.breadcrumb}</span>
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="blog-list-section">
        <div className="blog-grid-container">

          {/* Category Filter Pills */}
          {categories.length > 1 && (
            <div className="blog-categories-nav">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`blog-category-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {displayedBlogs.length === 0 ? (
            <div className="no-blogs-msg">
              <p>No articles found in this category. Check back soon!</p>
            </div>
          ) : (
            <div className="blog-grid">
              {displayedBlogs.map((blog) => (
                <div className="blog-card" key={blog.id}>
                  <Link to={`/blog/${blog.slug}`} className="blog-card-img-link">
                    <img 
                      src={blog.image || '/celebrities/celeb-3.jpg'} 
                      alt={blog.title} 
                      className="blog-card-img" 
                    />
                  </Link>

                  <div className="blog-card-content">
                    <div className="blog-card-meta-line">
                      <span>{blog.category || 'Aesthetics'}</span>
                      {blog.readTime && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#94a3b8' }}>
                          <Clock size={12} /> {blog.readTime}
                        </span>
                      )}
                    </div>

                    <h3 className="blog-card-title">
                      <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>

                    {blog.author && (
                      <div className="blog-card-author-line">
                        <User size={13} /> {blog.author} • {blog.date}
                      </div>
                    )}

                    <p className="blog-card-excerpt">{blog.excerpt}</p>

                    <Link to={`/blog/${blog.slug}`} className="blog-card-read-more">
                      Read Full Article <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
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

export default Blog;
