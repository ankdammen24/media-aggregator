import { FastifyInstance } from 'fastify';
import { healthRoutes } from '../modules/health/routes.js';
import { feedRoutes } from '../modules/feeds/routes.js';
import { jobRoutes } from '../modules/jobs/routes.js';

export async function registerRoutes(app: FastifyInstance): Promise<void> {
  await app.register(healthRoutes);
  await app.register(feedRoutes);
  await app.register(jobRoutes);
}
