import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { logger } from '@media-aggregator/logger';
import { env } from './config/env.js';
import { registerRoutes } from './routes/index.js';

const app = Fastify({ logger: false });

await app.register(swagger, {
  openapi: {
    info: {
      title: 'Media Aggregator API',
      version: '0.1.0'
    }
  }
});
await app.register(swaggerUi, { routePrefix: '/docs' });

await registerRoutes(app);

app.listen({ port: env.PORT, host: '0.0.0.0' })
  .then(() => logger.info({ port: env.PORT }, 'API started'))
  .catch((error) => {
    logger.error({ error }, 'Failed to start API');
    process.exit(1);
  });
