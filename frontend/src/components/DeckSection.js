 './DeckSection.scss';
 './DeckSection.scss';
 './DeckSection.scss';
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
    </section>
  );
}




