import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Plus, Trash2, Edit3, X } from 'lucide-react';

const AdminBlogSettings = () => {
  const [blogs, setBlogs] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Editor State
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('aevora_blogs');
    if (saved) {
      try {
        setBlogs(JSON.parse(saved));
      } catch (e) {
        console.error("Could not parse blogs", e);
      }
    } else {
      // Default dummy blog
      const defaultBlog = [{
        id: Date.now().toString(),
        slug: "the-future-of-skincare",
        title: "The Future of Advanced Skincare",
        image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
        excerpt: "Discover the latest breakthrough technologies and treatments that are revolutionizing the way we care for our skin.",
        content: "Skincare has evolved dramatically over the last decade. With the introduction of advanced laser therapies, stem cell treatments, and personalized cellular medicine, achieving flawless skin is more possible than ever before.\n\nAt Aevora, we pride ourselves on staying at the forefront of these medical advancements...",
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      }];
      setBlogs(defaultBlog);
      localStorage.setItem('aevora_blogs', JSON.stringify(defaultBlog));
    }
  }, []);

  const openEditor = (blog = null) => {
    if (blog) {
      setCurrentBlog({ ...blog });
    } else {
      setCurrentBlog({
        id: Date.now().toString(),
        slug: "",
        title: "",
        image: "",
        excerpt: "",
        content: "",
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
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
      if (name === 'title' && !prev.id.includes('-')) {
        // Auto generate slug for new posts if not manually touched much
        updated.slug = generateSlug(value);
      }
      return updated;
    });
  };

  const saveCurrentBlog = () => {
    let updatedBlogs = [...blogs];
    const existingIndex = updatedBlogs.findIndex(b => b.id === currentBlog.id);
    
    if (existingIndex >= 0) {
      updatedBlogs[existingIndex] = currentBlog;
    } else {
      updatedBlogs.unshift(currentBlog); // Add new blog to top
    }

    setBlogs(updatedBlogs);
    persistBlogs(updatedBlogs);
    closeEditor();
  };

  const deleteBlog = (id) => {
    if(window.confirm("Are you sure you want to delete this blog post?")) {
      const updatedBlogs = blogs.filter(b => b.id !== id);
      setBlogs(updatedBlogs);
      persistBlogs(updatedBlogs);
    }
  };

  const persistBlogs = (data) => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('aevora_blogs', JSON.stringify(data));
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 500);
  };

  if (isEditing && currentBlog) {
    return (
      <div className="admin-settings-container">
        <div className="settings-header">
          <div>
            <h1 className="settings-title">{blogs.find(b => b.id === currentBlog.id) ? 'Edit Blog Post' : 'Add New Blog Post'}</h1>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn-save-settings" style={{ background: '#64748b' }} onClick={closeEditor}>
              <X size={18} /> Cancel
            </button>
            <button className="btn-save-settings" onClick={saveCurrentBlog}>
              <Save size={18} /> Save Post
            </button>
          </div>
        </div>

        <div className="settings-card">
          <div className="form-group">
            <label>Blog Title *</label>
            <input type="text" name="title" value={currentBlog.title} onChange={handleBlogChange} placeholder="e.g. 5 Skincare Tips for Winter" required />
          </div>
          <div className="form-group-row">
            <div className="form-group">
              <label>URL Slug (Auto-generated)</label>
              <input type="text" name="slug" value={currentBlog.slug} onChange={handleBlogChange} placeholder="e.g. 5-skincare-tips-winter" />
            </div>
            <div className="form-group">
              <label>Publish Date</label>
              <input type="text" name="date" value={currentBlog.date} onChange={handleBlogChange} />
            </div>
          </div>
          <div className="form-group">
            <label>Cover Image URL *</label>
            <input type="text" name="image" value={currentBlog.image} onChange={handleBlogChange} placeholder="https://..." />
          </div>
          <div className="form-group">
            <label>Short Excerpt (Shows on listing page) *</label>
            <textarea name="excerpt" rows="3" value={currentBlog.excerpt} onChange={handleBlogChange}></textarea>
          </div>
          <div className="form-group">
            <label>Full Content (You can use basic HTML like &lt;b&gt;, &lt;br&gt;, or just text) *</label>
            <textarea name="content" rows="15" value={currentBlog.content} onChange={handleBlogChange} style={{ fontFamily: 'monospace' }}></textarea>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-settings-container">
      <div className="settings-header">
        <div>
          <h1 className="settings-title">Blog Manager</h1>
          <p className="settings-subtitle">Create and manage your articles.</p>
        </div>
        <button className="btn-add-item" style={{ margin: 0, padding: '12px 24px', fontSize: '1rem' }} onClick={() => openEditor()}>
          <Plus size={20} style={{ marginRight: '8px' }} /> Write New Post
        </button>
      </div>

      {showSuccess && (
        <div className="settings-success-banner">
          <CheckCircle2 size={20} />
          <span>Blog updated successfully!</span>
        </div>
      )}

      <div className="settings-sections">
        <div className="settings-card">
          <h3 className="settings-card-title">All Published Blogs</h3>
          
          {blogs.length === 0 ? (
            <p style={{ color: '#64748b' }}>No blogs found. Click "Write New Post" to create one.</p>
          ) : (
            <div className="gallery-admin-list" style={{ gridTemplateColumns: '1fr' }}>
              {blogs.map((blog) => (
                <div key={blog.id} className="admin-list-item-card" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <img src={blog.image || 'https://via.placeholder.com/150'} alt="thumbnail" style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: '#0d382c' }}>{blog.title}</h4>
                    <p style={{ margin: '0 0 5px 0', fontSize: '0.85rem', color: '#64748b' }}>{blog.date} | /{blog.slug}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn-icon-primary" onClick={() => openEditor(blog)} title="Edit">
                      <Edit3 size={18} />
                    </button>
                    <button className="btn-icon-danger" onClick={() => deleteBlog(blog.id)} title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBlogSettings;
