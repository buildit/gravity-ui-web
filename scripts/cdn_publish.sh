#!/bin/bash
version="$(git describe --abbrev=0 --tags)"
mkdir -p cdn-dist/gravity/${version}

cp dist/ui-lib/* cdn-dist/gravity/${version}

versionList=""
for version in $(git tag -l --sort=-committerdate); do
  versionList+="<li>${version}</li>"
done

file_contents=$(<./cdn-index.template)
echo "${file_contents//\{versionlist\}/$versionList}" > cdn-dist/gravity/index.html

~/.local/bin/aws s3 sync cdn-dist s3://${CDN_BUCKET} --region=${PROD_BUCKET_REGION} --exclude "*" --include "*.html" --content-type "text/html; charset=utf-8" --cache-control "max-age=0"
~/.local/bin/aws s3 sync cdn-dist s3://${CDN_BUCKET} --region=${PROD_BUCKET_REGION} --exclude "*.html" --cache-control "max-age=3153600000, immutable"l