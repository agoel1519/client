import React, { useState, useEffect } from 'react';
import { getDbSetting } from '../../api/mongoApi';
import { useParams, Link } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { ChevronLeft } from 'lucide-react';
import './Blog.css';

const defaultBlogList = [
  {
    id: "1",
    slug: "the-future-of-skincare",
    title: "The Future of Advanced Skincare & Cellular Longevity",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Discover the latest breakthrough technologies and treatments that are revolutionizing aesthetic dermatology and cellular renewal.",
    content: "Skincare has evolved dramatically over the last decade. With the introduction of advanced laser therapies, stem cell treatments, and personalized cellular medicine, achieving flawless, ageless skin is more scientifically possible than ever before.\n\nAt Aevora, we pride ourselves on staying at the forefront of these medical advancements. From US FDA-cleared EXION MNRF to non-invasive Ultherapy Prime lifts and bespoke bio-infusions, our clinical philosophy pairs rigorous dermatological evidence with subtle artistic contouring.\n\nKey Takeaways:\n1. Cellular regenerative treatments stimulate endogenous collagen without downtime.\n2. Preventative aesthetics preserve facial tissue architecture.\n3. Personalized protocols designed by medical doctors yield undetectable, natural results.",
    date: "October 10, 2026",
    author: "Dr. Meghna Mour"
  },
  {
    id: "2",
    slug: "demystifying-nad-plus-infusions",
    title: "Demystifying NAD+ Cellular Longevity Infusions",
    image: "https://images.unsplash.com/photo-1512290900672-1f879ff96a12?auto=format&fit=crop&w=1200&q=80",
    excerpt: "How coenzyme therapy works at the mitochondrial level to rejuvenate energy, cognition, and dermatological vitality.",
    content: "Nicotinamide Adenine Dinucleotide (NAD+) is an essential coenzyme found in every single living cell. It powers mitochondrial respiration, fuels DNA repair enzymes such as PARPs and Sirtuins, and regulates systemic circadian vitality.\n\nAs we age, natural NAD+ levels decline by up to 50% between youth and middle age. Intravenous NAD+ replenishment at Aevora restores cellular energy balance directly, bypassing digestive degradation.\n\nClinical Benefits:\n- Enhanced mental clarity and neuro-protection\n- Acceleration of cellular repair mechanisms\n- Amplified athletic recovery and chronic fatigue alleviation",
    date: "October 02, 2026",
    author: "Longevity Clinical Team"
  }
];

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const fetchPost = () => {
    getDbSetting('blog_settings').then((saved) => {
      let blogs = defaultBlogList;
      if (saved) {
        if (Array.isArray(saved)) {
          blogs = saved;
        } else if (saved.posts && Array.isArray(saved.posts)) {
          blogs = saved.posts;
        }
      } else {
        const legacy = localStorage.getItem('aevora_blogs');
        if (legacy) {
          try {
            blogs = JSON.parse(legacy);
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
      const found = defaultBlogList.find(b => b.slug === slug);
      if (found) {
        setBlog(found);
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

      <section className="blog-post-hero" style={{ backgroundImage: `url(${blog.image})` }}>
        <div className="blog-post-hero-overlay"></div>
        <div className="blog-post-hero-content">
          <Link to="/blog" className="blog-back-link">
            <ChevronLeft size={16} /> Back to Journal
          </Link>
          <div className="blog-post-date">{blog.date} {blog.author && `• By ${blog.author}`}</div>
          <h1 className="blog-post-title">{blog.title}</h1>
        </div>
      </section>

      <section className="blog-post-body-section">
        <div className="blog-post-content-container">
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
