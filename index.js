const inquirer = require ("inquirer")
const fs = require("fs")
const util = require("util")
const axios = require("axios")

const writeFileAsync = util.promisify(fs.writeFile)

function promptUser(){
    return inquirer.prompt([
        {        
            type: "input",
            name: "username",
            message: "What is your Github username?"
        },
        {        
            type: "input",
            name: "projName",
            message: "What is your project username?"
        },
        {        
            type: "input",
            name: "projDesc",
            message: "Please write a short description of your project."
        },
        {        
            type: "input",
            name: "projLicense",
            message: "What kind of license should your project have?"
        },
        {        
            type: "input",
            name: "cmdInstall",
            message: "What command should be run to install dependencies?"
        },
        {        
            type: "input",
            name: "cmdTest",
            message: "What command should be run to test?"
        },
        {        
            type: "input",
            name: "userNTK",
            message: "What does the user need to know about when using the repo?"
        },
        {        
            type: "input",
            name: "userContribute",
            message: "What does the user need to know when contributing to the repo?"
        }
    ])
}

function makeMD(answer,data){
return `
# ${answer.projName}
[![Github license](https://img.shields.io/badge/license-${answer.projLicense}-brightgreen.svg)](https://github.com/zmo2/mdCreator)
    
## Description 

${answer.projDesc}

## Table of Contents

*[Installation](#Installation)

*[Usage](#Usage)

*[License](#License)

*[Contributing](#Contributing)

*[Tests](#Tests)

*[Questions](#Questions)

## Installation:
To install neccessary dependencies, run the following command:

    ${answer.cmdInstall}

## Usage

${answer.userNTK}

## License

This project is licensed under the ${answer.projLicense} license.

## Contributing

${answer.userContribute}

## Tests

To run tests, run the following command:

    ${answer.cmdTest}

## Questions

<img src="${data.avatar_url}" alt="avatar" style="border-radius:16px" width="30"/>

If you hae questions about the repo, please contact [${answer.username}](https://github.com/${answer.username}) directly. 

`
}

async function init(){
    try{
        const answer = await promptUser()
        const {data} = await axios.get(`https://api.github.com/users/${answer.username}`)
        const mkMD = makeMD(answer,data)
        await writeFileAsync("README.md", mkMD)
        console.log("successfully wrote to readme.md")
    }
    catch(err){
        console.log(err)
    }
}

init()