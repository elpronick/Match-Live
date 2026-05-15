import React from 'react';
import { Link } from 'react-router-dom';

export default function AccessPage() {
  return (
    <div className="auth-page" data-testid="access-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <Link to="/" className="auth-card__back" data-testid="back-to-home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Volver
          </Link>
          <h1 className="auth-card__title">Acceso a Match-Live</h1>
          <p className="auth-card__subtitle">¿Qué deseas hacer?</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
          <Link to="/login" className="auth-submit" style={{ textDecoration: 'none', textAlign: 'center' }}>
            Iniciar sesión
          </Link>
          <Link to="/register" className="landing__btn-outline" style={{ textDecoration: 'none', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}>
            Registrarse
          </Link>
        </div>
      </div>
    </div>
  );
}
