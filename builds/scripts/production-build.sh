#!/bin/sh
set -e

# Install dependencies
npm install --include=dev && \
npm run build && \
npm ci --omit=dev;

# Add the git version file and clean up
echo "Version: ${GIT_COMMIT}" > .git_hash;