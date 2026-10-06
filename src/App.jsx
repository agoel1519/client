import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminPagesList from './components/admin/AdminPagesList';
import AdminPageBuilder from './components/admin/AdminPageBuilder';
import AdminClinicSettings from './components/admin/AdminClinicSettings';
import AdminAboutSettings from './components/admin/AdminAboutSettings';
import AdminExpertsSettings from './components/admin/AdminExpertsSettings';
import AdminPressSettings from './components/admin/AdminPressSettings';
import AdminBlogSettings from './components/admin/AdminBlogSettings';
import AdminHomeSettings from './components/admin/AdminHomeSettings';
import DynamicTreatmentPage from './components/pages/DynamicTreatmentPage';
import ContactUs from './components/pages/ContactUs';
import AboutUs from './components/pages/AboutUs';
import Experts from './components/pages/Experts';
import Press from './components/pages/Press';
import Blog from './components/pages/Blog';
import BlogPost from './components/pages/BlogPost';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/experts" element={<Experts />} />
        <Route path="/press" element={<Press />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/treatments" element={<DynamicTreatmentPage />} />
        <Route path="/treatments/:slug" element={<DynamicTreatmentPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="pages" element={<AdminPagesList />} />
          <Route path="pages/create" element={<AdminPageBuilder />} />
          <Route path="pages/edit/:slug" element={<AdminPageBuilder />} />
          <Route path="settings" element={<AdminClinicSettings />} />
          <Route path="about-settings" element={<AdminAboutSettings />} />
          <Route path="experts-settings" element={<AdminExpertsSettings />} />
          <Route path="press-settings" element={<AdminPressSettings />} />
          <Route path="blog-settings" element={<AdminBlogSettings />} />
          <Route path="home-settings" element={<AdminHomeSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
