FROM docker.io/library/node:20 AS builder

WORKDIR /app
COPY ./ ./
RUN ls -lah
RUN npm install --include dev
RUN npm run build


FROM docker.io/nginxinc/nginx-unprivileged:1.27.4
COPY --from=builder /app/dist/* /usr/share/nginx/html/