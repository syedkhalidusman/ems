const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: String,
  phone: { type: String, required: true },
  position: String,
  department: String
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
