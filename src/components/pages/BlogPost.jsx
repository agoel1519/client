import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { ChevronLeft } from 'lucide-react';
import './Blog.css'; // Reuse styles

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localStorage.getItem('aevora_blogs');
    if (saved) {
      try {
        const blogs = JSON.parse(saved);
        const found = blogs.find(b => b.slug === slug);
        if (found) {
          setBlog(found);
        } else {
          setNotFound(true);
        }
      } catch (e) {
        setNotFound(true);
      }
    } else {
      setNotFound(true);
    }
  }, [slug]);

  if (notFound) {
    return (
      <div className="blog-page-container">
        <Header />
        <section className="blog-error-section">
          <h2>Article Not Found</h2>
          <p>We couldn't find the article you were looking for.</p>
          <Link to="/blog" className="btn-back-blog">Return to Blog</Link>
        </section>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return <div className="blog-loading">Loading...</div>;
  }

  return (
    <div className="blog-page-container">
      <Header />

      <section className="blog-post-hero" style={{ backgroundImage: `url(${blog.image})` }}>
        <div className="blog-post-hero-overlay"></div>
        <div className="blog-post-hero-content">
          <Link to="/blog" className="blog-back-link">
            <ChevronLeft size={16} /> Back to Journal
          </Link>
          <div className="blog-post-date">{blog.date}</div>
          <h1 className="blog-post-title">{blog.title}</h1>
        </div>
      </section>

      <section className="blog-post-body-section">
        <div className="blog-post-content-container">
          {/* We use dangerouslySetInnerHTML to allow basic HTML like <br>, <b> etc if the admin wrote them */}
          <div 
            className="blog-post-body"
            dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;
