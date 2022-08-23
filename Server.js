
"use strict"

import express from "express"
import Employee from './Employee.js'
import User from './User.js'

//import BodyParser from  'body-parser'

const Server = () =>
{
    const app = express()

    app.use(express.json())

    // not actually a user authentication system
    app.post('/login', async (req, res) => {
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

    app.post('/employees', async (req, res) => {
      console.log("post to employees, body = ",req.body)
      await Employee.create(req.body)

      res.send("success")
    })

    app.get('/employees', async (req, res) => {
      const employees = await Employee.findAll()
      res.send(employees)
    })

    app.get('/employees/:id', async (req, res) => {
      const id = req.params.id
      const employee = await Employee.findOne({where: {id: id}})
      res.send(employee)
    })

    app.put('/employees/:id', async (req, res) => {
        console.log("put to employees, body = ",req.body)
      const id = req.params.id
      const employee = await Employee.findOne({where: {id: id}})
      if (employee)
      {
        // kts smell: this is dangerous, need to add a filter to only allow the writable employee fields
        Object.assign(employee,req.body)
        await employee.save()
        res.send('updated')
      }
      else
      {
        res.send('employee not found')
      }
    })

    app.delete('/employees/:id', async (req, res) => {
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
        res.send('employee not found')
      }

      // we don't actually delete employees, just flag them as inactive
      //await Employee.destroy({where: {id: id}})
    })

    app.listen(3010, "localhost",() => {
      console.log("app is running")
    })

}

export default Server

