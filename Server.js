
"use strict"

import express from "express"
import Employee from './Employee.js'
import User from './User.js'

let rootUrl = "/api/"
let loginUrl = rootUrl+'login'
let employeesUrl = rootUrl+'employees'

//import BodyParser from  'body-parser'

//===============================================================================

const AddUserRoutes =  (app) =>
{
  // not actually a user authentication system
  app.post(loginUrl, async (req, res) => {
    console.log("login, body = ",req.body)
    const userName = req.body.userName


    const users = await Employee.findAll()
    console.log("users",users)


    const user = await User.findOne({where: {name: userName}})
    if (user)
    {
      console.log("login: found user",user)
      if (user.password === req.params.password)
      {
        res.send("success")
        return
      }
    }

    res.status(401).send(new Error('user not found or password incorrect'));
  })
}

//-------------------------------------------------------------------------------

const AddEmployeeRoutes = (app) =>
{
  // create new employee
  app.post(employeesUrl, async (req, res) => {
    console.log("POST:employees: body = ",req.body)
    await Employee.create(req.body)

    res.send("success")
  })

  // fetch list of all employees
  // note: we return all, including inactive,
  // and the filtering occurs on the client
  // which might be considered a security concern
  //
  // there is also no paging, which means this doesn't scale
  app.get(employeesUrl, async (req, res) => {
    console.log("Get:employees: ")
    const employees = await Employee.findAll()
    res.send(employees)
  })

  // fetch a single employee
  // note that the current front end doesn't use this,
  // since all employee data is contained in the list above
  app.get(employeesUrl+'/:id', async (req, res) => {
    console.log("GET:employees/: id = ",req.params.id)
    const id = req.params.id
    const employee = await Employee.findOne({where: {id: id}})
    res.send(employee)
  })

  // update existing employee
  // this does not check if the employee being updated
  // is active or not.
  app.put(employeesUrl+'/:id', async (req, res) => {
    console.log("PUT:employees: id = ",req.params.id)
    const id = req.params.id
    const employee = await Employee.findOne({where: {id: id}})
    if (employee)
    {
      // kts smell: this is dangerous, need to add a filter to only allow the writable employee fields
      // but nice that this doesn't need to be updated when new fields are added
      // consider adding (or finding) a call to models that return a list of writable fields
      // and use that to filter this
      Object.assign(employee,req.body)
      await employee.save()
      res.send('updated')
    }
    else
    {
      res.send('employee not found')
    }
  })

  // flag a employee as inactive.
  // this is currently one way, will likely want to have the ability
  // to reactive an inactive account
  app.delete('/employees/:id', async (req, res) => {
    console.log("DELETE:employees: id = ",req.params.id)
    const id = req.params.id
    const employee = await Employee.findOne({where: {id: id}})
    if (employee)
    {
      employee.status = false
      await employee.save()
      res.send('removed')
    }
    else
    {
      console.log("DELETE:employees not found: id = ",req.params.id)
      res.send('employee not found')
    }

    // we don't actually delete employees, just flag them as inactive
    //await Employee.destroy({where: {id: id}})
  })

}
//-------------------------------------------------------------------------------

const Server = () =>
{
    const app = express()

    app.use(express.json())

    AddUserRoutes(app)
    AddEmployeeRoutes(app)

    app.listen(3010, "localhost",() => {
      console.log("coding challenge server is running")
    })

}

export default Server

