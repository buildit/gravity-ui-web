#!/bin/bash

allVersions=`git tag --list --sort=-committerdate | grep  -E '^(gravity-ui-web-)?v[0-9]*.[0-9]*.[0-9]*'`
# First tag in the list will be the latest one, but may be prefixed (e.g. "gravity-ui-web-v1.2.3")
version=`echo $allVersions | cut -d" " -f1`
# be sure we get only the version part and discard any prefix
version=`expr $version : '.*\(v[0-9].*\)'`