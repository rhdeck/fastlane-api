#!/usr/bin/env node
const getFastlaneAPI = require(".");
const { format } = require("prettier");
const { writeFileSync } = require("fs");
const { resolve } = require("path");
const commander = require("commander");
commander.description("Generate JSON-formatted API from Fastlane");
commander.option(
  "-f --file [jsonFilePath]",
  "target file for JSON output (defaults to stdout)"
);
commander.option(
  "-d --debug",
  "Debug mode - leave the fastlane directory and auto-generated files behind",
  false
);
commander.parse(process.argv);
const { file, debug } = commander;
if (file) fullpath = resolve(file);
const o = getFastlaneAPI({ debug });
const out = format(JSON.stringify(o), { parser: "json" });
if (file) writeFileSync(file, out);
else process.stdout.write(out);
