import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().default('8000'),
  MONGODB_URI: z.string(),
  CORS_ORIGIN: z.string().url(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development')
});

export const env = envSchema.parse(process.env);
