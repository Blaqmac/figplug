#!/bin/bash -e
cd "$(dirname "$0")"

rm -rf build/*
rm -f bin/figplug bin/figplug.map

if ! (git diff-index --quiet HEAD --); then
  echo "There are uncommitted changes:" >&2
  git status -s --untracked-files=no --ignored=no
  exit 1
fi

echo "building bin/figplug"
./build.js -O

echo "testing figplug"
./test.sh

VERSION=$(node -e 'process.stdout.write(require("./package.json").version)')

echo ""
echo "Next steps:"
echo "1) Commit changes"
echo "2) git tag v${VERSION} && git push --tags"
echo "3) npm publish ."
echo "4) Bump version in package.json"
echo ""
