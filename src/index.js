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

import { EventEmitter } from 'events';
// import getCode from 'getCode.js';
// const getCode = require('./getCode.js').getCode;

export default class Kblayout extends EventEmitter {
    constructor(options, output) {
        super();
        options = options || {};
        this.output = output || {};

        //custom config
        this.text = options.text || '';
        this.secretValue = options.secretValue;
    }

    update() {

        // this.output.full_text = "test"
        
        getCode().then((data, err) => {
            if (err) throw err;
            this.output.full_text = data;

            this.emit('updated', this, this.output);
        })

        this.emit('updated', this, this.output);

    }

    action(action) {
        if (this.__reporter && this.__reporter.supports('html')) {
            var output = {
                header: 'Starter sample🧪',
                content: `<h1>Hello World!</h1><p>Secret 🧪value is ${this.secretValue}`,
                userStyle: 'h1 { color: white }'
            };
            this.__reporter.display(output, action);
        }
    }

}