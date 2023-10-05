FROM node:20-alpine as builder

RUN npm i -g pnpm@8

WORKDIR /app

COPY . .

RUN pnpm -F @looport/passport install \
    && pnpm -F @looport/passport... build

FROM node:20-alpine as runner

RUN npm i -g pnpm@8

WORKDIR /app

COPY --from=builder /app .

COPY ./infrastructure/images/passport/entrypoint.sh ./application/services/passport/entrypoint.sh

ENV NODE_ENV=production

EXPOSE 3000

ENTRYPOINT ["sh", "./application/services/passport/entrypoint.sh"]