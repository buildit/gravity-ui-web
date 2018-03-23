#!/bin/bash
if [[ ${TRAVIS_TAG} =~ (${PROD_TAG_REGEXP}) && !  -z  $TRAVIS_TAG ]]; then 
    echo "Sending Slack Notification";
    curl -X POST --data-urlencode 'payload={"text": "A successful deployment occurred with tag '"${TRAVIS_TAG}"' for project '"${TRAVIS_REPO_SLUG}"' "}"' ${SLACK_NOTIFICATION_URL}; 
else 
    echo "No need to send notifaction";
fi