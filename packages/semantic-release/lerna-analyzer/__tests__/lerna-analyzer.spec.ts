import {analyzeCommits, IConfig} from '../lib/lerna-analyzer';
const commitAnalyzer = require('@semantic-release/commit-analyzer');

describe('lerna-analyzer', () => {
  const PACKAGE_NAME = '@ablue-test/calc';

  let _analyzeCommitsStub: jest.SpyInstance;
  let _config: IConfig;

  beforeEach(() => {
    _analyzeCommitsStub = jest.spyOn(commitAnalyzer, 'analyzeCommits');
    _analyzeCommitsStub.mockReturnValue(() => {
      return new Promise((resolve) => resolve());
    });

    _config = {
      env: { npm_package_name: PACKAGE_NAME },
      commits: [],
    };
  });

  it('should run', async () => {
    await analyzeCommits(null, _config);
  });

  it('should find commits that match the package name', async () => {
    const commit = `feat(calc refactor): change to calc system\n\naffects: ${PACKAGE_NAME}`;
    _config.commits.push({message: commit});

    await analyzeCommits(null, _config);

    expect(_analyzeCommitsStub).toHaveBeenCalledWith(null, _config);
  });

  it('should skip commits that do not match', async () => {
    const commit = `feat(calc refactor): change to calc system\n\naffects: @asdf/calc`;
    _config.commits.push({message: commit});

    await analyzeCommits(null, _config);

    expect(_analyzeCommitsStub).toHaveBeenCalledWith(null, {
      ..._config,
      commits: [],
    });
  });

  it('should not fail if there is no lerna affected line', async () => {
    const commit = `feat(calc refactor): change to calc system`;
    _config.commits.push({message: commit});

    await analyzeCommits(null, _config);

    expect(_analyzeCommitsStub).toHaveBeenCalledWith(null, {
      ..._config,
      commits: [],
    });
  });
});
