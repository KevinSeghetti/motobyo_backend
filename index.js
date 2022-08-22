// main entry point to coding challenge backend

"use strict"

//-------------------------------------------------------------------------------

import fs from 'fs'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

//-------------------------------------------------------------------------------

import sequelize from './database.js'
import Employee from './Employee.js'
import Server from './Server.js'

//===============================================================================
//async function to seed the database with some data

async function SeedDatabase(employeeData)
{
    //console.log("SeedDatabase:",employeeData)
    let unresolved = employeeData.map( (entry) =>
    {
        //console.log("SeedDatabase::setting",entry)
        return Employee.create(entry)
    }
    )
    Promise.all(unresolved)
}

//-------------------------------------------------------------------------------
// set up database

await sequelize.sync({ force: true }).then(() => console.log('db is ready'))

// parse command line
const argv = yargs(hideBin(process.argv))
    .option('initialize',{
        alias: 'i',
        type: 'string',
        description: "json file to initialize the database with"
    })
    .argv

console.log(argv)
if (argv.initialize)
{
    console.log("initializing database from file ",argv.initialize)

    if(!fs.existsSync(argv.initialize)) {
        console.log("File "+argv.initialize+" not found")
        process.exit(1)
    }

    let rawdata = fs.readFileSync(argv.initialize)
    let employeeData = JSON.parse(rawdata)
    await SeedDatabase(employeeData)
}

// finally, run the web server

Server()

