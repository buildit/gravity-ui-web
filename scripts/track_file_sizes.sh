#!/bin/bash
gravityDir="packages/gravity-ui-web"
distDir="$gravityDir/dist/ui-lib"
cdnGravityDir="gravity-ui-web"
historyFilename="$TRAVIS_BRANCH-file-size-history.js"
historyFile="$gravityDir/$historyFilename"
currentSizesFile="$gravityDir/currentfilesizes.json"
reportPageName="filehistory.html"
reportPage="$gravityDir/$reportPageName"

if [ ! -z "$TRAVIS_COMMIT" ] && [[ "develop" == "$TRAVIS_BRANCH" || "master" == "$TRAVIS_BRANCH" ]]
then
  file-size-report -p $distDir -o $currentSizesFile

  allVersions=`git tag --list --sort=-committerdate | grep -E '^(gravity-ui-web-)?v[0-9]*.[0-9]*.[0-9]*'`
  # First tag in the list will be the latest one, but may be prefixed (e.g. "gravity-ui-web-v1.2.3")
  version=`echo $allVersions | cut -d" " -f1`
  # be sure we get only the version part and discard any prefix
  version=`expr $version : '.*\(v[0-9].*\)'`

  ~/.local/bin/aws s3 cp s3://${CDN_BUCKET}/$cdnGravityDir/$historyFileName $historyFile --region=${PROD_BUCKET_REGION} --quiet

  if [ -f $historyFile ]
  then
    sed -i -e 's/]};/,/g' $historyFile
    echo "{\"version\":\"${version}\",\"date\":\"`date -u "+%d-%b-%Y %H:%M"`\",\"commit\":\"${TRAVIS_COMMIT}\",\"files\":" >> $historyFile
    cat $currentSizesFile >> $historyFile
    echo "}]};" >> $historyFile
  else
    echo "var ${TRAVIS_BRANCH}ChartData = {\"reports\": [{\"version\":\"${version}\",\"date\":\"`date -u "+%d-%b-%Y %H:%M"`\",\"commit\":\"${TRAVIS_COMMIT}\",\"files\":" >> $historyFile
    cat $currentSizesFile >> $historyFile
    echo "}]};" >> $historyFile
  fi

  ~/.local/bin/aws s3 cp $historyFile s3://${CDN_BUCKET}/$cdnGravityDir/$historyFileName  --region=${PROD_BUCKET_REGION}
  ~/.local/bin/aws s3 cp $reportPage s3://${CDN_BUCKET}/$cdnGravityDir/$reportPageName  --region=${PROD_BUCKET_REGION}
fi
