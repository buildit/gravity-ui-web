#!/bin/bash
cdnGravityDir="gravity-ui-web"
cdnDistDir="cdn-dist"
cdnCurrentVersionDir="$cdnDistDir/currentVersion"
cdnCurrentVersionGravityDir="$cdnCurrentVersionDir/$cdnGravityDir"
cdnLatestVersionsDir="$cdnDistDir/latestVersions"
cdnLatestVersionsGravityDir="$cdnLatestVersionsDir/$cdnGravityDir"

if [ ! -z "$TRAVIS_COMMIT_RANGE" ]
then
  # TRAVIS_COMMIT_RANGE has a bug that includes commits outside the PR, so fix with known workaround that is future safe
  cdnChanges=`git diff --pretty="format:" --name-only ${TRAVIS_COMMIT_RANGE/.../..} | grep -E '^packages/gravity-ui-web/*'`
fi

if [ ! -z "$cdnChanges" ]
then
  source ./scripts/get_latest_version.sh
  
  mkdir -p ${cdnCurrentVersionGravityDir}/${version}
  cp packages/gravity-ui-web/dist/ui-lib/* ${cdnCurrentVersionGravityDir}/${version}

  versionList=""
  for thisVersion in $allVersions; do
    versionList+="<li>`expr $thisVersion : '.*\(v[0-9].*\)'`</li>"
  done

  file_contents=$(<./cdn-index.template)
  echo "${file_contents//\{versionlist\}/$versionList}" > ${cdnCurrentVersionGravityDir}/index.html

  ~/.local/bin/aws s3 sync ${cdnCurrentVersionDir} s3://${CDN_BUCKET} --region=${PROD_BUCKET_REGION} --exclude "*" --include "*.html" --content-type "text/html; charset=utf-8" --cache-control "max-age=0"
  ~/.local/bin/aws s3 sync ${cdnCurrentVersionDir} s3://${CDN_BUCKET} --region=${PROD_BUCKET_REGION} --exclude "*" --include "*.css" --content-type "text/css; charset=utf-8" --cache-control "max-age=3153600000, immutable" 
  ~/.local/bin/aws s3 sync ${cdnCurrentVersionDir} s3://${CDN_BUCKET} --region=${PROD_BUCKET_REGION} --exclude "*" --include "*.js" --content-type "application/javascript; charset=utf-8" --cache-control "max-age=3153600000, immutable"
  ~/.local/bin/aws s3 sync ${cdnCurrentVersionDir} s3://${CDN_BUCKET} --region=${PROD_BUCKET_REGION} --include "*" --exclude "*.js" --exclude "*.html" --exclude "*.css" --cache-control "max-age=3153600000, immutable" 

  majorVersion=`echo $version | cut -dv -f2 | cut -d. -f1`

  mkdir -p ${cdnLatestVersionsGravityDir}/v${majorVersion}.x
  cp packages/gravity-ui-web/dist/ui-lib/* ${cdnLatestVersionsGravityDir}/v${majorVersion}.x
  mkdir -p ${cdnLatestVersionsGravityDir}/latest
  cp packages/gravity-ui-web/dist/ui-lib/* ${cdnLatestVersionsGravityDir}/latest

  ~/.local/bin/aws s3 sync ${cdnLatestVersionsDir} s3://${CDN_BUCKET} --region=${PROD_BUCKET_REGION} --exclude "*" --include "*.css" --content-type "text/css; charset=utf-8" --cache-control "max-age=604800" 
  ~/.local/bin/aws s3 sync ${cdnLatestVersionsDir} s3://${CDN_BUCKET} --region=${PROD_BUCKET_REGION} --exclude "*" --include "*.js" --content-type "application/javascript; charset=utf-8" --cache-control "max-age=604800"
  ~/.local/bin/aws s3 sync ${cdnLatestVersionsDir} s3://${CDN_BUCKET} --region=${PROD_BUCKET_REGION} --include "*" --exclude "*.js" --exclude "*.html" --exclude "*.css" --cache-control "max-age=604800" 

else 
  echo "No CDN related changes found to publish"
fi