# WanMask Browser Extension

[![CircleCI][circle-image]][circle-url]
[![dependency status][dep-image]][dep-url]
[![Coverage Status][coveralls-image]][coveralls-url]

## Support

If you're a user seeking support, [Email Support](<support@wanmask.io>). During alpha and beta testing you might not get a response quickly! MetaMask provides a lot of good information on usage as well.

## Introduction

WanMask is a fork of MetaMask specifically for Wanchain. Just like MetaMask it inserts a web3 object on your webpages that pages can interact with. 

## Prerequisites

 - Install [Node.js](https://nodejs.org/en/) version 8.11.3 and npm version 6.4.0
   - If you are using [nvm](https://github.com/creationix/nvm#installation) (recommended) running `nvm use` will automatically choose the right node version for you.
   - Select npm 6.4.0: ```npm install -g npm@6.4.0```

### Running Tests

Requires `mocha` installed. Run `npm install -g mocha`.

Then just run `npm test`.

You can also test with a continuously watching process, via `npm run watch`.

You can run the linter by itself with `gulp lint`.

## Development

```bash
npm install
npm start
```
 Uncompressed builds can be found in `/dist`

## Build for Publishing

```bash
npm run dist
```
compressed builds can be found in `/builds` once they're built.

[circle-image]: https://circleci.com/gh/C3Devs/wanmask-extension.svg?style=svg
[circle-url]: https://circleci.com/gh/C3Devs/wanmask-extension
[dep-image]: https://david-dm.org/C3Devs/wanmask-extension.svg
[dep-url]: https://david-dm.org/C3Devs/wanmask-extension
[coveralls-image]: https://coveralls.io/repos/github/C3Devs/wanmask-extension/badge.svg?branch=develop
[coveralls-url]: https://coveralls.io/github/C3Devs/wanmask-extension?branch=develop
