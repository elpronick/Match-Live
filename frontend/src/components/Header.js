import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import loginIconUrl from '../assets/login.svg';
import logoUrl from '../assets/match-live-logo.svg';
import './Header.scss';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Pisos', href: '#pisos' },
  { label: 'Testimonios', href: '#testimonios' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [authMenuOpen, setAuthMenuOpen] = useState(false);
  const [scrollMeterActive, setScrollMeterActive] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const authMenuRef = useRef(null);

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
      if (!authMenuRef.current?.contains(event.target)) {
        setAuthMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const handleBurgerClick = () => {
    setMenuOpen((prev) => !prev);
    setScrollMeterActive((prev) => !prev);
    setAuthMenuOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setScrollMeterActive(false);
    setAuthMenuOpen(false);
  };

  return (
    <header
      className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}
      data-testid="site-header"
    >
      <div className="site-header__inner">
        <a href="#inicio" className="site-header__brand" data-testid="header-brand" aria-label="Ir a inicio">
          <span className="site-header__logo">
            <img src={logoUrl} alt="Match&Live" className="site-header__logo-img" />
          </span>
          <span className="site-header__logo-text" data-testid="header-logo-text">
            Match&Live
          </span>
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
          <div className="site-header__nav-auth" data-testid="header-mobile-auth">
            <Link
              to="/login"
              className="site-header__nav-auth-link"
              data-testid="header-mobile-login-button"
              onClick={closeMenu}
            >
              Inicio sesión
            </Link>
            <Link
              to="/register"
              className="site-header__nav-auth-link site-header__nav-auth-link--cta"
              data-testid="header-mobile-register-button"
              onClick={closeMenu}
            >
              Registro
            </Link>
          </div>
        </nav>

        <div className="site-header__actions" ref={authMenuRef}>
          <button
            type="button"
            className={`site-header__auth-trigger ${authMenuOpen ? 'is-open' : ''}`}
            data-testid="header-auth-trigger"
            aria-label="Abrir acceso"
            aria-expanded={authMenuOpen}
            onClick={() => setAuthMenuOpen((prev) => !prev)}
          >
            <img src={loginIconUrl} alt="" className="site-header__auth-icon" aria-hidden="true" />
            <span>Acceso</span>
          </button>

          <div className={`site-header__auth-panel ${authMenuOpen ? 'is-open' : ''}`} data-testid="header-auth-panel">
            <Link to="/login" className="site-header__auth-link" data-testid="header-login-button" onClick={closeMenu}>
              Iniciar sesión
            </Link>
            <Link to="/register" className="site-header__auth-link site-header__auth-link--cta" data-testid="header-cta-button" onClick={closeMenu}>
              Registro
            </Link>
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



