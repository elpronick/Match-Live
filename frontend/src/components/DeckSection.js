import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL;

const properties = [
  {
    id: 1,
    title: 'Habitacion luminosa en piso compartido',
    location: 'Malasaña, Madrid',
    price: '460 EUR/mes',
    tag: 'Top match estudiantes',
    description: 'Habitacion exterior con escritorio, armario grande y muy buen rollo en casa. Ideal para estudiantes o gente joven que quiere vivir cerca del centro.',
    image: 'https://images.pexels.com/photos/20725941/pexels-photo-20725941.jpeg',
    meta: ['4 compis', 'Gastos incluidos', 'Amueblada'],
    perks: ['Escritorio', 'Metro cerca', 'Buen ambiente'],
  },
  {
    id: 2,
    title: 'Habitacion para estudiantes',
    location: 'Ruzafa, Valencia',
    price: '435 EUR/mes',
    tag: 'Nuevo hoy',
    description: 'Habitacion comoda en piso reformado con salon amplio, balcon y compis entre 24 y 29 años. Perfecta si trabajas en remoto o estudias y buscas zona con vida.',
    image: 'https://images.pexels.com/photos/20725943/pexels-photo-20725943.jpeg',
    meta: ['3 compis', 'Piso reformado', 'WiFi top'],
    perks: ['Balcon', 'Desk setup', 'Supermercado cerca'],
  },
  {
    id: 3,
    title: 'Habitacion (playa/universidad)',
    location: 'Poblenou, Barcelona',
    price: '600 EUR/mes',
    tag: 'Ideal Erasmus',
    description: 'Habitacion acogedora en piso compartido con gente internacional. Casa tranquila entre semana, planazos el finde y muy bien conectada con universidad y playa.',
    image: 'https://images.pexels.com/photos/27683999/pexels-photo-27683999.jpeg',
    meta: ['5 compis', '2 baños', 'Contrato flexible'],
    perks: ['Cerca del mar', 'Zona universitaria'],
  },
  {
    id: 4,
    title: 'Habitacion tranquila con vibe creativa',
    location: 'Triana, Sevilla',
    price: '525 EUR/mes',
    tag: 'Muy guardada',
    description: 'Habitacion con cama doble, ventana grande y piso compartido con dos chicas y un chico. Buen equilibrio entre estudio, curro y planes de terraza.',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    meta: ['3 compis', 'Cama doble', 'Larga estancia'],
    perks: ['Zona cool', 'Luminoso', 'Cocina equipada'],
  },
];

const filterChips = ['Centro', 'Terraza', 'Mascotas', 'Parking'];

export default function DeckSection() {
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeChips, setActiveChips] = useState(new Set(['Centro']));
  const [budget, setBudget] = useState(600);
  const [savedIds, setSavedIds] = useState(new Set());
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    if (user) {
      axios.get(`${API}/api/saved`, { withCredentials: true })
        .then(({ data }) => setSavedIds(new Set(data.map(s => s.property_id))))
        .catch(() => {});
    }
  }, [user]);

  const current = properties[currentIndex];
  const canGoBack = currentIndex > 0;
  const canGoNext = currentIndex < properties.length - 1;

  const goBack = () => canGoBack && setCurrentIndex(i => i - 1);
  const goNext = () => canGoNext && setCurrentIndex(i => i + 1);

  const toggleSave = async () => {
    if (!user || !current) return;
    const id = current.id;
    if (savedIds.has(id)) {
      await axios.delete(`${API}/api/saved/${id}`, { withCredentials: true }).catch(() => {});
      setSavedIds(prev => { const n = new Set(prev); n.delete(id); return n; });
      setSaveMsg('Eliminado de guardados');
    } else {
      await axios.post(`${API}/api/saved/${id}`, {}, { withCredentials: true }).catch(() => {});
      setSavedIds(prev => new Set(prev).add(id));
      setSaveMsg('Guardado!');
    }
    setTimeout(() => setSaveMsg(''), 2000);
  };

  const toggleChip = (chip) => {
    setActiveChips(prev => {
      const next = new Set(prev);
      next.has(chip) ? next.delete(chip) : next.add(chip);
      return next;
    });
  };

  return (
    <section className="deck-wrap" id="pisos" data-testid="deck-section">
      <div className="deck-wrap__header">
        <span className="deck-wrap__eyebrow">Descubre pisos</span>
        <h2 className="deck-wrap__title" data-testid="deck-title">Encuentra tu compañero de piso</h2>
        <p className="deck-wrap__subtitle">Desliza por habitaciones reales en las mejores zonas. Tu proximo hogar esta aqui.</p>
      </div>

      <div className="deck-wrap__inner">
        <aside className="filters-panel" data-testid="filters-panel">
          <div className="filters-panel__block">
            <p className="filters-panel__label">Busqueda rapida</p>
            <h3 className="filters-panel__title">Personaliza tu feed</h3>
            <p className="filters-panel__muted">Base preparada para filtros, favoritos y recomendacion.</p>
          </div>
          <div className="filters-panel__chips">
            {filterChips.map(chip => (
              <button
                key={chip}
                className={`chip ${activeChips.has(chip) ? 'chip--active' : ''}`}
                onClick={() => toggleChip(chip)}
                data-testid={`chip-${chip.toLowerCase()}`}
                aria-pressed={activeChips.has(chip)}
              >
                {chip}
              </button>
            ))}
          </div>
          <div className="filters-panel__stats">
            <div className="stat-card stat-card--budget">
              <span>Presupuesto</span>
              <div className="stat-card__row">
                <span className="stat-card__lead">Hasta</span>
                <div className="stat-card__field">
                  <input
                    type="number"
                    min="0"
                    max="50000"
                    step="10"
                    value={budget}
                    onChange={e => setBudget(e.target.value)}
                    className="stat-card__input"
                    data-testid="budget-input"
                  />
                  <span className="stat-card__currency">€</span>
                </div>
              </div>
            </div>
            <div className="stat-card">
              <span>Interesados</span>
              <strong>12 personas</strong>
            </div>
          </div>
        </aside>

        <div className="deck-main">
          {current ? (
            <article className="property-card" data-testid={`property-card-${current.id}`}>
              <div
                className="property-card__media"
                style={{ backgroundImage: `linear-gradient(180deg, rgba(24,16,11,0.04), rgba(24,16,11,0.42)), url('${current.image}')` }}
              >
                <span className="property-card__tag" data-testid="property-tag">{current.tag}</span>
              </div>
              <div className="property-card__body">
                <div className="property-card__heading">
                  <div>
                    <p className="property-card__location">{current.location}</p>
                    <h3 className="property-card__name" data-testid="property-title">{current.title}</h3>
                  </div>
                  <p className="property-card__price" data-testid="property-price">{current.price}</p>
                </div>
                <p className="property-card__desc">{current.description}</p>
                <ul className="property-card__meta">
                  {current.meta.map(m => <li key={m}>{m}</li>)}
                </ul>
                <div className="property-card__perks">
                  {current.perks.map(p => <span key={p}>{p}</span>)}
                </div>
              </div>
            </article>
          ) : (
            <div className="deck-empty" data-testid="deck-empty">
              <h3>Has revisado todos los pisos del feed.</h3>
              <p>La base esta lista para conectar filtros, favoritos o API mas adelante.</p>
            </div>
          )}
          <div className="swipe-actions" data-testid="swipe-actions">
            {saveMsg && <div className="save-toast" data-testid="save-toast">{saveMsg}</div>}
            <button
              className="swipe-btn swipe-btn--reject"
              onClick={goBack}
              disabled={!canGoBack}
              data-testid="swipe-back-btn"
            >
              Atras
            </button>
            <button className="swipe-btn swipe-btn--save" onClick={toggleSave} disabled={!user || !current} data-testid="swipe-save-btn">
              {current && savedIds.has(current.id) ? 'Guardado' : 'Guardar'}
            </button>
            <button
              className="swipe-btn swipe-btn--like"
              onClick={goNext}
              disabled={!canGoNext}
              data-testid="swipe-next-btn"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .deck-wrap {
          padding: 40px 24px 100px;
        }
        .deck-wrap__header {
          text-align: center;
          margin-bottom: 48px;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }
        .deck-wrap__eyebrow {
          display: inline-block;
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin-bottom: 12px;
        }
        .deck-wrap__title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 14px;
        }
        .deck-wrap__subtitle {
          font-size: 1.05rem;
          color: var(--color-muted);
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.65;
        }
        .deck-wrap__inner {
          display: grid;
          grid-template-columns: 320px minmax(0, 1fr);
          gap: 24px;
          align-items: start;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Filters Panel */
        .filters-panel {
          display: grid;
          gap: 22px;
          padding: 28px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          background: var(--color-surface);
          box-shadow: var(--shadow-soft);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .filters-panel__label {
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-accent);
        }
        .filters-panel__title {
          font-size: 1.8rem;
          margin: 8px 0 10px;
        }
        .filters-panel__muted {
          color: var(--color-muted);
          font-size: 0.92rem;
          line-height: 1.5;
        }
        .filters-panel__chips {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .chip {
          padding: 10px 16px;
          color: var(--color-muted);
          background: rgba(255,255,255,0.8);
          border-radius: var(--radius-pill);
          transition: color 160ms ease, background 160ms ease;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .chip--active {
          color: var(--color-surface-strong);
          background: var(--color-text);
        }
        .filters-panel__stats {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }
        .stat-card {
          flex: 1 1 140px;
          padding: 16px 18px;
          border-radius: var(--radius-md);
          background: rgba(255,255,255,0.72);
        }
        .stat-card > span {
          display: block;
          margin-bottom: 6px;
          font-size: 0.85rem;
          color: var(--color-muted);
        }
        .stat-card strong {
          font-size: 1.15rem;
          font-weight: 700;
        }
        .stat-card__row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px 12px;
          margin-top: 2px;
        }
        .stat-card__lead {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-muted);
        }
        .stat-card__field {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          min-height: 44px;
          padding: 0 12px 0 14px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          background: var(--color-surface-strong);
        }
        .stat-card__field:focus-within {
          border-color: rgba(31,26,23,0.28);
          box-shadow: 0 0 0 2px rgba(31,26,23,0.06);
        }
        .stat-card__input {
          width: 4.5ch;
          min-width: 0;
          padding: 8px 0;
          border: 0;
          font: inherit;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-text);
          background: transparent;
          text-align: right;
          -moz-appearance: textfield;
        }
        .stat-card__input::-webkit-outer-spin-button,
        .stat-card__input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .stat-card__input:focus { outline: none; }
        .stat-card__currency {
          font-size: 1.15rem;
          font-weight: 700;
          user-select: none;
        }

        /* Deck main */
        .deck-main {
          display: grid;
          gap: 22px;
        }

        /* Property Card */
        .property-card {
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.65);
          border-radius: var(--radius-lg);
          background: var(--color-surface-strong);
          box-shadow: var(--shadow-card);
        }
        .property-card__media {
          position: relative;
          display: flex;
          align-items: flex-start;
          min-height: 360px;
          padding: 24px;
          background-size: cover;
          background-position: center;
        }
        .property-card__tag {
          display: inline-flex;
          align-items: center;
          padding: 10px 14px;
          font-size: 0.85rem;
          font-weight: 700;
          color: #fff;
          background: rgba(24,16,11,0.45);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: var(--radius-pill);
        }
        .property-card__body {
          display: grid;
          gap: 20px;
          padding: 24px;
        }
        .property-card__heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        }
        .property-card__location {
          margin-bottom: 6px;
          font-size: 0.9rem;
          color: var(--color-muted);
        }
        .property-card__name {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
        }
        .property-card__price {
          font-size: 1.1rem;
          font-weight: 800;
          white-space: nowrap;
        }
        .property-card__desc {
          color: var(--color-muted);
          line-height: 1.6;
        }
        .property-card__meta,
        .property-card__perks {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: flex-start;
          align-items: flex-start;
        }
        .property-card__meta li,
        .property-card__perks span {
          display: inline-flex;
          align-items: center;
          justify-content: flex-start;
          max-width: 100%;
          padding: 10px 14px;
          background: #f7f3ef;
          border-radius: var(--radius-pill);
          font-size: 0.88rem;
          line-height: 1.35;
          text-align: left;
          white-space: normal;
          word-break: break-word;
          user-select: none;
        }
        .property-card__perks span {
          color: var(--color-success);
          background: var(--color-success-soft);
        }

        /* Swipe buttons */
        .swipe-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 14px;
        }
        .swipe-btn {
          position: relative;
          overflow: hidden;
          min-width: 118px;
          padding: 16px 20px;
          font-weight: 700;
          border: 1px solid transparent;
          border-radius: var(--radius-pill);
          box-shadow: var(--shadow-soft);
          transition: transform 220ms cubic-bezier(0.33,1,0.68,1), box-shadow 220ms ease, background 200ms ease, border-color 200ms ease, color 200ms ease;
        }
        .swipe-btn:hover:not(:disabled) {
          transform: translateY(-3px) scale(1.02);
        }
        .swipe-btn:active:not(:disabled) {
          transform: translateY(-1px) scale(0.98);
        }
        .swipe-btn:disabled {
          cursor: not-allowed;
          opacity: 0.45;
          transform: none;
          box-shadow: none;
        }
        .swipe-btn--reject { color: #a74f35; background: #fff1ec; }
        .swipe-btn--reject:hover:not(:disabled) { background: #ffe4dc; border-color: rgba(167,79,53,0.24); }
        .swipe-btn--save { color: #8a6511; background: #fff6db; }
        .swipe-btn--save:hover:not(:disabled) { background: #fff3cf; border-color: rgba(138,101,17,0.24); }
        .save-toast {
          grid-column: 1 / -1;
          text-align: center;
          padding: 8px 16px;
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--color-success);
          background: var(--color-success-soft);
          border-radius: var(--radius-pill);
          animation: fadeInUp 0.3s ease;
        }
        .swipe-btn--like { color: #0c7655; background: #daf6ec; }
        .swipe-btn--like:hover:not(:disabled) { background: #d2f5e8; border-color: rgba(12,118,85,0.24); }

        .deck-empty {
          display: grid;
          place-items: center;
          min-height: 420px;
          padding: 32px;
          text-align: center;
          border: 1px dashed var(--color-border);
          border-radius: var(--radius-xl);
          background: rgba(255,255,255,0.55);
        }
        .deck-empty h3 { margin-bottom: 8px; }
        .deck-empty p { color: var(--color-muted); }

        @media (max-width: 900px) {
          .deck-wrap__inner { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .property-card__media { min-height: 260px; }
          .property-card__body { padding: 22px 18px; }
          .property-card__heading { flex-direction: column; }
          .property-card__meta,
          .property-card__perks { gap: 10px; }
          .swipe-actions { display: grid; grid-template-columns: minmax(88px, 1fr) minmax(132px, 1.15fr) minmax(106px, 1fr); justify-content: center; gap: 10px; }
          .swipe-btn { min-width: 0; width: 100%; padding: 15px 12px; font-size: 0.95rem; white-space: nowrap; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}



