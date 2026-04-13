import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

import logoUrl from '../assets/match-live-logo.svg';

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="header-burger-button"
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <style>{`
        .site-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 16px 0;
          transition: background 0.35s ease, box-shadow 0.35s ease, padding 0.35s ease;
        }
        .site-header--scrolled {
          background: rgba(244, 239, 232, 0.88);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: 0 4px 32px rgba(49, 30, 19, 0.08);
          padding: 8px 0;
        }
        .site-header__inner {
          display: grid;
          grid-template-columns: auto 1fr auto auto;
          align-items: center;
          gap: 16px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .site-header__logo {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          text-decoration: none;
          z-index: 1001;
        }
        .site-header__logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          transition: transform 0.3s ease;
        }
        .site-header__logo:hover .site-header__logo-img {
          transform: scale(1.06) rotate(-2deg);
        }
        .site-header__logo-text {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--color-text);
          letter-spacing: -0.02em;
          text-decoration: none;
          white-space: nowrap;
        }
        .site-header__nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .site-header__link {
          position: relative;
          padding: 8px 16px;
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--color-muted);
          text-decoration: none;
          border-radius: var(--radius-pill);
          transition: color 0.25s ease, background 0.25s ease;
        }
        .site-header__link:hover {
          color: var(--color-text);
          background: rgba(232, 139, 139, 0.1);
        }
        .site-header__actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
        }
        .site-header__cta {
          display: inline-flex;
          align-items: center;
          padding: 11px 24px;
          font-size: 0.9rem;
          font-weight: 700;
          color: #fff;
          background: var(--color-accent);
          border-radius: var(--radius-pill);
          text-decoration: none;
          transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 4px 16px rgba(232, 139, 139, 0.35);
        }
        .site-header__cta:hover {
          transform: translateY(-2px);
          background: var(--color-accent-dark);
          box-shadow: 0 8px 24px rgba(232, 139, 139, 0.4);
        }
        .site-header__login {
          padding: 11px 20px;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-text);
          text-decoration: none;
          border-radius: var(--radius-pill);
          transition: background 0.2s ease;
        }
        .site-header__login:hover {
          background: rgba(232, 139, 139, 0.1);
        }
        .site-header__user {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px 6px 6px;
          background: rgba(255,255,255,0.6);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-pill);
          text-decoration: none;
          transition: background 0.2s, box-shadow 0.2s;
        }
        .site-header__user:hover {
          background: rgba(255,255,255,0.9);
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
        }
        .site-header__user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.82rem;
          font-weight: 800;
          color: #fff;
          background: linear-gradient(135deg, var(--color-accent), var(--color-green));
        }
        .site-header__user-name {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--color-text);
        }
        .site-header__burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 8px;
          z-index: 1001;
        }
        .site-header__burger span {
          display: block;
          width: 22px;
          height: 2px;
          background: var(--color-text);
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .site-header__burger.is-open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .site-header__burger.is-open span:nth-child(2) {
          opacity: 0;
        }
        .site-header__burger.is-open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        @media (max-width: 960px) {
          .site-header__inner {
            grid-template-columns: auto 1fr auto;
          }
          .site-header__nav {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .site-header__inner {
            grid-template-columns: 46px 1fr auto;
            padding: 0 16px;
            gap: 10px;
          }
          .site-header__burger {
            display: flex;
          }
          .site-header__logo {
            width: 42px;
            height: 42px;
          }
          .site-header__logo-text {
            text-align: center;
            justify-self: center;
            font-size: 1.05rem;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .site-header__nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 12px;
            background: rgba(244, 239, 232, 0.97);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            opacity: 0;
            pointer-events: none;
            transform: scale(0.96);
            transition: opacity 0.3s ease, transform 0.3s ease;
          }
          .site-header__nav.is-open {
            opacity: 1;
            pointer-events: auto;
            transform: scale(1);
          }
          .site-header__nav .site-header__link {
            font-size: 1.35rem;
            padding: 14px 28px;
          }
          .site-header__cta,
          .site-header__login,
          .site-header__user-name {
            display: none;
          }
          .site-header__actions {
            gap: 8px;
          }
          .site-header__user {
            padding-right: 6px;
          }
        }
      `}</style>
    </header>
  );
}

