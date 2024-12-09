import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import clericalRouter from './routes/clericalRoutes';
import cors from 'cors'; // Import cors

dotenv.config(); // Load environment variables from .env file

const app = express(); // Initialize Express app

// Use CORS middleware to allow cross-origin requests
app.use(cors()); // Apply CORS to all routes

// Middleware to parse incoming JSON requests
app.use(express.json());

// Base route handler
app.get('/', (req, res) => {
  res.send('Welcome to the Profiling System API!');
});

// Define routes for clerical records
app.use('/api/clerical', clericalRouter);

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
    
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit process with failure
  }
};

// Call connectDB function to establish a connection
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
