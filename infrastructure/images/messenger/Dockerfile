FROM node:20-alpine as builder

RUN npm i -g pnpm@8

WORKDIR /app

COPY ./package.json ./pacakge.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY ./application ./application

RUN pnpm -F @looport/messenger install \
    && pnpm -F @looport/messenger... build

FROM node:20-alpine as runner

RUN npm i -g pnpm@8

WORKDIR /app

COPY --from=builder /app .

COPY ./infrastructure/images/messenger/entrypoint.sh ./application/services/messenger/entrypoint.sh

ENV NODE_ENV=production

EXPOSE 3000

ENTRYPOINT ["sh", "./application/services/messenger/entrypoint.sh"]