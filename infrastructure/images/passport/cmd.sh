cmd="$1"

image="dormammun/looport-passport:latest"
arch="linux/arm64,linux/amd64"

case $cmd in
"run")
  docker run -p 3000:3000 -d "$image"
  ;;
"build")
      docker build \
      -t "$image" \
      -f ./Dockerfile ../../..
  ;;
"buildx")
    docker buildx build --push \
    --platform "$arch" \
    -t "$image" \
    -f ./Dockerfile ../../..
    ;;
*)
  echo "$cmd" "don't exits"
esac

