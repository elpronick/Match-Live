import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.scss';

const lifestyleOptions = [
  'Tranquilo y casero',
  'Social y activo',
  'Trabajador remoto',
  'Estudiante',
  'Deportista',
  'Nocturno',
  'Madrugador',
];

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', city: '', budget: '', lifestyle: '', description: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const payload = { ...form, budget: form.budget ? parseInt(form.budget, 10) : 0 };
    const result = await register(payload);
    setSubmitting(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-page" data-testid="register-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <Link to="/" className="auth-card__back" data-testid="back-to-home-register">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Volver
          </Link>
          <h1 className="auth-card__title" data-testid="register-title">Crea tu cuenta</h1>
          <p className="auth-card__subtitle">Completa tu perfil para encontrar tu piso ideal</p>
        </div>

        {error && <div className="auth-error" data-testid="register-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-row">
            <div className="auth-field">
              <label htmlFor="name">Nombre</label>
              <input id="name" value={form.name} onChange={update('name')} placeholder="Tu nombre" required data-testid="register-name-input" />
            </div>
            <div className="auth-field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={form.email} onChange={update('email')} placeholder="tu@email.com" required data-testid="register-email-input" />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="password">Contraseña</label>
            <input id="password" type="password" value={form.password} onChange={update('password')} placeholder="Minimo 6 caracteres" required data-testid="register-password-input" />
          </div>

          <div className="auth-row">
            <div className="auth-field">
              <label htmlFor="city">Ciudad</label>
              <select id="city" value={form.city} onChange={update('city')} data-testid="register-city-select">
                <option value="">Selecciona ciudad</option>
                <option value="Madrid">Madrid</option>
                <option value="Barcelona">Barcelona</option>
                <option value="Valencia">Valencia</option>
                <option value="Sevilla">Sevilla</option>
                <option value="Otra">Otra</option>
              </select>
            </div>
            <div className="auth-field">
              <label htmlFor="budget">Presupuesto (EUR/mes)</label>
              <input id="budget" type="number" value={form.budget} onChange={update('budget')} placeholder="600" min="0" data-testid="register-budget-input" />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="lifestyle">Estilo de vida</label>
            <select id="lifestyle" value={form.lifestyle} onChange={update('lifestyle')} data-testid="register-lifestyle-select">
              <option value="">Selecciona estilo</option>
              {lifestyleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div className="auth-field">
            <label htmlFor="description">Sobre ti</label>
            <textarea id="description" value={form.description} onChange={update('description')} placeholder="Cuentanos un poco sobre ti y lo que buscas..." data-testid="register-description-input" />
          </div>

          <button type="submit" className="auth-submit" disabled={submitting} data-testid="register-submit-button">
            {submitting ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
        </form>

        <p className="auth-switch">
          ¿Ya tienes cuenta? <Link to="/login" data-testid="go-to-login">Inicia sesion</Link>
        </p>
      </div>
    </div>
  );
}

