import type { FastifyPluginAsync } from 'fastify';
import { prisma } from '../../plugins/prisma.js';
import { redisConnection } from '../../plugins/queues.js';
import { checkRadioCoreConnectivity } from '../../clients/radioCoreClient.js';
import { env } from '../../config/env.js';

type HealthChecks = {
  postgres: boolean;
  redis: boolean;
  radioCore: boolean;
  storage: boolean;
};

async function checkPostgres(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

async function checkRedis(): Promise<boolean> {
  try {
    const response = await redisConnection.ping();
    return response === 'PONG';
  } catch {
    return false;
  }
}

async function checkStorage(): Promise<boolean> {
  if (!env.STORAGE_HEALTHCHECK_URL) {
    return true;
  }

  try {
    const response = await fetch(env.STORAGE_HEALTHCHECK_URL);
    return response.ok;
  } catch {
    return false;
  }
}

export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get('/health', async () => {
    const checks: HealthChecks = {
      postgres: await checkPostgres(),
      redis: await checkRedis(),
      radioCore: await checkRadioCoreConnectivity(),
      storage: await checkStorage(),
    };

    const isHealthy = Object.values(checks).every(Boolean);

    return {
      status: isHealthy ? 'ok' : 'degraded',
      checks,
    };
  });
};
