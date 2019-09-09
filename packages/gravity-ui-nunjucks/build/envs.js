const minimist = require('minimist');

// Configs for different build environments
const availableEnvs = {
  'local-dev': {
    name: 'Local dev',
    showNameInTitle: true,
    url: 'http://localhost:3000',
    description: 'A local development version running on your computer. Will auto-referesh whenever you save changes to the source code.',
    gitBranch: null,
    excludeRobots: true,
  },
  production: {
    name: 'Production',
    showNameInTitle: false,
    url: 'http://style.buildit.digital',
    description: 'Always shows the most recently released Gravity styles and components. Updates whenever new releases of <code>@buildit/gravity-ui-web</code> are made.',
    gitBranch: 'master',
    excludeRobots: false,
  },
  staging: {
    name: 'Staging',
    showNameInTitle: true,
    url: 'http://style-staging.buildit.digital',
    description: 'Shows unreleased updates the current major version of <code>@buildit/gravity-ui-web</code>.',
    gitBranch: 'develop',
    excludeRobots: true,
  },
  next: {
    name: 'Staging for Next',
    showNameInTitle: true,
    url: 'http://style-next.buildit.digital',
    description: 'Shows unreleased updates targeting the <em>next</em> major release of <code>@buildit/gravity-ui-web</code>.',
    gitBranch: 'next',
    excludeRobots: true,
  },
};
const availableEnvNames = Object.keys(availableEnvs);
const defaultEnvName = availableEnvNames[0];

const knownOptions = {
  string: 'env',
};
const options = minimist(process.argv.slice(2), knownOptions);

function getEnvNameFromCommandLine() {
  return options.env;
}

function getEnvNameFromCI() {
  const travisCiBranch = process.env.TRAVIS_BRANCH;
  if (travisCiBranch !== undefined) {
    if (
      travisCiBranch === availableEnvs.production.gitBranch
      || travisCiBranch === process.env.TRAVIS_TAG
    ) {
      return 'production';
    }
    if (travisCiBranch === availableEnvs.staging.gitBranch) {
      return 'staging';
    }
    if (travisCiBranch === availableEnvs.next.gitBranch) {
      return 'next';
    }
  }
  return undefined;
}

function getCurrentEnvName() {
  return getEnvNameFromCommandLine() || getEnvNameFromCI() || defaultEnvName;
}

function getEnvInfo(envName) {
  const envInfo = availableEnvs[envName];
  if (envInfo === undefined) {
    throw new Error(`"${envName}" is not a recognised environment name. Available envs are: ${availableEnvNames.join(', ')}`);
  }
  return envInfo;
}

module.exports = {
  availableEnvNames,
  defaultEnvName,
  getCurrentEnvName,
  getEnvInfo,

  getCurrentEnvInfo() {
    return getEnvInfo(getCurrentEnvName());
  },
};
