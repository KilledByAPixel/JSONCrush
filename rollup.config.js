import pkg from './package.json';
import * as path from 'path';
import {readFileSync, writeFileSync, existsSync, mkdirSync} from 'graceful-fs';

//Before exporting rollup config:
//* The rollup input requires a statement with exports for modules
//* The input ./JSONCrush.js does not have exports because it may be used in
//  contexts that do not support it. (such as ClosureCompiler)
//* This sources JSONCrush.js, appends `exports` statement, and writes result to
//  target .tmp/JSONCrush.js
//* Note .tmp is in .gitignore
const inputFileName = 'JSONCrush.js';
const input = path.join(__dirname, inputFileName);
const tmpDir = path.join(__dirname, '.tmp');
if (!existsSync(tmpDir)) { mkdirSync(tmpDir); }
const tmpInput = path.join(tmpDir, inputFileName);
writeFileSync(tmpInput, readFileSync(input) + '\nexport {JSONCrush, JSONUncrush};');

//Minimal rollup config to wrap JSONCrush in the module types cjs, es and umd
export default {
    input: tmpInput,
    output: [
        // CommonJS (for Node)
        { file: pkg.main, format: 'cjs' },
        // ES Module
        { file: pkg.module, format: 'es' },
        // browser-friendly UMD build
        { name: 'JSONCrush', file: pkg.browser, format: 'umd' }
    ]
};
