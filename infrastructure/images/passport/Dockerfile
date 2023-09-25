FROM node:20-alpine as builder

RUN npm i -g pnpm@8

WORKDIR /app

COPY ./package.json ./pacakge.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml

COPY ./application ./application

RUN pnpm -F @looport/passport install &&  pnpm -F @looport/passport build

FROM node:20-alpine as runner

RUN npm i -g pnpm@8

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/application/services/passport/node_modules ./application/services/passport/node_modules
COPY --from=builder /app/application/services/passport/package.json ./application/services/passport/package.json
COPY --from=builder /app/application/services/passport/dist ./application/services/passport/dist

COPY ./infrastructure/images/passport/entrypoint.sh ./application/services/passport/entrypoint.sh

ENV NODE_ENV=production

EXPOSE 3000

ENTRYPOINT ["sh", "./application/services/passport/entrypoint.sh"]