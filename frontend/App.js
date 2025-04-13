// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Dashboard from './components/pages/Dashboard';
import Categories from './components/pages/CategoryList';
import AddCategory from './components/pages/AddCategory';
import EditCategory from './components/pages/EditCategory';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideLayout = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}
      <div className="flex flex-grow">
        {!hideLayout && <Sidebar />}
        <div className="flex-grow bg-gray-100 p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
          <Route path="/categories/add" element={<ProtectedRoute><AddCategory /></ProtectedRoute>} />
          <Route path="/categories/edit/:id" element={<ProtectedRoute><EditCategory /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
