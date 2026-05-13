import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  RADIO_CORE_API_URL: z.string().url(),
  STORAGE_HEALTHCHECK_URL: z.string().url().optional()
});

export const env = envSchema.parse(process.env);
