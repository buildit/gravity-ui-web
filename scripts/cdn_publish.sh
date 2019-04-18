#!/bin/bash
cdnGravityDir="gravity-ui-web"
cdnDir="cdn-dist"
version="$(git describe --abbrev=0 --tags --match *v[0-1000].[0-1000].[0-1000]*)"
# be sure we get only the version part and discard any prefix
version=`expr $version : '.*\(v[0-9].*\)'`

mkdir -p ${cdnDir}/${cdnGravityDir}/${version}

cp dist/ui-lib/* ${cdnDir}/${cdnGravityDir}/${version}

versionList=""
for thisVersion in $(git tag -l --sort=-committerdate); do
  versionList+="<li>`expr $thisVersion : '.*\(v[0-9].*\)'`</li>"
done

file_contents=$(<./cdn-index.template)
echo "${file_contents//\{versionlist\}/$versionList}" > ${cdnDir}/${cdnGravityDir}/index.html

~/.local/bin/aws s3 sync ${cdnDir} s3://${CDN_BUCKET} --region=${PROD_BUCKET_REGION} --exclude "*" --include "*.html" --content-type "text/html; charset=utf-8" --cache-control "max-age=0"
~/.local/bin/aws s3 sync ${cdnDir} s3://${CDN_BUCKET} --region=${PROD_BUCKET_REGION} --exclude "*" --include "*.css" --content-type "text/css; charset=utf-8" --cache-control "max-age=3153600000, immutable" 
~/.local/bin/aws s3 sync ${cdnDir} s3://${CDN_BUCKET} --region=${PROD_BUCKET_REGION} --exclude "*" --include "*.js" --content-type "application/javascript; charset=utf-8" --cache-control "max-age=3153600000, immutable"
~/.local/bin/aws s3 sync ${cdnDir} s3://${CDN_BUCKET} --region=${PROD_BUCKET_REGION} --include "*" --exclude "*.js" --exclude "*.html" --exclude "*.css" --exclude ".DS_Store" --cache-control "max-age=3153600000, immutable" 
