import React, { useState, useEffect } from 'react';
import { getDbSetting } from '../../api/mongoApi';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { ChevronRight } from 'lucide-react';
import './Blog.css';

const defaultBlogList = [
  {
    id: "1",
    slug: "the-future-of-skincare",
    title: "The Future of Advanced Skincare & Cellular Longevity",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Discover the latest breakthrough technologies and treatments that are revolutionizing aesthetic dermatology and cellular renewal.",
    date: "October 10, 2026"
  },
  {
    id: "2",
    slug: "demystifying-nad-plus-infusions",
    title: "Demystifying NAD+ Cellular Longevity Infusions",
    image: "https://images.unsplash.com/photo-1512290900672-1f879ff96a12?auto=format&fit=crop&w=1200&q=80",
    excerpt: "How coenzyme therapy works at the mitochondrial level to rejuvenate energy, cognition, and dermatological vitality.",
    date: "October 02, 2026"
  }
];

const Blog = () => {
  const [hero, setHero] = useState({
    title: "Aevora Journal",
    subtitle: "Insights, expert advice, and the latest in aesthetic medicine",
    breadcrumb: "HOME / BLOG"
  });
  const [blogs, setBlogs] = useState(defaultBlogList);

  const loadBlogs = () => {
    getDbSetting('blog_settings').then((saved) => {
      if (saved) {
        if (Array.isArray(saved)) {
          setBlogs(saved);
        } else if (saved.posts && Array.isArray(saved.posts)) {
          setBlogs(saved.posts);
          if (saved.hero) setHero(saved.hero);
        }
      } else {
        const legacy = localStorage.getItem('aevora_blogs');
        if (legacy) {
          try {
            setBlogs(JSON.parse(legacy));
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
          {blogs.length === 0 ? (
            <div className="no-blogs-msg">
              <p>No articles published yet. Check back soon!</p>
            </div>
          ) : (
            <div className="blog-grid">
              {blogs.map((blog) => (
                <div className="blog-card" key={blog.id}>
                  <Link to={`/blog/${blog.slug}`} className="blog-card-img-link">
                    <img src={blog.image} alt={blog.title} className="blog-card-img" />
                  </Link>
                  <div className="blog-card-content">
                    <span className="blog-card-date">{blog.date}</span>
                    <h3 className="blog-card-title">
                      <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>
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

      <Footer />
    </div>
  );
};

export default Blog;
