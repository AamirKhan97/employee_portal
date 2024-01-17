const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    default: Date.now,
  },
  salary: {
    type: Number,
    required: true,
  },
  joiningDate: {
    type: Date,
    default: Date.now,
  },
  relievingDate: {
    type: Date,
    default: null, // Assuming relieving date can be null if the employee is currently working
  },
  contact: {
    type: Number,
    required: true,
  },
});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;
