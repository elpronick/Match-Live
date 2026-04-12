import React, { useState, useEffect } from 'react';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_2c2465d1-108e-46f2-8f78-446c2974f0d1/artifacts/bkpp9zrl_match%26live.jpeg';

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Pisos', href: '#pisos' },
  { label: 'Testimonios', href: '#testimonios' },
];

export default function Header() {
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
        <a href="#inicio" className="site-header__logo" data-testid="header-logo">
          <img src={LOGO_URL} alt="Match&Live" className="site-header__logo-img" />
          <span className="site-header__logo-text">Match&Live</span>
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
          <a href="#pisos" className="site-header__cta" data-testid="header-cta-button">
            Explorar pisos
          </a>

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
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .site-header__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          z-index: 1001;
        }
        .site-header__logo-img {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          object-fit: cover;
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
        }
        .site-header__nav {
          display: flex;
          align-items: center;
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

        @media (max-width: 768px) {
          .site-header__burger {
            display: flex;
          }
          .site-header__nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
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
          .site-header__cta {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
