#!/bin/sh
set -e

# Install dependencies
npm install --production && \
npm run build && \
npm run proto:install;

# Add the git version file and clean up
echo "Version: ${GIT_COMMIT}" > .km_version &&\
apt-get clean && \
rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
rm -f /usr/bin/apt-get /usr/bin/apt;\