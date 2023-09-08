docker buildx build --push \
--platform linux/arm64,linux/amd64 \
-t dormammun/looport-web:latest \
-f ./Dockerfile ../../..
