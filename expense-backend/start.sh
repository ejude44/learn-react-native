#!/bin/bash
echo "Starting application..."
echo "DATABASE_URL exists: $([[ -n "$DATABASE_URL" ]] && echo "YES" || echo "NO")"
echo "DATABASE_URL starts with postgresql: $([[ "$DATABASE_URL" == postgresql://* ]] && echo "YES" || echo "NO")"
npm install --production
npx prisma generate
node dist/main.js
