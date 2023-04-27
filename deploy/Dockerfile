FROM node:16-alpine AS builder

ARG BUILD_TYPE="dev"

# disable telemetry data
ARG NEXT_TELEMETRY_DISABLED=1

ARG HOST_URL

ARG NEXT_PUBLIC_HEADLESS_WP_URL

WORKDIR /app

COPY . .

# Install Packages
RUN npm install
# Build node modules
RUN npm run build:packages

# build headless project
RUN npm run build -- --filter=./projects/wp-nextjs

FROM node:16-alpine AS runner

WORKDIR /app

# Setup node and next user/groups
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy Next configuration files to runner
COPY --from=builder --chown=nextjs:nodejs /app/projects/wp-nextjs/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/projects/wp-nextjs/.next/server ./projects/wp-nextjs/.next/server
COPY --from=builder --chown=nextjs:nodejs /app/projects/wp-nextjs/.next/static ./projects/wp-nextjs/.next/static

# Copy entrypoint script
COPY --from=builder --chown=nexjs:nodejs /app/deploy/entrypoint.sh ./

USER nextjs

CMD ["/bin/sh" , "./entrypoint.sh"]
