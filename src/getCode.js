#!/usr/bin/env node

'use strict';

import "babel-polyfill";
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require("path");
const fs = require('fs');
const fsPromises = fs.promises;

const getCode = async () => {
    try {
        const xset = await exec("xset -q | grep LED | awk '{ print $10 }' ")
        const xset_stdout = xset.stdout.trim();
        const configPath = path.join(__dirname, '/../config/default.json')
        const codesJSON = await fsPromises.readFile(configPath, 'utf8')
        const codes = JSON.parse(codesJSON).codes
        return codes[xset_stdout]

    } catch (e) {
        throw e
    }
}

module.exports = getCode;
