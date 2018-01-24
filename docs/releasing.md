# Pull Requests and Release process

We are following these conventions:

- [Semantic Versioning](http://semver.org/)
- [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)

**Before** opening a new PR, make sure you have added the changes done to the `CHANGELOG` file.

**After** every successful merge the following commands are required to be issued by an admin:

```bash
$ npm version $type
```

Where `$type` is either `major`, `minor`, or `patch` depending on the impact of the changes.

Edit and commit the `CHANGELOG` updating the `[Unreleased]` tag to the new version followed by the date in the format `YYYY-MM-DD`, as per convention.

Push the updated version in the `package.json`, `package-lock.json` and `CHANGELOG`, and the new git tag (which will automatically create a new release in GitHub):

```bash
$ git push origin master --tags
```

# Publishing the NPM package

**Note**: [Our Travis CI setup](./travis-ci.md) automatically publishes tagged releases.

However if a manual publish is needed, do:

```bash
$ npm publish --access=public
```
