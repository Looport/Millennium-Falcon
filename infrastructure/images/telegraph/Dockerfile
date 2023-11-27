FROM node:21-alpine as builder

RUN npm i -g pnpm@8

WORKDIR /app

COPY ./package.json ./pacakge.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY ./application ./application

RUN pnpm -F @looport/telegraph install \
    && pnpm -F @looport/telegraph... build

FROM node:21-alpine as runner

RUN npm i -g pnpm@8

WORKDIR /app

COPY --from=builder /app .

COPY ./infrastructure/images/telegraph/entrypoint.sh ./application/services/telegraph/entrypoint.sh

ENV NODE_ENV=production

EXPOSE 3000

ENTRYPOINT ["sh", "./application/services/telegraph/entrypoint.sh"]