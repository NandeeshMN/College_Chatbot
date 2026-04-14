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
import VideoGallery from './pages/activities/VideoGallery';
import Recruiters from './pages/placements/Recruiters';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import Grievance from './pages/Grievance';
import MandatoryDisclosure from './pages/MandatoryDisclosure';
import Payments from './pages/Payments';
import Scholarship from './pages/Scholarship';
import Anuragha from './pages/Anuragha';
import Sankalp from './pages/Sankalp';
import Chaitanya from './pages/Chaitanya';

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
        <Route path="activities/videos" element={<VideoGallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="placements/process" element={<PlacementProcess />} />
        <Route path="placements/recruiters" element={<Recruiters />} />
        <Route path="admin-login" element={<AdminLogin />} />
        <Route path="admin-dashboard" element={<AdminDashboard />} />
        <Route path="cbs/grievance" element={<Grievance />} />
        <Route path="cbs/mandatory-disclosure-mba" element={<MandatoryDisclosure type="MBA" />} />
        <Route path="cbs/mandatory-disclosure-mca" element={<MandatoryDisclosure type="MCA" />} />
        <Route path="cbs/payments" element={<Payments />} />
        <Route path="cbs/scholarship" element={<Scholarship />} />
        <Route path="cbs/anuragha" element={<Anuragha />} />
        <Route path="cbs/sankalp" element={<Sankalp />} />
        <Route path="cbs/chaitanya" element={<Chaitanya />} />
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
