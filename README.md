
# FullStack - FitFlow App

📘 Disponible también en [Español](./README.es.md)

## Overview

This is fullStack application, developed with Next.js and TypeScript. It contains the backend folder to provide the data.


## Project Structure

```
backend/

├── docs/ # API documentation (Swagger)

├── src/ # Main source code

│ ├── api/ # Controllers, routes, middlewares

│ ├── config/ # App configuration

│ ├── constants/ # Global constants

│ ├── interfaces/ # TypeScript interfaces

│ ├── models/ # Data models

│ ├── responses/ # Standardized API responses  

│ ├── schemas/ # Validation schemas

│ ├── services/ # Business logic

│ ├── tests/ # Unit and integration tests

│ ├── utils/ # Utility functions

├── package.json # Dependencies and scripts

├── tsconfig.json # TypeScript config

```

```

frontend/

├── app/ # Main pages and layouts

├── components/ # Reusable components

├── hooks/ # Custom hooks

├── services/ # Services for interacting with the API

├── styles/ # Global styles and Tailwind CSS configurations

├── public/ # Static files

├── package.json # Dependencies and scripts

├── tsconfig.json # TypeScript configuration

├── shared/ # Shared interfaces and types between frontend and backend

```

## Prerequisites

- Node.js (v16 o +)

- npm o yarn

  

## Setup

1. Clone the repository:

  

	```bash
	git clone https://github.com/nuriadevs/fitflow-fullstack
	cd fitflow-fullstack
	```
2. Install the dependencies:
	```bash
	npm install
	```

## Scripts

### Backend
-  `npm start`: Starts the server.

### Frontend
-  `npm run dev`: Starts the development server.

-  `npm run build`: Builds an optimized version for production.

## Environment Variables

1. Create a `.env.local` file at the root of the project with the following variable:

### Frontend
	
```
NEXT_PUBLIC_API_URL=<API_URL>
```
			
### Backend

```
DATABASE_URL=<DATABASE_URL>

JWT_SECRET=<JWT_SECRET>

OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>

MONGODB_URI=<MONGODB_CONNECTION_URI>

PORT=<SERVER_PORT>

CORS_ORIGIN=<ALLOWED_ORIGIN>

NODE_ENV=<ENVIRONMENT>

UPSTASH_VECTOR_REST_URL=<VECTOR_REST_URL>

UPSTASH_VECTOR_REST_TOKEN=<UPSTASH_TOKEN>
```

2. Configure additional options in `next.config.js` if needed.

## Styles

This project uses Tailwind CSS for styling. You can customize the configuration in the `tailwind.config.js` file.

  

## Testing

### Backend

```bash
npm test
```
### Frontend

Currently, no tests are set up. It is recommended to use Jest or React Testing Library to add unit and integration tests.

  
  

## Backend Communication

The frontend interacts with the backend via a REST API, handling authentication with JWT tokens and updating the UI based on server responses.

The backend and frontend both work together to serve **a single goal**.

  

## Shared Folder

The `shared` folder contains common **TypeScript interfaces** and **types** used by both the frontend and backend.

```

├── shared/types/

```

  

## Demo

### Frontend

  <img src="media/1.png" alt="frontend" width="600" />

[Watch video demo Frontend](https://youtu.be/HKG0sywPhEU)

### Backend
<img src="media/backend-api.jpg" alt="backend api" width="600" />


[Watch video demo Backend](https://youtu.be/HKG0sywPhEU)

  
  
  

## Summary

  

- Don't forget to create your own .env file for the variables.

- This project is under construction...can be improved.