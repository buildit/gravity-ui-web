#!/bin/bash
version="$(git describe --abbrev=0 --tags)"
mkdir -p cdn-dist/gravity/${version}

cp dist/ui-lib/*.css cdn-dist/gravity/${version}
cp dist/ui-lib/*.js cdn-dist/gravity/${version}

versionList=""
for version in $(git tag -l --sort=-committerdate); do
  versionList+="<li>${version}</li>"
done

file_contents=$(<./cdn-index.template)
echo "${file_contents//\{versionlist\}/$versionList}" > cdn-dist/gravity/index.html

~/.local/bin/aws s3 sync cdn-dist s3://${CDN_BUCKET} --delete --region=${PROD_BUCKET_REGION} --exclude "*" --include "*.html" --content-type "text/html; charset=utf-8"
~/.local/bin/aws s3 sync cdn-dist s3://${CDN_BUCKET} --delete --region=${PROD_BUCKET_REGION} --exclude "*" --include "*.css" --content-type "text/css; charset=utf-8"
~/.local/bin/aws s3 sync cdn-dist s3://${CDN_BUCKET} --delete --region=${PROD_BUCKET_REGION} --exclude "*" --include "*.js" --content-type "application/javascript; charset=utf-8"