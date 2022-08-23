
"use strict"

// I didn't immediately find an off the shelf user authentication module
// for sequalize, so this will do for now.

import Sequelize from 'sequelize'
const { Model, DataTypes } = Sequelize
import sequelize from './database.js'

class User extends Model {}

// User fields:
// ID - Unique identifier for an employee
// Name - User name
// Password  - user password (WARNING: stored as plain text, not salted, not safe for production)

User.init(
{
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  sequelize,
  modelName: 'User',
  timestamps: true
})

export default User

