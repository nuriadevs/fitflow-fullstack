
# 🏋️ FitFlow - Asistente de Fitness IA


<img  src="media/01.png"  alt="frontend"  width="600"  />

[![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=flat-square&logo=next.js)](https://nextjs.org/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/) [![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/) [![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?style=flat-square&logo=openai)](https://openai.com/)




## 🎯 Descripción General

**FitFlow** es una aplicación web de fitness que combina la inteligencia artificial con un chat que proporciona recomendaciones de ejercicios personalizados de fitness. Construida con Next.js 16+, TypeScript y ytukuza modelos de OpenAI, FitFlow ofrece una experiencia conversacional inteligente para entusiastas del fitness de todos los niveles.

La aplicación aprovecha la tecnología **RAG (Retrieval-Augmented Generation)** utilizando Upstash Vector Database para proporcionar recomendaciones de ejercicios precisas y contextualizadas basadas en un conjunto de datos fitness completo.

----------

## ✨ Características

#### 🤖 Asistente de Chat Impulsado por IA

#### 💪 Base de Datos de Ejercicios

#### 👤 Gestión de Usuarios

####  💬 Memoria de Conversación

#### 🎨 UI/UX Moderna


## 🛠 Stack Tecnológico

### Frontend

-   **Framework**: Next.js 16+ (App Router)
-   **Lenguaje**: TypeScript
-   **Estilos**: Tailwind 
-   **Componentes UI**: Biblioteca de componentes personalizada con shadcn/ui
-   **Gestión de Estado**: React Hooks
-   **Cliente HTTP**: Fetch API 

### Backend

-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Lenguaje**: TypeScript
-   **Autenticación**: JWT (JSON Web Tokens)
-   **Validación**: Esquemas Zod

### Base de Datos y Almacenamiento

-   **Base de Datos Principal**: MongoDB (Datos de usuario, mensajes, ejercicios)
-   **Base de Datos Vectorial**: Upstash Vector (Embeddings RAG)
-   **ODM**: Mongoose

### IA y Aprendizaje Automático

-   **Proveedor LLM**: OpenAI (GPT-4)
-   **Implementación RAG**: Implementación personalizada con Upstash
-   **Embeddings Vectoriales**: OpenAI Embeddings API
-   **Framework de Agente**: Agente de IA personalizado con integración de herramientas

### DevOps y Herramientas

-   **Gestor de Paquetes**: pnpm
-   **Pruebas**: Jest
-   **Pruebas de API**: Bruno
-   **Documentación de API**: Swagger/OpenAPI
-   **Desarrollo**: Nodemon, TypeScript Compiler
-   **Calidad de Código**: ESLint, Prettier


----------

## 📁 Estructura del Proyecto

### Backend

```
backend/
├── src/
│   ├── api/
│   │   ├── controllers/      # Lógica de negocio
│   │   ├── middlewares/      # Auth, validación, rate limiting
│   │   └── routes/           # Definición de endpoints
│   ├── config/               # Configuraciones (DB, OpenAI, CORS)
│   ├── models/               # Modelos de Mongoose
│   ├── schemas/              # Validación con Zod
│   ├── services/
│   │   ├── ai/              # Agente IA y herramientas
│   │   └── rag/             # Implementación RAG
│   ├── interfaces/          # Definiciones TypeScript
│   ├── types/               # Tipos personalizados
│   └── utils/               # Funciones utilitarias
├── tests/                   # Pruebas unitarias e integración
└── docs/                    # Documentación API (Bruno, Swagger)

```

### Frontend

```
frontend/
├── app/
│   ├── (auth)/             # Páginas de autenticación
│   │   ├── signin/
│   │   └── signup/
│   ├── (protected)/        # Páginas protegidas
│   │   ├── chat/
│   │   ├── dashboard/
│   │   └── exercises/
│   ├── api/                # Rutas API de Next.js
│   └── components/         # Componentes React
│       ├── ai-elements/    # Componentes de IA
│       ├── auth/           # Formularios de auth
│       ├── chat/           # Componentes de chat
│       └── ui/             # Componentes UI reutilizables
├── hooks/                  # Custom React hooks
├── lib/                    # Utilidades y helpers
├── styles/                 # Estilos globales
└── types/                  # Tipos TypeScript

```

----------

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

-   **Node.js** (v16 o superior) - [Descargar](https://nodejs.org/)
-   **pnpm** (v8 o superior) - [Instalar](https://pnpm.io/installation)
-   **MongoDB** (v5 o superior) - [Instalar](https://www.mongodb.com/try/download/community)
-   **Cuenta de OpenAI** - [Registrarse](https://platform.openai.com/)
-   **Cuenta de Upstash** - [Registrarse](https://upstash.com/)

----------

## 🚀 Comenzar

### 1. Clonar el Repositorio

```bash
git clone https://github.com/nuriadevs/fitflow-fullstack.git
cd fitflow-fullstack

```

### 2. Instalar Dependencias

```bash
# Instalar todas las dependencias
pnpm install

```

### 3. Configurar Variables de Entorno

Crea archivos `.env` en las carpetas `backend` y `frontend`:

#### Backend `.env`

```env
# Base de Datos
MONGODB_URI=tu_direccion_base_de_datos_mongodb

# Autenticación
JWT_SECRET=tu_super_secreto_jwt_key_aqui

# OpenAI
OPENAI_API_KEY=sk-tu_api_key_de_openai

# Upstash Vector Database
UPSTASH_VECTOR_REST_URL=https://tu-endpoint.upstash.io
UPSTASH_VECTOR_REST_TOKEN=tu_token_de_upstash

# Servidor
PORT=8000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000

```

#### Frontend `.env.local`

```env
# API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

```

### 4. Preparar la Base de Datos

```bash
# Asegúrate de que MongoDB esté corriendo
mongod

# Opcional: Ejecutar script de seed (si está disponible)
cd backend
npm run seed

```

### 5. Inicializar Vector Database (RAG)

```bash
cd backend
npm run ingest  # Esto ingesta el dataset de ejercicios en Upstash

```

### 6. Iniciar la Aplicación

#### Opción A: Iniciar ambos servidores simultáneamente

```bash
# Desde la raíz del proyecto
pnpm dev

```

#### Opción B: Iniciar por separado

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
pnpm dev

```

La aplicación estará disponible en:

-   **Frontend**: [http://localhost:3000](http://localhost:3000/)
-   **Backend API**: [http://localhost:8000](http://localhost:8000/)
-   **API Docs**: [http://localhost:8000/docs](http://localhost:8000/api-docs)




## 📚 Documentación de la API

### Endpoints Principales
 **Autenticación, ejercicios, usuarios, chat**
<img  src="media/02.png"  alt="api"  width="600"  />






## 🎬 Demo


#### Escritorio
<img src="media/desktop.png" alt="FitFlow Frontend" width="600" />

#### Tablet

<img src="media/tablet.png" alt="FitFlow Frontend" width="600" />

#### Móvil

<img src="media/mobile.png" alt="FitFlow Frontend" width="600" />

#### Backend API

 <img src="media/backend-api.jpg" alt="FitFlow Backend API" width="600" />


### Frontend

**[📹 Ver Video Demo del Frontend](https://youtu.be/HKG0sywPhEU)**

### Backend

**[📹 Ver Video Demo del Backend](https://youtu.be/7JgR5SAsv9U)**


----------

## 🙏 Agradecimientos

-   [OpenAI](https://openai.com/) por los modelos GPT y Embeddings
-   [Upstash](https://upstash.com/) por la base de datos vectorial
-   [Vercel](https://vercel.com/) por Next.js
-   [MongoDB](https://www.mongodb.com/) por la base de datos
-   Comunidad open source por las increíbles herramientas


## 📬 Contacto

[](https://github.com/nuriadevs/dog-parks/blob/main/README.es.md#-contacto)

Si tienes preguntas, sugerencias o simplemente quieres charlar sobre el proyecto, enviáme un mensaje.

[![Email](https://camo.githubusercontent.com/52a173d8eb1942dd9c9935c180ec74ddca5d4b1effc68328e75705d2d55aa451/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f456d61696c2d4431343833363f6c6f676f3d676d61696c266c6f676f436f6c6f723d7768697465)](mailto:nuriadevs@gmail.com)


----------

### ⭐ ¿Te gusta el proyecto?

[](https://github.com/nuriadevs/dog-parks/blob/main/README.es.md#-te-gusta-el-proyecto)

¡Dale estrella en GitHub y compártelo!

[![GitHub Stars](https://camo.githubusercontent.com/ca34c3fa8dafe4a629bc2f4c72b06e64f3577528c5e4b7b8acc2ad228797fae9/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f73746172732f6e75726961646576732f6d616c6167612d646f672d7061726b733f7374796c653d736f6369616c)](https://github.com/nuriadevs/fitflow-fullstack)  [![GitHub Forks](https://camo.githubusercontent.com/280ba1a96fa2906bc0b4e3fecda1eecdf2de8327a48a0331fe067d067fb9eeb9/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f666f726b732f6e75726961646576732f6d616c6167612d646f672d7061726b733f7374796c653d736f6369616c)](https://github.com/nuriadevs/fitflow-fullstack)
