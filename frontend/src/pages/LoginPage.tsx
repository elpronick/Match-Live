import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import googleIconUrl from '../assets/google.svg';
import facebookIconUrl from '../assets/facebook.svg';
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
      <div className="auth-bg-blobs">
        <div className="auth-bg-blob-1"></div>
        <div className="auth-bg-blob-2"></div>
      </div>

      <div className="auth-card" style={{ textAlign: 'center' }}>
        <div className="auth-card__header">
          <Link to="/" className="auth-card__back" style={{ alignSelf: 'flex-start', display: 'flex' }} data-testid="back-to-home">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Volver
          </Link>
          <div className="auth-logo">
            <span className="material-symbols-outlined" style={{ fontSize: '40px' }}>diversity_3</span>
            <h1>Match-Live</h1>
          </div>
          <h1 className="auth-card__title" data-testid="login-title">Bienvenido de vuelta</h1>
          <p className="auth-card__subtitle">Encuentra a tu compañero ideal hoy mismo</p>
        </div>

        {error && <div className="auth-error" data-testid="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form" style={{ textAlign: 'left' }}>
          <div className="auth-field">
            <label htmlFor="email">Correo electrónico</label>
            <div className="auth-field-inner">
              <span className="material-symbols-outlined auth-icon">mail</span>
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="nombre@ejemplo.com" required data-testid="login-email-input" />
            </div>
          </div>
          <div className="auth-field">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="password">Contraseña</label>
              <a href="#" style={{ fontSize: '0.75rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>¿Olvidaste tu contraseña?</a>
            </div>
            <div className="auth-field-inner">
              <span className="material-symbols-outlined auth-icon">lock</span>
              <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required data-testid="login-password-input" />
              <span className="material-symbols-outlined auth-icon-right">visibility</span>
            </div>
          </div>
          <button type="submit" className="auth-submit" disabled={submitting} data-testid="login-submit-button">
            {submitting ? 'Entrando...' : 'Iniciar sesión'}
          </button>
        </form>

        <div className="auth-divider">
          <div className="auth-divider-line"></div>
          <span>O continuar con</span>
          <div className="auth-divider-line"></div>
        </div>

        <div className="auth-social">
          <button type="button" className="auth-social-btn">
            <img src={googleIconUrl} alt="Google" />
            Google
          </button>
          <button type="button" className="auth-social-btn">
            <img src={facebookIconUrl} alt="Facebook" />
            Facebook
          </button>
        </div>

        <p className="auth-switch">
          ¿No tienes cuenta? <Link to="/register" data-testid="go-to-register">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}


