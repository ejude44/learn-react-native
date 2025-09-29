#!/bin/bash
echo "Starting application..."
npm install --production
npx prisma generate
node dist/main.js
