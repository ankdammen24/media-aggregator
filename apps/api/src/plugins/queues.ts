import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import { env } from '../config/env.js';

const connection = new IORedis(env.REDIS_URL, { maxRetriesPerRequest: null });

export const queues = {
  rssIngest: new Queue('rss_ingest', { connection }),
  podcastIngest: new Queue('podcast_ingest', { connection }),
  aiProcessing: new Queue('ai_processing', { connection }),
  metadataEnrichment: new Queue('metadata_enrichment', { connection }),
  transcription: new Queue('transcription', { connection }),
  syncDispatch: new Queue('sync_dispatch', { connection })
};

export { connection as redisConnection };
