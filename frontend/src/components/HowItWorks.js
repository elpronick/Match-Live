import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Define tu perfil',
    description: 'Indica tu presupuesto, zona preferida, estilo de vida y lo que buscas en tus compañeros de piso.',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Haz swipe',
    description: 'Navega por habitaciones y pisos como si fuera un juego. Desliza para pasar o guardar tus favoritas.',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Conecta',
    description: 'Cuando hay match mutuo, se abre el chat. Conoce a tus futuros compis antes de decidir.',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Mudate',
    description: 'Firma el contrato, recoge las llaves y empieza tu nueva vida con la gente que elegiste.',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="how-section" id="como-funciona" data-testid="how-it-works-section">
      <div className="how-section__inner">
        <div className="how-section__header">
          <span className="how-section__eyebrow" data-testid="how-eyebrow">Proceso simple</span>
          <h2 className="how-section__title" data-testid="how-title">Como funciona</h2>
          <p className="how-section__subtitle">
            En cuatro pasos sencillos estaras disfrutando de tu nuevo hogar con la gente perfecta.
          </p>
        </div>
        <div className="how-section__grid">
          {steps.map((step, i) => (
            <article
              key={step.number}
              className="how-card"
              data-testid={`how-card-${step.number}`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="how-card__icon">{step.icon}</div>
              <span className="how-card__number">{step.number}</span>
              <h3 className="how-card__title">{step.title}</h3>
              <p className="how-card__desc">{step.description}</p>
              {i < steps.length - 1 && <div className="how-card__connector" aria-hidden="true" />}
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .how-section {
          padding: 80px 24px 100px;
        }
        .how-section__inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .how-section__header {
          text-align: center;
          margin-bottom: 64px;
        }
        .how-section__eyebrow {
          display: inline-block;
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin-bottom: 12px;
        }
        .how-section__title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 14px;
        }
        .how-section__subtitle {
          font-size: 1.05rem;
          color: var(--color-muted);
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.65;
        }
        .how-section__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          position: relative;
        }
        .how-card {
          position: relative;
          padding: 32px 24px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .how-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-soft);
        }
        .how-card__icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 16px;
          color: #fff;
          background: linear-gradient(135deg, var(--color-accent), var(--color-green));
          margin-bottom: 20px;
        }
        .how-card__number {
          display: block;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: var(--color-accent);
          margin-bottom: 8px;
        }
        .how-card__title {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .how-card__desc {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--color-muted);
        }
        .how-card__connector {
          display: none;
        }

        @media (max-width: 900px) {
          .how-section__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .how-section__grid {
            grid-template-columns: 1fr;
          }
          .how-section { padding: 60px 24px 80px; }
        }
      `}</style>
    </section>
  );
}
