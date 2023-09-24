#!/bin/sh

cd application/services/web

find ./.next -type f -exec sed -i "s#__REPLACE__NEXT_PUBLIC_API_HOST__#$NEXT_PUBLIC_API_HOST#g" {} +
find ./.next -type f -exec sed -i "s#__REPLACE__NEXT_PUBLIC_ENV__#$NEXT_PUBLIC_ENV#g" {} +

pnpm start