'use strict'

/**
 *
 * Reverse IP Domain with API IndoXploit
 * Create date : 22 Agustus 2019
 * Author : Cahyo Dwi Putro
 *
 */

const chalk = require('chalk');
const inquirer = require('inquirer');

const questionTools = [
  {
    type:"list",
    name:"Tools",
    message:"Pilih Tools :", 
    choices:
      [
        "[1]  Reverse with Target Domain",
        "[2]  Reverse with Target IP",
      ] 
  }
]

const main = async () => {
  try {
    var toolChoise = await inquirer.prompt(questionTools);
    toolChoise = toolChoise.Tools;
    switch(toolChoise){
        case "[1]  Reverse with Target Domain":
            await require("./src/RevDomain.js");
            break;
        case "[2]  Reverse with Target IP":
            await require("./src/RevIP.js");
            break;
      default:
        console.log('\nERROR:\n[?] Aw, Snap! \n[!] Something went wrong while displaying this program!\n[!] Please try again!');
    }
  } catch(e) {
    console.log(e);
  }
}

main()