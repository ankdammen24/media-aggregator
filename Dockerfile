FROM node:22-alpine
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-workspace.yaml tsconfig.base.json ./
COPY apps ./apps
COPY workers ./workers
COPY packages ./packages
COPY prisma ./prisma
RUN pnpm install --frozen-lockfile=false
RUN pnpm prisma:generate
RUN pnpm build
EXPOSE 3000
CMD ["pnpm","start"]
