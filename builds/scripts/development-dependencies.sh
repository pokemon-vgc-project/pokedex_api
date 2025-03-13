#!/bin/sh
set -e

echo "Installing dependencies..."
npm install
npm run proto:install
echo "Dependencies installed."