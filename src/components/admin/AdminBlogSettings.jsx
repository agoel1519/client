import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertTriangle, Plus, Trash2, Edit3, X, Eye, FileText, Sparkles } from 'lucide-react';
import { getDbSetting, saveDbSetting } from '../../api/mongoApi';
import ImageUploader from './ImageUploader';
import './AdminDashboard.css';

const defaultBlogList = [
  {
    id: "1",
    slug: "the-future-of-skincare",
    title: "The Future of Advanced Skincare & Cellular Longevity",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Discover the latest breakthrough technologies and treatments that are revolutionizing aesthetic dermatology and cellular renewal.",
    content: "Skincare has evolved dramatically over the last decade. With the introduction of advanced laser therapies, stem cell treatments, and personalized cellular medicine, achieving flawless, ageless skin is more scientifically possible than ever before.\n\nAt Aevora, we pride ourselves on staying at the forefront of these medical advancements. From US FDA-cleared EXION MNRF to non-invasive Ultherapy Prime lifts and bespoke bio-infusions, our clinical philosophy pairs rigorous dermatological evidence with subtle artistic contouring.\n\nKey Takeaways:\n1. Cellular regenerative treatments stimulate endogenous collagen without downtime.\n2. Preventative aesthetics preserve facial tissue architecture.\n3. Personalized protocols designed by medical doctors yield undetectable, natural results.",
    date: "October 10, 2026",
    author: "Dr. Meghna Mour",
    category: "Skin & Longevity"
  },
  {
    id: "2",
    slug: "demystifying-nad-plus-infusions",
    title: "Demystifying NAD+ Cellular Longevity Infusions",
    image: "https://images.unsplash.com/photo-1512290900672-1f879ff96a12?auto=format&fit=crop&w=1200&q=80",
    excerpt: "How coenzyme therapy works at the mitochondrial level to rejuvenate energy, cognition, and dermatological vitality.",
    content: "Nicotinamide Adenine Dinucleotide (NAD+) is an essential coenzyme found in every single living cell. It powers mitochondrial respiration, fuels DNA repair enzymes such as PARPs and Sirtuins, and regulates systemic circadian vitality.\n\nAs we age, natural NAD+ levels decline by up to 50% between youth and middle age. Intravenous NAD+ replenishment at Aevora restores cellular energy balance directly, bypassing digestive degradation.\n\nClinical Benefits:\n- Enhanced mental clarity and neuro-protection\n- Acceleration of cellular cellular repair mechanisms\n- Amplified athletic recovery and chronic fatigue alleviation",
    date: "October 02, 2026",
    author: "Longevity Clinical Team",
    category: "Wellness & Longevity"
  }
];

const AdminBlogSettings = () => {
  const [heroSettings, setHeroSettings] = useState({
    title: "Aevora Journal",
    subtitle: "Insights, expert advice, and the latest in aesthetic medicine",
    breadcrumb: "HOME / BLOG"
  });
  const [blogs, setBlogs] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  // Editor State
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const saved = await getDbSetting('blog_settings');
        if (saved) {
          if (Array.isArray(saved)) {
            setBlogs(saved);
          } else if (saved.posts && Array.isArray(saved.posts)) {
            setBlogs(saved.posts);
            if (saved.hero) setHeroSettings(saved.hero);
          }
        } else {
          // Check legacy localStorage key
          const legacy = localStorage.getItem('aevora_blogs');
          if (legacy) {
            try {
              setBlogs(JSON.parse(legacy));
            } catch (e) {
              setBlogs(defaultBlogList);
            }
          } else {
            setBlogs(defaultBlogList);
          }
        }
      } catch (err) {
        console.error("Could not load blogs", err);
        setBlogs(defaultBlogList);
      }
    };

    fetchBlogs();
  }, []);

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const openEditor = (blog = null) => {
    if (blog) {
      setCurrentBlog({ ...blog });
    } else {
      setCurrentBlog({
        id: Date.now().toString(),
        slug: "",
        title: "",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
        excerpt: "",
        content: "",
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        author: "Dr. Meghna Mour",
        category: "Aesthetics"
      });
    }
    setIsEditing(true);
  };

  const closeEditor = () => {
    setIsEditing(false);
    setCurrentBlog(null);
  };

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleBlogChange = (e) => {
    const { name, value } = e.target;
    setCurrentBlog(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'title' && (!prev.slug || prev.slug === generateSlug(prev.title))) {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
  };

  const persistAll = async (updatedBlogs, updatedHero = heroSettings) => {
    setIsSaving(true);
    try {
      const payload = {
        hero: updatedHero,
        posts: updatedBlogs
      };
      const res = await saveDbSetting('blog_settings', payload);
      // Also cache to legacy key for compatibility
      localStorage.setItem('aevora_blogs', JSON.stringify(updatedBlogs));
      window.dispatchEvent(new Event('blogSettingsUpdated'));

      if (res && res.offline) {
        showToast("Saved locally in cache! (Backend will sync on port 5001)");
      } else {
        showToast("Blog settings & posts saved and published successfully!");
      }
    } catch (err) {
      console.error(err);
      showToast("Error saving blogs.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const saveCurrentBlog = async () => {
    if (!currentBlog.title.trim()) {
      alert("Please enter a blog title.");
      return;
    }
    const slugToUse = currentBlog.slug ? currentBlog.slug : generateSlug(currentBlog.title);
    const blogToSave = { ...currentBlog, slug: slugToUse };

    let updatedBlogs = [...blogs];
    const existingIndex = updatedBlogs.findIndex(b => b.id === blogToSave.id);

    if (existingIndex >= 0) {
      updatedBlogs[existingIndex] = blogToSave;
    } else {
      updatedBlogs.unshift(blogToSave);
    }

    setBlogs(updatedBlogs);
    await persistAll(updatedBlogs);
    closeEditor();
  };

  const deleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      const updatedBlogs = blogs.filter(b => b.id !== id);
      setBlogs(updatedBlogs);
      await persistAll(updatedBlogs);
    }
  };

  if (isEditing && currentBlog) {
    return (
      <div className="premium-page-manager">
        <div className="page-manager-header">
          <div className="header-titles">
            <h1>{blogs.some(b => b.id === currentBlog.id) ? 'Edit Blog Article' : 'Write New Article'}</h1>
            <p>Customize content, images, author attribution, and SEO slug.</p>
          </div>
          <div className="header-actions" style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-secondary" onClick={closeEditor}>
              <X size={18} /> Cancel
            </button>
            <button className="btn-primary" onClick={saveCurrentBlog} disabled={isSaving}>
              <Save size={18} /> {isSaving ? 'Saving...' : 'Save & Publish Article'}
            </button>
          </div>
        </div>

        <div className="premium-card" style={{ maxWidth: '960px', margin: '0 auto', padding: '28px' }}>
          <div className="form-group mb-4">
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Article Title *</label>
            <input 
              type="text" 
              name="title" 
              value={currentBlog.title} 
              onChange={handleBlogChange} 
              placeholder="e.g. The Science of Non-Surgical Facial Contouring" 
              className="form-control"
              style={{ width: '100%', padding: '12px', fontSize: '1.05rem', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
              required 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>URL Slug</label>
              <input 
                type="text" 
                name="slug" 
                value={currentBlog.slug} 
                onChange={handleBlogChange} 
                className="form-control"
                placeholder="article-url-slug" 
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
              />
            </div>
            <div className="form-group">
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Publish Date</label>
              <input 
                type="text" 
                name="date" 
                value={currentBlog.date} 
                onChange={handleBlogChange} 
                className="form-control"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
              />
            </div>
            <div className="form-group">
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Author</label>
              <input 
                type="text" 
                name="author" 
                value={currentBlog.author || ''} 
                onChange={handleBlogChange} 
                placeholder="Dr. Meghna Mour"
                className="form-control"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
              />
            </div>
            <div className="form-group">
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Category</label>
              <input 
                type="text" 
                name="category" 
                value={currentBlog.category || ''} 
                onChange={handleBlogChange} 
                placeholder="Aesthetics / Longevity"
                className="form-control"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
              />
            </div>
          </div>

          <div className="form-group mb-4">
            <ImageUploader 
              currentUrl={currentBlog.image} 
              onSelect={(url) => handleBlogChange({ target: { name: 'image', value: url }})} 
              label="Cover Image *" 
            />
          </div>

          <div className="form-group mb-4">
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Excerpt (Displays on listing grid card) *</label>
            <textarea 
              name="excerpt" 
              rows="3" 
              value={currentBlog.excerpt} 
              onChange={handleBlogChange}
              className="form-control"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
              placeholder="Short 2-3 sentence overview..."
            />
          </div>

          <div className="form-group mb-4">
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Full Article Body *</label>
            <p style={{ fontSize: '0.82rem', color: 'var(--admin-muted)', marginBottom: '8px' }}>
              Supports plain paragraphs and HTML tags (e.g. &lt;b&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;p&gt;).
            </p>
            <textarea 
              name="content" 
              rows="16" 
              value={currentBlog.content} 
              onChange={handleBlogChange} 
              className="form-control"
              style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--admin-border)', fontFamily: 'monospace', fontSize: '0.95rem' }}
              placeholder="Write the full clinical article content here..."
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="premium-page-manager">
      {notification && (
        <div className={`premium-toast ${notification.type}`}>
          {notification.type === 'error' ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
          <span>{notification.msg}</span>
        </div>
      )}

      <div className="page-manager-header">
        <div className="header-titles">
          <h1>Journal &amp; Blog Manager</h1>
          <p>Publish clinical articles, insights, press thought pieces, and educational guides.</p>
        </div>
        <div className="header-actions" style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-primary" onClick={() => persistAll(blogs, heroSettings)} disabled={isSaving}>
            <Save size={18} /> {isSaving ? 'Saving...' : 'Save All Changes'}
          </button>
          <button className="btn-secondary" onClick={() => openEditor()}>
            <Plus size={18} /> Write New Article
          </button>
        </div>
      </div>

      {/* Hero Banner Section Settings */}
      <div className="premium-card mb-4" style={{ padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} className="text-primary" />
          Blog Header &amp; Hero Settings
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div className="form-group">
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Page Title</label>
            <input 
              type="text" 
              value={heroSettings.title} 
              onChange={(e) => setHeroSettings(prev => ({ ...prev, title: e.target.value }))}
              className="form-control"
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
            />
          </div>
          <div className="form-group">
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Breadcrumb</label>
            <input 
              type="text" 
              value={heroSettings.breadcrumb} 
              onChange={(e) => setHeroSettings(prev => ({ ...prev, breadcrumb: e.target.value }))}
              className="form-control"
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
            />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Subtitle</label>
            <input 
              type="text" 
              value={heroSettings.subtitle} 
              onChange={(e) => setHeroSettings(prev => ({ ...prev, subtitle: e.target.value }))}
              className="form-control"
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--admin-border)' }}
            />
          </div>
        </div>
      </div>

      {/* Published Articles List */}
      <div className="premium-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, margin: 0 }}>Published Articles ({blogs.length})</h3>
            <p style={{ margin: '4px 0 0 0', color: 'var(--admin-muted)', fontSize: '0.85rem' }}>
              These articles appear live on the public Journal page.
            </p>
          </div>
          <button className="btn-secondary" onClick={() => openEditor()}>
            <Plus size={16} /> New Post
          </button>
        </div>

        {blogs.length === 0 ? (
          <div className="empty-state" style={{ padding: '40px', textAlign: 'center' }}>
            <FileText size={40} style={{ opacity: 0.3, marginBottom: '12px' }} />
            <p style={{ color: 'var(--admin-muted)' }}>No articles found. Click "Write New Article" to create your first post.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {blogs.map((blog) => (
              <div 
                key={blog.id} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '20px', 
                  padding: '16px', 
                  background: 'var(--admin-bg, #f8fafc)', 
                  borderRadius: '10px', 
                  border: '1px solid var(--admin-border, #e2e8f0)' 
                }}
              >
                <img 
                  src={blog.image || 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=300&q=80'} 
                  alt={blog.title} 
                  style={{ width: '110px', height: '75px', objectFit: 'cover', borderRadius: '8px' }} 
                />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', color: 'var(--admin-text, #0f172a)' }}>
                    {blog.title}
                  </h4>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '0.82rem', color: 'var(--admin-muted, #64748b)' }}>
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>/{blog.slug}</span>
                    {blog.author && (
                      <>
                        <span>•</span>
                        <span>{blog.author}</span>
                      </>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <a 
                    href={`/blog/${blog.slug}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="action-icon-btn" 
                    title="View Live"
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--admin-border)' }}
                  >
                    <Eye size={16} />
                  </a>
                  <button 
                    className="action-icon-btn text-primary" 
                    onClick={() => openEditor(blog)} 
                    title="Edit"
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--admin-border)' }}
                  >
                    <Edit3 size={16} />
                  </button>
                  <button 
                    className="action-icon-btn text-danger" 
                    onClick={() => deleteBlog(blog.id)} 
                    title="Delete"
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid var(--admin-border)' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlogSettings;
