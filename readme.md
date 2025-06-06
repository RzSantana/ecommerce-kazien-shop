# 🥋 Kaizen Shop - Martial Arts E-commerce

> **Kaizen Philosophy**: Everything you need to evolve into your martial art

Un e-commerce moderno especializado en artes marciales con sistema de drops, carrito inteligente y panel de administración completo.

## ✨ Características Principales

- 🛍️ **E-commerce Completo**: Catálogo de productos, carrito, checkout y órdenes
- 🎯 **Sistema de Drops**: Colecciones temáticas limitadas con productos exclusivos
- 🔐 **Autenticación Dual**: Google OAuth + credenciales locales
- 👤 **Gestión de Usuarios**: Perfiles, roles (user/admin) y configuración de cuenta
- 🛒 **Carrito Inteligente**: Persistencia local + sincronización con usuario autenticado
- ⚡ **Panel Admin**: Gestión completa de productos, categorías, usuarios y colecciones
- 🎨 **UI Moderna**: Diseño responsive con Tailwind CSS y componentes reutilizables
- 🔍 **Búsqueda Avanzada**: Filtros por categoría, precio, y búsqueda de texto
- 📱 **Responsive**: Optimizado para mobile, tablet y desktop

## 🚀 Tecnologías

### Frontend
- **Framework**: [Astro](https://astro.build/) v5.8.0
- **UI Library**: [React](https://reactjs.org/) v19.1.0
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4.1.7
- **Icons**: [FontAwesome](https://fontawesome.com/)
- **Sliders**: [Swiper](https://swiperjs.com/)
- **Authentication**: [Auth.js](https://authjs.dev/)

### Backend
- **Runtime**: [Bun](https://bun.sh/)
- **Framework**: [Hono](https://hono.dev/) v4.7.10
- **Database**: MySQL + [Prisma ORM](https://prisma.io/) v6.8.2
- **Logging**: Sistema personalizado con colores (Chalk)

## 📁 Estructura del Proyecto

```
kaizen-shop/
├── frontend/                 # Aplicación Astro + React
│   ├── src/
│   │   ├── components/      # Componentes React reutilizables
│   │   │   ├── ui/         # Componentes base (Button, Input, etc.)
│   │   │   ├── admin/      # Componentes del panel de administración
│   │   │   ├── auth/       # Formularios de autenticación
│   │   │   ├── cart/       # Gestión del carrito
│   │   │   └── product/    # Componentes de productos
│   │   ├── layouts/        # Layouts de Astro
│   │   ├── pages/          # Páginas y rutas
│   │   ├── services/       # Servicios y API clients
│   │   ├── types/          # Definiciones de TypeScript
│   │   └── utils/          # Utilidades y helpers
│   ├── auth.config.mjs     # Configuración de Auth.js
│   └── astro.config.mjs    # Configuración de Astro
├── backend/                 # API REST con Hono
│   ├── src/
│   │   ├── features/       # Módulos por funcionalidad
│   │   │   ├── auth/       # Autenticación y usuarios
│   │   │   ├── product/    # Gestión de productos
│   │   │   ├── category/   # Categorías
│   │   │   ├── drop/       # Sistema de drops
│   │   │   ├── cart/       # Carrito de compras
│   │   │   └── admin/      # Funciones de administración
│   │   ├── utils/          # Utilidades y middleware
│   │   ├── database/       # Gestión de base de datos
│   │   └── RouterManager.ts # Configuración de rutas
│   ├── prisma/
│   │   └── schema.prisma   # Esquema de base de datos
│   └── package.json
└── README.md
```

## 🔧 Instalación y Configuración

### Prerequisitos
- **Node.js** v18+ o **Bun** v1.0+
- **MySQL** 8.0+
- **Git**

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/kaizen-shop.git
cd kaizen-shop
```

### 2. Configurar Backend

```bash
cd backend

# Instalar dependencias
bun install

# Configurar variables de entorno
cp .env.example .env
```

**Variables de entorno del backend (.env):**
```env
# Base de datos
DATABASE_URL="mysql://root:root@localhost:3306/kaizen_shop_db"

# Servidor
NODE_ENV=development
API_PORT=3000
```

### 3. Configurar Base de Datos

```bash
# Crear base de datos
mysql -u root -p -e "CREATE DATABASE kaizen_shop_db;"

# Generar cliente Prisma
bun run db:generate

# Ejecutar migraciones
bun run db:push

# Poblar con datos de ejemplo
bun run db:seed
```

### 4. Configurar Frontend

```bash
cd ../frontend

# Instalar dependencias
bun install

# Configurar variables de entorno
cp .env.example .env.local
```

**Variables de entorno del frontend (.env.local):**
```env
# API Backend
PUBLIC_API_URL=http://localhost:3000

# Auth.js
AUTH_SECRET=tu-secreto-super-seguro-aqui
NEXTAUTH_URL=http://localhost:4321

# Google OAuth (opcional)
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret
```

### 5. Iniciar el Proyecto

```bash
# Terminal 1: Backend
cd backend
bun run dev

# Terminal 2: Frontend
cd frontend
bun run dev
```

**Accesos:**
- 🌐 **Frontend**: http://localhost:4321
- 🔌 **API**: http://localhost:3000
- 📊 **Prisma Studio**: `bun run db:studio`

## 👥 Usuarios por Defecto

Después del seed, tendrás estos usuarios:

### Administrador
- **Email**: `admin@kaizenshop.com`
- **Password**: `admin123`
- **Rol**: Admin (acceso completo)

### Usuarios de Prueba
- **Email**: `fighter1@example.com` / **Password**: `fighter123`
- **Email**: `sensei@example.com` / **Password**: `sensei123`
- **Email**: `athlete@example.com` / **Password**: `athlete123`

## 📊 Scripts Disponibles

### Backend
```bash
bun run dev          # Servidor de desarrollo
bun run db:generate  # Generar cliente Prisma
bun run db:push      # Aplicar schema a BD
bun run db:migrate   # Crear migración
bun run db:reset     # Resetear BD
bun run db:seed      # Poblar datos de ejemplo
bun run db:studio    # Abrir Prisma Studio
```

### Frontend
```bash
bun run dev         # Servidor de desarrollo
bun run build       # Build de producción
bun run preview     # Preview del build
```

## 🛠️ API Endpoints

### Autenticación
```http
POST /api/auth/register        # Registro de usuario
POST /api/auth/login          # Login con credenciales
GET  /api/auth/me             # Información del usuario actual
PUT  /api/auth/profile        # Actualizar perfil
PUT  /api/auth/change-password # Cambiar contraseña
DELETE /api/auth/account      # Eliminar cuenta
```

### Productos
```http
GET    /api/products                    # Listar productos
GET    /api/products/:id               # Obtener producto
GET    /api/products/search?q=...      # Buscar productos
GET    /api/products/category/:id      # Productos por categoría
POST   /api/products                   # Crear producto (Admin)
PUT    /api/products/:id              # Actualizar producto (Admin)
DELETE /api/products/:id              # Eliminar producto (Admin)
```

### Carrito
```http
GET    /api/cart                # Obtener carrito
POST   /api/cart/items         # Agregar al carrito
PUT    /api/cart/items/:id     # Actualizar cantidad
DELETE /api/cart/items/:id     # Remover del carrito
DELETE /api/cart               # Vaciar carrito
```

### Drops (Colecciones)
```http
GET    /api/drops              # Listar drops
GET    /api/drops/active       # Drops activos
GET    /api/drops/:id          # Obtener drop
POST   /api/drops              # Crear drop (Admin)
PUT    /api/drops/:id          # Actualizar drop (Admin)
DELETE /api/drops/:id          # Eliminar drop (Admin)
```

### Administración
```http
GET    /api/admin/dashboard    # Estadísticas (Admin)
GET    /api/admin/users        # Listar usuarios (Admin)
PUT    /api/admin/users/:id/role # Cambiar rol (Admin)
DELETE /api/admin/users/:id    # Eliminar usuario (Admin)
```

## 🎯 Funcionalidades Clave

### Sistema de Drops
- Colecciones temáticas con productos exclusivos
- Estados: `ACTIVE`, `COMING_SOON`, `ENDED`
- Personalización de colores y banners
- Productos limitados con precios especiales

### Carrito Inteligente
- **Usuario no autenticado**: Persistencia en localStorage
- **Usuario autenticado**: Sincronización con base de datos
- **Migración automática**: Al autenticarse, carrito local se migra al servidor

### Panel de Administración
- Dashboard con estadísticas en tiempo real
- CRUD completo de productos y categorías
- Gestión de usuarios y roles
- Administración de drops y asignación de productos

### Autenticación Robusta
- **Multi-provider**: Google OAuth + credenciales locales
- **Gestión de perfiles**: Cambio de datos, contraseña y eliminación de cuenta
- **Middleware de seguridad**: Protección de rutas admin

## 🚀 Deployment

### Variables de Producción
```env
# Backend
DATABASE_URL="mysql://user:pass@host:port/db"
NODE_ENV=production
API_PORT=3000

# Frontend
PUBLIC_API_URL=https://tu-api.com
AUTH_SECRET=secreto-super-seguro-produccion
NEXTAUTH_URL=https://tu-frontend.com
```

### Comandos de Deploy
```bash
# Backend
bun run db:migrate
bun run build

# Frontend
bun run build
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

### Convenciones de Código
- **TypeScript** en todo el proyecto
- **ESLint + Prettier** para formateo
- **Conventional Commits** para mensajes
- **Componentes funcionales** con hooks
- **Servicios separados** para lógica de negocio

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

**Carlos M. Rodríguez Santana**
- 🐱 GitHub: [@tu-usuario](https://github.com/tu-usuario)
- 📧 Email: tu-email@ejemplo.com

---

<div align="center">
  <strong>🥋 Kaizen Philosophy: Continuous Improvement</strong>
  <br>
  <sub>Built with ❤️ for martial arts enthusiasts</sub>
</div>
