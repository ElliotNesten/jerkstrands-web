#!/usr/bin/env bash
# Installerar designverktyget Taste Skill (Leonxlnx/taste-skill, MIT) i .claude/skills/
# på den version webbplatsen designades med. DESIGN.md (Mobbin-analysen från
# VoltAgent/awesome-design-md / getdesign.md) ligger redan i projektroten.
#
#   bash scripts/install-design-skills.sh
set -euo pipefail

TASTE_COMMIT="f6b76575f949707b4e3c37cd86cb44b0b98643e8"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST="$ROOT/.claude/skills/design-taste-frontend"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

git clone --quiet --filter=blob:none https://github.com/Leonxlnx/taste-skill "$TMP/taste-skill"
git -C "$TMP/taste-skill" checkout --quiet "$TASTE_COMMIT"

rm -rf "$DEST"
mkdir -p "$(dirname "$DEST")"
cp -R "$TMP/taste-skill/skills/taste-skill" "$DEST"
cp "$TMP/taste-skill/LICENSE" "$DEST/LICENSE"
echo "$TASTE_COMMIT" > "$DEST/UPSTREAM_COMMIT"
echo "✓ Taste Skill installerad i .claude/skills/design-taste-frontend (commit ${TASTE_COMMIT:0:7})"
