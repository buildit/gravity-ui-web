# gravity-ui-sass
A SASS UI library from the Buildit's Gravity design system

## Pull Requests and Release process

We are following these conventions:

- [semver](http://semver.org/) for versioning,
- [changelog](http://keepachangelog.com/en/0.3.0/).

**Before** opening a new PR, make sure you have added the changes done to the `CHANGELOG` file.

**After** every successful merge the following commands are required to be issued by an admin:

    $ npm version $type

Where `$type` is either `major`, `minor`, or `patch` depending on the impact of the changes.

Edit and commit the `CHANGELOG` updating the `[Unreleased]` tag to the new version followed by the date in the format `YYYY-MM-DD`, as per convention.

Push the updated version in the `package.json`, `package-lock.json` and `CHANGELOG`, and the new git tag (which will automatically create a new release in GitHub):

    $ git push origin master --tags


Release a new version to npm:  **OBSOLETE** Publishing will be handled by Travis CI

    $ npm publish --access=public


## Travis CI

### Pipeline

- Any pushed commit got build (`npm run-script styleguide`)
- Any successful build of `develop` branch get deployed to Staging
- Any successful build of a Tag  matching the pattern `v#.#.*`  (case-sensitive) get deployed to Production

### Travis CI Setup

Travis CI build expects the following environment variables:

- `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`: AWS credentials used for deploying
- `STAGING_BUCKET` and `STAGING_BUCKET_REGION`: S3 bucket and Region for Staging environment
- `PROD_BUCKET` and `PROD_BUCKET_REGION`: S3 bucket and Region for Production environment


### Deployment

Currently, deployment only means sync'ing the output of the build (`./dist`) with an S3 bucket.

S3 buckets and DNS have to be set up manually.
   
