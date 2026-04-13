import React from 'react';
import './Testimonials.scss';
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
    </section>
  );
}


