# fastlane-codegen

API generator/extractor for Fastlane

## CLI

```bash
npx fastlane-api -f myapi.json
# or
npx fastlane-api > myapi.json
```

Generates the shape of fastlane actions and their options based on the currently installed version.

This is useful for generating a wrapper API over the `socket_server` interface.

### Installation

```bash
yarn add fastlane-api
```

### Usage

```js
const getFastlaneAPI = require("fastlane-api");
const { version, actions } = getFastlaneAPI(); //This is synchronous and slow
console.log("version is", api.version);
console.log(
  "Available actions are",
  actions.map(({ name }) => name)
);
```
