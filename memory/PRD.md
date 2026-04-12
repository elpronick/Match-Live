# Match&Live - PRD

## Problema Original
El usuario tenía un proyecto Vite vanilla JS con funcionalidad de swipe de pisos compartidos. Solicitó:
1. Añadir un header similar al de habitat-find.preview.emergentagent.com con logo y navegación
2. Añadir sección de testimonios
3. Añadir sección "Cómo funciona"
4. Sección "Encuentra tu compañero de piso" idéntica al estilo de referencia
5. Mantener el color de fondo que encaja con el logo (tonos melocotón/beige)

## Arquitectura
- **Frontend**: React 18 + CSS-in-JS (inline styles) en `/app/frontend`
- **Backend**: FastAPI (minimal, health endpoint) en `/app/backend`
- **Hosting**: Supervisor-managed, preview URL: https://961407ad-1eff-4325-8efb-9cfdf7915488.preview.emergentagent.com

## Tareas Completadas (12 Abril 2026)
- [x] Migración de Vite vanilla JS a React 18 CRA
- [x] Header sticky con logo Match&Live, navegación (Inicio, Cómo funciona, Pisos, Testimonios), CTA "Explorar pisos"
- [x] Hero section con título gradiente, CTAs, stats, y visual de tarjetas de propiedad
- [x] Sección "Cómo funciona" con 4 pasos (Define tu perfil, Haz swipe, Conecta, Múdate)
- [x] Sección de swipe de pisos con filtros, chips, presupuesto, y tarjetas de propiedades
- [x] Sección de testimonios con 4 opiniones, estrellas, y avatares
- [x] Footer con branding, enlaces de navegación, ciudades, y legal
- [x] Responsive design para móvil con menú hamburguesa
- [x] Backend FastAPI con endpoint de salud

## User Personas
- Estudiantes buscando piso compartido (Erasmus, universitarios)
- Jóvenes profesionales en remoto
- Personas relocalizándose a nuevas ciudades

## Requisitos Core
- Experiencia de swipe tipo Tinder para encontrar habitaciones
- Filtros por zona, presupuesto, y amenidades
- Tarjetas de propiedad con imágenes, precios, y detalles
- Navegación fluida entre secciones

## Backlog Priorizado
### P0
- [ ] Integración con backend real (búsqueda, filtrado desde DB)

### P1
- [ ] Sistema de autenticación (login/registro)
- [ ] Funcionalidad de guardar favoritos
- [ ] Chat entre matches

### P2
- [ ] Mapa interactivo de ubicaciones
- [ ] Notificaciones de nuevos pisos
- [ ] Sistema de reviews entre compañeros
- [ ] Multi-idioma

## Próximas Tareas
1. Conectar frontend con backend para datos dinámicos
2. Implementar autenticación de usuarios
3. Crear sistema de favoritos y matches
