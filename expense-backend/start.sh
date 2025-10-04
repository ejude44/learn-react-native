#!/bin/bash
echo "=== Starting application ==="
echo "Current directory: $(pwd)"
echo "Files in current directory:"
ls -la
echo "Files in dist directory:"
ls -la dist/
echo "NODE_ENV: $NODE_ENV"
echo "DATABASE_URL exists: $([[ -n "$DATABASE_URL" ]] && echo "YES" || echo "NO")"

echo "=== Installing dependencies ==="
npm install --production

echo "=== Generating Prisma client ==="
npx prisma generate

echo "=== Starting Node.js app ==="
node dist/main.js
