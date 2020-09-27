#!/usr/bin/env node

const yargs = require("yargs");
const axios = require("axios");
const voilk = require('voilk');

const options = yargs
 .usage("Usage: voilk-cmd -c <command> -i <inputs>")
 .usage("Commands you can try..")
 .usage(" -c get_account -i bilal ")
 .option("c", { alias: "command", describe: "Run a command", type: "string", demandOption: true })
 .option("i", { alias: "inputs", describe: "Type input parameters", type: "string" })
 .argv;

const command = `Executing, ${options.command}!`;
console.log(command);

if (options.inputs) {
 console.log(`Retreiving information ${options.inputs}...`)
} else {
 console.log("Kindly wait..");
}

if(options.command=="get_account"){
    const result = new Promise((resolve, reject) =>{
        voilk.api.getAccounts([options.inputs], function(err, result) {
            if(result)
            resolve(result)
            else resolve({error: "could not fetch.."})
        });
    })

    result.then(x => {
        console.log(x[0])
    })
}
else if(options.command=="get_chain_id"){
    console.log(voilk.config.get('chain_id'));
}