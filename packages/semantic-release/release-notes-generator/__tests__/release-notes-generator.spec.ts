import {generateNotes, IConfig} from '../lib/release-notes-generator';
const releaseNotesGenerator = require('@semantic-release/release-notes-generator');

describe('lerna-analyzer', () => {
  const PACKAGE_NAME = '@ablue-test/calc';

  let _generateNotesSpy: jest.SpyInstance;
  let _config: IConfig;

  beforeEach(() => {
    _generateNotesSpy = jest.spyOn(releaseNotesGenerator, 'generateNotes');
    _generateNotesSpy.mockReturnValue(() => {
      return new Promise((resolve) => resolve());
    });

    _config = {
      env: { npm_package_name: PACKAGE_NAME },
      commits: [],
    };
  });

  it('should run', async () => {
    await generateNotes(null, _config);
  });

  it('should find commits that match the package name', async () => {
    const commit = `feat(calc refactor): change to calc system\n\naffects: ${PACKAGE_NAME}`;
    _config.commits.push({message: commit});

    await generateNotes(null, _config);

    expect(_generateNotesSpy).toHaveBeenCalledWith(null, _config);
  });

  it('should skip commits that do not match', async () => {
    const commit = `feat(calc refactor): change to calc system\n\naffects: @asdf/calc`;
    _config.commits.push({message: commit});

    await generateNotes(null, _config);

    expect(_generateNotesSpy).toHaveBeenCalledWith(null, {
      ..._config,
      commits: [],
    });
  });

  it('should not fail if there is no lerna affected line', async () => {
    const commit = `feat(calc refactor): change to calc system`;
    _config.commits.push({message: commit});

    await generateNotes(null, _config);

    expect(_generateNotesSpy).toHaveBeenCalledWith(null, {
      ..._config,
      commits: [],
    });
  });
});
