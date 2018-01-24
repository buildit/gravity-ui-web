# Braching strategy

This project uses a simple branching strategy inspired by [git-flow](http://nvie.com/posts/a-successful-git-branching-model/):

## `develop` branch

The most recently delivered development changes reside in `develop`.

This has been configured as a restricted branch on GitHub and only project maintainers are able to push to this branch (or merge pull requests into it).


## Feature branches

Contributors making changes or adding new features should always create a feature branch (with a short, descriptive [kebab-case](http://wiki.c2.com/?KebabCase) name) off of the current `HEAD` of `develop`. These are short-lived branches that are deleted once the feature is complete and has been merged.

**Only do one feature per branch**. If you are working on several things in parallel, create separate branches for each.

Once ready for review, the feature branch should be pushed to this Github repo and a [pull request](https://help.github.com/articles/creating-a-pull-request/) should be raised.

The maintainers will then review the PR and either merge into `develop` (and then delete that feature branch), or request additional changes.


## `master` branch

The `master` branch always contains the most recent _production ready_ code. 

This has been configured as a restricted branch on GitHub and only project maintainers are able to push to this branch (or merge pull requests into it).

After being merged into `master`, new releases are tagged using the semver format (`v1.2.3`) by the project maintainers. This then triggers and automated build and deployment of both the [Buildit Living Style Guide](http://style.buildit.digital/) and the [`@buildit/gravity-ui-sass` NPM package](https://www.npmjs.com/package/@buildit/gravity-ui-sass).
