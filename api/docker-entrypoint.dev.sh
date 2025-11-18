#!/bin/sh
set -e

# Run Prisma migrate (optional) and seed
pnpm prisma migrate deploy
pnpm prisma db seed

# Start your dev server
exec pnpm run dev
