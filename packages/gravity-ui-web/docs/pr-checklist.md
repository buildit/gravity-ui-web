# Pull request checklist

Make sure these boxes are checked before submitting and approving PRs - Thank you!

If there are any exceptions, please make sure to explain why this is the case:

## Overall Approach

- [ ] The code is written with a _content-first_ and _mobile-first_ approach.
- [ ] The code has been tested across the major desktop browsers (Chrome, Firefox, Edge, Safari) and mobile browsers (Chrome, Samsung Internet, Safari) to work consistently.
- [ ] The code should _degrade gracefully_ on older browsers (please provide an example on how this is the case).

## Commits

- [ ] All commit messages must follow the [Conventional Commit message format](https://www.conventionalcommits.org/en/v1.0.0-beta.4/)

## Filetypes

### JSON

- [ ] Variables are not passed to patterns, unless the pattern requires so.
- [ ] All variables are used and defined in the main `_data.json` file.
- [ ] Overridden variables appear mostly in `pages`.

### Patterns/templates

- [ ] The patterns are devoid of any actual copy, the copy belongs to JSON files (see above).
- [ ] The patterns follow the [10 principles of inclusive web design](https://www.designprinciplesftw.com/collections/the-ten-principles-of-inclusive-web-design) which Gravity adheres to.
- [ ] The patterns have been tested within their intended use and in isolation 
- [ ] The patterns should be styled _context-free_ (see above), e.g. no vertical margins should be set, the container should take care of that.

### SASS

- [ ] The SASS (and related pattern files) follow the [naming conventions](./naming-conventions.md), architecture and structure outlined in the documentation.

### Images

- [ ] The images have been added to Gravity only if specifically needed, otherwise they should belong to PatternLab itself (there are some live examples in the code base).

### Other

- [ ] Documentation for any new feature and functionality has been added.
