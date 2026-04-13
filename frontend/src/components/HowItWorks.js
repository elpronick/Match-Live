import React from 'react';
import './HowItWorks.scss';
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
    </section>
  );
}


