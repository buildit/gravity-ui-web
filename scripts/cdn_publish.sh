#!/bin/bash
cdnGravityDir="gravity-ui-web"
cdnDir="cdn-dist"

if [ ! -z "$TRAVIS_COMMIT_RANGE"]
then
  # TRAVIS_COMMIT_RANGE has a bug that includes commits outside the PR, so fix with known workaround that is future safe
  cdnChanges=`git diff --pretty="format:" --name-only ${TRAVIS_COMMIT_RANGE/.../..} | grep -E '^packages/gravity-ui-web/src*'`
fi

if [ ! -z "$cdnChanges" ]
then
  allVersions=`git tag --list --sort=-committerdate | grep  -E '^(gravity-ui-web-)?v[0-9]*.[0-9]*.[0-9]*'`

  # First tag in the list will be the latest one, but may be prefixed (e.g. "gravity-ui-web-v1.2.3")
  version=`echo $allVersions | cut -d" " -f1`
  # be sure we get only the version part and discard any prefix
  version=`expr $version : '.*\(v[0-9].*\)'`

  mkdir -p ${cdnDir}/${cdnGravityDir}/${version}

  cp packages/gravity-ui-web/dist/ui-lib/* ${cdnDir}/${cdnGravityDir}/${version}

  versionList=""
  for thisVersion in $allVersions; do
    versionList+="<li>`expr $thisVersion : '.*\(v[0-9].*\)'`</li>"
  done

  file_contents=$(<./cdn-index.template)
  echo "${file_contents//\{versionlist\}/$versionList}" > ${cdnDir}/${cdnGravityDir}/index.html

  ~/.local/bin/aws s3 sync ${cdnDir} s3://${CDN_BUCKET} --region=${PROD_BUCKET_REGION} --exclude "*" --include "*.html" --content-type "text/html; charset=utf-8" --cache-control "max-age=0"
  ~/.local/bin/aws s3 sync ${cdnDir} s3://${CDN_BUCKET} --region=${PROD_BUCKET_REGION} --exclude "*" --include "*.css" --content-type "text/css; charset=utf-8" --cache-control "max-age=3153600000, immutable" 
  ~/.local/bin/aws s3 sync ${cdnDir} s3://${CDN_BUCKET} --region=${PROD_BUCKET_REGION} --exclude "*" --include "*.js" --content-type "application/javascript; charset=utf-8" --cache-control "max-age=3153600000, immutable"
  ~/.local/bin/aws s3 sync ${cdnDir} s3://${CDN_BUCKET} --region=${PROD_BUCKET_REGION} --include "*" --exclude "*.js" --exclude "*.html" --exclude "*.css" --exclude ".DS_Store" --cache-control "max-age=3153600000, immutable" 
else 
  echo "No CDN related changes found to publish"
fi