# Match&Live - PRD

## Problema Original
Landing page de Match&Live con swipe de pisos. Iteración 2: Sistema de autenticación JWT con perfil completo y dashboard de usuario.

## Arquitectura
- **Frontend**: React 18 + react-router-dom + axios en `/app/frontend`
- **Backend**: FastAPI + JWT auth + MongoDB en `/app/backend`
- **DB**: MongoDB (motor async) - collections: users, login_attempts, password_reset_tokens, saved_properties
- **Hosting**: Supervisor-managed, preview URL: https://961407ad-1eff-4325-8efb-9cfdf7915488.preview.emergentagent.com

## Tareas Completadas

### Iteración 1 (12 Abril 2026)
- [x] Header sticky con logo, navegación, CTA
- [x] Hero section, Cómo funciona, Deck de pisos con swipe, Testimonios, Footer

### Iteración 2 (12 Abril 2026)
- [x] JWT Authentication (email+password) con httpOnly cookies
- [x] Registro con perfil completo (nombre, email, ciudad, presupuesto, estilo de vida, descripción)
- [x] Login con brute force protection (5 intentos = 15min lockout)
- [x] Dashboard de usuario con sidebar, tabs (Perfil, Guardados)
- [x] Edición de perfil completa
- [x] Sistema de guardar/eliminar pisos favoritos
- [x] Header dinámico (Entrar/Registrate vs avatar de usuario)
- [x] Botón "Guardar" funcional en tarjetas de pisos
- [x] Forgot/Reset password endpoints
- [x] Admin seeding automático
- [x] Token refresh endpoint

## Backlog Priorizado
### P0
- [ ] Integración con backend real (búsqueda, filtrado dinámico desde DB)

### P1
- [ ] Chat entre matches
- [ ] Notificaciones
- [ ] Subida de fotos de perfil

### P2
- [ ] Mapa interactivo
- [ ] Multi-idioma
- [ ] Sistema de reviews
