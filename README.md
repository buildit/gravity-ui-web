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

Release a new version to npm:

    $ npm publish --access=public
