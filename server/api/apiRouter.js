const express = require("express");
const router = express.Router();
const Employee = require("../models/EmployeeModal");

/*
    USAGE : CREATE a employee
    URL : http://127.0.0.1:5000/api/addproducts
    REQUEST : POST 
*/
router.post("/addemployee", async (request, response) => {
  try {
    let newEmployee = {
      name: request.body.name,
      dob: request.body.dob,
      salary: request.body.salary,
      Joining_date: request.body.Joining_date,
      releving_date: request.body.releving_date,
      contact: request.body.contact,
    };
    console.log(newEmployee);
    let employee = await Employee.findOne({ name: newEmployee.name });
    if (employee) {
      return response.status(401).json({
        message: "User already exist",
      });
    }

    employee = await Employee.create({
      name: request.body.name,
      dob: request.body.dob,
      salary: request.body.salary,
      contact: request.body.contact,
      joiningDate: request.body.Joining_date,
      relievingDate: request.body.releving_date,
    });
    // employee = new Employee(newEmployee);
    // employee = await employee.save();
    // employee.unShift(employee);
    response.status(200).json({
      response: employee,
      message: "Employee Added Successfully",
    });
  } catch (err) {
    console.error(err);
    response.status(500).json({
      msg: err.message,
    });
  }
});

/*
    USAGE : GET all the employee
    URL : http://127.0.0.1:5000/api/employees
    REQUEST : GET
*/

router.get("/employees", async (request, response) => {
  try {
    let employee = await Employee.find();
    response.status(200).json({
      message: "Employees list fetch",
      employee: employee,
    });
  } catch (err) {
    console.error(err);
    response.status(500).json({
      msg: err.message,
    });
  }
});

/*
    USAGE : GET single by id
    URL : http://127.0.0.1:5000/api/employee/:id
    REQUEST : GET
*/

router.get("/employee/:id", async (request, response) => {
  try {
    let empId = request.params.id;
    let employee = await Employee.findById(empId);
    response.status(200).json(employee);
  } catch (err) {
    console.error(err);
    response.status(500).json({
      msg: err.message,
    });
  }
});

/*
    USAGE :UPDATE a  employee
    URL : http://127.0.0.1:5000/api/products/:id
    REQUEST : PUT
*/

router.put("/updatemployee/:id", async (request, response) => {
  let empId = request.params.id;
  try {
    let updateEmp = {
      name: request.body.name,
      dob: request.body.dob,
      salary: request.body.salary,
      Joining_date: request.body.Joining_date,
      releving_date: request.body.releving_date,
      contact: request.body.contact,
    };
    let employee = await Employee.findById(empId);
    if (!employee) {
      return response.status(401).json({
        message: "No Employee Found",
      });
    }
    employee = await Employee.findByIdAndUpdate(
      employee,
      {
        $set: updateEmp,
      },
      { new: true }
    );
    response.status(200).json({
      message: "Employee Updated successfully",
      response: employee,
    });
  } catch (err) {
    console.error(err);
    response.status(500).json({
      msg: err.message,
    });
  }
});

/*
    USAGE :Delete a  employee
    URL : http://127.0.0.1:5000/api/products/:id
    REQUEST : PUT
*/
router.delete("/delete/:id", async (request, response) => {
  let empId = request.params.id;
  try {
    let employee = await Employee.findByIdAndDelete(empId);
    response.status(200).json({
      message: "Deleted Succesfully",
      response: employee,
    });
  } catch (err) {
    console.log(err);
    response.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
