#!/usr/bin/env bash

npm version prerelease --preid=alpha
npm run clean && npm run bundlesize
npm publish --tag next
