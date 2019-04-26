const releaseNotesGenerator = require('@semantic-release/release-notes-generator');

interface ICommit {
  message: string;
}

export interface IConfig {
  commits: ICommit[];

  env: {
    npm_package_name: string;
  };
}

export async function generateNotes(pluginConfig: any, config: IConfig) {
  const {env, commits} = config;
  const relevantCommits = commits.filter(({message}) => {
    const packageDeclaration = message.split('\n\n')[1];
    return packageDeclaration && packageDeclaration.includes(env.npm_package_name);
  });

  return releaseNotesGenerator.generateNotes(pluginConfig, {
    ...config,
    commits: relevantCommits,
  });
}
