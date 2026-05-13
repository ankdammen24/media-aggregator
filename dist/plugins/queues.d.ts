import { Queue } from 'bullmq';
declare const connection: any;
export declare const queues: {
    rssIngest: Queue<any, any, string, any, any, string>;
    podcastIngest: Queue<any, any, string, any, any, string>;
    aiProcessing: Queue<any, any, string, any, any, string>;
    metadataEnrichment: Queue<any, any, string, any, any, string>;
    transcription: Queue<any, any, string, any, any, string>;
    syncDispatch: Queue<any, any, string, any, any, string>;
};
export { connection as redisConnection };
