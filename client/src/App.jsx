import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';


import Home from './pages/Home';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import JobList from './pages/JobList';
import JobCreate from './pages/JobCreate';


const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          <Route 
            path="/jobs" 
            element={
              <ProtectedRoute>
                <JobList />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/jobs/create" 
            element={
              <ProtectedRoute>
                <JobCreate />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;