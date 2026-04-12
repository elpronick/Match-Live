import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';

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
      <AuthStyles />
    </div>
  );
}

export function AuthStyles() {
  return (
    <style>{`
      .auth-page {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
      }
      .auth-card {
        width: 100%;
        max-width: 440px;
        padding: 40px 36px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-xl);
        backdrop-filter: blur(18px);
        box-shadow: var(--shadow-soft);
      }
      .auth-card__back {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 0.88rem;
        font-weight: 600;
        color: var(--color-muted);
        text-decoration: none;
        margin-bottom: 24px;
        transition: color 0.2s;
      }
      .auth-card__back:hover { color: var(--color-text); }
      .auth-card__header { margin-bottom: 28px; }
      .auth-card__title {
        font-size: 1.8rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        margin-bottom: 6px;
      }
      .auth-card__subtitle {
        font-size: 0.95rem;
        color: var(--color-muted);
      }
      .auth-error {
        padding: 12px 16px;
        margin-bottom: 20px;
        background: #fff1ec;
        color: #a74f35;
        border-radius: var(--radius-md);
        font-size: 0.9rem;
        font-weight: 600;
      }
      .auth-success {
        padding: 12px 16px;
        margin-bottom: 20px;
        background: var(--color-success-soft);
        color: var(--color-success);
        border-radius: var(--radius-md);
        font-size: 0.9rem;
        font-weight: 600;
      }
      .auth-form {
        display: grid;
        gap: 18px;
      }
      .auth-field label {
        display: block;
        font-size: 0.85rem;
        font-weight: 700;
        margin-bottom: 6px;
        color: var(--color-text);
      }
      .auth-field input,
      .auth-field select,
      .auth-field textarea {
        width: 100%;
        padding: 12px 16px;
        font: inherit;
        font-size: 0.95rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: var(--color-surface-strong);
        color: var(--color-text);
        transition: border-color 0.2s, box-shadow 0.2s;
      }
      .auth-field input:focus,
      .auth-field select:focus,
      .auth-field textarea:focus {
        outline: none;
        border-color: var(--color-accent);
        box-shadow: 0 0 0 3px rgba(232, 139, 139, 0.15);
      }
      .auth-field textarea { min-height: 80px; resize: vertical; }
      .auth-submit {
        width: 100%;
        padding: 14px;
        font-size: 0.95rem;
        font-weight: 700;
        color: #fff;
        background: var(--color-accent);
        border: none;
        border-radius: var(--radius-pill);
        cursor: pointer;
        transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 4px 16px rgba(232, 139, 139, 0.3);
        margin-top: 4px;
      }
      .auth-submit:hover:not(:disabled) {
        background: var(--color-accent-dark);
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(232, 139, 139, 0.4);
      }
      .auth-submit:disabled { opacity: 0.6; cursor: not-allowed; }
      .auth-switch {
        margin-top: 24px;
        text-align: center;
        font-size: 0.9rem;
        color: var(--color-muted);
      }
      .auth-switch a {
        color: var(--color-accent);
        font-weight: 700;
        text-decoration: none;
      }
      .auth-switch a:hover { text-decoration: underline; }
      .auth-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px;
      }
      @media (max-width: 500px) {
        .auth-card { padding: 28px 20px; }
        .auth-row { grid-template-columns: 1fr; }
      }
    `}</style>
  );
}
