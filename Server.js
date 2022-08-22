
"use strict"

import express from "express"
import Employee from './Employee.js'

//import BodyParser from  'body-parser'

const Server = () =>
{
    const app = express()

    app.use(express.json())


    app.post('/employees', async (req, res) => {

      anotherOne =
      {
          "firstName" : "Another",
          "middleInitial" : "T",
          "lastName" : "One",
          "dateOfBirth" : "1967/07/24",
          "dateOfEmployment" : "2022/07/01",
          "status" : true
      }
      console.log("post to employees, aboter = ",anotherOne)

      await Employee.create(anotherOne)


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
      const id = req.params.id
      const employee = await Employee.findOne({where: {id: id}})
      employee.employeename = req.body.employeename
      await employee.save()
      res.send('updated')
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

