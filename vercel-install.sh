#!/usr/bin/env bash
set -euo pipefail

lockfile="bun.lock"
temporary_lockfile="${lockfile}.vercel-tmp"

if grep -qF "http://package-firewall.replit.internal/npm/" "$lockfile"; then
  sed 's#http://package-firewall\.replit\.internal/npm/#https://registry.npmjs.org/#g' \
    "$lockfile" > "$temporary_lockfile"
  mv "$temporary_lockfile" "$lockfile"
fi

if grep -qF "package-firewall.replit.internal" "$lockfile"; then
  echo "Vercel install still contains a Replit-only package URL." >&2
  exit 1
fi

bun install --frozen-lockfile --network-concurrency 8
