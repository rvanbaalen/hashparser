import { minify } from "terser";
import * as fs from 'fs';

// Record the start time using process.hrtime()
const startTime = process.hrtime();

// Define the config for how Terser should minify the code
const config = {
    compress: {
        dead_code: true,
        drop_console: true,
        drop_debugger: true,
        keep_classnames: false,
        keep_fargs: true,
        keep_fnames: false,
        keep_infinity: false
    },
    mangle: {
        eval: false,
        keep_classnames: true,
        keep_fnames: false,
        toplevel: false,
        safari10: false
    },
    module: true,
    sourceMap: {
        filename: 'hashparser.min.js',
        url: 'hashparser.min.js.map'
    },
    output: {
        comments: 'some'
    }
};

// Load in your code to minify
const code = fs.readFileSync('./src/hashparser.js', 'utf8');

// Minify the code with Terser
const minified = await minify(code, config);

// Save the code!
fs.writeFileSync('./dist/hashparser.js', code);

// Save the minified code!
fs.writeFileSync('./dist/hashparser.min.js', minified.code);

// Save the generated sourcemap
fs.writeFileSync('./dist/hashparser.min.js.map', minified.map);

// Calculate the runtime using process.hrtime()
const diff = process.hrtime(startTime);
const runtimeMs = diff[0] * 1000 + diff[1] / 1e6;

// Display the runtime in milliseconds if less than 1000 ms, otherwise in seconds
if (runtimeMs < 1000) {
    console.log(`Build completed in ${runtimeMs.toFixed(2)} ms`);
} else {
    console.log(`Build completed in ${(runtimeMs / 1000).toFixed(2)} seconds`);
}
