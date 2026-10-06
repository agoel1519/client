import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { ChevronRight } from 'lucide-react';
import './Blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localStorage.getItem('aevora_blogs');
    if (saved) {
      try {
        setBlogs(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <div className="blog-page-container">
      <Header />

      {/* HERO SECTION */}
      <section className="blog-hero-section">
        <div className="blog-hero-content">
          <h1 className="blog-hero-title">Aevora Journal</h1>
          <p className="blog-hero-subtitle">Insights, expert advice, and the latest in aesthetic medicine</p>
          <div className="blog-breadcrumb">
            HOME / <span>BLOG</span>
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
