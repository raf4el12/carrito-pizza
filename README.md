# Carrito Pizza - E-commerce de Pizzería

Sistema completo de e-commerce para pizzería con gestión de pedidos en tiempo real, panel de administración y experiencia de compra optimizada.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.3.1-61dafb.svg)

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Arquitectura](#arquitectura)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Scripts Disponibles](#scripts-disponibles)
- [API Endpoints](#api-endpoints)
- [Modelo de Datos](#modelo-de-datos)
- [Buenas Prácticas](#buenas-prácticas)
- [Contribución](#contribución)

## Características

### Cliente (E-commerce)
- **Carrito de Compras** - Gestión completa con persistencia en base de datos
- **Menú Interactivo** - Visualización de productos por categorías
- **Flujo de Checkout** - Proceso de compra en 4 pasos (Carrito → Entrega → Pago → Confirmación)
- **Sistema de Reseñas** - Valoraciones y comentarios de productos
- **Autenticación JWT** - Login seguro con tokens

### Administración
- **Dashboard** - Estadísticas en tiempo real (pedidos, ingresos, productos)
- **Gestión de Pedidos** - Estados, asignación de repartidores, historial
- **CRUD Productos** - Gestión completa con variantes (tamaños, masas, ingredientes)
- **Gestión de Usuarios** - Roles (cliente, administrador, repartidor)
- **Categorías e Ingredientes** - Organización del menú
- **Moderación de Reseñas** - Aprobación/rechazo de valoraciones

## Tecnologías

### Frontend
| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| React | 18.3.1 | Librería UI |
| TypeScript | 5.6.2 | Tipado estático |
| Vite | 5.4.9 | Build tool y dev server |
| TailwindCSS | 4.1.10 | Framework CSS utility-first |
| Material UI | 6.1.5 | Componentes UI |
| TanStack Query | 5.59.16 | Estado del servidor y caché |
| TanStack Table | 8.21.3 | Tablas con sorting/filtering/pagination |
| React Hook Form | 7.59.0 | Manejo de formularios |
| Zod | 3.25.67 | Validación de esquemas |
| React Router | 6.27.0 | Enrutamiento SPA |

### Backend
| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| Node.js | ≥18.0.0 | Runtime JavaScript |
| Express | 5.1.0 | Framework HTTP |
| Prisma | 6.18.0 | ORM para base de datos |
| MySQL | 8.x | Base de datos relacional |
| JWT | 9.0.2 | Autenticación con tokens |
| Bcrypt | 6.0.0 | Hash de contraseñas |
| Multer | 2.0.2 | Upload de archivos |

### Herramientas de Desarrollo
| Herramienta | Uso |
|-------------|-----|
| Biome | Linting y formateo |
| Nodemon | Hot reload en desarrollo |
| Docker | Containerización (MySQL) |

## Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   Pages     │  │  Components │  │   Hooks     │              │
│  │  (Routes)   │──│    (UI)     │──│  (Logic)    │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│         │                │                │                      │
│         └────────────────┼────────────────┘                      │
│                          ▼                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Services (API Client)                   │  │
│  │              TanStack Query + Axios/Fetch                  │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼ HTTP/REST
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND (Express)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   Routes    │──│ Controllers │──│  UseCases   │              │
│  │  (Endpoints)│  │ (Handlers)  │  │  (Business) │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│                                           │                      │
│  ┌─────────────┐  ┌─────────────┐         │                      │
│  │   DTOs      │  │  Helpers    │─────────┘                      │
│  │(Validation) │  │ (Utilities) │                                │
│  └─────────────┘  └─────────────┘                                │
│                          │                                       │
│                          ▼                                       │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Prisma ORM                              │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
                    ┌─────────────────┐
                    │      MySQL      │
                    │    Database     │
                    └─────────────────┘
```

### Patrones de Diseño Utilizados

- **MVC (Backend)**: Separación de rutas, controladores y lógica de negocio
- **Repository Pattern**: Prisma como capa de abstracción de datos
- **Service Layer**: UseCases encapsulan la lógica de negocio
- **DTO Pattern**: Validación de datos de entrada/salida
- **Custom Hooks (Frontend)**: Encapsulación de lógica reutilizable
- **Compound Components**: Componentes compuestos en UI

## Estructura del Proyecto

```
carrito-pizza/
├── client/                          # Frontend React
│   ├── src/
│   │   ├── components/              # Componentes reutilizables
│   │   │   ├── auth/                # Autenticación
│   │   │   ├── cart/                # Carrito de compras
│   │   │   ├── checkout/            # Flujo de pago
│   │   │   ├── commons/             # Componentes compartidos
│   │   │   ├── layout/              # Layouts (Main, Admin, Auth)
│   │   │   ├── menu/                # Menú de productos
│   │   │   ├── orders/              # Gestión de pedidos
│   │   │   ├── products/            # CRUD de productos
│   │   │   ├── users/               # Gestión de usuarios
│   │   │   └── [module]/
│   │   │       ├── components/      # Subcomponentes
│   │   │       └── hooks/           # Hooks del módulo
│   │   ├── context/                 # React Context (Auth, Cart)
│   │   ├── hook/                    # Hooks globales (React Query)
│   │   ├── pages/                   # Páginas/Rutas
│   │   ├── shared/                  # Utilidades compartidas
│   │   │   └── services/            # API services
│   │   ├── styles/                  # Estilos globales
│   │   ├── types/                   # TypeScript types + Zod schemas
│   │   └── router.tsx               # Configuración de rutas
│   └── package.json
│
├── server/                          # Backend Express
│   ├── prisma/
│   │   ├── schema.prisma            # Modelo de datos
│   │   └── context.js               # Prisma client
│   ├── src/
│   │   ├── auth/                    # Módulo de autenticación
│   │   ├── middlewares/             # Auth, Error handling
│   │   ├── modules/                 # Módulos de negocio
│   │   │   ├── [module]/
│   │   │   │   ├── [module].controller.js
│   │   │   │   ├── [module].usecase.js
│   │   │   │   ├── [module].routes.js
│   │   │   │   ├── [module].dto.js
│   │   │   │   └── helpers/         # Validators, parsers
│   │   │   ├── carrito/
│   │   │   ├── categories/
│   │   │   ├── ingredients/
│   │   │   ├── pedidos/
│   │   │   ├── products/
│   │   │   ├── reviews/
│   │   │   └── users/
│   │   ├── shared/                  # Utilidades compartidas
│   │   ├── router.js                # Configuración de rutas
│   │   └── index.js                 # Entry point
│   ├── docker-compose.yml           # MySQL container
│   └── package.json
│
└── README.md
```

## Instalación

### Prerrequisitos

- Node.js ≥ 18.0.0
- npm o yarn
- Docker (para MySQL) o MySQL instalado localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/raf4el12/carrito-pizza.git
cd carrito-pizza
```

### 2. Configurar Backend

```bash
cd server

# Instalar dependencias
npm install

# Copiar variables de entorno
cp env.example .env

# Iniciar MySQL con Docker
docker-compose up -d

# Generar cliente Prisma
npm run generate

# Ejecutar migraciones
npm run migrate

# Iniciar servidor de desarrollo
npm run dev
```

### 3. Configurar Frontend

```bash
cd client

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### 4. Acceder a la aplicación

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Prisma Studio**: `npx prisma studio` (para explorar la BD)

## Variables de Entorno

### Backend (`server/.env`)

```env
# Database
DATABASE_URL="mysql://root:password@localhost:3306/carrito_pizza"

# JWT
JWT_SECRET="tu-secreto-super-seguro"
JWT_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV=development

# CORS
FRONTEND_URL="http://localhost:5173"
```

## Scripts Disponibles

### Frontend

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Compila para producción |
| `npm run preview` | Vista previa de producción |
| `npm run lint` | Ejecuta linter (Biome) |
| `npm run format` | Formatea código |
| `npm run tsc` | Verifica tipos TypeScript |

### Backend

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia con hot reload |
| `npm start` | Inicia en producción |
| `npm run generate` | Genera cliente Prisma |
| `npm run migrate` | Ejecuta migraciones |
| `npm run reset` | Resetea base de datos |
| `npm run lint` | Ejecuta linter (Biome) |

## API Endpoints

### Autenticación
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/login` | Iniciar sesión |
| POST | `/auth/register` | Registrar usuario |
| GET | `/auth/me` | Obtener usuario actual |

### Productos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/products` | Listar productos |
| GET | `/products/:id` | Obtener producto |
| POST | `/products` | Crear producto |
| PUT | `/products/:id` | Actualizar producto |
| DELETE | `/products/:id` | Eliminar producto |

### Carrito
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/carrito/:id_usuario` | Obtener carrito |
| POST | `/carrito/add` | Agregar item |
| PUT | `/carrito/update` | Actualizar cantidad |
| DELETE | `/carrito/:id_item` | Eliminar item |

### Pedidos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/pedidos/all` | Listar todos (admin) |
| GET | `/pedidos/:id` | Obtener pedido |
| POST | `/pedidos` | Crear pedido |
| PUT | `/pedidos/:id/estado` | Actualizar estado |
| PUT | `/pedidos/:id/repartidor` | Asignar repartidor |

## Modelo de Datos

### Entidades Principales

```
Usuarios ──────────┬───────── Pedidos
    │              │              │
    │              │              │
    ▼              │              ▼
Carrito            │        Detalle_Pedidos
    │              │              │
    ▼              │              ▼
Items_Carrito      │         Productos
    │              │              │
    │              │              ├──── Categorias
    │              │              │
    ▼              │              ├──── Tamanos
Ingredientes ◄─────┴──────────────┤
                                  ├──── Tipos_Masa
                                  │
                                  └──── Reseñas
```

### Roles de Usuario
- **cliente**: Compra productos, gestiona carrito, realiza pedidos
- **administrador**: Gestión completa del sistema
- **repartidor**: Visualiza y entrega pedidos asignados

### Estados de Pedido
`pendiente` → `confirmado` → `en_preparacion` → `en_camino` → `entregado`
                                                              ↓
                                                          `cancelado`

## Buenas Prácticas

### Frontend
- **TypeScript estricto** - Tipado en todo el código
- **Validación con Zod** - Schemas en `types/` para formularios y API
- **React Query** - Caché, invalidación y sincronización de datos
- **Separación de concerns** - Hooks para lógica, componentes para UI
- **Lazy loading** - Carga diferida de rutas
- **Error boundaries** - Manejo de errores en UI

### Backend
- **Arquitectura modular** - Cada módulo autocontenido
- **DTOs** - Validación de entrada en cada endpoint
- **Middleware de errores** - Manejo centralizado
- **Soft delete** - Eliminación lógica con `eliminado_en`
- **Índices DB** - Optimización de consultas frecuentes
- **Transacciones** - Operaciones atómicas en pedidos

### Seguridad
- **JWT con expiración** - Tokens con tiempo de vida limitado
- **Bcrypt** - Hash seguro de contraseñas
- **CORS configurado** - Restricción de orígenes
- **Roles y permisos** - Middleware de autorización

## Contribución

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'feat: descripción del cambio'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

### Convenciones de Commits

```
feat: nueva funcionalidad
fix: corrección de bug
refactor: refactorización de código
docs: documentación
style: formateo, sin cambios de lógica
test: añadir tests
chore: tareas de mantenimiento
```

## Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

---
