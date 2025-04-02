FROM docker.io/library/node:20 AS builder

WORKDIR /app
COPY ./ ./
RUN ls -lah
RUN npm install --include dev
RUN npm run build

FROM docker.io/library/nginx:1.27.4-alpine
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/* /usr/share/nginx/html/