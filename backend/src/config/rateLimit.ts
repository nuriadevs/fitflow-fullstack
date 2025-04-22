import rateLimit from 'express-rate-limit';

export const RATE_LIMIT = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100,
  message: 'Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});
