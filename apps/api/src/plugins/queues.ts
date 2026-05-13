import IORedis from 'ioredis';
import { Queue } from 'bullmq';

const redisUrl = process.env.REDIS_URL ?? 'redis://redis:6379';

export const redisConnection = new IORedis.Redis(redisUrl, {
  maxRetriesPerRequest: null,
});

export const queues = {
  rssIngest: new Queue('rss_ingest', {
    connection: redisConnection,
  }),
  podcastIngest: new Queue('podcast_ingest', {
    connection: redisConnection,
  }),
};

export const rssIngestQueue = queues.rssIngest;
export const podcastIngestQueue = queues.podcastIngest;
