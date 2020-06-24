# Contributing to the OpenSeadragonImaging Suite

Contributions to the OpenSeadragonImaging suite of OpenSeadragon plugins are welcome and encouraged!

This document contains some (hopefully!) useful information on setting up development tools to make contributing as painless as possible. Also, there's a few guidelines for procedures and styles to help ensure a consistent development experience for all contributors.

Note: Enhancing this document is a welcome contribution as well!

## On this page:

- [Prerequisites](#Prerequisites)
- [IDEs/Editors](#IDEs/Editors)
- [Visual Studio Code](#Visual%20Studio%20Code)
- [Linting and Formatting](#Linting%20and%20Formatting)
- [Forums/Discussions](#Forums/Discussions)
- [Repository Links](#Repository%20Links)
- [Misc Helpful Links](#Helpful%20Links)

## Prerequisites

All of the OpenSeadragonImaging plugins are built, documented, linted, and tested using open source tools running on [Node.js](https://nodejs.org/). Version control is provided by [Git](https://git-scm.com/), and the Git repositories are hosted on [GitHub](https://github.com/).

The following will need to be installed on any Windows, Mac, or Linux system(s) used to work on the projects. For best results, follow the installation requirements for the operating system being installed on, and make sure git and node/npm/npx executable file locations are available on the PATH in any terminal/shell/command prompt implementations used:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)

If working with the openseadragon-imaging-tester repository, it may be necessary to install [node-gyp](https://github.com/nodejs/node-gyp). node-gyp should be installed globally, and has various prerequisites depending on the operating system it's installed on and/or what development tools are installed. Details can be found in the [node-gyp README](https://github.com/nodejs/node-gyp/blob/master/README.md) file.

- [node-gyp](https://github.com/nodejs/node-gyp)

All other required tools are installed locally in each repository.

[Back to Top](#Contributing%20to%20the%20OpenSeadragonImaging%20Suite)

## IDEs/Editors

All of the OpenSeadragonImaging plugin repositories are set up to work with Visual Studio Code out of the box. Linting is provided by [ESLint](https://eslint.org/) and code formatting is provided by [Prettier](https://prettier.io/). See the [Visual Studio Code section below](#Visual%20Studio%20Code) for details on setting up Visual Studio code.

> If you have a favorite IDE/editor you'd like to see supported, please compose a configuration for the IDE/editor and make a pull request to get it added to the projects! The configuration should match the configuration found in the `.editorconfig` and `.prettierrc` files located in the root folders of the repositories.

[Back to Top](#Contributing%20to%20the%20OpenSeadragonImaging%20Suite)

## Visual Studio Code

If you're already using Visual Studio Code, there's a couple extensions that are recommended:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

The ESLint extension provides linting while editing. The Prettier extension adds Prettier code formatting to the VS Code command palette. These are configurations in each of the OpenSeadragonImaging repositories, so no global setup is required.

[Back to Top](#Contributing%20to%20the%20OpenSeadragonImaging%20Suite)

## Linting and Formatting

To help weed out potential bugs in code, and to keep code formatted in a consistent way, linting by [ESLint](https://eslint.org/) and automatic code formatting by [Prettier](https://prettier.io/) is set up on all the plugin repositories.

> Note: Pull requests with un-linted and/or improperly formatted code will not be accepted (just makes it easier on everyone!).

Most popular editors/IDEs provide ESLint and Prettier integration (may require a plugin or extension). If your favorite editor doesn't support these, the following commands are available to run from a terminal command line at the repository root:

```
  // Run Prettier to check for formatting issues
    npm run prettier

  // Run Prettier to fix auto-fixable formatting issues
    npm run prettier-fix

  // Run ESLint to check for code issues
    npm run lint

  // Run ESLint to fix auto-fixable code issues
    npm run lint-fix
```

[Back to Top](#Contributing%20to%20the%20OpenSeadragonImaging%20Suite)

## Forums/Discussions

Hop on Gitter to say hi, ask questions, knock around ideas, or whatever! OpenSeadragon has [a community there as well!](https://gitter.im/openseadragon/openseadragon)

[![Gitt1er](https://badges.gitter.im/Join_Chat.svg)](https://gitter.im/msalsbery/OpenSeadragonImaging?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Note: For specific plugin issues, requests, bug reports, etc., please use the "Issues" feature at the GitHub repository pages, linked to below.

[Back to Top](#Contributing%20to%20the%20OpenSeadragonImaging%20Suite)

## Repository Links

- [openseadragon](https://github.com/openseadragon/openseadragon)
- [openseadragon-imaging](https://github.com/openseadragon-imaging/openseadragon-imaging)
- [openseadragon-consolehook](https://github.com/openseadragon-imaging/openseadragon-consolehook)
- [openseadragon-viewerinputhook](https://github.com/openseadragon-imaging/openseadragon-viewerinputhook)
- [openseadragon-imaginghelper](https://github.com/openseadragon-imaging/openseadragon-imaginghelper)
- [openseadragon-annohost](https://github.com/openseadragon-imaging/openseadragon-annohost)
- [openseadragon-annohost-canvas](https://github.com/openseadragon-imaging/openseadragon-annohost-canvas)

[Back to Top](#Contributing%20to%20the%20OpenSeadragonImaging%20Suite)

## Helpful Links

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [GitHub Flavored Markdown Spec](https://github.github.com/gfm/)

[Back to Top](#Contributing%20to%20the%20OpenSeadragonImaging%20Suite)
