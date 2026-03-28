import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import MBAProgram from './pages/programs/MBAProgram';
import MCAProgram from './pages/programs/MCAProgram';
import Contact from './pages/Contact';
import PlacementProcess from './pages/placements/PlacementProcess';
import TeachingStaff from './pages/about/TeachingStaff';
import NonTeachingStaff from './pages/about/NonTeachingStaff';
import PhotoGallery from './pages/activities/PhotoGallery';
import Recruiters from './pages/placements/Recruiters';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="programs/mba" element={<MBAProgram />} />
        <Route path="programs/mca" element={<MCAProgram />} />
        <Route path="about/faculty/teaching" element={<TeachingStaff />} />
        <Route path="about/faculty/non-teaching" element={<NonTeachingStaff />} />
        <Route path="activities/photo-gallery" element={<PhotoGallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="placements/process" element={<PlacementProcess />} />
        <Route path="placements/recruiters" element={<Recruiters />} />
        <Route path="admin-login" element={<AdminLogin />} />
        <Route path="admin-dashboard" element={<AdminDashboard />} />
        {/* Placeholder routes for now */}
        <Route path="*" element={
          <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
            <h1>Page Under Construction</h1>
            <p>This page is currently being built.</p>
          </div>
        } />
      </Route>
    </Routes>
  );
}

export default App;
