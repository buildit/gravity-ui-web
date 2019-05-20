#!/bin/bash
gravityDir="packages/gravity-ui-web"
distDir="$gravityDir/dist/ui-lib"
cdnGravityDir="gravity-ui-web"
historyFilename="$TRAVIS_BRANCH-file-size-history.js"
historyFile="$gravityDir/$historyFilename"
currentSizesFile="$gravityDir/currentfilesizes.json"
reportPageName="filesizehistory.html"
reportPage="$gravityDir/$reportPageName"

if [ ! -z "$TRAVIS_COMMIT" ] && [[ "develop" == "$TRAVIS_BRANCH" || "master" == "$TRAVIS_BRANCH" ]]
then
  file-size-report -p $distDir -o $currentSizesFile

  source ./scripts/get_latest_version.sh

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
else 
  echo "Not tracking file size changes for this branch: $TRAVIS_BRANCH"
fi
