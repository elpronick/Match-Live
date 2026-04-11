# Match-Live

Base de una app tipo Tinder de pisos montada con Vite y JavaScript vanilla.

La idea es aprender paso a paso con una estructura sencilla ahora, pero dejando el proyecto preparado para que mas adelante se pueda migrar a React sin empezar desde cero.

## Estructura

- `index.html`: punto de entrada del proyecto
- `src/main.js`: pinta la interfaz principal
- `src/style.css`: estilos base de la app
- `src/data/properties.js`: datos mock de pisos
- `src/modules/`: modulos reutilizables para render y swipe
- `public/`: recursos publicos de Vite

## Scripts

- `npm run dev`: arranca el servidor de desarrollo
- `npm run build`: genera la version de produccion
- `npm run preview`: previsualiza la build final

## Deploy

GitHub Pages publica la carpeta `dist` mediante el workflow [deploy-pages.yml](C:/Users/usu/Documents/Proyectos%20CSS/Match-Live/.github/workflows/deploy-pages.yml) cada vez que haces push a `main`.
