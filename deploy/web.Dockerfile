FROM node:22-alpine AS build
# Fonts for the share image / icons rendered at build time (scripts/generate-images.mjs, via sharp).
RUN apk add --no-cache font-dejavu fontconfig
WORKDIR /web
COPY src/web/package.json src/web/package-lock.json ./
RUN npm ci
COPY src/web/ ./
# Brand images (og-image.png/.webp/.avif, icons) -> public/, client bundle -> dist/, self-contained SSR
# server -> dist-server/ (no node_modules needed at runtime); then enforce the bundle budgets.
RUN npm run build && npm run budgets

FROM node:22-alpine AS node

# nginx serves static assets and proxies /api to the API; the Node SSR renderer (127.0.0.1:3000) renders
# public pages for crawlers and first paint. Both run in this container; if either exits, the container exits.
FROM nginx:1.27-alpine
RUN apk add --no-cache libstdc++ libgcc
COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /web/dist /usr/share/nginx/html
COPY --from=build /web/dist-server /app/dist-server
COPY deploy/web-entrypoint.sh /usr/local/bin/web-entrypoint.sh
RUN chmod +x /usr/local/bin/web-entrypoint.sh
# PUBLIC_BASE_URL (absolute public origin, e.g. https://mastemy.com) is required at runtime.
ENV API_INTERNAL_URL=http://api:8080 PORT=3000 DIST_DIR=/usr/share/nginx/html NODE_ENV=production
EXPOSE 80
ENTRYPOINT ["/usr/local/bin/web-entrypoint.sh"]
