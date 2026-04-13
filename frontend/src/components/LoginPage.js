import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.scss';
export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-page" data-testid="login-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <Link to="/" className="auth-card__back" data-testid="back-to-home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Volver
          </Link>
          <h1 className="auth-card__title" data-testid="login-title">Bienvenido de vuelta</h1>
          <p className="auth-card__subtitle">Inicia sesion para acceder a tu dashboard</p>
        </div>

        {error && <div className="auth-error" data-testid="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required data-testid="login-email-input" />
          </div>
          <div className="auth-field">
            <label htmlFor="password">Contraseña</label>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required data-testid="login-password-input" />
          </div>
          <button type="submit" className="auth-submit" disabled={submitting} data-testid="login-submit-button">
            {submitting ? 'Entrando...' : 'Iniciar sesion'}
          </button>
        </form>

        <p className="auth-switch">
          ¿No tienes cuenta? <Link to="/register" data-testid="go-to-register">Registrate</Link>
        </p>
      </div>
    </div>
  );
}


