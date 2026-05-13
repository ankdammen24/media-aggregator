import { prisma } from '../../plugins/prisma.js';
import { redisConnection } from '../../plugins/queues.js';
import { checkRadioCoreConnectivity } from '../../clients/radioCoreClient.js';
import { env } from '../../config/env.js';
async function checkPostgres() {
    try {
        await prisma.$queryRaw `SELECT 1`;
        return true;
    }
    catch {
        return false;
    }
}
async function checkRedis() {
    try {
        const response = await redisConnection.ping();
        return response === 'PONG';
    }
    catch {
        return false;
    }
}
async function checkStorage() {
    if (!env.STORAGE_HEALTHCHECK_URL) {
        return true;
    }
    try {
        const response = await fetch(env.STORAGE_HEALTHCHECK_URL);
        return response.ok;
    }
    catch {
        return false;
    }
}
export const healthRoutes = async (app) => {
    app.get('/health', async () => {
        const checks = {
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
//# sourceMappingURL=routes.js.map