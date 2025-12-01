import { rateLimit, ipKeyGenerator } from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 30, // máximo 30 requests por ventana
  message: {
    error: 'Demasiadas solicitudes, por favor intenta de nuevo más tarde.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.user?.id || ipKeyGenerator(req.ip);
  }
});