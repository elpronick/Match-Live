import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import { useAuth } from './components/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import DeckSection from './components/DeckSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import './App.scss';

function LandingPage() {
  return (
    <>
      <Header />
      <Hero />
      <HowItWorks />
      <DeckSection />
      <Testimonials />
      <Footer />
    </>
  );
}

function ProtectedDashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="auth-page" data-testid="dashboard-loading">
        <div className="auth-card">
          <div className="auth-card__header">
            <h1 className="auth-card__title">Cargando tu dashboard</h1>
            <p className="auth-card__subtitle">Estamos comprobando tu sesión.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Dashboard />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <div className="app" data-testid="app-container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<ProtectedDashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

