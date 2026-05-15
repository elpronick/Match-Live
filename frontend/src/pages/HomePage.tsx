import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoUrl from '../assets/match-live-logo.svg';
import landingVideoUrl from '../assets/landing-video.mp4';
import profileUserAccountUrl from '../assets/profile-user-account.svg';
import HowItWorks from '../components/HowItWorks';
import DeckSection from '../components/DeckSection';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

export default function HomePage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* TopAppBar */}
      <header className="landing__header">
        <div className="landing__header-inner">
          <div className="landing__logo-wrap">
            <img src={logoUrl} alt="Match-Live Logo" className="landing__logo" />
            <span className="landing__logo-text">Match-Live</span>
          </div>
          <nav className="landing__nav">
            <a href="#como-funciona">Cómo funciona</a>
            <a href="#comunidad">Comunidad</a>
            <a href="#testimonios">Testimonios</a>
          </nav>
          <div className="landing__actions">
            <button className="landing__btn-login" onClick={() => navigate('/login')}>Inicia Sesión</button>
            <div className="landing__profile-menu">
              <button 
                className="landing__btn-start"
                onClick={() => {
                  if (window.innerWidth >= 768) {
                    navigate('/register');
                  } else {
                    setIsDropdownOpen(!isDropdownOpen);
                  }
                }}
              >
                <img src={profileUserAccountUrl} alt="Perfil" className="landing__btn-start-mobile" />
                <span className="landing__btn-start-desktop">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>login</span>
                  Registrarse
                </span>
              </button>

              {isDropdownOpen && (
                <div className="landing__dropdown">
                  <Link to="/login" className="landing__dropdown-item">
                    <span className="material-symbols-outlined">login</span>
                    Iniciar sesión
                  </Link>
                  <Link to="/register" className="landing__dropdown-item">
                    <span className="material-symbols-outlined">person_add</span>
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing__hero">
        <div className="landing__hero-grid">
          <div className="landing__hero-content">
            <div className="landing__badge">
              <span className="material-symbols-outlined">stars</span>
              <span>La nueva forma de convivir</span>
            </div>
            <h1 className="landing__title">
              Primero personas,<br /><span className="landing__title-accent">luego piso</span>
            </h1>
            <p className="landing__desc">
              Encuentra compañeros compatibles antes de buscar tu próxima habitación. Una experiencia basada en la afinidad y el estilo de vida.
            </p>
            <div className="landing__hero-actions">
              <button className="landing__btn-start landing__btn-start--large" onClick={() => navigate('/access')}>
                <span className="material-symbols-outlined">login</span>
                Acceso
              </button>
              <a href="#como-funciona" className="landing__btn-outline" style={{ textDecoration: 'none' }}>
                Cómo funciona
              </a>
            </div>
          </div>
          <div className="landing__hero-visual">
            <div className="landing__glass-card">
              <video 
                className="landing__hero-img" 
                src={landingVideoUrl}
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="landing__floating-badge">
                <div className="landing__floating-icon">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>handshake</span>
                </div>
                <div>
                  <p className="landing__floating-label">Afinidad Promedio</p>
                  <p className="landing__floating-value">94%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="landing__features">
        <div className="landing__features-header">
          <h2>Encuentra tu <span>compañero ideal</span></h2>
          <p>Un proceso diseñado para conectar estilos de vida compatibles antes de firmar un contrato.</p>
        </div>
        <div className="landing__features-grid">
          <div className="landing__feature-card">
            <div className="landing__feature-icon landing__feature-icon--primary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person_add</span>
            </div>
            <h3>Crea tu perfil</h3>
            <p>Define tus hábitos, preferencias de convivencia y presupuesto. Cuanto más detallado, mejores conexiones.</p>
          </div>
          <div className="landing__feature-card landing__feature-card--offset">
            <div className="landing__feature-icon landing__feature-icon--secondary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            </div>
            <h3>Haz Match</h3>
            <p>Nuestro algoritmo te conecta con personas que comparten tu estilo de vida. Chatea y conócelos.</p>
          </div>
          <div className="landing__feature-card">
            <div className="landing__feature-icon landing__feature-icon--tertiary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home_work</span>
            </div>
            <h3>Encuentra tu hogar</h3>
            <p>Una vez que encuentres a tus compañeros ideales, busquen juntos el piso perfecto que se adapte a todos.</p>
          </div>
        </div>
      </section>

      {/* Legacy Sections */}
      <HowItWorks />
      <DeckSection />
      <Testimonials />
      <Footer />

      {/* BottomNavBar (Mobile Only) */}
      <nav className="landing__bottom-nav">
        <a href="#" className="landing__bottom-nav-item landing__bottom-nav-item--active">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
          <span>Match</span>
        </a>
        <a href="#" className="landing__bottom-nav-item">
          <span className="material-symbols-outlined">bookmark</span>
          <span>Saved</span>
        </a>
        <a href="#" className="landing__bottom-nav-item">
          <span className="material-symbols-outlined">chat_bubble</span>
          <span>Messages</span>
        </a>
        <a href="#" className="landing__bottom-nav-item">
          <span className="material-symbols-outlined">account_circle</span>
          <span>Profile</span>
        </a>
      </nav>
    </div>
  );
}
