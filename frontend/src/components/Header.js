import React, { useEffect, useRef, useState } from 'react';
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
  const [sessionMenuOpen, setSessionMenuOpen] = useState(false);
  const [scrollMeterActive, setScrollMeterActive] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sessionMenuRef = useRef(null);

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

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!sessionMenuRef.current?.contains(event.target)) {
        setSessionMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const handleBurgerClick = () => {
    setMenuOpen((prev) => !prev);
    setScrollMeterActive((prev) => !prev);
    setSessionMenuOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setScrollMeterActive(false);
    setSessionMenuOpen(false);
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
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}

          {!loading && (
            <div className="site-header__nav-auth" data-testid="header-mobile-auth">
              {user ? (
                <Link
                  to="/dashboard"
                  className="site-header__nav-auth-link site-header__nav-auth-link--user"
                  onClick={closeMenu}
                >
                  Ir al dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="site-header__nav-auth-link"
                    data-testid="header-mobile-login-button"
                    onClick={closeMenu}
                  >
                    Entrar
                  </Link>
                  <Link
                    to="/register"
                    className="site-header__nav-auth-link site-header__nav-auth-link--cta"
                    data-testid="header-mobile-register-button"
                    onClick={closeMenu}
                  >
                    Regístrate
                  </Link>
                </>
              )}
            </div>
          )}
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

          <div className={`site-header__session-menu ${sessionMenuOpen ? 'is-open' : ''}`} ref={sessionMenuRef}>
            <button
              type="button"
              className="site-header__session-trigger"
              data-testid="header-session-trigger"
              aria-label="Abrir opciones de sesión"
              aria-expanded={sessionMenuOpen}
              onClick={() => setSessionMenuOpen((prev) => !prev)}
            >
              <span className="site-header__session-trigger-text">Sesion</span>
            </button>
            <div className="site-header__session-dropdown" data-testid="header-session-dropdown">
              <Link
                to="/login"
                className="site-header__session-option"
                data-testid="header-session-login"
                onClick={closeMenu}
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="site-header__session-option"
                data-testid="header-session-register"
                onClick={closeMenu}
              >
                Registrarse
              </Link>
            </div>
          </div>

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



