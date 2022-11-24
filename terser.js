import { minify } from "terser";
import * as fs from 'fs';

// Define the config for how Terser should minify the code
// This is set to how you currently have this web tool configured
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
fs.writeFileSync('./dist/hashparser.min.js', minified.code);

// Save the generated sourcemap
fs.writeFileSync('./dist/hashparser.min.js.map', minified.map);
