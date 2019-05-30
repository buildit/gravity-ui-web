# Gravity ESLint Shared Configuration

This repository contains the global shared lint configuration for all gravity JavaScript code.

## Setup

In order to add this shared configuration to your repo you'll need to do the following. *Please note these instructions only work in this repo due to local package requirements. In order to use the shared config outside of Gravity's repo, this package would need to be published on NPM.*

First off you'll need to install ESLint as a peer dependency in your desired package. This is a best practice since it allows the individual repos to maintain their own ESLint version. In addition ESLint shareable configs can't read installed dependencies, so we'll also have to include AirBnb's style guide and plugin support.

```bash
npm i -D eslint eslint-plugin-import eslint-config-airbnb-base
```

After installing the dependencies you'll need to add this line to your `package.json` dependencies manually. This is a local package so it won't do anything just yet.

```json
{
  "devDependencies": {
    "@buildit/eslint-config": "^1.0.0"
  }
}
```

You'll need to then go the root folder of Gravity and run the following command to link up the local package.

```bash
npm run lerna:bootstrap
```

Lastly add a new linting command to your `package.json` scripts section. Using the keyword `lint` will automatically enforce linting from root CI package tasks.

```json
{
  "scripts": {
    "lint": "eslint '**/*.js'"  
  }
}
```
