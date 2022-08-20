const express = require("express");
const sequelize = require('./database');
const Employee = require('./Employee');

sequelize.sync({ force: true }).then(() => console.log('db is ready'));

const app = express();

app.use(express.json());

const bodyParser = require('body-parser');

app.post('/employees', async (req, res) => {
  console.log("post to employees, body = ",req.body)
  await Employee.create(req.body);
  res.send("success");
})

app.get('/employees', async (req, res) => {
  const employees = await Employee.findAll();
  res.send(employees);
})

app.get('/employees/:id', async (req, res) => {
  const id = req.params.id;
  const employee = await Employee.findOne({where: {id: id}});
  res.send(employee);
})

app.put('/employees/:id', async (req, res) => {
  const id = req.params.id;
  const employee = await Employee.findOne({where: {id: id}});
  employee.employeename = req.body.employeename;
  await employee.save();
  res.send('updated');
})

app.delete('/employees/:id', async (req, res) => {
  const id = req.params.id;
  await Employee.destroy({where: {id: id}});
  res.send('removed');
})

app.listen(3010, "localhost",() => {
  console.log("app is running");
});
