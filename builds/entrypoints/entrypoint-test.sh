#!/bin/sh
set -e

# Install the development dependencies
/app/builds/scripts/development-dependencies.sh

# Run the tests
npm run build && npm run test;