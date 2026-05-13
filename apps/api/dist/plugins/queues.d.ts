import IORedis from 'ioredis';
import { Queue } from 'bullmq';
export declare const redisConnection: IORedis.Redis;
export declare const queues: {
    rssIngest: Queue<any, any, string, any, any, string>;
    podcastIngest: Queue<any, any, string, any, any, string>;
};
export declare const rssIngestQueue: Queue<any, any, string, any, any, string>;
export declare const podcastIngestQueue: Queue<any, any, string, any, any, string>;
