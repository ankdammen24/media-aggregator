# Media Aggregator

Production-ready backend scaffold for ingesting, normalizing, enriching, and synchronizing media content into Radio Core.

## Stack
- Node.js + TypeScript (strict)
- Fastify + OpenAPI
- PostgreSQL + Prisma
- Redis + BullMQ
- Docker Compose
- pnpm workspaces

## Monorepo Structure
- `apps/api` - API gateway
- `workers/processor` - queue workers
- `packages/logger` - structured logging shared package
- `connectors/` - external source integrations (rss/podcast/music/ai)
- `modules/` - ingest/enrichment/pipeline domains
- `services/` - scheduler, storage sync, radio core sync
- `infrastructure/` - queue/db infra notes and extension points
- `docs/` - architecture docs

## API Endpoints
- `GET /health`
- `GET /feeds`
- `POST /feeds`
- `GET /jobs`
- `POST /jobs/rss-sync`
- `POST /jobs/podcast-sync`

## Queues
- `rss_ingest`
- `podcast_ingest`
- `ai_processing`
- `metadata_enrichment`
- `transcription`
- `sync_dispatch`

## Local Development
```bash
cp .env.example .env
pnpm install
pnpm prisma:generate
pnpm dev
```

Worker:
```bash
pnpm worker
```

With Docker:
```bash
docker compose up --build
```

## Health Checks
`GET /health` validates:
- PostgreSQL connectivity
- Redis connectivity
- Radio Core connectivity (`RADIO_CORE_API_URL`)
- Storage connectivity (`STORAGE_HEALTHCHECK_URL`, optional)

## Future-ready scope
Scaffold is designed for multi-tenant SaaS, Kubernetes deployment, horizontal scaling, event-driven ingestion and AI orchestration.
