FROM node:18-alpine as base

WORKDIR /srv
EXPOSE 8000



FROM base as builder

WORKDIR /srv
COPY . .
RUN npm ci
RUN npm run build



FROM base as production

WORKDIR /srv
ENV PORT=8000 NODE_ENV=production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.2 /lambda-adapter /opt/extensions/lambda-adapter
COPY --from=builder --chown=nextjs:nodejs /srv/.next/standalone ./
COPY --from=builder /srv/public ./public
COPY --from=builder /srv/.next/static ./.next/static
COPY --from=builder /srv/package.json ./package.json
COPY --from=builder /srv/next.config.mjs ./next.config.mjs
ENTRYPOINT [ "node", "server.js" ]
