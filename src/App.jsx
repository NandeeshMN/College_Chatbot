import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/admin/ProtectedRoute';
import WebsiteLayout from './components/layout/WebsiteLayout';
import Home from './pages/Home';
import MBAProgram from './pages/programs/MBAProgram';
import MCAProgram from './pages/programs/MCAProgram';
import Contact from './pages/Contact';
import PlacementProcess from './pages/placements/PlacementProcess';
import TeachingStaff from './pages/about/TeachingStaff';
import NonTeachingStaff from './pages/about/NonTeachingStaff';
import PhotoGallery from './pages/activities/PhotoGallery';
import VideoGallery from './pages/activities/VideoGallery';
import Blogs from './pages/activities/Blogs';
import BlogDetail from './pages/activities/BlogDetail';
import Recruiters from './pages/placements/Recruiters';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import ChatbotManagement from './pages/admin/ChatbotManagement';
import AdsManagement from './pages/admin/AdsManagement';
import AdminDashboard from './pages/admin/AdminDashboard'; // Keep for redirect maybe? Or remove later
import Grievance from './pages/Grievance';
import MandatoryDisclosure from './pages/MandatoryDisclosure';
import Payments from './pages/Payments';
import Scholarship from './pages/Scholarship';
import Anuragha from './pages/Anuragha';
import Sankalp from './pages/Sankalp';
import Chaitanya from './pages/Chaitanya';
import Brochure from './pages/Brochure';
import ForgotPassword from './pages/admin/ForgotPassword';

function App() {
  return (
    <Routes>
      {/* Public Website Routes */}
      <Route path="/" element={<WebsiteLayout />}>
        <Route index element={<Home />} />
        <Route path="programs/mba" element={<MBAProgram />} />
        <Route path="programs/mca" element={<MCAProgram />} />
        <Route path="about/faculty/teaching" element={<TeachingStaff />} />
        <Route path="about/faculty/non-teaching" element={<NonTeachingStaff />} />
        <Route path="activities/photo-gallery" element={<PhotoGallery />} />
        <Route path="activities/videos" element={<VideoGallery />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blog/:id" element={<BlogDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="placements/process" element={<PlacementProcess />} />
        <Route path="placements/recruiters" element={<Recruiters />} />
        <Route path="placements/brochure-2024" element={<Brochure />} />
        <Route path="cbs/grievance" element={<Grievance />} />
        <Route path="cbs/mandatory-disclosure-mba" element={<MandatoryDisclosure type="MBA" />} />
        <Route path="cbs/mandatory-disclosure-mca" element={<MandatoryDisclosure type="MCA" />} />
        <Route path="cbs/payments" element={<Payments />} />
        <Route path="cbs/scholarship" element={<Scholarship />} />
        <Route path="cbs/anuragha" element={<Anuragha />} />
        <Route path="cbs/sankalp" element={<Sankalp />} />
        <Route path="cbs/chaitanya" element={<Chaitanya />} />
        
        {/* Wildcard for standard pages */}
        <Route path="*" element={
          <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
            <h1>Page Under Construction</h1>
            <p>This page is currently being built.</p>
          </div>
        } />
      </Route>

      {/* Admin Dashboard Routes - Isolated from Public UI */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route index element={<ChatbotManagement />} />
          <Route path="chatbot" element={<ChatbotManagement />} />
          <Route path="ads" element={<AdsManagement />} />
        </Route>
      </Route>

      {/* Standalone Auth Routes */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
