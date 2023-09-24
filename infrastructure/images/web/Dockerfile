FROM node:20-alpine as builder

RUN npm i -g pnpm@8

WORKDIR /app

COPY ./package.json ./pacakge.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml

COPY ./application ./application

RUN pnpm -F @looport/web install &&  pnpm -F @looport/web build

FROM node:20-alpine as runner

RUN npm i -g pnpm@8

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/application/services/web/node_modules ./application/services/web/node_modules
COPY --from=builder /app/application/services/web/package.json ./application/services/web/package.json
COPY --from=builder /app/application/services/web/public ./application/services/web/public
COPY --from=builder /app/application/services/web/.next ./application/services/web/.next

COPY ./infrastructure/images/web/entrypoint.sh ./application/services/web/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["sh", "./application/services/web/entrypoint.sh"]