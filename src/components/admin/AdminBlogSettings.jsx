import React, { useState, useEffect, useRef } from 'react';
import { 
  Save, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Eye, 
  FileText, 
  Copy, 
  Search, 
  Clock, 
  User, 
  Tag, 
  ExternalLink, 
  Sparkles, 
  BookOpen, 
  Heading1, 
  Heading2, 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Image as ImageIcon,
  Check,
  ChevronRight,
  Globe,
  Link as LinkIcon,
  Underline as UnderlineIcon,
  Type,
  Palette,
  Highlighter
} from 'lucide-react';
import { getDbSetting, saveDbSetting } from '../../api/mongoApi';
import ImageUploader from './ImageUploader';
import './AdminDashboard.css';
import './AdminBlogSettings.css';

export const initialBlogPosts = [
  {
    id: "1",
    slug: "the-future-of-skincare",
    title: "The Future of Advanced Skincare & Cellular Longevity",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Discover the latest breakthrough technologies and treatments that are revolutionizing aesthetic dermatology and cellular renewal.",
    content: `<h2>The Renaissance of Regenerative Aesthetics</h2>
<p>Skincare has evolved dramatically beyond surface-level topicals. With the introduction of advanced laser therapies, stem cell biostimulators, and personalized cellular medicine, achieving long-term dermatological vitality is more scientifically grounded than ever before.</p>

<blockquote class="blog-callout">
"True aesthetic excellence does not disguise aging; it restores the intrinsic cellular mechanisms that define youthful skin architecture."
</blockquote>

<h3>1. US FDA-Cleared High-Frequency Energy Systems</h3>
<p>Modern non-surgical treatments like EXION Fractional RF and Ultherapy Prime stimulate endogenous neo-collagenesis deep within the SMAS and subdermal layers without epidermal trauma or social downtime.</p>

<h3>2. Cellular Bio-Infusions & Peptides</h3>
<p>Topical peptides paired with transdermal electroporation deliver active coenzymes directly to cellular mitochondria, amplifying cellular respiration and DNA repair capacity.</p>

<h3>3. Clinical Takeaways for Patients</h3>
<ul>
  <li>Preventative aesthetics preserve facial contours before structural laxity occurs.</li>
  <li>Custom protocols supervised by medical doctors ensure undetectable, natural refinement.</li>
  <li>Long-term results are sustained by combining in-clinic clinical therapies with targeted medical-grade homecare regimens.</li>
</ul>`,
    date: "October 18, 2026",
    author: "Dr. Meghna Mour",
    authorRole: "Founder & Chief Aesthetic Dermatologist",
    category: "Skin & Longevity",
    readTime: "5 min read",
    status: "Published",
    featured: true,
    metaTitle: "The Future of Advanced Skincare & Cellular Longevity | Aevora Journal",
    metaDescription: "Explore breakthrough regenerative aesthetic dermatology, cellular renewal, and collagen induction therapies.",
    tags: "Skincare, Longevity, Collagen, Regenerative Medicine"
  },
  {
    id: "2",
    slug: "demystifying-nad-plus-infusions",
    title: "Demystifying NAD+ Cellular Longevity Infusions",
    image: "/celebrities/celeb-1.jpg",
    excerpt: "How coenzyme therapy works at the mitochondrial level to rejuvenate energy, cognition, and dermatological vitality.",
    content: `<h2>Powering the Cellular Engine</h2>
<p>Nicotinamide Adenine Dinucleotide (NAD+) is an essential coenzyme found in every living cell. It powers mitochondrial respiration, fuels DNA repair enzymes like PARPs and Sirtuins, and regulates systemic circadian vitality.</p>

<h3>Why NAD+ Declines With Age</h3>
<p>As we navigate chronological aging and environmental stress, cellular NAD+ levels decrease by up to 50% between youth and middle age. This deficit manifests as chronic metabolic sluggishness, decreased tissue healing velocity, and loss of skin elasticity.</p>

<blockquote class="blog-callout">
"Intravenous NAD+ replenishment at Aevora restores systemic cellular energy balance directly, bypassing gastrointestinal breakdown for maximal bioavailability."
</blockquote>

<h3>Core Clinical Benefits</h3>
<ul>
  <li>Enhanced cognitive clarity and sustained neuro-vitality</li>
  <li>Accelerated cellular recovery following strenuous physical exertion or clinical procedures</li>
  <li>Amplified systemic antioxidant protection and mitochondrial efficiency</li>
</ul>`,
    date: "October 10, 2026",
    author: "Longevity Clinical Team",
    authorRole: "Integrative Wellness Specialists",
    category: "Wellness & Longevity",
    readTime: "4 min read",
    status: "Published",
    featured: false,
    metaTitle: "Demystifying NAD+ Cellular Longevity Infusions | Aevora Journal",
    metaDescription: "Discover how intravenous NAD+ coenzyme therapy revitalizes mitochondrial vitality, energy, and skin health.",
    tags: "NAD+, Cellular Health, Wellness, Anti-Aging"
  },
  {
    id: "3",
    slug: "science-of-non-surgical-lifting",
    title: "The Science of Non-Surgical Lifting: Ultherapy & EXION",
    image: "/celebrities/celeb-3.jpg",
    excerpt: "How micro-focused ultrasound and targeted radiofrequency work synergistically to lift and tighten facial contours with zero downtime.",
    content: `<h2>Redefining Facial Contouring Without Surgery</h2>
<p>For individuals seeking lifted brows, refined jawlines, and tight submental contouring without surgical excision, contemporary energy-based devices represent a transformative clinical leap.</p>

<h3>Targeting the SMAS Layer with Ultherapy Prime</h3>
<p>Ultherapy utilizes patented real-time visualization ultrasound to pinpoint thermal coagulation zones precisely at 1.5mm, 3.0mm, and 4.5mm depths. This tightens the superficial musculoaponeurotic system (SMAS)—the exact tissue plane tightened during a surgical facelift.</p>

<h3>Dermal Volumization with EXION RF</h3>
<p>EXION combines monopolar radiofrequency with targeted ultrasound to stimulate natural hyaluronic acid synthesis and elastin formation, plumping fine wrinkles and restoring dermal thickness.</p>

<blockquote class="blog-callout">
"By harmonizing SMAS-level tightening with dermal collagen induction, patients experience progressive, natural rejuvenation that develops over 2 to 6 months."
</blockquote>`,
    date: "October 05, 2026",
    author: "Dr. Meghna Mour",
    authorRole: "Founder & Chief Aesthetic Dermatologist",
    category: "Aesthetics & Anti-Aging",
    readTime: "6 min read",
    status: "Published",
    featured: true,
    metaTitle: "Non-Surgical Facial Lifting: Ultherapy & EXION | Aevora Journal",
    metaDescription: "Learn how ultrasound and RF technologies lift facial contours naturally without surgery or downtime.",
    tags: "Ultherapy, EXION, Facelift, Non-Surgical, Aesthetics"
  }
];

const PRESET_CATEGORIES = [
  "Skin & Longevity",
  "Aesthetics & Anti-Aging",
  "Laser Treatments",
  "Hair Restoration",
  "Body Contouring",
  "Wellness & Cellular Health"
];

const AdminBlogSettings = () => {
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'editor' | 'hero'
  const [heroSettings, setHeroSettings] = useState({
    title: "Aevora Journal & Insights",
    subtitle: "Clinical dermatological science, longevity breakthroughs, and modern aesthetic elegance",
    breadcrumb: "HOME / BLOG"
  });
  const [blogs, setBlogs] = useState(initialBlogPosts);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Editor State
  const [currentBlog, setCurrentBlog] = useState(null);
  const [showLivePreview, setShowLivePreview] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const saved = await getDbSetting('blog_settings');
        if (saved) {
          if (Array.isArray(saved) && saved.length > 0) {
            setBlogs(saved);
          } else if (saved.posts && Array.isArray(saved.posts) && saved.posts.length > 0) {
            setBlogs(saved.posts);
            if (saved.hero) setHeroSettings(saved.hero);
          } else {
            setBlogs(initialBlogPosts);
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
          setBlogs(initialBlogPosts);
        }
      } catch (err) {
        console.error("Could not load blogs", err);
        setBlogs(initialBlogPosts);
      }
    };

    fetchBlogs();
  }, []);

  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const generateSlug = (title) => {
    return (title || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const openNewArticle = () => {
    setCurrentBlog({
      id: Date.now().toString(),
      slug: "",
      title: "",
      image: "/celebrities/celeb-3.jpg",
      excerpt: "",
      content: "<h2>Article Overview</h2>\n<p>Write your detailed article body here...</p>",
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      author: "Dr. Meghna Mour",
      authorRole: "Founder & Chief Aesthetic Dermatologist",
      category: "Skin & Longevity",
      readTime: "4 min read",
      status: "Published",
      featured: false,
      metaTitle: "",
      metaDescription: "",
      tags: "Aevora, Aesthetics, Dermatology"
    });
    setActiveTab('editor');
    setShowLivePreview(false);
  };

  const editArticle = (blog) => {
    setCurrentBlog({ ...blog });
    setActiveTab('editor');
    setShowLivePreview(false);
  };

  const duplicateArticle = (blog) => {
    const cloned = {
      ...blog,
      id: Date.now().toString(),
      title: `${blog.title} (Copy)`,
      slug: `${blog.slug}-copy-${Math.floor(Math.random() * 1000)}`,
      status: "Draft"
    };
    const updated = [cloned, ...blogs];
    setBlogs(updated);
    persistAll(updated, heroSettings);
    showToast("Article duplicated as draft!");
  };

  const handleBlogChange = (field, value) => {
    setCurrentBlog(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'title' && (!prev.slug || prev.slug === generateSlug(prev.title))) {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
  };

  const textareaRef = useRef(null);

  const wrapSelection = (prefix, suffix, defaultText = "Text") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentContent = currentBlog?.content || "";

    const hasSelection = start !== end;
    const selectedText = hasSelection ? currentContent.substring(start, end) : defaultText;

    const replacement = `${prefix}${selectedText}${suffix}`;
    const newContent = currentContent.substring(0, start) + replacement + currentContent.substring(end);

    handleBlogChange('content', newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 10);
  };

  const insertLink = () => {
    const textarea = textareaRef.current;
    const start = textarea ? textarea.selectionStart : 0;
    const end = textarea ? textarea.selectionEnd : 0;
    const currentContent = currentBlog?.content || "";
    const selectedText = (textarea && start !== end) ? currentContent.substring(start, end) : "";

    const url = window.prompt("Enter Link URL (e.g. https://google.com or /contact or /treatments):", "https://");
    if (!url || !url.trim()) return;

    let linkText = selectedText;
    if (!linkText) {
      linkText = window.prompt("Enter Clickable Text for this link:", "Click here") || url;
    }

    const isExternal = url.startsWith('http');
    const linkHtml = `<a href="${url.trim()}" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}>${linkText}</a>`;

    if (textarea && start !== end) {
      const newContent = currentContent.substring(0, start) + linkHtml + currentContent.substring(end);
      handleBlogChange('content', newContent);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start, start + linkHtml.length);
      }, 10);
    } else {
      insertSnippet(linkHtml);
    }
  };

  const applyFontSize = (sizePx) => {
    if (!sizePx) return;
    wrapSelection(`<span style="font-size: ${sizePx}; display: inline-block;">`, `</span>`, "Custom size text");
  };

  const applyTextColor = (colorHex) => {
    if (!colorHex) return;
    wrapSelection(`<span style="color: ${colorHex};">`, `</span>`, "Colored text");
  };

  const applyHighlight = (bgHex) => {
    wrapSelection(`<mark style="background-color: ${bgHex}; padding: 2px 6px; border-radius: 4px;">`, `</mark>`, "Highlighted text");
  };

  const insertImageTag = () => {
    const url = window.prompt("Enter Image URL (e.g. /celebrities/celeb-3.jpg or upload URL):", "/celebrities/celeb-3.jpg");
    if (!url || !url.trim()) return;
    const alt = window.prompt("Enter Image Description (Alt text):", "Clinical aesthetic treatment") || "Clinical treatment";
    const imgHtml = `\n<img src="${url.trim()}" alt="${alt}" style="width: 100%; max-height: 480px; object-fit: cover; border-radius: 12px; margin: 24px 0;" />\n`;
    insertSnippet(imgHtml);
  };

  const insertSnippet = (snippet) => {
    if (!currentBlog) return;
    const current = currentBlog.content || "";
    handleBlogChange('content', current + "\n\n" + snippet);
  };

  const persistAll = async (updatedBlogs, updatedHero = heroSettings) => {
    setIsSaving(true);
    try {
      const payload = {
        hero: updatedHero,
        posts: updatedBlogs
      };
      await saveDbSetting('blog_settings', payload);
      localStorage.setItem('aevora_blogs', JSON.stringify(updatedBlogs));
      window.dispatchEvent(new Event('blogSettingsUpdated'));
      showToast("All blog settings & posts saved successfully!");
    } catch (err) {
      console.error(err);
      showToast("Error saving blogs.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const saveCurrentArticle = async (forcedStatus) => {
    if (!currentBlog.title.trim()) {
      alert("Please provide an article title.");
      return;
    }

    const slugToUse = currentBlog.slug ? currentBlog.slug : generateSlug(currentBlog.title);
    const blogToSave = { 
      ...currentBlog, 
      slug: slugToUse,
      status: forcedStatus || currentBlog.status || 'Published',
      metaTitle: currentBlog.metaTitle || `${currentBlog.title} | Aevora Journal`,
      metaDescription: currentBlog.metaDescription || currentBlog.excerpt
    };

    let updatedBlogs = [...blogs];
    const existingIndex = updatedBlogs.findIndex(b => b.id === blogToSave.id);

    if (existingIndex >= 0) {
      updatedBlogs[existingIndex] = blogToSave;
    } else {
      updatedBlogs.unshift(blogToSave);
    }

    setBlogs(updatedBlogs);
    await persistAll(updatedBlogs, heroSettings);
    setActiveTab('list');
    setCurrentBlog(null);
  };

  const deleteArticle = async (id) => {
    if (window.confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
      const updated = blogs.filter(b => b.id !== id);
      setBlogs(updated);
      await persistAll(updated, heroSettings);
      showToast("Article deleted successfully.");
    }
  };

  // Filtered list
  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = 
      (b.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.category || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.author || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "All" || b.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...Array.from(new Set(blogs.map(b => b.category).filter(Boolean)))];

  return (
    <div className="blog-admin-container">
      {/* Toast Notification */}
      {notification && (
        <div className={`premium-toast ${notification.type}`} style={{ zIndex: 9999 }}>
          {notification.type === 'error' ? <AlertTriangle size={18} /> : <CheckCircle2 size={18} />}
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="page-manager-header" style={{ marginBottom: '20px' }}>
        <div className="header-titles">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#0d382c', color: '#fff', padding: '8px', borderRadius: '8px', display: 'flex' }}>
              <BookOpen size={22} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#0d382c' }}>Blog &amp; Journal CMS</h1>
              <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                Create, edit, and publish clinical articles, press features, and patient guides.
              </p>
            </div>
          </div>
        </div>

        <div className="header-actions" style={{ display: 'flex', gap: '12px' }}>
          <a 
            href="/blog" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-secondary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Globe size={16} /> View Public Blog
          </a>
          <button 
            className="btn-primary" 
            onClick={openNewArticle}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={18} /> Write New Article
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="blog-admin-tabs">
        <button 
          className={`blog-tab-btn ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          <FileText size={17} /> All Articles
          <span className="blog-tab-count">{blogs.length}</span>
        </button>

        {currentBlog && (
          <button 
            className={`blog-tab-btn ${activeTab === 'editor' ? 'active' : ''}`}
            onClick={() => setActiveTab('editor')}
          >
            <Edit3 size={17} /> {currentBlog.title ? `Editing: ${currentBlog.title.slice(0, 24)}...` : 'New Article Editor'}
          </button>
        )}

        <button 
          className={`blog-tab-btn ${activeTab === 'hero' ? 'active' : ''}`}
          onClick={() => setActiveTab('hero')}
        >
          <Sparkles size={17} /> Journal Page Banner Settings
        </button>
      </div>

      {/* -------------------------------------------------------------
          TAB 1: ALL ARTICLES LIST
          ------------------------------------------------------------- */}
      {activeTab === 'list' && (
        <div>
          {/* Search and Filters */}
          <div className="blog-admin-filter-bar">
            <div className="blog-search-wrapper">
              <Search size={18} className="blog-search-icon" />
              <input 
                type="text" 
                className="blog-search-input" 
                placeholder="Search articles by title, category, author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="blog-category-pills">
              {categories.map(cat => (
                <button 
                  key={cat}
                  className={`blog-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          {filteredBlogs.length === 0 ? (
            <div className="premium-card" style={{ padding: '60px 20px', textAlign: 'center' }}>
              <FileText size={48} style={{ opacity: 0.3, marginBottom: '14px', color: '#0d382c' }} />
              <h3 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>No matching articles found</h3>
              <p style={{ color: '#64748b', marginBottom: '20px' }}>
                Try adjusting your search criteria or create a new blog article now.
              </p>
              <button className="btn-primary" onClick={openNewArticle}>
                <Plus size={16} /> Write New Article
              </button>
            </div>
          ) : (
            <div className="blog-admin-grid">
              {filteredBlogs.map((blog) => (
                <div className="blog-admin-card" key={blog.id}>
                  <div className="blog-card-thumb-wrapper">
                    <img 
                      src={blog.image || '/celebrities/celeb-3.jpg'} 
                      alt={blog.title} 
                      className="blog-card-thumb" 
                    />
                    <span className={`blog-badge-status ${(blog.status || 'Published').toLowerCase()}`}>
                      {blog.status || 'Published'}
                    </span>
                    {blog.featured && (
                      <span className="blog-badge-featured">
                        <Sparkles size={12} /> Featured
                      </span>
                    )}
                  </div>

                  <div className="blog-card-body">
                    <div className="blog-card-category">{blog.category || 'General'}</div>
                    <h3 className="blog-card-title-text">{blog.title}</h3>
                    <div className="blog-card-slug-text">
                      <span style={{ color: '#94a3b8' }}>/blog/</span>{blog.slug}
                    </div>
                    <p className="blog-card-excerpt-text">{blog.excerpt}</p>

                    <div className="blog-card-meta">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <User size={13} /> {blog.author || 'Dr. Meghna Mour'}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Clock size={13} /> {blog.readTime || '5 min read'}
                      </span>
                    </div>

                    <div className="blog-card-actions-row">
                      <button 
                        className="blog-btn-action edit"
                        onClick={() => editArticle(blog)}
                        title="Edit Article"
                      >
                        <Edit3 size={15} /> Edit
                      </button>
                      <a 
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="blog-btn-action"
                        title="View Live on Website"
                      >
                        <ExternalLink size={15} /> Live
                      </a>
                      <button 
                        className="blog-btn-action"
                        onClick={() => duplicateArticle(blog)}
                        title="Duplicate Post"
                      >
                        <Copy size={15} />
                      </button>
                      <button 
                        className="blog-btn-action delete"
                        onClick={() => deleteArticle(blog.id)}
                        title="Delete Article"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 2: FULL ARTICLE EDITOR COMPOSER
          ------------------------------------------------------------- */}
      {activeTab === 'editor' && currentBlog && (
        <div>
          {/* Action Header */}
          <div className="premium-card" style={{ padding: '16px 24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', background: '#0d382c', color: '#fff' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#fff' }}>
                {blogs.some(b => b.id === currentBlog.id) ? 'Edit Blog Article' : 'Write New Article'}
              </h2>
              <span style={{ fontSize: '0.82rem', color: '#c59d5f' }}>
                Auto-saves to database &amp; publishes instantly to /blog/{currentBlog.slug || 'url-slug'}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button 
                type="button"
                className="btn-secondary" 
                onClick={() => setShowLivePreview(!showLivePreview)}
                style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' }}
              >
                <Eye size={16} /> {showLivePreview ? 'Hide Preview' : 'Live Preview'}
              </button>
              <button 
                type="button"
                className="btn-secondary" 
                onClick={() => setActiveTab('list')}
                style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)' }}
              >
                <X size={16} /> Cancel
              </button>
              <button 
                type="button"
                className="btn-secondary" 
                onClick={() => saveCurrentArticle('Draft')}
                disabled={isSaving}
                style={{ background: '#f59e0b', color: '#fff', border: 'none' }}
              >
                Save as Draft
              </button>
              <button 
                type="button"
                className="btn-primary" 
                onClick={() => saveCurrentArticle('Published')}
                disabled={isSaving}
                style={{ background: '#c59d5f', color: '#0d382c', fontWeight: 700, border: 'none' }}
              >
                <Check size={16} /> {isSaving ? 'Publishing...' : 'Publish Article'}
              </button>
            </div>
          </div>

          <div className="blog-editor-grid">
            {/* Left Main Column: Title, Slug, Excerpt, Content */}
            <div>
              {/* Title & Slug */}
              <div className="blog-editor-card">
                <div className="form-group mb-4">
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '8px', fontSize: '1rem', color: '#0f172a' }}>
                    Article Title *
                  </label>
                  <input 
                    type="text" 
                    value={currentBlog.title} 
                    onChange={(e) => handleBlogChange('title', e.target.value)} 
                    placeholder="e.g. The Science of Non-Surgical Facial Contouring" 
                    className="form-control"
                    style={{ width: '100%', padding: '14px', fontSize: '1.15rem', fontWeight: 600, borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
                    required 
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.9rem', color: '#475569' }}>
                    URL Slug (Perm-link)
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '0 12px' }}>
                    <span style={{ color: '#94a3b8', fontSize: '0.88rem', fontFamily: 'monospace' }}>
                      aevora.com/blog/
                    </span>
                    <input 
                      type="text" 
                      value={currentBlog.slug} 
                      onChange={(e) => handleBlogChange('slug', generateSlug(e.target.value))} 
                      className="form-control"
                      placeholder="article-url-slug" 
                      style={{ flex: 1, padding: '10px 8px', border: 'none', background: 'transparent', fontFamily: 'monospace', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>
              </div>

              {/* Excerpt */}
              <div className="blog-editor-card">
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '6px', fontSize: '0.95rem', color: '#0f172a' }}>
                  Article Excerpt / Card Summary *
                </label>
                <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 10px 0' }}>
                  A compelling 2-3 sentence teaser displayed on blog cards, search engines, and social media shares.
                </p>
                <textarea 
                  rows="3" 
                  value={currentBlog.excerpt} 
                  onChange={(e) => handleBlogChange('excerpt', e.target.value)}
                  className="form-control"
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '0.95rem', lineHeight: 1.5 }}
                  placeholder="Short introductory overview..."
                />
              </div>

              {/* Body Content Editor with Quick Toolbar */}
              <div className="blog-editor-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px 12px', borderBottom: '1px solid #e2e8f0' }}>
                  <label style={{ display: 'block', fontWeight: 700, margin: 0, fontSize: '1rem', color: '#0f172a' }}>
                    Article Body Content *
                  </label>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '4px 0 0 0' }}>
                    Write your article in structured paragraphs or HTML. Use the quick buttons below to insert clinical callouts, headings, and lists.
                  </p>
                </div>

                {/* Enhanced Toolbar */}
                <div className="blog-toolbar">
                  {/* Row 1: Font Size & Headings */}
                  <div className="blog-toolbar-row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Type size={15} style={{ color: '#0d382c' }} />
                      <select 
                        className="blog-tool-select"
                        defaultValue=""
                        onChange={(e) => {
                          if (e.target.value) {
                            applyFontSize(e.target.value);
                            e.target.value = "";
                          }
                        }}
                        title="Change Font Size of selected text"
                      >
                        <option value="" disabled>Font Size (बड़ा / छोटा) ▾</option>
                        <option value="13px">Small (13px)</option>
                        <option value="16px">Normal Body (16px)</option>
                        <option value="18px">Medium Large (18px)</option>
                        <option value="20px">Large (20px)</option>
                        <option value="24px">Extra Large (24px)</option>
                        <option value="28px">Huge Title (28px)</option>
                        <option value="34px">Display Title (34px)</option>
                      </select>
                    </div>

                    <button 
                      type="button" 
                      className="blog-tool-btn"
                      onClick={() => applyFontSize('22px')}
                      title="Make selected text Larger (22px)"
                    >
                      A+ (बड़ा करें)
                    </button>
                    <button 
                      type="button" 
                      className="blog-tool-btn"
                      onClick={() => applyFontSize('14px')}
                      title="Make selected text Smaller (14px)"
                    >
                      A- (छोटा करें)
                    </button>

                    <div className="blog-toolbar-divider" />

                    <button 
                      type="button" 
                      className="blog-tool-btn"
                      onClick={() => wrapSelection('<h1>', '</h1>', 'Heading 1 Title')}
                      title="Heading 1"
                    >
                      H1
                    </button>
                    <button 
                      type="button" 
                      className="blog-tool-btn"
                      onClick={() => wrapSelection('<h2>', '</h2>', 'Subheading Title')}
                      title="Heading 2"
                    >
                      H2
                    </button>
                    <button 
                      type="button" 
                      className="blog-tool-btn"
                      onClick={() => wrapSelection('<h3>', '</h3>', 'Subsection Title')}
                      title="Heading 3"
                    >
                      H3
                    </button>
                    <button 
                      type="button" 
                      className="blog-tool-btn"
                      onClick={() => wrapSelection('<h4>', '</h4>', 'Minor Heading')}
                      title="Heading 4"
                    >
                      H4
                    </button>
                    <button 
                      type="button" 
                      className="blog-tool-btn"
                      onClick={() => wrapSelection('<p>', '</p>', 'Paragraph text...')}
                      title="Wrap in Paragraph"
                    >
                      P
                    </button>
                  </div>

                  {/* Row 2: Formatting, Links, Colors & Media */}
                  <div className="blog-toolbar-row">
                    <button 
                      type="button" 
                      className="blog-tool-btn"
                      onClick={() => wrapSelection('<b>', '</b>', 'Bold text')}
                      title="Bold"
                    >
                      <Bold size={14} /> Bold
                    </button>
                    <button 
                      type="button" 
                      className="blog-tool-btn"
                      onClick={() => wrapSelection('<i>', '</i>', 'Italic text')}
                      title="Italic"
                    >
                      <Italic size={14} /> Italic
                    </button>
                    <button 
                      type="button" 
                      className="blog-tool-btn"
                      onClick={() => wrapSelection('<u>', '</u>', 'Underlined text')}
                      title="Underline"
                    >
                      <UnderlineIcon size={14} /> Underline
                    </button>

                    <div className="blog-toolbar-divider" />

                    {/* ADD LINK BUTTON */}
                    <button 
                      type="button" 
                      className="blog-tool-btn link-tool"
                      onClick={insertLink}
                      title="Add Clickable Link to selected text or insert a new link"
                    >
                      <LinkIcon size={14} /> 🔗 Add Link (लिंक जोड़ें)
                    </button>

                    <div className="blog-toolbar-divider" />

                    {/* Text Color Selector */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Palette size={15} style={{ color: '#c59d5f' }} />
                      <select 
                        className="blog-tool-select"
                        defaultValue=""
                        onChange={(e) => {
                          if (e.target.value) {
                            applyTextColor(e.target.value);
                            e.target.value = "";
                          }
                        }}
                        title="Text Color of selected text"
                      >
                        <option value="" disabled>Color ▾</option>
                        <option value="#0d382c">Emerald Green</option>
                        <option value="#c59d5f">Luxury Gold</option>
                        <option value="#1e293b">Charcoal Slate</option>
                        <option value="#dc2626">Ruby Red</option>
                        <option value="#2563eb">Royal Blue</option>
                      </select>
                    </div>

                    <button 
                      type="button" 
                      className="blog-tool-btn"
                      onClick={() => applyHighlight('#fef3c7')}
                      title="Highlight text in soft gold"
                    >
                      <Highlighter size={14} /> Highlight
                    </button>

                    <div className="blog-toolbar-divider" />

                    <button 
                      type="button" 
                      className="blog-tool-btn"
                      onClick={() => wrapSelection('<ul>\n  <li>', '</li>\n</ul>', 'List item')}
                      title="Bullet List"
                    >
                      <List size={14} /> Bullet
                    </button>
                    <button 
                      type="button" 
                      className="blog-tool-btn"
                      onClick={() => wrapSelection('<ol>\n  <li>', '</li>\n</ol>', 'Step item')}
                      title="Numbered List"
                    >
                      <ListOrdered size={14} /> Numbered
                    </button>
                    <button 
                      type="button" 
                      className="blog-tool-btn"
                      onClick={() => wrapSelection('<blockquote class="blog-callout">\n"', '"\n</blockquote>', 'Inspirational takeaway quote')}
                      title="Callout Quote Box"
                    >
                      <Quote size={14} /> Quote
                    </button>

                    <div className="blog-toolbar-divider" />

                    <button 
                      type="button" 
                      className="blog-tool-btn"
                      onClick={insertImageTag}
                      title="Insert image inside body"
                    >
                      <ImageIcon size={14} /> Insert Image
                    </button>
                    <button 
                      type="button" 
                      className="blog-tool-btn"
                      onClick={() => insertSnippet('<hr />')}
                      title="Divider Line"
                    >
                      Divider
                    </button>
                  </div>
                </div>

                {/* Textarea */}
                <textarea 
                  ref={textareaRef}
                  rows="18" 
                  value={currentBlog.content} 
                  onChange={(e) => handleBlogChange('content', e.target.value)} 
                  className="blog-content-textarea"
                  placeholder="Type or paste your clinical article content here..."
                />
              </div>

              {/* Real-time Live Preview (if toggled) */}
              {showLivePreview && (
                <div className="blog-live-preview-box">
                  <div className="blog-preview-header">
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#c59d5f', letterSpacing: '1px' }}>
                      {currentBlog.category || 'Category'} • {currentBlog.readTime || '5 min read'}
                    </span>
                    <h1 style={{ fontSize: '2.2rem', fontFamily: 'serif', color: '#0d382c', margin: '10px 0' }}>
                      {currentBlog.title || 'Untitled Article'}
                    </h1>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      By {currentBlog.author || 'Dr. Meghna Mour'} • {currentBlog.date}
                    </div>
                  </div>

                  <div 
                    className="blog-post-body"
                    dangerouslySetInnerHTML={{ 
                      __html: (currentBlog.content || '').replace(/\n/g, '<br />') 
                    }}
                  />
                </div>
              )}
            </div>

            {/* Right Sidebar: Cover Image, Publishing Settings, Author, SEO */}
            <div>
              {/* Cover Image */}
              <div className="blog-editor-card">
                <div className="blog-editor-card-title">
                  <ImageIcon size={18} /> Cover Image
                </div>
                <ImageUploader 
                  currentUrl={currentBlog.image} 
                  onSelect={(url) => handleBlogChange('image', url)} 
                  label="Select or Upload Article Photo" 
                />

                <div style={{ marginTop: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>
                    Quick Aesthetic Image Presets:
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      type="button"
                      className="blog-preset-cat-btn"
                      onClick={() => handleBlogChange('image', '/celebrities/celeb-3.jpg')}
                    >
                      Clinic Treatment Room
                    </button>
                    <button 
                      type="button"
                      className="blog-preset-cat-btn"
                      onClick={() => handleBlogChange('image', 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80')}
                    >
                      Dermatology
                    </button>
                  </div>
                </div>
              </div>

              {/* Categorization & Status */}
              <div className="blog-editor-card">
                <div className="blog-editor-card-title">
                  <Tag size={18} /> Article Details
                </div>

                <div className="form-group mb-3">
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.88rem' }}>
                    Category
                  </label>
                  <input 
                    type="text" 
                    value={currentBlog.category || ''} 
                    onChange={(e) => handleBlogChange('category', e.target.value)} 
                    placeholder="e.g. Skin & Longevity"
                    className="form-control"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                  <div className="blog-preset-cats">
                    {PRESET_CATEGORIES.map(cat => (
                      <button 
                        key={cat}
                        type="button"
                        className="blog-preset-cat-btn"
                        onClick={() => handleBlogChange('category', cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.88rem' }}>
                    Publish Date
                  </label>
                  <input 
                    type="text" 
                    value={currentBlog.date || ''} 
                    onChange={(e) => handleBlogChange('date', e.target.value)} 
                    className="form-control"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div className="form-group mb-3">
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.88rem' }}>
                    Estimated Read Time
                  </label>
                  <input 
                    type="text" 
                    value={currentBlog.readTime || ''} 
                    onChange={(e) => handleBlogChange('readTime', e.target.value)} 
                    placeholder="e.g. 5 min read"
                    className="form-control"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div className="form-group mb-3">
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.88rem' }}>
                    Status
                  </label>
                  <select 
                    value={currentBlog.status || 'Published'}
                    onChange={(e) => handleBlogChange('status', e.target.value)}
                    className="form-control"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#fff' }}
                  >
                    <option value="Published">Published (Live)</option>
                    <option value="Draft">Draft (Internal Only)</option>
                  </select>
                </div>

                <div style={{ marginTop: '12px', padding: '10px 12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.88rem', margin: 0 }}>
                    <input 
                      type="checkbox" 
                      checked={!!currentBlog.featured} 
                      onChange={(e) => handleBlogChange('featured', e.target.checked)}
                      style={{ width: '16px', height: '16px', accentColor: '#0d382c' }}
                    />
                    Mark as Featured Post
                  </label>
                </div>
              </div>

              {/* Author Attribution */}
              <div className="blog-editor-card">
                <div className="blog-editor-card-title">
                  <User size={18} /> Author Attribution
                </div>

                <div className="form-group mb-3">
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.88rem' }}>
                    Author Name
                  </label>
                  <input 
                    type="text" 
                    value={currentBlog.author || ''} 
                    onChange={(e) => handleBlogChange('author', e.target.value)} 
                    placeholder="Dr. Meghna Mour"
                    className="form-control"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.88rem' }}>
                    Author Role / Designation
                  </label>
                  <input 
                    type="text" 
                    value={currentBlog.authorRole || ''} 
                    onChange={(e) => handleBlogChange('authorRole', e.target.value)} 
                    placeholder="Chief Aesthetic Dermatologist"
                    className="form-control"
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              {/* SEO & Meta Tags */}
              <div className="blog-editor-card">
                <div className="blog-editor-card-title">
                  <Globe size={18} /> SEO &amp; Meta Settings
                </div>

                <div className="form-group mb-3">
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.85rem' }}>
                    SEO Meta Title
                  </label>
                  <input 
                    type="text" 
                    value={currentBlog.metaTitle || ''} 
                    onChange={(e) => handleBlogChange('metaTitle', e.target.value)} 
                    placeholder="Custom Google title..."
                    className="form-control"
                    style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>

                <div className="form-group">
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.85rem' }}>
                    Tags / Keywords
                  </label>
                  <input 
                    type="text" 
                    value={currentBlog.tags || ''} 
                    onChange={(e) => handleBlogChange('tags', e.target.value)} 
                    placeholder="e.g. Skin, Longevity, Collagen"
                    className="form-control"
                    style={{ width: '100%', padding: '9px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              {/* Bottom Quick Save */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  type="button"
                  className="btn-primary" 
                  onClick={() => saveCurrentArticle('Published')}
                  disabled={isSaving}
                  style={{ flex: 1, padding: '12px', justifyContent: 'center' }}
                >
                  <Save size={16} /> Save &amp; Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 3: HERO BANNER SETTINGS
          ------------------------------------------------------------- */}
      {activeTab === 'hero' && (
        <div className="premium-card" style={{ padding: '28px', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0d382c', marginBottom: '8px' }}>
            Journal Page Hero Banner
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
            Configure the title, subtitle, and breadcrumb displayed on the top of the public <code>/blog</code> page.
          </p>

          <div className="form-group mb-4">
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Main Page Heading</label>
            <input 
              type="text" 
              value={heroSettings.title} 
              onChange={(e) => setHeroSettings(prev => ({ ...prev, title: e.target.value }))}
              className="form-control"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1', fontSize: '1.05rem' }}
            />
          </div>

          <div className="form-group mb-4">
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Page Subtitle</label>
            <input 
              type="text" 
              value={heroSettings.subtitle} 
              onChange={(e) => setHeroSettings(prev => ({ ...prev, subtitle: e.target.value }))}
              className="form-control"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
            />
          </div>

          <div className="form-group mb-4">
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Breadcrumb Label</label>
            <input 
              type="text" 
              value={heroSettings.breadcrumb} 
              onChange={(e) => setHeroSettings(prev => ({ ...prev, breadcrumb: e.target.value }))}
              className="form-control"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1.5px solid #cbd5e1' }}
            />
          </div>

          <button 
            type="button" 
            className="btn-primary" 
            onClick={() => persistAll(blogs, heroSettings)}
            disabled={isSaving}
            style={{ padding: '12px 24px' }}
          >
            <Save size={18} /> {isSaving ? 'Saving...' : 'Save Banner Settings'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminBlogSettings;
