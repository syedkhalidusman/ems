const express = require('express');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/employeeRoutes');
const userRoutes = require('./routes/authRoutes'); // Ensure correct path
const cors = require('cors');

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/employeeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Configure CORS to allow requests from the React app running on port 5173
app.use(cors({
  origin: 'http://localhost:5173',
}));

// Middleware
app.use(express.json());

// Use the employee routes
app.use('/api/employees', employeeRoutes);

// Ensure the auth routes are included as well
app.use('/api/auth', userRoutes); // Add this line to ensure correct routing

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
