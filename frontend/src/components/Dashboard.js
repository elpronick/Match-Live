import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.scss';
const API = import.meta.env.VITE_BACKEND_URL;

const properties = [
  { id: 1, title: 'Habitacion luminosa en piso compartido', location: 'Malasaña, Madrid', price: '460 EUR/mes', image: 'https://images.pexels.com/photos/20725941/pexels-photo-20725941.jpeg' },
  { id: 2, title: 'Habitacion para estudiantes', location: 'Ruzafa, Valencia', price: '435 EUR/mes', image: 'https://images.pexels.com/photos/20725943/pexels-photo-20725943.jpeg' },
  { id: 3, title: 'Habitacion (playa/universidad)', location: 'Poblenou, Barcelona', price: '600 EUR/mes', image: 'https://images.pexels.com/photos/27683999/pexels-photo-27683999.jpeg' },
  { id: 4, title: 'Habitacion tranquila con vibe creativa', location: 'Triana, Sevilla', price: '525 EUR/mes', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80' },
];

const lifestyleOptions = ['Tranquilo y casero','Social y activo','Trabajador remoto','Estudiante','Deportista','Nocturno','Madrugador'];

export default function Dashboard() {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('profile');
  const [saved, setSaved] = useState([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setForm({ name: user.name || '', city: user.city || '', budget: user.budget || '', lifestyle: user.lifestyle || '', description: user.description || '' });
      loadSaved();
    }
  }, [user]);

  const loadSaved = async () => {
    try {
      const { data } = await axios.get(`${API}/api/saved`, { withCredentials: true });
      setSaved(data);
    } catch {}
  };

  const removeSaved = async (propertyId) => {
    try {
      await axios.delete(`${API}/api/saved/${propertyId}`, { withCredentials: true });
      setSaved(prev => prev.filter(s => s.property_id !== propertyId));
    } catch {}
  };

  const update = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setMsg(''); setError('');
    const payload = { ...form, budget: form.budget ? parseInt(form.budget, 10) : 0 };
    const result = await updateProfile(payload);
    if (result.success) {
      setMsg('Perfil actualizado correctamente');
      setEditing(false);
    } else {
      setError(result.error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) return null;

  const savedProperties = properties.filter(p => saved.some(s => s.property_id === p.id));

  return (
    <div className="dashboard" data-testid="dashboard-page">
      <div className="dashboard__sidebar">
        <Link to="/" className="dashboard__back" data-testid="dashboard-back-home">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Inicio
        </Link>
        <div className="dashboard__avatar" data-testid="dashboard-avatar">
          {(user.name || 'U').charAt(0).toUpperCase()}
        </div>
        <h2 className="dashboard__user-name" data-testid="dashboard-user-name">{user.name}</h2>
        <p className="dashboard__user-email">{user.email}</p>
        {user.city && <p className="dashboard__user-city">{user.city}</p>}

        <nav className="dashboard__tabs">
          <button className={`dashboard__tab ${tab === 'profile' ? 'dashboard__tab--active' : ''}`} onClick={() => setTab('profile')} data-testid="tab-profile">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Mi Perfil
          </button>
          <button className={`dashboard__tab ${tab === 'saved' ? 'dashboard__tab--active' : ''}`} onClick={() => setTab('saved')} data-testid="tab-saved">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            Guardados ({saved.length})
          </button>
        </nav>

        <button className="dashboard__logout" onClick={handleLogout} data-testid="dashboard-logout-button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Cerrar sesion
        </button>
      </div>

      <div className="dashboard__main">
        {tab === 'profile' && (
          <div className="dashboard__section" data-testid="profile-section">
            <div className="dashboard__section-header">
              <h2>Mi Perfil</h2>
              {!editing && <button className="dashboard__edit-btn" onClick={() => setEditing(true)} data-testid="edit-profile-button">Editar perfil</button>}
            </div>
            {msg && <div className="auth-success">{msg}</div>}
            {error && <div className="auth-error">{error}</div>}
            {editing ? (
              <form onSubmit={handleSave} className="auth-form">
                <div className="auth-row">
                  <div className="auth-field"><label>Nombre</label><input value={form.name} onChange={update('name')} data-testid="edit-name-input" /></div>
                  <div className="auth-field"><label>Ciudad</label>
                    <select value={form.city} onChange={update('city')} data-testid="edit-city-select">
                      <option value="">Selecciona</option><option value="Madrid">Madrid</option><option value="Barcelona">Barcelona</option><option value="Valencia">Valencia</option><option value="Sevilla">Sevilla</option><option value="Otra">Otra</option>
                    </select>
                  </div>
                </div>
                <div className="auth-row">
                  <div className="auth-field"><label>Presupuesto (EUR/mes)</label><input type="number" value={form.budget} onChange={update('budget')} min="0" data-testid="edit-budget-input" /></div>
                  <div className="auth-field"><label>Estilo de vida</label>
                    <select value={form.lifestyle} onChange={update('lifestyle')} data-testid="edit-lifestyle-select">
                      <option value="">Selecciona</option>{lifestyleOptions.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div className="auth-field"><label>Sobre ti</label><textarea value={form.description} onChange={update('description')} data-testid="edit-description-input" /></div>
                <div style={{display:'flex',gap:'12px'}}>
                  <button type="submit" className="auth-submit" data-testid="save-profile-button">Guardar cambios</button>
                  <button type="button" className="dashboard__cancel-btn" onClick={() => setEditing(false)} data-testid="cancel-edit-button">Cancelar</button>
                </div>
              </form>
            ) : (
              <div className="profile-grid" data-testid="profile-info">
                <div className="profile-item"><span>Nombre</span><strong>{user.name || '-'}</strong></div>
                <div className="profile-item"><span>Email</span><strong>{user.email}</strong></div>
                <div className="profile-item"><span>Ciudad</span><strong>{user.city || '-'}</strong></div>
                <div className="profile-item"><span>Presupuesto</span><strong>{user.budget ? `${user.budget} EUR/mes` : '-'}</strong></div>
                <div className="profile-item"><span>Estilo de vida</span><strong>{user.lifestyle || '-'}</strong></div>
                <div className="profile-item profile-item--full"><span>Sobre ti</span><strong>{user.description || '-'}</strong></div>
              </div>
            )}
          </div>
        )}

        {tab === 'saved' && (
          <div className="dashboard__section" data-testid="saved-section">
            <h2>Pisos Guardados</h2>
            {savedProperties.length === 0 ? (
              <div className="dashboard__empty" data-testid="no-saved-message">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                <h3>No tienes pisos guardados</h3>
                <p>Explora pisos y guarda tus favoritos para verlos aqui.</p>
                <Link to="/#pisos" className="auth-submit" style={{display:'inline-block',maxWidth:'200px',textAlign:'center',textDecoration:'none',marginTop:'12px'}} data-testid="go-explore-button">Explorar pisos</Link>
              </div>
            ) : (
              <div className="saved-grid">
                {savedProperties.map(p => (
                  <div key={p.id} className="saved-card" data-testid={`saved-card-${p.id}`}>
                    <div className="saved-card__img" style={{backgroundImage: `url('${p.image}')`}} />
                    <div className="saved-card__body">
                      <p className="saved-card__location">{p.location}</p>
                      <h3>{p.title}</h3>
                      <p className="saved-card__price">{p.price}</p>
                      <button className="saved-card__remove" onClick={() => removeSaved(p.id)} data-testid={`remove-saved-${p.id}`}>Eliminar</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


