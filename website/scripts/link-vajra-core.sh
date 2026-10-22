#!/usr/bin/env bash
# website/ lives INSIDE the vajra-core repo itself (repo-root/website).
# @88khp/vajra-core cannot be depended on via yarn's "file:.." (or
# "file:../..") protocol here, because yarn classic (1.x) COPIES the target
# directory for file: deps rather than symlinking. Since website/ lives
# inside the very package it would depend on, that copy would recursively
# include website/ itself, which includes node_modules/@88khp/vajra-core,
# which includes website/ again, infinite self-nesting that has previously
# blown up to 3GB+ disk usage in a sibling repo (vajra-ui) before being
# caught. See that repo's scripts/link-vajra-ui.sh for the same issue.
#
# The fix: a real symlink (not yarn's copy) from
# website/node_modules/@88khp/vajra-core to the repo root, created
# here as a postinstall step so `yarn install` always leaves it in a working
# state instead of needing to be run once and never touched again. There is
# no package.json "dependencies" entry for @88khp/vajra-core, since
# the package resolves through this symlink alone.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEBSITE_DIR="$(dirname "$SCRIPT_DIR")"
REPO_ROOT="$(dirname "$WEBSITE_DIR")"
LINK_PATH="$WEBSITE_DIR/node_modules/@88khp/vajra-core"

mkdir -p "$WEBSITE_DIR/node_modules/@88khp"

if [ -L "$LINK_PATH" ] && [ "$(readlink "$LINK_PATH")" = "$REPO_ROOT" ]; then
  :
else
  rm -rf "$LINK_PATH"
  ln -s "$REPO_ROOT" "$LINK_PATH"
  echo "Linked website/node_modules/@88khp/vajra-core -> $REPO_ROOT"
fi
