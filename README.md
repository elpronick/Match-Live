# Match-Live 🏠✨

> **«Primero personas, luego piso»** — Plataforma Fullstack de convivencia y emparejamiento de compañeros de piso (*Roommate Matching*).

[![Stack](https://img.shields.io/badge/Stack-PERN%20%2B%20TypeScript-blue?style=for-the-badge)](https://github.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Prisma_ORM-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

---

## 🎯 Visión y Propuesta de Valor

Los portales inmobiliarios tradicionales priorizan los metros cuadrados y el precio, ignorando el factor determinante para una convivencia exitosa: **la afinidad entre las personas**.

**Match-Live** invierte el proceso convencional:
1. **Conoce a tus compañeros primero**: Explora perfiles con hábitos, horarios, estilo de vida y rangos de presupuesto.
2. **Match por reciprocidad**: Al indicar interés por un perfil, el sistema comprueba la reciprocidad para formalizar una conexión.
3. **Desbloqueo de habitaciones**: Una vez confirmada la afinidad, se desbloquean las habitaciones compatibles para visitar y alquilar conjuntamente.
4. **Comunicación contextual**: Chat directo enfocado en la vivienda compartida seleccionada.

---

## 🏗️ Arquitectura del Sistema

La solución está construida sobre una arquitectura desacoplada **Fullstack PERN** con tipado estricto de extremo a extremo:

```mermaid
graph TD
    subgraph Client ["Frontend (React 19 + TypeScript + Vite)"]
        UI["Componentes UI & BEM SCSS"]
        Context["AuthContext & Custom Hooks"]
        AxiosClient["Axios con Interceptores JWT"]
    end

    subgraph API ["Backend API (Node.js + Express 5)"]
        Routes["API Routes"]
        Val["Zod Validation Middleware"]
        Controllers["Controllers"]
        Services["Service Layer (Business Logic)"]
    end

    subgraph Persistence ["Base de Datos"]
        Prisma["Prisma ORM Client"]
        Postgres[("PostgreSQL")]
    end

    UI --> Context
    Context --> AxiosClient
    AxiosClient -->|HTTP / REST| Routes
    Routes --> Val
    Val --> Controllers
    Controllers --> Services
    Services --> Prisma
    Prisma --> Postgres
```

---

## 🗄️ Modelo de Datos Relacional

Diseñado en **PostgreSQL** mediante **Prisma ORM**, estructurando usuarios, estilos de vida, viviendas, favoritos y emparejamiento recíproco:

```mermaid
erDiagram
    USER ||--o| PROFILE : "tiene"
    USER ||--o{ ROOM : "publica"
    USER ||--o{ SAVED_PROPERTY : "guarda"
    USER ||--o{ LIKE : "emite / recibe"
    USER ||--o{ MATCH : "participa"
    ROOM ||--o{ SAVED_PROPERTY : "es guardada en"

    USER {
        string id PK
        string email UK
        string password
        string name
        datetime createdAt
    }

    PROFILE {
        string id PK
        string userId FK
        string city
        int budget
        string lifestyle
        string description
        string avatarUrl
        int age
    }

    ROOM {
        string id PK
        string ownerId FK
        string title
        string description
        float price
        string location
        string imageUrl
        boolean isAvailable
    }

    LIKE {
        string id PK
        string fromUserId FK
        string toUserId FK
        datetime createdAt
    }

    MATCH {
        string id PK
        string user1Id FK
        string user2Id FK
        datetime createdAt
    }

    SAVED_PROPERTY {
        string id PK
        string userId FK
        string roomId FK
        datetime createdAt
    }
```

---

## 💻 Decisiones Técnicas Destacadas

* **Capa de Servicios Limpia (Clean Architecture)**: Desacoplamiento total entre controladores HTTP y la lógica de negocio (`AuthService`, `MarketplaceService`, `RoomService`, `ProfileService`, `SavedService`, `MessageService`).
* **Mensajería y Chat Persistente en Base de Datos**: Endpoint REST para envío y recuperación de historial de mensajes contextualizados por vivienda y emparejamiento.
* **Validación en Runtime con Zod**: Esquemas tipados con validación estricta para payloads de entrada (registro, inicio de sesión, actualización de perfil, creación de inmuebles y envío de mensajes).
* **Autenticación Dual (Invitado / Usuario Registrado)**: El marketplace permite exploración libre a visitantes anónimos y activa la persistencia de likes/matches relacionales en PostgreSQL cuando el usuario inicia sesión.
* **Seguridad**: Cifrado unidireccional de contraseñas mediante `bcrypt` y sesiones stateless con JSON Web Tokens (`JWT`).
* **Design System & SCSS Modular**: Arquitectura de estilos estructurada bajo metodología BEM (`abstracts/`, `base/`, `components/`, `layout/`, `pages/`, `themes/`).

---

## 🚀 Puesta en Marcha en Local

### Prerrequisitos
* [Node.js](https://nodejs.org/) (versión 20 o superior recomendada)
* [Docker Desktop](https://www.docker.com/) o una instancia de PostgreSQL en ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/elpronick/Match-Live.git
cd Match-Live
```

### 2. Iniciar la Base de Datos con Docker Compose
```bash
docker compose up -d
```
*(Esto levantará un contenedor de PostgreSQL en el puerto `5432` con volumen persistente).*

### 3. Configuración del Backend
```bash
cd backend
npm install

# Generar cliente de Prisma y sincronizar esquema
npx prisma db push

# Poblar la base de datos con usuarios y pisos de prueba
npx tsx prisma/seed.ts

# Iniciar servidor backend en desarrollo
npm run dev
```
El servidor backend se ejecutará en: `http://localhost:5000`

### 4. Configuración del Frontend
```bash
cd ../frontend
npm install

# Iniciar servidor de desarrollo con Vite
npm run dev
```
La aplicación web se ejecutará en: `http://localhost:5173`

---

## 👤 Credenciales de Demostración para Pruebas

Para evaluar la aplicación sin necesidad de registrar un nuevo usuario:

| Campo | Valor |
| :--- | :--- |
| **Email** | `demo@matchlive.com` |
| **Contraseña** | `123456` |
| **Perfil** | Usuario con perfil preconfigurado y match mutuo activo con *Laura García*. |

---

## 📂 Estructura del Proyecto

```text
Match-Live/
├── docker-compose.yml        # Configuración de PostgreSQL para desarrollo local
├── README.md                 # Documentación técnica del proyecto
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma     # Definición del esquema de datos relacional
│   │   └── seed.ts           # Script de datos iniciales realistas
│   └── src/
│       ├── controllers/      # Controladores HTTP (REST)
│       ├── db/               # Conexión y cliente de Prisma ORM
│       ├── middlewares/      # JWT Auth y Validación con Zod
│       ├── routes/           # Rutas modulares de Express
│       ├── schemas/          # Esquemas de validación Zod
│       ├── services/         # Capa de lógica de negocio (Clean Code)
│       └── index.ts          # Punto de entrada del servidor
└── frontend/
    └── src/
        ├── api/              # Cliente HTTP Axios e interceptores
        ├── components/       # Componentes React (Deck, ChatModal, etc.)
        ├── context/          # Gestión de estado global (AuthContext)
        ├── hooks/            # Custom Hooks (useDeck, useSavedProperties)
        ├── pages/            # Vistas (HomePage, Dashboard, Login, etc.)
        └── styles/           # SCSS modular estructurado con metodología BEM
```
