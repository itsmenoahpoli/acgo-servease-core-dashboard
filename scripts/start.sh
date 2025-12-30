#!/bin/bash
set -e

PORT=${PORT:-4173}

if [ ! -d "dist" ]; then
  echo "Error: dist directory not found. Please run 'npm run build' first."
  exit 1
fi

exec serve -s dist -l $PORT

