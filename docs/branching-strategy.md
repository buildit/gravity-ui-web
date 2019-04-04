# Braching strategy

This project currently uses a simple branching strategy that is inspired by [git-flow](http://nvie.com/posts/a-successful-git-branching-model/). _Diet Git Flow_, if you will.

## `develop` branch

The most recently delivered development changes reside in `develop`.

Commits to the `develop` branch trigger an automated build and deployment of the Buildit Living Style Guide [staging environment](http://style-staging.buildit.digital/). (Refer to our [Travis CI doc](./travis-ci.md) for further details)

This has been configured as a restricted branch on GitHub and only project maintainers are able to push to this branch (or merge pull requests into it).


## Feature branches

Contributors making changes or adding new features should always create a feature branch (with a short, descriptive [kebab-case](http://wiki.c2.com/?KebabCase) name) off of the current `HEAD` of `develop`. These are short-lived branches that are deleted once the feature is complete and has been merged.

**Only do one feature per branch**. If you are working on several things in parallel, create separate branches for each.

Once ready for review, the feature branch should be pushed to this Github repo and a [pull request](https://help.github.com/articles/creating-a-pull-request/) should be raised.

The maintainers will then review the PR and either merge into `develop` (and then delete that feature branch), or request additional changes.

## Releases

Releases should be named with a unique name like `metal-gear` instead of a version (which will automatically be added by Travis CI when building master). Releases should follow GitFlow's name strategy `release/NAME`.

As Git Flow dictates, a release needs to be merged into `master` and `develop`. DO NOT merge `master` back into `develop` after Travis CI runs the release build. This may trigger corruption in the `develop` branch by causing merges to flow upstream.

1. Create a PR for your release branch `release/NAME` from `develop` to merge with `master`
1. Get the PR approved
1. Message an admin run GIT Flow's release command locally into `master` and `develop`
1. Wait for the release to be completed
1. Close the PR and delete the branch on GitHub

## `master` branch

The `master` branch always contains the most recent _production ready_ code. 

This has been configured as a restricted branch on GitHub and only project maintainers are able to push to this branch (or merge pull requests into it).

After being merged into `master`, new releases are tagged using the semver format (`v1.2.3`) by the project maintainers. This then triggers an automated build and deployment of both the [Buildit Living Style Guide](http://style.buildit.digital/) and the [`@buildit/gravity-ui-web` NPM package](https://www.npmjs.com/package/@buildit/gravity-ui-web).
