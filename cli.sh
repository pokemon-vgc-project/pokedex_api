#!/bin/sh
set -e

#Vars
CommandList="{build:image|help}"

# Extract the parameters
COMMAND=$1

# Build the image
function build_image() {
  docker build\
  --tag tiagocambara/pokedex_api:$(git rev-parse --short HEAD)\
  --build-arg GIT_COMMIT=$(git rev-parse HEAD)\
  --build-arg APP_ENV=production\
  --no-cache .;
  echo "Docker image built"
  exit 0
}

# Execute the command
case "$COMMAND" in
  "build:image")
    build_image
    ;;
  "help")
    echo "Usage: cli.sh $CommandList"
    exit 0
    ;;
  *)
    echo "Invalid command: $COMMAND"
    echo "Usage: cli.sh $CommandList"
    exit 1
    ;;
esac
