import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';
import logoUrl from '../assets/match-live-logo.svg';
import './Header.scss';
const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Pisos', href: '#pisos' },
  { label: 'Testimonios', href: '#testimonios' },
];

export default function Header() {
  const { user, loading } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollMeterActive, setScrollMeterActive] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const nextScrollY = window.scrollY;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        0
      );
      const nextProgress = maxScroll > 0 ? Math.min(nextScrollY / maxScroll, 1) : 0;

      setScrolled(nextScrollY > 20);
      setScrollProgress(nextProgress);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleBurgerClick = () => {
    setMenuOpen((prev) => !prev);
    setScrollMeterActive((prev) => !prev);
  };

  return (
    <header
      className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}
      data-testid="site-header"
    >
      <div className="site-header__inner">
        <a href="#inicio" className="site-header__logo" data-testid="header-logo" aria-label="Ir a inicio">
          <img src={logoUrl} alt="Match&Live" className="site-header__logo-img" />
        </a>

        <a href="#inicio" className="site-header__logo-text" data-testid="header-logo-text">
          Match&Live
        </a>

        <nav className={`site-header__nav ${menuOpen ? 'is-open' : ''}`} data-testid="header-nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="site-header__link"
              data-testid={`nav-link-${link.href.slice(1)}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          {!loading && user ? (
            <Link to="/dashboard" className="site-header__user" data-testid="header-user-button">
              <span className="site-header__user-avatar">{(user.name || 'U').charAt(0).toUpperCase()}</span>
              <span className="site-header__user-name">{user.name}</span>
            </Link>
          ) : (
            <>
              <Link to="/login" className="site-header__login" data-testid="header-login-button">Entrar</Link>
              <Link to="/register" className="site-header__cta" data-testid="header-cta-button">Regístrate</Link>
            </>
          )}

          <button
            className={`site-header__burger ${menuOpen ? 'is-open' : ''}`}
            onClick={handleBurgerClick}
            data-testid="header-burger-button"
            aria-label="Menu"
            aria-pressed={scrollMeterActive}
          >
            <span className="site-header__burger-line" />
            <span className="site-header__burger-line" />
            <span className="site-header__burger-line" />
            <span
              className={`site-header__burger-meter ${scrollMeterActive ? 'is-active' : ''}`}
              style={{ '--scroll-progress': scrollProgress }}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </header>
  );
}



