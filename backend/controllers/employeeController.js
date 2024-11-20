const Employee = require('../models/Employee');

// Add a new employee
exports.addEmployee = async (req, res) => {
  try {
    const { name, email, address, phone, position, department } = req.body;

    // Create a new employee instance
    const newEmployee = new Employee({
      name,
      email,
      address,
      phone,
      position,
      department,
    });

    // Save to the database
    await newEmployee.save();
    res.status(201).json(newEmployee); // Respond with the newly created employee
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(400).json({ message: 'Bad Request' });
  }
};
