import { Worker } from 'bullmq';
import RedisModule from "ioredis";
import { logger } from '@media-aggregator/logger';
const Redis = RedisModule.default ?? RedisModule;
const redisUrl = process.env.REDIS_URL;
if (!redisUrl)
    throw new Error('REDIS_URL missing');
const connection = new Redis(redisUrl, {
    maxRetriesPerRequest: null,
});
const rssWorker = new Worker('rss_ingest', async (job) => {
    logger.info({ jobId: job.id, name: job.name }, 'Processing RSS ingest job');
    return { processedAt: new Date().toISOString() };
}, { connection });
rssWorker.on('completed', (job) => logger.info({ jobId: job.id }, 'RSS job completed'));
rssWorker.on('failed', (job, err) => logger.error({ jobId: job?.id, err }, 'RSS job failed'));
logger.info('Worker processor started');
//# sourceMappingURL=index.js.map