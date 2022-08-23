
"use strict"

import express from "express"
import Employee from './Employee.js'

//import BodyParser from  'body-parser'

const Server = () =>
{
    const app = express()

    app.use(express.json())

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
        console.log("employee",employee)
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
      await Employee.destroy({where: {id: id}})
      res.send('removed')
    })

    app.listen(3010, "localhost",() => {
      console.log("app is running")
    })

}

export default Server

