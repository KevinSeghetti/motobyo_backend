const { Model, DataTypes } = require('sequelize');
const sequelize = require('./database');

class Employee extends Model {};

// Employee fields:
// ID - Unique identifier for an employee
// FirstName - Employee first name
// MiddleInitial - Employee middle initial
// LastName - Employee last name
// DateOfBirth - Employee birthday and year
// DateOfEmployment - Employee start date
// Status - ACTIVE or INACTIVE

Employee.init(
{
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  middleInitial: {
    type: DataTypes.STRING(1),
  },
  lastName: {
    type: DataTypes.STRING
  },
  dateOfBirth: {
    type: DataTypes.DATE,
  },
  dateOfEmployment: {
    type: DataTypes.DATE,
  },
  status : {
      type: DataTypes.BOOLEAN,
  }
},
{
  sequelize,
  modelName: 'Employee',
  timestamps: false
})

module.exports = Employee;
