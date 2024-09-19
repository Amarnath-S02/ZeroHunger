import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MultiStepForm from './pages/MultiStepForm';
import LoginPage from './pages/LoginPage';
import AccountSettings from './pages/AccountSettings';
import Dashboard from './pages/Dashboard';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard'; // Dashboard with Sidebar + Topbar
import ManageDonations from './components/ManageDonations';
import ManageRequests from './components/ManageRequests';
import ManageUsers from './components/ManageUsers';
import ViewReports from './components/ViewReports';
import Footer from './components/Footer';
import AddOrphanage from './components/AddOrphanage';

const Layout = ({ children }) => {
  const hideNavbarAndFooter = [
    '/signup',
    '/login',
    '/settings',
    '/dashboard',
    '/admin',
    '/admin/dashboard',
    '/admin/manage-donation',
    '/admin/manage-request',
    '/admin/manage-users',
    '/admin/reports'
  ].includes(window.location.pathname);

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}
      {children}
      {!hideNavbarAndFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<MultiStepForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/settings" element={<AccountSettings />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Admin Routes - Nested Routes in AdminDashboard */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminDashboard />}>
            <Route path="dashboard" element={<ManageDonations />} />
            <Route path="manage-donation" element={<ManageDonations />} />
            <Route path="manage-request" element={<ManageRequests />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="add-orphanages" element={<AddOrphanage />} />
            <Route path="reports" element={<ViewReports />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
