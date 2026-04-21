#!/usr/bin/env node
import "dotenv/config"

const VERSION = '0.1.0';

function main(): void {
    if(process.argv.includes('--version') || process.argv.includes('-v')){
        console.log(`xagent version ${VERSION}`);
        process.exit(0);
    }
    console.log("Hello, xagent!");
}

main();