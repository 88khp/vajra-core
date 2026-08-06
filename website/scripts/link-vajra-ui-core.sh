#!/usr/bin/env bash
# website/ lives INSIDE the vajra-ui-core repo itself (repo-root/website).
# @devraj-labs/vajra-ui-core cannot be depended on via yarn's "file:.." (or
# "file:../..") protocol here, because yarn classic (1.x) COPIES the target
# directory for file: deps rather than symlinking. Since website/ lives
# inside the very package it would depend on, that copy would recursively
# include website/ itself, which includes node_modules/@devraj-labs/vajra-ui-core,
# which includes website/ again, infinite self-nesting that has previously
# blown up to 3GB+ disk usage in a sibling repo (vajra-ui) before being
# caught. See that repo's scripts/link-vajra-ui.sh for the same issue.
#
# The fix: a real symlink (not yarn's copy) from
# website/node_modules/@devraj-labs/vajra-ui-core to the repo root, created
# here as a postinstall step so `yarn install` always leaves it in a working
# state instead of needing to be run once and never touched again. The
# package.json "dependencies" entry for @devraj-labs/vajra-ui-core exists
# only so tooling doesn't complain about an unresolved import, this symlink
# always overwrites whatever yarn's own resolution put there.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEBSITE_DIR="$(dirname "$SCRIPT_DIR")"
REPO_ROOT="$(dirname "$WEBSITE_DIR")"
LINK_PATH="$WEBSITE_DIR/node_modules/@devraj-labs/vajra-ui-core"

mkdir -p "$WEBSITE_DIR/node_modules/@devraj-labs"

if [ -L "$LINK_PATH" ] && [ "$(readlink "$LINK_PATH")" = "$REPO_ROOT" ]; then
  :
else
  rm -rf "$LINK_PATH"
  ln -s "$REPO_ROOT" "$LINK_PATH"
  echo "Linked website/node_modules/@devraj-labs/vajra-ui-core -> $REPO_ROOT"
fi
