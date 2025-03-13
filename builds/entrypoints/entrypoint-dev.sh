#!/bin/sh
set -e

READY_FILE="/tmp/ready"

# Install the dependencies and the proto when create the container
if [ ! -f "$READY_FILE" ]; then
  /app/builds/scripts/development-dependencies.sh
  touch "$READY_FILE"
fi

exec  npm run start:debug