#!/usr/bin/env node
const mustache = require("mustache");
const { join } = require("path");
const {
  readFileSync,
  writeFileSync,
  copyFileSync,
  unlinkSync,
  existsSync,
} = require("fs");
const { codegen } = require(join(__dirname, "package.json"));
const { spawnSync } = require("child_process");
const tmp = require("tmp");

const getFastlaneAPI = () => {
  const template = readFileSync(
    join(__dirname, "templates", "Fastfile.mustache"),
    { encoding: "utf8" }
  );
  const target = join(__dirname, "fastlane", "Fastfile");

  const { name: tempFile, removeCallback, ...stuff } = tmp.fileSync();
  console.log(tempFile);
  const out = mustache.render(template, { tempFile, ...codegen });
  writeFileSync(target, out);
  spawnSync("bundle", ["exec", "fastlane", "codegen"]);
  console.log("Looking at the file", tempFile);
  const o = JSON.parse(readFileSync(tempFile, { encoding: "utf8" }));
  removeCallback();
  return o;
};
