#!/bin/bash
cdnGravityDir="gravity-ui-web"
cdnDir="cdn-dist"
version="$(git describe --abbrev=0 --tags)"
mkdir -p ${cdnDir}/${cdnGravityDir}/${version}

cp dist/ui-lib/* ${cdnDir}/${cdnGravityDir}/${version}

versionList=""
for version in $(git tag -l --sort=-committerdate); do
  versionList+="<li>${version}</li>"
done

file_contents=$(<./cdn-index.template)
echo "${file_contents//\{versionlist\}/$versionList}" > ${cdnDir}/${cdnGravityDir}/index.html

aws s3 sync ${cdnDir} s3://${CDN_BUCKET} --region=${PROD_BUCKET_REGION} --exclude "*" --include "*.html" --content-type "text/html; charset=utf-8" --cache-control "max-age=0"
aws s3 sync ${cdnDir} s3://${CDN_BUCKET} --region=${PROD_BUCKET_REGION} --exclude "*.html" --exclude ".DS_Store" --cache-control "max-age=3153600000, immutable"