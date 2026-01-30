
/*
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/database';
import cookieOptions from './config/cookieOptions';
import { CORS_OPTIONS } from './config/cors';
import { RATE_LIMIT } from './config/rateLimit';
import authRoutes from './api/routes/auth.routes';
import userRoutes from './api/routes/user.routes';
import chatRoutes from './api/routes/chat.routes';
import exerciseRoutes from './api/routes/exercises.routes';
import YAML from 'yamljs'; 
import swaggerUi from 'swagger-ui-express'; 

// Cargar el archivo swagger.yaml desde la carpeta docs
const swaggerDocument = YAML.load('./docs/swagger.yaml');

// 
const start = async () => {
  try {
    await connectDB();
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Error en la conexión a la base de datos:', error);
  }
};

start();

// Configuración del servidor Express
const app = express();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Middleware básico
app.use(express.json());
app.use(cors(CORS_OPTIONS));
app.use(cookieParser());
app.use(RATE_LIMIT);

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/exercises', exerciseRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API de FitFlow funcionando');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

*/



// src/index.ts
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/database';
import cookieOptions from './config/cookieOptions';
import { CORS_OPTIONS } from './config/cors';
import { RATE_LIMIT } from './config/rateLimit';
import routes from './api/routes/index.routers'; // 👈 Este es el index de rutas
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

// Cargar el archivo swagger.yaml desde /docs
const swaggerDocument = YAML.load('./docs/swagger.yaml');

const start = async () => {
  try {
    await connectDB();
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Error en la conexión a la base de datos:', error);
  }
};

start();

// Inicializar express
const app = express();

// Swagger docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middlewares globales
app.use(express.json());
app.use(cors(CORS_OPTIONS));
app.use(cookieParser());
app.use(RATE_LIMIT);

// Rutas
app.use('/api', routes); // 👈 Todas las rutas vienen del index de rutas

// Ruta raíz (para testeo rápido)
app.get('/', (req, res) => {
  res.send('API de FitFlow funcionando');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
