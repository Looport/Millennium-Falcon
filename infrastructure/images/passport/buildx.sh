docker buildx build --push \
--platform linux/arm64,linux/amd64 \
-t dormammun/looport-passport:latest \
-f ./Dockerfile ../../..