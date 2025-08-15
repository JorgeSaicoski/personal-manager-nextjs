#!/bin/sh
set -e
if [ ! -d node_modules ] || [ -z "$(ls -A node_modules 2>/dev/null)" ]; then
  echo "Installing dependencies into /app/node_modules ..."
  npm ci
fi
exec "$@"
