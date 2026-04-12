import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Lucia G.',
    role: 'Estudiante Erasmus',
    city: 'Barcelona',
    avatar: 'LG',
    text: 'Encontre piso en Barcelona en menos de una semana. La experiencia de swipe hace que buscar habitacion sea hasta divertido. Mis compis son geniales.',
    stars: 5,
  },
  {
    id: 2,
    name: 'Carlos M.',
    role: 'Diseñador freelance',
    city: 'Madrid',
    avatar: 'CM',
    text: 'Llevaba meses buscando algo decente en Malasaña. Con Match&Live di con un piso compartido perfecto para trabajar en remoto. Super recomendable.',
    stars: 5,
  },
  {
    id: 3,
    name: 'Ana R.',
    role: 'Enfermera',
    city: 'Valencia',
    avatar: 'AR',
    text: 'Lo mejor es que puedes ver el perfil de tus futuros compañeros antes de decidir. Nada de sorpresas. Ahora vivo con gente que comparte mi ritmo.',
    stars: 5,
  },
  {
    id: 4,
    name: 'Pablo S.',
    role: 'Ingeniero de software',
    city: 'Sevilla',
    avatar: 'PS',
    text: 'La interfaz es super intuitiva y los filtros funcionan genial. En dos dias ya tenia tres opciones buenas. Al final elegi un piso en Triana que me encanta.',
    stars: 4,
  },
];

function StarIcon({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? '#E88B8B' : 'none'} stroke="#E88B8B" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section className="testimonials" id="testimonios" data-testid="testimonials-section">
      <div className="testimonials__inner">
        <div className="testimonials__header">
          <span className="testimonials__eyebrow">Historias reales</span>
          <h2 className="testimonials__title" data-testid="testimonials-title">Lo que dicen nuestros usuarios</h2>
          <p className="testimonials__subtitle">
            Mas de 850 personas ya han encontrado su compañero de piso ideal con Match&Live.
          </p>
        </div>

        <div className="testimonials__grid">
          {testimonials.map((t) => (
            <article key={t.id} className="testimonial-card" data-testid={`testimonial-card-${t.id}`}>
              <div className="testimonial-card__stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} filled={i < t.stars} />
                ))}
              </div>
              <p className="testimonial-card__text">"{t.text}"</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">{t.avatar}</div>
                <div>
                  <p className="testimonial-card__name">{t.name}</p>
                  <p className="testimonial-card__meta">{t.role} · {t.city}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials {
          padding: 80px 24px 100px;
        }
        .testimonials__inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .testimonials__header {
          text-align: center;
          margin-bottom: 56px;
        }
        .testimonials__eyebrow {
          display: inline-block;
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-green-dark);
          margin-bottom: 12px;
        }
        .testimonials__title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 14px;
        }
        .testimonials__subtitle {
          font-size: 1.05rem;
          color: var(--color-muted);
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.65;
        }
        .testimonials__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        .testimonial-card {
          padding: 32px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-xl);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-soft);
        }
        .testimonial-card__stars {
          display: flex;
          gap: 3px;
          margin-bottom: 16px;
        }
        .testimonial-card__text {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--color-text);
          margin-bottom: 24px;
          font-style: italic;
        }
        .testimonial-card__author {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .testimonial-card__avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 800;
          color: #fff;
          background: linear-gradient(135deg, var(--color-accent), var(--color-green));
        }
        .testimonial-card__name {
          font-weight: 700;
          font-size: 0.95rem;
        }
        .testimonial-card__meta {
          font-size: 0.82rem;
          color: var(--color-muted);
          margin-top: 2px;
        }

        @media (max-width: 768px) {
          .testimonials__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
