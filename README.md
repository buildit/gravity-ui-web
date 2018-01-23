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

---

## Travis CI

### Documentation Changes

If you do not want to build the pipeline because all you are changing is the Readme.md file, us `[ci skip]` in the commit message.

### Pipeline

- Any pushed commit got build (`npm run-script styleguide`)
- Any successful build of `develop` branch get deployed to Staging
- Any successful build of a Tag that begins with `v#.#.#`  (case-sensitive) get deployed to Production

### Travis CI Setup

Travis CI build expects the following environment variables:

- `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`: AWS credentials used for deploying
- `STAGING_BUCKET` and `STAGING_BUCKET_REGION`: S3 bucket and Region for Staging environment
- `PROD_BUCKET` and `PROD_BUCKET_REGION`: S3 bucket and Region for Production environment


### Configuring Travis CI to Publish to NPM

Verify you have ruby version > 1.9.3:

```bash
> ruby -v
> ruby 2.4.0p0 (2016-12-24 revision 57164) [x86_64-darwin16]
```

Install the Travis CI CLI:

```bash
> gem install travis -v 1.8.8 --no-rdoc --no-ri
```

> **NOTE**:  It may be necessary to have XCode CLI if working on a Mac

```bash
> xcode-select --install
```

Edit your `.travis.yml` file to have a deploy provider:

```yaml
- provider: npm
  email: <BUILDIT_NPM_USER_EMAIL_ADDRESS>
  api_key: 
    secure: <ENCRYPTED_NPM_AUTH_TOKEN> (*)
  on:
    repo: <GIT_REPO_NAME> (e.g. buildit/buildit for the Buildit Website)
    branch: <TARGETED_BRANCH>
    tags: <TRUE_OR_FALSE> (Whether to build on Tags)
    condition: <CONDITION_TO_ACTIVATE_ON> (i.e. a regex)

  ...<ANY_OTHER_OPTIONS>... 
```

\* Generated using Travis-CI CLI, read below or click see [here](https://docs.travis-ci.com/user/deployment/npm/#NPM-auth-token)

#### Travis Encryption of API Key for NPM

Travis needs to have access to the Buildit NPM account to be able to push the new artefacts to the NPM registry.  As this is a public project it was decided to use a generic user account on NPM.  The API key is then generated and linked to this account.  
> **NOTE**: To generate or protect the API key, it is required to have the Travis-CI CLI tool installed. Please see above for details.

You must be logged-in on your NPM CLI instance in order to link your CLI environment to your remote Buildit NPM account.  The following command will update your .npmrc file in your personal home directory once you have entered in all the security information:

```bash
> npm login
```

After successful log on, navigate to your npmrc file (e.g. on a mac `/Users/<user>/.npmrc`), to retrieve the generated API key for the next steps.

You must be logged-in on the Travis-CI CLI in order to link your CLI environment to your remote Travis-CI.org account:

```bash
> travis login --auto
```

Run the following command to encrypt the NPM API key:

```bash
> travis encrypt <API_KEY> -r buildit/gravity-ui-sass --org
```

> **NOTE**: Do not use the `--add env.global` or any other permutation to the `travis encrypt` command, as it may overwrite other variables in your .travis.yml file.

### Deployment

Currently, deployment only means synchronising the output of the build (`./dist`) with an S3 bucket.

S3 buckets and DNS have to be set up manually.